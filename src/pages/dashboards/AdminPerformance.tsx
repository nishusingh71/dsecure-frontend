import Sparkline from '@/components/Sparkline'
import BarChart from '@/components/BarChart'
import { Helmet } from 'react-helmet-async'


export default function AdminPerformance() {
  return (
    <>
    <Helmet>
+      <link rel="canonical" href="https://dsecuretech.com/admin/performance" />
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
          <div className="mt-1 text-2xl font-semibold">1,240</div>
          <div className="mt-3"><Sparkline data={[120,140,130,180,220,210,260,240,280,300,320,340]} /></div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Avg. duration</div>
          <div className="mt-1 text-2xl font-semibold">6m 21s</div>
          <div className="mt-3"><Sparkline data={[7.2,6.8,6.5,6.1,5.9,6.2,6.0,6.3,6.1,6.2,6.4,6.3]} stroke="#10b981" fill="rgba(16,185,129,0.12)" /></div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500">Success rate</div>
          <div className="mt-1 text-2xl font-semibold">100%</div>
          <div className="mt-3"><Sparkline data={[97.8,98.1,98.0,98.2,98.4,98.5,98.3,98.6,98.4,98.5,98.6,98.4]} stroke="#f59e0b" fill="rgba(245,158,11,0.12)" /></div>
        </div>
      </div>
      <div className="card">
        <h2 className="font-semibold text-slate-900">Throughput</h2>
        <div className="mt-3">
          <BarChart data={[120,140,160,180,200,240,260,230,250,270,300,340]} labels={["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]} />
        </div>
      </div>
    </div>
    </>
  )
}


