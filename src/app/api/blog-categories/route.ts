import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/blog-categories - List blog categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const all = searchParams.get('all')

    const where: Record<string, unknown> = {}
    if (all !== 'true') {
      where.status = 'active'
    }

    const categories = await db.blogCategory.findMany({
      where,
      include: { _count: { select: { posts: true } } },
      orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
    })

    return NextResponse.json({
      status: true,
      message: 'Blog categories fetched successfully',
      data: { categories },
    })
  } catch (error) {
    console.error('Blog categories fetch error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to fetch blog categories' },
      { status: 500 }
    )
  }
}

// POST /api/blog-categories - Create a blog category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, emoji, color, sortOrder, status } = body

    if (!name) {
      return NextResponse.json(
        { status: false, message: 'Category name is required' },
        { status: 400 }
      )
    }

    // Auto-generate slug from name if not provided
    const categorySlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    // Check for duplicate name or slug
    const existing = await db.blogCategory.findFirst({
      where: { OR: [{ name }, { slug: categorySlug }] },
    })
    if (existing) {
      return NextResponse.json(
        { status: false, message: 'A category with this name or slug already exists' },
        { status: 409 }
      )
    }

    const category = await db.blogCategory.create({
      data: {
        name,
        slug: categorySlug,
        description: description || null,
        emoji: emoji || null,
        color: color || null,
        sortOrder: sortOrder ?? 0,
        status: status || 'active',
      },
    })

    return NextResponse.json({
      status: true,
      message: 'Blog category created successfully',
      data: category,
    }, { status: 201 })
  } catch (error) {
    console.error('Blog category create error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to create blog category' },
      { status: 500 }
    )
  }
}
