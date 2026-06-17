'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus, Edit, Trash2, Users, Shield, Lock, Check,
  UserCog, Award, Search,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { statusBadgeCls } from './types'
import { toast } from 'sonner'

// ─── Permission Definitions ──────────────────────────────────
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
  { key: 'blog', label: 'Blog' },
]

// ─── Stat Card ──────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, delay = 0 }: { label: string; value: string | number; icon: React.ElementType; color: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card className="bg-[#181818] border-[#2a2a2a] hover:border-[#59ff00]/30 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{label}</p>
              <p className={`text-xl font-bold mt-1 ${color}`}>{value}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl ${color.replace('text-', 'bg-').replace(/-\d+$/, '-500/10')} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Role Badge Colors ──────────────────────────────────────
const roleBadgeCls = (rn: string) => {
  switch (rn) {
    case 'admin': return 'bg-[#59ff00]/20 text-[#59ff00] border-[#59ff00]/30'
    case 'manager': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    case 'hr': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    case 'employee': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'customer': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

interface UsersTabProps {
  userList: any[]
  roleList: any[]
  userDialog: boolean
  setUserDialog: (v: boolean) => void
  editUser: any
  setEditUser: (v: any) => void
  userForm: any
  setUserForm: React.Dispatch<React.SetStateAction<any>>
  roleFilter: string
  setRoleFilter: (v: string) => void
  doFetchUsers: () => void
}

export default function UsersTab({
  userList, roleList, userDialog, setUserDialog, editUser, setEditUser,
  userForm, setUserForm, roleFilter, setRoleFilter, doFetchUsers,
}: UsersTabProps) {
  const [activeTab, setActiveTab] = useState('users')
  const [searchQuery, setSearchQuery] = useState('')

  // ─── Permission Editing State ────────────────────────────
  const [permDialog, setPermDialog] = useState(false)
  const [permEditUser, setPermEditUser] = useState<any>(null)
  const [permEditRole, setPermEditRole] = useState('')
  const [permEditPermissions, setPermEditPermissions] = useState<string[]>([])
  const [permEditCanManageBlogs, setPermEditCanManageBlogs] = useState(false)
  const [permSaving, setPermSaving] = useState(false)

  // ─── Role Management State ───────────────────────────────
  const [roleDialog, setRoleDialog] = useState(false)
  const [roleEditItem, setRoleEditItem] = useState<any>(null)
  const [roleForm, setRoleForm] = useState({ roleName: '', permissions: [] as string[] })
  const [roleSaving, setRoleSaving] = useState(false)

  // ─── User CRUD ───────────────────────────────────────────
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
    // Validate required fields
    if (!userForm.name?.trim()) { toast.error('Name is required'); return }
    if (!userForm.email?.trim()) { toast.error('Email is required'); return }
    if (!editUser && !userForm.password?.trim()) { toast.error('Password is required for new users'); return }
    if (!userForm.roleId) { toast.error('Please select a role'); return }

    try {
      if (editUser) {
        const body: any = { name: userForm.name.trim(), email: userForm.email.trim(), phone: userForm.phone?.trim() || '', status: userForm.status, roleId: userForm.roleId }
        if (userForm.password?.trim()) body.password = userForm.password.trim()
        const res = await fetch(`/api/users/${editUser.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        if (!res.ok) { toast.error('Server error. Please try again.'); return }
        const text = await res.text()
        let json: any
        try { json = JSON.parse(text) } catch { toast.error('Invalid response from server'); return }
        if (json.status) { setUserDialog(false); doFetchUsers(); toast.success('User updated') } else { toast.error(json.message || 'Failed to update user') }
      } else {
        const res = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...userForm, name: userForm.name.trim(), email: userForm.email.trim() }) })
        if (!res.ok) { toast.error('Server error. Please try again.'); return }
        const text = await res.text()
        let json: any
        try { json = JSON.parse(text) } catch { toast.error('Invalid response from server'); return }
        if (json.status) { setUserDialog(false); doFetchUsers(); toast.success('User created') } else { toast.error(json.message || 'Failed to create user') }
      }
    } catch (e) { console.error(e); toast.error('Failed to save user. Check your connection.') }
  }

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Delete this user?')) return
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.status) { doFetchUsers(); toast.success('User deleted') } else { toast.error(json.message || 'Failed to delete') }
    } catch (e) { toast.error('Failed to delete') }
  }

  // ─── Permission Editing ──────────────────────────────────
  const openPermEdit = (user: any) => {
    setPermEditUser(user)
    setPermEditRole(user.roleId || user.role?.id || '')
    setPermEditCanManageBlogs(!!user.canManageBlogs)
    const perms = user.role?.permissions
    try {
      const parsed = typeof perms === 'string' ? JSON.parse(perms) : (Array.isArray(perms) ? perms : [])
      setPermEditPermissions(Array.isArray(parsed) ? parsed : [])
    } catch { setPermEditPermissions([]) }
    setPermDialog(true)
  }

  const togglePermission = (key: string) => {
    setPermEditPermissions(prev => prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key])
  }

  const handleSavePermissions = async () => {
    if (!permEditUser) return
    setPermSaving(true)
    try {
      // Update user role + canManageBlogs
      const res = await fetch(`/api/users/${permEditUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleId: permEditRole, canManageBlogs: permEditCanManageBlogs }),
      })
      const json = await res.json()
      if (!json.status) { toast.error(json.message || 'Failed to update role'); return }

      // Update role permissions
      const targetRole = permEditRole || permEditUser.roleId
      if (targetRole) {
        const roleRes = await fetch(`/api/roles/${targetRole}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ permissions: permEditPermissions }),
        })
        const roleJson = await roleRes.json()
        if (!roleJson.status) { toast.error(roleJson.message || 'Failed to update permissions'); return }
      }

      setPermDialog(false)
      doFetchUsers()
      toast.success('Access & permissions updated')
    } catch (e) { console.error(e); toast.error('Failed') } finally { setPermSaving(false) }
  }

  // ─── Role CRUD ───────────────────────────────────────────
  const openNewRole = () => {
    setRoleEditItem(null)
    setRoleForm({ roleName: '', permissions: [] })
    setRoleDialog(true)
  }
  const openEditRole = (role: any) => {
    setRoleEditItem(role)
    let perms: string[] = []
    try {
      const p = typeof role.permissions === 'string' ? JSON.parse(role.permissions) : role.permissions
      perms = Array.isArray(p) ? p : []
    } catch { perms = [] }
    setRoleForm({ roleName: role.roleName, permissions: perms })
    setRoleDialog(true)
  }

  const handleSaveRole = async () => {
    if (!roleForm.roleName.trim()) { toast.error('Role name is required'); return }
    setRoleSaving(true)
    try {
      if (roleEditItem) {
        // Update existing role
        const res = await fetch(`/api/roles/${roleEditItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ permissions: roleForm.permissions }),
        })
        const json = await res.json()
        if (!json.status) { toast.error(json.message || 'Failed to update role'); return }
        toast.success('Role updated')
      } else {
        // Create new role
        const res = await fetch('/api/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roleName: roleForm.roleName, permissions: roleForm.permissions }),
        })
        const json = await res.json()
        if (!json.status) { toast.error(json.message || 'Failed to create role'); return }
        toast.success('Role created')
      }
      setRoleDialog(false)
      doFetchUsers()
    } catch (e) { console.error(e); toast.error('Failed') } finally { setRoleSaving(false) }
  }

  const handleDeleteRole = async (id: string) => {
    // Check if any users have this role
    const usersWithRole = userList.filter((u: any) => u.roleId === id || u.role?.id === id)
    if (usersWithRole.length > 0) {
      toast.error(`Cannot delete: ${usersWithRole.length} user(s) have this role`)
      return
    }
    if (!confirm('Delete this role?')) return
    try {
      const res = await fetch(`/api/roles/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.status) { doFetchUsers(); toast.success('Role deleted') } else { toast.error(json.message || 'Failed to delete role') }
    } catch (e) { toast.error('Failed to delete role') }
  }

  // ─── Filtered Users ─────────────────────────────────────
  const filteredUsers = userList.filter((u: any) => {
    if (roleFilter !== 'all' && u.role?.roleName !== roleFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q) || (u.phone || '').includes(q)
    }
    return true
  })

  // ─── Stats ───────────────────────────────────────────────
  const totalUsers = userList.length
  const adminCount = userList.filter((u: any) => u.role?.roleName === 'admin').length
  const managerCount = userList.filter((u: any) => u.role?.roleName === 'manager').length
  const employeeCount = userList.filter((u: any) => u.role?.roleName === 'employee').length

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#59ff00]/10 border border-[#59ff00]/30 flex items-center justify-center">
          <Users className="w-5 h-5 text-[#59ff00]" />
        </div>
        <div>
          <h2 className="text-white text-xl font-bold">Users & Access Control</h2>
          <p className="text-gray-500 text-xs">Manage users, assign roles, and control access permissions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={totalUsers} icon={Users} color="text-blue-400" />
        <StatCard label="Admins" value={adminCount} icon={Shield} color="text-[#59ff00]" delay={0.1} />
        <StatCard label="Managers" value={managerCount} icon={Award} color="text-purple-400" delay={0.2} />
        <StatCard label="Employees" value={employeeCount} icon={UserCog} color="text-yellow-400" delay={0.3} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#181818] border border-[#2a2a2a]">
          <TabsTrigger value="users" className="data-[state=active]:bg-[#59ff00] data-[state=active]:text-black text-gray-400 text-xs">
            <Users className="w-3.5 h-3.5 mr-1.5" /> Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-[#59ff00] data-[state=active]:text-black text-gray-400 text-xs">
            <Lock className="w-3.5 h-3.5 mr-1.5" /> Roles & Permissions
          </TabsTrigger>
        </TabsList>

        {/* ─── Users Tab ────────────────────────────────────── */}
        <TabsContent value="users" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-[#0b0b0b] border-[#2a2a2a] text-white placeholder:text-gray-600 h-9 text-sm w-64"
                />
              </div>
              <div className="flex gap-1 flex-wrap">
                {['all', ...roleList.map((r: any) => r.roleName)].map(r => (
                  <Button key={r} variant={roleFilter === r ? 'default' : 'ghost'} size="sm"
                    onClick={() => setRoleFilter(r)}
                    className={roleFilter === r ? 'bg-[#59ff00] text-black h-8 text-xs' : 'text-gray-400 hover:text-white capitalize h-8 text-xs'}>
                    {r === 'all' ? 'All' : r}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={openNewUser} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Add User
            </Button>
          </div>

          <Card className="bg-[#181818] border-[#2a2a2a]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#2a2a2a] hover:bg-transparent">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Email</TableHead>
                      <TableHead className="text-gray-400">Phone</TableHead>
                      <TableHead className="text-gray-400">Role</TableHead>
                      <TableHead className="text-gray-400">Access</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u: any) => {
                      const perms = u.role?.permissions
                      let permList: string[] = []
                      try { const p = typeof perms === 'string' ? JSON.parse(perms) : perms; permList = Array.isArray(p) ? p : [] } catch { permList = [] }
                      const isAdmin = u.role?.roleName === 'admin'
                      return (
                        <TableRow key={u.id} className="border-[#2a2a2a] hover:bg-white/5">
                          <TableCell className="text-white text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-[#59ff00]/10 border border-[#59ff00]/30 flex items-center justify-center text-[10px] font-bold text-[#59ff00]">
                                {(u.name || 'U').charAt(0).toUpperCase()}
                              </div>
                              {u.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-300 text-sm">{u.email}</TableCell>
                          <TableCell className="text-gray-300 text-sm">{u.phone || '-'}</TableCell>
                          <TableCell>
                            <Badge className={`text-[10px] capitalize ${roleBadgeCls(u.role?.roleName || '')}`}>
                              {u.role?.roleName || 'unknown'}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[180px]">
                            {isAdmin ? (
                              <div className="flex flex-wrap gap-0.5">
                                <span className="text-[10px] px-2 py-0.5 rounded bg-[#59ff00]/20 text-[#59ff00] border border-[#59ff00]/30 font-medium">Full Access</span>
                              </div>
                            ) : permList.length > 0 || u.canManageBlogs ? (
                              <div className="flex flex-wrap gap-0.5">
                                {permList.slice(0, 3).map((p: string) => (
                                  <span key={p} className="text-[9px] px-1.5 py-0.5 rounded bg-[#59ff00]/10 text-[#59ff00] capitalize">{p}</span>
                                ))}
                                {u.canManageBlogs && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Blog</span>
                                )}
                                {permList.length > 3 && <span className="text-gray-500 text-[9px]">+{permList.length - 3}</span>}
                              </div>
                            ) : u.canManageBlogs ? (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Blog</span>
                            ) : (
                              <span className="text-gray-600 text-xs">No access</span>
                            )}
                          </TableCell>
                          <TableCell><Badge className={`text-[10px] ${statusBadgeCls(u.status)}`}>{u.status}</Badge></TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" onClick={() => openEditUser(u)} className="text-blue-400 h-7 w-7 p-0" title="Edit user">
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => openPermEdit(u)} className="text-[#59ff00] h-7 w-7 p-0" title="Manage access">
                                <Lock className="w-3.5 h-3.5" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => handleDeleteUser(u.id)} className="text-red-400 h-7 w-7 p-0" title="Delete user">
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 py-8">No users found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Roles & Permissions Tab ──────────────────────── */}
        <TabsContent value="roles" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Manage roles and their permissions. Users inherit permissions from their assigned role.</p>
            <Button onClick={openNewRole} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              <Plus className="w-4 h-4 mr-1" /> Create Role
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleList.map((role: any) => {
              let perms: string[] = []
              try { const p = typeof role.permissions === 'string' ? JSON.parse(role.permissions) : role.permissions; perms = Array.isArray(p) ? p : [] } catch { perms = [] }
              const isAllAccess = perms.includes('all')
              const usersWithRole = userList.filter((u: any) => u.roleId === role.id || u.role?.id === role.id).length
              return (
                <Card key={role.id} className="bg-[#181818] border-[#2a2a2a] hover:border-[#59ff00]/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${roleBadgeCls(role.roleName).replace('border-', 'bg-').split(' ').find(c => c.startsWith('bg-')) || 'bg-gray-500/20'}`}>
                          {role.roleName === 'admin' ? <Shield className="w-4 h-4 text-[#59ff00]" /> :
                           role.roleName === 'manager' ? <Award className="w-4 h-4 text-purple-400" /> :
                           <Lock className="w-4 h-4 text-gray-400" />}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm capitalize">{role.roleName}</h3>
                          <p className="text-gray-500 text-[10px]">{usersWithRole} user{usersWithRole !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openEditRole(role)} className="text-blue-400 h-6 w-6 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        {role.roleName !== 'admin' && role.roleName !== 'customer' && (
                          <Button size="sm" variant="ghost" onClick={() => handleDeleteRole(role.id)} className="text-red-400 h-6 w-6 p-0">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Permissions</p>
                      {isAllAccess ? (
                        <div className="flex flex-wrap gap-1">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#59ff00]/20 text-[#59ff00] border border-[#59ff00]/30 font-medium">Full Access (All)</span>
                        </div>
                      ) : perms.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {perms.map((p: string) => (
                            <span key={p} className="text-[10px] px-1.5 py-0.5 rounded bg-[#59ff00]/10 text-[#59ff00] capitalize">{p}</span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-600 text-xs">No permissions assigned</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
            {roleList.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">No roles found. Create one to get started.</div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* ─── Add/Edit User Dialog ──────────────────────────── */}
      <Dialog open={userDialog} onOpenChange={setUserDialog}>
        <DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-md">
          <DialogHeader>
            <DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogDescription>Fill in user details and assign a role for access control</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-gray-400 text-xs">Name</Label>
              <Input value={userForm.name} onChange={(e) => setUserForm(f => ({ ...f, name: e.target.value }))} className="bg-[#0b0b0b] border-[#2a2a2a] text-white" />
            </div>
            <div>
              <Label className="text-gray-400 text-xs">Email</Label>
              <Input value={userForm.email} onChange={(e) => setUserForm(f => ({ ...f, email: e.target.value }))} className="bg-[#0b0b0b] border-[#2a2a2a] text-white" />
            </div>
            <div>
              <Label className="text-gray-400 text-xs">Phone</Label>
              <Input value={userForm.phone} onChange={(e) => setUserForm(f => ({ ...f, phone: e.target.value }))} className="bg-[#0b0b0b] border-[#2a2a2a] text-white" />
            </div>
            <div>
              <Label className="text-gray-400 text-xs">Password {editUser && '(leave blank to keep current)'}</Label>
              <Input type="password" value={userForm.password} onChange={(e) => setUserForm(f => ({ ...f, password: e.target.value }))} className="bg-[#0b0b0b] border-[#2a2a2a] text-white" />
            </div>
            <div>
              <Label className="text-gray-400 text-xs">Role (determines access level)</Label>
              <Select value={userForm.roleId} onValueChange={(v) => setUserForm(f => ({ ...f, roleId: v }))}>
                <SelectTrigger className="bg-[#0b0b0b] border-[#2a2a2a] text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                  {roleList.map((r: any) => (
                    <SelectItem key={r.id} value={r.id} className="text-white capitalize">{r.roleName}</SelectItem>
                  ))}
                  {roleList.length === 0 && ['admin', 'manager', 'employee', 'customer'].map(r => (
                    <SelectItem key={r} value={r} className="text-white capitalize">{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-400 text-xs">Status</Label>
              <Select value={userForm.status} onValueChange={(v) => setUserForm(f => ({ ...f, status: v }))}>
                <SelectTrigger className="bg-[#0b0b0b] border-[#2a2a2a] text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                  <SelectItem value="active" className="text-white">Active</SelectItem>
                  <SelectItem value="inactive" className="text-white">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setUserDialog(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSaveUser} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90">{editUser ? 'Update' : 'Create'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Edit Permissions Dialog ────────────────────────── */}
      <Dialog open={permDialog} onOpenChange={setPermDialog}>
        <DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">Manage Access — {permEditUser?.name}</DialogTitle>
            <DialogDescription>Assign role and toggle individual permissions for this user</DialogDescription>
          </DialogHeader>
          {permEditUser && (
            <div className="space-y-4">
              <div>
                <Label className="text-gray-400 text-xs">Role</Label>
                <Select value={permEditRole} onValueChange={setPermEditRole}>
                  <SelectTrigger className="bg-[#0b0b0b] border-[#2a2a2a] text-white"><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent className="bg-[#181818] border-[#2a2a2a]">
                    {roleList.map((r: any) => (
                      <SelectItem key={r.id} value={r.id} className="text-white capitalize">{r.roleName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-400 text-xs font-medium">Permissions</Label>
                <p className="text-gray-600 text-[10px]">These permissions apply to the user&apos;s role and affect all users with the same role.</p>
                <div className="grid grid-cols-3 gap-2">
                  {ALL_PERMISSIONS.map(({ key, label }) => (
                    <button key={key} onClick={() => togglePermission(key)} type="button"
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${permEditPermissions.includes(key) || permEditPermissions.includes('all') ? 'bg-[#59ff00]/10 border-[#59ff00]/30 text-[#59ff00]' : 'bg-[#0b0b0b] border-[#2a2a2a] text-gray-400 hover:border-[#59ff00]/20'}`}>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${permEditPermissions.includes(key) || permEditPermissions.includes('all') ? 'bg-[#59ff00] border-[#59ff00]' : 'border-gray-500'}`}>
                        {(permEditPermissions.includes(key) || permEditPermissions.includes('all')) && <Check className="w-3 h-3 text-black" />}
                      </div>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Blog Management Access Toggle */}
              <div className="pt-2 border-t border-[#2a2a2a]">
                <button
                  type="button"
                  onClick={() => setPermEditCanManageBlogs(!permEditCanManageBlogs)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg border transition-all ${
                    permEditCanManageBlogs
                      ? 'bg-[#59ff00]/10 border-[#59ff00]/30'
                      : 'bg-[#0b0b0b] border-[#2a2a2a] hover:border-[#59ff00]/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${permEditCanManageBlogs ? 'bg-[#59ff00]/20' : 'bg-[#1a1a1a]'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4.5 h-4.5 ${permEditCanManageBlogs ? 'text-[#59ff00]' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-medium ${permEditCanManageBlogs ? 'text-[#59ff00]' : 'text-gray-300'}`}>Blog Management</p>
                      <p className="text-gray-600 text-[10px]">Allow this user to create, edit, and delete blog posts</p>
                    </div>
                  </div>
                  <div className={`w-10 h-5 rounded-full transition-all flex items-center ${permEditCanManageBlogs ? 'bg-[#59ff00] justify-end' : 'bg-[#2a2a2a] justify-start'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white mx-0.5 transition-all ${permEditCanManageBlogs ? 'shadow-[0_0_8px_rgba(89,255,0,0.5)]' : ''}`} />
                  </div>
                </button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPermDialog(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSavePermissions} disabled={permSaving} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              {permSaving ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : 'Save Permissions'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Create/Edit Role Dialog ────────────────────────── */}
      <Dialog open={roleDialog} onOpenChange={setRoleDialog}>
        <DialogContent className="bg-[#181818] border-[#2a2a2a] text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">{roleEditItem ? 'Edit Role' : 'Create Role'}</DialogTitle>
            <DialogDescription>Define a role and its permissions</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-gray-400 text-xs">Role Name</Label>
              <Input
                value={roleForm.roleName}
                onChange={(e) => setRoleForm(f => ({ ...f, roleName: e.target.value }))}
                className="bg-[#0b0b0b] border-[#2a2a2a] text-white"
                disabled={!!roleEditItem}
                placeholder="e.g. supervisor, sales_lead"
              />
              {roleEditItem && <p className="text-gray-600 text-[10px] mt-1">Role name cannot be changed after creation</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-gray-400 text-xs font-medium">Permissions</Label>
              <div className="grid grid-cols-3 gap-2">
                {ALL_PERMISSIONS.map(({ key, label }) => (
                  <button key={key} onClick={() => {
                    setRoleForm(f => ({
                      ...f,
                      permissions: f.permissions.includes(key) ? f.permissions.filter(p => p !== key) : [...f.permissions, key]
                    }))
                  }} type="button"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${roleForm.permissions.includes(key) ? 'bg-[#59ff00]/10 border-[#59ff00]/30 text-[#59ff00]' : 'bg-[#0b0b0b] border-[#2a2a2a] text-gray-400 hover:border-[#59ff00]/20'}`}>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${roleForm.permissions.includes(key) ? 'bg-[#59ff00] border-[#59ff00]' : 'border-gray-500'}`}>
                      {roleForm.permissions.includes(key) && <Check className="w-3 h-3 text-black" />}
                    </div>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setRoleDialog(false)} className="text-gray-400">Cancel</Button>
            <Button onClick={handleSaveRole} disabled={roleSaving} className="bg-[#59ff00] text-black hover:bg-[#59ff00]/90 font-semibold">
              {roleSaving ? <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : roleEditItem ? 'Update Role' : 'Create Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
