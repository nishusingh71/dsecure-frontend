import { Helmet } from 'react-helmet-async'
import { NavLink, Outlet } from 'react-router-dom'

export default function AdminShell() {
  return (
    <>
      <Helmet>
        +      <link rel="canonical" href="https://dsecuretech.com/admin" />
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
      <div className="container-app py-4 sm:py-8 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        {/* Mobile Header */}
        <div className="mb-4 sm:mb-6 md:hidden">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Admin Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 sm:gap-6">
          <aside className="card h-fit md:sticky md:top-24 !p-3 sm:!p-6 overflow-hidden">
            <nav className="flex flex-col sm:flex-row md:flex-col gap-2 text-sm">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v14l7-7z" />
                </svg>
                <span className="truncate">Overview</span>
              </NavLink>
              <NavLink
                to="/admin/performance"
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="truncate">Performance</span>
              </NavLink>
              <NavLink
                to="/admin/reports"
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="truncate">Audit Reports</span>
              </NavLink>
              <NavLink
                to="/admin/machines"
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">Machines</span>
              </NavLink>
              <NavLink
                to="/admin/sessions"
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="truncate">Sessions</span>
              </NavLink>
              <NavLink
                to="/admin/subusers"
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="truncate">Subusers</span>
              </NavLink>
              <NavLink
                to="/admin/groups"
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="truncate">Groups</span>
              </NavLink>
              <NavLink
                to="/admin/licenses"
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span className="truncate">Licenses</span>
              </NavLink>
              <NavLink
                to="/admin/downloads"
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors font-medium ${isActive
                  ? 'bg-brand text-white'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="truncate">Downloads</span>
              </NavLink>
            </nav>
          </aside>
          <section className="min-w-0">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  )
}


