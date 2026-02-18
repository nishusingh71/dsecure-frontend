import React, { memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const ReadbackVerificationPage: React.FC = memo(() => {
  return (
    <>
      <SEOHead seo={getSEOForPage('help-manual')} />
      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <Link to="/support/manual/verification-methods" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Readback <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Verification</span>
              </h1>
              <p className="text-xl text-slate-700">Complete sector-by-sector verification of erasure patterns</p>
            </Reveal>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">How It Works</h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Read every sector after erasure</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Compare with expected pattern</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Report any discrepancies</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Generate verification regulatory document</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default React.memo(ReadbackVerificationPage);
