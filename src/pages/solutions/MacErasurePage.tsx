import React from 'react';
import { Link } from 'react-router-dom';
import Reveal from '@/components/Reveal';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import { LightningIcon, CheckIcon, CpuIcon } from '@/components/FlatIcons';

export default function MacErasurePage() {
  const macSchema = {

    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Mac Data Erasure Software for Apple Silicon (M1-M4) & Intel",
    "description": "Securely wipe MacBooks, iMacs, and Mac Minis. D-Secure provides tamper-proof audit reports with certificate for Apple Silicon (M1, M2, M3, M4) and Intel Macs with verifiable reporting.",
    "publisher": {
      "@type": "Organization",
      "name": "D-Secure",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dsecuretech.com/logo.png"
      }
    }
  };

  const features = [
    {
      title: "Apple Silicon Native Support",
      description: "Unlike legacy erasure tools that struggle with modern architecture, D-Secure natively supports M1, M2, M3, and M4 chips directly through Cryptographic Erase implementation.",
    },
    {
      title: "T2 Security Chip Integration",
      description: "D-Secure communicates perfectly with Apple's T2 Security Chip, ensuring encryption keys are securely destroyed to render data permanently unrecoverable.",
    },
    {
      title: "Automated MDM Unlocking",
      description: "Automatically detect Mobile Device Management (MDM) locks and Activation Locks before erasure, saving hours of processing time for ITAD facilities."
    }
  ];

  return (
    <>
      <SEOHead 
        seo={{
          ...getSEOForPage('mac'),
          structuredData: macSchema
        }} 
      />

      {/* Hero Section */}
      <section className="bg-slate-50 py-20 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-200/50 to-transparent"></div>
        <div className="container-app relative z-10">
          <Reveal>
            <div className="max-w-4xl text-left">
              <div className="inline-flex items-center space-x-2 bg-slate-200 px-3 py-1 rounded-full text-slate-800 font-medium text-sm mb-6 border border-slate-300">
                <CpuIcon className="w-4 h-4" filled={true} />
                <span>Intel + Apple Silicon Support</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Compliance Data Erasure for <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900">MacBook & iMac</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl leading-relaxed">
                Securely wipe Mac computers at scale. D-Secure provides the industry's most reliable macOS data sanitization software, fully supporting M1-M4 Apple Silicon, T2 Security Chips, and legacy Intel architecture.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/pricing-and-plan" className="btn-primary hover:scale-105 transition-transform">
                  View Pricing
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Request Demo
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why D-Secure for Mac? */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container-app">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Reveal key={feature.title} delayMs={features.indexOf(feature) * 150}>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center mb-6">
                    <LightningIcon className="w-6 h-6" filled={true} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 block">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Legacy Tool Problem */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal animation="slide-right">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">The Apple Silicon Challenge</h2>
                <div className="space-y-6 text-slate-600">
                  <p>
                    When Apple shifted from Intel to their proprietary Apple Silicon (M-series chips), the underlying architecture of data storage drastically changed. Traditional bootable USB wiping tools built on Linux kernels suddenly stopped working.
                  </p>
                  <p>
                    <strong>D-Secure solved this.</strong> Instead of relying on brute-force overwriting that damages SSD lifespan, D-Secure integrates directly with Apple's secure enclave and APFS architecture to execute verifiable Cryptographic Erasure instantly.
                  </p>
                  <ul className="space-y-4 pt-4">
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-4 h-4" filled={true} />
                      </div>
                      <span className="font-medium text-slate-800">10x faster processing times vs traditional tools</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-4 h-4" filled={true} />
                      </div>
                      <span className="font-medium text-slate-800">No SSD degradation during sanitization</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckIcon className="w-4 h-4" filled={true} />
                      </div>
                      <span className="font-medium text-slate-800">Tamper-proof audit reports with certificate (Page 1: Certificate, Page 2+: Summary)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal animation="slide-left">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <CpuIcon className="w-64 h-64" filled={true} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 relative z-10">Supported Apple Hardware</h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="font-bold text-slate-800 mb-1">MacBook Pro</div>
                    <div className="text-sm text-slate-500">M1, M2, M3, M4 & Intel</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="font-bold text-slate-800 mb-1">MacBook Air</div>
                    <div className="text-sm text-slate-500">M1, M2, M3 & Intel</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="font-bold text-slate-800 mb-1">Mac Mini / Studio</div>
                    <div className="text-sm text-slate-500">All Silicon Generations</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="font-bold text-slate-800 mb-1">iMac</div>
                    <div className="text-sm text-slate-500">24-inch M-Series & Intel</div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-200 relative z-10">
                  <p className="text-sm text-slate-600 italic">"We switched to D-Secure because our previous provider couldn't handle the influx of M1 MacBooks. D-Secure processes them flawlessly." - Enterprise ITAD Partner</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-20 text-center text-white">
        <div className="container-app">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Upgrade Your Mac Wiping Workflow</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Stop fighting with incompatible boot disks. Use D-Secure to safely, quickly, and compliantly erase modern Mac hardware with tamper-proof audit reports.
            </p>
            <Link to="/contact" className="btn bg-white text-slate-900 hover:bg-slate-100 border-transparent shadow-lg hover:shadow-xl px-8 py-4 font-bold rounded-xl text-lg transition-all hover:-translate-y-1">
              Talk to Our Enterprise Team
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
