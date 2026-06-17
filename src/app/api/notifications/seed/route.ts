import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/notifications/seed - Generate notifications from existing data
export async function POST(request: NextRequest) {
  try {
    const count = await db.notification.count()
    if (count > 0) {
      return NextResponse.json({
        status: true,
        message: 'Notifications already exist, skipping seed',
        data: { created: 0 },
      })
    }

    const notifications: { title: string; message: string; type: string; link: string; read: boolean }[] = []

    // Fetch recent data
    const recentOrders = await db.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { customer: true } })
    const recentLeads = await db.lead.findMany({ take: 5, orderBy: { createdAt: 'desc' } })
    const recentInquiries = await db.inquiry.findMany({ take: 3, orderBy: { createdAt: 'desc' } })
    const recentQuotations = await db.quotation.findMany({ take: 3, orderBy: { createdAt: 'desc' } })
    const pendingLeaves = await db.leave.findMany({ where: { status: 'pending' }, take: 3, orderBy: { createdAt: 'desc' }, include: { employee: { include: { user: true } } } })
    const serviceRequests = await db.serviceRequest.findMany({ where: { status: 'open' }, take: 3, orderBy: { createdAt: 'desc' } })

    for (const order of recentOrders) {
      notifications.push({ title: `New Order #${order.orderNumber}`, message: `Order from ${order.customer?.name || 'Customer'} — Total: Rs. ${(order.total || 0).toLocaleString('en-IN')}. Status: ${order.orderStatus}`, type: 'order', link: 'orders', read: false })
    }
    for (const lead of recentLeads) {
      notifications.push({ title: `New Lead: ${lead.name}`, message: `${lead.company ? lead.company + ' — ' : ''}${lead.requirement || 'New lead from ' + (lead.source || 'website')}. Status: ${lead.status}`, type: 'lead', link: 'leads', read: false })
    }
    for (const inquiry of recentInquiries) {
      notifications.push({ title: `New Inquiry from ${inquiry.name}`, message: `${inquiry.subject || inquiry.message?.substring(0, 80) + '...' || 'General inquiry'}`, type: 'lead', link: 'inquiries', read: false })
    }
    for (const q of recentQuotations) {
      notifications.push({ title: `Quotation #${q.quotationNumber}`, message: `Quotation for ${q.customerName} — Rs. ${(q.amount || 0).toLocaleString('en-IN')}. Status: ${q.status}`, type: 'quotation', link: 'quotations', read: false })
    }
    for (const leave of pendingLeaves) {
      const empName = leave.employee?.user?.name || 'Employee'
      notifications.push({ title: `Leave Request: ${empName}`, message: `${leave.type} leave from ${new Date(leave.startDate).toLocaleDateString('en-IN')} to ${new Date(leave.endDate).toLocaleDateString('en-IN')}. Status: Pending`, type: 'employee', link: 'leaves', read: false })
    }
    for (const sr of serviceRequests) {
      notifications.push({ title: `Service Request: ${sr.issue?.substring(0, 50) || 'New Request'}`, message: `Priority: ${sr.priority}. Status: ${sr.status}`, type: 'alert', link: 'service', read: false })
    }
    notifications.push({ title: 'Welcome to Urban Kitchen Admin', message: 'Your admin panel is set up and ready. Manage orders, leads, quotations, and more from the sidebar.', type: 'system', link: 'dashboard', read: false })

    const created = await db.notification.createMany({
      data: notifications.map(n => ({ userId: null, title: n.title, message: n.message, type: n.type, link: n.link, read: n.read })),
    })

    return NextResponse.json({ status: true, message: 'Notifications seeded successfully', data: { created: created.count } })
  } catch (error) {
    console.error('Notification seed error:', error)
    return NextResponse.json({ status: false, message: 'Failed to seed notifications' }, { status: 500 })
  }
}
