import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, LeafIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon, TrendingUpIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const ESGDataErasureBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-esg-data-erasure')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-teal-700 bg-teal-100 rounded-full mb-4">
                    ESG & Sustainability
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">ESG and Data Erasure</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    How certified data erasure supports your Environmental, Social, and Governance objectives while maintaining data security.
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
                    <h2 className="text-2xl font-bold text-slate-900">1. ESG and IT Asset Disposition</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Environmental, Social, and Governance (ESG) criteria have become central to how investors, customers, and regulators evaluate organizations. IT asset disposition directly impacts all three pillars.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        Data erasure plays a critical role in enabling sustainable IT practices. By securely sanitizing devices, organizations can extend hardware life, reduce e-waste, and maximize recovery value—all while protecting sensitive data.
                    </p>
                    <div className="p-6 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg my-4">
                        <strong className="text-teal-800 block mb-2">ESG Materiality</strong>
                        <p className="text-sm text-teal-700">
                            According to Gartner, <strong>85% of investors</strong> now consider ESG factors in their investment decisions. IT sustainability, including responsible device disposal, is increasingly material to corporate valuations.
                        </p>
                    </div>
                </div>

                {/* Three Pillars */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">2. Data Erasure Across ESG Pillars</h2>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                            <h4 className="font-bold text-emerald-900 mb-2">🌱 Environmental</h4>
                            <ul className="text-sm text-emerald-800 space-y-1">
                                <li>• Reduce e-waste through reuse</li>
                                <li>• Lower carbon footprint</li>
                                <li>• Extend hardware lifecycle</li>
                                <li>• Support circular economy</li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                            <h4 className="font-bold text-blue-900 mb-2">🤝 Social</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Enable device donations</li>
                                <li>• Protect customer privacy</li>
                                <li>• Bridge digital divide</li>
                                <li>• Community contribution</li>
                            </ul>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                            <h4 className="font-bold text-purple-900 mb-2">⚖️ Governance</h4>
                            <ul className="text-sm text-purple-800 space-y-1">
                                <li>• Regulatory compliance</li>
                                <li>• Data protection policies</li>
                                <li>• Audit trails</li>
                                <li>• Risk management</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Reporting Frameworks */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">3. ESG Reporting Frameworks</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Major sustainability reporting frameworks require disclosure of IT waste management practices. Certified data erasure provides the documentation needed for compliance.
                    </p>
                     <div className="bg-slate-900 border-b border-slate-800 text-slate-100 p-6 rounded-xl font-mono text-sm leading-relaxed">
                        <p className="text-teal-400 font-bold mb-2">// Key Reporting Standards</p>
                        <p className="mb-2">GRI 306: Waste (2020) - Waste generation and management</p>
                        <p className="mb-2">SASB: E-waste from hardware disposal</p>
                        <p className="mb-2">CDP: Supply chain environmental impact</p>
                        <p>TCFD: Climate-related risk disclosure</p>
                    </div>
                </div>

                 {/* Metrics */}
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">4. Key ESG Metrics for ITAD</h2>
                    <ul className="space-y-3 text-slate-700">
                        <li className="flex gap-3 items-start">
                            <span className="text-teal-500 font-bold text-xl">✓</span>
                            <span><strong>Devices Diverted from Destruction:</strong> Percentage of retired devices erased for reuse vs. destroyed.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-teal-500 font-bold text-xl">✓</span>
                            <span><strong>Carbon Avoided:</strong> Estimated CO₂ savings from extending device life through erasure.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-teal-500 font-bold text-xl">✓</span>
                             <span><strong>Recovery Rate:</strong> Financial value recovered from remarketable assets after erasure.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-teal-500 font-bold text-xl">✓</span>
                             <span><strong>Compliance Rate:</strong> Percentage of dispositions with certified erasure documentation.</span>
                        </li>
                    </ul>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Solutions Section */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure ESG Capabilities</h2>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure provides the tools and reporting features needed to track and demonstrate your ESG performance in IT asset disposition.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-100">
                        <div className="flex items-center gap-2 mb-3">
                            <LeafIcon className="w-5 h-5 text-teal-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Environmental Dashboard</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Track devices erased, carbon savings, and e-waste diversion rates. Export data for GRI, SASB, and CDP reporting.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldIcon className="w-5 h-5 text-teal-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Governance Documentation</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Tamper-proof certificates and audit trails demonstrate compliance with data protection regulations.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-100">
                        <div className="flex items-center gap-2 mb-3">
                            <GlobeIcon className="w-5 h-5 text-teal-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Social Impact Tracking</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Track devices donated to schools and nonprofits. Generate impact reports for stakeholder communications.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl border border-teal-100">
                        <div className="flex items-center gap-2 mb-3">
                            <StarIcon className="w-5 h-5 text-teal-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Asset Recovery Metrics</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Track financial value recovered from remarketable devices, demonstrating ROI on sustainable practices.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                    <h4 className="font-bold mb-4 text-teal-400">ESG Benefits with D-Secure</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Automated ESG reporting for sustainability frameworks</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Carbon footprint calculation per device erased</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>E-waste diversion rate tracking and visualization</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Social impact metrics for device donations</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Governance audit trails for regulatory compliance</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Stakeholder-ready sustainability reports</span>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* Final Thoughts */}
        <Reveal>
             <div className="bg-gradient-to-br from-teal-600 via-emerald-600 to-green-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
                <p className="leading-relaxed mb-6">
                    ESG is no longer optional—it's a business imperative. Certified data erasure sits at the intersection of security, sustainability, and governance, enabling organizations to meet stakeholder expectations while protecting sensitive data. Make IT asset disposition a cornerstone of your ESG strategy.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <LeafIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Explore ESG Solutions
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
          <EngagementSection blogId="esg-data-erasure" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="esg-data-erasure" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="esg-data-erasure" 
            blogTitle="ESG and Data Erasure" 
          />
        </Reveal>
      </section>

       {/* CTA Section */}
       <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
            <Reveal>
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Elevate Your ESG Performance
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Get the tools to track, measure, and report your sustainable IT practices with certified data erasure.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-block bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all text-lg"
                        >
                            Request ESG Assessment
                        </Link>
                         <Link
                            to="/resources"
                            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                        >
                            Download ESG Whitepaper
                        </Link>
                    </div>
                </div>
            </Reveal>
        </section>
    </div>
  );
};

export default React.memo(ESGDataErasureBlog);
