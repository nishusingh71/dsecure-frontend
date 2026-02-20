import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, HeartIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const BrandReputationESGBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-brand-reputation-esg')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-amber-700 bg-amber-100 rounded-full mb-4">
                    Brand & Reputation
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Brand Reputation and ESG</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    How sustainable data disposal practices strengthen brand reputation and align with ESG expectations from stakeholders.
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
                    <h2 className="text-2xl font-bold text-slate-900">1. The Reputation Stakes</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        In today's environment, how you dispose of IT assets directly impacts your brand reputation. Data breaches from improperly sanitized devices make headlines and erode customer trust.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        But it's not just about avoiding negative press—sustainable disposal practices are increasingly expected by investors, customers, and employees who prioritize ESG (Environmental, Social, Governance) performance.
                    </p>
                    <div className="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg my-4">
                        <strong className="text-amber-800 block mb-2">Reputation Risk</strong>
                        <p className="text-sm text-amber-700">
                            According to Ponemon Institute, the average cost of a data breach is <strong>$4.45 million</strong>. Beyond financial impact, brand damage can persist for years—customers remember companies that failed to protect their data.
                        </p>
                    </div>
                </div>

                {/* Consumer Expectations */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">2. Evolving Stakeholder Expectations</h2>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                            <h4 className="font-bold text-amber-900 mb-2">👥 Customers</h4>
                            <ul className="text-sm text-amber-800 space-y-1">
                                <li>• Expect data protection</li>
                                <li>• Value sustainable brands</li>
                                <li>• Research company practices</li>
                                <li>• Share experiences publicly</li>
                            </ul>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                            <h4 className="font-bold text-orange-900 mb-2">📈 Investors</h4>
                            <ul className="text-sm text-orange-800 space-y-1">
                                <li>• ESG screening criteria</li>
                                <li>• Risk assessment factors</li>
                                <li>• Sustainability reporting</li>
                                <li>• Long-term value focus</li>
                            </ul>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                            <h4 className="font-bold text-yellow-900 mb-2">👨‍💼 Employees</h4>
                            <ul className="text-sm text-yellow-800 space-y-1">
                                <li>• Pride in ethical employer</li>
                                <li>• Attraction of top talent</li>
                                <li>• Retention through values</li>
                                <li>• Internal advocacy</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Data Breach Impact */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">3. The Data Breach-Brand Connection</h2>
                    <p className="text-slate-700 leading-relaxed">
                        When data breaches occur due to improper device disposal, the reputational damage is amplified:
                    </p>
                     <div className="bg-slate-900 border-b border-slate-800 text-slate-100 p-6 rounded-xl font-mono text-sm leading-relaxed">
                        <p className="text-amber-400 font-bold mb-2">// Impact Chain</p>
                        <p className="mb-2">1. Old drives sold/donated without erasure</p>
                        <p className="mb-2">2. Data discovered by third party or researcher</p>
                        <p className="mb-2">3. Media coverage and regulatory scrutiny</p>
                        <p className="mb-2">4. Customer notification requirements</p>
                        <p>5. Long-term trust erosion and churn</p>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                        High-profile examples like Morgan Stanley's $60M fine for data center disposal failures demonstrate the scale of reputational and financial consequences.
                    </p>
                </div>

                 {/* ESG Integration */}
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">4. Integrating Data Disposal into ESG Strategy</h2>
                    <ul className="space-y-3 text-slate-700">
                        <li className="flex gap-3 items-start">
                            <span className="text-amber-500 font-bold text-xl">E</span>
                            <span><strong>Environmental:</strong> Certified erasure enables device reuse, reducing e-waste and manufacturing emissions. Track and report sustainability metrics.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-amber-500 font-bold text-xl">S</span>
                            <span><strong>Social:</strong> Protect customer and employee data. Enable device donations to underserved communities through secure erasure.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-amber-500 font-bold text-xl">G</span>
                             <span><strong>Governance:</strong> Implement documented policies, maintain audit trails, and ensure regulatory compliance with certified processes.</span>
                        </li>
                    </ul>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Solutions Section */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure Brand Protection Features</h2>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure helps organizations protect their brand through certified data disposal practices and ESG-aligned reporting.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldIcon className="w-5 h-5 text-amber-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Breach Prevention</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Certified erasure with verification ensures no data remnants reach secondary markets. Protect your brand from disposal-related breaches.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-2 mb-3">
                            <HeartIcon className="w-5 h-5 text-amber-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Sustainability Metrics</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Track devices erased for reuse vs. destroyed. Generate reports showing carbon savings for ESG disclosures and stakeholder communications.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-2 mb-3">
                            <GlobeIcon className="w-5 h-5 text-amber-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Transparency & Trust</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Demonstrate responsible data stewardship to customers, regulators, and partners with documented proof of secure disposal.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
                        <div className="flex items-center gap-2 mb-3">
                            <StarIcon className="w-5 h-5 text-amber-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Competitive Differentiation</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Use your certified disposal practices as a competitive advantage—customers and partners increasingly value responsible data handling.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                    <h4 className="font-bold mb-4 text-amber-400">Brand Benefits with D-Secure</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Eliminate data breach risk from device disposal</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Generate ESG-ready sustainability reports</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Build customer trust through transparent practices</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Meet investor ESG expectations</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Attract and retain values-driven employees</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Differentiate through responsible data stewardship</span>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* Final Thoughts */}
        <Reveal>
             <div className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
                <p className="leading-relaxed mb-6">
                    Brand reputation takes years to build and moments to destroy. In an era of heightened stakeholder expectations around data privacy and sustainability, certified data disposal is no longer just an IT concern—it's a brand protection imperative.
                </p>
                <Link
                    to="/#products"
                    className="inline-flex items-center bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Protect Your Brand
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
          <EngagementSection blogId="brand-reputation-esg" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="brand-reputation-esg" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="brand-reputation-esg" 
            blogTitle="Brand Reputation and ESG" 
          />
        </Reveal>
      </section>

       {/* CTA Section */}
       <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
            <Reveal>
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Strengthen Your Brand Trust
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Implement certified data disposal practices that protect your reputation and demonstrate ESG commitment.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all text-lg"
                        >
                            Request Brand Protection Assessment
                        </Link>
                         <Link
                            to="/resources"
                            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                        >
                            Download ESG Guide
                        </Link>
                    </div>
                </div>
            </Reveal>
        </section>
    </div>
  );
};

export default BrandReputationESGBlog;
