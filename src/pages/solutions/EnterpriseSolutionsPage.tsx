import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  CheckIcon, 
  BuildingIcon, 
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  ArrowRightIcon,
  HoverIcon,
  BriefcaseIcon,
  DollarIcon
} from '@/components/FlatIcons'

export default function EnterpriseSolutionsPage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/solutions/enterprise" />
        <title>
          Enterprise Data Security Solutions | Complete IT Asset Lifecycle Management
        </title>
        <meta
          name="description"
          content="Complete enterprise data security solutions for IT asset lifecycle management, cloud migrations, and data center operations. Compliant secure data erasure at scale."
        />
        <meta
          name="keywords"
          content="enterprise data security, IT asset management, cloud migration, data center security, enterprise data erasure, GDPR compliance"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <EnterpriseSolutionsContent />
    </>
  );
}

function EnterpriseSolutionsContent() {
  const solutions = [
    {
      title: 'Cloud Migration Security',
      description: 'Secure data handling during cloud infrastructure transitions with comprehensive erasure protocols',
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />,
      features: [
        'Pre-migration data classification and mapping',
        'Secure data transfer protocols',
        'Post-migration source system sanitization',
        'Compliance audit trail generation'
      ]
    },
    {
      title: 'Data Center Operations',
      description: 'Meticulous erasure from servers, loose drives, and storage networks with zero downtime',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />,
      features: [
        'Server and storage array sanitization',
        'RAID configuration handling',
        'Network-attached storage erasure',
        'Scheduled maintenance window operations'
      ]
    },
    {
      title: 'Endpoint Device Management',
      description: 'Complete data removal from desktops, laptops, mobile devices, and removable media',
      icon: <GearIcon className="w-6 h-6" filled={true} />,
      features: [
        'Automated device discovery and cataloging',
        'Remote erasure capabilities',
        'Mobile device management integration',
        'Asset tracking and reporting'
      ]
    }
  ]

  const integrations = [
    {
      platform: 'ServiceNow',
      description: 'Native integration with ServiceNow IT Service Management',
      capabilities: ['Asset lifecycle automation', 'Workflow integration', 'Compliance reporting']
    },
    {
      platform: 'Microsoft SCCM',
      description: 'Seamless integration with System Center Configuration Manager',
      capabilities: ['Centralized deployment', 'Policy management', 'Inventory synchronization']
    },
    {
      platform: 'Lansweeper',
      description: 'Asset discovery and management platform integration',
      capabilities: ['Automated asset discovery', 'Hardware inventory', 'Software compliance']
    }
  ]

  const complianceStandards = [
    { name: 'GDPR', description: 'European General Data Protection Regulation compliance' },
    { name: 'SOX', description: 'Sarbanes-Oxley Act financial data protection' },
    { name: 'ISO 27001', description: 'Information security management standards' },
    { name: 'NIST 800-88', description: 'US National Institute of Standards guidelines' }
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
                    <BuildingIcon className="w-8 h-8" filled={true} />
                  </div>
                </Reveal>
                <Reveal delayMs={10}>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    Enterprise Data Security Solutions
                  </h1>
                </Reveal>
                <Reveal delayMs={20}>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Complete IT asset lifecycle management with Compliant secure data erasure. 
                    Streamline cloud migrations, data center operations, and endpoint management 
                    while maintaining enterprise-grade security and compliance.
                  </p>
                </Reveal>
                <Reveal delayMs={30}>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Link to="/contact" className="btn-primary">
                      Get Enterprise Demo
                    </Link>
                    <Link to="/pricing" className="btn-secondary">
                      View Enterprise Pricing
                    </Link>
                  </div>
                </Reveal>
              </div>
              
              <div>
                <Reveal delayMs={40}>
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Enterprise Benefits</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Software-based data sanitization for sustainable reuse</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Tamper-proof audit trails with digital signatures</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">ServiceNow and ITSM platform integration</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Reduced e-waste and increased ROI</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Solutions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Comprehensive Enterprise Solutions
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                End-to-end data security solutions designed for enterprise scale and complexity.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-6 border border-slate-200 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
                      {solution.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{solution.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-6">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                        <span className="text-sm text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Integrations */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Enterprise Platform Integrations
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Seamless integration with your existing enterprise infrastructure and management platforms.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{integration.platform}</h3>
                  <p className="text-slate-600 mb-4">{integration.description}</p>
                  <ul className="space-y-2">
                    {integration.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                        <span className="text-sm text-slate-700">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Enterprise Compliance Standards
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Meet the most stringent enterprise and regulatory compliance requirements.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceStandards.map((standard, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 text-center border border-slate-200">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold text-lg mx-auto mb-4">
                    {standard.name.substring(0, 2)}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{standard.name}</h3>
                  <p className="text-sm text-slate-600">{standard.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="bg-gradient-to-r from-brand to-brand/90 rounded-3xl p-8 md:p-12 text-center text-white">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Secure Your Enterprise?
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Get a personalized demo of our enterprise solutions and see how we can streamline 
                your IT asset lifecycle while maintaining the highest security standards.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-brand px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Schedule Enterprise Demo
                </Link>
                <Link to="/solutions" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  View All Solutions
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
