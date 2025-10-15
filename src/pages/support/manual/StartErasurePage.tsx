import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const StartErasurePage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Erasure Operation Setup | D-Secure</title>
        <meta name="description" content="Configure erasure parameters, select methods, and initiate secure data destruction." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal>
              <Link to="/support/manual/user-interface" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to User Interface Guide
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Erasure Operation <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Setup</span>
              </h1>
              <p className="text-xl text-slate-700 max-w-3xl">Configure erasure parameters, select methods, and initiate secure data destruction</p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <Reveal>
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Setup Steps</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
                    <h3 className="font-bold text-emerald-900 mb-3 flex items-center">
                      <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                      Select Target Device
                    </h3>
                    <p className="text-slate-700 ml-11">Choose the storage device for erasure from the device list</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200">
                    <h3 className="font-bold text-teal-900 mb-3 flex items-center">
                      <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                      Choose Erasure Method
                    </h3>
                    <p className="text-slate-700 ml-11">Select from DoD 5220.22-M, NIST 800-88, or custom patterns</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 p-6 rounded-lg border border-cyan-200">
                    <h3 className="font-bold text-cyan-900 mb-3 flex items-center">
                      <span className="bg-cyan-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
                      Configure Verification
                    </h3>
                    <p className="text-slate-700 ml-11">Enable post-erasure verification and certificate generation</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200">
                    <h3 className="font-bold text-emerald-900 mb-3 flex items-center">
                      <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">4</span>
                      Start Operation
                    </h3>
                    <p className="text-slate-700 ml-11">Review settings and initiate secure data destruction</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                  <p className="text-yellow-900 font-semibold">⚠️ Warning: Data erasure is permanent and irreversible</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default StartErasurePage;
