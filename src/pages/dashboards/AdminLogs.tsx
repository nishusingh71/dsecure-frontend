import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { exportToCsv } from '@/utils/csv'
import { useNotification } from '@/contexts/NotificationContext'

interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error' | 'success' | 'debug'
  category: string
  message: string
  user?: string
  source: string
  details?: string
}

export default function AdminLogs() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [levelFilter, setLevelFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const pageSize = 20

  // Comprehensive log data
  const allLogs: LogEntry[] = useMemo(() => [
    {
      id: 'log_001',
      timestamp: '2025-10-09 09:01:12',
      level: 'info',
      category: 'System',
      message: 'System startup completed successfully',
      user: 'System',
      source: 'Core Service',
      details: 'All services initialized, memory usage: 45%, CPU: 12%'
    },
    {
      id: 'log_002',
      timestamp: '2025-10-09 09:07:51',
      level: 'success',
      category: 'Data Erasure',
      message: 'Secure erase job 3421 completed successfully',
      user: 'john.doe@company.com',
      source: 'Erase Engine',
      details: 'Device: Samsung SSD 970 EVO, Method: NIST 800-88, Verification: Passed'
    },
    {
      id: 'log_003',
      timestamp: '2025-10-09 09:15:23',
      level: 'info',
      category: 'Authentication',
      message: 'User login successful',
      user: 'jane.smith@company.com',
      source: 'Auth Service',
      details: 'IP: 192.168.1.105, Location: New York, Device: Chrome/Windows'
    },
    {
      id: 'log_004',
      timestamp: '2025-10-09 09:22:15',
      level: 'warning',
      category: 'License',
      message: 'License usage approaching limit',
      user: 'System',
      source: 'License Manager',
      details: 'Current usage: 85%, Limit: 100 concurrent users, Expires: 2025-12-31'
    },
    {
      id: 'log_005',
      timestamp: '2025-10-09 09:30:42',
      level: 'error',
      category: 'Data Erasure',
      message: 'Erase job 3422 failed - disk read error',
      user: 'alice.brown@company.com',
      source: 'Erase Engine',
      details: 'Device: WD Blue HDD 1TB, Error: Sector 1,234,567 unreadable, Retry attempts: 3'
    },
    {
      id: 'log_006',
      timestamp: '2025-10-09 09:45:18',
      level: 'info',
      category: 'Report',
      message: 'Compliance report generated successfully',
      user: 'bob.johnson@company.com',
      source: 'Report Engine',
      details: 'Report ID: RPT-2025-1003, Type: GDPR Compliance, Records: 1,250'
    },
    {
      id: 'log_007',
      timestamp: '2025-10-09 10:02:33',
      level: 'debug',
      category: 'System',
      message: 'Background cleanup process started',
      user: 'System',
      source: 'Cleanup Service',
      details: 'Cleaning temp files, log rotation, cache optimization'
    },
    {
      id: 'log_008',
      timestamp: '2025-10-09 10:14:02',
      level: 'info',
      category: 'Data Erasure',
      message: 'Quick erase job 3423 started',
      user: 'charlie.wilson@company.com',
      source: 'Erase Engine',
      details: 'Device: Kingston USB 32GB, Method: Single Pass Overwrite'
    },
    {
      id: 'log_009',
      timestamp: '2025-10-09 10:20:45',
      level: 'warning',
      category: 'Authentication',
      message: 'Multiple failed login attempts detected',
      user: 'unknown@external.com',
      source: 'Auth Service',
      details: 'IP: 203.45.67.89, Attempts: 5, Time window: 10 minutes, Status: Blocked'
    },
    {
      id: 'log_010',
      timestamp: '2025-10-09 10:28:17',
      level: 'success',
      category: 'User Management',
      message: 'New user account created',
      user: 'admin@company.com',
      source: 'User Service',
      details: 'User: sarah.davis@company.com, Role: Operator, Department: IT'
    },
    {
      id: 'log_011',
      timestamp: '2025-10-09 10:35:54',
      level: 'error',
      category: 'System',
      message: 'Database connection timeout',
      user: 'System',
      source: 'Database Service',
      details: 'Host: db-primary.local, Timeout: 30s, Retries: 3, Status: Reconnected'
    },
    {
      id: 'log_012',
      timestamp: '2025-10-09 10:42:11',
      level: 'info',
      category: 'Backup',
      message: 'Daily backup completed',
      user: 'System',
      source: 'Backup Service',
      details: 'Size: 2.3GB, Duration: 12 minutes, Location: Azure Blob Storage'
    },
    {
      id: 'log_013',
      timestamp: '2025-10-09 10:48:29',
      level: 'warning',
      category: 'Performance',
      message: 'High memory usage detected',
      user: 'System',
      source: 'Monitor Service',
      details: 'Memory: 87%, Threshold: 85%, Services affected: 3, Auto-scaling triggered'
    },
    {
      id: 'log_014',
      timestamp: '2025-10-09 10:55:16',
      level: 'success',
      category: 'Data Erasure',
      message: 'Quick erase job 3423 completed successfully',
      user: 'charlie.wilson@company.com',
      source: 'Erase Engine',
      details: 'Device: Kingston USB 32GB, Duration: 41 minutes, Verification: Passed'
    },
    {
      id: 'log_015',
      timestamp: '2025-10-09 11:03:42',
      level: 'info',
      category: 'API',
      message: 'External API integration successful',
      user: 'integration@partner.com',
      source: 'API Gateway',
      details: 'Endpoint: /api/v1/erase-status, Method: GET, Response: 200 OK'
    }
  ], [])

  const uniqueLevels = useMemo(() => [...new Set(allLogs.map(log => log.level))], [allLogs])
  const uniqueCategories = useMemo(() => [...new Set(allLogs.map(log => log.category))], [allLogs])
  const uniqueDates = useMemo(() => [...new Set(allLogs.map(log => log.timestamp.split(' ')[0]))], [allLogs])

  const filtered = useMemo(() => {
    let result = allLogs.filter(log => {
      const matchesQuery = 
        log.message.toLowerCase().includes(query.toLowerCase()) ||
        log.category.toLowerCase().includes(query.toLowerCase()) ||
        log.user?.toLowerCase().includes(query.toLowerCase()) ||
        log.source.toLowerCase().includes(query.toLowerCase())
      
      const matchesLevel = !levelFilter || log.level === levelFilter
      const matchesCategory = !categoryFilter || log.category === categoryFilter
      const matchesDate = !dateFilter || log.timestamp.startsWith(dateFilter)
      
      return matchesQuery && matchesLevel && matchesCategory && matchesDate
    })

    // Sort by timestamp (newest first)
    result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    
    return result
  }, [allLogs, query, levelFilter, categoryFilter, dateFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const logs = filtered.slice((page-1)*pageSize, page*pageSize)

  const clearAllFilters = () => {
    setQuery('')
    setLevelFilter('')
    setCategoryFilter('')
    setDateFilter('')
    setPage(1)
  }

  const handleExportLogs = () => {
    exportToCsv('system-logs.csv', filtered.map(log => ({...log})))
    showSuccess(`Exported ${filtered.length} log entries`)
  }

  const handleRefreshLogs = () => {
    showInfo('Refreshing logs from system...')
    // Additional refresh logic can be added here
  }

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      showWarning('Log clearing is not implemented in demo mode')
      // Additional clear logic can be added here
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'debug': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return '🔴'
      case 'warning': return '🟡'
      case 'success': return '🟢'
      case 'info': return '🔵'
      case 'debug': return '⚪'
      default: return '⚫'
    }
  }
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/admin/logs" />
        <title>DSecureTech Admin Logs | System Activity & Security Monitoring</title>
        <meta
          name="description"
          content="Monitor system activity, data erasure jobs, user authentication, and security events with comprehensive logging and filtering capabilities."
        />
        <meta
          name="keywords"
          content="system logs, activity monitoring, data erasure logs, security monitoring, admin dashboard, compliance logging"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">System Logs</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRefreshLogs}
              className="text-sm px-3 py-1 text-blue-600 hover:text-blue-800 border border-blue-200 rounded hover:bg-blue-50 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
            <button 
              onClick={handleExportLogs}
              className="text-sm px-3 py-1 text-green-600 hover:text-green-800 border border-green-200 rounded hover:bg-green-50 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export ({filtered.length})
            </button>
            <button 
              onClick={handleClearLogs}
              className="text-sm px-3 py-1 text-red-600 hover:text-red-800 border border-red-200 rounded hover:bg-red-50 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear Logs
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search logs..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
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
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Dates</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div>
              Showing {filtered.length} of {allLogs.length} log entries
            </div>
            <div>
              Page {page} of {totalPages}
            </div>
          </div>
        </div>

        {/* Log Entries */}
        <div className="card">
          <div className="divide-y divide-slate-200">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{getLevelIcon(log.level)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(log.level)}`}>
                        {log.level.toUpperCase()}
                      </span>
                      <span className="text-sm font-medium text-slate-900">{log.category}</span>
                      <span className="text-sm text-slate-500">{log.timestamp}</span>
                      {log.user && (
                        <span className="text-sm text-slate-600">by {log.user}</span>
                      )}
                    </div>
                    
                    <div className="text-slate-800 mb-2">{log.message}</div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Source: {log.source}</span>
                      {log.details && (
                        <button 
                          onClick={() => setShowDetails(showDetails === log.id ? null : log.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {showDetails === log.id ? 'Hide Details' : 'Show Details'}
                        </button>
                      )}
                    </div>
                    
                    {showDetails === log.id && log.details && (
                      <div className="mt-3 p-3 bg-slate-100 rounded-lg text-sm text-slate-700">
                        <strong>Details:</strong> {log.details}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {logs.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              <div className="mb-2">
                <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>No logs found matching your criteria</div>
              <button 
                onClick={clearAllFilters}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Clear filters to show all logs
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              Showing {(page-1)*pageSize + 1} to {Math.min(page*pageSize, filtered.length)} of {filtered.length} entries
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
