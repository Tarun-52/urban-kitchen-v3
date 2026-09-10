'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion'
import {
  Flame,
  ChefHat,
  Snowflake,
  UtensilsCrossed,
  Droplets,
  Monitor,
  Shield,
  Wrench,
  Truck,
  Headphones,
  Star,
  ArrowRight,
  Eye,
  ShoppingCart,
  Quote,
  Phone,
  Newspaper,
  Calendar,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAppStore, type CartItem } from '@/lib/store'
import { toast } from 'sonner'

/* ─── helpers ─── */
const formatPrice = (price: number) => {
  if (price === 0) return 'Request Quote'
  const str = price.toString()
  let lastThree = str.substring(str.length - 3)
  const otherNumbers = str.substring(0, str.length - 3)
  if (otherNumbers !== '') lastThree = ',' + lastThree
  return '₹' + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
}

/* ─── Category order & mapping ─── */
const CATEGORY_ORDER = [
  { slug: 'preparation-equipment', name: 'PREPARATION EQUIPMENTS', emoji: '🔪' },
  { slug: 'preparation-equipments', name: 'PREPARATION EQUIPMENTS', emoji: '🔪' },
  { slug: 'cooking-equipment', name: 'COOKING EQUIPMENTS', emoji: '🔥' },
  { slug: 'cooking-equipments', name: 'COOKING EQUIPMENTS', emoji: '🔥' },
  { slug: 'cooking-ranges', name: 'COOKING EQUIPMENTS', emoji: '🔥' },
  { slug: 'commercial-burners', name: 'COOKING EQUIPMENTS', emoji: '🔥' },
  { slug: 'serving-equipment', name: 'SERVING EQUIPMENTS', emoji: '🍽️' },
  { slug: 'serving-equipments', name: 'SERVING EQUIPMENTS', emoji: '🍽️' },
  { slug: 'washing-equipment', name: 'WASHING EQUIPMENTS', emoji: '🧼' },
  { slug: 'washing-equipments', name: 'WASHING EQUIPMENTS', emoji: '🧼' },
  { slug: 'dishwashing', name: 'WASHING EQUIPMENTS', emoji: '🧼' },
  { slug: 'storage-equipment', name: 'STORAGE EQUIPMENTS', emoji: '📦' },
  { slug: 'storage-equipments', name: 'STORAGE EQUIPMENTS', emoji: '📦' },
  { slug: 'refrigeration-equipment', name: 'REFRIGERATION EQUIPMENTS', emoji: '❄️' },
  { slug: 'refrigeration-equipments', name: 'REFRIGERATION EQUIPMENTS', emoji: '❄️' },
  { slug: 'refrigeration', name: 'REFRIGERATION EQUIPMENTS', emoji: '❄️' },
  { slug: 'bakery-equipment', name: 'BAKERY EQUIPMENTS', emoji: '🍞' },
  { slug: 'bakery-equipments', name: 'BAKERY EQUIPMENTS', emoji: '🍞' },
  { slug: 'display-equipment', name: 'DISPLAY CABINETS', emoji: '🏪' },
  { slug: 'display-equipments', name: 'DISPLAY CABINETS', emoji: '🏪' },
  { slug: 'display-counters', name: 'DISPLAY CABINETS', emoji: '🏪' },
  { slug: 'food-carts', name: 'FOOD CARTS', emoji: '🛒' },
  { slug: 'food-counter', name: 'FOOD CARTS', emoji: '🛒' },
  { slug: 'miscellaneous', name: 'FOOD CARTS', emoji: '🛒' },
]

const categoryIcons: Record<string, React.ReactNode> = {}
const CATEGORY_EMOJIS: Record<string, string> = {}
CATEGORY_ORDER.forEach(c => {
  categoryIcons[c.slug] = <span className="text-3xl">{c.emoji}</span>
  CATEGORY_EMOJIS[c.slug] = c.emoji
})



/* ─── Partner logos for scrolling sections ─── */
const partnerLogos = [
  { name: 'Taj Hotels', image: '/partners/taj-hotels.png' },
  { name: 'ITC Hotels', image: '/partners/itc-hotels.png' },
  { name: 'Oberoi Hotels', image: '/partners/oberoi-hotels.png' },
  { name: 'Marriott', image: '/partners/marriott.png' },
  { name: 'JW Marriott', image: '/partners/jw-marriott.png' },
  { name: 'Hyatt', image: '/partners/hyatt.png' },
  { name: 'Radisson', image: '/partners/radisson.png' },
  { name: 'Novotel', image: '/partners/novotel.png' },
]

const clientLogos = [
  { name: 'Haldirams', image: '/partners/haldirams.png' },
  { name: 'Bikanervala', image: '/partners/bikanervala.png' },
  { name: 'Barbeque Nation', image: '/partners/barbeque-nation.png' },
  { name: 'Sodexo', image: '/partners/sodexo.png' },
  { name: 'KFC', image: '/partners/kfc.png' },
  { name: 'Dominos', image: '/partners/dominos.png' },
  { name: 'Taj Hotels', image: '/partners/taj-hotels.png' },
  { name: 'ITC Hotels', image: '/partners/itc-hotels.png' },
]

/* ─── Counter animation component ─── */
function StatCounter({ end, label, className }: { end: number; label: string; className?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const duration = 2000
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [end])

  return (
    <div ref={ref} className={className}>
      <div className="font-[family-name:var(--font-poppins)] text-2xl md:text-4xl font-bold text-[#59ff00]">
        {count}+
      </div>
      <div className="text-gray-500 text-xs md:text-sm mt-1">{label}</div>
    </div>
  )
}

/* ─── Product type ─── */
interface Product {
  id: string
  name: string
  slug: string
  price: number
  shortDescription?: string | null
  steelGrade?: string | null
  capacity?: string | null
  stock: number
  featured?: boolean
  status: string
  featuredImage?: string | null
  category: { id: string; name: string; slug: string }
  images?: { image: string }[]
}

interface Category {
  id: string
  name: string
  slug: string
  _count?: { products: number }
  displayName?: string
  productCount?: number
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

/* ─── MarqueeScroll component (auto-scrolling infinite marquee) ─── */
function MarqueeScroll({
  children,
  direction = 'left',
  speed = 25
}: {
  children: React.ReactNode
  direction?: 'left' | 'right'
  speed?: number
}) {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="flex w-max"
      style={{
        animation: `${direction === 'left' ? 'marqueeLeft' : 'marqueeRight'} ${speed}s linear infinite`,
        animationPlayState: isPaused ? 'paused' : 'running',
      }}
    >
      {children}
    </div>
  )
}

/* ─── Component ─── */
export default function HomePage() {
  const { setView, setProductDetail, addToCart, setSelectedCategory, setBlogDetail } = useAppStore()
  const [categories, setCategories] = useState<Category[]>([])
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [featuredBlogs, setFeaturedBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)




  useEffect(() => {
    const loadData = async () => {
      try {
        const [catRes, prodRes, blogRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products?featured=true&limit=8'),
          fetch('/api/blog?featured=true&limit=3'),
        ])
        const catData = await catRes.json()
        const prodData = await prodRes.json()
        const blogData = await blogRes.json()
        if (catData.status) {
          const rawCats = catData.data || []
          // Merge categories with same display name
          const mergedMap: Record<string, any> = {}
          rawCats.forEach((cat: any) => {
            const orderInfo = CATEGORY_ORDER.find(o => o.slug === cat.slug)
            const displayName = orderInfo?.name || cat.name
            if (!mergedMap[displayName]) {
              mergedMap[displayName] = { ...cat, displayName, productCount: cat._count?.products || 0 }
            } else {
              mergedMap[displayName].productCount += cat._count?.products || 0
            }
          })
          // Sort by CATEGORY_ORDER
          const sorted = Object.values(mergedMap).sort((a: any, b: any) => {
            const aIdx = CATEGORY_ORDER.findIndex(o => o.slug === a.slug)
            const bIdx = CATEGORY_ORDER.findIndex(o => o.slug === b.slug)
            return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx)
          })
          setCategories(sorted)
        }
        if (prodData.status) setFeaturedProducts(prodData.data?.products || [])
        if (blogData.status) setFeaturedBlogs(blogData.data?.posts || [])
      } catch (err) {
        console.error('Failed to load homepage data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const handleAddToCart = useCallback((product: Product) => {
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.featuredImage || null,
      stock: product.stock,
    })
    toast.success(`${product.name} added to cart`)
  }, [addToCart])

  const handleCategoryClick = useCallback((slug: string) => {
    setSelectedCategory(slug)
    setView('products')
  }, [setSelectedCategory, setView])

  return (
    <div className="min-h-screen">
      {/* ═══════════════════ HERO ═══════════════════ */}
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero-section.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-dark-bg/40" />
        <div className="absolute inset-0 bg-linear-to-b from-dark-bg/30 via-transparent to-dark-bg/40" />

        {/* Decorative glow */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#59ff00]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-[#59ff00]/3 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} custom={0}>
              <Badge className="bg-[#59ff00]/10 text-[#59ff00] border-[#59ff00]/20 mb-3 px-2.5 py-0.5 text-[10px] sm:text-xs">
                <Flame className="w-3 h-3 mr-1" />
                Premium Commercial Kitchen Equipment
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-[family-name:var(--font-poppins)] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-extrabold leading-tight mb-3 sm:mb-4"
            >
              Powering{' '}
              <span className="text-[#59ff00] neon-text">Professional Kitchens</span>
              <br />
              With Precision. Performance. Perfection.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-gray-400 text-xs sm:text-sm md:text-base max-w-lg mx-auto mb-5 sm:mb-6 leading-relaxed"
            >
              From heavy-duty burners to walk-in cold rooms — we manufacture
              precision-engineered stainless steel equipment trusted by India&apos;s
              top hotels, restaurants, and catering businesses.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3"
            >
              <Button
                onClick={() => setView('products')}
                className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold px-5 sm:px-6 h-9 sm:h-10 text-xs sm:text-sm neon-glow"
              >
                Explore Products
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
              <Button
                onClick={() => setView('contact')}
                variant="outline"
                className="border-[#59ff00] text-[#59ff00] hover:bg-[#59ff00]/10 font-semibold px-5 sm:px-6 h-9 sm:h-10 text-xs sm:text-sm"
              >
                Request a Quote
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-3 gap-2 sm:gap-3 md:gap-6 max-w-lg mx-auto"
          >
            <StatCounter end={500} label="Projects Delivered" className="glass rounded-lg p-2 sm:p-3 md:p-4 text-center hover-lift" />
            <StatCounter end={15} label="Years Experience" className="glass rounded-lg p-2 sm:p-3 md:p-4 text-center hover-lift" />
            <StatCounter end={200} label="Products Range" className="glass rounded-lg p-2 sm:p-3 md:p-4 text-center hover-lift" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-[#59ff00]/30 flex items-start justify-center p-0.5">
            <div className="w-1 h-2.5 bg-[#59ff00] rounded-full" />
          </div>
        </motion.div>
      </section>






      {/* ═══════════════════ CATEGORIES ═══════════════════ */}

      <section className="py-16 md:py-20 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header with View All Button */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-10"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Our Product <span className="text-[#59ff00]">Categories</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 max-w-xl mx-auto mb-6">
              Explore our comprehensive range of commercial kitchen equipment
            </motion.p>

            <motion.button
              variants={fadeUp}
              custom={2}
              onClick={() => handleCategoryClick('')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#59ff00] border border-[#59ff00]/30 rounded-full px-5 py-2.5 hover:bg-[#59ff00]/10 hover:border-[#59ff00]/60 transition-all duration-300 group mx-auto"
            >
              View All Categories
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </motion.button>
          </motion.div>

          {/* Category Grid */}
          {(() => {
            const orderedCategories = [
              {
                slug: 'preparation-equipment',
                displayName: 'Preparation Equipments',
                matchSlugs: ['preparation-equipment', 'food-preparation'],
                image: '/products/PREPRATION EQUIPMENTS.jpg',
                emoji: '🔪',
                description: 'High-performance prep tables and slicers designed to streamline your kitchen workflow.',
              },
              {
                slug: 'cooking-equipment',
                displayName: 'Cooking Equipments',
                matchSlugs: ['cooking-equipment', 'cooking-ranges', 'commercial-burners'],
                image: '/products/COOKING EQUIPMENTS.jpg',
                emoji: '🔥',
                description: 'Heavy-duty ranges, ovens, and fryers built to withstand high-volume commercial cooking with precision heat control.',
              },
              {
                slug: 'serving-equipment',
                displayName: 'Serving Equipments',
                matchSlugs: ['serving-equipment'],
                image: '/products/SERVING EQUIPMENTS.jpg',
                emoji: '🍽️',
                description: 'Elegant serving counters, warmers, and buffet units designed to keep food fresh and presentable for your guests.',
              },
              {
                slug: 'washing-equipment',
                displayName: 'Washing Equipments',
                matchSlugs: ['washing-equipment', 'dishwashing'],
                image: '/products/WASHING EQUIPMENTS.jpg',
                emoji: '💧',
                description: 'Industrial dishwashers and stainless steel sinks ensuring fast, hygienic, and efficient cleaning for your kitchen.',
              },
              {
                slug: 'storage-equipment',
                displayName: 'Storage Equipments',
                matchSlugs: ['storage-equipment'],
                image: '/products/STORAGE EQUIPMENTS.jpg',
                emoji: '📦',
                description: 'Robust shelving units and airtight containers to organize your ingredients safely and optimize kitchen space.',
              },
              {
                slug: 'refrigeration-equipment',
                displayName: 'Refrigeration Equipments',
                matchSlugs: ['refrigeration-equipment', 'refrigeration'],
                image: '/products/REFRIGERATION EQUIPMENTS.jpg',
                emoji: '❄️',
                description: 'Premium commercial freezers and chillers designed to keep your perishables fresh, safe, and compliant with standards.',
              },
              {
                slug: 'bakery-equipment',
                displayName: 'Bakery Equipments',
                matchSlugs: ['bakery-equipment'],
                image: '/products/BAKERY EQUIPMENTS.jpg',
                emoji: '🍞',
                description: 'Professional ovens, proofers, and dough mixers engineered for artisanal and high-volume commercial baking.',
              },
              {
                slug: 'display-equipment',
                displayName: 'Display Cabinets',
                matchSlugs: ['display-equipment', 'display-counters'],
                image: '/products/DISPLAY CABINETS.jpg',
                emoji: '🛒',
                description: 'Stunning display cases with optimal temperature control and elegant lighting to showcase your finest delicacies.',
              },
              {
                slug: 'food-carts',
                displayName: 'Food Carts',
                matchSlugs: ['food-carts'],
                image: '/products/Food carts.jpg',
                emoji: '🛗',
                description: 'Mobile, versatile, and compact cart units perfect for catering, outdoor events, and dynamic kitchen spaces.',
              },
            ]

            const items = orderedCategories.map((oc) => {
              const match = categories.find((cat) => oc.matchSlugs.includes(cat.slug))
              return {
                slug: oc.slug,
                displayName: oc.displayName,
                productCount: match?._count?.products ?? 0,
                id: match?.id ?? oc.slug,
                image: oc.image,
                emoji: oc.emoji,
                description: oc.description,
              }
            })

            return (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    // Group class for hover state, perspective to enable 3D space
                    className="group relative w-full aspect-square [perspective:1000px]"
                  >
                    {/* Inner container that actually flips */}
                    <div className="relative w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)]">

                      {/* --- FRONT FACE --- */}
                      <div className="absolute inset-0 [backface-visibility:hidden]">
                        <button
                          onClick={() => handleCategoryClick(item.slug)}
                          className="group relative block w-full h-full rounded-2xl overflow-hidden bg-[#111] border border-white/5 transition-all duration-500 ease-out hover:border-[#59ff00]/40 hover:shadow-[0_15px_40px_-10px_rgba(89,255,0,0.25)] md:hover:scale-100 hover:-translate-y-1"
                        >
                          {/* Background Image - Zooms on Hover */}
                          <div className="absolute inset-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.displayName}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none'
                                }}
                              />
                            ) : null}
                          </div>

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent"></div>

                          {/* Floating Glassmorphism Icon Badge */}
                          <div className="absolute top-3 left-3 w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-xl transition-transform duration-300 group-hover:scale-90 group-hover:bg-[#59ff00]/20 group-hover:border-[#59ff00]/50">
                            {item.emoji}
                          </div>

                          {/* Bottom Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                            <h3 className="text-white text-sm md:text-base font-bold leading-tight mb-1 transition-colors duration-300 group-hover:text-[#59ff00]">
                              {item.displayName}
                            </h3>
                            <div className="flex items-center justify-between mt-2 overflow-hidden">
                              <span className="text-gray-400 text-[10px] md:text-xs font-medium">
                                {item.productCount} {item.productCount === 1 ? 'Product' : 'Products'}
                              </span>
                              <span className="flex items-center gap-1 text-[#59ff00] text-[10px] md:text-xs font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                View
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                              </span>
                            </div>
                          </div>

                          {/* Bottom green accent line */}
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#59ff00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </button>
                      </div>

                      {/* --- BACK FACE --- */}
                      <button
                        onClick={() => handleCategoryClick(item.slug)}
                        className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] hidden md:flex flex-col justify-between p-5 rounded-2xl bg-[#111] border border-[#59ff00]/40 shadow-[0_15px_40px_-10px_rgba(89,255,0,0.35)] overflow-hidden"
                      >
                        {/* Decorative Background Watermark Emoji */}
                        <div className="absolute -bottom-5 -right-5 text-9xl opacity-5 select-none rotate-12 pointer-events-none">
                          {item.emoji}
                        </div>

                        {/* Top Content */}
                        <div className="relative z-10">
                          <div className="w-12 h-12 mb-4 flex items-center justify-center bg-[#59ff00]/10 border border-[#59ff00]/30 rounded-xl text-2xl">
                            {item.emoji}
                          </div>
                          <h3 className="text-white text-lg font-bold mb-2 leading-tight">
                            {item.displayName}
                          </h3>
                          <p className="text-gray-400 text-xs leading-relaxed font-medium">
                            {item.description}
                          </p>
                        </div>

                        {/* Bottom CTA */}
                        <div className="relative z-10 flex items-center justify-between text-[#59ff00] mt-4 pt-3 border-t border-white/5">
                          <span className="text-xs font-bold">{item.productCount} Products</span>
                          <span className="flex items-center gap-1 text-xs font-bold">
                            Explore Now
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                        </div>
                      </button>

                    </div>
                  </motion.div>
                ))}
              </div>
            )
          })()}
        </div>
      </section>

      {/* ═══════════════════ FEATURED PRODUCTS ═══════════════════ */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4"
          >
            <div>
              <motion.h2 variants={fadeUp} custom={0} className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Featured <span className="text-[#59ff00]">Products</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-gray-500">
                Handpicked premium equipment for your commercial kitchen
              </motion.p>
            </div>
            <motion.div variants={fadeUp} custom={2}>
              <Button
                onClick={() => setView('products')}
                variant="outline"
                className="border-[#59ff00] text-[#59ff00] hover:bg-[#59ff00]/10"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-[#151515] border border-[#2a2a2a] rounded-xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#59ff00]/30 hover-lift transition-all"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                    {product.featuredImage ? (
                      <img src={product.featuredImage} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-5xl">{CATEGORY_EMOJIS[product.category.slug] || '🔧'}</span>
                        <span className="text-gray-600 text-xs">{product.category.name}</span>
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <Button
                        size="sm"
                        onClick={() => setProductDetail(product.id)}
                        className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 h-9"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Quick View
                      </Button>
                    </div>
                    {/* Category badge */}
                    <Badge className="absolute top-3 left-3 bg-[#0b0b0b]/80 text-gray-300 border-[#2a2a2a] text-xs">
                      {CATEGORY_EMOJIS[product.category.slug] || ''} {product.category.name}
                    </Badge>
                    {product.featured && (
                      <Badge className="absolute top-3 right-3 bg-[#59ff00]/20 text-[#59ff00] border-[#59ff00]/30 text-xs">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-[#59ff00] transition-colors">
                      {CATEGORY_EMOJIS[product.category.slug] || '🔧'} {product.name}
                    </h3>
                    {product.shortDescription && (
                      <p className="text-gray-500 text-xs mb-2 line-clamp-2">{product.shortDescription}</p>
                    )}
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                      {product.steelGrade && <span className="bg-[#1a1a1a] px-2 py-0.5 rounded">🔩 {product.steelGrade}</span>}
                      {product.capacity && <span className="bg-[#1a1a1a] px-2 py-0.5 rounded">📦 {product.capacity}</span>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-[family-name:var(--font-poppins)] text-[#59ff00] font-bold text-lg">
                        {formatPrice(product.price)}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 h-8 px-3 text-xs"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ WHY CHOOSE US ═══════════════════ */}
      <section className="py-16 md:py-24 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Why Choose <span className="text-[#59ff00]">Urban Kitchen</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 max-w-xl mx-auto">
              We deliver more than equipment — we deliver reliability
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Premium Steel',
                desc: 'All products crafted from SS304/SS316 grade stainless steel ensuring durability and hygiene compliance.',
              },
              {
                icon: <Wrench className="w-8 h-8" />,
                title: 'Custom Solutions',
                desc: 'Tailor-made kitchen setups designed to your specifications, space, and operational needs.',
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Pan India Delivery',
                desc: 'Reliable delivery and installation across India with dedicated logistics partners.',
              },
              {
                icon: <Headphones className="w-8 h-8" />,
                title: 'AMC Support',
                desc: 'Comprehensive Annual Maintenance Contracts with 48-hour service guarantee across India.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-[#151515] border border-[#2a2a2a] rounded-xl p-6 text-center hover:border-[#59ff00]/30 hover-lift transition-all"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[#59ff00]/10 flex items-center justify-center text-[#59ff00] group-hover:bg-[#59ff00]/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-white font-[family-name:var(--font-poppins)] font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ AMC BANNER ═══════════════════ */}
      <section className="py-12 md:py-16 bg-[#0b0b0b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-[#59ff00]/20 bg-gradient-to-r from-[#59ff00]/5 via-[#151515] to-[#59ff00]/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-[#59ff00]" />
                <span className="text-[#59ff00] text-xs font-semibold uppercase tracking-wider">Annual Maintenance Contract</span>
              </div>
              <h3 className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl font-bold text-white mb-2">
                Protect Your Investment with <span className="text-[#59ff00]">Urban Kitchen AMC</span>
              </h3>
              <p className="text-gray-400 text-sm md:text-base max-w-xl">
                Keep your kitchen running at peak performance. Our AMC plans cover preventive maintenance, emergency repairs, and genuine spare parts — all with priority response.
              </p>
            </div>
            <button
              onClick={() => setView('amc')}
              className="relative z-10 flex items-center gap-2 bg-[#59ff00] text-black font-semibold px-6 py-3 rounded-lg hover:bg-[#59ff00]/90 transition-all shadow-[0_0_20px_rgba(89,255,0,0.3)] hover:shadow-[0_0_30px_rgba(89,255,0,0.5)] whitespace-nowrap"
            >
              Explore AMC Plans <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Trusted by <span className="text-[#59ff00]">Industry Leaders</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-gray-500 max-w-xl mx-auto">
              See what our clients say about working with us
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Anand Restaurant',
                role: 'Restaurant Chain Owner',
                text: 'Urban Kitchen equipped all 12 of our outlets. The build quality is exceptional and their after-sales support is unmatched in the industry.',
                rating: 5,
              },
              {
                name: 'Hotel Sunrise',
                role: 'Hotel Operations Manager',
                text: 'From walk-in cold rooms to display counters — everything was delivered on time and installed perfectly. Truly professional team.',
                rating: 5,
              },
              {
                name: 'Spice Garden Catering',
                role: 'Catering Business Owner',
                text: 'The custom tandoor range they built for us was exactly what we needed. Their AMC plan gives us complete peace of mind.',
                rating: 5,
              },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 hover-lift"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#59ff00] text-[#59ff00]" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#59ff00]/20 mb-2" />
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{item.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#59ff00]/10 flex items-center justify-center text-[#59ff00] font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{item.name}</div>
                    <div className="text-gray-500 text-xs">{item.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ OUR PARTNERS (Above CTA) ═══════════════════ */}
      <section className="py-12 md:py-16 bg-[#0d0d0d] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Our <span className="text-[#59ff00]">Trusted Partners</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Powering kitchens for India&apos;s leading hospitality brands
          </p>
        </motion.div>

        {/* Scrolling Row 1 - Left direction */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

          <MarqueeScroll direction="left" speed={25}>
            {[...partnerLogos, ...partnerLogos].map((partner, i) => (
              <div
                key={`row1-${i}`}
                className="flex-shrink-0 mx-4 md:mx-6 group"
              >
                <div className="w-36 h-28 md:w-44 md:h-32 bg-[#151515] border border-[#2a2a2a] rounded-xl flex items-center justify-center overflow-hidden hover:border-[#59ff00]/30 transition-all duration-300 hover-lift">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-contain p-3 md:p-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </MarqueeScroll>
        </div>
      </section>

      {/* ═══════════════════ CTA SECTION ═══════════════════ */}
      <section className="py-16 md:py-24 bg-[#0b0b0b] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#59ff00]/5 rounded-full blur-[150px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Ready to Upgrade Your <span className="text-[#59ff00]">Kitchen</span>?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Get a free consultation and customized quote for your commercial kitchen setup.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => setView('contact')}
              className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold px-8 h-12 text-base neon-glow"
            >
              Contact Us Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a href="tel:+917080488840" className="text-gray-400 hover:text-[#59ff00] text-sm flex items-center gap-2 transition-colors">
              <Phone className="w-4 h-4" />
              +91-7080488840
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ OUR PARTNERS (Below CTA) ═══════════════════ */}
      <section className="py-12 md:py-16 bg-[#0b0b0b] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl lg:text-3xl font-bold mb-2">
            Our <span className="text-[#59ff00]">Valued Clients</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Trusted by top restaurants, hotels, and catering businesses across India
          </p>
        </motion.div>

        {/* Scrolling Row 2 - Right direction */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10 pointer-events-none" />

          <MarqueeScroll direction="right" speed={30}>
            {[...clientLogos, ...clientLogos].map((client, i) => (
              <div
                key={`row2-${i}`}
                className="flex-shrink-0 mx-4 md:mx-6 group"
              >
                <div className="w-36 h-28 md:w-44 md:h-32 bg-[#151515] border border-[#2a2a2a] rounded-xl flex items-center justify-center overflow-hidden hover:border-[#59ff00]/30 transition-all duration-300 hover-lift">
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-full h-full object-contain p-3 md:p-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </div>
            ))}
          </MarqueeScroll>
        </div>
      </section>

      {/* ═══════════════════ LATEST FROM OUR BLOG ═══════════════════ */}
      {featuredBlogs.length > 0 && (
        <section className="py-16 md:py-24 bg-[#0d0d0d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={stagger}
              className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4"
            >
              <div>
                <motion.h2 variants={fadeUp} custom={0} className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                  Latest from our <span className="text-[#59ff00]">Blog</span>
                </motion.h2>
                <motion.p variants={fadeUp} custom={1} className="text-gray-500">
                  Insights, tips, and news from the commercial kitchen industry
                </motion.p>
              </div>
              <motion.div variants={fadeUp} custom={2}>
                <Button
                  onClick={() => setView('blog')}
                  variant="outline"
                  className="border-[#59ff00] text-[#59ff00] hover:bg-[#59ff00]/10"
                >
                  View All Posts
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBlogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-neon/30 hover-lift transition-all cursor-pointer"
                  onClick={() => setBlogDetail(blog.id)}
                >
                  {/* Image */}
                  <div className="relative h-48 bg-dark-surface overflow-hidden">
                    {blog.featuredImage ? (
                      <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Newspaper className="w-12 h-12 text-neon/30" />
                      </div>
                    )}
                    {blog.category && (
                      <Badge className="absolute top-3 left-3 bg-neon/20 text-neon border-neon/30 text-xs">
                        {blog.category}
                      </Badge>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      {blog.author && (
                        <span className="flex items-center gap-1">
                          <span className="w-5 h-5 rounded-full bg-neon/10 flex items-center justify-center text-neon text-[10px] font-bold">
                            {blog.author.name?.charAt(0) || 'U'}
                          </span>
                          {blog.author.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : new Date(blog.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-base mb-2 line-clamp-2 group-hover:text-neon transition-colors">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="text-gray-500 text-sm line-clamp-2 mb-3">{blog.excerpt}</p>
                    )}
                    <span className="text-neon text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}