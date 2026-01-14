import React from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  StarIcon
} from '@/components/FlatIcons';

export default function WebinarsPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('webinars')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Webinars
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Join D-Secure Tech webinars on data erasure, compliance, and security. Live sessions and on-demand recordings.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-slate-600">
                  Webinar schedule coming soon. Register for upcoming webinars on data erasure and compliance.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
