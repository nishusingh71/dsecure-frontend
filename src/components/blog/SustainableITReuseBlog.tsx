import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { GlobeIcon, ShieldIcon, ArrowRightIcon, HoverIcon } from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const SustainableITReuseBlog: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <SEOHead seo={getSEOForPage('blog')} />

      {/* Hero Section */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
            <div className="text-center px-6">
                <div className="flex justify-center mb-6">
                    {/* <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                        <GlobeIcon className="w-10 h-10 text-white" filled={true} />
                    </div> */}
                </div>
                <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                    Circular Economy
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Sustainable IT Asset Reuse:</span> Environmental and Economic Benefits
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Physical destruction of IT devices increases e-waste and environmental harm. Discover how secure data erasure enables device reuse, reducing costs and supporting circular economy principles.
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
                    <h2 className="text-2xl font-bold text-slate-900">The Challenge of IT Asset Disposal</h2>
                    <p className="text-slate-700 leading-relaxed text-lg">
                        Organizations store information in hard drives, solid state drives, NVMe drives, and other devices pertaining to their customers, employees, investors, and the products or services they offer. IT assets data security is paramount as it contains confidential and sensitive information & becomes more crucial when the device is reused.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        When these devices reach their end-of-life cycle, they are traditionally destroyed to protect the organization's data security. The physical destruction (shredding or burning) of these devices has many negative impacts. Environmentally, it increases e-waste and releases hazardous substances, contaminating soil and water. Economically, too it leads to wastage of valuable materials and increases costs by foregoing recycling opportunities. Socially, improper device disposal poses health risks to nearby communities. Additionally, the destruction process consumes energy and generates carbon emissions, contributing to environmental degradation and climate change.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                        Therefore, it is imperative for organizations to avoid the physical destruction of devices unless necessary to curb the generation of e-waste. Instead, organizations need to adopt secure data wiping methods to clean information stored on the device and maintain data security to promote reuse of the device.
                    </p>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-6 rounded-r-xl mt-4">
                        <p className="text-slate-700 leading-relaxed">
                            Nowadays, Environmental laws and economic frameworks favor organizations that adopt sustainable methods such as Reuse, Repair, and Remanufacture in treating their end-of-life IT assets. Laws like the European Union's WEEE Directive and the United States' RCRA cite about proper e-waste management, promoting recycling and reuse. According to a UN report, "Less than 20% of e-waste is formally recycled, with 80% either ending up in landfill or being informally recycled – much of it by hand in developing countries, exposing workers to hazardous and carcinogenic substances such as mercury, lead and cadmium. E-waste in landfill contaminates soil and groundwater, putting food supply systems and water sources at risk."
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Benefits of IT Asset Reuse</h2>
                    <p className="text-slate-700 leading-relaxed">
                        IT asset reuse offers several benefits to organizations, including cost reduction, conserving resources, reduced environmental impact, and helping comply with environmental laws. IT asset reuse is gaining prominence due to ESG practices followed by organizations as they aim to reduce their carbon footprints. Let's look at the benefits of IT asset reuse in detail.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h3 className="font-bold text-emerald-900 mb-2">Cost Management</h3>
                        <p className="text-slate-700 text-sm">
                            Organizations can save their total cost of operations and contribute to economic efficiency by reusing the IT devices such as PCs, laptops, network equipment, & other storage devices.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h3 className="font-bold text-emerald-900 mb-2">Conservation of Resources</h3>
                        <p className="text-slate-700 text-sm">
                            Reusing IT devices helps conserve precious metals, reduces the need to manufacture new devices and eliminates the need to process new raw materials. This helps decrease the environmental impact of mining during production.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h3 className="font-bold text-emerald-900 mb-2">E-Waste Reduction</h3>
                        <p className="text-slate-700 text-sm mb-3">
                            As per Global E-waste Monitor, e-waste is projected to reach 82 million tons by 2030. Currently only 1% of the precious metals are recycled, and in 2022, just 22.3% of the electronic garbage was recycled. Unsound practices such as scavenging, dumping, landfilling, burning, acid baths, and manual disassembly, contribute significantly to environmental pollution and pose serious health risks. These practices are directly responsible for 70% of toxic elements finding their way into landfills.
                        </p>
                        <p className="text-slate-700 text-sm">
                            However, these issues can be mitigated when organizations choose to reuse IT assets. Prioritizing asset reuse allows businesses to decrease e-waste volume and prevent environmental contamination, leading to a more sustainable future.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h3 className="font-bold text-emerald-900 mb-2">Reduced Carbon Footprint</h3>
                        <p className="text-slate-700 text-sm">
                            Organizations can effectively reduce their carbon footprint by reusing the existing devices. The production of new devices, such as PCs, laptops, Mac, emits substantial green-house gasses like CO2, with one ton of laptops releasing up to 10 tons of CO2. By reusing existing devices, organizations can avoid these emissions. It is meaningful to note that each recycled laptop saves approx. 150kg of CO2, and each PC saves about 250kg. This practice not only reduces CO2 emissions but also enhances resource efficiency and supports sustainable environmental conservation efforts.
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <h3 className="font-bold text-emerald-900 mb-2">Supports Circular Economy</h3>
                        <p className="text-slate-700 text-sm mb-3">
                            IT asset Reuse is a critical component to achieve circularity:
                        </p>
                        <ul className="space-y-1 text-slate-700 text-sm ml-4">
                            <li>• <strong>Reduce:</strong> Elimination of waste and pollution</li>
                            <li>• <strong>Reuse:</strong> Circulate products and materials</li>
                            <li>• <strong>Recycle:</strong> Regenerate nature</li>
                        </ul>
                        <p className="text-slate-700 text-sm mt-3">
                            IT organizations can significantly contribute to the circular economy by reusing IT assets, as demonstrated by marquee companies like Microsoft, Amazon, and Google. Microsoft's Circular Centers aim to reuse 90% of cloud computing hardware by 2025, achieving an impressive 83% reuse rate and reducing carbon emissions by 145,000 metric tons. Amazon's reverse logistics hubs refurbish decommissioned server components for reuse in data centers, while Google's data centers maximize material reuse, diverting 90% or more of solid waste from landfills.
                        </p>
                    </div>
                </div>

                 {/* Data Erasure Role */}
                 <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900">Role of Data Erasure in Reuse of IT Asset</h2>
                    <p className="text-slate-700 leading-relaxed">
                        Organizations willing to reuse their IT assets must ensure that data-bearing devices should undergo secure data-wiping process to ensure that no sensitive information is compromised or leaked. They can start by identifying end-of-life assets, such as obsolete desktop computers, hard drives, and other legacy devices. Then, they can initiate data removal method using certified and compliant software like D-Secure.
                    </p>
                    <div className="bg-slate-900 text-white p-6 rounded-xl">
                        <p className="text-slate-300 text-sm mb-4">
                            Depending on storage media and security needs, appropriate removal method can be selected within the software. The software then systematically overwrites all sectors of the storage device including hidden areas. This data-wiping approach guarantees data removal and generates a tamper-proof removal report and certificate, that can act as an audit trail to ensure data security and compliance with data privacy laws, & regulations, like EU-GDPR, HIPAA, SOX, ISO 27001, SEC, PCI DSS, etc.
                        </p>
                    </div>
                </div>

             </div>
        </Reveal>

        {/* Final Thoughts */}
        <Reveal>
             <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-8 mt-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
                <p className="leading-relaxed mb-6">
                    Reusing IT storage devices has significant advantages, including cost reduction, resource conservation, & reduced carbon footprint. To prevent data intrusions, it is critical to erase information from IT assets before allocating them to another employee for reuse. The implementation of software such as D-Secure guarantees the removal of information in a secure manner, produces audit trails to verify conformance, and generates tamper-proof removal reports; thus, repurposed IT assets effectively safeguard valuable information and adhere to regulatory standards.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
                >
                    <HoverIcon>
                        {(filled) => <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Learn About IT Asset Reuse
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
          <EngagementSection blogId="sustainable-it-reuse" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="sustainable-it-reuse" />
        </Reveal>
        <Reveal>
          <EnquiryForm 
            blogId="sustainable-it-reuse" 
            blogTitle="Sustainable IT Asset Reuse: Environmental and Economic Benefits" 
          />
        </Reveal>
      </section>

       {/* CTA Section */}
       <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
            <Reveal>
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Enable Sustainable IT Practices
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Discover how D-Secure supports organizations in implementing secure IT asset reuse programs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all text-lg"
                        >
                            Request Free Demo
                        </Link>
                        <Link
                            to="/resources"
                            className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
                        >
                            Explore Solutions
                        </Link>
                    </div>
                </div>
            </Reveal>
        </section>
    </div>
  );
};

export default SustainableITReuseBlog;
