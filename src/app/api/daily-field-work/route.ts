import { NextRequest } from 'next/server'
import { db } from '@/lib/db'

// GET /api/daily-field-work - List daily field work entries
// Auto-deletes entries that have expired (> 1 month old)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId')
    const status = searchParams.get('status')
    const workType = searchParams.get('workType')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Auto-cleanup: delete expired entries (> 1 month old)
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    try {
      await db.dailyFieldWork.deleteMany({
        where: { expiresAt: { lt: oneMonthAgo } }
      })
    } catch {
      // Ignore cleanup errors
    }

    const where: Record<string, unknown> = {}
    if (employeeId) where.employeeId = employeeId
    if (status) where.status = status
    if (workType) where.workType = workType

    const entries = await db.dailyFieldWork.findMany({
      where,
      include: {
        employee: {
          include: {
            user: { select: { id: true, name: true, email: true, phone: true } },
          },
        },
      },
      orderBy: { date: 'desc' },
      take: limit,
    })

    // Calculate summary stats
    const totalEntries = entries.length
    const byWorkType: Record<string, number> = {}
    let pendingFollowups = 0
    for (const entry of entries) {
      byWorkType[entry.workType] = (byWorkType[entry.workType] || 0) + 1
      if (entry.status === 'pending_followup') pendingFollowups++
    }

    // Upcoming follow-ups (future followUpDate)
    const now = new Date()
    const upcomingFollowups = entries.filter(e => e.followUpDate && new Date(e.followUpDate) >= now && !e.followUpCreated)

    return Response.json({
      status: true,
      data: {
        entries,
        stats: { totalEntries, byWorkType, pendingFollowups },
        upcomingFollowups,
      },
    })
  } catch (error) {
    console.error('Daily field work fetch error:', error)
    return Response.json(
      { status: false, message: 'Failed to fetch daily field work entries' },
      { status: 500 }
    )
  }
}

// POST /api/daily-field-work - Create a new daily field work entry
// Auto-creates follow-up task and pipeline deal if applicable
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      employeeId,
      date,
      workType,
      title,
      description,
      latitude,
      longitude,
      address,
      clientName,
      clientPhone,
      clientCompany,
      followUpDate,
      followUpNote,
      status,
    } = body

    if (!employeeId || !date || !title) {
      return Response.json(
        { status: false, message: 'Employee ID, date, and title are required' },
        { status: 400 }
      )
    }

    // Auto-set expiresAt to 1 month from the work date
    const expiresAt = new Date(date)
    expiresAt.setMonth(expiresAt.getMonth() + 1)

    const entry = await db.dailyFieldWork.create({
      data: {
        employeeId,
        date: new Date(date),
        workType: workType || 'site_visit',
        title,
        description: description || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        address: address || null,
        clientName: clientName || null,
        clientPhone: clientPhone || null,
        clientCompany: clientCompany || null,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        followUpNote: followUpNote || null,
        status: status || 'completed',
        expiresAt,
      },
      include: {
        employee: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    })

    // Auto-create follow-up task if followUpDate is set
    if (followUpDate && !entry.followUpCreated) {
      try {
        await db.task.create({
          data: {
            employeeId,
            title: `Follow-up: ${title}`,
            description: followUpNote || `Follow-up for field work: ${title}${clientName ? ` - Client: ${clientName}` : ''}`,
            priority: 'high',
            status: 'pending',
            dueDate: new Date(followUpDate),
          },
        })
        await db.dailyFieldWork.update({
          where: { id: entry.id },
          data: { followUpCreated: true, status: 'pending_followup' },
        })
      } catch (err) {
        console.error('Failed to create follow-up task:', err)
      }
    }

    // Auto-create pipeline deal if client info is present
    if ((clientName || clientCompany) && !entry.pipelineCreated) {
      try {
        // Find or create a default pipeline
        let pipeline = await db.pipeline.findFirst({ where: { isDefault: true } })
        if (!pipeline) {
          pipeline = await db.pipeline.create({
            data: {
              name: 'Sales Pipeline',
              isDefault: true,
              stages: JSON.stringify([
                { id: '1', name: 'new', order: 1, color: '#3b82f6' },
                { id: '2', name: 'contacted', order: 2, color: '#06b6d4' },
                { id: '3', name: 'quotation_sent', order: 3, color: '#a855f7' },
                { id: '4', name: 'negotiation', order: 4, color: '#eab308' },
                { id: '5', name: 'won', order: 5, color: '#22c55e' },
                { id: '6', name: 'lost', order: 6, color: '#ef4444' },
              ]),
            },
          })
        }

        // Find the employee's user for assignee
        const emp = await db.employee.findUnique({
          where: { id: employeeId },
          select: { userId: true },
        })

        const dealTitle = clientCompany
          ? `${clientCompany} - ${workType}`
          : `${clientName} - ${workType}`

        const deal = await db.pipelineDeal.create({
          data: {
            pipelineId: pipeline.id,
            title: dealTitle,
            value: 0,
            stage: 'new',
            probability: 20,
            assigneeId: emp?.userId || null,
            closeDate: followUpDate ? new Date(followUpDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: 'open',
          },
        })

        await db.dailyFieldWork.update({
          where: { id: entry.id },
          data: { pipelineDealId: deal.id, pipelineCreated: true },
        })
      } catch (err) {
        console.error('Failed to create pipeline deal:', err)
      }
    }

    // Fetch the updated entry with all changes applied
    const updatedEntry = await db.dailyFieldWork.findUnique({
      where: { id: entry.id },
      include: {
        employee: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    })

    return Response.json({ status: true, data: updatedEntry }, { status: 201 })
  } catch (error) {
    console.error('Daily field work create error:', error)
    return Response.json(
      { status: false, message: 'Failed to create daily field work entry' },
      { status: 500 }
    )
  }
}

// PUT /api/daily-field-work - Update a daily field work entry
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return Response.json(
        { status: false, message: 'Entry ID is required' },
        { status: 400 }
      )
    }

    // Remove relation fields from update data
    const { employee, ...dataToUpdate } = updateData as Record<string, unknown>

    // Convert date fields
    if (dataToUpdate.date) dataToUpdate.date = new Date(dataToUpdate.date as string)
    if (dataToUpdate.followUpDate) dataToUpdate.followUpDate = new Date(dataToUpdate.followUpDate as string)
    if (dataToUpdate.latitude) dataToUpdate.latitude = parseFloat(dataToUpdate.latitude as string)
    if (dataToUpdate.longitude) dataToUpdate.longitude = parseFloat(dataToUpdate.longitude as string)

    const entry = await db.dailyFieldWork.update({
      where: { id },
      data: dataToUpdate,
      include: {
        employee: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
      },
    })

    return Response.json({ status: true, data: entry })
  } catch (error) {
    console.error('Daily field work update error:', error)
    return Response.json(
      { status: false, message: 'Failed to update daily field work entry' },
      { status: 500 }
    )
  }
}

// DELETE /api/daily-field-work - Delete a daily field work entry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return Response.json(
        { status: false, message: 'Entry ID is required' },
        { status: 400 }
      )
    }

    await db.dailyFieldWork.delete({ where: { id } })

    return Response.json({ status: true, message: 'Entry deleted successfully' })
  } catch (error) {
    console.error('Daily field work delete error:', error)
    return Response.json(
      { status: false, message: 'Failed to delete daily field work entry' },
      { status: 500 }
    )
  }
}
