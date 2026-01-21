import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'
import SEOHead from '@/components/SEOHead'
import { getSEOForPage } from '@/utils/seo'
import { downloadResource } from '../../utils/downloadUtils'
import { useToast } from '@/components/Toast'
import {
  CheckIcon,
  BriefcaseIcon,
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  ArrowRightIcon,
  HoverIcon,
  ArrowDownIcon,
  BuildingIcon
} from '@/components/FlatIcons'

export default function CaseStudiesResourcesPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('case-studies')} />

      <CaseStudiesResourcesContent />
    </>
  );
}

function CaseStudiesResourcesContent() {
  const toast = useToast()
  const featuredCaseStudies = [
    {
      title: 'Fortune 500 Manufacturing: 60% Faster IT Refresh',
      industry: 'Manufacturing',
      company: 'Global Manufacturing Corporation',
      challenge: 'Slow IT refresh cycles and compliance concerns',
      solution: 'Automated data sanitization with ServiceNow integration',
      results: [
        '60% reduction in IT refresh cycle time',
        '100% compliance with data protection regulations',
        '$2.3M annual cost savings',
        '99.9% data sanitization success rate'
      ],
      metrics: {
        devices: '15,000+',
        timeframe: '12 months',
        roiPercentage: '285%'
      },
      icon: <BuildingIcon className="w-6 h-6" filled={true} />,
      downloadSize: '1.8 MB',
      pages: 12
    },
    {
      title: 'Regional Healthcare System: HIPAA Compliance Excellence',
      industry: 'Healthcare',
      company: 'Regional Healthcare Network',
      challenge: 'HIPAA compliance for medical device disposal',
      solution: 'Healthcare-specific data sanitization protocols',
      results: [
        '100% HIPAA audit compliance',
        'Zero data breach incidents',
        '40% reduction in disposal costs',
        'Streamlined device lifecycle management'
      ],
      metrics: {
        devices: '8,500+',
        timeframe: '18 months',
        roiPercentage: '195%'
      },
      icon: <ShieldIcon className="w-6 h-6" filled={true} />,
      downloadSize: '2.1 MB',
      pages: 16
    },
    {
      title: 'National Bank: PCI DSS Compliance & Security',
      industry: 'Financial Services',
      company: 'National Banking Institution',
      challenge: 'PCI DSS compliance and sensitive data protection',
      solution: 'Multi-layer financial data sanitization',
      results: [
        'PCI DSS Level 1 compliance maintained',
        '75% faster audit processes',
        'Enhanced customer data protection',
        'Reduced regulatory risk exposure'
      ],
      metrics: {
        devices: '12,000+',
        timeframe: '24 months',
        roiPercentage: '320%'
      },
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />,
      downloadSize: '2.5 MB',
      pages: 20
    }
  ]

  const industrySuccessStories = [
    {
      industry: 'Government & Public Sector',
      organizations: 3,
      totalDevices: '25,000+',
      avgROI: '250%',
      keyAchievements: [
        'NIST 800-88 compliance across all agencies',
        'Classified data protection protocols',
        'Inter-agency data sharing security',
        'Budget optimization through reuse'
      ]
    },
    {
      industry: 'Education',
      organizations: 8,
      totalDevices: '18,000+',
      avgROI: '180%',
      keyAchievements: [
        'Student data privacy protection',
        'FERPA compliance maintenance',
        'Cost-effective device refresh cycles',
        'Campus-wide security standardization'
      ]
    },
    {
      industry: 'Technology & Software',
      organizations: 12,
      totalDevices: '35,000+',
      avgROI: '290%',
      keyAchievements: [
        'Intellectual property protection',
        'Cloud migration security',
        'DevOps integration',
        'Rapid deployment scalability'
      ]
    },
    {
      industry: 'Retail & E-commerce',
      organizations: 6,
      totalDevices: '22,000+',
      avgROI: '210%',
      keyAchievements: [
        'Customer PII protection',
        'PCI compliance for payment systems',
        'Multi-location deployment',
        'Seasonal scaling capabilities'
      ]
    }
  ]

  const successMetrics = [
    {
      metric: 'Average ROI',
      value: '245%',
      description: 'Return on investment across all implementations',
      icon: <ArrowRightIcon className="w-5 h-5" filled={true} />
    },
    {
      metric: 'Compliance Rate',
      value: '99.9%',
      description: 'Successful compliance audits and regulations',
      icon: <CheckIcon className="w-5 h-5" filled={true} />
    },
    {
      metric: 'Time Savings',
      value: '65%',
      description: 'Average reduction in IT refresh cycle time',
      icon: <GearIcon className="w-5 h-5" filled={true} />
    },
    {
      metric: 'Customer Satisfaction',
      value: '98%',
      description: 'Customer satisfaction and recommendation rate',
      icon: <ShieldIcon className="w-5 h-5" filled={true} />
    }
  ]

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 w-full overflow-hidden">
      {/* Hero Section */}
      <section>
        <div className="container-app py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <Reveal>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl text-white mb-6">
                  <BriefcaseIcon className="w-8 h-8" filled={true} />
                </div>
              </Reveal>
              <Reveal delayMs={10}>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  Customer Success Stories
                </h1>
              </Reveal>
              <Reveal delayMs={20}>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Discover how organizations across industries have achieved remarkable results
                  with D-Secure data erasure solutions. Real case studies with measurable ROI.
                </p>
              </Reveal>
              <Reveal delayMs={30}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="#case-studies" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center">
                    Explore Case Studies
                  </Link>
                  <Link to="/contact" className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center">
                    Share Your Success Story
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Proven Success Metrics
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Real results from organizations that have implemented D-Secure solutions.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successMetrics.map((metric, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-6 text-center border border-slate-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mx-auto mb-4">
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-2">{metric.value}</div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{metric.metric}</h3>
                  <p className="text-sm text-slate-600">{metric.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section id="case-studies" className="py-16 md:py-24">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Featured Case Studies
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                In-depth case studies showcasing successful implementations across different industries.
              </p>
            </Reveal>
          </div>

          <div className="space-y-8">
            {featuredCaseStudies.map((study, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600">
                            {study.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-semibold text-slate-900">{study.title}</h3>
                            <p className="text-purple-600 font-medium">{study.industry}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Challenge</h4>
                            <p className="text-slate-600">{study.challenge}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Solution</h4>
                            <p className="text-slate-600">{study.solution}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 mb-3">Key Results</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {study.results.map((result, resultIndex) => (
                              <div key={resultIndex} className="flex items-start gap-2">
                                <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                                <span className="text-slate-700">{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        <div className="bg-slate-50 rounded-lg p-6">
                          <h4 className="font-semibold text-slate-900 mb-4">Project Metrics</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="text-2xl font-bold text-purple-600">{study.metrics.devices}</div>
                              <div className="text-sm text-slate-600">Devices Processed</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-purple-600">{study.metrics.timeframe}</div>
                              <div className="text-sm text-slate-600">Implementation Period</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-purple-600">{study.metrics.roiPercentage}</div>
                              <div className="text-sm text-slate-600">Return on Investment</div>
                            </div>
                          </div>

                          <div className="mt-6">
                            <button
                              onClick={() => {
                                const ok = downloadResource({ title: study.title, downloadSize: study.downloadSize, pages: study.pages, type: 'case-study' })
                                if (ok) toast.showToast(`Downloaded: ${study.title}`, 'success')
                                else toast.showToast('Download failed. Please try again.', 'error')
                              }}
                              className="border-2 border-purple-600 text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors w-full justify-center text-sm inline-flex items-center"
                            >
                              Download Full Case Study
                              <ArrowDownIcon className="w-4 h-4 ml-1" filled={true} />
                            </button>
                            <div className="text-xs text-slate-500 text-center mt-2">
                              {study.pages} pages • {study.downloadSize}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Success Stories */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Success Across Industries
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                See how organizations in different industries have achieved success with D-Secure.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industrySuccessStories.map((industry, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-900">{industry.industry}</h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{industry.avgROI}</div>
                      <div className="text-xs text-slate-600">Avg ROI</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-lg font-semibold text-slate-900">{industry.organizations}</div>
                      <div className="text-sm text-slate-600">Organizations</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-slate-900">{industry.totalDevices}</div>
                      <div className="text-sm text-slate-600">Total Devices</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Key Achievements</h4>
                    <ul className="space-y-1">
                      {industry.keyAchievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-2">
                          <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                          <span className="text-sm text-slate-700">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Create Your Success Story?
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join hundreds of organizations that have achieved remarkable results
                with D-Secure data erasure solutions.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Start Your Success Story
                </Link>
                <Link to="/resources" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  View All Resources
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}