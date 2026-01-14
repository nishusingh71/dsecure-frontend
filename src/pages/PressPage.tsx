import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  BriefcaseIcon
} from '@/components/FlatIcons';

export default function PressPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('press')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <BriefcaseIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Press Room
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Press room with media resources, press releases, and press kit for journalists and media professionals.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Media Contact</h2>
                <p className="text-slate-600 mb-8">
                  For media inquiries, please contact our press team at press@dsecuretech.com
                </p>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Press Releases</h2>
                <p className="text-slate-600">Press releases and media materials coming soon.</p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
