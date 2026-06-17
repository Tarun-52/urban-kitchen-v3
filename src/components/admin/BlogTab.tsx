'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Plus, Search, Edit, Trash2, Newspaper, Upload, X, ImageIcon,
  Check, FileText, Tag, Globe, FolderPlus,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { statusBadgeCls, fmtDate } from './types'
import { toast } from 'sonner'

// ─── Blog Status Badge ──────────────────────────────────────
const blogStatusBadge = (s: string) => {
  const m: Record<string, string> = {
    draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    published: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    archived: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  }
  return m[s] || statusBadgeCls(s)
}

// ─── Category interface ─────────────────────────────────────
interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string | null
  emoji: string | null
  color: string | null
  sortOrder: number
  status: string
  _count?: { posts: number }
}

// ─── Props Interface ────────────────────────────────────────
interface BlogTabProps {
  blogs: any[]
  searchQuery: string
  onSearchChange: (q: string) => void
  statusFilter: string
  onStatusFilterChange: (s: string) => void
  openNew: () => void
  openEdit: (blog: any) => void
  handleDelete: (id: string) => void
  // Sheet / form state
  blogDialog: boolean
  setBlogDialog: (v: boolean) => void
  blogForm: any
  setBlogForm: (v: any) => void
  handleSaveBlog: () => void
  editBlog: any | null
  handleImageUpload: (file: File) => Promise<string | null>
}

// ─── Component ──────────────────────────────────────────────
export default function BlogTab({
  blogs,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  openNew,
  openEdit,
  handleDelete,
  blogDialog,
  setBlogDialog,
  blogForm,
  setBlogForm,
  handleSaveBlog,
  editBlog,
  handleImageUpload,
}: BlogTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = React.useState(false)

  // ─── Dynamic Categories ────────────────────────────────
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [categoryDialog, setCategoryDialog] = useState(false)
  const [categoryForm, setCategoryForm] = useState({
    name: '', slug: '', description: '', emoji: '', color: '', sortOrder: 0, status: 'active',
  })
  const [editCategory, setEditCategory] = useState<BlogCategory | null>(null)

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/blog-categories?all=true')
      const data = await res.json()
      if (data.status) {
        setCategories(data.data?.categories || [])
      }
    } catch (err) {
      console.error('Failed to fetch blog categories:', err)
    }
  }

  useEffect(() => { fetchCategories() }, [])

  // Category CRUD
  const openNewCategory = () => {
    setEditCategory(null)
    setCategoryForm({ name: '', slug: '', description: '', emoji: '📰', color: '', sortOrder: categories.length + 1, status: 'active' })
    setCategoryDialog(true)
  }

  const openEditCategory = (cat: BlogCategory) => {
    setEditCategory(cat)
    setCategoryForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      emoji: cat.emoji || '',
      color: cat.color || '',
      sortOrder: cat.sortOrder,
      status: cat.status,
    })
    setCategoryDialog(true)
  }

  const handleSaveCategory = async () => {
    if (!categoryForm.name) {
      toast.error('Category name is required')
      return
    }
    try {
      const url = editCategory ? `/api/blog-categories/${editCategory.id}` : '/api/blog-categories'
      const method = editCategory ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm),
      })
      const json = await res.json()
      if (json.status) {
        setCategoryDialog(false)
        setEditCategory(null)
        fetchCategories()
        toast.success(editCategory ? 'Category updated' : 'Category created')
      } else {
        toast.error(json.message || 'Failed to save category')
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to save category')
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category? Blog posts in this category will have their category removed.')) return
    try {
      await fetch(`/api/blog-categories/${id}`, { method: 'DELETE' })
      fetchCategories()
      toast.success('Category deleted')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete category')
    }
  }

  // Auto-generate slug from category name
  const handleCategoryNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
    setCategoryForm({ ...categoryForm, name, slug: editCategory ? categoryForm.slug : slug })
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await handleImageUpload(file)
      if (url) {
        setBlogForm({ ...blogForm, featuredImage: url })
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    setBlogForm({ ...blogForm, title, slug: editBlog ? blogForm.slug : slug })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      {/* ─── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-[#59ff00]" />
          <h2 className="text-white text-xl font-bold">Blog Posts</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={openNewCategory}
            variant="outline"
            className="border-[#59ff00] text-[#59ff00] hover:bg-[#59ff00]/10 font-semibold"
          >
            <FolderPlus className="w-4 h-4 mr-1" /> Add Category
          </Button>
          <Button
            onClick={openNew}
            className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Blog Post
          </Button>
        </div>
      </div>

      {/* ─── Categories Strip ─────────────────────────────────── */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <span className="text-gray-500 text-xs flex-shrink-0">Categories:</span>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-1.5 bg-[#151515] border border-[#2a2a2a] rounded-lg px-3 py-1.5 group hover:border-[#59ff00]/30 transition-all"
            >
              <span className="text-sm">{cat.emoji || '📰'}</span>
              <span className="text-gray-300 text-xs font-medium">{cat.name}</span>
              <span className="text-gray-600 text-[10px]">({cat._count?.posts || 0})</span>
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                <button
                  onClick={() => openEditCategory(cat)}
                  className="text-blue-400 hover:text-blue-300 p-0.5"
                >
                  <Edit className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="text-red-400 hover:text-red-300 p-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Filters ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search blog posts..."
            className="pl-9 bg-[#181818] border-[#2a2a2a] text-white placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-48 bg-[#181818] border-[#2a2a2a] text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#181818] border-[#2a2a2a]">
            <SelectItem value="all" className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]">All Statuses</SelectItem>
            <SelectItem value="draft" className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]">Draft</SelectItem>
            <SelectItem value="published" className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]">Published</SelectItem>
            <SelectItem value="archived" className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ─── Blog Table ─────────────────────────────────────── */}
      <Card className="bg-[#181818] border-[#2a2a2a]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                  <TableHead className="text-gray-400">Image</TableHead>
                  <TableHead className="text-gray-400">Title</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Author</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog: any) => (
                  <TableRow key={blog.id} className="border-[#2a2a2a] hover:bg-white/5">
                    {/* Image */}
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg bg-[#2a2a2a] flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {blog.featuredImage ? (
                          <Image
                            src={blog.featuredImage}
                            alt={blog.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Newspaper className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </TableCell>
                    {/* Title + Featured */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-white text-sm font-medium line-clamp-1">{blog.title}</p>
                          <p className="text-gray-500 text-xs font-mono">{blog.slug}</p>
                        </div>
                        {blog.featured && (
                          <Badge className="bg-[#59ff00]/10 text-[#59ff00] border-[#59ff00]/30 text-[10px] flex-shrink-0">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    {/* Category */}
                    <TableCell>
                      <Badge className="bg-[#59ff00]/10 text-[#59ff00] border-[#59ff00]/30 text-[10px]">
                        {blog.categoryRef?.emoji || ''} {blog.category || blog.categoryRef?.name || '—'}
                      </Badge>
                    </TableCell>
                    {/* Status */}
                    <TableCell>
                      <Badge className={blogStatusBadge(blog.status)}>{blog.status}</Badge>
                    </TableCell>
                    {/* Author */}
                    <TableCell className="text-gray-300 text-sm">
                      {blog.author?.name || '—'}
                    </TableCell>
                    {/* Date */}
                    <TableCell className="text-gray-400 text-sm">
                      {fmtDate(blog.createdAt || blog.publishedAt)}
                    </TableCell>
                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(blog)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-8 w-8 p-0"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(blog.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {blogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-12">
                      <div className="flex flex-col items-center gap-2">
                        <Newspaper className="w-10 h-10 text-gray-600" />
                        <p className="text-gray-400 font-medium">No blog posts found</p>
                        <p className="text-gray-600 text-sm">Create your first blog post to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ─── Blog Post Sheet (Create / Edit) ─────────────────── */}
      <Sheet open={blogDialog} onOpenChange={setBlogDialog}>
        <SheetContent
          side="right"
          className="bg-[#181818] border-[#2a2a2a] text-white w-full sm:max-w-2xl overflow-y-auto p-0"
        >
          <SheetHeader className="p-6 pb-0">
            <SheetTitle className="text-white text-lg">
              {editBlog ? 'Edit Blog Post' : 'New Blog Post'}
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              {editBlog ? 'Update the blog post details below.' : 'Fill in the details to create a new blog post.'}
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue="content" className="w-full px-6 mt-4">
            <TabsList className="bg-[#0b0b0b] border border-[#2a2a2a] w-full">
              <TabsTrigger
                value="content"
                className="data-[state=active]:bg-[#59ff00]/10 data-[state=active]:text-[#59ff00] flex-1 gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" /> Content
              </TabsTrigger>
              <TabsTrigger
                value="media"
                className="data-[state=active]:bg-[#59ff00]/10 data-[state=active]:text-[#59ff00] flex-1 gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" /> Media
              </TabsTrigger>
              <TabsTrigger
                value="seo"
                className="data-[state=active]:bg-[#59ff00]/10 data-[state=active]:text-[#59ff00] flex-1 gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" /> SEO
              </TabsTrigger>
            </TabsList>

            {/* ─── Content Tab ──────────────────────────────────── */}
            <TabsContent value="content" className="space-y-4 mt-4">
              {/* Title */}
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Title *</Label>
                <Input
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white"
                  placeholder="Enter blog post title"
                  value={blogForm?.title || ''}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Slug</Label>
                <Input
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white font-mono text-sm"
                  placeholder="auto-generated-from-title"
                  value={blogForm?.slug || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                />
                <p className="text-gray-600 text-[10px]">URL-friendly identifier. Auto-generated from title.</p>
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Excerpt</Label>
                <Textarea
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white resize-none"
                  rows={2}
                  placeholder="Brief summary of the blog post..."
                  value={blogForm?.excerpt || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                />
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Content *</Label>
                <Textarea
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white resize-none"
                  rows={10}
                  placeholder="Write your blog post content here. Supports Markdown and HTML..."
                  value={blogForm?.content || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                />
                <p className="text-gray-600 text-[10px]">Supports Markdown and HTML formatting</p>
              </div>

              <Separator className="bg-[#2a2a2a]" />

              {/* Category + Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Category *</Label>
                  <Select
                    value={blogForm?.categoryId || blogForm?.category || ''}
                    onValueChange={(v) => {
                      const selectedCat = categories.find(c => c.id === v)
                      setBlogForm({
                        ...blogForm,
                        categoryId: v,
                        category: selectedCat?.name || v,
                      })
                    }}
                  >
                    <SelectTrigger className="bg-[#0b0b0b] border-[#2a2a2a] text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                      {categories.filter(c => c.status === 'active').map((cat) => (
                        <SelectItem
                          key={cat.id}
                          value={cat.id}
                          className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]"
                        >
                          {cat.emoji || '📰'} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <button
                    type="button"
                    onClick={openNewCategory}
                    className="text-[#59ff00] text-[10px] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add new category
                  </button>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300 text-sm">Status</Label>
                  <Select
                    value={blogForm?.status || 'draft'}
                    onValueChange={(v) => setBlogForm({ ...blogForm, status: v })}
                  >
                    <SelectTrigger className="bg-[#0b0b0b] border-[#2a2a2a] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                      <SelectItem value="draft" className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]">Draft</SelectItem>
                      <SelectItem value="published" className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]">Published</SelectItem>
                      <SelectItem value="archived" className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-gray-500" /> Tags
                </Label>
                <Input
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white"
                  placeholder="e.g. kitchen, commercial, stainless-steel"
                  value={blogForm?.tags || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                />
                <p className="text-gray-600 text-[10px]">Separate tags with commas</p>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-3 py-1">
                <Checkbox
                  id="blog-featured"
                  checked={blogForm?.featured || false}
                  onCheckedChange={(checked) =>
                    setBlogForm({ ...blogForm, featured: !!checked })
                  }
                  className="data-[state=checked]:bg-[#59ff00] data-[state=checked]:border-[#59ff00] border-[#2a2a2a]"
                />
                <Label htmlFor="blog-featured" className="text-gray-300 text-sm cursor-pointer">
                  Featured post (shown prominently on the blog page)
                </Label>
              </div>
            </TabsContent>

            {/* ─── Media Tab ────────────────────────────────────── */}
            <TabsContent value="media" className="space-y-4 mt-4">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Featured Image</Label>
                <div className="flex items-start gap-4">
                  {/* Preview */}
                  {blogForm?.featuredImage ? (
                    <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-[#2a2a2a] flex-shrink-0 group">
                      <Image
                        src={blogForm.featuredImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setBlogForm({ ...blogForm, featuredImage: '' })}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-28 h-28 rounded-lg border border-dashed border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                  {/* Upload */}
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={onFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-[#0b0b0b] border-[#2a2a2a] text-gray-300 hover:text-white hover:border-[#59ff00]/50"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" /> Upload Image
                        </>
                      )}
                    </Button>
                    <p className="text-gray-600 text-[10px]">JPG, PNG, WebP, GIF (max 5MB)</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-[#2a2a2a]" />

              {/* Image URL Input */}
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Or paste image URL</Label>
                <Input
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white"
                  placeholder="https://example.com/image.jpg"
                  value={blogForm?.featuredImage || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
                />
                <p className="text-gray-600 text-[10px]">You can also provide a direct URL to the image</p>
              </div>

              {/* Image preview card */}
              {blogForm?.featuredImage && (
                <div className="rounded-lg border border-[#2a2a2a] overflow-hidden">
                  <div className="relative w-full h-48 bg-[#0b0b0b]">
                    <Image
                      src={blogForm.featuredImage}
                      alt="Featured image preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 bg-[#0b0b0b]">
                    <p className="text-gray-400 text-xs truncate">{blogForm.featuredImage}</p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* ─── SEO Tab ──────────────────────────────────────── */}
            <TabsContent value="seo" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-[#59ff00]" />
                <p className="text-gray-300 text-sm font-medium">Search Engine Optimization</p>
              </div>

              {/* SEO Title */}
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">SEO Title</Label>
                <Input
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white"
                  placeholder="SEO title for search engines"
                  value={blogForm?.seoTitle || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, seoTitle: e.target.value })}
                />
                <div className="flex justify-between">
                  <p className="text-gray-600 text-[10px]">Recommended: 50-60 characters</p>
                  <p className={`text-[10px] ${(blogForm?.seoTitle || '').length > 60 ? 'text-red-400' : 'text-gray-500'}`}>
                    {(blogForm?.seoTitle || '').length}/60
                  </p>
                </div>
              </div>

              {/* SEO Description */}
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">SEO Description</Label>
                <Textarea
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white resize-none"
                  rows={4}
                  placeholder="Meta description for search engines..."
                  value={blogForm?.seoDescription || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, seoDescription: e.target.value })}
                />
                <div className="flex justify-between">
                  <p className="text-gray-600 text-[10px]">Recommended: 150-160 characters</p>
                  <p className={`text-[10px] ${(blogForm?.seoDescription || '').length > 160 ? 'text-red-400' : 'text-gray-500'}`}>
                    {(blogForm?.seoDescription || '').length}/160
                  </p>
                </div>
              </div>

              {/* Search Preview */}
              <div className="space-y-2 mt-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider">Search Preview</p>
                <div className="p-4 rounded-lg bg-[#0b0b0b] border border-[#2a2a2a]">
                  <p className="text-blue-400 text-sm font-medium truncate">
                    {blogForm?.seoTitle || blogForm?.title || 'Blog Post Title'}
                  </p>
                  <p className="text-green-500 text-xs mt-0.5 truncate">
                    urbankitchen.com/blog/{blogForm?.slug || 'post-slug'}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                    {blogForm?.seoDescription || blogForm?.excerpt || 'A brief description of the blog post will appear here in search results.'}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* ─── Sheet Footer ───────────────────────────────────── */}
          <SheetFooter className="p-6 pt-4 border-t border-[#2a2a2a] mt-6 flex-row gap-3 justify-end">
            <Button
              variant="ghost"
              onClick={() => setBlogDialog(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveBlog}
              className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold"
            >
              {editBlog ? 'Update Post' : 'Publish Post'}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* ─── Category Dialog (Create / Edit) ──────────────────── */}
      <Dialog open={categoryDialog} onOpenChange={setCategoryDialog}>
        <DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Emoji + Name row */}
            <div className="flex gap-3">
              <div className="space-y-1.5 w-20">
                <Label className="text-gray-300 text-sm">Emoji</Label>
                <Input
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white text-center text-lg p-2"
                  value={categoryForm.emoji}
                  onChange={(e) => setCategoryForm({ ...categoryForm, emoji: e.target.value })}
                  placeholder="📰"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <Label className="text-gray-300 text-sm">Name *</Label>
                <Input
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white"
                  placeholder="Category name"
                  value={categoryForm.name}
                  onChange={(e) => handleCategoryNameChange(e.target.value)}
                />
              </div>
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Slug</Label>
              <Input
                className="bg-[#0b0b0b] border-[#2a2a2a] text-white font-mono text-sm"
                placeholder="auto-generated-from-name"
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label className="text-gray-300 text-sm">Description</Label>
              <Textarea
                className="bg-[#0b0b0b] border-[#2a2a2a] text-white resize-none"
                rows={2}
                placeholder="Brief description of this category..."
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              />
            </div>

            {/* Sort Order + Status */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Sort Order</Label>
                <Input
                  type="number"
                  className="bg-[#0b0b0b] border-[#2a2a2a] text-white"
                  value={categoryForm.sortOrder}
                  onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-300 text-sm">Status</Label>
                <Select
                  value={categoryForm.status}
                  onValueChange={(v) => setCategoryForm({ ...categoryForm, status: v })}
                >
                  <SelectTrigger className="bg-[#0b0b0b] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                    <SelectItem value="active" className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]">Active</SelectItem>
                    <SelectItem value="inactive" className="text-white focus:bg-[#59ff00]/10 focus:text-[#59ff00]">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preview */}
            <div className="flex items-center gap-2 p-3 bg-[#0b0b0b] rounded-lg border border-[#2a2a2a]">
              <Badge className="bg-[#59ff00]/10 text-[#59ff00] border-[#59ff00]/30 text-xs">
                {categoryForm.emoji || '📰'} {categoryForm.name || 'Category Name'}
              </Badge>
              {categoryForm.status === 'inactive' && (
                <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-[10px]">Inactive</Badge>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setCategoryDialog(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveCategory}
              className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold"
            >
              {editCategory ? 'Update' : 'Create'} Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
