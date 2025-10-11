import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Reveal from '@/components/Reveal'
import { useAuth } from '@/auth/AuthContext'
import { Link } from 'react-router-dom'

interface Report {
  id: string
  type: string
  status: 'completed' | 'running' | 'failed'
  date: string
  devices: number
  method: string
  duration?: string
  size?: string
}

const ReportsPage: React.FC = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const reports: Report[] = [
    {
      id: 'ER-2832',
      type: 'Drive Eraser',
      status: 'completed',
      date: '2025-10-09',
      devices: 5,
      method: 'NIST 800-88 Purge',
      duration: '2h 15m',
      size: '2.4 TB'
    },
    {
      id: 'ER-2831',
      type: 'Mobile Diagnostics',
      status: 'running',
      date: '2025-10-09',
      devices: 3,
      method: 'Hardware Scan',
      duration: '45m',
      size: '1.2 TB'
    },
    {
      id: 'ER-2830',
      type: 'Network Eraser',
      status: 'completed',
      date: '2025-10-08',
      devices: 12,
      method: 'DoD 5220.22-M',
      duration: '4h 30m',
      size: '8.7 TB'
    },
    {
      id: 'ER-2829',
      type: 'File Eraser',
      status: 'failed',
      date: '2025-10-07',
      devices: 1,
      method: 'Secure Delete',
      duration: '15m',
      size: '0.5 TB'
    },
    {
      id: 'ER-2828',
      type: 'Server Eraser',
      status: 'completed',
      date: '2025-10-07',
      devices: 8,
      method: 'Gutmann Method',
      duration: '6h 45m',
      size: '15.3 TB'
    }
  ]

  const filteredReports = reports.filter(report => {
    const matchesTab = activeTab === 'all' || report.status === activeTab
    const matchesSearch = report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.method.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'running': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case 'running':
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        )
      case 'failed':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      default:
        return null
    }
  }

  const downloadReport = (reportId: string) => {
    // Simulate report download
    alert(`Downloading report ${reportId}...`)
  }

  const exportAllReports = () => {
    alert('Exporting all reports as CSV...')
  }

  return (
    <>
      <Helmet>
        <title>Reports | DSecure Dashboard</title>
        <meta name="description" content="View and manage erasure reports and certificates" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <div className="container-app py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Link 
                to="/admin" 
                className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900">Erasure Reports</h1>
                <p className="text-slate-600 mt-1">View and download your erasure certificates and reports</p>
              </div>
              <button
                onClick={exportAllReports}
                className="btn-secondary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export All
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                />
                <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Filter Tabs */}
              <div className="flex rounded-lg border border-slate-300 bg-white">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'running', label: 'Running' },
                  { id: 'failed', label: 'Failed' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-brand text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    } ${tab.id === 'all' ? 'rounded-l-lg' : ''} ${tab.id === 'failed' ? 'rounded-r-lg' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid gap-4">
            {filteredReports.map((report, index) => (
              <Reveal key={report.id} delayMs={index * 100}>
                <div className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-slate-900">{report.id}</h3>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                            {getStatusIcon(report.status)}
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mt-1">{report.type} • {report.method}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-600">
                      <div className="text-right">
                        <div className="font-medium">{report.devices} devices</div>
                        <div className="text-xs">{report.size}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{report.date}</div>
                        <div className="text-xs">{report.duration}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => alert(`Viewing details for ${report.id}`)}
                          className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                          title="View Details"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        {report.status === 'completed' && (
                          <button
                            onClick={() => downloadReport(report.id)}
                            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                            title="Download Report"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-slate-900 mb-2">No reports found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ReportsPage