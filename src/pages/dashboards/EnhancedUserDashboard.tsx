import { useAuth } from '@/auth/AuthContext'
import { useCurrentUser, RoleGuard, PermissionGuard } from '@/components/ProtectedRoute'
import { authService } from '@/utils/authService'
import { apiClient } from '@/utils/enhancedApiClient'
import { useState, useEffect } from 'react'
import Reveal from '@/components/Reveal'
import Head from 'next/head'
interface DashboardStats {
  monthlyErasures: number
  totalDevices: number
  successRate: string
  storageReclaimed: string
}

export default function EnhancedUserDashboard() {
  const { user, logout, hasRole, hasPermission } = useAuth()
  const currentUser = useCurrentUser() // Alternative way to get user from JWT
  const [stats, setStats] = useState<DashboardStats>({
    monthlyErasures: 0,
    totalDevices: 0,
    successRate: '0%',
    storageReclaimed: '0 TB'
  })
  const [loading, setLoading] = useState(true)
  const [tokenInfo, setTokenInfo] = useState({
    timeUntilExpiry: 0,
    isAboutToExpire: false
  })

  // Update token info every minute
  useEffect(() => {
    const updateTokenInfo = () => {
      setTokenInfo({
        timeUntilExpiry: authService.getTimeUntilExpiry() || 0,
        isAboutToExpire: authService.isTokenAboutToExpire()
      })
    }

    updateTokenInfo()
    const interval = setInterval(updateTokenInfo, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Fetch dashboard data using enhanced API client
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        
        // Example API calls that automatically include JWT token
        const [userResponse] = await Promise.all([
          apiClient.getCurrentUser()
          // apiClient.getDashboardStats() // Implement this endpoint when backend is ready
        ])

        if (userResponse.success) {
          // //console.log('Current user from API:', userResponse.data)
        }

        // Mock stats for demo
        setStats({
          monthlyErasures: 132,
          totalDevices: 450,
          successRate: '100%',
          storageReclaimed: '2.4 TB'
        })
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (authService.isAuthenticated()) {
      fetchDashboardData()
    }
  }, [])

  const certificates = [
    { id: 'ER-1001', status: 'completed', date: '2h ago', type: 'Device', devices: 5 },
    { id: 'ER-1002', status: 'completed', date: '1d ago', type: 'Server', devices: 2 },
    { id: 'ER-1003', status: 'processing', date: 'Just now', type: 'Cloud', devices: 3 }
  ]

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <>
    <Head>
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
        </Head>
    <div className="container-app py-12">
      {/* Header with JWT-based user info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {user?.name || currentUser?.name}
          </h1>
          <div className="mt-2 flex flex-col gap-1 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
              Role: <span className="font-medium">{user?.role}</span>
              {user?.department && (
                <>
                  <span className="text-slate-400">•</span>
                  Department: <span className="font-medium">{user?.department}</span>
                </>
              )}
            </p>
            
            {/* Token expiration warning */}
            {tokenInfo.isAboutToExpire && (
              <p className="flex items-center gap-2 text-yellow-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Session expires in {formatTime(tokenInfo.timeUntilExpiry)}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          {/* Permission-based action visibility */}
          <PermissionGuard permissions={['write:own', 'access:dashboard']}>
            <button className="btn-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start New Erasure
            </button>
          </PermissionGuard>

          {/* Role-based admin access */}
          <RoleGuard roles={['admin', 'manager']}>
            <button 
              className="btn-secondary flex items-center gap-2"
              onClick={() => window.open('/admin', '_blank')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin Panel
            </button>
          </RoleGuard>

          <button 
            className="btn-secondary text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>

      {/* JWT Authentication Status Panel */}
      <div className="mb-8">
        <Reveal>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Authentication Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-600 font-medium">Authentication:</span>
                <span className="ml-2 text-green-600 font-semibold">✓ Active</span>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Token Expires:</span>
                <span className={`ml-2 font-semibold ${tokenInfo.isAboutToExpire ? 'text-yellow-600' : 'text-green-600'}`}>
                  {formatTime(tokenInfo.timeUntilExpiry)}
                </span>
              </div>
              <div>
                <span className="text-blue-600 font-medium">Permissions:</span>
                <span className="ml-2 text-slate-700">{authService.getPermissions().length} granted</span>
              </div>
            </div>
            
            {/* Show user permissions */}
            <details className="mt-4">
              <summary className="cursor-pointer text-blue-600 font-medium">View Permissions</summary>
              <div className="mt-2 flex flex-wrap gap-2">
                {authService.getPermissions().map(permission => (
                  <span 
                    key={permission}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </details>
          </div>
        </Reveal>
      </div>

      {/* Stats Grid with permission-based visibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Reveal>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Monthly Erasures</p>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? '...' : stats.monthlyErasures.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>

        <PermissionGuard permissions={['read:all', 'read:department']}>
          <Reveal delayMs={10}>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Devices</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {loading ? '...' : stats.totalDevices.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>
        </PermissionGuard>

        <Reveal delayMs={20}>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Success Rate</p>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? '...' : stats.successRate}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={30}>
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Storage Reclaimed</p>
                <p className="text-2xl font-bold text-slate-900">
                  {loading ? '...' : stats.storageReclaimed}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Quick Actions with role-based visibility */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Reveal>
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <PermissionGuard permissions={['write:own']}>
                <button className="w-full btn-primary text-left flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                  Start New Erasure
                </button>
              </PermissionGuard>

              <button className="w-full btn-secondary text-left flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download Agent
              </button>

              <PermissionGuard permissions={['read:own', 'access:reports']}>
                <button className="w-full btn-secondary text-left flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  View Reports
                </button>
              </PermissionGuard>

              <button className="w-full btn-secondary text-left flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Get Support
              </button>
            </div>
          </div>
        </Reveal>

        {/* Recent Activity */}
        <Reveal delayMs={10}>
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Erasures</h3>
            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <div key={cert.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      cert.status === 'completed' ? 'bg-green-400' : 
                      cert.status === 'processing' ? 'bg-yellow-400' : 'bg-slate-400'
                    }`}></div>
                    <div>
                      <p className="font-medium text-slate-900">{cert.id}</p>
                      <p className="text-sm text-slate-600">{cert.type} • {cert.devices} devices</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cert.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : cert.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {cert.status}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Developer Info Panel (Only show in development) */}
      {process.env.NODE_ENV === 'development' && (
        <Reveal delayMs={10}>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold mb-4 text-slate-700">🔧 JWT Debug Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-600 mb-2">Token Info</h4>
                <pre className="bg-white p-3 rounded border text-xs overflow-auto">
                  {JSON.stringify({
                    isAuthenticated: authService.isAuthenticated(),
                    tokenExpiry: tokenInfo.timeUntilExpiry,
                    isAboutToExpire: tokenInfo.isAboutToExpire,
                    userRole: user?.role,
                    userDepartment: user?.department
                  }, null, 2)}
                </pre>
              </div>
              <div>
                <h4 className="font-medium text-slate-600 mb-2">User Permissions</h4>
                <div className="bg-white p-3 rounded border">
                  {authService.getPermissions().map((permission: string) => (
                    <div key={permission} className="text-xs text-slate-600 mb-1">
                      ✓ {permission}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}
    </div>
    </>
  )
}
