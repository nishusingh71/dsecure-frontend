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
  Trash2,
  Recycle,
  Scale,
  TrendingDown
} from "lucide-react";
import { Link } from "react-router-dom";

export default function WhatIsITAD() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead seo={getSEOForPage("what-is-itad")} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-32 bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-1/2" />
        <div className="container-app relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              What is <span className="text-blue-500">ITAD</span>?
            </h1>
            <p className="text-2xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              IT Asset Disposition (ITAD) is the business of disposing of obsolete or unwanted IT equipment in a safe and ecologically responsible way.
            </p>
            <Link to="/contact" className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-extrabold text-xl transition-all shadow-xl shadow-blue-900/40">
              Explore D-Secure ITAD Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container-app">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-12">
              <div className="prose prose-slate prose-lg max-w-none">
                <h2 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Understanding the ITAD Lifecycle</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6 italic">
                  "ITAD isn't just about getting rid of old laptops. It's about protecting data, recovering value, and ensuring environmental compliance."
                </p>
                <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                  As enterprises upgrade their technology, they face the massive challenge of what to do with 'retired' assets. This equipment often contains sensitive data, intellectual property, and proprietary software. ITAD companies specialize in the logistics, data sanitization, and disposal of these assets.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-12">The 3 Pillars of Effective ITAD</h3>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <ShieldCheck className="w-10 h-10 text-blue-600 mb-6" />
                    <h4 className="font-bold text-xl mb-4 text-slate-900">Data Security</h4>
                    <p className="text-slate-600">The most critical pillar. Hard drives must be erased using NIST 800-88 standards to prevent data breaches during asset resale.</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <Recycle className="w-10 h-10 text-emerald-600 mb-6" />
                    <h4 className="font-bold text-xl mb-4 text-slate-900">Sustainability</h4>
                    <p className="text-slate-600">Ensuring that assets that cannot be reused are recycled responsibly, minimizing e-waste and aligning with Scope 3 ESG goals.</p>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                    <TrendingDown className="w-10 h-10 text-indigo-600 mb-6" />
                    <h4 className="font-bold text-xl mb-4 text-slate-900">Value Recovery</h4>
                    <p className="text-slate-600">Maximizing the resale value of retired equipment by providing certified proof of sanitization to the next buyer.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-12">Why D-Secure is the ITAD Partner's Engine</h3>
                <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                  D-Secure provides the data erasure engine that powers ITAD operations globally. Our platform supports mass-parallel erasure, allowing operators to wipe hundreds of drives simultaneously with automated, tamper-proof audit reports with certificate (2K RSA signed). 
                </p>
                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white my-12">
                  <h4 className="text-2xl font-bold mb-4">Case Study: 30% Efficiency Gain</h4>
                  <p className="text-blue-100 mb-6 text-lg">
                    By switching from legacy manual booting to D-Secure's PXE-automated network erasure, a leading European ITAD provider reduced their labor hours by 30% while increasing their compliance pass rate.
                  </p>
                  <Link to="/contact" className="inline-flex items-center text-white font-extrabold border-b-2 border-white pb-1 group transition-all">
                    Learn about ITAD Automation <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-24">
                <h3 className="text-xl font-bold mb-6">Common ITAD Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-blue-400 mb-1">Is ITAD expensive?</h4>
                    <p className="text-sm text-slate-400">Effective ITAD typically pays for itself through asset remarketing and risk mitigation from data breaches.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-400 mb-1">What is R2v3?</h4>
                    <p className="text-sm text-slate-400">R2v3 is a global standard for responsible electronics recycling. D-Secure certificates are designed to support R2v3 auditing.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-400 mb-1">ITAD vs Recycling?</h4>
                    <p className="text-sm text-slate-400">Recycling is the end-of-life process. ITAD is the full management lifecycle, prioritizing reuse over destruction.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Authority Links</h3>
                <ul className="space-y-4 text-sm font-medium">
                  <li><Link to="/solutions/itad" className="text-blue-600 hover:underline">D-Secure ITAD Solutions</Link></li>
                  <li><Link to="/compliance/nist-800-88" className="text-blue-600 hover:underline">NIST 800-88 Guide</Link></li>
                  <li><Link to="/blog" className="text-blue-600 hover:underline">Impact of ITAD on ESG</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container-app text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Ready to Professionalize your ITAD?</h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Contact D-Secure to see how our industrial erasure engine can scale your asset disposition workflow.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-extrabold text-xl shadow-xl hover:bg-blue-700 transition-all">
              Request ITAD Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
