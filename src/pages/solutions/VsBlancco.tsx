import { useEffect } from "react";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Cpu,
  Zap
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
    feature: "ARM64 / Apple Silicon Support",
    dsecure: "Native Support (M1-M4, AWS Graviton)",
    blancco: "Limited/Emulated Support (Legacy Focus)",
    better: "dsecure"
  },
  {
    feature: "Pricing Model",
    dsecure: "Transparent, Starting at $25/license",
    blancco: "High Premium, Opaque Licensing",
    better: "dsecure"
  },
  {
    feature: "Compliance Standards",
    dsecure: "NIST 800-88, IEEE 2883, GDPR, HIPAA",
    blancco: "Similar Global Standards",
    better: "equal"
  },
  {
    feature: "User Interface",
    dsecure: "Modern, Web-based, No Training Required",
    blancco: "Legacy Java/Desktop Application",
    better: "dsecure"
  },
  {
    feature: "Tamper-Proof Reporting",
    dsecure: "2048-bit RSA Signed PDF Certificates",
    blancco: "Standard PDF Export",
    better: "dsecure"
  }
];

export default function VsBlancco() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={getSEOForPage("vs-blancco")} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-1/2" />
        <div className="container-app relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-bold mb-8">
              <TrendingDown className="w-4 h-4" />
              <span>Smarter Choice for 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              D-Secure <span className="text-blue-500">vs</span> Blancco
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Switch to a modern, ARM-native data erasure platform that's easier to deploy and 40% more cost-effective than Blancco.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/40">
                Get a Free Quote
              </Link>
              <Link to="/pricing-and-plan" className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold hover:bg-slate-750 transition-all">
                Compare Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">The Verdict is Technical</h2>
            <p className="text-slate-600 text-lg">Why leading ITADs and Enterprises are migrating to D-Secure.</p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-6 px-8 text-lg font-bold">Feature Vector</th>
                    <th className="py-6 px-8 text-lg font-bold bg-blue-600">D-Secure Tech</th>
                    <th className="py-6 px-8 text-lg font-bold text-slate-400">Blancco</th>
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
                      <td className="py-6 px-8 text-slate-500 italic">{row.blancco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24">
        <div className="container-app">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Native ARM Support</h3>
              <p className="text-slate-600 leading-relaxed">
                Optimized for the latest Apple M1-M4 and AWS Graviton chips. Blancco's legacy architecture often requires emulation or specialized modules.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Audit-Proof Reporting</h3>
              <p className="text-slate-600 leading-relaxed">
                Generate 2048-bit RSA-signed PDF certificates that stand up to the most rigorous ISO 27001 and NIST audits.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">API Integration</h3>
              <p className="text-slate-600 leading-relaxed">
                Directly sync erasure results into your existing ERP or WMS using our modern REST API and webhooks. No manual certificate shuffling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-blue-600">
        <div className="container-app text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to switch to a smarter standard?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Contact us today for a side-by-side comparison with your current Blancco usage and see how much you can save.
          </p>
          <Link to="/contact" className="inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-2xl font-extrabold text-xl hover:bg-blue-50 transition-all shadow-2xl">
            Get Started <ArrowRight className="w-6 h-6 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
