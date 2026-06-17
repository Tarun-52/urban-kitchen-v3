import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/roles - List all roles
export async function GET() {
  try {
    const roles = await db.role.findMany({
      orderBy: { roleName: 'asc' },
      include: { _count: { select: { users: true } } },
    })
    return NextResponse.json({
      status: true,
      message: 'Roles fetched successfully',
      data: { roles },
    })
  } catch (error) {
    console.error('Roles fetch error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to fetch roles' },
      { status: 500 }
    )
  }
}

// POST /api/roles - Create a new role
export async function POST(request: NextRequest) {
  try {
    const { roleName, permissions } = await request.json()
    if (!roleName || !roleName.trim()) {
      return NextResponse.json(
        { status: false, message: 'Role name is required' },
        { status: 400 }
      )
    }
    // Check if role already exists
    const existing = await db.role.findFirst({ where: { roleName: roleName.trim().toLowerCase() } })
    if (existing) {
      return NextResponse.json(
        { status: false, message: 'Role already exists' },
        { status: 400 }
      )
    }
    const role = await db.role.create({
      data: {
        roleName: roleName.trim().toLowerCase(),
        permissions: typeof permissions === 'string' ? permissions : JSON.stringify(permissions || []),
      },
    })
    return NextResponse.json({
      status: true,
      message: 'Role created successfully',
      data: role,
    })
  } catch (error) {
    console.error('Role create error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to create role' },
      { status: 500 }
    )
  }
}

// PUT /api/roles - Update role permissions
export async function PUT(request: NextRequest) {
  try {
    const { id, permissions, roleName } = await request.json()
    if (!id) {
      return NextResponse.json(
        { status: false, message: 'Role ID is required' },
        { status: 400 }
      )
    }
    const updateData: any = {}
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

// DELETE /api/roles - Delete a role
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { status: false, message: 'Role ID is required' },
        { status: 400 }
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
