import { useAuth } from '@/auth/AuthContext'
import Reveal from '@/components/Reveal'
import { Helmet } from 'react-helmet-async'

export default function UserDashboard() {
  const { user } = useAuth()

  const certificates = [
    { id: 'ER-1001', status: 'completed', date: '2h ago', type: 'Device', devices: 5 },
    { id: 'ER-1002', status: 'completed', date: '1d ago', type: 'Server', devices: 2 },
    { id: 'ER-1003', status: 'processing', date: 'Just now', type: 'Cloud', devices: 3 }
  ]

  const stats = {
    monthlyErasures: 132,
    totalDevices: 450,
    successRate: '100%',
    storageReclaimed: '2.4 TB'
  }

  const quickActions = [
    { name: 'Start New Erasure', icon: 'play', type: 'primary' },
    { name: 'Download Agent', icon: 'download', type: 'secondary' },
    { name: 'View Reports', icon: 'chart', type: 'secondary' },
    { name: 'Get Support', icon: 'help', type: 'secondary' }
  ]

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {user?.name}
          </h1>
          <p className="mt-2 text-slate-600 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
            Your account is active and secure
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start New Erasure
          </button>
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
        <h2 className="font-semibold text-slate-900 mb-4">Recent Certificates</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certificates.map((cert, i) => (
            <Reveal key={cert.id} delayMs={i * 100}>
              <div className="card hover:scale-[1.02] transition-transform !p-4 sm:!p-6 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-slate-900">{cert.id}</div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    cert.status === 'completed' 
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
                  <button className="text-brand hover:text-brand-700 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickActions.map((action, i) => (
            <Reveal key={action.name} delayMs={i * 100}>
              <button 
                className={`card flex flex-col items-center justify-center py-6 sm:py-8 !p-4 sm:!p-6 min-w-0 ${
                  action.type === 'primary' 
                    ? 'bg-gradient-to-br from-brand to-brand-600 hover:to-brand-700' 
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  action.type === 'primary' 
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
                </div>
                <div className={`mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-center px-2 ${
                  action.type === 'primary' ? 'text-white' : 'text-slate-900'
                }`}>
                  <span className="block truncate">{action.name}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}


