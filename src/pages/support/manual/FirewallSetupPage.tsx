import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const FirewallSetupPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-firewall-setup")} />
      <Helmet>
        <title>Firewall Setup | D-Secure Network Protection Configuration</title>
        <meta name="description" content="Customize network traffic permissions and firewall settings for optimal D-Secure protection." />
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
                  Firewall <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Setup</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Customize network traffic permissions and settings
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Firewall Protection Levels</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-green-50 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Basic</h3>
                      <p className="text-sm text-slate-700 mb-3">Standard protection for home users</p>
                      <div className="text-xs text-green-600 font-medium">Recommended</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Advanced</h3>
                      <p className="text-sm text-slate-700 mb-3">Enhanced security with custom rules</p>
                      <div className="text-xs text-orange-600 font-medium">Power Users</div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-6 text-center">
                      <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">Maximum</h3>
                      <p className="text-sm text-slate-700 mb-3">Strictest security for sensitive data</p>
                      <div className="text-xs text-red-600 font-medium">Enterprise</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Configuration Steps</h2>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Access Firewall Settings", desc: "Navigate to Settings > Network Protection > Firewall" },
                      { step: "2", title: "Choose Protection Level", desc: "Select Basic, Advanced, or Maximum security level" },
                      { step: "3", title: "Configure Application Rules", desc: "Set permissions for specific applications" },
                      { step: "4", title: "Network Zone Settings", desc: "Define trusted networks (home, work, public)" },
                      { step: "5", title: "Port Configuration", desc: "Open or block specific ports as needed" },
                      { step: "6", title: "Apply and Test", desc: "Save settings and verify network connectivity" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Application Permissions</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Allowed by Default</h3>
                      <ul className="space-y-2 text-green-800 text-sm">
                        <li>• Web browsers (Chrome, Firefox, Edge)</li>
                        <li>• Email clients (Outlook, Thunderbird)</li>
                        <li>• System updates and antivirus</li>
                        <li>• Trusted Windows services</li>
                        <li>• Popular communication apps</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-3">Requires Permission</h3>
                      <ul className="space-y-2 text-red-800 text-sm">
                        <li>• Unknown or unsigned applications</li>
                        <li>• P2P and file sharing software</li>
                        <li>• Remote access tools</li>
                        <li>• Gaming and streaming apps</li>
                        <li>• Development and server tools</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Network Zones</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Trusted Networks</h3>
                      <p className="text-blue-800 mb-3">Networks you trust completely (home, office)</p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• File and printer sharing enabled</li>
                        <li>• Network discovery allowed</li>
                        <li>• Reduced security restrictions</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-yellow-900 mb-3">Public Networks</h3>
                      <p className="text-yellow-800 mb-3">Unknown networks (coffee shops, airports)</p>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Maximum security enabled</li>
                        <li>• Network discovery disabled</li>
                        <li>• Strict application filtering</li>
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

export default FirewallSetupPage;