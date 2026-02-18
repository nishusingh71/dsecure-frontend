import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsCryptoErasurePage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-windows-crypto-erasure")} />
      {/* <Helmet>
        <title>Windows Cryptographic Erasure | BitLocker & SED Key Destruction</title>
        <meta name="description" content="Cryptographic erasure methods for Windows including BitLocker key destruction and self-encrypting drive procedures." />
      </Helmet> 
      */}

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <Link to="/support/manual/windows" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Windows Systems
                </Link>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Cryptographic <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Erasure</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Encrypted drive key destruction procedures
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-12">
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">BitLocker Cryptographic Erasure</h2>
                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Key Destruction Commands</h4>
                    <pre className="text-sm bg-slate-800 text-green-400 p-3 rounded overflow-x-auto">
{`# Remove BitLocker protection
manage-bde -off C:

# Delete all key protectors
manage-bde -protectors -delete C: -type all`}
                    </pre>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
});

export default React.memo(WindowsCryptoErasurePage);