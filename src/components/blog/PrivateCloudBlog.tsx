import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const PrivateCloudBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getSEOForPage('blog')} />

            {/* Hero Section */}
            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Cloud Solutions
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            D-Secure Private Cloud: Benefits & Features Explained
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Discover how D-Secure Private Cloud enables secure license and user management within private networks — without requiring internet connectivity.
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
                                D-Secure's suite of products for data erasure, diagnostics, and verification provides users the flexibility to <strong className="text-emerald-600">store reports and certificates on its cloud server</strong>. Using the D-Secure Public Cloud Console, IT admins and technicians can create, manage, and edit users, create user pools, and distribute licenses based on business requirements.
                            </p>
                            <p className="text-slate-700 leading-loose text-lg">
                                D-Secure Public Cloud is a secure platform hosted on premium cloud infrastructure. However, some organizations have restrictive cybersecurity policies that do not permit hosting information on public cloud servers — including erasure reports and certificates.
                            </p>
                        </div>

                        {/* Private Cloud Solution */}
                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-lg mt-8">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">The Private Cloud Solution</h3>
                            <p className="text-slate-700 leading-loose text-lg">
                                Under these circumstances, D-Secure customers can opt to host the Cloud Console on their private network and internally manage erasure licenses and reports. This setup operates on a yearly subscription model, providing complete control over your data erasure infrastructure.
                            </p>
                        </div>

                    </div>
                </Reveal>

                {/* What is Private Cloud */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Understanding D-Secure Private Cloud
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            D-Secure Private Cloud is a rendition of D-Secure Cloud Console deployed on organizational internal network infrastructure. It functions identically to the Public Cloud Console — the only difference being the servers on which it's hosted.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-slate-50 rounded-xl p-6">
                                <h4 className="font-bold text-slate-900 text-lg mb-3">Public Cloud</h4>
                                <ul className="space-y-2 text-slate-600 text-lg">
                                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>Hosted on premium cloud infrastructure</li>
                                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>Maintained by D-Secure team</li>
                                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>Requires internet connectivity</li>
                                </ul>
                            </div>
                            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                                <h4 className="font-bold text-emerald-700 text-lg mb-3">Private Cloud</h4>
                                <ul className="space-y-2 text-slate-600 text-lg">
                                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>Hosted on your infrastructure</li>
                                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>Managed by your IT team</li>
                                    <li className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>No internet required</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Use Case Example */}
                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Real-World Use Case</h2>
                        <p className="leading-loose text-lg mb-6">
                            Consider an MSP organization providing cloud services to banks, including hosting bank websites with access to private financial information. The organization has multiple data centers to wipe during upgrades, spread across the country and connected over a network.
                        </p>

                        <div className="bg-white/10 rounded-xl p-6 mb-6">
                            <h4 className="font-bold text-lg mb-3">The Challenge</h4>
                            <p className="text-white/90">
                                Organizational policy prohibits internet connectivity at these data centers for security purposes. Without internet, the Public Cloud is inaccessible, and using offline variants requires storing erasure reports on local systems — making the process complicated and requiring physical presence at each location.
                            </p>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6">
                            <h4 className="font-bold text-lg mb-3">The Solution</h4>
                            <p className="text-white/90">
                                With D-Secure Private Cloud, the organization can perform network-based erasure operations across all data centers, store reports on their own server for anytime access, and maintain complete control over the entire process — all without internet connectivity.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* Benefits Section */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Key Benefits of D-Secure Private Cloud
                        </h2>

                        <div className="space-y-8">
                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Centralized Management</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    D-Secure Private Cloud provides system admins access to software licenses for D-Secure Drive Eraser. Admins can manage users from a centralized location over the network without internet access. They can perform drive and device erasure over the company network using the private cloud console.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Digital License Repository</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Admins can store erasure licenses in digital form on their Private Cloud. Product licenses can be transferred from offline USB to the Private Cloud, enabling streamlined license distribution to individual users or user pool groups.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Remote Erasure Capabilities</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    System admins can leverage OOB (Out Of Band) communication channels to remotely access and erase servers. Dell servers can be accessed via iDRAC (Integrated Dell Remote Access Controller); HPE servers can be erased via iLO (Integrated Lights-Out). Remote and centralized wiping enables cost reduction, improved server management, and simplified compliance.
                                </p>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Scalability via PXE Boot</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    D-Secure Drive Eraser can be deployed over WAN or LAN via PXE to perform simultaneous erasures of multiple devices. The software ISO file is mounted on a virtual drive and deployed to erase up to 65,000 drives simultaneously — saving time and standardizing the erasure process across all locations.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Comparison Table */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Private Cloud vs Public Cloud Comparison
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-emerald-500">
                                        <th className="py-4 px-4 text-lg font-bold text-slate-900">Feature</th>
                                        <th className="py-4 px-4 text-lg font-bold text-slate-900">Public Cloud</th>
                                        <th className="py-4 px-4 text-lg font-bold text-emerald-600">Private Cloud</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-700 text-lg">
                                    <tr className="border-b border-slate-200">
                                        <td className="py-4 px-4 font-medium">Hosting Location</td>
                                        <td className="py-4 px-4">Premium cloud infrastructure</td>
                                        <td className="py-4 px-4">Your internal infrastructure</td>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <td className="py-4 px-4 font-medium">Maintenance</td>
                                        <td className="py-4 px-4">D-Secure team</td>
                                        <td className="py-4 px-4">Your IT team</td>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <td className="py-4 px-4 font-medium">Internet Required</td>
                                        <td className="py-4 px-4">Yes</td>
                                        <td className="py-4 px-4">No</td>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <td className="py-4 px-4 font-medium">Data Control</td>
                                        <td className="py-4 px-4">Shared responsibility</td>
                                        <td className="py-4 px-4">Complete internal control</td>
                                    </tr>
                                    <tr className="border-b border-slate-200">
                                        <td className="py-4 px-4 font-medium">Subscription Model</td>
                                        <td className="py-4 px-4">Included with licenses</td>
                                        <td className="py-4 px-4">Yearly subscription</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 font-medium">Best For</td>
                                        <td className="py-4 px-4">Standard deployments</td>
                                        <td className="py-4 px-4">Air-gapped networks, strict policies</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Reveal>

                {/* FAQs */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>

                        <div className="space-y-8">
                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">What is D-Secure Private Cloud?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    D-Secure Private Cloud is a self-hosted version of the D-Secure Cloud Console that runs on your organization's internal network infrastructure. It provides the same functionality as the Public Cloud but operates entirely within your private network without requiring internet connectivity.
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">Why would an organization choose D-Secure Private Cloud?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Organizations typically choose Private Cloud when they have strict data security policies that prohibit hosting information on public cloud servers. This is common in financial services, healthcare, government, and other regulated industries where data must remain within internal networks.
                                </p>
                            </div>

                            <div className="border-b border-slate-200 pb-6">
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">How can organizations move from Public Cloud to Private Cloud?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Organizations can contact the D-Secure support team to explore Private Cloud options. The team will assess your infrastructure requirements, help plan the migration, and provide the necessary setup support to deploy the Private Cloud on your network.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 text-xl mb-3">Is internet connectivity required for D-Secure Private Cloud?</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    No, internet connectivity is not required for D-Secure Private Cloud. This is one of its primary advantages — it operates entirely on your internal network, making it ideal for air-gapped environments and data centers where internet access is restricted for security reasons.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Summary */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Summary</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            D-Secure Private Cloud provides organizations with complete control over their data erasure infrastructure. By hosting the cloud console on internal networks, organizations can maintain strict security policies while still benefiting from centralized license management, remote erasure capabilities, and scalable deployment options.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg">
                            Whether your organization requires bulk erasure across network-connected data centers or needs to comply with air-gapped security requirements, D-Secure Private Cloud delivers enterprise-grade data erasure capabilities without compromising on security.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready for D-Secure Private Cloud?
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Explore how D-Secure Private Cloud can meet your organization's unique security requirements for data erasure and license management.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg"
                            >
                                Contact Our Team
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

export default PrivateCloudBlog;






