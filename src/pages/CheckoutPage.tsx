import React, { useState, useEffect, memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets, getOptimizedImageUrl } from '@/utils/cloudinary';
import { ProductImage } from '@/components/ProductImage';
import { useNotification } from "@/contexts/NotificationContext";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';

interface PaymentData {
  productName: string;
  productImage: string;
  productImageCategory: string;
  productVersion: string;
  quantity: string;
  duration: string;
  unitPrice: number;
  totalPrice: number;
  deliveryMethod: string;
  features: string[];
  category: string;
  planName?: string;
  planDescription?: string;
  planCategory?: string;
  selectedAddons?: string[];
  addonsData?: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    icon: string;
  }>;
}

const CheckoutPage = memo(function CheckoutPage() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    country: 'United States',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get query params for prefilled data (from license renewal)
    const searchParams = new URLSearchParams(window.location.search);
    const isRenew = searchParams.get('renew') === 'true';

    // Prefill customer info from query params (for license renewal)
    const prefillFirstName = searchParams.get('firstName') || '';
    const prefillLastName = searchParams.get('lastName') || '';
    const prefillEmail = searchParams.get('email') || '';
    const prefillPhone = searchParams.get('phone') || '';
    const prefillCompany = searchParams.get('company') || '';

    // If any prefill data exists, update customer info
    if (prefillFirstName || prefillLastName || prefillEmail || prefillPhone || prefillCompany) {
      setCustomerInfo(prev => ({
        ...prev,
        firstName: prefillFirstName || prev.firstName,
        lastName: prefillLastName || prev.lastName,
        email: prefillEmail || prev.email,
        phone: prefillPhone || prev.phone,
        company: prefillCompany || prev.company,
      }));
    }

    // Retrieve payment data from localStorage
    const savedPaymentData = localStorage.getItem('paymentData');
    if (savedPaymentData) {
      setPaymentData(JSON.parse(savedPaymentData));
    } else if (isRenew) {
      // Get plan type, licenses, and price from query params
      const planType = searchParams.get('planType') || 'Standard';
      const licenses = searchParams.get('licenses') || '1';
      const price = parseFloat(searchParams.get('price') || '99');
      const validityYears = searchParams.get('validityYears') || '1';

      // Determine product category based on plan type
      let category = 'file-eraser';
      let productName = 'D-Secure File Eraser';
      if (planType.toLowerCase().includes('drive')) {
        category = 'drive-eraser';
        productName = 'D-Secure Drive Eraser';
      } else if (planType.toLowerCase().includes('enterprise') || planType.toLowerCase().includes('pro')) {
        productName = `D-Secure ${planType}`;
      }

      // Calculate total price based on licenses and validity
      const unitPrice = price > 0 ? price : 99; // Default $99/license if no price
      const totalPrice = unitPrice * parseInt(licenses) * parseInt(validityYears);

      // For license renewal, create payment data based on user's current plan
      setPaymentData({
        productName: `${productName} - License Renewal`,
        productImage: '',
        productImageCategory: category,
        productVersion: 'D-Secure Suite',
        quantity: licenses,
        duration: validityYears,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        deliveryMethod: 'Digital',
        features: ['INCLUDED: License Renewal', 'INCLUDED: Extended Support', 'INCLUDED: Priority Updates'],
        category: category,
        planName: planType,
        planDescription: `Renewing ${licenses} license(s) for ${planType} plan`,
      });
    } else {
      // Redirect back to pricing and plan if no payment data
      navigate('/pricing-and-plan');
    }
  }, [navigate]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      showError('Terms Required', 'Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    try {
      // Here you would integrate with actual payment processor
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store order data
      const orderData = {
        orderId: `DSC-${Date.now()}`,
        ...paymentData,
        customer: customerInfo,
        paymentMethod,
        status: 'confirmed',
        orderDate: new Date().toISOString()
      };

      localStorage.setItem('orderData', JSON.stringify(orderData));
      localStorage.removeItem('paymentData');

      // Navigate to success page
      navigate('/order-success');

    } catch (error) {
      showError('Payment Failed', 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!paymentData) {
    return (
      <>
        <SEOHead seo={getSEOForPage('checkout')} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead seo={getSEOForPage('checkout')} />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-gray-600">Complete your D-Secure purchase in just a few steps</p>
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-green-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>256-bit SSL Encryption</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Product Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-4">
                    {/* Enhanced Product Image */}
                    <ProductImage
                      category={paymentData.productImageCategory || paymentData.category}
                      productName={paymentData.productName}
                      version={paymentData.productVersion}
                      size="medium"
                      className="flex-shrink-0"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{paymentData.productName}</h3>
                      <p className="text-sm text-gray-500">{paymentData.productVersion}</p>
                      {paymentData.planName && paymentData.category !== "drive-eraser" && (
                        <div className="mt-1">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                            {paymentData.planName}
                          </span>
                          {paymentData.planCategory && (
                            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium ml-1">
                              {paymentData.planCategory}
                            </span>
                          )}
                        </div>
                      )}
                      <p className="text-sm text-gray-600 mt-1">
                        {paymentData.quantity} licenses × {paymentData.duration} year{parseInt(paymentData.duration) > 1 ? 's' : ''}
                      </p>
                      {paymentData.category === "file-eraser" && paymentData.planDescription && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          {paymentData.planDescription}
                        </p>
                      )}
                      {paymentData.category === "drive-eraser" && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          Secure drive wiping with military-grade overwriting standards
                        </p>
                      )}
                    </div>
                  </div>

                  {/* License Quantity Selector - For Renewal */}
                  {new URLSearchParams(window.location.search).get('renew') === 'true' && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Customize Your Renewal</h4>
                      <div className="space-y-3">
                        {/* License Count */}
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-700">Number of Licenses:</label>
                          <select
                            value={paymentData.quantity}
                            onChange={(e) => {
                              const newQty = e.target.value;
                              setPaymentData(prev => prev ? {
                                ...prev,
                                quantity: newQty,
                                totalPrice: prev.unitPrice * parseInt(newQty) * parseInt(prev.duration),
                                planDescription: `Renewing ${newQty} license(s) for ${prev.planName} plan`,
                              } : null);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            {[1, 2, 3, 5, 10, 15, 20, 25, 50, 100].map(n => (
                              <option key={n} value={String(n)}>{n} License{n > 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        </div>

                        {/* Duration */}
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-700">Renewal Duration:</label>
                          <select
                            value={paymentData.duration}
                            onChange={(e) => {
                              const newDuration = e.target.value;
                              setPaymentData(prev => prev ? {
                                ...prev,
                                duration: newDuration,
                                totalPrice: prev.unitPrice * parseInt(prev.quantity) * parseInt(newDuration),
                              } : null);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="1">1 Year</option>
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                          </select>
                        </div>

                        {/* Upgrade Link */}
                        <div className="pt-2">
                          <a
                            href="/pricing-and-plan"
                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            Upgrade to a different plan
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add-ons Section */}
                  {paymentData.addonsData && paymentData.addonsData.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Premium Add-ons:</h4>
                      <div className="space-y-3">
                        {paymentData.addonsData.map((addon) => (
                          <div key={addon.id} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-100">
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{addon.icon}</span>
                              <div>
                                <p className="font-medium text-gray-900">{addon.name}</p>
                                <p className="text-xs text-gray-600">{addon.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-teal-600">
                                ${addon.price}/license
                              </p>
                              <p className="text-xs text-gray-500">
                                ${(addon.price * parseInt(paymentData.quantity) * parseInt(paymentData.duration)).toLocaleString()} total
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    {/* Base Product Pricing */}
                    <div className="flex justify-between text-sm">
                      <span>Base Product ({paymentData.quantity} licenses × {paymentData.duration} term{parseInt(paymentData.duration) > 1 ? 's' : ''}):</span>
                      <span>${(paymentData.unitPrice * parseInt(paymentData.quantity) * parseInt(paymentData.duration)).toLocaleString()}</span>
                    </div>

                    {/* Add-ons Pricing */}
                    {paymentData.addonsData && paymentData.addonsData.length > 0 && (
                      <div className="space-y-1 mt-1">
                        {paymentData.addonsData.map((addon) => (
                          <div key={addon.id} className="flex justify-between text-sm text-teal-600">
                            <span>{addon.name} ({paymentData.quantity} licenses × {paymentData.duration} term{parseInt(paymentData.duration) > 1 ? 's' : ''}):</span>
                            <span>+${(addon.price * parseInt(paymentData.quantity) * parseInt(paymentData.duration)).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Calculate subtotal including add-ons */}
                    {(() => {
                      const baseTotal = paymentData.unitPrice * parseInt(paymentData.quantity) * parseInt(paymentData.duration);
                      const addonsTotal = paymentData.addonsData ?
                        paymentData.addonsData.reduce((total, addon) =>
                          total + (addon.price * parseInt(paymentData.quantity) * parseInt(paymentData.duration)), 0
                        ) : 0;
                      const subtotal = baseTotal + addonsTotal;

                      return (
                        <>
                          {paymentData.addonsData && paymentData.addonsData.length > 0 && (
                            <div className="flex justify-between text-sm font-medium border-t pt-2 mt-2">
                              <span>Subtotal:</span>
                              <span>${subtotal.toLocaleString()}</span>
                            </div>
                          )}

                          {paymentData.totalPrice < subtotal && (
                            <div className="flex justify-between text-sm text-green-600">
                              <span>Volume/Multi-term Discount:</span>
                              <span>-${(subtotal - paymentData.totalPrice).toLocaleString()}</span>
                            </div>
                          )}
                        </>
                      );
                    })()}
                    <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                      <span>Total:</span>
                      <span className="text-blue-600">${paymentData.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Features Included */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Features Included:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {paymentData.features
                      .filter((feature) => feature.startsWith("INCLUDED:"))
                      .map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{feature.replace("INCLUDED: ", "")}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={customerInfo.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={customerInfo.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company/Organization</label>
                      <input
                        type="text"
                        name="company"
                        value={customerInfo.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Billing Address</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                      <select
                        name="country"
                        required
                        value={customerInfo.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="India">India</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                      <input
                        type="text"
                        name="state"
                        value={customerInfo.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={customerInfo.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="card" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <span>Credit/Debit Card</span>
                        <div className="flex space-x-1">
                          {/* Visa Icon */}
                          <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
                            <rect width="24" height="16" rx="2" fill="#1565C0" />
                            <text x="12" y="10" textAnchor="middle" fill="white" fontSize="6" fontFamily="Arial, sans-serif" fontWeight="bold">VISA</text>
                          </svg>
                          {/* Mastercard Icon */}
                          <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
                            <rect width="24" height="16" rx="2" fill="#EB001B" />
                            <circle cx="9" cy="8" r="4" fill="#FF5F00" />
                            <circle cx="15" cy="8" r="4" fill="#F79E1B" />
                          </svg>
                          {/* American Express Icon */}
                          <svg className="h-4 w-6" viewBox="0 0 24 16" fill="none">
                            <rect width="24" height="16" rx="2" fill="#006FCF" />
                            <text x="12" y="6" textAnchor="middle" fill="white" fontSize="4" fontFamily="Arial, sans-serif" fontWeight="bold">AMERICAN</text>
                            <text x="12" y="12" textAnchor="middle" fill="white" fontSize="4" fontFamily="Arial, sans-serif" fontWeight="bold">EXPRESS</text>
                          </svg>
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="paypal" className="text-sm font-medium text-gray-700">
                        PayPal
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="wire"
                        name="paymentMethod"
                        value="wire"
                        checked={paymentMethod === 'wire'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label htmlFor="wire" className="text-sm font-medium text-gray-700">
                        Wire Transfer (for orders $5,000+)
                      </label>
                    </div>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700 mb-3 font-medium">
                        You will be redirected to our secure payment processor to complete your card payment.
                      </p>
                      <p className="text-xs text-blue-600">
                        We never store your card details. All transactions are processed through PCI-compliant payment gateways.
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms and Submit */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 text-blue-600 mt-1"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms-of-service" className="text-blue-600 hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={!agreedToTerms || loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:shadow-none text-lg"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center space-x-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Processing Payment...</span>
                        </span>
                      ) : (
                        `Complete Purchase - $${paymentData.totalPrice.toLocaleString()}`
                      )}
                    </button>

                    <div className="text-center">
                      <Link
                        to="/products"
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        ← Back to Products
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
})

export default CheckoutPage