import { useAuth } from '@/auth/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import Reveal from '@/components/Reveal'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { apiClient } from '@/utils/enhancedApiClient'
import type { EnhancedSubuser } from '@/utils/enhancedApiClient'

export default function UserDashboard() {
  const { user, logout } = useAuth()
  const { showInfo } = useNotification()
  const navigate = useNavigate()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    certificates: false,
    quickActions: false
  })
  const profileMenuRef = useRef<HTMLDivElement>(null)

  // Profile data state - can be user or subuser
  const [profileData, setProfileData] = useState<{
    name: string
    email: string
    role: string
    department?: string
    phone?: string
    isSubuser: boolean
  } | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)

  // Fetch profile data - user or subuser based on localStorage
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoadingProfile(true)

        // Get stored user data from localStorage
        const storedUserData = localStorage.getItem('user_data')

        if (!storedUserData) {
          // console.log('⚠️ No user_data in localStorage')
          // Fallback to AuthContext user
          if (user) {
            setProfileData({
              name: user.name,
              email: user.email,
              role: user.role,
              department: user.department,
              phone: user.phone_number,
              isSubuser: false
            })
          }
          setLoadingProfile(false)
          return
        }

        const parsedData = JSON.parse(storedUserData)
        // console.log('📦 Parsed user_data:', parsedData)

        // Check if logged-in user is a subuser
        const userType = parsedData.user_type || parsedData.userType || user?.role
        const isSubuser = userType === 'subuser'

        // console.log(`🔍 User Type: ${userType}, Is Subuser: ${isSubuser}`)

        if (isSubuser) {
          // Fetch subuser data from API
          const subuserEmail = parsedData.user_email || parsedData.email || user?.email

          if (!subuserEmail) {
            console.error('❌ No subuser email found')
            setLoadingProfile(false)
            return
          }

          // console.log(`📧 Fetching subuser data for: ${subuserEmail}`)

          const response = await apiClient.getEnhancedSubuser(subuserEmail)

          if (response.success && response.data) {
            const subuserData = response.data
            // console.log('✅ Subuser data fetched:', subuserData)

            // Use Subuser interface fields: subuser_name, subuser_phone, name, phone
            setProfileData({
              name: subuserData.subuser_name || subuserData.name || 'Subuser',
              email: subuserData.subuser_email || subuserEmail,
              role: subuserData.subuser_role || subuserData.role || 'Subuser',
              department: subuserData.department,
              phone: subuserData.subuser_phone || subuserData.phone,
              isSubuser: true
            })
          } else {
            console.warn('⚠️ Failed to fetch subuser data, using stored data')
            setProfileData({
              name: parsedData.user_name || parsedData.name || user?.name || 'Subuser',
              email: subuserEmail,
              role: parsedData.user_role || parsedData.role || 'Subuser',
              department: parsedData.department || user?.department,
              phone: parsedData.phone_number || user?.phone_number,
              isSubuser: true
            })
          }
        } else {
          // Regular user - use AuthContext or localStorage data
          // console.log('👤 Regular user detected')
          setProfileData({
            name: parsedData.user_name || parsedData.name || user?.name || 'User',
            email: parsedData.user_email || parsedData.email || user?.email || '',
            role: parsedData.user_role || parsedData.role || user?.role || 'User',
            department: parsedData.department || user?.department,
            phone: parsedData.phone_number || user?.phone_number,
            isSubuser: false
          })
        }
      } catch (error) {
        console.error('❌ Error fetching profile data:', error)
        // Fallback to AuthContext user
        if (user) {
          setProfileData({
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            phone: user.phone_number,
            isSubuser: false
          })
        }
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchProfileData()
  }, [user])

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const certificates = [
    { id: 'ER-1001', status: 'completed', date: '2h ago', type: 'Device', devices: 5 },
    { id: 'ER-1002', status: 'completed', date: '1d ago', type: 'Server', devices: 2 },
    { id: 'ER-1003', status: 'processing', date: 'Just now', type: 'Cloud', devices: 3 },
    { id: 'ER-1004', status: 'completed', date: '3d ago', type: 'Mobile', devices: 8 },
    { id: 'ER-1005', status: 'completed', date: '5d ago', type: 'Laptop', devices: 12 },
    { id: 'ER-1006', status: 'completed', date: '1w ago', type: 'Workstation', devices: 4 }
  ]

  const displayedCertificates = expandedSections.certificates ? certificates : certificates.slice(0, 3)

  const stats = {
    monthlyErasures: 132,
    totalDevices: 450,
    successRate: '100%',
    storageReclaimed: '2.4 TB'
  }

  const quickActions = [
    { name: 'Start New Erasure', icon: 'play', type: 'primary', action: () => navigate('/admin/new-erasure') },
    { name: 'Download Agent', icon: 'download', type: 'secondary', action: () => navigate('/admin/download-agent') },
    { name: 'View Reports', icon: 'chart', type: 'secondary', action: () => navigate('/admin/reports') },
    { name: 'Get Support', icon: 'help', type: 'secondary', action: () => navigate('/support') },
    { name: 'Bulk Operations', icon: 'stack', type: 'secondary', action: () => showInfo('Feature Coming Soon', 'Bulk Operations feature is currently in development') },
    { name: 'Schedule Erasure', icon: 'calendar', type: 'secondary', action: () => showInfo('Feature Coming Soon', 'Schedule Erasure feature is currently in development') },
    { name: 'Compliance Check', icon: 'shield', type: 'secondary', action: () => showInfo('Feature Coming Soon', 'Compliance Check feature is currently in development') },
    { name: 'Export Data', icon: 'export', type: 'secondary', action: () => navigate('/admin/reports') }
  ]

  const displayedQuickActions = expandedSections.quickActions ? quickActions : quickActions.slice(0, 4)

  // Generate user initials for avatar
  const getUserInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
  }

  // Handle certificate actions
  const viewCertificateDetails = (certId: string) => {
    navigate('/admin/reports')
  }

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/admin/userdashboard" />
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
      <div className="container-app py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* Circular Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-brand-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {loadingProfile ? '...' : getUserInitials(profileData?.name || user?.name || '')}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
            </div>

            {/* User Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                {loadingProfile ? 'Loading...' : `Welcome back, ${profileData?.name || user?.name || 'User'}`}
              </h1>
              <p className="mt-1 text-slate-600 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                {loadingProfile ? 'Loading...' : profileData?.email || user?.email || 'user@example.com'}
                {' • '}
                {loadingProfile ? '...' : profileData?.isSubuser ? 'Subuser Account' : 'Account Active'}
                {profileData?.department && ` • ${profileData.department}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Settings Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                aria-label="Profile settings"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-medium text-slate-900">{profileData?.name || user?.name}</p>
                    <p className="text-sm text-slate-500">{profileData?.email || user?.email}</p>
                    {profileData?.isSubuser && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        Subuser
                      </span>
                    )}
                  </div>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Edit Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    Account Settings
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Billing & Usage
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <Link to="/admin/new-erasure" className="btn-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start New Erasure
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Reveal delayMs={0}>
            <div className="card !p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <svg className="w-5 h-5 text-brand/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Monthly Erasures
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-900">{stats.monthlyErasures}</div>
                <div className="text-sm text-green-600 mb-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +12%
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={10}>
            <div className="card !p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <svg className="w-5 h-5 text-brand/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Total Devices
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-900">{stats.totalDevices}</div>
                <div className="text-sm text-green-600 mb-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +24
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={20}>
            <div className="card !p-4 sm:!p-6 min-w-0">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <svg className="w-5 h-5 text-brand/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Success Rate
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-900">{stats.successRate}</div>
                <div className="text-sm text-green-600 mb-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +0.2%
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delayMs={30}>
            <div className="card !p-4 sm:!p-6 min-w-0">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <svg className="w-5 h-5 text-brand/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Storage Reclaimed
              </div>
              <div className="mt-2 flex items-end gap-2">
                <div className="text-3xl font-bold text-slate-900">{stats.storageReclaimed}</div>
                <div className="text-sm text-green-600 mb-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +0.8TB
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Recent Certificates */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Recent Certificates</h2>
            <button
              onClick={() => toggleSection('certificates')}
              className="text-brand hover:text-brand-700 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              {expandedSections.certificates ? 'Show Less' : 'View All'}
              <svg
                className={`w-4 h-4 transition-transform ${expandedSections.certificates ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedCertificates.map((cert, i) => (
              <Reveal key={cert.id} delayMs={i * 100}>
                <div className="card hover:scale-[1.02] transition-transform !p-4 sm:!p-6 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-slate-900">{cert.id}</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cert.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                      }`}>
                      {cert.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="text-slate-600">{cert.type} Erasure</div>
                    <div className="text-slate-500">{cert.devices} devices</div>
                  </div>
                  <div className="mt-4 text-xs text-slate-500">{cert.date}</div>
                  <div className="mt-4 pt-4 border-t flex justify-end">
                    <button
                      onClick={() => viewCertificateDetails(cert.id)}
                      className="text-brand hover:text-brand-700 text-sm font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          {expandedSections.certificates && certificates.length > 3 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => toggleSection('certificates')}
                className="text-slate-500 hover:text-slate-700 text-sm"
              >
                Collapse
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Quick Actions</h2>
            <button
              onClick={() => toggleSection('quickActions')}
              className="text-brand hover:text-brand-700 text-sm font-medium flex items-center gap-1 transition-colors"
            >
              {expandedSections.quickActions ? 'Show Less' : 'View All'}
              <svg
                className={`w-4 h-4 transition-transform ${expandedSections.quickActions ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedQuickActions.map((action, i) => (
              <Reveal key={action.name} delayMs={i * 100}>
                <button
                  onClick={action.action}
                  className={`card flex flex-col items-center justify-center py-6 sm:py-8 !p-4 sm:!p-6 min-w-0 transition-all duration-200 ${action.type === 'primary'
                      ? 'bg-gradient-to-br from-brand to-brand-600 hover:to-brand-700'
                      : 'hover:bg-slate-50 hover:scale-[1.02]'
                    }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.type === 'primary'
                      ? 'bg-white/20 text-white'
                      : 'bg-brand/10 text-brand'
                    }`}>
                    {action.icon === 'play' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {action.icon === 'download' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                    {action.icon === 'chart' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )}
                    {action.icon === 'help' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {action.icon === 'stack' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    )}
                    {action.icon === 'calendar' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {action.icon === 'shield' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    )}
                    {action.icon === 'export' && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div className={`mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-center px-2 ${action.type === 'primary' ? 'text-white' : 'text-slate-900'
                    }`}>
                    <span className="block truncate">{action.name}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
          {expandedSections.quickActions && quickActions.length > 4 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => toggleSection('quickActions')}
                className="text-slate-500 hover:text-slate-700 text-sm"
              >
                Collapse
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}


