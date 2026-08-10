'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, User, Newspaper, Clock, Share2, Tag } from 'lucide-react'
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
  seoTitle: string | null
  seoDescription: string | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: BlogAuthor | null
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
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

const formatReadTime = (content: string) => {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
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

const parseTags = (tags: string | null): string[] => {
  if (!tags) return []
  try {
    const parsed = JSON.parse(tags)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch {
    return tags.split(',').map(t => t.trim()).filter(Boolean)
  }
}

/* ─── Component ─── */
export default function BlogDetailPage() {
  const { selectedBlogId, setView, setBlogDetail } = useAppStore()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fetchIdRef = useRef(0)

  useEffect(() => {
    if (!selectedBlogId) return

    const currentFetchId = ++fetchIdRef.current
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      setPost(null)
      setRelated([])

      try {
        const res = await fetch(`/api/blog/${selectedBlogId}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()

        if (cancelled || currentFetchId !== fetchIdRef.current) return

        if (data.status && data.data) {
          setPost(data.data)

          // Fetch related posts by same category
          if (data.data.category) {
            try {
              const relRes = await fetch(`/api/blog?category=${encodeURIComponent(data.data.category)}&limit=4`)
              const relData = await relRes.json()
              if (!cancelled && relData.status) {
                setRelated(
                  (relData.data?.posts || [])
                    .filter((p: BlogPost) => p.id !== selectedBlogId)
                    .slice(0, 3)
                )
              }
            } catch {
              // Related posts are non-critical
            }
          }
        } else {
          setError(data.message || 'Post not found')
        }
      } catch (err) {
        if (!cancelled && currentFetchId === fetchIdRef.current) {
          console.error('Failed to load blog post:', err)
          setError('Failed to load article. Please try again.')
        }
      } finally {
        if (!cancelled && currentFetchId === fetchIdRef.current) {
          setLoading(false)
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [selectedBlogId])

  // ─── Loading State ───
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
          <div className="h-8 bg-[#151515] rounded w-1/4 mb-6" />
          <div className="h-64 md:h-96 bg-[#151515] rounded-xl mb-8" />
          <div className="space-y-4">
            <div className="h-8 bg-[#151515] rounded w-3/4" />
            <div className="flex gap-4">
              <div className="h-4 bg-[#151515] rounded w-32" />
              <div className="h-4 bg-[#151515] rounded w-24" />
            </div>
            <div className="h-4 bg-[#151515] rounded w-full" />
            <div className="h-4 bg-[#151515] rounded w-5/6" />
            <div className="h-4 bg-[#151515] rounded w-4/6" />
            <div className="h-4 bg-[#151515] rounded w-full" />
            <div className="h-4 bg-[#151515] rounded w-3/4" />
          </div>
        </div>
      </div>
    )
  }

  // ─── Not Found State ───
  if (error || !post || !selectedBlogId) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Newspaper className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h2 className="text-gray-400 text-xl font-semibold mb-2">
            {!selectedBlogId ? 'No article selected' : (error || 'Post not found')}
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            The article you&apos;re looking for might have been removed or is temporarily unavailable.
          </p>
          <Button
            onClick={() => setView('blog')}
            className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  const tags = parseTags(post.tags)
  const categoryEmoji = getCategoryEmoji(post.category, post.categoryRef)

  return (
    <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setView('blog')}
          className="flex items-center gap-2 text-gray-500 hover:text-[#59ff00] text-sm mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* ─── MAIN CONTENT ─── */}
          <div className="flex-1 min-w-0">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-64 sm:h-80 md:h-[420px] bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden mb-8"
            >
              {post.featuredImage ? (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-7xl">{categoryEmoji}</span>
                    <span className="text-gray-600 text-sm">Urban Kitchen Blog</span>
                  </div>
                </div>
              )}
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b]/40 via-transparent to-transparent" />

              {/* Category + Featured badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {post.category && (
                  <Badge className="bg-[#0b0b0b]/80 text-[#59ff00] border-[#59ff00]/20 backdrop-blur-sm">
                    {categoryEmoji} {post.category}
                  </Badge>
                )}
                {post.featured && (
                  <Badge className="bg-[#59ff00]/20 text-[#59ff00] border-[#59ff00]/30 backdrop-blur-sm">
                    ⭐ Featured
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Article Header */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.h1
                variants={fadeUp}
                custom={0}
                className="font-[family-name:var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4"
              >
                {post.title}
              </motion.h1>

              {/* Meta row */}
              <motion.div
                variants={fadeUp}
                custom={1}
                className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-[#2a2a2a]"
              >
                {/* Author */}
                <div className="flex items-center gap-2">
                  {post.author ? (
                    <>
                      <div className="w-8 h-8 rounded-full bg-[#59ff00]/10 border border-[#59ff00]/30 flex items-center justify-center">
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
                      <span className="text-gray-300 font-medium">{post.author.name}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-full bg-[#59ff00]/10 border border-[#59ff00]/30 flex items-center justify-center">
                        <User className="w-4 h-4 text-[#59ff00]" />
                      </div>
                      <span className="text-gray-300 font-medium">Urban Kitchen Team</span>
                    </>
                  )}
                </div>

                {/* Date */}
                {post.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </span>
                )}

                {/* Read time */}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {formatReadTime(post.content)}
                </span>

                {/* Share */}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: post.title, url: window.location.href })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                    }
                  }}
                  className="ml-auto flex items-center gap-1.5 text-gray-500 hover:text-[#59ff00] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </motion.div>

              {/* Excerpt */}
              {post.excerpt && (
                <motion.div
                  variants={fadeUp}
                  custom={2}
                  className="text-gray-300 text-lg leading-relaxed mb-8 border-l-2 border-[#59ff00]/40 pl-4 italic"
                >
                  {post.excerpt}
                </motion.div>
              )}

              {/* Content */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="prose-blog"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="text-gray-300 leading-relaxed text-base
                    [&_h1]:text-white [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
                    [&_h2]:text-white [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
                    [&_h3]:text-white [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2
                    [&_p]:mb-4 [&_p]:leading-relaxed
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1
                    [&_li]:text-gray-400 [&_li]:text-sm
                    [&_a]:text-[#59ff00] [&_a]:underline [&_a:hover]:text-[#59ff00]/80
                    [&_blockquote]:border-l-2 [&_blockquote]:border-[#59ff00]/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400 [&_blockquote]:my-4
                    [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full
                    [&_strong]:text-white [&_strong]:font-semibold
                    [&_em]:text-gray-200
                    [&_code]:bg-[#1a1a1a] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[#59ff00] [&_code]:text-sm
                    [&_pre]:bg-[#1a1a1a] [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-4
                    [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                    [&_th]:bg-[#1a1a1a] [&_th]:text-white [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:border [&_th]:border-[#2a2a2a]
                    [&_td]:text-gray-400 [&_td]:px-4 [&_td]:py-2 [&_td]:text-sm [&_td]:border [&_td]:border-[#2a2a2a]
                    [&_hr]:border-[#2a2a2a] [&_hr]:my-6"
                />
              </motion.div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-gray-500" />
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-[#2a2a2a] text-gray-400 text-xs hover:border-[#59ff00]/40 hover:text-[#59ff00] transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom CTA */}
              <div className="mt-10 p-6 bg-[#151515] border border-[#2a2a2a] rounded-xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Enjoyed this article?
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Get in touch for expert kitchen solutions and equipment.
                    </p>
                  </div>
                  <Button
                    onClick={() => setView('contact')}
                    className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold whitespace-nowrap neon-glow"
                  >
                    Contact Us
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── SIDEBAR ─── */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5"
              >
                <h3 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#59ff00]" />
                  About the Author
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#59ff00]/10 border border-[#59ff00]/30 flex items-center justify-center flex-shrink-0">
                    {post.author?.avatar ? (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-[#59ff00] text-lg font-bold">
                        {post.author?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">
                      {post.author?.name || 'Urban Kitchen Team'}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {post.author?.email || 'info@urbankitchen.co.in'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Related Posts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5"
              >
                <h3 className="text-white text-sm font-semibold mb-4 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-[#59ff00]" />
                  Related Articles
                </h3>

                {related.length === 0 ? (
                  <p className="text-gray-600 text-xs">
                    No related articles found.
                  </p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {related.map((relPost) => (
                      <button
                        key={relPost.id}
                        onClick={() => setBlogDetail(relPost.id)}
                        className="w-full flex items-start gap-3 p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#59ff00]/30 transition-all text-left group"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-lg bg-[#151515] flex-shrink-0 overflow-hidden flex items-center justify-center">
                          {relPost.featuredImage ? (
                            <img
                              src={relPost.featuredImage}
                              alt={relPost.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xl">{getCategoryEmoji(relPost.category, relPost.categoryRef)}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-white text-xs font-medium line-clamp-2 group-hover:text-[#59ff00] transition-colors leading-snug">
                            {relPost.title}
                          </h4>
                          {relPost.publishedAt && (
                            <span className="text-gray-600 text-[10px] mt-1 flex items-center gap-1">
                              <Calendar className="w-2.5 h-2.5" />
                              {formatDate(relPost.publishedAt)}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Quick CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden rounded-xl border border-[#59ff00]/20 bg-gradient-to-br from-[#59ff00]/5 via-[#151515] to-[#59ff00]/5 p-5"
              >
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#59ff00] text-xs font-semibold uppercase tracking-wider">
                      Need Expert Help?
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-3 leading-relaxed">
                    Talk to our kitchen design experts for customized solutions.
                  </p>
                  <Button
                    onClick={() => setView('contact')}
                    size="sm"
                    className="w-full bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold text-xs"
                  >
                    Get Free Consultation
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
