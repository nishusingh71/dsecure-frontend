import React from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import Reveal from "@/components/Reveal";

const FileEraserGuide: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('file-eraser-guide')} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    File Eraser Guide
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  Secure File & Folder Deletion for Individual Privacy Protection
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Guide Content */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Why File Erasing Matters */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Why File Erasing Matters</h2>
                  </div>
                  <div className="space-y-4 text-slate-700 text-lg leading-relaxed">
                    <p>
                      When you delete a file normally using "Delete" or moving to Recycle Bin, the file isn't actually removed from your storage device. 
                      Instead, the operating system simply marks the space as available for new data, but the original content remains intact and recoverable.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 p-4 rounded-xl">
                        <h3 className="text-xl font-bold text-red-900 mb-3 flex items-center">
                          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Normal Delete Risks
                        </h3>
                        <ul className="text-red-700 space-y-2 text-sm">
                          <li>• Files remain recoverable with forensic tools</li>
                          <li>• Personal data can be retrieved by others</li>
                          <li>• Sensitive documents remain on drive</li>
                          <li>• Privacy and security vulnerabilities</li>
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-4 rounded-xl">
                        <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center">
                          <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Secure Erase Benefits
                        </h3>
                        <ul className="text-emerald-700 space-y-2 text-sm">
                          <li>• Files are permanently unrecoverable</li>
                          <li>• Complete privacy protection</li>
                          <li>• Compliance with data protection laws</li>
                          <li>• Peace of mind for sensitive data</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* DSecure File Eraser Features */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      DSecure File Eraser Features
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl">
                      <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-emerald-900 mb-2">Multiple Erasure Methods</h3>
                      <p className="text-emerald-700 text-sm">Choose from 1-pass, 3-pass, 7-pass, or custom patterns based on security needs.</p>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl">
                      <div className="w-10 h-10 bg-teal-500 text-white rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-teal-900 mb-2">Batch Processing</h3>
                      <p className="text-teal-700 text-sm">Select multiple files and folders for simultaneous secure deletion.</p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl">
                      <div className="w-10 h-10 bg-cyan-500 text-white rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-cyan-900 mb-2">Verification Reports</h3>
                      <p className="text-cyan-700 text-sm">Get detailed reports confirming successful and complete file erasure.</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                      <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-purple-900 mb-2">Free Space Wiping</h3>
                      <p className="text-purple-700 text-sm">Erase previously deleted files from unallocated disk space.</p>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-500 text-white rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-indigo-900 mb-2">Advanced Settings</h3>
                      <p className="text-indigo-700 text-sm">Customize patterns, passes, and verification levels for specific requirements.</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
                      <div className="w-10 h-10 bg-pink-500 text-white rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-pink-900 mb-2">Context Menu Integration</h3>
                      <p className="text-pink-700 text-sm">Right-click any file or folder to access secure delete options directly.</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* How to Use File Eraser */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      How to Use DSecure File Eraser
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Launch DSecure File Eraser",
                        content: "Open the DSecure File Eraser application from your desktop or start menu. The intuitive interface will display your file system for easy navigation."
                      },
                      {
                        step: 2,
                        title: "Select Files or Folders",
                        content: "Browse to locate the files or folders you want to securely delete. You can select individual files, multiple files, or entire folders. Use Ctrl+Click for multiple selections."
                      },
                      {
                        step: 3,
                        title: "Choose Erasure Method",
                        content: "Select your preferred erasure method from the dropdown menu. Options include 1-pass (fast), 3-pass (standard), 7-pass (high security), or custom patterns."
                      },
                      {
                        step: 4,
                        title: "Configure Settings",
                        content: "Optionally adjust advanced settings such as verification level, overwrite patterns, and reporting preferences based on your security requirements."
                      },
                      {
                        step: 5,
                        title: "Start Secure Deletion",
                        content: "Click 'Secure Delete' to begin the erasure process. A progress bar will show the status of the operation for each selected item."
                      },
                      {
                        step: 6,
                        title: "Review Results",
                        content: "Once complete, review the detailed report showing which files were successfully erased and any verification results."
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-xl hover:from-emerald-50 transition-all duration-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-slate-700">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Use Cases */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Common Use Cases
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Personal Privacy</h3>
                        <p className="text-slate-700 mb-2">Securely delete personal documents, photos, videos, and browsing data before selling or disposing of devices.</p>
                        <ul className="text-slate-600 text-sm space-y-1">
                          <li>• Tax documents and financial records</li>
                          <li>• Personal photos and videos</li>
                          <li>• Browser cache and cookies</li>
                          <li>• Email archives and contacts</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-teal-500 pl-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Business Compliance</h3>
                        <p className="text-slate-700 mb-2">Meet regulatory requirements for data protection and ensure confidential business information is permanently removed.</p>
                        <ul className="text-slate-600 text-sm space-y-1">
                          <li>• Customer databases and PII</li>
                          <li>• Financial records and reports</li>
                          <li>• Legal documents and contracts</li>
                          <li>• Employee information</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-cyan-500 pl-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Development & Testing</h3>
                        <p className="text-slate-700 mb-2">Remove temporary files, test data, and development artifacts that may contain sensitive information.</p>
                        <ul className="text-slate-600 text-sm space-y-1">
                          <li>• Database dumps and backups</li>
                          <li>• Log files with user data</li>
                          <li>• Test datasets and mock data</li>
                          <li>• Configuration files with credentials</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">System Maintenance</h3>
                        <p className="text-slate-700 mb-2">Clean system caches, temporary files, and recover disk space while ensuring permanent deletion.</p>
                        <ul className="text-slate-600 text-sm space-y-1">
                          <li>• System temporary files</li>
                          <li>• Application caches</li>
                          <li>• Recycle bin contents</li>
                          <li>• Free disk space wiping</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Best Practices */}
              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">Before Deletion</h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Backup important files before secure deletion
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Double-check file selections to avoid accidental deletion
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Close applications that might be using target files
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Choose appropriate erasure method for sensitivity level
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">Security Tips</h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Use 3+ passes for highly sensitive data
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Regularly wipe free disk space to remove file traces
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Keep erasure reports for compliance documentation
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Consider full disk encryption for additional security
                        </li>
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
};

export default FileEraserGuide;
