import React, { useState, memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQsPage: React.FC = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "general", name: "General" },
    { id: "technical", name: "Technical" },
    { id: "data-erasure", name: "Data Erasure" },
    { id: "licensing", name: "Licensing" },
    { id: "devices", name: "Devices" },
    { id: "security", name: "Security" }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "What is D-Secure and what does it do?",
      answer: "D-Secure is a comprehensive data erasure solution that provides secure deletion of sensitive data from various storage devices including HDDs, SSDs, smartphones, and enterprise servers. It ensures data cannot be recovered using advanced overwriting techniques that comply with international standards like NIST 800-88 and DoD 5220.22-M.",
      category: "general"
    },
    {
      id: 2,
      question: "How many overwrites should I do on a Hard Drive?",
      answer: "For traditional HDDs, we recommend 3 overwrites using the DoD 5220.22-M standard. However, for modern drives, a single secure overwrite is typically sufficient. For SSDs, cryptographic erasure is more effective than multiple overwrites due to wear leveling and over-provisioning.",
      category: "data-erasure"
    },
    {
      id: 3,
      question: "Can I wipe SSDs the same way as HDDs?",
      answer: "No, SSDs require different erasure methods due to their NAND flash memory architecture. Traditional overwriting is less effective on SSDs. Instead, use ATA Secure Erase commands, cryptographic erasure, or manufacturer-specific tools. D-Secure automatically detects drive types and applies appropriate methods.",
      category: "technical"
    },
    {
      id: 4,
      question: "Is data really unrecoverable after using D-Secure?",
      answer: "Yes, when D-Secure's erasure process completes successfully, the data is cryptographically and forensically unrecoverable. Our methods exceed international standards and have been validated by forensic experts. We provide detailed regulatory documents of destruction for compliance purposes.",
      category: "security"
    },
    {
      id: 5,
      question: "How can I wipe a MacOS with M1 Chip?",
      answer: "For Mac M1 devices, D-Secure supports Apple's built-in secure erase features through our Mac edition. The process includes FileVault encryption verification, T2/M1 security chip integration, and firmware-level erasure commands. Remote deployment is available for enterprise environments.",
      category: "devices"
    },
    {
      id: 6,
      question: "What devices does D-Secure support?",
      answer: "D-Secure supports Windows PCs, Mac computers (Intel and Apple Silicon), Linux systems, iOS and Android smartphones, tablets, enterprise servers, and various storage devices including HDDs, SSDs, NVMe drives, and USB storage devices.",
      category: "devices"
    },
    {
      id: 7,
      question: "Do I need a license for personal use?",
      answer: "D-Secure offers different licensing options. For personal use, we provide a free version with basic features. For advanced features, enterprise deployment, or commercial use, paid licenses are required. Students and educational institutions may qualify for discounted licensing.",
      category: "licensing"
    },
    {
      id: 8,
      question: "How do I perform cryptographic erasure on SSD?",
      answer: "Cryptographic erasure on SSDs involves destroying the encryption keys that protect the data, making it instantly unrecoverable. D-Secure automates this process by detecting self-encrypting drives (SEDs), executing secure erase commands, and generating new encryption keys.",
      category: "data-erasure"
    },
    {
      id: 9,
      question: "Can I schedule automatic erasure tasks?",
      answer: "Yes, D-Secure Enterprise includes task scheduling functionality. You can set up automated erasure tasks for specific times, recurring schedules, or triggered events. This is particularly useful for managing multiple devices in corporate environments.",
      category: "technical"
    },
    {
      id: 10,
      question: "What happens if the erasure process is interrupted?",
      answer: "If an erasure process is interrupted due to power failure or system crash, D-Secure can resume from the last checkpoint on most devices. For critical operations, we recommend using UPS backup power and ensuring stable system conditions before starting large erasure tasks.",
      category: "technical"
    },
    {
      id: 11,
      question: "How do I get a regulatory document of data destruction?",
      answer: "D-Secure automatically generates tamper-proof regulatory documents upon successful completion of erasure operations. These regulatory documents include device details, erasure methods used, timestamps, and digital signatures for legal compliance and audit purposes.",
      category: "security"
    },
    {
      id: 12,
      question: "Can I wipe data while keeping the operating system?",
      answer: "Yes, D-Secure offers selective erasure options that allow you to wipe user data, applications, and specific folders while preserving the operating system. This is useful for device redeployment or when selling computers that need to remain functional.",
      category: "general"
    },
    {
      id: 13,
      question: "What ongoing support is provided?",
      answer: "We provide continuous support including regular software updates, technical assistance, compliance monitoring, and renewal coordination. Think of us as your ongoing partner in data hygiene.",
      category: "general"
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      <SEOHead seo={getSEOForPage('faqs')} />

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center">
                <div className="mb-8">
                  <Link to="/support" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Support
                  </Link>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                    Frequently Asked <span className="text-brand">Questions</span>
                  </h1>
                  <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
                    Find quick answers to common questions about D-Secure data erasure solutions
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-2xl mx-auto relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search FAQs..."
                      className="w-full px-6 py-4 pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-brand focus:border-brand transition-colors text-lg"
                    />
                    <svg
                      className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="container-responsive">
            <Reveal>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${activeCategory === category.id
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No FAQs Found</h3>
                <p className="text-slate-600">Try adjusting your search terms or category filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <Reveal key={faq.id} delayMs={index * 50}>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-6 py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <h3 className="text-lg font-semibold text-slate-900 pr-4">
                          {faq.question}
                        </h3>
                        <svg
                          className={`w-5 h-5 text-slate-500 transform transition-transform ${openFAQ === faq.id ? "rotate-180" : ""
                            }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openFAQ === faq.id && (
                        <div className="px-6 pb-6">
                          <div className="border-t border-slate-200 pt-4">
                            <p className="text-slate-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Didn't find what you're looking for?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Our support team is here to help you with any questions about D-Secure
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/support"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="mailto:support@dsecuretech.com"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default FAQsPage;