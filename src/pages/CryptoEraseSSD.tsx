import React from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

const CryptoEraseSSD: React.FC = () => {
  return (
    <>
      <SEOHead seo={getSEOForPage("ssd-cryptographic-erasure-guide")} />
      <Helmet>
        <title>CryptoEraseSSD | DSecure - Professional Data Erasure Guide</title>
        <meta name="description" content="Professional guide for secure data erasure using DSecure tools and methods." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    CryptoEraseSSD
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  Professional data erasure and security guide
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto">
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Guide Content</h2>
                  <p className="text-slate-700 leading-relaxed">
                    This is a professional guide for CryptoEraseSSD using DSecure technologies.
                    Content will be updated with specific instructions and procedures.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CryptoEraseSSD;
