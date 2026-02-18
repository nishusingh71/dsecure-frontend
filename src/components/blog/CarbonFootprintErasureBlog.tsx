import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, LeafIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const CarbonFootprintErasureBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-carbon-footprint-erasure')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                    Sustainability
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Reducing Carbon Footprint Through Data Erasure</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    How certified data erasure enables IT asset reuse, reducing e-waste and lowering your organization's carbon footprint significantly.
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
                    <h2 className="text-2xl font-bold text-slate-900">1. The E-Waste Challenge</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Electronic waste is one of the fastest-growing waste streams globally. Manufacturing new IT equipment contributes significantly to carbon emissions through mining, processing, and production.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        The irony is that many devices are destroyed prematurely simply because organizations lack certified methods to sanitize data. Physical destruction eliminates any possibility of reuse, sending functional hardware to landfills.
                    </p>
                    <div className="p-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-lg my-4">
                        <strong className="text-emerald-800 block mb-2">Environmental Impact</strong>
                        <p className="text-sm text-emerald-700">
                            According to the UN, <strong>53.6 million metric tonnes</strong> of e-waste was generated globally in 2019. Only 17.4% was properly recycled. Extending device life through data erasure and reuse can significantly reduce this figure.
                        </p>
                    </div>
                </div>

                {/* Carbon Impact */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">2. Manufacturing vs. Reuse: Carbon Comparison</h2>
                    <p className="text-slate-700 leading-relaxed">
                        The carbon footprint of IT equipment is heavily front-loaded in manufacturing. Extending device life through certified erasure and resale offers substantial environmental benefits.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                            <h4 className="font-bold text-red-900 mb-2">New Laptop</h4>
                            <p className="text-3xl font-bold text-red-600">350-400</p>
                            <p className="text-sm text-red-700">kg CO₂ equivalent</p>
                        </div>
                        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-center">
                            <h4 className="font-bold text-amber-900 mb-2">Refurbished Laptop</h4>
                            <p className="text-3xl font-bold text-amber-600">40-60</p>
                            <p className="text-sm text-amber-700">kg CO₂ equivalent</p>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center">
                            <h4 className="font-bold text-emerald-900 mb-2">Carbon Saved</h4>
                            <p className="text-3xl font-bold text-emerald-600">85%</p>
                            <p className="text-sm text-emerald-700">reduction per device</p>
                        </div>
                    </div>
                </div>

                {/* Erasure Role */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">3. Data Erasure: Enabling the Circular Economy</h2>
                    <p className="text-slate-700 leading-relaxed">
                         Certified data erasure is the bridge between secure decommissioning and sustainable reuse. Without it, organizations face a false choice between security and sustainability.
                    </p>
                     <div className="bg-slate-900 border-b border-slate-800 text-slate-100 p-6 rounded-xl font-mono text-sm leading-relaxed">
                        <p className="text-emerald-400 font-bold mb-2">// The Circular IT Economy</p>
                        <p className="mb-2">1. Deploy → Use → Decommission</p>
                        <p className="mb-2">2. <span className="text-emerald-400">Certified Erasure</span> → Data Security Assured</p>
                        <p className="mb-2">3. Refurbish → Resell/Donate</p>
                        <p>4. Responsible Recycling (End of Life)</p>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                        This approach not only reduces environmental impact but also generates financial returns through asset recovery, creating a win-win for both ESG goals and the bottom line.
                    </p>
                </div>

                 {/* ESG Reporting */}
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">4. ESG Reporting and Carbon Metrics</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Environmental, Social, and Governance (ESG) reporting increasingly requires organizations to disclose their environmental impact. IT asset disposition plays a key role in these metrics.
                    </p>
                    <ul className="space-y-3 text-slate-700">
                        <li className="flex gap-3 items-start">
                            <span className="text-emerald-500 font-bold text-xl">✓</span>
                            <span><strong>Scope 3 Emissions:</strong> End-of-life treatment of products falls under Scope 3. Proper erasure and reuse reduce these emissions.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <span className="text-emerald-500 font-bold text-xl">✓</span>
                            <span><strong>Waste Reduction:</strong> Track and report devices diverted from destruction through certified erasure.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                             <span className="text-emerald-500 font-bold text-xl">✓</span>
                             <span><strong>Circular Economy Metrics:</strong> Report on asset recovery rates and reuse percentages as sustainability KPIs.</span>
                        </li>
                    </ul>
                </div>

             </div>
        </Reveal>

        {/* D-Secure Solutions Section */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure: Enabling Sustainable IT Lifecycle</h2>
                
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure provides the certified data erasure capabilities that enable safe device reuse, helping organizations meet their sustainability targets while maintaining data security.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-3">
                            <LeafIcon className="w-5 h-5 text-emerald-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Sustainability Reporting</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Track devices erased vs. destroyed. Generate reports showing carbon savings from asset reuse to support ESG disclosures.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldIcon className="w-5 h-5 text-emerald-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Certified Erasure</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            NIST 800-88 compliant erasure ensures data is irrecoverable, enabling confident resale or donation of retired equipment.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-3">
                            <GlobeIcon className="w-5 h-5 text-emerald-600" filled={true} />
                            <h4 className="font-bold text-slate-900">ITAD Integration</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Seamless workflows with R2 and e-Stewards certified ITAD partners for complete chain-of-custody documentation.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-3">
                            <StarIcon className="w-5 h-5 text-emerald-600" filled={true} />
                            <h4 className="font-bold text-slate-900">Carbon Impact Calculator</h4>
                        </div>
                        <p className="text-sm text-slate-600">
                            Built-in tools to calculate and report estimated carbon savings from your data erasure and reuse program.
                        </p>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-xl p-6 text-white">
                    <h4 className="font-bold mb-4 text-emerald-400">Your Sustainability Impact with D-Secure</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Enable 85%+ devices for reuse instead of destruction</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Generate ESG-ready reports on carbon savings</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Support circular economy initiatives with certified erasure</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Reduce Scope 3 emissions from end-of-life IT</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Track and report e-waste diversion metrics</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" filled={true} />
                            <span>Meet industry sustainability certifications</span>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* Final Thoughts */}
        <Reveal>
             <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Final Thoughts</h2>
                <p className="leading-relaxed mb-6">
                    Data security and environmental sustainability are not competing priorities. Certified data erasure enables organizations to protect sensitive information while significantly reducing their carbon footprint through IT asset reuse. Make erasure the cornerstone of your sustainable IT strategy.
                </p>
                <Link
                    to="/products"
                    className="inline-flex items-center bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <LeafIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Explore Sustainable Solutions
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
          <EngagementSection blogId="carbon-footprint-erasure" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="carbon-footprint-erasure" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="carbon-footprint-erasure" 
            blogTitle="Reducing Carbon Footprint Through Data Erasure" 
          />
        </Reveal>
      </section>

       {/* CTA Section */}
       <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
            <Reveal>
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Start Your Sustainable IT Journey
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Reduce e-waste, lower carbon emissions, and maintain data security with certified erasure solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-block bg-gradient-to-r from-emerald-500 to-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all text-lg"
                        >
                            Get Sustainability Assessment
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

export default React.memo(CarbonFootprintErasureBlog);
