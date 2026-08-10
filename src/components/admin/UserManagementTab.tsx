'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, UserPlus, Shield, Lock, Edit, Trash2, Check, X, Plus,
  Search, ChevronDown, ChevronUp, AlertTriangle, Key, UserCog,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import {
  ALL_PERMISSIONS, PERMISSION_GROUPS, DEFAULT_ROLE_PERMISSIONS,
  getUserPermissions, hasPermission,
  type PermissionDef,
} from '@/lib/permissions'
import { statusBadgeCls, NEON } from './types'

// ─── Shared styles ──────────────────────────────────────────
const inputCls = 'bg-[#0b0b0b] border-[#2a2a2a] text-white'
const cardCls = 'bg-[#181818] border-[#2a2a2a]'

const roleBadgeCls = (rn: string) => {
  const m: Record<string, string> = {
    admin: 'bg-[#59ff00]/20 text-[#59ff00] border-[#59ff00]/30',
    manager: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    accountant: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    hr_manager: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    sales_executive: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    employee: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    customer: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  }
  return m[rn] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

const permGroupBadgeCls = (group: string) => {
  const m: Record<string, string> = {
    core: 'bg-blue-500/15 text-blue-400',
    crm: 'bg-purple-500/15 text-purple-400',
    hrm: 'bg-cyan-500/15 text-cyan-400',
    finance: 'bg-emerald-500/15 text-emerald-400',
    settings: 'bg-orange-500/15 text-orange-400',
  }
  return m[group] || 'bg-gray-500/15 text-gray-400'
}

// ─── Sub-Components ─────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color, delay = 0 }: {
  label: string; value: number; icon: React.ElementType; color: string; delay?: number
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card className={`${cardCls}`}>
        <CardContent className="p-4 flex items-center gap-3">
          <div className={`p-2 rounded-lg ${color.replace('text-', 'bg-').replace('400', '500/20')}`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <p className="text-gray-500 text-xs">{label}</p>
            <p className="text-white text-xl font-bold">{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Main Component ─────────────────────────────────────────
interface UserManagementTabProps {
  user: any
}

export default function UserManagementTab({ user }: UserManagementTabProps) {
  const [users, setUsers] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users')
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  // User dialog
  const [userDialog, setUserDialog] = useState(false)
  const [editUser, setEditUser] = useState<any>(null)
  const [userForm, setUserForm] = useState({ name: '', email: '', phone: '', password: '', roleId: '', status: 'active' })
  const [savingUser, setSavingUser] = useState(false)

  // Role dialog
  const [roleDialog, setRoleDialog] = useState(false)
  const [editRole, setEditRole] = useState<any>(null)
  const [roleForm, setRoleForm] = useState({ roleName: '', permissions: [] as string[] })
  const [savingRole, setSavingRole] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(PERMISSION_GROUPS.map(g => g.key)))

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/users?limit=100')
      const json = await res.json()
      if (json.status) {
        setUsers(Array.isArray(json.data?.users) ? json.data.users : [])
        setRoles(Array.isArray(json.data?.roles) ? json.data.roles : [])
      }
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  // ─── User CRUD ────────────────────────────────────────────
  const openNewUser = () => {
    setEditUser(null)
    setUserForm({ name: '', email: '', phone: '', password: '', roleId: '', status: 'active' })
    setUserDialog(true)
  }

  const openEditUser = (u: any) => {
    setEditUser(u)
    setUserForm({ name: u.name, email: u.email, phone: u.phone || '', password: '', roleId: u.roleId || u.role?.id || '', status: u.status })
    setUserDialog(true)
  }

  const handleSaveUser = async () => {
    if (!userForm.name || !userForm.email) { toast.error('Name and email are required'); return }
    if (!editUser && !userForm.password) { toast.error('Password is required for new users'); return }
    if (!userForm.roleId) { toast.error('Please select a role'); return }

    setSavingUser(true)
    try {
      if (editUser) {
        const body: any = { name: userForm.name, email: userForm.email, phone: userForm.phone, status: userForm.status, roleId: userForm.roleId }
        if (userForm.password) body.password = userForm.password
        const res = await fetch(`/api/users/${editUser.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        const json = await res.json()
        if (json.status) { setUserDialog(false); fetchData(); toast.success('User updated') } else { toast.error(json.message || 'Failed') }
      } else {
        const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userForm) })
        const json = await res.json()
        if (json.status) { setUserDialog(false); fetchData(); toast.success('User created') } else { toast.error(json.message || 'Failed') }
      }
    } catch (e) { console.error(e); toast.error('Failed to save user') } finally { setSavingUser(false) }
  }

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Delete this user? This action cannot be undone.')) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.status) { fetchData(); toast.success('User deleted') } else { toast.error(json.message || 'Failed') }
    } catch (e) { toast.error('Failed to delete user') }
  }

  // ─── Role CRUD ────────────────────────────────────────────
  const openNewRole = () => {
    setEditRole(null)
    setRoleForm({ roleName: '', permissions: [] })
    setRoleDialog(true)
  }

  const openEditRole = (r: any) => {
    setEditRole(r)
    let perms: string[] = []
    try {
      const parsed = typeof r.permissions === 'string' ? JSON.parse(r.permissions) : r.permissions
      perms = Array.isArray(parsed) ? parsed : []
    } catch { perms = [] }
    setRoleForm({ roleName: r.roleName, permissions: perms })
    setRoleDialog(true)
  }

  const togglePermission = (key: string) => {
    setRoleForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(key)
        ? prev.permissions.filter(p => p !== key)
        : [...prev.permissions, key]
    }))
  }

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(groupKey)) next.delete(groupKey)
      else next.add(groupKey)
      return next
    })
  }

  const selectAllInGroup = (groupKey: string) => {
    const groupPerms = ALL_PERMISSIONS.filter(p => p.group === groupKey).map(p => p.key)
    const allSelected = groupPerms.every(p => roleForm.permissions.includes(p))
    if (allSelected) {
      setRoleForm(prev => ({ ...prev, permissions: prev.permissions.filter(p => !groupPerms.includes(p)) }))
    } else {
      setRoleForm(prev => ({ ...prev, permissions: [...new Set([...prev.permissions, ...groupPerms])] }))
    }
  }

  const selectAllPermissions = () => {
    if (roleForm.permissions.length === ALL_PERMISSIONS.length) {
      setRoleForm(prev => ({ ...prev, permissions: [] }))
    } else {
      setRoleForm(prev => ({ ...prev, permissions: ALL_PERMISSIONS.map(p => p.key) }))
    }
  }

  const applyDefaultPermissions = (roleName: string) => {
    const defaults = DEFAULT_ROLE_PERMISSIONS[roleName]
    if (defaults) {
      setRoleForm(prev => ({ ...prev, permissions: defaults.includes('all') ? ALL_PERMISSIONS.map(p => p.key) : defaults }))
      toast.success(`Applied default ${roleName} permissions`)
    }
  }

  const handleSaveRole = async () => {
    if (!roleForm.roleName) { toast.error('Role name is required'); return }

    setSavingRole(true)
    try {
      if (editRole) {
        const res = await fetch('/api/roles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editRole.id, roleName: roleForm.roleName, permissions: roleForm.permissions }),
        })
        const json = await res.json()
        if (json.status) { setRoleDialog(false); fetchData(); toast.success('Role updated') } else { toast.error(json.message || 'Failed') }
      } else {
        const res = await fetch('/api/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roleName: roleForm.roleName, permissions: roleForm.permissions }),
        })
        const json = await res.json()
        if (json.status) { setRoleDialog(false); fetchData(); toast.success('Role created') } else { toast.error(json.message || 'Failed') }
      }
    } catch (e) { console.error(e); toast.error('Failed to save role') } finally { setSavingRole(false) }
  }

  const handleDeleteRole = async (id: string) => {
    if (!confirm('Delete this role?')) return
    try {
      const res = await fetch(`/api/roles?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.status) { fetchData(); toast.success('Role deleted') } else { toast.error(json.message || 'Failed') }
    } catch (e) { toast.error('Failed to delete role') }
  }

  // ─── Filtering ────────────────────────────────────────────
  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === 'all' || u.role?.roleName === roleFilter
    const matchesSearch = !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRole && matchesSearch
  })

  const currentUserPermissions = getUserPermissions(user)
  const canManageUsers = hasPermission(currentUserPermissions, 'user_management')
  const canManageRoles = hasPermission(currentUserPermissions, 'role_management')

  // ─── Render ───────────────────────────────────────────────
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#59ff00]" />
            User & Role Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">Define users, assign roles, and control granular permissions for each section</p>
        </div>
        <div className="flex gap-2">
          {canManageUsers && (
            <Button onClick={openNewUser} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              <UserPlus className="w-4 h-4 mr-1" /> Add User
            </Button>
          )}
          {canManageRoles && (
            <Button onClick={openNewRole} variant="outline" className="border-[#59ff00]/30 text-[#59ff00] hover:bg-[#59ff00]/10">
              <Plus className="w-4 h-4 mr-1" /> New Role
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Total Users" value={users.length} icon={Users} color="text-blue-400" />
        <StatCard label="Roles" value={roles.length} icon={Lock} color="text-purple-400" delay={0.05} />
        <StatCard label="Admins" value={users.filter(u => u.role?.roleName === 'admin').length} icon={Shield} color="text-[#59ff00]" delay={0.1} />
        <StatCard label="Managers" value={users.filter(u => u.role?.roleName === 'manager').length} icon={UserCog} color="text-purple-400" delay={0.15} />
        <StatCard label="Accountants" value={users.filter(u => u.role?.roleName === 'accountant').length} icon={Key} color="text-emerald-400" delay={0.2} />
        <StatCard label="HR Managers" value={users.filter(u => u.role?.roleName === 'hr_manager').length} icon={Users} color="text-cyan-400" delay={0.25} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-4">
        <TabsList className="bg-[#181818] border border-[#2a2a2a]">
          <TabsTrigger value="users" className="data-[state=active]:bg-[#59ff00]/10 data-[state=active]:text-[#59ff00]">
            <Users className="w-4 h-4 mr-1" /> Users ({users.length})
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-[#59ff00]/10 data-[state=active]:text-[#59ff00]">
            <Lock className="w-4 h-4 mr-1" /> Roles ({roles.length})
          </TabsTrigger>
        </TabsList>

        {/* ─── Users Tab ──────────────────────────────────── */}
        <TabsContent value="users" className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-9 ${inputCls}`} />
            </div>
            <div className="flex gap-1 flex-wrap">
              {['all', 'admin', 'manager', 'accountant', 'hr_manager', 'sales_executive', 'employee', 'customer'].map(r => (
                <Button key={r} variant={roleFilter === r ? 'default' : 'ghost'} size="sm"
                  onClick={() => setRoleFilter(r)}
                  className={roleFilter === r ? 'bg-[#59ff00] text-black text-xs h-8' : 'text-gray-400 hover:text-white text-xs h-8 capitalize'}>
                  {r === 'all' ? 'All' : r.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>

          <Card className={cardCls}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">User</TableHead>
                      <TableHead className="text-gray-400">Email</TableHead>
                      <TableHead className="text-gray-400">Role</TableHead>
                      <TableHead className="text-gray-400">Permissions</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u: any) => {
                      const perms = getUserPermissions(u)
                      const isAllPerms = perms.includes('all')
                      return (
                        <TableRow key={u.id} className="border-[#2a2a2a] hover:bg-white/5">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-[#59ff00]/10 flex items-center justify-center text-[#59ff00] text-xs font-bold">
                                {u.name?.charAt(0)?.toUpperCase() || '?'}
                              </div>
                              <span className="text-white text-sm font-medium">{u.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300 text-sm">{u.email}</TableCell>
                          <TableCell>
                            <Badge className={`text-[10px] ${roleBadgeCls(u.role?.roleName || '')}`}>
                              {(u.role?.roleName || 'unknown').replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <div className="flex flex-wrap gap-1">
                              {isAllPerms ? (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#59ff00]/10 text-[#59ff00] border border-[#59ff00]/20">All Access</span>
                              ) : perms.length > 0 ? (
                                <>
                                  {perms.slice(0, 3).map((p: string) => (
                                    <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-[#59ff00]/10 text-[#59ff00] border border-[#59ff00]/20 capitalize">
                                      {p.replace(/_/g, ' ')}
                                    </span>
                                  ))}
                                  {perms.length > 3 && <span className="text-gray-500 text-[10px]">+{perms.length - 3}</span>}
                                </>
                              ) : <span className="text-gray-600 text-xs">None</span>}
                            </div>
                          </TableCell>
                          <TableCell><Badge className={`text-[10px] ${statusBadgeCls(u.status)}`}>{u.status}</Badge></TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {canManageUsers && (
                                <>
                                  <Button size="sm" variant="ghost" onClick={() => openEditUser(u)} className="text-blue-400 h-8 w-8 p-0"><Edit className="w-3.5 h-3.5" /></Button>
                                  <Button size="sm" variant="ghost" onClick={() => handleDeleteUser(u.id)} className="text-red-400 h-8 w-8 p-0"><Trash2 className="w-3.5 h-3.5" /></Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {filteredUsers.length === 0 && !loading && (
                      <TableRow><TableCell colSpan={6} className="text-center text-gray-500 py-8">No users found</TableCell></TableRow>
                    )}
                    {loading && (
                      <TableRow><TableCell colSpan={6} className="text-center text-gray-500 py-8"><div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto" /></TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Roles Tab ──────────────────────────────────── */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {roles.map((r: any) => {
              let perms: string[] = []
              try {
                const parsed = typeof r.permissions === 'string' ? JSON.parse(r.permissions) : r.permissions
                perms = Array.isArray(parsed) ? parsed : []
              } catch { perms = [] }
              const isAllPerms = perms.includes('all')
              const isBuiltIn = ['admin', 'manager', 'employee', 'customer'].includes(r.roleName)
              const userCount = r._count?.users ?? 0

              return (
                <motion.div key={r.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card className={`${cardCls} hover:border-[#59ff00]/20 transition-colors`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${roleBadgeCls(r.roleName)}`}>
                            {r.roleName.replace('_', ' ')}
                          </Badge>
                          {isBuiltIn && <span className="text-[10px] text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">Built-in</span>}
                        </div>
                        {canManageRoles && !isBuiltIn && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" onClick={() => openEditRole(r)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3 h-3" /></Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteRole(r.id)} className="text-red-400 h-7 w-7 p-0"><Trash2 className="w-3 h-3" /></Button>
                          </div>
                        )}
                        {canManageRoles && isBuiltIn && (
                          <Button size="sm" variant="ghost" onClick={() => openEditRole(r)} className="text-blue-400 h-7 w-7 p-0"><Edit className="w-3 h-3" /></Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Users className="w-3.5 h-3.5" />
                        <span>{userCount} {userCount === 1 ? 'user' : 'users'}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {isAllPerms ? (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#59ff00]/10 text-[#59ff00] border border-[#59ff00]/20">Full Access (All Permissions)</span>
                        ) : (
                          <>
                            {perms.slice(0, 6).map((p: string) => {
                              const permDef = ALL_PERMISSIONS.find(pp => pp.key === p)
                              return (
                                <span key={p} className={`text-[10px] px-1.5 py-0.5 rounded ${permGroupBadgeCls(permDef?.group || '')} capitalize`}>
                                  {p.replace(/_/g, ' ')}
                                </span>
                              )
                            })}
                            {perms.length > 6 && <span className="text-gray-500 text-[10px]">+{perms.length - 6} more</span>}
                            {perms.length === 0 && <span className="text-gray-600 text-xs">No permissions</span>}
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* ─── User Dialog ────────────────────────────────── */}
      <Dialog open={userDialog} onOpenChange={setUserDialog}>
        <DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCog className="w-5 h-5 text-[#59ff00]" />
              {editUser ? 'Edit User' : 'Create New User'}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              {editUser ? 'Update user details and role assignment' : 'Add a new user and assign them a role with specific permissions'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-gray-400 text-xs">Full Name *</Label>
              <Input value={userForm.name} onChange={(e) => setUserForm(f => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="Enter full name" />
            </div>
            <div>
              <Label className="text-gray-400 text-xs">Email *</Label>
              <Input type="email" value={userForm.email} onChange={(e) => setUserForm(f => ({ ...f, email: e.target.value }))} className={inputCls} placeholder="user@company.com" />
            </div>
            <div>
              <Label className="text-gray-400 text-xs">Phone</Label>
              <Input value={userForm.phone} onChange={(e) => setUserForm(f => ({ ...f, phone: e.target.value }))} className={inputCls} placeholder="+91-" />
            </div>
            <div>
              <Label className="text-gray-400 text-xs">Password {editUser ? '(leave blank to keep current)' : '*'}</Label>
              <Input type="password" value={userForm.password} onChange={(e) => setUserForm(f => ({ ...f, password: e.target.value }))} className={inputCls} placeholder={editUser ? 'Leave blank to keep' : 'Minimum 6 characters'} />
            </div>
            <div>
              <Label className="text-gray-400 text-xs flex items-center gap-1"><Shield className="w-3 h-3" /> Role *</Label>
              <Select value={userForm.roleId} onValueChange={(v) => setUserForm(f => ({ ...f, roleId: v }))}>
                <SelectTrigger className={inputCls}><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                  {roles.map((r: any) => (
                    <SelectItem key={r.id} value={r.id} className="text-white">
                      <div className="flex items-center gap-2">
                        <span className="capitalize">{r.roleName.replace('_', ' ')}</span>
                        <span className="text-gray-500 text-xs">({r._count?.users ?? 0} users)</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {userForm.roleId && (() => {
                const selectedRole = roles.find((r: any) => r.id === userForm.roleId)
                if (selectedRole) {
                  let perms: string[] = []
                  try { const p = typeof selectedRole.permissions === 'string' ? JSON.parse(selectedRole.permissions) : selectedRole.permissions; perms = Array.isArray(p) ? p : [] } catch { perms = [] }
                  const isAll = perms.includes('all')
                  return (
                    <div className="mt-1.5 p-2 rounded bg-[#0b0b0b] border border-[#2a2a2a]">
                      <p className="text-gray-500 text-[10px] mb-1">This role grants access to:</p>
                      <div className="flex flex-wrap gap-1">
                        {isAll ? <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#59ff00]/10 text-[#59ff00]">All Permissions</span> :
                          perms.slice(0, 8).map(p => <span key={p} className="text-[10px] px-1 py-0.5 rounded bg-[#59ff00]/10 text-[#59ff00] capitalize">{p.replace(/_/g, ' ')}</span>)
                        }
                        {!isAll && perms.length > 8 && <span className="text-gray-500 text-[10px]">+{perms.length - 8}</span>}
                      </div>
                    </div>
                  )
                }
                return null
              })()}
            </div>
            <div>
              <Label className="text-gray-400 text-xs">Status</Label>
              <Select value={userForm.status} onValueChange={(v) => setUserForm(f => ({ ...f, status: v }))}>
                <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                  <SelectItem value="active" className="text-white">Active</SelectItem>
                  <SelectItem value="inactive" className="text-white">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setUserDialog(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSaveUser} disabled={savingUser} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              {savingUser ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : editUser ? 'Update User' : 'Create User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Role Dialog ────────────────────────────────── */}
      <Dialog open={roleDialog} onOpenChange={setRoleDialog}>
        <DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#59ff00]" />
              {editRole ? `Edit Role — ${editRole.roleName.replace('_', ' ')}` : 'Create New Role'}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Define the role name and select which sections/features this role can access
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Role Name */}
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Label className="text-gray-400 text-xs">Role Name *</Label>
                <Input value={roleForm.roleName} onChange={(e) => setRoleForm(f => ({ ...f, roleName: e.target.value }))}
                  className={inputCls} placeholder="e.g., sales_executive, accountant" disabled={editRole?.roleName === 'admin'} />
              </div>
              <div className="flex gap-2">
                {editRole?.roleName !== 'admin' && (
                  <Select onValueChange={applyDefaultPermissions}>
                    <SelectTrigger className={`${inputCls} w-44`}>
                      <SelectValue placeholder="Apply defaults..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                      {Object.keys(DEFAULT_ROLE_PERMISSIONS).filter(k => k !== 'admin').map(k => (
                        <SelectItem key={k} value={k} className="text-white capitalize">{k.replace('_', ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Permission Summary */}
            <div className="p-3 rounded-lg bg-[#0b0b0b] border border-[#2a2a2a] flex items-center justify-between">
              <div className="text-sm">
                <span className="text-gray-400">Selected: </span>
                <span className="text-[#59ff00] font-bold">{roleForm.permissions.length}</span>
                <span className="text-gray-500"> / {ALL_PERMISSIONS.length} permissions</span>
              </div>
              <Button variant="ghost" size="sm" onClick={selectAllPermissions} className="text-[#59ff00] text-xs h-7">
                {roleForm.permissions.length === ALL_PERMISSIONS.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>

            {/* Permission Groups */}
            <div className="space-y-2">
              {PERMISSION_GROUPS.map(group => {
                const groupPerms = ALL_PERMISSIONS.filter(p => p.group === group.key)
                const selectedInGroup = groupPerms.filter(p => roleForm.permissions.includes(p.key)).length
                const isExpanded = expandedGroups.has(group.key)

                return (
                  <div key={group.key} className="rounded-lg border border-[#2a2a2a] overflow-hidden">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleGroup(group.key)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleGroup(group.key) } }}
                      className="w-full flex items-center justify-between p-3 bg-[#0b0b0b] hover:bg-[#0b0b0b]/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{group.icon}</span>
                        <span className="text-white text-sm font-medium">{group.label}</span>
                        <span className="text-gray-500 text-xs">({selectedInGroup}/{groupPerms.length})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); selectAllInGroup(group.key) }}
                          className="text-[#59ff00] text-[10px] h-6 px-2">
                          {selectedInGroup === groupPerms.length ? 'Deselect All' : 'Select All'}
                        </Button>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </div>
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {groupPerms.map(perm => {
                              const isSelected = roleForm.permissions.includes(perm.key)
                              return (
                                <button
                                  key={perm.key}
                                  onClick={() => togglePermission(perm.key)}
                                  type="button"
                                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-left transition-all ${
                                    isSelected
                                      ? 'bg-[#59ff00]/10 border-[#59ff00]/30 text-[#59ff00]'
                                      : 'bg-[#0b0b0b] border-[#2a2a2a] text-gray-400 hover:border-[#59ff00]/20'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                    isSelected ? 'bg-[#59ff00] border-[#59ff00]' : 'border-gray-500'
                                  }`}>
                                    {isSelected && <Check className="w-3 h-3 text-black" />}
                                  </div>
                                  <div>
                                    <p className={`text-xs font-medium ${isSelected ? 'text-[#59ff00]' : 'text-gray-300'}`}>{perm.label}</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{perm.description}</p>
                                  </div>
                                </button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* Warning for admin role */}
            {editRole?.roleName === 'admin' && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <p className="text-yellow-400 text-xs">Admin role always has full access. Removing permissions is not allowed.</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setRoleDialog(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSaveRole} disabled={savingRole} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              {savingRole ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : editRole ? 'Update Role' : 'Create Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
