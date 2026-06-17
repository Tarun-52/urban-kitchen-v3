import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/blog-categories/[id] - Get a single blog category
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const category = await db.blogCategory.findUnique({
      where: { id },
      include: { _count: { select: { posts: true } } },
    })

    if (!category) {
      return NextResponse.json(
        { status: false, message: 'Blog category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      status: true,
      message: 'Blog category fetched successfully',
      data: category,
    })
  } catch (error) {
    console.error('Blog category fetch error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to fetch blog category' },
      { status: 500 }
    )
  }
}

// PUT /api/blog-categories/[id] - Update a blog category
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.blogCategory.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { status: false, message: 'Blog category not found' },
        { status: 404 }
      )
    }

    // Check for duplicate name/slug if being changed
    if (body.name || body.slug) {
      const duplicate = await db.blogCategory.findFirst({
        where: {
          OR: [
            ...(body.name ? [{ name: body.name }] : []),
            ...(body.slug ? [{ slug: body.slug }] : []),
          ],
          NOT: { id },
        },
      })
      if (duplicate) {
        return NextResponse.json(
          { status: false, message: 'A category with this name or slug already exists' },
          { status: 409 }
        )
      }
    }

    const updateData: Record<string, unknown> = {}
    const allowedFields = ['name', 'slug', 'description', 'emoji', 'color', 'sortOrder', 'status']
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    // If name is being updated, also update denormalized category on posts
    if (body.name && body.name !== existing.name) {
      await db.blogPost.updateMany({
        where: { categoryId: id },
        data: { category: body.name },
      })
    }

    const category = await db.blogCategory.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      status: true,
      message: 'Blog category updated successfully',
      data: category,
    })
  } catch (error) {
    console.error('Blog category update error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to update blog category' },
      { status: 500 }
    )
  }
}

// DELETE /api/blog-categories/[id] - Delete a blog category
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.blogCategory.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { status: false, message: 'Blog category not found' },
        { status: 404 }
      )
    }

    // Nullify categoryId and category on related posts
    await db.blogPost.updateMany({
      where: { categoryId: id },
      data: { categoryId: null, category: null },
    })

    await db.blogCategory.delete({ where: { id } })

    return NextResponse.json({
      status: true,
      message: 'Blog category deleted successfully',
      data: null,
    })
  } catch (error) {
    console.error('Blog category delete error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to delete blog category' },
      { status: 500 }
    )
  }
}
