import { useEffect } from "react";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";

export default function WhatIsNist80088() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead seo={getSEOForPage("what-is-nist-800-88")} />

      {/* Authority Hero */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="container-app relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-bold animate-fade-in shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>The #1 Global Media Sanitization Standard</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
               What is <span className="text-blue-600">NIST 800-88</span>?
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Understand the definitive guidelines for media sanitization used by government agencies and regulated industries globally.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container-app">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-slate-100 prose prose-slate prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Understanding the Standard</h2>
                <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                  Published by the National Institute of Standards and Technology, **NIST Special Publication 800-88 Rev. 1** is the industry-standard guideline for the sanitization of media. It provides a formal definition of how organizations should destroy data to ensure it is unrecoverable even through laboratory techniques.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">The Three Tiers of Sanitization</h3>
                <div className="grid gap-8 mb-12">
                  <div className="bg-slate-50 p-8 rounded-3xl border-l-4 border-blue-600">
                    <h4 className="font-bold text-2xl text-slate-900 mb-4">1. Clear</h4>
                    <p className="text-slate-600 leading-relaxed mb-4">Uses software-level techniques to overwrite all user-addressable storage locations. Protects against simple, non-invasive data recovery techniques.</p>
                    <Link to="/products/drive-eraser" className="text-blue-600 font-bold text-sm block">Products that support Clear <ArrowRight className="w-4 h-4 inline ml-1" /></Link>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border-l-4 border-emerald-600">
                    <h4 className="font-bold text-2xl text-slate-900 mb-4">2. Purge</h4>
                    <p className="text-slate-600 leading-relaxed mb-4">Physical or logical techniques that make target data recovery infeasible even using state-of-the-art laboratory techniques. This often includes **Cryptographic Erase** methods.</p>
                    <Link to="/products/drive-eraser" className="text-emerald-600 font-bold text-sm block">Products that support Purge <ArrowRight className="w-4 h-4 inline ml-1" /></Link>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-3xl border-l-4 border-red-600">
                    <h4 className="font-bold text-2xl text-slate-900 mb-4">3. Destroy</h4>
                    <p className="text-slate-600 leading-relaxed mb-4">Initializes the ultimate step of rendering target data recovery infeasible through physical destruction (e.g., disintegrating, pulverizing, or melting).</p>
                    <Link to="/contact" className="text-red-600 font-bold text-sm block">Inquire about Destruction Audits <ArrowRight className="w-4 h-4 inline ml-1" /></Link>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-6">Why NIST 800-88 Matters</h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-8">
                  Without a standard like NIST 800-88, organizations risk leaving sensitive data behind after asset disposal. Legacy 'DoD' wiping standards are often considered obsolete for modern SSD and NVMe drives; NIST 800-88 is the modern, risk-based replacement that accounts for current storage architectures.
                </p>

                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white mt-12 border shadow-2xl">
                  <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-blue-200" />
                    How D-Secure Implements NIST 800-88
                  </h4>
                  <p className="text-blue-100 text-lg leading-relaxed mb-8">
                    D-Secure is built on the NIST framework. Our industrial erasure engine automatically selects the correct sanitization protocol based on the media type (HDD, SSD, NVMe) and generates a **Tamper-proof audit reports with certificate** (2K RSA signed) for legal verification.
                  </p>
                  <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 rounded-2xl font-extrabold text-xl shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                    Connect for Compliance Audit <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar Resources */}
            <div className="lg:col-span-4 space-y-8 sticky top-24">
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Quick Resources
                </h3>
                <div className="space-y-6">
                  <div className="group cursor-pointer">
                    <h4 className="font-bold text-blue-400 mb-1 group-hover:underline">Clear vs Purge Comparison</h4>
                    <p className="text-xs text-slate-400">Deep dive into the technical differences for IT managers.</p>
                  </div>
                  <div className="group cursor-pointer">
                    <h4 className="font-bold text-blue-400 mb-1 group-hover:underline">NIST 800-88 Rev. 1 PDF</h4>
                    <p className="text-xs text-slate-400">Official publication from NIST.gov repository.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Audit Proof</h3>
                </div>
                <p className="text-sm text-slate-600 mb-6">
                  D-Secure certificates are designed to pass ISO 27001, SOC 2, and R2v3 audits with zero friction.
                </p>
                <Link to="/compliance" className="w-full block text-center py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow hover:bg-slate-800 transition-colors">
                  View Compliance Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs for SEO */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container-app">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Common NIST 800-88 Questions</h2>
            
            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-3xl">
                <h4 className="font-bold text-slate-900 mb-2">Is NIST 800-88 mandatory?</h4>
                <p className="text-slate-600">While it is a federal standard for US government agencies, it has become the de-facto requirement for private enterprises globally who need to prove data security and compliance.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl">
                <h4 className="font-bold text-slate-900 mb-2">Difference between DoD & NIST?</h4>
                <p className="text-slate-600">The DoD 5220.22-M standard is legacy and was designed for old magnetic media. NIST 800-88 is modern and specifically addresses SSD, NVMe, and virtualized storage techniques.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
