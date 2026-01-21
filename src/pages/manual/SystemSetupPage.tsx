import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import React from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const SystemSetupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("system-setup")} />
      <Helmet>
        <title>D-Secure System Setup & Configuration - Visual Guide</title>
        <meta 
          name="description" 
          content="Complete system configuration guide for D-Secure with visual examples for disk access, user interface, and settings."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-800 to-blue-900 py-20">
        <div className="container-responsive">
          <Reveal>
            <div className="text-center text-white">
              <div className="inline-flex items-center bg-blue-400 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                ⚙️ System Configuration
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                System Setup & Configuration
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Complete configuration guide with visual examples for disk access permissions and user interface setup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/support/manual/installation-guide"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  ← Previous: Installation
                </Link>
                <Link
                  to="/support/help-manual"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Back to Manual
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-responsive">
          
          {/* Setup Overview */}
          <Reveal>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Configuration Overview</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  To completely allow the software to scan and recover your lost data, you are required to assign <strong>Full Disk Access</strong> permissions.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Disk Access</h3>
                  <p className="text-slate-600 text-sm">Grant full disk access permissions for complete functionality</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Interface Setup</h3>
                  <p className="text-slate-600 text-sm">Configure user interface and application preferences</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Verification</h3>
                  <p className="text-slate-600 text-sm">Verify all settings and test functionality</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Setup Steps */}
          <div className="space-y-12">
            
            {/* Step 1: Full Disk Access for macOS Ventura+ */}
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-blue-600">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Full Disk Access (macOS 13 Ventura+)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                    <p className="text-amber-800">
                      <strong>For macOS 15 Sequoia, macOS 14 Sonoma and macOS 13 Ventura users:</strong>
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Step 1: Open Full Disk Access Settings</h3>
                      <p className="text-slate-600 mb-4">
                        Click <strong>Open Full Disk Access</strong> button from the D-Secure interface.
                      </p>
                      <div className="space-y-2">
                        <p className="text-slate-700 font-medium">What you'll see:</p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>D-Secure main window with access prompt</li>
                          <li>"Open Full Disk Access" button highlighted</li>
                          <li>System settings will open automatically</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
                        <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <h4 className="font-bold text-slate-900">Full Disk Access</h4>
                          <p className="text-slate-500 text-sm">To access your data, you need to assign full disk access</p>
                        </div>
                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium">
                          Open Full Disk Access
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Step 2: System Settings Window</h3>
                      <p className="text-slate-600 mb-4">
                        <strong>Full Disk Access</strong> window is displayed. Enable access for D-Secure application.
                      </p>
                      <div className="space-y-2">
                        <p className="text-slate-700 font-medium">Actions required:</p>
                        <ol className="list-decimal list-inside text-slate-600 space-y-1">
                          <li>Locate D-Secure in the application list</li>
                          <li>Click the toggle switch to enable access</li>
                          <li>Enter administrator credentials if prompted</li>
                          <li>Confirm the permission change</li>
                        </ol>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl p-6 border-2 border-slate-300">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-slate-900 text-sm">Full Disk Access</h4>
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-slate-50 rounded">
                            <span className="text-slate-700 text-sm">DSecure File Eraser</span>
                            <div className="w-8 h-4 bg-emerald-500 rounded-full flex items-center justify-end pr-1">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-500 text-xs mt-2">Allow apps to access all files and folders</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Step 2: Full Disk Access for older macOS */}
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-purple-600">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Full Disk Access (macOS 12 Monterey & Earlier)</h2>
                </div>
                
                <div className="mb-6">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <p className="text-blue-800">
                      <strong>For macOS 12 Monterey, macOS 11 Big Sur and earlier versions:</strong>
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Navigate to Security & Privacy</h3>
                      <p className="text-slate-600 mb-4">
                        Open System Preferences and go to <strong>Security & Privacy</strong> &gt; <strong>Privacy</strong> tab.
                      </p>
                      <div className="space-y-2">
                        <p className="text-slate-700 font-medium">Navigation steps:</p>
                        <ol className="list-decimal list-inside text-slate-600 space-y-1">
                          <li>Click Apple menu → System Preferences</li>
                          <li>Select Security & Privacy</li>
                          <li>Click Privacy tab</li>
                          <li>Scroll to Full Disk Access</li>
                        </ol>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center mb-3">
                          <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mr-2">
                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                            </svg>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">Security & Privacy</h4>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-600">General</span>
                            <span className="text-slate-400">Privacy</span>
                          </div>
                          <div className="h-px bg-slate-200"></div>
                          <div className="text-slate-700 font-medium">Full Disk Access</div>
                          <div className="text-slate-500">Allow apps to access files</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3">Enable DSecure Access</h3>
                      <p className="text-slate-600 mb-4">
                        From the bottom, click the 🔒 lock icon and enter your <strong>administrator password</strong>.
                      </p>
                      <div className="space-y-2">
                        <p className="text-slate-700 font-medium">Final steps:</p>
                        <ol className="list-decimal list-inside text-slate-600 space-y-1">
                          <li>Click the lock to make changes</li>
                          <li>Enter admin password</li>
                          <li>Select Full Disk Access → D-Secure File Eraser</li>
                          <li>Enable the checkbox</li>
                        </ol>
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-6">
                      <div className="bg-white rounded-lg shadow-md p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-slate-900 text-sm">Full Disk Access</h4>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-slate-500">🔒</span>
                            <span className="text-xs text-slate-500">Click lock to make changes</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" checked className="rounded" />
                            <span className="text-slate-700 text-sm">DSecure File Eraser</span>
                          </div>
                        </div>
                        <p className="text-slate-500 text-xs mt-2">Apps have access to all data</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Step 3: Verification */}
            <Reveal>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-emerald-600">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Verify Access & Launch Application</h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-slate-600 mb-4">
                      A dialog box appears on the screen with a message: <strong>"D-SecureFileEraser will not have full disk access until it is quit"</strong>. 
                      Click <strong>Quit & Reopen</strong>.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded">
                        <p className="text-emerald-800">
                          <strong>Success!</strong> D-Secure now has full system access and is ready to use.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-700 font-medium">Next Steps:</p>
                        <ul className="list-disc list-inside text-slate-600 space-y-1">
                          <li>Application will restart automatically</li>
                          <li>All features are now available</li>
                          <li>Begin your first erasure operation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.764 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Access Notification</h4>
                      <p className="text-slate-600 text-sm mb-4">
                        D-Secure will not have full disk access until it is quit
                      </p>
                      <div className="space-y-2">
                        <button className="w-full bg-emerald-500 text-white py-2 rounded font-medium">
                          Quit & Reopen
                        </button>
                        <button className="w-full bg-slate-200 text-slate-600 py-2 rounded">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Setup Complete */}
          <Reveal>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-xl mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Configuration Complete!</h3>
                <p className="text-blue-100 mb-6">
                  D-Secure is now fully configured and ready for secure data erasure operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/support/manual/user-interface"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    Next: User Interface Guide →
                  </Link>
                  <Link
                    to="/support/help-manual"
                    className="bg-blue-400 hover:bg-blue-300 text-blue-900 font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Back to Manual
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
};

export default SystemSetupPage;