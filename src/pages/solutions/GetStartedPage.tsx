import React, { useState, memo } from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

interface DeviceGuide {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  estimatedTime: string;
  steps: string[];
  tips: string[];
  url: string;
}

const GetStartedPage: React.FC = memo(() => {
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);

  const deviceGuides: DeviceGuide[] = [
    {
      id: 1,
      title: "Windows PC",
      description: "Complete data erasure for Windows desktops and laptops with multiple drive types",
      icon: "🖥️",
      difficulty: "Easy",
      estimatedTime: "15-30 minutes",
      steps: [
        "Download and install D-Secure for Windows",
        "Close all running applications and save important data",
        "Launch D-Secure with administrator privileges",
        "Select drives or partitions to wipe",
        "Choose erasure method (Quick, DoD, or Custom)",
        "Review settings and start the erasure process",
        "Wait for completion and verify results"
      ],
      tips: [
        "Always backup important data before starting",
        "Use DoD 5220.22-M standard for sensitive data",
        "Ensure stable power supply during operation",
        "Close antivirus software to prevent conflicts"
      ],
      url: "/support/windows-pc-guide"
    },
    {
      id: 2,
      title: "Mac Computer",
      description: "Secure erasure for Intel and Apple Silicon Mac systems with FileVault support",
      icon: "🍎",
      difficulty: "Medium",
      estimatedTime: "20-45 minutes",
      steps: [
        "Download D-Secure for Mac from official website",
        "Disable FileVault if currently enabled",
        "Boot from D-Secure USB drive or run from macOS",
        "Authenticate with administrator credentials",
        "Select target drives and erasure parameters",
        "Configure T2/M1 security chip settings",
        "Execute erasure and generate completion regulatory document"
      ],
      tips: [
        "Disable System Integrity Protection (SIP) if needed",
        "Use Apple's built-in secure erase for SSDs when possible",
        "Consider FileVault encryption before erasure",
        "Verify NVRAM and firmware settings"
      ],
      url: "/support/mac-guide"
    },
    {
      id: 3,
      title: "Enterprise Server",
      description: "High-volume data destruction for servers, RAID arrays, and enterprise storage",
      icon: "🏢",
      difficulty: "Advanced",
      estimatedTime: "1-4 hours",
      steps: [
        "Schedule maintenance window and notify stakeholders",
        "Deploy D-Secure Enterprise across server infrastructure",
        "Inventory all storage devices and RAID configurations",
        "Configure parallel erasure jobs for multiple drives",
        "Set compliance standards (NIST 800-88, Common Criteria)",
        "Execute batch erasure with monitoring dashboard",
        "Generate audit reports and compliance regulatory documents"
      ],
      tips: [
        "Test erasure procedures in non-production environment first",
        "Monitor system temperature during intensive operations",
        "Use network deployment for remote server locations",
        "Maintain chain of custody documentation"
      ],
      url: "/support/enterprise-server-guide"
    },
    {
      id: 4,
      title: "Mobile Devices",
      description: "iOS and Android smartphone and tablet data destruction with factory reset verification",
      icon: "📱",
      difficulty: "Easy",
      estimatedTime: "10-20 minutes",
      steps: [
        "Connect mobile device to computer with USB cable",
        "Install D-Secure Mobile Edition or use cloud service",
        "Authenticate device access and enable debugging mode",
        "Select erasure scope (user data, system, or complete)",
        "Choose overwrite patterns suitable for flash memory",
        "Perform factory reset with verification",
        "Confirm successful erasure with forensic validation"
      ],
      tips: [
        "Remove SIM card and memory cards before erasure",
        "Disable Find My Device/Find My iPhone features",
        "Ensure device has sufficient battery charge",
        "Use manufacturer-specific tools when available"
      ],
      url: "/support/mobile-devices-guide"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <SEOHead seo={getSEOForPage('get-started')} />

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
                    Get <span className="text-brand">Started</span>
                  </h1>
                  <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
                    Learn how to securely wipe data from PC, Mac, Server & Mobile devices with step-by-step guides
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Quick Start Steps */}
        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Quick Start in 3 Steps
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Get up and running with D-Secure in minutes
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-8">
              <Reveal delayMs={100}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-emerald-600">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Choose Your Device</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Select your device type from the options below to get specific instructions and recommendations.
                  </p>
                </div>
              </Reveal>

              <Reveal delayMs={200}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-emerald-600">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Follow the Guide</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Follow our detailed step-by-step instructions tailored for your specific device and requirements.
                  </p>
                </div>
              </Reveal>

              <Reveal delayMs={300}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-emerald-600">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">Verify Success</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Confirm the erasure was successful and generate regulatory documents for compliance and audit purposes.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Device Selection */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Select Your Device Type
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Choose your device to get customized erasure instructions
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {deviceGuides.map((device, index) => (
                <Reveal key={device.id} delayMs={index * 100}>
                  <button
                    onClick={() => setSelectedDevice(selectedDevice === device.id ? null : device.id)}
                    className={`bg-white rounded-xl p-6 shadow-sm border-2 transition-all duration-300 text-left w-full ${selectedDevice === device.id
                        ? "border-emerald-500 shadow-lg"
                        : "border-slate-200 hover:border-emerald-300 hover:shadow-md"
                      }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">{device.icon}</div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {device.title}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(device.difficulty)}`}>
                          {device.difficulty}
                        </span>
                        <span className="text-sm text-slate-500">{device.estimatedTime}</span>
                      </div>
                      <p className="text-slate-600 text-sm">
                        {device.description}
                      </p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>

            {/* Selected Device Details */}
            {selectedDevice && (
              <Reveal>
                {(() => {
                  const device = deviceGuides.find(d => d.id === selectedDevice);
                  if (!device) return null;

                  return (
                    <div className="bg-white rounded-xl shadow-lg border border-emerald-200 p-8">
                      <div className="text-center mb-8">
                        <div className="text-6xl mb-4">{device.icon}</div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {device.title} Erasure Guide
                        </h3>
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(device.difficulty)}`}>
                            {device.difficulty}
                          </span>
                          <span className="text-slate-600">Estimated time: {device.estimatedTime}</span>
                        </div>
                        <p className="text-slate-700 max-w-2xl mx-auto">
                          {device.description}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Steps */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Step-by-Step Instructions
                          </h4>
                          <ol className="space-y-3">
                            {device.steps.map((step, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                  {index + 1}
                                </span>
                                <span className="text-slate-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Tips */}
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Important Tips
                          </h4>
                          <ul className="space-y-3">
                            {device.tips.map((tip, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-slate-700">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 text-center">
                        <Link
                          to={device.url}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                        >
                          View Detailed Guide
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </Reveal>
            )}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Additional Resources
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Explore more guides and tools to master DSecure
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Download D-Secure",
                  description: "Get the latest version of D-Secure for your operating system",
                  icon: "⬇️",
                  url: "/download",
                  color: "bg-blue-500"
                },
                {
                  title: "Video Tutorials",
                  description: "Watch step-by-step video guides for visual learners",
                  icon: "🎥",
                  url: "/support/product-videos",
                  color: "bg-red-500"
                },
                {
                  title: "Knowledge Base",
                  description: "Browse comprehensive documentation and guides",
                  icon: "📚",
                  url: "/support/knowledge-base",
                  color: "bg-green-500"
                },
                {
                  title: "Technical Support",
                  description: "Get help from our expert technical support team",
                  icon: "🔧",
                  url: "/support",
                  color: "bg-purple-500"
                },
                {
                  title: "Community Forum",
                  description: "Connect with other users and share experiences",
                  icon: "💬",
                  url: "/community",
                  color: "bg-orange-500"
                },
                {
                  title: "Best Practices",
                  description: "Learn industry best practices for secure data erasure",
                  icon: "⭐",
                  url: "/support/best-practices",
                  color: "bg-yellow-500"
                }
              ].map((resource, index) => (
                <Reveal key={resource.title} delayMs={index * 100}>
                  <Link
                    to={resource.url}
                    className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group block"
                  >
                    <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{resource.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {resource.description}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Need Help Getting Started?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Our support team is here to guide you through your first data erasure operation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/support"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Contact Support
                  </Link>
                  <a
                    href="tel:+91-844-775-0101"
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Call: +91-844-775-0101
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

export default GetStartedPage;