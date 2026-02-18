import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import {
  ShieldIcon,
  ClipboardIcon,
  ArrowRightIcon,
  HoverIcon,
} from "@/components/FlatIcons";
import EngagementSection from "./EngagementSection";
import CommentSection from "./CommentSection";
import EnquiryForm from "./EnquiryForm";

const WipeSSDFromBIOSGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <SEOHead seo={getSEOForPage("blog-wipe-ssd-from-bios")} />

      {/* Hero */}
      <section className="py-16 bg-white shadow-lg">
        <Reveal>
          <div className="text-center px-6">
            <span className="inline-block px-4 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">
              Technical Guide
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                How to Wipe SSD from BIOS
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Learn how Secure Erase works in BIOS, its limitations, and when
              organizations should use professional data erasure software for
              compliance and audit readiness.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Content */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-12">
        <Reveal>
          <div className="bg-white rounded-xl shadow-md border border-slate-200/50 p-8 space-y-10">
            {/* Intro */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                1. Why SSD Data Erasure Requires Special Attention
              </h2>

              <p className="text-slate-700 leading-relaxed text-lg">
                Solid State Drives (SSDs) are widely used in laptops, desktops,
                servers, and Mac devices due to their speed, durability, and
                reliability. As a result, SSDs often store large volumes of
                sensitive and confidential data.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Before reallocating, reselling, donating, or recycling devices,
                organizations commonly rely on the Secure Erase feature
                available in the system BIOS. While convenient, this approach
                has important limitations that businesses must understand.
              </p>
            </div>

            {/* Secure Erase BIOS */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                2. Using the Secure Erase Feature in BIOS
              </h2>

              <p className="text-slate-700 leading-relaxed">
                Secure Erase is an inbuilt functionality available in UEFI BIOS
                that allows users to erase internal storage devices. Depending
                on the system manufacturer, the feature may appear under
                different names and menu locations.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Although Secure Erase can remove user data from SSDs, it does
                not generate erasure reports and may not address hidden areas
                such as HPA (Host Protected Area) and DCO (Device Configuration
                Overlay).
              </p>
            </div>

            {/* BIOS Vendor Table */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                Secure Erase Options by Manufacturer (BIOS)
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-3 text-left font-semibold">
                        Manufacturer
                      </th>
                      <th className="border border-slate-300 p-3 text-left font-semibold">
                        BIOS Menu Name
                      </th>
                      <th className="border border-slate-300 p-3 text-left font-semibold">
                        Notes / Limitations
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-300 p-3">Lenovo</td>
                      <td className="border border-slate-300 p-3">
                        Security Erase HDD Data
                      </td>
                      <td className="border border-slate-300 p-3">
                        SSD password must be set to enable Secure Erase
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-300 p-3">HP</td>
                      <td className="border border-slate-300 p-3">
                        Secure Erase / Disk Sanitizer
                      </td>
                      <td className="border border-slate-300 p-3">
                        Limited reporting, internal drives only
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">Dell</td>
                      <td className="border border-slate-300 p-3">
                        Data Wipe / Secure Erase
                      </td>
                      <td className="border border-slate-300 p-3">
                        No audit proof generated
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border border-slate-300 p-3">ASUS</td>
                      <td className="border border-slate-300 p-3">
                        Secure Erase Tool
                      </td>
                      <td className="border border-slate-300 p-3">
                        Feature availability varies by model
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-slate-300 p-3">Acer</td>
                      <td className="border border-slate-300 p-3">
                        HDD/SSD Secure Erase
                      </td>
                      <td className="border border-slate-300 p-3">
                        Not suitable for bulk erasure
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Limitations */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                3. Limitations of BIOS-Based Secure Erase
              </h2>

              <ul className="space-y-3 text-slate-700">
                <li>• No erasure reports or certificates are generated</li>
                <li>• Hidden SSD areas may not be wiped</li>
                <li>• Cannot wipe multiple drives simultaneously</li>
                <li>• Suitable mainly for individual or personal use</li>
              </ul>
            </div>

            {/* Professional Erasure */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                4. Erasing SSDs Using Professional Data Wiping Software
              </h2>

              <p className="text-slate-700 leading-relaxed">
                Professional data erasure software like D-Secure provides a
                scalable and compliant alternative to BIOS-based Secure Erase.
                It supports a wide range of SSD types, including NVMe, SAS,
                SED, and enterprise-grade drives.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                Secure Erase (BIOS) vs D-Secure Data Erasure
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-3">Parameter</th>
                      <th className="border border-slate-300 p-3">
                        Secure Erase (BIOS)
                      </th>
                      <th className="border border-slate-300 p-3">
                        D-Secure Data Erasure
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3">Hidden Areas (HPA/DCO)</td>
                      <td className="border p-3">Not Guaranteed</td>
                      <td className="border p-3">Fully Erased</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border p-3">Erasure Standards</td>
                      <td className="border p-3">Limited</td>
                      <td className="border p-3">
                        NIST 800-88, DoD, and more
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-3">Erasure Reports</td>
                      <td className="border p-3">No</td>
                      <td className="border p-3">
                        Tamper-proof certificates
                      </td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="border p-3">Scalability</td>
                      <td className="border p-3">Single device</td>
                      <td className="border p-3">
                        Bulk & network-based wiping
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-3">Compliance</td>
                      <td className="border p-3">Not audit-ready</td>
                      <td className="border p-3">Audit & compliance ready</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 mt-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Choose the Right SSD Erasure Method
            </h2>
            <p className="leading-relaxed mb-6">
              While BIOS Secure Erase is useful for personal use, organizations
              should rely on certified data erasure solutions to meet regulatory
              and audit requirements.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition shadow-lg"
            >
              <HoverIcon>
                {(filled) => (
                  <ShieldIcon className="w-5 h-5 mr-2" filled={filled} />
                )}
              </HoverIcon>
              Explore D-Secure Solutions
              <HoverIcon>
                {(filled) => (
                  <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />
                )}
              </HoverIcon>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Engagement */}
      <section className="w-full px-4 md:px-8 lg:px-16 py-8">
        <Reveal>
          <EngagementSection blogId="wipe-ssd-from-bios" />
        </Reveal>
        <Reveal>
          <CommentSection blogId="wipe-ssd-from-bios" />
        </Reveal>
        <Reveal>
          <EnquiryForm
            blogId="wipe-ssd-from-bios"
            blogTitle="How to Wipe SSD from BIOS"
          />
        </Reveal>
      </section>
    </div>
  );
};

export default WipeSSDFromBIOSGuide;
