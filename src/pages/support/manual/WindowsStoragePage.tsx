import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WindowsStoragePage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>Windows Storage Architecture | D-Secure Manual</title>
        <meta name="description" content="Understanding Windows storage architecture for effective D-Secure data erasure." />
      </Helmet>

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
                  Windows Storage <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Architecture</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  HDD, SSD, hybrid drives and file systems overview for D-Secure erasure
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
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Storage Types</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3">HDDs</h3>
                      <ul className="space-y-2 text-emerald-800 text-sm">
                        <li>• Magnetic storage</li>
                        <li>• Sequential overwrite works</li>
                        <li>• Multiple pass erasure effective</li>
                        <li>• SATA/IDE interfaces</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-teal-900 mb-3">SSDs</h3>
                      <ul className="space-y-2 text-teal-800 text-sm">
                        <li>• NAND flash memory</li>
                        <li>• Wear-leveling algorithms</li>
                        <li>• ATA Secure Erase required</li>
                        <li>• TRIM command support</li>
                      </ul>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3">Hybrid</h3>
                      <ul className="space-y-2 text-cyan-800 text-sm">
                        <li>• HDD + SSD cache</li>
                        <li>• Dual erasure methods</li>
                        <li>• Cache identification critical</li>
                        <li>• Intel Optane support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">File Systems</h2>
                  <div className="space-y-4">
                    {[
                      { name: "NTFS", desc: "Primary Windows file system with journaling and encryption support", erasure: "Cipher command effective" },
                      { name: "FAT32", desc: "Legacy file system for compatibility and removable media", erasure: "Standard overwrite methods work" },
                      { name: "exFAT", desc: "Extended FAT for large files and cross-platform compatibility", erasure: "Similar to FAT32 approach" },
                      { name: "ReFS", desc: "Resilient File System for Windows Server environments", erasure: "Advanced metadata handling required" }
                    ].map((fs, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{fs.name}</h3>
                          <p className="text-slate-600 text-sm">{fs.desc}</p>
                          <p className="text-emerald-600 text-xs font-medium mt-1">D-Secure: {fs.erasure}</p>
                        </div>
                      </div>
                    ))}
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

export default WindowsStoragePage;