import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const LicenseActivationPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-license-activation")} />
      {/* <Helmet>
        <title>License Key Activation | D-Secure Subscription Verification</title>
        <meta name="description" content="How to activate your D-Secure license key and verify your subscription for data erasure software." />
      </Helmet> 
      */}

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <Link to="/support/manual/installation" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Installation Guide
                </Link>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  License Key <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Activation</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  How to activate your D-Secure license and verify your subscription
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">License Key Format</h2>
                  <div className="bg-slate-100 rounded-lg p-6">
                    <h3 className="font-semibold text-slate-900 mb-3">25-Character Format</h3>
                    <div className="bg-slate-800 text-green-400 p-4 rounded font-mono text-center text-lg">
                      XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
                    </div>
                    <p className="text-slate-600 mt-3 text-sm">
                      Your license key consists of 25 alphanumeric characters separated by hyphens.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Activation Process</h2>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Launch D-Secure", desc: "Open the application after installation" },
                      { step: "2", title: "Enter license key", desc: "Input your 25-character license key in the activation dialog" },
                      { step: "3", title: "Verify internet connection", desc: "Ensure stable connection for online activation" },
                      { step: "4", title: "Complete activation", desc: "Wait for confirmation and restart if prompted" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{item.title}</h3>
                          <p className="text-slate-600 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Troubleshooting</h2>
                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">Common Issues</h3>
                      <ul className="space-y-2 text-orange-800">
                        <li>• Invalid license key error</li>
                        <li>• Network connection timeout</li>
                        <li>• License already in use</li>
                        <li>• Expired subscription</li>
                      </ul>
                    </div>
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

export default React.memo(LicenseActivationPage);