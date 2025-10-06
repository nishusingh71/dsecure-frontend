import Reveal from "@/components/Reveal";
import { Link } from 'react-router-dom';
import OptimizedImage from '@/components/OptimizedImage';
import { 
  LightningIcon, 
  ArrowRightIcon, 
  ShieldIcon,
  BuildingIcon,
  StarIcon,
  GearIcon,
  HoverIcon,
  ClipboardIcon,
  GlobeIcon,
  HeartIcon,
  CloudIcon,
  ServerIcon
} from '@/components/FlatIcons';
import Head from "next/head";
import { useEffect } from 'react';
// import { useHashNavigation } from '@/utils/scrollUtils';
export default function HomePage() {
  // const { navigateToHash } = useHashNavigation();

  useEffect(() => {
    // Handle hash navigation on page load
    const hash = window.location.hash;
    if (hash) {
      // navigateToHash(hash);
      // Simple scroll to section without custom hook
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []); // Remove navigateToHash dependency

  return (
    <>
     {/* --- SEO Head --- */}
    <Head>
      <link rel="canonical" href="https://dsecuretech.com/" />
      <title>DSecureTech Compliance | Data Erasure Standards & Regulations</title>
      <meta
        name="description"
        content="DSecureTech helps businesses meet global data sanitization standards like NIST, ISO 27001, GDPR, HIPAA, PCI DSS, and SOX with verifiable compliance solutions."
      />
      <meta
        name="keywords"
        content="data erasure compliance, NIST 800-88, ISO 27001, GDPR, HIPAA, SOX, PCI DSS, enterprise data destruction, B2B data security"
      />
      <meta name="robots" content="index, follow" />
    </Head>
      <section id="hero" className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-8 xs:py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-12 xl:gap-16 xxl:gap-20 items-center">
            {/* Content Section */}
            <div className="space-y-6 xs:space-y-7 sm:space-y-8 md:space-y-8 lg:space-y-8 xl:space-y-10 xxl:space-y-12 lg:pr-6 xl:pr-8 xxl:pr-12">
              <Reveal>
                <div className="space-y-6">
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl xxl:text-7xl font-bold tracking-tight text-slate-900 leading-tight xs:leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight xxl:leading-tight">
                    Secure Data Erasure for{' '}
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Modern Enterprises
                    </span>
                  </h1>
                  <p className="text-base xs:text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl xxl:text-2xl text-slate-600 leading-relaxed xs:leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed xl:leading-relaxed xxl:leading-relaxed">
                    DSecure helps organizations permanently erase data across devices
                    and clouds with certified workflows that meet global compliance
                    standards.
                  </p>
                </div>
              </Reveal>
              
              <Reveal delayMs={20}>
                <div className="flex flex-col xs:flex-col sm:flex-row md:flex-row lg:flex-row xl:flex-row xxl:flex-row items-start xs:items-start sm:items-center md:items-center lg:items-center xl:items-center xxl:items-center gap-3 xs:gap-4 sm:gap-4 md:gap-4 lg:gap-4 xl:gap-5 xxl:gap-6">
                  <Link
                    to="/services"
                    className="btn-primary w-full sm:w-auto text-center inline-flex items-center justify-center"
                  >
                    <HoverIcon>
                      {(filled) => <LightningIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    Explore Services
                  </Link>
                  <Link
                    to="/solutions"
                    className="btn-secondary w-full sm:w-auto text-center inline-flex items-center justify-center"
                  >
                    <HoverIcon>
                      {(filled) => <ArrowRightIcon className="w-5 h-5 mr-2" filled={filled} />}
                    </HoverIcon>
                    See Solutions
                  </Link>
                </div>
              </Reveal>

              <Reveal delayMs={30}>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>ISO 27001</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>NIST 800-88</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>GDPR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>SOC 2</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Hero Image Section */}
            <div className="relative lg:order-last">
              <Reveal delayMs={40}>
                <div className="relative">
                  {/* Main Hero Image */}
                  <div className="aspect-[16/10] xs:aspect-[16/10] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[4/3] xxl:aspect-[4/3] bg-white rounded-xl xs:rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-2xl xl:rounded-2xl xxl:rounded-3xl shadow-lg xs:shadow-xl sm:shadow-2xl md:shadow-2xl lg:shadow-2xl xl:shadow-2xl xxl:shadow-2xl border border-slate-200/60 overflow-hidden relative">
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Secure Data Center with Advanced Security Systems"
                      className="w-full h-full object-cover"
                      width={2070}
                      height={1380}
                      priority={true}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-emerald-900/30">
                      {/* Status Indicator */}
                      <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm text-slate-700 font-medium">
                          Secure Erasure Active
                        </span>
                      </div>
                      
                      {/* Security Badge */}
                      <div className="absolute top-6 right-6 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                        256-bit Encryption
                      </div>
                    </div>
                  </div>

                  {/* Floating Security Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-xl shadow-lg border border-slate-200/60 flex items-center justify-center">
                    <HoverIcon>
                      {(filled) => <ShieldIcon className="w-8 h-8 text-emerald-600" filled={filled} />}
                    </HoverIcon>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-xl shadow-lg border border-slate-200/60 flex items-center justify-center">
                    <HoverIcon>
                      {(filled) => <LightningIcon className="w-6 h-6 text-blue-600" filled={filled} />}
                    </HoverIcon>
                  </div>

                  {/* Additional Security Images Grid */}
                  <div className="absolute -z-10 -right-8 top-1/2 transform -translate-y-1/2 grid grid-cols-1 gap-4 opacity-20">
                    <div className="w-24 h-24 bg-white rounded-lg shadow-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        alt="Network Security"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-24 h-24 bg-white rounded-lg shadow-lg overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                        alt="Data Protection"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="container-app">
          <div className="text-center mb-12 lg:mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Upcoming Features
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Exciting new capabilities coming soon to enhance your data
                security experience
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-6 lg:gap-8 xl:gap-8 xxl:gap-10">
            <Reveal delayMs={10}>
              <div className="card hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 h-full flex flex-col group relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 will-change-transform shadow-lg">
                    <HoverIcon>
                      {(filled) => <CloudIcon className="w-8 h-8 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      Private Cloud Integration
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Seamlessly integrate with your private cloud infrastructure for enhanced data control, security, and compliance while maintaining complete organizational oversight.
                    </p>
                  </div>
                  {/* <div className="mt-auto pt-4 border-t border-slate-100">
                    <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                      Coming Q2 2025
                    </span>
                  </div> */}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={20}>
              <div className="card hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 h-full flex flex-col group relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 will-change-transform shadow-lg">
                    <HoverIcon>
                      {(filled) => <ServerIcon className="w-8 h-8 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                      Blockchain Verification
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Immutable proof of data destruction using distributed ledger
                      technology for ultimate verification integrity and tamper-proof audit trails.
                    </p>
                  </div>
                  {/* <div className="mt-auto pt-4 border-t border-slate-100">
                    <span className="text-sm text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full">
                      Coming Q3 2025
                    </span>
                  </div> */}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={30}>
              <div className="card hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 h-full flex flex-col group relative overflow-hidden md:col-span-2 lg:col-span-1">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 will-change-transform shadow-lg">
                    <HoverIcon>
                      {(filled) => <ShieldIcon className="w-8 h-8 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                      Zero-Trust Architecture
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      Enhanced security framework with continuous verification and
                      least privilege access controls for maximum protection.
                    </p>
                  </div>
                  {/* <div className="mt-auto pt-4 border-t border-slate-100">
                    <span className="text-sm text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                      Coming Q4 2025
                    </span>
                  </div> */}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="why-choose" className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="container-app">
          <div className="text-center mb-12 lg:mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Why Choose DSecure?
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Leading organizations trust DSecure for comprehensive data erasure
                solutions that ensure security, compliance, and peace of mind.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {[
              {
                title: "Military-Grade Security",
                description:
                  "DOD 5220.22-M and NIST 800-88 compliant erasure methods ensure your data is permanently destroyed.",
                icon: (
                  <HoverIcon>
                    {(filled) => <ShieldIcon className="w-8 h-8 text-white" filled={filled} />}
                  </HoverIcon>
                ),
                bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
              },
              {
                title: "Enterprise Scale",
                description:
                  "Handle thousands of devices simultaneously with our powerful orchestration and automation tools.",
                icon: (
                  <HoverIcon>
                    {(filled) => <BuildingIcon className="w-8 h-8 text-white" filled={filled} />}
                  </HoverIcon>
                ),
                bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
              },
              {
                title: "Complete Audit Trail",
                description:
                  "Tamper-proof certificates and comprehensive reporting for regulatory compliance and audits.",
                icon: (
                  <HoverIcon>
                    {(filled) => <ClipboardIcon className="w-8 h-8 text-white" filled={filled} />}
                  </HoverIcon>
                ),
                bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
              },
              {
                title: "Global Compliance",
                description:
                  "Meet GDPR, HIPAA, SOX, and other international data protection standards with certified workflows.",
                icon: (
                  <HoverIcon>
                    {(filled) => <GlobeIcon className="w-8 h-8 text-white" filled={filled} />}
                  </HoverIcon>
                ),
                bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
              },
              {
                title: "Zero Downtime",
                description:
                  "Perform secure erasure operations without disrupting your business operations or workflows.",
                icon: (
                  <HoverIcon>
                    {(filled) => <LightningIcon className="w-8 h-8 text-white" filled={filled} />}
                  </HoverIcon>
                ),
                bgColor: "bg-gradient-to-br from-teal-500 to-teal-600",
              },
              {
                title: "24/7 Expert Support",
                description:
                  "Get immediate assistance from our certified data security experts whenever you need it.",
                icon: (
                  <HoverIcon>
                    {(filled) => <HeartIcon className="w-8 h-8 text-white" filled={filled} />}
                  </HoverIcon>
                ),
                bgColor: "bg-gradient-to-br from-rose-500 to-rose-600",
              },
            ].map((feature, i) => (
              <Reveal key={feature.title} delayMs={i * 100}>
                <div className="group card hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-out h-full flex flex-col relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    feature.bgColor.includes('blue') ? 'from-blue-50 to-transparent' :
                    feature.bgColor.includes('emerald') ? 'from-emerald-50 to-transparent' :
                    feature.bgColor.includes('purple') ? 'from-purple-50 to-transparent' :
                    feature.bgColor.includes('orange') ? 'from-orange-50 to-transparent' :
                    feature.bgColor.includes('teal') ? 'from-teal-50 to-transparent' :
                    'from-rose-50 to-transparent'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200 will-change-transform`}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand transition-colors duration-200">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Stats Section */}
          <Reveal delayMs={60}>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 sm:p-8 lg:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-blue-50/50 opacity-60"></div>
              
              <div className="relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
                  <Reveal delayMs={20}>
                    <div className="group">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                        500K+
                      </div>
                      <div className="text-slate-600 text-sm sm:text-base font-medium">
                        Devices Secured
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={30}>
                    <div className="group">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                        100%
                      </div>
                      <div className="text-slate-600 text-sm sm:text-base font-medium">
                        Success Rate
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={40}>
                    <div className="group">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                        256-bit
                      </div>
                      <div className="text-slate-600 text-sm sm:text-base font-medium">
                        SSL Encryption
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delayMs={50}>
                    <div className="group">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-orange-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                        24/7
                      </div>
                      <div className="text-slate-600 text-sm sm:text-base font-medium">
                        Expert Support
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enterprise Trial Promotion Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
        
        <div className="container-app relative z-10">
          <Reveal>
            <div className="text-center text-white max-w-4xl mx-auto">
              <div className="text-4xl md:text-6xl mb-6 animate-bounce">🎉</div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Try Enterprise FREE for 14 Days
              </h2>
              <p className="text-xl md:text-2xl mb-2 opacity-90">
                Test all Enterprise features on 1 device
              </p>
              <p className="text-lg mb-8 opacity-80">
                No credit card required • No purchase needed • Full feature access
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  to="/contact"
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 inline-flex items-center justify-center"
                >
                  🚀 Start Free Enterprise Trial
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm inline-flex items-center justify-center"
                >
                  📞 Contact Sales Team
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Reveal delayMs={10}>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                    <div className="text-2xl mb-3">🛡️</div>
                    <h3 className="font-semibold mb-2">Full Enterprise Features</h3>
                    <p className="text-sm opacity-80">
                      Access all advanced capabilities including volume erasure, custom installers, and private cloud support
                    </p>
                  </div>
                </Reveal>
                <Reveal delayMs={20}>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                    <div className="text-2xl mb-3">⚡</div>
                    <h3 className="font-semibold mb-2">Instant Activation</h3>
                    <p className="text-sm opacity-80">
                      Get started immediately with enterprise-grade data erasure on your test device
                    </p>
                  </div>
                </Reveal>
                <Reveal delayMs={30}>
                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                    <div className="text-2xl mb-3">🎯</div>
                    <h3 className="font-semibold mb-2">Risk-Free Testing</h3>
                    <p className="text-sm opacity-80">
                      Evaluate enterprise capabilities with no commitment or payment information required
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section id="industries" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Trusted by{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                  50+ Industries
                </span>
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                From healthcare to finance, government to enterprise - our specialized workflows 
                ensure compliance and security across every sector.
              </p>
            </Reveal>
          </div>

          {/* Industry Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Reveal delayMs={200}>
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => <HeartIcon className="w-6 h-6 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Healthcare
                    </h3>
                    <p className="text-sm text-slate-500">HIPAA Compliance</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  HIPAA-compliant data destruction with PHI-specific sanitization protocols for medical devices and EMR systems.
                </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Medical Devices</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">PHI Protection</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={250}>
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Financial Services
                    </h3>
                    <p className="text-sm text-slate-500">SOX & PCI DSS</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  Banking-grade security with SOX and PCI DSS compliance for trading systems and customer data protection.
                </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Trading Systems</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Customer Data</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-purple-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => <GlobeIcon className="w-6 h-6 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Government
                    </h3>
                    <p className="text-sm text-slate-500">Military-Grade</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  NIST 800-88, DoD 3/7 pass compliance with Common Criteria Certified security for federal agencies.
                </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">DoD Standards</span>
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">Federal Agencies</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={350}>
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => <BuildingIcon className="w-6 h-6 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Enterprise
                    </h3>
                    <p className="text-sm text-slate-500">Cloud Migration</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  Comprehensive data center erasure supporting cloud migrations and endpoint device management at scale.
                </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">Data Centers</span>
                    <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">Cloud Migration</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={400}>
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-orange-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => <GearIcon className="w-6 h-6 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      ITAD Services
                    </h3>
                    <p className="text-sm text-slate-500">Asset Disposition</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  Complete asset disposition workflows with automated processing for resale, recycling, and compliance.
                </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">Asset Recovery</span>
                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">Multi-Client</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={450}>
              <div className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:border-teal-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Service Providers
                    </h3>
                    <p className="text-sm text-slate-500">White-Label</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-4">
                  White-label branding with multi-tenant client management and revenue sharing programs for MSPs.
                </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">MSP Solutions</span>
                    <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">Revenue Share</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={500}>
            <div className="text-center mt-12">
              <Link
                to="/solutions"
                className="btn-primary inline-flex items-center justify-center"
              >
                <span>Explore All Industry Solutions</span>
                <HoverIcon>
                  {(filled) => <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />}
                </HoverIcon>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Overview Section */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Complete{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Data Erasure Suite
                </span>
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Military-grade data sanitization across all platforms - from individual devices 
                to enterprise networks and cloud infrastructure.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Device Erasure */}
            <Reveal delayMs={200}>
              <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200/60 hover:border-blue-300 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                <div className="absolute top-6 right-6">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Device Erasure</h3>
                  <p className="text-slate-600 mb-6">
                    Secure data wiping for 1000+ device types including laptops, desktops, mobile devices, and storage media.
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700">DOD 5220.22-M & NIST 800-88 Certified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700">Up to 100 devices/hour processing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700">Tamper-proof certificates</span>
                  </div>
                </div>
                <Link 
                  to="/services?type=device" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group"
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>

            {/* Network Erasure */}
            <Reveal delayMs={250}>
              <div className="group relative bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-8 border border-emerald-200/60 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                <div className="absolute top-6 right-6">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => <ServerIcon className="w-8 h-8 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Network Erasure</h3>
                  <p className="text-slate-600 mb-6">
                    Enterprise-grade sanitization for servers, storage arrays, and data center infrastructure.
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700">Up to 500 servers concurrently</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700">SAN, NAS, RAID support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700">Remote access via HTTPS, SSH, IPMI</span>
                  </div>
                </div>
                <Link 
                  to="/services?type=server" 
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group"
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>

            {/* Cloud Erasure */}
            <Reveal delayMs={300}>
              <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-8 border border-purple-200/60 hover:border-purple-300 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
                <div className="absolute top-6 right-6">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <HoverIcon>
                      {(filled) => <CloudIcon className="w-8 h-8 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Cloud Erasure</h3>
                  <p className="text-slate-600 mb-6">
                    Secure cloud storage and SaaS data removal for hybrid cloud environments.
                  </p>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700">Multi-cloud platform support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700">SaaS application data removal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-slate-700">Hybrid cloud environments</span>
                  </div>
                </div>
                <Link 
                  to="/services?type=cloud" 
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium group"
                >
                  <span>Learn More</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={400}>
            <div className="text-center mt-12">
              <Link
                to="/services"
                className="btn-primary inline-flex items-center justify-center"
              >
                <span>View All Services</span>
                <HoverIcon>
                  {(filled) => <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />}
                </HoverIcon>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Compliance Standards Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30">
        <div className="container-app">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Global{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">
                  Compliance Standards
                </span>
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Certified and compliant with major international standards and regulations. 
                Meet the most stringent regulatory requirements with verifiable, repeatable erasure protocols.
              </p>
            </Reveal>
          </div>

          {/* Standards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-12">
            <Reveal delayMs={200}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🇺🇸</div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">NIST 800-88</h3>
                  <p className="text-xs text-slate-500">Media Sanitization</p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={250}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🇪🇺</div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">GDPR</h3>
                  <p className="text-xs text-slate-500">Data Protection</p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-blue-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🏥</div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">HIPAA</h3>
                  <p className="text-xs text-slate-500">Healthcare Privacy</p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={350}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-purple-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">📊</div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">SOX</h3>
                  <p className="text-xs text-slate-500">Financial Controls</p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={400}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🌐</div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">ISO 27001</h3>
                  <p className="text-xs text-slate-500">Security Management</p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={450}>
              <div className="group bg-white rounded-xl p-4 lg:p-6 shadow-lg border border-slate-200/60 hover:border-red-300 hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">💳</div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">PCI DSS</h3>
                  <p className="text-xs text-slate-500">Payment Security</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Certifications Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            <Reveal delayMs={500}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 text-center group hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">🛡️</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">Common Criteria</h3>
                  <p className="text-sm text-emerald-600 font-medium mb-2">EAL 4+</p>
                  <p className="text-xs text-slate-500">International security certification</p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={550}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 text-center group hover:shadow-xl transition-all duration-300 hover:border-blue-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">🔐</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">FIPS 140-2</h3>
                  <p className="text-sm text-blue-600 font-medium mb-2">Level 3</p>
                  <p className="text-xs text-slate-500">Cryptographic module validation</p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={600}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 text-center group hover:shadow-xl transition-all duration-300 hover:border-purple-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">🏛️</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-purple-600 transition-colors">NSA/CSS</h3>
                  <p className="text-sm text-purple-600 font-medium mb-2">Approved</p>
                  <p className="text-xs text-slate-500">Evaluated Products List</p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={650}>
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200/60 text-center group hover:shadow-xl transition-all duration-300 hover:border-yellow-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">⭐</div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-yellow-600 transition-colors">CSA STAR</h3>
                  <p className="text-sm text-yellow-600 font-medium mb-2">Gold</p>
                  <p className="text-xs text-slate-500">Cloud Security Alliance</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Key Features */}
          <Reveal delayMs={700}>
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-slate-200/60">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HoverIcon>
                      {(filled) => <ShieldIcon className="w-8 h-8 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Verifiable Erasure</h3>
                  <p className="text-slate-600 text-sm">Tamper-proof certificates with digital signatures and cryptographic verification</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HoverIcon>
                      {(filled) => <ClipboardIcon className="w-8 h-8 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Audit-Ready Reports</h3>
                  <p className="text-slate-600 text-sm">Comprehensive documentation for compliance audits and regulatory requirements</p>
                </div>

                <div className="text-center md:col-span-2 lg:col-span-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <HoverIcon>
                      {(filled) => <GlobeIcon className="w-8 h-8 text-white" filled={filled} />}
                    </HoverIcon>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Global Standards</h3>
                  <p className="text-slate-600 text-sm">Compliance with international frameworks across 50+ countries and jurisdictions</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={750}>
            <div className="text-center mt-12">
              <Link
                to="/compliance"
                className="btn-primary inline-flex items-center justify-center"
              >
                <span>Explore Compliance Standards</span>
                <HoverIcon>
                  {(filled) => <ArrowRightIcon className="w-5 h-5 ml-2" filled={filled} />}
                </HoverIcon>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Key Statistics Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20"></div>
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-app relative z-10">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Trusted by Organizations{' '}
                <span className="text-yellow-300">Worldwide</span>
              </h2>
            </Reveal>
            <Reveal delayMs={100}>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                DSecure has become the global standard for secure data erasure, 
                protecting millions of devices and serving the world's most security-conscious organizations.
              </p>
            </Reveal>
          </div>

          {/* Main Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
            <Reveal delayMs={200}>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">
                  50+
                </div>
                <div className="text-lg md:text-xl font-semibold text-yellow-300 mb-2">
                  Industries Served
                </div>
                <div className="text-sm text-white/80">
                  Healthcare, Finance, Government, Enterprise
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={250}>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">
                  1000+
                </div>
                <div className="text-lg md:text-xl font-semibold text-yellow-300 mb-2">
                  Device Types
                </div>
                <div className="text-sm text-white/80">
                  Laptops, Servers, Mobile, Storage
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">
                  99.9%
                </div>
                <div className="text-lg md:text-xl font-semibold text-yellow-300 mb-2">
                  Success Rate
                </div>
                <div className="text-sm text-white/80">
                  Verified tamper-proof erasure
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={350}>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300">
                  5M+
                </div>
                <div className="text-lg md:text-xl font-semibold text-yellow-300 mb-2">
                  Devices Processed
                </div>
                <div className="text-sm text-white/80">
                  Across global enterprise networks
                </div>
              </div>
            </Reveal>
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Reveal delayMs={400}>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Military-Grade Security</h3>
                </div>
                <p className="text-white/90">
                  DOD 5220.22-M and NIST 800-88 certified erasure methods with Common Criteria EAL 4+ validation.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={450}>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Enterprise Scale</h3>
                </div>
                <p className="text-white/90">
                  Process up to 500 servers and 100 devices per hour with automated workflows and centralized management.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={500}>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Global Compliance</h3>
                </div>
                <p className="text-white/90">
                  Meet GDPR, HIPAA, SOX, and 20+ other international standards with automated compliance reporting.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Subscription Plans
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose the perfect plan for your data erasure needs, from
              individual users to enterprise solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            <div className="relative card hover:border-brand/30 transition-all duration-200 hover:shadow-lg transform will-change-transform">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Lifetime Demo
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Local Erasure max 1 file at 1MB
                </p>
                <div className="mb-6">
                  <span className="text-3xl lg:text-4xl font-bold text-slate-900">
                    Free
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">
                    Local file erasure up to 1MB
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">
                    No access to cloud services
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">No reports generation</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">Max 1 file per session</span>
                </li>
              </ul>

              <a
                href="/pricing"
                className="w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 bg-green-600 hover:bg-green-700 text-white text-center block"
              >
                Download Free
              </a>
            </div>

            <div className="relative card hover:border-brand/30 transition-all duration-200 hover:shadow-lg transform will-change-transform">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Basic</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Local Erasure, No Reports, Limited Cloud
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">$39</span>
                  <span className="text-slate-500 ml-1">/year/per machine</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">
                    Local file erasure up to 1MB
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">
                    Cloud storage: 3 files per session (max 1MB each)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">No reports generation</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">
                    Extend validity or license count available
                  </span>
                </li>
              </ul>

              <a
                href="/pricing"
                className="w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 btn-primary text-center block"
              >
                Customize Plan
              </a>
            </div>

            <div className="relative card hover:border-brand/30 transition-all duration-200 hover:shadow-lg ring-2 ring-brand shadow-lg transform will-change-transform">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-brand text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Standard
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Local Erasure + Reports, Limited Cloud
                </p>
                <div className="mb-6">
                  <span className="text-3xl lg:text-4xl font-bold text-slate-900">
                    $89
                  </span>
                  <span className="text-slate-500 ml-1 text-sm lg:text-base">
                    /year/per machine
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">Local file erasure</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">
                    Detailed reports generation
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">
                    Cloud storage: 3 files per session (max 1MB each)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-600">
                    Extend validity or license count available
                  </span>
                </li>
              </ul>

              <a
                href="/pricing"
                className="w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 btn-primary text-center block"
              >
                Customize Plan
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">See all plans and features</p>
            <Link to="/pricing" className="btn-secondary">
              View All Plans
            </Link>
          </div>
        </div>
      </section> */}

      {/* <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Enterprise Pricing
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Transparent enterprise pricing with volume discounts. Scale from
                50 to 5,000+ devices with significant per-device savings.
              </p>
            </Reveal>
          </div>

          <Reveal delayMs={20}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    Base Plan
                  </h3>
                  <p className="text-sm text-slate-600">Essential features</p>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-brand">$360</div>
                  <div className="text-sm text-slate-600">per device/year</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Min 50 devices
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 text-center mb-4">
                  <div className="text-sm font-medium text-slate-900">
                    Total Investment
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    $18,000
                  </div>
                </div>
                <a
                  href="/contact"
                  className="btn-primary w-full text-center block"
                >
                  Contact Sales Team
                </a>
              </div>
              <div className="bg-white rounded-xl p-6 border-2 border-brand relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-brand text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    Cloud Plan
                  </h3>
                  <p className="text-sm text-slate-600">Cloud integration</p>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-brand">$288</div>
                  <div className="text-sm text-slate-600">per device/year</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Min 250 devices
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center mb-4">
                  <div className="text-sm font-medium text-slate-900">
                    Total Investment
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    $72,000
                  </div>
                </div>
                <a
                  href="/contact"
                  className="btn-primary w-full text-center block"
                >
                  Contact Sales Team
                </a>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border-2 border-purple-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                    Best Value
                  </span>
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    Enterprise Plan
                  </h3>
                  <p className="text-sm text-slate-600">
                    Full enterprise suite
                  </p>
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-brand">$96</div>
                  <div className="text-sm text-slate-600">per device/year</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Min 5,000 devices
                  </div>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 text-center mb-4">
                  <div className="text-sm font-medium text-slate-900">
                    Total Investment
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    $480,000
                  </div>
                </div>
                <a
                  href="/contact"
                  className="bg-purple-500 hover:bg-purple-600 text-white w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 text-center block"
                >
                  Contact Sales Team
                </a>
              </div>
            </div>
            <div className="text-center mt-12">
              <p className="text-slate-600 mb-4">See all plans and features</p>
              <a href="/pricing" className="btn-secondary">
                View All Plans
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={40}>
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                <div>
                  <div className="font-semibold text-slate-900">Base</div>
                  <div className="text-sm text-slate-600">$360</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Standard</div>
                  <div className="text-sm text-slate-600">$168</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Cloud</div>
                  <div className="text-sm text-slate-600">$288</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Network</div>
                  <div className="text-sm text-slate-600">$216</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Pro</div>
                  <div className="text-sm text-slate-600">$180</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Enterprise</div>
                  <div className="text-sm text-slate-600">$96</div>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-slate-600 mb-4">All plans include volume discounts and annual billing</p>
                <Link to="/services" className="btn-primary mr-3">View Detailed Pricing</Link>
                <Link to="/contact" className="btn-secondary">Schedule Consultation</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section> */}

      {/* <section className="py-16 md:py-24">
        <div className="container-app">
          <h2 className="text-2xl font-semibold text-slate-900">What customers say</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <Reveal key={i} delayMs={i*80}>
                <div className="card">
                  <p className="text-slate-700">“DSecure streamlined our end‑of‑life processes and gave us the audit trail we needed.”</p>
                  <div className="mt-4 text-sm text-slate-500">IT Director, Global Enterprise</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}
      {/* Testimonials Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-slate-50/50">
        <div className="container-app">
          <div className="text-center mb-12 lg:mb-16">
            <Reveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Trusted by Clients
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                See what our customers say about our data erasure solutions
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Testimonial 1 */}
            <Reveal delayMs={10}>
              <div className="card hover:shadow-lg transition-transform duration-200 ease-out hover:-translate-y-1 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Marcus Schmidt"
                      className="w-full h-full rounded-full object-cover"
                      // loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      Marcus Schmidt
                    </h4>
                    <p className="text-blue-600 text-sm font-medium">
                      Enterprise Client
                    </p>
                  </div>
                </div>
                <blockquote className="text-slate-600 italic leading-relaxed flex-1">
                  "We needed a reliable data erasure solution for our startup. DSecure exceeded our expectations with its intuitive interface and comprehensive security features."
                </blockquote>
                {/* <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div> */}
              </div>
            </Reveal>

            {/* Testimonial 2 */}
            <Reveal delayMs={20}>
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 transform will-change-transform">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80"
                  alt="Elena Rodriguez"
                  className="w-full h-full rounded-full object-cover"
                />
                </div>
                <div>
                <h4 className="font-semibold text-slate-900 text-lg">
                  Elena Rodriguez
                </h4>
                <p className="text-blue-600 text-sm font-medium">
                  Client
                </p>
                </div>
              </div>

              <blockquote className="text-slate-600 italic leading-relaxed">
                "As an early adopter, I'm impressed by DSecure's innovative approach to data security. The team is responsive and the product keeps improving."
              </blockquote>
              </div>
            </Reveal>

            {/* Testimonial 3 */}
            <Reveal delayMs={30}>
              <div className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 transform will-change-transform">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                  alt="James Thompson"
                  className="w-full h-full rounded-full object-cover"
                />
                </div>
                <div>
                <h4 className="font-semibold text-slate-900 text-lg">
                  James Thompson
                </h4>
                <p className="text-blue-600 text-sm font-medium">
                  Client
                </p>
                </div>
              </div>

              <blockquote className="text-slate-600 italic leading-relaxed">
                "DSecure's fresh take on data erasure is exactly what the market needs. Simple, secure, and built with modern compliance standards in mind."
              </blockquote>
              </div>
            </Reveal>
            </div>

          {/* Trust indicators */}
          {/* <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium text-slate-500">
                Trusted by 500+ Companies
              </div>
              <div className="w-px h-6 bg-slate-300"></div>
              <div className="text-sm font-medium text-slate-500">
                99.9% Customer Satisfaction
              </div>
              <div className="w-px h-6 bg-slate-300"></div>
              <div className="text-sm font-medium text-slate-500">
                ISO 27001 Certified
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
