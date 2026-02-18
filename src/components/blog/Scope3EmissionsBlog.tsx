import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ShieldIcon, CheckIcon, GlobeIcon, StarIcon, ArrowRightIcon, HoverIcon, HeartIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const Scope3EmissionsBlog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog-scope3-emissions')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <span className="inline-block px-4 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full mb-4">
                    Sustainability & ESG
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Scope 3 Emissions & Device Reuse</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    How secure data erasure enables device reuse and dramatically reduces your organization's Scope 3 carbon footprint.
                </p>
            </div>
        </Reveal>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
             <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-8">
                
                {/* Understanding Scope 3 */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Understanding Scope 3 Emissions</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Scope 3 emissions are indirect emissions from your organization's value chain—including purchased goods, business travel, and end-of-life treatment of products. For most companies, Scope 3 represents 70-90% of total carbon footprint.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                            <h4 className="font-bold text-blue-900 mb-2">Scope 1</h4>
                            <p className="text-sm text-blue-800">Direct emissions from owned sources (facilities, vehicles)</p>
                            <p className="text-2xl font-bold text-blue-600 mt-2">~10%</p>
                        </div>
                        <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                            <h4 className="font-bold text-indigo-900 mb-2">Scope 2</h4>
                            <p className="text-sm text-indigo-800">Indirect emissions from purchased electricity</p>
                            <p className="text-2xl font-bold text-indigo-600 mt-2">~20%</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                            <h4 className="font-bold text-green-900 mb-2">Scope 3</h4>
                            <p className="text-sm text-green-800">All other indirect emissions in value chain</p>
                            <p className="text-2xl font-bold text-green-600 mt-2">~70%</p>
                        </div>
                    </div>
                </div>

                {/* IT's Scope 3 Impact */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">IT Equipment's Scope 3 Impact</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Manufacturing new IT equipment generates massive emissions—primarily categorized as Scope 3 Category 1 (Purchased Goods) when you buy devices, and Category 12 (End-of-Life Treatment) when you dispose of them.
                    </p>
                    <div className="bg-slate-900 text-slate-100 p-6 rounded-xl font-mono text-sm">
                        <p className="text-green-400 font-bold mb-3">// Carbon Footprint by Device</p>
                        <p className="mb-2">Laptop Manufacturing: <span className="text-amber-400">~300 kg CO₂e</span></p>
                        <p className="mb-2">Desktop Manufacturing: <span className="text-amber-400">~400 kg CO₂e</span></p>
                        <p className="mb-2">Server Manufacturing: <span className="text-amber-400">~1,200 kg CO₂e</span></p>
                        <p className="mb-2">Smartphone Manufacturing: <span className="text-amber-400">~80 kg CO₂e</span></p>
                        <p className="text-green-400 mt-3">✓ Extending device life by 1 year = 30-50% emission reduction</p>
                    </div>
                </div>

                {/* The Circular Economy Connection */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Circular Economy & Device Reuse</h2>
                    <p className="text-slate-700 leading-relaxed">
                        The circular economy model—where devices are reused, refurbished, and remarketed—dramatically reduces Scope 3 emissions. But reuse requires secure data erasure.
                    </p>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                        <h4 className="font-bold text-green-900 mb-4">Linear vs Circular IT Model</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h5 className="font-semibold text-red-900 mb-2">❌ Linear Model (High Emissions)</h5>
                                <ol className="text-sm text-slate-700 space-y-1">
                                    <li>1. Buy new device → 300kg CO₂e</li>
                                    <li>2. Use for 3 years</li>
                                    <li>3. Destroy device → 10kg CO₂e</li>
                                    <li>4. Buy replacement → 300kg CO₂e</li>
                                    <li className="font-bold text-red-600 mt-2">Total: 610kg CO₂e / device</li>
                                </ol>
                            </div>
                            <div>
                                <h5 className="font-semibold text-green-900 mb-2">✅ Circular Model (Low Emissions)</h5>
                                <ol className="text-sm text-slate-700 space-y-1">
                                    <li>1. Buy new device → 300kg CO₂e</li>
                                    <li>2. Use for 3 years</li>
                                    <li>3. Erase & resell → 2kg CO₂e</li>
                                    <li>4. Buy refurbished → 50kg CO₂e</li>
                                    <li className="font-bold text-green-600 mt-2">Total: 352kg CO₂e / device</li>
                                </ol>
                            </div>
                        </div>
                        <div className="mt-4 bg-white p-4 rounded-lg border border-green-300">
                            <p className="text-lg font-bold text-green-700">💡 Savings: 258kg CO₂e per device (42% reduction)</p>
                        </div>
                    </div>
                </div>

                {/* Data Erasure as Enabler */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Data Erasure: The Missing Link</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Most organizations destroy devices instead of reusing them due to data security concerns. Certified data erasure removes this barrier, enabling the circular economy.
                    </p>
                    <div className="space-y-3">
                        <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-green-900 mb-1">Without Secure Erasure</h4>
                            <p className="text-sm text-slate-700">Organizations default to physical destruction to guarantee data protection → New devices must be manufactured → High Scope 3 emissions.</p>
                        </div>
                        <div className="bg-white border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
                            <h4 className="font-semibold text-green-900 mb-1">With Certified Erasure</h4>
                            <p className="text-sm text-slate-700">Devices can be confidently resold or donated → Existing devices get second life → Avoid manufacturing emissions.</p>
                        </div>
                    </div>
                </div>

                {/* ESG Reporting Benefits */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">ESG Reporting & Disclosure</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Investors and regulators increasingly demand transparent Scope 3 emission reporting. Device reuse programs provide measurable, reportable emission reductions.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
                        <h4 className="font-bold text-blue-900 mb-3">Reportable Metrics</h4>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" filled={true} />
                                <span><strong>Scope 3 Category 1 Reduction:</strong> Fewer new devices purchased</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" filled={true} />
                                <span><strong>Scope 3 Category 12 Reduction:</strong> Reuse instead of disposal</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" filled={true} />
                                <span><strong>Total Carbon Avoided:</strong> kg CO₂e saved per device</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" filled={true} />
                                <span><strong>Circular Economy Participation:</strong> % of devices reused vs destroyed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Case Study */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Real-World Impact Example</h2>
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border border-slate-200">
                        <p className="font-semibold text-slate-900 mb-4">Large Enterprise (10,000 employees, 5-year refresh cycle)</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <p className="text-sm text-slate-600 mb-2">Old Approach (Destroy & Buy New)</p>
                                <p className="text-2xl font-bold text-red-600">6,100 tons CO₂e</p>
                                <p className="text-xs text-slate-500 mt-1">Over 5 years</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <p className="text-sm text-slate-600 mb-2">New Approach (Erase & Reuse)</p>
                                <p className="text-2xl font-bold text-green-600">3,520 tons CO₂e</p>
                                <p className="text-xs text-slate-500 mt-1">Over 5 years</p>
                            </div>
                        </div>
                        <div className="mt-4 bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
                            <p className="font-bold text-green-900">Emission Reduction: 2,580 tons CO₂e saved</p>
                            <p className="text-sm text-green-800 mt-1">Equivalent to removing 560 cars from the road annually</p>
                        </div>
                    </div>
                </div>

             </div>
        </Reveal>

        {/* D-Secure ESG Solution */}
        <Reveal>
            <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 mt-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">D-Secure Circular Economy Enablement</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                    D-Secure provides the security foundation for device reuse programs, complete with carbon impact reporting for ESG disclosures.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                        <HeartIcon className="w-6 h-6 text-green-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Carbon Calculator</h4>
                        <p className="text-xs text-slate-600">Measure emissions avoided through reuse</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                        <ShieldIcon className="w-6 h-6 text-green-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Certified Erasure</h4>
                        <p className="text-xs text-slate-600">Secure enough for resale/donation</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                        <GlobeIcon className="w-6 h-6 text-green-600 mb-2" filled={true} />
                        <h4 className="font-bold text-slate-900 text-sm mb-1">ESG Reporting</h4>
                        <p className="text-xs text-slate-600">Automated Scope 3 metrics</p>
                    </div>
                </div>
            </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
             <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Reduce Your Scope 3 Footprint</h2>
                <p className="leading-relaxed mb-6">
                    Enable device reuse and report measurable carbon reductions in your ESG disclosures.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <HeartIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Calculate Your Carbon Savings
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
          <EngagementSection blogId="scope3-emissions" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="scope3-emissions" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="scope3-emissions" 
            blogTitle="Scope 3 Emissions & Device Reuse" 
          />
        </Reveal>
      </section>
    </div>
  );
};

export default React.memo(Scope3EmissionsBlog);
