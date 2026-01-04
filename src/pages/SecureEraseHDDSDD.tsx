import React from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const SecureEraseHDDSDD: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>
          Secure Erase HDD/SSD Guide | DSecure - Complete Drive Erasure Methods
        </title>
        <meta
          name="description"
          content="Comprehensive guide to securely erase hard disk drives (HDD) and solid-state drives (SSD) using DSecure tools with industry-standard methods and verification."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center max-w-4xl mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Secure Erase HDD/SSD
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-700 mb-8 leading-relaxed">
                  Complete Drive Erasure for Maximum Data Security
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Guide Content */}
        <section className="py-16 bg-white/50">
          <div className="container-responsive">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* HDD vs SSD Overview */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      HDD vs SSD Erasure Methods
                    </h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-slate-700 text-lg leading-relaxed">
                      Different storage technologies require different erasure
                      approaches. Understanding the fundamental differences
                      between HDDs and SSDs is crucial for selecting the
                      appropriate secure erasure method.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* HDD Section */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 p-6 rounded-xl">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-blue-900">
                            Hard Disk Drives (HDD)
                          </h3>
                        </div>
                        <ul className="text-blue-700 space-y-2 text-sm">
                          <li>
                            • <strong>Technology:</strong> Magnetic storage on
                            spinning platters
                          </li>
                          <li>
                            • <strong>Erasure:</strong> Multiple overwrite
                            passes effective
                          </li>
                          <li>
                            • <strong>Challenges:</strong> Magnetic remanence,
                            bad sectors
                          </li>
                          <li>
                            • <strong>Best Method:</strong> Multi-pass
                            overwriting + physical destruction
                          </li>
                          <li>
                            • <strong>Time:</strong> Slower but thorough erasure
                            possible
                          </li>
                          <li>
                            • <strong>Standards:</strong> DoD 5220.22-M, NIST
                            800-88
                          </li>
                        </ul>
                      </div>

                      {/* SSD Section */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 p-6 rounded-xl">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-purple-500 text-white rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-purple-900">
                            Solid State Drives (SSD)
                          </h3>
                        </div>
                        <ul className="text-purple-700 space-y-2 text-sm">
                          <li>
                            • <strong>Technology:</strong> NAND flash memory
                            cells
                          </li>
                          <li>
                            • <strong>Erasure:</strong> Crypto-erase, ATA Secure
                            Erase
                          </li>
                          <li>
                            • <strong>Challenges:</strong> Wear leveling,
                            over-provisioning
                          </li>
                          <li>
                            • <strong>Best Method:</strong> ATA Secure Erase +
                            encryption key destruction
                          </li>
                          <li>
                            • <strong>Time:</strong> Fast cryptographic erasure
                            available
                          </li>
                          <li>
                            • <strong>Standards:</strong> IEEE 2883, NIST 800-88
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Erasure Methods */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Secure Erasure Methods
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* HDD Methods */}
                    <div className="border border-emerald-100 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                            clipRule="evenodd"
                          />
                        </svg>
                        HDD Secure Erasure Methods
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <h4 className="font-bold text-emerald-900 mb-2">
                            1. Multi-Pass Overwriting
                          </h4>
                          <p className="text-emerald-700 text-sm mb-2">
                            Write random or specific patterns multiple times
                            across entire drive surface.
                          </p>
                          <ul className="text-emerald-600 text-xs space-y-1">
                            <li>• 3-pass: Random, complement, random</li>
                            <li>• 7-pass: DoD 5220.22-M standard</li>
                            <li>• 35-pass: Gutmann method (legacy)</li>
                          </ul>
                        </div>

                        <div className="bg-teal-50 p-4 rounded-lg">
                          <h4 className="font-bold text-teal-900 mb-2">
                            2. ATA Secure Erase
                          </h4>
                          <p className="text-teal-700 text-sm mb-2">
                            Hardware-level command to erase all data including
                            remapped sectors.
                          </p>
                          <ul className="text-teal-600 text-xs space-y-1">
                            <li>• Uses drive's built-in erase function</li>
                            <li>• Faster than software overwriting</li>
                            <li>• Handles bad sectors automatically</li>
                          </ul>
                        </div>

                        <div className="bg-cyan-50 p-4 rounded-lg">
                          <h4 className="font-bold text-cyan-900 mb-2">
                            3. Degaussing
                          </h4>
                          <p className="text-cyan-700 text-sm mb-2">
                            Apply strong magnetic field to disrupt magnetic
                            domains on platters.
                          </p>
                          <ul className="text-cyan-600 text-xs space-y-1">
                            <li>• Requires specialized equipment</li>
                            <li>• Renders drive permanently unusable</li>
                            <li>• Effective for classified data</li>
                          </ul>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-bold text-purple-900 mb-2">
                            4. Physical Destruction
                          </h4>
                          <p className="text-purple-700 text-sm mb-2">
                            Physical destruction of platters through shredding
                            or incineration.
                          </p>
                          <ul className="text-purple-600 text-xs space-y-1">
                            <li>• Ultimate security assurance</li>
                            <li>• Required for highest classifications</li>
                            <li>• Environmentally responsible disposal</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* SSD Methods */}
                    <div className="border border-emerald-100 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
                        <svg
                          className="w-6 h-6 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        SSD Secure Erasure Methods
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-emerald-50 p-4 rounded-lg">
                          <h4 className="font-bold text-emerald-900 mb-2">
                            1. ATA Secure Erase
                          </h4>
                          <p className="text-emerald-700 text-sm mb-2">
                            Most effective method for SSDs, erases all cells
                            including over-provisioned areas.
                          </p>
                          <ul className="text-emerald-600 text-xs space-y-1">
                            <li>• Hardware-level secure erase</li>
                            <li>• Handles wear leveling</li>
                            <li>• Fast execution (minutes)</li>
                          </ul>
                        </div>

                        <div className="bg-teal-50 p-4 rounded-lg">
                          <h4 className="font-bold text-teal-900 mb-2">
                            2. Crypto-Erase
                          </h4>
                          <p className="text-teal-700 text-sm mb-2">
                            Destroy encryption keys rendering all data
                            permanently unreadable.
                          </p>
                          <ul className="text-teal-600 text-xs space-y-1">
                            <li>• Instantaneous erasure</li>
                            <li>• Requires self-encrypting drives</li>
                            <li>• NIST 800-88 compliant</li>
                          </ul>
                        </div>

                        <div className="bg-cyan-50 p-4 rounded-lg">
                          <h4 className="font-bold text-cyan-900 mb-2">
                            3. NVMe Format
                          </h4>
                          <p className="text-cyan-700 text-sm mb-2">
                            NVMe-specific secure format command for modern SSDs.
                          </p>
                          <ul className="text-cyan-600 text-xs space-y-1">
                            <li>• Protocol-specific command</li>
                            <li>• Cryptographic erasure option</li>
                            <li>• Enterprise-grade security</li>
                          </ul>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-bold text-purple-900 mb-2">
                            4. Physical Destruction
                          </h4>
                          <p className="text-purple-700 text-sm mb-2">
                            Destruction of NAND flash memory chips and
                            controller.
                          </p>
                          <ul className="text-purple-600 text-xs space-y-1">
                            <li>• Shredding or pulverization</li>
                            <li>• Required for highest security</li>
                            <li>• Proper e-waste disposal</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Step-by-Step Process */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Step-by-Step Erasure Process
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        step: 1,
                        title: "Pre-Erasure Assessment",
                        content:
                          "Identify drive type, capacity, interface, and encryption status. Check for firmware updates and verify drive health.",
                        details: [
                          "Run drive diagnostics and health check",
                          "Identify HDD vs SSD technology",
                          "Check for self-encrypting drive (SED) capabilities",
                          "Document drive serial numbers and capacity",
                        ],
                      },
                      {
                        step: 2,
                        title: "Data Backup & Verification",
                        content:
                          "If any data needs preservation, create verified backups before beginning erasure process.",
                        details: [
                          "Identify any data requiring backup",
                          "Create secure backup copies",
                          "Verify backup integrity",
                          "Store backups in secure location",
                        ],
                      },
                      {
                        step: 3,
                        title: "Remove Drive Protection",
                        content:
                          "Disable any security features that might prevent erasure such as ATA passwords or encryption locks.",
                        details: [
                          "Unlock ATA security passwords",
                          "Disable drive encryption if applicable",
                          "Check for frozen drive states",
                          "Ensure administrative privileges",
                        ],
                      },
                      {
                        step: 4,
                        title: "Execute Secure Erasure",
                        content:
                          "Perform the selected erasure method appropriate for the drive technology and security requirements.",
                        details: [
                          "Launch DSecure Drive Eraser tool",
                          "Select appropriate erasure method",
                          "Configure verification settings",
                          "Monitor progress and completion",
                        ],
                      },
                      {
                        step: 5,
                        title: "Verification & Documentation",
                        content:
                          "Verify successful erasure and generate compliance documentation for audit trails.",
                        details: [
                          "Perform post-erasure verification scan",
                          "Generate erasure completion regulatory document",
                          "Document process for compliance",
                          "Securely store erasure records",
                        ],
                      },
                      {
                        step: 6,
                        title: "Drive Disposition",
                        content:
                          "Determine final disposition - reuse, resale, recycling, or physical destruction based on security requirements.",
                        details: [
                          "Assess drive condition post-erasure",
                          "Apply disposition labels if reusing",
                          "Arrange secure recycling if disposing",
                          "Update asset tracking records",
                        ],
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="border border-emerald-100 rounded-xl p-6 hover:border-emerald-200 transition-all duration-300"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                              {item.title}
                            </h3>
                            <p className="text-slate-700 mb-4">
                              {item.content}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {item.details.map((detail, detailIndex) => (
                                <div
                                  key={detailIndex}
                                  className="flex items-center text-emerald-700 text-sm"
                                >
                                  <svg
                                    className="w-4 h-4 mr-2 text-emerald-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {detail}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Compliance Standards */}
              <Reveal>
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-8 text-white">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">
                      Compliance Standards & Regulations
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">
                        Government Standards
                      </h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          NIST 800-88 Rev. 1 (U.S. Standard)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          DoD 5220.22-M (Department of Defense)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          CESG CPA Higher (UK Government)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Common Criteria EAL4+
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">
                        Industry Standards
                      </h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          IEEE 2883-2022 (SSD Sanitization)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          ANSI X9.17 (Financial Services)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          ISO/IEC 27040 (Storage Security)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          FIPS 140-2 Level 3/4
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-bold mb-4">
                        Regulatory Compliance
                      </h3>
                      <ul className="space-y-2 text-emerald-100">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          GDPR Article 17 (Right to Erasure)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          HIPAA 164.310 (PHI Disposal)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          SOX Section 404 (Internal Controls)
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          PCI-DSS Requirement 3.4
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Performance Considerations */}
              <Reveal>
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      Performance & Time Estimates
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">
                        HDD Erasure Times
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-blue-900">
                              500GB Drive - 1 Pass
                            </span>
                            <span className="text-blue-700 font-bold">
                              ~2-3 hours
                            </span>
                          </div>
                          <p className="text-blue-600 text-sm">
                            Basic overwrite with random data
                          </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-blue-900">
                              1TB Drive - 3 Pass
                            </span>
                            <span className="text-blue-700 font-bold">
                              ~12-18 hours
                            </span>
                          </div>
                          <p className="text-blue-600 text-sm">
                            DoD standard multiple overwrite
                          </p>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-blue-900">
                              2TB Drive - ATA Secure
                            </span>
                            <span className="text-blue-700 font-bold">
                              ~4-8 hours
                            </span>
                          </div>
                          <p className="text-blue-600 text-sm">
                            Hardware-level secure erase
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">
                        SSD Erasure Times
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-purple-900">
                              256GB SSD - ATA Secure
                            </span>
                            <span className="text-purple-700 font-bold">
                              ~2-10 minutes
                            </span>
                          </div>
                          <p className="text-purple-600 text-sm">
                            Hardware secure erase command
                          </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-purple-900">
                              1TB SSD - Crypto Erase
                            </span>
                            <span className="text-purple-700 font-bold">
                              ~1-2 seconds
                            </span>
                          </div>
                          <p className="text-purple-600 text-sm">
                            Encryption key destruction
                          </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-purple-900">
                              2TB NVMe - Format
                            </span>
                            <span className="text-purple-700 font-bold">
                              ~5-15 minutes
                            </span>
                          </div>
                          <p className="text-purple-600 text-sm">
                            NVMe secure format command
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl">
                    <div className="flex items-center mb-2">
                      <svg
                        className="w-5 h-5 text-amber-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <h4 className="font-bold text-amber-900">
                        Performance Factors
                      </h4>
                    </div>
                    <ul className="text-amber-700 text-sm space-y-1">
                      <li>• Drive speed and interface (SATA, NVMe, USB)</li>
                      <li>• Number of erasure passes selected</li>
                      <li>• Drive health and bad sector count</li>
                      <li>• System resources and concurrent operations</li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SecureEraseHDDSDD;
