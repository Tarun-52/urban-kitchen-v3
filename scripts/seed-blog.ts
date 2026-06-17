import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const db = new PrismaClient()

async function seedBlogData() {
  // Delete existing blog data
  await db.blogPost.deleteMany()
  await db.blogCategory.deleteMany()

  // Blog Categories
  const blogCategories = await Promise.all([
    db.blogCategory.create({ data: { name: 'Industry News', slug: 'industry-news', emoji: '📡', description: 'Latest news and trends from the commercial kitchen industry', sortOrder: 1, status: 'active' } }),
    db.blogCategory.create({ data: { name: 'Kitchen Tips', slug: 'kitchen-tips', emoji: '💡', description: 'Expert tips and best practices for running a commercial kitchen', sortOrder: 2, status: 'active' } }),
    db.blogCategory.create({ data: { name: 'Product Spotlight', slug: 'product-spotlight', emoji: '🔍', description: 'In-depth looks at our premium kitchen equipment', sortOrder: 3, status: 'active' } }),
    db.blogCategory.create({ data: { name: 'Maintenance', slug: 'maintenance', emoji: '🔧', description: 'Maintenance guides and AMC tips for kitchen equipment', sortOrder: 4, status: 'active' } }),
    db.blogCategory.create({ data: { name: 'Case Studies', slug: 'case-studies', emoji: '📋', description: 'Real-world success stories from our clients', sortOrder: 5, status: 'active' } }),
    db.blogCategory.create({ data: { name: 'Guides', slug: 'guides', emoji: '📖', description: 'Comprehensive guides for kitchen setup and operations', sortOrder: 6, status: 'active' } }),
    db.blogCategory.create({ data: { name: 'Company Updates', slug: 'company-updates', emoji: '🏢', description: 'Latest updates from Urban Kitchen', sortOrder: 7, status: 'active' } }),
  ])

  const [bcIndustry, bcTips, bcProduct, bcMaintenance, bcCaseStudies, bcGuides, bcCompany] = blogCategories

  // Get admin user
  const admin = await db.user.findFirst({ where: { email: 'admin@urbankitchens.com' } })
  if (!admin) {
    console.error('Admin user not found. Run the main seed first.')
    process.exit(1)
  }

  // Blog Posts
  const blogPosts = await Promise.all([
    db.blogPost.create({
      data: {
        title: 'Top 5 Commercial Kitchen Design Trends in 2025',
        slug: 'top-5-commercial-kitchen-design-trends-2025',
        excerpt: 'Discover the latest trends shaping commercial kitchen design, from sustainable materials to smart technology integration.',
        content: '<h2>The Future of Commercial Kitchen Design</h2><p>The commercial kitchen industry is evolving rapidly, with new design philosophies and technologies reshaping how professional kitchens operate. Here are the top 5 trends we\'re seeing in 2025:</p><h3>1. Sustainable & Eco-Friendly Materials</h3><p>More kitchens are opting for recycled stainless steel, energy-efficient equipment, and water-saving fixtures.</p><h3>2. Smart Kitchen Technology</h3><p>IoT-enabled equipment is transforming kitchen operations.</p><h3>3. Open Kitchen Concepts</h3><p>The trend toward open kitchens continues to grow.</p><h3>4. Modular & Flexible Layouts</h3><p>Kitchens are being designed with flexibility in mind.</p><h3>5. Enhanced Ventilation & Air Quality</h3><p>Advanced ventilation systems with energy recovery are becoming standard.</p>',
        featuredImage: '/uploads/blog-kitchen-trends.jpg',
        categoryId: bcIndustry.id,
        category: 'Industry News',
        tags: JSON.stringify(['design', 'trends', '2025', 'sustainability']),
        authorId: admin.id,
        status: 'published',
        featured: true,
        seoTitle: 'Top 5 Commercial Kitchen Design Trends in 2025',
        seoDescription: 'Discover the latest trends shaping commercial kitchen design in 2025.',
        publishedAt: new Date('2025-01-15'),
      },
    }),
    db.blogPost.create({
      data: {
        title: 'How to Maintain Your Commercial Refrigeration Equipment',
        slug: 'how-to-maintain-commercial-refrigeration-equipment',
        excerpt: 'Essential maintenance tips to extend the lifespan of your commercial refrigeration units.',
        content: '<h2>Keeping Your Refrigeration Running Smoothly</h2><p>Commercial refrigeration is the backbone of any food service operation. Here\'s how to keep your units running at peak performance.</p><h3>Daily Maintenance</h3><ul><li>Check and record temperatures twice daily</li><li>Ensure door gaskets are clean and sealing properly</li></ul><h3>Weekly Maintenance</h3><ul><li>Clean condenser coils</li><li>Inspect door hinges and latches</li></ul><h3>Monthly Maintenance</h3><ul><li>Deep clean interior surfaces</li><li>Verify thermostat accuracy</li></ul>',
        featuredImage: '/uploads/blog-refrigeration-maintenance.jpg',
        categoryId: bcMaintenance.id,
        category: 'Maintenance',
        tags: JSON.stringify(['refrigeration', 'maintenance', 'tips', 'AMC']),
        authorId: admin.id,
        status: 'published',
        featured: true,
        seoTitle: 'Commercial Refrigeration Maintenance Guide',
        seoDescription: 'Essential maintenance tips for commercial refrigeration equipment.',
        publishedAt: new Date('2025-02-10'),
      },
    }),
    db.blogPost.create({
      data: {
        title: 'SS304 vs SS316: Choosing the Right Steel for Your Kitchen',
        slug: 'ss304-vs-ss316-choosing-right-steel-kitchen',
        excerpt: 'Understanding the differences between SS304 and SS316 stainless steel for commercial kitchen equipment.',
        content: '<h2>SS304 vs SS316: What\'s the Difference?</h2><p>When selecting commercial kitchen equipment, the grade of stainless steel matters.</p><h3>SS304 - The Industry Standard</h3><p>SS304 is the most widely used stainless steel in commercial kitchens.</p><h3>SS316 - Premium Corrosion Resistance</h3><p>SS316 contains molybdenum for superior corrosion resistance.</p><h3>Cost Comparison</h3><p>SS316 typically costs 40-60% more than SS304.</p>',
        featuredImage: '/uploads/blog-steel-grades.jpg',
        categoryId: bcProduct.id,
        category: 'Product Spotlight',
        tags: JSON.stringify(['stainless steel', 'SS304', 'SS316', 'materials']),
        authorId: admin.id,
        status: 'published',
        featured: true,
        seoTitle: 'SS304 vs SS316 Stainless Steel for Kitchen Equipment',
        seoDescription: 'Learn the differences between SS304 and SS316 stainless steel.',
        publishedAt: new Date('2025-03-05'),
      },
    }),
    db.blogPost.create({
      data: {
        title: 'Setting Up a Commercial Kitchen: A Complete Checklist',
        slug: 'setting-up-commercial-kitchen-complete-checklist',
        excerpt: 'Everything you need to know about setting up a commercial kitchen from scratch.',
        content: '<h2>Your Complete Commercial Kitchen Setup Guide</h2><p>Setting up a commercial kitchen is a major undertaking. This comprehensive checklist will help ensure you don\'t miss anything crucial.</p><h3>1. Planning & Design</h3><ul><li>Define your menu and service style</li><li>Calculate required kitchen space</li></ul><h3>2. Preparation Equipment</h3><ul><li>Work tables with undershelves</li><li>Vegetable cutters and processors</li></ul><h3>3. Cooking Equipment</h3><ul><li>Gas ranges</li><li>Tandoors</li></ul><h3>4. Refrigeration</h3><ul><li>Walk-in cold rooms</li><li>Under-counter refrigerators</li></ul>',
        featuredImage: '/uploads/blog-kitchen-setup.jpg',
        categoryId: bcGuides.id,
        category: 'Guides',
        tags: JSON.stringify(['setup', 'checklist', 'new kitchen', 'guide']),
        authorId: admin.id,
        status: 'published',
        featured: false,
        seoTitle: 'Complete Commercial Kitchen Setup Checklist',
        seoDescription: 'Comprehensive checklist for setting up a commercial kitchen from scratch.',
        publishedAt: new Date('2025-03-20'),
      },
    }),
  ])

  console.log('✅ Blog categories created:', blogCategories.length)
  console.log('✅ Blog posts created:', blogPosts.length)
}

seedBlogData()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
