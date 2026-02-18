import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, StarIcon, ArrowRightIcon, HoverIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const DataDeletionMythsBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-data-deletion-myths')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full mb-4">
                    Myth Busting
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Data Deletion Myths Debunked</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Common misconceptions about data deletion that leave your organization vulnerable to data breaches and compliance failures.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
             <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-8">
                
                {/* Introduction */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">The Dangerous Myths</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Many organizations believe their data is safely deleted when it's not. These myths create false security and expose companies to regulatory fines, data breaches, and reputational damage.
                    </p>
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                        <strong className="text-red-800 block mb-2">⚠️ The Cost of Myths</strong>
                        <p className="text-sm text-red-700">
                            In 2023, over 60% of reported data breaches from disposed devices occurred because organizations believed data was deleted when it wasn't (Source: Identity Theft Resource Center).
                        </p>
                    </div>
                </div>

                {/* Myth 1: Formatting */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Myth #1: "Formatting a Drive Erases Data"</h2>
                    <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                        <p className="font-bold text-red-900 mb-3 text-lg">❌ MYTH: Quick format or full format permanently deletes files.</p>
                        <div className="bg-white p-4 rounded-lg border border-red-200 mt-3">
                            <p className="font-semibold text-green-900 mb-2">✅ REALITY:</p>
                            <p className="text-sm text-slate-700 mb-2">
                                Formatting only removes file pointers and directory structures. The actual data remains on disk and can be recovered with forensic software.
                            </p>
                            <div className="bg-slate-900 text-slate-100 p-3 rounded font-mono text-xs mt-2">
                                <p className="text-red-400 mb-1">// What formatting does</p>
                                <p>Clears file system metadata (file names, locations)</p>
                                <p>Marks sectors as "available" for new data</p>
                                <p className="text-green-400 mt-2">// What formatting DOESN'T do</p>
                                <p>Overwrite actual data on disk</p>
                                <p>Prevent forensic recovery</p>
                            </div>
                            <p className="text-sm text-slate-600 mt-3">
                                <strong>Recovery Rate:</strong> ~90-95% of data can be recovered after formatting using tools like Recuva, TestDisk, or forensic suites.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Myth 2: Delete Key */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Myth #2: "Pressing Delete Removes Files"</h2>
                    <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                        <p className="font-bold text-orange-900 mb-3 text-lg">❌ MYTH: Emptying the Recycle Bin / Trash permanently deletes files.</p>
                        <div className="bg-white p-4 rounded-lg border border-orange-200 mt-3">
                            <p className="font-semibold text-green-900 mb-2">✅ REALITY:</p>
                            <p className="text-sm text-slate-700 mb-3">
                                The "Delete" key only removes the file reference from the file system. The data itself stays on the storage device until overwritten by new data—which may never happen.
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="bg-red-50 p-3 rounded border border-red-200">
                                    <p className="text-xs font-semibold text-red-900 mb-1">What Users Think Happens</p>
                                    <p className="text-xs text-slate-600">File is wiped from disk → Unrecoverable</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded border border-green-200">
                                    <p className="text-xs font-semibold text-green-900 mb-1">What Actually Happens</p>
                                    <p className="text-xs text-slate-600">Pointer removed → Data remains → Easily recoverable</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Myth 3: Factory Reset */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Myth #3: "Factory Reset is Secure Enough"</h2>
                    <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                        <p className="font-bold text-amber-900 mb-3 text-lg">❌ MYTH: Factory reset on phones/tablets/computers completely erases data.</p>
                        <div className="bg-white p-4 rounded-lg border border-amber-200 mt-3">
                            <p className="font-semibold text-green-900 mb-2">✅ REALITY:</p>
                            <p className="text-sm text-slate-700 mb-3">
                                Factory reset effectiveness depends on device encryption status. Without encryption, factory reset is similar to formatting—data is recoverable.
                            </p>
                            <div className="space-y-2">
                                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg">
                                    <p className="text-sm text-green-900"><strong>✓ iPhone/iPad:</strong> Secure if "Erase All Content" used (cryptographic erasure)</p>
                                </div>
                                <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-lg">
                                    <p className="text-sm text-green-900"><strong>✓ Modern Android (2016+):</strong> Secure if encryption was enabled before reset</p>
                                </div>
                                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                                    <p className="text-sm text-red-900"><strong>✗ Old Android (pre-2016):</strong> Often NOT encrypted by default → Data recoverable</p>
                                </div>
                                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
                                    <p className="text-sm text-red-900"><strong>✗ Windows/macOS:</strong> Factory reset without encryption → Data recoverable</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Myth 4: Physical Damage */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Myth #4: "Physical Damage Destroys Data"</h2>
                    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                        <p className="font-bold text-yellow-900 mb-3 text-lg">❌ MYTH: Smashing a hard drive or drilling holes makes data unrecoverable.</p>
                        <div className="bg-white p-4 rounded-lg border border-yellow-200 mt-3">
                            <p className="font-semibold text-green-900 mb-2">✅ REALITY:</p>
                            <p className="text-sm text-slate-700 mb-3">
                                Unless platters are completely pulverized, data recovery specialists can often retrieve information from damaged drives—especially if only the controller or circuit board was damaged.
                            </p>
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li>• <strong>Hammer damage:</strong> Platters may survive → Data recoverable</li>
                                <li>• <strong>Drilling holes:</strong> Only destroys small portion → Rest of disk readable</li>
                                <li>• <strong>Water/fire damage:</strong> Specialized labs can recover data</li>
                                <li>• <strong>Proper destruction:</strong> Requires industrial shredding or degaussing</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Myth 5: One-Pass Overwrite */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Myth #5: "Overwriting Once is Enough"</h2>
                    <div className="bg-lime-50 border border-lime-200 p-6 rounded-lg">
                        <p className="font-bold text-lime-900 mb-3 text-lg">❌ MYTH: Writing zeros once guarantees data cannot be recovered.</p>
                        <div className="bg-white p-4 rounded-lg border border-lime-200 mt-3">
                            <p className="font-semibold text-green-900 mb-2">✅ REALITY (Nuanced):</p>
                            <p className="text-sm text-slate-700 mb-3">
                                For modern drives (post-2001), single-pass overwrite is generally sufficient for most threats. However, compliance standards and high-security scenarios require multiple passes.
                            </p>
                            <div className="bg-slate-900 text-slate-100 p-3 rounded font-mono text-xs">
                                <p className="mb-2"><strong className="text-blue-400">NIST 800-88:</strong> "For modern media, a single overwrite pass is adequate"</p>
                                <p className="mb-2"><strong className="text-amber-400">DoD 5220.22-M:</strong> Requires 3-7 passes for classified data</p>
                                <p className="text-green-400"><strong>Best Practice:</strong> Use 3-pass minimum for compliance and assurance</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Myth 6: Cloud Deletion */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Myth #6: "Deleting from Cloud Instantly Erases Data"</h2>
                    <div className="bg-cyan-50 border border-cyan-200 p-6 rounded-lg">
                        <p className="font-bold text-cyan-900 mb-3 text-lg">❌ MYTH: Clicking "delete" in Dropbox, Google Drive, or AWS removes data immediately.</p>
                        <div className="bg-white p-4 rounded-lg border border-cyan-200 mt-3">
                            <p className="font-semibold text-green-900 mb-2">✅ REALITY:</p>
                            <p className="text-sm text-slate-700 mb-3">
                                Cloud providers keep deleted data in backups, snapshots, and archives for days, weeks, or months. True deletion requires explicit purge requests.
                            </p>
                            <div className="space-y-2 text-sm text-slate-700">
                                <p>• <strong>Google Drive:</strong> 30-day trash retention + backup snapshots</p>
                                <p>• <strong>AWS S3:</strong> Versioning keeps all file versions indefinitely unless configured</p>
                                <p>• <strong>Azure:</strong> Soft-delete retains data for 14-90 days</p>
                                <p>• <strong>Dropbox:</strong> 180-day version history (even for "deleted" files)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* What Actually Works */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">What Actually Works: Proven Methods</h2>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                        <h4 className="font-bold text-green-900 mb-4">✅ Effective Data Destruction Methods</h4>
                        <div className="space-y-3">
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-900 mb-1">1. Certified Software Overwrite</h5>
                                <p className="text-sm text-slate-700">DoD 5220.22-M (3/7-pass) or NIST 800-88 compliant tools</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-900 mb-1">2. Cryptographic Erasure</h5>
                                <p className="text-sm text-slate-700">Destroy encryption key on SEDs (Self-Encrypting Drives)</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-900 mb-1">3. Physical Destruction</h5>
                                <p className="text-sm text-slate-700">Industrial shredding, degaussing, or incineration</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-900 mb-1">4. Professional ITAD Services</h5>
                                <p className="text-sm text-slate-700">Certified vendors with chain-of-custody and audit trails</p>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Solution */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure: No Myths, Just Verified Erasure</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure uses industry-standard methods with independent verification—no guesswork, no hope, just proof.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-xl border border-red-100">
                        <ShieldIcon className="w-6 h-6 text-red-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Certified Methods</h4>
                        <p className="text-xs text-slate-600">DoD, NIST, and cryptographic erasure</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-xl border border-red-100">
                        <CheckIcon className="w-6 h-6 text-red-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Verification Built-In</h4>
                        <p className="text-xs text-slate-600">Read-back verification proves success</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-xl border border-red-100">
                        <StarIcon className="w-6 h-6 text-red-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Audit-Ready Reports</h4>
                        <p className="text-xs text-slate-600">Compliance certificates for every device</p>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
             <div className="bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Stop Believing Myths. Start Verifying Erasure.</h2>
                <p className="leading-relaxed mb-6">
                    Protect your organization with proven, auditable data destruction methods.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Get Certified Erasure
                    <HoverIcon>
                        {(filled) => <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />}
                    </HoverIcon>
                </Link>
            </div>
        </Reveal>
      </section>

      {/* Engagement Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="data-deletion-myths" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="data-deletion-myths" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="data-deletion-myths" 
            blogTitle="Data Deletion Myths Debunked" 
          />
        </Reveal>
      </section>
    </div>
  );
};

export default DataDeletionMythsBlog;
