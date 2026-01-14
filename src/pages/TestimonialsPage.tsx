import React from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  StarIcon
} from '@/components/FlatIcons';

export default function TestimonialsPage() {
  const testimonials = [
    {
      quote: "D-Secure Tech has transformed our IT asset disposition process. Compliance has never been easier.",
      author: "IT Director",
      company: "Fortune 500 Company"
    },
    {
      quote: "The best data erasure solution we've used. Fast, reliable, and fully compliant.",
      author: "Security Manager",
      company: "Healthcare Organization"
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage('testimonials')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <StarIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Customer Testimonials
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                See what our customers say about D-Secure Tech data erasure solutions.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((item, index) => (
                <Reveal key={index} delayMs={index * 100}>
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200">
                    <p className="text-slate-700 italic mb-4">"{item.quote}"</p>
                    <div>
                      <p className="font-semibold text-slate-900">{item.author}</p>
                      <p className="text-slate-500 text-sm">{item.company}</p>
                    </div>
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
