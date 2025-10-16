import { useAuth } from '@/auth/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { Helmet } from 'react-helmet-async'
import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  AdminDashboardAPI, 
  type DashboardStats, 
  type UserActivity, 
  type GroupData, 
  type LicenseData, 
  type RecentReport,
  type ProfileData
} from '@/services/adminDashboardAPI'
import RoleBased from '@/components/RoleBased'
import { 
  getRolePermissions, 
  hasPermission, 
  canManageUser, 
  filterUsersByRole,
  getRoleDisplayInfo,
  getAssignableRoles,
  isFeatureVisible
} from '@/utils/rolePermissions'


export default function AdminDashboard() {
  const { user } = useAuth()
  const { showSuccess, showError, showInfo } = useNotification()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  
  // Modal states
  const [showBulkLicenseModal, setShowBulkLicenseModal] = useState(false)
  const [showLicenseAuditModal, setShowLicenseAuditModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [showSystemSettingsModal, setShowSystemSettingsModal] = useState(false)
  const [showAssignLicensesModal, setShowAssignLicensesModal] = useState(false)
  const [selectedGroupForLicenses, setSelectedGroupForLicenses] = useState<GroupData | null>(null)
  const [bulkUserCount, setBulkUserCount] = useState('10')
  const [bulkLicenseCount, setBulkLicenseCount] = useState('5')
  const [isLoading, setIsLoading] = useState(false)
  
  // Form states for modals
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'user',
    department: '',
    status: 'active'
  })
  const [newGroupForm, setNewGroupForm] = useState({
    name: '',
    description: '',
    licenses: 0
  })
  const [assignLicensesForm, setAssignLicensesForm] = useState({
    licenseCount: 10,
    expiryDate: '',
    licenseType: 'basic'
  })
  
  // API Data States
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null)
  const [userActivity, setUserActivity] = useState<UserActivity[]>([])
  const [groups, setGroups] = useState<GroupData[]>([])
  const [licenseData, setLicenseData] = useState<LicenseData[]>([])
  const [recentReports, setRecentReports] = useState<RecentReport[]>([])
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [dataLoading, setDataLoading] = useState(true)

  // Role-based permissions
  const currentUserRole = user?.role || 'user'
  const permissions = getRolePermissions(currentUserRole)
  const roleInfo = getRoleDisplayInfo(currentUserRole)

  // Note: All users can access admin dashboard, but with limited permissions
  // UI elements will be hidden based on role permissions

  // Load all dashboard data on component mount
  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setDataLoading(true)
    try {
      const [statsRes, activityRes, groupsRes, licenseRes, reportsRes, profileRes] = await Promise.all([
        AdminDashboardAPI.getDashboardStats(),
        AdminDashboardAPI.getUserActivity(),
        AdminDashboardAPI.getGroups(),
        AdminDashboardAPI.getLicenseData(),
        AdminDashboardAPI.getRecentReports(),
        AdminDashboardAPI.getAdminProfile()
      ])

      if (statsRes.success) setDashboardStats(statsRes.data)
      if (activityRes.success) setUserActivity(activityRes.data)
      if (groupsRes.success) setGroups(groupsRes.data)
      if (licenseRes.success) setLicenseData(licenseRes.data)
      if (reportsRes.success) setRecentReports(reportsRes.data)
      if (profileRes.success) setProfileData(profileRes.data)

    } catch (error) {
      console.error('Error loading dashboard data:', error)
      showError('Data Loading Error', 'Failed to load dashboard data. Using default values.')
    } finally {
      setDataLoading(false)
    }
  }

  // Generate stats array from API data or use defaults
  const stats = useMemo(() => {
    if (!dashboardStats) return []
    
    return [
      { 
        label: 'Total Licenses', 
        value: dashboardStats.totalLicenses, 
        change: dashboardStats.changes.totalLicenses.value, 
        trend: dashboardStats.changes.totalLicenses.trend, 
        color: 'bg-blue-500' 
      },
      { 
        label: 'Active Users', 
        value: dashboardStats.activeUsers, 
        change: dashboardStats.changes.activeUsers.value, 
        trend: dashboardStats.changes.activeUsers.trend, 
        color: 'bg-emerald-500' 
      },
      { 
        label: 'Available Licenses', 
        value: dashboardStats.availableLicenses, 
        change: dashboardStats.changes.availableLicenses.value, 
        trend: dashboardStats.changes.availableLicenses.trend, 
        color: 'bg-orange-500' 
      },
      { 
        label: 'Success Rate', 
        value: dashboardStats.successRate, 
        change: dashboardStats.changes.successRate.value, 
        trend: dashboardStats.changes.successRate.trend, 
        color: 'bg-purple-500' 
      }
    ]
  }, [dashboardStats])

  // License Management Handlers
  const handleBulkLicenseAssignment = () => {
    setShowBulkLicenseModal(true)
  }

  const handleBulkLicenseSubmit = async () => {
    if (!bulkUserCount || !bulkLicenseCount || isNaN(Number(bulkUserCount)) || isNaN(Number(bulkLicenseCount))) {
      showError('Invalid Input', 'Please enter valid numbers for both fields')
      return
    }
    
    setIsLoading(true)
    try {
      const response = await AdminDashboardAPI.assignBulkLicenses(Number(bulkUserCount), Number(bulkLicenseCount))
      
      if (response.success) {
        const totalLicenses = Number(bulkUserCount) * Number(bulkLicenseCount)
        showSuccess(
          'Licenses Assigned Successfully',
          `Assigned ${bulkLicenseCount} licenses to ${bulkUserCount} users. Total licenses assigned: ${totalLicenses}`
        )
        
        // Refresh dashboard data after successful assignment
        loadDashboardData()
        
        setShowBulkLicenseModal(false)
        setBulkUserCount('10')
        setBulkLicenseCount('5')
      } else {
        throw new Error(response.error || 'Assignment failed')
      }
    } catch (error) {
      console.error('Bulk license assignment error:', error)
      showError('Assignment Failed', 'Failed to assign licenses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLicenseAudit = async () => {
    setShowLicenseAuditModal(true)
    
    // Load fresh license audit data when modal opens
    try {
      const response = await AdminDashboardAPI.getLicenseAudit()
      if (response.success) {
        setLicenseData(response.data)
      }
    } catch (error) {
      console.error('License audit data loading error:', error)
    }
  }

  // New handler functions for buttons and actions
  const handleAddUser = () => {
    setShowAddUserModal(true)
  }

  const handleAddUserSubmit = async () => {
    if (!newUserForm.name || !newUserForm.email || !newUserForm.department) {
      showError('Invalid Input', 'Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await AdminDashboardAPI.createUser(newUserForm)
      
      if (response.success) {
        showSuccess('User Created', `User ${newUserForm.name} created successfully`)
        setShowAddUserModal(false)
        setNewUserForm({ name: '', email: '', role: 'user', department: '', status: 'active' })
        loadDashboardData() // Refresh dashboard data
      } else {
        throw new Error(response.error || 'User creation failed')
      }
    } catch (error) {
      console.error('User creation error:', error)
      showError('Creation Failed', 'Failed to create user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddGroup = () => {
    setShowAddGroupModal(true)
  }

  const handleAddGroupSubmit = async () => {
    if (!newGroupForm.name || !newGroupForm.description) {
      showError('Invalid Input', 'Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await AdminDashboardAPI.createGroup(newGroupForm)
      
      if (response.success) {
        showSuccess('Group Created', `Group ${newGroupForm.name} created successfully`)
        setShowAddGroupModal(false)
        setNewGroupForm({ name: '', description: '', licenses: 0 })
        loadDashboardData() // Refresh dashboard data
      } else {
        throw new Error(response.error || 'Group creation failed')
      }
    } catch (error) {
      console.error('Group creation error:', error)
      showError('Creation Failed', 'Failed to create group. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleManageUsers = () => {
    navigate('/admin/subusers')
  }

  const handleManageGroups = () => {
    setActiveTab('users')
    showInfo('Switched to Users & Groups tab')
  }

  const handleAdminReports = () => {
    navigate('/admin/reports')
  }

  const handleSystemSettings = () => {
    setShowSystemSettingsModal(true)
  }

  const handleAssignLicenses = (group: GroupData) => {
    setSelectedGroupForLicenses(group)
    setShowAssignLicensesModal(true)
  }

  const handleAssignLicensesSubmit = async () => {
    if (!selectedGroupForLicenses || !assignLicensesForm.licenseCount || !assignLicensesForm.expiryDate) {
      showError('Invalid Input', 'Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await AdminDashboardAPI.assignLicensesToGroup(
        selectedGroupForLicenses.name, // Using name as ID for demo
        assignLicensesForm
      )
      
      if (response.success) {
        showSuccess(
          'Licenses Assigned', 
          `${assignLicensesForm.licenseCount} licenses assigned to ${selectedGroupForLicenses.name}`
        )
        setShowAssignLicensesModal(false)
        setSelectedGroupForLicenses(null)
        setAssignLicensesForm({ licenseCount: 10, expiryDate: '', licenseType: 'basic' })
        loadDashboardData() // Refresh dashboard data
      } else {
        throw new Error(response.error || 'License assignment failed')
      }
    } catch (error) {
      console.error('License assignment error:', error)
      showError('Assignment Failed', 'Failed to assign licenses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // All data is now loaded from API and stored in state
  // No more hardcoded data arrays needed

  return (
    <>
    <Helmet>
+      <link rel="canonical" href="https://dsecuretech.com/admin" />
          <title>DSecureTech Compliance | Data Erasure Standards & Regulations</title>
          <meta
            name="description"
            content="D-SecureTech helps businesses meet global data sanitization standards like NIST, ISO 27001, GDPR, HIPAA, PCI DSS, and SOX with verifiable compliance solutions."
          />
          <meta
            name="keywords"
            content="data erasure compliance, NIST 800-88, ISO 27001, GDPR, HIPAA, SOX, PCI DSS, enterprise data destruction, B2B data security"
          />
          <meta name="robots" content="index, follow" />
        </Helmet>
    <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Admin Dashboard
            </h1>
            {/* Role Badge */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${roleInfo.bgColor} ${roleInfo.color}`}>
              {roleInfo.label}
            </span>
          </div>
          <p className="mt-2 text-slate-600 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></span>
            <span className="truncate">Welcome back, {user?.email}</span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-sm text-slate-500">{roleInfo.description}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Profile Button - Always visible */}
          <button 
            onClick={() => setShowProfileModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 rounded-lg transition-all duration-200 shadow-lg shadow-brand/25"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>My Profile</span>
          </button>
          
          {/* Add User Button - Role-based visibility */}
          <RoleBased permission="canCreateUser">
            <button 
              onClick={handleAddUser}
              className="btn-secondary flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add User</span>
            </button>
          </RoleBased>
        </div>
      </div>

      {/* Navigation Tabs - Role-Based Visibility */}
      <div className="mb-8">
        <div className="border-b border-slate-200 overflow-hidden">
          <nav className="-mb-px flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 sm:space-x-8 px-1 min-w-max">
              {[
                { 
                  id: 'overview', 
                  name: 'Overview', 
                  permission: 'canViewDashboard', // All roles can see
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                },
                { 
                  id: 'licenses', 
                  name: 'Licenses', 
                  permission: 'canViewLicenses', // All roles except basic user can see
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                },
                { 
                  id: 'users', 
                  name: 'Users & Groups', 
                  permission: 'canViewAllUsers', // Only admin/superadmin/manager
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                },
                { 
                  id: 'activity', 
                  name: 'User Activity', 
                  permission: 'canViewAllUsers', // Only admin/superadmin/manager
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                },
                { 
                  id: 'reports', 
                  name: 'Reports', 
                  permission: 'canViewReports', // All roles can see
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                }
              ]
              .filter(tab => hasPermission(currentUserRole, tab.permission as any)) // Only show tabs user has permission for
              .map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.iconSvg}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Stats Grid - Role-Based Display */}
      {/* Full Stats for SuperAdmin/Admin */}
      <RoleBased permission="canViewAllStats">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="card !p-4 lg:!p-6 flex items-start justify-between min-w-0 hover:shadow-lg transition-all duration-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${stat.color} flex-shrink-0`}></div>
                  <p className="text-sm font-medium text-slate-600 truncate">{stat.label}</p>
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-slate-900 truncate">{stat.value}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ml-2 flex-shrink-0 ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.change}</span>
                <svg className={`w-4 h-4 ${stat.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </RoleBased>

      {/* Limited Stats for Manager */}
      <RoleBased roles={['manager']}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">My Team</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{dashboardStats?.totalUsers || 0}</p>
            <p className="text-sm text-slate-500 mt-2">Users you manage</p>
          </div>
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">Licenses Assigned</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{dashboardStats?.totalLicenses || 0}</p>
            <p className="text-sm text-slate-500 mt-2">Active licenses</p>
          </div>
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-purple-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">Reports Generated</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{recentReports.length}</p>
            <p className="text-sm text-slate-500 mt-2">This month</p>
          </div>
        </div>
      </RoleBased>

      {/* Minimal Stats for User */}
      <RoleBased roles={['user']}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">My Licenses</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{profileData?.licenses || 0}</p>
            <p className="text-sm text-slate-500 mt-2">Active licenses</p>
          </div>
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-purple-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">Available Reports</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{recentReports.length}</p>
            <p className="text-sm text-slate-500 mt-2">Ready to download</p>
          </div>
        </div>
      </RoleBased>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Reports */}
          <div className="card !p-0 min-w-0">
            <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Recent Reports</h2>
              <Link to="/admin/reports" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="card-content divide-y divide-slate-200">
              {recentReports.slice(0, 4).map(report => (
                <div key={report.id} className="px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors min-w-0">
                  <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      report.status === 'completed' ? 'bg-green-400' : 
                      report.status === 'running' ? 'bg-blue-400' : 'bg-red-400'
                    }`}></div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-slate-900 truncate">Report #{report.id}</div>
                      <div className="text-sm text-slate-500 truncate">{report.type} • {report.devices} devices</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 flex-shrink-0 ml-2">{report.date.split(',')[0]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card !p-0 min-w-0">
            <div className="px-4 sm:px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">Quick Actions</h2>
            </div>
            <div className="card-content space-y-3 p-4 sm:p-6">
              {/* Manage Users - Role-Based Access */}
              <RoleBased permission="canViewAllUsers">
                <button 
                  onClick={handleManageUsers}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900">Manage Users</div>
                    <div className="text-sm text-slate-500">Add, edit or remove user accounts</div>
                  </div>
                </button>
              </RoleBased>
              
              {/* Manage Groups - Role-Based Access */}
              <RoleBased permission="canViewGroups">
                <button 
                  onClick={handleManageGroups}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900">Manage Groups</div>
                    <div className="text-sm text-slate-500">Create and manage user groups</div>
                  </div>
                </button>
              </RoleBased>
              
              {/* Admin Reports - Role-Based Access */}
              <RoleBased permission="canGenerateReports">
                <button 
                  onClick={handleAdminReports}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900">Admin Reports</div>
                    <div className="text-sm text-slate-500">Generate and manage admin reports</div>
                  </div>
                </button>
              </RoleBased>
              
              {/* System Settings - Role-Based Access (SuperAdmin only) */}
              <RoleBased permission="canViewSettings">
                <button 
                  onClick={handleSystemSettings}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900">System Settings</div>
                    <div className="text-sm text-slate-500">Configure system preferences</div>
                  </div>
                </button>
              </RoleBased>
              
              {/* License Management Quick Actions - Role-Based */}
              <RoleBased permission="canViewLicenses">
                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">License Management</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {/* Bulk License Assignment - Only for SuperAdmin/Admin */}
                    <RoleBased permission="canBulkAssignLicenses">
                      <button 
                        onClick={() => handleBulkLicenseAssignment()}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all text-left shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Bulk License Assignment</div>
                          <div className="text-sm text-slate-600 mt-1">Assign licenses to multiple users at once with advanced options</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Quick Setup</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">Batch Processing</span>
                          </div>
                        </div>
                        <div className="text-emerald-500 group-hover:translate-x-1 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </RoleBased>
                    
                    {/* License Audit - Available to all with license view permission */}
                    <button 
                      onClick={() => handleLicenseAudit()}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all text-left shadow-sm hover:shadow-md"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">License Audit Report</div>
                        <div className="text-sm text-slate-600 mt-1">Comprehensive analysis of license usage and optimization insights</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">Detailed Analytics</span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-500">Export Available</span>
                        </div>
                      </div>
                      <div className="text-emerald-500 group-hover:translate-x-1 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </RoleBased>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'licenses' && (
        <div className="space-y-6">
          {/* License Overview */}
          <div className="card">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">License Details</h2>
              <p className="text-sm text-slate-600 mt-1">Manage and monitor your software licenses</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                        <th className="pb-3 font-medium whitespace-nowrap">Product</th>
                        <th className="pb-3 font-medium whitespace-nowrap">Total Available</th>
                        <th className="pb-3 font-medium whitespace-nowrap">Total Consumed</th>
                        <th className="pb-3 font-medium whitespace-nowrap">Usage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {licenseData.map((license, index) => {
                        const usagePercent = (license.consumed / license.total) * 100
                        return (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="py-4 font-medium text-slate-900 whitespace-nowrap">{license.product}</td>
                            <td className="py-4 text-slate-600">{license.total}</td>
                            <td className="py-4 text-slate-600">{license.consumed}</td>
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-slate-200 rounded-full h-2 min-w-[80px]">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      usagePercent > 80 ? 'bg-red-500' : 
                                      usagePercent > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${usagePercent}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-slate-600 min-w-[50px] text-right">
                                  {usagePercent.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Groups Management */}
          <div className="card">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">Groups & Users</h2>
                <p className="text-sm text-slate-600 mt-1">Manage user groups and their permissions</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={handleAddGroup}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  + Add Group
                </button>
                <button 
                  onClick={handleAddUser}
                  className="btn-primary text-sm px-4 py-2"
                >
                  + New User
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                      <th className="pb-3 font-medium">Group Name</th>
                      <th className="pb-3 font-medium">Description</th>
                      <th className="pb-3 font-medium">Licenses</th>
                      <th className="pb-3 font-medium">Date Created</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {groups.map((group, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="py-4 font-medium text-slate-900">{group.name}</td>
                        <td className="py-4 text-slate-600">{group.description}</td>
                        <td className="py-4 text-slate-600">{group.licenses}</td>
                        <td className="py-4 text-slate-600">{group.date}</td>
                        <td className="py-4">
                          <div className="flex flex-wrap gap-2">
                            <button 
                              onClick={() => navigate('/admin/groups')}
                              className="text-blue-600 hover:text-blue-700 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleAssignLicenses(group)}
                              className="text-slate-600 hover:text-slate-700 text-sm font-medium px-2 py-1 rounded hover:bg-slate-50 transition-colors"
                            >
                              Assign Licenses
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="card">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Cloud Users Activity</h2>
            <p className="text-sm text-slate-600 mt-1">Monitor user login and logout activity</p>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                    <th className="pb-3 font-medium">User Email</th>
                    <th className="pb-3 font-medium">Login Time</th>
                    <th className="pb-3 font-medium">Logout Time</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {userActivity.map((activity, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="py-4 font-medium text-slate-900">{activity.email}</td>
                      <td className="py-4 text-slate-600">{activity.loginTime}</td>
                      <td className="py-4 text-slate-600">{activity.logoutTime || '-'}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1 ${
                          activity.status === 'active' ? 'text-green-600' : 'text-slate-500'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            activity.status === 'active' ? 'bg-green-400' : 'bg-slate-400'
                          }`}></span>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="card">
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Erasure Reports</h2>
              <p className="text-sm text-slate-600 mt-1">View and manage data erasure reports</p>
            </div>
            <Link to="/admin/reports" className="btn-primary text-sm">
              View All Reports
            </Link>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                    <th className="pb-3 font-medium">Report ID</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Devices</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {recentReports.map((report, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="py-4 font-medium text-slate-900">#{report.id}</td>
                      <td className="py-4 text-slate-600">{report.type}</td>
                      <td className="py-4 text-slate-600">{report.devices}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'completed' ? 'bg-green-100 text-green-800' :
                          report.status === 'running' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 text-slate-600">{report.date}</td>
                      <td className="py-4 text-slate-600">{report.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Bulk License Assignment Modal */}
      {showBulkLicenseModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowBulkLicenseModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Bulk License Assignment</h3>
                  <p className="text-sm text-slate-600">Assign licenses to multiple users at once</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Number of Users
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={bulkUserCount}
                    onChange={(e) => setBulkUserCount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter number of users"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Licenses per User
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={bulkLicenseCount}
                    onChange={(e) => setBulkLicenseCount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter licenses per user"
                    disabled={isLoading}
                  />
                </div>

                {bulkUserCount && bulkLicenseCount && !isNaN(Number(bulkUserCount)) && !isNaN(Number(bulkLicenseCount)) && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Total Users:</span>
                        <span className="font-medium">{Number(bulkUserCount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Licenses per User:</span>
                        <span className="font-medium">{Number(bulkLicenseCount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-blue-600 font-medium mt-1 pt-1 border-t">
                        <span>Total Licenses:</span>
                        <span>{(Number(bulkUserCount) * Number(bulkLicenseCount)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowBulkLicenseModal(false)
                    setBulkUserCount('10')
                    setBulkLicenseCount('5')
                  }}
                  className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkLicenseSubmit}
                  disabled={isLoading || !bulkUserCount || !bulkLicenseCount || isNaN(Number(bulkUserCount)) || isNaN(Number(bulkLicenseCount))}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isLoading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  {isLoading ? 'Assigning...' : 'Assign Licenses'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* License Audit Modal */}
      {showLicenseAuditModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowLicenseAuditModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">License Audit Report</h3>
                    <p className="text-sm text-slate-600">Comprehensive overview of license usage and analytics</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLicenseAuditModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-blue-700">Total Licenses</div>
                      <div className="text-2xl font-bold text-blue-900">3,287</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-emerald-700">Active Licenses</div>
                      <div className="text-2xl font-bold text-emerald-900">2,087</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-orange-700">Available</div>
                      <div className="text-2xl font-bold text-orange-900">1,200</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-700">Expired</div>
                      <div className="text-2xl font-bold text-red-900">15</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Utilization Chart */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 mb-8">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">License Utilization Overview</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Overall Utilization</span>
                    <span className="text-lg font-bold text-emerald-600">63.5%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{width: '63.5%'}}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-slate-900">Utilized</div>
                      <div className="text-emerald-600 font-semibold">2,087 (63.5%)</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-slate-900">Available</div>
                      <div className="text-orange-600 font-semibold">1,200 (36.5%)</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-slate-900">Optimization</div>
                      <div className="text-blue-600 font-semibold">+15% potential</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* License Breakdown Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-900">License Breakdown by Product</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-slate-700">Product</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Total</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Used</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Available</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Utilization</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-200">
                        <td className="p-4 font-medium text-slate-900">DSecure Drive Eraser</td>
                        <td className="p-4 text-slate-600">1,460</td>
                        <td className="p-4 text-slate-600">1,345</td>
                        <td className="p-4 text-slate-600">115</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div className="bg-emerald-500 h-2 rounded-full" style={{width: '92%'}}></div>
                            </div>
                            <span className="text-sm font-medium text-emerald-600">92%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">High Usage</span>
                        </td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="p-4 font-medium text-slate-900">DSecure Network Wipe</td>
                        <td className="p-4 text-slate-600">927</td>
                        <td className="p-4 text-slate-600">512</td>
                        <td className="p-4 text-slate-600">415</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{width: '55%'}}></div>
                            </div>
                            <span className="text-sm font-medium text-orange-600">55%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">Moderate</span>
                        </td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="p-4 font-medium text-slate-900">DSecure Cloud Eraser</td>
                        <td className="p-4 text-slate-600">900</td>
                        <td className="p-4 text-slate-600">230</td>
                        <td className="p-4 text-slate-600">670</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{width: '26%'}}></div>
                            </div>
                            <span className="text-sm font-medium text-blue-600">26%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">Low Usage</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => {
                    showInfo('Report Exported', 'Detailed license audit report has been sent to your email')
                    setShowLicenseAuditModal(false)
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export Detailed Report
                </button>
                <button
                  onClick={() => showInfo('Optimization Report', 'License optimization suggestions have been generated and will be sent to your email')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Optimization Report
                </button>
                <button
                  onClick={() => setShowLicenseAuditModal(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal - Matching the attached design */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 transform transition-all relative">
            {/* Close Button */}
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header with Theme Gradient Background */}
            <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 px-6 py-6 rounded-t-xl text-white">
              <h2 className="text-xl font-bold mb-0">Profile</h2>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              {/* Profile Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-slate-300 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Profile Information - API Driven */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Name:</span>
                  <span className="text-slate-900">{profileData?.name || user?.name || 'Loading...'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Email:</span>
                  <span className="text-slate-900 text-right">{profileData?.email || user?.email || 'Loading...'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Time Zone:</span>
                  <span className="text-slate-900">{profileData?.timezone || 'Loading...'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="font-medium text-slate-700">Role:</span>
                  <span className="text-slate-900 font-semibold">{profileData?.role || 'Loading...'}</span>
                </div>
              </div>
              
              {/* Edit Button */}
              <div className="mt-6 text-center">
                <button 
                  onClick={() => {
                    setShowProfileModal(false)
                    navigate('/admin/profile/edit')
                  }}
                  className="bg-brand hover:bg-brand-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">Add New User</h3>
              <p className="text-sm text-slate-600 mt-1">Create a new user account</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="userName"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="userEmail"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label htmlFor="userRole" className="block text-sm font-medium text-slate-700 mb-2">
                  Role
                </label>
                <select
                  id="userRole"
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="operator">Operator</option>
                </select>
              </div>
              <div>
                <label htmlFor="userDepartment" className="block text-sm font-medium text-slate-700 mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  id="userDepartment"
                  value={newUserForm.department}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter department"
                />
              </div>
              <div>
                <label htmlFor="userStatus" className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select
                  id="userStatus"
                  value={newUserForm.status}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAddUserModal(false)
                  setNewUserForm({ name: '', email: '', role: 'user', department: '', status: 'active' })
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUserSubmit}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Group Modal */}
      {showAddGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">Add New Group</h3>
              <p className="text-sm text-slate-600 mt-1">Create a new user group</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label htmlFor="groupName" className="block text-sm font-medium text-slate-700 mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={newGroupForm.name}
                  onChange={(e) => setNewGroupForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter group name"
                />
              </div>
              <div>
                <label htmlFor="groupDescription" className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="groupDescription"
                  rows={3}
                  value={newGroupForm.description}
                  onChange={(e) => setNewGroupForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter group description"
                />
              </div>
              <div>
                <label htmlFor="groupLicenses" className="block text-sm font-medium text-slate-700 mb-2">
                  Initial License Count
                </label>
                <input
                  type="number"
                  id="groupLicenses"
                  min="0"
                  value={newGroupForm.licenses}
                  onChange={(e) => setNewGroupForm(prev => ({ ...prev, licenses: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAddGroupModal(false)
                  setNewGroupForm({ name: '', description: '', licenses: 0 })
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGroupSubmit}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Group'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Licenses Modal */}
      {showAssignLicensesModal && selectedGroupForLicenses && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">Assign Licenses</h3>
              <p className="text-sm text-slate-600 mt-1">
                Assign licenses to group: <span className="font-medium">{selectedGroupForLicenses.name}</span>
              </p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label htmlFor="licenseCount" className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Licenses *
                </label>
                <input
                  type="number"
                  id="licenseCount"
                  min="1"
                  value={assignLicensesForm.licenseCount}
                  onChange={(e) => setAssignLicensesForm(prev => ({ ...prev, licenseCount: parseInt(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter license count"
                />
              </div>
              <div>
                <label htmlFor="licenseType" className="block text-sm font-medium text-slate-700 mb-2">
                  License Type
                </label>
                <select
                  id="licenseType"
                  value={assignLicensesForm.licenseType}
                  onChange={(e) => setAssignLicensesForm(prev => ({ ...prev, licenseType: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                >
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  value={assignLicensesForm.expiryDate}
                  onChange={(e) => setAssignLicensesForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAssignLicensesModal(false)
                  setSelectedGroupForLicenses(null)
                  setAssignLicensesForm({ licenseCount: 10, expiryDate: '', licenseType: 'basic' })
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignLicensesSubmit}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Assigning...' : 'Assign Licenses'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Settings Modal */}
      {showSystemSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">System Settings</h3>
              <p className="text-sm text-slate-600 mt-1">Configure system-wide settings and preferences</p>
            </div>
            <div className="px-6 py-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="systemName" className="block text-sm font-medium text-slate-700 mb-2">
                    System Name
                  </label>
                  <input
                    type="text"
                    id="systemName"
                    defaultValue="DSecure Admin System"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </div>
                <div>
                  <label htmlFor="adminEmail" className="block text-sm font-medium text-slate-700 mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    id="adminEmail"
                    defaultValue="admin@dsecuretech.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-medium text-slate-900 mb-3">Security Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-slate-700">Two-Factor Authentication</span>
                      <p className="text-xs text-slate-500">Require 2FA for all admin users</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-slate-700">Auto-logout</span>
                      <p className="text-xs text-slate-500">Automatic logout after inactivity</p>
                    </div>
                    <select className="text-sm border border-slate-300 rounded px-2 py-1">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-medium text-slate-900 mb-3">License Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Default License Duration (days)
                    </label>
                    <input
                      type="number"
                      defaultValue="365"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Max Licenses Per User
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setShowSystemSettingsModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showSuccess('Settings Saved', 'System settings have been updated successfully')
                  setShowSystemSettingsModal(false)
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
