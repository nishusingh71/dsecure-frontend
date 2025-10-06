import React, { useState } from "react";
import Head from "next/head";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { 
  PartnershipForm, 
  LicenseForm, 
  type PartnershipFormData, 
  type LicenseFormData 
} from "@/components/forms";
import { FormField, TextAreaField, SelectField } from "@/components/ui";

const PartnersPage: React.FC = () => {
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showFindPartnerModal, setShowFindPartnerModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [activePartnerType, setActivePartnerType] = useState<keyof typeof partnerTypes>('ITAD Partner');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedPartnerType, setSelectedPartnerType] = useState('All Partner Types');
  
  // reCAPTCHA verification states
  const [partnerRecaptchaVerified, setPartnerRecaptchaVerified] = useState(false);
  const [licenseRecaptchaVerified, setLicenseRecaptchaVerified] = useState(false);

  // Mock partner data based on attachment
  const partnersList = [
    {
      company: 'ABC International Trading Services Co. ltd',
      type: 'Reseller',
      location: 'Vietnam',
      contact: {
        name: 'Nguyen Minh Duc',
        email: 'nguyen.duc@international.com.vn',
        phone: '+84 903 447 799',
        website: 'https://international.vn'
      }
    },
    {
      company: 'Advantage Industries',
      type: 'Distributor',
      location: 'United States',
      contact: {
        name: 'Michael Johnson',
        email: 'michael.johnson@advantage-corp.com',
        phone: '+1 763 423 5338',
        website: 'https://www.advantagecorp.com'
      }
    },
    {
      company: 'Alternative Technologies SAC',
      type: 'Reseller',
      location: 'Peru',
      contact: {
        name: 'Carlos Rodriguez',
        email: 'carlos.rodriguez@alternativetech.com.pe',
        phone: '+511 200 6215',
        website: 'https://www.alternativetech.com.pe'
      }
    },
    {
      company: 'Asociaci SE De CV',
      type: 'Distributor',
      location: 'Mexico',
      contact: {
        name: 'Maria Elena Villegas',
        email: 'maria.villegas@asociaci.com',
        phone: '+52 477 1395',
        website: 'https://www.asociaci.com'
      }
    },
    {
      company: 'Active Link',
      type: 'Distributor',
      location: 'Italy',
      contact: {
        name: 'Marco Rossi',
        email: 'marco.rossi@activelink.it',
        phone: '+39 0544 236841',
        website: 'https://www.activelink.it'
      }
    },
    {
      company: 'TechGuard Solutions India',
      type: 'ITAD Partner',
      location: 'India',
      contact: {
        name: 'Priya Sharma',
        email: 'priya.sharma@techguard.in',
        phone: '+91 98765 43210',
        website: 'https://www.techguard.in'
      }
    },
    {
      company: 'SecureData UK Ltd',
      type: 'MSP Partner',
      location: 'United Kingdom',
      contact: {
        name: 'James Wilson',
        email: 'james.wilson@securedata.co.uk',
        phone: '+44 20 7123 4567',
        website: 'https://www.securedata.co.uk'
      }
    },
    {
      company: 'DataWipe Australia Pty',
      type: 'ITAD Partner',
      location: 'Australia',
      contact: {
        name: 'Sarah Chen',
        email: 'sarah.chen@datawipe.com.au',
        phone: '+61 2 9876 5432',
        website: 'https://www.datawipe.com.au'
      }
    }
  ];

  const countries = ['All Countries', 'United States', 'India', 'Vietnam', 'Peru', 'Mexico', 'Italy', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'China', 'Brazil'];
  const partnerTypesFilter = ['All Partner Types', 'ITAD Partner', 'MSP Partner', 'Distributor', 'Reseller', 'OEM Partner'];

  const filteredPartners = partnersList.filter(partner => {
    const countryMatch = selectedCountry === 'All Countries' || partner.location === selectedCountry;
    const typeMatch = selectedPartnerType === 'All Partner Types' || partner.type === selectedPartnerType;
    return countryMatch && typeMatch;
  });

  const partnerTypes = {
    'ITAD Partner': {
      title: 'ITAD Partner Program',
      description: 'The DSecure ITAD Partner Program is designed for IT asset disposition companies looking to accelerate their data erasure solutions and protocols. Join our ITAD Partner program to offer secure data erasure service using globally tested & approved erasure solutions to your customers and help them meet global data privacy compliance.',
      benefits: [
        'Scalable & Automated Data Erasure & Diagnostics Software',
        'Free Assisted Remote Deployment & Training',
        'FREE Product Updates',
        'Price Lock in During Contract Term',
        'FREE Premium Technical Support - 24*5',
        'Customized Solution For ITADs'
      ],
      detailedBenefits: [
        {
          title: 'Scalable & Automated Data Erasure & Diagnostics Software',
          description: 'DSecure secure data erasure & diagnostics software allows you to start wiping up to 64 drives simultaneously. The software focus can consolidate the ITAD\'s data wiping capabilities across all types of storage media, including hard drives, SSDs, built-in drives in computers & Mac systems, servers, and OS & Android devices.'
        },
        {
          title: 'Price Lock in During Contract Term',
          description: 'By selecting DSecure solution as a part of the benefit of purchasing bulk licenses of DSecure at a special discounted pricing, the special price lock in for the term of the contract ensures that there is no change in price if you order a data erasure volumes over time.'
        },
        {
          title: 'FREE Premium Technical Support - 24*5',
          description: 'DSecure provides free technical support for DSecure on offering assistance from our experts. Whether it is technical assistance or help with deployment and understanding our dedicated support team is here to help DSecure achieve exceptional service to their clients.'
        },
        {
          title: 'Customized Solution For ITADs',
          description: 'For large ITAD partners we offer customized solution to automate their data wiping process to maximize human intervention and improve their existing data erasure process. We also help with the consultations to improve the existing process and increase efficiency in operations.'
        }
      ]
    },
    'MSP Partner': {
      title: 'MSP Partner Program',
      description: 'The DSecure MSP Partner Program empowers IT Managed Service Providers to efficiently incorporate data erasure services into their offerings, expanding their portfolio and adding value to their customers by ensuring the risk of data breach is significantly reduced ensuring relevant laws and regulations such as CCPA, HIPAA, SOX, and ISO 27001.',
      benefits: [
        'Expand Your Portfolio',
        'Comprehensive Training',
        'Access Marketing Collaterals',
        'Free Product Updates',
        'Special MSP Pricing',
        'Effortless Data Erasure Software',
        'Get Listed On DSecure Partner Section',
        'Free Technical Support'
      ],
      detailedBenefits: [
        {
          title: 'Expand Your Portfolio',
          description: 'Managed Service Providers (MSPs) allows MSPs to offer data erasure as a service, enriching their portfolio. This expansion attracts organizations requiring comprehensive data security solutions, positioning MSPs as versatile, end-to-end service providers. By adding data erasure services, MSPs differentiate themselves, enhance revenue, and position as trusted data security partners.'
        },
        {
          title: 'Special MSP Pricing',
          description: 'Enrolling in our MSP Partner Program offers pricing as an MSP partner. With DSecure - Purchase licenses at a special price to offer software as a service to your clients. With the special pricing only available to MSPs who are partners with us in the market. Further, partners can get cost reduced erasure solutions ensuring accessibility for MSPs.'
        },
        {
          title: 'Effortless Data Erasure Software',
          description: 'DSecure\'s secure data erasure software enables MSPs to initiate fast and effortless data erasure. The software brings automation, quick identification and erasure for your clients across over 65,000 drives. As part of our Partner Program, you\'ll receive the same experience at all voluntary programs they call how you operate. This includes services accomplished by user-friendly manual for seamless operations support across all types of drives to provide services to your clients.'
        },
        {
          title: 'Get Listed On DSecure Partner Section',
          description: 'By becoming our valuable MSP Partner, you get listed in the partner section of our website. B2B Customers can look out for partners who are experts in their compliance requirements to visit their team that can convert to revenue. Also, your customers gain trust that you are an expert from Authorized MSP Partner.'
        }
      ]
    },
    'Distributor Partner': {
      title: 'Distributor Partner Program',
      description: 'DSecure Distributor Program for DSecure is meant for all those software distributors that have global partnerships. partner reach in order to sell data erasure products for wiping and asset service. that financial data compliance and software for wiping data permanently from HDDs, SSDs, Tablets, Desktop, service & mobile devices including OS & Android devices.',
      benefits: [
        'Go-To-Market Support',
        'Free 24*7 Technical Support',
        'Regular Updates',
        'Product Sales Training',
        'Trusted Brand',
        'Deal Registration Benefits'
      ],
      detailedBenefits: [
        {
          title: 'Go-To-Market Support',
          description: 'Distributors are required to increase the generation and reach of DSecure products by fixing business processes and developing solutions for data erasure software with comprehensive go-to-market strategy. Includes DSecure brochures, technical fact sheets, product videos, demo materials to support the distributors business.'
        },
        {
          title: 'Product Sales Training',
          description: 'All partners receive training and they get training on the features and functionality of DSecure product to understand the various data structures and compliance. We also advise the partners by providing sales documentation.'
        },
        {
          title: 'Trusted Brand',
          description: 'DSecure is most trusted brand in the data erasure industry that enables the global trust building. Be aware that all solutions are built be aware. A company that is is celebrated for 25+ years in developing software and providing in-lab service globally.'
        },
        {
          title: 'Deal Registration Benefits',
          description: 'Deal Registration is a great advantage to our Distributors, it allows you to keep a best-foot-in-root your company that particular partner and projects that can be of high priority. We can provide better price for registered deals for our channel partner along with product, support and service deployment.'
        }
      ]
    },
    'Reseller Partner': {
      title: 'Reseller Partner Program', 
      description: 'Become our Reseller to deliver secure & reliable data erasure software to enterprise customers and help them meet compliance. Get great discounts when leveraging our globally tested and certified solutions, help your customers meet global data privacy compliance requirements, with ease.',
      benefits: [
        'Product Sales Training',
        'Free Assisted Technology Support',
        'Regular Updates And Communication',
        'Co-To-Market Enablement',
        'Deal Registration Benefits',
        'Trusted Supplier'
      ],
      detailedBenefits: [
        {
          title: 'Product Sales Training',
          description: 'The program provides you with simple training on the complete DSecure product lineup and functionality understanding of all features and technical aspects that benefits in advanced knowledge transfer sessions remotely equip you with the level of readiness you need to market the best product in the market.'
        },
        {
          title: 'Co-To-Market Enablement',
          description: 'You get all the necessary sales and marketing collaterals when you join the DSecure Reseller Partner Program. We provide campaign brochures, product one-pagers, technical data sheets, prospects, and more to support and roll out your go-to-market strategy for the region that you operate.'
        },
        {
          title: 'Deal Registration Benefits',
          description: 'Reseller program allows you look in benefit when you register for a deal through a deal registration, you can look the deal for a given duration such that the DSecure sales team does not directly approach the same prospect. Deal registration also ensures that you do get a lead protection for you totally.'
        },
        {
          title: 'Trusted Supplier',
          description: 'DSecure is globally trusted brand renowned for its data erasure. Stellar have worked to satisfy customers across around the world in 190 countries. The company has been in existence for 30+ years developing software and providing in-lab services.'
        }
      ]
    },
    'OEM Partner': {
      title: 'OEM Partner Program',
      description: 'DSecure OEM Partnership Program helps you to implement and channel your existing product portfolio by offering data erasure solutions to your customers in order to safeguard their from liability.',
      benefits: [
        'Best-Selling Software',
        'High Conversion Rate',
        'Strong Technical Support',
        'Comprehensive Solution',
        'Trusted & Certified',
        'Trusted Brand Quality'
      ],
      detailedBenefits: [
        {
          title: 'Best-Selling Software',
          description: 'DSecure software is renowned for its reliability, trustworthiness, and ease of use. We enjoy a vast customer base of more users in need of high quality data erasure solutions. Being an OEM partner, you can bundle our in-house professional data erasure software, largely unparalleled in the data erasure software industry.'
        },
        {
          title: 'Comprehensive Solution',
          description: 'DSecure software OEM partnership is successfully sync across all the storage drive and devices segments, including the actively operating drive hardware and those being for end-of-lifecycle. Our OEM partnership covers innovative data sanitization solutions for individual Mac, computer and mobile devices, and hybrid cloud drives, and mobile devices.'
        },
        {
          title: 'Trusted & Certified',
          description: 'DSecure is trusted, certified, and approved by leading international accreditation bodies, such as NIST, ADISA, NVCP Common Criteria. We have certification standard that is certified compliance across NIST FIPS 140-2, ADISA and Common Criteria compliant data erasure solutions.'
        },
        {
          title: 'Trusted Brand Quality',
          description: 'DSecure is a product from DSecure - one of the leading global data tech brands, trusted by millions 100 companies. Our ISO 9001:2015 certified R&D processes ensure compliance with the highest product quality, and the success of our Partner business.'
        }
      ]
    }
  } as const;

  const handlePartnerSubmit = (formData: PartnershipFormData) => {
    // Check reCAPTCHA verification
    if (!partnerRecaptchaVerified) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }
    
    // Prepare email data
    const emailData = {
      to: 'dhruv.rai@dsecuretech.com',
      subject: 'New Partner Application - ' + formData.companyName,
      body: `
        New Partner Application Received:
        
        Company Information:
        - Company Name: ${formData.companyName}
        - Website: ${formData.website}
        - Country: ${formData.country}
        - Partner Type: ${formData.partnerType}
        
        Contact Information:
        - Full Name: ${formData.fullName}
        - Business Email: ${formData.businessEmail}
        - Phone Number: ${formData.phoneNo}
        
        Business Description:
        ${formData.businessDescription}
        
        Application submitted on: ${new Date().toLocaleString()}
      `
    };

    // Here you would integrate with your email service (EmailJS, etc.)
    console.log('Partner application submitted:', formData);
    console.log('Email data:', emailData);
    
    // Simulate API call
    setTimeout(() => {
      alert('Partner application submitted successfully! We will contact you soon.');
      setShowPartnerModal(false);
      setPartnerRecaptchaVerified(false);
    }, 1000);
  };

  const handleLicenseSubmit = (formData: LicenseFormData) => {
    // Check reCAPTCHA verification
    if (!licenseRecaptchaVerified) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }
    
    // Prepare email data for license request
    const emailData = {
      to: 'license@dsecure.com',
      subject: 'Free License Request - ' + formData.company,
      body: `
        New Free License Request Received:
        
        Usage Type: ${formData.usage}
        
        Personal Information:
        - Full Name: ${formData.fullName}
        - Email: ${formData.email}
        - Phone: ${formData.phone}
        
        Company Information:
        - Company: ${formData.company}
        - Country: ${formData.country}
        - Business Type: ${formData.businessType}
        - Compliance Requirements: ${formData.compliance}
        
        Erasure Requirements:
        - What to Erase: ${formData.eraseOption}
        - Number of Devices: ${formData.deviceCount}
        
        Additional Requirements:
        ${formData.requirements}
        
        Request submitted on: ${new Date().toLocaleString()}
      `
    };

    // Here you would integrate with your email service (EmailJS, etc.)
    console.log('License request submitted:', formData);
    console.log('Email data:', emailData);
    
    // Simulate API call
    setTimeout(() => {
      alert('Free license request submitted successfully! We will send you the license details soon.');
      setShowLicenseModal(false);
      setLicenseRecaptchaVerified(false);
    }, 1000);
  };

  const handleContactRedirect = () => {
    // Redirect to contact page
    window.location.href = '/contact';
  };

  // reCAPTCHA callback functions
  const onPartnerRecaptchaChange = (value: string | null) => {
    setPartnerRecaptchaVerified(!!value);
  };

  const onLicenseRecaptchaChange = (value: string | null) => {
    setLicenseRecaptchaVerified(!!value);
  };

  // Function to open partner modal with pre-selected type
  const openPartnerModal = (partnerType?: string) => {
    const typeToSet = partnerType || activePartnerType;
    setActivePartnerType(typeToSet as keyof typeof partnerTypes);
    (window as any).partnerRecaptchaVerified = false;
    setShowPartnerModal(true);
  };

  // Function to open license modal
  const openLicenseModal = () => {
    (window as any).licenseRecaptchaVerified = false;
    setShowLicenseModal(true);
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://dsecuretech.com/partners" />
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <title>
          Partners | DSecure Technology Partners & Integrations
        </title>
        <meta
          name="description"
          content="Partner with DSecure for data erasure solutions. Explore our technology partnerships, integrations, and collaborative opportunities for secure data destruction."
        />
        <meta
          name="keywords"
          content="DSecure partners, technology partnerships, data erasure integrations, partner program, collaboration opportunities"
        />
        <meta name="robots" content="index, follow" />
        <script>
          {`
            window.onPartnerRecaptchaChange = function(token) {
              window.partnerRecaptchaVerified = !!token;
            };
            window.onLicenseRecaptchaChange = function(token) {
              window.licenseRecaptchaVerified = !!token;
            };
          `}
        </script>
      </Head>
      
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container-app">
            <Reveal>
              <div className="text-center">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                    <span className="text-brand">D</span>Secure<sup className="text-2xl text-brand"></sup>
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-6">
                    Partner Program
                  </h2>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
                    Join our Partner Program today and become a part of our extensive network and 
                    unlock new business opportunities with our best in class cutting-edge data 
                    erasure solutions. Partner with us to advance for sustainability while 
                    improving our innovative products.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => openPartnerModal()}
                      className="bg-brand hover:bg-brand-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Sign Up Now →
                    </button>
                    <button className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold px-8 py-3 rounded-lg transition-all duration-300 bg-white hover:bg-slate-50">
                      Download Partner Catalog →
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="container-app">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  <span className="text-brand">GROW YOUR BUSINESS WITH </span>
                  <span className="bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">DSECURE</span><sup className="text-brand text-lg"></sup>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                  Choose your partnership type to unlock specialized benefits and opportunities
                </p>
              </div>
            </Reveal>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {(Object.keys(partnerTypes) as Array<keyof typeof partnerTypes>).map((partnerTitle, index) => (
                <Reveal key={partnerTitle} delayMs={index * 100}>
                  <button 
                    onClick={() => setActivePartnerType(partnerTitle)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-lg ${
                      activePartnerType === partnerTitle
                        ? 'bg-gradient-to-r from-brand to-brand-600 text-white border-transparent'
                        : 'bg-white hover:bg-gradient-to-r hover:from-brand hover:to-brand-600 hover:text-white text-slate-700 border border-slate-300 hover:border-transparent'
                    }`}
                  >
                    {partnerTitle}
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ITAD Partner Program */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-app">
            <div className="grid lg:grid-cols-1 gap-12 items-center">
            <Reveal>
                <div className="bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 rounded-3xl p-8 shadow-2xl border border-slate-200/50 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm">
                    {/* Header with Icon */}
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-brand via-brand-500 to-brand-600 rounded-3xl flex items-center justify-center shadow-xl">
                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-3">
                                DSecure<sup className="text-brand text-lg"></sup> {partnerTypes[activePartnerType].title}
                            </h3>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-brand via-brand-500 to-brand-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-slate-100 shadow-sm">
                        <p className="text-slate-700 leading-relaxed text-lg font-medium">
                            {partnerTypes[activePartnerType].description}
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid gap-6 mb-8">
                        <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-brand rounded-full"></span>
                            Key Benefits
                        </h4>
                        <div className="grid gap-6">
                            {partnerTypes[activePartnerType].detailedBenefits?.map((benefit, index) => (
                                <div key={index} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-100/50 hover:border-brand/30 hover:bg-white transition-all duration-300 group shadow-md hover:shadow-xl transform hover:-translate-y-1">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-brand via-brand-500 to-brand-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-bold text-slate-900 mb-3 text-xl group-hover:text-brand transition-colors duration-300">
                                                {benefit.title}
                                            </h5>
                                            <p className="text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors duration-300">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )) || partnerTypes[activePartnerType].benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-3 p-4 bg-white/80 rounded-xl border border-slate-100 hover:border-brand/30 hover:bg-white transition-all duration-300 group">
                                    <div className="w-6 h-6 bg-gradient-to-br from-brand to-brand-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors duration-300">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gradient-to-r from-transparent via-slate-200 to-transparent">
                        <button 
                            onClick={() => openPartnerModal(activePartnerType)}
                            className="flex-1 bg-gradient-to-r from-brand via-brand-500 to-brand-600 hover:from-brand-600 hover:via-brand-600 hover:to-brand-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-3 group"
                        >
                            <span className="text-lg">Join Partnership Program</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13 7l5 5-5 5M6 12h12"/>
                            </svg>
                        </button>
                        <button className="flex-1 border-2 border-slate-300 hover:border-brand hover:bg-gradient-to-r hover:from-brand/5 hover:to-brand/10 text-slate-700 hover:text-brand font-semibold px-8 py-4 rounded-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-lg group">
                            <span>Download Brochure</span>
                            <svg className="w-4 h-4 inline-block ml-2 group-hover:translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2v13l4-4m-4 4l-4-4m4 4v5"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </Reveal>
            </div>
          </div>
        </section>

        {/* Find A Partner */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-brand to-brand-600">
          <div className="container-app">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Find A Partner</h2>
                <p className="text-lg mb-8 text-white/90">
                  Get to know about our global partners and easily locate them
                </p>
                <button 
                  onClick={() => setShowFindPartnerModal(true)}
                  className="bg-white text-brand hover:bg-slate-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Find A Partner →
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Partner Benefits */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-app">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  <span className="text-brand">WHY COLLABORATE WITH </span>
                  <span className="bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">DSECURE</span><sup className="text-brand text-lg"></sup>
                </h2>
                <h3 className="text-xl font-semibold text-slate-700">
                  Our Partner Benefits
                </h3>
              </div>
            </Reveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Get Certified Data Erasure Products',
                  description: 'Access to certified data erasure solutions with international standards and algorithms. Get quality 40+ international standards by integrating our data erasure technology.',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                  ),
                  color: 'from-red-500 to-red-600'
                },
                {
                  title: 'Marketing & Sales Enablement',
                  description: 'Partners get access to our sales enablement and analytics to help them understand customer requirements. Get comprehensive marketing materials and product selling aids.',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  ),
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  title: 'Free 24*7 Technical Support',
                  description: 'Get the best pre-sales & after sales support for all DSecure solutions. Our staff provides regular training and extended deployments with high experience.',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  ),
                  color: 'from-green-500 to-green-600'
                },
                {
                  title: 'Trusted Supplier',
                  description: 'We give you the opportunity to achieve bigger goals providing you the power around gaining a global data client with our track record of bringing innovation & trust.',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ),
                  color: 'from-purple-500 to-purple-600'
                }
              ].map((benefit, index) => (
                <Reveal key={benefit.title} delayMs={index * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 hover:shadow-2xl transition-all duration-300 group h-full">
                    <div className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                        {benefit.icon}
                      </div>
                      <h4 className="font-bold text-slate-900 mb-3 text-lg">{benefit.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600">
          <div className="container-app">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Let's get started</h2>
                <p className="text-lg mb-8 text-white/90">
                  Have a question or want to know more about our solutions?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => openLicenseModal()}
                    className="bg-white text-purple-600 hover:bg-slate-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Request Free License
                  </button>
                  <button 
                    onClick={handleContactRedirect}
                    className="border-2 border-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                  >
                    📞 +91 11 4152 5085
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Statistics Section */}
        {/* <section className="py-16 md:py-24 bg-white">
          <div className="container-app">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  <span className="bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">DSECURE</span><sup className="text-brand text-lg"></sup> INNOVATION FROM OUR TECHNOLOGY TEAM
                </h2>
                <p className="text-lg text-slate-700 max-w-2xl mx-auto">
                  DSecure Brings to The World Future-Ready Data Solutions
                </p>
              </div>
            </Reveal>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { number: '500K+', label: 'CUSTOMERS' },
                { number: '15+', label: 'YEARS OF EXPERIENCE' },
                { number: '50+', label: 'R&D ENGINEERS' },
                { number: '100+', label: 'COUNTRIES' },
                { number: '1000+', label: 'PARTNERS' }
              ].map((stat, index) => (
                <Reveal key={stat.label} delayMs={index * 100}>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 text-center group hover:shadow-xl transition-all duration-300">
                    <div className="text-3xl font-bold text-brand mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section> */}
      </div>

      {/* Partner Application Modal */}
      {showPartnerModal && (
        <PartnershipForm
          onSubmit={handlePartnerSubmit}
          onClose={() => setShowPartnerModal(false)}
          preSelectedPartnerType={activePartnerType}
        />
      )}

      {/* Find Partner Modal */}
      {showFindPartnerModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            <style>
              {`.scrollbar-hide::-webkit-scrollbar { display: none; }`}
            </style>
            <div className="bg-gradient-to-r from-brand to-brand-600 text-white p-6 rounded-t-2xl relative">
              <h2 className="text-2xl font-bold text-center">Find A Partner</h2>
              <button 
                onClick={() => setShowFindPartnerModal(false)}
                className="absolute top-4 right-4 text-white hover:text-slate-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              {/* Filter Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">All Countries</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors bg-white"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">All Partner Types</label>
                  <select
                    value={selectedPartnerType}
                    onChange={(e) => setSelectedPartnerType(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-colors bg-white"
                  >
                    {partnerTypesFilter.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Partners List */}
              <div className="space-y-4">
                <style>
                  {`.scrollbar-hide::-webkit-scrollbar { display: none; }`}
                </style>
                <div className="space-y-4">
                  {filteredPartners.length > 0 ? (
                    filteredPartners.map((partner, index) => (
                      <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-brand/30">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Company Info */}
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">{partner.company}</h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium text-slate-600">Type:</span> <span className="text-brand font-medium">{partner.type}</span></p>
                              <p><span className="font-medium text-slate-600">Location:</span> {partner.location}</p>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div>
                            <h4 className="font-bold text-slate-900 mb-2">{partner.contact.name}</h4>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium text-slate-600">Email:</span> 
                                <a href={`mailto:${partner.contact.email}`} className="text-brand hover:underline ml-1">
                                  {partner.contact.email}
                                </a>
                              </p>
                              <p><span className="font-medium text-slate-600">Phone:</span> {partner.contact.phone}</p>
                              <p><span className="font-medium text-slate-600">Website:</span> 
                                <a href={partner.contact.website} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline ml-1">
                                  {partner.contact.website}
                                </a>
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 justify-center">
                            <button className="bg-brand hover:bg-brand-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 text-sm">
                              Contact Partner
                            </button>
                            <button className="border border-slate-300 hover:border-brand hover:text-brand font-semibold px-4 py-2 rounded-lg transition-all duration-300 text-sm">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">No Partners Found</h3>
                      <p className="text-slate-600">Try adjusting your filters to find more partners.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t border-slate-200">
                <button className="w-8 h-8 rounded-lg border border-slate-300 hover:border-brand hover:text-brand transition-colors flex items-center justify-center text-sm font-medium">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-300 hover:border-brand hover:text-brand transition-colors flex items-center justify-center text-sm">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg border border-slate-300 hover:border-brand hover:text-brand transition-colors flex items-center justify-center text-sm">
                  3
                </button>
                <span className="px-2 text-slate-500">...</span>
                <button className="px-3 py-1 rounded-lg border border-slate-300 hover:border-brand hover:text-brand transition-colors text-sm">
                  Last
                </button>
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
        />
      )}
    </>
  );
};

export default PartnersPage;