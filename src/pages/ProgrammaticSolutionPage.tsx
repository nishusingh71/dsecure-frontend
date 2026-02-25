import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  FileText, 
  Network, 
  Lock,
  ChevronRight,
  Database,
  Search
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { solutionsData } from '../data/solutionsData';

export const ProgrammaticSolutionPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const vertical = useMemo(() => 
    solutionsData.find(v => v.slug === slug), 
  [slug]);

  if (!vertical) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <SEOHead 
        title={vertical.seoTitle}
        description={vertical.seoDescription}
        canonicalUrl={`/solutions/${vertical.slug}`}
        seo={{
          title: vertical.seoTitle,
          description: vertical.seoDescription,
          keywords: `${vertical.industry}, data erasure, ${vertical.title}, compliance, NIST 800-88, GDPR, data wiping solutions`,
          canonicalUrl: `https://dsecure.com/solutions/${vertical.slug}`,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": vertical.seoTitle,
            "description": vertical.seoDescription,
            "publisher": {
              "@type": "Organization",
              "name": "D-Secure Technologies",
              "logo": {
                "@type": "ImageObject",
                "url": "https://dsecure.com/logo.png"
              }
            },
            "mainEntity": {
              "@type": "Article",
              "headline": vertical.title,
              "description": vertical.heroDescription,
              "image": "https://dsecure.com/og-solutions.png",
              "author": {
                "@type": "Organization",
                "name": "D-Secure Solutions Group"
              },
              "datePublished": "2024-02-24",
              "industry": vertical.industry
            }
          }
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-blue-400 mb-6"
            >
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-wider uppercase">Industry Solutions</span>
              <ChevronRight className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-400">{vertical.industry}</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight"
            >
              {vertical.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 leading-relaxed mb-10 max-w-3xl"
            >
              {vertical.heroDescription}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 group shadow-lg shadow-blue-900/20"
              >
                Request Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/whitepaper"
                className="bg-slate-800/50 hover:bg-slate-800 text-slate-300 border border-slate-700 px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Technical Whitepaper
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {/* Regulatory Landscape */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Lock className="w-8 h-8 text-blue-500" />
                  Regulatory Landscape
                </h2>
                <div className="prose prose-invert max-w-none text-slate-400 text-lg leading-relaxed space-y-4">
                  <p>{vertical.regulatoryLandscape}</p>
                </div>
              </div>

              {/* Alignment Table */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <Database className="w-8 h-8 text-blue-500" />
                  Compliance Alignment Matrix
                </h2>
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-800/50">
                        <th className="px-6 py-4 font-semibold text-white border-b border-slate-700 w-1/4">Regulation</th>
                        <th className="px-6 py-4 font-semibold text-white border-b border-slate-700 w-1/3">Key Requirement</th>
                        <th className="px-6 py-4 font-semibold text-white border-b border-slate-700">D-Secure Capability</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {vertical.alignmentTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-blue-500/5 transition-colors">
                          <td className="px-6 py-4 text-blue-400 font-medium align-top">{row.regulation}</td>
                          <td className="px-6 py-4 text-slate-200 font-medium align-top">{row.requirement}</td>
                          <td className="px-6 py-4 text-slate-400 align-top">{row.capability}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Procedural Content */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <Network className="w-8 h-8 text-blue-500" />
                  Implementation Methodology
                </h2>
                <div className="space-y-8 text-slate-400 text-lg leading-relaxed">
                  {vertical.proceduralContent.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
              
              {/* Internal Link CTA */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/20 mb-16">
                <h3 className="text-2xl font-bold text-white mb-4">Deep Technical Analysis Required?</h3>
                <p className="text-slate-400 mb-6">
                  Explore our comprehensive glossary for detailed definitions of technical terms or download the full academic whitepaper on lifecycle governance.
                </p>
                <div className="flex gap-4">
                  <Link to="/glossary" className="text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-1">
                    Explore Glossary <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-slate-700">|</span>
                  <Link to="/data-hygiene-framework" className="text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-1">
                    View Framework <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 sticky top-32">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-500" />
                  Technical Specifications
                </h3>
                <ul className="space-y-4">
                  {vertical.technicalSpecs.map((spec, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-400 border-b border-slate-800/50 pb-4 last:border-0 last:pb-0">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-10 pt-10 border-t border-slate-800">
                  <h4 className="font-bold text-white mb-4">Schedule a Demo</h4>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Witness how D-Secure automates complex compliance workflows for the {vertical.industry} sector.
                  </p>
                  <Link 
                    to="/contact"
                    className="block w-full text-center bg-white text-black py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProgrammaticSolutionPage;
