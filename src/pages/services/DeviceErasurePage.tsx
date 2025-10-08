import Reveal from '@/components/Reveal'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  CheckIcon, 
  MobileIcon, 
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  ArrowRightIcon,
  HoverIcon,
  ArrowDownIcon
} from '@/components/FlatIcons'

export default function DeviceErasurePage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/services/device-erasure" />
        <title>
          Device Erasure Service | Professional Data Sanitization
        </title>
        <meta
          name="description"
          content="Professional device erasure service for laptops, desktops, mobile devices, and storage media. NIST 800-88 compliant with Compliant compliance reporting."
        />
        <meta
          name="keywords"
          content="device erasure, data sanitization, mobile device wiping, laptop data destruction, DOD 5220.22-M, NIST 800-88"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <DeviceErasureContent />
    </>
  );
}

function DeviceErasureContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const deviceTypes = [
    {
      category: 'Mobile Devices',
      devices: ['Smartphones', 'Tablets', 'iPads', 'Android devices', 'Feature phones'],
      icon: <MobileIcon className="w-6 h-6" filled={true} />
    },
    {
      category: 'Computers',
      devices: ['Laptops', 'Desktops', 'Workstations', 'All-in-one PCs', 'Mini PCs'],
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />
    },
    {
      category: 'Storage Media',
      devices: ['Hard drives', 'SSDs', 'USB drives', 'Memory cards', 'Optical discs'],
      icon: <ShieldIcon className="w-6 h-6" filled={true} />
    }
  ]

  const erasureStandards = [
    {
      name: 'DOD 5220.22-M',
      description: 'US Department of Defense standard for data sanitization',
      passes: '3-pass overwrite pattern',
      compliance: 'Military & Government'
    },
    {
      name: 'NIST 800-88',
      description: 'National Institute of Standards and Technology guidelines',
      passes: 'Clear, Purge, Destroy methods',
      compliance: 'Federal & Enterprise'
    },
    {
      name: 'BSI TL-03423',
      description: 'German Federal Office for Information Security standard',
      passes: 'Secure overwrite patterns',
      compliance: 'European Union'
    },
    {
      name: 'CSEC ITSG-06',
      description: 'Canadian Centre for Cyber Security guidelines',
      passes: 'Multi-pass secure erasure',
      compliance: 'Canadian Government'
    }
  ]

  const features = [
    {
      title: 'Automated Device Discovery',
      description: 'Automatically detect and catalog all devices in your environment',
      icon: <GearIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Compliance Reporting',
      description: 'Generate tamper-proof certificates for audit and compliance',
      icon: <ShieldIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Real-time Monitoring',
      description: 'Track erasure progress and receive instant notifications',
      icon: <DatabaseIcon className="w-5 h-5" filled={true} />
    },
    {
      title: '30+ International Algorithms',
      description: 'Industry-standard erasure algorithms including DoD 5220.22-M, NIST 800-88, Gutmann method, and SSD-specific Trim/Crypto Erase',
      icon: <ShieldIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'File & Folder Erasure',
      description: 'Securely erase individual files, folders, or directory structures with verification',
      icon: <DatabaseIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Digital Trace Removal',
      description: 'Remove browsing history, system logs, application data, and other digital traces',
      icon: <GearIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Free Space Sanitization',
      description: 'Overwrite unused disk space to prevent recovery of previously deleted files',
      icon: <ShieldIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Scheduled Operations',
      description: 'Automatic erasure operations on predefined schedules for ongoing security',
      icon: <DatabaseIcon className="w-5 h-5" filled={true} />
    }
  ]

  const serviceFeatures = [
    {
      title: 'Platform Support',
      features: [
        'Windows 7 through Windows 11 compatibility',
        'Major Linux distributions (Ubuntu, CentOS, RHEL)',
        'macOS 10.14 and later versions',
        'Multi-language UI support (17+ languages)'
      ]
    },
    {
      title: 'Security Standards',
      features: [
        'DOD 5220.22-M (US Department of Defense)',
        'NIST 800-88 (National Institute of Standards)',
        'BSI TL-03423 (German Federal Office)',
        'CSEC ITSG-06 (Canadian Centre for Cyber Security)'
      ]
    },
    {
      title: 'Device Categories',
      features: [
        'Mobile devices (smartphones, tablets, iPads)',
        'Computers (laptops, desktops, workstations)',
        'Storage media (HDDs, SSDs, USB drives)',
        'Network attached storage and servers'
      ]
    }
  ]

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl text-white mb-6">
                    <MobileIcon className="w-8 h-8" filled={true} />
                  </div>
                </Reveal>
                <Reveal delayMs={10}>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    Device Erasure Service
                  </h1>
                </Reveal>
                <Reveal delayMs={20}>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Military-grade data sanitization for all device types. Secure, compliant, 
                    and Compliant erasure for laptops, mobile devices, and storage media.
                  </p>
                </Reveal>
                <Reveal delayMs={30}>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Link to="/contact" className="btn-primary">
                      Get Started
                    </Link>
                    <Link to="/pricing" className="btn-secondary">
                      View Pricing
                    </Link>
                  </div>
                </Reveal>
              </div>
              
              <div>
                <Reveal delayMs={40}>
                  <div className="bg-white rounded-2xl shadow-xl border border-emerald-200/60 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Highlights</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">1000+ supported device models</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">DOD & NIST compliant methods</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Tamper-proof certificates</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Real-time progress tracking</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Devices */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Supported Device Types
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our device erasure service supports over 1000 device models across all major categories.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deviceTypes.map((category, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{category.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.devices.map((device, deviceIndex) => (
                      <li key={deviceIndex} className="flex items-center gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                        {device}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Erasure Standards */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Compliance Standards
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We support all major international data sanitization standards for maximum compliance.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {erasureStandards.map((standard, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div 
                  className="bg-white rounded-xl border border-emerald-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => toggleSection(standard.name)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white">
                          <ShieldIcon className="w-6 h-6" filled={true} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{standard.name}</h3>
                          <p className="text-slate-600">{standard.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-brand">{standard.compliance}</span>
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          <HoverIcon>
                            {(filled) => 
                              expandedSection === standard.name ? 
                                <ArrowDownIcon className="w-5 h-5 text-slate-600 transform rotate-180" filled={filled} /> :
                                <ArrowDownIcon className="w-5 h-5 text-slate-600" filled={filled} />
                            }
                          </HoverIcon>
                        </div>
                      </div>
                    </div>
                    
                    {expandedSection === standard.name && (
                      <div className="mt-6 pt-6 border-t border-emerald-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Erasure Method</h4>
                            <p className="text-slate-600">{standard.passes}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Best For</h4>
                            <p className="text-slate-600">{standard.compliance}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Key Features
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Advanced features designed to streamline your device erasure process.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.slice(0,3).map((feature, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl text-brand mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comprehensive Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Complete Feature Set
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive device erasure capabilities with enterprise-grade security and compliance.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {serviceFeatures.map((category, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.slice(3).map((feature, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand">
                      {feature.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {feature.title}
                    </h4>
                  </div>
                  <p className="text-slate-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                How It Works
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our streamlined process ensures secure and compliant device erasure.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Device Discovery', description: 'Automatic detection and inventory of all devices' },
              { step: '02', title: 'Select Standards', description: 'Choose appropriate erasure standards for compliance' },
              { step: '03', title: 'Execute Erasure', description: 'Secure data sanitization with real-time monitoring' },
              { step: '04', title: 'Generate Certificate', description: 'Receive tamper-proof compliance certificates' }
            ].map((process, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full text-white text-xl font-bold mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {process.title}
                  </h3>
                  <p className="text-slate-600">
                    {process.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <div className="container-responsive">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Secure Your Devices?
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-brand-light mb-8">
                Get started with professional device erasure service today. 
                Contact our experts for a personalized consultation.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="bg-white text-brand px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                  Get Started
                  <ArrowRightIcon className="w-4 h-4" filled={true} />
                </Link>
                <Link to="/pricing" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-brand transition-colors">
                  View Pricing
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
