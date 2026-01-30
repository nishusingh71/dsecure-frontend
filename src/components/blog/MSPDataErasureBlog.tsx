import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, UsersIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const MSPDataErasureBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-msp-data-erasure')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-violet-700 bg-violet-100 rounded-full mb-4">
                    MSP Solutions
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Data Erasure for MSPs</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    How Managed Service Providers can deliver certified data erasure as a value-added service to their clients.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
             <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-8">
                
                {/* Intro */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">1. The MSP Opportunity</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Managed Service Providers are uniquely positioned to help their clients with secure data disposal. You already manage their IT infrastructure—extending to end-of-life management is a natural fit.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        Data erasure as a service creates recurring revenue, deepens client relationships, and addresses a critical security need that most SMBs lack the expertise to handle internally.
                    </p>
                    <div className="p-6 bg-violet-50 border-l-4 border-violet-500 rounded-r-lg my-4">
                        <strong className="text-violet-800 block mb-2">Market Opportunity</strong>
                        <p className="text-sm text-violet-700">
                            Over <strong>75% of SMBs</strong> lack formal data destruction policies. MSPs who offer certified erasure services fill this gap while generating new revenue streams.
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">2. Benefits for MSPs</h2>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-violet-50 border border-violet-200 p-4 rounded-lg">
                            <h4 className="font-bold text-violet-900 mb-2">💰 New Revenue Stream</h4>
                            <ul className="text-sm text-violet-800 space-y-1">
                                <li>• Charge per-device erasure fees</li>
                                <li>• Offer managed disposal contracts</li>
                                <li>• Upsell asset recovery services</li>
                                <li>• Bundled security packages</li>
                            </ul>
                        </div>
                        <div className="bg-violet-50 border border-violet-200 p-4 rounded-lg">
                            <h4 className="font-bold text-violet-900 mb-2">🤝 Client Stickiness</h4>
                            <ul className="text-sm text-violet-800 space-y-1">
                                <li>• Deepen trusted advisor role</li>
                                <li>• Lifecycle management partnership</li>
                                <li>• Compliance assistance</li>
                                <li>• Security differentiation</li>
                            </ul>
                        </div>
                        <div className="bg-violet-50 border border-violet-200 p-4 rounded-lg">
                            <h4 className="font-bold text-violet-900 mb-2">📋 Compliance Value</h4>
                            <ul className="text-sm text-violet-800 space-y-1">
                                <li>• Help clients meet regulations</li>
                                <li>• Provide audit documentation</li>
                                <li>• Reduce their liability</li>
                                <li>• Support insurance requirements</li>
                            </ul>
                        </div>
                        <div className="bg-violet-50 border border-violet-200 p-4 rounded-lg">
                            <h4 className="font-bold text-violet-900 mb-2">🔒 Risk Mitigation</h4>
                            <ul className="text-sm text-violet-800 space-y-1">
                                <li>• Protect clients from breaches</li>
                                <li>• Professional liability coverage</li>
                                <li>• Chain-of-custody documentation</li>
                                <li>• Certified processes</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Service Model */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">3. Building Your Erasure Service</h2>
                    <p className="text-slate-700 leading-relaxed">
                        There are multiple ways MSPs can structure data erasure services:
                    </p>
                     <div className="bg-slate-900 border-b border-slate-800 text-slate-100 p-6 rounded-xl font-mono text-sm leading-relaxed">
                        <p className="text-violet-400 font-bold mb-2">// Service Models</p>
                        <p className="mb-2"><span className="text-emerald-400">On-site:</span> Erasure at client location → Maximum security</p>
                        <p className="mb-2"><span className="text-emerald-400">In-lab:</span> Devices brought to your facility → Efficiency</p>
                        <p className="mb-2"><span className="text-emerald-400">Remote:</span> Software deployed to client devices → Convenience</p>
                        <p><span className="text-emerald-400">Hybrid:</span> Combination based on sensitivity → Flexibility</p>
                    </div>
                </div>

                 {/* Process */}
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">4. MSP Erasure Workflow</h2>
                    <ul className="space-y-3 text-slate-700">
                        <li className="flex gap-3 items-start">
                            <span className="text-violet-500 font-bold text-xl">1.</span>
                            <span><strong>Asset Collection:</strong> Receive devices from clients with documented chain of custody.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-violet-500 font-bold text-xl">2.</span>
                            <span><strong>Inventory & Triage:</strong> Log serial numbers, assess device condition, and identify drive types.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-violet-500 font-bold text-xl">3.</span>
                             <span><strong>Secure Erasure:</strong> Apply appropriate erasure method based on media type and client requirements.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-violet-500 font-bold text-xl">4.</span>
                             <span><strong>Verification:</strong> Confirm erasure success with read-back or sampling verification.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-violet-500 font-bold text-xl">5.</span>
                             <span><strong>Certification:</strong> Generate client-branded certificates with all required audit details.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-violet-500 font-bold text-xl">6.</span>
                             <span><strong>Disposition:</strong> Coordinate reuse, resale, or recycling based on client preference.</span>
                        </li>
                    </ul>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Solutions Section */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure MSP Partner Program</h2>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure offers a dedicated MSP program with tools designed for multi-tenant environments and client management.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-100">
                        <div className="flex items-center gap-2 mb-3">
                            <UsersIcon className="w-5 h-5 text-violet-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Multi-Tenant Console</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Manage all clients from a single dashboard. Separate branding, certificates, and reports for each client organization.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldIcon className="w-5 h-5 text-violet-600" filled={true} />
                            <h4 className="font-bold text-slate-900">White-Label Certificates</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Deliver client-branded erasure certificates with your logo and contact information, reinforcing your professional services.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-100">
                        <div className="flex items-center gap-2 mb-3">
                            <GlobeIcon className="w-5 h-5 text-violet-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Remote Deployment</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Deploy erasure agents remotely to client devices. Initiate and monitor erasure from your central console.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-100">
                        <div className="flex items-center gap-2 mb-3">
                            <StarIcon className="w-5 h-5 text-violet-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Volume Licensing</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Flexible licensing models designed for MSPs. Pay per erasure or unlimited plans based on your client base.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                    <h4 className="font-bold mb-4 text-violet-400">MSP Partner Benefits</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Dedicated partner portal with client management</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>White-label branding on all client deliverables</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Wholesale pricing with margin protection</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Sales and marketing co-op support</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Technical training and certification</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Priority support channel</span>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* Final Thoughts */}
        <Reveal>
             <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
                <p className="leading-relaxed mb-6">
                    Data erasure is a natural extension of MSP services. Your clients trust you with their IT operations—helping them securely retire assets protects that trust while generating new revenue. Position yourself as a complete lifecycle partner.
                </p>
                <Link
                    to="/partners"
                    className="inline-flex items-center bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <UsersIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Join MSP Partner Program
                    <HoverIcon>
                        {(filled) => <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />}
                    </HoverIcon>
                </Link>
            </div>
        </Reveal>
      </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="msp-data-erasure" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="msp-data-erasure" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="msp-data-erasure" 
            blogTitle="Data Erasure for MSPs" 
          />
        </Reveal>
      </section>

       {/* CTA Section */}
       <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
            <Reveal>
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Expand Your MSP Services
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Add certified data erasure to your service portfolio and grow your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/partners"
                            className="inline-block bg-gradient-to-r from-violet-500 to-purple-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-violet-600 hover:to-purple-600 transition-all text-lg"
                        >
                            Become a Partner
                        </Link>
                         <Link
                            to="/contact"
                            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                        >
                            Request MSP Demo
                        </Link>
                    </div>
                </div>
            </Reveal>
        </section>
    </div>
  );
};

export default MSPDataErasureBlog;
