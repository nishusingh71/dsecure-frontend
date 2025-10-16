import Sparkline from '@/components/Sparkline'
import BarChart from '@/components/BarChart'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { AdminDashboardAPI, PerformanceMetrics } from '@/services/adminDashboardAPI'
import { useNotification } from '@/contexts/NotificationContext'

export default function AdminPerformance() {
  const { showError } = useNotification()
  const [performanceData, setPerformanceData] = useState<PerformanceMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  // Load performance data on component mount
  useEffect(() => {
    loadPerformanceData()
  }, [])

  const loadPerformanceData = async () => {
    setLoading(true)
    try {
      const response = await AdminDashboardAPI.getPerformanceMetrics()
      if (response.success) {
        setPerformanceData(response.data)
      } else {
        throw new Error(response.error || 'Failed to load performance metrics')
      }
    } catch (error) {
      console.error('Error loading performance data:', error)
      showError('Data Loading Error', 'Failed to load performance data. Using default values.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Helmet>
          <link rel="canonical" href="https://dsecuretech.com/admin/performance" />
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
        <div className="space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
          <h1 className="text-2xl font-bold text-slate-900">Performance</h1>
          <div className="animate-pulse">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card">
                <div className="h-4 bg-slate-300 rounded w-20 mb-2"></div>
                <div className="h-8 bg-slate-300 rounded w-16 mb-3"></div>
                <div className="h-16 bg-slate-300 rounded"></div>
              </div>
              <div className="card">
                <div className="h-4 bg-slate-300 rounded w-20 mb-2"></div>
                <div className="h-8 bg-slate-300 rounded w-16 mb-3"></div>
                <div className="h-16 bg-slate-300 rounded"></div>
              </div>
              <div className="card">
                <div className="h-4 bg-slate-300 rounded w-20 mb-2"></div>
                <div className="h-8 bg-slate-300 rounded w-16 mb-3"></div>
                <div className="h-16 bg-slate-300 rounded"></div>
              </div>
            </div>
            <div className="card">
              <div className="h-6 bg-slate-300 rounded w-24 mb-3"></div>
              <div className="h-64 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!performanceData) return null

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/admin/performance" />
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
      <div className="space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
        <h1 className="text-2xl font-bold text-slate-900">Performance</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="text-sm text-slate-500">Monthly erasures</div>
            <div className="mt-1 text-2xl font-semibold">{performanceData.monthlyErasures.value.toLocaleString()}</div>
            <div className="mt-3"><Sparkline data={performanceData.monthlyErasures.data} /></div>
          </div>
          <div className="card">
            <div className="text-sm text-slate-500">Avg. duration</div>
            <div className="mt-1 text-2xl font-semibold">{performanceData.avgDuration.value}</div>
            <div className="mt-3"><Sparkline data={performanceData.avgDuration.data} stroke="#10b981" fill="rgba(16,185,129,0.12)" /></div>
          </div>
          <div className="card">
            <div className="text-sm text-slate-500">Success rate</div>
            <div className="mt-1 text-2xl font-semibold">{performanceData.successRate.value}</div>
            <div className="mt-3"><Sparkline data={performanceData.successRate.data} stroke="#f59e0b" fill="rgba(245,158,11,0.12)" /></div>
          </div>
        </div>
        <div className="card">
          <h2 className="font-semibold text-slate-900">Throughput</h2>
          <div className="mt-3">
            <BarChart data={performanceData.throughput.data} labels={performanceData.throughput.labels} />
          </div>
        </div>
      </div>
    </>
  )
}


