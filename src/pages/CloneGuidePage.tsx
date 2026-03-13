import React, { memo } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import {
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/FlatIcons";
import {
  LifeBuoy,
  Terminal,
  Settings,
  AlertTriangle,
  FileSearch,
} from "lucide-react";

/**
 * CloneGuidePage component
 * This page provides a detailed guide on how to recover and clone hard drives.
 * The theme is matched with the Hard Drive Monitor page (Emerald/Teal gradients).
 */
const CloneGuidePage: React.FC = memo(function CloneGuidePage() {
  return (
    <>
      <SEOHead
        seo={{
          title: "How to Recover & Clone Your Hard Drive | D-Secure Guide",
          description: "Step-by-step guide to recovering files from corrupt drives and cloning hard drives for ultimate data safety.",
          keywords: "hard drive recovery, disk cloning, time machine recovery, disk utility mac, terminal disk repair",
          canonicalUrl: "/resources/clone-guide",
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header section */}
            <Reveal>
              <div className="text-center mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                  <LifeBuoy className="w-4 h-4" />
                  Technical Guide
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  How to Recover Files from <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Corrupt Hard Drives
                  </span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Disk corruption can happen due to improper ejection, power failure, or bad sectors. 
                  Follow this guide to safely recover your data and secure it through cloning.
                </p>
              </div>
            </Reveal>

            {/* Quick Fixes Section */}
            <Reveal delayMs={100}>
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-emerald-50 mb-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Settings className="w-6 h-6 text-emerald-500" />
                  Quick Hardware Fixes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Hardware Check", desc: "Try connecting your drive to a different USB port or use a new cable." },
                    { title: "Alternative Device", desc: "Test the drive on another system to see if it mounts correctly." },
                    { title: "System Restart", desc: "A simple reboot can often resolve minor mounting and recognition issues." }
                  ].map((item, i) => (
                    <div key={i} className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                      <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Methods Section */}
            <div className="space-y-12">
              {/* Method 1: Disk Utility */}
              <Reveal delayMs={200}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center font-bold">01</div>
                    Use Disk Utility (First Aid)
                  </h3>
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-emerald-50">
                    <ol className="space-y-4">
                      {[
                        "Connect your hard drive to your system.",
                        "Open **Disk Utility** from your Applications or Utilities folder.",
                        "Select the corrupted drive from the sidebar.",
                        "Click the **First Aid** tab and then click **Run**.",
                        "Wait for the process to repair the volume's directory structure."
                      ].map((step, i) => (
                        <li key={i} className="flex gap-4 text-slate-700">
                          <CheckIcon className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                          <span dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </Reveal>

              {/* Method 2: Terminal */}
              <Reveal delayMs={300}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-500 text-white rounded-xl flex items-center justify-center font-bold">02</div>
                    Use Command Line (Terminal)
                  </h3>
                  <div className="bg-slate-900 text-emerald-400 rounded-3xl p-8 shadow-2xl font-mono text-sm">
                    <p className="mb-4 text-slate-400 font-sans italic">// List and repair volumes</p>
                    <p className="mb-2">$ cd /Volumes</p>
                    <p className="mb-2">$ ls <span className="text-slate-500">// Identify your drive name</span></p>
                    <p>$ diskutil repairvolume /Volumes/[Drive Name]</p>
                  </div>
                  <p className="text-slate-600 text-sm px-4">
                    Replace <code className="bg-slate-100 px-1.5 py-0.5 rounded text-emerald-600">[Drive Name]</code> with the actual label of your disk.
                  </p>
                </div>
              </Reveal>

              {/* Method 3: fsck */}
              <Reveal delayMs={400}>
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-500 text-white rounded-xl flex items-center justify-center font-bold">03</div>
                    Run File System Check (FSCK)
                  </h3>
                  <div className="bg-white rounded-3xl p-8 shadow-lg border border-emerald-50 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Terminal className="w-20 h-20" />
                    </div>
                    <ul className="space-y-4 relative z-10">
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-slate-700">Restart your system and enter **Single User Mode**.</p>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-slate-700">Type <code className="bg-slate-100 px-2 py-0.5 rounded text-emerald-600">/sbin/fsck -fy</code> and hit Enter.</p>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-slate-700">If the system says "File system was modified", repeat the command until it says "The volume appears to be OK".</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Final Solution Section */}
            <Reveal delayMs={500}>
              <div className="mt-20 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-10 lg:p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px]"></div>
                <div className="relative z-10 space-y-8">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                    <FileSearch className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold">Protect Your Data with D-Secure</h2>
                  <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    If software repairs fail, your hardware might be failing. 
                    Use our **Hard Drive Monitor** to create a sector-by-sector clone immediately 
                    to save your critical data before permanent loss occurs.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
                    <Link 
                      to="/pricing-and-plan?product=smart-diagnostic" 
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/40"
                    >
                      Buy Smart Diagnostic
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                    <Link 
                      to="/products/hard-drive-monitor" 
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      Back to Monitor
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Warning Message */}
            <Reveal delayMs={600}>
              <div className="mt-12 flex gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-900 mb-1">Important Safety Tip</h4>
                  <p className="text-sm text-amber-700 leading-relaxed">
                    Hamesha yaad rakhein ki corrupted drive se data recover karte waqt us drive par naya data na likhein. 
                    Writing new data can overwrite your lost files, making them unrecoverable.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </>
  );
});

export default CloneGuidePage;
