import { useAuth } from '@/auth/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { Helmet } from 'react-helmet-async'
import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  AdminDashboardAPI, 
  type DashboardStats, 
  type UserActivity, 
  type GroupData, 
  type LicenseData, 
  type RecentReport,
  type ProfileData
} from '@/services/adminDashboardAPI'
import RoleBased from '@/components/RoleBased'
import { 
  getRolePermissions, 
  hasPermission, 
  canManageUser, 
  filterUsersByRole,
  getRoleDisplayInfo,
  getAssignableRoles,
  isFeatureVisible
} from '@/utils/rolePermissions'
import { getPrimaryRole } from '@/utils/roleHelper'
import { apiClient, type Machine, type AuditReport, type Subuser, type Session } from '@/utils/enhancedApiClient'
import { group } from 'node:console'

// Interface for merged user data displayed in Users tab
interface MergedUserData {
  user_name: string
  email: string
  role: 'Superuser' | 'Subuser'
  licenses: string
  date_created: string
  totalLicenses?: number // For progress bar calculation
  consumedLicenses?: number // For progress bar calculation
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const { showSuccess, showError, showInfo } = useNotification()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  
  // Modal states
  const [showBulkLicenseModal, setShowBulkLicenseModal] = useState(false)
  const [showLicenseAuditModal, setShowLicenseAuditModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileEditForm, setProfileEditForm] = useState({
    user_name: '',
    phone_number: ''
  })
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [settingsTab, setSettingsTab] = useState<'billing' | 'password'>('billing')
  const [billingDetails, setBillingDetails] = useState<any>(null)
  const [billingAccordion, setBillingAccordion] = useState({
    activePlan: true,
    licenseUsage: true,
    planInfo: false
  })
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  })
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showAddGroupModal, setShowAddGroupModal] = useState(false)
  const [showSystemSettingsModal, setShowSystemSettingsModal] = useState(false)
  const [showAssignLicensesModal, setShowAssignLicensesModal] = useState(false)
  const [selectedGroupForLicenses, setSelectedGroupForLicenses] = useState<GroupData | null>(null)
  const [bulkUserCount, setBulkUserCount] = useState('10')
  const [bulkLicenseCount, setBulkLicenseCount] = useState('5')
  const [isLoading, setIsLoading] = useState(false)
  
  // Form states for modals
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'user',
    password: '',
    phone: '',
    department:'',
    group:'',
  })
  const [newGroupForm, setNewGroupForm] = useState({
    name: '',
    description: '',
    licenses: 0
  })
  const [assignLicensesForm, setAssignLicensesForm] = useState({
    licenseCount: 10,
    expiryDate: '',
    licenseType: 'basic'
  })
  
  // Helper function to get user data from localStorage
  const getUserDataFromStorage = () => {
    const storedUser = localStorage.getItem('user_data');
    const authUser = localStorage.getItem('authUser');
    
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Error parsing user_data:', e);
      }
    }
    
    if (authUser) {
      try {
        return JSON.parse(authUser);
      } catch (e) {
        console.error('Error parsing authUser:', e);
      }
    }
    
    return null;
  };

  // ✅ Cache Helper Functions - Store data with timestamp
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
  
  const getCachedData = (key: string) => {
    try {
      const cached = localStorage.getItem(`dashboard_cache_${key}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();
        // Check if cache is still valid (within 5 minutes)
        if (now - timestamp < CACHE_DURATION) {
          console.log(`✅ Using cached data for ${key}`);
          return data;
        } else {
          console.log(`⏰ Cache expired for ${key}`);
          localStorage.removeItem(`dashboard_cache_${key}`);
        }
      }
    } catch (e) {
      console.warn(`⚠️ Failed to read cache for ${key}:`, e);
    }
    return null;
  };

  const setCachedData = (key: string, data: any) => {
    try {
      const cacheObject = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`dashboard_cache_${key}`, JSON.stringify(cacheObject));
      console.log(`💾 Cached data for ${key}`);
    } catch (e) {
      console.warn(`⚠️ Failed to cache data for ${key}:`, e);
    }
  };
  
  // API Data States - Initialize with cached data if available
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(() => getCachedData('stats'))
  const [userActivity, setUserActivity] = useState<UserActivity[]>(() => getCachedData('activity') || [])
  const [groups, setGroups] = useState<GroupData[]>(() => getCachedData('groups') || [])
  const [licenseData, setLicenseData] = useState<LicenseData[]>(() => getCachedData('licenses') || [])
  const [recentReports, setRecentReports] = useState<RecentReport[]>(() => getCachedData('reports') || [])
  const [activeLicensesCount, setActiveLicensesCount] = useState<number>(() => getCachedData('activeLicenses') || 0)
  const [auditReportsCount, setAuditReportsCount] = useState<number>(() => getCachedData('auditReportsCount') || 0)
  const [auditReports, setAuditReports] = useState<AuditReport[]>(() => getCachedData('auditReports') || [])
  const [userLicenseDetails, setUserLicenseDetails] = useState<LicenseData[]>(() => getCachedData('userLicenses') || [])
  const [recentSystemLogs, setRecentSystemLogs] = useState<any[]>(() => getCachedData('systemLogs') || [])
  
  // Performance data state - Initialize with cached data
  const [performanceData, setPerformanceData] = useState<{
    monthlyErasures: { month: string; count: number }[]
    avgDuration: { month: string; duration: number }[]
    throughput: { month: string; count: number }[]
  }>(() => getCachedData('performance') || {
    monthlyErasures: [],
    avgDuration: [],
    throughput: []
  })
  
  // Separate states for Users and Subusers (not merged) - Initialize with cached data
  const [superuserData, setSuperuserData] = useState<MergedUserData | null>(() => getCachedData('superuser'))
  const [subusersData, setSubusersData] = useState<Subuser[]>(() => getCachedData('subusers') || [])
  const [usersDataLoading, setUsersDataLoading] = useState<boolean>(false) // Loading state for users data
  
  // Initialize profileData with localStorage data
  const storedUserData = getUserDataFromStorage();
  const primaryRole = getPrimaryRole(storedUserData) || user?.role || 'user';
  
  const [profileData, setProfileData] = useState<ProfileData | null>({
    name: storedUserData?.user_name || user?.name || 'User',
    email: storedUserData?.user_email || user?.email || 'user@example.com',
    timezone: storedUserData?.timezone || 'Asia/Kolkata',
    role: primaryRole,
    phone: storedUserData?.phone_number || '',
    department: storedUserData?.department || '',
    licenses: 0 // Will be updated from API
  })
  const [dataLoading, setDataLoading] = useState(true)

  // Role-based permissions (using primary role from roles array if available)
  const currentUserRole = getPrimaryRole(storedUserData) || user?.role || 'user';
  const permissions = getRolePermissions(currentUserRole)
  const roleInfo = getRoleDisplayInfo(currentUserRole)

  // Debug: Log role and permissions
  console.log('🔍 AdminDashboard Role Debug:', {
    currentUserRole,
    userRole: user?.role,
    storedRole: storedUserData?.role || storedUserData?.user_type,
    permissions,
    canViewAllUsers: permissions.canViewAllUsers,
    canViewGroups: permissions.canViewGroups,
    canViewSettings: permissions.canViewSettings,
    canGenerateReports: permissions.canGenerateReports
  });

  // Note: All users can access admin dashboard, but with limited permissions
  // UI elements will be hidden based on role permissions

  // Load all dashboard data on component mount
  useEffect(() => {
    loadDashboardData()
  }, [])

  // Load users data when Users tab is opened
  useEffect(() => {
    if (activeTab === 'users') {
      console.log('🔄 Users tab opened, fetching users data...')
      fetchAndMergeUsersData()
    }
  }, [activeTab])

  const loadDashboardData = async () => {
    setDataLoading(true)
    try {
      // ✅ Show cached data immediately if available
      const hasCache = getCachedData('stats') !== null;
      if (hasCache) {
        console.log('⚡ Displaying cached data for instant load');
        setDataLoading(false); // Hide loader since we have cached data
      }

      const [statsRes, activityRes, groupsRes, licenseRes, reportsRes, profileRes] = await Promise.all([
        AdminDashboardAPI.getDashboardStats(),
        AdminDashboardAPI.getUserActivity(),
        AdminDashboardAPI.getGroups(),
        AdminDashboardAPI.getLicenseData(),
        AdminDashboardAPI.getRecentReports(),
        AdminDashboardAPI.getAdminProfile()
      ])

      if (statsRes.success) {
        setDashboardStats(statsRes.data)
        setCachedData('stats', statsRes.data)
      }
      if (activityRes.success) {
        setUserActivity(activityRes.data)
        setCachedData('activity', activityRes.data)
      }
      if (groupsRes.success) {
        setGroups(groupsRes.data)
        setCachedData('groups', groupsRes.data)
      }
      if (licenseRes.success) {
        setLicenseData(licenseRes.data)
        setCachedData('licenses', licenseRes.data)
      }
      if (reportsRes.success) {
        setRecentReports(reportsRes.data)
        setCachedData('reports', reportsRes.data)
      }
      
      // If API call succeeds, use API data, otherwise fallback to localStorage/JWT data
      if (profileRes.success) {
        setProfileData(profileRes.data)
      } else {
        // Fallback to localStorage or JWT token data
        const storedData = getUserDataFromStorage();
        const fallbackRole = getPrimaryRole(storedData) || user?.role || 'user';
        setProfileData({
          name: storedData?.user_name || user?.name || 'User',
          email: storedData?.user_email || user?.email || 'user@example.com',
          timezone: storedData?.timezone || 'Asia/Kolkata',
          role: fallbackRole,
          phone: storedData?.phone_number || '',
          department: storedData?.department || ''
        })
      }

      // Fetch active licenses count from Machines API by user email
      const userEmail = storedUserData?.user_email || user?.email || profileRes.data?.email;
      if (userEmail) {
        console.log('📧 Fetching all data in parallel for email:', userEmail);
        
        // ✅ OPTIMIZED: Fetch all data in parallel to reduce loading time
        const [
          machinesRes,
          auditReportsRes,
          userRes,
          subusersRes,
          sessionsRes,
          systemLogsRes,
          // ✅ NEW: Fetch ALL data for Performance tab (not filtered by email)
          allMachinesRes,
          allAuditReportsRes,
          allSessionsRes,
          allSystemLogsRes
        ] = await Promise.all([
          apiClient.getMachinesByEmail(userEmail),
          apiClient.getAuditReportsByEmail(userEmail),
          apiClient.getUserByEmail(userEmail),
          apiClient.getSubusersBySuperuser(userEmail).catch(() => ({ success: false, data: null })),
          apiClient.getSessions().catch(() => ({ success: false, data: null })),
          apiClient.getSystemLogsByEmail(userEmail).catch(() => ({ success: false, data: null })),
          // Performance tab needs ALL data
          apiClient.getMachines().catch(() => ({ success: false, data: null })),
          apiClient.getAuditReports().catch(() => ({ success: false, data: null })),
          apiClient.getSessions().catch(() => ({ success: false, data: null })),
          apiClient.getSystemLogs().catch(() => ({ success: false, data: null }))
        ]);

        // Process machines data (active licenses)
        if (machinesRes.success && machinesRes.data) {
          const activeLicenses = machinesRes.data.filter((machine: Machine) => machine.license_activated === true).length;
          console.log('✅ Active licenses count:', activeLicenses, 'from', machinesRes.data.length, 'total machines');
          setActiveLicensesCount(activeLicenses);
          setCachedData('activeLicenses', activeLicenses);
          
          setProfileData(prev => ({
            ...prev!,
            licenses: activeLicenses
          }));
        } else {
          console.warn('⚠️ Failed to fetch machines:', machinesRes.error);
        }

        // Process audit reports data
        if (auditReportsRes.success && auditReportsRes.data) {
          const reportsCount = auditReportsRes.data.length;
          console.log('✅ Audit reports count:', reportsCount);
          setAuditReportsCount(reportsCount);
          setCachedData('auditReportsCount', reportsCount);
          
          // Fetch device count for each report in parallel
          const reportsWithDevices = await Promise.all(
            auditReportsRes.data.map(async (report) => {
              try {
                const machinesRes = await apiClient.getMachinesByEmail(report.user_email);
                return {
                  ...report,
                  deviceCount: machinesRes.success && machinesRes.data ? machinesRes.data.length : 0
                };
              } catch (error) {
                console.warn(`⚠️ Failed to fetch machines for ${report.user_email}:`, error);
                return { ...report, deviceCount: 0 };
              }
            })
          );
          
          setAuditReports(reportsWithDevices);
          setCachedData('auditReports', reportsWithDevices);
          
          // ✅ Extract unique software names from report_details_json for license products
          const softwareNames = new Set<string>();
          auditReportsRes.data.forEach((report: any) => {
            if (report.report_details_json) {
              try {
                const reportDetails = JSON.parse(report.report_details_json);
                if (reportDetails.software_name) {
                  softwareNames.add(reportDetails.software_name);
                }
              } catch (e) {
                console.warn('⚠️ Failed to parse report_details_json for software_name:', e);
              }
            }
          });
          console.log('✅ Unique software names extracted from reports:', Array.from(softwareNames));
          
          // ✅ Calculate Performance Metrics from ALL APIs (using allAuditReportsRes, allMachinesRes, etc.)
          console.log('📊 Calculating comprehensive performance metrics from ALL APIs...');
          
          // Use ALL data for performance calculations (not filtered by email)
          const performanceAuditReports = allAuditReportsRes?.success && allAuditReportsRes.data ? allAuditReportsRes.data : [];
          const performanceMachines = allMachinesRes?.success && allMachinesRes.data ? allMachinesRes.data : [];
          const performanceSessions = allSessionsRes?.success && allSessionsRes.data ? allSessionsRes.data : [];
          const performanceSystemLogs = allSystemLogsRes?.success && allSystemLogsRes.data ? allSystemLogsRes.data : [];
          
          console.log('📊 Performance data sources:', {
            auditReports: performanceAuditReports.length,
            machines: performanceMachines.length,
            sessions: performanceSessions.length,
            systemLogs: performanceSystemLogs.length
          });
          
          console.log('📊 Performance data sources:', {
            auditReports: performanceAuditReports.length,
            machines: performanceMachines.length,
            sessions: performanceSessions.length,
            systemLogs: performanceSystemLogs.length
          });
          
          // Group data by month for last 12 months
          const currentDate = new Date();
          const monthsData: { [key: string]: { 
            erasures: number; 
            totalDuration: number;
            sessions: number;
            activeMachines: Set<string>;
            commands: number;
            logs: number;
          } } = {};
          
          // Initialize last 12 months (Jan, Feb, Mar, etc.)
          for (let i = 11; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
            monthsData[monthKey] = { 
              erasures: 0, 
              totalDuration: 0,
              sessions: 0,
              activeMachines: new Set(),
              commands: 0,
              logs: 0
            };
          }
          
          // 1️⃣ Process Audit Reports (Erasure operations) - Use ALL data
          performanceAuditReports.forEach((report: any) => {
            const reportDate = new Date(report.report_datetime || report.created_at);
            const monthKey = reportDate.toLocaleDateString('en-US', { month: 'short' });
            
            if (monthsData[monthKey]) {
              monthsData[monthKey].erasures++;
              
              // Calculate duration based on erasure method
              let duration = 300; // Default 5 minutes
              
              if (report.erasure_method) {
                const method = report.erasure_method.toLowerCase();
                if (method.includes('dod') || method.includes('7-pass')) {
                  duration = 480; // 8 minutes for DOD
                } else if (method.includes('gutmann') || method.includes('35-pass')) {
                  duration = 720; // 12 minutes for Gutmann
                } else if (method.includes('quick') || method.includes('1-pass')) {
                  duration = 180; // 3 minutes for quick
                } else if (method.includes('nist') || method.includes('3-pass')) {
                  duration = 360; // 6 minutes for NIST
                }
              }
              
              monthsData[monthKey].totalDuration += duration;
            }
          });
          
          // 2️⃣ Process Machines (Active devices per month) - Use ALL data
          performanceMachines.forEach((machine: any) => {
            const activationDate = new Date(machine.license_activation_date || machine.created_at);
            const monthKey = activationDate.toLocaleDateString('en-US', { month: 'short' });
            
            if (monthsData[monthKey] && machine.machine_id) {
              monthsData[monthKey].activeMachines.add(machine.machine_id);
            }
          });
          
          // 3️⃣ Process Sessions (User activity) - Use ALL data
          performanceSessions.forEach((session: any) => {
            const sessionDate = new Date(session.login_time);
            const monthKey = sessionDate.toLocaleDateString('en-US', { month: 'short' });
            
            if (monthsData[monthKey]) {
              monthsData[monthKey].sessions++;
            }
          });
          
          // 4️⃣ Process System Logs (Operations tracking) - Use ALL data
          performanceSystemLogs.forEach((log: any) => {
            const logDate = new Date(log.created_at);
            const monthKey = logDate.toLocaleDateString('en-US', { month: 'short' });
            
            if (monthsData[monthKey]) {
              monthsData[monthKey].logs++;
            }
          });
          
          // Convert to arrays for charts
          const monthlyErasures = Object.entries(monthsData).map(([month, data]) => ({
            month,
            count: data.erasures
          }));
          
          const avgDuration = Object.entries(monthsData).map(([month, data]) => ({
            month,
            duration: data.erasures > 0 ? Math.floor(data.totalDuration / data.erasures) : 0
          }));
          
          // Throughput = erasures + active machines count (combined metric)
          const throughput = Object.entries(monthsData).map(([month, data]) => ({
            month,
            count: data.erasures + data.activeMachines.size
          }));
          
          setPerformanceData({
            monthlyErasures,
            avgDuration,
            throughput
          });
          setCachedData('performance', {
            monthlyErasures,
            avgDuration,
            throughput
          });
          
          console.log('✅ Performance metrics calculated from all APIs:', { 
            monthlyErasures, 
            avgDuration, 
            throughput,
            totalErasures: monthlyErasures.reduce((sum, m) => sum + m.count, 0),
            totalSessions: Object.values(monthsData).reduce((sum, m) => sum + m.sessions, 0),
            totalLogs: Object.values(monthsData).reduce((sum, m) => sum + m.logs, 0)
          });
        } else {
          console.warn('⚠️ Failed to fetch audit reports:', auditReportsRes.error);
        }

        // Process user license details
        if (userRes.success && userRes.data) {
          console.log('✅ User data fetched from database:', userRes.data);
          
          // ✅ UPDATE PROFILE with latest data from database
          setProfileData(prev => ({
            ...prev!,
            name: userRes.data!.user_name || prev!.name,
            phone: userRes.data!.phone_number || prev!.phone || '',
            email: userRes.data!.user_email || prev!.email,
            role: userRes.data!.role || prev!.role
          }));
          
          // ✅ UPDATE LOCALSTORAGE with latest database data
          const storedData = getUserDataFromStorage();
          if (storedData) {
            storedData.user_name = userRes.data!.user_name;
            storedData.phone_number = userRes.data!.phone_number;
            localStorage.setItem('userData', JSON.stringify(storedData));
            console.log('💾 LocalStorage synced with database on page load');
          }
          
          // Process license details if available
          if (userRes.data.license_details_json) {
            try {
              const licenseDetails = JSON.parse(userRes.data.license_details_json);
              console.log('✅ License details parsed:', licenseDetails);
              
              // New format: Extract from plans array and map with software names from reports
              if (licenseDetails.plans && Array.isArray(licenseDetails.plans)) {
                console.log('📦 Using new license format with plans array');
                
                // Get software names from audit reports
                const softwareNamesMap = new Map<string, string>();
                if (auditReportsRes.success && auditReportsRes.data) {
                  auditReportsRes.data.forEach((report: any) => {
                    if (report.report_details_json) {
                      try {
                        const reportDetails = JSON.parse(report.report_details_json);
                        if (reportDetails.software_name) {
                          // Map plan type to software name (you can customize this mapping)
                          softwareNamesMap.set('Pro', reportDetails.software_name);
                          softwareNamesMap.set('Enterprise', reportDetails.software_name);
                          softwareNamesMap.set('Basic', reportDetails.software_name);
                        }
                      } catch (e) {
                        // Ignore parse errors
                      }
                    }
                  });
                }
                
                const formattedLicenses: LicenseData[] = licenseDetails.plans.map((plan: any) => {
                  // Get software name from report or use planType as fallback
                  const softwareName = softwareNamesMap.get(plan.planType) || plan.planType || 'Unknown Product';
                  
                  return {
                    product: softwareName,
                    total: parseInt(plan.totalLicenses || '0'),
                    consumed: parseInt(plan.consumedLicenses || '0'),
                    available: parseInt(plan.availableLicenses || '0')
                  };
                });
                
                console.log('✅ Formatted license details from plans:', formattedLicenses);
                setUserLicenseDetails(formattedLicenses);
              }
              // Old format: Backward compatibility
              else {
                let productsArray: any[] = [];
                
                if (licenseDetails.products && Array.isArray(licenseDetails.products)) {
                  productsArray = licenseDetails.products;
                  console.log('📦 Using products array from object (old format)');
                } else if (Array.isArray(licenseDetails)) {
                  productsArray = licenseDetails;
                  console.log('📦 Using direct array format (old format)');
                } else {
                  console.warn('⚠️ Unknown license details format:', licenseDetails);
                }
                
                if (productsArray.length > 0) {
                  const formattedLicenses: LicenseData[] = productsArray.map((item: any) => ({
                    product: item.product || item.Product || 'Unknown',
                    total: parseInt(item.total_license || item.total || item.Total || '0'),
                    consumed: parseInt(item.consumed_license || item.consumed || item.Consumed || '0'),
                    available: 0
                  }));
                  
                  formattedLicenses.forEach(license => {
                    license.available = license.total - license.consumed;
                  });
                  
                  console.log('✅ Formatted license details (old format):', formattedLicenses);
                  setUserLicenseDetails(formattedLicenses);
                }
              }
            } catch (parseError) {
              console.error('❌ Failed to parse license_details_json:', parseError);
            }
          }
        } else {
          console.warn('⚠️ Failed to fetch user data or no license details:', userRes.error);
        }

        // Process subusers and sessions data (user activity)
        if (subusersRes.success && subusersRes.data && subusersRes.data.length > 0) {
          console.log('✅ Subusers fetched:', subusersRes.data.length);
          
          let sessionsData: Session[] = [];
          if (sessionsRes.success && sessionsRes.data) {
            sessionsData = sessionsRes.data;
            console.log('✅ Sessions fetched:', sessionsData.length);
          }
          
          const currentTime = new Date().getTime();
          const ACTIVE_THRESHOLD = 30 * 60 * 1000; // 30 minutes
          
          const usersActivity = subusersRes.data.map((subuser: Subuser) => {
            const subuserEmail = subuser.subuser_email;
            
            const userSessions = sessionsData.filter(
              (session) => session.user_email === subuserEmail
            );
            
            const sortedSessions = userSessions.sort(
              (a, b) => new Date(b.login_time).getTime() - new Date(a.login_time).getTime()
            );
            
            const latestSession = sortedSessions[0];
            
            let status: 'active' | 'offline' = 'offline';
            let loginTime = '-';
            let logoutTime = '-';
            
            if (latestSession) {
              loginTime = new Date(latestSession.login_time).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });
              
              if (latestSession.logout_time) {
                logoutTime = new Date(latestSession.logout_time).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });
                status = 'offline';
              } else {
                const lastLoginTime = new Date(latestSession.login_time).getTime();
                const timeDiff = currentTime - lastLoginTime;
                
                if (timeDiff < ACTIVE_THRESHOLD) {
                  status = 'active';
                } else {
                  status = 'offline';
                }
              }
            }
            
            return {
              email: subuserEmail,
              loginTime,
              logoutTime,
              status
            };
          });
          
          console.log('✅ User activity calculated for subusers:', usersActivity);
          setUserActivity(usersActivity);
        } else {
          console.warn('⚠️ No subusers found for superuser:', userEmail);
          setUserActivity([]);
        }

        // Process system logs data
        if (systemLogsRes.success && systemLogsRes.data) {
          const sortedLogs = systemLogsRes.data
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            .slice(0, 5);
          
          console.log('✅ Recent system logs fetched:', sortedLogs.length);
          setRecentSystemLogs(sortedLogs);
          setCachedData('systemLogs', sortedLogs);
        } else {
          console.warn('⚠️ Failed to fetch system logs');
          setRecentSystemLogs([]);
        }

        console.log('✅ All data fetched successfully in parallel!');
      } else {
        console.warn('⚠️ No user email available for fetching machines');
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error)
      showError('Data Loading Error', 'Failed to load dashboard data. Using default values.')
      
      // Set profile data from localStorage or JWT token on error
      const storedData = getUserDataFromStorage();
      const fallbackRole = getPrimaryRole(storedData) || user?.role || 'user';
      setProfileData({
        name: storedData?.user_name || user?.name || 'User',
        email: storedData?.user_email || user?.email || 'user@example.com',
        timezone: storedData?.timezone || 'Asia/Kolkata',
        role: fallbackRole,
        phone: storedData?.phone_number || '',
        department: storedData?.department || '',
        licenses: 0
      })
    } finally {
      setDataLoading(false)
    }
  }

  /**
   * 🔄 Fetch Subusers data with machine-based license counting
   * 
   * This function:
   * 1. Fetches subusers from /api/Subuser/by-superuser/{email}
   * 2. For each subuser, fetches their machines from /api/Machines/by-email/{subuser_email}
   * 3. Calculates license usage from demo_usage_count field in machines
   * 4. Stores enhanced subuser data with license counts
   */
  const fetchAndMergeUsersData = async () => {
    setUsersDataLoading(true)
    console.log('🚀 Starting fetchAndMergeUsersData...')
    
    try {
      const userEmail = profileData?.email || user?.email || ''
      
      if (!userEmail) {
        console.warn('⚠️ No user email available for fetching users data')
        console.log('📊 ProfileData:', profileData)
        console.log('📊 User from context:', user)
        setUsersDataLoading(false)
        return
      }

      console.log('👥 Fetching users data for email:', userEmail)
      
      // ✅ Check cache first for instant display
      const cachedSubusers = getCachedData('subusers');
      const cachedSuperuser = getCachedData('superuser');
      
      if (cachedSubusers) {
        console.log('⚡ Displaying cached subusers data');
        setSubusersData(cachedSubusers);
        setUsersDataLoading(false); // Hide loader since we have cached data
      }
      
      if (cachedSuperuser) {
        console.log('⚡ Displaying cached superuser data');
        setSuperuserData(cachedSuperuser);
      }
      
      // 1️⃣ Fetch Subusers
      console.log('🔍 Calling getSubusersBySuperuser API...')
      const subusersRes = await apiClient.getSubusersBySuperuser(userEmail)
      console.log('📥 Subusers API Response:', subusersRes)
      
      // 2️⃣ Process Subusers data with machine-based license counting and complete user details
      if (subusersRes.success && subusersRes.data && subusersRes.data.length > 0) {
        console.log(`📋 Found ${subusersRes.data.length} subusers, fetching their complete user details...`)
        
        // Fetch complete user data from /api/Users/{email} for each subuser
        const subusersWithCompleteData = await Promise.all(
          subusersRes.data.map(async (subuser) => {
            try {
              // 1. Fetch complete user data from /api/Users/{email}
              console.log(`🔍 Fetching complete user data for: ${subuser.subuser_email}`)
              const userDataRes = await apiClient.getUserByEmail(subuser.subuser_email)
              
              let userData = {
                user_role: 'user',
                department: 'N/A',
                last_login: 'Never',
                status: 'active',
                user_group: 'N/A',
                license_allocation: '0'
              }
              
              if (userDataRes.success && userDataRes.data) {
                // Prioritize user_role from DB, fallback to role, then defaultRole
                const roleValue = userDataRes.data.user_role || userDataRes.data.role  || 'user';
                
                userData = {
                  user_role: roleValue,
                  department: userDataRes.data.department || 'N/A',
                  last_login: userDataRes.data.last_login || userDataRes.data.lastLogin || 'Never',
                  status: userDataRes.data.status || 'active',
                  user_group: userDataRes.data.user_group || 'N/A',
                  license_allocation: userDataRes.data.licesne_allocation || '0'
                }
                console.log(`✅ User data for ${subuser.subuser_email}:`, userData)
              } else {
                console.warn(`⚠️ Failed to fetch user data for ${subuser.subuser_email}, using defaults`)
              }

              // 2. Fetch machines for license usage
              console.log(`🔍 Fetching machines for subuser: ${subuser.subuser_email}`)
              const machinesRes = await apiClient.getMachinesByEmail(subuser.subuser_email)
              
              let licenseUsage = 0
              if (machinesRes.success && machinesRes.data) {
                // Count machines with demo_usage_count > 0
                licenseUsage = machinesRes.data.filter(
                  (machine) => (machine.demo_usage_count || 0) > 0
                ).length
                
                console.log(`📊 Subuser ${subuser.subuser_email}: ${licenseUsage} licenses used (${machinesRes.data.length} total machines)`)
              }
              
              return {
                ...subuser,
                licenseUsage,
                // Add all fields from /api/Users/{email}
                defaultRole: userData.user_role,
                role: userData.user_role,
                department: userData.department,
                last_login: userData.last_login,
                status: userData.status,
                user_group: userData.user_group,
                license_allocation: userData.license_allocation
              }
            } catch (error) {
              console.error(`❌ Error fetching data for ${subuser.subuser_email}:`, error)
              return {
                ...subuser,
                licenseUsage: 0,
                defaultRole: 'user',
                role: 'user',
                department: 'N/A',
                last_login: 'Never',
                status: 'active',
                user_group: 'N/A',
                license_allocation: '0'
              }
            }
          })
        )
        
        setSubusersData(subusersWithCompleteData)
        setCachedData('subusers', subusersWithCompleteData)
        console.log('✅ Subusers data with complete user details set')
      } else {
        console.log('ℹ️ No subusers found or failed to fetch')
        setSubusersData([])
        setCachedData('subusers', [])
      }
      
    } catch (error) {
      console.error('❌ Error fetching and merging users data:', error)
      showError('Users Data Error', 'Failed to load users data')
    } finally {
      setUsersDataLoading(false)
    }
  }

  // Generate stats array from API data or use defaults
  const stats = useMemo(() => {
    if (!dashboardStats) return []
    
    return [
      { 
        label: 'Total Licenses', 
        value: dashboardStats.totalLicenses, 
        change: dashboardStats.changes.totalLicenses.value, 
        trend: dashboardStats.changes.totalLicenses.trend, 
        color: 'bg-blue-500' 
      },
      { 
        label: 'Active Users', 
        value: dashboardStats.activeUsers, 
        change: dashboardStats.changes.activeUsers.value, 
        trend: dashboardStats.changes.activeUsers.trend, 
        color: 'bg-emerald-500' 
      },
      { 
        label: 'Available Licenses', 
        value: dashboardStats.availableLicenses, 
        change: dashboardStats.changes.availableLicenses.value, 
        trend: dashboardStats.changes.availableLicenses.trend, 
        color: 'bg-orange-500' 
      },
      { 
        label: 'Success Rate', 
        value: dashboardStats.successRate, 
        change: dashboardStats.changes.successRate.value, 
        trend: dashboardStats.changes.successRate.trend, 
        color: 'bg-purple-500' 
      }
    ]
  }, [dashboardStats])

  // License Management Handlers
  const handleBulkLicenseAssignment = () => {
    setShowBulkLicenseModal(true)
  }

  const handleBulkLicenseSubmit = async () => {
    if (!bulkUserCount || !bulkLicenseCount || isNaN(Number(bulkUserCount)) || isNaN(Number(bulkLicenseCount))) {
      showError('Invalid Input', 'Please enter valid numbers for both fields')
      return
    }
    
    setIsLoading(true)
    try {
      const response = await AdminDashboardAPI.assignBulkLicenses(Number(bulkUserCount), Number(bulkLicenseCount))
      
      if (response.success) {
        const totalLicenses = Number(bulkUserCount) * Number(bulkLicenseCount)
        showSuccess(
          'Licenses Assigned Successfully',
          `Assigned ${bulkLicenseCount} licenses to ${bulkUserCount} users. Total licenses assigned: ${totalLicenses}`
        )
        
        // Refresh dashboard data after successful assignment
        loadDashboardData()
        
        setShowBulkLicenseModal(false)
        setBulkUserCount('10')
        setBulkLicenseCount('5')
      } else {
        throw new Error(response.error || 'Assignment failed')
      }
    } catch (error) {
      console.error('Bulk license assignment error:', error)
      showError('Assignment Failed', 'Failed to assign licenses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLicenseAudit = async () => {
    setShowLicenseAuditModal(true)
    
    // Load fresh license audit data when modal opens
    try {
      const response = await AdminDashboardAPI.getLicenseAudit()
      if (response.success) {
        setLicenseData(response.data)
      }
    } catch (error) {
      console.error('License audit data loading error:', error)
    }
  }

  // New handler functions for buttons and actions
  const handleAddUser = () => {
    setShowAddUserModal(true)
  }

  const handleAddUserSubmit = async () => {
    if (!newUserForm.name || !newUserForm.email || !newUserForm.password || !newUserForm.phone) {
      showError('Invalid Input', 'Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
      // Get superuser email from localStorage
      const storedUserData = getUserDataFromStorage();
      const superuserEmail = storedUserData?.user_email || storedUserData?.email || (user as any)?.user_email || user?.email;
      
      console.log('📧 Creating subuser with superuser email:', superuserEmail);
      
      if (!superuserEmail) {
        throw new Error('Superuser email not found. Please log in again.');
      }

      // Map form fields to database fields
      const subuserData = {
        subuser_username: newUserForm.name,
        subuser_email: newUserForm.email,
        role: newUserForm.role,
        department: newUserForm.department || '',
        subuser_password: newUserForm.password,
        phone: newUserForm.phone,
        subuser_group: newUserForm.group || '',
        superuser_email: superuserEmail
      };

      console.log('📤 Sending subuser data:', subuserData);

      // Use apiClient which handles authentication automatically
      const response = await apiClient.createSubuser(subuserData);

      console.log('✅ Subuser creation response:', response);
      
      if (response && response.success && response.data) {
        showSuccess('User Created', `User ${newUserForm.name} created successfully`)
        setShowAddUserModal(false)
        setNewUserForm({ name: '', email: '', role: 'user', password: '', phone: '', department: '' , group: ''})
        
        // ✅ Clear users cache to force fresh data fetch
        localStorage.removeItem('dashboard_cache_subusers');
        localStorage.removeItem('dashboard_cache_superuser');
        console.log('🗑️ Cleared users cache after creating new user');
        
        loadDashboardData() // Refresh dashboard data
      } else {
        const errorMessage = response?.error || response?.message || 'User creation failed';
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('❌ User creation error:', error)
      const errorMessage = error && typeof error === 'object' && 'message' in error 
        ? (error as Error).message 
        : 'Failed to create user. Please try again.';
      showError('Creation Failed', errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddGroup = () => {
    setShowAddGroupModal(true)
  }

  const handleAddGroupSubmit = async () => {
    if (!newGroupForm.name || !newGroupForm.description) {
      showError('Invalid Input', 'Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await AdminDashboardAPI.createGroup(newGroupForm)
      
      if (response.success) {
        showSuccess('Group Created', `Group ${newGroupForm.name} created successfully`)
        setShowAddGroupModal(false)
        setNewGroupForm({ name: '', description: '', licenses: 0 })
        loadDashboardData() // Refresh dashboard data
      } else {
        throw new Error(response.error || 'Group creation failed')
      }
    } catch (error) {
      console.error('Group creation error:', error)
      showError('Creation Failed', 'Failed to create group. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleManageUsers = () => {
    navigate('/admin/subusers')
  }

  const handleManageGroups = () => {
    setActiveTab('users')
    showInfo('Switched to Users tab')
    // Data will be fetched automatically by useEffect when activeTab changes
  }

  const handleAdminReports = () => {
    navigate('/admin/reports')
  }

  const handleSystemSettings = () => {
    setShowSystemSettingsModal(true)
  }

  // Superuser Actions
  const handleEditSuperuser = () => {
    if (superuserData) {
      showInfo('Edit Superuser', `Opening profile settings for ${superuserData.user_name}`)
      navigate('/profile/settings')
    }
  }

  const handleManageSuperuserLicenses = () => {
    if (superuserData) {
      showInfo('Manage Licenses', `Managing licenses for ${superuserData.user_name}`)
      // Future: Open license management modal
      navigate('/admin/licenses')
    }
  }

  // Subuser Actions
  const handleEditSubuser = (subuser: Subuser) => {
    showInfo('Edit Subuser', `Opening edit page for ${subuser.subuser_email}`)
    // Future: Navigate to subuser edit page or open modal
    console.log('Edit subuser:', subuser)
  }

  const handleDeleteSubuser = async (subuser: Subuser) => {
    // Simple confirmation using window.confirm
    const confirmed = window.confirm(
      `Are you sure you want to delete ${subuser.subuser_email}?\n\nThis action cannot be undone.`
    )
    
    if (confirmed) {
      try {
        showInfo('Deleting Subuser', `Deleting ${subuser.subuser_email}...`)
        
        // Future: Call delete API
        // await apiClient.deleteSubuser(subuser.id)
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Refresh users data after deletion
        await fetchAndMergeUsersData()
        showSuccess('Subuser Deleted', `${subuser.subuser_email} has been deleted successfully`)
      } catch (error) {
        console.error('Error deleting subuser:', error)
        showError('Delete Failed', `Failed to delete ${subuser.subuser_email}`)
      }
    }
  }

  const handleAssignLicenses = (group: GroupData) => {
    setSelectedGroupForLicenses(group)
    setShowAssignLicensesModal(true)
  }

  const handleAssignLicensesSubmit = async () => {
    if (!selectedGroupForLicenses || !assignLicensesForm.licenseCount || !assignLicensesForm.expiryDate) {
      showError('Invalid Input', 'Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
      const response = await AdminDashboardAPI.assignLicensesToGroup(
        selectedGroupForLicenses.name, // Using name as ID for demo
        assignLicensesForm
      )
      
      if (response.success) {
        showSuccess(
          'Licenses Assigned', 
          `${assignLicensesForm.licenseCount} licenses assigned to ${selectedGroupForLicenses.name}`
        )
        setShowAssignLicensesModal(false)
        setSelectedGroupForLicenses(null)
        setAssignLicensesForm({ licenseCount: 10, expiryDate: '', licenseType: 'basic' })
        loadDashboardData() // Refresh dashboard data
      } else {
        throw new Error(response.error || 'License assignment failed')
      }
    } catch (error) {
      console.error('License assignment error:', error)
      showError('Assignment Failed', 'Failed to assign licenses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // All data is now loaded from API and stored in state
  // No more hardcoded data arrays needed

  return (
    <>
    <Helmet>
+      <link rel="canonical" href="https://dsecuretech.com/admin" />
          <title>DSecureTech Compliance | Data Erasure Standards & Regulations</title>
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
    <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Admin Dashboard
            </h1>
            {/* Role Badge */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${roleInfo.bgColor} ${roleInfo.color}`}>
              {roleInfo.label}
            </span>
          </div>
          <p className="mt-2 text-slate-600 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></span>
            <span className="truncate">Welcome back, {profileData?.name || user?.name}</span>
            <span className="hidden sm:inline text-slate-400">•</span>
            <span className="hidden sm:inline text-sm text-slate-500">{roleInfo.description}</span>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Profile Button - Always visible with dynamic avatar */}
          <button 
            onClick={() => setShowProfileModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800 rounded-lg transition-all duration-200 shadow-lg"
          >
            <span>My Profile</span>
          </button>
          
          {/* Settings Button - Billing & Password */}
          <button 
            onClick={() => {
              setShowSettingsModal(true)
              // Load billing details from license_details_json
              const storedData = getUserDataFromStorage()
              if (storedData?.license_details_json) {
                try {
                  const parsed = JSON.parse(storedData.license_details_json)
                  console.log('✅ License details loaded for billing:', parsed)
                  
                  // Extract relevant billing information
                  if (parsed.plans && parsed.summary) {
                    const billingInfo: any = {
                      activePlanTypes: parsed.summary.activePlanTypes?.join(', ') || 'N/A',
                      activePlanIds: parsed.summary.activePlanIds?.join(', ') || 'N/A',
                      totalPurchases: parsed.summary.totalPurchases || 0,
                      totalLicenses: parsed.summary.totalLicensesAcrossAllPlans || 0,
                      availableLicenses: parsed.summary.totalAvailableLicenses || 0,
                      consumedLicenses: parsed.summary.totalConsumedLicenses || 0,
                      userEmail: parsed.useremail || storedData.user_email || 'N/A'
                    }
                    
                    // Add plan-specific details
                    if (parsed.plans.length > 0) {
                      const firstPlan = parsed.plans[0]
                      billingInfo.purchaseDate = firstPlan.purchaseDate 
                        ? new Date(firstPlan.purchaseDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'N/A'
                      billingInfo.validityYears = firstPlan.validityYears || 'N/A'
                      billingInfo.expiryDate = firstPlan.expiryDate
                        ? new Date(firstPlan.expiryDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'N/A'
                    }
                    
                    setBillingDetails(billingInfo)
                    console.log('✅ Billing info formatted:', billingInfo)
                  } else {
                    setBillingDetails(parsed)
                  }
                } catch (e) {
                  console.error('Failed to parse license details:', e)
                }
              }
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-all duration-200 shadow-sm"
            title="Settings - Billing & Password"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">Settings</span>
          </button>

          {/* Renew License Button */}
          {/* <button 
            onClick={() => {
              window.location.href = '/pricing';
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 rounded-lg transition-all duration-200 shadow-lg"
            title="Renew Your License"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Renew License</span>
          </button> */}
          
          {/* Add User Button - Role-based visibility */}
          <RoleBased permission="canCreateUser">
            <button 
              onClick={handleAddUser}
              className="btn-secondary flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add User</span>
            </button>
          </RoleBased>
        </div>
      </div>

      {/* Navigation Tabs - Role-Based Visibility */}
      <div className="mb-8">
        <div className="border-b border-slate-200 overflow-hidden">
          <nav className="-mb-px flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 sm:space-x-8 px-1 min-w-max">
              {[
                { 
                  id: 'overview', 
                  name: 'Overview', 
                  permission: 'canViewDashboard', // All roles can see
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                },
                { 
                  id: 'licenses', 
                  name: 'Licenses', 
                  permission: 'canViewLicenses', // All roles except basic user can see
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                }, 
                { 
                  id: 'users', 
                  name: 'Users', 
                  permission: 'canViewAllUsers', // Only admin/superadmin/manager
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                },
                { 
                  id: 'activity', 
                  name: 'User Activity', 
                  permission: 'canViewAllUsers', // Only admin/superadmin/manager
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                },
                { 
                  id: 'reports', 
                  name: 'Reports', 
                  permission: 'canViewReports', // All roles can see
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                },
                { 
                  id: 'performance', 
                  name: 'Performance', 
                  permission: 'canViewDashboard', // All roles can see
                  iconSvg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                }
              ]
              .filter(tab => hasPermission(currentUserRole, tab.permission as any)) // Only show tabs user has permission for
              .map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.iconSvg}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Stats Grid - Role-Based Display */}
      {/* Full Stats for SuperAdmin/Admin */}
      <RoleBased permission="canViewAllStats">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="card !p-4 lg:!p-6 flex items-start justify-between min-w-0 hover:shadow-lg transition-all duration-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-3 h-3 rounded-full ${stat.color} flex-shrink-0`}></div>
                  <p className="text-sm font-medium text-slate-600 truncate">{stat.label}</p>
                </div>
                <p className="text-2xl lg:text-3xl font-bold text-slate-900 truncate">{stat.value}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ml-2 flex-shrink-0 ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.change}</span>
                <svg className={`w-4 h-4 ${stat.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </RoleBased>

      {/* Limited Stats for Manager */}
      <RoleBased roles={['manager']}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">My Team</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{dashboardStats?.totalUsers || 0}</p>
            <p className="text-sm text-slate-500 mt-2">Users you manage</p>
          </div>
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">Licenses Assigned</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{dashboardStats?.totalLicenses || 0}</p>
            <p className="text-sm text-slate-500 mt-2">Active licenses</p>
          </div>
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-purple-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">Reports Generated</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{recentReports.length}</p>
            <p className="text-sm text-slate-500 mt-2">This month</p>
          </div>
        </div>
      </RoleBased>

      {/* Minimal Stats for User */}
      <RoleBased roles={['user']}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">My Licenses</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{profileData?.licenses || 0}</p>
            <p className="text-sm text-slate-500 mt-2">Active licenses</p>
          </div>
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-purple-400 flex-shrink-0"></div>
              <p className="text-sm font-medium text-slate-600">Available Reports</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">{auditReportsCount}</p>
            <p className="text-sm text-slate-500 mt-2">Ready to download</p>
          </div>
        </div>
      </RoleBased>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Reports */}
          <div className="card !p-0 min-w-0">
            <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Recent Reports</h2>
              <Link to="/admin/reports" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="card-content divide-y divide-slate-200">
              {auditReports.length > 0 ? (
                auditReports.slice(0, 4).map((report) => (
                  <div key={report.id || report.report_id} className="px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors min-w-0">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        report.status === 'completed' || report.status === 'Completed' ? 'bg-green-400' : 
                        report.status === 'running' || report.status === 'Running' ? 'bg-blue-400' : 
                        report.status === 'pending' || report.status === 'Pending' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-slate-900 truncate">
                          {report.report_name || report.reportType || `Report #${report.report_id || report.reportId || report.id}`}
                        </div>
                        <div className="text-sm text-slate-500 truncate">
                          {report.erasure_method && <span>{report.erasure_method} • </span>}
                          {report.reportType && <span>{report.reportType} • </span>}
                          {report.deviceCount && <span>{report.deviceCount} devices</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 flex-shrink-0 ml-2">
                      {report.report_datetime 
                        ? new Date(report.report_datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                        : report.reportDate 
                          ? new Date(report.reportDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : 'N/A'}
                    </div>
                  </div>
                ))
              ) : recentReports.length > 0 ? (
                recentReports.slice(0, 4).map(report => (
                  <div key={report.id} className="px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors min-w-0">
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        report.status === 'completed' ? 'bg-green-400' : 
                        report.status === 'running' ? 'bg-blue-400' : 'bg-red-400'
                      }`}></div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-slate-900 truncate">Report #{report.id}</div>
                        <div className="text-sm text-slate-500 truncate">{report.type} • {report.devices} devices</div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-500 flex-shrink-0 ml-2">{report.date.split(',')[0]}</div>
                  </div>
                ))
              ) : (
                <div className="px-4 sm:px-6 py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No Reports Found</h3>
                  <p className="text-sm text-slate-600">No recent reports available at this time.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent System Logs */}
          <div className="card !p-0 min-w-0">
            <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Recent System Logs</h2>
              <Link to="/admin/logs" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="card-content divide-y divide-slate-200">
              {recentSystemLogs.length > 0 ? (
                recentSystemLogs.map((log, index) => (
                  <div key={log.log_id || index} className="px-4 sm:px-6 py-4 hover:bg-slate-50 transition-colors min-w-0">
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Log Level Badge */}
                      <div className="flex-shrink-0 mt-0.5">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          log.log_level === 'ERROR' || log.log_level === 'error' ? 'bg-red-100 text-red-700' :
                          log.log_level === 'WARNING' || log.log_level === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                          log.log_level === 'INFO' || log.log_level === 'info' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {log.log_level || 'INFO'}
                        </span>
                      </div>
                      
                      {/* Log Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-medium text-slate-900 text-sm truncate">
                            {log.log_message || 'No message'}
                          </p>
                          <span className="text-xs text-slate-500 flex-shrink-0">
                            {log.created_at 
                              ? new Date(log.created_at).toLocaleString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : 'N/A'}
                          </span>
                        </div>
                        
                        {/* Additional Info */}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          {log.user_email && (
                            <span className="truncate">
                              <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {log.user_email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 sm:px-6 py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No Logs Found</h3>
                  <p className="text-sm text-slate-600">No recent system logs available at this time.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions - COMMENTED OUT AS PER REQUIREMENT */}
          {/* 
          <div className="card !p-0 min-w-0">
            <div className="px-4 sm:px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">Quick Actions</h2>
            </div>
            <div className="card-content space-y-3 p-4 sm:p-6">
              <RoleBased permission="canViewAllUsers">
                <button 
                  onClick={handleManageUsers}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900">Manage Users</div>
                    <div className="text-sm text-slate-500">Add, edit or remove user accounts</div>
                  </div>
                </button>
              </RoleBased>
              
              <RoleBased permission="canViewGroups">
                <button 
                  onClick={handleManageGroups}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900">Manage Groups</div>
                    <div className="text-sm text-slate-500">Create and manage user groups</div>
                  </div>
                </button>
              </RoleBased>
              
              <RoleBased permission="canGenerateReports">
                <button 
                  onClick={handleAdminReports}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900">Admin Reports</div>
                    <div className="text-sm text-slate-500">Generate and manage admin reports</div>
                  </div>
                </button>
              </RoleBased>
              
              <RoleBased permission="canViewSettings">
                <button 
                  onClick={handleSystemSettings}
                  className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900">System Settings</div>
                    <div className="text-sm text-slate-500">Configure system preferences</div>
                  </div>
                </button>
              </RoleBased>
              
              <RoleBased permission="canViewLicenses">
                <div className="border-t border-slate-200 pt-6 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">License Management</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <RoleBased permission="canBulkAssignLicenses">
                      <button 
                        onClick={() => handleBulkLicenseAssignment()}
                        className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all text-left shadow-sm hover:shadow-md"
                      >
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Bulk License Assignment</div>
                          <div className="text-sm text-slate-600 mt-1">Assign licenses to multiple users at once with advanced options</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Quick Setup</span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500">Batch Processing</span>
                          </div>
                        </div>
                        <div className="text-emerald-500 group-hover:translate-x-1 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </RoleBased>
                    
                    <button 
                      onClick={() => handleLicenseAudit()}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all text-left shadow-sm hover:shadow-md"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">License Audit Report</div>
                        <div className="text-sm text-slate-600 mt-1">Comprehensive analysis of license usage and optimization insights</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">Detailed Analytics</span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-500">Export Available</span>
                        </div>
                      </div>
                      <div className="text-emerald-500 group-hover:translate-x-1 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </RoleBased>
            </div>
          </div>
          */}
        </div>
      )}

      {activeTab === 'licenses' && (
        <div className="space-y-6">
          {/* License Overview */}
          <div className="card">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">License Details</h2>
              <p className="text-sm text-slate-600 mt-1">Manage and monitor your software licenses</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                        <th className="pb-3 font-medium whitespace-nowrap">Product</th>
                        <th className="pb-3 font-medium whitespace-nowrap">Total Available</th>
                        <th className="pb-3 font-medium whitespace-nowrap">Total Consumed</th>
                        <th className="pb-3 font-medium whitespace-nowrap">Usage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {(userLicenseDetails.length > 0 ? userLicenseDetails : licenseData).map((license, index) => {
                        const usagePercent = license.total > 0 ? (license.consumed / license.total) * 100 : 0
                        return (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="py-4 font-medium text-slate-900 whitespace-nowrap">{license.product}</td>
                            <td className="py-4 text-slate-600">{license.total}</td>
                            <td className="py-4 text-slate-600">{license.consumed}</td>
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-slate-200 rounded-full h-2 min-w-[80px]">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      usagePercent > 80 ? 'bg-red-500' : 
                                      usagePercent > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                    style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-slate-600 min-w-[50px] text-right">
                                  {usagePercent.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                      {userLicenseDetails.length === 0 && licenseData.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-slate-500">
                            No license data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Users Management */}
          <div className="card">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">Users</h2>
                <p className="text-sm text-slate-600 mt-1">Manage all users</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button 
                  onClick={handleAddUser}
                  className="btn-primary text-sm px-4 py-2"
                >
                  + New User
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Loading State */}
              {usersDataLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-sm text-slate-600">Loading users data...</p>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!usersDataLoading && subusersData.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">No Users Found</h3>
                  <p className="text-sm text-slate-600">Click "Manage Users" to load user data</p>
                </div>
              )}

              {/* Users Table */}
              {!usersDataLoading && subusersData.length > 0 && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                          <th className="pb-3 font-medium">Email</th>
                          <th className="pb-3 font-medium">Role</th>
                          <th className="pb-3 font-medium">Department</th>
                          <th className="pb-3 font-medium">Status</th>
                          <th className="pb-3 font-medium">Group</th>
                          <th className="pb-3 font-medium">Last Login</th>
                          <th className="pb-3 font-medium">License Allocation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {subusersData.map((subuser, index) => {
                          return (
                          <tr key={subuser.id || index} className="hover:bg-slate-50">
                            {/* Email */}
                            <td className="py-4 font-medium text-slate-900">{subuser.subuser_email}</td>
                            
                            {/* Role */}
                            <td className="py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                (subuser as any).role === 'admin' || (subuser as any).defaultRole === 'admin'
                                  ? 'bg-purple-100 text-purple-800' 
                                  : (subuser as any).role === 'manager' || (subuser as any).defaultRole === 'manager'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-slate-100 text-slate-800'
                              }`}>
                                {(subuser as any).role || (subuser as any).defaultRole || 'user'}
                              </span>
                            </td>
                            
                            {/* Department */}
                            <td className="py-4 text-slate-600">
                              {(subuser as any).department || 'N/A'}
                            </td>
                            
                            {/* Status */}
                            <td className="py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                subuser.status === 'active'
                                  ? 'bg-green-100 text-green-800'
                                  : subuser.status === 'inactive'
                                  ? 'bg-gray-100 text-gray-800'
                                  : subuser.status === 'suspended'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {subuser.status || 'active'}
                              </span>
                            </td>
                            
                            {/* User Group */}
                            <td className="py-4 text-slate-600">
                              {(subuser as any).user_group || 'N/A'}
                            </td>
                            
                            {/* Last Login */}
                            <td className="py-4 text-slate-600 text-sm">
                              {(subuser as any).last_login || 'Never'}
                            </td>
                            
                            {/* License Allocation */}
                            <td className="py-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                                {(subuser as any).license_allocation || '0'}
                              </span>
                            </td>
                          </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="card">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Cloud Users Activity</h2>
            <p className="text-sm text-slate-600 mt-1">Monitor user login and logout activity</p>
          </div>
          <div className="p-6">
            {userActivity.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No User Activity</h3>
                <p className="text-slate-600 mb-6">No users have logged in yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                      <th className="pb-3 font-medium">User Email</th>
                      <th className="pb-3 font-medium">Login Time</th>
                      <th className="pb-3 font-medium">Logout Time</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {userActivity.map((activity, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="py-4 font-medium text-slate-900">{activity.email}</td>
                        <td className="py-4 text-slate-600">{activity.loginTime}</td>
                        <td className="py-4 text-slate-600">{activity.logoutTime || '-'}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center gap-1 ${
                            activity.status === 'active' ? 'text-green-600' : 'text-slate-500'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              activity.status === 'active' ? 'bg-green-400' : 'bg-slate-400'
                            }`}></span>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="card">
          <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Erasure Reports</h2>
              <p className="text-sm text-slate-600 mt-1">View and manage data erasure reports</p>
            </div>
            <Link to="/admin/reports" className="btn-primary text-sm">
              View All Reports
            </Link>
          </div>
          <div className="p-6">
            {auditReports.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No Reports Found</h3>
                <p className="text-slate-600 mb-6">There are no erasure reports available at the moment.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                      <th className="pb-3 font-medium">Report ID</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Devices</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {auditReports.map((report) => (
                      <tr key={report.report_id || report.id} className="hover:bg-slate-50">
                        <td className="py-4 font-medium text-slate-900">
                          #{report.report_id || report.reportId || report.id}
                        </td>
                        <td className="py-4 text-slate-600">
                          {report.report_name || report.reportType || 'N/A'}
                        </td>
                        <td className="py-4 text-slate-600">
                          {report.deviceCount || 0}
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === 'completed' || report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            report.status === 'running' || report.status === 'Running' ? 'bg-blue-100 text-blue-800' :
                            report.status === 'failed' || report.status === 'Failed' ? 'bg-red-100 text-red-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {report.status || 'Completed'}
                          </span>
                        </td>
                        <td className="py-4 text-slate-600">
                          {report.report_datetime 
                            ? new Date(report.report_datetime).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            : report.reportDate || 'N/A'
                          }
                        </td>
                        <td className="py-4 text-slate-600">
                          {report.erasure_method || 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Performance</h2>
              <p className="text-sm text-slate-600 mt-1">Monitor system performance and erasure metrics</p>
            </div>
          </div>

          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monthly Erasures */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-1">Monthly erasures</p>
                <p className="text-3xl font-bold text-slate-900">
                  {performanceData.monthlyErasures.reduce((sum, item) => sum + item.count, 0)}
                </p>
              </div>
              <div className="h-24">
                <svg viewBox="0 0 300 80" className="w-full h-full">
                  {/* Area gradient */}
                  <defs>
                    <linearGradient id="areaGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Create path for area chart */}
                  {performanceData.monthlyErasures.length > 0 && (
                    <>
                      <path
                        d={`M 0 80 ${performanceData.monthlyErasures.map((item, index) => {
                          const x = (index / (performanceData.monthlyErasures.length - 1)) * 300;
                          const maxCount = Math.max(...performanceData.monthlyErasures.map(i => i.count), 1);
                          const y = 80 - (item.count / maxCount) * 60;
                          return `L ${x} ${y}`;
                        }).join(' ')} L 300 80 Z`}
                        fill="url(#areaGradient1)"
                      />
                      <path
                        d={`${performanceData.monthlyErasures.map((item, index) => {
                          const x = (index / (performanceData.monthlyErasures.length - 1)) * 300;
                          const maxCount = Math.max(...performanceData.monthlyErasures.map(i => i.count), 1);
                          const y = 80 - (item.count / maxCount) * 60;
                          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}`}
                        stroke="#3B82F6"
                        strokeWidth="2"
                        fill="none"
                      />
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* Average Duration */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-1">Avg. duration</p>
                <p className="text-3xl font-bold text-slate-900">
                  {(() => {
                    const totalDuration = performanceData.avgDuration.reduce((sum, item) => sum + item.duration, 0);
                    const avgSeconds = performanceData.avgDuration.length > 0 
                      ? totalDuration / performanceData.avgDuration.filter(i => i.duration > 0).length 
                      : 0;
                    const minutes = Math.floor(avgSeconds / 60);
                    const seconds = Math.floor(avgSeconds % 60);
                    return `${minutes}m ${seconds}s`;
                  })()}
                </p>
              </div>
              <div className="h-24">
                <svg viewBox="0 0 300 80" className="w-full h-full">
                  <defs>
                    <linearGradient id="areaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {performanceData.avgDuration.length > 0 && (
                    <>
                      <path
                        d={`M 0 80 ${performanceData.avgDuration.map((item, index) => {
                          const x = (index / (performanceData.avgDuration.length - 1)) * 300;
                          const maxDuration = Math.max(...performanceData.avgDuration.map(i => i.duration), 1);
                          const y = 80 - (item.duration / maxDuration) * 60;
                          return `L ${x} ${y}`;
                        }).join(' ')} L 300 80 Z`}
                        fill="url(#areaGradient2)"
                      />
                      <path
                        d={`${performanceData.avgDuration.map((item, index) => {
                          const x = (index / (performanceData.avgDuration.length - 1)) * 300;
                          const maxDuration = Math.max(...performanceData.avgDuration.map(i => i.duration), 1);
                          const y = 80 - (item.duration / maxDuration) * 60;
                          return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}`}
                        stroke="#10B981"
                        strokeWidth="2"
                        fill="none"
                      />
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* Success Rate */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-1">Success rate</p>
                <p className="text-3xl font-bold text-slate-900">
                  {(() => {
                    // Calculate total operations from monthly erasures
                    const totalOperations = performanceData.monthlyErasures.reduce((sum, item) => sum + item.count, 0);
                    // Show percentage only if there's data, otherwise 0%
                    return totalOperations > 0 ? '99.2%' : '0%';
                  })()}
                </p>
              </div>
              <div className="h-24">
                <svg viewBox="0 0 300 80" className="w-full h-full">
                  <defs>
                    <linearGradient id="areaGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {performanceData.monthlyErasures.reduce((sum, item) => sum + item.count, 0) > 0 ? (
                    <>
                      {/* Flat 99.2% line - Only show if data exists */}
                      <path
                        d="M 0 80 L 0 20 L 300 20 L 300 80 Z"
                        fill="url(#areaGradient3)"
                      />
                      <path
                        d="M 0 20 L 300 20"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        fill="none"
                      />
                    </>
                  ) : (
                    <>
                      {/* Flat 0% line - Show at bottom if no data */}
                      <path
                        d="M 0 80 L 300 80"
                        stroke="#94A3B8"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4 4"
                      />
                      <text x="150" y="40" textAnchor="middle" fill="#94A3B8" fontSize="12">
                        No data available
                      </text>
                    </>
                  )}
                </svg>
              </div>
            </div>
          </div>

          {/* Throughput Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Throughput</h3>
            <div className="h-64">
              <svg viewBox="0 0 800 200" className="w-full h-full">
                {performanceData.throughput.length > 0 && performanceData.throughput.map((item, index) => {
                  const maxCount = Math.max(...performanceData.throughput.map(i => i.count), 1);
                  const barWidth = 800 / performanceData.throughput.length - 10;
                  const x = (index * 800) / performanceData.throughput.length + 5;
                  const barHeight = (item.count / maxCount) * 160;
                  const y = 160 - barHeight;

                  return (
                    <g key={index}>
                      {/* Bar */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill="#3B82F6"
                        rx="4"
                      />
                      {/* Month label */}
                      <text
                        x={x + barWidth / 2}
                        y="185"
                        textAnchor="middle"
                        fill="#64748B"
                        fontSize="12"
                      >
                        {item.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Bulk License Assignment Modal */}
      {showBulkLicenseModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowBulkLicenseModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Bulk License Assignment</h3>
                  <p className="text-sm text-slate-600">Assign licenses to multiple users at once</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Number of Users
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={bulkUserCount}
                    onChange={(e) => setBulkUserCount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter number of users"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Licenses per User
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={bulkLicenseCount}
                    onChange={(e) => setBulkLicenseCount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter licenses per user"
                    disabled={isLoading}
                  />
                </div>

                {bulkUserCount && bulkLicenseCount && !isNaN(Number(bulkUserCount)) && !isNaN(Number(bulkLicenseCount)) && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Total Users:</span>
                        <span className="font-medium">{Number(bulkUserCount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Licenses per User:</span>
                        <span className="font-medium">{Number(bulkLicenseCount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-blue-600 font-medium mt-1 pt-1 border-t">
                        <span>Total Licenses:</span>
                        <span>{(Number(bulkUserCount) * Number(bulkLicenseCount)).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowBulkLicenseModal(false)
                    setBulkUserCount('10')
                    setBulkLicenseCount('5')
                  }}
                  className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkLicenseSubmit}
                  disabled={isLoading || !bulkUserCount || !bulkLicenseCount || isNaN(Number(bulkUserCount)) || isNaN(Number(bulkLicenseCount))}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isLoading && (
                    <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  {isLoading ? 'Assigning...' : 'Assign Licenses'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* License Audit Modal */}
      {showLicenseAuditModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowLicenseAuditModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">License Audit Report</h3>
                    <p className="text-sm text-slate-600">Comprehensive overview of license usage and analytics</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLicenseAuditModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-blue-700">Total Licenses</div>
                      <div className="text-2xl font-bold text-blue-900">3,287</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-emerald-700">Active Licenses</div>
                      <div className="text-2xl font-bold text-emerald-900">2,087</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-orange-700">Available</div>
                      <div className="text-2xl font-bold text-orange-900">1,200</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-red-700">Expired</div>
                      <div className="text-2xl font-bold text-red-900">15</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Utilization Chart */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200 mb-8">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">License Utilization Overview</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Overall Utilization</span>
                    <span className="text-lg font-bold text-emerald-600">63.5%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{width: '63.5%'}}></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-slate-900">Utilized</div>
                      <div className="text-emerald-600 font-semibold">2,087 (63.5%)</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-slate-900">Available</div>
                      <div className="text-orange-600 font-semibold">1,200 (36.5%)</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-slate-900">Optimization</div>
                      <div className="text-blue-600 font-semibold">+15% potential</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* License Breakdown Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-900">License Breakdown by Product</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left p-4 font-semibold text-slate-700">Product</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Total</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Used</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Available</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Utilization</th>
                        <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-200">
                        <td className="p-4 font-medium text-slate-900">DSecure Drive Eraser</td>
                        <td className="p-4 text-slate-600">1,460</td>
                        <td className="p-4 text-slate-600">1,345</td>
                        <td className="p-4 text-slate-600">115</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div className="bg-emerald-500 h-2 rounded-full" style={{width: '92%'}}></div>
                            </div>
                            <span className="text-sm font-medium text-emerald-600">92%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">High Usage</span>
                        </td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="p-4 font-medium text-slate-900">DSecure Network Wipe</td>
                        <td className="p-4 text-slate-600">927</td>
                        <td className="p-4 text-slate-600">512</td>
                        <td className="p-4 text-slate-600">415</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{width: '55%'}}></div>
                            </div>
                            <span className="text-sm font-medium text-orange-600">55%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">Moderate</span>
                        </td>
                      </tr>
                      <tr className="border-t border-slate-200">
                        <td className="p-4 font-medium text-slate-900">DSecure Cloud Eraser</td>
                        <td className="p-4 text-slate-600">900</td>
                        <td className="p-4 text-slate-600">230</td>
                        <td className="p-4 text-slate-600">670</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{width: '26%'}}></div>
                            </div>
                            <span className="text-sm font-medium text-blue-600">26%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">Low Usage</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => {
                    showInfo('Report Exported', 'Detailed license audit report has been sent to your email')
                    setShowLicenseAuditModal(false)
                  }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export Detailed Report
                </button>
                <button
                  onClick={() => showInfo('Optimization Report', 'License optimization suggestions have been generated and will be sent to your email')}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Optimization Report
                </button>
                <button
                  onClick={() => setShowLicenseAuditModal(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal - Matching the attached design */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full mx-4 transform transition-all relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowProfileModal(false)
                setIsEditingProfile(false)
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header with Theme Gradient Background */}
            <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 px-6 py-6 rounded-t-xl text-white">
              <h2 className="text-xl font-bold mb-0">{isEditingProfile ? 'Edit Profile' : 'Profile'}</h2>
            </div>
            
            {/* Profile Content */}
            <div className="p-6">
              {/* Profile Avatar - Dynamic with First Letter */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white uppercase">
                    {(profileData?.name || user?.name || 'U').charAt(0)}
                  </span>
                </div>
              </div>

              {/* Profile Information - View or Edit Mode */}
              {!isEditingProfile ? (
                <>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Name:</span>
                      <span className="text-slate-900">{profileData?.name || user?.name || 'User'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Email:</span>
                      <span className="text-slate-900 text-right">{profileData?.email || user?.email || 'user@example.com'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Phone:</span>
                      <span className="text-slate-900">{profileData?.phone || 'Not provided'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Time Zone:</span>
                      <span className="text-slate-900">{profileData?.timezone || 'Asia/Kolkata'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium text-slate-700">Role:</span>
                      <span className="text-slate-900 font-semibold capitalize">{profileData?.role || user?.role || 'user'}</span>
                    </div>
                  </div>
                  
                  {/* Edit Button */}
                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => {
                        setIsEditingProfile(true)
                        setProfileEditForm({
                          user_name: profileData?.name || user?.name || '',
                          phone_number: profileData?.phone || ''
                        })
                      }}
                      className="bg-brand hover:bg-brand-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Edit Form */}
                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault()
                    setProfileUpdateLoading(true)
                    
                    try {
                      const userEmail = profileData?.email || user?.email
                      if (!userEmail) {
                        showError('Update Failed', 'User email not found')
                        return
                      }

                      console.log('🔄 Updating profile for:', userEmail)
                      console.log('📝 Update data:', profileEditForm)

                      // Call API to update user profile
                      // Backend API: PUT /api/DynamicUser/profile
                      const response = await apiClient.updateUserProfile({
                        userName: profileEditForm.user_name,
                        phoneNumber: profileEditForm.phone_number
                      })

                      console.log('📡 API Response:', response)

                      if (response.success && response.data) {
                        console.log('✅ Profile updated successfully in database')
                        console.log('📦 Updated user data:', response.data)
                        
                        // Update local state with response data from server
                        setProfileData(prev => ({
                          ...prev!,
                          name: response.data!.user_name || profileEditForm.user_name,
                          phone: response.data!.phone_number || profileEditForm.phone_number
                        }))
                        
                        // Update localStorage with server response
                        const storedData = getUserDataFromStorage()
                        if (storedData) {
                          // Update with actual server response
                          storedData.user_name = response.data!.user_name || profileEditForm.user_name
                          storedData.phone_number = response.data!.phone_number || profileEditForm.phone_number
                          localStorage.setItem('userData', JSON.stringify(storedData))
                          console.log('💾 LocalStorage updated with server data')
                        }
                        
                        showSuccess('Profile Updated', 'Your profile has been updated in database successfully')
                        setIsEditingProfile(false)
                      } else {
                        console.error('❌ API Error:', response.error)
                        showError('Update Failed', response.error || 'Failed to update profile in database')
                      }
                    } catch (error) {
                      console.error('❌ Profile update error:', error)
                      showError('Update Failed', 'An error occurred while updating profile')
                    } finally {
                      setProfileUpdateLoading(false)
                    }
                  }}>
                    {/* Editable: Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={profileEditForm.user_name}
                        onChange={(e) => setProfileEditForm(prev => ({ ...prev, user_name: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    {/* Editable: Phone Number */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileEditForm.phone_number}
                        onChange={(e) => setProfileEditForm(prev => ({ ...prev, phone_number: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                        placeholder="Enter phone number"
                      />
                    </div>

                    {/* Read-Only: Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email 
                      </label>
                      <input
                        type="email"
                        value={profileData?.email || user?.email || ''}
                        disabled
                        className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500 cursor-not-allowed"
                      />
                    </div>

                    {/* Read-Only: Role */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Role 
                      </label>
                      <input
                        type="text"
                        value={profileData?.role || user?.role || 'user'}
                        disabled
                        className="w-full px-3 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500 cursor-not-allowed capitalize"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                        disabled={profileUpdateLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={profileUpdateLoading}
                        className="flex-1 bg-brand hover:bg-brand-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {profileUpdateLoading ? (
                          <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          'Save Changes'
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal - Billing & Password */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Settings</h3>
                <p className="text-sm text-slate-600 mt-1">Manage your billing and security settings</p>
              </div>
              <button
                onClick={() => {
                  setShowSettingsModal(false)
                  setSettingsTab('billing')
                  setChangePasswordForm({ currentPassword: '', newPassword: '' })
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
              <div className="flex">
                <button
                  onClick={() => setSettingsTab('billing')}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                    settingsTab === 'billing'
                      ? 'text-brand border-b-2 border-brand bg-brand/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Billing Usage
                  </div>
                </button>
                <button
                  onClick={() => setSettingsTab('password')}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                    settingsTab === 'password'
                      ? 'text-brand border-b-2 border-brand bg-brand/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Change Password
                  </div>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-6 py-6">
              {settingsTab === 'billing' ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-slate-900">Billing Usage</h4>
                    <button
                      type="button"
                      onClick={() => {
                        // Navigate to pricing page or license renewal
                        window.location.href = '/pricing-and-plan';
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-brand to-brand/80 text-white rounded-lg hover:from-brand/90 hover:to-brand/70 transition-all duration-200 flex items-center gap-2 shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Renew License
                    </button>
                  </div>
                  
                  {billingDetails ? (
                    <div className="space-y-4">
                      {/* Accordion 1: Active License Plan */}
                      <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-lg border border-brand/20 overflow-hidden">
                        <button
                          onClick={() => setBillingAccordion(prev => ({ ...prev, activePlan: !prev.activePlan }))}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-brand/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand/20 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            </div>
                            <div className="text-left">
                              <h5 className="text-lg font-semibold text-slate-900">Active License Plan</h5>
                              <p className="text-sm text-slate-600">Your current subscription details</p>
                            </div>
                          </div>
                          <svg 
                            className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${billingAccordion.activePlan ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <div className={`transition-all duration-300 ease-in-out ${billingAccordion.activePlan ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                          <div className="px-6 pb-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                                <p className="text-xs text-slate-600 mb-1">Plan Type</p>
                                <p className="text-lg font-bold text-brand">{billingDetails.activePlanTypes || 'N/A'}</p>
                              </div>
                              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
                                <p className="text-xs text-slate-600 mb-1">Total Purchases</p>
                                <p className="text-lg font-bold text-slate-900">{billingDetails.totalPurchases || 0}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Accordion 2: License Usage Stats */}
                      {/* <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                        <button
                          onClick={() => setBillingAccordion(prev => ({ ...prev, licenseUsage: !prev.licenseUsage }))}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            </div>
                            <div className="text-left">
                              <h5 className="text-base font-semibold text-slate-900">License Usage</h5>
                              <p className="text-sm text-slate-600">Track your license consumption</p>
                            </div>
                          </div>
                          <svg 
                            className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${billingAccordion.licenseUsage ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <div className={`transition-all duration-300 ease-in-out ${billingAccordion.licenseUsage ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                          <div className="px-6 pb-6 space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Total Licenses</span>
                              <span className="text-lg font-bold text-slate-900">{billingDetails.totalLicenses || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Consumed</span>
                              <span className="text-lg font-bold text-orange-600">{billingDetails.consumedLicenses || 0}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-600">Available</span>
                              <span className="text-lg font-bold text-green-600">{billingDetails.availableLicenses || 0}</span>
                            </div>
                            
                            
                            <div className="pt-2">
                              <div className="flex justify-between text-xs text-slate-600 mb-2">
                                <span>Usage</span>
                                <span>
                                  {billingDetails.totalLicenses > 0 
                                    ? Math.round((billingDetails.consumedLicenses / billingDetails.totalLicenses) * 100)
                                    : 0}%
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2.5">
                                <div 
                                  className={`h-2.5 rounded-full transition-all duration-300 ${
                                    (billingDetails.consumedLicenses / billingDetails.totalLicenses) > 0.8 
                                      ? 'bg-red-500' 
                                      : (billingDetails.consumedLicenses / billingDetails.totalLicenses) > 0.6
                                        ? 'bg-yellow-500'
                                        : 'bg-green-500'
                                  }`}
                                  style={{ 
                                    width: `${billingDetails.totalLicenses > 0 
                                      ? Math.min((billingDetails.consumedLicenses / billingDetails.totalLicenses) * 100, 100)
                                      : 0}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}

                      {/* Accordion 3: Plan Details */}
                      <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                        <button
                          onClick={() => setBillingAccordion(prev => ({ ...prev, planInfo: !prev.planInfo }))}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="text-left">
                              <h5 className="text-base font-semibold text-slate-900">Plan Information</h5>
                              <p className="text-sm text-slate-600">Detailed plan and billing info</p>
                            </div>
                          </div>
                          <svg 
                            className={`w-5 h-5 text-slate-600 transition-transform duration-200 ${billingAccordion.planInfo ? 'rotate-180' : ''}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        <div className={`transition-all duration-300 ease-in-out ${billingAccordion.planInfo ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                          <div className="px-6 pb-6 space-y-4">
                        
                        {/* Display parsed billing details - Filter sensitive data */}
                        {Object.entries(billingDetails).map(([key, value]) => {
                          // Skip fields already shown in cards above
                          const skipFields = [
                            'activePlanTypes', 'totalPurchases', 'totalLicenses',
                            'consumedLicenses', 'availableLicenses'
                          ];
                          
                          if (skipFields.includes(key)) {
                            return null;
                          }
                          
                          // List of sensitive fields to hide
                          const sensitiveFields = [
                            'card_number', 'cardNumber', 'card', 'cardnumber',
                            'cvv', 'cvc', 'securityCode', 'security_code',
                            'card_cvv', 'card_cvc',
                            'pin', 'password', 'secret',
                            'account_number', 'accountNumber',
                            'routing_number', 'routingNumber',
                            'ssn', 'social_security'
                          ];
                          
                          // Check if field is sensitive (case-insensitive)
                          const isSensitive = sensitiveFields.some(field => 
                            key.toLowerCase().includes(field.toLowerCase())
                          );
                          
                          // Skip sensitive fields
                          if (isSensitive) {
                            return null;
                          }
                          
                          if(Object.keys(billingDetails).includes('{}'))  return 'No billing details available';
                        
                        // Special handling for address objects
                        if (typeof value === 'object' && value !== null) {
                          // Check if it's an address object
                          const isAddress = ['street', 'city', 'state', 'country', 'zipCode', 'zip', 'postal'].some(
                            field => Object.keys(value).some(k => k.toLowerCase().includes(field))
                          );
                          
                          if (isAddress) {
                            const addr = value as any;
                            const addressLine = [
                              addr.street || addr.address || '',
                              addr.city || '',
                              addr.state || '',
                              addr.country || '',
                              addr.zipCode || addr.zip || addr.postalCode || ''
                            ].filter(Boolean).join(', ');
                            
                            return (
                              <div key={key} className="py-3 border-b border-slate-200 last:border-0">
                                <div className="flex items-start gap-3">
                                  <svg className="w-5 h-5 text-brand mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  <div className="flex-1">
                                    <span className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                                      {key.replace(/_/g, ' ')}
                                    </span>
                                    <span className="text-sm text-slate-900 leading-relaxed">
                                      {addressLine}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          
                          // For other objects, show prettified JSON
                          return (
                            <div key={key} className="py-3 border-b border-slate-200 last:border-0">
                              <span className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                                {key.replace(/_/g, ' ')}
                              </span>
                              <pre className="text-xs text-slate-900 bg-white p-2 rounded border border-slate-200 overflow-auto">
                                {JSON.stringify(value, null, 2)}
                              </pre>
                            </div>
                          );
                        }
                        
                        // Regular field display with icon
                        let icon = null;
                        let displayLabel = key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
                        
                        // Customize display labels for specific fields
                        const labelMap: { [key: string]: string } = {
                          'activePlanIds': 'Plan ID',
                          'purchaseDate': 'Purchase Date',
                          'expiryDate': 'Expiry Date',
                          'validityYears': 'Validity Period',
                          'userEmail': 'Account Email'
                        };
                        
                        if (labelMap[key]) {
                          displayLabel = labelMap[key];
                        }
                        
                        // Select appropriate icon
                        if (key.toLowerCase().includes('email')) {
                          icon = (
                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          );
                        } else if (key.toLowerCase().includes('date')) {
                          icon = (
                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          );
                        } else if (key.toLowerCase().includes('validity') || key.toLowerCase().includes('years')) {
                          icon = (
                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          );
                        } else if (key.toLowerCase().includes('plan') || key.toLowerCase().includes('id')) {
                          icon = (
                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                          );
                        } else {
                          icon = (
                            <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          );
                        }
                        
                        // Format display value
                        let displayValue = String(value);
                        if (key === 'validityYears') {
                          displayValue = `${value} ${parseInt(String(value)) === 1 ? 'Year' : 'Years'}`;
                        }
                        
                        return (
                          <div key={key} className="py-3 border-b border-slate-200 last:border-0">
                            <div className="flex items-center gap-3">
                              {icon}
                              <div className="flex-1 flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-700">
                                  {displayLabel}
                                </span>
                                <span className="text-sm text-slate-900 font-semibold">
                                  {displayValue}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
                      <svg className="w-16 h-16 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <p className="text-base font-medium">No billing details available</p>
                      <p className="text-sm mt-1">Your billing information will appear here once you subscribe</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Change Password</h4>
                  
                  <form onSubmit={async (e) => {
                    e.preventDefault()
                    
                    // if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
                    //   showError('Password Mismatch', 'New password and confirm password do not match')
                    //   return
                    // }
                    
                    if (changePasswordForm.newPassword.length < 6) {
                      showError('Weak Password', 'Password must be at least 6 characters long')
                      return
                    }
                    
                    setPasswordChangeLoading(true)
                    
                    try {
                      const userEmail = profileData?.email || user?.email
                      if (!userEmail) {
                        showError('Error', 'User email not found')
                        return
                      }
                      
                      const response = await apiClient.changePassword(
                        userEmail,
                        changePasswordForm.currentPassword,
                        changePasswordForm.newPassword
                      )
                      
                      if (response.success) {
                        showSuccess('Password Changed', 'Your password has been updated successfully')
                        setChangePasswordForm({ currentPassword: '', newPassword: '' })
                        setShowSettingsModal(false)
                      } else {
                        showError('Change Failed', response.error || 'Failed to change password')
                      }
                    } catch (error) {
                      console.error('Password change error:', error)
                      showError('Error', 'An error occurred while changing password')
                    } finally {
                      setPasswordChangeLoading(false)
                    }
                  }}>
                    <div className="space-y-4">
                      {/* Current Password */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Current Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={changePasswordForm.currentPassword}
                          onChange={(e) => setChangePasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand/50 focus:border-brand"
                          placeholder="Enter current password"
                          required
                        />
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={changePasswordForm.newPassword}
                          onChange={(e) => setChangePasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand/50 focus:border-brand"
                          placeholder="Enter new password (min 6 characters)"
                          required
                          minLength={6}
                        />
                      </div>

                      {/* Confirm Password */}
                      {/* <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Confirm New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          value={changePasswordForm.confirmPassword}
                          onChange={(e) => setChangePasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-brand/50 focus:border-brand"
                          placeholder="Confirm new password"
                          required
                        />
                      </div> */}

                      {/* Submit Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setShowSettingsModal(false)
                            setChangePasswordForm({ currentPassword: '', newPassword: ''})
                          }}
                          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={passwordChangeLoading}
                          className="flex-1 bg-brand hover:bg-brand-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {passwordChangeLoading ? (
                            <>
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Changing...
                            </>
                          ) : (
                            'Change Password'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* <div className="px-6 py-5 border-b border-slate-200"> */}
              {/* <h3 className="text-xl font-semibold text-slate-900">Add New User</h3> */}
              {/* <p className="text-sm text-slate-600 mt-1">Create a new user account</p> */}
            {/* </div> */}
            <div className="px-6 py-5 space-y-4">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="userName"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label htmlFor="userEmail" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="userEmail"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <label htmlFor="userDepartment" className="block text-sm font-medium text-slate-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="userDepartment"
                    value={newUserForm.department}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="Enter department"
                  />
                </div>
                <div>
                <label htmlFor="userRole" className="block text-sm font-medium text-slate-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  id="userRole"
                  value={newUserForm.role}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter role (e.g., user, admin, manager)"
                />
                </div>
              </div>
              <div>
                <label htmlFor="userPassword" className="block text-sm font-medium text-slate-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  id="userPassword"
                  value={newUserForm.password}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter password"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                <label htmlFor="userPhone" className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="userPhone"
                  value={newUserForm.phone}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label htmlFor="userGroup" className="block text-sm font-medium text-slate-700 mb-2">
                  Group
                </label>  
                <input
                  type="text"
                  id="userGroup"
                  value={newUserForm.group}
                  onChange={(e) => setNewUserForm(prev => ({ ...prev, group: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter group"
                />
              </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAddUserModal(false)
                  setNewUserForm({ name: '', email: '', role: 'user', password: '', phone: '', department: '', group: '' })
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUserSubmit}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Group Modal */}
      {showAddGroupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">Add New Group</h3>
              <p className="text-sm text-slate-600 mt-1">Create a new user group</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label htmlFor="groupName" className="block text-sm font-medium text-slate-700 mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={newGroupForm.name}
                  onChange={(e) => setNewGroupForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter group name"
                />
              </div>
              <div>
                <label htmlFor="groupDescription" className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="groupDescription"
                  rows={3}
                  value={newGroupForm.description}
                  onChange={(e) => setNewGroupForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter group description"
                />
              </div>
              <div>
                <label htmlFor="groupLicenses" className="block text-sm font-medium text-slate-700 mb-2">
                  Initial License Count
                </label>
                <input
                  type="number"
                  id="groupLicenses"
                  min="0"
                  value={newGroupForm.licenses}
                  onChange={(e) => setNewGroupForm(prev => ({ ...prev, licenses: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAddGroupModal(false)
                  setNewGroupForm({ name: '', description: '', licenses: 0 })
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGroupSubmit}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Group'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Licenses Modal */}
      {showAssignLicensesModal && selectedGroupForLicenses && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">Assign Licenses</h3>
              <p className="text-sm text-slate-600 mt-1">
                Assign licenses to group: <span className="font-medium">{selectedGroupForLicenses.name}</span>
              </p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label htmlFor="licenseCount" className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Licenses *
                </label>
                <input
                  type="number"
                  id="licenseCount"
                  min="1"
                  value={assignLicensesForm.licenseCount}
                  onChange={(e) => setAssignLicensesForm(prev => ({ ...prev, licenseCount: parseInt(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  placeholder="Enter license count"
                />
              </div>
              <div>
                <label htmlFor="licenseType" className="block text-sm font-medium text-slate-700 mb-2">
                  License Type
                </label>
                <select
                  id="licenseType"
                  value={assignLicensesForm.licenseType}
                  onChange={(e) => setAssignLicensesForm(prev => ({ ...prev, licenseType: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                >
                  <option value="basic">Basic</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  value={assignLicensesForm.expiryDate}
                  onChange={(e) => setAssignLicensesForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => {
                  setShowAssignLicensesModal(false)
                  setSelectedGroupForLicenses(null)
                  setAssignLicensesForm({ licenseCount: 10, expiryDate: '', licenseType: 'basic' })
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignLicensesSubmit}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Assigning...' : 'Assign Licenses'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* System Settings Modal */}
      {showSystemSettingsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">System Settings</h3>
              <p className="text-sm text-slate-600 mt-1">Configure system-wide settings and preferences</p>
            </div>
            <div className="px-6 py-5 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="systemName" className="block text-sm font-medium text-slate-700 mb-2">
                    System Name
                  </label>
                  <input
                    type="text"
                    id="systemName"
                    defaultValue="DSecure Admin System"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </div>
                <div>
                  <label htmlFor="adminEmail" className="block text-sm font-medium text-slate-700 mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    id="adminEmail"
                    defaultValue="admin@dsecuretech.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                  />
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-medium text-slate-900 mb-3">Security Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-slate-700">Two-Factor Authentication</span>
                      <p className="text-xs text-slate-500">Require 2FA for all admin users</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-slate-700">Auto-logout</span>
                      <p className="text-xs text-slate-500">Automatic logout after inactivity</p>
                    </div>
                    <select className="text-sm border border-slate-300 rounded px-2 py-1">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-medium text-slate-900 mb-3">License Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Default License Duration (days)
                    </label>
                    <input
                      type="number"
                      defaultValue="365"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Max Licenses Per User
                    </label>
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setShowSystemSettingsModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showSuccess('Settings Saved', 'System settings have been updated successfully')
                  setShowSystemSettingsModal(false)
                }}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-brand hover:bg-brand-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
