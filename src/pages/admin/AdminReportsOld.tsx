import { useAuth } from '@/auth/AuthContext'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

interface Report {
  id: string
  title: string
  type: 'drive-eraser' | 'mobile-diagnostics' | 'network-eraser' | 'file-eraser'
  status: 'completed' | 'running' | 'failed' | 'pending'
  devices: number
  user: string
  date: string
  size: string
  downloadUrl: string
}

export default function AdminReports() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const reports: Report[] = [
    {
      id: '2832',
      title: 'Quarterly Drive Erasure Report',
      type: 'drive-eraser',
      status: 'completed',
      devices: 45,
      user: 'john.doe@example.com',
      date: 'Oct 08, 2025',
      size: '2.3 MB',
      downloadUrl: '#'
    },
    {
      id: '2831',
      title: 'Mobile Device Security Scan',
      type: 'mobile-diagnostics',
      status: 'running',
      devices: 12,
      user: 'alice.admin@example.com',
      date: 'Oct 09, 2025',
      size: '1.8 MB',
      downloadUrl: '#'
    },
    {
      id: '2830',
      title: 'Network Infrastructure Cleanup',
      type: 'network-eraser',
      status: 'completed',
      devices: 28,
      user: 'bob.user@example.com',
      date: 'Oct 07, 2025',
      size: '4.2 MB',
      downloadUrl: '#'
    },
    {
      id: '2829',
      title: 'File System Secure Delete',
      type: 'file-eraser',
      status: 'failed',
      devices: 8,
      user: 'carol.manager@example.com',
      date: 'Oct 06, 2025',
      size: '0.9 MB',
      downloadUrl: '#'
    },
    {
      id: '2828',
      title: 'Weekly Security Audit Report',
      type: 'drive-eraser',
      status: 'pending',
      devices: 15,
      user: 'admin@example.com',
      date: 'Oct 09, 2025',
      size: '-',
      downloadUrl: '#'
    }
  ]

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.includes(searchTerm)
    const matchesType = selectedType === 'all' || report.type === selectedType
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'running':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-slate-100 text-slate-800'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'drive-eraser':
        return 'Drive Eraser'
      case 'mobile-diagnostics':
        return 'Mobile Diagnostics'
      case 'network-eraser':
        return 'Network Eraser'
      case 'file-eraser':
        return 'File Eraser'
      default:
        return type
    }
  }

  const handleDownloadReport = (reportId: string) => {
    // Handle report download
    // console.log('Downloading report:', reportId)
  }

  return (
    <>
      <Helmet>
        <title>Admin Reports - Dashboard | DSecureTech</title>
        <meta name="description" content="View and manage all erasure reports and certificates in DSecureTech admin dashboard." />
      </Helmet>

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
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
                Admin Reports
              </h1>
            </div>
            <p className="text-slate-600">
              View and manage all system reports and erasure certificates
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={() => navigate('/admin/reports/generate')}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Report
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-sm font-medium text-slate-600">Completed Reports</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">
              {reports.filter(r => r.status === 'completed').length}
            </p>
          </div>
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <p className="text-sm font-medium text-slate-600">Running Reports</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">
              {reports.filter(r => r.status === 'running').length}
            </p>
          </div>
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <p className="text-sm font-medium text-slate-600">Failed Reports</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">
              {reports.filter(r => r.status === 'failed').length}
            </p>
          </div>
          <div className="card !p-4 lg:!p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <p className="text-sm font-medium text-slate-600">Total Devices</p>
            </div>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">
              {reports.reduce((acc, r) => acc + r.devices, 0)}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Search Reports</label>
                <input
                  type="text"
                  placeholder="Search by title, user, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Report Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Types</option>
                  <option value="drive-eraser">Drive Eraser</option>
                  <option value="mobile-diagnostics">Mobile Diagnostics</option>
                  <option value="network-eraser">Network Eraser</option>
                  <option value="file-eraser">File Eraser</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="running">Running</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedType('all')
                    setSelectedStatus('all')
                  }}
                  className="w-full btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="card">
          <div className="px-4 sm:px-6 py-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">
              Reports ({filteredReports.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                  <th className="px-4 sm:px-6 py-3 font-medium">Report</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Devices</th>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Size</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">{report.title}</div>
                        <div className="text-sm text-slate-500">ID: #{report.id}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-slate-600">{getTypeLabel(report.type)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{report.devices}</td>
                    <td className="px-4 py-4 text-slate-600">{report.user}</td>
                    <td className="px-4 py-4 text-slate-600">{report.date}</td>
                    <td className="px-4 py-4 text-slate-600">{report.size}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Viewing report: ${report.title}`)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          View
                        </button>
                        {report.status === 'completed' && (
                          <button
                            onClick={() => handleDownloadReport(report.id)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                          >
                            Download
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}