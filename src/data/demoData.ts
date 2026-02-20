// ✅ DEMO DATA - Only shown when user logs in via "Try Demo Account" button
// This data is STATIC and meant for demonstration purposes only
// Real users logging in via email/password will ALWAYS see live API data

export const isDemoMode = (): boolean => {
  return localStorage.getItem('demo_mode') === 'true'
}

// Demo Dashboard Stats
export const DEMO_DASHBOARD_STATS = {
  totalLicenses: '2,450',
  activeUsers: '1,284',
  availableLicenses: '1,166',
  successRate: '99.2%',
  totalUsers: 156,
  changes: {
    totalLicenses: { value: '+12%', trend: 'up' as const },
    activeUsers: { value: '+8%', trend: 'up' as const },
    availableLicenses: { value: '+15%', trend: 'up' as const },
    successRate: { value: '+0.5%', trend: 'up' as const }
  }
}

// Demo Profile Data - Complete profile for demo mode
export const DEMO_PROFILE = {
  name: 'Demo Super Administrator',
  email: 'demo@D-Securetech.com',
  timezone: 'Asia/Kolkata',
  role: 'superadmin',
  userRole: 'superadmin',
  user_role: 'superadmin',
  phone: '+91-9876543210',
  department: 'IT Administration',
  avatar: '',
  licenses: 1000,
  license_allocation: '1000',
  is_private_cloud: true,
  user_group: 'Enterprise',
  company: 'D-Secure Technologies',
  address: '123 Tech Park, Bangalore, India',
  created_at: '2024-01-15T09:00:00',
  last_login: '2024-11-28T14:30:00'
}

// Demo Billing Details - Complete billing info for demo mode
// Fields match what AdminDashboard Settings modal expects
export const DEMO_BILLING_DETAILS = {
  activePlanTypes: 'Enterprise Suite',
  activePlanIds: 'ENT-2024-001',
  totalPurchases: 3,
  totalLicenses: 1000,
  usedLicenses: 324,
  consumedLicenses: 324,
  availableLicenses: 676,
  validityYears: 3,
  purchaseDate: 'January 15, 2024',
  startDate: '2024-01-15',
  expiryDate: 'January 15, 2027',
  billingCycle: 'Annual',
  lastPayment: '2024-11-01',
  nextPayment: '2025-01-15',
  amount: '$12,500',
  paymentMethod: 'Credit Card ****4242',
  status: 'Active',
  autoRenew: true,
  userEmail: 'demo@D-Secure.com',
  // Features as readable string, not array
  features: 'Super Admin Access, Admin Dashboard, User Management, Reports, Audit Logs, System Settings'
}

// Demo Users List
export const DEMO_USERS = [
  { id: '1', name: 'Alice Johnson', email: 'alice@demo.com', role: 'Admin', status: 'active', lastLogin: '2024-11-28 10:30', department: 'IT' },
  { id: '2', name: 'Bob Smith', email: 'bob@demo.com', role: 'Manager', status: 'active', lastLogin: '2024-11-28 09:15', department: 'Operations' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@demo.com', role: 'User', status: 'active', lastLogin: '2024-11-27 16:45', department: 'Finance' },
  { id: '4', name: 'Diana Prince', email: 'diana@demo.com', role: 'Admin', status: 'offline', lastLogin: '2024-11-26 14:20', department: 'HR' },
  { id: '5', name: 'Edward Norton', email: 'edward@demo.com', role: 'User', status: 'active', lastLogin: '2024-11-28 08:00', department: 'Sales' },
  { id: '6', name: 'Fiona Apple', email: 'fiona@demo.com', role: 'Manager', status: 'active', lastLogin: '2024-11-28 11:00', department: 'Marketing' },
  { id: '7', name: 'George Lucas', email: 'george@demo.com', role: 'User', status: 'offline', lastLogin: '2024-11-25 12:30', department: 'IT' },
  { id: '8', name: 'Hannah Montana', email: 'hannah@demo.com', role: 'User', status: 'active', lastLogin: '2024-11-28 07:45', department: 'Support' },
]

// Demo User Activity
export const DEMO_USER_ACTIVITY = [
  { email: 'alice@demo.com', loginTime: '2024-11-28 10:30:00', logoutTime: '-', status: 'active' as const },
  { email: 'bob@demo.com', loginTime: '2024-11-28 09:15:00', logoutTime: '-', status: 'active' as const },
  { email: 'charlie@demo.com', loginTime: '2024-11-27 16:45:00', logoutTime: '2024-11-27 18:30:00', status: 'offline' as const },
  { email: 'diana@demo.com', loginTime: '2024-11-26 14:20:00', logoutTime: '2024-11-26 17:00:00', status: 'offline' as const },
  { email: 'edward@demo.com', loginTime: '2024-11-28 08:00:00', logoutTime: '-', status: 'active' as const },
  { email: 'fiona@demo.com', loginTime: '2024-11-28 11:00:00', logoutTime: '-', status: 'active' as const },
  { email: 'george@demo.com', loginTime: '2024-11-25 12:30:00', logoutTime: '2024-11-25 14:45:00', status: 'offline' as const },
  { email: 'hannah@demo.com', loginTime: '2024-11-28 07:45:00', logoutTime: '-', status: 'active' as const },
]

// Demo Reports
export const DEMO_REPORTS = [
  { id: 'RPT-001', type: 'Erasure Report', devices: 45, status: 'completed' as const, date: '2024-11-28', method: 'DoD 5220.22-M', duration: '2h 15m', size: '1.2GB' },
  { id: 'RPT-002', type: 'Audit Report', devices: 120, status: 'completed' as const, date: '2024-11-27', method: 'NIST 800-88', duration: '4h 30m', size: '3.5GB' },
  { id: 'RPT-003', type: 'Compliance Report', devices: 78, status: 'running' as const, date: '2024-11-28', method: 'Gutmann', duration: '-', size: '-' },
  { id: 'RPT-004', type: 'Erasure Report', devices: 200, status: 'completed' as const, date: '2024-11-26', method: 'DoD 5220.22-M', duration: '8h 45m', size: '12GB' },
  { id: 'RPT-005', type: 'Security Audit', devices: 35, status: 'failed' as const, date: '2024-11-25', method: 'Custom', duration: '1h 20m', size: '0.8GB' },
  { id: 'RPT-006', type: 'Monthly Summary', devices: 500, status: 'completed' as const, date: '2024-11-24', method: 'Mixed', duration: '12h', size: '25GB' },
]

// Demo System Logs - Comprehensive entries
// Uses both field names for AdminDashboard compatibility (log_level, log_message, created_at, user_email)
// and AdminLogs compatibility (level, message, timestamp, user)
export const DEMO_SYSTEM_LOGS = [
  { id: 'LOG-001', log_id: 'LOG-001', timestamp: '2024-11-28 14:45:30', created_at: '2024-11-28T14:45:30', level: 'info' as const, log_level: 'info', category: 'Authentication', message: 'User alice@demo.com logged in successfully from Chrome browser', log_message: 'User alice@demo.com logged in successfully from Chrome browser', user: 'alice@demo.com', user_email: 'alice@demo.com', source: 'Auth Service' },
  { id: 'LOG-002', log_id: 'LOG-002', timestamp: '2024-11-28 14:30:15', created_at: '2024-11-28T14:30:15', level: 'success' as const, log_level: 'success', category: 'Erasure', message: 'Erasure completed on device LAPTOP-DELL-001 with DoD 5220.22-M standard', log_message: 'Erasure completed on device LAPTOP-DELL-001 with DoD 5220.22-M standard', user: 'bob@demo.com', user_email: 'bob@demo.com', source: 'Erasure Engine' },
  { id: 'LOG-003', log_id: 'LOG-003', timestamp: '2024-11-28 14:15:00', created_at: '2024-11-28T14:15:00', level: 'warning' as const, log_level: 'warning', category: 'License', message: 'License pool running low - 15% remaining in Enterprise tier', log_message: 'License pool running low - 15% remaining in Enterprise tier', user: 'system', user_email: 'system@D-Secure.com', source: 'License Manager' },
  { id: 'LOG-004', log_id: 'LOG-004', timestamp: '2024-11-28 13:45:22', created_at: '2024-11-28T13:45:22', level: 'error' as const, log_level: 'error', category: 'Network', message: 'Connection timeout to backup server - retrying in 60 seconds', log_message: 'Connection timeout to backup server - retrying in 60 seconds', user: 'system', user_email: 'system@D-Secure.com', source: 'Network Monitor' },
  { id: 'LOG-005', log_id: 'LOG-005', timestamp: '2024-11-28 13:30:00', created_at: '2024-11-28T13:30:00', level: 'info' as const, log_level: 'info', category: 'Report', message: 'Monthly audit report generated successfully - 145 records processed', log_message: 'Monthly audit report generated successfully - 145 records processed', user: 'admin@demo.com', user_email: 'admin@demo.com', source: 'Report Generator' },
  { id: 'LOG-006', log_id: 'LOG-006', timestamp: '2024-11-28 13:00:45', created_at: '2024-11-28T13:00:45', level: 'debug' as const, log_level: 'debug', category: 'System', message: 'Cache cleared for dashboard stats - 24MB freed', log_message: 'Cache cleared for dashboard stats - 24MB freed', user: 'system', user_email: 'system@D-Secure.com', source: 'Cache Manager' },
  { id: 'LOG-007', log_id: 'LOG-007', timestamp: '2024-11-28 12:45:30', created_at: '2024-11-28T12:45:30', level: 'success' as const, log_level: 'success', category: 'User', message: 'New user hannah@demo.com created with User role', log_message: 'New user hannah@demo.com created with User role', user: 'admin@demo.com', user_email: 'admin@demo.com', source: 'User Service' },
  { id: 'LOG-008', log_id: 'LOG-008', timestamp: '2024-11-28 12:30:00', created_at: '2024-11-28T12:30:00', level: 'info' as const, log_level: 'info', category: 'Backup', message: 'Daily backup completed - 2.4 GB uploaded to cloud storage', log_message: 'Daily backup completed - 2.4 GB uploaded to cloud storage', user: 'system', user_email: 'system@D-Secure.com', source: 'Backup Service' },
  { id: 'LOG-009', log_id: 'LOG-009', timestamp: '2024-11-28 12:15:45', created_at: '2024-11-28T12:15:45', level: 'success' as const, log_level: 'success', category: 'Erasure', message: 'Erasure verified on DESKTOP-HP-002 - Certificate generated', log_message: 'Erasure verified on DESKTOP-HP-002 - Certificate generated', user: 'charlie@demo.com', user_email: 'charlie@demo.com', source: 'Erasure Engine' },
  { id: 'LOG-010', log_id: 'LOG-010', timestamp: '2024-11-28 12:00:30', created_at: '2024-11-28T12:00:30', level: 'warning' as const, log_level: 'warning', category: 'Security', message: 'Multiple failed login attempts detected from IP 192.168.1.150', log_message: 'Multiple failed login attempts detected from IP 192.168.1.150', user: 'system', user_email: 'system@D-Secure.com', source: 'Security Monitor' },
  { id: 'LOG-011', log_id: 'LOG-011', timestamp: '2024-11-28 11:45:15', created_at: '2024-11-28T11:45:15', level: 'info' as const, log_level: 'info', category: 'License', message: 'License ENT-078 activated for machine LAPTOP-LENOVO-004', log_message: 'License ENT-078 activated for machine LAPTOP-LENOVO-004', user: 'diana@demo.com', user_email: 'diana@demo.com', source: 'License Manager' },
  { id: 'LOG-012', log_id: 'LOG-012', timestamp: '2024-11-28 11:30:00', created_at: '2024-11-28T11:30:00', level: 'error' as const, log_level: 'error', category: 'Erasure', message: 'Erasure failed on SERVER-003 - Disk read error at sector 45892', log_message: 'Erasure failed on SERVER-003 - Disk read error at sector 45892', user: 'bob@demo.com', user_email: 'bob@demo.com', source: 'Erasure Engine' },
  { id: 'LOG-013', log_id: 'LOG-013', timestamp: '2024-11-28 11:15:22', created_at: '2024-11-28T11:15:22', level: 'info' as const, log_level: 'info', category: 'User', message: 'User role updated: edward@demo.com changed from User to Manager', log_message: 'User role updated: edward@demo.com changed from User to Manager', user: 'alice@demo.com', user_email: 'alice@demo.com', source: 'User Service' },
  { id: 'LOG-014', log_id: 'LOG-014', timestamp: '2024-11-28 11:00:45', created_at: '2024-11-28T11:00:45', level: 'success' as const, log_level: 'success', category: 'Authentication', message: 'Two-factor authentication enabled for fiona@demo.com', log_message: 'Two-factor authentication enabled for fiona@demo.com', user: 'fiona@demo.com', user_email: 'fiona@demo.com', source: 'Auth Service' },
  { id: 'LOG-015', log_id: 'LOG-015', timestamp: '2024-11-28 10:45:30', created_at: '2024-11-28T10:45:30', level: 'debug' as const, log_level: 'debug', category: 'System', message: 'Database connection pool optimized - 8 active connections', log_message: 'Database connection pool optimized - 8 active connections', user: 'system', user_email: 'system@D-Secure.com', source: 'Database Monitor' },
  { id: 'LOG-016', log_id: 'LOG-016', timestamp: '2024-11-28 10:30:15', created_at: '2024-11-28T10:30:15', level: 'info' as const, log_level: 'info', category: 'Report', message: 'Export completed - 45 audit records saved to CSV format', log_message: 'Export completed - 45 audit records saved to CSV format', user: 'george@demo.com', user_email: 'george@demo.com', source: 'Report Generator' },
  { id: 'LOG-017', log_id: 'LOG-017', timestamp: '2024-11-28 10:15:00', created_at: '2024-11-28T10:15:00', level: 'success' as const, log_level: 'success', category: 'Erasure', message: 'Batch erasure started on 5 devices in IT Department group', log_message: 'Batch erasure started on 5 devices in IT Department group', user: 'alice@demo.com', user_email: 'alice@demo.com', source: 'Erasure Engine' },
  { id: 'LOG-018', log_id: 'LOG-018', timestamp: '2024-11-28 10:00:45', created_at: '2024-11-28T10:00:45', level: 'warning' as const, log_level: 'warning', category: 'System', message: 'Disk usage at 78% on primary storage - cleanup recommended', log_message: 'Disk usage at 78% on primary storage - cleanup recommended', user: 'system', user_email: 'system@D-Secure.com', source: 'System Monitor' },
  { id: 'LOG-019', log_id: 'LOG-019', timestamp: '2024-11-28 09:45:30', created_at: '2024-11-28T09:45:30', level: 'info' as const, log_level: 'info', category: 'License', message: 'License allocation updated - Marketing department now has 30 licenses', log_message: 'License allocation updated - Marketing department now has 30 licenses', user: 'admin@demo.com', user_email: 'admin@demo.com', source: 'License Manager' },
  { id: 'LOG-020', log_id: 'LOG-020', timestamp: '2024-11-28 09:30:00', created_at: '2024-11-28T09:30:00', level: 'success' as const, log_level: 'success', category: 'Backup', message: 'Weekly full backup initiated - estimated completion 4 hours', log_message: 'Weekly full backup initiated - estimated completion 4 hours', user: 'system', user_email: 'system@D-Secure.com', source: 'Backup Service' },
]

// Demo License Details
export const DEMO_LICENSE_DETAILS = [
  { product: 'D-Secure Eraser Enterprise', total: 500, consumed: 324, available: 176 },
  { product: 'D-Secure Eraser Pro', total: 1000, consumed: 567, available: 433 },
  { product: 'D-Secure Cloud Suite', total: 250, consumed: 189, available: 61 },
  { product: 'D-Secure Mobile Wipe', total: 400, consumed: 156, available: 244 },
  { product: 'D-Secure Server Edition', total: 300, consumed: 48, available: 252 },
]

// Demo Groups
export const DEMO_GROUPS = [
  { name: 'IT Department', description: 'Information Technology team', licenses: 150, date: '2024-01-15' },
  { name: 'Finance Team', description: 'Finance and accounting', licenses: 75, date: '2024-02-20' },
  { name: 'HR Division', description: 'Human resources', licenses: 50, date: '2024-03-10' },
  { name: 'Sales Force', description: 'Sales and marketing', licenses: 200, date: '2024-04-05' },
  { name: 'Operations', description: 'Operations management', licenses: 100, date: '2024-05-01' },
]

// Demo Machines - Detailed for AdminMachines page
export const DEMO_MACHINES = [
  { 
    hostname: 'LAPTOP-DELL-001', 
    eraseOption: 'DoD 5220.22-M', 
    license: 'ENT-001', 
    status: 'Active',
    machineId: 'MCH-001',
    userEmail: 'alice@demo.com',
    licenseActivated: true,
    osVersion: 'Windows 11 Pro',
    vmStatus: 'Physical',
    totalLicenses: 50,
    fingerprintHash: 'a1b2c3d4e5f6g7h8i9j0'
  },
  { 
    hostname: 'DESKTOP-HP-002', 
    eraseOption: 'NIST 800-88', 
    license: 'PRO-045', 
    status: 'Running',
    machineId: 'MCH-002',
    userEmail: 'bob@demo.com',
    licenseActivated: true,
    osVersion: 'Windows 10 Enterprise',
    vmStatus: 'Physical',
    totalLicenses: 30,
    fingerprintHash: 'b2c3d4e5f6g7h8i9j0k1'
  },
  { 
    hostname: 'SERVER-DELL-003', 
    eraseOption: 'Gutmann 35-Pass', 
    license: 'SRV-012', 
    status: 'Completed',
    machineId: 'MCH-003',
    userEmail: 'charlie@demo.com',
    licenseActivated: true,
    osVersion: 'Windows Server 2022',
    vmStatus: 'Virtual - VMware',
    totalLicenses: 10,
    fingerprintHash: 'c3d4e5f6g7h8i9j0k1l2'
  },
  { 
    hostname: 'LAPTOP-LENOVO-004', 
    eraseOption: 'Custom-3Pass', 
    license: 'ENT-078', 
    status: 'Pending',
    machineId: 'MCH-004',
    userEmail: 'diana@demo.com',
    licenseActivated: false,
    osVersion: 'Windows 11 Home',
    vmStatus: 'Physical',
    totalLicenses: 50,
    fingerprintHash: 'd4e5f6g7h8i9j0k1l2m3'
  },
  { 
    hostname: 'WORKSTATION-HP-005', 
    eraseOption: 'DoD 5220.22-M', 
    license: 'PRO-156', 
    status: 'Failed',
    machineId: 'MCH-005',
    userEmail: 'edward@demo.com',
    licenseActivated: true,
    osVersion: 'Windows 10 Pro',
    vmStatus: 'Physical',
    totalLicenses: 10,
    fingerprintHash: 'e5f6g7h8i9j0k1l2m3n4'
  },
  { 
    hostname: 'LAPTOP-APPLE-006', 
    eraseOption: 'NIST 800-88', 
    license: 'ENT-234', 
    status: 'Active',
    machineId: 'MCH-006',
    userEmail: 'fiona@demo.com',
    licenseActivated: true,
    osVersion: 'macOS Sonoma 14.1',
    vmStatus: 'Physical',
    totalLicenses: 30,
    fingerprintHash: 'f6g7h8i9j0k1l2m3n4o5'
  },
  { 
    hostname: 'SERVER-LINUX-007', 
    eraseOption: 'Secure Erase ATA', 
    license: 'SRV-089', 
    status: 'Completed',
    machineId: 'MCH-007',
    userEmail: 'george@demo.com',
    licenseActivated: true,
    osVersion: 'Ubuntu Server 22.04 LTS',
    vmStatus: 'Virtual - Hyper-V',
    totalLicenses: 10,
    fingerprintHash: 'g7h8i9j0k1l2m3n4o5p6'
  },
  { 
    hostname: 'DESKTOP-DELL-008', 
    eraseOption: 'Random Data', 
    license: 'PRO-301', 
    status: 'Active',
    machineId: 'MCH-008',
    userEmail: 'hannah@demo.com',
    licenseActivated: true,
    osVersion: 'Windows 11 Pro',
    vmStatus: 'Physical',
    totalLicenses: 10,
    fingerprintHash: 'h8i9j0k1l2m3n4o5p6q7'
  },
]

// Demo Performance Data
export const DEMO_PERFORMANCE_DATA = {
  monthlyErasures: [
    { month: 'Jan', count: 120 },
    { month: 'Feb', count: 145 },
    { month: 'Mar', count: 178 },
    { month: 'Apr', count: 156 },
    { month: 'May', count: 189 },
    { month: 'Jun', count: 210 },
    { month: 'Jul', count: 234 },
    { month: 'Aug', count: 198 },
    { month: 'Sep', count: 267 },
    { month: 'Oct', count: 289 },
    { month: 'Nov', count: 312 },
    { month: 'Dec', count: 0 },
  ],
  avgDuration: [
    { month: 'Jan', duration: 145 },
    { month: 'Feb', duration: 132 },
    { month: 'Mar', duration: 128 },
    { month: 'Apr', duration: 135 },
    { month: 'May', duration: 122 },
    { month: 'Jun', duration: 118 },
    { month: 'Jul', duration: 115 },
    { month: 'Aug', duration: 120 },
    { month: 'Sep', duration: 112 },
    { month: 'Oct', duration: 108 },
    { month: 'Nov', duration: 105 },
    { month: 'Dec', duration: 0 },
  ],
  throughput: [
    { month: 'Jan', count: 120 },
    { month: 'Feb', count: 145 },
    { month: 'Mar', count: 178 },
    { month: 'Apr', count: 156 },
    { month: 'May', count: 189 },
    { month: 'Jun', count: 210 },
    { month: 'Jul', count: 234 },
    { month: 'Aug', count: 198 },
    { month: 'Sep', count: 267 },
    { month: 'Oct', count: 289 },
    { month: 'Nov', count: 312 },
    { month: 'Dec', count: 0 },
  ],
  successRate: '99.2%',
  successCount: 156,
  failureCount: 2,
  methodMetrics: [
    { methodName: 'DoD 5220.22-M', count: 85, successRate: 98.5, avgDuration: '2h 15m' },
    { methodName: 'NIST 800-88', count: 42, successRate: 100, avgDuration: '1h 45m' },
    { methodName: 'Gutmann', count: 18, successRate: 94.4, avgDuration: '4h 30m' },
    { methodName: 'Secure Erase', count: 13, successRate: 100, avgDuration: '0h 45m' }
  ]
}

// Demo Audit Reports - Detailed for AdminReports page
// Includes multiple date field names for compatibility with different components
export const DEMO_AUDIT_REPORTS = [
  {
    report_id: 'AUD-001',
    report_date: '2024-11-28T10:30:00',
    report_datetime: '2024-11-28T10:30:00',
    reportDate: '2024-11-28T10:30:00',
    serial_number: 'SN-12345-ABC',
    make: 'Dell',
    model: 'Latitude 5520',
    hostname: 'LAPTOP-DELL-001',
    os_version: 'Windows 11 Pro',
    asset_id: 'ASSET-001',
    erasure_status: 'Completed',
    status: 'completed',
    erasure_method: 'DoD 5220.22-M',
    verification_status: 'Verified',
    drive_type: 'SSD',
    drive_capacity: '512 GB',
    time_taken: '2h 15m',
    user_email: 'alice@demo.com',
  },
  {
    report_id: 'AUD-002',
    report_date: '2024-11-27T14:45:00',
    report_datetime: '2024-11-27T14:45:00',
    reportDate: '2024-11-27T14:45:00',
    serial_number: 'SN-67890-DEF',
    make: 'HP',
    model: 'EliteBook 840 G8',
    hostname: 'DESKTOP-HP-002',
    os_version: 'Windows 10 Enterprise',
    asset_id: 'ASSET-002',
    erasure_status: 'Completed',
    status: 'completed',
    erasure_method: 'NIST 800-88',
    verification_status: 'Verified',
    drive_type: 'NVMe SSD',
    drive_capacity: '1 TB',
    time_taken: '3h 30m',
    user_email: 'bob@demo.com',
  },
  {
    report_id: 'AUD-003',
    report_date: '2024-11-26T09:15:00',
    report_datetime: '2024-11-26T09:15:00',
    reportDate: '2024-11-26T09:15:00',
    serial_number: 'SN-11111-GHI',
    make: 'Lenovo',
    model: 'ThinkPad X1 Carbon Gen 10',
    hostname: 'LAPTOP-LENOVO-004',
    os_version: 'Windows 11 Pro',
    asset_id: 'ASSET-003',
    erasure_status: 'In Progress',
    status: 'running',
    erasure_method: 'Gutmann 35-Pass',
    verification_status: 'Pending',
    drive_type: 'SSD',
    drive_capacity: '256 GB',
    time_taken: '-',
    user_email: 'diana@demo.com',
  },
  {
    report_id: 'AUD-004',
    report_date: '2024-11-25T16:20:00',
    report_datetime: '2024-11-25T16:20:00',
    reportDate: '2024-11-25T16:20:00',
    serial_number: 'SN-22222-JKL',
    make: 'Dell',
    model: 'PowerEdge R740',
    hostname: 'SERVER-DELL-003',
    os_version: 'Windows Server 2022',
    asset_id: 'ASSET-004',
    erasure_status: 'Completed',
    status: 'completed',
    erasure_method: 'DoD 5220.22-M',
    verification_status: 'Verified',
    drive_type: 'SAS HDD',
    drive_capacity: '2 TB x 8 (RAID)',
    time_taken: '12h 45m',
    user_email: 'charlie@demo.com',
  },
  {
    report_id: 'AUD-005',
    report_date: '2024-11-24T11:00:00',
    report_datetime: '2024-11-24T11:00:00',
    reportDate: '2024-11-24T11:00:00',
    serial_number: 'SN-33333-MNO',
    make: 'Apple',
    model: 'MacBook Pro 14"',
    hostname: 'LAPTOP-APPLE-006',
    os_version: 'macOS Sonoma 14.1',
    asset_id: 'ASSET-005',
    erasure_status: 'Completed',
    status: 'completed',
    erasure_method: 'NIST 800-88',
    verification_status: 'Verified',
    drive_type: 'Apple SSD',
    drive_capacity: '512 GB',
    time_taken: '1h 45m',
    user_email: 'fiona@demo.com',
  },
  {
    report_id: 'AUD-006',
    report_date: '2024-11-23T08:30:00',
    report_datetime: '2024-11-23T08:30:00',
    reportDate: '2024-11-23T08:30:00',
    serial_number: 'SN-44444-PQR',
    make: 'HP',
    model: 'ProLiant DL380 Gen10',
    hostname: 'SERVER-LINUX-007',
    os_version: 'Ubuntu Server 22.04 LTS',
    asset_id: 'ASSET-006',
    erasure_status: 'Completed',
    status: 'completed',
    erasure_method: 'Secure Erase ATA',
    verification_status: 'Verified',
    drive_type: 'NVMe SSD',
    drive_capacity: '1.92 TB x 4',
    time_taken: '6h 20m',
    user_email: 'george@demo.com',
  },
  {
    report_id: 'AUD-007',
    report_date: '2024-11-22T14:15:00',
    report_datetime: '2024-11-22T14:15:00',
    reportDate: '2024-11-22T14:15:00',
    serial_number: 'SN-55555-STU',
    make: 'Dell',
    model: 'OptiPlex 7090',
    hostname: 'DESKTOP-DELL-008',
    os_version: 'Windows 11 Pro',
    asset_id: 'ASSET-007',
    erasure_status: 'Failed',
    status: 'failed',
    erasure_method: 'Random Data',
    verification_status: 'Failed',
    drive_type: 'SATA SSD',
    drive_capacity: '256 GB',
    time_taken: '0h 45m',
    user_email: 'hannah@demo.com',
  },
  {
    report_id: 'AUD-008',
    report_date: '2024-11-21T09:45:00',
    report_datetime: '2024-11-21T09:45:00',
    reportDate: '2024-11-21T09:45:00',
    serial_number: 'SN-66666-VWX',
    make: 'Lenovo',
    model: 'ThinkCentre M920',
    hostname: 'WORKSTATION-HP-005',
    os_version: 'Windows 10 Pro',
    asset_id: 'ASSET-008',
    erasure_status: 'Completed',
    status: 'completed',
    erasure_method: 'DoD 5220.22-M',
    verification_status: 'Verified',
    drive_type: 'HDD',
    drive_capacity: '1 TB',
    time_taken: '4h 30m',
    user_email: 'edward@demo.com',
  },
]

// Demo Subusers - Detailed for Users tab and AdminLogs
export const DEMO_SUBUSERS = [
  { 
    subuser_id: 1, 
    id: '1', 
    subuser_name: 'Alice Johnson', 
    subuser_email: 'alice@demo.com', 
    subuser_phone: '+1-555-0101', 
    user_role: 'admin', 
    role: 'admin',
    defaultRole: 'admin',
    license_allocation: '50', 
    status: 'active',
    department: 'IT Department',
    subuser_group: 'IT Team',
    user_group: 'IT Team',
    created_at: '2024-01-15T09:00:00',
    last_login: '2024-11-28T10:30:00',
    licenseUsage: 35
  },
  { 
    subuser_id: 2, 
    id: '2', 
    subuser_name: 'Bob Smith', 
    subuser_email: 'bob@demo.com', 
    subuser_phone: '+1-555-0102', 
    user_role: 'manager', 
    role: 'manager',
    defaultRole: 'manager',
    license_allocation: '30', 
    status: 'active',
    department: 'Operations',
    subuser_group: 'Operations Team',
    user_group: 'Operations Team',
    created_at: '2024-02-20T10:30:00',
    last_login: '2024-11-28T09:15:00',
    licenseUsage: 22
  },
  { 
    subuser_id: 3, 
    id: '3', 
    subuser_name: 'Charlie Brown', 
    subuser_email: 'charlie@demo.com', 
    subuser_phone: '+1-555-0103', 
    user_role: 'user', 
    role: 'user',
    defaultRole: 'user',
    license_allocation: '10', 
    status: 'active',
    department: 'Finance',
    subuser_group: 'Finance Team',
    user_group: 'Finance Team',
    created_at: '2024-03-10T14:00:00',
    last_login: '2024-11-27T16:45:00',
    licenseUsage: 8
  },
  { 
    subuser_id: 4, 
    id: '4', 
    subuser_name: 'Diana Prince', 
    subuser_email: 'diana@demo.com', 
    subuser_phone: '+1-555-0104', 
    user_role: 'admin', 
    role: 'admin',
    defaultRole: 'admin',
    license_allocation: '50', 
    status: 'inactive',
    department: 'HR',
    subuser_group: 'HR Team',
    user_group: 'HR Team',
    created_at: '2024-04-05T11:00:00',
    last_login: '2024-11-26T14:20:00',
    licenseUsage: 0
  },
  { 
    subuser_id: 5, 
    id: '5', 
    subuser_name: 'Edward Norton', 
    subuser_email: 'edward@demo.com', 
    subuser_phone: '+1-555-0105', 
    user_role: 'user', 
    role: 'user',
    defaultRole: 'user',
    license_allocation: '10', 
    status: 'active',
    department: 'Sales',
    subuser_group: 'Sales Team',
    user_group: 'Sales Team',
    created_at: '2024-05-01T08:30:00',
    last_login: '2024-11-28T08:00:00',
    licenseUsage: 7
  },
  { 
    subuser_id: 6, 
    id: '6', 
    subuser_name: 'Fiona Apple', 
    subuser_email: 'fiona@demo.com', 
    subuser_phone: '+1-555-0106', 
    user_role: 'manager', 
    role: 'manager',
    defaultRole: 'manager',
    license_allocation: '30', 
    status: 'active',
    department: 'Marketing',
    subuser_group: 'Marketing Team',
    user_group: 'Marketing Team',
    created_at: '2024-06-15T09:45:00',
    last_login: '2024-11-28T11:00:00',
    licenseUsage: 18
  },
  { 
    subuser_id: 7, 
    id: '7', 
    subuser_name: 'George Lucas', 
    subuser_email: 'george@demo.com', 
    subuser_phone: '+1-555-0107', 
    user_role: 'user', 
    role: 'user',
    defaultRole: 'user',
    license_allocation: '10', 
    status: 'inactive',
    department: 'IT Department',
    subuser_group: 'IT Team',
    user_group: 'IT Team',
    created_at: '2024-07-20T10:00:00',
    last_login: '2024-11-25T12:30:00',
    licenseUsage: 0
  },
  { 
    subuser_id: 8, 
    id: '8', 
    subuser_name: 'Hannah Montana', 
    subuser_email: 'hannah@demo.com', 
    subuser_phone: '+1-555-0108', 
    user_role: 'user', 
    role: 'user',
    defaultRole: 'user',
    license_allocation: '10', 
    status: 'active',
    department: 'Support',
    subuser_group: 'Support Team',
    user_group: 'Support Team',
    created_at: '2024-08-10T13:30:00',
    last_login: '2024-11-28T07:45:00',
    licenseUsage: 6
  },
]

// Demo Commands for AdminLogs
// Fields match what AdminLogs.tsx expects: command_id, command_text, command_status, issued_at, command_json
export const DEMO_COMMANDS = [
  { 
    command_id: 1, 
    command_text: 'D-Secure-erase --method DoD5220 --drive /dev/sda --verify true', 
    command_status: 'Completed', 
    issued_at: '2024-11-28T12:30:00',
    command_json: JSON.stringify({ method: 'DoD 5220.22-M', drive: '/dev/sda', verify: true, passes: 3 }),
    user_email: 'alice@demo.com'
  },
  { 
    command_id: 2, 
    command_text: 'D-Secure-verify --report-id AUD-001 --generate-certificate true', 
    command_status: 'Completed', 
    issued_at: '2024-11-28T12:45:00',
    command_json: JSON.stringify({ reportId: 'AUD-001', certificate: true, format: 'PDF' }),
    user_email: 'alice@demo.com'
  },
  { 
    command_id: 3, 
    command_text: 'D-Secure-batch --target IT-Department --method NIST800-88 --schedule immediate', 
    command_status: 'Running', 
    issued_at: '2024-11-28T13:00:00',
    command_json: JSON.stringify({ target: 'IT-Department', method: 'NIST 800-88', devices: 15, progress: '45%' }),
    user_email: 'bob@demo.com'
  },
  { 
    command_id: 4, 
    command_text: 'D-Secure-erase --method Gutmann35 --drive /dev/nvme0n1 --priority high', 
    command_status: 'Pending', 
    issued_at: '2024-11-28T13:15:00',
    command_json: JSON.stringify({ method: 'Gutmann 35-Pass', drive: '/dev/nvme0n1', priority: 'high', estimatedTime: '4h' }),
    user_email: 'charlie@demo.com'
  },
  { 
    command_id: 5, 
    command_text: 'D-Secure-report --type audit --date-range 30d --export csv', 
    command_status: 'Completed', 
    issued_at: '2024-11-28T11:00:00',
    command_json: JSON.stringify({ type: 'audit', range: '30 days', format: 'CSV', records: 156 }),
    user_email: 'diana@demo.com'
  },
  { 
    command_id: 6, 
    command_text: 'D-Secure-license --action activate --key ENT-2024-XYZ --machines 50', 
    command_status: 'Completed', 
    issued_at: '2024-11-28T10:30:00',
    command_json: JSON.stringify({ action: 'activate', licenseKey: 'ENT-2024-XYZ', machines: 50, type: 'Enterprise' }),
    user_email: 'admin@demo.com'
  },
]

// Demo Sessions for AdminLogs
export const DEMO_SESSIONS = [
  { session_id: 'SES-001', user_email: 'alice@demo.com', login_time: '2024-11-28 08:00:00', logout_time: null, ip_address: '192.168.1.101', status: 'Active' },
  { session_id: 'SES-002', user_email: 'bob@demo.com', login_time: '2024-11-28 09:15:00', logout_time: null, ip_address: '192.168.1.102', status: 'Active' },
  { session_id: 'SES-003', user_email: 'charlie@demo.com', login_time: '2024-11-27 14:00:00', logout_time: '2024-11-27 18:30:00', ip_address: '192.168.1.103', status: 'Ended' },
  { session_id: 'SES-004', user_email: 'diana@demo.com', login_time: '2024-11-26 10:00:00', logout_time: '2024-11-26 17:00:00', ip_address: '192.168.1.104', status: 'Ended' },
]
