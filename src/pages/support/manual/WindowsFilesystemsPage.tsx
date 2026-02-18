import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsFilesystemsPage: React.FC = memo(() => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("support-manual-windows-filesystems")} />
      {/* <Helmet>
        <title>Windows File Systems Overview | NTFS, FAT32, exFAT Erasure</title>
        <meta name="description" content="Understanding Windows file systems (NTFS, FAT32, exFAT) and their implications for secure data erasure." />
      </Helmet> 
      */}

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <Link to="/support/manual/windows" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Windows Systems
                </Link>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  Windows File <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Systems</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  NTFS, FAT32, exFAT and their erasure implications
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">NTFS File System</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3">Key Features</h3>
                      <ul className="space-y-2 text-emerald-800">
                        <li>• Journaling: Transaction logging for crash recovery</li>
                        <li>• Security: Access Control Lists (ACLs) and encryption support</li>
                        <li>• Compression: Built-in file and folder compression</li>
                        <li>• Quotas: Disk space usage limits per user</li>
                        <li>• Alternate Data Streams: Hidden data storage within files</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-teal-900 mb-3">Erasure Implications</h3>
                      <ul className="space-y-2 text-teal-800">
                        <li>• Master File Table (MFT) contains file metadata</li>
                        <li>• Journal files record file system changes</li>
                        <li>• Alternate Data Streams can hide sensitive information</li>
                        <li>• File slack space may contain data remnants</li>
                        <li>• Deleted file entries remain in MFT until overwritten</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">FAT32 & exFAT File Systems</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">FAT32 Characteristics</h3>
                      <ul className="space-y-2 text-blue-800">
                        <li>• Simple file allocation table structure</li>
                        <li>• Cross-platform compatibility</li>
                        <li>• 4GB maximum file size limitation</li>
                        <li>• No built-in encryption or access controls</li>
                        <li>• Directory entries store file names and attributes</li>
                      </ul>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">exFAT Features</h3>
                      <ul className="space-y-2 text-cyan-800">
                        <li>• Support for files larger than 4GB</li>
                        <li>• Optimized for flash memory devices</li>
                        <li>• Compatible with Windows, macOS, and Linux</li>
                        <li>• Simplified structure with reduced overhead</li>
                        <li>• Cluster boundary alignment for complete erasure</li>
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

export default React.memo(WindowsFilesystemsPage);