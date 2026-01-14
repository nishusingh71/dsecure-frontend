import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  CalendarIcon,
  StarIcon
} from '@/components/FlatIcons';

export default function NewsPage() {
  const newsItems = [
    {
      date: '2026-01-10',
      title: 'D-Secure Tech Launches New Enterprise Platform',
      excerpt: 'Introducing advanced enterprise data erasure platform with enhanced compliance features.',
      category: 'Product Updates'
    },
    {
      date: '2026-01-05',
      title: 'Partnership with Leading ITAD Provider',
      excerpt: 'Strategic partnership to expand data erasure services across North America.',
      category: 'Partnerships'
    },
    {
      date: '2025-12-20',
      title: 'NIST 800-88 Compliance Certification',
      excerpt: 'D-Secure Tech achieves full NIST 800-88 compliance certification.',
      category: 'Certifications'
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage('news')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Latest News
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Stay updated with latest news and announcements from D-Secure Tech.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-3">
                      {item.category}
                    </span>
                    <p className="text-sm text-slate-500 mb-2">{item.date}</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600 mb-4">{item.excerpt}</p>
                    <Link to="#" className="text-emerald-600 font-semibold inline-flex items-center gap-2 hover:text-emerald-700">
                      Read More <ArrowRightIcon className="w-4 h-4" filled={true} />
                    </Link>
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
