import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/blog/[id] - Get a single blog post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const post = await db.blogPost.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, email: true, avatar: true } },
        categoryRef: { select: { id: true, name: true, slug: true, emoji: true, color: true } },
      },
    })

    if (!post) {
      return NextResponse.json(
        { status: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      status: true,
      message: 'Blog post fetched successfully',
      data: post,
    })
  } catch (error) {
    console.error('Blog post fetch error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

// PUT /api/blog/[id] - Update a blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existingPost = await db.blogPost.findUnique({ where: { id } })
    if (!existingPost) {
      return NextResponse.json(
        { status: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    const allowedFields = [
      'title', 'slug', 'excerpt', 'content', 'featuredImage',
      'category', 'categoryId', 'tags', 'authorId', 'status', 'featured',
      'seoTitle', 'seoDescription',
    ]

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field === 'featured') {
          updateData[field] = Boolean(body[field])
        } else {
          updateData[field] = body[field]
        }
      }
    }

    // If status changes to "published" and publishedAt is null, set publishedAt
    if (body.status === 'published' && !existingPost.publishedAt) {
      updateData.publishedAt = new Date()
    }

    const post = await db.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: { select: { id: true, name: true, email: true, avatar: true } },
        categoryRef: { select: { id: true, name: true, slug: true, emoji: true, color: true } },
      },
    })

    return NextResponse.json({
      status: true,
      message: 'Blog post updated successfully',
      data: post,
    })
  } catch (error) {
    console.error('Blog post update error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE /api/blog/[id] - Delete a blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existingPost = await db.blogPost.findUnique({ where: { id } })
    if (!existingPost) {
      return NextResponse.json(
        { status: false, message: 'Blog post not found' },
        { status: 404 }
      )
    }

    await db.blogPost.delete({ where: { id } })

    return NextResponse.json({
      status: true,
      message: 'Blog post deleted successfully',
      data: null,
    })
  } catch (error) {
    console.error('Blog post delete error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
