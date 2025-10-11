import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { Helmet } from 'react-helmet-async';

interface PlanDetails {
  title: string;
  price: string;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSalesSuccess, setShowSalesSuccess] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'US'
  });
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login');
      return;
    }

    // Get selected plan from localStorage
    const planData = localStorage.getItem('selectedPlan');
    if (planData) {
      setSelectedPlan(JSON.parse(planData));
    } else {
      // If no plan selected, redirect to pricing
      navigate('/pricing');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalesContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate sending contact request
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      setShowSalesSuccess(true);
      setShowContactForm(false);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setShowSalesSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to send contact request:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear the selected plan from localStorage
      localStorage.removeItem('selectedPlan');
      localStorage.removeItem('returnPath');
      
      // Redirect to admin dashboard after successful payment
      navigate('/admin', { replace: true });
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/payment" />
        <title>
          Payment | DSecure Data Erasure Service Purchase
        </title>
        <meta
          name="description"
          content="Secure payment gateway for DSecure data erasure services. Complete your purchase with our trusted payment system for enterprise data destruction solutions."
        />
        <meta
          name="keywords"
          content="secure payment, data erasure purchase, enterprise payment, DSecure billing, payment gateway"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="container-app py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 xs:mb-8 sm:mb-8">Complete Your Purchase</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-8">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="card">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="border rounded-lg p-4 bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{selectedPlan.title} Plan</h3>
                    <p className="text-sm text-slate-600 mt-1">Monthly subscription</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">
                      {selectedPlan.price === 'Contact' ? 'Custom' : `$${selectedPlan.price}`}
                    </div>
                    {selectedPlan.price !== 'Contact' && (
                      <div className="text-sm text-slate-500">per month</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="text-slate-900">
                    {selectedPlan.price === 'Contact' ? 'Custom' : `$${selectedPlan.price}.00`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax</span>
                  <span className="text-slate-900">
                    {selectedPlan.price === 'Contact' ? '$0.00' : `$${(parseFloat(selectedPlan.price) * 0.08).toFixed(2)}`}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900">
                    {selectedPlan.price === 'Contact' 
                      ? 'Custom' 
                      : `$${(parseFloat(selectedPlan.price) * 1.08).toFixed(2)}`
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="order-1 lg:order-2">
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Payment Information</h2>
                
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Payment Method</label>
                  <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3 xs:gap-4 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        paymentMethod === 'card' 
                          ? 'border-brand bg-brand/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="font-medium">Credit Card</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        paymentMethod === 'paypal' 
                          ? 'border-brand bg-brand/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-medium">PayPal</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('hybrid')}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        paymentMethod === 'hybrid' 
                          ? 'border-brand bg-brand/5' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Hybrid Payment</span>
                      </div>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="cardholderName" className="block text-sm font-medium text-slate-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          id="cardholderName"
                          name="cardholderName"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-slate-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="my-6" />

                    <div className="space-y-4">
                      <h3 className="font-medium text-slate-900">Billing Address</h3>
                      
                      <div>
                        <label htmlFor="billingAddress" className="block text-sm font-medium text-slate-700 mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          id="billingAddress"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="123 Main Street"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="New York"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-2">
                            ZIP Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="input-field"
                            placeholder="10001"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <p className="text-slate-600 mb-4">You will be redirected to PayPal to complete your payment.</p>
                    <div className="text-6xl">💳</div>
                  </div>
                )}

                {paymentMethod === 'hybrid' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="font-semibold text-blue-900 mb-2">Hybrid Payment Solution</h3>
                      <p className="text-blue-700 text-sm mb-4">
                        Combine multiple payment methods for maximum flexibility. Pay partially now and set up the remaining amount through various channels.
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Card + Bank Transfer</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Split Billing</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Installment Options</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Custom Terms</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <h4 className="font-medium text-amber-800">Connect with Sales Team Required</h4>
                          <p className="text-amber-700 text-sm mt-1">
                            Hybrid payment solutions require consultation with our sales team to customize the payment structure according to your needs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                onClick={(e) => {
                  if (paymentMethod === 'hybrid' || selectedPlan?.price === 'Contact') {
                    e.preventDefault();
                    setShowContactForm(true);
                  }
                }}
                className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Payment...
                  </div>
                ) : paymentMethod === 'hybrid' ? (
                  'Connect with Sales Team'
                ) : selectedPlan?.price === 'Contact' ? (
                  'Contact Sales Team'
                ) : (
                  'Complete Purchase'
                )}
              </button>

              {/* Sales CTA Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m0-10h-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2H5m12 0V8a2 2 0 00-2-2h-2m0 0V4a2 2 0 00-2-2H9a2 2 0 00-2 2v2m8 0V6h2a2 2 0 012 2v2m0 0h2m-2 0a2 2 0 002 2v2a2 2 0 01-2 2h-2m0 0V18a2 2 0 00-2 2h4a2 2 0 002-2v-2m-8 0V18a2 2 0 002 2h2a2 2 0 002-2v-2" />
                  </svg>
                  <h3 className="font-semibold text-slate-900">Need Custom Solution?</h3>
                </div>
                <p className="text-slate-600 text-sm mb-3">
                  Get enterprise pricing, volume discounts, or custom payment terms tailored to your organization's needs.
                </p>
                <button
                  type="button"
                  onClick={() => setShowContactForm(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Connect with Sales Team
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Success Message */}
        {showSalesSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Request Submitted Successfully!</h3>
              <p className="text-slate-600 mb-4">
                Thank you for your interest! Our sales team will contact you within <strong>12 hours</strong> to discuss your requirements and provide a customized solution.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-blue-800 text-sm font-medium">
                  📞 Expected Response Time: Within 12 hours
                </p>
              </div>
              <button
                onClick={() => setShowSalesSuccess(false)}
                className="btn-primary px-6 py-2"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md mx-4 w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Connect with Sales Team</h3>
              <form onSubmit={handleSalesContact} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={contactFormData.name}
                    onChange={handleContactInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleContactInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="contact-company"
                    name="company"
                    value={contactFormData.company}
                    onChange={handleContactInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={contactFormData.phone}
                    onChange={handleContactInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={contactFormData.message}
                    onChange={handleContactInputChange}
                    rows={4}
                    className="input-field"
                    placeholder="Tell us about your requirements..."
                    required
                  />
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    <strong>⏱️ Response Time:</strong> Our sales team will contact you within 12 hours during business hours.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 btn-primary py-2 disabled:opacity-50"
                  >
                    {isProcessing ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}