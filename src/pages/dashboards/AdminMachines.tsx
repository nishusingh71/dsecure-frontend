import { useMemo, useState } from 'react'
import { exportToCsv } from '@/utils/csv'
import { Helmet } from 'react-helmet-async'
import { useNotification } from '@/contexts/NotificationContext'

import { Machine } from '@/utils/enhancedApiClient'
import { useEffect } from 'react'
import { apiClient } from '@/utils/enhancedApiClient'
import { authService } from '@/utils/authService'

// UI Machine interface for table display
interface UIMachine {
  hostname: string
  eraseOption: string
  license: string
  status: string
  machineId?: string
  userEmail?: string
  licenseActivated?: boolean
  osVersion?: string
  vmStatus?: string
  totalLicenses?: number  // Total licenses available for this machine
}

export default function AdminMachines() {
  const { showSuccess, showError, showWarning, showInfo } = useNotification()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [eraseFilter, setEraseFilter] = useState('')
  const [licenseFilter, setLicenseFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showUniqueOnly, setShowUniqueOnly] = useState(false)
  const [sortBy, setSortBy] = useState<keyof UIMachine>('hostname')
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
  
  // Initialize with cached data if available
  const [allRows, setAllRows] = useState<UIMachine[]>(() => getCachedData('machines') || [])
  const [loading, setLoading] = useState(true)
  const pageSize = 5
  
  // Load machines data on component mount
  useEffect(() => {
    loadMachinesData()
  }, [])

  const loadMachinesData = async () => {
    setLoading(true)
    
    // ✅ Check cache first for instant display
    const cachedMachines = getCachedData('machines');
    if (cachedMachines && cachedMachines.length > 0) {
      console.log('⚡ Displaying cached machines data');
      setAllRows(cachedMachines);
      setLoading(false); // Hide loader since we have cached data
    }
    
    try {
      // Get user email - EXACT SAME PATTERN AS AdminDashboard
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
      
      // 2. Get user from JWT token
      const user = authService.getUserFromToken()
      console.log('👤 User from token:', user)
      
      // 3. PRIORITY: Use user_email from localStorage user_data, then from token
      const userEmail = storedUserData?.user_email || user?.user_email || user?.email
      console.log('📧 Final userEmail for machines:', userEmail)
      
      if (!userEmail) {
        console.error('❌ No user email found')
        showError('Authentication Error', 'No user email found. Please login again.')
        setAllRows([])
        setLoading(false)
        return
      }

      console.log('🖥️ Fetching machines for email:', userEmail)
      
      // Try to fetch machines by email first
      let machinesRes = await apiClient.getMachinesByEmail(userEmail)
      console.log('📥 Machines API Response:', machinesRes)
      console.log('📥 Full Response Object:', JSON.stringify(machinesRes, null, 2))
      
      // Smart fallback: If 404 or error, try getting all machines
      if (!machinesRes.success || machinesRes.error) {
        console.warn('⚠️ Primary endpoint failed, falling back to /api/Machines')
        console.warn('⚠️ Error was:', machinesRes.error)
        showWarning('API Fallback', 'Using alternate data source for machines')
        
        const allMachinesRes = await apiClient.getMachines()
        console.log('📥 All Machines Response:', allMachinesRes)
        console.log('📥 All Machines Data Count:', allMachinesRes.data?.length || 0)
        
        if (allMachinesRes.success && allMachinesRes.data) {
          console.log('🔍 Sample machine data:', JSON.stringify(allMachinesRes.data[0], null, 2))
          
          // Filter machines by user email (case-insensitive)
          const userMachines = allMachinesRes.data.filter(
            (machine: Machine) => {
              const machineEmail = machine.user_email?.toLowerCase() || ''
              const subEmail = machine.subuser_email?.toLowerCase() || ''
              const targetEmail = userEmail.toLowerCase()
              
              console.log(`🔍 Checking machine: ${machine.machine_id}, user_email: ${machineEmail}, subuser_email: ${subEmail}`)
              
              return machineEmail === targetEmail || subEmail === targetEmail
            }
          )
          machinesRes = { success: true, data: userMachines }
          console.log(`✅ Filtered ${userMachines.length} machines from ${allMachinesRes.data.length} total`)
          console.log(`✅ Filtered machines:`, userMachines)
        } else {
          console.error('❌ Failed to fetch all machines:', allMachinesRes.error)
        }
      }
      
      if (machinesRes.success && machinesRes.data) {
        console.log('✅ Final Machines fetched:', machinesRes.data.length)
        console.log('✅ Machines data:', machinesRes.data)
        
        // If no machines found, set empty array
        if (machinesRes.data.length === 0) {
          console.log('ℹ️ No machines found for this user')
          showInfo('No Machines', 'No machines found for your account')
          setAllRows([])
          setLoading(false)
          return
        }
        
        // Map API data to UI format
        const uiMachines: UIMachine[] = machinesRes.data.map((machine: Machine) => {
          // Generate hostname from available data
          const hostname = machine.hostname || 
                          machine.mac_address || 
                          machine.fingerprint_hash?.substring(0, 12) || 
                          'Unknown Device'
          
          // Parse license_details_json to extract detailed information
          let licenseDetails: any = null
          let eraseOption = 'Standard Erase'
          
          if (machine.license_details_json) {
            try {
              licenseDetails = JSON.parse(machine.license_details_json)
              console.log('📄 Parsed license_details_json for machine:', machine.machine_id, licenseDetails)
              
              // Extract erase option from license details
              if (licenseDetails.erase_option) {
                eraseOption = licenseDetails.erase_option
              } else if (licenseDetails.features?.includes('advanced')) {
                eraseOption = 'Advanced Erase'
              } else if (licenseDetails.features?.includes('secure')) {
                eraseOption = 'Secure Erase'
              } else if (licenseDetails.license_type) {
                eraseOption = licenseDetails.license_type
              }
            } catch (error) {
              console.warn('⚠️ Failed to parse license_details_json:', error)
            }
          }
          
          // Determine license status from license_details_json or machine fields
          let license = 'No License'
          let licenseLength = 0 // License validity in days
          
          if (machine.license_activated) {
            // Calculate license length/validity
            if (licenseDetails?.valid_until) {
              const validUntil = new Date(licenseDetails.valid_until)
              const now = new Date()
              licenseLength = Math.ceil((validUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
            } else if (machine.license_days_valid) {
              licenseLength = machine.license_days_valid
            }
            
            // Set license display text with length
            if (licenseDetails?.license_key) {
              license = licenseLength > 0 
                ? `Licensed (${licenseLength}d) - ${licenseDetails.license_key.substring(0, 8)}...`
                : `Licensed - ${licenseDetails.license_key.substring(0, 8)}...`
            } else if (licenseDetails?.plan_name) {
              license = licenseLength > 0
                ? `${licenseDetails.plan_name} (${licenseLength}d)`
                : licenseDetails.plan_name
            } else if (machine.demo_usage_count && machine.demo_usage_count > 0) {
              license = `Demo (${machine.demo_usage_count} uses)`
            } else {
              license = licenseLength > 0 ? `Licensed (${licenseLength}d)` : 'Licensed'
            }
          } else if (licenseDetails?.status) {
            license = licenseDetails.status
          }
          
          // Determine status from license_details_json or machine fields
          let status = 'Inactive'
          if (machine.license_activated) {
            // Check license validity from license_details_json first
            if (licenseDetails?.valid_until) {
              const validUntil = new Date(licenseDetails.valid_until)
              const now = new Date()
              if (validUntil > now) {
                const daysLeft = Math.ceil((validUntil.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
                status = `Active (${daysLeft}d left)`
              } else {
                status = 'Expired'
              }
            } else if (machine.license_days_valid && machine.license_days_valid > 0) {
              status = `Active (${machine.license_days_valid}d left)`
            } else if (machine.license_days_valid === 0) {
              status = 'Expired'
            } else {
              status = 'Active'
            }
          } else if (licenseDetails?.active === false) {
            status = 'Inactive'
          }
          
          // Add VM status to status if available
          if (machine.vm_status) {
            status = `${status} (VM: ${machine.vm_status})`
          }
          
          // Extract total licenses from license_details_json
          let totalLicenses = 1 // Default to 1 license per machine
          if (licenseDetails?.total_licenses) {
            totalLicenses = licenseDetails.total_licenses
          } else if (licenseDetails?.license_count) {
            totalLicenses = licenseDetails.license_count
          }
          
          return {
            hostname,
            eraseOption,
            license,
            status,
            machineId: machine.machine_id || machine.id,
            userEmail: machine.user_email || machine.subuser_email,
            licenseActivated: machine.license_activated,
            osVersion: machine.os_version,
            vmStatus: machine.vm_status,
            totalLicenses
          }
        })
        
        console.log('✅ Mapped machines:', uiMachines)
        setAllRows(uiMachines)
        setCachedData('machines', uiMachines) // ✅ Cache API data
      } else {
        console.error('❌ API call failed:', machinesRes.error)
        throw new Error(machinesRes.error || 'Failed to load machines from API')
      }
    } catch (error) {
      console.error('❌ Error loading machines:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      showError('Data Loading Error', `Failed to load machine data: ${errorMessage}`)
      setAllRows([])
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
                          r.license.toLowerCase().includes(query.toLowerCase()) ||
                          (r.userEmail && r.userEmail.toLowerCase().includes(query.toLowerCase())) ||
                          (r.osVersion && r.osVersion.toLowerCase().includes(query.toLowerCase()))
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
      const aVal = String(a[sortBy as keyof typeof a] || '')
      const bVal = String(b[sortBy as keyof typeof b] || '')
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
  const handleViewDetails = (machine: UIMachine) => {
    showInfo(`Viewing details for ${machine.hostname}`, `
      Machine ID: ${machine.machineId || 'N/A'}
      User: ${machine.userEmail || 'N/A'}
      OS: ${machine.osVersion || 'N/A'}
      License: ${machine.license}
      Status: ${machine.status}
    `)
  }

  const handleEditMachine = async (machine: UIMachine) => {
    showInfo(`Edit mode enabled for ${machine.hostname}`)
    // You can implement a modal or redirect to edit page here
  }

  const handleDeleteMachine = async (machine: UIMachine) => {
    if (window.confirm(`Are you sure you want to delete ${machine.hostname}?`)) {
      try {
        showInfo('Delete Machine', 'Machine deletion feature will be implemented with backend API')
        // TODO: Implement delete API endpoint
        // const response = await apiClient.deleteMachine(machine.machineId)
        // if (response.success) {
        //   showSuccess(`Machine ${machine.hostname} deleted successfully`)
        //   await loadMachinesData() // Refresh the list
        // }
      } catch (error) {
        console.error('Error deleting machine:', error)
        showError('Delete Failed', 'Failed to delete machine. Please try again.')
      }
    }
  }

  const handleRestartMachine = async (machine: UIMachine) => {
    if (machine.status.includes('Inactive') || machine.status.includes('Expired')) {
      showWarning(`Cannot restart ${machine.hostname} - machine is ${machine.status}`)
      return
    }
    try {
      showInfo('Restart Machine', `Restart initiated for ${machine.hostname}`)
      // TODO: Implement restart API endpoint
      // const response = await apiClient.restartMachine(machine.machineId)
      // if (response.success) {
      //   showSuccess(`Restart initiated for ${machine.hostname}`)
      //   await loadMachinesData() // Refresh the list
      // }
    } catch (error) {
      console.error('Error restarting machine:', error)
      showError('Restart Failed', 'Failed to restart machine. Please try again.')
    }
  }

  const handleRunErase = async (machine: UIMachine) => {
    if (machine.status.includes('Inactive') || machine.status.includes('Expired')) {
      showWarning(`Cannot run erase on ${machine.hostname} - machine is ${machine.status}`)
      return
    }
    try {
      showInfo('Run Erase', `${machine.eraseOption} initiated on ${machine.hostname}`)
      // TODO: Implement erase API endpoint
      // const response = await apiClient.runErase(machine.machineId, machine.eraseOption)
      // if (response.success) {
      //   showSuccess(`${machine.eraseOption} initiated on ${machine.hostname}`)
      //   await loadMachinesData() // Refresh the list
      // }
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
              onChange={(e)=>setSortBy(e.target.value as keyof UIMachine)}
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


