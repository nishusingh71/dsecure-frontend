import React, { useState, useEffect, memo } from "react";
import ThemeAwareLogo from "@/components/ThemeAwareLogo";
import Reveal from "@/components/Reveal";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import { Link } from "react-router-dom";
import {
  PartnershipForm,
  LicenseForm,
  type PartnershipFormData,
  type LicenseFormData,
} from "@/components/forms";
import { formConfigs } from "@/hooks/useFormSubmission";
import { useToast } from "@/hooks";
import { Toast } from "@/components/ui";
import { ENV } from "@/config/env";
import {
  ShieldIcon,
  CheckIcon,
  ArrowRightIcon,
  GlobeIcon,
  CloudIcon,
  GearIcon,
  ClipboardIcon,
  StarIcon,
  ServerIcon,
  LightningIcon,
} from "@/components/FlatIcons";
import {
  Briefcase,
  MessageSquare,
  ChevronDown,
  Building,
  User,
} from "lucide-react";

// Partner types definition - moved to top to avoid temporal dead zone
const partnerTypes = {
  "ITAD Partner": {
    title: "ITAD Partner Program",
    description:
      "The D-Secure ITAD Partner Program is designed for IT asset disposition companies looking to accelerate their data erasure solutions and protocols. Join our ITAD Partner program to offer secure data erasure service using globally tested & approved erasure solutions to your customers and help them meet global data privacy compliance.",
    benefits: [
      "Scalable & Automated Data Erasure & Diagnostics Software",
      "Free Assisted Remote Deployment & Training",
      "FREE Product Updates",
      "Price Lock in During Contract Term",
      "FREE Premium Technical Support - 24*5",
      "Customized Solution For ITADs",
    ],
    detailedBenefits: [
      {
        title: "Scalable & Automated Data Erasure & Diagnostics Software",
        description:
          "D-Secure secure data erasure & diagnostics software allows you to start wiping up to 64 drives simultaneously. The software focus can consolidate the ITAD's data wiping capabilities across all types of storage media, including hard drives, SSDs, built-in drives in computers & Mac systems, servers, and OS & Android devices.",
      },
      {
        title: "Price Lock in During Contract Term",
        description:
          "By selecting D-Secure solution as a part of the benefit of purchasing bulk licenses of D-Secure at a special discounted pricing, the special price lock in for the term of the contract ensures that there is no change in price if you order a data erasure volumes over time.",
      },
      {
        title: "FREE Premium Technical Support - 24*5",
        description:
          "D-Secure provides free technical support for D-Secure on offering assistance from our experts. Whether it is technical assistance or help with deployment and understanding our dedicated support team is here to help D-Secure achieve exceptional service to their clients.",
      },
      {
        title: "Customized Solution For ITADs",
        description:
          "For large ITAD partners we offer customized solution to automate their data wiping process to maximize human intervention and improve their existing data erasure process. We also help with the consultations to improve the existing process and increase efficiency in operations.",
      },
    ],
  },
  "MSP Partner": {
    title: "MSP Partner Program",
    description:
      "The D-Secure MSP Partner Program empowers IT Managed Service Providers to efficiently incorporate data erasure services into their offerings, expanding their portfolio and adding value to their customers by ensuring the risk of data breach is significantly reduced ensuring relevant laws and regulations such as CCPA, HIPAA, SOX, and ISO 27001.",
    benefits: [
      "Expand Your Portfolio",
      "Comprehensive Training",
      "Access Marketing Collaterals",
      "Free Product Updates",
      "Special MSP Pricing",
      "Effortless Data Erasure Software",
      "Get Listed On D-Secure Partner Section",
      "Free Technical Support",
    ],
    detailedBenefits: [
      {
        title: "Expand Your Portfolio",
        description:
          "Managed Service Providers (MSPs) allows MSPs to offer data erasure as a service, enriching their portfolio. This expansion attracts organizations requiring comprehensive data security solutions, positioning MSPs as versatile, end-to-end service providers. By adding data erasure services, MSPs differentiate themselves, enhance revenue, and position as trusted data security partners.",
      },
      {
        title: "Special MSP Pricing",
        description:
          "Enrolling in our MSP Partner Program offers pricing as an MSP partner. With D-Secure - Purchase licenses at a special price to offer software as a service to your clients. With the special pricing only available to MSPs who are partners with us in the market. Further, partners can get cost reduced erasure solutions ensuring accessibility for MSPs.",
      },
      {
        title: "Effortless Data Erasure Software",
        description:
          "D-Secure's secure data erasure software enables MSPs to initiate fast and effortless data erasure. The software brings automation, quick identification and erasure for your clients across over 65,000 drives. As part of our Partner Program, you'll receive the same experience at all voluntary programs they call how you operate. This includes services accomplished by user-friendly manual for seamless operations support across all types of drives to provide services to your clients.",
      },
      {
        title: "Get Listed On D-Secure Partner Section",
        description:
          "By becoming our valuable MSP Partner, you get listed in the partner section of our website. B2B Customers can look out for partners who are experts in their compliance requirements to visit their team that can convert to revenue. Also, your customers gain trust that you are an expert from Authorized MSP Partner.",
      },
    ],
  },
  "Distributor Partner": {
    title: "Distributor Partner Program",
    description:
      "D-Secure Distributor Program for D-Secure is meant for all those software distributors that have global partnerships. partner reach in order to sell data erasure products for wiping and asset service. that financial data compliance and software for wiping data permanently from HDDs, SSDs, Tablets, Desktop, service & mobile devices including OS & Android devices.",
    benefits: [
      "Go-To-Market Support",
      "Free 24*7 Technical Support",
      "Regular Updates",
      "Product Sales Training",
      "Trusted Brand",
      "Deal Registration Benefits",
    ],
    detailedBenefits: [
      {
        title: "Go-To-Market Support",
        description:
          "Distributors are required to increase the generation and reach of D-Secure products by fixing business processes and developing solutions for data erasure software with comprehensive go-to-market strategy. Includes D-Secure brochures, technical fact sheets, product videos, demo materials to support the distributors business.",
      },
      {
        title: "Product Sales Training",
        description:
          "All partners receive training and they get training on the features and functionality of DSecure product to understand the various data structures and compliance. We also advise the partners by providing sales documentation.",
      },
      {
        title: "Trusted Brand",
        description:
          "D-Secure is a growing brand in the data erasure industry built on technical excellence and best practices. Our solutions follow international standards and provide reliable global service.",
      },
      {
        title: "Deal Registration Benefits",
        description:
          "Deal Registration is a great advantage to our Distributors, it allows you to keep a best-foot-in-root your company that particular partner and projects that can be of high priority. We can provide better price for registered deals for our channel partner along with product, support and service deployment.",
      },
    ],
  },
  "Reseller Partner": {
    title: "Reseller Partner Program",
    description:
      "Become our Reseller to deliver secure & reliable data erasure software to enterprise customers and help them meet compliance. Get great discounts when leveraging our globally tested and standards-compliant solutions, help your customers meet global data privacy compliance requirements, with ease.",
    benefits: [
      "Product Sales Training",
      "Free Assisted Technology Support",
      "Regular Updates And Communication",
      "Co-To-Market Enablement",
      "Deal Registration Benefits",
      "Quality Solutions",
    ],
    detailedBenefits: [
      {
        title: "Product Sales Training",
        description:
          "The program provides you with simple training on the complete D-Secure product lineup and functionality understanding of all features and technical aspects that benefits in advanced knowledge transfer sessions remotely equip you with the level of readiness you need to market the best product in the market.",
      },
      {
        title: "Co-To-Market Enablement",
        description:
          "You get all the necessary sales and marketing collaterals when you join the D-Secure Reseller Partner Program. We provide campaign brochures, product one-pagers, technical data sheets, prospects, and more to support and roll out your go-to-market strategy for the region that you operate.",
      },
      {
        title: "Deal Registration Benefits",
        description:
          "Reseller program allows you look in benefit when you register for a deal through a deal registration, you can look the deal for a given duration such that the D-Secure sales team does not directly approach the same prospect. Deal registration also ensures that you do get a lead protection for you totally.",
      },
      {
        title: "Quality Supplier",
        description:
          "D-Secure is a growing brand renowned for its data erasure solutions. We work to satisfy customers across the world in 190 countries. Our company focuses on innovative software development and providing quality in-lab services.",
      },
    ],
  },
  "OEM Partner": {
    title: "OEM Partner Program",
    description:
      "D-Secure OEM Partnership Program helps you to implement and channel your existing product portfolio by offering data erasure solutions to your customers in order to safeguard their from liability.",
    benefits: [
      "Best-Selling Software",
      "High Conversion Rate",
      "Strong Technical Support",
      "Comprehensive Solution",
      "Standards Compliant",
      "Trusted Brand Quality",
    ],
    detailedBenefits: [
      {
        title: "Best-Selling Software",
        description:
          "D-Secure software is renowned for its reliability, trustworthiness, and ease of use. We enjoy a vast customer base of more users in need of high quality data erasure solutions. Being an OEM partner, you can bundle our in-house professional data erasure software, largely unparalleled in the data erasure software industry.",
      },
      {
        title: "Comprehensive Solution",
        description:
          "D-Secure software OEM partnership is successfully sync across all the storage drive and devices segments, including the actively operating drive hardware and those being for end-of-lifecycle. Our OEM partnership covers innovative data sanitization solutions for individual Mac, computer and mobile devices, and hybrid cloud drives, and mobile devices.",
      },
      {
        title: "Standards Compliant",
        description:
          "D-Secure software follows international standards and best practices from leading bodies such as NIST, ADISA, and Common Criteria. Our solutions provide compliance with NIST FIPS 140-2, ADISA standards, and Common Criteria compliant data erasure methods.",
      },
      {
        title: "Trusted Brand Quality",
        description:
          "D-Secure is a product from D-Secure - one of the growing global data tech brands, trusted by companies worldwide. Our quality-focused R&D processes ensure compliance with the highest product standards and the success of our Partner business.",
      },
    ],
  },
} as const;

const PartnersPage: React.FC = memo(function PartnersPage() {
  const { toast, showToast, hideToast } = useToast();
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showFindPartnerModal, setShowFindPartnerModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPartnerForContact, setSelectedPartnerForContact] =
    useState<any>(null);
  const [selectedPartnerForDetails, setSelectedPartnerForDetails] =
    useState<any>(null);
  const [activePartnerType, setActivePartnerType] =
    useState<keyof typeof partnerTypes>("ITAD Partner");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedPartnerType, setSelectedPartnerType] =
    useState("All Partner Types");
  const [contactPartnerForm, setContactPartnerForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);

  const [activeSection, setActiveSection] = useState("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const sectionNavItems = [
    { id: "partner-types", label: "Partner Programs" },
    { id: "benefits", label: "Key Benefits" },
    { id: "process", label: "Join Process" },
    { id: "find-partner", label: "Find Partners" },
    { id: "contact", label: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > 400;
      setIsNavVisible(shouldShow);

      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", {
            detail: { visible: shouldShow },
          }),
        );
      }

      // Find current active section
      const sections = sectionNavItems.map((item) =>
        document.getElementById(item.id),
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop - 150 <= scrollPosition) {
          setActiveSection(sectionNavItems[i].id);
          break;
        }
      }
    };

    globalThis.addEventListener("scroll", handleScroll);
    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
      const isDesktop = globalThis.innerWidth >= 768;
      if (isDesktop) {
        globalThis.dispatchEvent(
          new CustomEvent("stickyNavVisible", { detail: { visible: false } }),
        );
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // Mock partner data based on attachment
  const partnersList: any[] = [
    
    // {
    //   company: "ABC International Trading Services Co. ltd",
    //   type: "Reseller",
    //   location: "Vietnam",
    //   contact: {
    //     name: "Nguyen Minh Duc",
    //     email: "nguyen.duc@international.com.vn",
    //     phone: "+84 903 447 799",
    //     website: "https://international.vn",
    //   },
    // },
    // {
    //   company: "Advantage Industries",
    //   type: "Distributor",
    //   location: "United States",
    //   contact: {
    //     name: "Michael Johnson",
    //     email: "michael.johnson@advantage-corp.com",
    //     phone: "+1 763 423 5338",
    //     website: "https://www.advantagecorp.com",
    //   },
    // },
    // {
    //   company: "Alternative Technologies SAC",
    //   type: "Reseller",
    //   location: "Peru",
    //   contact: {
    //     name: "Carlos Rodriguez",
    //     email: "carlos.rodriguez@alternativetech.com.pe",
    //     phone: "+511 200 6215",
    //     website: "https://www.alternativetech.com.pe",
    //   },
    // },
    // {
    //   company: "Asociaci SE De CV",
    //   type: "Distributor",
    //   location: "Mexico",
    //   contact: {
    //     name: "Maria Elena Villegas",
    //     email: "maria.villegas@asociaci.com",
    //     phone: "+52 477 1395",
    //     website: "https://www.asociaci.com",
    //   },
    // },
    // {
    //   company: "Active Link",
    //   type: "Distributor",
    //   location: "Italy",
    //   contact: {
    //     name: "Marco Rossi",
    //     email: "marco.rossi@activelink.it",
    //     phone: "+39 0544 236841",
    //     website: "https://www.activelink.it",
    //   },
    // },
    // {
    //   company: "TechGuard Solutions India",
    //   type: "ITAD Partner",
    //   location: "India",
    //   contact: {
    //     name: "Priya Sharma",
    //     email: "priya.sharma@techguard.in",
    //     phone: "+91 98765 43210",
    //     website: "https://www.techguard.in",
    //   },
    // },
    // {
    //   company: "SecureData UK Ltd",
    //   type: "MSP Partner",
    //   location: "United Kingdom",
    //   contact: {
    //     name: "James Wilson",
    //     email: "james.wilson@securedata.co.uk",
    //     phone: "+44 20 7123 4567",
    //     website: "https://www.securedata.co.uk",
    //   },
    // },
    // {
    //   company: "DataWipe Australia Pty",
    //   type: "ITAD Partner",
    //   location: "Australia",
    //   contact: {
    //     name: "Sarah Chen",
    //     email: "sarah.chen@datawipe.com.au",
    //     phone: "+61 2 9876 5432",
    //     website: "https://www.datawipe.com.au",
    //   },
    // },
  ];
  const countries = [
    "All Countries",
    "United States",
    "India",
    "Vietnam",
    "Peru",
    "Mexico",
    "Italy",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "Brazil",
  ];
  const partnerTypesFilter = [
    "All Partner Types",
    "ITAD Partner",
    "MSP Partner",
    "Distributor",
    "Reseller",
    "OEM Partner",
  ];
  // eslint-disable-next-line -- partnersList temporarily empty, filter logic needed for future data
  const filteredPartners = partnersList.filter((partner) => {
    const countryMatch =
      selectedCountry === "All Countries" ||
      partner.location === selectedCountry;
    const typeMatch =
      selectedPartnerType === "All Partner Types" ||
      partner.type === selectedPartnerType;
    return countryMatch && typeMatch;
  });

  // PDF download function
  const downloadPDF = (filename: string, displayName: string) => {
    const link = document.createElement("a");
    link.href = `/downloads/${filename}`;
    link.download = displayName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const handlePartnerSubmit = async (formData: PartnershipFormData) => {
    // This is now just for backward compatibility
    // The actual submission is handled by the form component itself
  };
  const handleLicenseSubmit = async (formData: LicenseFormData) => {
    // This is now just for backward compatibility
    // The actual submission is handled by the form component itself
  };
  const handleContactRedirect = () => {
    // Redirect to contact page
    globalThis.location.href = "/contact";
  };
  // Handle contact partner click
  const handleContactPartner = (partner: any) => {
    setSelectedPartnerForContact(partner);
    setShowContactModal(true);
  };
  // Handle view details click
  const handleViewDetails = (partner: any) => {
    setSelectedPartnerForDetails(partner);
    setShowDetailsModal(true);
  };
  // Function to open partner modal with pre-selected type
  const openPartnerModal = (partnerType?: string) => {
    const typeToSet = partnerType || activePartnerType;
    setActivePartnerType(typeToSet as keyof typeof partnerTypes);
    setShowPartnerModal(true);
  };

  // openLicenseModal handled directly via setShowLicenseModal
  return (
    <>
      <SEOHead
        seo={{
          title:
            "D-Secure Partners | Global Network of Trusted Data Erasure Experts",
          description:
            "Join the D-Secure Partner Program to offer globally recognized data erasure and diagnostics solutions. Empower your business with ITAD, MSP, and OEM opportunities.",
          keywords:
            "partnership, data erasure, ITAD partner, MSP partner, OEM partner, reseller program, d-secure tech",
          canonicalUrl: "https://dsecuretech.com/partners",
        }}
      />
      <SEOHead seo={getSEOForPage("partners")} />

      {/* ================= STICKY SECTION NAV ================= */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="bg-white border-b border-emerald-100 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              <Link
                to="/"
                className="flex items-center"
                aria-label="Return to D-Secure Homepage"
              >
                <ThemeAwareLogo
                  className="h-7 sm:h-8 w-auto"
                  responsive={true}
                />
              </Link>
              <nav className="flex items-center gap-1 overflow-x-auto py-2">
                {sectionNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-emerald-500 text-white shadow-md"
                        : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* ================= HERO SECTION ================= */}
        <section className="py-8 lg:py-12 xl:py-16 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              {/* Left: Content */}
              <Reveal>
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <GlobeIcon className="w-4 h-4" />
                    Global Partner Network
                  </div>

                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight">
                    Grow Your Business with{" "}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      D-Secure Partnership
                    </span>
                  </h1>

                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
                    Join our ecosystem of ITADs, MSPs, and Distributors. Deliver
                    world-class data erasure solutions while advancing
                    sustainability and global privacy standards.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => openPartnerModal()}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <StarIcon className="w-5 h-5" />
                      Join Program
                    </button>
                    <button
                      onClick={() =>
                        downloadPDF(
                          "partner-catalog.pdf",
                          "D-Secure_Partner_Catalog.pdf",
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300"
                    >
                      <ChevronDown className="w-5 h-5 text-emerald-500" />
                      Download Catalog
                    </button>
                  </div>
                </div>
              </Reveal>

              {/* Right: Hero Illustration - Static Network with Shield Hub */}
              <Reveal delayMs={100}>
                <div className="relative flex items-center justify-center min-h-[450px] lg:min-h-[550px] overflow-visible">
                  {/* Decorative Background Glows */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 via-transparent to-teal-200/20 blur-3xl rounded-full"></div>

                  <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
                    {/* Visual Orbit Paths (Static) */}
                    <div className="absolute w-[65%] h-[65%] border border-emerald-100/40 rounded-full"></div>
                    <div className="absolute w-[90%] h-[90%] border border-teal-100/20 rounded-full"></div>

                    {/* Quadrant User Icons (Static) */}
                    {/* Top User */}
                    <div className="absolute top-[5%] left-1/2 -translate-x-1/2">
                      <div className="bg-white p-3 rounded-2xl shadow-xl border border-emerald-50 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <User className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Bottom User */}
                    <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2">
                      <div className="bg-white p-3 rounded-2xl shadow-xl border border-emerald-50 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                          <User className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Left User */}
                    <div className="absolute top-1/2 left-[5%] -translate-y-1/2">
                      <div className="bg-white p-3 rounded-2xl shadow-xl border border-emerald-50 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                        <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                          <User className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Right User */}
                    <div className="absolute top-1/2 right-[5%] -translate-y-1/2">
                      <div className="bg-white p-3 rounded-2xl shadow-xl border border-emerald-50 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                          <User className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Central Shield Hub - Simplified as per user request */}
                    <div className="relative z-10">
                      {/* Suble Glow for Shield */}
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>

                      <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-[2.5rem] shadow-2xl border-4 border-emerald-50 flex items-center justify-center p-4 transform hover:scale-105 transition-transform duration-500">
                        {/* The green box part marked by the user in screenshot */}
                        <div className="w-full h-full bg-emerald-600 rounded-[2rem] shadow-lg shadow-emerald-500/30 flex items-center justify-center">
                          <ShieldIcon className="w-16 h-16 text-white" />
                        </div>
                      </div>

                      {/* Connection Lines (Static Brushes) */}
                      <div className="absolute top-1/2 left-[-60px] w-[60px] h-px bg-emerald-100/50"></div>
                      <div className="absolute top-1/2 right-[-60px] w-[60px] h-px bg-emerald-100/50"></div>
                      <div className="absolute top-[-60px] left-1/2 w-px h-[60px] bg-emerald-100/50"></div>
                      <div className="absolute bottom-[-60px] left-1/2 w-px h-[60px] bg-emerald-100/50"></div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= PARTNER PROGRAMS SECTION ================= */}
        <section id="partner-types" className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                  Specialized Partner Programs
                </h2>
                <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full mb-8"></div>
                <p className="text-slate-600 text-lg">
                  We offer tailored collaboration models designed to fit your
                  business structure and growth objectives.
                </p>
              </div>
            </Reveal>

            {/* Program Tabs */}
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {(
                  Object.keys(partnerTypes) as Array<keyof typeof partnerTypes>
                ).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActivePartnerType(type)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                      activePartnerType === type
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
                        : "bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Active Program Details */}
              <Reveal key={activePartnerType}>
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-emerald-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100 mb-2">
                      {activePartnerType === "ITAD Partner" && (
                        <ServerIcon className="w-4 h-4" />
                      )}
                      {activePartnerType === "MSP Partner" && (
                        <CloudIcon className="w-4 h-4" />
                      )}
                      {activePartnerType === "OEM Partner" && (
                        <GearIcon className="w-4 h-4" />
                      )}
                      {activePartnerType === "Distributor Partner" && (
                        <GlobeIcon className="w-4 h-4" />
                      )}
                      {activePartnerType === "Reseller Partner" && (
                        <Briefcase className="w-4 h-4" />
                      )}
                      Program Overview
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900">
                      {partnerTypes[activePartnerType].title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {partnerTypes[activePartnerType].description}
                    </p>

                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        <CheckIcon className="w-5 h-5 text-emerald-500" />
                        Key Program Highlights:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {partnerTypes[activePartnerType].benefits.map(
                          (benefit, idx) => (
                            <div
                              key={`benefit-${benefit}`}
                              className="flex items-center gap-2 text-slate-700"
                            >
                              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                              <span className="text-sm font-medium">
                                {benefit}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => openPartnerModal(activePartnerType)}
                        className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-emerald-600 transition-all duration-300 font-bold group shadow-xl hover:shadow-emerald-500/20"
                      >
                        Apply for {activePartnerType}
                        <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-emerald-100 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform"></div>
                    <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-1 shadow-inner aspect-[4/3] flex items-center justify-center overflow-hidden border border-emerald-200">
                      <div className="text-center p-8">
                        <div className="w-40 h-40 bg-white rounded-3xl flex items-center justify-center shadow-lg mb-6 mx-auto group-hover:scale-110 transition-transform duration-500">
                          {activePartnerType === "ITAD Partner" && (
                            <ServerIcon className="w-20 h-20 text-emerald-500" />
                          )}
                          {activePartnerType === "MSP Partner" && (
                            <CloudIcon className="w-20 h-20 text-teal-500" />
                          )}
                          {activePartnerType === "OEM Partner" && (
                            <GearIcon className="w-20 h-20 text-cyan-500" />
                          )}
                          {activePartnerType === "Distributor Partner" && (
                            <GlobeIcon className="w-20 h-20 text-emerald-500" />
                          )}
                          {activePartnerType === "Reseller Partner" && (
                            <Briefcase className="w-20 h-20 text-emerald-500" />
                          )}
                        </div>
                        <h4 className="text-emerald-900 font-bold text-lg mb-2">
                          {activePartnerType} Expertise
                        </h4>
                        <p className="text-emerald-700/60 text-sm">
                          Compliance Partnership Model
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ================= BENEFITS GRID ================= */}
        <section
          id="benefits"
          className="py-24 bg-slate-900 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Why Partner with D-Secure?
                </h2>
                <p className="text-slate-400 text-lg">
                  Access enterprise-grade tools, expert support, and global
                  market reach.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Compliance Erasure",
                  desc: "Solutions that meet 20+ international standards including NIST & DoD.",
                  icon: <ShieldIcon className="w-10 h-10 text-emerald-400" />,
                },
                {
                  title: "Scalable Growth",
                  desc: "Flexible licensing and special pricing to maximize your ROI.",
                  icon: <LightningIcon className="w-10 h-10 text-teal-400" />,
                },
                {
                  title: "Global Reach",
                  desc: "Operate in 190+ countries with localized expertise.",
                  icon: <GlobeIcon className="w-10 h-10 text-emerald-400" />,
                },
                {
                  title: "Premium Support",
                  desc: "24x5 dedicated technical and marketing assistance.",
                  icon: <MessageSquare className="w-10 h-10 text-teal-400" />,
                },
              ].map((benefit, idx) => (
                <Reveal key={`partner-benefit-${benefit.title}`} delayMs={idx * 100}>
                  <div className="group bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col">
                    <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================= JOIN PROCESS SECTION ================= */}
        <section
          id="process"
          className="py-24 bg-gradient-to-b from-white to-emerald-50/30"
        >
          <div className="container mx-auto px-4">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                  Simple Onboarding Process
                </h2>
                <p className="text-slate-600 text-lg">
                  Get started in four easy steps and join our network within
                  days.
                </p>
              </div>
            </Reveal>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  step: "01",
                  title: "Apply",
                  desc: "Fill out the partnership form",
                },
                {
                  step: "02",
                  title: "Review",
                  desc: "Our team validates your request",
                },
                {
                  step: "03",
                  title: "Onboarding",
                  desc: "Access the partner portal & training",
                },
                {
                  step: "04",
                  title: "Launch",
                  desc: "Start delivering D-Secure solutions",
                },
              ].map((item, idx) => (
                <Reveal key={`step-${item.step}`} delayMs={idx * 100}>
                  <div className="relative group text-center md:text-left p-6">
                    <div className="text-5xl font-black text-emerald-500/10 absolute top-0 left-0 md:-left-4 group-hover:text-emerald-500/20 transition-colors font-sans">
                      {item.step}
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-emerald-200"></div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        {/* ================= FIND A PARTNER SECTION ================= */}
        <section
          id="contact"
          className="py-24 bg-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-[3rem] overflow-hidden shadow-2xl relative">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/5 -skew-x-12 transform translate-x-1/2"></div>

              <div className="relative z-10 p-12 lg:p-20 flex flex-col items-center text-center">
                <Reveal>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/30 mb-8">
                    <GlobeIcon className="w-4 h-4" />
                    Global Network
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">
                    Looking for a Compliance Partner?
                  </h2>
                  <p className="text-slate-300 text-lg max-w-3xl mb-12">
                    Connect with our global network of experts across 190+
                    countries for localized implementation and support.
                  </p>

                  <div className="flex flex-wrap justify-center gap-6">
                    <button
                      onClick={() => setShowFindPartnerModal(true)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl shadow-emerald-500/20 scale-105 hover:scale-110 flex items-center gap-3"
                    >
                      Find Local Partner
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleContactRedirect}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/10 flex items-center gap-3"
                    >
                      Contact D-Secure Direct
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ================= REDUNDANT SECTIONS (COMMENTED OUT) =================
             <section className="py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
               <div className="absolute inset-0 opacity-10">
                 <div
                   className="absolute top-0 left-0 w-full h-full"
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
                   }}
                 ></div>
               </div>
               <div className="container-responsive relative z-10 px-4 sm:px-6">
                 <Reveal>
                   <div className="text-center">
                     <div className="mb-8 sm:mb-12">
                       <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                         <svg
                           xmlns="http://www.w3.org/2000/svg"
                           className="w-4 h-4"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={2}
                             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                           />
                         </svg>
                         Partner Discovery
                       </div>
                       <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                         Find A{" "}
                         <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                           Partner
                         </span>
                       </h2>
                       <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
                         Get to know about our global partners and easily locate
                         them. Connect with qualified D-Secure partners in your
                         region for seamless collaboration.
                       </p>
                       <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-10 max-w-lg sm:max-w-none mx-auto">
                         {[
                           {
                             icon: (
                               <HoverIcon>
                                 {(filled) => (
                                   <GlobeIcon className="w-4 h-4" filled={filled} />
                                 )}
                               </HoverIcon>
                             ),
                             text: "Global Network",
                           },
                           {
                             icon: (
                               <HoverIcon>
                                 {(filled) => (
                                   <Building
                                     className="w-4 h-4"
                                     fill={filled ? "currentColor" : "none"}
                                   />
                                 )}
                               </HoverIcon>
                             ),
                             text: "Location-Based",
                           },
                           {
                             icon: (
                               <HoverIcon>
                                 {(filled) => (
                                   <CheckIcon className="w-4 h-4" filled={filled} />
                                 )}
                               </HoverIcon>
                             ),
                             text: "Qualified Partners",
                           },
                           {
                             icon: (
                               <HoverIcon>
                                 {(filled) => (
                                   <MessageSquare className="w-4 h-4" fill={filled ? "currentColor" : "none"} />
                                 )}
                               </HoverIcon>
                             ),
                             text: "Direct Contact",
                           },
                         ].map((feature, index) => (
                           <div
                             key={index}
                             className="bg-white/10 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20 text-center flex items-center justify-center gap-1 sm:gap-2"
                           >
                             <span className="flex items-center justify-center">
                               {feature.icon}
                             </span>
                             <span className="hidden sm:inline">{feature.text}</span>
                             <span className="sm:hidden">
                               {feature.text.split(" ")[0]}
                             </span>
                           </div>
                         ))}
                       </div>
                       <button
                         onClick={() => setShowFindPartnerModal(true)}
                         className="w-full sm:w-auto group bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-teal-500 text-white font-bold px-6 sm:px-8 md:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 flex items-center justify-center gap-3 sm:gap-4 mx-auto text-base sm:text-lg"
                       >
                         <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white/20 rounded-md sm:rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                           <svg
                             className="w-4 sm:w-5 h-4 sm:h-5"
                             fill="currentColor"
                             viewBox="0 0 24 24"
                           >
                             <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                           </svg>
                         </div>
                         <span>Find Partners Near You</span>
                         <svg
                           className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-1 transition-transform"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path d="M13 7l5 5-5 5M6 12h12" />
                         </svg>
                       </button>
                     </div>
                   </div>
                 </Reveal>
               </div>
             </section>

             <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
               <div className="container-responsive">
                 <Reveal>
                   <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                     <div className="bg-gradient-to-r from-green-500 via-green-500 to-green-600 p-8 text-center">
                       <h2 className="text-4xl font-bold text-white mb-4">
                         Let's Get Started
                       </h2>
                       <p className="text-lg text-white/90 max-w-2xl mx-auto">
                         Have a question or want to know more about our solutions?
                       </p>
                     </div>
                     <div className="p-8 text-center">
                       <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <button
                           onClick={() => openLicenseModal()}
                           className="group bg-white border-2 border-green-200 hover:border-green-400 text-green-600 hover:bg-green-50 font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                         >
                           <span>Request Free License</span>
                         </button>
                         <button
                           onClick={handleContactRedirect}
                           className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 justify-center"
                         >
                           <span className="flex items-center gap-1">
                             <svg
                               xmlns="http://www.w3.org/2000/svg"
                               className="w-4 h-4"
                               fill="none"
                               viewBox="0 0 24 24"
                               stroke="currentColor"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                               />
                             </svg>
                             +91 11 4152 5085
                           </span>
                         </button>
                       </div>
                     </div>
                   </div>
                 </Reveal>
               </div>
             </section>
             ================= */}
      </div>
      {/* Partner Application Modal */}
      {showPartnerModal && (
        <PartnershipForm
          onSubmit={handlePartnerSubmit}
          onClose={() => setShowPartnerModal(false)}
          preSelectedPartnerType={activePartnerType}
          customConfig={{
            ...formConfigs.partnership,
            endpoint: "https://formsubmit.co/support@dsecuretech.com",
            onSuccess: () => {
              setShowPartnerModal(false);
              showToast(
                "Partnership application submitted successfully! We'll contact you soon.",
                "success",
              );
            },
          }}
        />
      )}
      {/* Find Partner Modal */}
      {showFindPartnerModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-hidden animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] max-w-6xl w-full max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-emerald-100/50">
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-8 rounded-t-[2rem] relative flex-shrink-0">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-inner">
                  <GlobeIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Search Our Partner Network</h2>
                <p className="text-emerald-50/80 mt-2 text-sm font-medium">Connect with certified security experts worldwide</p>
              </div>
              <button
                onClick={() => setShowFindPartnerModal(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <span className="leading-none">&times;</span>
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>
                {`.find-partner-scroll::-webkit-scrollbar { display: none; }`}
              </style>
              <div className="p-8 find-partner-scroll space-y-8">
                {/* Refined Filter Section */}
                <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 rounded-2xl p-8 border border-emerald-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-300/30 transition-colors duration-500"></div>
                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-emerald-800/60 mb-3">
                      <GlobeIcon className="w-3.5 h-3.5" />
                      Select Region
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200 appearance-none cursor-pointer"
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <label className="flex items-center gap-2 text-xs uppercase tracking-widest font-black text-emerald-800/60 mb-3">
                      <ShieldIcon className="w-3.5 h-3.5" />
                      Partner Type
                    </label>
                    <select
                      value={selectedPartnerType}
                      onChange={(e) => setSelectedPartnerType(e.target.value)}
                      className="w-full p-4 bg-white border-2 border-emerald-100 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-bold shadow-sm hover:border-emerald-200 appearance-none cursor-pointer"
                    >
                      {partnerTypesFilter.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Partners Result List */}
                <div className="space-y-6">
                  {filteredPartners.length > 0 ? (
                    filteredPartners.map((partner, index) => (
                      <div
                        key={`partner-${partner.company}-${partner.location}`}
                        className="group bg-white border border-slate-100 rounded-[1.5rem] p-8 hover:shadow-[0_15px_40px_-10px_rgba(16,185,129,0.15)] transition-all duration-500 hover:border-emerald-300/50 relative overflow-hidden"
                      >
                        {/* Interactive Background Elements */}
                        <div className="absolute top-0 left-0 w-2 h-0 group-hover:h-full bg-emerald-500 transition-all duration-500"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/30 blur-3xl rounded-full translate-x-32 -translate-y-32 group-hover:bg-emerald-100/40 transition-colors"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-10 items-center">
                          {/* Company Identity */}
                          <div className="lg:col-span-1 border-r border-slate-50 pr-4">
                            <div className="flex items-center gap-4 mb-5">
                              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform duration-500 border border-emerald-100/50">
                                <Building className="w-7 h-7" />
                              </div>
                              <div>
                                <h3 className="font-black text-slate-900 text-2xl tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                                  {partner.company}
                                </h3>
                                <div className="flex gap-2 mt-2">
                                  <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                    {partner.type}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold bg-slate-50/80 px-3 py-1.5 rounded-xl w-fit border border-slate-100">
                              <GlobeIcon className="w-4 h-4 text-emerald-500" />
                              {partner.location}
                            </div>
                          </div>

                          {/* Professional Details */}
                          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:px-6">
                            <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                  <User className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">
                                    Primary Contact
                                  </p>
                                  <p className="font-bold text-slate-700 text-lg">
                                    {partner.contact.name}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100/50 flex items-center justify-center text-teal-500">
                                  <MessageSquare className="w-5 h-5" />
                                </div>
                                <div className="flex-1 max-w-full overflow-hidden">
                                  <p className="text-[10px] text-teal-400 uppercase font-black tracking-widest mb-1">
                                    Direct Inquiry
                                  </p>
                                  <a
                                    href={`mailto:${partner.contact.email}`}
                                    className="font-bold text-emerald-600 hover:text-emerald-800 transition-all truncate block text-lg underline decoration-emerald-200 underline-offset-4 hover:decoration-emerald-500"
                                  >
                                    {partner.contact.email}
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                               <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100/50 flex items-center justify-center text-orange-500">
                                    <StarIcon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-orange-400 uppercase font-black tracking-widest mb-1">
                                      Mobile
                                    </p>
                                    <p className="font-bold text-slate-700 text-lg">
                                      {partner.contact.phone}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-500">
                                    <CheckIcon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-emerald-400 uppercase font-black tracking-widest mb-1">
                                      Status
                                    </p>
                                    <p className="font-bold text-emerald-700 text-lg flex items-center gap-1.5">
                                      Verified Compliance
                                    </p>
                                  </div>
                                </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="lg:col-span-1 flex flex-col gap-3">
                            <button
                              onClick={() => handleContactPartner(partner)}
                              className="group/btn bg-slate-900 text-white font-black px-6 py-4 rounded-xl transition-all duration-300 hover:bg-emerald-600 hover:translate-x-1 flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 hover:shadow-emerald-500/30"
                            >
                              Connect
                              <ArrowRightIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleViewDetails(partner)}
                              className="border-2 border-slate-100 text-slate-600 font-black px-6 py-4 rounded-xl transition-all duration-300 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 flex items-center justify-center gap-3"
                            >
                              Read Insights
                              {/* <ExternalLink className="w-4 h-4" /> */}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-24 bg-slate-50/40 rounded-[2.5rem] border-4 border-dashed border-slate-100">
                      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] border border-slate-100">
                        <GlobeIcon className="w-12 h-12 text-slate-300 animate-pulse" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                        No Partners Available
                      </h3>
                      <p className="text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
                        We currently have no active partners matching these specific filters. Try expanding your search area or selecting competitive partner types.
                      </p>
                    </div>
                  )}
                </div>

                {/* Refined Pagination */}
                <div className="flex justify-center items-center gap-3 mt-10 pt-8 border-t border-emerald-100/60">
                  <button className="w-10 h-10 rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center text-sm font-black transition-all hover:scale-110">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-xl border-2 border-slate-100 bg-white text-slate-400 flex items-center justify-center text-sm font-black hover:border-emerald-300 hover:text-emerald-600 transition-all hover:scale-110">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-xl border-2 border-slate-100 bg-white text-slate-400 flex items-center justify-center text-sm font-black hover:border-emerald-300 hover:text-emerald-600 transition-all hover:scale-110">
                    3
                  </button>
                  <span className="px-2 text-slate-300 font-black tracking-widest">...</span>
                  <button className="px-5 h-10 rounded-xl border-2 border-slate-100 bg-white text-slate-400 flex items-center justify-center text-xs font-black uppercase tracking-widest hover:border-emerald-300 hover:text-emerald-600 transition-all hover:scale-105">
                    Next Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onSubmit={handleLicenseSubmit}
          onClose={() => setShowLicenseModal(false)}
          customConfig={{
            ...formConfigs.license,
            endpoint: "https://formsubmit.co/support@dsecuretech.com",
            onSuccess: () => {
              setShowLicenseModal(false);
              showToast(
                "License request submitted successfully! We'll process your request soon.",
                "success",
              );
            },
          }}
        />
      )}
      {/* Contact Partner Modal - Premium Redesign */}
      {showContactModal && selectedPartnerForContact && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-hidden">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-emerald-100/50">
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-8 rounded-t-[2rem] relative flex-shrink-0">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-inner">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Contact Partner</h2>
                <p className="text-emerald-50/80 mt-1 text-sm font-medium">Send a direct inquiry to this partner</p>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <span className="leading-none">&times;</span>
              </button>
            </div>
            {/* Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="p-8 space-y-6">
                {/* Partner Info Card - Premium */}
                <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 rounded-2xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 blur-3xl -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <Building className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                          {selectedPartnerForContact.company}
                        </h3>
                        <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          {selectedPartnerForContact.type}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-emerald-800/50 mb-1">Contact</p>
                        <p className="font-bold text-slate-800 text-sm">{selectedPartnerForContact.contact.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-emerald-800/50 mb-1">Location</p>
                        <p className="font-bold text-slate-800 text-sm flex items-center gap-1">
                          <GlobeIcon className="w-3.5 h-3.5 text-emerald-500" />
                          {selectedPartnerForContact.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-emerald-800/50 mb-1">Phone</p>
                        <p className="font-bold text-emerald-600 text-sm">{selectedPartnerForContact.contact.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form - Premium */}
                <form
                  className="space-y-5"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (
                      !contactPartnerForm.name.trim() ||
                      !contactPartnerForm.email.trim() ||
                      !contactPartnerForm.subject.trim() ||
                      !contactPartnerForm.message.trim()
                    ) {
                      showToast("Please fill in all required fields.", "error");
                      return;
                    }
                    setIsContactSubmitting(true);
                    try {
                      const now = new Date();
                      const timestampLocal = now.toLocaleString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short",
                      });
                      const timestampISO = now.toISOString();

                      const partnerInfo = selectedPartnerForContact;

                      // === Prepare FormData for FormSubmit ===
                      const formSubmitData = new FormData();
                      formSubmitData.append(
                        "_webhook",
                        "https://api.dsecuretech.com/api/formsubmit/webhook",
                      );
                      formSubmitData.append("_captcha", "false");
                      formSubmitData.append("_template", "table");
                      formSubmitData.append(
                        "name",
                        contactPartnerForm.name.trim(),
                      );
                      formSubmitData.append(
                        "email",
                        contactPartnerForm.email.trim(),
                      );
                      formSubmitData.append(
                        "company",
                        contactPartnerForm.company.trim(),
                      );
                      formSubmitData.append(
                        "phone",
                        contactPartnerForm.phone.trim(),
                      );
                      formSubmitData.append(
                        "subject",
                        contactPartnerForm.subject.trim(),
                      );
                      formSubmitData.append(
                        "message",
                        contactPartnerForm.message.trim(),
                      );
                      formSubmitData.append(
                        "_replyto",
                        contactPartnerForm.email.trim(),
                      );
                      formSubmitData.append("timestamp", timestampLocal);
                      formSubmitData.append(
                        "partnerCompany",
                        partnerInfo?.company || "",
                      );
                      formSubmitData.append(
                        "partnerType",
                        partnerInfo?.type || "",
                      );
                      formSubmitData.append(
                        "partnerLocation",
                        partnerInfo?.location || "",
                      );
                      formSubmitData.append(
                        "source",
                        "Partners Page - Contact Partner Form",
                      );
                      formSubmitData.append(
                        "_subject",
                        `Partner Contact Inquiry: ${contactPartnerForm.subject.trim()} - D-Secure Tech`,
                      );
                      formSubmitData.append(
                        "_cc",
                        "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com",
                      );

                      // === Prepare submission data for Backend API ===
                      const submissionData = {
                        name: contactPartnerForm.name.trim(),
                        email: contactPartnerForm.email.trim(),
                        company: contactPartnerForm.company.trim(),
                        phone: contactPartnerForm.phone.trim(),
                        country: partnerInfo?.location || "",
                        businessType: partnerInfo?.type || "",
                        solutionType: "partner-contact",
                        complianceRequirements: "",
                        message: `[Partner: ${partnerInfo?.company || "N/A"}] ${contactPartnerForm.subject.trim()}: ${contactPartnerForm.message.trim()}`,
                        usageType: "",
                        source: "Partners Page - Contact Partner Form",
                        timestamp: timestampISO,
                      };

                      // Reset form and show success immediately
                      setContactPartnerForm({
                        name: "",
                        email: "",
                        company: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                      setIsContactSubmitting(false);
                      setShowContactModal(false);
                      showToast(
                        "Message sent successfully! The partner will contact you soon.",
                        "success",
                      );

                      try {
                        // === 1. SUBMIT TO BACKEND API (DATABASE) ===
                        const API_BASE = ENV.API_BASE_URL;
                        const apiResponse = await fetch(
                          `${API_BASE}/api/ContactFormSubmissions`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(submissionData),
                          },
                        );

                        // === 2. SUBMIT TO FORMSUBMIT (EMAIL & WEBHOOK) ===
                        await fetch(
                          "https://formsubmit.co/support@dsecuretech.com",
                          {
                            method: "POST",
                            body: formSubmitData,
                            headers: { Accept: "application/json" },
                          },
                        );

                        // === 3. Microsoft Excel + Teams tracking (non-blocking) ===
                        fetch(ENV.POWER_AUTOMATE_HTTP_URL, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            "x-api-key": "REACT_CONTACT_2026",
                          },
                          body: JSON.stringify(submissionData),
                        }).catch(() => {});

                        if (!apiResponse.ok) {
                          const errorData = await apiResponse.json();
                          console.error(
                            "Backend submission failed:",
                            errorData,
                          );
                        }
                      } catch (error: any) {
                        console.error("Form error:", error);
                      }
                    } catch (error) {
                      console.error("FormSubmit error:", error);
                      showToast(
                        "Failed to send message. Please try again.",
                        "error",
                      );
                      setIsContactSubmitting(false);
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-slate-500 mb-2">
                        <User className="w-3.5 h-3.5" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactPartnerForm.name}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full border-2 border-emerald-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-medium shadow-sm hover:border-emerald-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-slate-500 mb-2">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactPartnerForm.email}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full border-2 border-emerald-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-medium shadow-sm hover:border-emerald-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-slate-500 mb-2">
                        <Building className="w-3.5 h-3.5" />
                        Company
                      </label>
                      <input
                        type="text"
                        value={contactPartnerForm.company}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                        className="w-full border-2 border-emerald-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-medium shadow-sm hover:border-emerald-200"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-slate-500 mb-2">
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={contactPartnerForm.phone}
                        onChange={(e) =>
                          setContactPartnerForm((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full border-2 border-emerald-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-medium shadow-sm hover:border-emerald-200"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-slate-500 mb-2">
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      value={contactPartnerForm.subject}
                      onChange={(e) =>
                        setContactPartnerForm((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      className="w-full border-2 border-emerald-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-medium shadow-sm hover:border-emerald-200"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-slate-500 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={contactPartnerForm.message}
                      onChange={(e) =>
                        setContactPartnerForm((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full border-2 border-emerald-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-300 outline-none text-slate-700 font-medium shadow-sm hover:border-emerald-200 resize-none"
                      placeholder="Describe your requirements or questions..."
                    />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isContactSubmitting}
                      className="flex-1 bg-slate-900 text-white py-4 px-6 rounded-xl hover:bg-emerald-600 transition-all duration-300 font-black shadow-xl shadow-slate-900/10 hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isContactSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRightIcon className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className="px-6 py-4 border-2 border-slate-100 text-slate-600 rounded-xl hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-300 font-black"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {/* Quick Contact Options - Premium */}
                <div className="pt-6 border-t border-emerald-100/60">
                  <p className="text-xs uppercase tracking-widest font-black text-emerald-800/50 mb-4">Or contact directly</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selectedPartnerForContact.contact.email}`}
                      className="bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-xl hover:bg-emerald-100 transition-all duration-300 text-sm font-bold flex items-center gap-2 border border-emerald-100 hover:border-emerald-200 hover:shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Send Email
                    </a>
                    <a
                      href={`tel:${selectedPartnerForContact.contact.phone}`}
                      className="bg-teal-50 text-teal-700 px-5 py-2.5 rounded-xl hover:bg-teal-100 transition-all duration-300 text-sm font-bold flex items-center gap-2 border border-teal-100 hover:border-teal-200 hover:shadow-sm"
                    >
                      <StarIcon className="w-4 h-4" />
                      Call Now
                    </a>
                    <a
                      href={selectedPartnerForContact.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-all duration-300 text-sm font-bold flex items-center gap-2 border border-slate-100 hover:border-slate-200 hover:shadow-sm"
                    >
                      <GlobeIcon className="w-4 h-4" />
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* View Details Modal - Premium Redesign */}
      {showDetailsModal && selectedPartnerForDetails && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-hidden">
          <div className="bg-white rounded-[2rem] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-emerald-100/50">
            {/* Premium Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white p-8 rounded-t-[2rem] relative flex-shrink-0">
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
              <div className="flex flex-col items-center relative z-10">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30 shadow-inner">
                  <ShieldIcon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Partner Details</h2>
                <p className="text-emerald-50/80 mt-1 text-sm font-medium">Comprehensive partner information</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <span className="leading-none">&times;</span>
              </button>
            </div>
            {/* Scrollable Content */}
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="p-8 space-y-8">
                {/* Company Header Card - Premium */}
                <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 rounded-2xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 blur-3xl -mr-16 -mt-16"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                        <Building className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                          {selectedPartnerForDetails.company}
                        </h3>
                        <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest">
                          {selectedPartnerForDetails.type}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-xl p-3 border border-emerald-50 shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest font-black text-emerald-800/50 mb-1">Location</p>
                        <p className="font-bold text-slate-800 text-sm flex items-center gap-1">
                          <GlobeIcon className="w-3.5 h-3.5 text-emerald-500" />
                          {selectedPartnerForDetails.location}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-emerald-50 shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest font-black text-emerald-800/50 mb-1">Established</p>
                        <p className="font-bold text-slate-800 text-sm">2015</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-emerald-50 shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest font-black text-emerald-800/50 mb-1">Team Size</p>
                        <p className="font-bold text-slate-800 text-sm">50-200</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-emerald-50 shadow-sm">
                        <p className="text-[10px] uppercase tracking-widest font-black text-emerald-800/50 mb-1">Compliance</p>
                        <p className="font-bold text-emerald-600 text-sm">ISO 27001, NIST</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Overview */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
                    <ClipboardIcon className="w-5 h-5 text-emerald-500" />
                    Company Overview
                  </h4>
                  <div className="bg-white border-2 border-emerald-50 rounded-2xl p-6 shadow-sm">
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {selectedPartnerForDetails.company} is a leading{" "}
                      {selectedPartnerForDetails.type.toLowerCase()}{" "}
                      specializing in secure data erasure and IT asset
                      disposition services. With over 8 years of experience in
                      the industry, we have successfully served over 500+
                      clients across various sectors including healthcare,
                      finance, and government organizations.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Our team of Compliant professionals ensures complete data
                      destruction compliance with international standards
                      including NIST 800-88, DOD 5220.22-M, and Common Criteria.
                      We provide comprehensive regulatory documents of
                      destruction for audit purposes and maintain the highest
                      levels of security throughout the data erasure process.
                    </p>
                  </div>
                </div>

                {/* Services Offered */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
                    <GearIcon className="w-5 h-5 text-emerald-500" />
                    Services Offered
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Secure Data Erasure",
                      "IT Asset Disposition",
                      "Hard Drive Destruction",
                      "Mobile Device Wiping",
                      "Server Decommissioning",
                      "Compliance Consulting",
                      "Regulatory Document Generation",
                      "On-site Services",
                    ].map((service, index) => (
                      <div
                        key={`service-${service}`}
                        className="group bg-white border-2 border-emerald-50 rounded-xl p-4 hover:border-emerald-300 hover:shadow-sm transition-all duration-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">
                            <CheckIcon className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                          </div>
                          <span className="font-bold text-slate-800 text-sm">
                            {service}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-black text-slate-900 mb-4">
                    <MessageSquare className="w-5 h-5 text-emerald-500" />
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Primary Contact */}
                    <div className="bg-white border-2 border-emerald-50 rounded-2xl p-6 shadow-sm">
                      <p className="text-[10px] uppercase tracking-widest font-black text-emerald-800/50 mb-4">Primary Contact</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Name</p>
                            <p className="font-bold text-slate-800 text-sm">{selectedPartnerForDetails.contact.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                            <MessageSquare className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Email</p>
                            <a href={`mailto:${selectedPartnerForDetails.contact.email}`} className="font-bold text-emerald-600 hover:text-emerald-800 text-sm underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-500 transition-all">
                              {selectedPartnerForDetails.contact.email}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500">
                            <StarIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Phone</p>
                            <a href={`tel:${selectedPartnerForDetails.contact.phone}`} className="font-bold text-emerald-600 hover:text-emerald-800 text-sm transition-all">
                              {selectedPartnerForDetails.contact.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-500">
                            <GlobeIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Website</p>
                            <a href={selectedPartnerForDetails.contact.website} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-600 hover:text-emerald-800 text-sm underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-500 transition-all">
                              {selectedPartnerForDetails.contact.website}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Business Hours */}
                    <div className="bg-white border-2 border-emerald-50 rounded-2xl p-6 shadow-sm">
                      <p className="text-[10px] uppercase tracking-widest font-black text-emerald-800/50 mb-4">Business Hours</p>
                      <div className="space-y-3">
                        {[
                          { day: "Monday - Friday", time: "9:00 AM - 6:00 PM", active: true },
                          { day: "Saturday", time: "9:00 AM - 2:00 PM", active: true },
                          { day: "Sunday", time: "Closed", active: false },
                        ].map((schedule, idx) => (
                          <div key={`schedule-${schedule.day}`} className="flex items-center justify-between py-2 border-b border-emerald-50 last:border-0">
                            <span className="text-slate-600 font-medium text-sm">{schedule.day}</span>
                            <span className={`font-bold text-sm ${schedule.active ? "text-slate-800" : "text-slate-400"}`}>{schedule.time}</span>
                          </div>
                        ))}
                        <div className="bg-emerald-50 rounded-xl p-3 mt-2 border border-emerald-100">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] uppercase tracking-widest font-black text-emerald-700">Emergency: 24/7 Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-emerald-100/60">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleContactPartner(selectedPartnerForDetails);
                    }}
                    className="flex-1 bg-slate-900 text-white py-4 px-6 rounded-xl hover:bg-emerald-600 transition-all duration-300 font-black shadow-xl shadow-slate-900/10 hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
                  >
                    Contact This Partner
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-4 border-2 border-slate-100 text-slate-600 rounded-xl hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-300 font-black"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toast && <Toast toast={toast} onClose={hideToast} />}
    </>
  );
});

export default PartnersPage;
