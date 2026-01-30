import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, StarIcon, ArrowRightIcon, HoverIcon, MobileIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const MobileErasureGuideBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-mobile-erasure-guide')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-teal-700 bg-teal-100 rounded-full mb-4">
                    Mobile Security
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Mobile Device Erasure Guide</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Securely erase smartphones, tablets, and mobile devices before resale, recycling, or employee transitions.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
             <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-8">
                
                {/* Why Mobile Erasure is Different */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Why Mobile Devices Require Special Attention</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Mobile devices present unique data erasure challenges due to their diverse operating systems, built-in encryption, cloud synchronization, and embedded storage that cannot be removed.
                    </p>
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
                        <strong className="text-amber-800 block mb-2">⚠️ Common Misconception</strong>
                        <p className="text-sm text-amber-700">
                            Factory reset ≠ Secure data erasure. Many factory reset processes don't fully sanitize data and can be recovered with forensic tools.
                        </p>
                    </div>
                </div>

                {/* Platform-Specific Instructions */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Platform-Specific Erasure Methods</h2>
                    
                    {/* iOS/iPhone */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="text-2xl">🍎</span> iOS Devices (iPhone/iPad)
                        </h3>
                        <div className="space-y-3">
                            <p className="text-slate-700"><strong>Erasure Method:</strong> Cryptographic erasure via "Erase All Content and Settings"</p>
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <p className="font-semibold text-slate-900 mb-2">Step-by-Step Process:</p>
                                <ol className="text-sm text-slate-700 space-y-2 ml-4">
                                    <li><strong>1.</strong> Back up device (if needed) via iCloud or iTunes</li>
                                    <li><strong>2.</strong> Sign out of iCloud: Settings → [Your Name] → Sign Out</li>
                                    <li><strong>3.</strong> Sign out of iTunes & App Store</li>
                                    <li><strong>4.</strong> Unpair Apple Watch (if applicable)</li>
                                    <li><strong>5.</strong> Settings → General → Transfer or Reset iPhone → Erase All Content and Settings</li>
                                    <li><strong>6.</strong> Enter passcode and confirm erasure</li>
                                    <li><strong>7.</strong> Verify device shows "Hello" setup screen</li>
                                </ol>
                            </div>
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mt-3">
                                <p className="text-sm text-green-800">
                                    ✅ <strong>Security Note:</strong> iOS uses hardware-based encryption. Erasing the encryption key makes all data permanently unrecoverable—equivalent to NIST 800-88 Purge level.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Android */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-xl mt-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="text-2xl">🤖</span> Android Devices
                        </h3>
                        <div className="space-y-3">
                            <p className="text-slate-700"><strong>Erasure Method:</strong> Factory reset + encryption verification</p>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <p className="font-semibold text-slate-900 mb-2">Step-by-Step Process:</p>
                                <ol className="text-sm text-slate-700 space-y-2 ml-4">
                                    <li><strong>1.</strong> Verify device encryption is enabled: Settings → Security → Encryption</li>
                                    <li><strong>2.</strong> Remove Google account: Settings → Accounts → Remove all accounts</li>
                                    <li><strong>3.</strong> Remove SD card (if present)</li>
                                    <li><strong>4.</strong> Settings → System → Reset → Factory Data Reset</li>
                                    <li><strong>5.</strong> Confirm and wait for reset completion</li>
                                    <li><strong>6.</strong> Verify device shows initial setup wizard</li>
                                </ol>
                            </div>
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-3">
                                <p className="text-sm text-amber-800">
                                    ⚠️ <strong>Critical:</strong> Older Android devices (pre-2015) may not have encryption enabled by default. For these devices, use dedicated mobile erasure software or physical destruction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enterprise Mobile Device Management */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Enterprise Mobile Device Management (MDM)</h2>
                    <p className="text-slate-700 leading-relaxed">
                        For organizations managing fleets of mobile devices, MDM solutions enable centralized, remote erasure capabilities.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                            <h4 className="font-bold text-blue-900 mb-2">Remote Wipe</h4>
                            <p className="text-sm text-blue-800">
                                Trigger factory reset remotely via MDM portal. Useful for lost/stolen devices or immediate employee departures.
                            </p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">Selective Wipe</h4>
                            <p className="text-sm text-indigo-800">
                                Erase only corporate data and apps, leaving personal data intact. Ideal for BYOD (Bring Your Own Device) scenarios.
                            </p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                            <h4 className="font-bold text-purple-900 mb-2">Compliance Reporting</h4>
                            <p className="text-sm text-purple-800">
                                Generate audit logs and certificates proving erasure occurred. Required for regulatory compliance.
                            </p>
                        </div>
                        <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                            <h4 className="font-bold text-pink-900 mb-2">Activation Lock Management</h4>
                            <p className="text-sm text-pink-800">
                                Disable Find My iPhone/Android Device Manager locks before disposal to enable device reuse.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Best Practices */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Mobile Erasure Best Practices</h2>
                    <div className="space-y-3">
                        <div className="bg-white border-l-4 border-teal-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-teal-900 mb-1">1. Verify Encryption Before Erasure</h4>
                            <p className="text-sm text-slate-700">Confirm device encryption is active. Without encryption, factory reset may leave recoverable data.</p>
                        </div>
                        <div className="bg-white border-l-4 border-teal-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-teal-900 mb-1">2. Remove All Accounts</h4>
                            <p className="text-sm text-slate-700">Sign out of Google, Apple ID, Microsoft, and all third-party accounts to prevent activation locks.</p>
                        </div>
                        <div className="bg-white border-l-4 border-teal-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-teal-900 mb-1">3. Remove External Storage</h4>
                            <p className="text-sm text-slate-700">Extract SD cards, SIM cards, and any removable storage before erasure.</p>
                        </div>
                        <div className="bg-white border-l-4 border-teal-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-teal-900 mb-1">4. Document Serial Numbers</h4>
                            <p className="text-sm text-slate-700">Record IMEI/serial numbers before erasure for audit trails and compliance reporting.</p>
                        </div>
                        <div className="bg-white border-l-4 border-teal-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-teal-900 mb-1">5. Verify Erasure Success</h4>
                            <p className="text-sm text-slate-700">Power on device post-erasure to confirm initial setup screen appears and no data is accessible.</p>
                        </div>
                    </div>
                </div>

                {/* Common Mistakes */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Common Mistakes to Avoid</h2>
                    <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                        <ul className="space-y-2 text-slate-700">
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 font-bold mt-0.5">❌</span>
                                <span><strong>Forgetting to disable Find My iPhone:</strong> Device becomes unusable for next owner</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 font-bold mt-0.5">❌</span>
                                <span><strong>Not removing corporate MDM profiles:</strong> Prevents factory reset or reactivation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 font-bold mt-0.5">❌</span>
                                <span><strong>Skipping encryption verification:</strong> Leaves data vulnerable on older devices</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600 font-bold mt-0.5">❌</span>
                                <span><strong>Assuming factory reset = secure:</strong> May not meet compliance requirements</span>
                            </li>
                        </ul>
                    </div>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Mobile Solution */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure Mobile Device Erasure</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure integrates with leading MDM platforms and provides standalone mobile erasure capabilities with comprehensive audit trails.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100">
                        <CheckIcon className="w-6 h-6 text-teal-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Multi-Platform Support</h4>
                        <p className="text-xs text-slate-600">iOS, Android, Windows Mobile coverage</p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100">
                        <CheckIcon className="w-6 h-6 text-teal-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Compliance Certificates</h4>
                        <p className="text-xs text-slate-600">Automated documentation for audits</p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl border border-teal-100">
                        <CheckIcon className="w-6 h-6 text-teal-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">MDM Integration</h4>
                        <p className="text-xs text-slate-600">Works with Intune, Jamf, MobileIron</p>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
             <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Secure Your Mobile Fleet</h2>
                <p className="leading-relaxed mb-6">
                    Get enterprise-grade mobile device erasure with centralized management and compliance reporting.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Request Demo
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
          <EngagementSection blogId="mobile-erasure-guide" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="mobile-erasure-guide" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="mobile-erasure-guide" 
            blogTitle="Mobile Device Erasure Guide" 
          />
        </Reveal>
      </section>
    </div>
  );
};

export default MobileErasureGuideBlog;
