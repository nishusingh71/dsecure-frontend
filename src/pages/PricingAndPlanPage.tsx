import React, { useState, memo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import CustomLicenseModal, {
  CustomLicenseData,
} from "../components/CustomLicenseModal";
import { useToast } from "@/hooks";
import { Toast } from "@/components/ui";
import { ProductImage } from "@/components/ProductImage";
import { getProductIcon } from "@/utils/productIcons";

const PricingAndPlanPage: React.FC = memo(() => {
  const { toast, showToast, hideToast } = useToast();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("drive-eraser");
  const [selectedLicenses, setSelectedLicenses] = useState("10");
  const [selectedYears, setSelectedYears] = useState("1");
  const [selectedOS, setSelectedOS] = useState("Select");
  const [deliveryMethod, setDeliveryMethod] = useState("electronic");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [showCustomModal, setShowCustomModal] = useState(false);
  
  // File Eraser Add-ons State
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // File Eraser Add-ons Configuration
  const fileEraserAddons = [
    {
      id: "command-jobs",
      name: "Command Jobs Feature",
      description: "Automated command-line job scheduling and execution",
      price: 29.99,
      // icon: "⚡"
    },
    {
      id: "private-cloud",
      name: "Private Cloud Integration",
      description: "Secure private cloud storage and backup capabilities",
      price: 49.99,
      // icon: "☁️"
    },
    {
      id: "enterprise",
      name: "Enterprise Management",
      description: "Advanced enterprise-grade management and reporting tools",
      price: 99.99,
      // icon: "🏢"
    },
    {
      id: "network",
      name: "Network Management",
      description: "Network-wide deployment and centralized control",
      price: 79.99,
      // icon: "🌐"
    }
  ];

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const categories = [
    {
      id: "drive-eraser",
      name: "Drive Eraser",
      subtitle: "Erase HDDs, SSDs in PCs, Mac & Servers",
    },
    {
      id: "file-eraser",
      name: "File Eraser",
      subtitle: "Erase Files, Folders & Volumes",
    },
  ];

  // Dynamic pricing calculation
  const calculatePrice = (
    category: string,
    licenses: string,
    years: string,
    addons: string[] = []
  ) => {
    const basePrices: { [key: string]: number } = {
      "drive-eraser": 9.9,
      "file-eraser": 3.99,
    };

    const basePrice = basePrices[category] || 9.9;
    const licenseCount = licenses === "custom" ? 0 : parseInt(licenses);
    const yearCount = parseInt(years);

    // Volume discounts
    let discount = 1;
    if (licenseCount >= 100) discount = 0.8;
    else if (licenseCount >= 50) discount = 0.85;
    else if (licenseCount >= 25) discount = 0.9;

    // Multi-year discounts
    let yearDiscount = 1;
    if (yearCount >= 3) yearDiscount = 0.85;
    else if (yearCount >= 2) yearDiscount = 0.9;

    let baseTotal = Math.round(
      basePrice * licenseCount * yearCount * discount * yearDiscount * 100
    ) / 100;

    // Add-ons pricing (only for File Eraser)
    if (category === "file-eraser" && addons.length > 0) {
      const addonsCost = addons.reduce((total, addonId) => {
        const addon = fileEraserAddons.find(a => a.id === addonId);
        return total + (addon ? addon.price * licenseCount * yearCount : 0);
      }, 0);
      baseTotal += Math.round(addonsCost * discount * yearDiscount * 100) / 100;
    }

    return baseTotal;
  };

  const productData = {
    "drive-eraser": {
      title: "D-Secure Drive Eraser",
      subtitle:
        "Secure Data Erasure Software for HDD, SSD, PC, Laptop, Mac, Chromebook & Server",
      image: getProductIcon("drive-eraser", 64),
      imageCategory: "drive-eraser",
      version: "V9.0.9.1 Enterprise",
      basePrice: 9.9,
      features: [
        " NIST & DoD Compliant Erasure Standards",
        " Free Cloud Console & Reporting",
        " Lifetime Technical Support",
        " Works on All Device Types",
        " Detailed Audit Reports",
      ],
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay Per License)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "300",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: true,
    },
    "file-eraser": {
      title: "D-Secure File Eraser Professional",
      subtitle: "Complete File, Folder & Application Trace Elimination",
      image: getProductIcon("file-eraser", 64),
      imageCategory: "file-eraser",
      version: "Professional",
      basePrice: 3.99,
      features: [
        " Files, Folders & System Traces",
        " Cross-Platform Support",
        " Fast & Efficient Processing",
        " Scheduled Automatic Cleaning",
        " Privacy Protection Tools",
      ],
      selectionLabel: "Number of Licenses:",
      selectionNote: "(Pay Per License)",
      options: [
        "1",
        "10",
        "25",
        "50",
        "100",
        "250",
        "300",
        "500",
        "1000",
        "custom",
      ],
      showDeliveryOptions: false,
      deliveryText:
        "Digital download with instant activation. Internet connection required for initial setup.",
    },
  };

  const getCurrentProduct = () =>
    productData[selectedCategory as keyof typeof productData];

  const getDisplayPrice = () => {
    if (selectedLicenses === "custom") return "Custom Quote";

    const totalPrice = calculatePrice(
      selectedCategory,
      selectedLicenses,
      selectedYears,
      selectedCategory === "file-eraser" ? selectedAddons : []
    );
    return `$${totalPrice.toFixed(2)}`;
  };

  const getPriceSubtitle = () => {
    if (selectedLicenses === "custom") return "Get Personalized Quote";

    const yearText = selectedYears === "1" ? "year" : "years";
    return `${selectedLicenses} licenses × ${selectedYears} ${yearText}`;
  };

  const getPriceNote = () => {
    if (selectedLicenses === "custom") return "Tailored to your needs";

    const basePrice = getCurrentProduct().basePrice;
    const yearText =
      selectedYears === "1" ? "/license/year" : `/license/${selectedYears}yr`;
    
    let note = `Starting @ $${basePrice.toFixed(2)}${yearText}`;
    
    // Add add-ons pricing info for File Eraser
    if (selectedCategory === "file-eraser" && selectedAddons.length > 0) {
      const addonsTotal = selectedAddons.reduce((total, addonId) => {
        const addon = fileEraserAddons.find(a => a.id === addonId);
        return total + (addon ? addon.price : 0);
      }, 0);
      note += ` + $${addonsTotal.toFixed(2)}${yearText} (add-ons)`;
    }
    
    return note;
  };

  const handleCustomLicenseSubmit = (data: CustomLicenseData) => {
    // In a real app, this would send to your API
    console.log("Custom license request:", data);
    // For now, just show a success message or redirect
    showToast(
      "Thank you! We will contact you within 24 hours with a custom quote.",
      "success"
    );
    setShowCustomModal(false);
  };

  const handleBuyNow = () => {
    if (selectedLicenses === "custom") {
      setShowCustomModal(true);
      return;
    }

    const paymentData = {
      productName: getCurrentProduct().title,
      productImage: getCurrentProduct().image,
      productImageCategory: getCurrentProduct().imageCategory,
      productVersion: getCurrentProduct().version,
      quantity: selectedLicenses,
      duration: selectedYears,
      unitPrice: getCurrentProduct().basePrice,
      totalPrice: calculatePrice(
        selectedCategory,
        selectedLicenses,
        selectedYears,
        selectedCategory === "file-eraser" ? selectedAddons : []
      ),
      deliveryMethod: deliveryMethod,
      features: getCurrentProduct().features,
      category: selectedCategory,
      // Add file eraser specific data
      ...(selectedCategory === "file-eraser" && {
        selectedAddons: selectedAddons,
        addonsData: selectedAddons.map(addonId => 
          fileEraserAddons.find(addon => addon.id === addonId)
        ).filter(Boolean)
      })
    };

    // Store payment data in localStorage for the payment page
    localStorage.setItem("paymentData", JSON.stringify(paymentData));

    // Navigate directly to payment page without login requirement
    navigate("/checkout");
  };

  const faqs = [
    {
      question: "How do I get my License?",
      answer:
        "Each product license is assigned based on the number of devices you choose. You will receive login credentials to access D-Secure Cloud and the necessary installation files after your order is confirmed. The total number of licenses will correspond to the number of devices selected during purchase. Once the order is confirmed, your product access details will be delivered instantly.",
    },
    {
      question: "If I order 1000 licenses, how many drives can I wipe?",
      answer:
        "Each license allows you to wipe one drive. So with 1000 licenses, you can wipe 1000 drives.",
    },
    {
      question: "Are there any shipping charges?",
      answer:
        "We offer FREE shipping for all physical deliveries worldwide. For digital delivery, you receive instant access via email.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and purchase orders for enterprise customers.",
    },
    {
      question: "Do you offer volume discounts?",
      answer:
        "Yes! We offer automatic volume discounts: 10% off for 25+ licenses, 15% off for 50+ licenses, and 20% off for 100+ licenses. Contact us for custom pricing on larger orders.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "All licenses include lifetime technical support via email, phone, and live chat. Enterprise customers receive priority support with dedicated account managers.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          Pricing & Plans - D-Secure Data Erasure Software | Professional
          Licenses
        </title>
        <meta
          name="description"
          content="Choose the perfect D-Secure data erasure license plan. Drive Eraser, Admin Console, Mobile Eraser & File Eraser. Volume discounts available. Free shipping worldwide."
        />
        <meta
          name="keywords"
          content="data erasure pricing, secure delete software cost, NIST compliant erasure license, enterprise data wiping plans"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
               SECURE • COMPLIANT
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                D-Secure
              </span>{" "}
              License
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional data erasure solutions trusted by enterprises
              worldwide. NIST & DoD compliant with lifetime support and instant
              deployment.
            </p>
          </div>

          {/* Category Selection */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    // Reset add-ons when switching away from file-eraser
                    if (category.id !== "file-eraser") {
                      setSelectedAddons([]);
                    }
                  }}
                  className={`p-6 rounded-xl text-left transition-all duration-300 border-2 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-br from-teal-500 to-teal-600 text-white border-teal-500 shadow-xl transform scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:border-teal-300 hover:shadow-lg hover:scale-102"
                  }`}
                >
                  <h3 className="font-semibold text-sm mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs opacity-90">{category.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Product Image and Info */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-6">
                  {/* Enhanced Product Image */}
                  <ProductImage
                    category={selectedCategory}
                    productName={getCurrentProduct().title}
                    version={getCurrentProduct().version}
                    size="large"
                    className="flex-shrink-0"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {getCurrentProduct().title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {getCurrentProduct().subtitle}
                    </p>

                    {/* Features */}
                    {getCurrentProduct().features.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {getCurrentProduct().features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <svg
                              className="w-5 h-5 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Selection Criteria */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                         Configure Your License
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* License Quantity */}
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            {getCurrentProduct().selectionLabel}
                          </label>
                          {getCurrentProduct().selectionNote && (
                            <p className="text-xs text-gray-500">
                              {getCurrentProduct().selectionNote}
                            </p>
                          )}
                          <select
                            value={selectedLicenses}
                            onChange={(e) =>
                              setSelectedLicenses(e.target.value)
                            }
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white text-gray-900 font-medium shadow-sm hover:border-gray-400"
                          >
                            {getCurrentProduct().options.map((option) => (
                              <option key={option} value={option}>
                                {option === "custom"
                                  ? " Custom Quantity"
                                  : `${option} licenses`}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* License Duration */}
                        {/* <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                             License Duration:
                          </label>
                          <p className="text-xs text-gray-500">
                            Multi-year discounts available
                          </p>
                          <select
                            value={selectedYears}
                            onChange={(e) => setSelectedYears(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all bg-white text-gray-900 font-medium shadow-sm hover:border-gray-400"
                          >
                            <option value="1">1 Year</option>
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                            <option value="5">5 Years</option>
                            <option value="15">15 Years</option>
                          </select>
                        </div> */}
                      </div>
                    </div>

                    {/* File Eraser Add-ons */}
                    {selectedCategory === "file-eraser" && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                           Premium Add-ons
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Enhance your File Eraser with powerful additional features
                        </p>
                        <div className="space-y-3">
                          {fileEraserAddons.map((addon) => (
                            <label key={addon.id} className="flex items-start space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-teal-300 transition-colors cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedAddons.includes(addon.id)}
                                onChange={() => handleAddonToggle(addon.id)}
                                className="mt-1 text-teal-500 focus:ring-teal-500 h-4 w-4"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">{}</span>
                                  <span className="font-medium text-gray-900">{addon.name}</span>
                                  <span className="text-sm font-semibold text-teal-600">
                                    +${addon.price}/license
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {addon.description}
                                </p>
                              </div>
                            </label>
                          ))}
                        </div>
                        {selectedAddons.length > 0 && (
                          <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                            <p className="text-sm text-teal-700">
                              <strong>Selected Add-ons:</strong> {selectedAddons.length} item{selectedAddons.length > 1 ? 's' : ''} selected
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Delivery Options */}
                    {getCurrentProduct().showDeliveryOptions ? (
                      <div>
                        {/* <label className="block text-sm font-medium text-gray-700 mb-3">
                          Number of License Count for per device.
                        </label>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          if you purchase more than 3 year plus plan then only cover minor updates.
                          </label> */}
                        {/* <div className="space-y-3">
                          <label className="flex items-start space-x-3">
                            <input
                              type="radio"
                              value="electronic"
                              checked={deliveryMethod === "electronic"}
                              onChange={(e) =>
                                setDeliveryMethod(e.target.value)
                              }
                              className="mt-1 text-teal-500 focus:ring-teal-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                Electronic Delivery
                              </div>
                              <div className="text-sm text-gray-600">
                                You will get license through a downloadable link
                                via email.
                              </div>
                            </div>
                          </label>
                          <label className="flex items-start space-x-3">
                            <input
                              type="radio"
                              value="physical"
                              checked={deliveryMethod === "physical"}
                              onChange={(e) =>
                                setDeliveryMethod(e.target.value)
                              }
                              className="mt-1 text-teal-500 focus:ring-teal-500"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                Physical Delivery
                              </div>
                              <div className="text-sm text-gray-600">
                                Receive bootable USB device without internet
                                connectivity for PCs, laptops, and servers.
                              </div>
                            </div>
                          </label>
                        </div> */}
                      </div>
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="text-sm text-blue-800">
                          {(getCurrentProduct() as any).deliveryText ||
                            "Digital delivery via email"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Pricing Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-blue-100 sticky top-8">
                {/* Price Display */}
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent mb-3">
                    {getDisplayPrice()}
                  </div>
                  <div className="text-sm text-teal-500 font-semibold bg-teal-50 px-3 py-1 rounded-full inline-block mb-2">
                    {getPriceSubtitle()}
                  </div>
                  <div className="text-xs text-gray-500">{getPriceNote()}</div>
                </div>

                {/* Action Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-6 text-lg"
                >
                  {selectedLicenses === "custom"
                    ? " Request Custom Quote"
                    : " Buy Now"}
                </button>

                {/* Trust Indicators */}
                <div className="space-y-3 text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Free worldwide shipping</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Instant activation & support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* OS Compatibility */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="text-center">
              <span className="text-blue-700 font-medium">
                 OS Compatibility: Windows, Mac, Linux, DOS & Chrome OS | 
                Certified: NIST SP 800-88, DoD 5220.22-M, Common Criteria | 
                Instant Delivery Available
              </span>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
               Frequently Asked Questions
            </h2>
            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                    className="w-full px-6 py-4 text-left font-semibold text-gray-900 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        expandedFaq === index ? "rotate-180" : ""
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 text-gray-700 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Toast Component */}
        {toast && <Toast toast={toast} onClose={hideToast} />}

        {/* Custom License Modal */}
        {showCustomModal && (
          <CustomLicenseModal
            onSubmit={handleCustomLicenseSubmit}
            onClose={() => setShowCustomModal(false)}
            isOpen={showCustomModal}
            productName={getCurrentProduct().title}
          />
        )}
      </div>
    </>
  );
});

export default PricingAndPlanPage;
