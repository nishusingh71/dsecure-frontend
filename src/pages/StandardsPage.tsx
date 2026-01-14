import React from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ShieldIcon,
  CheckIcon
} from '@/components/FlatIcons';

export default function StandardsPage() {
  const standards = [
    {
      name: 'NIST 800-88',
      description: 'Guidelines for Media Sanitization',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />
    },
    {
      name: 'DoD 5220.22-M',
      description: 'Department of Defense standard',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />
    },
    {
      name: 'ISO 27001',
      description: 'Information security management',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage('standards')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <ShieldIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Data Erasure Standards
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Learn about data erasure standards including NIST 800-88, DoD 5220.22-M, and ISO 27001 compliance requirements.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive">
            <div className="grid md:grid-cols-3 gap-6">
              {standards.map((standard, index) => (
                <Reveal key={standard.name} delayMs={index * 100}>
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 text-white">
                      {standard.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{standard.name}</h3>
                    <p className="text-slate-600">{standard.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
