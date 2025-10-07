import React, { useState, useCallback, memo } from "react";
import { Helmet } from 'react-helmet-async'
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { LicenseForm, type LicenseFormData } from "@/components/forms";
import { PartnershipForm, type PartnershipFormData } from "@/components/forms";

interface Plan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  mostPopular?: boolean;
  buttonText: string;
  deviceLimit: string;
  support: string;
  compliance: string[];
}

const PricingAndPlanPage: React.FC = memo(() => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showPartnershipModal, setShowPartnershipModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleLicenseSubmit = useCallback((formData: LicenseFormData) => {
    console.log('License request from Pricing Page:', formData);
    
    // Prepare email data for license request
    const emailData = {
      to: 'license@dsecure.com',
      subject: 'Free License Request from Pricing Page - ' + formData.company,
      body: `
        New Free License Request from Pricing Page:
        
        Usage Type: ${formData.usage}
        
        Personal Information:
        - Full Name: ${formData.fullName}
        - Email: ${formData.email}
        - Phone: ${formData.phone}
        
        Company Information:
        - Company: ${formData.company}
        - Country: ${formData.country}
        - Business Type: ${formData.businessType}
        - Compliance Requirements: ${formData.compliance}
        
        Erasure Requirements:
        - What to Erase: ${formData.eraseOption}
        - Number of Devices: ${formData.deviceCount}
        
        Additional Requirements:
        ${formData.requirements}
        
        Request submitted from: Pricing and Plan Page
        Timestamp: ${new Date().toLocaleString()}
      `
    };

    // Here you would integrate with your email service (EmailJS, etc.)
    console.log('Email data:', emailData);
    
    // Simulate API call
    setTimeout(() => {
      alert('Free license request submitted successfully! We will send you the license details soon.');
      setShowLicenseModal(false);
    }, 1000);
  }, []);

  const handlePartnershipSubmit = useCallback((formData: PartnershipFormData) => {
    console.log('Partnership request from Pricing Page:', formData);
    
    // Prepare email data for partnership request
    const emailData = {
      to: 'partnerships@dsecure.com',
      subject: 'Partnership Request from Pricing Page - ' + formData.companyName,
      body: `
        New Partnership Request from Pricing Page:
        
        Personal Information:
        - Full Name: ${formData.fullName}
        - Business Email: ${formData.businessEmail}
        - Phone: ${formData.phoneNo}
        
        Company Information:
        - Company Name: ${formData.companyName}
        - Website: ${formData.website}
        - Country: ${formData.country}
        - Partner Type: ${formData.partnerType}
        
        Business Description:
        ${formData.businessDescription}
        
        Request submitted from: Pricing and Plan Page
        Timestamp: ${new Date().toLocaleString()}
      `
    };
    
    // Here you would integrate with your email service (EmailJS, etc.)
    console.log('Partnership email data:', emailData);
    
    // Simulate API call
    setTimeout(() => {
      alert('Partnership request submitted successfully! We will review your application and get back to you soon.');
      setShowPartnershipModal(false);
    }, 1000);
  }, []);

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'annual' ? '$49' : '$59',
      originalPrice: billingCycle === 'annual' ? '$59' : undefined,
      period: billingCycle === 'annual' ? '/month billed annually' : '/month',
      description: 'Perfect for individuals and small businesses',
      deviceLimit: 'Up to 10 devices',
      support: 'Email support',
      compliance: ['NIST 800-88', 'DoD 5220.22-M'],
      features: [
        'Secure data erasure for HDDs and SSDs',
        'Windows and Mac support',
        'Basic erasure certificates',
        'Email support',
        'Up to 10 devices per month',
        'Standard erasure algorithms',
        'Basic reporting'
      ],
      buttonText: 'Start Free Trial'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'annual' ? '$149' : '$179',
      originalPrice: billingCycle === 'annual' ? '$179' : undefined,
      period: billingCycle === 'annual' ? '/month billed annually' : '/month',
      description: 'Ideal for growing businesses and IT departments',
      deviceLimit: 'Up to 100 devices',
      support: 'Priority email & phone support',
      compliance: ['NIST 800-88', 'DoD 5220.22-M', 'Common Criteria'],
      features: [
        'Everything in Starter plan',
        'Mobile device erasure (iOS/Android)',
        'Advanced erasure algorithms',
        'Detailed audit reports',
        'Priority support',
        'Up to 100 devices per month',
        'Batch operations',
        'Custom erasure profiles'
      ],
      mostPopular: true,
      highlighted: true,
      buttonText: 'Start Free Trial'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'annual' ? '$399' : '$479',
      originalPrice: billingCycle === 'annual' ? '$479' : undefined,
      period: billingCycle === 'annual' ? '/month billed annually' : '/month',
      description: 'Comprehensive solution for large organizations',
      deviceLimit: 'Unlimited devices',
      support: '24/7 dedicated support',
      compliance: ['NIST 800-88', 'DoD 5220.22-M', 'Common Criteria', 'FIPS 140-2'],
      features: [
        'Everything in Professional plan',
        'Cloud console management',
        'Remote device erasure',
        'Enterprise-grade reporting',
        'API access',
        'Unlimited devices',
        'White-label certificates',
        'Custom branding',
        'SLA guarantee',
        'On-site training'
      ],
      buttonText: 'Contact Sales'
    },
    {
      id: 'custom',
      name: 'Custom',
      price: 'Contact us',
      period: 'for pricing',
      description: 'Tailored solutions for specific requirements',
      deviceLimit: 'Custom limits',
      support: 'Dedicated account manager',
      compliance: ['All standards', 'Custom compliance'],
      features: [
        'Custom feature development',
        'Dedicated infrastructure',
        'Custom compliance requirements',
        'Volume licensing discounts',
        'Multi-region deployment',
        'Custom integrations',
        'Advanced security features',
        'Dedicated account manager'
      ],
      buttonText: 'Contact Sales'
    }
  ];

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    const plan = plans.find(p => p.id === planId);
    
    if (plan?.buttonText === 'Contact Sales') {
      // Redirect to contact page or open contact modal
      window.location.href = '/contact';
    } else {
      // Handle trial signup or purchase
      console.log(`Selected plan: ${plan?.name}`);
      // Here you would integrate with your payment system
      alert(`Starting free trial for ${plan?.name} plan. Redirecting to signup...`);
    }
  };

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/pricing-and-plan" />
        <title>Pricing & Plans | DSecure Data Erasure Solutions - Choose Your Plan</title>
        <meta
          name="description"
          content="Choose the perfect DSecure data erasure plan for your needs. From individual users to enterprise organizations, find flexible pricing options with comprehensive features."
        />
        <meta
          name="keywords"
          content="DSecure pricing, data erasure plans, secure deletion pricing, enterprise data security, license options"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 md:py-24">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
                    Choose Your <span className="text-brand">Perfect Plan</span>
                  </h1>
                  <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-8">
                    Secure data erasure solutions for every need. From individual users to enterprise organizations.
                  </p>

                  {/* Billing Toggle */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-white rounded-lg p-1 shadow-sm">
                      <div className="flex">
                        <button
                          onClick={() => setBillingCycle('monthly')}
                          className={`px-6 py-2 rounded-md font-medium transition-all ${
                            billingCycle === 'monthly'
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'text-slate-700 hover:text-emerald-600'
                          }`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setBillingCycle('annual')}
                          className={`px-6 py-2 rounded-md font-medium transition-all relative ${
                            billingCycle === 'annual'
                              ? 'bg-emerald-500 text-white shadow-sm'
                              : 'text-slate-700 hover:text-emerald-600'
                          }`}
                        >
                          Annual
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            Save 20%
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 md:py-24">
          <div className="container-responsive">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
              {plans.map((plan, index) => (
                <Reveal key={plan.id} delayMs={index * 100}>
                  <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    plan.highlighted ? 'ring-2 ring-emerald-500 transform scale-105' : ''
                  }`}>
                    {plan.mostPopular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="p-8">
                      {/* Plan Header */}
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                        <p className="text-slate-600 mb-4">{plan.description}</p>
                        
                        <div className="mb-4">
                          <div className="flex items-baseline justify-center gap-2">
                            {plan.originalPrice && (
                              <span className="text-lg text-slate-400 line-through">{plan.originalPrice}</span>
                            )}
                            <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                          </div>
                          <span className="text-slate-600">{plan.period}</span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-slate-700">{plan.deviceLimit}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 019.75 9.75c0 .414-.025.825-.072 1.233M12 21.75A9.75 9.75 0 012.25 12c0-.414.025-.825.072-1.233" />
                            </svg>
                            <span className="text-slate-700">{plan.support}</span>
                          </div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="mb-8">
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-slate-700 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Compliance Badges */}
                      <div className="mb-6">
                        <div className="text-xs text-slate-600 mb-2">Compliance Standards:</div>
                        <div className="flex flex-wrap gap-1">
                          {plan.compliance.map((standard, standardIndex) => (
                            <span key={standardIndex} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                              {standard}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handlePlanSelection(plan.id)}
                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                          plan.highlighted
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600'
                            : 'bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Compare Features
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Detailed comparison of features across all plans
                </p>
              </div>
            </Reveal>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-6 font-semibold text-slate-900">Features</th>
                    <th className="text-center p-6 font-semibold text-slate-900">Starter</th>
                    <th className="text-center p-6 font-semibold text-slate-900">Professional</th>
                    <th className="text-center p-6 font-semibold text-slate-900">Enterprise</th>
                    <th className="text-center p-6 font-semibold text-slate-900">Custom</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Device Limit', starter: '10', professional: '100', enterprise: 'Unlimited', custom: 'Custom' },
                    { feature: 'Windows Support', starter: '✓', professional: '✓', enterprise: '✓', custom: '✓' },
                    { feature: 'Mac Support', starter: '✓', professional: '✓', enterprise: '✓', custom: '✓' },
                    { feature: 'Mobile Devices', starter: '✗', professional: '✓', enterprise: '✓', custom: '✓' },
                    { feature: 'Cloud Console', starter: '✗', professional: '✗', enterprise: '✓', custom: '✓' },
                    { feature: 'API Access', starter: '✗', professional: '✗', enterprise: '✓', custom: '✓' },
                    { feature: 'Priority Support', starter: '✗', professional: '✓', enterprise: '✓', custom: '✓' },
                    { feature: '24/7 Support', starter: '✗', professional: '✗', enterprise: '✓', custom: '✓' },
                    { feature: 'Custom Branding', starter: '✗', professional: '✗', enterprise: '✓', custom: '✓' },
                    { feature: 'SLA Guarantee', starter: '✗', professional: '✗', enterprise: '✓', custom: '✓' }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-6 font-medium text-slate-900">{row.feature}</td>
                      <td className="p-6 text-center">{row.starter}</td>
                      <td className="p-6 text-center">{row.professional}</td>
                      <td className="p-6 text-center">{row.enterprise}</td>
                      <td className="p-6 text-center">{row.custom}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-slate-50">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-slate-700 max-w-2xl mx-auto">
                  Common questions about our pricing and plans
                </p>
              </div>
            </Reveal>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {[
                  {
                    question: "Can I switch plans anytime?",
                    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
                  },
                  {
                    question: "Is there a free trial available?",
                    answer: "Yes, we offer a 14-day free trial for all paid plans. No credit card required to start."
                  },
                  {
                    question: "What happens if I exceed my device limit?",
                    answer: "You'll receive a notification before reaching your limit. You can either upgrade your plan or purchase additional device credits."
                  },
                  {
                    question: "Do you offer volume discounts?",
                    answer: "Yes, we offer volume discounts for large deployments. Contact our sales team for custom pricing."
                  },
                  {
                    question: "Is my data secure during the erasure process?",
                    answer: "Absolutely. All data is encrypted during transmission and our erasure methods meet international standards including NIST and DoD requirements."
                  }
                ].map((faq, index) => (
                  <Reveal key={index} delayMs={index * 100}>
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-700">{faq.answer}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Join thousands of organizations worldwide who trust DSecure for their data erasure needs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setShowLicenseModal(true)}
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                  >
                    Request Free License
                  </button>
                  <button 
                    onClick={() => setShowPartnershipModal(true)}
                    className="bg-white/20 hover:bg-white/30 border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300"
                  >
                    Become Partner
                  </button>
                  <Link
                    to="/contact"
                    className="bg-white text-emerald-600 hover:bg-slate-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-white">
          <div className="container-responsive">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Trusted by Organizations Worldwide
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                  {[
                    { name: "Fortune 500", count: "50+" },
                    { name: "Government Agencies", count: "100+" },
                    { name: "Healthcare Organizations", count: "200+" },
                    { name: "Financial Institutions", count: "150+" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{stat.count}</div>
                      <div className="text-slate-600">{stat.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {/* License Request Modal */}
      {showLicenseModal && (
        <LicenseForm
          onSubmit={handleLicenseSubmit}
          onClose={() => setShowLicenseModal(false)}
          title="Request Free License - Pricing"
        />
      )}

      {/* Partnership Request Modal */}
      {showPartnershipModal && (
        <PartnershipForm
          onSubmit={handlePartnershipSubmit}
          onClose={() => setShowPartnershipModal(false)}
          title="Partnership Request - Pricing"
        />
      )}
    </>
  );
});

export default PricingAndPlanPage;