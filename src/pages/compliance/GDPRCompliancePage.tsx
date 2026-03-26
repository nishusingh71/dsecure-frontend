import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import { ShieldIcon, ClipboardIcon, LockIcon, CheckIcon, GlobeIcon } from '@/components/FlatIcons';

export default function GDPRCompliancePage() {
  const gdprSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "GDPR Compliant Data Erasure Software Guide",
    "description": "Ensure EU GDPR Article 17 (Right to be Forgotten) compliance with D-Secure's certified data wiping software. Provide audit-proof deletion reports.",
    "publisher": {
      "@type": "Organization",
      "name": "D-Secure",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dsecuretech.com/logo.png"
      }
    }
  };

  const requirements = [
    {
      title: "Article 17: Right to Erasure",
      description: "Data subjects have the right to request the deletion or removal of personal data where there is no compelling reason for its continued processing.",
      solution: "D-Secure provides targeted File & Folder erasure to permanently remove specific user data across active Windows/Mac systems without affecting the OS."
    },
    {
      title: "Article 32: Security of Processing",
      description: "Controllers and processors must implement appropriate technical measures to ensure a level of security appropriate to the risk.",
      solution: "D-Secure sanitizes end-of-life assets using Cryptographic Erasure before they leave the facility, mitigating the #1 source of data breaches.",
    },
    {
      title: "Article 5: Accountability",
      description: "The controller shall be responsible for and be able to demonstrate compliance with data protection principles.",
      solution: "D-Secure auto-generates tamper-proof PDF & XML reports detailing exactly when, how, and what data was erased to prove compliance to auditors."
    }
  ];

  return (
    <>
      <SEOHead 
        seo={{
          ...getSEOForPage('gdpr'),
          structuredData: gdprSchema
        }} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 py-20 pb-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="container-app relative z-10">
          <Reveal>
            <div className="max-w-4xl text-left">
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 font-medium text-sm mb-6 border border-blue-500/30">
                <GlobeIcon className="w-4 h-4" filled={true} />
                <span>EU GDPR Ready Solutions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Guarantee <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">GDPR Compliance</span> in Data Disposal
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Protect your organization from €20M fines. D-Secure empowers enterprises to fulfill "Right to be Forgotten" requests and sanitize end-of-life IT assets with 100% verified, audit-friendly documentation.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/pricing-and-plan" className="btn bg-blue-600 hover:bg-blue-500 text-white border-transparent px-6 py-3 rounded-lg font-medium transition-colors">
                  Get Compliant Software
                </Link>
                <Link to="/contact" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/20">
                  Speak to an Expert
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Requirements Section */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {requirements.map((req) => (
              <Reveal key={req.title} delayMs={requirements.indexOf(req) * 150}>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <ClipboardIcon className="w-6 h-6" filled={true} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 block">{req.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">{req.description}</p>
                  <div className="pt-6 border-t border-slate-100">
                    <span className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-2 block">D-Secure Capability</span>
                    <p className="text-slate-800 text-sm font-medium">{req.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why GDPR Matters */}
      <section className="py-20 bg-slate-50">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal animation="slide-right">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Mitigating GDPR Liability in IT Asset Disposition (ITAD)</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                      <LockIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Preventing Data Leaks</h4>
                      <p className="text-slate-600">Donating or recycling hardware without certifiable data erasure is a direct violation of GDPR principles. Formatting drives is not enough to stop data recovery.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Right to be Forgotten</h4>
                      <p className="text-slate-600">When users request data deletion, you must prove the deletion occurred. Our File Eraser provides the exact audit trail needed.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                      <CheckIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Immutable Audit Trail</h4>
                      <p className="text-slate-600">To comply with the 'Accountability' principle, D-Secure maintains a secure, centralized cloud log of all erasure activities across your network.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal animation="slide-left">
              <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ClipboardIcon className="w-48 h-48" filled={true} />
                </div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">Essential Erasure Reports for DPAs</h3>
                <p className="text-slate-300 mb-6 relative z-10">Data Protection Authorities (DPAs) expect documented proof. D-Secure provides:</p>
                <ul className="space-y-4 mb-8 relative z-10 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Hardware identification (Serial, MAC, Model)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Cryptographic signature validation
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Operator identity logging
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-blue-400" filled={true} />
                    Erasure algorithm execution results
                  </li>
                </ul>
                <Link to="/products/file-eraser" className="text-blue-400 font-medium hover:text-blue-300 inline-flex items-center transition-colors relative z-10">
                  Explore D-Secure File Eraser
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center">
        <div className="container-app">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Take Control of Your GDPR Compliance</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Implement a defensible data wiping policy today to protect your customers and avoid severe regulatory fines.
            </p>
            <Link to="/pricing-and-plan" className="btn bg-white text-blue-700 hover:bg-slate-50 border-transparent shadow-lg hover:shadow-xl px-8 py-4 font-bold rounded-xl text-lg transition-all hover:scale-105">
              Get Started Now
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
