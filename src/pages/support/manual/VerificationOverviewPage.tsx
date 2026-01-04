import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const VerificationOverviewPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Verification Overview | D-Secure</title>
      </Helmet>
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
                Verification <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Overview</span>
              </h1>
              <p className="text-xl text-slate-700">Comprehensive data erasure verification methods and standards</p>
            </Reveal>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Verification Methods</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                    <h3 className="font-bold text-emerald-900 mb-2">✓ Readback Verification</h3>
                    <p className="text-slate-700">Verify all sectors contain expected pattern</p>
                  </div>
                  <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
                    <h3 className="font-bold text-teal-900 mb-2">✓ Statistical Sampling</h3>
                    <p className="text-slate-700">Random sector verification for efficiency</p>
                  </div>
                  <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-200">
                    <h3 className="font-bold text-cyan-900 mb-2">✓ Cryptographic Hash</h3>
                    <p className="text-slate-700">SHA-256 checksums for data integrity</p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                    <h3 className="font-bold text-emerald-900 mb-2">✓ Regulatory Document Generation</h3>
                    <p className="text-slate-700">Tamper-proof audit regulatory documents</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default VerificationOverviewPage;
