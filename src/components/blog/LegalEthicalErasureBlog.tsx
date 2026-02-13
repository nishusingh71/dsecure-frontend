import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const LegalEthicalErasureBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getSEOForPage('blog')} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Ethics & Compliance
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            The Legal and Ethical Dimensions of Data Erasure
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Explore the legal and ethical aspects of data erasure to ensure data confidentiality, compliance, customer trust, and sustainability goals.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Legal Aspects of Data Erasure</h2>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            Most global data protection laws grant individuals (data subjects) the right to get their data deleted or erased. Although this right is referenced by diverse names, the core connotation remains the same:
                        </p>
                        <ul className="space-y-3 text-slate-700 text-lg">
                            <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span><strong>'Right to Delete'</strong> in Section 1798.105 of CCPA</li>
                            <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span><strong>'Right to Erasure'</strong> in UK Data Protection Act 2018</li>
                            <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span><strong>'Right to Destruction'</strong> in Article 4(5) of Saudi Arabia's PDPL</li>
                            <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span><strong>'Right to be Forgotten'</strong> in Article 17 of EU-GDPR</li>
                        </ul>

                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-lg mt-6">
                            <h4 className="font-bold text-slate-900 text-xl mb-3">Penalties for Non-Compliance</h4>
                            <ul className="space-y-2 text-slate-700">
                                <li>• EU-GDPR: Up to €20 million or 4% of annual turnover, whichever is higher</li>
                                <li>• UK-GDPR: Up to £17.5 million or 4% of total worldwide annual turnover</li>
                                <li>• CCPA: $7,500 per intentional violation, $2,500 per unintentional violation</li>
                                <li>• PDPL: Up to 5 million Saudi Riyals (approximately €1.2 million) per violation</li>
                            </ul>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ethical Aspects of Data Erasure</h2>
                        <p className="text-slate-700 leading-loose text-lg mb-6">
                            Organizations have a responsibility to manage data ethically throughout its entire lifecycle, from creation to destruction, regardless of whether they are governed by data protection laws.
                        </p>

                        <div className="space-y-6">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Data Privacy and Fairness</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Organizations must ensure that the confidentiality of data is maintained to provide individuals complete privacy. Methods like data anonymization can help support fair and unbiased processing of data.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Stakeholder and Customer Trust</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    It is important to earn trust with stakeholders, external parties, and customers by ethically handling their sensitive data. A lack of transparency regarding data erasure can encourage them to discontinue investing in the company.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Meet Long-term Sustainability Goals</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Organizations have an inherent accountability to create a sustainable impact. Prioritizing ethical ways to destroy IT assets decreases contribution to e-waste generation, reducing carbon footprint. Device reuse over device destruction helps address growing e-waste challenges.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Brand Reputation</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    When an organization keeps data beyond the retention period without consent or after the purpose is no longer relevant, it reflects negatively on brand image and reputation.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Benefits of Adhering to Legal & Ethical Aspects</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Reducing Data Breach Risk</h4>
                                <p className="text-white/90 text-sm">Lawful, transparent, and legitimate processing of personal data reduces vulnerabilities</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Protection from Fines</h4>
                                <p className="text-white/90 text-sm">Avoid fines and lawsuits by implementing industry-best cybersecurity policies</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Increased Business Opportunities</h4>
                                <p className="text-white/90 text-sm">Reputation for ethical practices brings more opportunities to innovate and expand</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Customer Trust</h4>
                                <p className="text-white/90 text-sm">Earn trust of partners and stakeholders through commitment to ethical data handling</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            Organizations must adhere to both legal and ethical aspects of data erasure. Following ethical data erasure practices and complying with legal requirements benefits businesses by reducing data breach risks, protecting from fines, increasing business opportunities, and building customer trust.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Embrace Legal & Ethical Data Erasure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Implement trusted data erasure practices with D-Secure to meet legal requirements and ethical standards.
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
        </div>
    );
};

export default LegalEthicalErasureBlog;






