import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import OptimizedImage from '@/components/OptimizedImage';
import { getFallbackImage } from '@/utils/imagePlaceholders';

// CDN Image URLs
const CDN_IMAGES = {
  hero: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  degaussing:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  shredding:
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  crushing:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
  incineration:
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
};

interface ManualSection {
  id: number;
  title: string;
  description: string;
  icon: string;
  subsections: ManualSubsection[];
}

interface ManualSubsection {
  id: number;
  title: string;
  description: string;
  url: string;
  pageCount: number;
}

const PhysicalDestructionPage: React.FC = memo(() => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const manualSections: ManualSection[] = [
    {
      id: 1,
      title: "Overview & Importance",
      description:
        "Understanding when and why physical destruction is necessary",
      icon: "🏢",
      subsections: [
        {
          id: 11,
          title: "Physical Destruction Overview",
          description: "Ultimate data disposal security and irreversibility",
          url: "/support/manual/physical-destruction-overview",
          pageCount: 2,
        },
        {
          id: 12,
          title: "Why Choose Physical Destruction",
          description: "Zero recovery possibility and compliance assurance",
          url: "/support/manual/why-physical-destruction",
          pageCount: 2,
        },
        {
          id: 13,
          title: "Use Cases & Scenarios",
          description: "When physical destruction is the only option",
          url: "/support/manual/destruction-use-cases",
          pageCount: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Destruction Methods",
      description: "Comprehensive guide to physical destruction techniques",
      icon: "⚙️",
      subsections: [
        {
          id: 21,
          title: "Degaussing",
          description: "Magnetic field disruption for HDDs and tapes",
          url: "/support/manual/degaussing-method",
          pageCount: 2,
        },
        {
          id: 22,
          title: "Shredding",
          description: "Industrial shredding into small fragments",
          url: "/support/manual/shredding-method",
          pageCount: 2,
        },
        {
          id: 23,
          title: "Crushing & Punching",
          description: "Hydraulic pressing and physical puncture",
          url: "/support/manual/crushing-method",
          pageCount: 2,
        },
        {
          id: 24,
          title: "Incineration",
          description: "High-temperature melting and disintegration",
          url: "/support/manual/incineration-method",
          pageCount: 2,
        },
      ],
    },
    {
      id: 3,
      title: "Media-Specific Destruction",
      description: "Optimal methods for different storage media types",
      icon: "💾",
      subsections: [
        {
          id: 31,
          title: "HDD Destruction",
          description: "Platter destruction and magnetic media considerations",
          url: "/support/manual/hdd-destruction",
          pageCount: 2,
        },
        {
          id: 32,
          title: "SSD & Flash Memory",
          description: "NAND chip destruction and wear-leveling challenges",
          url: "/support/manual/ssd-destruction",
          pageCount: 2,
        },
        {
          id: 33,
          title: "Mobile Devices",
          description: "Smartphones, tablets, and embedded storage",
          url: "/support/manual/mobile-destruction",
          pageCount: 2,
        },
        {
          id: 34,
          title: "Optical Media & Tapes",
          description: "CDs, DVDs, Blu-ray, and magnetic tapes",
          url: "/support/manual/optical-tape-destruction",
          pageCount: 1,
        },
      ],
    },
    {
      id: 4,
      title: "Compliance & Certification",
      description: "Regulatory standards and documentation requirements",
      icon: "📋",
      subsections: [
        {
          id: 41,
          title: "Certification Standards",
          description: "NIST, DoD, ISO, and industry compliance",
          url: "/support/manual/destruction-standards",
          pageCount: 2,
        },
        {
          id: 42,
          title: "Certificate of Destruction",
          description: "Documentation and audit trail requirements",
          url: "/support/manual/certificate-destruction",
          pageCount: 2,
        },
        {
          id: 43,
          title: "Regulatory Compliance",
          description: "GDPR, HIPAA, PCI-DSS, and data protection laws",
          url: "/support/manual/regulatory-compliance",
          pageCount: 2,
        },
      ],
    },
    {
      id: 5,
      title: "Implementation & Process",
      description: "Operational workflows and service delivery",
      icon: "🚚",
      subsections: [
        {
          id: 51,
          title: "Service Workflow",
          description: "From pickup to proof of destruction",
          url: "/support/manual/service-workflow",
          pageCount: 2,
        },
        {
          id: 52,
          title: "On-site vs Off-site",
          description: "Choosing the right destruction location",
          url: "/support/manual/onsite-offsite",
          pageCount: 2,
        },
        {
          id: 53,
          title: "Security Protocols",
          description: "Chain of custody and secure logistics",
          url: "/support/manual/security-protocols",
          pageCount: 2,
        },
        {
          id: 54,
          title: "Environmental Considerations",
          description: "E-waste management and recycling",
          url: "/support/manual/environmental-considerations",
          pageCount: 1,
        },
      ],
    },
    {
      id: 6,
      title: "Industry Applications",
      description: "Sector-specific destruction requirements",
      icon: "🏭",
      subsections: [
        {
          id: 61,
          title: "Government & Defense",
          description: "Classified data and national security requirements",
          url: "/support/manual/government-defense",
          pageCount: 2,
        },
        {
          id: 62,
          title: "Healthcare Sector",
          description: "HIPAA compliance and patient data protection",
          url: "/support/manual/healthcare-destruction",
          pageCount: 2,
        },
        {
          id: 63,
          title: "Banking & Finance",
          description: "PCI-DSS and financial data security",
          url: "/support/manual/banking-finance",
          pageCount: 2,
        },
        {
          id: 64,
          title: "ITAD & Data Centers",
          description: "Large-scale asset disposal and decommissioning",
          url: "/support/manual/itad-datacenters",
          pageCount: 2,
        },
      ],
    },
  ];

  const filteredSections = manualSections.filter((section) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.subsections.some(
        (sub) =>
          sub.title.toLowerCase().includes(query) ||
          sub.description.toLowerCase().includes(query)
      )
    );
  });

  const toggleSection = (id: number) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const getTotalPages = (section: ManualSection) => {
    return section.subsections.reduce((total, sub) => total + sub.pageCount, 0);
  };

  return (
    <>
      <Helmet>
        <link
          rel="canonical"
          href="https://dsecuretech.com/support/physical-destruction"
        />
        <title>
          Physical Destruction Methods | Ultimate Data Disposal Security
        </title>
        <meta
          name="description"
          content="Physical destruction methods for ultimate data security. Degaussing, shredding, crushing, and incineration for irreversible data disposal. NIST and DoD compliant."
        />
        <meta
          name="keywords"
          content="physical destruction, data destruction, degaussing, shredding, crushing, incineration, data disposal"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 py-8 sm:py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center">
                <div className="mb-6 md:mb-8">
                  <Link
                    to="/support"
                    className="inline-flex items-center text-red-600 hover:text-red-700 font-medium mb-3 md:mb-4 transition-colors text-sm sm:text-base"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Back to Support
                  </Link>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
                    Physical{" "}
                    <span className="text-red-600 block sm:inline">
                      Destruction Methods
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
                    Ultimate Data Disposal: Degaussing, shredding, crushing, and
                    incineration for irreversible destruction and maximum
                    security
                  </p>

                  {/* Search Bar */}
                  <div className="max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search destruction methods..."
                        className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-10 sm:pl-12 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm sm:text-base"
                      />
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2"
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
              </div>
            </Reveal>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden shadow-xl max-w-6xl mx-auto">
                <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
                  <OptimizedImage
                    src={CDN_IMAGES.hero}
                    alt="Physical Data Destruction Equipment"
                    fallback={getFallbackImage('security')}
                    className="w-full h-full object-cover"
                    width={1600}
                    height={900}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 md:p-8 text-white">
                      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        Ultimate Data Destruction
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg opacity-90 max-w-2xl">
                        When data must be rendered unrecoverable by any means —
                        ensuring zero possibility of forensic recovery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-8 sm:py-12 md:py-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">🔒</div>
                  <div className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
                    Irreversible
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Zero data recovery possible
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">✅</div>
                  <div className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
                    Compliant
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    NIST Purge/Destroy level
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="text-3xl sm:text-4xl mb-4">📜</div>
                  <div className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
                    Auditable
                  </div>
                  <div className="text-slate-600 text-sm sm:text-base">
                    Full chain of custody
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Destruction Methods Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Destruction Methods
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Choose the right physical destruction technique for your
                  security needs
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "Degaussing",
                  description: "Magnetic field disruption for HDDs",
                  image: CDN_IMAGES.degaussing,
                  alt: "Degaussing equipment for magnetic media destruction",
                },
                {
                  title: "Shredding",
                  description: "Industrial shredding to small particles",
                  image: CDN_IMAGES.shredding,
                  alt: "Hard drive shredding machine in operation",
                },
                {
                  title: "Crushing",
                  description: "Hydraulic pressing and deformation",
                  image: CDN_IMAGES.crushing,
                  alt: "Crushing equipment for electronic media",
                },
                {
                  title: "Incineration",
                  description: "High-temperature complete destruction",
                  image: CDN_IMAGES.incineration,
                  alt: "Incineration facility for secure disposal",
                },
              ].map((method, index) => (
                <Reveal key={method.title} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg">
                      {method.title}
                    </h3>
                    <div className="relative h-32 sm:h-40 md:h-48">
                      <OptimizedImage
                        src={method.image}
                        alt={method.alt}
                        fallback={getFallbackImage('security')}
                        className="w-full h-full object-cover rounded-lg border border-slate-200"
                        width={600}
                        height={450}
                      />
                    </div>
                    <p className="text-slate-600 mt-3 sm:mt-4 text-sm sm:text-base">
                      {method.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Manual Sections */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {filteredSections.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-slate-400"
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
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                  No Sections Found
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                  Try adjusting your search terms.
                </p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {filteredSections.map((section, index) => (
                  <Reveal key={section.id} delayMs={index * 50}>
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full px-4 sm:px-6 py-4 sm:py-6 text-left hover:bg-slate-50 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="text-lg sm:text-2xl">
                            {section.icon}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-1">
                              {section.title}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm">
                              {section.description}
                            </p>
                            <div className="flex items-center gap-2 sm:gap-4 mt-2 text-xs text-slate-500">
                              <span>{section.subsections.length} topics</span>
                              <span>{getTotalPages(section)} pages</span>
                            </div>
                          </div>
                        </div>
                        <svg
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-500 transform transition-transform ${
                            activeSection === section.id ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {activeSection === section.id && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                          <div className="border-t border-slate-200 pt-4">
                            <div className="grid gap-3 sm:gap-4">
                              {section.subsections.map((subsection) => (
                                <Link
                                  key={subsection.id}
                                  to={subsection.url}
                                  className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                                >
                                  <div className="flex-1">
                                    <h4 className="font-medium text-slate-900 group-hover:text-red-600 transition-colors mb-1 text-sm sm:text-base">
                                      {subsection.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-slate-600">
                                      {subsection.description}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                                    <span>{subsection.pageCount} pages</span>
                                    <svg
                                      className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </div>
                                </Link>
                              ))}
                            </div>
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

        {/* Process & Assurance */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Process & Assurance
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  From secure pickup to verified destruction
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              <Reveal delayMs={100}>
                <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                    Destruction Process
                  </h3>
                  <ol className="space-y-3 sm:space-y-4 text-slate-700">
                    <li className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Secure Pickup
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          GPS-tracked, screened personnel
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Inventory & Transport
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          Chain of custody documentation
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Verified Destruction
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          Recorded and certified process
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        4
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          E-Waste Recycling
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">
                          Environmentally responsible disposal
                        </div>
                      </div>
                    </li>
                  </ol>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="grid gap-4 sm:gap-6">
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
                    <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                      Certificate of Destruction
                    </h3>
                    <ul className="space-y-2 sm:space-y-3 text-slate-700">
                      <li className="flex items-start">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm sm:text-base">
                          Serial numbers and asset tags
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm sm:text-base">
                          Date, time, and destruction method used
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm sm:text-base">
                          Operator and facility details
                        </span>
                      </li>
                      <li className="flex items-start">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 mt-0.5 sm:mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm sm:text-base">
                          Compliance standard verification
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-300 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-lg sm:text-xl">
                      Our Commitment
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      At DSecure, we combine secure logistics, certified
                      equipment, and audit trails to deliver verifiable
                      destruction of your data-bearing assets — from pickup to
                      proof of destruction.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Industries We Serve
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {[
                {
                  industry: "Government & Defense",
                  description: "Classified data and national security",
                  icon: "🏛️",
                  color: "bg-blue-500",
                },
                {
                  industry: "Healthcare",
                  description: "HIPAA compliance and patient data",
                  icon: "🏥",
                  color: "bg-green-500",
                },
                {
                  industry: "Banking & Finance",
                  description: "PCI-DSS and financial security",
                  icon: "🏦",
                  color: "bg-purple-500",
                },
                {
                  industry: "ITAD & Data Centers",
                  description: "Large-scale asset disposal",
                  icon: "🔧",
                  color: "bg-orange-500",
                },
              ].map((industry, index) => (
                <Reveal key={industry.industry} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-300">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 ${industry.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}
                    >
                      <span className="text-xl sm:text-2xl text-white">
                        {industry.icon}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
                      {industry.industry}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      {industry.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                  Quick Access
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
                  Essential physical destruction resources
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "Shredding Guide",
                  description: "Industrial shredding methods",
                  icon: "✂️",
                  url: "/support/manual/shredding-method",
                  color: "bg-red-500",
                },
                {
                  title: "Compliance Standards",
                  description: "NIST, DoD, ISO requirements",
                  icon: "📋",
                  url: "/support/manual/destruction-standards",
                  color: "bg-blue-500",
                },
                {
                  title: "Service Workflow",
                  description: "Pickup to destruction process",
                  icon: "🚚",
                  url: "/support/manual/service-workflow",
                  color: "bg-green-500",
                },
                {
                  title: "Industry Guides",
                  description: "Sector-specific requirements",
                  icon: "🏭",
                  url: "/support/manual/government-defense",
                  color: "bg-purple-500",
                },
              ].map((item, index) => (
                <Reveal key={item.title} delayMs={index * 100}>
                  <Link
                    to={item.url}
                    className="bg-slate-50 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <span className="text-xl sm:text-2xl text-white">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm flex-grow">
                      {item.description}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-r from-red-500 to-orange-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                  Need Absolute Data Security?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                  When digital erasure isn't enough, physical destruction
                  provides the ultimate guarantee of data irrecoverability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/services/physical-destruction"
                    className="bg-white text-red-600 hover:bg-red-50 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                  >
                    Schedule Destruction Service
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors text-base sm:text-lg"
                  >
                    Request Consultation
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
});

export default PhysicalDestructionPage;
