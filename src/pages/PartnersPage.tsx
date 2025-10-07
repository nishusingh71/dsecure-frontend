import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
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
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPartnerForContact, setSelectedPartnerForContact] = useState<any>(null);
  const [selectedPartnerForDetails, setSelectedPartnerForDetails] = useState<any>(null);
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
          description: 'DSecure is a growing brand in the data erasure industry built on technical excellence and best practices. Our solutions follow international standards and provide reliable global service.'
        },
        {
          title: 'Deal Registration Benefits',
          description: 'Deal Registration is a great advantage to our Distributors, it allows you to keep a best-foot-in-root your company that particular partner and projects that can be of high priority. We can provide better price for registered deals for our channel partner along with product, support and service deployment.'
        }
      ]
    },
    'Reseller Partner': {
      title: 'Reseller Partner Program', 
      description: 'Become our Reseller to deliver secure & reliable data erasure software to enterprise customers and help them meet compliance. Get great discounts when leveraging our globally tested and standards-compliant solutions, help your customers meet global data privacy compliance requirements, with ease.',
      benefits: [
        'Product Sales Training',
        'Free Assisted Technology Support',
        'Regular Updates And Communication',
        'Co-To-Market Enablement',
        'Deal Registration Benefits',
        'Quality Solutions'
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
          title: 'Quality Supplier',
          description: 'DSecure is a growing brand renowned for its data erasure solutions. We work to satisfy customers across the world in 190 countries. Our company focuses on innovative software development and providing quality in-lab services.'
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
        'Standards Compliant',
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
          title: 'Standards Compliant',
          description: 'DSecure software follows international standards and best practices from leading bodies such as NIST, ADISA, and Common Criteria. Our solutions provide compliance with NIST FIPS 140-2, ADISA standards, and Common Criteria compliant data erasure methods.'
        },
        {
          title: 'Trusted Brand Quality',
          description: 'DSecure is a product from DSecure - one of the growing global data tech brands, trusted by companies worldwide. Our quality-focused R&D processes ensure compliance with the highest product standards and the success of our Partner business.'
        }
      ]
    }
  } as const;

  // PDF download function
  const downloadPDF = (filename: string, displayName: string) => {
    const link = document.createElement('a');
    link.href = `/downloads/${filename}`;
    link.download = displayName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePartnerSubmit = (formData: PartnershipFormData) => {
    // Check reCAPTCHA verification
    if (!partnerRecaptchaVerified) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }
    
    // Send email using EmailJS or your preferred service
    const emailData = {
      service_id: 'your_service_id',
      template_id: 'your_template_id',
      user_id: 'your_user_id',
      template_params: {
        to_email: 'dhruv.rai@dsecuretech.com',
        from_name: formData.fullName,
        from_email: formData.businessEmail,
        subject: `New Partner Application - ${formData.companyName}`,
        company_name: formData.companyName,
        website: formData.website,
        country: formData.country,
        partner_type: formData.partnerType,
        phone_number: formData.phoneNo,
        business_description: formData.businessDescription,
        submission_date: new Date().toLocaleString()
      }
    };

    // Simulate email sending (replace with actual EmailJS call)
    console.log('Partner application submitted:', formData);
    console.log('Email data prepared:', emailData);
    
    // Example EmailJS call (uncomment when configured):
    // emailjs.send(emailData.service_id, emailData.template_id, emailData.template_params, emailData.user_id)
    //   .then(() => {
    //     alert('Partner application submitted successfully! We will contact you soon.');
    //     setShowPartnerModal(false);
    //     setPartnerRecaptchaVerified(false);
    //   })
    //   .catch((error) => {
    //     console.error('Email sending failed:', error);
    //     alert('There was an error submitting your application. Please try again.');
    //   });
    
    // Temporary success simulation
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
      <Helmet>
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
      </Helmet>
      
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-200 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-50"></div>
          </div>
          
          <div className="container-responsive relative z-10">
            <Reveal>
              <div className="text-center">
                <div className="mb-12">
                  {/* Logo and Title */}
                  <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-2xl transform hover:scale-110 transition-transform duration-300">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                      </svg>
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4">
                      <span className="text-brand">D</span>Secure<sup className="text-3xl text-brand">®</sup>
                    </h1>
                    <div className="relative inline-block">
                      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-6 relative z-10">
                        Partner Program
                      </h2>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced Description */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-emerald-200/50 shadow-xl max-w-4xl mx-auto">
                    <p className="text-xl text-slate-700 leading-relaxed mb-4">
                      🚀 <strong>Join our Partner Program</strong> today and become a part of our extensive global network!
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Unlock new business opportunities with our best-in-class cutting-edge data erasure solutions. 
                      Partner with us to advance sustainability while leveraging our innovative products for your success.
                    </p>
                  </div>
                  
                  {/* Enhanced CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button 
                      onClick={() => openPartnerModal()}
                      className="group bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 flex items-center gap-3"
                    >
                      <span className="text-lg">🤝 Join Partnership</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 7l5 5-5 5M6 12h12"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => downloadPDF('partner-catalog.pdf', 'DSecure_Partner_Catalog.pdf')}
                      className="group border-3 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 font-bold px-10 py-4 rounded-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                    >
                      <span className="text-lg">📄 Download Catalog</span>
                      <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2v13l4-4m-4 4l-4-4m4 4v5"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-70">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">1000+ Global Partners</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">190+ Countries</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Best Practice Standards</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  ⭐ Partnership Excellence
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  <span className="text-brand">GROW YOUR BUSINESS WITH </span>
                  <span className="bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">DSECURE</span><sup className="text-brand text-2xl">®</sup>
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
                  Choose your partnership type to unlock specialized benefits and opportunities
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto"></div>
              </div>
            </Reveal>
            
            {/* Enhanced Partner Type Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
              {(Object.keys(partnerTypes) as Array<keyof typeof partnerTypes>).map((partnerTitle, index) => {
                const isActive = activePartnerType === partnerTitle;
                return (
                  <Reveal key={partnerTitle} delayMs={index * 100}>
                    <button 
                      onClick={() => setActivePartnerType(partnerTitle)}
                      className={`group relative px-6 py-6 rounded-2xl font-bold transition-all duration-500 transform hover:scale-105 hover:-rotate-1 ${
                        isActive
                          ? 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-2xl shadow-emerald-500/25 scale-105'
                          : 'bg-white hover:bg-gradient-to-br hover:from-emerald-500 hover:via-emerald-600 hover:to-teal-600 hover:text-white text-slate-700 border-2 border-slate-200 hover:border-transparent shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20'
                      }`}
                    >
                      {/* Animated Background Effect */}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      )}
                      
                      {/* Content */}
                      <div className="relative z-10 text-center">
                        {/* Icon */}
                        <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isActive ? 'bg-white/20' : 'bg-emerald-100 group-hover:bg-white/20'
                        }`}>
                          <svg className={`w-6 h-6 transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-emerald-600 group-hover:text-white'
                          }`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                          </svg>
                        </div>
                        
                        {/* Title */}
                        <div className="text-sm leading-tight">
                          {partnerTitle}
                        </div>
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Effect Border */}
                      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                        isActive ? 'ring-4 ring-emerald-300/50' : 'group-hover:ring-4 group-hover:ring-emerald-300/50'
                      }`}></div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
            
            {/* Partner Type Description */}
            <Reveal>
              <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50 shadow-lg max-w-4xl mx-auto">
                <p className="text-lg text-slate-600 leading-relaxed">
                  Selected: <strong className="text-emerald-600">{activePartnerType}</strong> - 
                  {partnerTypes[activePartnerType].description.split('.')[0]}.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ITAD Partner Program */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
          <div className="container-responsive">
            <div className="grid lg:grid-cols-1 gap-12 items-center">
            <Reveal>
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm">
                    {/* Header with Enhanced Gradient */}
                    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50/30 border-b border-slate-200/60 p-8">
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-brand via-brand-500 to-brand-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-emerald-800 to-teal-700 bg-clip-text text-transparent mb-3">
                                    D-Secure<sup className="text-brand text-lg">®</sup> {partnerTypes[activePartnerType].title}
                                </h3>
                                <div className="w-24 h-1.5 bg-gradient-to-r from-brand via-brand-500 to-brand-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Description Card */}
                        <div className="bg-slate-50/50 rounded-xl p-6 mb-8 border border-slate-200/30 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <p className="text-slate-700 leading-relaxed text-lg font-medium">
                                {partnerTypes[activePartnerType].description}
                            </p>
                        </div>

                        {/* Benefits Grid */}
                        <div className="grid gap-6 mb-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900">Key Benefits</h4>
                            </div>
                            <div className="grid gap-6">
                                {partnerTypes[activePartnerType].detailedBenefits?.map((benefit, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1 overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-brand via-brand-500 to-brand-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
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
                                        {/* Hover indicator line */}
                                        <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                )) || partnerTypes[activePartnerType].benefits.map((benefit, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
                                        <div className="flex items-start gap-4 p-6">
                                            <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                            <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors duration-300 leading-relaxed">{benefit}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200/30">
                            <button 
                                onClick={() => openPartnerModal(activePartnerType)}
                                className="flex-1 bg-gradient-to-r from-brand via-brand-500 to-brand-600 hover:from-brand-600 hover:via-brand-600 hover:to-brand-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-3 group"
                            >
                                <span className="text-lg">Join Partnership Program</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 7l5 5-5 5M6 12h12"/>
                                </svg>
                            </button>
                            <button 
                              onClick={() => downloadPDF('partnership-brochure.pdf', 'DSecure_Partnership_Brochure.pdf')}
                              className="flex-1 bg-white border-2 border-slate-200/60 hover:border-brand hover:bg-gradient-to-r hover:from-brand/5 hover:to-brand/10 text-slate-700 hover:text-brand font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg group"
                            >
                                <span>Download Brochure</span>
                                <svg className="w-4 h-4 inline-block ml-2 group-hover:translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2v13l4-4m-4 4l-4-4m4 4v5"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </Reveal>
            </div>
          </div>
        </section>

        {/* Downloads Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="container-responsive relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  📚 Resource Center
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Download <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Resources</span>
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Access comprehensive guides, brochures, and documentation to learn more about our partnership programs and solutions.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Partner Catalog',
                  description: 'Complete overview of all partnership opportunities and benefits',
                  icon: '📋',
                  filename: 'partner-catalog.pdf',
                  displayName: 'DSecure_Partner_Catalog.pdf',
                  color: 'from-emerald-500 to-teal-500'
                },
                {
                  title: 'Partnership Brochure',
                  description: 'Detailed information about joining our global partner network',
                  icon: '📄',
                  filename: 'partnership-brochure.pdf',
                  displayName: 'DSecure_Partnership_Brochure.pdf',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Product Datasheet',
                  description: 'Technical specifications and features of our data erasure solutions',
                  icon: '📊',
                  filename: 'product-datasheet.pdf',
                  displayName: 'DSecure_Product_Datasheet.pdf',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  title: 'MSP Program Guide',
                  description: 'Comprehensive guide for Managed Service Provider partnerships',
                  icon: '🔧',
                  filename: 'msp-program-guide.pdf',
                  displayName: 'DSecure_MSP_Program_Guide.pdf',
                  color: 'from-orange-500 to-red-500'
                },
                {
                  title: 'Reseller Program',
                  description: 'Complete information about our reseller partnership program',
                  icon: '🏪',
                  filename: 'reseller-program-guide.pdf',
                  displayName: 'DSecure_Reseller_Program.pdf',
                  color: 'from-indigo-500 to-purple-500'
                }
              ].map((resource, index) => (
                <Reveal key={index} delayMs={index * 100}>
                  <div className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`w-16 h-16 bg-gradient-to-r ${resource.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                      {resource.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                      {resource.description}
                    </p>
                    <button
                      onClick={() => downloadPDF(resource.filename, resource.displayName)}
                      className={`w-full bg-gradient-to-r ${resource.color} hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg group flex items-center justify-center gap-2`}
                    >
                      <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2v13l4-4m-4 4l-4-4m4 4v5"/>
                      </svg>
                      <span>Download PDF</span>
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Find A Partner */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          
          <div className="container-responsive relative z-10">
            <Reveal>
              <div className="text-center">
                {/* Enhanced Header */}
                <div className="mb-12">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    🔍 Partner Discovery
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Find A <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Partner</span>
                  </h2>
                  <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                    Get to know about our global partners and easily locate them. 
                    Connect with qualified DSecure partners in your region for seamless collaboration.
                  </p>
                  
                  {/* Feature Pills */}
                  <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {[
                      { icon: '🌍', text: 'Global Network' },
                      { icon: '📍', text: 'Location-Based' },
                      { icon: '✅', text: 'Qualified Partners' },
                      { icon: '🤝', text: 'Direct Contact' }
                    ].map((feature, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                        <span className="mr-2">{feature.icon}</span>
                        {feature.text}
                      </div>
                    ))}
                  </div>
                  
                  {/* Enhanced CTA Button */}
                  <button 
                    onClick={() => setShowFindPartnerModal(true)}
                    className="group bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-teal-500 text-white font-bold px-12 py-5 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 flex items-center gap-4 mx-auto text-lg"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      </svg>
                    </div>
                    <span>Find Partners Near You</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 7l5 5-5 5M6 12h12"/>
                    </svg>
                  </button>
                  
                  {/* Additional Info */}
                  <div className="mt-8 text-slate-400 text-sm">
                    <p>Over 1000+ verified partners across 190+ countries</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Partner Benefits */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-white via-emerald-50/30 to-slate-50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  🚀 Partnership Benefits
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  <span className="text-brand">WHY COLLABORATE WITH </span>
                  <span className="bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">DSECURE</span><sup className="text-brand text-2xl">®</sup>
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-4">
                  Unlock exclusive advantages and grow your business with our comprehensive partner benefits
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto"></div>
              </div>
            </Reveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Standards-Compliant Data Erasure Products',
                  description: 'Access to standards-compliant data erasure solutions following international best practices and algorithms. Get quality solutions meeting 40+ international standards by integrating our data erasure technology.',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                    </svg>
                  ),
                  gradient: 'from-red-500 to-red-600',
                  bgColor: 'bg-red-50',
                  borderColor: 'border-red-200'
                },
                {
                  title: 'Marketing & Sales Enablement',
                  description: 'Partners get access to our sales enablement and analytics to help them understand customer requirements. Get comprehensive marketing materials and product selling aids.',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                    </svg>
                  ),
                  gradient: 'from-blue-500 to-blue-600',
                  bgColor: 'bg-blue-50',
                  borderColor: 'border-blue-200'
                },
                {
                  title: 'Free 24×7 Technical Support',
                  description: 'Get the best pre-sales & after sales support for all DSecure solutions. Our staff provides regular training and extended deployments with dedicated expertise.',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  ),
                  gradient: 'from-green-500 to-green-600',
                  bgColor: 'bg-green-50',
                  borderColor: 'border-green-200'
                },
                {
                  title: 'Trusted Supplier',
                  description: 'We give you the opportunity to achieve bigger goals providing you the power around gaining a global data client with our track record of bringing innovation & trust.',
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ),
                  gradient: 'from-purple-500 to-purple-600',
                  bgColor: 'bg-purple-50',
                  borderColor: 'border-purple-200'
                }
              ].map((benefit, index) => (
                <Reveal key={benefit.title} delayMs={index * 150}>
                  <div className={`group bg-white rounded-2xl shadow-xl border border-slate-200/60 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 p-8 h-full relative overflow-hidden hover:border-emerald-300/50`}>
                    {/* Background Gradient Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 text-center h-full flex flex-col">
                      {/* Icon */}
                      <div className={`w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                        {benefit.icon}
                      </div>
                      
                      {/* Title */}
                      <h4 className="font-bold text-slate-900 mb-4 text-xl group-hover:text-emerald-800 transition-colors duration-300">
                        {benefit.title}
                      </h4>
                      
                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 flex-grow">
                        {benefit.description}
                      </p>
                      
                      {/* Hover indicator */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto"></div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                  </div>
                </Reveal>
              ))}
            </div>
            
            {/* Call to Action */}
            <Reveal delayMs={600}>
              <div className="text-center mt-16">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 p-8 max-w-2xl mx-auto overflow-hidden">
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      Ready to unlock these exclusive benefits and transform your business?
                    </p>
                    <button 
                      onClick={() => openPartnerModal()}
                      className="group bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-emerald-700 hover:to-teal-700 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-emerald-500/25 transform hover:scale-105 flex items-center gap-3 mx-auto"
                    >
                      <span className="text-lg">🤝 Start Partnership Journey</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 7l5 5-5 5M6 12h12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
          <div className="container-responsive">
            <Reveal>
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-500 via-green-500 to-green-600 p-8 text-center">
                  <h2 className="text-4xl font-bold text-white mb-4">Let's Get Started</h2>
                  <p className="text-lg text-white/90 max-w-2xl mx-auto">
                    Have a question or want to know more about our solutions?
                  </p>
                </div>
                
                {/* Content */}
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
                      <span>📞 +91 11 4152 5085</span>
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 relative overflow-hidden">
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-teal-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="container-responsive relative z-10">
            <Reveal>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  📈 Global Impact
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Trusted Worldwide
                </h2>
                <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                  Join thousands of partners who are already transforming their businesses with DSecure
                </p>
              </div>
            </Reveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '1000+', label: 'Global Partners', icon: '🌍', gradient: 'from-emerald-400 to-emerald-600' },
                { number: '190+', label: 'Countries Covered', icon: '🗺️', gradient: 'from-teal-400 to-teal-600' },
                { number: '100%', label: 'Standards Compliant', icon: '✅', gradient: 'from-emerald-500 to-teal-500' },
                { number: '99.9%', label: 'Partner Satisfaction', icon: '⭐', gradient: 'from-yellow-400 to-orange-500' }
              ].map((stat, index) => (
                <Reveal key={index} delayMs={index * 200}>
                  <div className="group text-center bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-110 hover:-rotate-2 overflow-hidden shadow-xl hover:shadow-2xl p-8">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl shadow-2xl transform group-hover:scale-110 transition-transform duration-300`}>
                        {stat.icon}
                      </div>
                      
                      {/* Number with Animation */}
                      <div className="mb-4">
                        <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                          {stat.number}
                        </div>
                        <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Label */}
                      <p className="text-emerald-100 font-semibold text-lg leading-tight group-hover:text-white transition-colors duration-300">
                        {stat.label}
                      </p>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  </div>
                </Reveal>
              ))}
            </div>
            
            {/* Call to Action */}
            <Reveal delayMs={800}>
              <div className="text-center mt-16">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden p-8 max-w-2xl mx-auto">
                  {/* Background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/15 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <p className="text-emerald-100 text-lg mb-6">
                      Ready to join our growing partner network?
                    </p>
                    <button 
                      onClick={() => setShowFindPartnerModal(true)}
                      className="group bg-white hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 mx-auto"
                    >
                      <span>🔍 Find Partners Near You</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 7l5 5-5 5M6 12h12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Statistics Section */}
        {/* <section className="py-16 md:py-24 bg-white">
          <div className="container-responsive">
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
                { number: '24/7', label: 'SUPPORT AVAILABLE' },
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Fixed Header */}
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-6 rounded-t-2xl relative flex-shrink-0">
              <h2 className="text-2xl font-bold text-center">Find A Partner</h2>
              <button 
                onClick={() => setShowFindPartnerModal(false)}
                className="absolute top-4 right-4 text-white hover:text-slate-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <style>
                {`.find-partner-scroll::-webkit-scrollbar { display: none; }`}
              </style>
              <div className="p-6 find-partner-scroll">
                {/* Filter Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-6 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-cyan-50/30 rounded-xl border border-emerald-200/50 shadow-sm">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-800 mb-2">All Countries</label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white shadow-sm hover:border-emerald-300"
                    >
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-emerald-800 mb-2">All Partner Types</label>
                    <select
                      value={selectedPartnerType}
                      onChange={(e) => setSelectedPartnerType(e.target.value)}
                      className="w-full p-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white shadow-sm hover:border-emerald-300"
                    >
                      {partnerTypesFilter.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Partners List */}
                <div className="space-y-4">
                  {filteredPartners.length > 0 ? (
                    filteredPartners.map((partner, index) => (
                      <div key={index} className="bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/10 border-2 border-emerald-200/50 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:border-emerald-400/60 hover:bg-gradient-to-br hover:from-white hover:via-emerald-50/30 hover:to-teal-50/20">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Company Info */}
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">{partner.company}</h3>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium text-slate-600">Type:</span> <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-semibold ml-1">{partner.type}</span></p>
                              <p><span className="font-medium text-slate-600">Location:</span> {partner.location}</p>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div>
                            <h4 className="font-bold text-slate-900 mb-2">{partner.contact.name}</h4>
                            <div className="space-y-1 text-sm">
                              <p><span className="font-medium text-slate-600">Email:</span> 
                                <a href={`mailto:${partner.contact.email}`} className="text-emerald-600 hover:text-emerald-700 hover:underline ml-1 font-medium">
                                  {partner.contact.email}
                                </a>
                              </p>
                              <p><span className="font-medium text-slate-600">Phone:</span> {partner.contact.phone}</p>
                              <p><span className="font-medium text-slate-600">Website:</span> 
                                <a href={partner.contact.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 hover:underline ml-1 font-medium">
                                  {partner.contact.website}
                                </a>
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 justify-center">
                            <button 
                              onClick={() => handleContactPartner(partner)}
                              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                              Contact Partner
                            </button>
                            <button 
                              onClick={() => handleViewDetails(partner)}
                              className="border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 font-semibold px-4 py-3 rounded-lg transition-all duration-300 text-sm"
                            >
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

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6 pt-4 border-t border-emerald-200">
                  <button className="w-8 h-8 rounded-lg border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 flex items-center justify-center text-sm font-medium">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 flex items-center justify-center text-sm">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 flex items-center justify-center text-sm">
                    3
                  </button>
                  <span className="px-2 text-slate-500">...</span>
                  <button className="px-3 py-1 rounded-lg border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 text-sm">
                    Last
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
        />
      )}

      {/* Contact Partner Modal */}
      {showContactModal && selectedPartnerForContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Fixed Header */}
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-6 rounded-t-2xl relative flex-shrink-0">
              <h2 className="text-2xl font-bold text-center">Contact Partner</h2>
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-white hover:text-slate-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <style>
                {`.contact-partner-scroll::-webkit-scrollbar { display: none; }`}
              </style>
              <div className="p-6 contact-partner-scroll">
                {/* Partner Info */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border border-emerald-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{selectedPartnerForContact.company}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Contact Person</p>
                      <p className="font-semibold text-slate-900">{selectedPartnerForContact.contact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Partner Type</p>
                      <p className="font-semibold text-slate-900">{selectedPartnerForContact.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Location</p>
                      <p className="font-semibold text-slate-900">{selectedPartnerForContact.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Phone</p>
                      <p className="font-semibold text-emerald-600">{selectedPartnerForContact.contact.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Your Name *</label>
                      <input
                        type="text"
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Your Email *</label>
                      <input
                        type="email"
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                      <input
                        type="text"
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject *</label>
                    <input
                      type="text"
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                    <textarea
                      rows={4}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                      placeholder="Describe your requirements or questions..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-semibold"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Message sent successfully! The partner will contact you soon.');
                        setShowContactModal(false);
                      }}
                    >
                      Send Message
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactModal(false)}
                      className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {/* Quick Contact Options */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">Or contact directly:</h4>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selectedPartnerForContact.contact.email}`}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      📧 Send Email
                    </a>
                    <a
                      href={`tel:${selectedPartnerForContact.contact.phone}`}
                      className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                    >
                      📞 Call Now
                    </a>
                    <a
                      href={selectedPartnerForContact.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                    >
                      🌐 Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedPartnerForDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-hidden">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Fixed Header */}
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-6 rounded-t-2xl relative flex-shrink-0">
              <h2 className="text-2xl font-bold text-center">Partner Details</h2>
              <button 
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-4 right-4 text-white hover:text-slate-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <style>
                {`.view-details-scroll::-webkit-scrollbar { display: none; }`}
              </style>
              <div className="p-6 view-details-scroll">
                {/* Company Header */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 mb-6 border border-emerald-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedPartnerForDetails.company}</h3>
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {selectedPartnerForDetails.type}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-600 text-sm">Established</p>
                      <p className="font-bold text-slate-900">2015</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Location</p>
                      <p className="font-semibold text-slate-900">{selectedPartnerForDetails.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Employees</p>
                      <p className="font-semibold text-slate-900">50-200</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Certification</p>
                      <p className="font-semibold text-emerald-600">ISO 27001, NIST</p>
                    </div>
                  </div>
                </div>

                {/* Company Overview */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Company Overview</h4>
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      {selectedPartnerForDetails.company} is a leading {selectedPartnerForDetails.type.toLowerCase()} 
                      specializing in secure data erasure and IT asset disposition services. With over 8 years of experience 
                      in the industry, we have successfully served over 500+ clients across various sectors including 
                      healthcare, finance, and government organizations.
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      Our team of certified professionals ensures complete data destruction compliance with international 
                      standards including NIST 800-88, DOD 5220.22-M, and Common Criteria. We provide comprehensive 
                      certificates of destruction for audit purposes and maintain the highest levels of security throughout 
                      the data erasure process.
                    </p>
                  </div>
                </div>

                {/* Services Offered */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Services Offered</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Secure Data Erasure',
                      'IT Asset Disposition',
                      'Hard Drive Destruction',
                      'Mobile Device Wiping',
                      'Server Decommissioning',
                      'Compliance Consulting',
                      'Certificate Generation',
                      'On-site Services'
                    ].map((service, index) => (
                      <div key={index} className="bg-white border border-slate-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                          <span className="font-medium text-slate-900">{service}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">Contact Information</h4>
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-slate-900 mb-3">Primary Contact</h5>
                        <div className="space-y-2">
                          <p><span className="text-slate-600">Name:</span> <span className="font-medium">{selectedPartnerForDetails.contact.name}</span></p>
                          <p><span className="text-slate-600">Email:</span> <a href={`mailto:${selectedPartnerForDetails.contact.email}`} className="font-medium text-emerald-600 hover:underline">{selectedPartnerForDetails.contact.email}</a></p>
                          <p><span className="text-slate-600">Phone:</span> <a href={`tel:${selectedPartnerForDetails.contact.phone}`} className="font-medium text-emerald-600 hover:underline">{selectedPartnerForDetails.contact.phone}</a></p>
                          <p><span className="text-slate-600">Website:</span> <a href={selectedPartnerForDetails.contact.website} target="_blank" rel="noopener noreferrer" className="font-medium text-emerald-600 hover:underline">{selectedPartnerForDetails.contact.website}</a></p>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900 mb-3">Business Hours</h5>
                        <div className="space-y-2 text-sm">
                          <p><span className="text-slate-600">Monday - Friday:</span> <span className="font-medium">9:00 AM - 6:00 PM</span></p>
                          <p><span className="text-slate-600">Saturday:</span> <span className="font-medium">9:00 AM - 2:00 PM</span></p>
                          <p><span className="text-slate-600">Sunday:</span> <span className="font-medium">Closed</span></p>
                          <p><span className="text-slate-600">Emergency:</span> <span className="font-medium text-emerald-600">24/7 Available</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleContactPartner(selectedPartnerForDetails);
                    }}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-semibold"
                  >
                    Contact This Partner
                  </button>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PartnersPage;
