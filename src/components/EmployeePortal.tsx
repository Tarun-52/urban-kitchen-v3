'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Clock, CheckSquare, DollarSign, CalendarDays,
  LogOut, Play, Square, ChevronDown, ChevronUp, AlertCircle,
  CheckCircle2, Circle, ArrowUpRight, FileText, Plus, Loader2,
  Users, Filter, GitBranch, Phone, Mail, MapPin, Building2, TrendingUp,
  Locate, Navigation, MapPinned, Briefcase, Wrench, Truck, Eye,
  Hammer, ClipboardCheck, Timer, RotateCcw, Trash2, Pencil
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { useAppStore, type EmployeeTab } from '@/lib/store'
import { toast } from 'sonner'
import dynamic from 'next/dynamic'

import EmployeeLocationTracker from "@/components/EmployeeLocationTracker";
const LiveMap = dynamic(() => import('@/components/LiveMap'), { ssr: false })

const formatPrice = (price: number) => {
  if (price === 0) return 'Request Quote'
  const str = price.toString()
  let lastThree = str.substring(str.length - 3)
  const otherNumbers = str.substring(0, str.length - 3)
  if (otherNumbers !== '') lastThree = ',' + lastThree
  return '₹' + otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree
}

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
const formatTime = (d: string) => new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

const statusColor: Record<string, string> = {
  present: 'bg-green-500/10 text-green-400 border-green-500/20',
  absent: 'bg-red-500/10 text-red-400 border-red-500/20',
  half_day: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  holiday: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  in_progress: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  completed: 'bg-green-500/10 text-green-400 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  urgent: 'bg-red-500/10 text-red-400 border-red-500/20',
  approved: 'bg-green-500/10 text-green-400 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
  active: 'bg-green-500/10 text-green-400 border-green-500/20',
  // Lead status colors
  new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  contacted: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  quotation_sent: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  negotiation: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  won: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  lost: 'bg-red-500/10 text-red-400 border-red-500/20',
  postponed: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  pending_followup: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
}

const priorityIcon: Record<string, React.ReactNode> = {
  low: <ArrowUpRight className="w-3 h-3 text-blue-400" />,
  medium: <ArrowUpRight className="w-3 h-3 text-yellow-400" />,
  high: <AlertCircle className="w-3 h-3 text-orange-400" />,
  urgent: <AlertCircle className="w-3 h-3 text-red-400" />,
}

const tabs: { id: EmployeeTab; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'attendance', label: 'Attendance', icon: <Clock className="w-4 h-4" /> },
  { id: 'fieldwork', label: 'Daily Work', icon: <CalendarDays className="w-4 h-4" /> },
  { id: 'tasks', label: 'My Tasks', icon: <CheckSquare className="w-4 h-4" /> },
  { id: 'leads', label: 'My Leads', icon: <Users className="w-4 h-4" /> },
  { id: 'pipeline', label: 'Pipeline', icon: <GitBranch className="w-4 h-4" /> },
  { id: 'salary', label: 'Salary', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'leaves', label: 'Leaves', icon: <CalendarDays className="w-4 h-4" /> },
]

export default function EmployeePortal() {
  const { employeeTab, setEmployeeTab, setView, user, setUser } = useAppStore()
  const [tasks, setTasks] = useState<any[]>([])
  const [attendance, setAttendance] = useState<any[]>([])
  const [leaves, setLeaves] = useState<any[]>([])
  const [salarySlips, setSalarySlips] = useState<any[]>([])
  const [employee, setEmployee] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [checkedIn, setCheckedIn] = useState(false)
  const [checkinTime, setCheckinTime] = useState<string | null>(null)
  const [checkoutTime, setCheckoutTime] = useState<string | null>(null)
  const [leaveDialog, setLeaveDialog] = useState(false)
  const [taskFilter, setTaskFilter] = useState('all')
  const [submitting, setSubmitting] = useState(false)
  const [autoCreating, setAutoCreating] = useState(false)

  // Live location state
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [leads, setLeads] = useState<any[]>([])
  const [pipelineDeals, setPipelineDeals] = useState<any[]>([])
  const [leadDialog, setLeadDialog] = useState(false)
  const [newLead, setNewLead] = useState({ name: '', company: '', phone: '', email: '', city: '', requirement: '', message: '', source: 'website' })

  // Field work state
  const [fieldWork, setFieldWork] = useState<any[]>([])
  const [fieldWorkStats, setFieldWorkStats] = useState<any>(null)
  const [fieldWorkDialog, setFieldWorkDialog] = useState(false)
  const [fieldWorkFilter, setFieldWorkFilter] = useState('all')
  const [newFieldWork, setNewFieldWork] = useState({
    workType: 'site_visit',
    title: '',
    description: '',
    clientName: '',
    clientPhone: '',
    clientCompany: '',
    followUpDate: '',
    followUpNote: '',
    outcome: '',
    postponeReason: '',
    newMeetingDate: '',
  })

  // Postpone dialog & calendar view state
  const [postponeDialog, setPostponeDialog] = useState(false)
  const [postponeForm, setPostponeForm] = useState({ entryId: '', newDate: '', reason: '' })
  const [fieldWorkView, setFieldWorkView] = useState<'list' | 'calendar'>('list')
  const [selectedCalDate, setSelectedCalDate] = useState<number | null>(null)

  // Edit field work state
  const [editFieldWorkDialog, setEditFieldWorkDialog] = useState(false)
  const [editFieldWorkEntry, setEditFieldWorkEntry] = useState<any>(null)
  const [editFieldWorkForm, setEditFieldWorkForm] = useState({
    workType: 'site_visit',
    title: '',
    description: '',
    clientName: '',
    clientPhone: '',
    clientCompany: '',
    followUpDate: '',
    followUpNote: '',
    status: 'completed',
  })

  // Fetch employee record for logged-in user
  const fetchEmployee = useCallback(async (userId: string) => {
    if (!userId) return null
    try {
      const res = await fetch(`/api/employees?limit=100`)
      const data = await res.json()
      if (data.status) {
        const emps = data.data?.employees || data.data || []
        const myEmp = emps.find((e: any) => e.userId === userId)
        if (myEmp) {
          setEmployee(myEmp)
          return myEmp
        }
      }
    } catch (err) {
      console.error('Failed to fetch employee:', err)
    }
    return null
  }, [])

  // Fetch attendance for employee
  const fetchAttendance = useCallback(async (empId: string) => {
    try {
      const res = await fetch(`/api/attendance?employeeId=${empId}&limit=30`)
      const data = await res.json()
      if (data.status) {
        const records = data.data?.records || data.data || []
        setAttendance(records)
        // Check today's check-in status
        const today = new Date().toDateString()
        const todayAtt = records.find((a: any) => new Date(a.date).toDateString() === today)
        if (todayAtt?.checkin) {
          setCheckedIn(true)
          setCheckinTime(formatTime(todayAtt.checkin))
          if (todayAtt.checkout) {
            setCheckoutTime(formatTime(todayAtt.checkout))
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch attendance:', err)
    }
  }, [])

  // Fetch tasks for employee
  const fetchTasks = useCallback(async (empId: string) => {
    try {
      const res = await fetch(`/api/tasks?employeeId=${empId}&limit=50`)
      const data = await res.json()
      if (data.status) {
        setTasks(data.data?.tasks || data.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
    }
  }, [])

  // Fetch leaves for employee
  const fetchLeaves = useCallback(async (empId: string) => {
    try {
      const res = await fetch(`/api/leaves?employeeId=${empId}&limit=50`)
      const data = await res.json()
      if (data.status) {
        setLeaves(data.data?.leaves || data.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch leaves:', err)
    }
  }, [])

  // Fetch salary slips for employee
  const fetchSalarySlips = useCallback(async (empId: string) => {
    try {
      const res = await fetch(`/api/salary-slips?employeeId=${empId}&limit=12`)
      const data = await res.json()
      if (data.status) {
        const raw = data.data?.slips || data.data || []
        setSalarySlips(Array.isArray(raw) ? raw : [])
      }
    } catch (err) {
      console.error('Failed to fetch salary slips:', err)
    }
  }, [])

  // Fetch leads assigned to this employee
  const fetchLeadsData = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/leads?assignedTo=${userId}&limit=50`)
      const data = await res.json()
      if (data.status) {
        const raw = data.data?.leads || data.data || []
        setLeads(Array.isArray(raw) ? raw : [])
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    }
  }, [])

  // Fetch pipeline deals
  const fetchPipelineDeals = useCallback(async () => {
    try {
      const res = await fetch('/api/pipeline-deals?limit=50')
      const data = await res.json()
      if (data.status) {
        const raw = data.data?.deals || data.data || []
        setPipelineDeals(Array.isArray(raw) ? raw : [])
      }
    } catch (err) {
      console.error('Failed to fetch pipeline deals:', err)
    }
  }, [])

  // Fetch daily field work for employee
  const fetchFieldWork = useCallback(async (empId: string) => {
    try {
      const res = await fetch(`/api/daily-field-work?employeeId=${empId}&limit=50`)
      const data = await res.json()
      if (data.status) {
        const raw = data.data?.entries || []
        setFieldWork(Array.isArray(raw) ? raw : [])
        setFieldWorkStats(data.data?.stats || null)
      }
    } catch (err) {
      console.error('Failed to fetch field work:', err)
    }
  }, [])

  // Load all data on mount
  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return
      setLoading(true)
      try {
        const emp = await fetchEmployee(user.id)
        if (emp) {
          await Promise.all([
            fetchAttendance(emp.id),
            fetchTasks(emp.id),
            fetchLeaves(emp.id),
            fetchSalarySlips(emp.id),
            fetchLeadsData(user.id),
            fetchPipelineDeals(),
            fetchFieldWork(emp.id),
          ])
        }
      } catch (err) {
        console.error('Failed to load employee data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [user?.id, fetchEmployee, fetchAttendance, fetchTasks, fetchLeaves, fetchSalarySlips, fetchLeadsData, fetchPipelineDeals, fetchFieldWork])

  // Capture current live location (optional - returns null if unavailable)
  const captureLocation = (options?: { silent?: boolean }): Promise<{ lat: number; lng: number; address: string } | null> => {
    return new Promise((resolve) => {
      try {
        if (typeof navigator === 'undefined' || !navigator.geolocation) {
          if (!options?.silent) toast.error('Geolocation is not supported by your browser')
          resolve(null)
          return
        }
        setLocationLoading(true)
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            let address = 'Location captured'
            // Reverse geocode using Google Maps API
            try {
              const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
              if (apiKey && !apiKey.includes('placeholder')) {
                const res = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
                )
                const data = await res.json()
                if (data.results?.[0]) {
                  address = data.results[0].formatted_address
                }
              }
            } catch {
              // Fallback to basic address
            }
            const loc = { lat, lng, address }
            setCurrentLocation(loc)
            setLocationLoading(false)
            resolve(loc)
          },
          (error) => {
            let msg = 'Unable to get location'
            if (error.code === 1) msg = 'Location permission denied. Please enable it.'
            else if (error.code === 2) msg = 'Location unavailable'
            else if (error.code === 3) msg = 'Location request timed out'
            if (!options?.silent) toast.error(msg)
            setLocationLoading(false)
            resolve(null)
          },
          { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
        )
      } catch {
        if (!options?.silent) toast.error('Failed to access geolocation')
        setLocationLoading(false)
        resolve(null)
      }
    })
  }

  // Check-in / Check-out handler with live location
  const handleCheckIn = async () => {
    if (!employee) return
    setSubmitting(true)
    try {
      const action = checkedIn ? 'checkout' : 'checkin'

      // Capture live location before check-in/out (optional - proceeds without if unavailable)
      const location = await captureLocation({ silent: true })
      if (!location) {
        toast.warning('Location unavailable, proceeding without location')
      }

      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: employee.id,
          action,
          latitude: location?.lat,
          longitude: location?.lng,
          address: location?.address,
          source: 'web',
        }),
      })
      const data = await res.json()
      if (data.status) {
        if (action === 'checkin') {
          setCheckedIn(true)
          setCheckinTime(formatTime(new Date().toISOString()))
          setCheckoutTime(null)
          toast.success('Checked in successfully' + (location ? ` from ${location.address}` : ''))
        } else {
          setCheckedIn(false)
          setCheckoutTime(formatTime(new Date().toISOString()))
          toast.success('Checked out successfully' + (location ? ` from ${location.address}` : ''))
        }
        // Refresh attendance
        await fetchAttendance(employee.id)
      } else {
        toast.error(data.message || 'Failed to update attendance')
      }
    } catch {
      toast.error('Failed to update attendance')
    } finally {
      setSubmitting(false)
    }
  }

  // Update task status
  const handleTaskStatus = async (taskId: string, status: string) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, status }),
      })
      const data = await res.json()
      if (data.status) {
        toast.success(`Task marked as ${status.replace('_', ' ')}`)
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t))
      } else {
        toast.error(data.message || 'Failed to update task')
      }
    } catch {
      toast.error('Failed to update task')
    }
  }

  // Apply for leave
  const handleApplyLeave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!employee) {
      toast.error('Employee record not found')
      return
    }
    const form = e.currentTarget
    const formData = new FormData(form)
    const type = formData.get('type') as string
    const startDate = formData.get('startDate') as string
    const endDate = formData.get('endDate') as string
    const reason = formData.get('reason') as string

    if (!type || !startDate || !endDate) {
      toast.error('Please fill all required fields')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/leaves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: employee.id,
          type,
          startDate,
          endDate,
          reason,
        }),
      })
      const data = await res.json()
      if (data.status) {
        toast.success('Leave application submitted successfully')
        setLeaveDialog(false)
        // Reset form
        form.reset()
        // Refresh leaves
        await fetchLeaves(employee.id)
      } else {
        toast.error(data.message || 'Failed to apply for leave')
      }
    } catch {
      toast.error('Failed to apply for leave')
    } finally {
      setSubmitting(false)
    }
  }

  // Update lead status
  const handleLeadStatus = async (leadId: string, status: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const data = await res.json()
      if (data.status) {
        toast.success(`Lead status updated to ${status.replace('_', ' ')}`)
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l))
      } else {
        toast.error(data.message || 'Failed to update lead status')
      }
    } catch {
      toast.error('Failed to update lead status')
    }
  }

  // Create new lead
  const handleCreateLead = async () => {
    if (!user?.id) {
      toast.error('User not found')
      return
    }
    if (!newLead.name || !newLead.phone) {
      toast.error('Name and phone are required')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newLead,
          assignedTo: user.id,
        }),
      })
      const data = await res.json()
      if (data.status) {
        toast.success('Lead created successfully')
        setLeadDialog(false)
        setNewLead({ name: '', company: '', phone: '', email: '', city: '', requirement: '', message: '', source: 'website' })
        await fetchLeadsData(user.id)
      } else {
        toast.error(data.message || 'Failed to create lead')
      }
    } catch {
      toast.error('Failed to create lead')
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setView('home')
  }

  // Create new field work entry
  const handleCreateFieldWork = async () => {
    if (!employee) {
      toast.error('Employee record not found')
      return
    }
    if (!newFieldWork.title) {
      toast.error('Title is required')
      return
    }
    setSubmitting(true)
    try {
      // Capture location (optional - proceeds without if unavailable)
      const location = await captureLocation({ silent: true })
      if (!location) {
        toast.warning('Location unavailable, proceeding without location')
      }

      const res = await fetch('/api/daily-field-work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: employee.id,
          date: new Date().toISOString(),
          workType: newFieldWork.workType,
          title: newFieldWork.title,
          description: newFieldWork.description,
          clientName: newFieldWork.clientName,
          clientPhone: newFieldWork.clientPhone,
          clientCompany: newFieldWork.clientCompany,
          followUpDate: newFieldWork.workType === 'meeting' && newFieldWork.outcome === 'postponed' ? newFieldWork.newMeetingDate : newFieldWork.followUpDate,
          followUpNote: newFieldWork.workType === 'meeting' && newFieldWork.outcome === 'postponed' ? newFieldWork.postponeReason : newFieldWork.followUpNote,
          status: newFieldWork.workType === 'meeting' && newFieldWork.outcome === 'postponed' ? 'postponed' : newFieldWork.workType === 'meeting' && newFieldWork.outcome === 'follow_up_needed' ? 'pending_followup' : undefined,
          latitude: location?.lat,
          longitude: location?.lng,
          address: location?.address,
        }),
      })
      const data = await res.json()
      if (data.status) {
        toast.success(newFieldWork.workType === 'meeting' ? 'Meeting added successfully' : 'Work entry added successfully')
        setFieldWorkDialog(false)
        setNewFieldWork({
          workType: 'site_visit',
          title: '',
          description: '',
          clientName: '',
          clientPhone: '',
          clientCompany: '',
          followUpDate: '',
          followUpNote: '',
          outcome: '',
          postponeReason: '',
          newMeetingDate: '',
        })
        await fetchFieldWork(employee.id)
        // Also refresh tasks since follow-up may have been created
        await fetchTasks(employee.id)
      } else {
        toast.error(data.message || 'Failed to add field work entry')
      }
    } catch {
      toast.error('Failed to add field work entry')
    } finally {
      setSubmitting(false)
    }
  }

  // Delete field work entry
  const handleDeleteFieldWork = async (id: string) => {
    if (!employee) return
    try {
      const res = await fetch(`/api/daily-field-work?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.status) {
        toast.success('Entry deleted')
        await fetchFieldWork(employee.id)
      } else {
        toast.error(data.message || 'Failed to delete entry')
      }
    } catch {
      toast.error('Failed to delete entry')
    }
  }

  // Edit field work entry
  const handleEditFieldWork = async () => {
    if (!employee || !editFieldWorkEntry) return
    if (!editFieldWorkForm.title) {
      toast.error('Title is required')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/daily-field-work', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editFieldWorkEntry.id,
          workType: editFieldWorkForm.workType,
          title: editFieldWorkForm.title,
          description: editFieldWorkForm.description,
          clientName: editFieldWorkForm.clientName,
          clientPhone: editFieldWorkForm.clientPhone,
          clientCompany: editFieldWorkForm.clientCompany,
          followUpDate: editFieldWorkForm.followUpDate || undefined,
          followUpNote: editFieldWorkForm.followUpNote || undefined,
          status: editFieldWorkForm.status,
        }),
      })
      const data = await res.json()
      if (data.status) {
        toast.success(editFieldWorkForm.workType === 'meeting' ? 'Meeting updated successfully' : 'Work entry updated successfully')
        setEditFieldWorkDialog(false)
        setEditFieldWorkEntry(null)
        setEditFieldWorkForm({
          workType: 'site_visit',
          title: '',
          description: '',
          clientName: '',
          clientPhone: '',
          clientCompany: '',
          followUpDate: '',
          followUpNote: '',
          status: 'completed',
        })
        await fetchFieldWork(employee.id)
      } else {
        toast.error(data.message || 'Failed to update entry')
      }
    } catch {
      toast.error('Failed to update entry')
    } finally {
      setSubmitting(false)
    }
  }

  // Postpone a meeting entry
  const handlePostponeMeeting = async () => {
    if (!employee) return
    if (!postponeForm.newDate || !postponeForm.reason) {
      toast.error('Please provide new date and reason')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/daily-field-work', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: postponeForm.entryId,
          status: 'postponed',
          followUpDate: postponeForm.newDate,
          followUpNote: postponeForm.reason,
        }),
      })
      const data = await res.json()
      if (data.status) {
        toast.success('Meeting postponed successfully')
        setPostponeDialog(false)
        setPostponeForm({ entryId: '', newDate: '', reason: '' })
        await fetchFieldWork(employee.id)
        await fetchTasks(employee.id)
      } else {
        toast.error(data.message || 'Failed to postpone meeting')
      }
    } catch {
      toast.error('Failed to postpone meeting')
    } finally {
      setSubmitting(false)
    }
  }

  // Mark an entry as completed
  const handleMarkCompleted = async (entryId: string) => {
    if (!employee) return
    try {
      const res = await fetch('/api/daily-field-work', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entryId, status: 'completed' }),
      })
      const data = await res.json()
      if (data.status) {
        toast.success('Marked as completed')
        await fetchFieldWork(employee.id)
      } else {
        toast.error(data.message || 'Failed to update status')
      }
    } catch {
      toast.error('Failed to update status')
    }
  }

  const pendingTasks = tasks.filter(t => t.status === 'pending').length
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const filteredTasks = taskFilter === 'all' ? tasks : tasks.filter(t => t.status === taskFilter)

  // Leave balance calculation
  const casualUsed = leaves.filter((l: any) => l.type === 'casual' && l.status === 'approved').length
  const sickUsed = leaves.filter((l: any) => l.type === 'sick' && l.status === 'approved').length
  const earnedUsed = leaves.filter((l: any) => l.type === 'earned' && l.status === 'approved').length

  const leaveBalances = [
    { type: 'Casual', total: 12, used: casualUsed, color: 'bg-blue-500' },
    { type: 'Sick', total: 10, used: sickUsed, color: 'bg-red-500' },
    { type: 'Earned', total: 15, used: earnedUsed, color: 'bg-green-500' },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#59ff00] animate-spin" />
          <p className="text-gray-500 text-sm">Loading employee portal...</p>
        </div>
      </div>
    )
  }

  // Auto-create employee record if user has employee role but no Employee record
  const handleAutoCreateEmployee = async () => {
    if (!user?.id) return
    setAutoCreating(true)
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          password: 'changeme123',
          department: 'General',
          designation: 'Field Executive',
          salary: 0,
          joiningDate: new Date().toISOString(),
        }),
      })
      const data = await res.json()
      if (data.status) {
        toast.success('Employee record created! Reloading...')
        setEmployee(data.data)
        setTimeout(() => window.location.reload(), 1000)
      } else {
        toast.error(data.message || 'Failed to create employee record')
      }
    } catch {
      toast.error('Failed to create employee record')
    } finally {
      setAutoCreating(false)
    }
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24 flex items-center justify-center">
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-8 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-white font-semibold text-lg mb-2">Employee Record Not Found</h2>
          <p className="text-gray-500 text-sm mb-4">Your account does not have an associated employee record. Click below to auto-create one, or contact HR.</p>
          <div className="flex flex-col gap-2">
            <Button onClick={handleAutoCreateEmployee} disabled={autoCreating} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              {autoCreating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : 'Create Employee Record'}
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-[#2a2a2a] text-gray-400">
              <LogOut className="w-4 h-4 mr-2" />Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-poppins)] text-xl md:text-2xl font-bold text-white">Employee Portal</h1>
            <p className="text-gray-500 text-sm">Welcome, {user?.name || employee?.user?.name || 'Employee'}</p>
          </div>
          <Button onClick={handleLogout} variant="ghost" className="text-gray-500 hover:text-red-400 text-sm">
            <LogOut className="w-4 h-4 mr-2" />Logout
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-56 shrink-0">
            <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-2 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible sticky top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setEmployeeTab(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    employeeTab === tab.id
                      ? 'bg-[#59ff00]/10 text-[#59ff00]'
                      : 'text-gray-500 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.div key={employeeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

              {/* ===================== DASHBOARD TAB ===================== */}
              {employeeTab === 'dashboard' && (
                <div>
                  <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white mb-4">Dashboard</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">Today&apos;s Status</div>
                          <div className="text-green-400 font-semibold">
                            {checkedIn ? (checkoutTime ? 'Checked Out' : 'Checked In') : 'Not Checked In'}
                          </div>
                        </div>
                      </div>
                      {checkinTime && <div className="text-gray-600 text-xs mt-2 ml-13">Since {checkinTime}</div>}
                    </div>
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">Pending Tasks</div>
                          <div className="text-yellow-400 font-semibold text-lg">{pendingTasks}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Play className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">In Progress</div>
                          <div className="text-blue-400 font-semibold text-lg">{inProgressTasks}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#59ff00]/10 flex items-center justify-center">
                          <CheckSquare className="w-5 h-5 text-[#59ff00]" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">Completed</div>
                          <div className="text-[#59ff00] font-semibold text-lg">{completedTasks}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-6">
                    <h3 className="font-[family-name:var(--font-poppins)] text-white font-semibold mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <button
                        onClick={handleCheckIn}
                        disabled={submitting || !!checkoutTime}
                        className={`flex flex-col items-center gap-2 rounded-lg p-4 transition-colors disabled:opacity-50 ${
                          checkoutTime
                            ? 'bg-gray-500/10 border border-gray-500/20 text-gray-500'
                            : checkedIn
                            ? 'bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20'
                            : 'bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 hover:text-[#59ff00] hover:border-[#59ff00]/30'
                        }`}
                      >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : checkoutTime ? <Square className="w-5 h-5" /> : checkedIn ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        <span className="text-xs">{checkoutTime ? 'Done for Today' : checkedIn ? 'Check Out' : 'Check In'}</span>
                      </button>
                      <button
                        onClick={() => setEmployeeTab('tasks')}
                        className="flex flex-col items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-gray-400 hover:text-[#59ff00] hover:border-[#59ff00]/30 transition-colors"
                      >
                        <CheckSquare className="w-5 h-5" /><span className="text-xs">View Tasks</span>
                      </button>
                      <button
                        onClick={() => setEmployeeTab('fieldwork')}
                        className="flex flex-col items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-gray-400 hover:text-[#59ff00] hover:border-[#59ff00]/30 transition-colors"
                      >
                        <Briefcase className="w-5 h-5" /><span className="text-xs">Daily Work</span>
                      </button>
                      <button
                        onClick={() => setLeaveDialog(true)}
                        className="flex flex-col items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-gray-400 hover:text-[#59ff00] hover:border-[#59ff00]/30 transition-colors"
                      >
                        <CalendarDays className="w-5 h-5" /><span className="text-xs">Apply Leave</span>
                      </button>
                      <button
                        onClick={() => setEmployeeTab('salary')}
                        className="flex flex-col items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 text-gray-400 hover:text-[#59ff00] hover:border-[#59ff00]/30 transition-colors"
                      >
                        <DollarSign className="w-5 h-5" /><span className="text-xs">View Payslip</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Tasks */}
                  {tasks.filter(t => t.status === 'in_progress').length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-white font-semibold mb-3">Active Tasks</h3>
                      <div className="space-y-2">
                        {tasks.filter(t => t.status === 'in_progress').map(task => (
                          <div key={task.id} className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {priorityIcon[task.priority]}
                              <div>
                                <div className="text-white text-sm">{task.title}</div>
                                <div className="text-gray-600 text-xs">Due: {task.dueDate ? formatDate(task.dueDate) : 'N/A'}</div>
                              </div>
                            </div>
                            <Badge className={`${statusColor[task.priority] || ''} text-xs`}>{task.priority}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Today's Field Work */}
                  {(() => {
                    const todayFW = fieldWork.filter((fw: any) => new Date(fw.date).toDateString() === new Date().toDateString())
                    if (todayFW.length === 0) return null
                    return (
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-semibold flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-[#59ff00]" />
                            Today&apos;s Work & Meetings
                          </h3>
                          <button onClick={() => setEmployeeTab('fieldwork')} className="text-[#59ff00] text-xs hover:underline">View All</button>
                        </div>
                        <div className="space-y-2">
                          {todayFW.map((fw: any) => (
                            <div key={fw.id} className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#59ff00]/10 flex items-center justify-center">
                                  <Briefcase className="w-4 h-4 text-[#59ff00]" />
                                </div>
                                <div>
                                  <div className="text-white text-sm">{fw.title}</div>
                                  <div className="text-gray-600 text-xs capitalize">{fw.workType?.replace('_', ' ')}{fw.clientName ? ` • ${fw.clientName}` : ''}</div>
                                </div>
                              </div>
                              <Badge className={`${statusColor[fw.status] || ''} text-xs`}>{fw.status === 'pending_followup' ? 'Follow-up' : fw.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* ===================== ATTENDANCE TAB ===================== */}
              {employeeTab === 'attendance' && (
                <div>
                  <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPinned className="w-5 h-5 text-[#59ff00]" />
                    Attendance & Live Location
                  </h2>

                  {/* Check-in/out with location */}
                  <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5 mb-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Button
                        onClick={handleCheckIn}
                        disabled={submitting || !!checkoutTime}
                        className={checkoutTime
                          ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                          : checkedIn
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-[#59ff00] text-black hover:bg-[#59ff00]/90'
                        }
                      >
                        {submitting ? (
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{locationLoading ? 'Getting Location...' : 'Processing...'}</>
                        ) : checkoutTime ? (
                          <><Square className="w-4 h-4 mr-2" />Done for Today</>
                        ) : checkedIn ? (
                          <><Square className="w-4 h-4 mr-2" />Check Out</>
                        ) : (
                          <><Play className="w-4 h-4 mr-2" />Check In</>
                        )}
                      </Button>

                      {/* Detect location button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          const loc = await captureLocation()
                          if (loc) {
                            setShowMap(true)
                            toast.success(`Location detected: ${loc.address}`)
                          }
                        }}
                        disabled={locationLoading}
                        className="border-[#2a2a2a] text-gray-300 hover:text-[#59ff00] hover:border-[#59ff00]/50"
                      >
                        {locationLoading ? (
                          <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />Detecting...</>
                        ) : (
                          <><Locate className="w-3.5 h-3.5 mr-1.5" />Detect Location</>
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMap(!showMap)}
                        className="text-gray-400 hover:text-[#59ff00]"
                      >
                        <Navigation className="w-3.5 h-3.5 mr-1.5" />
                        {showMap ? 'Hide Map' : 'Show Map'}
                      </Button>

                      {checkinTime && (
                        <div className="flex items-center gap-3 text-sm ml-auto">
                          <span className="text-green-400">🟢 In: {checkinTime}</span>
                          {checkoutTime && <span className="text-red-400">🔴 Out: {checkoutTime}</span>}
                        </div>
                      )}
                    </div>

                    {/* Current location info */}
                    {currentLocation && (
                      <div className="flex items-start gap-2 bg-[#0b0b0b] border border-[#2a2a2a] rounded-lg p-3 mb-4">
                        <MapPin className="w-4 h-4 text-[#59ff00] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white text-sm font-medium">Your Live Location</p>
                          <p className="text-gray-400 text-xs mt-0.5">{currentLocation.address}</p>
                          <p className="text-gray-600 text-[10px] mt-0.5">
                            {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Google Map */}
                    {showMap && (
                      <div className="mb-4">
                        <LiveMap
                          location={currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng, address: currentLocation.address } : null}
                          height="350px"
                          center={currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : undefined}
                          zoom={15}
                        />
                      </div>
                    )}

                    {!currentLocation && !showMap && (
                      <div className="bg-[#0b0b0b] border border-dashed border-[#2a2a2a] rounded-lg p-4 text-center">
                        <MapPinned className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Click "Detect Location" to capture your live position</p>
                        <p className="text-gray-600 text-xs mt-1">Location is automatically captured when you check in/out</p>
                      </div>
                    )}
                  </div>

                  {/* Calendar View */}
                  <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5 mb-6">
                    <h3 className="text-white font-semibold mb-4">This Month&apos;s Calendar</h3>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="text-gray-600 py-1">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {(() => {
                        const now = new Date()
                        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay()
                        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
                        const cells: React.ReactElement[] = []
                        for (let i = 0; i < firstDay; i++) cells.push(<div key={`e-${i}`} />)
                        for (let d = 1; d <= daysInMonth; d++) {
                          const date = new Date(now.getFullYear(), now.getMonth(), d)
                          const att = attendance.find((a: any) => new Date(a.date).toDateString() === date.toDateString())
                          const isToday = date.toDateString() === now.toDateString()
                          let bgClass = 'bg-[#1a1a1a] text-gray-600'
                          if (att?.status === 'present') bgClass = 'bg-green-500/20 text-green-400'
                          else if (att?.status === 'absent') bgClass = 'bg-red-500/20 text-red-400'
                          else if (att?.status === 'half_day') bgClass = 'bg-yellow-500/20 text-yellow-400'
                          else if (date > now) bgClass = 'bg-[#0b0b0b] text-gray-700'
                          else if (date.getDay() === 0) bgClass = 'bg-blue-500/10 text-blue-400'
                          cells.push(
                            <div key={d} className={`rounded-md p-1.5 text-xs font-medium ${bgClass} ${isToday ? 'ring-1 ring-[#59ff00]' : ''}`}>
                              {d}
                            </div>
                          )
                        }
                        return cells
                      })()}
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-xs">
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/20" /> Present</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/20" /> Absent</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500/20" /> Half Day</span>
                      <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500/10" /> Holiday</span>
                    </div>
                  </div>

                  {/* Attendance History Table */}
                  {attendance.length > 0 ? (
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden">
                      <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-sm">
                          <thead className="bg-[#1a1a1a] sticky top-0">
                            <tr>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Date</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Check In</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Check Out</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Hours</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Location</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {attendance.map((att: any) => {
                              const hours = att.checkin && att.checkout
                                ? ((new Date(att.checkout).getTime() - new Date(att.checkin).getTime()) / 3600000).toFixed(1)
                                : '-'
                              const hasLocation = att.checkinLatitude && att.checkinLongitude
                              return (
                                <tr key={att.id} className="border-t border-[#2a2a2a] hover:bg-[#1a1a1a]">
                                  <td className="px-4 py-3 text-white">{formatDate(att.date)}</td>
                                  <td className="px-4 py-3 text-gray-400">{att.checkin ? formatTime(att.checkin) : '-'}</td>
                                  <td className="px-4 py-3 text-gray-400">{att.checkout ? formatTime(att.checkout) : '-'}</td>
                                  <td className="px-4 py-3 text-gray-400">{hours !== '-' ? `${hours}h` : '-'}</td>
                                  <td className="px-4 py-3">
                                    {hasLocation ? (
                                      <div className="flex items-center gap-1.5">
                                        <MapPin className="w-3 h-3 text-[#59ff00]" />
                                        <span className="text-gray-400 text-xs truncate max-w-[150px]">
                                          {att.checkinAddress || `${att.checkinLatitude?.toFixed(4)}, ${att.checkinLongitude?.toFixed(4)}`}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-gray-600 text-xs">No location</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3">
                                    <Badge className={`${statusColor[att.status] || ''} text-xs`}>{att.status}</Badge>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-8 text-center text-gray-600">
                      No attendance records found
                    </div>
                  )}
                </div>
              )}

              {/* ===================== DAILY WORK & MEETINGS TAB ===================== */}
              {employeeTab === 'fieldwork' && (
                <div>
                  {/* A. Header with Quick Add buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                    <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-[#59ff00]" />
                      Daily Work &amp; Meetings
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={() => { setNewFieldWork(prev => ({ ...prev, workType: 'meeting' })); setFieldWorkDialog(true) }}
                        size="sm"
                        className="bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30"
                      >
                        <Users className="w-4 h-4 mr-1" />Add Meeting
                      </Button>
                      <Button
                        onClick={() => { setNewFieldWork(prev => ({ ...prev, workType: 'site_visit' })); setFieldWorkDialog(true) }}
                        size="sm"
                        className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90"
                      >
                        <Plus className="w-4 h-4 mr-1" />Add Work
                      </Button>
                      <Button
                        onClick={() => { setNewFieldWork(prev => ({ ...prev, workType: 'installation' })); setFieldWorkDialog(true) }}
                        size="sm"
                        className="bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:text-[#59ff00] hover:border-[#59ff00]/30"
                      >
                        <MapPin className="w-4 h-4 mr-1" />Add Site Visit
                      </Button>
                    </div>
                  </div>

                  {/* B. Today's Summary Card */}
                  {(() => {
                    const todayFW = fieldWork.filter((fw: any) => new Date(fw.date).toDateString() === new Date().toDateString())
                    const todayMeetings = todayFW.filter((fw: any) => fw.workType === 'meeting').length
                    const todaySiteVisits = todayFW.filter((fw: any) => fw.workType === 'site_visit').length
                    const todayInstallations = todayFW.filter((fw: any) => fw.workType === 'installation').length
                    const todayPostponed = todayFW.filter((fw: any) => fw.status === 'postponed').length
                    const todayPendingFollowup = todayFW.filter((fw: any) => fw.status === 'pending_followup').length
                    if (todayFW.length === 0) return null
                    return (
                      <div className="bg-[#151515] border border-[#59ff00]/20 rounded-xl p-4 mb-6">
                        <h4 className="text-[#59ff00] text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                          <CalendarDays className="w-3.5 h-3.5" /> Today&apos;s Summary
                        </h4>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          <span className="text-gray-400">Total: <span className="text-white font-semibold">{todayFW.length}</span></span>
                          {todayMeetings > 0 && <span className="text-gray-400">Meetings: <span className="text-purple-400 font-semibold">{todayMeetings}</span></span>}
                          {todaySiteVisits > 0 && <span className="text-gray-400">Site Visits: <span className="text-blue-400 font-semibold">{todaySiteVisits}</span></span>}
                          {todayInstallations > 0 && <span className="text-gray-400">Installations: <span className="text-green-400 font-semibold">{todayInstallations}</span></span>}
                          {todayPostponed > 0 && <span className="text-gray-400">Postponed: <span className="text-orange-400 font-semibold">{todayPostponed}</span></span>}
                          {todayPendingFollowup > 0 && <span className="text-gray-400">Pending Follow-ups: <span className="text-yellow-400 font-semibold">{todayPendingFollowup}</span></span>}
                        </div>
                      </div>
                    )
                  })()}

                  {/* C. Enhanced Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#59ff00]/10 flex items-center justify-center">
                          <CalendarDays className="w-4 h-4 text-[#59ff00]" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">Today&apos;s Entries</div>
                          <div className="text-[#59ff00] font-semibold text-lg">{fieldWork.filter((fw: any) => new Date(fw.date).toDateString() === new Date().toDateString()).length}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">This Week Meetings</div>
                          <div className="text-purple-400 font-semibold text-lg">{(() => {
                            const now = new Date()
                            const startOfWeek = new Date(now)
                            startOfWeek.setDate(now.getDate() - now.getDay())
                            startOfWeek.setHours(0, 0, 0, 0)
                            return fieldWork.filter((fw: any) => fw.workType === 'meeting' && new Date(fw.date) >= startOfWeek).length
                          })()}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                          <RotateCcw className="w-4 h-4 text-orange-400" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">Postponed Meetings</div>
                          <div className="text-orange-400 font-semibold text-lg">{fieldWork.filter((fw: any) => fw.workType === 'meeting' && fw.status === 'postponed').length}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <GitBranch className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">Pipeline Created</div>
                          <div className="text-purple-400 font-semibold text-lg">{fieldWork.filter((fw: any) => fw.pipelineCreated).length}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* D. View Toggle */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFieldWorkView('list')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          fieldWorkView === 'list'
                            ? 'bg-[#59ff00]/10 text-[#59ff00] border border-[#59ff00]/20'
                            : 'bg-[#1a1a1a] text-gray-500 hover:text-white border border-[#2a2a2a]'
                        }`}
                      >
                        List View
                      </button>
                      <button
                        onClick={() => setFieldWorkView('calendar')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          fieldWorkView === 'calendar'
                            ? 'bg-[#59ff00]/10 text-[#59ff00] border border-[#59ff00]/20'
                            : 'bg-[#1a1a1a] text-gray-500 hover:text-white border border-[#2a2a2a]'
                        }`}
                      >
                        Calendar View
                      </button>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {[
                      { id: 'all', label: 'All', icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
                      { id: 'site_visit', label: 'Site Visit', icon: <Eye className="w-3.5 h-3.5" /> },
                      { id: 'installation', label: 'Installation', icon: <Wrench className="w-3.5 h-3.5" /> },
                      { id: 'maintenance', label: 'Maintenance', icon: <Hammer className="w-3.5 h-3.5" /> },
                      { id: 'delivery', label: 'Delivery', icon: <Truck className="w-3.5 h-3.5" /> },
                      { id: 'meeting', label: 'Meeting', icon: <Users className="w-3.5 h-3.5" /> },
                      { id: 'inspection', label: 'Inspection', icon: <ClipboardCheck className="w-3.5 h-3.5" /> },
                    ].map(f => (
                      <button
                        key={f.id}
                        onClick={() => setFieldWorkFilter(f.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                          fieldWorkFilter === f.id
                            ? 'bg-[#59ff00]/10 text-[#59ff00] border border-[#59ff00]/20'
                            : 'bg-[#1a1a1a] text-gray-500 hover:text-white border border-[#2a2a2a]'
                        }`}
                      >
                        {f.icon} {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Calendar View */}
                  {fieldWorkView === 'calendar' && (() => {
                    const now = new Date()
                    const year = now.getFullYear()
                    const month = now.getMonth()
                    const firstDay = new Date(year, month, 1).getDay()
                    const daysInMonth = new Date(year, month + 1, 0).getDate()
                    const today = now.getDate()

                    // Build a map of day -> entries
                    const dayEntries: Record<number, any[]> = {}
                    for (const fw of fieldWork) {
                      const fwDate = new Date(fw.date)
                      if (fwDate.getFullYear() === year && fwDate.getMonth() === month) {
                        const day = fwDate.getDate()
                        if (!dayEntries[day]) dayEntries[day] = []
                        dayEntries[day].push(fw)
                      }
                    }

                    const days: (number | null)[] = []
                    for (let i = 0; i < firstDay; i++) days.push(null)
                    for (let d = 1; d <= daysInMonth; d++) days.push(d)

                    const selectedEntries = selectedCalDate
                      ? fieldWork.filter((fw: any) => {
                          const fwDate = new Date(fw.date)
                          return fwDate.getFullYear() === year && fwDate.getMonth() === month && fwDate.getDate() === selectedCalDate
                        })
                      : []

                    return (
                      <div>
                        <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4 mb-4">
                          <h3 className="text-white font-semibold text-sm mb-3 text-center">
                            {now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                          </h3>
                          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                              <div key={d} className="text-gray-600 py-1">{d}</div>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-1">
                            {days.map((day, idx) => (
                              <button
                                key={idx}
                                disabled={day === null}
                                onClick={() => day !== null && setSelectedCalDate(selectedCalDate === day ? null : day)}
                                className={`relative p-2 rounded-lg text-xs transition-colors ${
                                  day === null
                                    ? ''
                                    : selectedCalDate === day
                                    ? 'bg-[#59ff00]/20 text-[#59ff00] border border-[#59ff00]/30'
                                    : day === today
                                    ? 'bg-[#1a1a1a] text-white border border-[#59ff00]/20'
                                    : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                                }`}
                              >
                                {day}
                                {day !== null && dayEntries[day] && (
                                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                                    {dayEntries[day].length <= 3 ? (
                                      dayEntries[day].map((_, i) => <span key={i} className="w-1 h-1 rounded-full bg-[#59ff00]" />)
                                    ) : (
                                      <>
                                        <span className="w-1 h-1 rounded-full bg-[#59ff00]" />
                                        <span className="w-1 h-1 rounded-full bg-[#59ff00]" />
                                        <span className="text-[8px] text-[#59ff00] leading-none">+{dayEntries[day].length - 2}</span>
                                      </>
                                    )}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Selected day entries */}
                        {selectedCalDate !== null && (
                          <div className="space-y-2">
                            <h4 className="text-gray-400 text-sm font-semibold flex items-center gap-2">
                              <CalendarDays className="w-4 h-4 text-[#59ff00]" />
                              {new Date(year, month, selectedCalDate).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                              <span className="text-gray-600 text-xs">({selectedEntries.length} entries)</span>
                            </h4>
                            {selectedEntries.length === 0 ? (
                              <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-6 text-center">
                                <p className="text-gray-600 text-sm">No entries for this day</p>
                              </div>
                            ) : (
                              selectedEntries.map((fw: any) => {
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
                                return (
                                  <div key={fw.id} className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#59ff00]/20 transition-colors">
                                    <div className="flex items-start gap-3">
                                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 ${workTypeBg[fw.workType] || workTypeBg.other}`}>
                                        {workTypeIcon[fw.workType] || workTypeIcon.other}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <h4 className="text-white font-semibold text-sm">{fw.title}</h4>
                                          {fw.workType === 'meeting' && (
                                            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px]">Meeting</Badge>
                                          )}
                                          <Badge className={`${statusColor[fw.status] || 'bg-gray-500/10 text-gray-400'} text-[10px]`}>
                                            {fw.status === 'pending_followup' ? 'Follow-up' : fw.status}
                                          </Badge>
                                        </div>
                                        {fw.clientName && <p className="text-gray-400 text-xs mt-1 flex items-center gap-1"><Users className="w-3 h-3" />{fw.clientName}{fw.clientCompany ? ` (${fw.clientCompany})` : ''}</p>}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <button onClick={() => { setEditFieldWorkEntry(fw); setEditFieldWorkForm({ workType: fw.workType, title: fw.title, description: fw.description || '', clientName: fw.clientName || '', clientPhone: fw.clientPhone || '', clientCompany: fw.clientCompany || '', followUpDate: fw.followUpDate ? new Date(fw.followUpDate).toISOString().split('T')[0] : '', followUpNote: fw.followUpNote || '', status: fw.status || 'completed' }); setEditFieldWorkDialog(true) }} className="shrink-0 p-1.5 rounded-lg hover:bg-blue-500/10 text-gray-600 hover:text-blue-400 transition-colors">
                                          <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                        <button onClick={() => handleDeleteFieldWork(fw.id)} className="shrink-0 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-colors">
                                          <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })()}

                  {/* E. List View - Enhanced Entry Cards */}
                  {fieldWorkView === 'list' && (() => {
                    const filtered = fieldWorkFilter === 'all'
                      ? fieldWork
                      : fieldWork.filter((fw: any) => fw.workType === fieldWorkFilter)

                    // Group by date
                    const grouped: Record<string, any[]> = {}
                    for (const fw of filtered) {
                      const dateKey = new Date(fw.date).toDateString()
                      if (!grouped[dateKey]) grouped[dateKey] = []
                      grouped[dateKey].push(fw)
                    }

                    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

                    if (sortedDates.length === 0) {
                      return (
                        <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-8 text-center">
                          <CalendarDays className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                          <h3 className="text-gray-400 font-semibold mb-1">No Work Entries Yet</h3>
                          <p className="text-gray-600 text-sm">Start adding your daily work and meeting activities</p>
                          <p className="text-gray-700 text-xs mt-2">Entries auto-delete after 1 month</p>
                        </div>
                      )
                    }

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

                    return (
                      <div className="space-y-6">
                        {sortedDates.map(dateKey => (
                          <div key={dateKey}>
                            <div className="flex items-center gap-2 mb-3">
                              <CalendarDays className="w-4 h-4 text-[#59ff00]" />
                              <h3 className="text-gray-400 text-sm font-semibold">
                                {new Date(dateKey).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
                              </h3>
                              <span className="text-gray-600 text-xs">({grouped[dateKey].length} entries)</span>
                            </div>
                            <div className="space-y-2">
                              {grouped[dateKey].map((fw: any) => (
                                <div key={fw.id} className={`bg-[#151515] border rounded-xl p-4 transition-colors ${fw.status === 'postponed' ? 'border-orange-500/20 hover:border-orange-500/40' : fw.workType === 'meeting' ? 'border-purple-500/10 hover:border-purple-500/30' : 'border-[#2a2a2a] hover:border-[#59ff00]/20'}`}>
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 ${workTypeBg[fw.workType] || workTypeBg.other}`}>
                                        {workTypeIcon[fw.workType] || workTypeIcon.other}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                          <h4 className="text-white font-semibold text-sm truncate">{fw.title}</h4>
                                          {fw.workType === 'meeting' && (
                                            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] shrink-0">
                                              Meeting
                                            </Badge>
                                          )}
                                          {fw.status === 'postponed' && (
                                            <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 text-[10px] shrink-0">
                                              Postponed
                                            </Badge>
                                          )}
                                          <Badge className={`${statusColor[fw.status] || 'bg-gray-500/10 text-gray-400'} text-[10px] shrink-0`}>
                                            {fw.status === 'pending_followup' ? 'Follow-up' : fw.status === 'postponed' ? 'Postponed' : fw.status}
                                          </Badge>
                                          {fw.pipelineCreated && (
                                            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] shrink-0">
                                              <GitBranch className="w-2.5 h-2.5 mr-0.5" />Pipeline
                                            </Badge>
                                          )}
                                        </div>
                                        {fw.description && (
                                          <p className="text-gray-500 text-xs line-clamp-2">{fw.description}</p>
                                        )}
                                        {/* Client info prominently displayed */}
                                        {fw.clientName && (
                                          <div className="mt-2 flex items-center gap-2 bg-[#0b0b0b] border border-[#2a2a2a] rounded-lg px-3 py-1.5">
                                            <div className="w-6 h-6 rounded-full bg-[#59ff00]/10 flex items-center justify-center shrink-0">
                                              <Users className="w-3 h-3 text-[#59ff00]" />
                                            </div>
                                            <div className="min-w-0">
                                              <span className="text-white text-xs font-medium">{fw.clientName}</span>
                                              {fw.clientCompany && <span className="text-gray-500 text-xs ml-1">• {fw.clientCompany}</span>}
                                              {fw.clientPhone && <span className="text-gray-600 text-xs ml-1">• {fw.clientPhone}</span>}
                                            </div>
                                          </div>
                                        )}
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-600">
                                          <span className="flex items-center gap-1 capitalize">
                                            {workTypeIcon[fw.workType]}
                                            {fw.workType?.replace('_', ' ')}
                                          </span>
                                          {fw.address && (
                                            <span className="flex items-center gap-1">
                                              <MapPin className="w-3 h-3 text-[#59ff00]" />
                                              <span className="truncate max-w-[200px]">{fw.address}</span>
                                            </span>
                                          )}
                                          <span className="flex items-center gap-1">
                                            <Timer className="w-3 h-3" />{formatTime(fw.createdAt)}
                                          </span>
                                        </div>
                                        {/* Follow-up indicator */}
                                        {fw.followUpDate && (
                                          <div className="flex items-center gap-1.5 mt-2 text-xs">
                                            <RotateCcw className={`w-3 h-3 ${fw.followUpCreated ? 'text-green-400' : fw.status === 'postponed' ? 'text-orange-400' : 'text-yellow-400'}`} />
                                            <span className={fw.followUpCreated ? 'text-green-400' : fw.status === 'postponed' ? 'text-orange-400' : 'text-yellow-400'}>
                                              {fw.status === 'postponed' ? 'Rescheduled to' : 'Follow-up'}: {formatDate(fw.followUpDate)}
                                              {fw.followUpCreated ? ' (task created)' : ' (pending)'}
                                            </span>
                                            {fw.followUpNote && (
                                              <span className="text-gray-600 ml-1">- {fw.followUpNote}</span>
                                            )}
                                          </div>
                                        )}
                                        {/* Action buttons */}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                          {fw.workType === 'meeting' && fw.status !== 'postponed' && fw.status !== 'completed' && (
                                            <button
                                              onClick={() => {
                                                setPostponeForm({ entryId: fw.id, newDate: '', reason: '' })
                                                setPostponeDialog(true)
                                              }}
                                              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-colors"
                                            >
                                              <RotateCcw className="w-3 h-3" />Postpone
                                            </button>
                                          )}
                                          {fw.workType === 'meeting' && fw.status === 'postponed' && (
                                            <button
                                              onClick={() => {
                                                setPostponeForm({ entryId: fw.id, newDate: '', reason: '' })
                                                setPostponeDialog(true)
                                              }}
                                              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors"
                                            >
                                              <RotateCcw className="w-3 h-3" />Reschedule
                                            </button>
                                          )}
                                          {fw.status !== 'completed' && (
                                            <button
                                              onClick={() => handleMarkCompleted(fw.id)}
                                              className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors"
                                            >
                                              <CheckCircle2 className="w-3 h-3" />Mark Completed
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => { setEditFieldWorkEntry(fw); setEditFieldWorkForm({ workType: fw.workType, title: fw.title, description: fw.description || '', clientName: fw.clientName || '', clientPhone: fw.clientPhone || '', clientCompany: fw.clientCompany || '', followUpDate: fw.followUpDate ? new Date(fw.followUpDate).toISOString().split('T')[0] : '', followUpNote: fw.followUpNote || '', status: fw.status || 'completed' }); setEditFieldWorkDialog(true) }}
                                        className="shrink-0 p-1.5 rounded-lg hover:bg-blue-500/10 text-gray-600 hover:text-blue-400 transition-colors"
                                      >
                                        <Pencil className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteFieldWork(fw.id)}
                                        className="shrink-0 p-1.5 rounded-lg hover:bg-red-500/10 text-gray-600 hover:text-red-400 transition-colors"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* ===================== TASKS TAB ===================== */}
              {employeeTab === 'tasks' && (
                <div>
                  <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white mb-4">My Tasks</h2>
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {['all', 'pending', 'in_progress', 'completed'].map(s => (
                      <button
                        key={s}
                        onClick={() => setTaskFilter(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                          taskFilter === s
                            ? 'bg-[#59ff00]/10 text-[#59ff00] border border-[#59ff00]/20'
                            : 'bg-[#1a1a1a] text-gray-500 hover:text-white border border-[#2a2a2a]'
                        }`}
                      >
                        {s === 'all' ? 'All Tasks' : s.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  {filteredTasks.length === 0 ? (
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-8 text-center text-gray-600">
                      No tasks found
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredTasks.map((task: any) => (
                        <div key={task.id} className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#59ff00]/20 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <button
                                onClick={() => {
                                  const nextStatus = task.status === 'pending' ? 'in_progress' : task.status === 'in_progress' ? 'completed' : 'completed'
                                  handleTaskStatus(task.id, nextStatus)
                                }}
                                className="mt-1 shrink-0"
                              >
                                {task.status === 'completed'
                                  ? <CheckCircle2 className="w-5 h-5 text-green-400" />
                                  : task.status === 'in_progress'
                                  ? <Play className="w-5 h-5 text-blue-400" />
                                  : <Circle className="w-5 h-5 text-gray-600" />
                                }
                              </button>
                              <div>
                                <h3 className={`text-sm font-semibold ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'}`}>
                                  {task.title}
                                </h3>
                                {task.description && <p className="text-gray-600 text-xs mt-1">{task.description}</p>}
                                <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                                  {task.dueDate && (
                                    <span className="flex items-center gap-1">
                                      <CalendarDays className="w-3 h-3" />{formatDate(task.dueDate)}
                                    </span>
                                  )}
                                  <span className="flex items-center gap-1">{priorityIcon[task.priority]}{task.priority}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${statusColor[task.status] || ''} text-xs`}>{task.status.replace('_', ' ')}</Badge>
                              {task.status !== 'completed' && (
                                <Select onValueChange={(val) => handleTaskStatus(task.id, val)}>
                                  <SelectTrigger className="w-7 h-7 bg-[#1a1a1a] border-[#2a2a2a] p-0">
                                    <ChevronDown className="w-3 h-3 text-gray-500" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ===================== LEADS TAB ===================== */}
              {employeeTab === 'leads' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white">My Leads</h2>
                    <Button
                      onClick={() => setLeadDialog(true)}
                      size="sm"
                      className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90"
                    >
                      <Plus className="w-4 h-4 mr-1" />New Lead
                    </Button>
                  </div>

                  {/* Lead Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#59ff00]/10 flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#59ff00]" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">Total Leads</div>
                          <div className="text-[#59ff00] font-semibold text-lg">{leads.length}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Filter className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">New</div>
                          <div className="text-blue-400 font-semibold text-lg">{leads.filter(l => l.status === 'new').length}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">In Progress</div>
                          <div className="text-yellow-400 font-semibold text-lg">
                            {leads.filter(l => ['contacted', 'quotation_sent', 'negotiation'].includes(l.status)).length}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs">Won</div>
                          <div className="text-emerald-400 font-semibold text-lg">{leads.filter(l => l.status === 'won').length}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lead Cards */}
                  {leads.length === 0 ? (
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-8 text-center">
                      <Users className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                      <h3 className="text-gray-400 font-semibold mb-1">No Leads Yet</h3>
                      <p className="text-gray-600 text-sm">Create your first lead to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
                      {leads.map((lead: any) => (
                        <div key={lead.id} className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-4 hover:border-[#59ff00]/20 transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-white font-semibold text-sm truncate">{lead.name}</h3>
                                <Badge className={`${statusColor[lead.status] || ''} text-xs shrink-0`}>
                                  {lead.status?.replace('_', ' ')}
                                </Badge>
                              </div>
                              {lead.company && (
                                <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
                                  <Building2 className="w-3 h-3" />{lead.company}
                                </div>
                              )}
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                                {lead.phone && (
                                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                                )}
                                {lead.email && (
                                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{lead.email}</span>
                                )}
                                {lead.city && (
                                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{lead.city}</span>
                                )}
                              </div>
                              {lead.requirement && (
                                <p className="text-gray-600 text-xs mt-2 line-clamp-2">{lead.requirement}</p>
                              )}
                              {lead.source && (
                                <span className="inline-block mt-2 text-xs text-gray-500 bg-[#1a1a1a] px-2 py-0.5 rounded capitalize">
                                  Source: {lead.source}
                                </span>
                              )}
                            </div>
                            <div className="shrink-0">
                              <Select onValueChange={(val) => handleLeadStatus(lead.id, val)}>
                                <SelectTrigger className="w-8 h-8 bg-[#1a1a1a] border-[#2a2a2a] p-0">
                                  <ChevronDown className="w-3 h-3 text-gray-500" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="contacted">Contacted</SelectItem>
                                  <SelectItem value="quotation_sent">Quotation Sent</SelectItem>
                                  <SelectItem value="negotiation">Negotiation</SelectItem>
                                  <SelectItem value="won">Won</SelectItem>
                                  <SelectItem value="lost">Lost</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ===================== PIPELINE TAB ===================== */}
              {employeeTab === 'pipeline' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white">Pipeline</h2>
                    <span className="text-gray-500 text-sm">{pipelineDeals.length} deals</span>
                  </div>

                  {pipelineDeals.length === 0 ? (
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-8 text-center">
                      <GitBranch className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                      <h3 className="text-gray-400 font-semibold mb-1">No Pipeline Deals</h3>
                      <p className="text-gray-600 text-sm">Pipeline deals will appear here</p>
                    </div>
                  ) : (
                    <div className="flex gap-4 overflow-x-auto pb-4">
                      {(['new', 'contacted', 'quotation_sent', 'negotiation', 'won', 'lost'] as const).map(stage => {
                        const stageDeals = pipelineDeals.filter((d: any) => d.stage === stage)
                        return (
                          <div key={stage} className="min-w-[260px] flex-shrink-0">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Badge className={`${statusColor[stage] || ''} text-xs`}>
                                  {stage.replace('_', ' ')}
                                </Badge>
                              </div>
                              <span className="text-gray-600 text-xs">{stageDeals.length}</span>
                            </div>
                            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                              {stageDeals.map((deal: any) => {
                                const probColor = deal.probability > 75
                                  ? 'text-green-400'
                                  : deal.probability > 50
                                  ? 'text-yellow-400'
                                  : 'text-red-400'
                                const probBg = deal.probability > 75
                                  ? 'bg-green-500/10 border-green-500/20'
                                  : deal.probability > 50
                                  ? 'bg-yellow-500/10 border-yellow-500/20'
                                  : 'bg-red-500/10 border-red-500/20'
                                return (
                                  <div key={deal.id} className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-3 hover:border-[#59ff00]/20 transition-colors">
                                    <h4 className="text-white text-sm font-semibold truncate">{deal.title}</h4>
                                    {deal.leadName && (
                                      <p className="text-gray-500 text-xs mt-0.5 truncate">{deal.leadName}</p>
                                    )}
                                    <div className="flex items-center justify-between mt-2">
                                      {deal.value && (
                                        <span className="text-[#59ff00] text-xs font-medium">{formatPrice(deal.value)}</span>
                                      )}
                                      <span className={`text-xs font-medium px-2 py-0.5 rounded border ${probBg} ${probColor}`}>
                                        {deal.probability || 0}%
                                      </span>
                                    </div>
                                    {deal.closeDate && (
                                      <div className="text-gray-600 text-xs mt-2">
                                        Close: {formatDate(deal.closeDate)}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                              {stageDeals.length === 0 && (
                                <div className="bg-[#1a1a1a] border border-[#2a2a2a] border-dashed rounded-lg p-4 text-center text-gray-600 text-xs">
                                  No deals
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ===================== SALARY TAB ===================== */}
              {employeeTab === 'salary' && (
                <div>
                  <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white mb-4">Salary & Payslips</h2>
                  {salarySlips.length > 0 ? (
                    <div className="space-y-3">
                      {salarySlips.map((slip: any) => (
                        <SalarySlipCard key={slip.id} slip={slip} />
                      ))}
                    </div>
                  ) : (
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-8 text-center">
                      <DollarSign className="w-12 h-12 text-gray-700 mx-auto mb-3" />
                      <h3 className="text-gray-400 font-semibold mb-1">No Salary Slips</h3>
                      <p className="text-gray-600 text-sm">Your salary slips will appear here</p>
                    </div>
                  )}
                </div>
              )}

              {/* ===================== LEAVES TAB ===================== */}
              {employeeTab === 'leaves' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-white">Leave Management</h2>
                    <Button
                      onClick={() => setLeaveDialog(true)}
                      size="sm"
                      className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90"
                    >
                      <Plus className="w-4 h-4 mr-1" />Apply Leave
                    </Button>
                  </div>

                  {/* Leave Balance */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {leaveBalances.map(leave => (
                      <div key={leave.type} className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-400 text-sm">{leave.type} Leave</span>
                          <span className="text-white font-semibold">{leave.total - leave.used} days</span>
                        </div>
                        <Progress value={(leave.used / leave.total) * 100} className="h-2 bg-[#1a1a1a]" />
                        <div className="flex justify-between mt-2 text-xs text-gray-600">
                          <span>{leave.used} used</span>
                          <span>{leave.total} total</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Leave History */}
                  {leaves.length > 0 ? (
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden">
                      <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-sm">
                          <thead className="bg-[#1a1a1a] sticky top-0">
                            <tr>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Type</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">From</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">To</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Days</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Reason</th>
                              <th className="text-left px-4 py-3 text-gray-500 font-medium">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leaves.map((leave: any) => (
                              <tr key={leave.id} className="border-t border-[#2a2a2a] hover:bg-[#1a1a1a]">
                                <td className="px-4 py-3 capitalize text-white">{leave.type}</td>
                                <td className="px-4 py-3 text-gray-400">{formatDate(leave.startDate)}</td>
                                <td className="px-4 py-3 text-gray-400">{formatDate(leave.endDate)}</td>
                                <td className="px-4 py-3 text-gray-400">
                                  {Math.ceil((new Date(leave.endDate).getTime() - new Date(leave.startDate).getTime()) / 86400000) + 1}
                                </td>
                                <td className="px-4 py-3 text-gray-400 max-w-[150px] truncate">{leave.reason || '-'}</td>
                                <td className="px-4 py-3">
                                  <Badge className={`${statusColor[leave.status] || ''} text-xs`}>{leave.status}</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl p-8 text-center text-gray-600">
                      No leave records found
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* New Lead Dialog */}
      <Dialog open={leadDialog} onOpenChange={setLeadDialog}>
        <DialogContent className="bg-[#151515] border-[#2a2a2a] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#59ff00]">New Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Name *</label>
              <Input
                value={newLead.name}
                onChange={e => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Lead name"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Company</label>
              <Input
                value={newLead.company}
                onChange={e => setNewLead(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Company name"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Phone *</label>
                <Input
                  value={newLead.phone}
                  onChange={e => setNewLead(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone number"
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Email</label>
                <Input
                  type="email"
                  value={newLead.email}
                  onChange={e => setNewLead(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Email address"
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">City</label>
                <Input
                  value={newLead.city}
                  onChange={e => setNewLead(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="City"
                  className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Source</label>
                <Select value={newLead.source} onValueChange={val => setNewLead(prev => ({ ...prev, source: val }))}>
                  <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Requirement</label>
              <Input
                value={newLead.requirement}
                onChange={e => setNewLead(prev => ({ ...prev, requirement: e.target.value }))}
                placeholder="What do they need?"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Message</label>
              <Textarea
                value={newLead.message}
                onChange={e => setNewLead(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Additional notes..."
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
              />
            </div>
            <Button
              onClick={handleCreateLead}
              disabled={submitting}
              className="w-full bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold"
            >
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : 'Create Lead'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Apply Leave Dialog */}
      <Dialog open={leaveDialog} onOpenChange={setLeaveDialog}>
        <DialogContent className="bg-[#151515] border-[#2a2a2a] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#59ff00]">Apply for Leave</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleApplyLeave} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Leave Type</label>
              <Select name="type" defaultValue="casual">
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <SelectItem value="casual">Casual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="earned">Earned Leave</SelectItem>
                  <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Start Date</label>
                <Input type="date" name="startDate" required className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">End Date</label>
                <Input type="date" name="endDate" required className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Reason</label>
              <Textarea name="reason" placeholder="Enter reason for leave..." className="bg-[#1a1a1a] border-[#2a2a2a] text-white" />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold"
            >
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting...</> : 'Submit Leave Request'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Work/Meeting Entry Dialog */}
      <Dialog open={fieldWorkDialog} onOpenChange={(open) => { setFieldWorkDialog(open); if (!open) setNewFieldWork({ workType: 'site_visit', title: '', description: '', clientName: '', clientPhone: '', clientCompany: '', followUpDate: '', followUpNote: '', outcome: '', postponeReason: '', newMeetingDate: '' }) }}>
        <DialogContent className="bg-[#151515] border-[#2a2a2a] text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#59ff00] flex items-center gap-2">
              {newFieldWork.workType === 'meeting' ? <Users className="w-5 h-5 text-purple-400" /> : <CalendarDays className="w-5 h-5" />}
              {newFieldWork.workType === 'meeting' ? 'Add Meeting' : 'Add Work Entry'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Work Type *</label>
              <Select value={newFieldWork.workType} onValueChange={val => setNewFieldWork(prev => ({ ...prev, workType: val, outcome: '', postponeReason: '', newMeetingDate: '' }))}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <SelectItem value="site_visit">Site Visit</SelectItem>
                  <SelectItem value="installation">Installation</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Title *</label>
              <Input
                value={newFieldWork.title}
                onChange={e => setNewFieldWork(prev => ({ ...prev, title: e.target.value }))}
                placeholder={newFieldWork.workType === 'meeting' ? 'e.g., Client meeting at Hotel Grand' : 'e.g., Kitchen installation at Hotel Grand'}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Description</label>
              <Textarea
                value={newFieldWork.description}
                onChange={e => setNewFieldWork(prev => ({ ...prev, description: e.target.value }))}
                placeholder={newFieldWork.workType === 'meeting' ? 'Meeting agenda, attendees, topics to discuss...' : 'What did you do? Details of the work...'}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white min-h-[80px]"
              />
            </div>

            {/* Meeting-specific fields */}
            {newFieldWork.workType === 'meeting' && (
              <div className="border-t border-purple-500/20 pt-4">
                <h4 className="text-purple-400 text-sm font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Meeting Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Meeting Outcome</label>
                    <Select value={newFieldWork.outcome} onValueChange={val => setNewFieldWork(prev => ({ ...prev, outcome: val }))}>
                      <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                        <SelectValue placeholder="Select outcome (optional)" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                        <SelectItem value="successful">Successful</SelectItem>
                        <SelectItem value="postponed">Postponed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="follow_up_needed">Follow-up Needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newFieldWork.outcome === 'postponed' && (
                    <>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Postpone Reason *</label>
                        <Input
                          value={newFieldWork.postponeReason}
                          onChange={e => setNewFieldWork(prev => ({ ...prev, postponeReason: e.target.value }))}
                          placeholder="Why is the meeting postponed?"
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">New Meeting Date *</label>
                        <Input
                          type="date"
                          value={newFieldWork.newMeetingDate}
                          onChange={e => setNewFieldWork(prev => ({ ...prev, newMeetingDate: e.target.value }))}
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                        />
                      </div>
                      <p className="text-orange-400/70 text-xs">
                        This meeting will be marked as postponed and a follow-up will be created for the new date
                      </p>
                    </>
                  )}
                  {newFieldWork.outcome === 'follow_up_needed' && (
                    <p className="text-yellow-400/70 text-xs">
                      A follow-up task will be auto-created for this meeting
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-[#2a2a2a] pt-4">
              <h4 className="text-gray-300 text-sm font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#59ff00]" /> Client Details (Optional)
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Client Name</label>
                    <Input
                      value={newFieldWork.clientName}
                      onChange={e => setNewFieldWork(prev => ({ ...prev, clientName: e.target.value }))}
                      placeholder="Contact person"
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Client Phone</label>
                    <Input
                      value={newFieldWork.clientPhone}
                      onChange={e => setNewFieldWork(prev => ({ ...prev, clientPhone: e.target.value }))}
                      placeholder="Phone number"
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Company</label>
                  <Input
                    value={newFieldWork.clientCompany}
                    onChange={e => setNewFieldWork(prev => ({ ...prev, clientCompany: e.target.value }))}
                    placeholder="Client company name"
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                  />
                </div>
              </div>
            </div>

            {newFieldWork.workType !== 'meeting' && (
              <div className="border-t border-[#2a2a2a] pt-4">
                <h4 className="text-gray-300 text-sm font-semibold mb-3 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-yellow-400" /> Follow-up (Optional)
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Follow-up Date</label>
                    <Input
                      type="date"
                      value={newFieldWork.followUpDate}
                      onChange={e => setNewFieldWork(prev => ({ ...prev, followUpDate: e.target.value }))}
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Follow-up Note</label>
                    <Input
                      value={newFieldWork.followUpNote}
                      onChange={e => setNewFieldWork(prev => ({ ...prev, followUpNote: e.target.value }))}
                      placeholder="What to follow up about?"
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                    />
                  </div>
                </div>
                {newFieldWork.followUpDate && (
                  <p className="text-yellow-400/70 text-xs mt-2">
                    A task will be auto-created for this follow-up
                  </p>
                )}
              </div>
            )}

            {(newFieldWork.clientName || newFieldWork.clientCompany) && (
              <p className="text-purple-400/70 text-xs">
                <GitBranch className="w-3 h-3 inline mr-1" />A pipeline deal will be auto-created for this client
              </p>
            )}

            <div className="bg-[#0b0b0b] border border-[#2a2a2a] rounded-lg p-3">
              <p className="text-gray-500 text-xs flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#59ff00]" />
                Your live location will be auto-captured when you submit this entry
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Entries are auto-deleted after 1 month
              </p>
            </div>

            <Button
              onClick={handleCreateFieldWork}
              disabled={submitting}
              className="w-full bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold"
            >
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : newFieldWork.workType === 'meeting' ? 'Add Meeting' : 'Add Work Entry'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Work/Meeting Entry Dialog */}
      <Dialog open={editFieldWorkDialog} onOpenChange={(open) => { setEditFieldWorkDialog(open); if (!open) { setEditFieldWorkEntry(null); setEditFieldWorkForm({ workType: 'site_visit', title: '', description: '', clientName: '', clientPhone: '', clientCompany: '', followUpDate: '', followUpNote: '', status: 'completed' }) } }}>
        <DialogContent className="bg-[#151515] border-[#2a2a2a] text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#59ff00] flex items-center gap-2">
              {editFieldWorkForm.workType === 'meeting' ? <Users className="w-5 h-5 text-purple-400" /> : <CalendarDays className="w-5 h-5" />}
              {editFieldWorkForm.workType === 'meeting' ? 'Edit Meeting' : 'Edit Work Entry'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Work Type</label>
              <Select value={editFieldWorkForm.workType} onValueChange={val => setEditFieldWorkForm(prev => ({ ...prev, workType: val }))}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <SelectItem value="site_visit">Site Visit</SelectItem>
                  <SelectItem value="installation">Installation</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="inspection">Inspection</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Title *</label>
              <Input
                value={editFieldWorkForm.title}
                onChange={e => setEditFieldWorkForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Entry title"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Description</label>
              <Textarea
                value={editFieldWorkForm.description}
                onChange={e => setEditFieldWorkForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Details of the work..."
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white min-h-[80px]"
              />
            </div>

            <div className="border-t border-[#2a2a2a] pt-4">
              <h4 className="text-gray-300 text-sm font-semibold mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#59ff00]" /> Client Details (Optional)
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Client Name</label>
                    <Input
                      value={editFieldWorkForm.clientName}
                      onChange={e => setEditFieldWorkForm(prev => ({ ...prev, clientName: e.target.value }))}
                      placeholder="Contact person"
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Client Phone</label>
                    <Input
                      value={editFieldWorkForm.clientPhone}
                      onChange={e => setEditFieldWorkForm(prev => ({ ...prev, clientPhone: e.target.value }))}
                      placeholder="Phone number"
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Company</label>
                  <Input
                    value={editFieldWorkForm.clientCompany}
                    onChange={e => setEditFieldWorkForm(prev => ({ ...prev, clientCompany: e.target.value }))}
                    placeholder="Client company name"
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#2a2a2a] pt-4">
              <h4 className="text-gray-300 text-sm font-semibold mb-3 flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-yellow-400" /> Follow-up (Optional)
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Follow-up Date</label>
                  <Input
                    type="date"
                    value={editFieldWorkForm.followUpDate}
                    onChange={e => setEditFieldWorkForm(prev => ({ ...prev, followUpDate: e.target.value }))}
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Follow-up Note</label>
                  <Input
                    value={editFieldWorkForm.followUpNote}
                    onChange={e => setEditFieldWorkForm(prev => ({ ...prev, followUpNote: e.target.value }))}
                    placeholder="What to follow up about?"
                    className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-[#2a2a2a] pt-4">
              <h4 className="text-gray-300 text-sm font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Status
              </h4>
              <Select value={editFieldWorkForm.status} onValueChange={val => setEditFieldWorkForm(prev => ({ ...prev, status: val }))}>
                <SelectTrigger className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending_followup">Pending Follow-up</SelectItem>
                  <SelectItem value="postponed">Postponed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleEditFieldWork}
              disabled={submitting}
              className="w-full bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold"
            >
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : editFieldWorkForm.workType === 'meeting' ? 'Update Meeting' : 'Update Work Entry'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Postpone Meeting Dialog */}
      <Dialog open={postponeDialog} onOpenChange={setPostponeDialog}>
        <DialogContent className="bg-[#151515] border-[#2a2a2a] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-orange-400 flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Postpone Meeting
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">New Date *</label>
              <Input
                type="date"
                value={postponeForm.newDate}
                onChange={e => setPostponeForm(prev => ({ ...prev, newDate: e.target.value }))}
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Reason *</label>
              <Textarea
                value={postponeForm.reason}
                onChange={e => setPostponeForm(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Why is this meeting being postponed?"
                className="bg-[#1a1a1a] border-[#2a2a2a] text-white min-h-[60px]"
              />
            </div>
            <p className="text-orange-400/70 text-xs">
              The meeting will be marked as postponed and a follow-up task will be created for the new date
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setPostponeDialog(false)}
                className="flex-1 border-[#2a2a2a] text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePostponeMeeting}
                disabled={submitting}
                className="flex-1 bg-orange-500 text-white hover:bg-orange-600"
              >
                {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : 'Postpone Meeting'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ===================== SALARY SLIP CARD ===================== */
function SalarySlipCard({ slip }: { slip: any }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-[#151515] border border-[#2a2a2a] rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-[#1a1a1a] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#59ff00]/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#59ff00]" />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-sm">{slip.month}</div>
            <div className="text-gray-600 text-xs">Net Pay: {formatPrice(slip.netPay)}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#59ff00] font-bold">{formatPrice(slip.netPay)}</span>
          {expanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </div>
      </button>
      {expanded && (
        <div className="px-4 pb-4 border-t border-[#2a2a2a]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-4">
            <div className="text-sm"><span className="text-gray-500">Basic</span><div className="text-white">{formatPrice(slip.basic)}</div></div>
            <div className="text-sm"><span className="text-gray-500">HRA</span><div className="text-white">{formatPrice(slip.hra)}</div></div>
            <div className="text-sm"><span className="text-gray-500">Allowance</span><div className="text-white">{formatPrice(slip.allowance)}</div></div>
            <div className="text-sm"><span className="text-gray-500">Deduction</span><div className="text-red-400">-{formatPrice(slip.deduction)}</div></div>
          </div>
          <Separator className="bg-[#2a2a2a] my-3" />
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">Net Pay</span>
            <span className="text-[#59ff00] font-bold text-lg">{formatPrice(slip.netPay)}</span>
          </div>
          <Button variant="outline" size="sm" className="mt-3 border-[#2a2a2a] text-gray-500 hover:text-[#59ff00] hover:border-[#59ff00]/30 w-full">
            <FileText className="w-4 h-4 mr-2" />Download PDF
          </Button>
        </div>
      )}
    </div>
  )
}
