import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const DoDWipingStandardBlog: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-teal-50">
            <SEOHead seo={getSEOForPage('blog')} />

            {/* Hero Section - Full Width */}
            <section className="py-16 bg-white shadow-lg">
                <Reveal>
                    <div className="text-center px-6">
                        <span className="inline-block px-4 py-1 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                            Data Erasure Standards
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                            DoD 5220.22-M: The Secure Wiping Standard Explained
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                            Master the DoD 5220.22-M algorithm — a proven, credible, and widely recognized secure wiping method used across industries for permanent data destruction from hard disk drives.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* Main Content - Full Width */}
            <section className="w-full px-4 md:px-8 lg:px-16 py-12">
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 space-y-8">

                        {/* Introduction */}
                        <div className="space-y-6">
                            <p className="text-slate-700 leading-loose text-xl">
                                Media sanitization — commonly referred to as <strong className="text-emerald-600">data sanitization</strong> — is crucial for organizations to prevent leakage of confidential and sensitive data from storage media including hard drives, USB flash storage, and servers. Failure to properly wipe data when releasing storage hardware from custody can expose company sensitive information and lead to devastating data breaches with millions in penalties.
                            </p>
                            <p className="text-slate-700 leading-loose text-lg">
                                Data destruction standards like DoD 5220.22-M by NISPOM outline specific processes for performing data wipes on hard drives, SSDs, and other storage media. These standards define the number of overwrite passes, overwriting patterns, and verification methods required to erase data beyond any possibility of recovery before devices are redeployed, recycled, resold, or discarded.
                            </p>
                        </div>

                    </div>
                </Reveal>

                {/* What is DoD Standard */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            What is the DoD 5220.22-M Standard?
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            DoD 5220.22-M, also known as the National Industrial Security Program Operating Manual (NISPOM), is a media sanitization standard established by the U.S. Department of Defense. It outlines regulatory measures and normative practices for sanitizing information systems and storage media used to store classified information.
                        </p>

                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 mt-6">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">Core Methodology</h3>
                            <p className="text-slate-700 text-lg leading-loose">
                                The standard recommends overwriting all addressable memory locations with a character, its complement, then a random character, followed by verification to clear and sanitize information on the storage media completely.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* The Wiping Process */}
                <Reveal>
                    <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg p-10 mt-10 text-white">
                        <h2 className="text-3xl font-bold mb-6">The DoD 5220.22-M Data Wiping Process</h2>

                        <p className="leading-loose text-lg mb-6">
                            The Department of Defense 5220.22-M uses three overwrite passes (0s, 1s, Random) with a 100% verification pass. In 2001, the DoD 5220.22-M ECE method — a 7-pass version — was published, running the standard twice with an additional pass between. However, the three-pass method remains the standard implementation.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 rounded-xl p-6">
                                <div className="text-3xl font-bold mb-3">Pass 1</div>
                                <h4 className="font-bold text-lg mb-2">Write Zeros</h4>
                                <p className="text-white/90 text-lg leading-loose">
                                    Writes a zero to all addressable locations and verifies the write was successful.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <div className="text-3xl font-bold mb-3">Pass 2</div>
                                <h4 className="font-bold text-lg mb-2">Write Ones</h4>
                                <p className="text-white/90 text-lg leading-loose">
                                    Writes a one to all addressable locations and verifies the write was successful.
                                </p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-6">
                                <div className="text-3xl font-bold mb-3">Pass 3</div>
                                <h4 className="font-bold text-lg mb-2">Random + Verify</h4>
                                <p className="text-white/90 text-lg leading-loose">
                                    Writes a random character to all locations and performs final verification.
                                </p>
                            </div>
                        </div>

                        <p className="leading-loose text-lg mt-6">
                            Some variations use different characters, complements, and verification frequencies. For example, an altered version uses the number 97 instead of a random character for the final pass.
                        </p>
                    </div>
                </Reveal>

                {/* Clearing and Sanitization Matrix */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Clearing and Sanitization Matrix (CSM)
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            The DoD 5220.22-M specifies different 'clear' and 'sanitize' methods for various types of storage media. Understanding these recommendations helps organizations choose the appropriate approach for their specific hardware.
                        </p>

                        <div className="overflow-x-auto mt-6">
                            <table className="w-full border-collapse text-lg">
                                <thead>
                                    <tr className="bg-emerald-50">
                                        <th className="border border-slate-200 p-4 text-left font-bold text-slate-900">Method</th>
                                        <th className="border border-slate-200 p-4 text-left font-bold text-slate-900">Description</th>
                                        <th className="border border-slate-200 p-4 text-left font-bold text-slate-900">Applicable Media</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-slate-200 p-4 font-medium">Destroy</td>
                                        <td className="border border-slate-200 p-4">Disintegrate, incinerate, pulverize, shred, or melt</td>
                                        <td className="border border-slate-200 p-4">All media types</td>
                                    </tr>
                                    <tr className="bg-slate-50">
                                        <td className="border border-slate-200 p-4 font-medium">Overwrite</td>
                                        <td className="border border-slate-200 p-4">Overwrite all addressable locations with pattern + complement + random, verify</td>
                                        <td className="border border-slate-200 p-4">Magnetic media</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-200 p-4 font-medium">Full Chip Erase</td>
                                        <td className="border border-slate-200 p-4">Execute per manufacturer's datasheets</td>
                                        <td className="border border-slate-200 p-4">EEPROM, EAPROM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Reveal>

                {/* Advantages */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Advantages of the DoD 5220.22-M Algorithm
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            The DoD 5220.22-M algorithm has long been recognized as a reliable and secure method for erasing data from traditional hard disk drives. Known for its credibility and widespread use across industries, it remains one of the most frequently referenced data-wiping standards due to its established legacy.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Efficient Processing</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    The three-pass overwrite process provides comprehensive, efficient wiping compared to other methods like the 35-pass Gutmann standard — particularly important when erasing large inventories of drives simultaneously.
                                </p>
                            </div>
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Verification Assurance</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    The final verification pass adds critical assurance to the data erasure process, confirming that all storage locations have been properly overwritten.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Important Considerations */}
                <Reveal>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            Important Considerations Before Using DoD 5220.22-M
                        </h2>

                        <div className="space-y-6">
                            <div className="border-l-4 border-amber-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Legacy Standard Limitations</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    DoD 5220.22-M is a legacy standard primarily designed for magnetic drives. Multiple overwrite passes are no longer recommended by NIST 800-88 or IEEE 2883:2022 for modern media.
                                </p>
                            </div>

                            <div className="border-l-4 border-amber-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Modern Storage Incompatibility</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    The standard does not support wiping of flash memory-based storage such as solid-state drives (SSDs), hybrid drives, or other modern storage technologies. For these devices, standards such as NIST SP 800-88 and IEEE 2883:2022 are more suitable.
                                </p>
                            </div>

                            <div className="border-l-4 border-amber-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Updated Guidance</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    Since 2014, the NISPOM guideline has recommended NIST SP 800-88 media sanitization guidelines as the primary guidance document. The Department of Defense no longer references DoD 5220.22 as the sole method for secure HDD wiping.
                                </p>
                            </div>

                            <div className="border-l-4 border-amber-500 pl-8 py-2">
                                <h3 className="font-bold text-slate-900 text-xl mb-3">Certification Clarity</h3>
                                <p className="text-slate-700 text-lg leading-loose">
                                    There is no official "DoD Certificate of Destruction." However, DoD-compliant data wiping software can generate certificates of erasure serving as auditable proof of data destruction.
                                </p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* How to Perform */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            How to Perform DoD Wiping with D-Secure
                        </h2>

                        <p className="text-slate-700 leading-loose text-lg">
                            "DoD wipe" means overwriting all addressable locations on a hard drive as per steps specified in the DoD 5220.22-M algorithm. D-Secure Drive Eraser performs wiping of drives using the DoD 5220.22-M standard along with many other international standards.
                        </p>

                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 mt-6">
                            <h3 className="font-bold text-slate-900 text-xl mb-4">D-Secure Capabilities</h3>
                            <ul className="space-y-3 text-slate-700 text-lg">
                                <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span>Select specific algorithm to overwrite storage locations per DoD 5220.22 patterns and passes</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span>Generates tamper-proof certificate and report of erasure for regulatory compliance</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span>Supports both 3-pass and 7-pass DoD methods</li>
                                <li className="flex items-start"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2.5"></span>Also includes NIST 800-88, IEEE 2883, and 20+ other international standards</li>
                            </ul>
                        </div>
                    </div>
                </Reveal>

                {/* Compliance Usage */}
                <Reveal>
                    <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-10 mt-10 space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">DoD Standard for Compliance</h2>
                        <p className="text-slate-700 leading-loose text-lg">
                            For organizations handling sensitive or regulated information, data disposal isn't just a routine task — it's a critical step in protecting both the business and customers. DoD wiping provides a trusted and verified method for data erasure, meeting one of the most stringent data security standards worldwide.
                        </p>
                        <p className="text-slate-700 leading-loose text-lg">
                            Companies in sectors like healthcare, finance, and government rely on DoD-compliant wiping solutions to ensure retired or repurposed devices no longer contain recoverable data. This helps mitigate risks, protect brand reputation, and maintain regulatory compliance.
                        </p>
                    </div>
                </Reveal>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-center">
                <Reveal>
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            DoD-Compliant Wiping with D-Secure
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Access DoD 5220.22-M, NIST 800-88, and 20+ international standards in one powerful solution. Get tamper-proof certificates for complete compliance.
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

export default DoDWipingStandardBlog;
