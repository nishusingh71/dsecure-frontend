import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { downloadResource } from '../../utils/downloadUtils'
import { useToast } from '@/components/Toast'
import { 
  CheckIcon, 
  DatabaseIcon, 
  ShieldIcon,
  GearIcon,
  ArrowRightIcon,
  HoverIcon,
  BriefcaseIcon,
  ArrowDownIcon
} from '@/components/FlatIcons'

export default function DocumentationResourcesPage() {
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/resources/documentation" />
        <title>
          Technical Documentation | DSecure Data Erasure Solutions
        </title>
        <meta
          name="description"
          content="Comprehensive technical documentation for DSecure data erasure solutions. Integration guides, tutorials, and developer resources."
        />
        <meta
          name="keywords"
          content="DSecure documentation, integration guide, developer resources, technical documentation, data erasure integration"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <DocumentationResourcesContent />
    </>
  );
}

function DocumentationResourcesContent() {
  const toast = useToast()
  
  const documentationCategories = [
    {
      title: 'Implementation Guides',
      description: 'Step-by-step implementation guides for different environments',
      icon: <DatabaseIcon className="w-6 h-6" filled={true} />,
      documents: [
        {
          title: 'Enterprise Deployment Guide',
          description: 'Large-scale deployment strategies and best practices',
          pages: 56,
          format: 'PDF',
          size: '4.1 MB'
        },
        {
          title: 'Cloud Implementation Guide',
          description: 'Cloud-specific deployment and configuration',
          pages: 38,
          format: 'PDF',
          size: '3.0 MB'
        },
        {
          title: 'Network Configuration Manual',
          description: 'Network setup and security configuration',
          pages: 42,
          format: 'PDF',
          size: '3.5 MB'
        }
      ]
    },
    {
      title: 'Security Standards',
      description: 'Compliance and security standard documentation',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />,
      documents: [
        {
          title: 'NIST 800-88 Implementation',
          description: 'NIST compliance implementation guide',
          pages: 28,
          format: 'PDF',
          size: '2.4 MB'
        },
        {
          title: 'Security Architecture Guide',
          description: 'Security framework and architecture documentation',
          pages: 35,
          format: 'PDF',
          size: '2.9 MB'
        },
        {
          title: 'Audit Trail Documentation',
          description: 'Audit trail generation and compliance reporting',
          pages: 25,
          format: 'PDF',
          size: '2.1 MB'
        }
      ]
    }
  ]

  const quickStartGuides = [
    {
      title: '5-Minute Quick Start',
      description: 'Get started with basic erasure operations in minutes',
      steps: ['Download software', 'Install and configure', 'Run first erasure', 'Generate report'],
      time: '5 min'
    },
    {
      title: 'Google Drive Erasure Setup',
      description: 'Secure Google Drive data erasure configuration and usage',
      steps: ['Install DSecure extension', 'Configure erasure settings', 'Connect to Google Drive', 'Execute secure erasure'],
      time: '15 min'
    },
    {
      title: 'Enterprise Setup',
      description: 'Set up enterprise-grade deployment',
      steps: ['Plan architecture', 'Deploy infrastructure', 'Configure policies', 'Test operations'],
      time: '30 min'
    }
  ]

  const supportResources = [
    {
      resource: 'Knowledge Base',
      description: 'Searchable database of common questions and solutions',
      link: '/support',
      available: '24/7'
    },
    {
      resource: 'Video Tutorials',
      description: 'Step-by-step video guides for common operations',
      link: '/resources/videos',
      available: 'On-demand'
    },
    {
      resource: 'Community Forum',
      description: 'Connect with other users and share experiences',
      link: '/community',
      available: '24/7'
    },
    {
      resource: 'Technical Support',
      description: 'Direct access to our technical support team',
      link: '/contact',
      available: 'Business hours'
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
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white mb-6">
                  <DatabaseIcon className="w-8 h-8" filled={true} />
                </div>
              </Reveal>
              <Reveal delayMs={10}>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                  Technical Documentation
                </h1>
              </Reveal>
              <Reveal delayMs={20}>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Comprehensive technical documentation and user guides 
                  to help you implement and optimize DSecure data erasure solutions.
                </p>
              </Reveal>
              <Reveal delayMs={30}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="#documentation" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                    Browse Documentation
                  </Link>
                  <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors">
                    Get Technical Support
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guides */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Quick Start Guides
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Get up and running quickly with our step-by-step quick start guides.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickStartGuides.map((guide, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-slate-900">{guide.title}</h3>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {guide.time}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-6">{guide.description}</p>
                  <div className="space-y-3">
                    {guide.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {stepIndex + 1}
                        </div>
                        <span className="text-slate-700">{step}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="mt-6 inline-flex items-center justify-center w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors">
                    Start Guide
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section id="documentation" className="py-16 md:py-24">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Documentation Categories
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Comprehensive documentation organized by category for easy navigation.
              </p>
            </Reveal>
          </div>

          <div className="space-y-8">
            {documentationCategories.map((category, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-900">{category.title}</h3>
                        <p className="text-slate-600">{category.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {category.documents.map((doc, docIndex) => (
                        <div key={docIndex} className="bg-slate-50 rounded-lg p-4">
                          <h4 className="font-semibold text-slate-900 mb-2">{doc.title}</h4>
                          <p className="text-sm text-slate-600 mb-3">{doc.description}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                            <span>{doc.pages} pages</span>
                            <span>{doc.format}</span>
                            <span>{doc.size}</span>
                          </div>
                          <button 
                            onClick={() => {
                              const ok = downloadResource({
                                title: doc.title,
                                downloadSize: doc.size,
                                pages: Number(doc.pages) || 1,
                                type: 'documentation'
                              })
                              if (ok) toast.showToast(`Downloaded: ${doc.title}`, 'success')
                              else toast.showToast('Download failed. Please try again.', 'error')
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 bg-transparent border-none cursor-pointer"
                          >
                            Download <ArrowDownIcon className="w-4 h-4" filled={true} />
                          </button>
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

      {/* Support Resources */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Additional Support Resources
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Access additional resources and support channels to help you succeed.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportResources.map((resource, index) => (
              <Reveal key={index} delayMs={index * 10}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{resource.resource}</h3>
                      <p className="text-slate-600 mb-3">{resource.description}</p>
                      <span className="text-sm text-green-600 font-medium">Available: {resource.available}</span>
                    </div>
                    <Link 
                      to={resource.link} 
                      className="ml-4 text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      Access <ArrowRightIcon className="w-4 h-4" filled={true} />
                    </Link>
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need Technical Support?
              </h2>
            </Reveal>
            <Reveal delayMs={10}>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Our technical team is ready to help you implement and optimize 
                DSecure solutions for your specific requirements.
              </p>
            </Reveal>
            <Reveal delayMs={20}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Contact Technical Support
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