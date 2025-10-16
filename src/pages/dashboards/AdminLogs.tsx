import { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { exportToCsv } from '@/utils/csv'
import { useNotification } from '@/contexts/NotificationContext'

import { AdminDashboardAPI, LogEntry } from '@/services/adminDashboardAPI'
import { useEffect } from 'react'

export default function AdminLogs() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [levelFilter, setLevelFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [allLogs, setAllLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const pageSize = 20

  // Load logs data on component mount
  useEffect(() => {
    loadLogsData()
  }, [])

  const loadLogsData = async () => {
    setLoading(true)
    try {
      const response = await AdminDashboardAPI.getLogs()
      if (response.success) {
        setAllLogs(response.data)
      } else {
        throw new Error(response.error || 'Failed to load logs')
      }
    } catch (error) {
      console.error('Error loading logs:', error)
      showError('Data Loading Error', 'Failed to load log data. Using default values.')
      // Fallback is handled by the API service
    } finally {
      setLoading(false)
    }
  }



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

  const handleClearLogs = async () => {
    if (window.confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      try {
        const response = await AdminDashboardAPI.clearLogs()
        if (response.success) {
          showSuccess('Logs cleared successfully')
          await loadLogsData() // Refresh the logs
        } else {
          throw new Error(response.error || 'Failed to clear logs')
        }
      } catch (error) {
        console.error('Error clearing logs:', error)
        showError('Clear Failed', 'Failed to clear logs. Please try again.')
      }
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
