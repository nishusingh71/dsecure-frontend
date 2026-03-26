import React from "react";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import { EarlyAccessForm } from "@/components/forms/EarlyAccessForm";
import { Shield, Zap, CheckCircle2 } from "lucide-react";

const EarlyAccessPage: React.FC = () => {
  return (
    <>
      <SEOHead seo={getSEOForPage("contact")} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50/30">
        {/* Simple & Clean Hero matching ContactPage */}
        <section className="pt-20 pb-12">
          <div className="container-app">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-black">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Exclusive Access
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
                  Be the First to Experience <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Next-Gen Data Security
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                  D-Secure is innovating faster than ever. Get early access to our upcoming enterprise tools and help shape the future of IT asset management.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Form and Why Section */}
        <section className="pb-24">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Features/Values */}
              <div className="lg:col-span-4 space-y-10 lg:pt-12">
                <Reveal delayMs={200}>
                  <div className="space-y-8">
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-sm border border-emerald-200">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 mb-1">Impact Roadmap</h3>
                        <p className="text-slate-600 font-medium text-sm leading-relaxed">Early users get a direct line to our engineers to request features and suggest improvements.</p>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-200">
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 mb-1">Pre-Launch Beta</h3>
                        <p className="text-slate-600 font-medium text-sm leading-relaxed">Test our newest software components in your environment before they go mainstream.</p>
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-sm border border-indigo-200">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900 mb-1">VIP Onboarding</h3>
                        <p className="text-slate-600 font-medium text-sm leading-relaxed">Dedicated implementation support to ensure our upcoming tools fit perfectly into your workflow.</p>
                      </div>
                    </div>
                  </div>

                </Reveal>
              </div>

              {/* The Form */}
              <div className="lg:col-span-8">
                <Reveal delayMs={400}>
                  <EarlyAccessForm isModal={false} showHeader={false} />
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EarlyAccessPage;
