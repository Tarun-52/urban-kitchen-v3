'use client'

import { useSyncExternalStore } from 'react'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAppStore, type AppView } from '@/lib/store'

const quickLinks: { label: string; view: AppView }[] = [
  { label: 'Home', view: 'home' },
  { label: 'Products', view: 'products' },
  { label: 'AMC Plans', view: 'amc' },
  { label: 'About Us', view: 'about' },
  { label: 'Contact', view: 'contact' },
]

const productCategories = [
  'Commercial Burners',
  'Cooking Ranges',
  'Refrigeration',
  'Food Preparation',
  'Dishwashing',
  'Display Counters',
]

const emptySubscribe = () => () => {}

export default function Footer() {
  const { setView, setSelectedCategory } = useAppStore()
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category.toLowerCase().replace(/\s+/g, '-'))
    setView('products')
  }

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button onClick={() => setView('home')} className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.jpg"
                alt="Urban Kitchen"
                width={36}
                height={36}
                className="w-8 h-8 rounded-lg object-contain"
              />
              <span className="font-[family-name:var(--font-poppins)] text-lg font-bold">
                <span className="text-[#59ff00]">Urban</span>
                <span className="text-white ml-1">Kitchen</span>
              </span>
            </button>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              India&apos;s leading manufacturer of premium commercial kitchen equipment. 
              Engineering excellence for hotels, restaurants, and catering businesses since 2009.
            </p>
            <div className="flex flex-col gap-2">
              <a href="tel:+917080488840" className="flex items-center gap-2 text-gray-500 hover:text-[#59ff00] text-sm transition-colors">
                <Phone className="w-4 h-4" />
                +91-7080488840
              </a>
              <a href="https://wa.me/917080488840" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-500 hover:text-[#59ff00] text-sm transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#59ff00]" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp: +91-7080488840
              </a>
              <a href="mailto:info@urbankitchens.com" className="flex items-center gap-2 text-gray-500 hover:text-[#59ff00] text-sm transition-colors">
                <Mail className="w-4 h-4" />
                info@urbankitchens.com
              </a>
              <div className="flex items-start gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                Plot No. 45, Sector 12, Industrial Area, New Delhi - 110020
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="w-8 h-0.5 bg-[#59ff00] mb-4" />
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => setView(link.view)}
                    className="text-gray-500 hover:text-[#59ff00] text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setView('login')}
                  className="text-gray-500 hover:text-[#59ff00] text-sm transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Login / Register
                </button>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Products
            </h3>
            <div className="w-8 h-0.5 bg-[#59ff00] mb-4" />
            <ul className="flex flex-col gap-2">
              {productCategories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="text-gray-500 hover:text-[#59ff00] text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-[family-name:var(--font-poppins)] text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Newsletter
            </h3>
            <div className="w-8 h-0.5 bg-[#59ff00] mb-4" />
            <p className="text-gray-500 text-sm mb-4">
              Stay updated with our latest products, offers, and industry insights.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white text-sm h-9"
              />
              <Button className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 h-9 px-3 shrink-0">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-[#151515] border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-[#59ff00] hover:border-[#59ff00]/30 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#151515] border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-[#59ff00] hover:border-[#59ff00]/30 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#151515] border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-[#59ff00] hover:border-[#59ff00]/30 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#151515] border border-[#2a2a2a] flex items-center justify-center text-gray-500 hover:text-[#59ff00] hover:border-[#59ff00]/30 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <Separator className="bg-[#1a1a1a]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>&copy; {mounted ? new Date().getFullYear() : '2025'} Urban Kitchen Manufacturing & Solutions. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button className="hover:text-[#59ff00] transition-colors">Privacy Policy</button>
            <button className="hover:text-[#59ff00] transition-colors">Terms of Service</button>
            <span>GST: 07AABCU9603R1ZM</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
