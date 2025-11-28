import { useMemo, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { exportToCsv } from '@/utils/csv'
import { useNotification } from '@/contexts/NotificationContext'
import { apiClient, SystemLog, Command, Session } from '@/utils/enhancedApiClient'
import { authService } from '@/utils/authService'
import { useAuth } from '@/auth/AuthContext'

type TabType = 'logs' | 'commands' | 'sessions'

export default function AdminLogs() {
  const { user } = useAuth()
  const { showSuccess, showError, showWarning, showInfo } = useNotification()
  const [activeTab, setActiveTab] = useState<TabType>('logs')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [levelFilter, setLevelFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [emailFilter, setEmailFilter] = useState<'all' | 'by-email'>('all') // ✅ Default to ALL logs
  const [showDetails, setShowDetails] = useState<number | null>(null)
  
  // ✅ Get user role - Only admin and superadmin can see "All Logs" filter
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
  
  const currentUserRole = getUserRole()
  const canViewAllLogs = currentUserRole === 'admin' || currentUserRole === 'superadmin'
  
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
  
  // Data states - Initialize with empty arrays, let loadAllData handle fetching/caching
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([])
  const [commands, setCommands] = useState<Command[]>([])
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  
  const pageSize = 30 // ⚡ Increased from 20 to reduce pagination overhead

  // Load all data on component mount
  useEffect(() => {
    loadAllData()
  }, [emailFilter])

  const loadAllData = async () => {
    setLoading(true)
    const startTime = performance.now()
    
    // ✅ Use dynamic cache keys based on emailFilter
    const cacheKeySuffix = emailFilter;
    const cachedLogs = getCachedData(`logs_${cacheKeySuffix}`);
    const cachedCommands = getCachedData(`commands_${cacheKeySuffix}`);
    const cachedSessions = getCachedData(`sessions_${cacheKeySuffix}`);
    
    if (cachedLogs && cachedCommands && cachedSessions) {
      console.log(`⚡ Displaying cached data for filter: ${emailFilter}`);
      setSystemLogs(cachedLogs);
      setCommands(cachedCommands);
      setSessions(cachedSessions);
      setLoading(false);
      console.log(`⏱️ Cache load time: ${(performance.now() - startTime).toFixed(2)}ms`);
      return; // Skip API call if all data is cached for this filter
    }
    
    try {
      const user = authService.getUserFromToken()
      const userEmail = user?.email

      if (!userEmail) {
        showError('Authentication Error', 'No user email found. Please login again.')
        setLoading(false)
        return
      }

      console.log('📊 Fetching logs, commands, and sessions for:', userEmail)
      console.log('🔍 Filter mode:', emailFilter)

      // ⚡ PARALLEL API CALLS - Much faster than sequential
      const [logsRes, commandsRes, sessionsRes] = await Promise.all([
        emailFilter === 'by-email' 
          ? apiClient.getSystemLogsByEmail(userEmail)
          : apiClient.getSystemLogs(),
        emailFilter === 'by-email'
          ? apiClient.getCommandsByEmail(userEmail)
          : apiClient.getCommands(),
        emailFilter === 'by-email'
          ? apiClient.getSessionsByEmail(userEmail)
          : apiClient.getSessions()
      ])

      // Set data and cache it with dynamic keys based on emailFilter
      const cacheKey = emailFilter;
      
      if (logsRes.success && logsRes.data) {
        setSystemLogs(logsRes.data)
        setCachedData(`logs_${cacheKey}`, logsRes.data);
        console.log('✅ Logs loaded:', logsRes.data.length)
      } else {
        setSystemLogs([])
      }
      
      if (commandsRes.success && commandsRes.data) {
        setCommands(commandsRes.data)
        setCachedData(`commands_${cacheKey}`, commandsRes.data);
        console.log('✅ Commands loaded:', commandsRes.data.length)
      } else {
        setCommands([])
      }
      
      if (sessionsRes.success && sessionsRes.data) {
        setSessions(sessionsRes.data)
        setCachedData(`sessions_${cacheKey}`, sessionsRes.data);
        console.log('✅ Sessions loaded:', sessionsRes.data.length)
      } else {
        setSessions([])
      }

      const loadTime = (performance.now() - startTime).toFixed(2)
      console.log(`⏱️ Total API load time: ${loadTime}ms`)

    } catch (error) {
      console.error('❌ Error loading data:', error)
      showError('Data Loading Error', 'Failed to load system logs data')
    } finally {
      setLoading(false)
    }
  }



  // ⚡ Optimized filtering with early returns and case-insensitive search
  const filteredLogs = useMemo(() => {
    const lowerQuery = query.toLowerCase()
    let result = systemLogs
    
    // Apply filters only if set (faster)
    if (query || levelFilter || dateFilter) {
      result = systemLogs.filter(log => {
        if (levelFilter && log.log_level !== levelFilter) return false
        if (dateFilter && !log.created_at?.startsWith(dateFilter)) return false
        if (query) {
          const message = log.log_message?.toLowerCase() || ''
          const email = log.user_email?.toLowerCase() || ''
          if (!message.includes(lowerQuery) && !email.includes(lowerQuery)) return false
        }
        return true
      })
    }
    
    // Sort only once at the end
    return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }, [systemLogs, query, levelFilter, dateFilter])

  const filteredCommands = useMemo(() => {
    const lowerQuery = query.toLowerCase()
    let result = commands
    
    if (query || statusFilter || dateFilter) {
      result = commands.filter(cmd => {
        if (statusFilter && cmd.command_status !== statusFilter) return false
        if (dateFilter && !cmd.issued_at?.startsWith(dateFilter)) return false
        if (query && !cmd.command_text?.toLowerCase().includes(lowerQuery)) return false
        return true
      })
    }
    
    return result.sort((a, b) => new Date(b.issued_at).getTime() - new Date(a.issued_at).getTime())
  }, [commands, query, statusFilter, dateFilter])

  const filteredSessions = useMemo(() => {
    const lowerQuery = query.toLowerCase()
    let result = sessions
    
    if (query || statusFilter || dateFilter) {
      result = sessions.filter(session => {
        if (statusFilter && session.session_status !== statusFilter) return false
        if (dateFilter && !session.login_time?.startsWith(dateFilter)) return false
        if (query) {
          const email = session.user_email?.toLowerCase() || ''
          const ip = session.ip_address?.toLowerCase() || ''
          if (!email.includes(lowerQuery) && !ip.includes(lowerQuery)) return false
        }
        return true
      })
    }
    
    return result.sort((a, b) => new Date(b.login_time).getTime() - new Date(a.login_time).getTime())
  }, [sessions, query, statusFilter, dateFilter])

  // Get current tab data
  // ⚡ Optimized data selection - only calculate what's needed
  const currentData = useMemo(() => {
    switch (activeTab) {
      case 'logs': return filteredLogs
      case 'commands': return filteredCommands
      case 'sessions': return filteredSessions
    }
  }, [activeTab, filteredLogs, filteredCommands, filteredSessions])
  
  // ⚡ Only calculate unique values when tab is active
  const uniqueLevels = useMemo(() => {
    if (activeTab !== 'logs') return []
    return [...new Set(systemLogs.map(log => log.log_level).filter(Boolean))]
  }, [systemLogs, activeTab])
  
  const uniqueStatuses = useMemo(() => {
    if (activeTab === 'commands') {
      return [...new Set(commands.map(cmd => cmd.command_status).filter(Boolean))]
    }
    if (activeTab === 'sessions') {
      return [...new Set(sessions.map(session => session.session_status).filter(Boolean))]
    }
    return []
  }, [activeTab, commands, sessions])

  const totalPages = Math.max(1, Math.ceil(currentData.length / pageSize))
  const paginatedData = useMemo(() => 
    currentData.slice((page-1)*pageSize, page*pageSize),
    [currentData, page, pageSize]
  )

  const clearAllFilters = () => {
    setQuery('')
    setLevelFilter('')
    setStatusFilter('')
    setDateFilter('')
    setEmailFilter('all') // ✅ Reset to ALL logs
    setPage(1)
  }

  const handleExport = () => {
    const filename = `${activeTab}-${new Date().toISOString().split('T')[0]}.csv`
    exportToCsv(filename, currentData as any[])
    showSuccess(`Exported ${currentData.length} ${activeTab} entries`)
  }

  const handleRefresh = () => {
    showInfo('Refreshing data...')
    loadAllData()
  }

  const getLevelColor = (level: string) => {
    const lowerLevel = level?.toLowerCase() || ''
    if (lowerLevel.includes('error') || lowerLevel.includes('critical')) return 'bg-red-100 text-red-800 border-red-200'
    if (lowerLevel.includes('warn')) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    if (lowerLevel.includes('success')) return 'bg-green-100 text-green-800 border-green-200'
    if (lowerLevel.includes('info')) return 'bg-blue-100 text-blue-800 border-blue-200'
    if (lowerLevel.includes('debug')) return 'bg-gray-100 text-gray-800 border-gray-200'
    return 'bg-slate-100 text-slate-800 border-slate-200'
  }

  const getStatusColor = (status: string) => {
    const lowerStatus = status?.toLowerCase() || ''
    if (lowerStatus.includes('success') || lowerStatus.includes('completed') || lowerStatus.includes('active')) return 'bg-green-100 text-green-800'
    if (lowerStatus.includes('pending') || lowerStatus.includes('running')) return 'bg-yellow-100 text-yellow-800'
    if (lowerStatus.includes('failed') || lowerStatus.includes('error') || lowerStatus.includes('inactive')) return 'bg-red-100 text-red-800'
    return 'bg-gray-100 text-gray-800'
  }

  // ⚡ Memoized date formatting with cache
  const dateCache = useMemo(() => new Map<string, string>(), [])
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    
    // Check cache first
    if (dateCache.has(dateString)) {
      return dateCache.get(dateString)!
    }
    
    const date = new Date(dateString)
    const formatted = date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    dateCache.set(dateString, formatted)
    return formatted
  }

  // ⚡ Memoized JSON parsing cache to avoid re-parsing on every render
  const jsonCache = useMemo(() => new Map<string, any>(), [])
  
  const parseJsonDetails = (jsonString: string) => {
    if (!jsonString) return null
    
    // Check cache first
    if (jsonCache.has(jsonString)) {
      return jsonCache.get(jsonString)
    }
    
    try {
      const data = JSON.parse(jsonString)
      jsonCache.set(jsonString, data)
      return data
    } catch {
      jsonCache.set(jsonString, null)
      return null
    }
  }

  // Render JSON details as key-value pairs instead of raw JSON
  const renderDetailsTable = (data: any) => {
    if (!data || typeof data !== 'object') return null
    
    return (
      <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <tbody className="bg-white divide-y divide-slate-200">
            {Object.entries(data).map(([key, value], idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 w-1/3">
                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </td>
                <td className="px-4 py-2 text-sm text-slate-900">
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/admin/logs" />
        <title>DSecureTech Admin Logs | System Activity & Security Monitoring</title>
        <meta
          name="description"
          content="Monitor system activity, commands, and user sessions with comprehensive logging and filtering capabilities."
        />
        <meta
          name="keywords"
          content="system logs, activity monitoring, commands, sessions, security monitoring, admin dashboard"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">System Logs</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRefresh}
              className="text-sm px-3 py-1 text-blue-600 hover:text-blue-800 border border-blue-200 rounded hover:bg-blue-50 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button 
              onClick={handleExport}
              className="text-sm px-3 py-1 text-green-600 hover:text-green-800 border border-green-200 rounded hover:bg-green-50 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export ({currentData.length})
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="card p-0 overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => { setActiveTab('logs'); setPage(1); clearAllFilters() }}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'logs'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Logs ({systemLogs.length})
            </button>
            <button
              onClick={() => { setActiveTab('commands'); setPage(1); clearAllFilters() }}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'commands'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Commands ({commands.length})
            </button>
            <button
              onClick={() => { setActiveTab('sessions'); setPage(1); clearAllFilters() }}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'sessions'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Sessions ({sessions.length})
            </button>
          </div>
        </div>

        {/* Filters & Search */}
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
            {/* ✅ Only show filter for admin/superadmin */}
            {canViewAllLogs && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Filter By Email</label>
                <select
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value as 'all' | 'by-email')}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="all">All Logs</option>
                  <option value="by-email">My Logs</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {activeTab === 'logs' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Levels</option>
                  {uniqueLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            )}
            
            {(activeTab === 'commands' || activeTab === 'sessions') && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  
                >
                  <option value="">All Statuses</option>
                  {uniqueStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date Filter</label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div>
              Showing {currentData.length} {activeTab}
            </div>
            <div>
              Page {page} of {totalPages}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="card">
          <div className="divide-y divide-slate-200">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-slate-600">Loading data...</p>
              </div>
            ) : (
              <>
                {/* Logs Tab */}
                {activeTab === 'logs' && (paginatedData as SystemLog[]).map((log) => {
                  const details = log.log_details_json ? parseJsonDetails(log.log_details_json) : null
                  return (
                    <div key={log.log_id} className="p-4 hover:bg-slate-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.log_level)}`}>
                              {log.log_level?.toUpperCase()}
                            </span>
                            <span className="text-sm text-slate-500">{formatDate(log.created_at)}</span>
                            <span className="text-sm text-slate-600">{log.user_email}</span>
                          </div>
                          
                          <div className="text-slate-800 mb-2">{log.log_message}</div>
                          
                          {details && (
                            <div className="flex items-center gap-2 text-sm">
                              <button 
                                onClick={() => setShowDetails(showDetails === log.log_id ? null : log.log_id)}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showDetails === log.log_id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                                {showDetails === log.log_id ? 'Hide Details' : 'View Details'}
                              </button>
                            </div>
                          )}
                          
                          {showDetails === log.log_id && details && renderDetailsTable(details)}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Commands Tab */}
                {activeTab === 'commands' && (paginatedData as Command[]).map((cmd) => {
                  const cmdDetails = cmd.command_json ? parseJsonDetails(cmd.command_json) : null
                  return (
                    <div key={cmd.command_id} className="p-4 hover:bg-slate-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cmd.command_status)}`}>
                              {cmd.command_status}
                            </span>
                            <span className="text-sm text-slate-500">{formatDate(cmd.issued_at)}</span>
                            <span className="text-sm text-slate-600">ID: {cmd.command_id}</span>
                          </div>
                          
                          <div className="text-slate-800 mb-2 font-mono text-sm bg-slate-50 p-3 rounded border border-slate-200">
                            {cmd.command_text}
                          </div>
                          
                          {cmdDetails && (
                            <div className="flex items-center gap-2 text-sm">
                              <button 
                                onClick={() => setShowDetails(showDetails === cmd.command_id ? null : cmd.command_id)}
                                className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showDetails === cmd.command_id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                                {showDetails === cmd.command_id ? 'Hide Parameters' : 'View Parameters'}
                              </button>
                            </div>
                          )}
                          
                          {showDetails === cmd.command_id && cmdDetails && renderDetailsTable(cmdDetails)}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Sessions Tab */}
                {activeTab === 'sessions' && (paginatedData as Session[]).map((session) => (
                  <div key={session.session_id} className="p-4 hover:bg-slate-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.session_status)}`}>
                            {session.session_status}
                          </span>
                          <span className="text-sm text-slate-600">{session.user_email}</span>
                          <span className="text-sm text-slate-500">ID: {session.session_id}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-slate-700 mb-2">
                          <div>
                            <span className="font-medium">Login:</span> {formatDate(session.login_time)}
                          </div>
                          <div>
                            <span className="font-medium">Logout:</span> {session.logout_time ? formatDate(session.logout_time) : 'Active'}
                          </div>
                          <div>
                            <span className="font-medium">IP Address:</span> {session.ip_address}
                          </div>
                          {session.device_info && (
                            <div>
                              <span className="font-medium">Device:</span> {session.device_info}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          
          {!loading && paginatedData.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              <div className="mb-2">
                <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>No {activeTab} found matching your criteria</div>
              <button 
                onClick={clearAllFilters}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Clear filters to show all {activeTab}
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {(page-1)*pageSize + 1} to {Math.min(page*pageSize, currentData.length)} of {currentData.length} entries
            </div>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Previous
              </button>
              <span className="px-3 py-1 text-sm">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
