import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const ITADEnvironmentalBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
            <SEOHead seo={getBlogSEO({
        title: "Environmental Benefits of ITAD",
        excerpt: "How proper IT asset disposition contributes to environmental sustainability.",
        slug: "itad-environmental",
        author: "Nitesh Kushwaha",
        publishDate: "April 22, 2025",
        keywords: "ITAD, environment, e-waste, recycling",
        category: "Sustainability",
        tag: "ITAD"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Sustainability & ITAD
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                            How Environmental Concerns Are Driving the Growth of ITAD Industry
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Exploring how environmental sustainability has become a major catalyst for the expansion of IT Asset Disposition services and the circular economy.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">The Environmental Impact of E-Waste</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            Electronic waste is harmful, non-biodegradable, and accumulates in land, air, water, and living organisms in the environment. It poses a major risk because e-waste is directly responsible for more than <strong>70% of the hazardous compounds</strong> found in landfills.
                        </p>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
                            <h4 className="font-bold text-slate-900 text-xl mb-3">Dangerous Recovery Methods</h4>
                            <p className="text-lg text-slate-700 leading-loose">
                                Toxic substances are released into the environment when approaches like open-air burning and acid baths are employed to recover valuable elements from electronic components. This e-waste contains dangerous chemicals including lead, arsenic, cadmium, and mercury.
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">How E-Waste Pollutes Our Environment</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            End-of-life IT assets typically get dumped in landfills, where they create a chain of environmental damage:
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-lg mb-3">Land Pollution</h4>
                                <p className="text-slate-700">Toxic chemicals and non-biodegradable components seep into and pollute the land</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-lg mb-3">Air Pollution</h4>
                                <p className="text-slate-700">When e-waste is heated, toxic melted plastic fumes rise and pollute the atmosphere</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-lg mb-3">Water Pollution</h4>
                                <p className="text-slate-700">Hazardous chemicals from landfills seep downwards to pollute underground water</p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 text-center">
                                <h4 className="font-bold text-emerald-700 text-lg mb-3">Biodiversity Loss</h4>
                                <p className="text-slate-700">Rain causes polluted soil to release heavy metals into water systems, harming marine life</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">The R3 Principle: Repair, Recycle, Reuse</h2>
                        <p className="text-lg leading-loose mb-8">
                            Research from Arizona State University and Rochester Institute of Technology estimated that <strong>70% of the energy</strong> a typical laptop consumes during its lifespan is used in manufacturing. This makes repair, recycling, and reuse critical for environmental sustainability.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <h3 className="text-xl font-bold mb-3">Repair</h3>
                                <p className="text-white/90">Extend device lifespan through professional repair services</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <h3 className="text-xl font-bold mb-3">Recycle</h3>
                                <p className="text-white/90">Responsible recycling eliminates e-waste and promotes circular economy</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6 text-center">
                                <h3 className="text-xl font-bold mb-3">Reuse</h3>
                                <p className="text-white/90">Enable less privileged communities to access quality refurbished devices</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">How ITAD Services Drive Environmental Sustainability</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            Certified IT Asset Disposition companies play a crucial role in reducing environmental impact while helping businesses meet sustainability goals:
                        </p>
                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h4 className="font-bold text-emerald-700 text-xl mb-2">Compliance with Regulations</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Certified ITADs utilize systems and procedures that adhere to local, national, and international e-waste disposal legislation and best practices.
                                </p>
                            </div>
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h4 className="font-bold text-emerald-700 text-xl mb-2">Data Sanitization Over Destruction</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    ITADs opt for data sanitization instead of physical destruction as a last resort. This approach destroys data irreversibly while rendering devices reusable.
                                </p>
                            </div>
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h4 className="font-bold text-emerald-700 text-xl mb-2">Residual Value Recovery</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Once media devices have been sanitized, they can be resold, donated, or repurposed. Businesses can derive residual value while reducing mining burden and energy costs.
                                </p>
                            </div>
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h4 className="font-bold text-emerald-700 text-xl mb-2">Component Recycling</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Even when devices are too old for reuse, motherboards and chips may contain reusable parts. Various materials can be melted and repurposed.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">The Circular Economy and ITAD</h2>
                        <p className="text-lg text-slate-700 leading-loose mb-6">
                            A circular economy produces and consumes goods that prioritize sharing, reusing, repairing, and recycling already manufactured goods for as long as possible. ITADs are the catalyst for achieving this sustainable model.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                                <h4 className="font-bold text-emerald-700 text-xl mb-3">Market Growth</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    At a CAGR of 12%, the global IT asset disposal market was estimated at USD 18,572 million in 2021 and is anticipated to rise to <strong>USD 51,377 million by 2030</strong>.
                                </p>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                                <h4 className="font-bold text-emerald-700 text-xl mb-3">Recycling Gap</h4>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Only <strong>17% of the 53.6 million tonnes</strong> of e-waste produced in 2019 was recycled. ITADs have the potential to bring about massive increases in IT asset recycling.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Profitability Meets Sustainability</h2>
                        <p className="text-lg text-slate-700 leading-loose">
                            ITADs have made profitability and sustainability work hand in hand — transforming this once-unheard combination into reality. As leaders in environmentally sustainable IT asset disposition, certified ITADs significantly reduce e-waste pollution and pave the way for a better future.
                        </p>
                        <p className="text-lg text-slate-700 leading-loose font-semibold mt-4">
                            It's time for businesses to look beyond conventional methods and adopt an ecological approach to waste management. Environmental concerns and evolving technology will continue to drive the growth of the IT Asset Disposition industry.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Build a Sustainable IT Asset Strategy
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Partner with D-Secure for environmentally responsible data erasure that maximizes asset value while minimizing environmental impact.
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
          <EngagementSection blogId="i-t-a-d-environmental" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="i-t-a-d-environmental" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="i-t-a-d-environmental" 
            blogTitle="I T A D Environmental" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default React.memo(ITADEnvironmentalBlog);
