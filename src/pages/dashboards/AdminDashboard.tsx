import { useAuth } from '@/auth/AuthContext'
import Head from 'next/head'
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'


export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  
  const stats = [
    { label: 'Total Licenses', value: '3,287', change: '+12%', trend: 'up', color: 'bg-blue-500' },
    { label: 'Active Users', value: '156', change: '+5', trend: 'up', color: 'bg-emerald-500' },
    { label: 'Available Licenses', value: '1,200', change: '-8%', trend: 'down', color: 'bg-orange-500' },
    { label: 'Success Rate', value: '99.2%', change: '+0.3%', trend: 'up', color: 'bg-purple-500' }
  ]

  const licenseData = [
    { product: 'DSecure Drive Eraser', total: 1460, consumed: 1345, available: 115 },
    { product: 'DSecure Network Eraser', total: 462, consumed: 292, available: 170 },
    { product: 'DSecure Mobile Diagnostics', total: 200, consumed: 66, available: 134 },
    { product: 'DSecure Hardware Diagnostics', total: 446, consumed: 281, available: 165 },
    { product: 'DSecure Cloud Eraser', total: 300, consumed: 226, available: 74 }
  ]

  const userActivity = [
    { email: 'john@example.com', loginTime: 'Thu Oct 02 2025 13:48:24', logoutTime: '', status: 'active' },
    { email: 'alice@admin.com', loginTime: 'Thu Oct 02 2025 09:30:15', logoutTime: 'Thu Oct 02 2025 17:45:22', status: 'offline' },
    { email: 'bob@example.com', loginTime: 'Thu Oct 02 2025 08:15:30', logoutTime: '', status: 'active' },
    { email: 'carol@example.com', loginTime: 'Wed Oct 01 2025 16:20:45', logoutTime: 'Wed Oct 01 2025 18:30:12', status: 'offline' }
  ]

  const groups = [
    { name: 'Default Group', description: 'Default users Selection', licenses: 2322, date: '2023-01-06 04:21:04' },
    { name: 'Pool Group', description: 'Pool users', licenses: 200, date: '2023-01-06 04:21:04' },
    { name: 'IT Department', description: 'IT Department Users', licenses: 150, date: '2024-02-09 12:08:52' },
    { name: 'Security Team', description: 'Security Operations', licenses: 75, date: '2025-04-23 01:44:34' }
  ]

  const recentReports = [
    { id: '2832', type: 'Drive Eraser', devices: 1, status: 'completed', date: 'Wed, Oct 01, 2025', method: 'NIST 800-88 Purge' },
    { id: '2831', type: 'Mobile Diagnostics', devices: 5, status: 'running', date: 'Tue, Sep 30, 2025', method: 'Hardware Scan' },
    { id: '2830', type: 'Network Eraser', devices: 12, status: 'completed', date: 'Tue, Sep 30, 2025', method: 'DoD 5220.22-M' },
    { id: '2829', type: 'File Eraser', devices: 3, status: 'failed', date: 'Mon, Sep 29, 2025', method: 'Secure Delete' }
  ]

  return (
    <>
    <Head>
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
        </Head>
    <div className="container-app py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-600 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
            Welcome back, {user?.email}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>
          <button className="btn-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Report
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'licenses', name: 'Licenses', icon: '🔑' },
              { id: 'users', name: 'Users & Groups', icon: '👥' },
              { id: 'activity', name: 'User Activity', icon: '📈' },
              { id: 'reports', name: 'Reports', icon: '📄' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className="card !p-4 sm:!p-6 flex items-start justify-between min-w-0 hover:shadow-lg transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
              </div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
              <svg className={`w-5 h-5 ${stat.trend === 'up' ? 'rotate-0' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Reports */}
          <div className="card !p-0 min-w-0">
            <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-900">Recent Reports</h2>
              <Link to="/dashboard/reports" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="card-content divide-y divide-slate-200">
              {recentReports.slice(0, 4).map(report => (
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
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card !p-0 min-w-0">
            <div className="px-4 sm:px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">Quick Actions</h2>
            </div>
            <div className="card-content space-y-4">
              <Link to="/dashboard/users" className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-900">Manage Users</div>
                  <div className="text-sm text-slate-500">Add, edit or remove user accounts</div>
                </div>
              </Link>
              
              <Link to="/dashboard/reports" className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-900">Generate Reports</div>
                  <div className="text-sm text-slate-500">Create detailed erasure reports</div>
                </div>
              </Link>
              
              <button className="w-full flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-slate-900">System Settings</div>
                  <div className="text-sm text-slate-500">Configure system preferences</div>
                </div>
              </button>
            </div>
          </div>
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
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                      <th className="pb-3 font-medium">Product</th>
                      <th className="pb-3 font-medium">Total Available</th>
                      <th className="pb-3 font-medium">Total Consumed</th>
                      <th className="pb-3 font-medium">Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {licenseData.map((license, index) => {
                      const usagePercent = (license.consumed / license.total) * 100
                      return (
                        <tr key={index} className="hover:bg-slate-50">
                          <td className="py-4 font-medium text-slate-900">{license.product}</td>
                          <td className="py-4 text-slate-600">{license.total}</td>
                          <td className="py-4 text-slate-600">{license.consumed}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-slate-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    usagePercent > 80 ? 'bg-red-500' : 
                                    usagePercent > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${usagePercent}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-slate-600 min-w-[50px]">
                                {usagePercent.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Groups Management */}
          <div className="card">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">Groups & Users</h2>
                <p className="text-sm text-slate-600 mt-1">Manage user groups and their permissions</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-secondary text-sm">+ Add Group</button>
                <button className="btn-primary text-sm">+ New User</button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                      <th className="pb-3 font-medium">Group Name</th>
                      <th className="pb-3 font-medium">Description</th>
                      <th className="pb-3 font-medium">Licenses</th>
                      <th className="pb-3 font-medium">Date Created</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {groups.map((group, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="py-4 font-medium text-slate-900">{group.name}</td>
                        <td className="py-4 text-slate-600">{group.description}</td>
                        <td className="py-4 text-slate-600">{group.licenses}</td>
                        <td className="py-4 text-slate-600">{group.date}</td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                            <button className="text-slate-600 hover:text-slate-700 text-sm">Assign Licenses</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
            <Link to="/dashboard/reports" className="btn-primary text-sm">
              View All Reports
            </Link>
          </div>
          <div className="p-6">
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
                  {recentReports.map((report, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="py-4 font-medium text-slate-900">#{report.id}</td>
                      <td className="py-4 text-slate-600">{report.type}</td>
                      <td className="py-4 text-slate-600">{report.devices}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'completed' ? 'bg-green-100 text-green-800' :
                          report.status === 'running' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 text-slate-600">{report.date}</td>
                      <td className="py-4 text-slate-600">{report.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
