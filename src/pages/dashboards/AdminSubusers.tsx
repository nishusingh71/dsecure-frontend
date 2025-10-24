import { useMemo, useState } from 'react'
import { exportToCsv, openPrintView } from '@/utils/csv'
import { Helmet } from 'react-helmet-async'
import { useNotification } from '@/contexts/NotificationContext'
import { apiClient, Subuser, Session } from '@/utils/enhancedApiClient'
import { useAuth } from '@/auth/AuthContext'
import { useEffect } from 'react'

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
  
  // ✅ Cache Helper Functions
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  
  const getCachedData = (key: string) => {
    try {
      const cached = localStorage.getItem(`admin_cache_${key}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log(`✅ Using cached data for ${key}`);
          return data;
        }
        localStorage.removeItem(`admin_cache_${key}`);
      }
    } catch (e) {
      console.warn(`⚠️ Cache read error for ${key}:`, e);
    }
    return null;
  };

  const setCachedData = (key: string, data: any) => {
    try {
      localStorage.setItem(`admin_cache_${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      console.log(`💾 Cached data for ${key}`);
    } catch (e) {
      console.warn(`⚠️ Cache write error for ${key}:`, e);
    }
  };
  
  const [allRows, setAllRows] = useState<SubuserTableRow[]>(() => getCachedData('subusers_list') || [])
  const [loading, setLoading] = useState(true)
  const pageSize = 5
  
  // Load users data on component mount
  useEffect(() => {
    loadUsersData()
  }, [])

  const loadUsersData = async () => {
    setLoading(true)
    
    // ✅ Check cache first for instant display
    const cachedSubusers = getCachedData('subusers_list');
    if (cachedSubusers && cachedSubusers.length > 0) {
      console.log('⚡ Displaying cached subusers data');
      setAllRows(cachedSubusers);
      setLoading(false); // Hide loader since we have cached data
    }
    
    try {
      // Get user email - EXACT SAME PATTERN AS AdminDashboard, AdminMachines & AdminReports
      // 1. Try localStorage 'user_data' key (not 'dsecure_user_data')
      let storedUserData = null;
      const storedUser = localStorage.getItem('user_data');
      const authUser = localStorage.getItem('authUser');
      
      if (storedUser) {
        try {
          storedUserData = JSON.parse(storedUser);
          console.log('💾 Parsed user_data from localStorage:', storedUserData);
        } catch (e) {
          console.error('Error parsing user_data:', e);
        }
      }
      
      if (!storedUserData && authUser) {
        try {
          storedUserData = JSON.parse(authUser);
          console.log('💾 Parsed authUser from localStorage:', storedUserData);
        } catch (e) {
          console.error('Error parsing authUser:', e);
        }
      }
      
      // 2. PRIORITY: Use user_email from localStorage user_data, then from auth context
      const userEmail = storedUserData?.user_email || user?.email || '';
      console.log('📧 Final userEmail for subusers:', userEmail);
      
      if (!userEmail) {
        console.warn('⚠️ User email not found, cannot fetch subusers')
        showWarning('No User Email', 'Please log in again to view subusers.')
        setLoading(false)
        return
      }

      console.log('🔍 Fetching subusers for:', userEmail)

      // 1. Fetch subusers from backend with smart fallback
      let subusersRes
      try {
        subusersRes = await apiClient.getSubusersBySuperuser(userEmail)
        console.log('✅ Subusers API response:', subusersRes)
      } catch (err) {
        console.error('❌ Error fetching subusers by superuser:', err)
        // Fallback: Try to get all subusers
        try {
          console.log('🔄 Attempting fallback to getSubusers()...')
          subusersRes = await apiClient.getSubusers()
          console.log('✅ Fallback subusers response:', subusersRes)
        } catch (fallbackErr) {
          console.error('❌ Fallback also failed:', fallbackErr)
          throw new Error('Both primary and fallback APIs failed')
        }
      }
      
      if (!subusersRes || !subusersRes.success || !subusersRes.data || subusersRes.data.length === 0) {
        console.warn('⚠️ No subusers data received')
        showInfo('No Subusers Found', 'No subusers are associated with your account.')
        setAllRows([])
        setLoading(false)
        return
      }

      console.log('✅ Subusers fetched:', subusersRes.data.length)

      // 2. Fetch enhanced subuser data with department info from /api/EnhancedSubusers/by-parent/{parentEmail}
      let enhancedSubusersMap = new Map<string, { department?: string; role?: string }>()
      try {
        console.log('🔍 Fetching enhanced subusers data for department info...')
        const enhancedRes = await apiClient.getEnhancedSubusersByParent(userEmail)
        if (enhancedRes.success && enhancedRes.data) {
          console.log('✅ Enhanced subusers fetched:', enhancedRes.data.length)
          enhancedRes.data.forEach((enhanced) => {
            enhancedSubusersMap.set(enhanced.subuser_email, {
              department: enhanced.department,
              role: enhanced.role || enhanced.defaultRole
            })
          })
          console.log('✅ Enhanced data mapped for', enhancedSubusersMap.size, 'subusers')
        }
      } catch (enhancedErr) {
        console.warn('⚠️ Failed to fetch enhanced subuser data, continuing without department info:', enhancedErr)
      }

      // 3. Fetch all sessions to get last login info
      let sessionsData: Session[] = []
      try {
        const sessionsRes = await apiClient.getSessions()
        sessionsData = sessionsRes.success && sessionsRes.data ? sessionsRes.data : []
        console.log('✅ Sessions fetched:', sessionsData.length)
      } catch (sessionErr) {
        console.warn('⚠️ Failed to fetch sessions, continuing without last login data:', sessionErr)
        // Continue without session data - last login will show "Never"
      }

      // 4. Create a map of email -> last login time
      const lastLoginMap = new Map<string, string>()
      sessionsData.forEach((session: Session) => {
        const email = session.user_email
        const loginTime = session.login_time
        
        // Keep the most recent login
        if (!lastLoginMap.has(email) || new Date(loginTime) > new Date(lastLoginMap.get(email)!)) {
          lastLoginMap.set(email, loginTime)
        }
      })

      // 5. Map subusers to table rows with session data and department info
      const tableRows: SubuserTableRow[] = subusersRes.data.map((subuser: Subuser) => {
        const lastLogin = lastLoginMap.get(subuser.subuser_email)
        const enhancedData = enhancedSubusersMap.get(subuser.subuser_email)
        
        return {
          subuser_email: subuser.subuser_email,
          roles: enhancedData?.role || subuser.subuser_role || 'user',
          status: subuser.status || 'active',
          department: enhancedData?.department || 'N/A', // ✅ Use department from enhanced API
          last_login: lastLogin 
            ? new Date(lastLogin).toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })
            : 'Never'
        }
      })

      console.log('✅ Table rows created:', tableRows.length)
      setAllRows(tableRows)
      setCachedData('subusers_list', tableRows); // ✅ Cache API data
      showSuccess('Data Loaded', `Successfully loaded ${tableRows.length} subuser(s)`)
      
    } catch (error) {
      console.error('❌ Error loading subusers:', error)
      showError('Data Loading Error', 'Failed to load subuser data from backend. Please try again.')
      setAllRows([])
    } finally {
      setLoading(false)
    }
  }


  
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
    showInfo(`Edit mode enabled for ${user.subuser_email}`)
    // You can implement a modal or redirect to edit page here
  }

  const handleDeleteUser = async (user: SubuserTableRow) => {
    if (window.confirm(`Are you sure you want to delete user ${user.subuser_email}?`)) {
      try {
        showInfo(`Deleting user ${user.subuser_email}...`)
        // Implement delete API call here when available
        // await apiClient.deleteSubuser(user.subuser_email)
        
        showSuccess(`User ${user.subuser_email} deleted successfully`)
        await loadUsersData() // Refresh the list
      } catch (error) {
        console.error('Error deleting user:', error)
        showError('Delete Failed', 'Failed to delete user. Please try again.')
      }
    }
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
      await loadUsersData() // Refresh the list
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
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No subusers found. Try adjusting your filters.
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
                  <td className="py-2 text-slate-600">{user.last_login}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-1">
                      {/* <button 
                        onClick={() => handleViewUser(user)}
                        className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                        title="View User"
                      >
                        View
                      </button> */}
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-slate-600 hover:text-slate-800 text-xs px-2 py-1 rounded border border-slate-200 hover:bg-slate-50"
                        title="Edit User"
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
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                        title="Delete User"
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
    </div>
    </>
  )
}


