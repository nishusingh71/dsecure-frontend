import { useMemo, useState } from 'react'
import { exportToCsv } from '@/utils/csv'
import { Helmet } from 'react-helmet-async'
import { useNotification } from '@/contexts/NotificationContext'

import { AdminDashboardAPI, Machine } from '@/services/adminDashboardAPI'
import { useEffect } from 'react'

export default function AdminMachines() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [eraseFilter, setEraseFilter] = useState('')
  const [licenseFilter, setLicenseFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showUniqueOnly, setShowUniqueOnly] = useState(false)
  const [sortBy, setSortBy] = useState<keyof Machine>('hostname')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [allRows, setAllRows] = useState<Machine[]>([])
  const [loading, setLoading] = useState(true)
  const pageSize = 5
  
  // Load machines data on component mount
  useEffect(() => {
    loadMachinesData()
  }, [])

  const loadMachinesData = async () => {
    setLoading(true)
    try {
      const response = await AdminDashboardAPI.getMachines()
      if (response.success) {
        setAllRows(response.data)
      } else {
        throw new Error(response.error || 'Failed to load machines')
      }
    } catch (error) {
      console.error('Error loading machines:', error)
      showError('Data Loading Error', 'Failed to load machine data. Using default values.')
    } finally {
      setLoading(false)
    }
  }


  
  const uniqueEraseOptions = useMemo(() => [...new Set(allRows.map(r => r.eraseOption))], [allRows])
  const uniqueLicenses = useMemo(() => [...new Set(allRows.map(r => r.license))], [allRows])
  const uniqueStatuses = useMemo(() => [...new Set(allRows.map(r => r.status))], [allRows])
  
  const filtered = useMemo(() => {
    let result = allRows.filter(r => {
      const matchesQuery = r.hostname.toLowerCase().includes(query.toLowerCase()) ||
                          r.eraseOption.toLowerCase().includes(query.toLowerCase()) ||
                          r.license.toLowerCase().includes(query.toLowerCase())
      const matchesErase = !eraseFilter || r.eraseOption === eraseFilter
      const matchesLicense = !licenseFilter || r.license === licenseFilter
      const matchesStatus = !statusFilter || r.status === statusFilter
      return matchesQuery && matchesErase && matchesLicense && matchesStatus
    })
    
    // Remove duplicates if requested
    if (showUniqueOnly) {
      const seen = new Set()
      result = result.filter(r => {
        const key = `${r.hostname}-${r.eraseOption}-${r.license}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }
    
    // Sort results
    result.sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a]
      const bVal = b[sortBy as keyof typeof b]
      const comparison = aVal.localeCompare(bVal)
      return sortOrder === 'asc' ? comparison : -comparison
    })
    
    return result
  }, [allRows, query, eraseFilter, licenseFilter, statusFilter, showUniqueOnly, sortBy, sortOrder])
  
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const rows = filtered.slice((page-1)*pageSize, page*pageSize)
  
  const clearAllFilters = () => {
    setQuery('')
    setEraseFilter('')
    setLicenseFilter('')
    setStatusFilter('')
    setShowUniqueOnly(false)
    setPage(1)
  }

  // Action functions
  const handleViewDetails = (machine: Machine) => {
    showInfo(`Viewing details for ${machine.hostname}`)
    // Additional view logic can be added here
  }

  const handleEditMachine = async (machine: Machine) => {
    showInfo(`Edit mode enabled for ${machine.hostname}`)
    // You can implement a modal or redirect to edit page here
  }

  const handleDeleteMachine = async (machine: Machine) => {
    if (window.confirm(`Are you sure you want to delete ${machine.hostname}?`)) {
      try {
        const response = await AdminDashboardAPI.deleteMachine(machine.hostname)
        if (response.success) {
          showSuccess(`Machine ${machine.hostname} deleted successfully`)
          await loadMachinesData() // Refresh the list
        } else {
          throw new Error(response.error || 'Failed to delete machine')
        }
      } catch (error) {
        console.error('Error deleting machine:', error)
        showError('Delete Failed', 'Failed to delete machine. Please try again.')
      }
    }
  }

  const handleRestartMachine = async (machine: Machine) => {
    if (machine.status === 'offline') {
      showWarning(`Cannot restart ${machine.hostname} - machine is offline`)
      return
    }
    try {
      const response = await AdminDashboardAPI.restartMachine(machine.hostname)
      if (response.success) {
        showSuccess(`Restart initiated for ${machine.hostname}`)
        await loadMachinesData() // Refresh the list to show updated status
      } else {
        throw new Error(response.error || 'Failed to restart machine')
      }
    } catch (error) {
      console.error('Error restarting machine:', error)
      showError('Restart Failed', 'Failed to restart machine. Please try again.')
    }
  }

  const handleRunErase = async (machine: Machine) => {
    if (machine.status === 'offline') {
      showWarning(`Cannot run erase on ${machine.hostname} - machine is offline`)
      return
    }
    try {
      const response = await AdminDashboardAPI.runErase(machine.hostname)
      if (response.success) {
        showSuccess(`${machine.eraseOption} initiated on ${machine.hostname}`)
        await loadMachinesData() // Refresh the list to show updated status
      } else {
        throw new Error(response.error || 'Failed to run erase')
      }
    } catch (error) {
      console.error('Error running erase:', error)
      showError('Erase Failed', 'Failed to initiate erase. Please try again.')
    }
  }
  return (
    <>
    <Helmet>
+      <link rel="canonical" href="https://dsecuretech.com/admin/machines" />
          <title>D-SecureTech Compliance | Data Erasure Standards & Regulations</title>
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
    <div className="space-y-4 xs:space-y-6 sm:space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 xs:p-6 sm:p-6">
      <div className="flex flex-col xs:flex-row sm:flex-row items-start xs:items-center sm:items-center justify-between gap-4">
        <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-slate-900">Machines</h1>
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
                Connect to your backend API to see real machine data from your database.
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
              className="w-full border rounded px-3 py-2 text-sm" 
              placeholder="Search hostname, erase option, license" 
              value={query} 
              onChange={(e)=>{setQuery(e.target.value); setPage(1)}} 
            />
          </div>
          
          {/* Erase Option Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Erase Option</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={eraseFilter}
              onChange={(e)=>{setEraseFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Options</option>
              {uniqueEraseOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          {/* License Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">License</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={licenseFilter}
              onChange={(e)=>{setLicenseFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Licenses</option>
              {uniqueLicenses.map(license => (
                <option key={license} value={license}>{license}</option>
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
              onChange={(e)=>setSortBy(e.target.value as keyof Machine)}
            >
              <option value="hostname">Hostname</option>
              <option value="eraseOption">Erase Option</option>
              <option value="license">License</option>
              <option value="status">Status</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-2 py-1 border rounded text-sm hover:bg-slate-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          
          <div className="text-sm text-slate-600">
            Showing {filtered.length} of {allRows.length} records
          </div>
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex justify-end gap-2">
        <button className="btn-secondary" onClick={()=>exportToCsv('machines.csv', filtered.map(m => ({...m})))}>Export All ({filtered.length})</button>
        <button className="btn-secondary" onClick={()=>exportToCsv('machines-page.csv', rows.map(m => ({...m})))}>Export Page ({rows.length})</button>
      </div>

      {/* Table */}
      <div className="card-content card-table card">
        <table className="w-full text-nowrap">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Hostname</th>
              <th className="py-2">Erase Option</th>
              <th className="py-2">License</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={`${row.hostname}-${i}`} className="border-t hover:bg-slate-50">
                <td className="py-2 font-medium">{row.hostname}</td>
                <td className="py-2">{row.eraseOption}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.license === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                    row.license === 'Premium' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {row.license}
                  </span>
                </td>
                <td className="py-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    row.status === 'online' ? 'bg-green-100 text-green-800' :
                    row.status === 'offline' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      row.status === 'online' ? 'bg-green-400' :
                      row.status === 'offline' ? 'bg-red-400' :
                      'bg-yellow-400'
                    }`}></span>
                    {row.status}
                  </span>
                </td>
                <td className="py-2">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleViewDetails(row)}
                      className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                      title="View Details"
                    >
                      View
                    </button>
                    {/* <button 
                      onClick={() => handleEditMachine(row)}
                      className="text-slate-600 hover:text-slate-800 text-xs px-2 py-1 rounded border border-slate-200 hover:bg-slate-50"
                      title="Edit Machine"
                    >
                      Edit
                    </button> */}
                    <button 
                      onClick={() => handleRunErase(row)}
                      className={`text-xs px-2 py-1 rounded border ${
                        row.status === 'offline' 
                          ? 'text-slate-400 border-slate-200 cursor-not-allowed' 
                          : 'text-purple-600 hover:text-purple-800 border-purple-200 hover:bg-purple-50'
                      }`}
                      disabled={row.status === 'offline'}
                      title={row.status === 'offline' ? 'Machine offline' : 'Run Erase'}
                    >
                      Erase
                    </button>
                    {/* <button 
                      onClick={() => handleRestartMachine(row)}
                      className={`text-xs px-2 py-1 rounded border ${
                        row.status === 'offline' 
                          ? 'text-slate-400 border-slate-200 cursor-not-allowed' 
                          : 'text-green-600 hover:text-green-800 border-green-200 hover:bg-green-50'
                      }`}
                      disabled={row.status === 'offline'}
                      title={row.status === 'offline' ? 'Machine offline' : 'Restart Machine'}
                    >
                      Restart
                    </button> */}
                    {/* <button 
                      onClick={() => handleDeleteMachine(row)}
                      className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded border border-red-200 hover:bg-red-50"
                      title="Delete Machine"
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


