import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  StarIcon
} from '@/components/FlatIcons';

export default function CustomerStoriesPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('customer-stories')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Customer Stories
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Success stories from D-Secure Tech customers. Real-world implementations and results.
              </p>
              <Link
                to="/resources/case-studies"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all"
              >
                View Case Studies
                <ArrowRightIcon className="w-5 h-5" filled={true} />
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
