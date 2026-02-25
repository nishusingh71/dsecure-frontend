import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";
import Reveal from "../components/Reveal";

export default function DataHygieneFrameworkPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pillars = [
    {
      title: "Discovery & Inventory",
      description: "Automated identification of all storage assets across the enterprise, ensuring no 'dark data' exists outside of governance.",
      icon: "🔍"
    },
    {
      title: "Verifiable Sanitization",
      description: "Executing precise NIST 800-88 Clear and Purge protocols with cryptographic bit-level verification.",
      icon: "🛡️"
    },
    {
      title: "Tamper-Proof Certification",
      description: "Generating immutable certificates of destruction anchored in auditable session logs.",
      icon: "📜"
    },
    {
      title: "Compliance Mapping",
      description: "Direct alignment of erasure events to Article 17 (GDPR), HIPAA, and ISO 27001 regulatory requirements.",
      icon: "⚖️"
    },
    {
      title: "Environmental Circularity",
      description: "Facilitating secure hardware reuse and resale to reduce e-waste without compromising data privacy.",
      icon: "🌱"
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage("data-hygiene-framework")} />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-slate-900 py-20 lg:py-32 text-white overflow-hidden relative">
          <div className="container-responsive relative z-10">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                The Data Hygiene <span className="text-brand">Framework</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-10 leading-relaxed">
                Moving beyond ad-hoc wiping into structural lifecycle governance. 
                Our framework defines the global standard for verifiable data sanitization.
              </p>
            </Reveal>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/5 -skew-x-12 transform translate-x-1/4"></div>
        </section>

        {/* Core Concept: Lifecycle Governance */}
        <section className="py-20 bg-slate-50">
          <div className="container-responsive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Why Lifecycle Governance is Superior
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Traditional data erasure is often treated as a peripheral IT task—manual, inconsistent, and difficult to audit. 
                  D-Secure's <strong>Lifecycle Governance</strong> transforms sanitization into a core security competency.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm border-l-4 border-brand">
                    <div>
                      <h3 className="font-bold text-slate-900">Programmatic Control</h3>
                      <p className="text-slate-600 text-sm">Centralized policy enforcement across global sites.</p>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-white rounded-xl shadow-sm border-l-4 border-brand">
                    <div>
                      <h3 className="font-bold text-slate-900">Audit-Ready 24/7</h3>
                      <p className="text-slate-600 text-sm">Instant access to tamper-proof certificates for regulatory inspectors.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl">
                 <div className="border border-slate-700 rounded-2xl p-6 bg-slate-800/50">
                    <h3 className="text-brand font-bold mb-4 uppercase tracking-widest text-sm">Framework Architecture</h3>
                    <div className="space-y-6">
                       <div className="flex items-center justify-between">
                          <span className="text-slate-300">Strategy</span>
                          <span className="text-emerald-400 font-mono text-sm">Governance-First</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-slate-300">Execution</span>
                          <span className="text-emerald-400 font-mono text-sm">Cryptographic Sanitization</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-slate-300">Validation</span>
                          <span className="text-emerald-400 font-mono text-sm">Bit-Level Verification</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-slate-300">Reporting</span>
                          <span className="text-emerald-400 font-mono text-sm">Immutable JSON-LD Certificates</span>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* The 5 Pillars */}
        <section className="py-20 lg:py-32">
          <div className="container-responsive text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">The Five Pillars of Data Hygiene</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              A comprehensive approach to data sanitization that ensures security throughout the asset's entire decommissioning phase.
            </p>
          </div>
          
          <div className="container-responsive">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {pillars.map((pillar, index) => (
                <div key={index} className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-3">{pillar.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand">
          <div className="container-responsive text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Achieve Structural Compliance</h2>
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
              Download our full Data Hygiene Whitepaper or schedule a consultation with our framework architects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <a href="/contact" className="px-10 py-4 bg-white text-brand font-bold rounded-xl hover:bg-slate-50 transition-colors">
                 Schedule Consultation
               </a>
               <a href="/services" className="px-10 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                 Explore Services
               </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
