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

export default function BrochuresResourcesPage() {
  const toast = useToast();

  const handleDownload = (filename: string, url: string) => {
    downloadResource(filename, url, toast);
  };

  const brochures = [
    {
      title: 'Company Overview Brochure',
      description: 'Complete overview of D-Secure Tech solutions and services',
      filename: 'Company-Overview-Brochure.pdf',
      url: '/downloads/brochures/company-overview-brochure.pdf',
      category: 'Company'
    },
    {
      title: 'Enterprise Solutions Brochure',
      description: 'Enterprise data erasure solutions and capabilities',
      filename: 'Enterprise-Solutions-Brochure.pdf',
      url: '/downloads/brochures/enterprise-solutions-brochure.pdf',
      category: 'Solutions'
    },
    {
      title: 'Compliance Solutions Brochure',
      description: 'Compliance-focused data erasure solutions',
      filename: 'Compliance-Solutions-Brochure.pdf',
      url: '/downloads/brochures/compliance-solutions-brochure.pdf',
      category: 'Solutions'
    }
  ];

  return (
    <>
      <SEOHead seo={getSEOForPage('brochures')} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <BriefcaseIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Product Brochures
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Download D-Secure Tech product brochures. Overview materials for 
                data erasure solutions and services.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Brochures Grid */}
        <section className="py-16 bg-white">
          <div className="container-responsive">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brochures.map((brochure, index) => (
                <Reveal key={brochure.title} delayMs={index * 100}>
                  <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-3">
                          {brochure.category}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{brochure.title}</h3>
                        <p className="text-slate-600 mb-4">{brochure.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownload(brochure.filename, brochure.url)}
                      className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      <ArrowDownIcon className="w-5 h-5" filled={true} />
                      Download Brochure
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
