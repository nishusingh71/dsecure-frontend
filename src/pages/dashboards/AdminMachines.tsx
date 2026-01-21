import { useMemo, useState } from 'react'
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { exportToCsv } from '@/utils/csv'
import { Helmet } from 'react-helmet-async'
import { useNotification } from '@/contexts/NotificationContext'

import { Machine } from '@/utils/enhancedApiClient'
import { useEffect } from 'react'
import { apiClient } from '@/utils/enhancedApiClient'
import { authService } from '@/utils/authService'
import { isDemoMode, DEMO_MACHINES, DEMO_SUBUSERS } from '@/data/demoData'
import { useSubusers } from '@/hooks/useSubusers'

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
  const [subuserFilter, setSubuserFilter] = useState<string>("") // "" = my machines, email = subuser's machines, "all" = all machines

  // ✅ Get current user email for API calls
  const getUserEmail = (): string => {
    const storedUser = localStorage.getItem('user_data');
    const authUser = localStorage.getItem('authUser');

    let storedUserData = null;
    if (storedUser) {
      try {
        storedUserData = JSON.parse(storedUser);
      } catch (e) {
        console.error('Error parsing user_data:', e);
      }
    }

    if (!storedUserData && authUser) {
      try {
        storedUserData = JSON.parse(authUser);
      } catch (e) {
        console.error('Error parsing authUser:', e);
      }
    }

    const jwtUser = authService.getUserFromToken();
    return storedUserData?.user_email || jwtUser?.user_email || jwtUser?.email || '';
  };

  const currentUserEmail = getUserEmail();
  const isDemo = isDemoMode();

  // ✅ Fetch subusers for filter dropdown
  const { data: subusersData = isDemo ? DEMO_SUBUSERS : [] } = useSubusers(currentUserEmail, !!currentUserEmail && !isDemo);

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
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [selectedSubuserForTransfer, setSelectedSubuserForTransfer] = useState<string>("")
  const [transferLoading, setTransferLoading] = useState(false)
  const [pageSize, setPageSize] = useState(5) // Default 10 rows per page
  const pageSizeOptions = [5, 10, 25, 50, 100, 250]

  // Load machines data on component mount and when subuserFilter changes
  useEffect(() => {
    loadMachinesData()
  }, [subuserFilter])

  const loadMachinesData = async () => {
    setLoading(true)

    // 🎮 Demo Mode Check - Show static data only
    if (isDemoMode()) {
      // console.log('🎮 Demo Mode Active - Using static machines data')
      let demoMachines = DEMO_MACHINES

      // Apply subuser filter in demo mode
      if (subuserFilter && subuserFilter !== "all") {
        demoMachines = DEMO_MACHINES.filter((m: any) => m.userEmail === subuserFilter)
      }

      setAllRows(demoMachines)
      setLoading(false)
      return
    }

    // ✅ Check cache first for instant display (only if no subuser filter)
    if (!subuserFilter) {
      const cachedMachines = getCachedData('machines');
      if (cachedMachines && cachedMachines.length > 0) {
        // console.log('⚡ Displaying cached machines data');
        setAllRows(cachedMachines);
        setLoading(false); // Hide loader since we have cached data
      }
    }

    try {
      // Get user email - already computed above
      const userEmail = currentUserEmail;
      // console.log('📧 Final userEmail for machines:', userEmail)

      if (!userEmail) {
        console.error('❌ No user email found')
        showError('Authentication Error', 'No user email found. Please login again.')
        setAllRows([])
        setLoading(false)
        return
      }

      // ✅ Determine which email(s) to fetch based on subuserFilter
      let emailsToFetch: string[] = [];

      if (subuserFilter === "all") {
        // Fetch machines for current user + all subusers
        emailsToFetch = [userEmail, ...subusersData.map((s: any) => s.subuser_email)];
      } else if (subuserFilter) {
        // Fetch machines for specific subuser only
        emailsToFetch = [subuserFilter];
      } else {
        // Default: fetch only current user's machines
        emailsToFetch = [userEmail];
      }

      // console.log('🖥️ Fetching machines for emails:', emailsToFetch)

      // Fetch machines for all selected emails in parallel
      const allMachinesPromises = emailsToFetch.map(email =>
        apiClient.getMachinesByEmail(email)
      );

      const allMachinesResults = await Promise.all(allMachinesPromises);

      // Combine all machines
      let combinedMachines: Machine[] = [];
      allMachinesResults.forEach((machinesRes) => {
        if (machinesRes.success && machinesRes.data) {
          combinedMachines = [...combinedMachines, ...machinesRes.data];
        }
      });

      // Try to fetch machines by email first
      let machinesRes = { success: combinedMachines.length > 0, data: combinedMachines }
      // console.log('📥 Machines API Response:', machinesRes)
      // console.log('📥 Full Response Object:', JSON.stringify(machinesRes, null, 2))

      // console.log('📥 Combined Machines:', combinedMachines.length)

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
        // Only cache if not using subuser filter
        if (!subuserFilter) {
          setCachedData('machines', uiMachines)
        }
      } else {
        showInfo('No Machines', 'No machines found')
        setAllRows([])
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
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize)

  const clearAllFilters = () => {
    setQuery('')
    setEraseFilter('')
    setLicenseFilter('')
    setStatusFilter('')
    setShowUniqueOnly(false)
    setSubuserFilter('') // Reset subuser filter
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

  // Modal Component - Simple clean design matching website theme
  const MachineDetailsModal = () => {
    if (!showModal || (!selectedMachineForModal && !isBulkView)) return null

    // Determine which machines to display
    const machinesToShow = isBulkView
      ? selectedMachinesForModal
      : selectedMachineForModal ? [selectedMachineForModal] : []

    const modalTitle = isBulkView
      ? `Machine Details (${machinesToShow.length} selected)`
      : `Machine Details`

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
            <h2 className="text-lg font-semibold text-slate-900">
              {modalTitle}
            </h2>
            <button
              onClick={() => {
                setShowModal(false)
                setIsBulkView(false)
                setSelectedMachinesForModal([])
                setSelectedMachineForModal(null)
              }}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            {machinesToShow.map((machine, index) => (
              <div
                key={machine.machineId || machine.hostname}
                className={`bg-slate-50 rounded-lg p-4 ${index > 0 ? 'mt-4' : ''}`}
              >
                {/* Machine Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{machine.hostname}</h3>
                      <p className="text-sm text-slate-500">{machine.userEmail || 'No user email'}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${machine.status.includes('Active') ? 'bg-green-100 text-green-800' :
                    machine.status.includes('Expired') ? 'bg-red-100 text-red-800' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                    {machine.status}
                  </span>
                </div>

                {/* Machine Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* <div>
                    <p className="text-xs text-slate-500 mb-1">Machine ID</p>
                    <p className="text-sm font-medium text-slate-800">{machine.machineId || 'N/A'}</p>
                  </div> */}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">License</p>
                    <span className={`text-sm font-medium ${machine.license.includes('Enterprise') ? 'text-purple-700' :
                      machine.license.includes('Premium') ? 'text-blue-700' :
                        machine.license.includes('Licensed') ? 'text-green-700' :
                          'text-slate-700'
                      }`}>
                      {machine.license}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Erase Option</p>
                    <p className="text-sm font-medium text-slate-800">{machine.eraseOption}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">OS Version</p>
                    <p className="text-sm font-medium text-slate-800">{machine.osVersion || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">License Status</p>
                    <p className={`text-sm font-medium ${machine.licenseActivated ? 'text-green-700' : 'text-red-700'}`}>
                      {machine.licenseActivated ? '✓ Active' : '✗ Inactive'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Total Licenses</p>
                    <p className="text-sm font-medium text-slate-800">{machine.totalLicenses || 1}</p>
                  </div>
                  {machine.vmStatus && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">VM Status</p>
                      <p className="text-sm font-medium text-slate-800">{machine.vmStatus}</p>
                    </div>
                  )}
                  {/* {machine.fingerprintHash && (
                    <div className="col-span-2 md:col-span-3">
                      <p className="text-xs text-slate-500 mb-1">Fingerprint Hash</p>
                      <p className="text-xs font-mono text-slate-600 break-all">{machine.fingerprintHash}</p>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-slate-50">
            <button
              onClick={() => {
                setShowModal(false)
                setIsBulkView(false)
                setSelectedMachinesForModal([])
                setSelectedMachineForModal(null)
              }}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Handle Transfer to Subuser
  const handleTransferMachines = async () => {
    if (!selectedSubuserForTransfer) {
      showWarning("Select Subuser", "Please select a subuser to transfer machines to")
      return
    }

    if (selectedMachineIds.size === 0) {
      showWarning("No Machines Selected", "Please select at least one machine to transfer")
      return
    }

    setTransferLoading(true)
    try {
      // Get selected machines
      const selectedMachines = allRows.filter((machine) =>
        selectedMachineIds.has(machine.machineId || machine.hostname)
      )

      // Extract MAC addresses from selected machines
      // The hostname field contains the MAC address based on how machines are mapped
      const macAddresses = selectedMachines.map((machine) => machine.hostname)

      showInfo(`Transferring ${selectedMachines.length} machines to ${selectedSubuserForTransfer}...`)

      // Call the actual API endpoint
      const response = await apiClient.transferMachinesToSubuser(
        selectedSubuserForTransfer,
        macAddresses
      )

      if (response.success) {
        showSuccess(`Successfully transferred ${selectedMachines.length} machine(s) to ${selectedSubuserForTransfer}`)

        // Clear selection and close modal
        setSelectedMachineIds(new Set())
        setShowTransferModal(false)
        setSelectedSubuserForTransfer("")

        // Refresh data
        await loadMachinesData()
      } else {
        showError("Transfer Failed", response.error || response.message || "Failed to transfer machines. Please try again.")
      }
    } catch (error) {
      console.error("Transfer error:", error)
      showError("Transfer Failed", error instanceof Error ? error.message : "Failed to transfer machines. Please try again.")
    } finally {
      setTransferLoading(false)
    }
  }

  // Transfer Modal Component
  const TransferModal = () => {
    if (!showTransferModal) return null

    const selectedMachines = allRows.filter((machine) =>
      selectedMachineIds.has(machine.machineId || machine.hostname)
    )

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full shadow-xl mt-20">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-slate-900">
              Transfer Machines to Subuser
            </h2>
            <button
              onClick={() => {
                setShowTransferModal(false)
                setSelectedSubuserForTransfer("")
              }}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-600">
              Transfer <span className="font-semibold text-slate-900">{selectedMachines.length} machine(s)</span> to a subuser account.
            </p>

            {/* Subuser Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Select Subuser
              </label>
              <select
                value={selectedSubuserForTransfer}
                onChange={(e) => setSelectedSubuserForTransfer(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select a subuser --</option>
                {subusersData.map((subuser: any) => (
                  <option key={subuser.subuser_email} value={subuser.subuser_email}>
                    {subuser.subuser_email}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Machines Preview */}
            <div className="bg-slate-50 rounded-lg p-3 max-h-40 overflow-y-auto">
              <p className="text-xs text-slate-500 mb-2">Machines to transfer:</p>
              <div className="space-y-1">
                {selectedMachines.map((machine) => (
                  <div key={machine.machineId || machine.hostname} className="text-sm text-slate-700">
                    • {machine.hostname}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-slate-50">
            <button
              onClick={() => {
                setShowTransferModal(false)
                setSelectedSubuserForTransfer("")
              }}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleTransferMachines}
              disabled={!selectedSubuserForTransfer || transferLoading}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${!selectedSubuserForTransfer || transferLoading
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
                }`}
            >
              {transferLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Transferring...
                </>
              ) : (
                'Transfer'
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("admin-machines")} />
      {/* Machine Details Modal */}
      <MachineDetailsModal />

      {/* Transfer to Subuser Modal */}
      <TransferModal />

      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/admin/machines" />
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

          {/* Bulk Actions - Moved to above table */}
          {/* {selectedMachineIds.size > 0 && (
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
          )} */}
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

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 xs:gap-4 sm:gap-4">
            {/* Machine Owner Filter - Show only if there are subusers */}
            {subusersData && subusersData.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Machine Owner</label>
                <select
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={subuserFilter}
                  onChange={(e) => { setSubuserFilter(e.target.value); setPage(1) }}
                >
                  <option value="">My Machines</option>
                  <option value="all">All Machines (Me + Subusers)</option>
                  <optgroup label="Subuser Machines">
                    {subusersData.map((subuser: any) => (
                      <option key={subuser.subuser_email} value={subuser.subuser_email}>
                        {subuser.subuser_name || subuser.subuser_email}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            )}

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Search hostname, erase option, license"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              />
            </div>

            {/* Erase Option Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Erase Option</label>
              <select
                className="w-full border rounded px-3 py-2 text-sm"
                value={eraseFilter}
                onChange={(e) => { setEraseFilter(e.target.value); setPage(1) }}
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
                onChange={(e) => { setLicenseFilter(e.target.value); setPage(1) }}
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
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
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
                onChange={(e) => { setShowUniqueOnly(e.target.checked); setPage(1) }}
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
                onChange={(e) => setSortBy(e.target.value as keyof UIMachine)}
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

        {/* Export Actions - Commented out */}
        {/* <div className="flex justify-end gap-2">
          <button className="btn-secondary" onClick={() => exportToCsv('machines.csv', filtered.map(m => ({ ...m })))}>Export All ({filtered.length})</button>
          <button className="btn-secondary" onClick={() => exportToCsv('machines-page.csv', rows.map(m => ({ ...m })))}>Export Page ({rows.length})</button>
        </div> */}

        {/* Table - scroll applied to table body only */}
        <div className="card-content card-table card overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-200 border-t-emerald-600 mb-4"></div>
              <p className="text-slate-600 text-sm">Loading machines...</p>
            </div>
          ) : allRows.length === 0 ? (
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
              {/* Bulk Action Bar - Shows when machines are selected */}
              {selectedMachineIds.size > 0 && (
                <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-blue-800">
                      {selectedMachineIds.size} machine{selectedMachineIds.size !== 1 ? 's' : ''} selected
                    </span>
                    <button
                      onClick={() => setSelectedMachineIds(new Set())}
                      className="text-sm px-3 py-1.5 rounded border font-medium transition-colors bg-white text-slate-700 hover:bg-slate-50 border-slate-300"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowTransferModal(true)}
                      className="text-sm px-4 py-1.5 rounded border font-medium transition-colors bg-green-600 text-white hover:bg-green-700 border-green-600 flex items-center gap-2"
                      title={`Transfer ${selectedMachineIds.size} Selected Machines to Subuser`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Transfer
                    </button>
                    <button
                      onClick={handleBulkViewDetails}
                      className="text-sm px-4 py-1.5 rounded border font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 border-blue-600 flex items-center gap-2"
                      title={`View ${selectedMachineIds.size} Selected Machines`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                  </div>
                </div>
              )}

              {/* Scrollable table wrapper - only tbody scrolls, header stays fixed */}
              <div className="max-h-[500px] overflow-y-auto scrollbar-hide">
                <table className="w-full text-nowrap">
                  <thead className="sticky top-0 bg-white shadow-sm z-10">
                    <tr className="text-left text-slate-500 border-b">
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
                      <th className="py-2">Assign Machine To</th>
                      <th className="py-2">Erase Option</th>
                      <th className="py-2">License</th>
                      <th className="py-2">Status</th>
                      {/* Actions column commented out - using bulk action bar instead */}
                      {/* <th className="py-2">Actions</th> */}
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
                        <td className="py-2 text-sm text-slate-600">{row.userEmail || 'N/A'}</td>
                        <td className="py-2">{row.eraseOption}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.license === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                            row.license === 'Premium' ? 'bg-blue-100 text-blue-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                            {row.license}
                          </span>
                        </td>
                        <td className="py-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${row.status === 'online' ? 'bg-green-100 text-green-800' :
                            row.status === 'offline' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${row.status === 'online' ? 'bg-green-400' :
                              row.status === 'offline' ? 'bg-red-400' :
                                'bg-yellow-400'
                              }`}></span>
                            {row.status}
                          </span>
                        </td>
                        {/* Actions column commented out - using bulk action bar instead */}
                        {/* <td className="py-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleViewDetails(row)}
                              className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50"
                              title="View Details"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleRunErase(row)}
                              className={`text-xs px-2 py-1 rounded border ${row.status === 'offline'
                                ? 'text-slate-400 border-slate-200 cursor-not-allowed'
                                : 'text-purple-600 hover:text-purple-800 border-purple-200 hover:bg-purple-50'
                                }`}
                              disabled={row.status === 'offline'}
                              title={row.status === 'offline' ? 'Machine offline' : 'Run Erase'}
                            >
                              Erase
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* End scrollable table wrapper */}

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4 pt-4 border-t">
                {/* Left side - Rows per page selector */}
                <div className="flex items-center gap-3">
                  <label htmlFor="machinesPageSize" className="text-sm text-slate-600">
                    Rows per page:
                  </label>
                  <select
                    id="machinesPageSize"
                    value={pageSize}
                    onChange={(e) => {
                      const newSize = parseInt(e.target.value, 10)
                      setPageSize(newSize)
                      setPage(1)
                    }}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
                  >
                    {pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-slate-500">
                    Showing {Math.min((page - 1) * pageSize + 1, filtered.length)} to {Math.min(page * pageSize, filtered.length)} of {filtered.length} records
                  </span>
                </div>

                {/* Right side - Page navigation */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">
                    Page {page} of {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage(page - 1)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage(page + 1)}
                      className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}


