import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const Scope3EmissionsBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getSEOForPage('blog')} />

            {/* Hero Section */}
            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Sustainability
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Device Reuse: A Key Strategy for Scope 3 Emissions Reduction
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Learn how D-Secure helps reduce Scope 3 emissions by promoting IT asset reuse, significantly minimizing the environmental impact of producing new devices.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* Main Content */}
            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">

                        {/* Introduction */}
                        <div className="space-y-6">
                            <p className="text-slate-700 leading-loose text-xl">
                                Growing concerns about climate change have increased pressure on governments and businesses worldwide to <strong className="text-emerald-600">cut carbon emissions</strong> — whether Scope 1, 2, or Scope 3 emissions. By extending IT device lifecycle through reuse, companies can reduce emissions associated with manufacturing, transportation, and disposal.
                            </p>
                        </div>

                        {/* Scope Definitions */}
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Scope 1 Emissions</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Direct greenhouse gas emissions from organizational-owned sources or activities.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Scope 2 Emissions</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Indirect emissions from purchased electricity, steam, heat, or cooling.
                                </p>
                            </div>
                            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                                <h4 className="font-bold text-emerald-700 text-lg mb-3">Scope 3 Emissions</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Indirect emissions across the value chain, including goods, services, employee commutes, and supplier activities.
                                </p>
                            </div>
                        </div>

                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-lg mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">Key Insight</h3>
                            <p className="text-slate-700 leading-loose text-lg">
                                According to McKinsey, Scope 3 emissions account for up to <strong className="text-emerald-600">90% of the total organizational carbon footprint</strong>. While these emissions occur outside direct organizational control, extending IT device lifecycles through reuse significantly reduces associated environmental impact.
                            </p>
                        </div>

                    </div>
                </Reveal>

                {/* How Scope 3 Emissions Get Generated */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            How Scope 3 Emissions Are Generated
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            Scope 3 emissions originate from indirect activities across an organization's value chain:
                        </p>

                        <div className="space-y-8 mt-8">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Goods & Services Used</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Lifetime emissions of products and services — from manufacturing and transportation to packaging and disposal — contribute to Scope 3 emissions. This includes emissions from software manufacturers, cloud service providers, and cybersecurity solution providers.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Employee Travel</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Greenhouse emissions from daily commuting and business travel form part of Scope 3 emissions. Volume varies depending on transportation mode — bicycles, motorcycles, cars, buses, or trains.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Organizational Waste Disposal</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    All organic, inorganic, electronic, and plastic waste generated by a business — including discarded stationery, packaging, IT equipment, food leftovers, and old furniture. Transportation, sorting, and disposal emissions all contribute.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* How Device Reuse Reduces Emissions */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            How IT Device Reuse Reduces Scope 3 Emissions
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            Reusing IT assets extends operational lifespan and minimizes fresh production needs. The second-hand market, nonprofit organizations, public schools, and libraries receive donated IT assets as part of Corporate Social Responsibility activities and donation campaigns.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 text-white text-center">
                                <span className="text-4xl font-bold">30%</span>
                                <p className="text-white/90 mt-2">Emissions reduction by extending laptop life by 2 years</p>
                            </div>
                            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-xl p-6 text-white text-center">
                                <span className="text-4xl font-bold">80%</span>
                                <p className="text-white/90 mt-2">of total emissions occur during manufacturing phase</p>
                            </div>
                        </div>

                        <p className="text-slate-600 text-sm mt-4 text-center italic">
                            Source: TCO CERTIFIED — global sustainability certification body
                        </p>
                    </div>
                </Reveal>

                {/* Calculation Example */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Real-World Impact: Emission Calculation Example
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            On average, a computer produces 200-300 Kg of CO₂e during manufacturing and around 50 Kg CO₂e per year during operations. Let's calculate potential savings for an organization with 500 laptops:
                        </p>

                        <div className="bg-slate-100 rounded-xl p-8 mt-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg mb-4">3-Year Refresh Cycle</h4>
                                    <ul className="space-y-2 text-slate-700 text-lg">
                                        <li>• Manufacturing: 100,000 Kg CO₂e</li>
                                        <li>• Operations: 75,000 Kg CO₂e</li>
                                        <li className="font-bold text-emerald-600">• Total: 175,000 Kg CO₂e</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-lg mb-4">5-Year Refresh Cycle (Reuse)</h4>
                                    <ul className="space-y-2 text-slate-700 text-lg">
                                        <li>• Manufacturing: 100,000 Kg CO₂e</li>
                                        <li>• Operations: 125,000 Kg CO₂e</li>
                                        <li className="font-bold text-emerald-600">• Savings: 100,000 Kg CO₂e avoided</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <p className="text-slate-700 leading-loose text-lg mt-6">
                            With a 5-year refresh cycle, manufacturing emissions of 100,000 Kg are avoided for 500 laptops — that's 200 kg CO₂e saved per laptop by delaying replacement.
                        </p>
                    </div>
                </Reveal>

                {/* Benefits of Reuse */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Additional Benefits of Device Reuse
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Reduced Raw Material Mining</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Decreases the need to mine, extract, and transport materials like Gold, Silver, Copper, Cadmium, and Mercury used in manufacturing chips, circuits, and connectors.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Lower Manufacturing Energy</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Energy consumed during manufacturing is significantly reduced. Since many manufacturers depend on fossil fuels, Scope 3 emissions are lowered substantially.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Landfill Prevention</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Reuse prevents IT devices from ending up in landfills, avoiding release of hazardous minerals like lead, cadmium, mercury, arsenic, and zinc into the environment.
                                </p>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Component Recycling</h4>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Reusing working components in faulty devices promotes recycling, further reducing emissions and e-waste generation.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Circular IT Practices */}
                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Role of Circular IT Practices</h2>
                        <p className="leading-loose text-lg mb-6">
                            By adopting circular economy practices including device reuse, companies reduce Scope 3 emissions, lower costs, and enhance sustainability reporting. Investing in green IT practices helps organizations reduce environmental impact considerably.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Secure Data Sanitization</h4>
                                <p className="text-white/90">
                                    Logical data sanitization using D-Secure helps IT Asset Managers safely reuse IT devices without fear of data compromise or leakage.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Sustainability Reporting</h4>
                                <p className="text-white/90">
                                    Organizations reporting Scope 3 emissions can demonstrate concrete reductions through documented device reuse and data erasure practices.
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/products"
                            className="inline-flex items-center bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-lg"
                        >
                            Explore D-Secure Solutions
                        </Link>
                    </div>
                </Reveal>

                {/* FAQs */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>

                        <div className="space-y-8">
                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What are Scope 3 emissions?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Scope 3 emissions are indirect greenhouse gas emissions across an organization's value chain — including goods and services used, employee commutes, business travel, waste disposal, and supplier activities. They typically account for up to 90% of total organizational carbon footprint.
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What contributes to Scope 3 emissions?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Key contributors include manufacturing and transportation of purchased goods, employee travel and commuting, organizational waste disposal, and activities across the entire supply chain. Software manufacturers, cloud providers, and service providers also contribute to business Scope 3 emissions.
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">How does reusing IT assets help reduce Scope 3 emissions?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Reusing IT assets extends device lifecycles, reducing emissions from manufacturing new equipment. Extending laptop life by just 2 years can reduce emissions by 30%. Reuse also decreases raw material mining, manufacturing energy consumption, and landfill waste.
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What is the broader impact of device reuse?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Device reuse supports circular economy principles, reduces e-waste generation, lowers operational costs, enhances sustainability reporting, and prevents hazardous materials from entering landfills. It also enables charitable donations to educational institutions and nonprofit organizations.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">How does D-Secure support Scope 3 emissions reduction?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    D-Secure enables secure data erasure that allows IT devices to be safely reused without data compromise risks. By making device reuse practical and secure, organizations can extend equipment lifecycles and significantly reduce their Scope 3 emissions profile.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Reduce Your Scope 3 Emissions with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Enable secure IT device reuse and significantly lower your organization's environmental footprint. D-Secure makes sustainable IT practices practical and secure.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg"
                            >
                                Request Free Demo
                            </Link>
                            <Link
                                to="/products"
                                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                            >
                                View Products
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </section>
        </div>
    );
};

export default Scope3EmissionsBlog;






