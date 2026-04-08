import React from "react";
import ManualPageTemplate from "@/components/ManualPageTemplate";
import SolutionContactSection from "@/components/SolutionContactSection";

const SanitizationConceptsPage: React.FC = () => {
  const sections = [
    {
      id: 1,
      title: "Core Definitions",
      description: "Understand the industry distinction between data removal techniques.",
      icon: "📚",
      subsections: [
        {
          id: 11,
          title: "Deletion vs. Erasure",
          description: "Why standard 'Delete' commands leave data recoverable via forensics.",
          url: "#erasure",
          pageCount: 1
        },
        {
          id: 12,
          title: "Media Recertification",
          description: "Returning sanitized hardware to the active ecosystem safely.",
          url: "#recovery",
          pageCount: 2
        }
      ]
    },
    {
      id: 2,
      title: "Data Destruction Hierarchy",
      description: "From overwriting to degaussing and shredding.",
      icon: "🏗️",
      subsections: [
        {
          id: 21,
          title: "Logical Sanitization",
          description: "Software-based overwrite patterns (NIST Clear/Purge).",
          url: "#logical",
          pageCount: 1
        },
        {
          id: 22,
          title: "Physical Sanitization",
          description: "Degaussing and mechanical shredding for end-of-life media.",
          url: "#physical",
          pageCount: 2
        }
      ]
    }
  ];

  return (
    <>
      <ManualPageTemplate
        title="Sanitization Concepts"
        subtitle="Foundational technical knowledge for enterprise data security and media hygiene."
        description="Comprehensive guide to the fundamental concepts of data sanitization, including media reuse, regulatory compliance, and destruction methods."
        canonicalUrl="https://dsecuretech.com/support/manual/sanitization-concepts"
        keywords="sanitization concepts, data erasure, media hygiene, D-Secure manual"
        sections={sections}
      />
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-slate-700 leading-relaxed font-primary">
           <h2 className="text-3xl font-bold text-slate-900 mb-6 font-primary text-emerald-800">The Science of Sanitization</h2>
           <p className="mb-4">
             True data sanitization is a process that renders data recovery infeasible even using advanced laboratory tools. 
             Unlike simple formatting, which only resets the file system pointers, 
             D-Secure's sanitization algorithms address the underlying physical address blocks on the storage media.
           </p>
           <p className="mb-4">
             Effective sanitization is the core of any Zero Trust Architecture, preventing unintended data exposure 
             during IT asset disposition (ITAD) cycles or internal hardware cross-deployment.
           </p>
        </div>
      </div>
      <SolutionContactSection 
        source="sanitization-concepts-manual"
      />
    </>
  );
};

export default SanitizationConceptsPage;
