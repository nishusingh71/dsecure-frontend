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

export default function EbooksResourcesPage() {
  const toast = useToast();

  const handleDownload = (filename: string, url: string) => {
    downloadResource(filename, url, toast);
  };

  const ebooks = [
    {
      title: 'Complete Guide to Data Erasure',
      description: 'Comprehensive guide covering all aspects of data erasure and compliance',
      filename: 'Complete-Guide-to-Data-Erasure.pdf',
      url: '/downloads/ebooks/complete-guide-to-data-erasure.pdf',
      category: 'Guides'
    },
    {
      title: 'GDPR Compliance Guide',
      description: 'Essential guide for GDPR-compliant data erasure practices',
      filename: 'GDPR-Compliance-Guide.pdf',
      url: '/downloads/ebooks/gdpr-compliance-guide.pdf',
      category: 'Compliance'
    },
    {
      title: 'Enterprise Data Security Best Practices',
      description: 'Best practices for enterprise data security and erasure',
      filename: 'Enterprise-Data-Security-Best-Practices.pdf',
      url: '/downloads/ebooks/enterprise-data-security-best-practices.pdf',
      category: 'Enterprise'
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage('ebooks')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <BriefcaseIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Free Ebooks
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Free ebooks on data security, erasure best practices, and compliance. 
                Download comprehensive guides.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Ebooks Grid */}
        <section className="py-16 bg-white">
          <div className="container-responsive">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooks.map((ebook, index) => (
                <Reveal key={ebook.title} delayMs={index * 100}>
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-3">
                          {ebook.category}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{ebook.title}</h3>
                        <p className="text-slate-600 mb-4">{ebook.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(ebook.filename, ebook.url)}
                      className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      <ArrowDownIcon className="w-5 h-5" filled={true} />
                      Download Ebook
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
