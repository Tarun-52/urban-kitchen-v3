'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowRight, Search, Newspaper, Calendar, User } from 'lucide-react'
import { useAppStore } from '@/lib/store'

/* ─── Types ─── */
interface BlogAuthor {
  id: string
  name: string
  email: string
  avatar: string | null
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  featuredImage: string | null
  category: string | null
  categoryRef?: { id: string; name: string; slug: string; emoji: string | null; color: string | null } | null
  tags: string | null
  status: string
  featured: boolean
  publishedAt: string | null
  createdAt: string
  author: BlogAuthor | null
}

/* ─── Category type ─── */
interface BlogCategory {
  id: string
  name: string
  slug: string
  emoji: string | null
  _count?: { posts: number }
}

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
}

/* ─── Helpers ─── */
const formatDate = (dateStr: string | null) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const getCategoryEmoji = (cat: string | null, categoryRef?: { emoji: string | null } | null) => {
  if (categoryRef?.emoji) return categoryRef.emoji
  if (!cat) return '📰'
  const map: Record<string, string> = {
    'Industry News': '📡',
    'Kitchen Tips': '💡',
    'Product Spotlight': '🔍',
    'Maintenance': '🔧',
    'Case Studies': '📋',
    'Guides': '📖',
    'Company Updates': '🏢',
  }
  return map[cat] || '📰'
}

/* ─── Component ─── */
export default function BlogPage() {
  const { setBlogDetail } = useAppStore()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch categories
  useEffect(() => {
    fetch('/api/blog-categories').then(r => r.json()).then(j => {
      if (j.status) setBlogCategories(j.data?.categories || [])
    }).catch(console.error)
  }, [])

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (debouncedSearch) params.set('search', debouncedSearch)
        if (activeCategory !== 'All') params.set('category', activeCategory)
        params.set('limit', '24')

        const res = await fetch(`/api/blog?${params.toString()}`)
        const data = await res.json()
        if (data.status) {
          setPosts(data.data?.posts || [])
        }
      } catch (err) {
        console.error('Failed to fetch blog posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [debouncedSearch, activeCategory])

  return (
    <div className="min-h-screen bg-[#0b0b0b]">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#59ff00]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#59ff00]/3 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center">
            <motion.div variants={fadeUp} custom={0}>
              <Badge className="bg-[#59ff00]/10 text-[#59ff00] border-[#59ff00]/20 mb-6 px-4 py-1.5 text-sm">
                <Newspaper className="w-3.5 h-3.5 mr-1.5" />
                Urban Kitchen Blog
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
            >
              Insights &{' '}
              <span className="text-[#59ff00] neon-text">Expertise</span>
              <br />
              for Commercial Kitchens
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Stay ahead with the latest industry trends, expert tips, and
              in-depth guides to help you build and maintain the perfect
              commercial kitchen.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeUp} custom={3} className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="bg-[#151515] border-[#2a2a2a] text-white h-12 pl-12 pr-4 text-base rounded-xl focus:border-[#59ff00]/50 focus:ring-[#59ff00]/20 placeholder:text-gray-600"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ CATEGORY TABS ═══════════════════ */}
      <section className="bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide"
          >
            <button
              onClick={() => setActiveCategory('All')}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === 'All'
                  ? 'bg-[#59ff00] text-black shadow-[0_0_15px_rgba(89,255,0,0.3)]'
                  : 'bg-[#151515] text-gray-400 border border-[#2a2a2a] hover:text-white hover:border-[#59ff00]/40'
              }`}
            >
              📰 All
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.name
                    ? 'bg-[#59ff00] text-black shadow-[0_0_15px_rgba(89,255,0,0.3)]'
                    : 'bg-[#151515] text-gray-400 border border-[#2a2a2a] hover:text-white hover:border-[#59ff00]/40'
                }`}
              >
                {cat.emoji || '📰'} {cat.name}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ BLOG GRID ═══════════════════ */}
      <section className="py-10 md:py-16 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden animate-pulse">
                  <div className="h-52 bg-[#1a1a1a]" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-[#1a1a1a] rounded w-1/3" />
                    <div className="h-6 bg-[#1a1a1a] rounded w-3/4" />
                    <div className="h-3 bg-[#1a1a1a] rounded w-full" />
                    <div className="h-3 bg-[#1a1a1a] rounded w-2/3" />
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-8 h-8 rounded-full bg-[#1a1a1a]" />
                      <div className="h-3 bg-[#1a1a1a] rounded w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Newspaper className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-gray-400 text-xl font-semibold mb-2">
                {debouncedSearch || activeCategory !== 'All'
                  ? 'No articles found'
                  : 'No articles published yet'}
              </h3>
              <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                {debouncedSearch || activeCategory !== 'All'
                  ? 'Try adjusting your search or category filter to find what you\'re looking for.'
                  : 'We\'re working on exciting content. Check back soon!'}
              </p>
              {(debouncedSearch || activeCategory !== 'All') && (
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('All')
                  }}
                  variant="outline"
                  className="border-[#59ff00] text-[#59ff00] hover:bg-[#59ff00]/10"
                >
                  Clear Filters
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  variants={fadeUp}
                  custom={i}
                  onClick={() => setBlogDetail(post.id)}
                  className="group bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#59ff00]/30 hover-lift transition-all cursor-pointer"
                >
                  {/* Featured Image */}
                  <div className="relative h-52 bg-[#1a1a1a] overflow-hidden">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-5xl">{getCategoryEmoji(post.category, post.categoryRef)}</span>
                          <span className="text-gray-600 text-xs">Urban Kitchen</span>
                        </div>
                      </div>
                    )}
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-60" />

                    {/* Category Badge */}
                    {post.category && (
                      <Badge className="absolute top-3 left-3 bg-[#0b0b0b]/80 text-[#59ff00] border-[#59ff00]/20 text-xs backdrop-blur-sm">
                        {getCategoryEmoji(post.category, post.categoryRef)} {post.category}
                      </Badge>
                    )}

                    {/* Featured Badge */}
                    {post.featured && (
                      <Badge className="absolute top-3 right-3 bg-[#59ff00]/20 text-[#59ff00] border-[#59ff00]/30 text-xs">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Category + Date row */}
                    <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 group-hover:text-[#59ff00] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Author + Read More */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                      <div className="flex items-center gap-2">
                        {post.author ? (
                          <>
                            <div className="w-7 h-7 rounded-full bg-[#59ff00]/10 border border-[#59ff00]/30 flex items-center justify-center">
                              {post.author.avatar ? (
                                <img
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-[#59ff00] text-xs font-bold">
                                  {post.author.name.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <span className="text-gray-400 text-xs font-medium flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author.name}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-600 text-xs">Urban Kitchen Team</span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-[#59ff00] text-xs font-semibold group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Results count */}
          {!loading && posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-10 text-gray-600 text-sm"
            >
              Showing {posts.length} article{posts.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
              {debouncedSearch && ` matching "${debouncedSearch}"`}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
