import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsThirdPartyPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-windows-third-party")} />
      {/* <Helmet>
        <title>Windows Third Party | D-Secure</title>
      </Helmet> 
      */}
      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <Link to="/support/manual/windows" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Windows Third Party
              </h1>
            </Reveal>
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Overview</h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Comprehensive Windows Third Party guide</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Step-by-step instructions</li>
                  <li className="flex items-start"><span className="text-emerald-600 mr-2">✓</span> Best practices and recommendations</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default React.memo(WindowsThirdPartyPage);
