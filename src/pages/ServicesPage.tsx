import Reveal from '@/components/Reveal'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SEOHead from '@/components/SEOHead'
import { getSEOForPage } from '@/utils/seo'
import { 
  CheckIcon, 
  MobileIcon, 
  ServerIcon, 
  CloudIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  HoverIcon,
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  BriefcaseIcon
} from '@/components/FlatIcons'

export default function ServicesPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('services')} />
      
      <ServicesPageContent />
    </>
  );
}

function ServicesPageContent() {
  type TabType = 'device' | 'network' | 'cloud';
  const [activeTab, setActiveTab] = useState<TabType>('device')
  const [searchParams] = useSearchParams()
  
  // State for expandable table sections
  const [expandedSections, setExpandedSections] = useState({
    capabilities: false,
    platform: false,
    reporting: false,
    services: false
  })
  
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  // Toggle section expand/collapse
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }))
  }

  // Tooltip functions
  const showTooltip = (tooltipId: string) => {
    setActiveTooltip(tooltipId)
  }

  const hideTooltip = () => {
    setActiveTooltip(null)
  }

  // Feature descriptions for tooltips
  const featureDescriptions = {
    'included': '✅ Feature is fully included in this plan at no extra cost',
    'not-included': '🚫 Feature is not available in this plan - upgrade to access',
    'addon-paid': '🔒 Available as paid add-on or upgrade - contact sales for pricing',
    'coming-soon': '⏳ Feature coming soon - will be included when released',
    'enterprise-free': 'Enterprise plan includes free allowances: Disk erasure (1 free), Volume erasure (5 free), Custom installers (5 free), Private cloud (1 free)'
  }

  // Handle URL parameters to auto-select tabs
  useEffect(() => {
    const urlType = searchParams.get('type')?.toLowerCase()
    if (urlType) {
      if (urlType === 'device' || urlType.includes('mobile') || urlType.includes('endpoint')) {
        setActiveTab('device')
      } else if (urlType === 'server' || urlType.includes('network')) {
        setActiveTab('network')
      } else if (urlType === 'cloud' || urlType.includes('azure') || urlType.includes('aws')) {
        setActiveTab('cloud')
      }
    }
  }, [searchParams])

  // Helper function to render feature icons based on value
  const renderFeatureIcon = (value: any, isEnterprise: boolean = false) => {
    if (value === true) {
      return (
        <HoverIcon>
          {(filled) => <CheckIcon className="w-5 h-5 text-green-500 mx-auto" filled={filled} />}
        </HoverIcon>
      );
    } else if (value === false) {
      return (
        <svg className="w-5 h-5 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    } else if (value === 'paid') {
      return <span className="text-slate-500">🔒</span>;
    } else if (value === 'coming') {
      return <span className="text-orange-600">⏳</span>;
    } else if (value === 'limited') {
      return <span className="text-xs text-slate-600">Limited</span>;
    } else if (value === 'expanded') {
      return <span className="text-xs text-slate-600">Expanded</span>;
    } else if (typeof value === 'string' && value.includes('included')) {
      return isEnterprise ? <strong className="text-green-600">{value}</strong> : <span className="text-green-600">{value}</span>;
    } else if (typeof value === 'string' && value.includes('free')) {
      return isEnterprise ? <strong className="text-green-600">{value}</strong> : <span className="text-green-600">{value}</span>;
    } else if (typeof value === 'string') {
      return <span className="text-xs text-slate-600">{value}</span>;
    }
    
    return (
      <HoverIcon>
        {(filled) => <CheckIcon className="w-5 h-5 text-green-500 mx-auto" filled={filled} />}
      </HoverIcon>
    );
  };

  const services = {
    device: {
      title: 'Device Erasure',
      subtitle: 'Comprehensive data sanitization for all device types',
      description: 'Military-grade data erasure for laptops, desktops, mobile devices, and storage media with Compliant compliance reporting.',
      icon: (
        <HoverIcon>
          {(filled) => <MobileIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      features: [
        'DOD 5220.22-M compliant erasure',
        'NIST 800-88 Compliant methods',
        'Support for 1000+ device types',
        'Automated inventory management',
        'Tamper-proof certificates',
        'Real-time progress tracking'
      ],
      specs: [
        { label: 'Supported Devices', value: '1000+ Models' },
        { label: 'Erasure Standards', value: 'DOD, NIST, BSI, CSEC' },
        { label: 'Processing Speed', value: 'Up to 100 devices/hour' },
        { label: 'Certificate Format', value: 'PDF, XML, JSON' }
      ]
    },
    network: {
      title: 'Network Erasure',
      subtitle: 'Enterprise-grade network and data center sanitization',
      description: 'Secure erasure for enterprise networks, storage arrays, and data center infrastructure with comprehensive audit trails.',
      icon: (
        <HoverIcon>
          {(filled) => <ServerIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      features: [
        'Remote network sanitization',
        'RAID array support',
        'Enterprise SAN/NAS erasure',
        'Scheduled batch processing',
        'Active Directory integration',
        'Compliance reporting suite'
      ],
      specs: [
        { label: 'Server Types', value: 'Physical & Virtual' },
        { label: 'Storage Systems', value: 'SAN, NAS, RAID' },
        { label: 'Concurrent Jobs', value: 'Up to 500 servers' },
        { label: 'Remote Access', value: 'HTTPS, SSH, IPMI' }
      ]
    },
    cloud: {
      title: 'Cloud Erasure',
      subtitle: 'Secure cloud storage and SaaS data removal',
      description: 'Complete data sanitization for cloud storage platforms, SaaS applications, and hybrid cloud environments.',
      icon: (
        <HoverIcon>
          {(filled) => <CloudIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      features: [
        'Multi-cloud platform support',
        'API-based data discovery',
        'Automated retention policies',
        'Cross-region data mapping',
        'SaaS application integration',
        'Blockchain verification'
      ],
      specs: [
        { label: 'Cloud Platforms', value: 'AWS, Azure, GCP, O365' },
        { label: 'SaaS Apps', value: '200+ Integrations' },
        { label: 'Data Discovery', value: 'AI-powered scanning' },
        { label: 'Verification', value: 'Blockchain attestation' }
      ]
    }
  }

  return (
    <>
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
        <div className="container-responsive">
          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                Comprehensive Data Erasure Services
              </h1>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Military-grade data sanitization for devices, servers, and cloud platforms. 
                Trusted by enterprises worldwide for secure, compliant data destruction.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/pricing" className="btn-primary">
                  View Pricing Plans
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Request Demo
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="container-responsive">
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-12 lg:mb-12 xl:mb-14 xxl:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl xxl:text-5xl font-bold text-slate-900 mb-3 xs:mb-4 sm:mb-4 md:mb-4 lg:mb-4 xl:mb-5 xxl:mb-6">Choose Your Service</h2>
            <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 max-w-xl xs:max-w-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl xxl:max-w-5xl mx-auto">
              Select the right data erasure service for your specific needs and infrastructure.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-center mb-8 xs:mb-10 sm:mb-12 md:mb-12 lg:mb-12 xl:mb-14 xxl:mb-16">
            <div className="flex flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row xxl:flex-row rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl bg-slate-100 p-1 w-full sm:w-auto max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl xxl:max-w-4xl">
              {Object.entries(services).map(([key, service]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as TabType)}
                  className={`flex items-center justify-center gap-2 xs:gap-3 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-4 xxl:gap-4 px-3 xs:px-4 sm:px-4 md:px-4 lg:px-6 xl:px-6 xxl:px-8 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 xl:py-4 xxl:py-4 rounded-md xs:rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-lg xl:rounded-lg xxl:rounded-lg text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base xxl:text-base font-medium transition-all duration-200 whitespace-nowrap flex-1 sm:flex-none ${
                    activeTab === key
                      ? 'bg-white text-brand shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="w-5 h-5 flex-shrink-0 mb-2">{service.icon}</span>
                  <span className="hidden sm:inline">{service.title}</span>
                  <span className="sm:hidden text-xs">{service.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Service Content */}
          <Reveal key={activeTab}>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-6 md:p-8 lg:p-12">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl text-white mb-4 lg:mb-6">
                    {services[activeTab].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {services[activeTab].title}
                  </h3>
                  <p className="text-lg text-brand font-medium mb-4">
                    {services[activeTab].subtitle}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    {services[activeTab].description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {services[activeTab].features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <HoverIcon>
                            {(filled) => <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" filled={filled} />}
                          </HoverIcon>
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 lg:p-6">
                  <h4 className="font-semibold text-slate-900 mb-4 lg:mb-6">Technical Specifications</h4>
                  <div className="space-y-3 lg:space-y-4">
                    {services[activeTab].specs.map((spec, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-slate-200 last:border-b-0 gap-1 sm:gap-0">
                        <span className="text-slate-600 text-sm lg:text-base">{spec.label}</span>
                        <span className="font-medium text-slate-900 text-sm lg:text-base">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-slate-200">
                    <div className="flex flex-col gap-3">
                      <Link to="/contact" className="btn-primary text-center">
                        Request Quote
                      </Link>
                      <Link to="/resources" className="btn-secondary text-center">
                        Documentation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Footer */}
              <div className="flex items-center justify-between p-4 md:p-6 border-t border-slate-200/60 bg-slate-50/50">
                <button
                  onClick={() => {
                    const tabs: TabType[] = ['device', 'network', 'cloud'];
                    const currentIndex = tabs.indexOf(activeTab);
                    const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
                    setActiveTab(tabs[prevIndex]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-brand transition-colors rounded-lg hover:bg-white/80"
                >
                  <HoverIcon>
                    {(filled) => <ArrowLeftIcon className="w-4 h-4" filled={filled} />}
                  </HoverIcon>
                  <span className="text-sm font-medium">Previous Service</span>
                </button>
                
                <div className="text-center">
                  <div className="text-xs text-slate-400">
                    {['device', 'network', 'cloud'].indexOf(activeTab) + 1} of 3
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    const tabs: TabType[] = ['device', 'network', 'cloud'];
                    const currentIndex = tabs.indexOf(activeTab);
                    const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
                    setActiveTab(tabs[nextIndex]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-brand transition-colors rounded-lg hover:bg-white/80"
                >
                  <span className="text-sm font-medium">Next Service</span>
                  <HoverIcon>
                    {(filled) => <ArrowRightIcon className="w-4 h-4" filled={filled} />}
                  </HoverIcon>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comprehensive Plan Comparison */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-responsive">
          <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 border border-green-100 shadow-lg mb-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-teal-200/30 to-cyan-200/30 rounded-full blur-2xl translate-y-8 -translate-x-8"></div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700 uppercase tracking-wider">Service Plans Overview</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                 <span><img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1759503993/ec8v6wcjdpwgpplobi3w.svg" alt="" className='w-10 h-10 inline-block -mt-1'/></span> D-SecureErase
                </span>
                <br />
                <span className="text-2xl md:text-3xl text-slate-800">Complete Service Plan Comparison</span>
              </h2>
              
              <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Choose the perfect service plan for your security needs. From individual users to enterprise deployments,
                we have solutions that scale with your requirements.
              </p>
              
              {/* Plan quick info */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="bg-white/70 backdrop-blur-sm px-3 py-2 rounded-full border border-white/40">
                  <span className="text-sm text-slate-600">6 Service Plans</span>
                </div>
                <div className="bg-white/70 backdrop-blur-sm px-3 py-2 rounded-full border border-white/40">
                  <span className="text-sm text-slate-600">All Platforms</span>
                </div>
                <div className="bg-white/70 backdrop-blur-sm px-3 py-2 rounded-full border border-white/40">
                  <span className="text-sm text-slate-600">Scalable</span>
                </div>
              </div>
            </div>
          </div>

          <Reveal>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
              
              {/* Free Enterprise Trial Banner */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 text-center">
                <h3 className="text-xl font-bold mb-2">🎉 Try Enterprise FREE for 14 Days</h3>
                <p className="mb-4">Test all Enterprise features on 1 device - No credit card required</p>
                <Link to="/contact" className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Start Free Trial
                </Link>
              </div>

              {/* Core Erasure Capabilities Table */}
              <div className="mb-4">
                <div 
                  className="group cursor-pointer bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg"
                  onClick={() => toggleSection('capabilities')}
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <ShieldIcon className="w-6 h-6 text-white" filled={true} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-green-700 transition-colors">Core Erasure Capabilities</h3>
                          <p className="text-sm text-slate-600 mt-1">Advanced data destruction and security erasure methods</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-600 group-hover:text-green-700 transition-colors">
                          {expandedSections.capabilities ? 'Hide' : 'Show'}
                        </span>
                        <div className="w-8 h-8 bg-white/70 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
                          <HoverIcon>
                            {(filled) => 
                              expandedSections.capabilities ? 
                                <ArrowDownIcon className="w-5 h-5 text-green-600" filled={filled} /> :
                                <ArrowRightIcon className="w-5 h-5 text-green-600" filled={filled} />
                            }
                          </HoverIcon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {expandedSections.capabilities && (
                  <div className="mt-2 overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Base</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Standard</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Cloud</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Network</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Pro</th>
                          <th className="text-center p-4 font-semibold text-slate-900 bg-purple-50">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {[
                          ['30+ International Algorithms (SSD Trim, Crypto Erase)', true, true, true, true, true, true],
                          ['File & Folder Erase', true, true, true, true, true, true],
                          ['Erase Traces (Browser, System, App data)', true, true, true, true, true, true],
                          ['Erase Deleted Data / Free Space', false, true, true, true, true, true],
                          ['Erase Volume', false, false, false, 'paid', 'paid', '5 included'],
                          ['Erase Disk (Full Device)', false, false, false, 'paid', 'paid', '1 included'],
                          ['Scheduled Erase', 'limited', 'expanded', true, true, true, true],
                          ['Cloud Storage Erase (Google Drive)', true, true, true, true, true, true]
                        ].map(([feature, base, standard, cloud, network, pro, enterprise], index) => (
                          <tr key={index} className="hover:bg-slate-50/50">
                            <td className="p-4 font-medium text-slate-900">
                              {feature}
                            </td>
                            <td className="p-4 text-center">{renderFeatureIcon(base)}</td>
                            <td className="p-4 text-center">{renderFeatureIcon(standard)}</td>
                            <td className="p-4 text-center">{renderFeatureIcon(cloud)}</td>
                            <td className="p-4 text-center">{renderFeatureIcon(network)}</td>
                            <td className="p-4 text-center">{renderFeatureIcon(pro)}</td>
                            <td className="p-4 text-center bg-purple-50">{renderFeatureIcon(enterprise, true)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Platform Support Table */}
              <div className="mb-4">
                <div 
                  className="group cursor-pointer bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg"
                  onClick={() => toggleSection('platform')}
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <MobileIcon className="w-6 h-6 text-white" filled={true} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">Platform & OS Support</h3>
                          <p className="text-sm text-slate-600 mt-1">Cross-platform compatibility and operating system support</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-600 group-hover:text-blue-700 transition-colors">
                          {expandedSections.platform ? 'Hide' : 'Show'}
                        </span>
                        <div className="w-8 h-8 bg-white/70 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
                          <HoverIcon>
                            {(filled) => 
                              expandedSections.platform ? 
                                <ArrowDownIcon className="w-5 h-5 text-blue-600" filled={filled} /> :
                                <ArrowRightIcon className="w-5 h-5 text-blue-600" filled={filled} />
                            }
                          </HoverIcon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {expandedSections.platform && (
                  <div className="mt-2 overflow-x-auto border border-slate-200 rounded-lg">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Base</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Standard</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Cloud</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Network</th>
                          <th className="text-center p-4 font-semibold text-slate-900">Pro</th>
                          <th className="text-center p-4 font-semibold text-slate-900 bg-purple-50">Enterprise</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {[
                          ['Windows Support', true, true, true, true, true, true],
                          ['Linux Support', false, true, true, true, true, true],
                          ['macOS Support', false, true, true, true, true, true],
                          ['Multi-language UI & Reports (17+)', 'coming', 'coming', 'coming', 'coming', 'coming', 'coming']
                        ].map(([feature, base, standard, cloud, network, pro, enterprise], index) => (
                          <tr key={index} className="hover:bg-slate-50/50">
                            <td className="p-4 font-medium text-slate-900">
                              <span>{feature}</span>
                            </td>
                            <td className="p-4 text-center">{renderFeatureIcon(base)}</td>
                            <td className="p-4 text-center">{renderFeatureIcon(standard)}</td>
                            <td className="p-4 text-center">{renderFeatureIcon(cloud)}</td>
                            <td className="p-4 text-center">{renderFeatureIcon(network)}</td>
                            <td className="p-4 text-center">{renderFeatureIcon(pro)}</td>
                            <td className="p-4 text-center bg-purple-50">{renderFeatureIcon(enterprise, true)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Reporting & Compliance Table */}
              <div className="mb-4">
                <div 
                  className="group cursor-pointer bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg"
                  onClick={() => toggleSection('reporting')}
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <DatabaseIcon className="w-6 h-6 text-white" filled={true} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">Reporting & Compliance</h3>
                          <p className="text-sm text-slate-600 mt-1">Audit trails, compliance certificates, and detailed reporting</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-600 group-hover:text-purple-700 transition-colors">
                          {expandedSections.reporting ? 'Hide' : 'Show'}
                        </span>
                        <div className="w-8 h-8 bg-white/70 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
                          <HoverIcon>
                            {(filled) => 
                              expandedSections.reporting ? 
                                <ArrowDownIcon className="w-5 h-5 text-purple-600" filled={filled} /> :
                                <ArrowRightIcon className="w-5 h-5 text-purple-600" filled={filled} />
                            }
                          </HoverIcon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {expandedSections.reporting && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-slate-200">
                      {[
                        ['Local PDF Reports', false, true, true, true, true, true],
                        ['White-Label Reports', false, false, true, true, true, true],
                        ['Cloud Report Upload/Sync', false, false, 'slow', 'improved', 'fast', 'fastest'],
                        ['XML Report Format', false, false, false, false, 'coming', true],
                        ['Audit-Grade Compliance Certificates', false, true, true, true, true, true],
                        ['User/Action Logs', false, false, false, true, true, true]
                      ].map(([feature, base, standard, cloud, network, pro, enterprise], index) => (
                        <tr key={index} className="hover:bg-slate-50/50">
                          <td className="p-4 font-medium text-slate-900">{feature}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(base)}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(standard)}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(cloud)}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(network)}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(pro)}</td>
                          <td className="p-4 text-center bg-purple-50">{renderFeatureIcon(enterprise, true)}</td>
                        </tr>
                      ))}  
                    </tbody>
                  </table>
                </div>
                )}
              </div>

              {/* Services & Management Table */}
              <div className="mb-4">
                <div 
                  className="group cursor-pointer bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100 hover:border-orange-200 transition-all duration-300 hover:shadow-lg"
                  onClick={() => toggleSection('services')}
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <GearIcon className="w-6 h-6 text-white" filled={true} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-700 transition-colors">Services & Management</h3>
                          <p className="text-sm text-slate-600 mt-1">Cloud services, remote management, and administrative tools</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-600 group-hover:text-orange-700 transition-colors">
                          {expandedSections.services ? 'Hide' : 'Show'}
                        </span>
                        <div className="w-8 h-8 bg-white/70 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
                          <HoverIcon>
                            {(filled) => 
                              expandedSections.services ? 
                                <ArrowDownIcon className="w-5 h-5 text-orange-600" filled={filled} /> :
                                <ArrowRightIcon className="w-5 h-5 text-orange-600" filled={filled} />
                            }
                          </HoverIcon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {expandedSections.services && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody className="divide-y divide-slate-200">
                      {[
                        ['Web Dashboard', 'limited', true, true, true, true, true],
                        ['Cloud Commands (Remote Jobs)', false, false, false, true, true, true],
                        ['Custom Installer (auto-register machine)', 'paid', 'paid', 'paid', 'paid', '1 free', '5 free'],
                        ['Private Cloud Support', false, false, false, false, '1 free', '1 free'],
                        ['White-Label Dashboard', false, false, true, true, true, true]
                      ].map(([feature, base, standard, cloud, network, pro, enterprise], index) => (
                        <tr key={index} className="hover:bg-slate-50/50">
                          <td className="p-4 font-medium text-slate-900">{feature}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(base)}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(standard)}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(cloud)}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(network)}</td>
                          <td className="p-4 text-center">{renderFeatureIcon(pro)}</td>
                          <td className="p-4 text-center bg-purple-50">{renderFeatureIcon(enterprise, true)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
              </div>

              {/* Legend */}
              <div className="bg-slate-50 p-6 border-t border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4">Legend</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="relative cursor-help"
                      onMouseEnter={() => showTooltip('included')}
                      onMouseLeave={hideTooltip}
                    >
                      <span className="text-green-600">✅</span>
                      {activeTooltip === 'included' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg">
                          {featureDescriptions.included}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                    <span>Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="relative cursor-help"
                      onMouseEnter={() => showTooltip('not-included')}
                      onMouseLeave={hideTooltip}
                    >
                      <span>🚫</span>
                      {activeTooltip === 'not-included' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg">
                          {featureDescriptions['not-included']}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                    <span>Not Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="relative cursor-help"
                      onMouseEnter={() => showTooltip('addon-paid')}
                      onMouseLeave={hideTooltip}
                    >
                      <span>🔒</span>
                      {activeTooltip === 'addon-paid' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                          {featureDescriptions['addon-paid']}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                    <span>Add-on / Paid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="relative cursor-help"
                      onMouseEnter={() => showTooltip('coming-soon')}
                      onMouseLeave={hideTooltip}
                    >
                      <span className="text-orange-600">⏳</span>
                      {activeTooltip === 'coming-soon' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg">
                          {featureDescriptions['coming-soon']}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                      )}
                    </div>
                    <span>Coming Soon</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div 
                    className="relative cursor-help inline-block"
                    onMouseEnter={() => showTooltip('enterprise-free')}
                    onMouseLeave={hideTooltip}
                  >
                    <p className="text-xs text-slate-600">
                      <strong>Bold</strong> = Enterprise free allowances (disk/volume/installers/private cloud)
                    </p>
                    {activeTooltip === 'enterprise-free' && (
                      <div className="absolute bottom-full mb-2 left-0 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                        {featureDescriptions['enterprise-free']}
                        <div className="absolute top-full left-4 transform -translate-y-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Sales CTA */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center text-white">
                <h3 className="text-xl font-bold mb-4">Ready to Choose Your Service Plan?</h3>
                <p className="mb-6 opacity-90">Contact our sales team for custom pricing and enterprise quotes</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact" className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Contact Sales for Quote
                  </Link>
                  <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                    Schedule Demo
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Sales CTA Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Contact our sales team for custom pricing, enterprise quotes, and personalized service deployment strategies.
              </p>
            </Reveal>
          </div>

          {/* Enterprise Trial Banner */}
          <Reveal delayMs={20}>
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 mb-8 text-center">
              <h3 className="text-2xl font-bold mb-4">🎉 Try Enterprise FREE for 14 Days</h3>
              <p className="text-lg mb-6 opacity-90">
                Test all Enterprise features on 1 device - No credit card required, No purchase needed
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                  🚀 Start Free Enterprise Trial
                </Link>
                <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  📞 Contact Sales Team
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Contact Options */}
          <Reveal delayMs={40}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <div className="text-3xl mb-4">💬</div>
                <h3 className="font-semibold text-slate-900 mb-3">Request Custom Quote</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Get personalized pricing based on your organization's specific needs and deployment size.
                </p>
                <Link to="/contact" className="btn-primary text-sm">
                  Get Quote
                </Link>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <div className="text-3xl mb-4">📅</div>
                <h3 className="font-semibold text-slate-900 mb-3">Schedule Demo</h3>
                <p className="text-sm text-slate-600 mb-4">
                  See D-SecureErase in action with a personalized demo tailored to your use case.
                </p>
                <Link to="/contact" className="btn-secondary text-sm">
                  Book Demo
                </Link>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
                <div className="text-3xl mb-4">🏢</div>
                <h3 className="font-semibold text-slate-900 mb-3">Enterprise Consultation</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Discuss enterprise deployment strategies and custom integration requirements.
                </p>
                <Link to="/contact" className="btn-secondary text-sm">
                  Consult Now
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="container-responsive">
          <Reveal>
            <div className="bg-gradient-to-r from-brand to-brand/80 rounded-2xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Data?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of organizations who trust DSecure for their data erasure needs. 
                Start with a free demo today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/pricing" className="bg-white text-brand px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                  View Pricing
                </a>
                <a href="/contact" className="border border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  Schedule Demo
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
    </>
  )
}


