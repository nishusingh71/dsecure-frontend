import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { useAuth } from '@/auth/AuthContext'
import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { Roles, buildReportFilter } from '@/pages/dashboards/AdminDashboard'

type RoleType = typeof Roles[keyof typeof Roles];

interface CurrentUser {
  id: string;
  email: string;
  role: RoleType;
  groupId?: string;
  parentUserId?: string;
  departmentId?: string;
}

interface ReportData {
  id: string
  sNo: number
  reportId: string
  reportType: string
  department: string
  totalFiles: number
  erasedFiles: number
  failedFiles: number
  datetime: string
  status: 'Completed' | 'Failed' | 'In Progress'
}

export default function AdminReports() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFrom, setDateFrom] = useState('06-10-2025')
  const [dateTo, setDateTo] = useState('07-10-2025')
  const [reportTypeFilter, setReportTypeFilter] = useState('All')

  // 🎛️ RBAC Filter States
  const [showFilters, setShowFilters] = useState(false)
  const [reportFilters, setReportFilters] = useState<{
    eraseType?: string;
    eraseStatus?: string;
    email?: string;
    departmentId?: string;
  }>({})

  // Get user's department from auth context (login response)
  const userDepartment = user?.department || 'IT Administration'

  // 🔐 RBAC: Role detection
  const getUserRole = (): string => {
    const storedUser = localStorage.getItem('user_data')
    const storedUserData = storedUser ? JSON.parse(storedUser) : null
    return storedUserData?.role || user?.role || 'user'
  }

  const currentUserRole = getUserRole().toLowerCase()
  const isSuperAdmin = currentUserRole === 'superadmin'
  const isGroupAdmin = currentUserRole === 'admin' || currentUserRole === 'administrator'

  // 🔐 Build currentUser object for filters
  const currentUser: Partial<CurrentUser> = useMemo(() => ({
    id: user?.id || '',
    email: user?.email || '',
    role: isSuperAdmin ? Roles.SUPER_ADMIN : isGroupAdmin ? Roles.GROUP_ADMIN : Roles.USER
  }), [user, isSuperAdmin, isGroupAdmin])

  // Mock data similar to D-SecureErase
  const mockReports: ReportData[] = [
    {
      id: '1',
      sNo: 91,
      reportId: 'File&Folder-20250...', 
      reportType: 'File & Folder Erasure',
      department: userDepartment,
      totalFiles: 1,
      erasedFiles: 0,
      failedFiles: 1,
      datetime: '2025-08-28 15:32:23',
      status: 'Completed'
    },
    {
      id: '2',
      sNo: 92,
      reportId: 'File&Folder-20250...',
      reportType: 'File & Folder Erasure',
      department: userDepartment, 
      totalFiles: 1,
      erasedFiles: 0,
      failedFiles: 1,
      datetime: '2025-08-28 15:34:36',
      status: 'Completed'
    },
    {
      id: '3',
      sNo: 93,
      reportId: 'File&Folder-20250...',
      reportType: 'File & Folder Erasure',
      department: userDepartment,
      totalFiles: 1,
      erasedFiles: 1,
      failedFiles: 0,
      datetime: '2025-08-28 15:45:02',
      status: 'Completed'
    },
    {
      id: '4',
      sNo: 94,
      reportId: 'File&Folder-20250...',
      reportType: 'File & Folder Erasure',
      department: userDepartment,
      totalFiles: 1,
      erasedFiles: 1,
      failedFiles: 0,
      datetime: '2025-08-28 15:47:46',
      status: 'Completed'
    },
    {
      id: '5',
      sNo: 95,
      reportId: 'File&Folder-20250...',
      reportType: 'File & Folder Erasure',
      department: userDepartment,
      totalFiles: 1,
      erasedFiles: 1,
      failedFiles: 0,
      datetime: '2025-09-06 17:31:02',
      status: 'Completed'
    },
    {
      id: '6',
      sNo: 96,
      reportId: 'File&Folder-20250...',
      reportType: 'File & Folder Erasure',
      department: userDepartment,
      totalFiles: 46,
      erasedFiles: 46,
      failedFiles: 0,
      datetime: '2025-09-20 16:07:46',
      status: 'Completed'
    },
    {
      id: '7',
      sNo: 97,
      reportId: 'File&Folder-20250...',
      reportType: 'File & Folder Erasure',
      department: userDepartment,
      totalFiles: 46,
      erasedFiles: 46,
      failedFiles: 0,
      datetime: '2025-09-20 16:14:00',
      status: 'Completed'
    },
    {
      id: '8',
      sNo: 98,
      reportId: 'File&Folder-20250...',
      reportType: 'File & Folder Erasure',
      department: userDepartment,
      totalFiles: 1,
      erasedFiles: 0,
      failedFiles: 1,
      datetime: '2025-09-21 17:43:22',
      status: 'Completed'
    }
  ]

  // 🔒 RBAC Filtered Reports
  const filteredReports = useMemo(() => {
    const whereClause = buildReportFilter(currentUser, {
      eraseType: reportFilters.eraseType,
      eraseStatus: reportFilters.eraseStatus,
      email: reportFilters.email,
      departmentId: reportFilters.departmentId,
      fromDate: dateFrom,
      toDate: dateTo
    })

    return mockReports.filter(report => {
      const matchesSearch = report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.reportType.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = reportTypeFilter === 'All' || report.reportType === reportTypeFilter
      const matchesEraseType = !reportFilters.eraseType || report.reportType.includes(reportFilters.eraseType)
      const matchesStatus = !reportFilters.eraseStatus || report.status === reportFilters.eraseStatus
      const matchesEmail = !reportFilters.email || report.department.includes(reportFilters.email)
      
      return matchesSearch && matchesType && matchesEraseType && matchesStatus && matchesEmail
    })
  }, [mockReports, searchTerm, reportTypeFilter, reportFilters, dateFrom, dateTo, currentUser])

  const handlePreview = (reportId: string) => {
    console.log(`Opening preview for report: ${reportId}`)
  }

  const handleSettings = () => {
    // Open report settings modal (similar to Customize Report from D-SecureErase)
    console.log('Opening report settings...')
  }

  const handleSaveReport = () => {
    console.log('Report configuration saved successfully!')
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("admin-reports")} />
      <Helmet>
        <title>Data Erasure Reports - Admin Dashboard | DSecureTech</title>
        <meta name="description" content="View and manage all data erasure reports in DSecureTech admin dashboard." />
      </Helmet>

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <button 
                onClick={() => navigate('/admin')}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Data Erasure Report
              </h1>
            </div>
            <p className="text-slate-600">
              View and manage all erasure reports
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={() => navigate('/admin/reports/generate')}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Generate Report
            </button>
          </div>
        </div>

        {/* Report Interface */}
        <div className="card mb-6">
          {/* Filters */}
          <div className="p-4 sm:p-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-700">Filter Reports</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`text-sm px-3 py-1 rounded-lg transition-colors ${showFilters ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {showFilters ? '🔼 Hide' : '🔽 Show'} Advanced Filters
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">From Date</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">To Date</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
                <select
                  value={reportTypeFilter}
                  onChange={(e) => setReportTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="All">All</option>
                  <option value="File & Folder Erasure">File & Folder Erasure</option>
                  <option value="Drive Erasure">Drive Erasure</option>
                  <option value="Network Erasure">Network Erasure</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSettings}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm"
                >
                  Settings
                </button>
                <button
                  onClick={handleSaveReport}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                >
                  Save Report
                </button>
              </div>
            </div>

            {/* 🎛️ Advanced RBAC Filters Panel */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Erase Type</label>
                    <select
                      value={reportFilters.eraseType || ''}
                      onChange={(e) => setReportFilters({...reportFilters, eraseType: e.target.value || undefined})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">All Methods</option>
                      <option value="DoD 5220.22-M">DoD 5220.22-M</option>
                      <option value="NIST 800-88">NIST 800-88</option>
                      <option value="Gutmann">Gutmann</option>
                      <option value="Random Data">Random Data</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                    <select
                      value={reportFilters.eraseStatus || ''}
                      onChange={(e) => setReportFilters({...reportFilters, eraseStatus: e.target.value || undefined})}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">All Status</option>
                      <option value="Completed">Completed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>

                  {(isSuperAdmin || isGroupAdmin) && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Department/Email</label>
                      <input
                        type="text"
                        value={reportFilters.email || ''}
                        onChange={(e) => setReportFilters({...reportFilters, email: e.target.value || undefined})}
                        placeholder="Filter by department/email"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  )}

                  <div className="flex items-end">
                    <button
                      onClick={() => setReportFilters({})}
                      className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Clear Advanced Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">S No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Report ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Report Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Files</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Erased Files</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Failed Files</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Datetime</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Preview</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{report.sNo}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {report.reportId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{report.reportType}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-700">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-medium">
                        {report.department}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{report.totalFiles}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600">{report.erasedFiles}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">{report.failedFiles}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-900">{report.datetime}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : report.status === 'Failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handlePreview(report.reportId)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm"
                      >
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No reports found</h3>
              <p className="text-slate-600 mb-4">
                {searchTerm ? 'Try adjusting your search terms.' : 'No reports available for the selected date range.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}