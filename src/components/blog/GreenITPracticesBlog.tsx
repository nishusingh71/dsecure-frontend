import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const GreenITPracticesBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "Green IT and Data Erasure",
        excerpt: "How data erasure supports green IT initiatives and environmental sustainability.",
        slug: "green-it-practices",
        author: "Prashant Saini",
        publishDate: "October 8, 2025",
        keywords: "green IT, sustainability, environmental",
        category: "Green IT",
        tag: "Sustainability"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Sustainability
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Green IT Practices: How IT Managers Drive Sustainability
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Explore how Green IT practices reduce e-waste, lower carbon emissions, save costs, and promote sustainability for a better future.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <p className="text-slate-700 leading-loose text-xl">
                            Global e-waste generation is estimated to increase by <strong className="text-emerald-600">32% to produce 82 million tonnes in 2030</strong>, as reported by the UN's fourth Global E-waste Monitor. The actual amount of e-waste generation is surpassing documented recycling by 5 times.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg">
                            Toxic substances released by burning or improper disposal of IT assets lead to pollution. Hazardous elements like lead and mercury can create neurodevelopmental and respiratory problems. However, <strong>Green IT practices</strong> can ensure a long-term solution in combating these issues.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Benefits of Green IT Practices</h2>

                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            The World Meteorological Organization (WMO) reports that during 2024-2028, global temperature will increase by 1.5°C above pre-industrial levels. Green IT practices can prove valuable in combating climate change:
                        </p>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Reduction of Carbon Emissions</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Energy consumed by data centers is predicted to contribute 3.2% of carbon emissions. Investment in Green IT practices can meet requirements of reduced carbon emissions while generating 100 million employment opportunities. More than half of the global GDP is dependent on nature.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Cost Savings</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Green IT practices help reduce overall operational costs with IT assets that consume less energy, generate low electricity bills, and reduce carbon footprints. Using advanced semiconductors in data centers can save significant energy — if all US data centers were equipped with them, energy savings would amount to 3.85 TWh, equal to reducing 3.15 million tons of CO2 emissions annually.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Promotes Sustainability</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Reusing and recycling IT assets supports sustainability. According to the United Nations, around 14 million tonnes of e-waste were generated in 2022, with most dumped in landfills. Each recycled laptop saves approximately <strong>150 kilograms of CO2</strong>, and each reused PC saves about <strong>250 kilograms</strong>.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Boosts Organization Brand Image</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Adopting Green IT practices validates an organization's commitment to sustainability. This plays a significant role in gaining customer trust, long-term loyalty, and building a green brand image.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">How IT Managers Drive Sustainability</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Data Erasure for Reuse</h4>
                                <p className="text-white/90 text-sm">Use certified data erasure software to wipe devices securely, enabling safe reuse and donation</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Energy-Efficient Infrastructure</h4>
                                <p className="text-white/90 text-sm">Implement energy-efficient servers and cooling systems in data centers</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Circular Economy</h4>
                                <p className="text-white/90 text-sm">Adopt circular economy principles: reduce, reuse, recycle, and recover</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Sustainable Procurement</h4>
                                <p className="text-white/90 text-sm">Choose vendors committed to environmental sustainability</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            Green IT practices are essential for combating climate change, reducing e-waste, and promoting sustainability. IT managers play a crucial role in driving this transformation by adopting data erasure for device reuse, implementing energy-efficient infrastructure, and supporting circular economy principles.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Drive Sustainability with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Enable secure device reuse and support your Green IT initiatives with certified data erasure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact" className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg">
                                Request Free Demo
                            </Link>
                            <Link to="/products" className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg">
                                View Products
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>

      {/* Engagement, Comments & Enquiry Section */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="green-i-t-practices" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="green-i-t-practices" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="green-i-t-practices" 
            blogTitle="Green I T Practices" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default React.memo(GreenITPracticesBlog);






