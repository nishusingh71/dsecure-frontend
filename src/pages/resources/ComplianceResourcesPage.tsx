import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'
import SEOHead from '@/components/SEOHead'
import { getSEOForPage } from '@/utils/seo'
import { downloadResource } from '../../utils/downloadUtils'
import { useToast } from '@/components/Toast'
import {
  CheckIcon,
  ShieldIcon,
  GearIcon,
  ArrowRightIcon,
  BuildingIcon,
  ArrowDownIcon,
  DatabaseIcon
} from '@/components/FlatIcons'

export default function ComplianceResourcesPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('compliance-resources')} />

      <ComplianceResourcesContent />
    </>
  );
}

function ComplianceResourcesContent() {
  const toast = useToast()
  const complianceStandards = [
    {
      title: 'GDPR Data Protection Guide',
      standard: 'GDPR',
      description: 'Complete guide to GDPR Article 17 compliance and data erasure requirements',
      coverage: [
        'Right to erasure (Article 17) requirements',
        'Data subject request handling',
        'Technical and organizational measures',
        'Documentation and audit requirements',
        'Cross-border data transfer protocols'
      ],
      industries: ['All EU Organizations', 'Global Companies', 'SaaS Providers'],
      downloadSize: '3.2 MB',
      pages: 45,
      lastUpdated: 'December 2024',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />,
      color: 'blue'
    },
    {
      title: 'HIPAA Security Rule Compliance',
      standard: 'HIPAA',
      description: 'Healthcare data protection and secure disposal requirements',
      coverage: [
        'HIPAA Security Rule § 164.310(d)(2)',
        'PHI disposal and device sanitization',
        'Administrative safeguards',
        'Physical and technical safeguards',
        'Business associate agreements'
      ],
      industries: ['Healthcare Providers', 'Medical Devices', 'Health Insurance'],
      downloadSize: '2.8 MB',
      pages: 38,
      lastUpdated: 'November 2024',
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />,
      color: 'green'
    },
    {
      title: 'PCI DSS Data Destruction Guide',
      standard: 'PCI DSS',
      description: 'Payment card industry data security and disposal standards',
      coverage: [
        'PCI DSS Requirement 9.8.2 compliance',
        'Cardholder data environment protection',
        'Secure disposal procedures',
        'Network security requirements',
        'Regular security assessments'
      ],
      industries: ['Financial Services', 'Retailers', 'Payment Processors'],
      downloadSize: '2.5 MB',
      pages: 32,
      lastUpdated: 'December 2024',
      icon: <GearIcon className="w-6 h-6" filled={true} />,
      color: 'purple'
    },
    {
      title: 'SOX IT Controls & Data Management',
      standard: 'SOX',
      description: 'Sarbanes-Oxley compliance for financial data and IT controls',
      coverage: [
        'Section 404 IT general controls',
        'Financial data retention policies',
        'Change management procedures',
        'Access controls and segregation',
        'Audit trail requirements'
      ],
      industries: ['Public Companies', 'Financial Services', 'Auditing Firms'],
      downloadSize: '2.9 MB',
      pages: 41,
      lastUpdated: 'October 2024',
      icon: <GearIcon className="w-6 h-6" filled={true} />,
      color: 'indigo'
    },
    {
      title: 'NIST 800-88 Implementation Guide',
      standard: 'NIST 800-88',
      description: 'Guidelines for media sanitization and data destruction',
      coverage: [
        'NIST SP 800-88 Rev. 1 standards',
        'Media sanitization procedures',
        'Clear, purge, and destroy methods',
        'Verification and regulation',
        'Government and federal requirements'
      ],
      industries: ['Government', 'Defense Contractors', 'Federal Agencies'],
      downloadSize: '3.5 MB',
      pages: 52,
      lastUpdated: 'December 2024',
      icon: <BuildingIcon className="w-6 h-6" filled={true} />,
      color: 'red'
    },
    {
      title: 'ISO 27001 Information Security',
      standard: 'ISO 27001',
      description: 'Information security management system requirements',
      coverage: [
        'Annex A.11.2.7 secure disposal',
        'Information security policies',
        'Risk assessment procedures',
        'Incident management',
        'Continuous improvement processes'
      ],
      industries: ['Enterprise', 'Technology', 'Consulting'],
      downloadSize: '3.1 MB',
      pages: 47,
      lastUpdated: 'November 2024',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />,
      color: 'emerald'
    }
  ]

  const complianceChecklist = [
    {
      category: 'Data Identification',
      items: [
        'Inventory all data storage devices',
        'Classify data sensitivity levels',
        'Map data flows and dependencies',
        'Document retention requirements'
      ]
    },
    {
      category: 'Sanitization Procedures',
      items: [
        'Select appropriate sanitization methods',
        'Implement verification procedures',
        'Document sanitization processes',
        'Train personnel on procedures'
      ]
    },
    {
      category: 'Audit & Documentation',
      items: [
        'Maintain sanitization regulatory documents',
        'Document audit trails',
        'Regular compliance assessments',
        'Incident response procedures'
      ]
    },
    {
      category: 'Continuous Monitoring',
      items: [
        'Regular policy reviews',
        'Technology updates assessment',
        'Staff training and awareness',
        'Third-party compliance verification'
      ]
    }
  ]

  const regulatoryUpdates = [
    {
      title: 'EU AI Act Data Requirements',
      date: 'January 2025',
      description: 'New AI system data handling and erasure requirements under the EU AI Act.',
      impact: 'High',
      category: 'Data Protection'
    },
    {
      title: 'NIST Cybersecurity Framework 2.0',
      date: 'December 2024',
      description: 'Updated framework with enhanced data sanitization guidelines.',
      impact: 'Medium',
      category: 'Security Standards'
    },
    {
      title: 'HIPAA Security Rule Updates',
      date: 'November 2024',
      description: 'Clarifications on cloud storage and remote work data protection.',
      impact: 'High',
      category: 'Healthcare'
    },
    {
      title: 'PCI DSS v4.0 Implementation',
      date: 'October 2024',
      description: 'Final implementation guidelines for PCI DSS version 4.0.',
      impact: 'Critical',
      category: 'Payment Security'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    }
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 text-gray-600 border-gray-200'
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 w-full overflow-hidden">
      {/* Hero Section */}
      <section>
        <div className="container-app py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <Reveal>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl text-white mb-6">
                  <ShieldIcon className="w-8 h-8" filled={true} />
                </div>
              </Reveal>
              <Reveal delayMs={10}>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  Compliance Guides & Standards
                </h1>
              </Reveal>
              <Reveal delayMs={20}>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Comprehensive compliance guides and resources to help you meet data protection
                  standards and regulatory requirements across industries.
                </p>
              </Reveal>
              <Reveal delayMs={30}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="#compliance-guides" className="btn-primary">
                    Browse Compliance Guides
                  </Link>
                  <Link to="/contact" className="btn-secondary">
                    Request Custom Guide
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Standards Grid */}
      <section id="compliance-guides" className="py-16 md:py-24 bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Industry Compliance Standards
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Download comprehensive guides for major data protection and security standards.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceStandards.map((standard, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(standard.color)}`}>
                        {standard.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{standard.title}</h3>
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getColorClasses(standard.color)}`}>
                          {standard.standard}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-4">{standard.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Coverage</h4>
                      <ul className="space-y-1">
                        {standard.coverage.slice(0, 3).map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                            <span className="text-sm text-slate-700">{item}</span>
                          </li>
                        ))}
                        {standard.coverage.length > 3 && (
                          <li className="text-sm text-slate-500 ml-6">
                            +{standard.coverage.length - 3} more topics
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Key Industries</h4>
                      <div className="flex flex-wrap gap-1">
                        {standard.industries.map((industry, industryIndex) => (
                          <span key={industryIndex} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                            {industry}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-4">
                      <div className="flex justify-between items-center text-sm text-slate-600 mb-3">
                        <span>{standard.pages} pages</span>
                        <span>{standard.downloadSize}</span>
                      </div>
                      <div className="text-xs text-slate-500 mb-3">
                        Last updated: {standard.lastUpdated}
                      </div>
                      <button
                        onClick={() => {
                          const ok = downloadResource({ title: standard.title, downloadSize: standard.downloadSize, pages: standard.pages, type: 'compliance-guide' })
                          if (ok) toast.showToast(`Downloaded: ${standard.title}`, 'success')
                          else toast.showToast('Download failed. Please try again.', 'error')
                        }}
                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-lg font-medium hover:from-purple-700 hover:to-indigo-800 transition-all duration-200 text-sm"
                      >
                        Download Guide
                        <ArrowDownIcon className="w-4 h-4 ml-1" filled={true} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Compliance Implementation Checklist
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Essential steps to ensure your data erasure processes meet compliance requirements.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {complianceChecklist.map((category, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 border-2 border-purple-600 rounded flex-shrink-0 mt-0.5"></div>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Updates */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Latest Regulatory Updates
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Stay informed about the latest changes in data protection regulations and standards.
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {regulatoryUpdates.map((update, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-lg p-6 border border-slate-200">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">{update.title}</h3>
                        <div className="flex gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${update.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                              update.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                                'bg-yellow-100 text-yellow-800'
                            }`}>
                            {update.impact} Impact
                          </span>
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">
                            {update.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-600">{update.description}</p>
                    </div>
                    <div className="text-sm text-slate-500 md:text-right">
                      {update.date}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* <div className="text-center mt-8">
            <Reveal delayMs={40}>
              <Link to="/contact" className="btn-secondary">
                Subscribe to Updates
                <ArrowRightIcon className="w-4 h-4 ml-1" filled={true} />
              </Link>
            </Reveal>
          </div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need Custom Compliance Guidance?
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Our compliance experts can help you navigate specific regulatory requirements
                for your industry and organization.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Contact Compliance Expert
                </Link>
                <Link to="/resources" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  All Resources
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}