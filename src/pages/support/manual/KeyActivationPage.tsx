import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const KeyActivationPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-key-activation")} />
      <Helmet>
        <title>Key Activation | D-Secure License Activation Process</title>
        <meta name="description" content="Enter 25-digit activation key to unlock premium D-Secure features and complete license activation." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <Link to="/support/manual/first-time-setup" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to First Time Setup
                </Link>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Key <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Activation</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Enter 25-digit activation key to unlock premium features
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Activation Key Format</h2>
                  <div className="bg-slate-100 rounded-lg p-6">
                    <div className="text-center">
                      <h3 className="font-semibold text-slate-900 mb-4">25-Character License Key</h3>
                      <div className="bg-slate-800 text-green-400 p-4 rounded font-mono text-lg mb-4">
                        XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
                      </div>
                      <p className="text-slate-600 text-sm">
                        Your activation key consists of 25 alphanumeric characters separated by hyphens
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Activation Process</h2>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Launch D-Secure", desc: "Open the application after installation" },
                      { step: "2", title: "Activation Dialog", desc: "The activation window will appear automatically" },
                      { step: "3", title: "Enter License Key", desc: "Type or paste your 25-character key" },
                      { step: "4", title: "Verify Connection", desc: "Ensure internet connection for online validation" },
                      { step: "5", title: "Complete Activation", desc: "Click 'Activate' and wait for confirmation" }
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
                  <div className="space-y-6">
                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">Common Issues</h3>
                      <ul className="space-y-2 text-red-800">
                        <li>• "Invalid license key" error message</li>
                        <li>• "License already in use" notification</li>
                        <li>• Network connection timeout</li>
                        <li>• Expired or inactive license</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Solutions</h3>
                      <ul className="space-y-2 text-green-800">
                        <li>• Double-check key format and characters</li>
                        <li>• Contact support to transfer license</li>
                        <li>• Verify stable internet connection</li>
                        <li>• Check license expiration date</li>
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

export default KeyActivationPage;