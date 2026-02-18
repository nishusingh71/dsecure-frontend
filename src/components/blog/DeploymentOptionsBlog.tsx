import React from "react";
import EnquiryForm from "./EnquiryForm";
import CommentSection from "./CommentSection";
import EngagementSection from "./EngagementSection";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage, getBlogSEO } from '@/utils/seo';
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const DeploymentOptionsBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getBlogSEO({
        title: "Data Erasure Deployment Options",
        excerpt: "Comparing on-premise, cloud, and hybrid deployment options for data erasure solutions.",
        slug: "deployment-options",
        author: "Nitesh Kushwaha",
        publishDate: "May 17, 2025",
        keywords: "deployment, on-premise, cloud, hybrid",
        category: "Guide",
        tag: "Technical"
      })} />

            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Deployment
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            Flexible Deployment Options for D-Secure Drive Eraser
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Explore various deployment methods tailored to your specific requirements and device types for effective data erasure.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">
                        <p className="text-slate-700 leading-loose text-xl">
                            Businesses use a wide variety of devices for storing and processing data, such as laptops, MacBooks, Chromebooks, and servers. These devices have inherently different architectures and security protocols that require <strong className="text-emerald-600">tailored deployment strategies</strong> for data erasure software.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg">
                            D-Secure Drive Eraser addresses the erasure needs of organizations looking to perform data wiping both onsite and remotely. Each variant is deployed using different methods tailored to specific requirements and device types, ensuring effective data erasure across all device categories.
                        </p>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Deployment Options</h2>

                        <div className="space-y-8">
                            <div className="border-l-4 border-emerald-500 pl-8 py-4">
                                <h3 className="font-bold text-slate-900 text-2xl mb-4">1. Using a Bootable USB</h3>
                                <p className="text-slate-700 text-lg leading-loose mb-4">
                                    Both D-Secure Drive Eraser Cloud and Offline variants can be deployed using a bootable USB to erase PCs, laptops, and servers.
                                </p>

                                <h4 className="font-bold text-emerald-700 text-lg mb-3 mt-6">For PCs, Laptops, and Servers:</h4>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Login to D-Secure Cloud Console</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Download the D-Secure Drive Eraser ISO image</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Create a bootable USB using an application like Rufus</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Boot the device using the D-Secure bootable USB</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Connect to the internet and fetch licenses</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Select drives to erase and click Erase</li>
                                </ul>

                                <h4 className="font-bold text-emerald-700 text-lg mb-3 mt-6">For MacBooks:</h4>
                                <p className="text-slate-700 text-lg leading-loose mb-3">
                                    Mac devices have different security protocols, so we use the Mac variant of D-Secure Drive Eraser to wipe Mac with M3, M2, M1, T2, T1 chips:
                                </p>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Login and download D-Secure Drive Eraser for Mac from the Cloud console</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Initiate via the D-Secure USB creator application</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Boot the Mac device with the bootable USB</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Connect to the internet and get licenses</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Perform Erasure</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-4">
                                <h3 className="font-bold text-slate-900 text-2xl mb-4">2. Using PXE Boot</h3>
                                <p className="text-slate-700 text-lg leading-loose mb-4">
                                    With this method, you can erase up to <strong>65,000 drives</strong> (in chassis or servers) and up to <strong>254 devices</strong> (PC, Laptop) connected over a network.
                                </p>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Download the D-Secure Drive Eraser Network Cloud variant ISO file from the Cloud console</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Configure the PXE Server to enable PXE boot for required network services</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Connect client devices to the network and boot via PXE</li>
                                    <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2"></span>Perform bulk erasure across all connected devices</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-emerald-500 pl-8 py-4">
                                <h3 className="font-bold text-slate-900 text-2xl mb-4">3. Remote Deployment (MSI Package)</h3>
                                <p className="text-slate-700 text-lg leading-loose mb-4">
                                    For remote Windows endpoint devices, D-Secure can be deployed using an MSI package, enabling erasure without physical access to the device.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">Key Benefits</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Flexibility</h4>
                                <p className="text-white/90 text-sm">Choose the deployment method that best suits your infrastructure and requirements</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Scalability</h4>
                                <p className="text-white/90 text-sm">From single devices to thousands of drives simultaneously</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Broad Support</h4>
                                <p className="text-white/90 text-sm">Works with PCs, Macs, servers, and Chromebooks</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <h4 className="font-bold text-lg mb-3">Remote Capability</h4>
                                <p className="text-white/90 text-sm">Erase devices without physical access</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Conclusion</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            D-Secure Drive Eraser offers flexible deployment options to meet diverse organizational needs. Whether you need to erase a single device or thousands of drives across a network, D-Secure provides the tools and flexibility to ensure secure, compliant data erasure.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Deploy D-Secure Your Way
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Choose the deployment method that works best for your organization's needs.
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
          <EngagementSection blogId="deployment-options" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="deployment-options" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="deployment-options" 
            blogTitle="Deployment Options" 
          />
        </Reveal>
      </section>

    </div>
  );

};

export default React.memo(DeploymentOptionsBlog);






