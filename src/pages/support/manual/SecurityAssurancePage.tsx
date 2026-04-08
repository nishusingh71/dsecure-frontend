import React from "react";
import ManualPageTemplate from "@/components/ManualPageTemplate";
import SolutionContactSection from "@/components/SolutionContactSection";

const SecurityAssurancePage: React.FC = () => {
  const sections = [
    {
      id: 1,
      title: "Integrity Measures",
      description: "How D-Secure guarantees the immutability of erasure logs.",
      icon: "🛡️",
      subsections: [
        {
          id: 11,
          title: "Cryptographic Tamper-Proofing",
          description: "Digital signatures and hashing for secure audit trails.",
          url: "#integrity",
          pageCount: 1
        },
        {
          id: 12,
          title: "Central Data Store",
          description: "Encrypted transmission to the global intelligence hub.",
          url: "#store",
          pageCount: 2
        }
      ]
    },
    {
      id: 2,
      title: "Compliance & Auditing",
      description: "Meeting international standards for security assurance.",
      icon: "🕵️",
      subsections: [
        {
          id: 21,
          title: "Regulatory Mapping",
          description: "Aligning results with GDPR, HIPAA, and SEC requirements.",
          url: "#compliance",
          pageCount: 1
        },
        {
          id: 22,
          title: "Third-Party Validation",
          description: "Independent security audits for the D-Secure engine.",
          url: "#audit",
          pageCount: 2
        }
      ]
    }
  ];

  return (
    <>
      <ManualPageTemplate
        title="Security Assurance"
        subtitle="Ensuring the highest levels of data security and cryptographic integrity for enterprise sanitization."
        description="Comprehensive guide to the security measures, data integrity principles, and audit assurance for the D-Secure ecosystem."
        canonicalUrl="https://dsecuretech.com/support/manual/security-assurance"
        keywords="security assurance, data integrity, immutable audit, cryptographic signing, D-Secure manual"
        sections={sections}
      />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-slate-700 leading-relaxed font-primary">
           <h2 className="text-3xl font-bold text-slate-900 mb-6 font-primary text-emerald-800">Assurance Framework</h2>
           <p className="mb-4">
             The D-Secure Security Assurance Framework is designed to prevent "Shadow Sanitization" where data is claimed 
             erased but remains on the media. Our engine performs bit-level verification with a minimum of 10% sampling 
             across the entire logical block area.
           </p>
           <p className="mb-4 bg-teal-50 p-6 border-l-4 border-teal-500 rounded-r-lg italic">
             "Trust, but verify." Every erasure in D-Secure is cryptographically hashed and digitally signed 
             at the hardware level before being transmitted to the central audit hub.
           </p>
        </div>
      </div>
      <SolutionContactSection 
        source="security-assurance-manual"
      />
    </>
  );
};

export default SecurityAssurancePage;
