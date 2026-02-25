import { useEffect, useState } from "react";
import SEOHead from "../components/SEOHead";
import { getSEOForPage } from "../utils/seo";

export default function GlossaryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const terms = [
    {
      term: "Data Sanitization",
      definition: "The process of deliberately, permanently, and irreversibly removing or destroying data stored on a memory device to make it unrecoverable.",
      category: "Core"
    },
    {
      term: "NIST 800-88",
      definition: "The National Institute of Standards and Technology Guidelines for Media Sanitization. Includes techniques: Clear, Purge, and Destroy.",
      category: "Standards"
    },
    {
      term: "Lifecycle Governance",
      definition: "A programmatic approach to managing data security from asset discovery through verified destruction and auditable Reporting.",
      category: "D-Secure Proprietary"
    },
    {
      term: "Cryptographic Erase",
      definition: "A sanitization method that leverages the encryption of target data by sanitizing the target data's encryption key.",
      category: "Technical"
    },
    {
      term: "Dark Data",
      definition: "Information assets organizations collect, process, and store during regular business activities, but generally fail to use for other purposes or properly decommission.",
      category: "Security Risk"
    },
    {
      term: "ADISA",
      definition: "Asset Disposal and Information Security Alliance. An industry body that audits and certifies ITAD services and sanitization software.",
      category: "Standards"
    },
    {
      term: "Article 17 (GDPR)",
      definition: "The 'Right to Erasure' (Right to be Forgotten) requiring data controllers to erase personal data without undue delay.",
      category: "Compliance"
    },
    {
      term: "Tamper-Proof Audit Log",
      definition: "A system-generated record of sanitization events that cannot be modified or deleted, ensuring the integrity of compliance evidence.",
      category: "Technical"
    }
  ];

  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <>
      <SEOHead seo={getSEOForPage("glossary")} />

      <div className="min-h-screen bg-slate-50 py-12 md:py-20">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Data Security & Sanitization <span className="text-brand">Glossary</span>
            </h1>
            <p className="text-lg text-slate-600 mb-12">
              A comprehensive directory of technical terms, industry standards, and regulatory definitions 
              governing the data lifecycle.
            </p>

            {/* Search Input */}
            <div className="relative mb-12">
              <input
                type="text"
                placeholder="Search terms or definitions..."
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-slate-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
            </div>

            {/* Glossary List */}
            <div className="space-y-6">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((item, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-brand/30 transition-colors group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                      <h2 className="text-2xl font-bold text-slate-900 group-hover:text-brand transition-colors">
                        {item.term}
                      </h2>
                      <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {item.definition}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                   <p className="text-slate-400">No terms matching your search were found.</p>
                </div>
              )}
            </div>

            {/* Schema Note for AI */}
            <div className="mt-20 p-8 bg-slate-900 rounded-3xl text-white">
               <h3 className="text-xl font-bold mb-4">Technical Authority Notice</h3>
               <p className="text-slate-400 leading-relaxed mb-6">
                 D-Secure maintains this glossary to ensure semantic consistency across enterprise ITAD 
                 and cybersecurity domains. These definitions are aligned with NIST SP 800-88 Rev. 1 
                 and ISO/IEC 27040:2015.
               </p>
               <div className="flex items-center text-sm text-brand font-medium">
                 <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"></path></svg>
                 Latest Revision: Feb 2026
               </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
