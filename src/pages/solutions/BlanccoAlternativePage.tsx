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
} from "lucide-react";
import { Link } from "react-router-dom";

const comparisonFeatures = [
  {
    feature: "Deployment Architecture",
    dsecure: "Zero-Touch Cloud/PXE/USB (Instant Setup)",
    blancco: "Complex Management Servers (Heavy Configuration)",
    better: "dsecure"
  },
  {
    feature: "Pricing Model",
    dsecure: "Transparent, Competitive, Bulk Savings",
    blancco: "High Premium, Complex Licensing Tiers",
    better: "dsecure"
  },
  {
    feature: "Compliance Standards",
    dsecure: "NIST 800-88, GDPR, HIPAA, CE (Standard)",
    blancco: "Similar Standards (Often requires Add-ons)",
    better: "equal"
  },
  {
    feature: "User Interface",
    dsecure: "Modern, Intuitive, No Training Required",
    blancco: "Legacy Java/Desktop App Feel (Steep Curve)",
    better: "dsecure"
  },
  {
    feature: "Report Generation",
    dsecure: "Instant Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary)",
    blancco: "Central Management Console Required",
    better: "dsecure"
  }
];

export default function BlanccoAlternativePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage("alternative")} />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-50" />
          
          <div className="container-app relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold animate-fade-in">
                <ShieldCheck className="w-4 h-4" />
                <span>The #1 Smarter Alternative to Blancco & BitRaser</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                Modern Data Erasure Without the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Complexity or Cost.</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Why pay for legacy complexity? D-Secure provides enterprise-grade, tamper-proof audit reports with certificate that's faster to deploy, easier to manage, and 40% more cost-effective.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg shadow-xl shadow-emerald-200 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/pricing-and-plan"
                  className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 rounded-xl font-bold text-lg transition-all flex items-center justify-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-20 bg-slate-50">
          <div className="container-app">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Direct Comparison</h2>
              <p className="text-slate-600">See why enterprises are switching to D-Secure's modern governance model.</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="py-6 px-8 text-lg font-bold">Operational Vector</th>
                      <th className="py-6 px-8 text-lg font-bold bg-emerald-600">D-Secure Tech</th>
                      <th className="py-6 px-8 text-lg font-bold text-slate-400">Standard Legacy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row) => (
                      <tr key={row.feature} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-6 px-8 font-semibold text-slate-700">{row.feature}</td>
                        <td className="py-6 px-8 font-medium text-emerald-900 bg-emerald-50/30">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            {row.dsecure}
                          </div>
                        </td>
                        <td className="py-6 px-8 text-slate-500">{row.blancco}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differentiation Cards */}
        <section className="py-24">
          <div className="container-app">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100 transition-all group">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Zero-Touch Automation</h3>
                <p className="text-slate-600 leading-relaxed">
                  Forget manual USB booting. Deploy D-Secure via PXE, Network, or Cloud Agents for massive scale without physical intervention.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100 transition-all group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Unified Compliance</h3>
                <p className="text-slate-600 leading-relaxed">
                  Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary) for NIST, GDPR, and HIPAA out of the box. No extra modules or hidden costs for standard compliance reporting.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-100 transition-all group">
                <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">API-First Platform</h3>
                <p className="text-slate-600 leading-relaxed">
                  Integrate data destruction results directly into your ITAD software or ERP via RESTful APIs. Full lifecycle governance, automated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-20">
          <div className="container-app">
            <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_70%)]" />
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative">
                Ready to Upgrade Your Erasure Strategy?
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 relative leading-relaxed">
                Join hundreds of enterprises that have optimized their data sanitization workflows with D-Secure. 
                Same compliance, better experience.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl font-extrabold text-xl transition-all shadow-lg"
                >
                  Request a Demo
                </Link>
                <div className="flex items-center gap-4 text-white/80">
                  <Globe className="w-6 h-6 text-emerald-400" />
                  <span className="font-medium text-lg">Global Standards (NIST, GDPR)</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
