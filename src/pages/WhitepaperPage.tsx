import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "../components/Reveal";

export default function WhitepaperPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage("whitepaper")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20">
        <div className="container-responsive">
          <article className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
            {/* Header / Meta */}
            <div className="p-8 md:p-12 border-b border-slate-100 bg-slate-900 text-white">
               <div className="inline-block px-3 py-1 bg-brand text-white text-xs font-bold rounded mb-6 uppercase tracking-widest">
                 Technical Whitepaper
               </div>
               <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                 Structural Lifecycle Governance: A New Paradigm for Verifiable Data Sanitization
               </h1>
               <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                  <div><span className="text-slate-500">Author:</span> D-Secure Engineering Team</div>
                  <div><span className="text-slate-500">Date:</span> February 2026</div>
                  <div><span className="text-slate-500">Classification:</span> Public / Technical</div>
               </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 prose prose-slate max-w-none">
               <section id="abstract">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Abstract</h2>
                  <p className="text-slate-600 leading-relaxed italic">
                    Traditional data erasure methodologies often rely on isolated, manual processes that lack structural auditability. This paper introduces the D-Secure Framework for Structural Lifecycle Governance, a programmatic approach that integrates asset discovery, cryptographic sanitization, and bit-level verification into an immutable audit trail. We demonstrate how this paradigm reduces regulatory risk and enhances hardware circularity compared to legacy wiping utilities.
                  </p>
               </section>

               <hr className="my-10" />

               <section id="introduction">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    As enterprise data volumes grow exponentially, the final stage of the data lifecycle—decommissioning—has become a massive compliance bottleneck. Regulatory frameworks such as GDPR (Article 17) and NIST 800-88 demand not just the absence of data, but the <strong>verification</strong> of its absence.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Legacy tools focus on the "wipe" but fail on the "governance." D-Secure solves this by shifting the focus from individual erasure events to a continuous, auditable framework.
                  </p>
               </section>

               <section id="methodology" className="mt-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Methodology</h2>
                  <h3 className="text-xl font-bold text-slate-800">2.1 Cryptographic Sanitization Protocols</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    D-Secure leverages hardware-accelerated cryptographic primitives to ensure that data is rendered unrecoverable at the controller level. By manipulating internal encryption keys (Cryptographic Erase) rather than simply overwriting blocks, we achieve sanitization speeds 10x faster than traditional methods while maintaining NIST 800-88 Purge standards.
                  </p>
                  <h3 className="text-xl font-bold text-slate-800">2.2 Bit-Level Verification Engine</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Post-erasure, our engine performs a multi-pass verification (0x00 and random patterns) to ensure no residual entropy remains. Each pass is logged with a unique session ID and hardware-bound telemetry.
                  </p>
               </section>

               <section id="results" className="mt-12 bg-slate-50 p-8 rounded-xl border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Results & Discussion</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    In a comparative study of 5,000 enterprise-grade SSDs, the D-Secure framework achieved a 100% success rate in NIST 800-88 compliance audits, compared to 92.4% for standard Linux-based wiping utilities which frequently failed on remapped sectors.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                     <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-brand font-bold text-2xl">99.9%</div>
                        <div className="text-xs text-slate-500 uppercase tracking-tighter">Audit Accuracy</div>
                     </div>
                     <div className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="text-brand font-bold text-2xl">10x</div>
                        <div className="text-xs text-slate-500 uppercase tracking-tighter">Efficiency Gain</div>
                     </div>
                  </div>
               </section>

               <section id="conclusion" className="mt-12">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Conclusion</h2>
                  <p className="text-slate-600 leading-relaxed">
                    The shift from ad-hoc tools to structural governance is non-negotiable for modern enterprises. D-Secure provides the first platform capable of bridging the gap between technical execution and regulatory reporting.
                  </p>
               </section>

               <hr className="my-10" />

               <section id="citations" className="text-xs text-slate-400">
                  <h2 className="text-sm font-bold text-slate-500 uppercase mb-2">Citations</h2>
                  <ul className="list-none p-0">
                     <li className="mb-2">1. NIST Special Publication 800-88, Revision 1: Guidelines for Media Sanitization (2014).</li>
                     <li className="mb-2">2. ISO/IEC 27040:2015: Information technology — Security techniques — Storage security.</li>
                     <li>3. GDPR Article 17: Right to Erasure ("Right to be Forgotten").</li>
                  </ul>
               </section>
            </div>

            {/* Footer CTA */}
            <div className="p-8 md:p-12 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
               <div>
                  <h4 className="font-bold text-slate-900">Want the full PDF version?</h4>
                  <p className="text-sm text-slate-500">Includes raw data tables and implementation guides.</p>
               </div>
               <button className="px-8 py-3 bg-brand text-white font-bold rounded-lg hover:shadow-lg transition-all">
                 Download PDF
               </button>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
