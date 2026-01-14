import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  CheckIcon,
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  ArrowRightIcon,
  ServerIcon,
  CloudIcon,
  MobileIcon,
  ClipboardIcon,
  StarIcon,
  LightningIcon
} from '@/components/FlatIcons';

export default function FeaturesPage() {
  return (
    <>
      <SEOHead seo={getSEOForPage('features')} />
      <FeaturesPageContent />
    </>
  );
}

function FeaturesPageContent() {
  const coreFeatures = [
    {
      title: 'Multi-Platform Support',
      description: 'Windows, macOS, and Linux support for comprehensive device coverage',
      icon: <ServerIcon className="w-6 h-6" filled={true} />
    },
    {
      title: 'Compliance Reporting',
      description: 'Automated compliance reports for NIST, DoD, GDPR, and HIPAA standards',
      icon: <ClipboardIcon className="w-6 h-6" filled={true} />
    },
    {
      title: 'Enterprise Management',
      description: 'Centralized management console for large-scale deployments',
      icon: <GearIcon className="w-6 h-6" filled={true} />
    },
    {
      title: 'Network Erasure',
      description: 'PXE boot and LAN-based erasure for remote device management',
      icon: <CloudIcon className="w-6 h-6" filled={true} />
    },
    {
      title: 'Mobile Device Support',
      description: 'iOS and Android device erasure with compliance certificates',
      icon: <MobileIcon className="w-6 h-6" filled={true} />
    },
    {
      title: 'Cryptographic Erase',
      description: 'Fast SSD erasure using cryptographic key destruction',
      icon: <ShieldIcon className="w-6 h-6" filled={true} />
    }
  ];

  const advancedFeatures = [
    {
      title: 'Automated Scheduling',
      description: 'Schedule erasure tasks for automated data destruction',
      icon: <LightningIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Batch Operations',
      description: 'Erasure of multiple devices simultaneously',
      icon: <DatabaseIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'Audit Trails',
      description: 'Comprehensive audit logs for compliance verification',
      icon: <ClipboardIcon className="w-5 h-5" filled={true} />
    },
    {
      title: 'API Integration',
      description: 'RESTful API for custom integrations and automation',
      icon: <GearIcon className="w-5 h-5" filled={true} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container-responsive text-center max-w-4xl mx-auto">
          <Reveal>
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
              <StarIcon className="w-10 h-10 text-white" filled={true} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Advanced Features
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Comprehensive data erasure software with enterprise-grade features for 
              compliance, security, and efficiency.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 bg-white">
        <div className="container-responsive">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
              Core Features
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature, index) => (
              <Reveal key={feature.title} delayMs={index * 100}>
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-emerald-50/30">
        <div className="container-responsive">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
              Advanced Capabilities
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {advancedFeatures.map((feature, index) => (
              <Reveal key={feature.title} delayMs={index * 100}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
                  </div>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-emerald-500 to-emerald-600">
        <div className="container-responsive text-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Experience All Features
            </h2>
            <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
              Download our software to experience all advanced features. 
              Free trial available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/download"
                className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
              >
                Download Free Trial
                <ArrowRightIcon className="w-5 h-5" filled={true} />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl border-2 border-white hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
              >
                Contact Sales
                <ArrowRightIcon className="w-5 h-5" filled={true} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
