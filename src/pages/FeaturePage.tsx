import Reveal from '@/components/Reveal'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import { 
  CheckIcon, 
  MobileIcon, 
  ServerIcon, 
  CloudIcon,
  ArrowRightIcon,
  HoverIcon,
  ShieldIcon,
  DatabaseIcon,
  GearIcon
} from '@/components/FlatIcons'

export default function FeaturePage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('features')} />
      
      <FeaturePageContent />
    </>
  );
}

function FeaturePageContent() {
  type FeatureType = 'device' | 'network' | 'cloud';
  const [activeFeature, setActiveFeature] = useState<FeatureType>('device')
  const [searchParams] = useSearchParams()

  // Handle URL parameters to auto-select features
  useEffect(() => {
    const urlType = searchParams.get('type')?.toLowerCase()
    if (urlType) {
      if (urlType === 'device' || urlType.includes('mobile') || urlType.includes('endpoint')) {
        setActiveFeature('device')
      } else if (urlType === 'server' || urlType.includes('network')) {
        setActiveFeature('network')
      } else if (urlType === 'cloud' || urlType.includes('azure') || urlType.includes('aws')) {
        setActiveFeature('cloud')
      }
    }
  }, [searchParams])

  const features = {
    device: {
      title: 'Device Security Features',
      subtitle: 'Comprehensive protection for all device types',
      description: 'Advanced security features for laptops, desktops, mobile devices, and storage media with enterprise-grade protection.',
      icon: (
        <HoverIcon>
          {(filled) => <MobileIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      features: [
        'Real-time threat detection',
        'Automated security policies',
        'Device inventory management',
        'Remote security monitoring',
        'Compliance tracking',
        'Encrypted data protection'
      ],
      specs: [
        { label: 'Supported Devices', value: '1000+ Models' },
        { label: 'Security Standards', value: 'ISO 27001, NIST' },
        { label: 'Response Time', value: 'Real-time alerts' },
        { label: 'Monitoring', value: '24/7 Protection' }
      ],
      link: '/services/device-erasure'
    },
    network: {
      title: 'Network Security Features',
      subtitle: 'Enterprise-grade network protection',
      description: 'Comprehensive network security features for enterprise infrastructure, data centers, and distributed systems.',
      icon: (
        <HoverIcon>
          {(filled) => <ServerIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      features: [
        'Network traffic analysis',
        'Intrusion detection system',
        'Firewall management',
        'VPN security monitoring',
        'Access control policies',
        'Network compliance auditing'
      ],
      specs: [
        { label: 'Network Types', value: 'LAN, WAN, Cloud' },
        { label: 'Monitoring', value: 'Real-time analytics' },
        { label: 'Scalability', value: 'Enterprise-grade' },
        { label: 'Integration', value: 'API-based' }
      ],
      link: '/services/network-erasure'
    },
    cloud: {
      title: 'Cloud Security Features',
      subtitle: 'Multi-cloud security and protection',
      description: 'Advanced cloud security features for hybrid and multi-cloud environments with comprehensive data protection.',
      icon: (
        <HoverIcon>
          {(filled) => <CloudIcon className="w-8 h-8" filled={filled} />}
        </HoverIcon>
      ),
      features: [
        'Multi-cloud visibility',
        'Data encryption management',
        'Cloud access security',
        'Compliance monitoring',
        'Automated backup protection',
        'Identity access management'
      ],
      specs: [
        { label: 'Cloud Platforms', value: 'AWS, Azure, GCP' },
        { label: 'Data Protection', value: 'End-to-end encryption' },
        { label: 'Compliance', value: 'SOC 2, GDPR' },
        { label: 'Monitoring', value: 'Continuous scanning' }
      ],
      link: '/services/cloud-erasure'
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 w-full overflow-hidden">
      {/* Hero Section */}
      <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
        <div className="container-responsive">
          <div className="text-center max-w-4xl mx-auto">
            <Reveal>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl xxl:text-7xl font-bold tracking-tight text-slate-900 leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight xxl:leading-tight mb-6">
                Comprehensive <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Security Features</span>
              </h1>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-relaxed xxl:leading-relaxed mb-8">
                Discover our advanced security features designed to protect your devices, networks, and cloud infrastructure. 
                Professional-grade solutions trusted by enterprises worldwide.
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

      {/* Feature Categories */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="container-responsive">
          <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-12 lg:mb-12 xl:mb-14 xxl:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl xxl:text-5xl font-bold text-slate-900 mb-3 xs:mb-4 sm:mb-4 md:mb-4 lg:mb-4 xl:mb-5 xxl:mb-6">Choose Your Security Focus</h2>
            <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 max-w-xl xs:max-w-2xl sm:max-w-2xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl xxl:max-w-5xl mx-auto">
              Select the security features that match your infrastructure and protection needs.
            </p>
          </div>

          {/* Feature Navigation */}
          <div className="flex items-center justify-center mb-8 xs:mb-10 sm:mb-12 md:mb-12 lg:mb-12 xl:mb-14 xxl:mb-16">
            <div className="flex flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row xxl:flex-row rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl xxl:rounded-xl bg-slate-100 p-1 w-full sm:w-auto max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl xxl:max-w-4xl">
              {Object.entries(features).map(([key, feature]) => (
                <button
                  key={key}
                  onClick={() => setActiveFeature(key as FeatureType)}
                  className={`flex items-center justify-center gap-2 xs:gap-3 sm:gap-3 md:gap-3 lg:gap-3 xl:gap-4 xxl:gap-4 px-3 xs:px-4 sm:px-4 md:px-4 lg:px-6 xl:px-6 xxl:px-8 py-2 xs:py-3 sm:py-3 md:py-3 lg:py-3 xl:py-4 xxl:py-4 rounded-md xs:rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-lg xl:rounded-lg xxl:rounded-lg text-xs xs:text-sm sm:text-sm md:text-sm lg:text-sm xl:text-base xxl:text-base font-medium transition-all duration-200 whitespace-nowrap flex-1 sm:flex-none ${
                    activeFeature === key
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="w-5 h-5 flex-shrink-0">{feature.icon}</span>
                  <span className="hidden sm:inline">{feature.title.split(' ')[0]}</span>
                  <span className="sm:hidden text-xs">{feature.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Feature Content */}
          <Reveal key={activeFeature}>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-6 md:p-8 lg:p-12">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl text-white mb-4 lg:mb-6">
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-lg text-emerald-600 font-medium mb-4">
                    {features[activeFeature].subtitle}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    {features[activeFeature].description}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-3 mb-8">
                    {features[activeFeature].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckIcon className="w-3 h-3 text-green-600" filled={true} />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to={features[activeFeature].link}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    Learn More
                    <ArrowRightIcon className="w-4 h-4" filled={true} />
                  </Link>
                </div>

                <div>
                  {/* Specifications */}
                  <div className="bg-slate-50 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <GearIcon className="w-5 h-5 text-emerald-600" filled={true} />
                      Technical Specifications
                    </h4>
                    <div className="space-y-3">
                      {features[activeFeature].specs.map((spec, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-b-0">
                          <span className="text-slate-600 font-medium">{spec.label}</span>
                          <span className="text-slate-900 font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <ShieldIcon className="w-5 h-5 text-emerald-600" filled={true} />
                      Key Benefits
                    </h4>
                    <ul className="space-y-2 text-slate-700">
                      <li>• Enhanced security posture</li>
                      <li>• Compliance ready solution</li>
                      <li>• 24/7 monitoring and support</li>
                      <li>• Scalable enterprise architecture</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <div className="container-responsive">
          <div className="text-center max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Enhance Your Security?
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-emerald-100 mb-8">
                Get started with our comprehensive security features today. 
                Contact our experts for a personalized demonstration.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Schedule Demo
                </Link>
                <Link to="/pricing" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
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