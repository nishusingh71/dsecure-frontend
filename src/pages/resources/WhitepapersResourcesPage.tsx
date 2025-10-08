import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { 
  CheckIcon, 
  DatabaseIcon,
  ShieldIcon,
  GearIcon,
  ArrowRightIcon,
  BuildingIcon,
  ArrowDownIcon,
  BriefcaseIcon
} from '@/components/FlatIcons'

export default function WhitepapersResourcesPage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/resources/whitepapers" />
        <title>
          Technical Whitepapers | DSecure Data Security Research & Analysis
        </title>
        <meta
          name="description"
          content="Download technical whitepapers on data security, compliance, and erasure technologies. Expert research and analysis from DSecure security professionals."
        />
        <meta
          name="keywords"
          content="data security whitepapers, cybersecurity research, data erasure technology, security analysis, compliance whitepapers, technical documentation"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <WhitepapersResourcesContent />
    </>
  );
}

function WhitepapersResourcesContent() {
  const featuredWhitepapers = [
    {
      title: 'The Complete Guide to Secure Data Erasure',
      subtitle: 'Best Practices for Enterprise Data Sanitization',
      category: 'Technical Guide',
      description: 'Comprehensive analysis of data erasure methodologies, compliance requirements, and implementation strategies for enterprise environments.',
      topics: [
        'Data erasure vs data deletion',
        'Industry compliance standards',
        'Technology comparison analysis',
        'Implementation methodologies',
        'ROI and cost-benefit analysis'
      ],
      highlights: [
        ' pages of technical analysis',
        'Real-world implementation examples',
        'Compliance framework mapping',
        'Cost calculation models'
      ],
      downloadSize: '4.2 MB',
      pages: 52,
      publishDate: 'December 2024',
      readTime: '45 minutes',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />,
      featured: true
    },
    {
      title: 'Cloud Security: Data Protection in Multi-Cloud Environments',
      subtitle: 'Securing Data Across Cloud Platforms',
      category: 'Cloud Security',
      description: 'Strategic guide for protecting sensitive data across multiple cloud platforms with focus on data lifecycle management.',
      topics: [
        'Multi-cloud data governance',
        'Cross-platform security policies',
        'Cloud-native security tools',
        'Data residency compliance',
        'Hybrid cloud architectures'
      ],
      highlights: [
        'Cloud provider comparison',
        'Security architecture diagrams',
        'Policy templates included',
        'Migration security checklist'
      ],
      downloadSize: '3.8 MB',
      pages: 44,
      publishDate: 'November 2024',
      readTime: '35 minutes',
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />,
      featured: true
    },
    {
      title: 'Zero Trust Architecture for Data Protection',
      subtitle: 'Implementing Zero Trust Data Security Models',
      category: 'Security Architecture',
      description: 'Detailed framework for implementing zero trust principles in data protection and access management systems.',
      topics: [
        'Zero trust principles',
        'Identity and access management',
        'Micro-segmentation strategies',
        'Continuous monitoring',
        'Implementation roadmap'
      ],
      highlights: [
        'Implementation framework',
        'Technology vendor analysis',
        'Deployment timeline templates',
        'Success metrics definition'
      ],
      downloadSize: '3.5 MB',
      pages: 38,
      publishDate: 'October 2024',
      readTime: '30 minutes',
      icon: <BuildingIcon className="w-6 h-6" filled={true} />,
      featured: true
    }
  ]

  const whitepaperLibrary = [
    {
      category: 'Compliance & Regulations',
      papers: [
        {
          title: 'GDPR Article 17: Right to Erasure Implementation',
          description: 'Technical implementation guide for GDPR data erasure requirements',
          pages: 28,
          publishDate: 'December 2024'
        },
        {
          title: 'HIPAA Security Rule: Technical Safeguards Analysis',
          description: 'Comprehensive analysis of HIPAA technical safeguard requirements',
          pages: 32,
          publishDate: 'November 2024'
        },
        {
          title: 'PCI DSS 4.0: Data Protection Requirements',
          description: 'Updated requirements analysis for PCI DSS version 4.0',
          pages: 24,
          publishDate: 'October 2024'
        }
      ]
    },
    {
      category: 'Technology & Innovation',
      papers: [
        {
          title: 'Quantum Computing Impact on Data Security',
          description: 'Analysis of quantum computing threats to current encryption methods',
          pages: 36,
          publishDate: 'November 2024'
        },
        {
          title: 'AI-Powered Security Orchestration',
          description: 'Machine learning applications in automated security response',
          pages: 29,
          publishDate: 'October 2024'
        },
        {
          title: 'Blockchain for Data Integrity Verification',
          description: 'Blockchain technology applications in data verification',
          pages: 33,
          publishDate: 'September 2024'
        }
      ]
    },
    {
      category: 'Industry Analysis',
      papers: [
        {
          title: 'Financial Services Security Landscape 2024',
          description: 'Annual analysis of security trends in financial services',
          pages: 41,
          publishDate: 'December 2024'
        },
        {
          title: 'Healthcare Data Protection Trends',
          description: 'Emerging trends in healthcare data security and protection',
          pages: 35,
          publishDate: 'November 2024'
        },
        {
          title: 'Manufacturing Cybersecurity Challenges',
          description: 'Industrial cybersecurity challenges and solutions',
          pages: 27,
          publishDate: 'October 2024'
        }
      ]
    },
    {
      category: 'Best Practices',
      papers: [
        {
          title: 'Incident Response Planning for Data Breaches',
          description: 'Comprehensive guide to data breach incident response',
          pages: 31,
          publishDate: 'November 2024'
        },
        {
          title: 'Security Awareness Training Programs',
          description: 'Building effective security awareness training programs',
          pages: 26,
          publishDate: 'October 2024'
        },
        {
          title: 'Third-Party Risk Management Framework',
          description: 'Framework for managing third-party security risks',
          pages: 39,
          publishDate: 'September 2024'
        }
      ]
    }
  ]

  const researchTopics = [
    {
      topic: 'Emerging Threats',
      description: 'Analysis of new cybersecurity threats and attack vectors',
      icon: <ShieldIcon className="w-5 h-5" filled={true} />
    },
    {
      topic: 'Regulatory Changes',
      description: 'Impact analysis of evolving data protection regulations',
      icon: <GearIcon className="w-5 h-5" filled={true} />
    },
    {
      topic: 'Technology Innovations',
      description: 'Research on cutting-edge security technologies',
      icon: <DatabaseIcon className="w-5 h-5" filled={true} />
    },
    {
      topic: 'Industry Benchmarks',
      description: 'Performance and security benchmarking studies',
      icon: <BriefcaseIcon className="w-5 h-5" filled={true} />
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
                  Technical Whitepapers & Research
                </h1>
              </Reveal>
              <Reveal delayMs={20}>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Access our library of technical whitepapers, research studies, and in-depth 
                  analysis on data security, compliance, and emerging technologies.
                </p>
              </Reveal>
              <Reveal delayMs={30}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    to="#featured-papers" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Browse Featured Papers
                    <ArrowRightIcon className="w-5 h-5 ml-2" filled={true} />
                  </Link>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Request Research Topic
                    <ArrowRightIcon className="w-5 h-5 ml-2" filled={true} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Whitepapers */}
      <section id="featured-papers" className="py-16 md:py-24 bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Featured Whitepapers
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our most comprehensive and popular research papers covering critical security topics.
              </p>
            </Reveal>
          </div>

          <div className="space-y-8">
            {featuredWhitepapers.map((paper, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-r from-white to-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                            {paper.icon}
                          </div>
                          <div>
                            <div className="text-purple-600 font-medium text-sm mb-1">{paper.category}</div>
                            <h3 className="text-2xl font-semibold text-slate-900 mb-2">{paper.title}</h3>
                            <p className="text-lg text-slate-600">{paper.subtitle}</p>
                          </div>
                        </div>

                        <p className="text-slate-700 mb-6">{paper.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3">Key Topics Covered</h4>
                            <ul className="space-y-2">
                              {paper.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-start gap-2">
                                  <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" filled={true} />
                                  <span className="text-sm text-slate-700">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3">Highlights</h4>
                            <ul className="space-y-2">
                              {paper.highlights.map((highlight, highlightIndex) => (
                                <li key={highlightIndex} className="flex items-start gap-2">
                                  <ArrowRightIcon className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" filled={true} />
                                  <span className="text-sm text-slate-700">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-1">
                        <div className="bg-slate-50 rounded-lg p-6">
                          <h4 className="font-semibold text-slate-900 mb-4">Paper Details</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="text-2xl font-bold text-purple-600">{paper.pages}</div>
                              <div className="text-sm text-slate-600">Pages</div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold text-slate-900">{paper.readTime}</div>
                              <div className="text-sm text-slate-600">Estimated Read Time</div>
                            </div>
                            <div>
                              <div className="text-lg font-semibold text-slate-900">{paper.publishDate}</div>
                              <div className="text-sm text-slate-600">Published</div>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <Link 
                              to="/contact" 
                              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-600 transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg group"
                            >
                              <ArrowDownIcon className="w-4 h-4 mr-2 group-hover:animate-bounce" filled={true} />
                              Download Whitepaper
                            </Link>
                            <div className="text-xs text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
                              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                                <polyline points="14,2 14,8 20,8"/>
                              </svg>
                              PDF • {paper.downloadSize}
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

      {/* Whitepaper Library */}
      <section className="py-16 md:py-24">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Complete Whitepaper Library
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Browse our complete collection organized by category and topic area.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {whitepaperLibrary.map((category, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">{category.category}</h3>
                  <div className="space-y-4">
                    {category.papers.map((paper, paperIndex) => (
                      <div key={paperIndex} className="border-l-4 border-purple-600 pl-4">
                        <h4 className="font-semibold text-slate-900 mb-1">{paper.title}</h4>
                        <p className="text-sm text-slate-600 mb-2">{paper.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{paper.pages} pages</span>
                          <span>{paper.publishDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center justify-center px-6 py-2 bg-purple-100 text-purple-700 font-medium rounded-lg hover:bg-purple-200 transform hover:scale-105 transition-all duration-300 group"
                    >
                      View all papers in this category
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" filled={true} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Research Topics */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Our Research Focus Areas
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                We continuously research and analyze key areas affecting data security and compliance.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchTopics.map((topic, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mx-auto mb-4">
                    {topic.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{topic.topic}</h3>
                  <p className="text-sm text-slate-600">{topic.description}</p>
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
                Stay Updated with Latest Research
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Subscribe to receive new whitepapers and research updates directly in your inbox.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Subscribe to Updates
                </Link>
                <Link 
                  to="/resources" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                  </svg>
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