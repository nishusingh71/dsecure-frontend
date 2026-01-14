import React, { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  StarIcon
} from '@/components/FlatIcons';

export default function ROICalculatorPage() {
  const [devices, setDevices] = useState(100);
  const [costPerDevice, setCostPerDevice] = useState(50);

  const totalSavings = devices * costPerDevice;

  return (
    <>
      <SEOHead seo={getSEOForPage('roi-calculator')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <StarIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                ROI Calculator
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Calculate your return on investment with D-Secure Tech data erasure solutions.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive max-w-2xl mx-auto">
            <Reveal>
              <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Devices per Year</label>
                    <input
                      type="number"
                      value={devices}
                      onChange={(e) => setDevices(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Cost Savings per Device ($)</label>
                    <input
                      type="number"
                      value={costPerDevice}
                      onChange={(e) => setCostPerDevice(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="pt-6 border-t border-slate-200">
                    <div className="text-center">
                      <p className="text-slate-600 mb-2">Estimated Annual Savings</p>
                      <p className="text-4xl font-bold text-emerald-600">${totalSavings.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
