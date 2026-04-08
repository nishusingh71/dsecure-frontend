import React, { useState } from 'react';
import { 
  ArrowLeft, ChevronRight, HelpCircle, Search, Settings, 
  Download, Shield, Cloud, FileText, AlertCircle, CheckCircle,
  Plus, Minus, ExternalLink, DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'erasure' | 'technical' | 'pricing' | 'compliance';
}

const faqs: FAQItem[] = [
  {
    category: 'general',
    question: "What is D-Secure and how does it work?",
    answer: "D-Secure is a certified data erasure SaaS platform designed for enterprises and IT asset managers. It uses advanced algorithms to overwrite data on HDDs, SSDs, and NVMe drives with 100% mathematical certainty, ensuring that no data recovery software can ever retrieve the original information."
  },
  {
    category: 'general',
    question: "Why do I need D-Secure instead of just deleting files?",
    answer: "Standard deletion only removes the file's 'pointer' and doesn't actually erase the data. This data remains on the physical disk until overwritten. D-Secure ensures privacy and compliance by permanently overwriting all traces of deleted files, applications, and system logs."
  },
  {
    category: 'pricing',
    question: "What is the pricing for D-Secure products?",
    answer: "D-Secure offers flexible pricing based on the product. Drive Eraser starts at $25 per license, while Smartphone Eraser starts as low as $1 per device for industrial batch processing. For enterprise volume discounts or custom deployments, please visit our pricing page or contact our sales team directly."
  },
  {
    category: 'pricing',
    question: "Do you offer a free trial for D-Secure File Eraser?",
    answer: "Yes, we provide a 14-day free trial. The trial version allows you to scan and identify traces across your system. To perform actual erasure tasks beyond the trial limit and generate compliance certificates, you must activate the full version. <a href='/contact' class='text-blue-600 font-semibold'>Contact us for a trial key</a>."
  },
  {
    category: 'technical',
    question: "What platforms and architectures does D-Secure support?",
    answer: "D-Secure is built for universality. We provide native support for Windows, Linux, and macOS (including Intel and Apple Silicon M1-M4). Our engine is optimized for both x86_64 and ARM64 architectures, ensuring high performance on everything from legacy laptops to modern cloud servers."
  },
  {
    category: 'erasure',
    question: "Does D-Secure cause any harm to my hard drive or SSD?",
    answer: "No. D-Secure uses sector-level overwriting that adheres to global media sanitization standards like NIST 800-88. While it performs intensive write operations, it does not damage the physical hardware or affect the disk's long-term endurance beyond normal usage patterns."
  },
  {
    category: 'compliance',
    question: "Is D-Secure NIST 800-88 and GDPR compliant?",
    answer: "Absolutely. D-Secure is fully aligned with NIST 800-88 Rev. 1 (Clear, Purge, and Destroy) and supports GDPR Article 17 ('Right to be Forgotten'). Every erasure event generates a 2048-bit RSA-signed tamper-proof PDF certificate that serves as legal proof of compliance."
  },
  {
    category: 'erasure',
    question: "D-Secure vs Blancco — why choose D-Secure?",
    answer: "While both are industry leaders, D-Secure offers superior performance on modern ARM64 architectures and a more flexible deployment model for enterprise ITADs. Our pricing is highly competitive, and our reporting engine provides deeper technical annexures beyond a standard 1-page certificate."
  },
  {
    category: 'erasure',
    question: "What's the difference between 'Clear' and 'Purge' in NIST 800-88?",
    answer: "'Clear' uses software-level overwriting to protect against simple, non-invasive data recovery. 'Purge' uses more robust physical or cryptographic methods (like Cryptographic Erase) to ensure data is unrecoverable even through laboratory techniques. D-Secure supports both levels."
  },
  {
    category: 'technical',
    question: "Can I use D-Secure over a network via PXE?",
    answer: "Yes. Our Drive Eraser Network version supports PXE (Preboot Execution Environment) booting. This allows IT teams to wipe hundreds of decommissioned laptops or servers over a LAN without needing physical bootable media for each device."
  },
  {
    category: 'erasure',
    question: "Can I erase specific files or folders instead of a whole drive?",
    answer: "Yes, our File Eraser product is designed specifically for this use case. You can target individual files, empty the recycle bin permanently, or wipe 'free space' to ensure previously deleted files are unrecoverable."
  },
  {
    category: 'compliance',
    question: "Can these erasure reports be integrated with my WMS or ERP?",
    answer: "Yes, D-Secure provides native REST API and webhook integrations. Many high-volume ITAD recyclers sync their erasure certificates directly into tools like RazorERP or IQity for real-time inventory management."
  },
  {
    category: 'technical',
    question: "How long does the erasure process take?",
    answer: "The time depends on the disk size, speed (HDD vs NVMe), and the chosen algorithm. A 'Clear' pass on a 256GB SSD typically takes minutes, while a multi-pass DoD wipe on a 4TB HDD could take several hours."
  },
  {
    category: 'pricing',
    question: "Is there a discount for educational or government institutions?",
    answer: "D-Secure offers special pricing tiers for public sector entities, schools, and non-profits. We understand the specific compliance needs of FERPA and FOIA. <a href='/contact' class='text-blue-600 font-semibold'>Request a public sector quote</a>."
  },
  {
    category: 'technical',
    question: "Does D-Secure support Apple M1/M2/M3/M4 chip Macs?",
    answer: "Yes, we are one of the few platforms with native ARM64 support for Apple Silicon. We can securely erase modern Macs while maintaining the integrity of the T2 secure enclave and boot mechanisms."
  },
  {
    category: 'compliance',
    question: "What is an 'Audit-Proof' certificate?",
    answer: "An audit-proof certificate from D-Secure is a digitally signed PDF that includes unique hardware identifiers (Serial Numbers, UUIDs), exact timestamps, the algorithm used, and a verification summary. It is designed to stand up to scrutiny during ISO 27001 or SOC 2 audits."
  },
  {
    category: 'general',
    question: "How do I get started with D-Secure?",
    answer: "To get started, <a href='/download' class='text-blue-600 font-semibold'>log in to our portal</a> to download the latest builds for Windows or Mac. If you are a new enterprise customer, contact our team for a guided demo and a proof-of-concept license."
  },
  {
    category: 'pricing',
    question: "What is the starting price for Smartphone Eraser?",
    answer: "Our Smartphone Eraser is extremely affordable for high-volume processors, starting at just $1 per device. This includes industrial-grade wiping for both iOS and Android and a full compliance certificate."
  },
  {
    category: 'compliance',
    question: "What is IT Asset Disposition (ITAD)?",
    answer: "ITAD is the business of disposing of obsolete or unwanted IT equipment in a safe and ecologically responsible way. D-Secure is a critical tool for ITAD companies to ensure that every asset they remarket or recycle has been certified clean of sensitive data."
  },
  {
    category: 'technical',
    question: "What happens if the erasure process is interrupted?",
    answer: "D-Secure's engine is built with resilience. If a process is interrupted by power loss or accidental disconnection, the drive will be flagged as 'Failed' until a complete, successful wipe is completed and verified. This prevents 'partial' erasures from being mistakenly certified."
  }
];

const DSecureFAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'general', name: 'General', icon: <Settings className="w-4 h-4" /> },
    { id: 'erasure', name: 'Erasure', icon: <Shield className="w-4 h-4" /> },
    { id: 'technical', name: 'Technical', icon: <Cloud className="w-4 h-4" /> },
    { id: 'pricing', name: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'compliance', name: 'Compliance', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <SEOHead seo={getSEOForPage("faqs")} />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/support/help-manual"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Help Manual
              </Link>
              <div className="h-4 w-px bg-gray-300 mx-2 hidden sm:block"></div>
              <span className="text-gray-900 font-bold hidden sm:block">
                D-Secure Knowledge Base
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-blue-600 py-16 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Explore 20+ specialized FAQs for D-Secure data erasure and
            compliance.
          </p>
          <div className="relative max-w-2xl mx-auto shadow-2xl rounded-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for questions, categories, or technical terms..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:ring-4 focus:ring-blue-500/30 outline-none transition-all border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-md ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white transform scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FAQ List */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                    openIndex === index
                      ? "border-blue-500 shadow-xl"
                      : "border-gray-100 shadow-sm hover:border-gray-200"
                  }`}
                >
                  <button
                    className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <span className="text-lg font-bold text-gray-900 pr-8">
                      {faq.question}
                    </span>
                    <div
                      className={`flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                    >
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8 pb-8 text-gray-600 leading-relaxed border-t border-gray-50 pt-6">
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl p-20 text-center border border-dashed border-gray-200">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl sticky top-24">
              <h3 className="text-2xl font-extrabold mb-4 leading-tight">
                Ready for Certified Erasure?
              </h3>
              <p className="text-blue-100 mb-8 leading-relaxed">
                Contact our enterprise team for a demo or volume pricing
                starting at $1/device.
              </p>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="w-full bg-white text-blue-900 font-extrabold py-4 px-6 rounded-xl flex items-center justify-center hover:bg-blue-50 transition-all transform hover:-translate-y-1"
                >
                  Get a Free Quote
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/pricing-and-plan"
                  className="w-full bg-blue-800/50 text-white border border-blue-400/30 font-bold py-4 px-6 rounded-xl flex items-center justify-center hover:bg-blue-800/70 transition-all"
                >
                  Pricing Plans
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-blue-400/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-400/20 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-200" />
                  </div>
                  <div>
                    <h4 className="font-bold">NIST Certified</h4>
                    <p className="text-xs text-blue-200">
                      Audit-proof reporting
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Authority Guides
              </h3>
              <div className="space-y-4">
                <Link
                  to=""
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FileText className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-sm font-medium">
                    Installation Protocol
                  </span>
                </Link>
                <Link
                  to="/support/help-manual/working-guide"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Settings className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-sm font-medium">
                    Working with Core Engine
                  </span>
                </Link>
                <Link
                  to="/support/manual/erasing-traces"
                  className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Shield className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-sm font-medium">
                    Data Sanitization Standards
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSecureFAQPage;
