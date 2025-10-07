import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  CheckIcon, 
  DollarIcon, 
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  ArrowRightIcon,
  HoverIcon,
  BriefcaseIcon
} from '@/components/FlatIcons'

export default function FinancialSolutionsPage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/solutions/financial" />
        <title>
          Financial Services Data Security | Banking & Finance Compliance Solutions
        </title>
        <meta
          name="description"
          content="Ultra-secure data sanitization for financial institutions. PCI DSS, SOX, and Basel III compliant solutions for banking, insurance, and financial services."
        />
        <meta
          name="keywords"
          content="financial data security, banking compliance, PCI DSS, SOX compliance, financial data erasure, Basel III, GLBA compliance"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <FinancialSolutionsContent />
    </>
  );
}

function FinancialSolutionsContent() {
  const financialSolutions = [
    {
      title: 'Banking System Security',
      description: 'Comprehensive data protection for core banking systems and financial databases',
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />,
      features: [
        'Core banking system sanitization',
        'Transaction database erasure',
        'ATM and branch system security',
        'Payment processing protection'
      ]
    },
    {
      title: 'Customer Data Protection',
      description: 'Advanced PII and financial data sanitization with regulatory compliance',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />,
      features: [
        'Customer PII identification and removal',
        'Credit card data sanitization',
        'Account information protection',
        'Transaction history erasure'
      ]
    },
    {
      title: 'Trading & Investment Security',
      description: 'Specialized protection for trading platforms and investment management systems',
      icon: <GearIcon className="w-6 h-6" filled={true} />,
      features: [
        'Trading platform sanitization',
        'Portfolio management security',
        'Market data system erasure',
        'Investment research protection'
      ]
    }
  ]

  const complianceFrameworks = [
    {
      framework: 'PCI DSS',
      description: 'Payment Card Industry Data Security Standard',
      requirements: [
        'Cardholder data environment security',
        'Data retention and disposal policies',
        'Access control implementation',
        'Regular security testing'
      ]
    },
    {
      framework: 'SOX',
      description: 'Sarbanes-Oxley Act Financial Compliance',
      requirements: [
        'Financial data integrity',
        'Internal control documentation',
        'Audit trail maintenance',
        'Data retention compliance'
      ]
    },
    {
      framework: 'GLBA',
      description: 'Gramm-Leach-Bliley Act Privacy Protection',
      requirements: [
        'Customer information security',
        'Privacy notice requirements',
        'Safeguards implementation',
        'Third-party risk management'
      ]
    }
  ]

  const financialInstitutions = [
    {
      type: 'Retail Banking',
      services: ['Branch operations', 'Online banking', 'Mobile banking', 'ATM networks'],
      challenges: ['Customer data protection', 'Transaction security', 'Regulatory compliance', 'Fraud prevention']
    },
    {
      type: 'Investment Banking',
      services: ['Trading platforms', 'Portfolio management', 'Research systems', 'Risk management'],
      challenges: ['Market data security', 'Client confidentiality', 'Regulatory reporting', 'Insider trading prevention']
    },
    {
      type: 'Insurance Companies',
      services: ['Policy management', 'Claims processing', 'Underwriting systems', 'Customer portals'],
      challenges: ['Policyholder data protection', 'Claims confidentiality', 'Regulatory compliance', 'Fraud detection']
    },
    {
      type: 'Credit Unions',
      services: ['Member services', 'Loan processing', 'Payment systems', 'Member portals'],
      challenges: ['Member data security', 'Payment card protection', 'Regulatory compliance', 'Shared branching security']
    }
  ]

  const securityFeatures = [
    {
      feature: 'Multi-Layer Encryption',
      description: 'Advanced encryption protocols for financial data at rest and in transit',
      benefits: ['AES-256 encryption', 'Hardware security modules', 'Key management', 'Cryptographic validation']
    },
    {
      feature: 'Audit Trail Generation',
      description: 'Comprehensive logging and reporting for regulatory compliance',
      benefits: ['Tamper-proof logs', 'Digital signatures', 'Compliance reporting', 'Real-time monitoring']
    },
    {
      feature: 'Access Control',
      description: 'Role-based access control with multi-factor authentication',
      benefits: ['Identity verification', 'Privilege management', 'Session monitoring', 'Access logging']
    },
    {
      feature: 'Data Classification',
      description: 'Automated identification and classification of sensitive financial data',
      benefits: ['PII detection', 'Credit card identification', 'Regulatory data mapping', 'Risk assessment']
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl text-white mb-6">
                    <DollarIcon className="w-8 h-8" filled={true} />
                  </div>
                </Reveal>
                <Reveal delayMs={10}>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    Financial Services Data Security
                  </h1>
                </Reveal>
                <Reveal delayMs={20}>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Ultra-secure data sanitization for financial institutions with stringent regulatory requirements. 
                    Comprehensive solutions for banking, insurance, and investment services with PCI DSS, SOX, 
                    and Basel III compliance.
                  </p>
                </Reveal>
                <Reveal delayMs={30}>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Link to="/contact" className="btn-primary">
                      Get Financial Demo
                    </Link>
                    <Link to="/pricing" className="btn-secondary">
                      View Financial Pricing
                    </Link>
                  </div>
                </Reveal>
              </div>
              
              <div>
                <Reveal delayMs={40}>
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Financial Compliance</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">PCI DSS Level 1 compliance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">SOX financial reporting standards</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">Basel III risk management</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckIcon className="w-5 h-5 text-green-600" filled={true} />
                        <span className="text-slate-700">GLBA privacy protection</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Solutions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Comprehensive Financial Security Solutions
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Purpose-built solutions for the unique security requirements of financial institutions.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financialSolutions.map((solution, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 border border-emerald-200 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
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

      {/* Compliance Frameworks */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Financial Compliance Frameworks
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our solutions address all major financial industry compliance requirements.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {complianceFrameworks.map((framework, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm h-full">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{framework.framework}</h3>
                  <p className="text-slate-600 mb-4">{framework.description}</p>
                  <h4 className="font-semibold text-slate-900 mb-2">Key Requirements:</h4>
                  <ul className="space-y-2">
                    {framework.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2">
                        <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                        <span className="text-sm text-slate-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Institution Types */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Financial Institution Coverage
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Specialized solutions for all types of financial service providers.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {financialInstitutions.map((institution, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{institution.type}</h3>
                  <div className="mb-4">
                    <h4 className="font-semibold text-slate-900 mb-2">Services:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {institution.services.map((service, serviceIndex) => (
                        <div key={serviceIndex} className="flex items-center gap-2">
                          <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0" filled={true} />
                          <span className="text-sm text-slate-700">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Security Challenges:</h4>
                    <div className="space-y-1">
                      {institution.challenges.map((challenge, challengeIndex) => (
                        <div key={challengeIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-slate-700">{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Advanced Security Features
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Enterprise-grade security features designed for financial institutions.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.feature}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0" filled={true} />
                        <span className="text-sm text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-responsive">
          <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Secure Your Financial Institution Today
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Protect sensitive financial data and maintain regulatory compliance with our 
                specialized financial services security solutions.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Get Financial Consultation
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
