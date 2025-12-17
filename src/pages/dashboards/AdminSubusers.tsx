import { useMemo, useState } from 'react'
import { exportToCsv, openPrintView } from '@/utils/csv'
import { Helmet } from 'react-helmet-async'
import { useNotification } from '@/contexts/NotificationContext'
import { apiClient, Subuser, Session } from '@/utils/enhancedApiClient'
import { useAuth } from '@/auth/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSubusers } from '@/hooks/useSubusers'
import { isDemoMode, DEMO_SUBUSERS } from '@/data/demoData'

// Extended interface for table display
interface SubuserTableRow {
  subuser_email: string
  roles: string
  status: string
  department: string
  last_login: string
}

export default function AdminSubusers() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification()
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [showUniqueOnly, setShowUniqueOnly] = useState(false)
  const [sortBy, setSortBy] = useState<keyof SubuserTableRow>('subuser_email')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const navigate = useNavigate()
  
  // 🎭 Demo mode check
  const isDemo = isDemoMode()
  
  // Helper function to format datetime for Last Login display
  const formatLastLogin = (lastLogin: string | null | undefined): string => {
    if (!lastLogin || lastLogin === 'Never' || lastLogin === '-') {
      return 'Never'
    }
    
    try {
      const date = new Date(lastLogin)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)
      
      // Less than 1 minute ago
      if (diffMins < 1) {
        return 'Just now'
      }
      // Less than 1 hour ago
      else if (diffMins < 60) {
        return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`
      }
      // Less than 24 hours ago
      else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
      }
      // Less than 7 days ago
      else if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
      }
      // More than 7 days - show formatted date
      else {
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        })
      }
    } catch (error) {
      console.error('Error formatting last login date:', error)
      return lastLogin
    }
  }
  
  // ✅ Get user email for fetching subusers
  const getUserEmail = (): string => {
    const storedUser = localStorage.getItem('user_data')
    const authUser = localStorage.getItem('authUser')
    
    let storedUserData = null
    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser)
      } catch (e) {
        console.error('Error parsing user_data:', e)
      }
    }
    
    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser)
      } catch (e) {
        console.error('Error parsing authUser:', e)
      }
    }
    
    return storedUserData?.user_email || user?.email || ''
  }
  
  // ✅ Check if current user has admin/superadmin role
  const getUserRole = (): string => {
    const storedUser = localStorage.getItem('user_data')
    const authUser = localStorage.getItem('authUser')
    
    let storedUserData = null
    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser)
      } catch (e) {
        console.error('Error parsing user_data:', e)
      }
    }
    
    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser)
      } catch (e) {
        console.error('Error parsing authUser:', e)
      }
    }
    
    return storedUserData?.role || storedUserData?.user_type || user?.role || 'user'
  }
  
  const userEmail = getUserEmail()
  const currentUserRole = getUserRole()
  const canEditOrDelete = currentUserRole === 'admin' || currentUserRole === 'superadmin'
  
  // console.log('🔍 Current User Role:', currentUserRole, '| Can Edit/Delete:', canEditOrDelete)
  
  // ✅ Check if current user is a subuser
  const getUserType = (): string => {
    const storedUser = localStorage.getItem('user_data')
    let storedUserData = null
    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser)
      } catch (e) {
        console.error('Error parsing user_data:', e)
      }
    }
    return storedUserData?.user_type || storedUserData?.userType || ''
  }
  
  const currentUserType = getUserType()
  const isSubuser = currentUserType === 'subuser'
  
  // console.log('👤 User Type:', currentUserType, '| Is Subuser:', isSubuser)
  // console.log('📧 Current User Email:', userEmail)
  
  // ✅ Fetch subusers filtered by current user's email (works for both regular users and subusers)
  // If subuser has sub-subusers, they will be shown; if not, empty state will appear
  // 🎭 In demo mode, disable React Query and use static data
  const { data: apiSubusersData = [], isLoading: apiLoading, refetch } = useSubusers(userEmail, !isDemo)
  
  // 🎭 Use DEMO_SUBUSERS in demo mode, otherwise use API data
  const subusersData = isDemo ? DEMO_SUBUSERS : apiSubusersData
  const loading = isDemo ? false : apiLoading
  
  const pageSize = 5
  
  // Delete modal state
  const [deleteModal, setDeleteModal] = useState<{ show: boolean; user: SubuserTableRow | null }>({
    show: false,
    user: null
  })
  
  // ✅ Transform hook data to table rows format
  const allRows = useMemo<SubuserTableRow[]>(() => {
    return subusersData.map((subuser: any) => ({
      subuser_email: subuser.subuser_email,
      roles: subuser.role || subuser.defaultRole || 'user',
      status: subuser.status || 'active',
      department: subuser.department || 'N/A',
      last_login: subuser.last_login || 'Never'
    }))
  }, [subusersData])  
  const uniqueRoles = useMemo(() => [...new Set(allRows.map(r => r.roles))], [allRows])
  const uniqueStatuses = useMemo(() => [...new Set(allRows.map(r => r.status))], [allRows])
  const uniqueDepartments = useMemo(() => [...new Set(allRows.map(r => r.department))], [allRows])
  
  const filtered = useMemo(() => {
    let result = allRows.filter(r => {
      const matchesQuery = r.subuser_email.toLowerCase().includes(query.toLowerCase()) ||
                          (r.department?.toLowerCase().includes(query.toLowerCase()) || false)
      const matchesRole = !roleFilter || r.roles === roleFilter
      const matchesStatus = !statusFilter || r.status === statusFilter
      const matchesDepartment = !departmentFilter || r.department === departmentFilter
      return matchesQuery && matchesRole && matchesStatus && matchesDepartment
    })
    
    // Remove duplicates if requested
    if (showUniqueOnly) {
      const seen = new Set()
      result = result.filter(r => {
        const key = `${r.subuser_email}-${r.roles}-${r.department}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }
    
    // Sort results
    result.sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a] || ''
      const bVal = b[sortBy as keyof typeof b] || ''
      const comparison = aVal.toString().localeCompare(bVal.toString())
      return sortOrder === 'asc' ? comparison : -comparison
    })
    
    return result
  }, [allRows, query, roleFilter, statusFilter, departmentFilter, showUniqueOnly, sortBy, sortOrder])
  
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const rows = filtered.slice((page-1)*pageSize, page*pageSize)
  
  const clearAllFilters = () => {
    setQuery('')
    setRoleFilter('')
    setStatusFilter('')
    setDepartmentFilter('')
    setShowUniqueOnly(false)
    setPage(1)
  }

  // Action functions
  const handleViewUser = (user: SubuserTableRow) => {
    showInfo(`Viewing profile for ${user.subuser_email}`)
    // Additional view logic can be added here
  }

  const handleEditUser = async (user: SubuserTableRow) => {
    // 🎭 DEMO MODE: Navigate directly with demo data, skip API call
    if (isDemo) {
      // console.log('🎭 Demo Mode: Navigating to edit page with demo data');
      
      // Find full user data from DEMO_SUBUSERS
      const demoUser = DEMO_SUBUSERS.find(u => u.subuser_email === user.subuser_email);
      
      navigate('/admin/edit-subuser', {
        state: {
          user: {
            subuser_email: user.subuser_email,
            name: demoUser?.subuser_name || user.subuser_email.split('@')[0],
            role: demoUser?.role || user.roles || 'user',
            department: demoUser?.department || user.department || 'IT Department',
            status: demoUser?.status || user.status || 'active',
            phone: demoUser?.subuser_phone || '+91-9876543210',
            licenseUsage: demoUser?.licenseUsage || 0,
            created_at: demoUser?.created_at || new Date().toISOString()
          },
          isDemo: true  // Pass demo flag to edit page
        }
      });
      return;
    }
    
    // Fetch full enhanced subuser details from the API before navigating.
    // This avoids relying on trimmed table row fields and prevents TypeScript errors.
    try {
      showInfo(`Fetching details for ${user.subuser_email}...`)
      const res = await apiClient.getEnhancedSubuser(user.subuser_email)

      if (!res || !res.success || !res.data) {
        showError('Fetch Failed', res?.error || 'Could not retrieve user details')
        return
      }

      const enhanced = res.data
      
      // console.log('🔍 Enhanced subuser data from API:', enhanced)
      
      // Extract name with proper fallbacks
      const userName = enhanced.subuser_name || enhanced.name || ''
      
      // Extract phone with proper fallbacks  
      const userPhone = enhanced.subuser_phone || enhanced.phone || ''
      
      // Extract role with proper fallbacks
      const userRole = enhanced.role || enhanced.subuser_role || enhanced.defaultRole || user.roles || 'user'
      
      // console.log('📋 Extracted values:')
      // console.log('  - Name:', userName)
      // console.log('  - Phone:', userPhone)
      // console.log('  - Role:', userRole)

      navigate('/admin/edit-subuser', {
        state: {
          user: {
            subuser_email: enhanced.subuser_email,
            name: userName,
            role: userRole,
            department: enhanced.department || user.department || '',
            status: enhanced.status || 'active',
            phone: userPhone,
            licenseUsage: enhanced.licenseUsage || Number(enhanced.license_allocation) || 0,
            created_at: enhanced.created_at || ''
          }
        }
      })
    } catch (err) {
      console.error('Error fetching subuser details:', err)
      showError('Error', err instanceof Error ? err.message : 'Failed to fetch user details')
    }
  }

  const handleDeleteUser = async (user: SubuserTableRow) => {
    setDeleteModal({ show: true, user })
  }

  const confirmDelete = async () => {
    const user = deleteModal.user
    if (!user) return

    try {
      showInfo(`Deleting user ${user.subuser_email}...`)
      
      // Call delete API
      const response = await apiClient.deleteSubuser(user.subuser_email)
      
      if (response.success) {
        showSuccess(`User ${user.subuser_email} deleted successfully`)
        setDeleteModal({ show: false, user: null })
        await refetch() // ✅ Use refetch from hook instead of loadUsersData
      } else {
        throw new Error(response.error || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      showError('Delete Failed', error instanceof Error ? error.message : 'Failed to delete user. Please try again.')
    }
  }

  const cancelDelete = () => {
    setDeleteModal({ show: false, user: null })
  }

  const handleManagePermissions = async (user: SubuserTableRow) => {
    showInfo(`Managing permissions for ${user.subuser_email}`)
    // Additional permissions logic can be added here
  }

  const handleResetPassword = async (user: SubuserTableRow) => {
    if (user.status === 'inactive') {
      showWarning(`Cannot reset password for ${user.subuser_email} - user is inactive`)
      return
    }
    try {
      showInfo(`Sending password reset email to ${user.subuser_email}...`)
      // Implement reset password API call here when available
      showSuccess(`Password reset email sent to ${user.subuser_email}`)
    } catch (error) {
      console.error('Error resetting password:', error)
      showError('Reset Failed', 'Failed to reset password. Please try again.')
    }
  }

  const handleToggleStatus = async (user: SubuserTableRow) => {
    try {
      showInfo(`Toggling status for ${user.subuser_email}...`)
      // Implement status toggle API call here when available
      const newStatus = user.status === 'active' ? 'inactive' : 'active'
      // await apiClient.updateSubuserStatus(user.subuser_email, newStatus)
      
      showSuccess(`User ${user.subuser_email} status changed to ${newStatus}`)
      await refetch() // ✅ Use refetch from hook instead of loadUsersData
    } catch (error) {
      console.error('Error toggling status:', error)
      showError('Status Update Failed', 'Failed to update user status. Please try again.')
    }
  }
  
  return (
    <>
    <Helmet>
      <link rel="canonical" href="https://dsecuretech.com/admin/subusers" />
              <title>DSecureTech Compliance | Data Erasure Standards & Regulations</title>
              <meta
                name="description"
                content="DSecureTech helps businesses meet global data sanitization standards like NIST, ISO 27001, GDPR, HIPAA, PCI DSS, and SOX with verifiable compliance solutions."
              />
              <meta
                name="keywords"
                content="data erasure compliance, NIST 800-88, ISO 27001, GDPR, HIPAA, SOX, PCI DSS, enterprise data destruction, B2B data security"
              />
              <meta name="robots" content="index, follow" />
            </Helmet>
    <div className="space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manage Subusers</h1>
        {/* <div className="flex items-center space-x-4">
          
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
            loading ? 'bg-yellow-100 text-yellow-800' :
            isUsingApi ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              loading ? 'bg-yellow-500' :
              isUsingApi ? 'bg-green-500' : 'bg-blue-500'
            }`}></div>
            <span>
              {loading ? 'Loading...' : 
               isUsingApi ? 'Live Backend Data' : 'Demo Data (AI Generated)'}
            </span>
          </div>
          {error && (
            <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
              API Unavailable: Showing AI demo data
            </div>
          )}
          <button 
            onClick={refetch}
            className="text-xs text-slate-600 hover:text-slate-800 bg-white px-3 py-1 rounded border"
          >
            Refresh
          </button>
        </div> */}
      </div>
      
     
      {/* {!loading && !isUsingApi && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">Demo Mode Active</h3>
              <p className="mt-1 text-sm text-blue-700">
                You're viewing AI-generated demo data for demonstration purposes. 
                Connect to your backend API to see real user data from your database.
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* Advanced Filters */}
      <div className="card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Filters & Search</h3>
          <button 
            onClick={clearAllFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
              Clear All
            </button>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
            <input 
              className="w-full border rounded px-3 py-2 text-sm" 
              placeholder="Search email, department" 
              value={query} 
              onChange={(e)=>{setQuery(e.target.value); setPage(1)}} 
            />
          </div>
          
          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={roleFilter}
              onChange={(e)=>{setRoleFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Roles</option>
              {uniqueRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e)=>{setStatusFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={departmentFilter}
              onChange={(e)=>{setDepartmentFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="uniqueOnly" 
              checked={showUniqueOnly}
              onChange={(e)=>{setShowUniqueOnly(e.target.checked); setPage(1)}}
              className="rounded"
            />
            <label htmlFor="uniqueOnly" className="text-sm font-medium text-slate-700">
              Show unique records only
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Sort by:</label>
            <select 
              className="border rounded px-2 py-1 text-sm"
              value={sortBy}
              onChange={(e)=>setSortBy(e.target.value as keyof SubuserTableRow)}
            >
              <option value="subuser_email">Email</option>
              <option value="roles">Role</option>
              <option value="status">Status</option>
              <option value="department">Department</option>
              <option value="last_login">Last Login</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-2 py-1 border rounded text-sm hover:bg-slate-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          
          <div className="text-sm text-slate-600">
            Showing {filtered.length} of {allRows.length} users
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex justify-end gap-2">
        <button className="btn-secondary" onClick={()=>exportToCsv('subusers.csv', filtered.map(u => ({...u})))}>Export All ({filtered.length})</button>
        <button className="btn-secondary" onClick={()=>exportToCsv('subusers-page.csv', rows.map(u => ({...u})))}>Export Page ({rows.length})</button>
        <button className="btn-secondary" onClick={()=>{
          const body = `<h1>Subusers Management</h1>` +
            `<table border="1" style="border-collapse: collapse; width: 100%;"><thead><tr><th>Email</th><th>Role</th><th>Status</th><th>Department</th><th>Last Login</th></tr></thead><tbody>`+
            filtered.map(u=>`<tr><td>${u.subuser_email}</td><td>${u.roles}</td><td>${u.status}</td><td>${u.department}</td><td>${u.last_login}</td></tr>`).join('')+
            `</tbody></table>`
          openPrintView('Subusers Management', body)
        }}>Print All ({filtered.length})</button>
      </div>

      {/* Table */}
      <div className="card-content card-table card">
        <table className="w-full text-nowrap">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Status</th>
              <th className="py-2">Department</th>
              <th className="py-2">Last Login</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-slate-600">Loading subusers data...</p>
                  </div>
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No Subusers Found</h3>
                    <p className="text-slate-600">
                      {isSubuser 
                        ? "You don't have any subusers associated with your account."
                        : "No subusers found. Try adjusting your filters or create a new subuser."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((user, i) => (
                <tr key={`${user.subuser_email}-${i}`} className="border-t hover:bg-slate-50">
                  <td className="py-2 font-medium">{user.subuser_email}</td>
                  <td className="py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.roles === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.roles === 'manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {user.roles}
                    </span>
                  </td>
                  <td className="py-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'inactive' ? 'bg-red-100 text-red-800' :
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        user.status === 'active' ? 'bg-green-400' :
                        user.status === 'inactive' ? 'bg-red-400' :
                        user.status === 'pending' ? 'bg-yellow-400' :
                        'bg-gray-400'
                      }`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2">{user.department}</td>
                  <td className="py-2 text-slate-600">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {formatLastLogin(user.last_login)}
                      </span>
                      {user.last_login && user.last_login !== 'Never' && user.last_login !== '-' && (
                        <span className="text-xs text-slate-400 mt-0.5" title={new Date(user.last_login).toLocaleString()}>
                          {new Date(user.last_login).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex items-center gap-1">
                      {/* <button 
                        onClick={() => handleViewUser(user)}
                        className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                        title="View User"
                      >
                        View
                      </button> */}
                      
                      {/* ✅ Edit Button - Disabled for simple users */}
                      <button 
                        onClick={() => canEditOrDelete && handleEditUser(user)}
                        disabled={!canEditOrDelete}
                        className={`text-xs px-2 py-1 rounded border ${
                          canEditOrDelete
                            ? 'text-slate-600 hover:text-slate-800 border-slate-200 hover:bg-slate-50 cursor-pointer'
                            : 'text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
                        }`}
                        title={canEditOrDelete ? 'Edit User' : 'Only admin and superadmin can edit users'}
                      >
                        Edit
                      </button>
                      
                      {/* <button 
                        onClick={() => handleManagePermissions(user)}
                        className="text-purple-600 hover:text-purple-800 text-xs px-2 py-1 rounded border border-purple-200 hover:bg-purple-50"
                        title="Manage Permissions"
                      >
                        Permissions
                      </button> */}
                      {/* <button 
                        onClick={() => handleResetPassword(user)}
                        className={`text-xs px-2 py-1 rounded border ${
                          user.status === 'inactive' 
                            ? 'text-slate-400 border-slate-200 cursor-not-allowed' 
                            : 'text-orange-600 hover:text-orange-800 border-orange-200 hover:bg-orange-50'
                        }`}
                        disabled={user.status === 'inactive'}
                        title={user.status === 'inactive' ? 'User is inactive' : 'Reset Password'}
                      >
                        Reset
                      </button> */}
                      {/* <button 
                        onClick={() => handleToggleStatus(user)}
                        className={`text-xs px-2 py-1 rounded border ${
                          user.status === 'active' 
                            ? 'text-red-600 hover:text-red-800 border-red-200 hover:bg-red-50' 
                            : 'text-green-600 hover:text-green-800 border-green-200 hover:bg-green-50'
                        }`}
                        title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button> */}
                      
                      {/* ✅ Delete Button - Disabled for simple users */}
                      <button 
                        onClick={() => canEditOrDelete && handleDeleteUser(user)}
                        disabled={!canEditOrDelete}
                        className={`text-xs px-2 py-1 rounded border ${
                          canEditOrDelete
                            ? 'text-red-600 hover:text-red-800 border-red-200 hover:bg-red-50 cursor-pointer'
                            : 'text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
                        }`}
                        title={canEditOrDelete ? 'Delete User' : 'Only admin and superadmin can delete users'}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button 
              disabled={page <= 1} 
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Previous
            </button>
            <button 
              disabled={page >= totalPages} 
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && deleteModal.user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center gap-3 p-6 border-b border-slate-200">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">Delete User</h3>
                <p className="text-sm text-slate-500">This action cannot be undone</p>
              </div>
              <button
                onClick={cancelDelete}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-slate-700 mb-4">
                Are you sure you want to delete the following user?
              </p>
              
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium text-slate-900">{deleteModal.user.subuser_email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-slate-600">{deleteModal.user.department}</span>
                  <span className="mx-2 text-slate-300">•</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    deleteModal.user.roles === 'admin' ? 'bg-purple-100 text-purple-800' :
                    deleteModal.user.roles === 'manager' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {deleteModal.user.roles}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Warning</p>
                    <p className="text-sm text-red-700 mt-1">
                      This will permanently delete the user account, all associated data, and cannot be recovered.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-white transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}


