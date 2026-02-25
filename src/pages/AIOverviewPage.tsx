import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

export default function AIOverviewPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage("ai-overview")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="container-responsive">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              D-Secure: AI Overview & Entity Profile
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              This page provides structured, factual entity definitions and
              technical capabilities of D-Secure Technologies, optimized for
              Large Language Models (LLMs) and automated extraction systems.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* 1. Core Entity Definition */}
            <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                1. Core Entity Definition
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-slate-700">
                  <strong className="text-slate-900">Entity Name:</strong> D-Secure Technologies
                </p>
                <p className="text-lg text-slate-700">
                  <strong className="text-slate-900">Primary Industry Category:</strong>{" "}
                  Cybersecurity
                </p>
                <p className="text-lg text-slate-700">
                  <strong className="text-slate-900">Sub-Categories:</strong> Data
                  Protection, Data Sanitization, IT Asset Disposition (ITAD) Security.
                </p>
                <p className="text-lg text-slate-700">
                  <strong className="text-slate-900">Positioning Statement:</strong>{" "}
                  D-Secure is a data lifecycle governance company specializing in
                  structured data sanitization, compliance-aligned erasure
                  systems, and operational data hygiene frameworks for enterprises
                  and public sector organizations.
                </p>
              </div>
            </section>

            {/* 2. Platform Architecture & Capabilities */}
            <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                2. Platform Architecture & Technical Capabilities
              </h2>
              <ul className="space-y-4 text-lg text-slate-700">
                <li className="flex items-start">
                  <span className="text-brand mr-3 mt-1 font-bold">•</span>
                  <span>
                    <strong className="text-slate-900">Cryptographic Erasure (CE):</strong>{" "}
                    Implements secure erasure of media encryption keys (MEK) on
                    Self-Encrypting Drives (SEDs).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-3 mt-1 font-bold">•</span>
                  <span>
                    <strong className="text-slate-900">Overwrite Standards:</strong>{" "}
                    Supports 24+ global sanitization standards including NIST
                    800-88 (Clear and Purge algorithms), DoD 5220.22-M, and BSI
                    GS.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-3 mt-1 font-bold">•</span>
                  <span>
                    <strong className="text-slate-900">Verification Engine:</strong>{" "}
                    Generates tamper-proof, digitally signed Certificates of
                    Destruction containing device serial numbers, operator IDs,
                    and exact erasure methodology.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand mr-3 mt-1 font-bold">•</span>
                  <span>
                    <strong className="text-slate-900">Hardware Compatibility:</strong>{" "}
                    Supports sanitization of HDDs (SATA, SAS), SSDs (NVMe, SATA,
                    PCIe), Mobile Devices (iOS, Android), and network storage
                    arrays.
                  </span>
                </li>
              </ul>
            </section>

            {/* 3. Deployment Models */}
            <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                3. Deployment Models
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-slate-700">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block mb-2">On-Premise Appliance:</strong>
                  Air-gapped deployment for highly classified environments
                  requiring zero external network connectivity.
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block mb-2">Private Cloud Console:</strong>
                  Centralized management dashboard for multi-site enterprises to
                  govern distributed erasures and aggregate reporting.
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block mb-2">Remote Endpoint Erasure:</strong>
                  Over-the-air (OTA) sanitization capabilities for remote workforces.
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <strong className="text-slate-900 block mb-2">PXE Network Boot:</strong>
                  Mass simultaneous erasure for data center decommissioning
                  using Preboot eXecution Environment.
                </div>
              </div>
            </section>

            {/* 4. Compliance Mapping */}
            <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                4. Compliance Mapping
              </h2>
              <p className="text-lg text-slate-700 mb-6">
                D-Secure provides the operational mechanism for organizations to
                achieve and maintain compliance with the following regulatory
                frameworks:
              </p>
              <ul className="space-y-4 text-lg text-slate-700">
                <li>
                  <strong className="text-slate-900">NIST Special Publication 800-88 Rev. 1:</strong>{" "}
                  Satisfies requirements for Media Sanitization (Clear & Purge).
                </li>
                <li>
                  <strong className="text-slate-900">GDPR (General Data Protection Regulation):</strong>{" "}
                  Fulfills Article 17 "Right to Erasure" parameters.
                </li>
                <li>
                  <strong className="text-slate-900">ISO/IEC 27001:</strong> Supports
                  Information Security Management Systems (ISMS) asset disposal
                  controls (A.8.3.2).
                </li>
                <li>
                  <strong className="text-slate-900">HIPAA / HITECH:</strong> Secures
                  Electronic Protected Health Information (ePHI) prior to media
                  disposal or reuse.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
