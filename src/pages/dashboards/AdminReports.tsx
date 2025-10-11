import { useMemo, useState } from 'react'
import { exportToCsv, openPrintView } from '@/utils/csv'
import { Helmet } from 'react-helmet-async'
import { useNotification } from '@/contexts/NotificationContext'

interface Report {
  id: string
  date: string
  devices: number
  status: string
  department: string
}

export default function AdminReports() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [deviceRangeFilter, setDeviceRangeFilter] = useState('')
  const [showUniqueOnly, setShowUniqueOnly] = useState(false)
  const [sortBy, setSortBy] = useState<keyof Report>('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const pageSize = 5
  
  // Static data - no loading states needed
  const allRows: Report[] = useMemo(() => [
    { id: 'AR-2025-1001', date: '2025-09-01', devices: 25, status: 'completed', department: 'IT' },
    { id: 'AR-2025-1002', date: '2025-09-02', devices: 50, status: 'pending', department: 'HR' },
    { id: 'AR-2025-1003', date: '2025-09-03', devices: 75, status: 'completed', department: 'Finance' },
    { id: 'AR-2025-1004', date: '2025-09-04', devices: 100, status: 'failed', department: 'IT' },
    { id: 'AR-2025-1005', date: '2025-09-05', devices: 125, status: 'completed', department: 'Operations' },
  ], [])
  
  const uniqueStatuses = useMemo(() => [...new Set(allRows.map(r => r.status))], [allRows])
  const uniqueMonths = useMemo(() => [...new Set(allRows.map(r => r.date.substring(0, 7)))], [allRows])
  
  const filtered = useMemo(() => {
    let result = allRows.filter(r => {
      const matchesQuery = r.id.toLowerCase().includes(query.toLowerCase()) ||
                          r.department.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = !statusFilter || r.status === statusFilter
      const matchesDate = !dateFilter || r.date.startsWith(dateFilter)
      
      let matchesDeviceRange = true
      if (deviceRangeFilter) {
        if (deviceRangeFilter === '1-50') {
          matchesDeviceRange = r.devices >= 1 && r.devices <= 50
        } else if (deviceRangeFilter === '51-100') {
          matchesDeviceRange = r.devices >= 51 && r.devices <= 100
        } else if (deviceRangeFilter === '101-200') {
          matchesDeviceRange = r.devices >= 101 && r.devices <= 200
        } else if (deviceRangeFilter === '201-999') {
          matchesDeviceRange = r.devices >= 201
        }
      }
      
      return matchesQuery && matchesStatus && matchesDate && matchesDeviceRange
    })
    
    // Remove duplicates if requested
    if (showUniqueOnly) {
      const seen = new Set()
      result = result.filter(r => {
        const key = `${r.id}-${r.date}-${r.department}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }
    
    // Sort results
    result.sort((a, b) => {
      let aVal: any, bVal: any
      
      switch (sortBy) {
        case 'id':
          aVal = a.id
          bVal = b.id
          break
        case 'date':
          aVal = new Date(a.date)
          bVal = new Date(b.date)
          break
        case 'devices':
          aVal = a.devices
          bVal = b.devices
          break
        case 'status':
          aVal = a.status
          bVal = b.status
          break
        case 'department':
          aVal = a.department
          bVal = b.department
          break
        default:
          aVal = a.id
          bVal = b.id
      }
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }
      
      if (sortOrder === 'asc') {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0
      }
    })
    
    return result
  }, [allRows, query, statusFilter, dateFilter, deviceRangeFilter, showUniqueOnly, sortBy, sortOrder])
  
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const rows = filtered.slice((page-1)*pageSize, page*pageSize)
  
  const clearAllFilters = () => {
    setQuery('')
    setStatusFilter('')
    setDateFilter('')
    setDeviceRangeFilter('')
    setShowUniqueOnly(false)
    setPage(1)
  }

  // Action functions
  const handleViewReport = (report: Report) => {
    showInfo(`Opening report ${report.id}`)
    // Additional view logic can be added here
  }

  const handleDownloadReport = (report: Report) => {
    showSuccess(`Downloading report ${report.id}`)
    // Additional download logic can be added here
  }

  const handleDeleteReport = (report: Report) => {
    if (window.confirm(`Are you sure you want to delete report ${report.id}?`)) {
      showSuccess(`Report ${report.id} deleted successfully`)
      // Additional delete logic can be added here
    }
  }

  const handleRegenerateReport = (report: Report) => {
    if (report.status === 'pending') {
      showWarning(`Report ${report.id} is already being generated`)
      return
    }
    showSuccess(`Regenerating report ${report.id}`)
    // Additional regenerate logic can be added here
  }

  const handleShareReport = (report: Report) => {
    if (report.status !== 'completed') {
      showWarning(`Cannot share ${report.id} - report is not completed`)
      return
    }
    showInfo(`Sharing options for report ${report.id}`)
    // Additional sharing logic can be added here
  }

  return (
    <>
    <Helmet>
+      <link rel="canonical" href="https://dsecuretech.com/admin/reports" />
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
    <div className="space-y-4 xs:space-y-6 sm:space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 xs:p-6 sm:p-6">
      <div className="flex flex-col xs:flex-row sm:flex-row items-start xs:items-center sm:items-center justify-between gap-4">
        <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-slate-900">Audit Reports</h1>
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
                Connect to your backend API to see real audit reports from your database.
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
        
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
            <input 
              className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent" 
              placeholder="Search ID, department" 
              value={query} 
              onChange={(e)=>{setQuery(e.target.value); setPage(1)}} 
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select 
              className="w-full border rounded-lg px-3 py-2 text-sm xs:text-base sm:text-sm focus:ring-2 focus:ring-brand focus:border-transparent"
              value={statusFilter}
              onChange={(e)=>{setStatusFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Month</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={dateFilter}
              onChange={(e)=>{setDateFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Months</option>
              {uniqueMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>
          
          {/* Device Range Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Device Range</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={deviceRangeFilter}
              onChange={(e)=>{setDeviceRangeFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Ranges</option>
              <option value="1-50">1-50 devices</option>
              <option value="51-100">51-100 devices</option>
              <option value="101-200">101-200 devices</option>
              <option value="201-999">201+ devices</option>
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
              onChange={(e)=>setSortBy(e.target.value as keyof Report)}
            >
              <option value="id">Report ID</option>
              <option value="date">Date</option>
              <option value="devices">Devices</option>
              <option value="status">Status</option>
              <option value="department">Department</option>
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
        <button className="btn-secondary" onClick={()=>exportToCsv('reports.csv', filtered.map(r => ({...r})))}>Export All ({filtered.length})</button>
        <button className="btn-secondary" onClick={()=>exportToCsv('reports-page.csv', rows.map(r => ({...r})))}>Export Page ({rows.length})</button>
        <button className="btn-secondary" onClick={()=>{
          const body = `<h1>Audit Reports</h1>` +
            `<table border="1" style="border-collapse: collapse; width: 100%;"><thead><tr><th>Report ID</th><th>Date</th><th>Devices</th><th>Status</th><th>Department</th></tr></thead><tbody>`+
            filtered.map(r=>`<tr><td>${r.id}</td><td>${r.date}</td><td>${r.devices}</td><td>${r.status}</td><td>${r.department}</td></tr>`).join('')+
            `</tbody></table>`
          openPrintView('Audit Reports', body)
        }}>Print All ({filtered.length})</button>
      </div>

      {/* Table */}
      <div className="card-content card-table card overflow-x-auto">
        <table className="w-full text-nowrap min-w-[800px]">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">Report ID</th>
              <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">Date</th>
              <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">Devices</th>
              <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">Status</th>
              <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">Department</th>
              <th className="py-3 px-2 text-xs xs:text-sm sm:text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`${row.id}-${i}`} className="border-t hover:bg-slate-50">
                <td className="py-3 px-2 font-medium font-mono text-xs xs:text-sm sm:text-sm">{row.id}</td>
                <td className="py-3 px-2 text-xs xs:text-sm sm:text-sm">{row.date}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.devices >= 200 ? 'bg-purple-100 text-purple-800' :
                    row.devices >= 100 ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {row.devices}
                  </span>
                </td>
                <td className="py-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    row.status === 'completed' ? 'bg-green-100 text-green-800' :
                    row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    row.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      row.status === 'completed' ? 'bg-green-400' :
                      row.status === 'pending' ? 'bg-yellow-400' :
                      row.status === 'failed' ? 'bg-red-400' :
                      'bg-slate-400'
                    }`}></span>
                    {row.status}
                  </span>
                </td>
                <td className="py-2">{row.department}</td>
                <td className="py-2">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleViewReport(row)}
                      className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                      title="View Report"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleDownloadReport(row)}
                      className={`text-xs px-2 py-1 rounded border ${
                        row.status === 'completed' 
                          ? 'text-green-600 hover:text-green-800 border-green-200 hover:bg-green-50' 
                          : 'text-slate-400 border-slate-200 cursor-not-allowed'
                      }`}
                      disabled={row.status !== 'completed'}
                      title={row.status !== 'completed' ? 'Report not ready for download' : 'Download Report'}
                    >
                      Download
                    </button>
                    <button 
                      onClick={() => handleShareReport(row)}
                      className={`text-xs px-2 py-1 rounded border ${
                        row.status === 'completed' 
                          ? 'text-purple-600 hover:text-purple-800 border-purple-200 hover:bg-purple-50' 
                          : 'text-slate-400 border-slate-200 cursor-not-allowed'
                      }`}
                      disabled={row.status !== 'completed'}
                      title={row.status !== 'completed' ? 'Report not ready for sharing' : 'Share Report'}
                    >
                      Share
                    </button>
                    {/* <button 
                      onClick={() => handleRegenerateReport(row)}
                      className={`text-xs px-2 py-1 rounded border ${
                        row.status === 'pending' 
                          ? 'text-slate-400 border-slate-200 cursor-not-allowed' 
                          : 'text-orange-600 hover:text-orange-800 border-orange-200 hover:bg-orange-50'
                      }`}
                      disabled={row.status === 'pending'}
                      title={row.status === 'pending' ? 'Report is being generated' : 'Regenerate Report'}
                    >
                      Regenerate
                    </button>
                    <button 
                      onClick={() => handleDeleteReport(row)}
                      className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                      title="Delete Report"
                    >
                      Delete
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
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


