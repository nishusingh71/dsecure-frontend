import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const EUCSRDBlog: React.FC = () => {
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
                            EU Corporate Sustainability Reporting Directive Explained
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Understand EU-CSRD's scope, purpose, sustainability reporting standards, violation penalties, and recommendations to achieve compliance.
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
                                The <strong className="text-emerald-600">Corporate Sustainability Reporting Directive (CSRD)</strong> came into effect on January 5, 2023, presenting the European Sustainability Reporting Standard (ESRS) that sets new protocols for organizations to disclose non-financial information including sustainability data.
                            </p>
                            <p className="text-slate-700 leading-loose text-lg">
                                CSRD is applicable to EU-based large undertakings, listed small and medium-sized enterprises, and non-EU companies with turnover exceeding EUR 150 million in the EU market for two consecutive years. This directive will be implemented in four phases from 2024 to 2029.
                            </p>
                        </div>

                        {/* NFRD Replacement */}
                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-lg mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">Replacing NFRD</h3>
                            <p className="text-slate-700 leading-loose text-lg">
                                CSRD has replaced the Non-Financial Reporting Directive (NFRD) introduced in 2014. All EU-listed organizations with at least 500 employees that previously complied with NFRD are now required to comply with CSRD. Reports must be submitted in a single electronic format complying with ESRS, using the European Single Electronic Format taxonomy.
                            </p>
                        </div>

                    </div>
                </Reveal>

                {/* Key Provisions */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Key Provisions of CSRD
                        </h2>

                        <div className="space-y-8">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Expanded Reach & Applicability</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    CSRD applies to all large companies and EU-regulated market listed companies, except listed micro-enterprises. Additionally, it covers non-EU companies generating more than EUR 150 million in the EU market.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Detailed Reporting Requirements</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Companies must submit reports on environmental, social, and governance (ESG) factors — including climate change mitigation, resource use, circular economy practices, pollution, biodiversity, and social factors like employee human rights.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">ESRS Compliance</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    CSRD requires the use of European Sustainability Reporting Standards (ESRS) to ensure reported information is consistent, comparable, and aligned with EU policies.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Digital Reporting</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Organizations must prepare sustainability reports in digital format that is easily accessible for stakeholder analysis.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Double Materiality</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    CSRD mandates consideration of double materiality — checking both the impact of sustainability issues on the business and the business's impact on sustainability issues.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* ESRS Requirements */}
                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">European Sustainability Reporting Standards</h2>

                        <p className="leading-loose text-lg mb-8">
                            ESRS ensures reported information is accurate, relevant, clear, comparable, and verifiable without placing undue burden on businesses. The standards cover multiple areas:
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Environmental Factors</h4>
                                <ul className="space-y-2 text-white/90 text-sm">
                                    <li>• Pollution prevention</li>
                                    <li>• Climate change adaptation</li>
                                    <li>• Resource use efficiency</li>
                                    <li>• Biodiversity protection</li>
                                    <li>• Ecosystem preservation</li>
                                </ul>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Social Factors</h4>
                                <ul className="space-y-2 text-white/90 text-sm">
                                    <li>• Pay equity & gender equality</li>
                                    <li>• Working conditions</li>
                                    <li>• Work-life balance</li>
                                    <li>• Health & safety</li>
                                    <li>• Diversity & inclusion</li>
                                </ul>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Governance Factors</h4>
                                <ul className="space-y-2 text-white/90 text-sm">
                                    <li>• Anti-corruption measures</li>
                                    <li>• Whistleblower protection</li>
                                    <li>• Risk management systems</li>
                                    <li>• Business ethics</li>
                                    <li>• Stakeholder relationships</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Penalties Section */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Consequences of Non-Compliance
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            Member states are responsible for ensuring effective investigation and sanctioning systems for failures in statutory audits and sustainability reporting assurance. Non-compliant parties may face temporary bans of up to 3 years prohibiting them from conducting assurance or signing sustainability reports.
                        </p>

                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-8 mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">France Penalty Example</h3>
                            <p className="text-slate-700 text-sm mb-4">France was the first European country to incorporate CSRD into national law:</p>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg p-4">
                                    <h4 className="font-semibold text-emerald-700 text-lg mb-2">Failure to Appoint Auditor</h4>
                                    <ul className="space-y-1 text-slate-600 text-sm">
                                        <li>• Fine up to €30,000</li>
                                        <li>• Directors: up to 2 years imprisonment</li>
                                        <li>• Legal entities: up to €150,000</li>
                                    </ul>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <h4 className="font-semibold text-emerald-700 text-lg mb-2">Obstruction of Audits</h4>
                                    <ul className="space-y-1 text-slate-600 text-sm">
                                        <li>• Fine up to €75,000</li>
                                        <li>• Directors: up to 5 years imprisonment</li>
                                        <li>• Legal entities: up to €375,000</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* How to Comply */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Achieving Sustainability & CSRD Compliance
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg mb-8">
                            According to a Global CSRD survey by PwC, over 50% of businesses reporting under CSRD in 2025 see improved environmental performance and stakeholder engagement as benefits of sustainability reporting.
                        </p>

                        <div className="space-y-8">
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Appoint Chief Sustainability Officer</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    A CSO embeds sustainability into organizational culture and processes. By implementing sustainability-focused policies, identifying gaps, and driving initiatives, the CSO ensures compliance with sustainability indicators and drives long-term environmental and social impact.
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Switch to Energy-Saving Technology</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Energy solutions like solar panels, wind turbines, hydropower, and geothermal power utilize renewable sources as low-cost, high-energy alternatives. This supports the European Green Deal's vision of achieving climate-neutral status by 2050.
                                </p>
                            </div>

                            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                                <h3 className="font-bold text-emerald-700 text-xl mb-3">Promote Asset Reusability</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    IT assets that need replacement or have reached end-of-life can be donated after confidential data is permanently removed. Organizations must invest in proper data disposal using certified erasure tools like D-Secure that generate erasure reports and certificates for compliance with EU-GDPR, UK-GDPR, and BDSG. The software also provides ESG reports showing CO2 emissions saved through device reuse.
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Support Circular Economy</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    The circular economy model involves reusing, refurbishing, and recycling IT assets. By promoting IT asset reuse within the company across departments, businesses actively contribute to sustainability. Wiping data ensures permanent removal, making devices fit for secure reuse.
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Build Sustainable Supply Chains</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Organizations should select suppliers that follow ethical sourcing practices, minimize waste generation, reduce energy consumption, and maintain fair labor practices.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Conclusion */}
                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Summary</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            The EU Corporate Sustainability Reporting Directive (CSRD) raises the bar for businesses, requiring them to share a clearer picture of their environmental and social impact through robust ESG reporting. By adopting energy-saving technologies, reusing assets through secure data wiping, and building sustainable supply chains, companies can align with these standards.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg">
                            Beyond compliance, these efforts demonstrate commitment to protecting the planet and building trust with stakeholders — making sustainability a core part of doing business.
                        </p>
                    </div>
                </Reveal>

                {/* FAQs */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>

                        <div className="space-y-8">
                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What is EU-CSRD?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    EU-CSRD (Corporate Sustainability Reporting Directive) is a European Union directive that came into effect in January 2023. It requires companies to report on their environmental, social, and governance (ESG) performance using the European Sustainability Reporting Standards (ESRS).
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">Is the Non-Financial Reporting Directive (NFRD) still in force?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    NFRD has been replaced by CSRD. Companies previously compliant with NFRD must now transition to CSRD requirements, which include more detailed reporting standards, digital format requirements, and broader scope of applicability.
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What is meant by double materiality?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Double materiality requires organizations to disclose both how environmental and social factors affect their financial value, and how their business activities impact the environment and society. It's a two-way assessment of sustainability impact.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What are the penalties for violating CSRD?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Penalties vary by country based on how each member state incorporates CSRD into national law. They can include significant fines, director imprisonment, temporary bans on conducting sustainability assurance, and reports being deemed non-compliant. France, for example, can impose fines up to €375,000 and imprisonment up to 5 years for serious violations.
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
                            Achieve CSRD Compliance with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Promote asset reusability and support circular economy practices with certified data erasure solutions that generate ESG reports and compliance documentation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg"
                            >
                                Get Started Today
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

export default EUCSRDBlog;






