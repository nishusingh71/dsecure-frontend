import React from "react";
import ManualPageTemplate from "@/components/ManualPageTemplate";
import SolutionContactSection from "@/components/SolutionContactSection";

const LicenseTroubleshootingPage: React.FC = () => {
  const sections = [
    {
      id: 1,
      title: "Activation Errors",
      description: "Resolve common issues with Cloud and Offline activation keys.",
      icon: "🔑",
      subsections: [
        {
          id: 11,
          title: "Invalid Product Key",
          description: "Verify key format and case-sensitivity for Enterprise licenses.",
          url: "#invalid",
          pageCount: 1
        },
        {
          id: 12,
          title: "Connection Timed Out",
          description: "Check firewall ports 443 and 80 for D-Secure license verification servers.",
          url: "#connection",
          pageCount: 2
        }
      ]
    },
    {
      id: 2,
      title: "Seat Management",
      description: "Manage multiple machine activations on a single corporate account.",
      icon: "🏢",
      subsections: [
        {
          id: 21,
          title: "Exceeded Maximum Seats",
          description: "Deactivate decommissioned machines to free up license slots.",
          url: "#seats",
          pageCount: 1
        },
        {
          id: 22,
          title: "Offline License Validation",
          description: "Download manual validation files for air-gapped environments.",
          url: "#offline",
          pageCount: 3
        }
      ]
    }
  ];

  return (
    <>
      <ManualPageTemplate
        title="License Troubleshooting"
        subtitle="Quickly resolve license activation and seat management issues for uninterrupted data sanitization."
        description="Comprehensive guide to troubleshooting D-Secure software licensing, including offline activation and server connectivity."
        canonicalUrl="https://dsecuretech.com/support/manual/license-troubleshooting"
        keywords="license troubleshooting, activation errors, seat management, offline activation, D-Secure support"
        sections={sections}
      />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
           <h2 className="text-3xl font-bold text-slate-900 mb-6">Technical Troubleshooting Flow</h2>
           <p className="text-slate-700 mb-6 font-medium">
             If you encounter a "License Validation Failed" error, please verify that your machine has direct HTTPS access 
             to <code>license.dsecuretech.com</code>.
           </p>
           <p className="text-slate-700 mb-4">
             In secure air-gapped operations, use the <b>Manual Challenge Response</b> method. Generate a <code>.req</code> 
             file from the D-Secure Admin Console and upload it to the Customer Portal from an internet-enabled device.
           </p>
        </div>
      </div>
      <SolutionContactSection 
        source="license-troubleshooting-manual"
      />
    </>
  );
};

export default LicenseTroubleshootingPage;
