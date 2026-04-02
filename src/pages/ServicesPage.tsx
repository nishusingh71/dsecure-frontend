import Reveal from '@/components/Reveal'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

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
import { getSEOForPage } from '@/utils/seo';
import SEOHead from '@/components/SEOHead';

export default function ServicesPage() {
  return (
    <>
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
    const urlSearch = searchParams.get('search')?.toLowerCase()
    if (urlSearch) {
      if (urlSearch.includes('device') || urlSearch.includes('mobile') || urlSearch.includes('endpoint')) {
        setActiveTab('device')
      } else if (urlSearch.includes('network') || urlSearch.includes('server')) {
        setActiveTab('network')
      } else if (urlSearch.includes('cloud') || urlSearch.includes('azure') || urlSearch.includes('aws')) {
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
      return isEnterprise ? <strong className="text-green-800">{value}</strong> : <span className="text-green-800">{value}</span>;
    } else if (typeof value === 'string' && value.includes('free')) {
      return isEnterprise ? <strong className="text-green-800">{value}</strong> : <span className="text-green-800">{value}</span>;
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
      description: 'Military-grade data erasure for laptops, desktops, mobile devices, and storage media with regulated compliance reporting.',
      icon: (
        <HoverIcon>
          {(filled) => <MobileIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      features: [
        'DOD 5220.22-M compliant erasure',
        'NIST 800-88 regulated methods',
        'Support for 1000+ device types',
        'Automated inventory management',
        'Tamper-proof regulatory documents',
        'Real-time progress tracking'
      ],
      specs: [
        { label: 'Supported Devices', value: '1000+ Models' },
        { label: 'Erasure Standards', value: 'DOD, NIST, BSI, CSEC' },
        { label: 'Processing Speed', value: 'Up to 100 devices/hour' },
        { label: 'Regulatory Document Format', value: 'PDF, XML, JSON' }
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
      <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 w-full overflow-hidden">
        {/* ================= HERO SECTION ================= */}
        <section className="min-h-[600px] flex items-start pt-8 lg:pt-12 pb-8 lg:pb-12 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl opacity-20 -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-100/40 rounded-full blur-3xl opacity-20 -ml-64 -mb-64"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
              
              {/* Left Column: Content */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold mb-4 shadow-sm border border-emerald-200">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Military-Grade Compliant Trusted</span>
                  </div>
                  
                  <Reveal>
                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                      Comprehensive Data{" "}
                      <span className="block bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent pb-1">
                        Erasure Services
                      </span>
                    </h1>
                  </Reveal>
                </div>

                <Reveal delayMs={10}>
                  <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                    Military-grade data sanitization for devices, servers, and cloud platforms.
                    Trusted by enterprises worldwide for secure, compliant data destruction.
                  </p>
                </Reveal>

                <Reveal delayMs={20}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-200/50 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      Request Demo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 border-2 border-emerald-600 text-emerald-700 px-8 py-4 rounded-xl font-bold bg-white hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-emerald-100/50"
                    >
                      Contact Sales
                    </Link>
                  </div>
                </Reveal>

                {/* Compliance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-emerald-100/50">
                  {["DOD 5220.22-M", "NIST 800-88", "GDPR", "ISO 27001"].map((badge) => (
                    <div
                      key={badge}
                      className="flex items-center gap-2 bg-white/80 px-2.5 py-1.5 rounded-full shadow-sm border border-emerald-50"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Services Ecosystem Graphic */}
              <div className="relative w-full max-w-lg mx-auto overflow-visible">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-visible p-1 lg:p-2">
                  <div
                    className="relative bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl overflow-visible shadow-inner"
                    style={{ height: "340px" }}
                  >
                    {/* Animated dotted connection lines */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                      viewBox="0 0 400 340"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <line x1="200" y1="125" x2="200" y2="60" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.5s" repeatCount="indefinite" />
                      </line>
                      <line x1="148" y1="170" x2="55" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.8s" repeatCount="indefinite" />
                      </line>
                      <line x1="252" y1="170" x2="345" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.6s" repeatCount="indefinite" />
                      </line>
                      <line x1="165" y1="205" x2="60" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="2s" repeatCount="indefinite" />
                      </line>
                      <line x1="235" y1="205" x2="340" y2="280" stroke="#10b981" strokeWidth="2" strokeDasharray="6,5" strokeOpacity="0.7">
                        <animate attributeName="stroke-dashoffset" values="0;-11" dur="1.7s" repeatCount="indefinite" />
                      </line>
                    </svg>

                    {/* CENTER: Shield/Service Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] z-10 transition-transform hover:scale-105 duration-500">
                      <svg width="90" height="90" viewBox="0 0 72 72" fill="none"
                           className="drop-shadow-[0_12px_24px_rgba(16,185,129,0.35)]">
                        {/* Shield shape */}
                        <path d="M36 6 L60 18 L60 38 C60 52 48 62 36 66 C24 62 12 52 12 38 L12 18 Z" fill="#10b981" />
                        <path d="M36 10 L56 20 L56 37 C56 49 46 58 36 62 C26 58 16 49 16 37 L16 20 Z" fill="#059669" />
                        {/* Checkmark inside */}
                        <path d="M26 36 L33 43 L46 28" stroke="#d1fae5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <text x="36" y="56" textAnchor="middle" fill="#d1fae5" fontSize="5" fontWeight="900" fontFamily="sans-serif">D-SECURE</text>
                      </svg>
                    </div>

                    {/* TOP CENTER: Device */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-[10px] left-1/2 -translate-x-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">DEVICE</span>
                    </div>

                    {/* MIDDLE LEFT: Server */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-1/2 left-[5px] -translate-y-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2" /><rect x="2" y="14" width="20" height="8" rx="2" />
                        <circle cx="7" cy="6" r="1" fill="#0d9488" stroke="none" /><circle cx="7" cy="18" r="1" fill="#0d9488" stroke="none" />
                        <line x1="11" y1="6" x2="17" y2="6" /><line x1="11" y1="18" x2="17" y2="18" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">SERVER</span>
                    </div>

                    {/* MIDDLE RIGHT: Cloud */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 top-1/2 right-[5px] -translate-y-1/2">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">CLOUD</span>
                    </div>

                    {/* BOTTOM LEFT: Mobile */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 bottom-[10px] left-[5px]">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="17" r="1" fill="#0d9488" stroke="none" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">MOBILE</span>
                    </div>

                    {/* BOTTOM RIGHT: Storage */}
                    <div className="absolute bg-white rounded-xl border border-slate-100 shadow-md w-[86px] flex flex-col items-center justify-center gap-[5px] py-[10px] px-[6px] pb-[8px] hover:shadow-lg transition-transform hover:scale-105 duration-200 z-20 bottom-[10px] right-[5px]">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="10" rx="2" />
                        <circle cx="17" cy="12" r="1.5" fill="#16a34a" stroke="none" />
                        <line x1="5" y1="10" x2="12" y2="10" /><line x1="5" y1="14" x2="9" y2="14" />
                      </svg>
                      <span className="text-[8.5px] font-semibold text-slate-700 tracking-wide text-center leading-tight">STORAGE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Tabs */}
        <section className="py-16 md:py-24">
          <div className="container-app">
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
                    className={`flex items-center justify-center gap-2 xs:gap-3 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-4 xxl:gap-4 px-3 xs:px-4 sm:px-4 md:px-4 lg:px-6 xl:px-6 xxl:px-8 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 xl:py-4 xxl:py-4 rounded-md xs:rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-lg xl:rounded-lg xxl:rounded-lg text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base xxl:text-base font-medium transition-all duration-200 whitespace-nowrap flex-1 sm:flex-none ${activeTab === key
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
                    <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-brand to-brand/80 rounded-2xl text-white mb-4 lg:mb-6">
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
          <div className="container-app">
            <div className="relative bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 border border-green-100 shadow-lg mb-12">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-200/30 to-teal-200/30 rounded-full blur-2xl translate-y-8 -translate-x-8"></div>

              <div className="relative text-center">
                <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700 uppercase tracking-wider">Service Plans Overview</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  <span className="bg-gradient-to-r from-green-600 via-blue-600 to-teal-600 bg-clip-text text-transparent">
                    <span><img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1759503993/ec8v6wcjdpwgpplobi3w.svg" alt="" className='w-10 h-10 inline-block -mt-1' /></span> D-SecureErase
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
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">🎉 Try Enterprise FREE for 30 Days</h3>
                  <p className="mb-4">Test all Enterprise features on 1 device - No credit card required</p>
                  <Link to="/contact" className="bg-white text-green-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Start Free Trial
                  </Link>
                </div>

                {/* Core Erasure Capabilities Table */}
                <div className="mb-4">
                  <div
                    className="group cursor-pointer bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg"
                    onClick={() => toggleSection('capabilities')}
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                                  <ArrowDownIcon className="w-5 h-5 text-green-800" filled={filled} /> :
                                  <ArrowRightIcon className="w-5 h-5 text-green-800" filled={filled} />
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
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <DatabaseIcon className="w-6 h-6 text-white" filled={true} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">Reporting & Compliance</h3>
                            <p className="text-sm text-slate-600 mt-1">Audit trails, compliance regulatory documents, and detailed reporting</p>
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
                            ['Audit-Grade Regulatory Documents', false, true, true, true, true, true],
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
                        <span className="text-green-800">✅</span>
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
                <div className="bg-gradient-to-r from-brand to-brand/80 p-8 text-center text-white">
                  <h3 className="text-xl font-bold mb-4">Ready to Choose Your Service Plan?</h3>
                  <p className="mb-6 opacity-90">Contact our sales team for custom pricing and enterprise quotes</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact" className="bg-white text-brand px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
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
          <div className="container-app">
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
                  <Link to="/contact" className="bg-white text-green-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors">
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
        <section className="py-16 md:py-24">
          <div className="container-app">
            <Reveal>
              <div className="bg-gradient-to-r from-brand to-brand/80 rounded-2xl p-8 md:p-12 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Data?</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Join thousands of organizations who trust D-Secure for their data erasure needs.
                  Start with a free demo today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="/contact" className="bg-white text-brand px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors">
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


