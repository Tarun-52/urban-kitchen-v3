// ─── Granular Permission Definitions ─────────────────────────
// Each permission key maps to a specific section/feature in the admin panel.
// Admins always have ALL permissions. Other roles get only what's assigned.

export interface PermissionDef {
  key: string
  label: string
  group: 'core' | 'crm' | 'hrm' | 'finance' | 'settings'
  description: string
}

export const PERMISSION_GROUPS: { key: PermissionDef['group']; label: string; icon: string }[] = [
  { key: 'core', label: 'Core Business', icon: '📦' },
  { key: 'crm', label: 'CRM & Sales', icon: '🎯' },
  { key: 'hrm', label: 'HR & People', icon: '👥' },
  { key: 'finance', label: 'Finance & Accounts', icon: '💰' },
  { key: 'settings', label: 'System & Settings', icon: '⚙️' },
]

export const ALL_PERMISSIONS: PermissionDef[] = [
  // Core Business
  { key: 'dashboard', label: 'Dashboard', group: 'core', description: 'View admin dashboard overview' },
  { key: 'products', label: 'Products', group: 'core', description: 'Manage product catalog' },
  { key: 'categories', label: 'Categories', group: 'core', description: 'Manage product categories' },
  { key: 'orders', label: 'Order Management', group: 'core', description: 'View and manage orders' },
  { key: 'amc', label: 'AMC Contracts', group: 'core', description: 'Manage annual maintenance contracts' },
  { key: 'service', label: 'Service Requests', group: 'core', description: 'Handle service/support tickets' },
  { key: 'inquiries', label: 'Inquiries', group: 'core', description: 'View customer inquiries' },
  { key: 'blog', label: 'Blog Management', group: 'core', description: 'Create, edit and manage blog posts' },

  // CRM & Sales
  { key: 'crm_dashboard', label: 'CRM Dashboard', group: 'crm', description: 'CRM analytics overview' },
  { key: 'leads', label: 'Leads', group: 'crm', description: 'Manage sales leads' },
  { key: 'quotations', label: 'Quotations', group: 'crm', description: 'Create and manage quotations' },
  { key: 'customers', label: 'Customers', group: 'crm', description: 'Manage customer accounts' },
  { key: 'crm_companies', label: 'Companies', group: 'crm', description: 'Manage company records' },
  { key: 'crm_pipelines', label: 'Pipelines', group: 'crm', description: 'Manage sales pipelines' },

  // HR & People
  { key: 'hrm_dashboard', label: 'HR Dashboard', group: 'hrm', description: 'HR analytics overview' },
  { key: 'employees', label: 'Employees', group: 'hrm', description: 'Manage employee records' },
  { key: 'attendance', label: 'Attendance', group: 'hrm', description: 'Track attendance' },
  { key: 'leaves', label: 'Leaves', group: 'hrm', description: 'Manage leave requests' },
  { key: 'hrm_departments', label: 'Departments', group: 'hrm', description: 'Manage departments' },
  { key: 'hrm_designations', label: 'Designations', group: 'hrm', description: 'Manage designations' },
  { key: 'hrm_payroll', label: 'Payroll', group: 'hrm', description: 'Process payroll' },
  { key: 'hrm_salary_slips', label: 'Salary Slips', group: 'hrm', description: 'Generate salary slips' },
  { key: 'hrm_recruitment', label: 'Recruitment', group: 'hrm', description: 'Manage recruitment' },
  { key: 'hrm_performance', label: 'Performance', group: 'hrm', description: 'Performance reviews' },
  { key: 'hrm_appraisals', label: 'Appraisals', group: 'hrm', description: 'Manage appraisals' },
  { key: 'hrm_training', label: 'Training', group: 'hrm', description: 'Training programs' },
  { key: 'hrm_assets', label: 'Assets', group: 'hrm', description: 'Asset management' },
  { key: 'hrm_shifts', label: 'Shifts', group: 'hrm', description: 'Shift management' },
  { key: 'hrm_work_reports', label: 'Work Reports', group: 'hrm', description: 'Work reports tracking' },

  // Finance & Accounts
  { key: 'finance_dashboard', label: 'Finance Dashboard', group: 'finance', description: 'Financial overview' },
  { key: 'invoices', label: 'Invoices', group: 'finance', description: 'Manage invoices' },
  { key: 'payments', label: 'Payments', group: 'finance', description: 'Track payments' },
  { key: 'expenses', label: 'Expenses', group: 'finance', description: 'Track expenses' },
  { key: 'gst_reports', label: 'GST Reports', group: 'finance', description: 'GST filing and reports' },
  { key: 'tds_reports', label: 'TDS Reports', group: 'finance', description: 'TDS reports' },

  // System & Settings
  { key: 'user_management', label: 'User Management', group: 'settings', description: 'Create and manage users' },
  { key: 'role_management', label: 'Role Management', group: 'settings', description: 'Create and manage roles' },
  { key: 'settings', label: 'Settings', group: 'settings', description: 'System settings' },
  { key: 'activity_log', label: 'Activity Log', group: 'settings', description: 'View activity logs' },
]

// ─── Default Role Permissions ────────────────────────────────
export const DEFAULT_ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: ['all'],
  manager: [
    'dashboard', 'products', 'categories', 'orders', 'amc', 'service', 'inquiries', 'blog',
    'crm_dashboard', 'leads', 'quotations', 'customers', 'crm_companies', 'crm_pipelines',
    'hrm_dashboard', 'employees', 'attendance', 'leaves', 'hrm_departments', 'hrm_designations',
    'hrm_payroll', 'hrm_salary_slips', 'hrm_shifts', 'hrm_work_reports',
    'finance_dashboard', 'invoices', 'payments',
    'activity_log',
  ],
  accountant: [
    'dashboard', 'orders',
    'finance_dashboard', 'invoices', 'payments', 'expenses', 'gst_reports', 'tds_reports',
    'hrm_payroll', 'hrm_salary_slips',
    'activity_log',
  ],
  hr_manager: [
    'dashboard',
    'hrm_dashboard', 'employees', 'attendance', 'leaves', 'hrm_departments', 'hrm_designations',
    'hrm_payroll', 'hrm_salary_slips', 'hrm_recruitment', 'hrm_performance', 'hrm_appraisals',
    'hrm_training', 'hrm_assets', 'hrm_shifts', 'hrm_work_reports',
    'activity_log',
  ],
  sales_executive: [
    'dashboard',
    'crm_dashboard', 'leads', 'quotations', 'customers', 'crm_companies', 'crm_pipelines',
    'inquiries', 'orders', 'blog',
    'activity_log',
  ],
  employee: [
    'dashboard', 'attendance', 'leaves', 'hrm_work_reports',
  ],
  customer: [
    'orders',
  ],
}

// ─── Sidebar Item → Permission Mapping ──────────────────────
// Maps each AdminTab key to the permission key required to see it
export const TAB_PERMISSION_MAP: Record<string, string> = {
  // Core
  dashboard: 'dashboard',
  products: 'products',
  categories: 'categories',
  orders: 'orders',
  amc: 'amc',
  service: 'service',
  inquiries: 'inquiries',
  blog: 'blog',
  // CRM
  'crm-dashboard': 'crm_dashboard',
  leads: 'leads',
  quotations: 'quotations',
  customers: 'customers',
  'crm-companies': 'crm_companies',
  'crm-pipelines': 'crm_pipelines',
  'crm-pipeline': 'crm_pipelines',
  // HRM
  'hrm-dashboard': 'hrm_dashboard',
  employees: 'employees',
  attendance: 'attendance',
  leaves: 'leaves',
  'hrm-departments': 'hrm_departments',
  'hrm-designations': 'hrm_designations',
  'hrm-payroll': 'hrm_payroll',
  'hrm-salary-slips': 'hrm_salary_slips',
  'hrm-recruitment': 'hrm_recruitment',
  'hrm-job-openings': 'hrm_recruitment',
  'hrm-interviews': 'hrm_recruitment',
  'hrm-performance': 'hrm_performance',
  'hrm-appraisals': 'hrm_appraisals',
  'hrm-training': 'hrm_training',
  'hrm-holidays': 'hrm_dashboard',
  'hrm-notices': 'hrm_dashboard',
  'hrm-assets': 'hrm_assets',
  'hrm-documents': 'hrm_assets',
  'hrm-shifts': 'hrm_shifts',
  'hrm-work-reports': 'hrm_work_reports',
  'hrm-team': 'hrm_dashboard',
  'hrm-permissions': 'user_management',
  // Settings
  settings: 'settings',
  activity: 'activity_log',
  // RBAC
  'user-management': 'user_management',
}

// ─── Permission Check Utility ────────────────────────────────
export function hasPermission(userPermissions: string[], permission: string): boolean {
  if (userPermissions.includes('all')) return true
  return userPermissions.includes(permission)
}

export function getUserPermissions(user: any): string[] {
  if (!user) return []
  const perms = user.role?.permissions
  try {
    const parsed = typeof perms === 'string' ? JSON.parse(perms) : perms
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function canAccessTab(user: any, tabKey: string): boolean {
  const perms = getUserPermissions(user)
  if (perms.includes('all')) return true
  const required = TAB_PERMISSION_MAP[tabKey]
  if (!required) return true // If no mapping, allow access
  return perms.includes(required)
}

export function filterTabsByPermissions(user: any, tabs: string[]): string[] {
  return tabs.filter(tab => canAccessTab(user, tab))
}
