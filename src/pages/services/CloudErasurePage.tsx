import Reveal from '@/components/Reveal'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  CheckIcon, 
  CloudIcon, 
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  ArrowRightIcon,
  HoverIcon,
  ArrowDownIcon
} from '@/components/FlatIcons'

export default function CloudErasurePage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/services/cloud-erasure" />
        <title>
          Cloud Erasure Service | Multi-Cloud Data Protection
        </title>
        <meta
          name="description"
          content="Comprehensive cloud erasure service for AWS, Azure, GCP, and SaaS applications. Secure cloud data removal with blockchain verification."
        />
        <meta
          name="keywords"
          content="cloud erasure, cloud data removal, AWS data sanitization, Azure data deletion, GCP data protection, SaaS data erasure"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <CloudErasureContent />
    </>
  );
}

function CloudErasureContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const cloudPlatforms = [
    {
      category: 'Public Cloud Platforms',
      platforms: ['Amazon AWS', 'Microsoft Azure', 'Google Cloud Platform', 'IBM Cloud', 'Oracle Cloud'],
      icon: <CloudIcon className="w-6 h-6" filled={true} />
    },
    {
      category: 'SaaS Applications',
      platforms: ['Office 365', 'Google Workspace', 'Salesforce', 'Dropbox', 'Box'],
      icon: <GearIcon className="w-6 h-6" filled={true} />
    },
    {
      category: 'Hybrid Environments',
      platforms: ['Multi-cloud setups', 'On-premise integration', 'Edge computing', 'CDN networks', 'Container orchestration'],
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />
    }
  ]

  const erasureCapabilities = [
    {
      name: 'Multi-Cloud Platform Support',
      description: 'Comprehensive data discovery and erasure across all major cloud platforms',
      technology: 'Cloud-native protocols, secure connections',
      coverage: 'AWS, Azure, GCP, Office 365'
    },
    {
      name: 'Cloud-Based Data Discovery',
      description: 'Intelligent scanning and mapping of cloud data assets',
      technology: 'AI-powered data classification',
      coverage: '200+ SaaS integrations'
    },
    {
      name: 'Automated Retention Policies',
      description: 'Policy-driven data lifecycle management and automated erasure',
      technology: 'Rule-based automation engine',
      coverage: 'Cross-platform policy enforcement'
    },
    {
      name: 'Blockchain Verification',
      description: 'Immutable proof of erasure with blockchain attestation',
      technology: 'Distributed ledger technology',
      coverage: 'Tamper-proof audit trails'
    }
  ]

  const features = [
    {
      title: 'Cross-Region Discovery',
      description: 'Discover and map data across all cloud regions and availability zones',
      icon: <CloudIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Compliance Automation',
      description: 'Automated compliance with GDPR, CCPA, and other data protection regulations',
      icon: <ShieldIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Multi-Cloud Platform Support',
      description: 'Comprehensive data discovery and erasure across AWS, Azure, GCP, and 200+ SaaS integrations',
      icon: <CloudIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Cloud-Based Data Discovery',
      description: 'AI-powered data classification and intelligent scanning across cloud environments',
      icon: <DatabaseIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Automated Retention Policies',
      description: 'Policy-driven data lifecycle management with cross-platform policy enforcement',
      icon: <GearIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Blockchain Verification',
      description: 'Immutable proof of erasure with distributed ledger technology and tamper-proof audit trails',
      icon: <ShieldIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Cloud Storage Erasure',
      description: 'Secure erasure from Google Drive, Dropbox, OneDrive, and other cloud storage services',
      icon: <CloudIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Container & Serverless',
      description: 'Specialized erasure for containerized applications and serverless computing environments',
      icon: <DatabaseIcon className="w-5 h-5" filled={true} />
    }
  ]

  const serviceFeatures = [
    {
      title: 'Cloud Platform Coverage',
      features: [
        'Amazon AWS (S3, EC2, RDS, Lambda)',
        'Microsoft Azure (Blob, VMs, SQL, Functions)',
        'Google Cloud Platform (Storage, Compute, BigQuery)',
        'Office 365, Google Workspace, Salesforce'
      ]
    },
    {
      title: 'Advanced Capabilities',
      features: [
        'AI-powered data classification and discovery',
        'Cross-region and multi-zone erasure',
        'Automated retention policy enforcement',
        'Blockchain-verified audit trails'
      ]
    },
    {
      title: 'Enterprise Integration',
      features: [
        '200+ SaaS application integrations',
        'Enterprise application integrations',
        'Container orchestration (K8s, Docker)',
        'Hybrid cloud and edge computing support'
      ]
    }
  ]

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 w-full overflow-hidden">
      {/* Hero Section */}
      <section>
        <div className="container-responsive py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Reveal>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand to-brand/80 rounded-2xl text-white mb-6">
                    <CloudIcon className="w-8 h-8" filled={true} />
                  </div>
                </Reveal>
                <Reveal delayMs={10}>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    Cloud Erasure Service
                  </h1>
                </Reveal>
                <Reveal delayMs={20}>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Comprehensive cloud data sanitization for multi-cloud environments. Secure erasure 
                    for AWS, Azure, GCP, and SaaS applications with blockchain verification.
                  </p>
                </Reveal>
                <Reveal delayMs={30}>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Link to="/contact" className="btn-primary">
                      Get Started
                    </Link>
                  </div>
                </Reveal>
              </div>
              
              <div>
                <Reveal delayMs={40}>
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Highlights</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Multi-cloud platform support</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">200+ SaaS integrations</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">AI-powered data discovery</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Blockchain verification</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Cloud Platforms */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Supported Cloud Platforms
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive coverage across all major cloud platforms and SaaS applications.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cloudPlatforms.map((category, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{category.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.platforms.map((platform, platformIndex) => (
                      <li key={platformIndex} className="flex items-center gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                        {platform}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Erasure Capabilities */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Advanced Cloud Capabilities
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Cutting-edge technologies designed for complex multi-cloud environments.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {erasureCapabilities.map((capability, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div 
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => toggleSection(capability.name)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand/80 rounded-xl flex items-center justify-center text-white">
                          <CloudIcon className="w-6 h-6" filled={true} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{capability.name}</h3>
                          <p className="text-slate-600">{capability.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-brand">{capability.coverage}</span>
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          <HoverIcon>
                            {(filled) => 
                              expandedSection === capability.name ? 
                                <ArrowDownIcon className="w-5 h-5 text-slate-600 transform rotate-180" filled={filled} /> :
                                <ArrowDownIcon className="w-5 h-5 text-slate-600" filled={filled} />
                            }
                          </HoverIcon>
                        </div>
                      </div>
                    </div>
                    
                    {expandedSection === capability.name && (
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Technology</h4>
                            <p className="text-slate-600">{capability.technology}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Coverage</h4>
                            <p className="text-slate-600">{capability.coverage}</p>
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
                Cloud-Native Features
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Advanced features specifically designed for cloud-native environments.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-brand/5 to-brand/10 rounded-xl p-6 text-center">
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

      {/* Cloud Compliance */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Cloud Compliance Standards
              </h2>
            </Reveal>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Data Regulations', value: 'GDPR, CCPA', icon: <ShieldIcon className="w-5 h-5" filled={true} /> },
                  { label: 'Cloud Standards', value: 'SOC 2, ISO 27017', icon: <CloudIcon className="w-5 h-5" filled={true} /> },
                  { label: 'Data Discovery', value: 'AI-powered scanning', icon: <GearIcon className="w-5 h-5" filled={true} /> },
                  { label: 'Verification', value: 'Blockchain proof', icon: <DatabaseIcon className="w-5 h-5" filled={true} /> }
                ].map((spec, index) => (
                  <Reveal key={index} delayMs={index * 10}>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-brand/10 rounded-xl text-brand mb-3">
                        {spec.icon}
                      </div>
                      <div className="text-lg font-bold text-slate-900 mb-1">{spec.value}</div>
                      <div className="text-sm text-slate-600">{spec.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Cloud Erasure Process
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our comprehensive process ensures complete cloud data sanitization.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Cloud Discovery', description: 'AI-powered discovery of data across all cloud platforms' },
              { step: '02', title: 'Policy Configuration', description: 'Configure automated retention and erasure policies' },
              { step: '03', title: 'Secure Erasure', description: 'Execute secure erasure with cross-region verification' },
              { step: '04', title: 'Blockchain Proof', description: 'Generate immutable proof of erasure with blockchain' }
            ].map((process, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand to-brand/80 rounded-full text-white text-xl font-bold mb-4">
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
      <section className="py-16 md:py-24 bg-gradient-to-r from-brand to-brand-dark">
        <div className="container-responsive">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Secure Your Cloud Infrastructure
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-brand-light mb-8">
                Get started with comprehensive cloud erasure service today. 
                Contact our experts for a multi-cloud security assessment.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="bg-white text-brand px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                  Get Started
                  <ArrowRightIcon className="w-4 h-4" filled={true} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
