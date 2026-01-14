import React from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ShieldIcon,
  DatabaseIcon,
  ServerIcon
} from '@/components/FlatIcons';

export default function UseCasesPage() {
  const useCases = [
    {
      title: 'IT Asset Disposition',
      description: 'Secure data erasure for IT asset disposal and recycling',
      icon: <ServerIcon className="w-6 h-6" filled={true} />
    },
    {
      title: 'Device Refresh Programs',
      description: 'Erasure of devices during refresh cycles',
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />
    },
    {
      title: 'Compliance Requirements',
      description: 'Meeting regulatory compliance for data destruction',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage('use-cases')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Use Cases
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Explore data erasure use cases across industries. Real-world applications and implementation scenarios.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive">
            <div className="grid md:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <Reveal key={useCase.title} delayMs={index * 100}>
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 text-white">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{useCase.title}</h3>
                    <p className="text-slate-600">{useCase.description}</p>
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
