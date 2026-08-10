'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import {
  Users, Star, DollarSign, TrendingUp, Check, Briefcase,
  CalendarDays, Network, Plus, AlertTriangle, Clock,
  LayoutGrid, Database, Timer, TrendingDown, Gauge,
  Award, Banknote, Wallet, UserPlus, BriefcaseMedical,
  Mic, GraduationCap, PartyPopper, Bell, Monitor,
  FolderOpen, Clock4, UsersRound, Lock, Shield, Settings,
  Package, FileText, CalendarClock, Send, Receipt,
  Edit, Trash2, Search, Eye, MapPin, RotateCcw, GitBranch,
  Wrench, Truck, Hammer, ClipboardCheck, Pencil,
} from 'lucide-react'
import { fmt, fmtDate, statusBadgeCls, priorityBadge } from './types'
import EmployeeLiveLocationTab from './EmployeeLiveLocationTab'

interface HrmModulesProps {
  adminTab: string
  employees: any[]
}

// ─── Reusable CRUD Hook ──────────────────────────────────
function useCrudModule(apiPath: string) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [editItem, setEditItem] = useState<any>(null)
  const [form, setForm] = useState<Record<string, any>>({})
  const [search, setSearch] = useState('')

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(apiPath)
      const json = await res.json()
      if (json.status) {
        const data = json.data
        const raw = data?.departments || data?.designations || data?.holidays || data?.notices || data?.jobOpenings || data?.interviews || data?.reviews || data?.appraisals || data?.programs || data?.assets || data?.shifts || data?.reports || data?.teams || data || []
        setItems(Array.isArray(raw) ? raw : [])
      }
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }, [apiPath])

  useEffect(() => { fetchItems() }, [fetchItems])

  const openNew = (defaultForm: Record<string, any>) => { setEditItem(null); setForm(defaultForm); setDialog(true) }
  const openEdit = (item: any) => { setEditItem(item); setForm({ ...item }); setDialog(true) }
  const handleSave = async () => {
    try {
      const url = editItem ? `${apiPath}/${editItem.id}` : apiPath
      const method = editItem ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const json = await res.json()
      if (json.status) { setDialog(false); fetchItems(); toast.success(editItem ? 'Updated' : 'Created') }
      else toast.error(json.message || 'Failed')
    } catch (e) { console.error(e); toast.error('Failed') }
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return
    try { await fetch(`${apiPath}/${id}`, { method: 'DELETE' }); fetchItems(); toast.success('Deleted') }
    catch (e) { console.error(e); toast.error('Failed') }
  }
  return { items, loading, dialog, setDialog, editItem, form, setForm, openNew, openEdit, handleSave, handleDelete, search, setSearch, fetchItems }
}

function StatCard({ label, value, icon: Icon, color, delay = 0 }: { label: string; value: string | number; icon: React.ElementType; color: string; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}><Card className="bg-[#181818] border-[#2a2a2a] hover:border-[#59ff00]/30 transition-colors"><CardContent className="p-4"><div className="flex items-center justify-between"><div><p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</p><p className={`text-xl font-bold mt-1 ${color}`}>{value}</p></div><div className={`w-10 h-10 rounded-xl ${color.replace('text-', 'bg-').replace(/-\d+$/, '-500/10')} flex items-center justify-center`}><Icon className={`w-5 h-5 ${color}`} /></div></div></CardContent></Card></motion.div>
}

function ModuleHeader({ title, description, icon: Icon, onAdd }: { title: string; description: string; icon: React.ElementType; onAdd?: () => void }) {
  return <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-[#59ff00]/10 border border-[#59ff00]/30 flex items-center justify-center"><Icon className="w-5 h-5 text-[#59ff00]" /></div><div><h2 className="text-white text-xl font-bold">{title}</h2><p className="text-gray-500 text-xs">{description}</p></div></div>{onAdd && <Button onClick={onAdd} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold"><Plus className="w-4 h-4 mr-2" />Add New</Button>}</div>
}

function FF({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><label className="text-gray-400 text-xs font-medium">{label}</label>{children}</div>
}

const inputCls = 'bg-[#0b0b0b] border-[#2a2a2a] text-white'

// ─── HR Dashboard ────────────────────────────────────────
function HrmDashboard({ employees }: { employees: any[] }) {
  const depts = new Set(employees.map((e: any) => e.department).filter(Boolean)).size
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="HR Dashboard" description="Overview of your workforce and HR operations" icon={Gauge} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Employees" value={employees.length} icon={Users} color="text-blue-400" />
        <StatCard label="Active" value={employees.filter((e: any) => e.status === 'active').length} icon={Check} color="text-emerald-400" delay={0.1} />
        <StatCard label="On Leave" value={employees.filter((e: any) => e.status === 'on_leave').length} icon={CalendarDays} color="text-yellow-400" delay={0.2} />
        <StatCard label="Departments" value={depts} icon={Network} color="text-purple-400" delay={0.3} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-4">
          <h3 className="text-white font-semibold text-sm mb-3">Recent Employees</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {employees.slice(0, 8).map((e: any) => (
              <div key={e.id} className="flex items-center justify-between py-2 border-b border-[#2a2a2a] last:border-0">
                <div><p className="text-white text-sm">{e.user?.name || e.name}</p><p className="text-gray-500 text-xs">{e.designation} · {e.department}</p></div>
                <Badge className={`text-[10px] ${statusBadgeCls(e.status)}`}>{e.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent></Card>
        <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-4">
          <h3 className="text-white font-semibold text-sm mb-3">Department Distribution</h3>
          <div className="space-y-2">
            {Object.entries(employees.reduce((acc: any, e: any) => { acc[e.department] = (acc[e.department] || 0) + 1; return acc }, {})).map(([dept, cnt]: any) => (
              <div key={dept} className="flex items-center justify-between py-2 border-b border-[#2a2a2a] last:border-0">
                <span className="text-gray-300 text-sm">{dept}</span>
                <div className="flex items-center gap-2"><div className="w-24 bg-[#0b0b0b] rounded-full h-2"><div className="bg-[#59ff00] h-2 rounded-full" style={{ width: `${employees.length > 0 ? (cnt / employees.length * 100) : 0}%` }} /></div><span className="text-white text-sm font-medium w-8 text-right">{cnt}</span></div>
              </div>
            ))}
          </div>
        </CardContent></Card>
      </div>
    </motion.div>
  )
}

// ─── Departments Module ──────────────────────────────────
function DepartmentsModule() {
  const crud = useCrudModule('/api/departments')
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Departments" description="Organize and manage company departments" icon={Network} onAdd={() => crud.openNew({ name: '', head: '', budget: 0, status: 'active' })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Departments" value={crud.items.length} icon={Network} color="text-blue-400" />
        <StatCard label="Active" value={crud.items.filter((d: any) => d.status === 'active').length} icon={Check} color="text-emerald-400" delay={0.1} />
        <StatCard label="Total Budget" value={fmt(crud.items.reduce((a: number, d: any) => a + (d.budget || 0), 0))} icon={DollarSign} color="text-[#59ff00]" delay={0.2} />
        <StatCard label="Heads Assigned" value={crud.items.filter((d: any) => d.head).length} icon={Star} color="text-yellow-400" delay={0.3} />
      </div>
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent"><TableHead className="text-gray-400">Name</TableHead><TableHead className="text-gray-400">Head</TableHead><TableHead className="text-gray-400">Budget</TableHead><TableHead className="text-gray-400">Status</TableHead><TableHead className="text-gray-400">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{crud.items.map((d: any) => (
          <TableRow key={d.id} className="border-[#2a2a2a] hover:bg-white/5"><TableCell className="text-white text-sm font-medium">{d.name}</TableCell><TableCell className="text-gray-300 text-sm">{d.head || '-'}</TableCell><TableCell className="text-gray-300 text-sm">{fmt(d.budget || 0)}</TableCell><TableCell><Badge className={`text-[10px] ${statusBadgeCls(d.status)}`}>{d.status}</Badge></TableCell><TableCell><div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => crud.openEdit(d)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button><Button size="sm" variant="ghost" onClick={() => crud.handleDelete(d.id)} className="text-red-400 h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" /></Button></div></TableCell></TableRow>
        ))}{crud.items.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-gray-500 py-8">No departments found</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
      <Dialog open={crud.dialog} onOpenChange={crud.setDialog}><DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg"><DialogHeader><DialogTitle className="text-white">{crud.editItem ? 'Edit' : 'Add'} Department</DialogTitle></DialogHeader><div className="space-y-3"><FF label="Name"><Input value={crud.form.name || ''} onChange={e => crud.setForm({ ...crud.form, name: e.target.value })} className={inputCls} /></FF><FF label="Head"><Input value={crud.form.head || ''} onChange={e => crud.setForm({ ...crud.form, head: e.target.value })} className={inputCls} /></FF><FF label="Budget"><Input type="number" value={crud.form.budget || 0} onChange={e => crud.setForm({ ...crud.form, budget: parseFloat(e.target.value) || 0 })} className={inputCls} /></FF><FF label="Status"><Select value={crud.form.status || 'active'} onValueChange={v => crud.setForm({ ...crud.form, status: v })}><SelectTrigger className={inputCls}><SelectValue /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]"><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select></FF></div><DialogFooter><Button variant="ghost" onClick={() => crud.setDialog(false)} className="text-gray-400">Cancel</Button><Button onClick={crud.handleSave} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">Save</Button></DialogFooter></DialogContent></Dialog>
    </motion.div>
  )
}

// ─── Designations Module ─────────────────────────────────
function DesignationsModule() {
  const crud = useCrudModule('/api/designations')
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Designations" description="Define and manage employee designations and grades" icon={Award} onAdd={() => crud.openNew({ name: '', level: 1, minSalary: 0, maxSalary: 0, status: 'active' })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Designations" value={crud.items.length} icon={Award} color="text-blue-400" />
        <StatCard label="Levels" value={new Set(crud.items.map((d: any) => d.level)).size} icon={LayoutGrid} color="text-purple-400" delay={0.1} />
        <StatCard label="Avg Salary" value={fmt(crud.items.length > 0 ? crud.items.reduce((a: number, d: any) => a + (d.minSalary + d.maxSalary) / 2, 0) / crud.items.length : 0)} icon={DollarSign} color="text-[#59ff00]" delay={0.2} />
        <StatCard label="Active" value={crud.items.filter((d: any) => d.status === 'active').length} icon={Check} color="text-emerald-400" delay={0.3} />
      </div>
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent"><TableHead className="text-gray-400">Name</TableHead><TableHead className="text-gray-400">Level</TableHead><TableHead className="text-gray-400">Min Salary</TableHead><TableHead className="text-gray-400">Max Salary</TableHead><TableHead className="text-gray-400">Status</TableHead><TableHead className="text-gray-400">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{crud.items.map((d: any) => (
          <TableRow key={d.id} className="border-[#2a2a2a] hover:bg-white/5"><TableCell className="text-white text-sm">{d.name}</TableCell><TableCell className="text-gray-300 text-sm">{d.level}</TableCell><TableCell className="text-gray-300 text-sm">{fmt(d.minSalary)}</TableCell><TableCell className="text-gray-300 text-sm">{fmt(d.maxSalary)}</TableCell><TableCell><Badge className={`text-[10px] ${statusBadgeCls(d.status)}`}>{d.status}</Badge></TableCell><TableCell><div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => crud.openEdit(d)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button><Button size="sm" variant="ghost" onClick={() => crud.handleDelete(d.id)} className="text-red-400 h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" /></Button></div></TableCell></TableRow>
        ))}{crud.items.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-gray-500 py-8">No designations found</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
      <Dialog open={crud.dialog} onOpenChange={crud.setDialog}><DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg"><DialogHeader><DialogTitle className="text-white">{crud.editItem ? 'Edit' : 'Add'} Designation</DialogTitle></DialogHeader><div className="space-y-3"><FF label="Name"><Input value={crud.form.name || ''} onChange={e => crud.setForm({ ...crud.form, name: e.target.value })} className={inputCls} /></FF><FF label="Level"><Input type="number" value={crud.form.level || 1} onChange={e => crud.setForm({ ...crud.form, level: parseInt(e.target.value) || 1 })} className={inputCls} /></FF><div className="grid grid-cols-2 gap-3"><FF label="Min Salary"><Input type="number" value={crud.form.minSalary || 0} onChange={e => crud.setForm({ ...crud.form, minSalary: parseFloat(e.target.value) || 0 })} className={inputCls} /></FF><FF label="Max Salary"><Input type="number" value={crud.form.maxSalary || 0} onChange={e => crud.setForm({ ...crud.form, maxSalary: parseFloat(e.target.value) || 0 })} className={inputCls} /></FF></div><FF label="Status"><Select value={crud.form.status || 'active'} onValueChange={v => crud.setForm({ ...crud.form, status: v })}><SelectTrigger className={inputCls}><SelectValue /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]"><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem></SelectContent></Select></FF></div><DialogFooter><Button variant="ghost" onClick={() => crud.setDialog(false)} className="text-gray-400">Cancel</Button><Button onClick={crud.handleSave} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">Save</Button></DialogFooter></DialogContent></Dialog>
    </motion.div>
  )
}

// ─── Payroll Module ──────────────────────────────────────
function PayrollModule({ employees }: { employees: any[] }) {
  const [salarySlips, setSalarySlips] = useState<any[]>([])
  useEffect(() => { fetch('/api/salary-slips?limit=50').then(r => r.json()).then(j => { if (j.status) { const raw = j.data?.salarySlips || j.data || []; setSalarySlips(Array.isArray(raw) ? raw : []) } }).catch(() => {}) }, [])
  const totalNet = salarySlips.reduce((a: number, s: any) => a + (s.netPay || 0), 0)
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Payroll" description="Process payroll, manage salary structures, and track payments" icon={Banknote} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Monthly Total" value={fmt(totalNet)} icon={Banknote} color="text-[#59ff00]" />
        <StatCard label="Processed" value={`${salarySlips.length}/${employees.length}`} icon={Check} color="text-emerald-400" delay={0.1} />
        <StatCard label="Pending" value={employees.length - salarySlips.length} icon={Clock} color="text-yellow-400" delay={0.2} />
        <StatCard label="Deductions" value={fmt(salarySlips.reduce((a: number, s: any) => a + (s.deduction || 0), 0))} icon={TrendingDown} color="text-red-400" delay={0.3} />
      </div>
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent"><TableHead className="text-gray-400">Employee</TableHead><TableHead className="text-gray-400">Month</TableHead><TableHead className="text-gray-400">Basic</TableHead><TableHead className="text-gray-400">HRA</TableHead><TableHead className="text-gray-400">Deduction</TableHead><TableHead className="text-gray-400">Net Pay</TableHead></TableRow></TableHeader>
        <TableBody>{salarySlips.map((s: any) => (
          <TableRow key={s.id} className="border-[#2a2a2a] hover:bg-white/5"><TableCell className="text-white text-sm">{s.employee?.user?.name || '-'}</TableCell><TableCell className="text-gray-300 text-sm">{s.month}</TableCell><TableCell className="text-gray-300 text-sm">{fmt(s.basic)}</TableCell><TableCell className="text-gray-300 text-sm">{fmt(s.hra)}</TableCell><TableCell className="text-red-400 text-sm">{fmt(s.deduction)}</TableCell><TableCell className="text-[#59ff00] text-sm font-medium">{fmt(s.netPay)}</TableCell></TableRow>
        ))}{salarySlips.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-gray-500 py-8">No salary slips found</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
    </motion.div>
  )
}

// ─── Salary Slips Module ─────────────────────────────────
function SalarySlipsModule() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => { fetch('/api/salary-slips?limit=50').then(r => r.json()).then(j => { if (j.status) { const raw = j.data?.salarySlips || j.data || []; setItems(Array.isArray(raw) ? raw : []) } }).catch(() => {}) }, [])
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Salary Slips" description="Generate and distribute salary slips to employees" icon={Wallet} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Generated" value={items.length} icon={Receipt} color="text-blue-400" />
        <StatCard label="Total" value={fmt(items.reduce((a: number, s: any) => a + (s.netPay || 0), 0))} icon={DollarSign} color="text-[#59ff00]" delay={0.1} />
        <StatCard label="Avg Net" value={fmt(items.length > 0 ? items.reduce((a: number, s: any) => a + (s.netPay || 0), 0) / items.length : 0)} icon={TrendingUp} color="text-purple-400" delay={0.2} />
        <StatCard label="Deductions" value={fmt(items.reduce((a: number, s: any) => a + (s.deduction || 0), 0))} icon={TrendingDown} color="text-red-400" delay={0.3} />
      </div>
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent"><TableHead className="text-gray-400">Employee</TableHead><TableHead className="text-gray-400">Month</TableHead><TableHead className="text-gray-400">Gross</TableHead><TableHead className="text-gray-400">Deductions</TableHead><TableHead className="text-gray-400">Net</TableHead></TableRow></TableHeader>
        <TableBody>{items.map((s: any) => (
          <TableRow key={s.id} className="border-[#2a2a2a] hover:bg-white/5"><TableCell className="text-white text-sm">{s.employee?.user?.name || '-'}</TableCell><TableCell className="text-gray-300 text-sm">{s.month}</TableCell><TableCell className="text-gray-300 text-sm">{fmt(s.basic + s.hra + s.allowance)}</TableCell><TableCell className="text-red-400 text-sm">{fmt(s.deduction)}</TableCell><TableCell className="text-[#59ff00] text-sm font-medium">{fmt(s.netPay)}</TableCell></TableRow>
        ))}{items.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-gray-500 py-8">No salary slips found</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
    </motion.div>
  )
}

// ─── Recruitment Module ──────────────────────────────────
function RecruitmentModule() {
  const crud = useCrudModule('/api/job-openings')
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Recruitment" description="Manage the entire recruitment pipeline from posting to hiring" icon={UserPlus} onAdd={() => crud.openNew({ title: '', department: '', type: 'full-time', experience: '', salaryRange: '', description: '', requirements: '', location: '', status: 'open' })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Positions" value={crud.items.filter((j: any) => j.status === 'open').length} icon={UserPlus} color="text-blue-400" />
        <StatCard label="Total Applications" value={crud.items.reduce((a: number, j: any) => a + (j.applications || 0), 0)} icon={Users} color="text-purple-400" delay={0.1} />
        <StatCard label="On Hold" value={crud.items.filter((j: any) => j.status === 'on_hold').length} icon={Clock} color="text-yellow-400" delay={0.2} />
        <StatCard label="Closed" value={crud.items.filter((j: any) => j.status === 'closed').length} icon={Check} color="text-emerald-400" delay={0.3} />
      </div>
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent"><TableHead className="text-gray-400">Title</TableHead><TableHead className="text-gray-400">Department</TableHead><TableHead className="text-gray-400">Type</TableHead><TableHead className="text-gray-400">Applications</TableHead><TableHead className="text-gray-400">Status</TableHead><TableHead className="text-gray-400">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{crud.items.map((j: any) => (
          <TableRow key={j.id} className="border-[#2a2a2a] hover:bg-white/5"><TableCell className="text-white text-sm font-medium">{j.title}</TableCell><TableCell className="text-gray-300 text-sm">{j.department}</TableCell><TableCell className="text-gray-300 text-sm capitalize">{j.type}</TableCell><TableCell className="text-gray-300 text-sm">{j.applications}</TableCell><TableCell><Badge className={`text-[10px] ${statusBadgeCls(j.status)}`}>{j.status.replace('_', ' ')}</Badge></TableCell><TableCell><div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => crud.openEdit(j)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button><Button size="sm" variant="ghost" onClick={() => crud.handleDelete(j.id)} className="text-red-400 h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" /></Button></div></TableCell></TableRow>
        ))}{crud.items.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-gray-500 py-8">No job openings found</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
      <Dialog open={crud.dialog} onOpenChange={crud.setDialog}><DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg"><DialogHeader><DialogTitle className="text-white">{crud.editItem ? 'Edit' : 'Add'} Job Opening</DialogTitle></DialogHeader><div className="space-y-3 max-h-[60vh] overflow-y-auto"><FF label="Title"><Input value={crud.form.title || ''} onChange={e => crud.setForm({ ...crud.form, title: e.target.value })} className={inputCls} /></FF><div className="grid grid-cols-2 gap-3"><FF label="Department"><Input value={crud.form.department || ''} onChange={e => crud.setForm({ ...crud.form, department: e.target.value })} className={inputCls} /></FF><FF label="Type"><Select value={crud.form.type || 'full-time'} onValueChange={v => crud.setForm({ ...crud.form, type: v })}><SelectTrigger className={inputCls}><SelectValue /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]"><SelectItem value="full-time">Full-time</SelectItem><SelectItem value="part-time">Part-time</SelectItem><SelectItem value="contract">Contract</SelectItem><SelectItem value="internship">Internship</SelectItem></SelectContent></Select></FF></div><div className="grid grid-cols-2 gap-3"><FF label="Experience"><Input value={crud.form.experience || ''} onChange={e => crud.setForm({ ...crud.form, experience: e.target.value })} className={inputCls} placeholder="e.g. 3-5 years" /></FF><FF label="Salary Range"><Input value={crud.form.salaryRange || ''} onChange={e => crud.setForm({ ...crud.form, salaryRange: e.target.value })} className={inputCls} placeholder="e.g. 5-8 LPA" /></FF></div><FF label="Location"><Input value={crud.form.location || ''} onChange={e => crud.setForm({ ...crud.form, location: e.target.value })} className={inputCls} /></FF><FF label="Description"><Textarea value={crud.form.description || ''} onChange={e => crud.setForm({ ...crud.form, description: e.target.value })} className={inputCls} rows={3} /></FF><FF label="Requirements"><Textarea value={crud.form.requirements || ''} onChange={e => crud.setForm({ ...crud.form, requirements: e.target.value })} className={inputCls} rows={2} /></FF><FF label="Status"><Select value={crud.form.status || 'open'} onValueChange={v => crud.setForm({ ...crud.form, status: v })}><SelectTrigger className={inputCls}><SelectValue /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]"><SelectItem value="open">Open</SelectItem><SelectItem value="on_hold">On Hold</SelectItem><SelectItem value="closed">Closed</SelectItem></SelectContent></Select></FF></div><DialogFooter><Button variant="ghost" onClick={() => crud.setDialog(false)} className="text-gray-400">Cancel</Button><Button onClick={crud.handleSave} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">Save</Button></DialogFooter></DialogContent></Dialog>
    </motion.div>
  )
}

// ─── Job Openings Module (alias) ─────────────────────────
function JobOpeningsModule() { return <RecruitmentModule /> }

// ─── Interviews Module ───────────────────────────────────
function InterviewsModule() {
  const crud = useCrudModule('/api/interviews')
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Interviews" description="Schedule and track candidate interviews" icon={Mic} onAdd={() => crud.openNew({ candidateName: '', candidateEmail: '', candidatePhone: '', position: '', date: '', interviewer: '', rating: 0, feedback: '', status: 'scheduled' })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Scheduled" value={crud.items.filter((i: any) => i.status === 'scheduled').length} icon={Mic} color="text-blue-400" />
        <StatCard label="Today" value={crud.items.filter((i: any) => i.status === 'scheduled' && new Date(i.date).toDateString() === new Date().toDateString()).length} icon={CalendarDays} color="text-purple-400" delay={0.1} />
        <StatCard label="Completed" value={crud.items.filter((i: any) => i.status === 'completed').length} icon={Check} color="text-emerald-400" delay={0.2} />
        <StatCard label="Avg Rating" value={crud.items.filter((i: any) => i.rating > 0).length > 0 ? (crud.items.filter((i: any) => i.rating > 0).reduce((a: number, i: any) => a + i.rating, 0) / crud.items.filter((i: any) => i.rating > 0).length).toFixed(1) : '0'} icon={Star} color="text-yellow-400" delay={0.3} />
      </div>
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent"><TableHead className="text-gray-400">Candidate</TableHead><TableHead className="text-gray-400">Position</TableHead><TableHead className="text-gray-400">Date</TableHead><TableHead className="text-gray-400">Rating</TableHead><TableHead className="text-gray-400">Status</TableHead><TableHead className="text-gray-400">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{crud.items.map((i: any) => (
          <TableRow key={i.id} className="border-[#2a2a2a] hover:bg-white/5"><TableCell className="text-white text-sm">{i.candidateName}</TableCell><TableCell className="text-gray-300 text-sm">{i.position}</TableCell><TableCell className="text-gray-300 text-sm">{i.date ? fmtDate(i.date) : '-'}</TableCell><TableCell className="text-yellow-400 text-sm">{i.rating > 0 ? `${i.rating}/5` : '-'}</TableCell><TableCell><Badge className={`text-[10px] ${statusBadgeCls(i.status)}`}>{i.status}</Badge></TableCell><TableCell><div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => crud.openEdit(i)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button><Button size="sm" variant="ghost" onClick={() => crud.handleDelete(i.id)} className="text-red-400 h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" /></Button></div></TableCell></TableRow>
        ))}{crud.items.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-gray-500 py-8">No interviews found</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
      <Dialog open={crud.dialog} onOpenChange={crud.setDialog}><DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg"><DialogHeader><DialogTitle className="text-white">{crud.editItem ? 'Edit' : 'Add'} Interview</DialogTitle></DialogHeader><div className="space-y-3"><FF label="Candidate Name"><Input value={crud.form.candidateName || ''} onChange={e => crud.setForm({ ...crud.form, candidateName: e.target.value })} className={inputCls} /></FF><div className="grid grid-cols-2 gap-3"><FF label="Email"><Input value={crud.form.candidateEmail || ''} onChange={e => crud.setForm({ ...crud.form, candidateEmail: e.target.value })} className={inputCls} /></FF><FF label="Phone"><Input value={crud.form.candidatePhone || ''} onChange={e => crud.setForm({ ...crud.form, candidatePhone: e.target.value })} className={inputCls} /></FF></div><FF label="Position"><Input value={crud.form.position || ''} onChange={e => crud.setForm({ ...crud.form, position: e.target.value })} className={inputCls} /></FF><div className="grid grid-cols-2 gap-3"><FF label="Date"><Input type="date" value={crud.form.date ? new Date(crud.form.date).toISOString().split('T')[0] : ''} onChange={e => crud.setForm({ ...crud.form, date: e.target.value })} className={inputCls} /></FF><FF label="Interviewer"><Input value={crud.form.interviewer || ''} onChange={e => crud.setForm({ ...crud.form, interviewer: e.target.value })} className={inputCls} /></FF></div><FF label="Rating (0-5)"><Input type="number" min="0" max="5" value={crud.form.rating || 0} onChange={e => crud.setForm({ ...crud.form, rating: parseFloat(e.target.value) || 0 })} className={inputCls} /></FF><FF label="Feedback"><Textarea value={crud.form.feedback || ''} onChange={e => crud.setForm({ ...crud.form, feedback: e.target.value })} className={inputCls} rows={2} /></FF><FF label="Status"><Select value={crud.form.status || 'scheduled'} onValueChange={v => crud.setForm({ ...crud.form, status: v })}><SelectTrigger className={inputCls}><SelectValue /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]"><SelectItem value="scheduled">Scheduled</SelectItem><SelectItem value="completed">Completed</SelectItem><SelectItem value="cancelled">Cancelled</SelectItem></SelectContent></Select></FF></div><DialogFooter><Button variant="ghost" onClick={() => crud.setDialog(false)} className="text-gray-400">Cancel</Button><Button onClick={crud.handleSave} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">Save</Button></DialogFooter></DialogContent></Dialog>
    </motion.div>
  )
}

// ─── Performance Module ──────────────────────────────────
function PerformanceModule({ employees }: { employees: any[] }) {
  const crud = useCrudModule('/api/performance-reviews')
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Performance" description="Track employee performance reviews and KPIs" icon={Star} onAdd={() => crud.openNew({ employeeId: '', period: '', score: 0, goals: '', feedback: '', status: 'pending' })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Reviews Due" value={crud.items.filter((r: any) => r.status === 'pending').length} icon={Star} color="text-yellow-400" />
        <StatCard label="Completed" value={crud.items.filter((r: any) => r.status === 'completed').length} icon={Check} color="text-emerald-400" delay={0.1} />
        <StatCard label="Avg Score" value={crud.items.filter((r: any) => r.score > 0).length > 0 ? (crud.items.filter((r: any) => r.score > 0).reduce((a: number, r: any) => a + r.score, 0) / crud.items.filter((r: any) => r.score > 0).length).toFixed(1) : '0'} icon={TrendingUp} color="text-blue-400" delay={0.2} />
        <StatCard label="Top Performer" value={`${Math.round(crud.items.filter((r: any) => r.score >= 4).length / Math.max(crud.items.length, 1) * 100)}%`} icon={Award} color="text-purple-400" delay={0.3} />
      </div>
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent"><TableHead className="text-gray-400">Employee</TableHead><TableHead className="text-gray-400">Period</TableHead><TableHead className="text-gray-400">Score</TableHead><TableHead className="text-gray-400">Feedback</TableHead><TableHead className="text-gray-400">Status</TableHead><TableHead className="text-gray-400">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{crud.items.map((r: any) => (
          <TableRow key={r.id} className="border-[#2a2a2a] hover:bg-white/5"><TableCell className="text-white text-sm">{r.employee?.user?.name || '-'}</TableCell><TableCell className="text-gray-300 text-sm">{r.period}</TableCell><TableCell className="text-yellow-400 text-sm">{r.score}/5</TableCell><TableCell className="text-gray-400 text-sm max-w-[150px] truncate">{r.feedback || '-'}</TableCell><TableCell><Badge className={`text-[10px] ${statusBadgeCls(r.status)}`}>{r.status}</Badge></TableCell><TableCell><div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => crud.openEdit(r)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button><Button size="sm" variant="ghost" onClick={() => crud.handleDelete(r.id)} className="text-red-400 h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" /></Button></div></TableCell></TableRow>
        ))}{crud.items.length === 0 && <TableRow><TableCell colSpan={6} className="text-center text-gray-500 py-8">No reviews found</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
      <Dialog open={crud.dialog} onOpenChange={crud.setDialog}><DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg"><DialogHeader><DialogTitle className="text-white">{crud.editItem ? 'Edit' : 'Add'} Review</DialogTitle></DialogHeader><div className="space-y-3"><FF label="Employee"><Select value={crud.form.employeeId || ''} onValueChange={v => crud.setForm({ ...crud.form, employeeId: v })}><SelectTrigger className={inputCls}><SelectValue placeholder="Select employee" /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]">{employees.map((e: any) => <SelectItem key={e.id} value={e.id}>{e.user?.name || e.name}</SelectItem>)}</SelectContent></Select></FF><FF label="Period"><Input value={crud.form.period || ''} onChange={e => crud.setForm({ ...crud.form, period: e.target.value })} className={inputCls} placeholder="e.g. Q1 2025" /></FF><FF label="Score (0-5)"><Input type="number" min="0" max="5" value={crud.form.score || 0} onChange={e => crud.setForm({ ...crud.form, score: parseFloat(e.target.value) || 0 })} className={inputCls} /></FF><FF label="Goals"><Textarea value={crud.form.goals || ''} onChange={e => crud.setForm({ ...crud.form, goals: e.target.value })} className={inputCls} rows={2} /></FF><FF label="Feedback"><Textarea value={crud.form.feedback || ''} onChange={e => crud.setForm({ ...crud.form, feedback: e.target.value })} className={inputCls} rows={2} /></FF><FF label="Status"><Select value={crud.form.status || 'pending'} onValueChange={v => crud.setForm({ ...crud.form, status: v })}><SelectTrigger className={inputCls}><SelectValue /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]"><SelectItem value="pending">Pending</SelectItem><SelectItem value="completed">Completed</SelectItem></SelectContent></Select></FF></div><DialogFooter><Button variant="ghost" onClick={() => crud.setDialog(false)} className="text-gray-400">Cancel</Button><Button onClick={crud.handleSave} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">Save</Button></DialogFooter></DialogContent></Dialog>
    </motion.div>
  )
}

// ─── Appraisals Module ───────────────────────────────────
function AppraisalsModule({ employees }: { employees: any[] }) {
  const crud = useCrudModule('/api/appraisals')
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Appraisals" description="Manage employee appraisal cycles and salary revisions" icon={TrendingUp} onAdd={() => crud.openNew({ employeeId: '', cycle: '', rating: 0, hikePercent: 0, newSalary: 0, comments: '', status: 'pending' })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending" value={crud.items.filter((a: any) => a.status === 'pending').length} icon={Clock} color="text-yellow-400" />
        <StatCard label="Completed" value={crud.items.filter((a: any) => a.status === 'approved').length} icon={Check} color="text-emerald-400" delay={0.1} />
        <StatCard label="Avg Hike" value={`${crud.items.length > 0 ? Math.round(crud.items.reduce((a: number, ap: any) => a + (ap.hikePercent || 0), 0) / crud.items.length) : 0}%`} icon={TrendingUp} color="text-blue-400" delay={0.2} />
        <StatCard label="Budget" value={fmt(crud.items.reduce((a: number, ap: any) => a + (ap.newSalary || 0), 0))} icon={DollarSign} color="text-[#59ff00]" delay={0.3} />
      </div>
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent"><TableHead className="text-gray-400">Employee</TableHead><TableHead className="text-gray-400">Cycle</TableHead><TableHead className="text-gray-400">Rating</TableHead><TableHead className="text-gray-400">Hike %</TableHead><TableHead className="text-gray-400">New Salary</TableHead><TableHead className="text-gray-400">Status</TableHead><TableHead className="text-gray-400">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{crud.items.map((a: any) => (
          <TableRow key={a.id} className="border-[#2a2a2a] hover:bg-white/5"><TableCell className="text-white text-sm">{a.employee?.user?.name || '-'}</TableCell><TableCell className="text-gray-300 text-sm">{a.cycle}</TableCell><TableCell className="text-yellow-400 text-sm">{a.rating}/5</TableCell><TableCell className="text-blue-400 text-sm">{a.hikePercent}%</TableCell><TableCell className="text-[#59ff00] text-sm">{fmt(a.newSalary)}</TableCell><TableCell><Badge className={`text-[10px] ${statusBadgeCls(a.status)}`}>{a.status}</Badge></TableCell><TableCell><div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => crud.openEdit(a)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button><Button size="sm" variant="ghost" onClick={() => crud.handleDelete(a.id)} className="text-red-400 h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" /></Button></div></TableCell></TableRow>
        ))}{crud.items.length === 0 && <TableRow><TableCell colSpan={7} className="text-center text-gray-500 py-8">No appraisals found</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
      <Dialog open={crud.dialog} onOpenChange={crud.setDialog}><DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg"><DialogHeader><DialogTitle className="text-white">{crud.editItem ? 'Edit' : 'Add'} Appraisal</DialogTitle></DialogHeader><div className="space-y-3"><FF label="Employee"><Select value={crud.form.employeeId || ''} onValueChange={v => crud.setForm({ ...crud.form, employeeId: v })}><SelectTrigger className={inputCls}><SelectValue placeholder="Select employee" /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]">{employees.map((e: any) => <SelectItem key={e.id} value={e.id}>{e.user?.name || e.name}</SelectItem>)}</SelectContent></Select></FF><FF label="Cycle"><Input value={crud.form.cycle || ''} onChange={e => crud.setForm({ ...crud.form, cycle: e.target.value })} className={inputCls} placeholder="e.g. Annual 2025" /></FF><div className="grid grid-cols-3 gap-3"><FF label="Rating"><Input type="number" min="0" max="5" value={crud.form.rating || 0} onChange={e => crud.setForm({ ...crud.form, rating: parseFloat(e.target.value) || 0 })} className={inputCls} /></FF><FF label="Hike %"><Input type="number" value={crud.form.hikePercent || 0} onChange={e => crud.setForm({ ...crud.form, hikePercent: parseFloat(e.target.value) || 0 })} className={inputCls} /></FF><FF label="New Salary"><Input type="number" value={crud.form.newSalary || 0} onChange={e => crud.setForm({ ...crud.form, newSalary: parseFloat(e.target.value) || 0 })} className={inputCls} /></FF></div><FF label="Comments"><Textarea value={crud.form.comments || ''} onChange={e => crud.setForm({ ...crud.form, comments: e.target.value })} className={inputCls} rows={2} /></FF><FF label="Status"><Select value={crud.form.status || 'pending'} onValueChange={v => crud.setForm({ ...crud.form, status: v })}><SelectTrigger className={inputCls}><SelectValue /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]"><SelectItem value="pending">Pending</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent></Select></FF></div><DialogFooter><Button variant="ghost" onClick={() => crud.setDialog(false)} className="text-gray-400">Cancel</Button><Button onClick={crud.handleSave} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">Save</Button></DialogFooter></DialogContent></Dialog>
    </motion.div>
  )
}

// ─── Simple CRUD Modules (Holidays, Notices, Training, Assets, Shifts, Work Reports, Teams) ───
function SimpleCrudModule({ title, desc, icon: Icon, apiPath, defaultForm, statsConfig, tableConfig, formConfig }: any) {
  const crud = useCrudModule(apiPath)
  const filtered = crud.items.filter((item: any) => !crud.search || Object.values(item).some(v => String(v).toLowerCase().includes(crud.search.toLowerCase())))
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title={title} description={desc} icon={Icon} onAdd={() => crud.openNew(defaultForm)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig(crud.items).map((s: any, i: number) => <StatCard key={s.label} {...s} delay={i * 0.1} />)}
      </div>
      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" /><Input placeholder="Search..." value={crud.search} onChange={e => crud.setSearch(e.target.value)} className="pl-9 bg-[#0b0b0b] border-[#2a2a2a] text-white h-9 text-sm" /></div>
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><div className="overflow-x-auto"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent">{tableConfig.headers.map((h: string) => <TableHead key={h} className="text-gray-400">{h}</TableHead>)}<TableHead className="text-gray-400">Actions</TableHead></TableRow></TableHeader>
        <TableBody>{filtered.map((item: any) => (
          <TableRow key={item.id} className="border-[#2a2a2a] hover:bg-white/5">
            {tableConfig.renderRow(item).map((cell: any, ci: number) => <TableCell key={ci}>{cell}</TableCell>)}
            <TableCell><div className="flex gap-1"><Button size="sm" variant="ghost" onClick={() => crud.openEdit(item)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button><Button size="sm" variant="ghost" onClick={() => crud.handleDelete(item.id)} className="text-red-400 h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" /></Button></div></TableCell>
          </TableRow>
        ))}{filtered.length === 0 && <TableRow><TableCell colSpan={tableConfig.headers.length + 1} className="text-center text-gray-500 py-8">No data found</TableCell></TableRow>}</TableBody></Table></div></CardContent></Card>
      <Dialog open={crud.dialog} onOpenChange={crud.setDialog}><DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg"><DialogHeader><DialogTitle className="text-white">{crud.editItem ? 'Edit' : 'Add'} {title}</DialogTitle></DialogHeader><div className="space-y-3 max-h-[60vh] overflow-y-auto">{formConfig.map((fc: any) => (
        <FF key={fc.key} label={fc.label}>{fc.type === 'select' ? <Select value={crud.form[fc.key] || fc.default || ''} onValueChange={v => crud.setForm({ ...crud.form, [fc.key]: v })}><SelectTrigger className={inputCls}><SelectValue /></SelectTrigger><SelectContent className="bg-[#181818] border-[#2a2a2a]">{fc.options.map((o: any) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent></Select> : fc.type === 'textarea' ? <Textarea value={crud.form[fc.key] || ''} onChange={e => crud.setForm({ ...crud.form, [fc.key]: e.target.value })} className={inputCls} rows={3} /> : <Input type={fc.type || 'text'} value={crud.form[fc.key] ?? ''} onChange={e => crud.setForm({ ...crud.form, [fc.key]: fc.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })} className={inputCls} />}</FF>
      ))}</div><DialogFooter><Button variant="ghost" onClick={() => crud.setDialog(false)} className="text-gray-400">Cancel</Button><Button onClick={crud.handleSave} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">Save</Button></DialogFooter></DialogContent></Dialog>
    </motion.div>
  )
}

// ─── Employee Workbook Module (Daily Field Work) ──────────
function EmployeeWorkbookModule({ employees }: { employees: any[] }) {
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [employeeFilter, setEmployeeFilter] = useState('all')
  const [workTypeFilter, setWorkTypeFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [selectedEntry, setSelectedEntry] = useState<any>(null)
  const [editDialog, setEditDialog] = useState(false)
  const [editForm, setEditForm] = useState<any>({})
  const [saving, setSaving] = useState(false)

  const fetchEntries = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/daily-field-work?limit=200')
      const json = await res.json()
      if (json.status) {
        setEntries(json.data?.entries || [])
      }
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchEntries() }, [fetchEntries])

  const filteredEntries = entries.filter((entry: any) => {
    if (employeeFilter !== 'all' && entry.employeeId !== employeeFilter) return false
    if (workTypeFilter !== 'all' && entry.workType !== workTypeFilter) return false
    if (dateFilter && new Date(entry.date).toDateString() !== new Date(dateFilter).toDateString()) return false
    return true
  })

  const todayEntries = filteredEntries.filter((e: any) => new Date(e.date).toDateString() === new Date().toDateString())
  const meetingCount = filteredEntries.filter((e: any) => e.workType === 'meeting').length
  const postponedCount = filteredEntries.filter((e: any) => e.status === 'postponed').length
  const pipelineCount = filteredEntries.filter((e: any) => e.pipelineCreated).length

  const workTypeIcon: Record<string, React.ReactNode> = {
    site_visit: <Eye className="w-4 h-4 text-blue-400" />,
    installation: <Wrench className="w-4 h-4 text-green-400" />,
    maintenance: <Hammer className="w-4 h-4 text-orange-400" />,
    delivery: <Truck className="w-4 h-4 text-cyan-400" />,
    meeting: <Users className="w-4 h-4 text-purple-400" />,
    inspection: <ClipboardCheck className="w-4 h-4 text-yellow-400" />,
    other: <Briefcase className="w-4 h-4 text-gray-400" />,
  }
  const workTypeBg: Record<string, string> = {
    site_visit: 'bg-blue-500/10 border-blue-500/20',
    installation: 'bg-green-500/10 border-green-500/20',
    maintenance: 'bg-orange-500/10 border-orange-500/20',
    delivery: 'bg-cyan-500/10 border-cyan-500/20',
    meeting: 'bg-purple-500/10 border-purple-500/20',
    inspection: 'bg-yellow-500/10 border-yellow-500/20',
    other: 'bg-gray-500/10 border-gray-500/20',
  }
  const statusBadge: Record<string, string> = {
    completed: 'bg-emerald-500/20 text-emerald-400',
    pending_followup: 'bg-yellow-500/20 text-yellow-400',
    postponed: 'bg-orange-500/20 text-orange-400',
    in_progress: 'bg-blue-500/20 text-blue-400',
  }

  const openEdit = (entry: any) => {
    setSelectedEntry(entry)
    setEditForm({
      title: entry.title || '',
      description: entry.description || '',
      workType: entry.workType || 'site_visit',
      status: entry.status || 'completed',
      clientName: entry.clientName || '',
      clientPhone: entry.clientPhone || '',
      clientCompany: entry.clientCompany || '',
      followUpDate: entry.followUpDate ? new Date(entry.followUpDate).toISOString().split('T')[0] : '',
      followUpNote: entry.followUpNote || '',
    })
    setEditDialog(true)
  }

  const handleSaveEdit = async () => {
    if (!selectedEntry) return
    setSaving(true)
    try {
      const res = await fetch('/api/daily-field-work', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedEntry.id, ...editForm }),
      })
      const json = await res.json()
      if (json.status) {
        toast.success('Entry updated successfully')
        setEditDialog(false)
        fetchEntries()
      } else {
        toast.error(json.message || 'Failed to update')
      }
    } catch (e) { console.error(e); toast.error('Failed to update') } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this entry?')) return
    try {
      const res = await fetch(`/api/daily-field-work?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.status) { toast.success('Entry deleted'); fetchEntries() }
      else toast.error(json.message || 'Failed to delete')
    } catch (e) { console.error(e); toast.error('Failed to delete') }
  }

  // Group by employee
  const byEmployee: Record<string, any[]> = {}
  for (const entry of filteredEntries) {
    const empName = entry.employee?.user?.name || 'Unknown'
    if (!byEmployee[empName]) byEmployee[empName] = []
    byEmployee[empName].push(entry)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Employee Work Book" description="View all employees' daily field work, meetings, and activities" icon={FileText} />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today's Entries" value={todayEntries.length} icon={CalendarDays} color="text-[#59ff00]" />
        <StatCard label="Total Meetings" value={meetingCount} icon={Users} color="text-purple-400" delay={0.1} />
        <StatCard label="Postponed" value={postponedCount} icon={RotateCcw} color="text-orange-400" delay={0.2} />
        <StatCard label="Pipeline Created" value={pipelineCount} icon={GitBranch} color="text-blue-400" delay={0.3} />
      </div>

      {/* Filters */}
      <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[180px]">
            <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
              <SelectTrigger className="bg-[#0b0b0b] border-[#2a2a2a] text-white text-sm">
                <SelectValue placeholder="All Employees" />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                <SelectItem value="all">All Employees</SelectItem>
                {employees.map((e: any) => (
                  <SelectItem key={e.id} value={e.id}>{e.user?.name || e.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <Select value={workTypeFilter} onValueChange={setWorkTypeFilter}>
              <SelectTrigger className="bg-[#0b0b0b] border-[#2a2a2a] text-white text-sm">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="site_visit">Site Visit</SelectItem>
                <SelectItem value="installation">Installation</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[150px]">
            <Input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} className="bg-[#0b0b0b] border-[#2a2a2a] text-white text-sm" placeholder="Filter by date" />
          </div>
          {(employeeFilter !== 'all' || workTypeFilter !== 'all' || dateFilter) && (
            <Button variant="ghost" size="sm" onClick={() => { setEmployeeFilter('all'); setWorkTypeFilter('all'); setDateFilter('') }} className="text-gray-400 hover:text-white text-xs">Clear Filters</Button>
          )}
        </div>
      </CardContent></Card>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-12"><div className="w-6 h-6 border-2 border-[#59ff00]/30 border-t-[#59ff00] rounded-full animate-spin" /></div>
      ) : filteredEntries.length === 0 ? (
        <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-8 text-center">
          <CalendarDays className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <h3 className="text-gray-400 font-semibold mb-1">No Work Entries Found</h3>
          <p className="text-gray-600 text-sm">Employees' daily field work entries will appear here</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-6 max-h-[700px] overflow-y-auto pr-1">
          {Object.entries(byEmployee).sort(([a], [b]) => a.localeCompare(b)).map(([empName, empEntries]) => (
            <div key={empName}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#59ff00]/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#59ff00]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{empName}</h3>
                  <p className="text-gray-500 text-xs">{empEntries.length} entries • {empEntries.filter((e: any) => e.workType === 'meeting').length} meetings • {empEntries.filter((e: any) => new Date(e.date).toDateString() === new Date().toDateString()).length} today</p>
                </div>
              </div>
              <div className="space-y-2 ml-4 pl-4 border-l border-[#2a2a2a]">
                {empEntries.map((entry: any) => (
                  <div key={entry.id} className={`bg-[#181818] border rounded-lg p-3 hover:border-[#59ff00]/20 transition-colors ${entry.status === 'postponed' ? 'border-orange-500/20' : entry.workType === 'meeting' ? 'border-purple-500/10' : 'border-[#2a2a2a]'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${workTypeBg[entry.workType] || workTypeBg.other}`}>
                        {workTypeIcon[entry.workType] || workTypeIcon.other}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="text-white font-semibold text-sm truncate">{entry.title}</h4>
                          {entry.workType === 'meeting' && <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] shrink-0">Meeting</Badge>}
                          {entry.status === 'postponed' && <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-[10px] shrink-0">Postponed</Badge>}
                          <Badge className={`${statusBadge[entry.status] || 'bg-gray-500/20 text-gray-400'} text-[10px] shrink-0`}>
                            {entry.status === 'pending_followup' ? 'Follow-up' : entry.status}
                          </Badge>
                          {entry.pipelineCreated && <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] shrink-0"><GitBranch className="w-2.5 h-2.5 mr-0.5" />Pipeline</Badge>}
                        </div>
                        {entry.description && <p className="text-gray-500 text-xs line-clamp-2">{entry.description}</p>}
                        {entry.clientName && (
                          <div className="mt-1.5 flex items-center gap-2 text-xs">
                            <span className="text-white font-medium">{entry.clientName}</span>
                            {entry.clientCompany && <span className="text-gray-500">• {entry.clientCompany}</span>}
                            {entry.clientPhone && <span className="text-gray-600">• {entry.clientPhone}</span>}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-gray-600">
                          <span className="capitalize">{entry.workType?.replace('_', ' ')}</span>
                          <span>{fmtDate(entry.date)}</span>
                          {entry.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#59ff00]" /><span className="truncate max-w-[150px]">{entry.address}</span></span>}
                        </div>
                        {entry.followUpDate && (
                          <div className="flex items-center gap-1.5 mt-1 text-xs">
                            <RotateCcw className={`w-3 h-3 ${entry.followUpCreated ? 'text-green-400' : entry.status === 'postponed' ? 'text-orange-400' : 'text-yellow-400'}`} />
                            <span className={entry.followUpCreated ? 'text-green-400' : entry.status === 'postponed' ? 'text-orange-400' : 'text-yellow-400'}>
                              {entry.status === 'postponed' ? 'Rescheduled' : 'Follow-up'}: {fmtDate(entry.followUpDate)}
                              {entry.followUpCreated ? ' (task created)' : ' (pending)'}
                            </span>
                            {entry.followUpNote && <span className="text-gray-600 ml-1">- {entry.followUpNote}</span>}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button size="sm" variant="ghost" onClick={() => openEdit(entry)} className="text-blue-400 h-7 w-7 p-0"><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(entry.id)} className="text-red-400 h-7 w-7 p-0"><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#59ff00]">Edit Work Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            <FF label="Title">
              <Input value={editForm.title || ''} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className={inputCls} />
            </FF>
            <FF label="Description">
              <Textarea value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className={inputCls} rows={3} />
            </FF>
            <div className="grid grid-cols-2 gap-3">
              <FF label="Work Type">
                <Select value={editForm.workType || 'site_visit'} onValueChange={v => setEditForm({ ...editForm, workType: v })}>
                  <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                    <SelectItem value="site_visit">Site Visit</SelectItem>
                    <SelectItem value="installation">Installation</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FF>
              <FF label="Status">
                <Select value={editForm.status || 'completed'} onValueChange={v => setEditForm({ ...editForm, status: v })}>
                  <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending_followup">Follow-up Needed</SelectItem>
                    <SelectItem value="postponed">Postponed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </FF>
            </div>
            <div className="border-t border-[#2a2a2a] pt-3">
              <h4 className="text-gray-300 text-xs font-semibold mb-2">Client Details</h4>
              <div className="grid grid-cols-2 gap-3">
                <FF label="Client Name"><Input value={editForm.clientName || ''} onChange={e => setEditForm({ ...editForm, clientName: e.target.value })} className={inputCls} /></FF>
                <FF label="Client Phone"><Input value={editForm.clientPhone || ''} onChange={e => setEditForm({ ...editForm, clientPhone: e.target.value })} className={inputCls} /></FF>
              </div>
              <FF label="Company"><Input value={editForm.clientCompany || ''} onChange={e => setEditForm({ ...editForm, clientCompany: e.target.value })} className={inputCls} /></FF>
            </div>
            <div className="border-t border-[#2a2a2a] pt-3">
              <h4 className="text-gray-300 text-xs font-semibold mb-2">Follow-up</h4>
              <FF label="Follow-up Date"><Input type="date" value={editForm.followUpDate || ''} onChange={e => setEditForm({ ...editForm, followUpDate: e.target.value })} className={inputCls} /></FF>
              <FF label="Follow-up Note"><Input value={editForm.followUpNote || ''} onChange={e => setEditForm({ ...editForm, followUpNote: e.target.value })} className={inputCls} /></FF>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditDialog(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSaveEdit} disabled={saving} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              {saving ? <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-2 inline-block" />Saving...</> : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

// ─── Main Export ─────────────────────────────────────────
// ─── Permissions & Roles Module ───────────────────────────
const ALL_PERMISSIONS = [
  { key: 'products', label: 'Products' },
  { key: 'orders', label: 'Orders' },
  { key: 'leads', label: 'Leads' },
  { key: 'quotations', label: 'Quotations' },
  { key: 'employees', label: 'Employees' },
  { key: 'reports', label: 'Reports' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'leaves', label: 'Leaves' },
  { key: 'settings', label: 'Settings' },
  { key: 'crm', label: 'CRM' },
  { key: 'hrm', label: 'HRM' },
]

function PermissionsModule() {
  const [users, setUsers] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)
  const [editDialog, setEditDialog] = useState(false)
  const [editUser, setEditUser] = useState<any>(null)
  const [editRole, setEditRole] = useState('')
  const [editPermissions, setEditPermissions] = useState<string[]>([])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/users?limit=50')
      const json = await res.json()
      if (json.status) {
        setUsers(Array.isArray(json.data?.users) ? json.data.users : Array.isArray(json.data) ? json.data : [])
        setRoles(Array.isArray(json.data?.roles) ? json.data.roles : [])
      }
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const openEdit = (user: any) => {
    setEditUser(user)
    setEditRole(user.roleId || user.role?.id || '')
    const perms = user.role?.permissions
    try {
      const parsed = typeof perms === 'string' ? JSON.parse(perms) : (Array.isArray(perms) ? perms : [])
      setEditPermissions(Array.isArray(parsed) ? parsed : [])
    } catch { setEditPermissions([]) }
    setEditDialog(true)
  }

  const togglePermission = (key: string) => {
    setEditPermissions(prev => prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key])
  }

  const handleSave = async () => {
    if (!editUser) return
    setSaving(editUser.id)
    try {
      // Update user role
      const res = await fetch(`/api/users/${editUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleId: editRole }),
      })
      const json = await res.json()
      if (!json.status) { toast.error(json.message || 'Failed to update role'); return }

      // Update role permissions
      const targetRole = editRole || editUser.roleId
      if (targetRole) {
        await fetch('/api/roles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetRole, permissions: editPermissions }),
        })
      }

      setEditDialog(false)
      fetchData()
      toast.success('Permissions updated')
    } catch (e) { console.error(e); toast.error('Failed') } finally { setSaving(null) }
  }

  const roleBadgeCls = (rn: string) => {
    switch (rn) {
      case 'admin': return 'bg-[#59ff00]/20 text-[#59ff00] border-[#59ff00]/30'
      case 'manager': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'employee': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'customer': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <ModuleHeader title="Permissions & Roles" description="Manage user roles and granular permissions" icon={Lock} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={users.length} icon={Users} color="text-blue-400" />
        <StatCard label="Roles" value={roles.length} icon={Lock} color="text-purple-400" delay={0.1} />
        <StatCard label="Admins" value={users.filter((u: any) => u.role?.roleName === 'admin').length} icon={Shield} color="text-[#59ff00]" delay={0.2} />
        <StatCard label="Managers" value={users.filter((u: any) => u.role?.roleName === 'manager').length} icon={Award} color="text-yellow-400" delay={0.3} />
      </div>
      <Card className="bg-[#181818] border-[#2a2a2a]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Email</TableHead>
                  <TableHead className="text-gray-400">Role</TableHead>
                  <TableHead className="text-gray-400">Permissions</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u: any) => {
                  const perms = u.role?.permissions
                  let permList: string[] = []
                  try { const p = typeof perms === 'string' ? JSON.parse(perms) : perms; permList = Array.isArray(p) ? p : [] } catch { permList = [] }
                  return (
                    <TableRow key={u.id} className="border-[#2a2a2a] hover:bg-white/5">
                      <TableCell className="text-white text-sm font-medium">{u.name}</TableCell>
                      <TableCell className="text-gray-300 text-sm">{u.email}</TableCell>
                      <TableCell><Badge className={`text-[10px] ${roleBadgeCls(u.role?.roleName || '')}`}>{u.role?.roleName || 'unknown'}</Badge></TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="flex flex-wrap gap-1">
                          {permList.length > 0 ? permList.slice(0, 4).map((p: string) => (
                            <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-[#59ff00]/10 text-[#59ff00] border border-[#59ff00]/20 capitalize">{p}</span>
                          )) : <span className="text-gray-600 text-xs">None</span>}
                          {permList.length > 4 && <span className="text-gray-500 text-[10px]">+{permList.length - 4}</span>}
                        </div>
                      </TableCell>
                      <TableCell><Badge className={`text-[10px] ${statusBadgeCls(u.status)}`}>{u.status}</Badge></TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => openEdit(u)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3.5 h-3.5" /></Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {users.length === 0 && !loading && <TableRow><TableCell colSpan={6} className="text-center text-gray-500 py-8">No users found</TableCell></TableRow>}
                {loading && <TableRow><TableCell colSpan={6} className="text-center text-gray-500 py-8"><div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto" /></TableCell></TableRow>}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="text-white">Edit Permissions — {editUser?.name}</DialogTitle></DialogHeader>
          {editUser && (
            <div className="space-y-4">
              <FF label="Role">
                <Select value={editRole} onValueChange={setEditRole}>
                  <SelectTrigger className={inputCls}><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                    {roles.map((r: any) => <SelectItem key={r.id} value={r.id} className="text-white capitalize">{r.roleName}</SelectItem>)}
                  </SelectContent>
                </Select>
              </FF>
              <div className="space-y-2">
                <label className="text-gray-400 text-xs font-medium">Permissions</label>
                <div className="grid grid-cols-3 gap-2">
                  {ALL_PERMISSIONS.map(({ key, label }) => (
                    <button key={key} onClick={() => togglePermission(key)} type="button"
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${editPermissions.includes(key) ? 'bg-[#59ff00]/10 border-[#59ff00]/30 text-[#59ff00]' : 'bg-[#0b0b0b] border-[#2a2a2a] text-gray-400 hover:border-[#59ff00]/20'}`}>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${editPermissions.includes(key) ? 'bg-[#59ff00] border-[#59ff00]' : 'border-gray-500'}`}>
                        {editPermissions.includes(key) && <Check className="w-3 h-3 text-black" />}
                      </div>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setEditDialog(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSave} disabled={!!saving} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              {saving ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}


export default function HrmModules({ adminTab, employees }: HrmModulesProps) {
  switch (adminTab) {
    case 'hrm-dashboard': return <HrmDashboard employees={employees} />
    case 'hrm-departments': return <DepartmentsModule />
    case 'hrm-designations': return <DesignationsModule />
    case 'hrm-payroll': return <PayrollModule employees={employees} />
    case 'hrm-salary-slips': return <SalarySlipsModule />
    case 'hrm-recruitment': return <RecruitmentModule />
    case 'hrm-job-openings': return <JobOpeningsModule />
    case 'hrm-interviews': return <InterviewsModule />
    case 'hrm-performance': return <PerformanceModule employees={employees} />
    case 'hrm-appraisals': return <AppraisalsModule employees={employees} />
    case 'hrm-training': return <SimpleCrudModule title="Training Programs" desc="Organize employee training programs and skill development" icon={GraduationCap} apiPath="/api/training-programs" defaultForm={{ name: '', type: 'internal', duration: '', trainer: '', enrolled: 0, maxSeats: 0, status: 'upcoming' }} statsConfig={(items: any[]) => [
      { label: 'Active', value: items.filter((i: any) => i.status === 'ongoing').length, icon: GraduationCap, color: 'text-blue-400' },
      { label: 'Enrolled', value: items.reduce((a: number, i: any) => a + (i.enrolled || 0), 0), icon: Users, color: 'text-purple-400' },
      { label: 'Completed', value: items.filter((i: any) => i.status === 'completed').length, icon: Check, color: 'text-emerald-400' },
      { label: 'Upcoming', value: items.filter((i: any) => i.status === 'upcoming').length, icon: CalendarDays, color: 'text-yellow-400' },
    ]} tableConfig={{ headers: ['Name', 'Type', 'Duration', 'Enrolled', 'Status'], renderRow: (item: any) => [<span className="text-white text-sm">{item.name}</span>, <span className="text-gray-300 text-sm capitalize">{item.type}</span>, <span className="text-gray-300 text-sm">{item.duration || '-'}</span>, <span className="text-gray-300 text-sm">{item.enrolled}/{item.maxSeats || '∞'}</span>, <Badge className={`text-[10px] ${statusBadgeCls(item.status)}`}>{item.status}</Badge>] }} formConfig={[
      { key: 'name', label: 'Name' }, { key: 'type', label: 'Type', type: 'select', default: 'internal', options: [{ value: 'internal', label: 'Internal' }, { value: 'external', label: 'External' }, { value: 'online', label: 'Online' }] }, { key: 'duration', label: 'Duration' }, { key: 'trainer', label: 'Trainer' }, { key: 'enrolled', label: 'Enrolled', type: 'number' }, { key: 'maxSeats', label: 'Max Seats', type: 'number' }, { key: 'status', label: 'Status', type: 'select', default: 'upcoming', options: [{ value: 'upcoming', label: 'Upcoming' }, { value: 'ongoing', label: 'Ongoing' }, { value: 'completed', label: 'Completed' }] },
    ]} />
    case 'hrm-holidays': return <SimpleCrudModule title="Holidays" desc="Manage company holidays and optional holiday policies" icon={PartyPopper} apiPath="/api/holidays" defaultForm={{ name: '', date: '', type: 'public' }} statsConfig={(items: any[]) => [
      { label: 'This Year', value: items.length, icon: PartyPopper, color: 'text-blue-400' },
      { label: 'Upcoming', value: items.filter((i: any) => new Date(i.date) > new Date()).length, icon: CalendarDays, color: 'text-purple-400' },
      { label: 'Next Holiday', value: items.filter((i: any) => new Date(i.date) > new Date()).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]?.name || '-', icon: Star, color: 'text-yellow-400' },
      { label: 'Optional', value: items.filter((i: any) => i.type === 'optional').length, icon: Clock, color: 'text-gray-400' },
    ]} tableConfig={{ headers: ['Name', 'Date', 'Day', 'Type'], renderRow: (item: any) => [<span className="text-white text-sm">{item.name}</span>, <span className="text-gray-300 text-sm">{fmtDate(item.date)}</span>, <span className="text-gray-300 text-sm">{new Date(item.date).toLocaleDateString('en-IN', { weekday: 'short' })}</span>, <Badge className={`text-[10px] ${statusBadgeCls(item.type === 'public' ? 'active' : 'open')}`}>{item.type}</Badge>] }} formConfig={[
      { key: 'name', label: 'Name' }, { key: 'date', label: 'Date', type: 'date' }, { key: 'type', label: 'Type', type: 'select', default: 'public', options: [{ value: 'public', label: 'Public' }, { value: 'optional', label: 'Optional' }, { value: 'company', label: 'Company' }] },
    ]} />
    case 'hrm-notices': return <SimpleCrudModule title="Notices" desc="Post and manage company announcements and notices" icon={Bell} apiPath="/api/notices" defaultForm={{ title: '', content: '', priority: 'normal', postedBy: '', status: 'active' }} statsConfig={(items: any[]) => [
      { label: 'Active', value: items.filter((i: any) => i.status === 'active').length, icon: Bell, color: 'text-blue-400' },
      { label: 'Urgent', value: items.filter((i: any) => i.priority === 'urgent').length, icon: AlertTriangle, color: 'text-red-400' },
      { label: 'This Month', value: items.filter((i: any) => new Date(i.createdAt).getMonth() === new Date().getMonth()).length, icon: CalendarDays, color: 'text-purple-400' },
      { label: 'Total', value: items.length, icon: FileText, color: 'text-gray-400' },
    ]} tableConfig={{ headers: ['Title', 'Priority', 'Posted By', 'Date', 'Status'], renderRow: (item: any) => [<span className="text-white text-sm">{item.title}</span>, <Badge className={`text-[10px] ${priorityBadge(item.priority)}`}>{item.priority}</Badge>, <span className="text-gray-300 text-sm">{item.postedBy || '-'}</span>, <span className="text-gray-400 text-xs">{fmtDate(item.createdAt)}</span>, <Badge className={`text-[10px] ${statusBadgeCls(item.status)}`}>{item.status}</Badge>] }} formConfig={[
      { key: 'title', label: 'Title' }, { key: 'content', label: 'Content', type: 'textarea' }, { key: 'priority', label: 'Priority', type: 'select', default: 'normal', options: [{ value: 'normal', label: 'Normal' }, { value: 'high', label: 'High' }, { value: 'urgent', label: 'Urgent' }] }, { key: 'postedBy', label: 'Posted By' }, { key: 'status', label: 'Status', type: 'select', default: 'active', options: [{ value: 'active', label: 'Active' }, { value: 'archived', label: 'Archived' }] },
    ]} />
    case 'hrm-assets': return <SimpleCrudModule title="Assets" desc="Track company assets assigned to employees" icon={Monitor} apiPath="/api/assets" defaultForm={{ name: '', type: 'electronics', serialNo: '', value: 0, assignedTo: '', purchaseDate: '', status: 'available' }} statsConfig={(items: any[]) => [
      { label: 'Total Assets', value: items.length, icon: Monitor, color: 'text-blue-400' },
      { label: 'Assigned', value: items.filter((i: any) => i.status === 'assigned').length, icon: Check, color: 'text-emerald-400' },
      { label: 'Available', value: items.filter((i: any) => i.status === 'available').length, icon: Package, color: 'text-yellow-400' },
      { label: 'Value', value: fmt(items.reduce((a: number, i: any) => a + (i.value || 0), 0)), icon: DollarSign, color: 'text-[#59ff00]' },
    ]} tableConfig={{ headers: ['Name', 'Type', 'Serial No', 'Value', 'Status'], renderRow: (item: any) => [<span className="text-white text-sm">{item.name}</span>, <span className="text-gray-300 text-sm capitalize">{item.type}</span>, <span className="text-gray-400 text-sm font-mono">{item.serialNo || '-'}</span>, <span className="text-gray-300 text-sm">{fmt(item.value)}</span>, <Badge className={`text-[10px] ${statusBadgeCls(item.status)}`}>{item.status}</Badge>] }} formConfig={[
      { key: 'name', label: 'Name' }, { key: 'type', label: 'Type', type: 'select', default: 'electronics', options: [{ value: 'electronics', label: 'Electronics' }, { value: 'furniture', label: 'Furniture' }, { value: 'vehicle', label: 'Vehicle' }, { value: 'equipment', label: 'Equipment' }] }, { key: 'serialNo', label: 'Serial No' }, { key: 'value', label: 'Value', type: 'number' }, { key: 'purchaseDate', label: 'Purchase Date', type: 'date' }, { key: 'status', label: 'Status', type: 'select', default: 'available', options: [{ value: 'available', label: 'Available' }, { value: 'assigned', label: 'Assigned' }, { value: 'maintenance', label: 'Maintenance' }, { value: 'retired', label: 'Retired' }] },
    ]} />
    case 'hrm-documents': return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <ModuleHeader title="Documents" description="Manage employee documents and compliance records" icon={FolderOpen} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Employees" value={employees.length} icon={FolderOpen} color="text-blue-400" />
          <StatCard label="With Docs" value={employees.filter((e: any) => e.documents).length} icon={Check} color="text-emerald-400" delay={0.1} />
          <StatCard label="Pending" value={employees.filter((e: any) => !e.documents).length} icon={Clock} color="text-yellow-400" delay={0.2} />
          <StatCard label="Verified" value={employees.filter((e: any) => e.documents).length} icon={Shield} color="text-[#59ff00]" delay={0.3} />
        </div>
        <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-0"><Table><TableHeader><TableRow className="border-[#2a2a2a] hover:bg-transparent"><TableHead className="text-gray-400">Employee</TableHead><TableHead className="text-gray-400">Department</TableHead><TableHead className="text-gray-400">Documents</TableHead><TableHead className="text-gray-400">Status</TableHead></TableRow></TableHeader>
          <TableBody>{employees.map((e: any) => { let docCount = 0; try { docCount = JSON.parse(e.documents || '[]').length } catch {} return (
            <TableRow key={e.id} className="border-[#2a2a2a] hover:bg-white/5"><TableCell className="text-white text-sm">{e.user?.name || e.name}</TableCell><TableCell className="text-gray-300 text-sm">{e.department}</TableCell><TableCell className="text-gray-300 text-sm">{docCount} document{docCount !== 1 ? 's' : ''}</TableCell><TableCell><Badge className={`text-[10px] ${docCount > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{docCount > 0 ? 'Verified' : 'Pending'}</Badge></TableCell></TableRow>
          )})}{employees.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-gray-500 py-8">No employees found</TableCell></TableRow>}</TableBody></Table></CardContent></Card>
      </motion.div>
    )
    case 'hrm-shifts': return <SimpleCrudModule title="Shift Management" desc="Define and manage employee shift schedules" icon={Clock4} apiPath="/api/shifts" defaultForm={{ name: '', startTime: '09:00', endTime: '18:00', breakDuration: 30, employees: 0, supervisor: '', status: 'active' }} statsConfig={(items: any[]) => [
      { label: 'Active Shifts', value: items.filter((i: any) => i.status === 'active').length, icon: Clock4, color: 'text-blue-400' },
      { label: 'Total Employees', value: items.reduce((a: number, i: any) => a + (i.employees || 0), 0), icon: Users, color: 'text-purple-400' },
      { label: 'Coverage', value: items.length > 0 ? '98%' : '0%', icon: Check, color: 'text-emerald-400' },
      { label: 'Supervisors', value: items.filter((i: any) => i.supervisor).length, icon: Star, color: 'text-yellow-400' },
    ]} tableConfig={{ headers: ['Name', 'Start', 'End', 'Break', 'Employees', 'Status'], renderRow: (item: any) => [<span className="text-white text-sm">{item.name}</span>, <span className="text-gray-300 text-sm">{item.startTime}</span>, <span className="text-gray-300 text-sm">{item.endTime}</span>, <span className="text-gray-300 text-sm">{item.breakDuration}m</span>, <span className="text-gray-300 text-sm">{item.employees}</span>, <Badge className={`text-[10px] ${statusBadgeCls(item.status)}`}>{item.status}</Badge>] }} formConfig={[
      { key: 'name', label: 'Name' }, { key: 'startTime', label: 'Start Time' }, { key: 'endTime', label: 'End Time' }, { key: 'breakDuration', label: 'Break (min)', type: 'number' }, { key: 'employees', label: 'Employees', type: 'number' }, { key: 'supervisor', label: 'Supervisor' }, { key: 'status', label: 'Status', type: 'select', default: 'active', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
    ]} />
    case 'hrm-work-reports': return <EmployeeWorkbookModule employees={employees} />
    case 'hrm-team': return <SimpleCrudModule title="Team Management" desc="Organize teams, assign leads, and manage team structures" icon={UsersRound} apiPath="/api/teams" defaultForm={{ name: '', leadId: '', members: 0, department: '', status: 'active' }} statsConfig={(items: any[]) => [
      { label: 'Teams', value: items.length, icon: UsersRound, color: 'text-blue-400' },
      { label: 'Members', value: items.reduce((a: number, i: any) => a + (i.members || 0), 0), icon: Users, color: 'text-purple-400' },
      { label: 'Team Leads', value: items.filter((i: any) => i.leadId).length, icon: Star, color: 'text-yellow-400' },
      { label: 'Active', value: items.filter((i: any) => i.status === 'active').length, icon: Check, color: 'text-emerald-400' },
    ]} tableConfig={{ headers: ['Name', 'Lead', 'Members', 'Department', 'Status'], renderRow: (item: any) => [<span className="text-white text-sm">{item.name}</span>, <span className="text-gray-300 text-sm">{item.leadId || '-'}</span>, <span className="text-gray-300 text-sm">{item.members}</span>, <span className="text-gray-300 text-sm">{item.department || '-'}</span>, <Badge className={`text-[10px] ${statusBadgeCls(item.status)}`}>{item.status}</Badge>] }} formConfig={[
      { key: 'name', label: 'Name' }, { key: 'members', label: 'Members', type: 'number' }, { key: 'department', label: 'Department' }, { key: 'status', label: 'Status', type: 'select', default: 'active', options: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
    ]} />
    case 'hrm-permissions': return <PermissionsModule />
    case 'hrm-attendance': return <EmployeeLiveLocationTab />
    case 'hrm-leaves': return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <ModuleHeader title="Leaves" description="Manage employee leave requests and approvals" icon={CalendarDays} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="On Leave" value={employees.filter((e: any) => e.status === 'on_leave').length} icon={CalendarDays} color="text-blue-400" />
          <StatCard label="Active Staff" value={employees.filter((e: any) => e.status === 'active').length} icon={Check} color="text-emerald-400" delay={0.1} />
          <StatCard label="Departments" value={new Set(employees.map((e: any) => e.department).filter(Boolean)).size} icon={Network} color="text-purple-400" delay={0.2} />
          <StatCard label="Total Staff" value={employees.length} icon={Users} color="text-yellow-400" delay={0.3} />
        </div>
        <Card className="bg-[#181818] border-[#2a2a2a]"><CardContent className="p-4"><p className="text-gray-400 text-sm text-center">View and manage all leave requests in the dedicated Leaves tab from the main sidebar.</p></CardContent></Card>
      </motion.div>
    )
    default: return null
  }
}
