import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  StarIcon
} from '@/components/FlatIcons';

export default function LiveDemoPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('live-demo')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <StarIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Live Interactive Demo
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Experience a live interactive demo of D-Secure Tech data erasure software. See features in action.
              </p>
              <Link
                to="/request-demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all text-lg"
              >
                Schedule Live Demo
                <ArrowRightIcon className="w-5 h-5" filled={true} />
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
