import React from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  StarIcon,
  HeartIcon
} from '@/components/FlatIcons';

export default function TeamPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('team')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <HeartIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Our Team
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Meet the talented team behind D-Secure Tech. Our experts in data security and erasure technology.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-slate-600">
                  Our team page is coming soon. Check back to meet the people behind D-Secure Tech.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
