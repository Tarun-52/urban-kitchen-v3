import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/notifications - List notifications for current user (or all admin notifications)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || ''
    const unreadOnly = searchParams.get('unread') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50')

    // Build where clause: show user-specific + broadcast notifications
    // If no userId, show all notifications (admin view)
    const orConditions: any[] = [{ userId: null }] // broadcast notifications
    if (userId) {
      orConditions.push({ userId }) // user-specific notifications
    }

    const where: any = { OR: orConditions }
    if (unreadOnly) {
      where.read = false
    }

    const notifications = await db.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    const unreadWhere: any = { OR: orConditions, read: false }
    const unreadCount = await db.notification.count({
      where: unreadWhere,
    })

    return NextResponse.json({
      status: true,
      data: { notifications, unreadCount },
    })
  } catch (error) {
    console.error('Notifications fetch error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

// POST /api/notifications - Create a notification
export async function POST(request: NextRequest) {
  try {
    const { userId, title, message, type, link, linkId } = await request.json()

    if (!title || !message) {
      return NextResponse.json(
        { status: false, message: 'Title and message are required' },
        { status: 400 }
      )
    }

    const notification = await db.notification.create({
      data: {
        userId: userId || null,
        title,
        message,
        type: type || 'info',
        link: link || null,
        linkId: linkId || null,
      },
    })

    return NextResponse.json({
      status: true,
      message: 'Notification created',
      data: notification,
    })
  } catch (error) {
    console.error('Notification create error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to create notification' },
      { status: 500 }
    )
  }
}

// PUT /api/notifications - Mark as read (single or all)
export async function PUT(request: NextRequest) {
  try {
    const { id, markAllRead, userId } = await request.json()

    if (markAllRead) {
      const orConditions: any[] = [{ userId: null }]
      if (userId) {
        orConditions.push({ userId })
      }
      await db.notification.updateMany({
        where: {
          OR: orConditions,
          read: false,
        },
        data: { read: true },
      })
      return NextResponse.json({
        status: true,
        message: 'All notifications marked as read',
      })
    }

    if (!id) {
      return NextResponse.json(
        { status: false, message: 'Notification ID is required' },
        { status: 400 }
      )
    }

    await db.notification.update({
      where: { id },
      data: { read: true },
    })

    return NextResponse.json({
      status: true,
      message: 'Notification marked as read',
    })
  } catch (error) {
    console.error('Notification update error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to update notification' },
      { status: 500 }
    )
  }
}
