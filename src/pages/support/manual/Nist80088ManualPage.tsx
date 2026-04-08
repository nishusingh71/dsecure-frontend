import React from "react";
import ManualPageTemplate from "@/components/ManualPageTemplate";
import SolutionContactSection from "@/components/SolutionContactSection";

const Nist80088ManualPage: React.FC = () => {
  const sections = [
    {
      id: 1,
      title: "Sanitization Methods",
      description: "Understand the three NIST-defined methods for data erasure.",
      icon: "📋",
      subsections: [
        {
          id: 11,
          title: "Clear Operations",
          description: "Basic overwrite patterns for logical media separation.",
          url: "#clear",
          pageCount: 2
        },
        {
          id: 12,
          title: "Purge Operations",
          description: "Cryptographic and firmware-level commands for deep sanitization.",
          url: "#purge",
          pageCount: 3
        }
      ]
    },
    {
      id: 2,
      title: "Verification & Documentation",
      description: "Meeting the strict audit requirements for NIST compliance.",
      icon: "📜",
      subsections: [
        {
          id: 21,
          title: "Certificate Requirements",
          description: "Mandatory fields for a NIST-compliant Certificate of Erasure.",
          url: "#cert",
          pageCount: 1
        },
        {
          id: 22,
          title: "Independent Verification",
          description: "Internal and third-party audit trails for sanitization cycles.",
          url: "#verify",
          pageCount: 2
        }
      ]
    }
  ];

  return (
    <>
      <ManualPageTemplate
        title="NIST 800-88 Compliance Guide"
        subtitle="The definitive technical manual for implementing NIST 800-88 Rev. 1 sanitization standards across your enterprise."
        description="Detailed guide on NIST 800-88 compliant media sanitization methods, including Clear, Purge, and Destroy techniques for all storage media."
        canonicalUrl="https://dsecuretech.com/support/manual/nist-800-88"
        keywords="NIST 800-88, data sanitization, media destruction, clear purge destroy, D-Secure manual"
        sections={sections}
      />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-slate-700">
           <h2 className="text-3xl font-bold text-slate-900 mb-6 font-primary">NIST 800-88 Technical Standards</h2>
           <p className="mb-4">
             NIST Special Publication 800-88 Revision 1 is currently the most widely accepted global standard for media sanitization. 
             It recognizes that logical deletion is insufficient for protecting sensitive organizational data.
           </p>
           <p className="mb-6">
             <span className="font-bold">Clear:</span> Applies programmatic techniques to sanitize storage locations for protection against simple, non-invasive data recovery.{" "}
             <span className="font-bold">Purge:</span> Applies physical or logical techniques that render target data recovery infeasible using state-of-the-art laboratory techniques.
           </p>
        </div>
      </div>
      <SolutionContactSection 
        source="nist-800-88-manual"
      />
    </>
  );
};

export default Nist80088ManualPage;
