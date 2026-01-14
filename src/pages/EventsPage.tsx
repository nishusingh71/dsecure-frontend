import React from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  StarIcon
} from '@/components/FlatIcons';

export default function EventsPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('events')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Events
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Upcoming events, conferences, and trade shows featuring D-Secure Tech. Meet us at industry events.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-slate-600">
                  Upcoming events coming soon. Check back for conferences and trade shows.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
