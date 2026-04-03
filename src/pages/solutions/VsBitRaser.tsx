import { useEffect } from "react";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";

const comparisonFeatures = [
  {
    feature: "Mass Erasure Stability",
    dsecure: "Industrial Parallel Engine (100+ Drives)",
    bitraser: "Propensity to Stall on Mixed Volume",
    better: "dsecure"
  },
  {
    feature: "Drive Support",
    dsecure: "Advanced NVMe/U.3/NVMe-oF Native Support",
    bitraser: "Standard SATA/SAS Focus",
    better: "dsecure"
  },
  {
    feature: "Report Customization",
    dsecure: "Custom Page Annexures & White-labelling",
    bitraser: "Standard Template Reports",
    better: "dsecure"
  },
  {
    feature: "Global Standards",
    dsecure: "NIST 800-88, DoD 5220.22-M, GDPR, HIPAA",
    bitraser: "Similar Compliance Portfolio",
    better: "equal"
  },
  {
    feature: "Activation Model",
    dsecure: "Zero-Trust SaaS / Offline Tokens / PXE",
    bitraser: "USB Dongle / Online Management Console",
    better: "dsecure"
  },
  {
    feature: "API for ITAD",
    dsecure: "Native Webhooks for RazorERP/IQity Integration",
    bitraser: "Standard Cloud Export",
    better: "dsecure"
  }
];

export default function VsBitRaser() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={getSEOForPage("vs-bitraser")} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-emerald-600/10 -skew-x-12 -translate-x-1/2" />
        <div className="container-app relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-bold mb-8">
              <Lock className="w-4 h-4" />
              <span>Certified Industrial Sanitization</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              D-Secure <span className="text-emerald-500">vs</span> BitRaser
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Reliability matters when you're erasing 100+ drives. Experience the D-Secure industrial engine that out-performs BitRaser in volume and reporting.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/40">
                Switch to D-Secure
              </Link>
              <Link to="/pricing-and-plan" className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold hover:bg-slate-750 transition-all">
                See Comparative Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Industrial Benchmarks</h2>
            <p className="text-slate-600 text-lg">Compare BitRaser's standard solutions with D-Secure's high-volume engine.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-6 px-8 text-lg font-bold">Vector</th>
                    <th className="py-6 px-8 text-lg font-bold bg-emerald-600">D-Secure Industrial</th>
                    <th className="py-6 px-8 text-lg font-bold text-slate-400">BitRaser</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row) => (
                    <tr key={row.feature} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-6 px-8 font-bold text-slate-700">{row.feature}</td>
                      <td className="py-6 px-8 font-medium text-emerald-900 bg-emerald-50/20">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          {row.dsecure}
                        </div>
                      </td>
                      <td className="py-6 px-8 text-slate-500 italic">{row.bitraser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Specific Industry Benefits */}
      <section className="py-24">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Why Leading ITADs Switch</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0 font-bold text-xl">1</div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Mass Parallel Performance</h4>
                    <p className="text-slate-600 leading-relaxed">Unlike BitRaser, which can slow down when processing mixed drives, D-Secure manages 100+ erasures in parallel with a focus on consistent throughput across NVMe and SATA.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0 font-bold text-xl">2</div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Tamper-Proof Certificates</h4>
                    <p className="text-slate-600 leading-relaxed">We provide 2048-bit RSA signed PDF reports, ensuring that certificates cannot be edited after generation, providing superior legal proof for high-security audits.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0 font-bold text-xl">3</div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Flexible Activation</h4>
                    <p className="text-slate-600 leading-relaxed">No need to carry around physical dongles. Our cloud-based tokenization system allows for instant, cross-site deployments and remote activation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_70%)]" />
              <ShieldCheck className="w-16 h-16 text-emerald-400 mb-8" />
              <h3 className="text-3xl font-bold mb-6">Experience Zero-Trust Data Sanitization</h3>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                BitRaser's legacy approach is being replaced by D-Secure's modern architecture. Same compliance, better reliability, and faster reporting.
              </p>
              <Link to="/contact" className="w-full inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl font-extrabold text-xl shadow-2xl transition-all">
                Start Free POC
                <ArrowRight className="w-6 h-6 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container-app text-center">
          <Globe className="w-12 h-12 text-slate-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Trusted by Global ITAD Giants</h2>
          <div className="flex justify-center flex-wrap gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            {/* Logos placeholder logic */}
          </div>
          <p className="mt-8 text-slate-500 font-medium">Compliance: NIST 800-88, DoD 5220.22-M, ISO 27001, GDPR Article 17</p>
        </div>
      </section>
    </div>
  );
}
