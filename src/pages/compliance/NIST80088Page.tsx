import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import { ShieldIcon, ClipboardIcon, LockIcon, CheckIcon } from '@/components/FlatIcons';

export default function NIST80088Page() {
  const nistSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "NIST 800-88 Data Erasure Standard Compliance Guide",
    "description": "Learn how D-Secure helps organizations achieve NIST SP 800-88 Rev. 1 compliant data erasure for HDDs, SSDs, and storage arrays with tamper-proof certificates.",
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
      title: "Clear",
      description: "Logical techniques (such as overwriting) to sanitize data in all user-addressable storage locations for protection against simple non-invasive data recovery techniques.",
      solution: "D-Secure overwrites all addressable locations up to 35 times using DoD, NIST, or custom algorithms, generating a verified log of completion."
    },
    {
      title: "Purge",
      description: "Physical or logical techniques that render target data recovery infeasible using state-of-the-art laboratory techniques.",
      solution: "D-Secure utilizes Cryptographic Erase (CE) and Secure Erase commands at the controller level for SSDs, meeting strict NIST Purge requirements.",
    },
    {
      title: "Destroy",
      description: "Physical destruction of media making data recovery infeasible and the media incapable of storing data.",
      solution: "D-Secure provides tracking protocols and Chain of Custody reports to integrate seamlessly with your physical destruction workflows."
    }
  ];

  return (
    <>
      <SEOHead 
        seo={{
          ...getSEOForPage('nist80088'),
          structuredData: nistSchema
        }} 
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-20 pb-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container-app relative z-10">
          <Reveal>
            <div className="max-w-4xl text-left">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-300 font-medium text-sm mb-6 border border-emerald-500/30">
                <ShieldIcon className="w-4 h-4" filled={true} />
                <span>NIST SP 800-88 Rev. 1 Compliant</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Achieve <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">NIST 800-88</span> Data Erasure Compliance
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Meet the gold standard for data sanitization. D-Secure provides verifiable, tamper-proof data erasure that strictly adheres to the National Institute of Standards and Technology (NIST) Special Publication 800-88 Guidelines for Media Sanitization.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/pricing-and-plan" className="btn-primary hover:scale-105 transition-transform">
                  Get Compliant Software
                </Link>
                <Link to="/contact" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/20">
                  Request Consultation
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
            {requirements.map((req, index) => (
              <Reveal key={index} delayMs={index * 150}>
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    <CheckIcon className="w-6 h-6" filled={true} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 block">NIST {req.title} Level</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">{req.description}</p>
                  <div className="pt-6 border-t border-slate-100">
                    <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase mb-2 block">The D-Secure Solution</span>
                    <p className="text-slate-800 text-sm font-medium">{req.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why NIST Matters */}
      <section className="py-20 bg-slate-50">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal animation="slide-right">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why NIST 800-88 Compliance is Critical</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <ClipboardIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Regulatory Requirement</h4>
                      <p className="text-slate-600">NIST guidelines are the foundation for compliance with HIPAA, GDPR, PCI-DSS, and FISMA. Falling short can result in severe legal penalties.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
                      <LockIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Modern Storage Security</h4>
                      <p className="text-slate-600">Standard formatting leaves data recoverable on modern SSDs. NIST 800-88 dictates Cryptographic Erasure and block-level overwriting to guarantee unrecoverability.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldIcon className="w-5 h-5" filled={true} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Audit-Proof Documentation</h4>
                      <p className="text-slate-600">NIST requires verification. D-Secure generates digitally signed, tamper-proof Certificates of Erasure for every single sanitized device.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal animation="slide-left">
              <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldIcon className="w-48 h-48" filled={true} />
                </div>
                <h3 className="text-2xl font-bold mb-6 relative z-10">Generate Tamper-Proof Certificates</h3>
                <ul className="space-y-4 mb-8 relative z-10 text-slate-300">
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-emerald-400" filled={true} />
                    Device Serial Number & Specs
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-emerald-400" filled={true} />
                    Erasure Algorithm Used (e.g. NIST 800-88 Purge)
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-emerald-400" filled={true} />
                    Timestamp & Operator Details
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="w-5 h-5 text-emerald-400" filled={true} />
                    Cryptographic Validation Signature
                  </li>
                </ul>
                <Link to="/products/drive-eraser" className="text-emerald-400 font-medium hover:text-emerald-300 inline-flex items-center transition-colors relative z-10">
                  Explore D-Secure Drive Eraser
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
      <section className="bg-emerald-600 py-20 text-center">
        <div className="container-app">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to achieve NIST compliance?</h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of IT asset disposition (ITAD) facilities, enterprises, and government agencies relying on D-Secure for certified data erasure.
            </p>
            <Link to="/pricing-and-plan" className="btn bg-white text-emerald-700 hover:bg-slate-50 border-transparent shadow-lg hover:shadow-xl px-8 py-4 font-bold rounded-xl text-lg transition-all hover:scale-105">
              Get Started Now
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
