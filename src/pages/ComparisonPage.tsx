import { useEffect } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

export default function ComparisonPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead seo={getSEOForPage("comparison")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20 lg:py-28">
        <div className="container-responsive">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Lifecycle Governance vs. Legacy Erasure
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Understand the architectural and operational differences between
              D-Secure’s programmatic Lifecycle Governance platform and
              traditional, ad-hoc wiping utilities.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <section className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                The Paradigm Shift in Data Sanitization
              </h2>
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="py-4 px-6 text-lg font-bold text-slate-900 w-1/4">
                      Operational Vector
                    </th>
                    <th className="py-4 px-6 text-lg font-bold text-brand w-3/8 bg-slate-50 rounded-tl-xl rounded-tr-xl">
                      D-Secure (Lifecycle Governance)
                    </th>
                    <th className="py-4 px-6 text-lg font-bold text-slate-500 w-3/8">
                      Legacy Erasure Utilities
                    </th>
                  </tr>
                </thead>
                <tbody className="text-lg text-slate-700">
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold">
                      Operational Scope
                    </td>
                    <td className="py-5 px-6 font-medium text-slate-900 bg-brand/5">
                      Centralized, enterprise-wide data hygiene programs.
                    </td>
                    <td className="py-5 px-6 text-slate-500">
                      Isolated, ad-hoc disk wiping on unmanaged devices.
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold">
                      Verification Engine
                    </td>
                    <td className="py-5 px-6 font-medium text-slate-900 bg-brand/5">
                      Cryptographically signed, tamper-proof Certificates of
                      Destruction stored in immutable ledgers.
                    </td>
                    <td className="py-5 px-6 text-slate-500">
                      Basic text or unencrypted PDF logs susceptible to manual
                      modification or loss.
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold">
                      Compliance Posture
                    </td>
                    <td className="py-5 px-6 font-medium text-slate-900 bg-brand/5">
                      Automated audit alignment with NIST 800-88, GDPR Article
                      17, and SOC 2 asset disposal frameworks.
                    </td>
                    <td className="py-5 px-6 text-slate-500">
                      Manual adherence checking; lacks built-in regulatory
                      framework mapping.
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold">
                      Deployment Architecture
                    </td>
                    <td className="py-5 px-6 font-medium text-slate-900 bg-brand/5">
                      Cloud Consoles, PXE Network Boot, On-Premise Air-Gapped
                      Servers, and OTA Endpoint Agents.
                    </td>
                    <td className="py-5 px-6 text-slate-500">
                      Often requires physical USB boot drives (Sneakernet
                      deployments) with no central command.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold rounded-bl-xl">
                      Ecosystem Integration
                    </td>
                    <td className="py-5 px-6 font-medium text-slate-900 bg-brand/5 rounded-br-xl">
                      RESTful APIs for seamless integration into ITSM platforms
                      (ServiceNow) and ITAD ERP systems.
                    </td>
                    <td className="py-5 px-6 text-slate-500">
                      Standalone execution requiring manual data transfer and siloed
                      reporting.
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <div className="mt-12 bg-slate-900 rounded-2xl p-10 text-center text-white shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Beyond Basic Erasure
              </h3>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Legacy wiping tools were designed to erase disks. D-Secure is
                architected to govern data lifecycles—providing organizations with
                the operational oversight necessary to mitigate breach liabilities
                and effortlessly pass compliance audits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
