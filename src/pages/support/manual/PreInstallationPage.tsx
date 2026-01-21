import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const PreInstallationPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-pre-installation")} />
      <Helmet>
        <title>Pre-Installation Checklist | D-Secure System Requirements</title>
        <meta name="description" content="System requirements and preparation steps before installing D-Secure data erasure software." />
      </Helmet>

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
                  Pre-Installation <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Checklist</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  System requirements and preparation steps before installation
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">System Requirements</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3">Minimum Requirements</h3>
                      <ul className="space-y-2 text-emerald-800">
                        <li>• Windows 10/11 (64-bit)</li>
                        <li>• 4GB RAM</li>
                        <li>• 2GB free disk space</li>
                        <li>• Administrator privileges</li>
                        <li>• Internet connection for activation</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-teal-900 mb-3">Recommended</h3>
                      <ul className="space-y-2 text-teal-800">
                        <li>• Windows 11 (latest version)</li>
                        <li>• 8GB+ RAM</li>
                        <li>• 5GB+ free disk space</li>
                        <li>• SSD storage</li>
                        <li>• Stable broadband connection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Pre-Installation Steps</h2>
                  <div className="space-y-4">
                    {[
                      { 
                        step: "1", 
                        title: "Close all applications", 
                        desc: "Ensure no programs are running that might interfere with installation",
                        details: "Close browsers, media players, office applications, and any background software. Check system tray for running applications."
                      },
                      { 
                        step: "2", 
                        title: "Disable antivirus temporarily", 
                        desc: "Prevent false positives during installation process",
                        details: "Temporarily disable Windows Defender or third-party antivirus. Remember to re-enable after installation."
                      },
                      { 
                        step: "3", 
                        title: "Check disk space", 
                        desc: "Verify sufficient free space on system drive",
                        details: "Ensure at least 5GB free space on C: drive. Use Disk Cleanup to free space if needed."
                      },
                      { 
                        step: "4", 
                        title: "Backup important data", 
                        desc: "Create system backup before installing security software",
                        details: "Use Windows Backup or create system restore point. Store backup on external drive or cloud storage."
                      },
                      { 
                        step: "5", 
                        title: "Check internet connection", 
                        desc: "Ensure stable broadband connection for activation",
                        details: "Test connection speed and stability. D-Secure requires internet for license validation and updates."
                      },
                      { 
                        step: "6", 
                        title: "Prepare activation key", 
                        desc: "Locate your 25-digit D-Secure license key",
                        details: "Find key in purchase email or product packaging. Keep it accessible during installation process."
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                          <p className="text-slate-700 text-sm mb-2">{item.desc}</p>
                          <p className="text-slate-500 text-xs">{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Installation Environment</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-4">Optimal Conditions</h3>
                      <ul className="space-y-3 text-emerald-800">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Clean system with recent updates</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Stable power supply (UPS recommended)</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>No pending system restarts</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Administrator account access</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-orange-900 mb-4">Potential Issues</h3>
                      <ul className="space-y-3 text-orange-800">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>Conflicting security software</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>Insufficient disk space</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>Network connectivity problems</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span>Outdated system drivers</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Compatibility Check</h2>
                  <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">System Compatibility Tool</h3>
                    <p className="text-slate-700 mb-4">
                      D-Secure includes a built-in compatibility checker that automatically verifies your system meets all requirements.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-cyan-900 mb-2">Automatic Checks</h4>
                        <ul className="text-sm text-cyan-800 space-y-1">
                          <li>• Operating system version and architecture</li>
                          <li>• Available RAM and disk space</li>
                          <li>• Network connectivity and firewall settings</li>
                          <li>• Conflicting software detection</li>
                          <li>• Hardware compatibility verification</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-emerald-900 mb-2">Resolution Guidance</h4>
                        <ul className="text-sm text-emerald-800 space-y-1">
                          <li>• Step-by-step fix instructions</li>
                          <li>• Alternative configuration options</li>
                          <li>• Contact support for complex issues</li>
                          <li>• Compatibility mode recommendations</li>
                          <li>• Hardware upgrade suggestions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Enterprise Considerations</h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Domain Environments</h3>
                      <p className="text-blue-800 mb-3">
                        Additional considerations for Active Directory and domain-joined systems.
                      </p>
                      <ul className="text-sm text-blue-700 space-y-2">
                        <li>• Group Policy compatibility verification</li>
                        <li>• Domain administrator permissions required</li>
                        <li>• Network security policy compliance</li>
                        <li>• Centralized deployment preparation</li>
                        <li>• License server configuration</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">Virtualized Environments</h3>
                      <p className="text-purple-800 mb-3">
                        Special requirements for VMware, Hyper-V, and other virtualization platforms.
                      </p>
                      <ul className="text-sm text-purple-700 space-y-2">
                        <li>• Virtual machine tools compatibility</li>
                        <li>• Hypervisor-specific optimizations</li>
                        <li>• Resource allocation recommendations</li>
                        <li>• Snapshot and backup considerations</li>
                        <li>• Performance monitoring setup</li>
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

export default PreInstallationPage;