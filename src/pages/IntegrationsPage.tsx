import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  GearIcon,
  CloudIcon,
  ServerIcon
} from '@/components/FlatIcons';

export default function IntegrationsPage() {
  const integrations = [
    {
      title: 'ServiceNow',
      description: 'Integrate with ServiceNow for automated IT asset management',
      icon: <GearIcon className="w-6 h-6" filled={true} />
    },
    {
      title: 'Azure AD',
      description: 'Azure Active Directory integration for authentication',
      icon: <CloudIcon className="w-6 h-6" filled={true} />
    },
    {
      title: 'SCCM',
      description: 'Microsoft SCCM integration for enterprise deployment',
      icon: <ServerIcon className="w-6 h-6" filled={true} />
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage('integrations')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <GearIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Integrations
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Integrate D-Secure Tech with your existing IT infrastructure. ServiceNow, Azure AD, SCCM, and more.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive">
            <div className="grid md:grid-cols-3 gap-6">
              {integrations.map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 text-white">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.description}</p>
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
