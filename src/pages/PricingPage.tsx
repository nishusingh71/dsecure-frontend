import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/auth/AuthContext";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import {
  CheckIcon,
  HoverIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  MobileIcon,
  ServerIcon,
  CloudIcon,
  ShieldIcon,
  DatabaseIcon,
  GearIcon,
  BriefcaseIcon,
} from "@/components/FlatIcons";

export default function PricingPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('pricing')} />
      
      <PricingPageContent />
    </>
  );
}

function PricingPageContent() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // State for expandable sections
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    platform: true,
    capabilities: false,
    reporting: false,
    services: false,
    addons: false,
  });

  // State for tooltips
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Feature descriptions for tooltips
  const featureDescriptions: { [key: string]: string } = {
    "windows-support":
      "Full compatibility with all Windows versions from Windows 7 to Windows 11",
    "linux-support":
      "Support for major Linux distributions including Ubuntu, CentOS, RHEL",
    "macos-support": "Compatible with macOS 10.14 and later versions",
    multilang:
      "User interface and reports available in 17+ languages including English, Spanish, French, German, Japanese, Chinese",
    algorithms:
      "Industry-standard erasure algorithms including DoD 5220.22-M, NIST 800-88, Gutmann method, and SSD-specific Trim/Crypto Erase",
    "file-folder":
      "Securely erase individual files, folders, or directory structures",
    "erase-traces":
      "Remove browsing history, system logs, application data, and other digital traces",
    "free-space":
      "Overwrite unused disk space to prevent recovery of previously deleted files",
    "volume-erase": "Complete erasure of entire disk volumes or partitions",
    "disk-erase":
      "Full device erasure including all partitions and hidden areas",
    scheduled: "Automatic erasure operations on predefined schedules",
    "cloud-storage":
      "Erase files from cloud storage services like Google Drive, Dropbox, OneDrive",
    // Legend tooltips
    "legend-included":
      "✅ Feature is fully included in this plan at no extra cost",
    "legend-not-included":
      "🚫 Feature is not available in this plan - upgrade to access",
    "legend-addon-paid":
      "🔒 Available as paid add-on or upgrade - contact sales for pricing",
    "legend-coming-soon":
      "⏳ Feature coming soon - will be included when released",
    "legend-enterprise-free":
      "Enterprise plan includes free allowances: Disk erasure (1 free), Volume erasure (5 free), Custom installers (5 free), Private cloud (1 free)",
  };

  // Function to add tooltip to legend icons with unique identifiers
  const addLegendTooltip = (
    icon: string,
    tooltipKey: string,
    uniqueId: string
  ) => {
    const uniqueTooltipKey = `${tooltipKey}-${uniqueId}`;
    return (
      <div
        className="relative cursor-help inline-block"
        onMouseEnter={() => showTooltip(uniqueTooltipKey)}
        onMouseLeave={hideTooltip}
      >
        <span>{icon}</span>
        {activeTooltip === uniqueTooltipKey && (
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20 shadow-lg max-w-xs">
            {featureDescriptions[tooltipKey]}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-slate-900 rotate-45"></div>
          </div>
        )}
      </div>
    );
  };

  const showTooltip = (feature: string) => {
    setActiveTooltip(feature);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  const handleChoosePlan = (planTitle: string, planPrice: string) => {
    // Store selected plan in localStorage for later use
    localStorage.setItem(
      "selectedPlan",
      JSON.stringify({
        title: planTitle,
        price: planPrice,
      })
    );

    if (user) {
      // User is already authenticated, go directly to payment
      navigate("/payment");
    } else {
      // User needs to authenticate first, redirect to login with return path
      localStorage.setItem("returnPath", "/payment");
      navigate("/login");
    }
  };

  // const plans = [
  //   {
  //     title: 'Lifetime Demo',
  //     subtitle: 'Local Erasure max 1 file at 1MB',
  //     price: '0',
  //     isPriceNumber: true,
  //     features: [
  //       'Local file erasure up to 1MB',
  //       'No access to cloud services',
  //       'No reports generation',
  //       'Max 1 file per session'
  //     ],
  //     buttonText: 'Download Free',
  //     buttonStyle: 'bg-green-600 hover:bg-green-700 text-white'
  //   },
  //   {
  //     title: 'Basic',
  //     subtitle: 'Local Erasure, No Reports, Limited Cloud',
  //     price: '39',
  //     isPriceNumber: true,
  //     f eatures: [
  //       'Local file erasure up to 1MB',
  //       'Cloud storage: 3 files per session (max 1MB each)',
  //       'No reports generation',
  //       'Extend validity or license count available'
  //     ],
  //     buttonText: 'Customize Plan',
  //     buttonStyle: 'btn-primary'
  //   },
  //   {
  //     title: 'Standard',
  //     subtitle: 'Local Erasure + Reports, Limited Cloud',
  //     price: '89',
  //     isPriceNumber: true,
  //     isPopular: true,
  //     features: [
  //       'Local file erasure',
  //       'Detailed reports generation',
  //       'Cloud storage: 3 files per session (max 1MB each)',
  //       'Extend validity or license count available'
  //     ],
  //     buttonText: 'Customize Plan',
  //     buttonStyle: 'btn-primary'
  //   },
  //   {
  //     title: 'Cloud',
  //     subtitle: 'Unlimited Local Erasure, Cloud Storage',
  //     price: '119',
  //     isPriceNumber: true,
  //     features: [
  //       'Unlimited local file erasure',
  //       '1000 files per session after purchase',
  //       'No file size limit',
  //       '10 cloud storage services (1 free)',
  //       'No reports generation',
  //       'Extend validity or license count available'
  //     ],
  //     buttonText: 'Customize Plan',
  //     buttonStyle: 'btn-primary'
  //   },
  //   {
  //     title: 'Pro',
  //     subtitle: 'Local Erasure + Reports + Unlimited Cloud',
  //     price: '299',
  //     isPriceNumber: true,
  //     features: [
  //       'Unlimited local file erasure',
  //       'Detailed reports generation',
  //       '1000 files per session after purchase',
  //       'No file size limit',
  //       'Unlimited cloud services (5 free)',
  //       'Priority support',
  //       'Extend validity or license count available'
  //     ],
  //     buttonText: 'Customize Plan',
  //     buttonStyle: 'btn-primary'
  //   },
  //   {
  //     title: 'Google Drive',
  //     subtitle: 'Google Drive Integration with Product Activation',
  //     price: '12',
  //     isPriceNumber: true,
  //     features: [
  //       'Product activation required',
  //       '10,000 erases per account',
  //       'Google Drive integration',
  //       'Customizable number of Google accounts',
  //       'Annual subscription',
  //       'Priority support'
  //     ],
  //     buttonText: 'Customize Plan',
  //     buttonStyle: 'btn-primary'
  //   }
  // ];

  return (
    <>
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 w-full overflow-hidden">
      {/* <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Subscription Plans</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Choose the perfect plan for your data erasure needs, from individual users to enterprise solutions.
        </p>
      </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div 
            key={plan.title} 
            className={`relative card hover:border-brand/30 transition-all duration-300 hover:shadow-2xl ${
              plan.isPopular ? 'ring-2 ring-brand shadow-lg' : ''
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-brand text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{plan.subtitle}</p>
              
              <div className="mb-6">
                {plan.isPriceNumber ? (
                  <div>
                    <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                    <span className="text-slate-500 ml-1">/year/per machine</span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                )}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <HoverIcon>
                    {(filled) => <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" filled={filled} />}
                  </HoverIcon>
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                plan.buttonStyle === 'btn-primary' 
                  ? 'btn-primary' 
                  : plan.buttonStyle
              }`}
              onClick={() => handleChoosePlan(plan.title, plan.isPriceNumber ? plan.price : 'Free')}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div> */}

      {/* Free Enterprise Trial Banner */}
      <div className="mt-5 container-app bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 md:p-12 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            🎉 Get 14-Day Enterprise Trial FREE
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Test all Enterprise features on 1 device - No credit card required,
            No purchase needed
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Try Enterprise Free
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* D-SecureErase: Full Feature & Services Sheet */}
      <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100 shadow-lg">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-indigo-200/30 rounded-full blur-2xl translate-y-12 -translate-x-12"></div>

        <div className="relative text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-white/40 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700 uppercase tracking-wider">
              Feature Comparison
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              <span>
                <img
                  src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1759503993/ec8v6wcjdpwgpplobi3w.svg"
                  alt=""
                  className="w-10 h-10 inline-block -mt-1"
                />
              </span>{" "}
              D-SecureErase
            </span>

            <br />
            <span className="text-3xl md:text-4xl text-slate-800">
              Complete Feature & Services Pricing Sheet
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive comparison of all data erasure features across our complete product lineup. 
            Explore detailed capabilities, platform support, enterprise-grade security features,
            and compliance standards for device, network, and cloud erasure solutions.
            <br />
            <span className="text-purple-600 font-medium">
              Professional data sanitization with verifiable compliance reporting • Custom enterprise pricing available
            </span>
          </p>

          {/* Enhanced stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
              <span className="text-sm text-slate-600">6 Service Tiers</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
              <span className="text-sm text-slate-600">75+ Features</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
              <span className="text-sm text-slate-600">Enterprise Ready</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
              <span className="text-sm text-slate-600">NIST Compliant</span>
            </div>
            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40">
              <span className="text-sm text-slate-600">Global Standards</span>
            </div>
          </div>
        </div>

        {/* Platform & OS Support */}
        <div className="mb-6">
          <div
            className="group flex items-center justify-between cursor-pointer p-4 md:p-6 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
            onClick={() => toggleSection("platform")}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0">
                <HoverIcon>
                  {(filled) => (
                    <MobileIcon
                      className="w-5 h-5 md:w-6 md:h-6"
                      filled={filled}
                    />
                  )}
                </HoverIcon>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  Platform & OS Support
                </h3>
                <p className="text-sm text-slate-600 mt-1 hidden md:block">
                  Windows, Linux, macOS compatibility
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <span className="text-xs md:text-sm text-slate-500 px-2 md:px-3 py-1 bg-slate-100 rounded-full border hidden sm:block">
                {expandedSections.platform ? "Hide" : "Show"}
              </span>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                <HoverIcon>
                  {(filled) =>
                    expandedSections.platform ? (
                      <ArrowDownIcon
                        className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                        filled={filled}
                      />
                    ) : (
                      <ArrowRightIcon
                        className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                        filled={filled}
                      />
                    )
                  }
                </HoverIcon>
              </div>
            </div>
          </div>

          {expandedSections.platform && (
            <div className="mt-4">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-hidden rounded-xl border border-slate-200 shadow-lg bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                        <th className="text-left p-3 xl:p-4 font-semibold text-slate-900 min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <span>Feature</span>
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          </div>
                        </th>
                        <th className="text-center p-3 xl:p-4 font-semibold text-slate-900 min-w-[100px]">
                          <div className="flex flex-col items-center">
                            <span>Base</span>
                            <span className="text-xs text-slate-500 font-normal">
                              Starter
                            </span>
                          </div>
                        </th>
                        <th className="text-center p-3 xl:p-4 font-semibold text-slate-900 min-w-[100px]">
                          <div className="flex flex-col items-center">
                            <span>Standard</span>
                            <span className="text-xs text-slate-500 font-normal">
                              Popular
                            </span>
                          </div>
                        </th>
                        <th className="text-center p-3 xl:p-4 font-semibold text-slate-900 min-w-[100px]">
                          <div className="flex flex-col items-center">
                            <span>Cloud</span>
                            <span className="text-xs text-slate-500 font-normal">
                              Remote
                            </span>
                          </div>
                        </th>
                        <th className="text-center p-3 xl:p-4 font-semibold text-slate-900 min-w-[100px]">
                          <div className="flex flex-col items-center">
                            <span>Network</span>
                            <span className="text-xs text-slate-500 font-normal">
                              Scale
                            </span>
                          </div>
                        </th>
                        <th className="text-center p-3 xl:p-4 font-semibold text-slate-900 min-w-[100px]">
                          <div className="flex flex-col items-center">
                            <span>Pro</span>
                            <span className="text-xs text-slate-500 font-normal">
                              Advanced
                            </span>
                          </div>
                        </th>
                        <th className="text-center p-3 xl:p-4 font-semibold text-slate-900 min-w-[120px] bg-gradient-to-r from-purple-50 to-purple-100 border-l-2 border-purple-200">
                          <div className="flex flex-col items-center">
                            <span className="text-purple-800">Enterprise</span>
                            <span className="text-xs text-purple-600 font-normal">
                              Premium
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-4 font-medium text-slate-900">
                          <span>Windows Support</span>
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-lite"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-basic"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-standard"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-pro"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-premium"
                          )}
                        </td>
                        <td className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-l-2 border-purple-200">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-enterprise"
                          )}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-4 font-medium text-slate-900">
                          <span>Linux Support</span>
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "🚫",
                            "legend-not-included",
                            "linux-lite"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-basic"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-standard"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-pro"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-premium"
                          )}
                        </td>
                        <td className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-l-2 border-purple-200">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-enterprise"
                          )}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-4 font-medium text-slate-900">
                          <span>macOS Support</span>
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "🚫",
                            "legend-not-included",
                            "macos-lite"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-basic"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-standard"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-pro"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-premium"
                          )}
                        </td>
                        <td className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-l-2 border-purple-200">
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-enterprise"
                          )}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-4 font-medium text-slate-900">
                          <span>Multi-language UI & Reports (17+)</span>
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-lite"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-basic"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-standard"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-pro"
                          )}
                        </td>
                        <td className="text-center p-4">
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-premium"
                          )}
                        </td>
                        <td className="text-center p-3 xl:p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-l-2 border-purple-200">
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-enterprise"
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h4 className="font-semibold text-slate-900">
                      Windows Support
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Base</div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-lite-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">
                          Standard
                        </div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-basic-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Cloud</div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-standard-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">
                          Network
                        </div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-pro-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Pro</div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-premium-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-xs text-purple-600 mb-1">
                          Enterprise
                        </div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "windows-enterprise-mobile"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h4 className="font-semibold text-slate-900">
                      Linux Support
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Base</div>
                        <div>
                          {addLegendTooltip(
                            "🚫",
                            "legend-not-included",
                            "linux-lite-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">
                          Standard
                        </div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-basic-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Cloud</div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-standard-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">
                          Network
                        </div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-pro-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Pro</div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-premium-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-xs text-purple-600 mb-1">
                          Enterprise
                        </div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "linux-enterprise-mobile"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h4 className="font-semibold text-slate-900">
                      macOS Support
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Base</div>
                        <div>
                          {addLegendTooltip(
                            "🚫",
                            "legend-not-included",
                            "macos-lite-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">
                          Standard
                        </div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-basic-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Cloud</div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-standard-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">
                          Network
                        </div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-pro-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Pro</div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-premium-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-xs text-purple-600 mb-1">
                          Enterprise
                        </div>
                        <div>
                          {addLegendTooltip(
                            "✅",
                            "legend-included",
                            "macos-enterprise-mobile"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                    <h4 className="font-semibold text-slate-900">
                      Multi-language UI & Reports (17+)
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Base</div>
                        <div>
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-lite-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">
                          Standard
                        </div>
                        <div>
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-basic-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Cloud</div>
                        <div>
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-standard-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">
                          Network
                        </div>
                        <div>
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-pro-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="text-xs text-slate-600 mb-1">Pro</div>
                        <div>
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-premium-mobile"
                          )}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-xs text-purple-600 mb-1">
                          Enterprise
                        </div>
                        <div>
                          {addLegendTooltip(
                            "⏳",
                            "legend-coming-soon",
                            "multilang-enterprise-mobile"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Core Erasure Capabilities */}
          <div className="mb-6 mt-2">
            <div
              className="group flex items-center justify-between cursor-pointer p-4 md:p-6 bg-white rounded-xl hover:bg-green-50 transition-all duration-300 border border-slate-200 hover:border-green-300 shadow-sm hover:shadow-md"
              onClick={() => toggleSection("capabilities")}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <HoverIcon>
                    {(filled) => (
                      <ShieldIcon
                        className="w-5 h-5 md:w-6 md:h-6"
                        filled={filled}
                      />
                    )}
                  </HoverIcon>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                    Core Erasure Capabilities
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 hidden md:block">
                    File, folder, disk & algorithm support
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <span className="text-xs md:text-sm text-slate-500 px-2 md:px-3 py-1 bg-slate-100 rounded-full border hidden sm:block">
                  {expandedSections.capabilities ? "Hide" : "Show"}
                </span>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <HoverIcon>
                    {(filled) =>
                      expandedSections.capabilities ? (
                        <ArrowDownIcon
                          className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                          filled={filled}
                        />
                      ) : (
                        <ArrowRightIcon
                          className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                          filled={filled}
                        />
                      )
                    }
                  </HoverIcon>
                </div>
              </div>
            </div>

            {expandedSections.capabilities && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-4 font-semibold text-slate-900">
                        Feature
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Base
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Standard
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Cloud
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Network
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Pro
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900 bg-purple-50">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900">
                        <span>
                          30+ International Algorithms (SSD Trim, Crypto Erase)
                        </span>
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "algorithms-lite"
                        )}
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "algorithms-basic"
                        )}
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "algorithms-standard"
                        )}
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "algorithms-pro"
                        )}
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "algorithms-premium"
                        )}
                      </td>
                      <td className="text-center p-4 bg-purple-50">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "algorithms-enterprise"
                        )}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900">
                        <span>File & Folder Erase</span>
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "file-folder-lite"
                        )}
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "file-folder-basic"
                        )}
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "file-folder-standard"
                        )}
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "file-folder-pro"
                        )}
                      </td>
                      <td className="text-center p-4">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "file-folder-premium"
                        )}
                      </td>
                      <td className="text-center p-4 bg-purple-50">
                        {addLegendTooltip(
                          "✅",
                          "legend-included",
                          "file-folder-enterprise"
                        )}
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Erase Traces (Browser, System, App data)</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("erase-traces")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "erase-traces" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["erase-traces"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Erase Deleted Data / Free Space</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("free-space")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "free-space" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["free-space"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Erase Volume</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("erase-volume")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "erase-volume" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["erase-volume"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">
                        <strong>✅ 5 included</strong>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Erase Disk (Full Device)</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("erase-disk")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "erase-disk" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["erase-disk"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">
                        <strong>✅ 1 included</strong>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Scheduled Erase</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("scheduled-erase")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "scheduled-erase" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["scheduled-erase"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        ✅{" "}
                        <span className="text-xs text-slate-600">
                          (only file/folder)
                        </span>
                      </td>
                      <td className="text-center p-4">
                        ✅{" "}
                        <span className="text-xs text-slate-600">
                          (expanded)
                        </span>
                      </td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>
                            Cloud Storage Erase (Google Drive, others coming
                            soon)
                          </span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("cloud-storage")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "cloud-storage" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["cloud-storage"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Reporting & Compliance */}
          <div className="mb-6">
            <div
              className="group flex items-center justify-between cursor-pointer p-4 md:p-6 bg-white rounded-xl hover:bg-purple-50 transition-all duration-300 border border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-md"
              onClick={() => toggleSection("reporting")}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <HoverIcon>
                    {(filled) => (
                      <DatabaseIcon
                        className="w-5 h-5 md:w-6 md:h-6"
                        filled={filled}
                      />
                    )}
                  </HoverIcon>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    Reporting & Compliance
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 hidden md:block">
                    Audit trails, certificates & compliance reports
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <span className="text-xs md:text-sm text-slate-500 px-2 md:px-3 py-1 bg-slate-100 rounded-full border hidden sm:block">
                  {expandedSections.reporting ? "Hide" : "Show"}
                </span>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <HoverIcon>
                    {(filled) =>
                      expandedSections.reporting ? (
                        <ArrowDownIcon
                          className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                          filled={filled}
                        />
                      ) : (
                        <ArrowRightIcon
                          className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                          filled={filled}
                        />
                      )
                    }
                  </HoverIcon>
                </div>
              </div>
            </div>

            {expandedSections.reporting && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-4 font-semibold text-slate-900">
                        Feature
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Base
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Standard
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Cloud
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Network
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Pro
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900 bg-purple-50">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Local PDF Reports</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("pdf-reports")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "pdf-reports" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["pdf-reports"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>White-Label Reports</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("white-label")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "white-label" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["white-label"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Cloud Report Upload/Sync</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("cloud-sync")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "cloud-sync" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["cloud-sync"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">
                        ✅{" "}
                        <span className="text-xs text-slate-600">(slow)</span>
                      </td>
                      <td className="text-center p-4">
                        ✅{" "}
                        <span className="text-xs text-slate-600">
                          (improved)
                        </span>
                      </td>
                      <td className="text-center p-4">
                        ✅{" "}
                        <span className="text-xs text-slate-600">(fast)</span>
                      </td>
                      <td className="text-center p-4 bg-purple-50">
                        ✅{" "}
                        <span className="text-xs text-slate-600">
                          (fastest)
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>XML Report Format</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("xml-format")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "xml-format" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["xml-format"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">⏳</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Audit-Grade Compliance Certificates</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("compliance-certs")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "compliance-certs" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["compliance-certs"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>User/Action Logs</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("action-logs")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "action-logs" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["action-logs"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Services & Management */}
          <div className="mb-6">
            <div
              className="group flex items-center justify-between cursor-pointer p-4 md:p-6 bg-white rounded-xl hover:bg-orange-50 transition-all duration-300 border border-slate-200 hover:border-orange-300 shadow-sm hover:shadow-md"
              onClick={() => toggleSection("services")}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <HoverIcon>
                    {(filled) => (
                      <GearIcon
                        className="w-5 h-5 md:w-6 md:h-6"
                        filled={filled}
                      />
                    )}
                  </HoverIcon>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-orange-700 transition-colors">
                    Services & Management
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 hidden md:block">
                    Support, deployment & cloud services
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <span className="text-xs md:text-sm text-slate-500 px-2 md:px-3 py-1 bg-slate-100 rounded-full border hidden sm:block">
                  {expandedSections.services ? "Hide" : "Show"}
                </span>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <HoverIcon>
                    {(filled) =>
                      expandedSections.services ? (
                        <ArrowDownIcon
                          className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                          filled={filled}
                        />
                      ) : (
                        <ArrowRightIcon
                          className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                          filled={filled}
                        />
                      )
                    }
                  </HoverIcon>
                </div>
              </div>
            </div>

            {expandedSections.services && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-4 font-semibold text-slate-900">
                        Feature / Service
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Base
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Standard
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Cloud
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Network
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Pro
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900 bg-purple-50">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Web Dashboard</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("web-dashboard")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "web-dashboard" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["web-dashboard"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">Limited</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Cloud Commands (Remote Jobs)</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("cloud-commands")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "cloud-commands" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["cloud-commands"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Custom Installer (auto-register machine)</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("custom-installer")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "custom-installer" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["custom-installer"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">
                        ✅{" "}
                        <span className="text-xs text-slate-600">
                          1 free + add-on
                        </span>
                      </td>
                      <td className="text-center p-4 bg-purple-50">
                        <strong>✅ 5 free + add-on</strong>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Sub-User Management</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("sub-user")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "sub-user" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["sub-user"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        🔒{" "}
                        <span className="text-xs text-slate-600">
                          (profiles only)
                        </span>
                      </td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">🔒</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Private Cloud Support</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("private-cloud")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "private-cloud" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["private-cloud"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">
                        ✅{" "}
                        <span className="text-xs text-slate-600">
                          1 free + add-on
                        </span>
                      </td>
                      <td className="text-center p-4 bg-purple-50">
                        <strong>✅ 1 free + add-on</strong>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Multi-Level User Logs</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("multi-level-logs")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "multi-level-logs" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["multi-level-logs"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>White-Label Dashboard</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("white-label-dash")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "white-label-dash" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["white-label-dash"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4">✅</td>
                      <td className="text-center p-4 bg-purple-50">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add-On / Optional Customization */}
          <div className="mb-6">
            <div
              className="group flex items-center justify-between cursor-pointer p-4 md:p-6 bg-white rounded-xl hover:bg-indigo-50 transition-all duration-300 border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md"
              onClick={() => toggleSection("addons")}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <HoverIcon>
                    {(filled) => (
                      <BriefcaseIcon
                        className="w-5 h-5 md:w-6 md:h-6"
                        filled={filled}
                      />
                    )}
                  </HoverIcon>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    Add-On / Optional Customization
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 hidden md:block">
                    Custom features, integrations & premium options
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                <span className="text-xs md:text-sm text-slate-500 px-2 md:px-3 py-1 bg-slate-100 rounded-full border hidden sm:block">
                  {expandedSections.addons ? "Hide" : "Show"}
                </span>
                <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <HoverIcon>
                    {(filled) =>
                      expandedSections.addons ? (
                        <ArrowDownIcon
                          className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                          filled={filled}
                        />
                      ) : (
                        <ArrowRightIcon
                          className="w-4 h-4 md:w-5 md:h-5 text-slate-600 transition-transform duration-300"
                          filled={filled}
                        />
                      )
                    }
                  </HoverIcon>
                </div>
              </div>
            </div>

            {expandedSections.addons && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left p-4 font-semibold text-slate-900">
                        Feature
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Base
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Standard
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Cloud
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Network
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900">
                        Pro
                      </th>
                      <th className="text-center p-4 font-semibold text-slate-900 bg-purple-50">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Additional Disk Erasure Licenses</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("disk-licenses")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "disk-licenses" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["disk-licenses"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">🔒</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Additional Volume Erasure Licenses</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("volume-licenses")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "volume-licenses" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["volume-licenses"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">🔒</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Extra Custom Installer Packages</span>
                          <div
                            className="relative"
                            onMouseEnter={() =>
                              showTooltip("installer-packages")
                            }
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "installer-packages" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["installer-packages"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">🔒</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Extra Sub-Users</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("extra-users")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "extra-users" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["extra-users"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">🔒</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Extra Private Clouds</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("extra-clouds")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "extra-clouds" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["extra-clouds"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🚫</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">🔒</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>
                            Bespoke Integrations (SIEM, IT tools, etc.)
                          </span>
                          <div
                            className="relative"
                            onMouseEnter={() =>
                              showTooltip("bespoke-integrations")
                            }
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "bespoke-integrations" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["bespoke-integrations"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">🔒</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-900 relative">
                        <div className="flex items-center gap-2">
                          <span>Dedicated SLA/Support Manager</span>
                          <div
                            className="relative"
                            onMouseEnter={() => showTooltip("sla-support")}
                            onMouseLeave={hideTooltip}
                          >
                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full text-xs flex items-center justify-center cursor-help">
                              ?
                            </span>
                            {activeTooltip === "sla-support" && (
                              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10 shadow-lg max-w-xs">
                                {featureDescriptions["sla-support"]}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4">🔒</td>
                      <td className="text-center p-4 bg-purple-50">🔒</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Legend */}
          {/* <div className="bg-slate-100 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-slate-900 mb-4">Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-600">✅</span>
              <span>Included</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🚫</span>
              <span>Not Included</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Add-on / Paid</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-600">⏳</span>
              <span>Coming Soon</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-4">
            <strong>Bold</strong> = Enterprise free allowances to highlight promotional value
          </p>
        </div> */}

          {/* CTA Buttons */}
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
              <Link to="/contact" className="btn-secondary text-center">
                Base Plan - Contact Sales
              </Link>
              <Link to="/contact" className="btn-secondary text-center">
                Standard Plan - Contact Sales
              </Link>
              <Link to="/contact" className="btn-secondary text-center">
                Cloud Plan - Contact Sales
              </Link>
              <Link to="/contact" className="btn-secondary text-center">
                Network Plan - Contact Sales
              </Link>
              <Link to="/contact" className="btn-secondary text-center">
                Pro Plan - Contact Sales
              </Link>
              <Link
                to="/contact"
                className="btn-primary bg-purple-600 hover:bg-purple-700 text-center"
              >
                Enterprise - Contact Sales
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Request Custom Quote
              </Link>
              <Link
                to="/contact"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Try Enterprise Free for 1 Device (14 Days)
              </Link>
            </div>
          </div>
        </div>

        <div className="container-app text-center mt-12 mb-10">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold mb-4">
              🎉 Limited Time: 14-Day Enterprise Trial
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Test all Enterprise features FREE on 1 device - No credit card, No
              purchase required
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
              >
                🚀 Try Enterprise Free (14 Days)
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                📞 Contact Sales Team
              </Link>
            </div>
          </div>

          <p className="text-slate-600 mb-4">
            Need a custom solution for your enterprise?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              <Link to="/contact">Request Custom Quote</Link>
            </button>
            <button className="btn-secondary">
              <Link to="/contact">Schedule Consultation</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
