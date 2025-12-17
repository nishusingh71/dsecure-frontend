import { useMemo, useState } from 'react'
import { exportToCsv } from '@/utils/csv'
import { Helmet } from 'react-helmet-async'
import { useNotification } from '@/contexts/NotificationContext'

import { Machine } from '@/utils/enhancedApiClient'
import { useEffect } from 'react'
import { apiClient } from '@/utils/enhancedApiClient'
import { authService } from '@/utils/authService'
import { isDemoMode, DEMO_MACHINES } from '@/data/demoData'

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
  fingerprintHash?: string  // Machine fingerprint hash
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
          // console.log(`✅ Using cached data for ${key}`);
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
      // console.log(`💾 Cached data for ${key}`);
    } catch (e) {
      console.warn(`⚠️ Cache write error for ${key}:`, e);
    }
  };
  
  // Initialize with cached data if available
  const [allRows, setAllRows] = useState<UIMachine[]>(() => getCachedData('machines') || [])
  const [loading, setLoading] = useState(true)
  const [selectedMachineIds, setSelectedMachineIds] = useState<Set<string>>(new Set())
  const [selectedMachineForModal, setSelectedMachineForModal] = useState<UIMachine | null>(null)
  const [selectedMachinesForModal, setSelectedMachinesForModal] = useState<UIMachine[]>([])
  const [showModal, setShowModal] = useState(false)
  const [isBulkView, setIsBulkView] = useState(false)
  const pageSize = 5
  
  // Load machines data on component mount
  useEffect(() => {
    loadMachinesData()
  }, [])

  const loadMachinesData = async () => {
    setLoading(true)
    
    // 🎮 Demo Mode Check - Show static data only
    if (isDemoMode()) {
      // console.log('🎮 Demo Mode Active - Using static machines data')
      setAllRows(DEMO_MACHINES)
      setLoading(false)
      return
    }
    
    // ✅ Check cache first for instant display
    const cachedMachines = getCachedData('machines');
    if (cachedMachines && cachedMachines.length > 0) {
      // console.log('⚡ Displaying cached machines data');
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
          // console.log('💾 Parsed user_data from localStorage:', storedUserData);
        } catch (e) {
          console.error('Error parsing user_data:', e);
        }
      }
      
      if (!storedUserData && authUser) {
        try {
          storedUserData = JSON.parse(authUser);
          // console.log('💾 Parsed authUser from localStorage:', storedUserData);
        } catch (e) {
          console.error('Error parsing authUser:', e);
        }
      }
      
      // 2. Get user from JWT token
      const user = authService.getUserFromToken()
      // console.log('👤 User from token:', user)
      
      // 3. PRIORITY: Use user_email from localStorage user_data, then from token
      const userEmail = storedUserData?.user_email || user?.user_email || user?.email
      // console.log('📧 Final userEmail for machines:', userEmail)
      
      if (!userEmail) {
        console.error('❌ No user email found')
        showError('Authentication Error', 'No user email found. Please login again.')
        setAllRows([])
        setLoading(false)
        return
      }

      // console.log('🖥️ Fetching machines for email:', userEmail)
      
      // Try to fetch machines by email first
      let machinesRes = await apiClient.getMachinesByEmail(userEmail)
      // console.log('📥 Machines API Response:', machinesRes)
      // console.log('📥 Full Response Object:', JSON.stringify(machinesRes, null, 2))
      
      // Smart fallback: If 404 or error, try getting all machines
      if (!machinesRes.success || machinesRes.error) {
        console.warn('⚠️ Primary endpoint failed, falling back to /api/Machines')
        console.warn('⚠️ Error was:', machinesRes.error)
        showWarning('API Fallback', 'Using alternate data source for machines')
        
        const allMachinesRes = await apiClient.getMachines()
        // console.log('📥 All Machines Response:', allMachinesRes)
        // console.log('📥 All Machines Data Count:', allMachinesRes.data?.length || 0)
        
        if (allMachinesRes.success && allMachinesRes.data) {
          // console.log('🔍 Sample machine data:', JSON.stringify(allMachinesRes.data[0], null, 2))
          
          // Filter machines by user email (case-insensitive)
          const userMachines = allMachinesRes.data.filter(
            (machine: Machine) => {
              const machineEmail = machine.user_email?.toLowerCase() || ''
              const subEmail = machine.subuser_email?.toLowerCase() || ''
              const targetEmail = userEmail.toLowerCase()
              
              // console.log(`🔍 Checking machine: ${machine.machine_id}, user_email: ${machineEmail}, subuser_email: ${subEmail}`)
              
              return machineEmail === targetEmail || subEmail === targetEmail
            }
          )
          machinesRes = { success: true, data: userMachines }
          // console.log(`✅ Filtered ${userMachines.length} machines from ${allMachinesRes.data.length} total`)
          // console.log(`✅ Filtered machines:`, userMachines)
        } else {
          console.error('❌ Failed to fetch all machines:', allMachinesRes.error)
        }
      }
      
      if (machinesRes.success && machinesRes.data) {
        // console.log('✅ Final Machines fetched:', machinesRes.data.length)
        // console.log('✅ Machines data:', machinesRes.data)
        
        // If no machines found, set empty array
        if (machinesRes.data.length === 0) {
          // console.log('ℹ️ No machines found for this user')
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
              // console.log('📄 Parsed license_details_json for machine:', machine.machine_id, licenseDetails)
              
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
            totalLicenses,
            fingerprintHash: machine.fingerprint_hash
          }
        })
        
        // console.log('✅ Mapped machines:', uiMachines)
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

  // ✅ Toggle individual machine selection
  const toggleMachineSelection = (machineId: string) => {
    const newSelection = new Set(selectedMachineIds)
    if (newSelection.has(machineId)) {
      newSelection.delete(machineId)
    } else {
      newSelection.add(machineId)
    }
    // console.log('🔄 Selection updated:', newSelection.size, 'machines selected')
    setSelectedMachineIds(newSelection)
  }

  // ✅ Toggle all machines on current page
  const toggleSelectAll = (currentPageMachines: UIMachine[]) => {
    const currentPageIds = currentPageMachines.map((m) => m.machineId || m.hostname).filter(Boolean)
    const allSelected = currentPageIds.every((id) => selectedMachineIds.has(id))

    const newSelection = new Set(selectedMachineIds)
    if (allSelected) {
      // Deselect all on current page
      currentPageIds.forEach((id) => newSelection.delete(id))
    } else {
      // Select all on current page
      currentPageIds.forEach((id) => newSelection.add(id))
    }
    // console.log('🔄 Select All updated:', newSelection.size, 'machines selected')
    setSelectedMachineIds(newSelection)
  }

  // Action functions
  const handleViewDetails = (machine: UIMachine) => {
    setSelectedMachineForModal(machine)
    setSelectedMachinesForModal([])
    setIsBulkView(false)
    setShowModal(true)
  }

  const handleEditMachine = async (machine: UIMachine) => {
    showInfo(`Edit mode enabled for ${machine.hostname}`)
    // You can implement a modal or redirect to edit page here
  }

  const handleDeleteMachine = async (machine: UIMachine) => {
    // Show confirmation using toast instead of prompt
    showInfo(
      `Delete Confirmation`, 
      `Ready to delete ${machine.hostname}. This action cannot be undone. Click "Delete" again to confirm.`
    )
    
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

  // ✅ Bulk Erase Multiple Machines
  const handleBulkErase = async () => {
    if (selectedMachineIds.size === 0) {
      showWarning('No Machines Selected', 'Please select at least one machine to erase')
      return
    }

    // Get selected machines
    const selectedMachines = allRows.filter((machine) =>
      selectedMachineIds.has(machine.machineId || machine.hostname)
    )

    // Check if any selected machines are inactive or expired
    const inactiveMachines = selectedMachines.filter((machine) =>
      machine.status.includes('Inactive') || machine.status.includes('Expired')
    )

    if (inactiveMachines.length > 0) {
      showWarning(
        'Some Machines Inactive',
        `${inactiveMachines.length} selected machines are inactive/expired and will be skipped`
      )
    }

    const activeMachines = selectedMachines.filter((machine) =>
      !machine.status.includes('Inactive') && !machine.status.includes('Expired')
    )

    if (activeMachines.length === 0) {
      showError('No Active Machines', 'All selected machines are inactive or expired')
      return
    }

    // Show confirmation using toast instead of prompt
    const machinesList = activeMachines.map(m => `${m.hostname} (${m.eraseOption})`).join(', ')
    showInfo(
      `Bulk Erase Confirmation`, 
      `Ready to erase ${activeMachines.length} machines: ${machinesList}. Click "Erase Selected" again to confirm.`
    )

    try {
      showInfo(`Bulk Erase Started`, `Initiating erase on ${activeMachines.length} machines...`)

      let successCount = 0
      let failedCount = 0

      // Process each machine
      for (const machine of activeMachines) {
        try {
          // TODO: Implement actual bulk erase API endpoint
          // const response = await apiClient.runErase(machine.machineId, machine.eraseOption)
          // if (response.success) {
          //   successCount++
          // } else {
          //   failedCount++
          // }

          // Simulate API call for now
          await new Promise(resolve => setTimeout(resolve, 500))
          successCount++
        } catch (error) {
          console.error(`Error erasing machine ${machine.hostname}:`, error)
          failedCount++
        }
      }

      // Clear selection
      setSelectedMachineIds(new Set())

      if (failedCount > 0) {
        showWarning(
          'Partial Success',
          `Erase initiated on ${successCount} machines. ${failedCount} failed.`
        )
      } else {
        showSuccess(`Bulk Erase Complete`, `Successfully initiated erase on ${successCount} machines`)
      }

      // Refresh the list
      await loadMachinesData()
    } catch (error) {
      console.error('Error in bulk erase:', error)
      showError('Bulk Erase Failed', 'Failed to initiate bulk erase. Please try again.')
    }
  }

  // ✅ Bulk View Details
  const handleBulkViewDetails = () => {
    if (selectedMachineIds.size === 0) {
      showWarning('No Machines Selected', 'Please select at least one machine to view details')
      return
    }

    const selectedMachines = allRows.filter((machine) =>
      selectedMachineIds.has(machine.machineId || machine.hostname)
    )

    // Use the same modal for bulk view
    setSelectedMachinesForModal(selectedMachines)
    setIsBulkView(true)
    setShowModal(true)
  }
  
  // Modal Component
  // Modal Component
  const MachineDetailsModal = () => {
    if (!showModal || (!selectedMachineForModal && !isBulkView)) return null

    // Determine which machines to display
    const machinesToShow = isBulkView 
      ? selectedMachinesForModal 
      : selectedMachineForModal ? [selectedMachineForModal] : []
    
    const modalTitle = isBulkView 
      ? `Bulk Machine Analysis - ${machinesToShow.length} machines` 
      : `Machine Details - ${selectedMachineForModal?.hostname}`

    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-start justify-center z-50 p-4">
        <div className="bg-black rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-600 shadow-2xl">
          {/* Terminal Header - like cmd window */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <h2 className="text-sm font-mono text-gray-200">
                {modalTitle} - Administrator: Command Prompt
              </h2>
            </div>
            <button
              onClick={() => {
                setShowModal(false)
                setIsBulkView(false)
                setSelectedMachinesForModal([])
                setSelectedMachineForModal(null)
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Terminal Content */}
          <div className="bg-black text-green-400 font-mono text-sm p-6 space-y-2">
            <div className="text-white mb-4">
              <span className="text-green-400">C:\&gt;</span> dsecure-machine-details {isBulkView ? `--bulk --count=${machinesToShow.length}` : `--hostname=${selectedMachineForModal?.hostname}`}
            </div>
            
            <div className="space-y-1">
              <div className="text-gray-400">========================================</div>
              <div className="text-cyan-400 font-bold">{isBulkView ? 'D-SECURE BULK MACHINE ANALYSIS REPORT' : 'D-SECURE MACHINE ANALYSIS REPORT'}</div>
              <div className="text-gray-400">========================================</div>
              <div className="text-yellow-400">Scan initiated at: {new Date().toLocaleString()}</div>
              <div className="text-yellow-400">Machines analyzed: {machinesToShow.length}</div>
              <div className="text-gray-400">----------------------------------------</div>
            </div>

            {/* Loop through all machines */}
            <div className="space-y-8 mt-6">
              {machinesToShow.map((machine, index) => (
                <div key={machine.machineId || machine.hostname} className="space-y-4">
                  {isBulkView && (
                    <div className="text-cyan-400 font-bold text-base">
                      === MACHINE #{index + 1} ===
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Basic Information */}
                    <div className="space-y-3">
                      <div className="text-cyan-400 font-bold">[SYSTEM INFORMATION]</div>
                      
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="text-yellow-400 w-20">Hostname:</span>
                          <span className="text-white">{machine.hostname}</span>
                        </div>

                        <div className="flex">
                          <span className="text-yellow-400 w-20">Hash:</span>
                          <span className="text-green-300 break-all text-xs">
                            {machine.fingerprintHash || 'N/A'}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="text-yellow-400 w-20">ID:</span>
                          <span className="text-white">{machine.machineId || 'N/A'}</span>
                        </div>

                        <div className="flex">
                          <span className="text-yellow-400 w-20">User:</span>
                          <span className="text-white">{machine.userEmail || 'N/A'}</span>
                        </div>

                        <div className="flex">
                          <span className="text-yellow-400 w-20">OS:</span>
                          <span className="text-white">{machine.osVersion || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* License & Status Information */}
                    <div className="space-y-3">
                      <div className="text-cyan-400 font-bold">[LICENSE & STATUS]</div>
                      
                      <div className="space-y-2">
                        <div className="flex">
                          <span className="text-yellow-400 w-20">License:</span>
                          <span className={`${
                            machine.license.includes('Enterprise') ? 'text-purple-400' :
                            machine.license.includes('Premium') ? 'text-blue-400' :
                            machine.license.includes('Licensed') ? 'text-green-400' :
                            machine.license.includes('Demo') ? 'text-orange-400' :
                            'text-gray-400'
                          }`}>
                            {machine.license}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="text-yellow-400 w-20">Status:</span>
                          <span className={`${
                            machine.status.includes('Active') ? 'text-green-400' :
                            machine.status.includes('Expired') ? 'text-red-400' :
                            machine.status.includes('Inactive') ? 'text-gray-400' :
                            'text-yellow-400'
                          }`}>
                            ● {machine.status}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="text-yellow-400 w-20">Erase:</span>
                          <span className="text-white">{machine.eraseOption}</span>
                        </div>

                        <div className="flex">
                          <span className="text-yellow-400 w-20">Active:</span>
                          <span className={machine.licenseActivated ? 'text-green-400' : 'text-red-400'}>
                            {machine.licenseActivated ? '[✓] YES' : '[✗] NO'}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="text-yellow-400 w-20">Licenses:</span>
                          <span className="text-white">{machine.totalLicenses || 1}</span>
                        </div>

                        {machine.vmStatus && (
                          <div className="flex">
                            <span className="text-yellow-400 w-20">VM:</span>
                            <span className="text-white">{machine.vmStatus}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Separator for bulk view */}
                  {isBulkView && index < machinesToShow.length - 1 && (
                    <div className="text-gray-600 text-center py-2">
                      ----------------------------------------
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-1">
              <div className="text-gray-400">----------------------------------------</div>
              <div className="text-green-400">● Scan completed successfully</div>
              <div className="text-green-400">● All systems operational</div>
              <div className="text-gray-400">Ready for operations...</div>
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <span className="text-green-400">C:\&gt;</span>
              <span className="text-white animate-pulse">_</span>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-800 rounded-b-lg border-t border-gray-600">
            <button
              onClick={() => {
                setShowModal(false)
                setIsBulkView(false)
                setSelectedMachinesForModal([])
                setSelectedMachineForModal(null)
              }}
              className="px-4 py-2 text-sm font-mono font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              [ESC] Close
            </button>
            
            {!isBulkView && selectedMachineForModal && (
              <button
                onClick={() => {
                  handleRunErase(selectedMachineForModal)
                  setShowModal(false)
                }}
                className={`px-4 py-2 text-sm font-mono font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  selectedMachineForModal.status.includes('Inactive') || selectedMachineForModal.status.includes('Expired')
                    ? 'text-gray-500 bg-gray-800 border border-gray-600 cursor-not-allowed'
                    : 'text-black bg-green-400 hover:bg-green-300 focus:ring-green-500'
                }`}
                disabled={selectedMachineForModal.status.includes('Inactive') || selectedMachineForModal.status.includes('Expired')}
              >
                [ENTER] Run Erase
              </button>
            )}

            {isBulkView && (
              <button
                onClick={() => {
                  handleBulkErase()
                  setShowModal(false)
                  setIsBulkView(false)
                  setSelectedMachinesForModal([])
                }}
                className="px-4 py-2 text-sm font-mono font-medium text-black bg-green-400 hover:bg-green-300 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                [ENTER] Bulk Erase All
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <>
    {/* Machine Details Modal */}
    <MachineDetailsModal />
    
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
        <div>
          <h1 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-slate-900">Machines</h1>
          {selectedMachineIds.size > 0 && (
            <p className="text-sm text-slate-600 mt-1">
              {selectedMachineIds.size} machine{selectedMachineIds.size > 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedMachineIds.size > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkViewDetails}
              className="btn-secondary flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View {selectedMachineIds.size} Selected
            </button>
            <button
              onClick={handleBulkErase}
              className="btn-primary flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Erase {selectedMachineIds.size} Machines
            </button>
          </div>
        )}
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
        {!loading && allRows.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No Machines Found
            </h3>
            <p className="text-slate-600 mb-6">
              There are no machines registered to your account at the moment.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No Results Found
            </h3>
            <p className="text-slate-600 mb-6">
              No machines match your current filters.
            </p>
            <button onClick={clearAllFilters} className="btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <table className="w-full text-nowrap">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 w-10">
                    <input
                      type="checkbox"
                      checked={
                        rows.length > 0 &&
                        rows.every((m) =>
                          selectedMachineIds.has(m.machineId || m.hostname)
                        )
                      }
                      onChange={() => toggleSelectAll(rows)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      title="Select all on this page"
                    />
                  </th>
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
                    <td className="py-2">
                      <input
                        type="checkbox"
                        checked={selectedMachineIds.has(row.machineId || row.hostname)}
                        onChange={() =>
                          toggleMachineSelection(row.machineId || row.hostname)
                        }
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                    </td>
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
          </>
        )}
      </div>
    </div>
    </>
  )
}


