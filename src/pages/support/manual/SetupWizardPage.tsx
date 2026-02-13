import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const SetupWizardPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Setup Wizard | D-Secure Installation Process</title>
        <meta name="description" content="Execute D-Secure installer and follow on-screen instructions for complete setup and configuration." />
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
                  Setup <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Wizard</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Execute installer and follow on-screen instructions
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Detailed Installation Process</h2>
                  <div className="space-y-6">
                    {[
                      { 
                        step: "1", 
                        title: "Launch Installer", 
                        desc: "Double-click DSSecure_Setup.exe to start the installation wizard",
                        details: "Right-click and select 'Run as administrator' for proper permissions. If Windows SmartScreen appears, click 'More info' then 'Run anyway'.",
                        time: "30 seconds",
                        tips: ["Ensure no other installations are running", "Close unnecessary applications", "Check available disk space"]
                      },
                      { 
                        step: "2", 
                        title: "Welcome Screen", 
                        desc: "Review installation overview and click 'Next' to continue",
                        details: "The wizard displays D-Secure version, system requirements check, and installation overview.",
                        time: "1 minute",
                        tips: ["Read system requirements carefully", "Note installation size and location", "Check language settings"]
                      },
                      { 
                        step: "3", 
                        title: "License Agreement", 
                        desc: "Read and accept the End-User License Agreement",
                        details: "Scroll through the complete EULA and select 'I accept the terms' to proceed with installation.",
                        time: "2-3 minutes",
                        tips: ["Review privacy policy sections", "Understand data collection terms", "Note support and warranty information"]
                      },
                      { 
                        step: "4", 
                        title: "Installation Type", 
                        desc: "Choose between Standard or Custom installation",
                        details: "Standard installs all components with default settings. Custom allows component selection and advanced options.",
                        time: "1 minute",
                        tips: ["Standard recommended for most users", "Custom for advanced configurations", "Review component descriptions"]
                      },
                      { 
                        step: "5", 
                        title: "Installation Path", 
                        desc: "Select destination folder for D-Secure files",
                        details: "Default location is C:\\Program Files\\D-Secure. Ensure selected drive has sufficient space.",
                        time: "30 seconds",
                        tips: ["Use SSD for better performance", "Avoid network drives", "Ensure write permissions"]
                      },
                      { 
                        step: "6", 
                        title: "Component Selection", 
                        desc: "Choose specific features to install (Custom only)",
                        details: "Select core engine, GUI interface, command-line tools, and reporting modules based on your needs.",
                        time: "2 minutes",
                        tips: ["Core engine is always required", "CLI tools for automation", "Reporting for compliance"]
                      },
                      { 
                        step: "7", 
                        title: "Install Components", 
                        desc: "Wait for files to be copied and configured",
                        details: "Progress bar shows file extraction, registry updates, and service installation. Do not interrupt this process.",
                        time: "3-5 minutes",
                        tips: ["Keep system powered on", "Maintain internet connection", "Don't run other installers"]
                      },
                      { 
                        step: "8", 
                        title: "Configuration", 
                        desc: "System integration and service setup",
                        details: "Windows services are registered, firewall exceptions created, and system integration completed.",
                        time: "1-2 minutes",
                        tips: ["Allow firewall exceptions", "Grant service permissions", "Wait for completion"]
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg p-6 hover:shadow-md transition-all">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-slate-900">{item.title}</h3>
                              <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded">{item.time}</span>
                            </div>
                            <p className="text-slate-700 text-sm mb-3">{item.desc}</p>
                            <p className="text-slate-600 text-xs mb-4">{item.details}</p>
                            <div className="bg-white rounded-lg p-3">
                              <h4 className="text-xs font-medium text-slate-900 mb-2">Pro Tips:</h4>
                              <ul className="text-xs text-slate-600 space-y-1">
                                {item.tips.map((tip, tipIndex) => (
                                  <li key={tipIndex} className="flex items-start">
                                    <span className="text-emerald-500 mr-1">•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Installation Options</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">Standard Installation</h3>
                      <ul className="space-y-2 text-green-800 text-sm">
                        <li>• All core components included</li>
                        <li>• Default settings applied</li>
                        <li>• Automatic updates enabled</li>
                        <li>• Desktop shortcuts created</li>
                        <li>• Recommended for most users</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Custom Installation</h3>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• Choose specific components</li>
                        <li>• Custom installation directory</li>
                        <li>• Advanced configuration options</li>
                        <li>• Manual update settings</li>
                        <li>• For experienced users</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Installation Completion</h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-4">Success Indicators</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center text-emerald-800">
                            <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            D-Secure successfully installed
                          </div>
                          <div className="flex items-center text-emerald-800">
                            <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Desktop shortcut created
                          </div>
                          <div className="flex items-center text-emerald-800">
                            <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Start menu entry added
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center text-emerald-800">
                            <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            System services running
                          </div>
                          <div className="flex items-center text-emerald-800">
                            <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Firewall exceptions configured
                          </div>
                          <div className="flex items-center text-emerald-800">
                            <svg className="w-5 h-5 text-emerald-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Ready for activation
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-cyan-900 mb-4">Next Steps Checklist</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                          <div>
                            <h4 className="font-medium text-cyan-900">Launch D-Secure Application</h4>
                            <p className="text-sm text-cyan-800">Double-click desktop shortcut or find in Start menu under 'D-Secure'</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                          <div>
                            <h4 className="font-medium text-cyan-900">Enter Activation Key</h4>
                            <p className="text-sm text-cyan-800">Input your 25-digit license key when prompted (format: XXXXX-XXXXX-XXXXX-XXXXX-XXXXX)</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                          <div>
                            <h4 className="font-medium text-cyan-900">Complete Initial Setup</h4>
                            <p className="text-sm text-cyan-800">Configure user profile, firewall settings, and scan preferences</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                          <div>
                            <h4 className="font-medium text-cyan-900">Run First System Scan</h4>
                            <p className="text-sm text-cyan-800">Perform full system scan to establish security baseline and detect existing threats</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">5</div>
                          <div>
                            <h4 className="font-medium text-cyan-900">Enable Real-time Protection</h4>
                            <p className="text-sm text-cyan-800">Activate continuous monitoring and automatic threat detection</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                      <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Reminders</h3>
                      <ul className="space-y-2 text-yellow-800 text-sm">
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Re-enable any antivirus software that was temporarily disabled
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Restart your computer if prompted to complete installation
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Keep your activation key secure for future reference
                        </li>
                        <li className="flex items-start">
                          <svg className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Register for automatic updates to stay protected against new threats
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Troubleshooting Installation Issues</h2>
                  <div className="space-y-6">
                    <div className="bg-red-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 mb-4">Common Installation Problems</h3>
                      <div className="space-y-4">
                        <div className="border-l-4 border-red-400 pl-4">
                          <h4 className="font-medium text-red-900">Installation Hangs or Freezes</h4>
                          <p className="text-sm text-red-800 mt-1">Close all applications, disable antivirus temporarily, and run installer as administrator</p>
                        </div>
                        <div className="border-l-4 border-red-400 pl-4">
                          <h4 className="font-medium text-red-900">Insufficient Privileges Error</h4>
                          <p className="text-sm text-red-800 mt-1">Right-click installer and select 'Run as administrator' or login with admin account</p>
                        </div>
                        <div className="border-l-4 border-red-400 pl-4">
                          <h4 className="font-medium text-red-900">Disk Space Error</h4>
                          <p className="text-sm text-red-800 mt-1">Free up at least 5GB space using Disk Cleanup or uninstall unused programs</p>
                        </div>
                        <div className="border-l-4 border-red-400 pl-4">
                          <h4 className="font-medium text-red-900">Conflicting Software</h4>
                          <p className="text-sm text-red-800 mt-1">Temporarily disable other security software during installation process</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">Getting Help</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-green-900 mb-2">Self-Service Options</h4>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Check installation logs in %TEMP%\DSSecure</li>
                            <li>• Run Windows System File Checker (sfc /scannow)</li>
                            <li>• Update Windows and device drivers</li>
                            <li>• Try installation in Safe Mode</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-green-900 mb-2">Contact Support</h4>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Email: install-support@D-Securetech.com</li>
                            <li>• Phone: 1-800-D-Secure (24/7)</li>
                            <li>• Live Chat: Available on website</li>
                            <li>• Remote Assistance: Available upon request</li>
                          </ul>
                        </div>
                      </div>
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

export default SetupWizardPage;