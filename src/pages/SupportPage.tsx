import React, { useState, useCallback, memo } from "react";
import { Helmet } from 'react-helmet-async'
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { LicenseForm, type LicenseFormData } from "@/components/forms";
import { PartnershipForm, type PartnershipFormData } from "@/components/forms";

const SupportPage: React.FC = memo(() => {
  const [activeTicketForm, setActiveTicketForm] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    category: "general",
    description: "",
  });

  const handleLicenseSubmit = useCallback((formData: LicenseFormData) => {
    console.log('License request from Support Page:', formData);
    
    // Prepare email data for EmailJS
    const emailData = {
      service_id: 'your_service_id',
      template_id: 'your_license_template_id',
      user_id: 'your_user_id',
      template_params: {
        to_email: 'license@dsecuretech.com',
        from_name: formData.fullName,
        from_email: formData.email,
        subject: `Free License Request - ${formData.company}`,
        usage_type: formData.usage,
        company_name: formData.company,
        country: formData.country,
        business_type: formData.businessType,
        compliance_requirements: formData.compliance,
        erase_option: formData.eraseOption,
        device_count: formData.deviceCount,
        phone_number: formData.phone,
        additional_requirements: formData.requirements,
        submission_source: 'Support Page',
        submission_date: new Date().toLocaleString()
      }
    };

    // Log email data for debugging
    console.log('License email data prepared:', emailData);
    
    // Example EmailJS call (uncomment when configured):
    // emailjs.send(emailData.service_id, emailData.template_id, emailData.template_params, emailData.user_id)
    //   .then(() => {
    //     alert('Free license request submitted successfully! We will send you the license details soon.');
    //     setShowLicenseModal(false);
    //   })
    //   .catch((error) => {
    //     console.error('Email sending failed:', error);
    //     alert('There was an error submitting your request. Please try again.');
    //   });
    
    // Temporary success simulation
    setTimeout(() => {
      alert('Free license request submitted successfully! We will send you the license details soon.');
      setShowLicenseModal(false);
    }, 1000);
  }, []);

  const handlePartnershipSubmit = useCallback((formData: PartnershipFormData) => {
    console.log('Partnership request from Support Page:', formData);
    
    // Prepare email data for EmailJS
    const emailData = {
      service_id: 'your_service_id',
      template_id: 'your_partnership_template_id',
      user_id: 'your_user_id',
      template_params: {
        to_email: 'partnerships@dsecuretech.com',
        from_name: formData.fullName,
        from_email: formData.businessEmail,
        subject: `Partnership Request - ${formData.companyName}`,
        company_name: formData.companyName,
        website: formData.website,
        country: formData.country,
        partner_type: formData.partnerType,
        phone_number: formData.phoneNo,
        business_description: formData.businessDescription,
        submission_source: 'Support Page',
        submission_date: new Date().toLocaleString()
      }
    };
    
    // Log email data for debugging
    console.log('Partnership email data prepared:', emailData);
    
    // Example EmailJS call (uncomment when configured):
    // emailjs.send(emailData.service_id, emailData.template_id, emailData.template_params, emailData.user_id)
    //   .then(() => {
    //     alert('Partnership request submitted successfully! We will review your application and get back to you soon.');
    //     setShowPartnershipModal(false);
    //   })
    //   .catch((error) => {
    //     console.error('Email sending failed:', error);
    //     alert('There was an error submitting your request. Please try again.');
    //   });
    
    // Temporary success simulation
    setTimeout(() => {
      alert('Partnership request submitted successfully! We will review your application and get back to you soon.');
      setShowPartnershipModal(false);
    }, 1000);
  }, []);

  const handleTicketSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare email data for EmailJS
    const emailData = {
      service_id: 'your_service_id',
      template_id: 'your_support_template_id',
      user_id: 'your_user_id',
      template_params: {
        to_email: 'support@dsecuretech.com',
        from_name: ticketForm.name,
        from_email: ticketForm.email,
        subject: `Support Ticket: ${ticketForm.subject}`,
        priority: ticketForm.priority,
        category: ticketForm.category,
        description: ticketForm.description,
        submission_source: 'Support Page',
        submission_date: new Date().toLocaleString()
      }
    };

    // Log email data for debugging
    console.log('Support ticket email data prepared:', emailData);
    
    // Example EmailJS call (uncomment when configured):
    // emailjs.send(emailData.service_id, emailData.template_id, emailData.template_params, emailData.user_id)
    //   .then(() => {
    //     alert('Support ticket submitted successfully! We will get back to you soon.');
    //     setActiveTicketForm(false);
    //     setTicketForm({
    //       name: "",
    //       email: "",
    //       subject: "",
    //       priority: "medium",
    //       category: "general",
    //       description: "",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error('Email sending failed:', error);
    //     alert('There was an error submitting your ticket. Please try again.');
    //   });
    
    // Temporary success simulation
    alert("Support ticket submitted successfully! We will get back to you soon.");
    setActiveTicketForm(false);
    setTicketForm({
      name: "",
      email: "",
      subject: "",
      priority: "medium",
      category: "general",
      description: "",
    });
  }, [ticketForm]);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTicketForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const trendingSearches = {
    "How many overwrites should I do on a Hard Drive?":"/support/overwrite-guide",
    "How can I Wipe Hard Drives and SSDs?":"/support/wipe-guide",
    "How to Wipe SAS Drives Permanently?":"/support/sas-wipe-guide",
    "How can I wipe 12 board Mac Machines?":"/support/mac-wipe-guide",
    // "How to customize ISO file using DSecure?":"/support/iso-customization-guide",
    "How do I wipe everything and retain my OS?":"/support/retain-os-guide",
    "How can I Wipe a MacOS with M1 Chip?":"/support/m1-mac-wipe-guide",
    "How to use DSecure Cloud Console?":"/support/cloud-console-guide",
    "How do I Perform Cryptographic Erasure on SSD?":"/support/ssd-cryptographic-erasure-guide",
    // "How can I diagnose my smartphone using DSecure?":"/support/smartphone-diagnosis-guide",
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/support" />
        <title>Support | DSecure Customer Support & Help Center</title>
        <meta
          name="description"
          content="Get comprehensive support for DSecure data erasure solutions. Access documentation, technical support, and help resources for secure data destruction services."
        />
        <meta
          name="keywords"
          content="DSecure support, customer help, technical support, data erasure help, documentation, troubleshooting"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                    <span className="text-brand">D</span>SECURE
                    <sup className="text-2xl text-brand"></sup> CUSTOMER
                    SUPPORT
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-700 mb-6">
                    How can we help you today?
                  </h2>

                  {/* Search Bar */}
                  <div className="max-w-2xl mx-auto relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search documents and help Resources"
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
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand hover:bg-brand-600 text-white px-4 py-2 rounded-md transition-colors">
                      <svg
                        className="w-5 h-5"
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
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Trending Searches */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="container-responsive">
            <Reveal>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  TRENDING SEARCHES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(trendingSearches).map(([search, url], index) => (
                    <button
                      key={index}
                      className="text-left text-brand hover:text-brand-600 hover:underline transition-colors p-2 rounded-md hover:bg-blue-50"
                      onClick={() => window.location.href = url}
                    >
                      → {search}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Self Help & Support Section */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  SELF HELP & SUPPORT
                </h2>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Access Support Information For Your DSecure Products
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* FAQs */}
              <Reveal delayMs={100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    FAQs
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    Frequently Asked Questions By Our Customers That Might Help
                    You.
                  </p>
                  <Link to="/support/faqs" className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors">
                    Learn More →
                  </Link>
                </div>
              </Reveal>

              {/* Knowledge Base */}
              <Reveal delayMs={200}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-emerald-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Knowledge Base
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    Step By Step Guide To Securely Wipe Data On Different
                    Devices.
                  </p>
                  <Link to="/support/knowledge-base" className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors">
                    Learn More →
                  </Link>
                </div>
              </Reveal>

              {/* Get Started */}
              <Reveal delayMs={300}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Get Started
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    Learn How To Wipe PC, Mac, Server & Mobile Devices.
                  </p>
                  <Link to="/support/get-started" className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors">
                    Learn More →
                  </Link>
                </div>
              </Reveal>

              {/* Help Manual */}
              <Reveal delayMs={400}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Help Manual
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    Consult The Guide To Learn More About DSecure Products.
                  </p>
                  <Link to="/support/help-manual" className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors">
                    View Help Manual →
                  </Link>
                </div>
              </Reveal>

              {/* Product Videos */}
              <Reveal delayMs={500}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                    <svg
                      className="w-8 h-8 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Product Videos
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    Product Walkthroughs & How To Videos.
                  </p>
                  <Link to="/support/product-videos" className="text-brand hover:text-brand-600 font-semibold hover:underline transition-colors">
                    Learn More →
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Assisted Support Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  ASSISTED SUPPORT
                </h2>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Raise a Ticket or Call us for support queries
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Write to Us */}
              <Reveal delayMs={100}>
                <div className="bg-slate-50 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Write to Us
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Get quick resolution to your query by writing to us on
                    email.
                  </p>
                  <button
                    onClick={() =>
                      (window.location.href = "mailto:support@dsecuretech.com")
                    }
                    className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Send Email
                  </button>
                </div>
              </Reveal>

              {/* Raise a Ticket */}
              <Reveal delayMs={200}>
                <div className="bg-slate-50 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Raise a Ticket
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    If you have queries and need help? Please submit a ticket.
                  </p>
                  <button
                    onClick={() => setActiveTicketForm(true)}
                    className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a1 1 0 001 1h1a1 1 0 001-1v-3a2 2 0 00-2-2H5z"
                      />
                    </svg>
                    Submit Ticket
                  </button>
                </div>
              </Reveal>

              {/* Call Us */}
              <Reveal delayMs={300}>
                <div className="bg-slate-50 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Call us
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    We will be happy to assist you. Technical Support in English
                    only.
                  </p>
                  <button
                    onClick={() => (window.location.href = "tel:+911141525085")}
                    className="bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    +91-844-775-0101
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Let's Get Started Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center text-white">
                <div className="flex items-center justify-center mb-8">
                  {/* <img
                    src="/path/to/support-person.png"
                    alt="Support Representative"
                    className="w-32 h-32 rounded-full mr-8"
                  /> */}
                  <div className="text-left">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      Let's get started
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                      Interested in finding out more about our solutions?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => setShowLicenseModal(true)}
                        className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                      >
                        Request Free License →
                      </button>
                      <button onClick={() => (window.location.href = "tel:+91-844-775-0101")} className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300">
                        Need help: +91-844-775-0101
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Company Stats */}
        {/* <section className="py-16 md:py-24 bg-slate-900 text-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <span className="text-brand">DSECURE</span>
                  <sup className="text-brand text-lg"></sup> IS AN INNOVATION
                  FROM STELLAR
                </h2>
                <p className="text-xl text-slate-300">
                  Stellar Brings to The World Future-Ready Data Solutions
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-center">
              {[
                { number: "3M+", label: "CUSTOMERS" },
                { number: "24/7", label: "SUPPORT AVAILABLE" },
                { number: "100+", label: "R&D ENGINEERS" },
                { number: "190+", label: "COUNTRIES" },
                { number: "8000+", label: "PARTNERS" },
                { number: "100+", label: "AWARDS RECEIVED" },
              ].map((stat, index) => (
                <Reveal key={stat.label} delayMs={index * 100}>
                  <div className="group">
                    <div className="text-4xl md:text-5xl font-bold text-brand mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section> */}
      </div>

      {/* Support Ticket Modal */}
      {activeTicketForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            {/* Fixed Header */}
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-6 rounded-t-xl flex-shrink-0">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Submit Support Ticket</h2>
                <button
                  onClick={() => setActiveTicketForm(false)}
                  className="text-white hover:text-slate-200 transition-colors text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
                >
                  ×
                </button>
              </div>
              <p className="mt-2 text-emerald-100">
                We'll get back to you as soon as possible!
              </p>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              <style>
                {`.modal-scroll::-webkit-scrollbar { display: none; }`}
              </style>
              <form onSubmit={handleTicketSubmit} className="p-6 space-y-6 modal-scroll">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={ticketForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={ticketForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={ticketForm.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={ticketForm.priority}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={ticketForm.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
                  >
                    <option value="general">General Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing & Licensing</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={ticketForm.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Please provide detailed information about your issue or question..."
                />
              </div>

              <div className="flex gap-4 pt-4 sticky bottom-0 bg-white">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 font-semibold"
                >
                  Submit Ticket
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTicketForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onSubmit={handleLicenseSubmit}
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Support"
        />
      )}

      {/* Partnership Request Modal */}
      {showPartnershipModal && (
        <PartnershipForm
          onSubmit={handlePartnershipSubmit}
          onClose={() => setShowPartnershipModal(false)}
          title="Partnership Request - Support"
        />
      )}
    </>
  );
});

export default SupportPage;
//               View Documentation →
//             </a>
//           </div>

//           <div className="bg-white light:bg-slate-800 rounded-lg p-6 xs:p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 xxl:p-18 shadow-lg hover:shadow-xl transition-shadow text-center">
//             <div className="w-12 xs:w-14 sm:w-16 md:w-18 lg:w-20 xl:w-22 xxl:w-24 h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 xxl:h-24 bg-green-100 light:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
//               <svg className="w-6 xs:w-7 sm:w-8 md:w-9 lg:w-10 xl:w-11 xxl:w-12 h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 xxl:h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//             </div>
//             <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl xxl:text-6xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
//               Live Chat
//             </h3>
//             <p className="text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
//               Get instant help from our support team through live chat assistance.
//             </p>
//             <button className="text-green-600 hover:text-green-700 font-medium text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               Start Chat →
//             </button>
//           </div>

//           <div className="bg-white light:bg-slate-800 rounded-lg p-6 xs:p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 xxl:p-18 shadow-lg hover:shadow-xl transition-shadow text-center">
//             <div className="w-12 xs:w-14 sm:w-16 md:w-18 lg:w-20 xl:w-22 xxl:w-24 h-12 xs:h-14 sm:h-16 md:h-18 lg:h-20 xl:h-22 xxl:h-24 bg-purple-100 light:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
//               <svg className="w-6 xs:w-7 sm:w-8 md:w-9 lg:w-10 xl:w-11 xxl:w-12 h-6 xs:h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 xxl:h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl xxl:text-6xl font-semibold text-slate-900 light:text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8 xxl:mb-9">
//               Email Support
//             </h3>
//             <p className="text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl mb-4 xs:mb-5 sm:mb-6 md:mb-7 lg:mb-8 xl:mb-9 xxl:mb-10">
//               Submit detailed support requests and get expert assistance via email.
//             </p>
//             <a href="/contact" className="text-purple-600 hover:text-purple-700 font-medium text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               Send Email →
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* Support Categories */}
//       <section className="mb-12 xs:mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32 xxl:mb-36">
//         <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl xxl:text-8xl font-bold text-slate-900 light:text-white mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20 text-center">
//           Support Categories
//         </h2>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-18 xxl:gap-20">
//           <div className="bg-slate-50 light:bg-slate-800 rounded-lg p-6 xs:p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 xxl:p-18">
//             <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl xxl:text-7xl font-semibold text-slate-900 light:text-white mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
//               Technical Support
//             </h3>
//             <ul className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 xxl:space-y-9 text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Software installation and configuration
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Troubleshooting and error resolution
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 System compatibility issues
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Performance optimization
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Integration assistance
//               </li>
//             </ul>
//           </div>

//           <div className="bg-slate-50 light:bg-slate-800 rounded-lg p-6 xs:p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 xxl:p-18">
//             <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl xxl:text-7xl font-semibold text-slate-900 light:text-white mb-6 xs:mb-7 sm:mb-8 md:mb-9 lg:mb-10 xl:mb-11 xxl:mb-12">
//               Account & Billing
//             </h3>
//             <ul className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 xl:space-y-8 xxl:space-y-9 text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Account management and settings
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Billing inquiries and invoice questions
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 License management and renewals
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Subscription changes and upgrades
//               </li>
//               <li className="flex items-start gap-3">
//                 <span className="text-blue-600 mt-1">•</span>
//                 Payment processing support
//               </li>
//             </ul>
//           </div>
//         </div>
//       </section>

//       {/* Contact Information */}
//       <section className="bg-blue-50 light:bg-blue-900/20 rounded-lg p-8 xs:p-10 sm:p-12 md:p-16 lg:p-20 xl:p-24 xxl:p-28 text-center">
//         <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl xxl:text-8xl font-bold text-slate-900 light:text-white mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 xxl:mb-18">
//           Need Direct Assistance?
//         </h2>
//         <p className="text-slate-600 light:text-slate-300 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-5xl mb-8 xs:mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-18 xxl:mb-20 max-w-3xl mx-auto">
//           Our dedicated support team is available during business hours to provide personalized assistance for all your data erasure needs.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-16 xxl:gap-18 max-w-4xl mx-auto">
//           <div className="text-center">
//             <h3 className="font-semibold text-slate-900 light:text-white mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 xxl:mb-8 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-5xl">
//               Email Support
//             </h3>
//             <p className="text-blue-600 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               support@dsecuretech.com
//             </p>
//           </div>

//           <div className="text-center">
//             <h3 className="font-semibold text-slate-900 light:text-white mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 xxl:mb-8 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-5xl">
//               Phone Support
//             </h3>
//             <p className="text-blue-600 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               +91 11 4152 5085
//             </p>
//           </div>

//           <div className="text-center sm:col-span-2 lg:col-span-1">
//             <h3 className="font-semibold text-slate-900 light:text-white mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 xxl:mb-8 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl xxl:text-5xl">
//               Business Hours
//             </h3>
//             <p className="text-slate-600 light:text-slate-300 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl xxl:text-4xl">
//               Mon-Fri: 9:00 AM - 6:00 PM IST
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   </div>
// </>
//   )
// }

// export default SupportPage;
