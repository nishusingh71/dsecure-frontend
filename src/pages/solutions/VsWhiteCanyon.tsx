import { useEffect } from "react";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Globe,
  TrendingDown,
  Cloud
} from "lucide-react";
import { Link } from "react-router-dom";

const comparisonFeatures = [
  {
    feature: "Architecture Model",
    dsecure: "Modern SaaS / Cloud-Managed (Zero Infrastructure)",
    whitecanyon: "Legacy Server / On-Premise Focus",
    better: "dsecure"
  },
  {
    feature: "Deployment Speed",
    dsecure: "Instant PXE / URL-based Booting",
    whitecanyon: "Manual Software Installation / Deployment Tools",
    better: "dsecure"
  },
  {
    feature: "Platform Support",
    dsecure: "Native Mac (M1-M4), Linux, Windows, & Virtual",
    whitecanyon: "Primarily Windows Centric",
    better: "dsecure"
  },
  {
    feature: "Compliance Standards",
    dsecure: "NIST 800-88, DoD 5220.22-M, GDPR, HIPAA",
    whitecanyon: "Equivalent Compliance Portfolio",
    better: "equal"
  },
  {
    feature: "Reporting Engine",
    dsecure: "Unified Cloud Console / Tamper-Proof 2K RSA PDFs",
    whitecanyon: "Local File Logs / Central Management Hub",
    better: "dsecure"
  },
  {
    feature: "Update Frequency",
    dsecure: "Continuous SaaS Updates (Zero Maintenance)",
    whitecanyon: "Periodic Version Updates / Patching Required",
    better: "dsecure"
  }
];

export default function VsWhiteCanyon() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={getSEOForPage("vs-whitecanyon")} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-32 bg-slate-900 overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="container-app relative z-10 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold mb-8">
              <Cloud className="w-4 h-4" />
              <span>Modern SaaS Erasure Strategy</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              D-Secure <span className="text-blue-500 text-6xl">vs</span> WhiteCanyon
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Why settle for legacy, server-heavy solutions when you can have a cloud-native platform that's faster, smarter, and audit-ready across all architectures?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-extrabold text-xl transition-all shadow-xl shadow-blue-900/40">
                Experience Modern Erasure
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">SaaS vs Legacy</h2>
            <p className="text-slate-600 text-lg">Comparing WhiteCanyon's on-premise focus with D-Secure's modern governance platform.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-6 px-8 text-lg font-bold">Standard Vector</th>
                    <th className="py-6 px-8 text-lg font-bold bg-blue-600">D-Secure SaaS</th>
                    <th className="py-6 px-8 text-lg font-bold text-slate-400">WhiteCanyon (WipeDrive)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row) => (
                    <tr key={row.feature} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-6 px-8 font-bold text-slate-700">{row.feature}</td>
                      <td className="py-6 px-8 font-medium text-blue-900 bg-blue-50/20">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          {row.dsecure}
                        </div>
                      </td>
                      <td className="py-6 px-8 text-slate-500 italic">{row.whitecanyon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-24 overflow-hidden relative">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl relative z-10 group">
                <ShieldCheck className="w-16 h-16 text-blue-200 mb-8 transform group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-bold mb-6">Unrivaled Reporting Integrity</h3>
                <p className="text-blue-100 text-lg leading-relaxed mb-8">
                  WhiteCanyon's local log generation is being replaced by D-Secure's central, tamper-proof audit reports with certificate (2K RSA signed). Ensure that your certificates can't be modified after generation.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-blue-400/30">
                  <div>
                    <h4 className="font-bold text-2xl mb-1">100%</h4>
                    <p className="text-sm text-blue-100">Audit Pass Rate</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl mb-1">Zero</h4>
                    <p className="text-sm text-blue-100">Data Remanence</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-10 right-10 -bottom-10 -left-10 bg-slate-100 rounded-[3rem] -z-10 border border-slate-200" />
            </div>

            <div>
              <h3 className="text-4xl font-extrabold text-slate-900 mb-8 leading-tight">Future-Proof Your Compliance Workflow</h3>
              <ul className="space-y-8">
                <li className="flex gap-4 items-start">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Cloud-Native Agility</h4>
                    <p className="text-slate-600">No more manual patching. Every time you log in to D-Secure, you're using the latest, most compliant version across all sites globally.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">REST API for ITAD</h4>
                    <p className="text-slate-600">Bridge the gap between data destruction and your inventory system. Sync certificates directly to your ERP via modern webhooks.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Unlimited Scalability</h4>
                    <p className="text-slate-600">From a single laptop to a global fleet of 10,000 servers. D-Secure's SaaS architecture scales with you without overhead costs.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-slate-900">
        <div className="container-app relative overflow-hidden rounded-[3rem] p-12 md:p-24 bg-gradient-to-br from-blue-900 to-indigo-950 text-center shadow-3xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 relative">Ready to simplify your standards?</h2>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto relative">
            Join hundreds of enterprises that have upgraded from WhiteCanyon to D-Secure's modern SaaS governance model.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative">
            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-white text-blue-900 rounded-2xl font-extrabold text-xl hover:bg-blue-50 transition-all shadow-lg">
              Contact Sales
              <ArrowRight className="w-6 h-6 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
