import Reveal from '@/components/Reveal'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  CheckIcon, 
  ServerIcon, 
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  ArrowRightIcon,
  HoverIcon,
  ArrowDownIcon
} from '@/components/FlatIcons'

export default function NetworkErasurePage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/services/network-erasure" />
        <title>
          Network Erasure Service | Enterprise Data Center Sanitization
        </title>
        <meta
          name="description"
          content="Enterprise network erasure service for servers, storage arrays, and data center infrastructure. Remote sanitization with comprehensive audit trails."
        />
        <meta
          name="keywords"
          content="network erasure, server data destruction, data center sanitization, enterprise storage erasure, RAID array erasure, SAN NAS erasure"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <NetworkErasureContent />
    </>
  );
}

function NetworkErasureContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const networkTypes = [
    {
      category: 'Server Infrastructure',
      systems: ['Physical servers', 'Virtual machines', 'Blade servers', 'Rack servers', 'Mainframes'],
      icon: <ServerIcon className="w-6 h-6" filled={true} />
    },
    {
      category: 'Storage Systems',
      systems: ['SAN arrays', 'NAS devices', 'RAID systems', 'Storage clusters', 'Backup systems'],
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />
    },
    {
      category: 'Network Equipment',
      systems: ['Switches', 'Routers', 'Firewalls', 'Load balancers', 'Access points'],
      icon: <GearIcon className="w-6 h-6" filled={true} />
    }
  ]

  const erasureMethods = [
    {
      name: 'Remote Network Sanitization',
      description: 'Secure remote erasure of network-attached devices',
      technology: 'HTTPS, SSH, IPMI protocols',
      scalability: 'Up to 500 concurrent devices'
    },
    {
      name: 'RAID Array Support',
      description: 'Specialized erasure for complex RAID configurations',
      technology: 'RAID 0, 1, 5, 6, 10 support',
      scalability: 'Multi-TB array processing'
    },
    {
      name: 'Active Directory Integration',
      description: 'Seamless integration with enterprise directory services',
      technology: 'LDAP, Kerberos, SSO',
      scalability: 'Enterprise-wide deployment'
    },
    {
      name: 'Scheduled Batch Processing',
      description: 'Automated scheduling for minimal business disruption',
      technology: 'Cron-based scheduling',
      scalability: 'Maintenance window optimization'
    }
  ]

  const features = [
    {
      title: 'Centralized Management',
      description: 'Manage all network erasure operations from a single console',
      icon: <GearIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Zero Downtime',
      description: 'Minimize business disruption with intelligent scheduling',
      icon: <ShieldIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Remote Network Sanitization',
      description: 'Secure remote erasure of network-attached devices via HTTPS, SSH, IPMI protocols',
      icon: <ServerIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'RAID Array Support',
      description: 'Specialized erasure for complex RAID configurations (0, 1, 5, 6, 10) with multi-TB processing',
      icon: <DatabaseIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Active Directory Integration',
      description: 'Seamless integration with enterprise directory services using LDAP, Kerberos, SSO',
      icon: <GearIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Concurrent Processing',
      description: 'Process up to 500 concurrent devices with automated batch scheduling',
      icon: <ShieldIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Enterprise Compliance',
      description: 'Meet enterprise-grade compliance requirements with detailed audit trails',
      icon: <ServerIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Real-time Monitoring',
      description: 'Track progress across all network devices with centralized dashboard',
      icon: <DatabaseIcon className="w-5 h-5" filled={true} />
    }
  ]

  const serviceFeatures = [
    {
      title: 'Network Infrastructure',
      features: [
        'Server infrastructure (physical, virtual, blade, rack)',
        'Storage systems (SAN, NAS, RAID, clusters)',
        'Network equipment (switches, routers, firewalls)',
        'Enterprise data center environments'
      ]
    },
    {
      title: 'Security & Compliance',
      features: [
        'Enterprise-grade security protocols',
        'Multi-factor authentication support',
        'Comprehensive audit trail generation',
        'Compliance with SOX, HIPAA, PCI DSS standards'
      ]
    },
    {
      title: 'Scalability & Performance',
      features: [
        'Up to 500 concurrent device processing',
        'Multi-TB array erasure capabilities',
        'Intelligent scheduling for minimal downtime',
        'Automated maintenance window optimization'
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
                    <ServerIcon className="w-8 h-8" filled={true} />
                  </div>
                </Reveal>
                <Reveal delayMs={10}>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    Network Erasure Service
                  </h1>
                </Reveal>
                <Reveal delayMs={20}>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Enterprise-grade network and data center sanitization. Secure erasure for servers, 
                    storage arrays, and network infrastructure with comprehensive audit trails.
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
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Service Highlights</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Up to 500 concurrent servers</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Remote network sanitization</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">RAID array support</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Active Directory integration</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Network Types */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Supported Network Infrastructure
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive support for all types of enterprise network and storage infrastructure.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {networkTypes.map((category, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{category.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.systems.map((system, systemIndex) => (
                      <li key={systemIndex} className="flex items-center gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 bg-brand rounded-full"></div>
                        {system}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Erasure Methods */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Advanced Erasure Methods
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Sophisticated techniques designed for enterprise network environments and large-scale operations.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {erasureMethods.map((method, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div 
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => toggleSection(method.name)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand/80 rounded-xl flex items-center justify-center text-white">
                          <ServerIcon className="w-6 h-6" filled={true} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{method.name}</h3>
                          <p className="text-slate-600">{method.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-brand">{method.scalability}</span>
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          <HoverIcon>
                            {(filled) => 
                              expandedSection === method.name ? 
                                <ArrowDownIcon className="w-5 h-5 text-slate-600 transform rotate-180" filled={filled} /> :
                                <ArrowDownIcon className="w-5 h-5 text-slate-600" filled={filled} />
                            }
                          </HoverIcon>
                        </div>
                      </div>
                    </div>
                    
                    {expandedSection === method.name && (
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Technology</h4>
                            <p className="text-slate-600">{method.technology}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Scalability</h4>
                            <p className="text-slate-600">{method.scalability}</p>
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
                Enterprise Features
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Advanced capabilities designed for enterprise network environments.
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

      {/* Technical Specifications */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Technical Specifications
              </h2>
            </Reveal>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Concurrent Servers', value: 'Up to 500', icon: <ServerIcon className="w-5 h-5" filled={true} /> },
                  { label: 'Storage Capacity', value: 'Multi-TB arrays', icon: <DatabaseIcon className="w-5 h-5" filled={true} /> },
                  { label: 'Remote Protocols', value: 'HTTPS, SSH, IPMI', icon: <GearIcon className="w-5 h-5" filled={true} /> },
                  { label: 'Compliance', value: 'SOC 2, ISO 27001', icon: <ShieldIcon className="w-5 h-5" filled={true} /> }
                ].map((spec, index) => (
                  <Reveal key={index} delayMs={index * 10}>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-brand/10 rounded-xl text-brand mb-3">
                        {spec.icon}
                      </div>
                      <div className="text-2xl font-bold text-slate-900 mb-1">{spec.value}</div>
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
                Network Erasure Process
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our streamlined process ensures secure and efficient network sanitization.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Network Discovery', description: 'Automated discovery and mapping of network infrastructure' },
              { step: '02', title: 'Schedule Planning', description: 'Optimize erasure schedule to minimize business impact' },
              { step: '03', title: 'Remote Execution', description: 'Secure remote erasure with real-time monitoring' },
              { step: '04', title: 'Compliance Report', description: 'Generate comprehensive audit trails and certificates' }
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
                Secure Your Enterprise Network
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-brand-light mb-8">
                Get started with enterprise network erasure service today. 
                Contact our experts for a comprehensive infrastructure assessment.
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
