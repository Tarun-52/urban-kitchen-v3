import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/blog - List blog posts with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const admin = searchParams.get('admin')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}

    // For public (non-admin) requests, only return published posts
    if (admin !== 'true') {
      where.status = 'published'
    } else if (status) {
      where.status = status
    }

    if (category) {
      where.category = category
    }

    if (featured === 'true') {
      where.featured = true
    }

    if (search) {
      // Use AND to combine search with other filters
      where.AND = [
        ...((where.status) ? [{ status: where.status }] : []),
        ...((where.category) ? [{ category: where.category }] : []),
        ...((where.featured !== undefined) ? [{ featured: where.featured }] : []),
        {
          OR: [
            { title: { contains: search } },
            { excerpt: { contains: search } },
            { content: { contains: search } },
          ],
        },
      ]
      // Remove the top-level fields since they're now in AND
      delete where.status
      delete where.category
      delete where.featured
    }

    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, email: true, avatar: true } },
          categoryRef: { select: { id: true, name: true, slug: true, emoji: true, color: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.blogPost.count({ where }),
    ])

    return NextResponse.json({
      status: true,
      message: 'Blog posts fetched successfully',
      data: {
        posts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    })
  } catch (error) {
    console.error('Blog posts fetch error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST /api/blog - Create a blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      categoryId,
      tags,
      authorId,
      status,
      featured,
      seoTitle,
      seoDescription,
    } = body

    if (!title || !content) {
      return NextResponse.json(
        { status: false, message: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Auto-generate slug from title if not provided
    const blogSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    // Auto-set category name from categoryId for backward compatibility
    let categoryName = category || null
    if (categoryId && !categoryName) {
      const blogCategory = await db.blogCategory.findUnique({ where: { id: categoryId } })
      if (blogCategory) {
        categoryName = blogCategory.name
      }
    }

    // Set publishedAt when status is "published"
    const publishedAt = status === 'published' ? new Date() : null

    const post = await db.blogPost.create({
      data: {
        title,
        slug: blogSlug,
        excerpt: excerpt || null,
        content,
        featuredImage: featuredImage || null,
        categoryId: categoryId || null,
        category: categoryName,
        tags: tags || null,
        authorId: authorId || null,
        status: status || 'draft',
        featured: featured || false,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        publishedAt,
      },
      include: {
        author: { select: { id: true, name: true, email: true, avatar: true } },
        categoryRef: { select: { id: true, name: true, slug: true, emoji: true, color: true } },
      },
    })

    return NextResponse.json({
      status: true,
      message: 'Blog post created successfully',
      data: post,
    }, { status: 201 })
  } catch (error) {
    console.error('Blog post create error:', error)
    return NextResponse.json(
      { status: false, message: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
