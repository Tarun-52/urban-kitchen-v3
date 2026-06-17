import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/roles/[id] - Get a single role
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const role = await db.role.findUnique({
      where: { id },
      include: { _count: { select: { users: true } } },
    })
    if (!role) {
      return NextResponse.json(
        { status: false, message: 'Role not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({
      status: true,
      message: 'Role fetched successfully',
      data: role,
    })
  } catch (error) {
    console.error('Role fetch error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to fetch role' },
      { status: 500 }
    )
  }
}

// PUT /api/roles/[id] - Update a role
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { permissions, roleName } = body

    const existingRole = await db.role.findUnique({ where: { id } })
    if (!existingRole) {
      return NextResponse.json(
        { status: false, message: 'Role not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (permissions !== undefined) {
      updateData.permissions = typeof permissions === 'string' ? permissions : JSON.stringify(permissions)
    }
    if (roleName !== undefined) {
      updateData.roleName = roleName.trim().toLowerCase()
    }

    const role = await db.role.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      status: true,
      message: 'Role updated successfully',
      data: role,
    })
  } catch (error) {
    console.error('Role update error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to update role' },
      { status: 500 }
    )
  }
}

// DELETE /api/roles/[id] - Delete a role
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existingRole = await db.role.findUnique({ where: { id } })
    if (!existingRole) {
      return NextResponse.json(
        { status: false, message: 'Role not found' },
        { status: 404 }
      )
    }

    // Check if any users have this role
    const usersWithRole = await db.user.count({ where: { roleId: id } })
    if (usersWithRole > 0) {
      return NextResponse.json(
        { status: false, message: `Cannot delete: ${usersWithRole} user(s) have this role` },
        { status: 400 }
      )
    }

    await db.role.delete({ where: { id } })

    return NextResponse.json({
      status: true,
      message: 'Role deleted successfully',
    })
  } catch (error) {
    console.error('Role delete error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to delete role' },
      { status: 500 }
    )
  }
}
