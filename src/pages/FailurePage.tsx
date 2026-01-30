import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ProductImage } from '@/components/ProductImage';
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import { api } from '@/utils/apiClient';
import { ENV } from '@/config/env';

// API Response interfaces matching backend schema
interface BillingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  formatted: string;
}

interface OrderDetails {
  order_id: number;
  order_date: string;
  status: string;
  dodo_payment_id: string;
  dodo_invoice_id: string;
}

interface PaymentInfo {
  status: string;
  method: string;
  amount: number;
  tax_amount: number;
  currency: string;
  transaction_id: string;
  provider: string;
  payment_date: string;
  payment_link: string;
  card_last_four: string;
  card_network: string;
  card_type: string;
}

interface ProductDetails {
  product_id: string;
  name: string;
  summary: string;
  quantity: number;
  duration_years: number;
}

interface CustomerInfo {
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  billing_address: BillingAddress;
}

interface InvoiceInfo {
  invoice_id: string;
  invoice_number: string;
  date: string;
  status: string;
  pdf_url: string;
  currency: string;
  total_amount: number;
  tax_amount: number;
}

interface LicenseInfo {
  license_keys: string[];
  license_count: number;
  license_years: number;
  expires_at: string;
}

interface OrderDetailsResponse {
  order_details: OrderDetails;
  payment_info: PaymentInfo;
  product_details: ProductDetails;
  customer_info: CustomerInfo;
  invoice_info: InvoiceInfo;
  license_info: LicenseInfo;
}

export default function FailurePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const seo = getSEOForPage('order-failure');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Get URL parameters - either order_id or payment_id can be used as identifier
      const orderId = searchParams.get('order_id') || searchParams.get('orderId');
      const paymentId = searchParams.get('payment_id');
      const paymentStatus = searchParams.get('status');

      // Log payment status from Dodo
      if (paymentStatus) {
        console.log(`🎉 Payment status from Dodo: ${paymentStatus}`);
      }

      // Use order_id or payment_id as identifier - both work with the same endpoint
      const identifier = orderId || paymentId || localStorage.getItem('lastOrderId');

      if (!identifier) {
        setError('No order or payment ID found. Redirecting to pricing page...');
        setTimeout(() => navigate('/pricing-and-plan'), 3000);
        setLoading(false);
        return;
      }

      try {
        console.log(`📦 Fetching order details for identifier: ${identifier}`);
        // Single endpoint accepts both order_id and payment_id
        const response = await api.get<OrderDetailsResponse>(`/api/Payments/orders/${identifier}/details`);
        setOrderData(response.data);
        // Store for future reference
        localStorage.setItem('lastOrderId', identifier);
      } catch (err: any) {
        console.error('Failed to fetch order details:', err);
        setError(err.response?.data?.message || 'Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [navigate, searchParams]);

  // Toast functionality
  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success',
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 6000); // Auto hide after 6 seconds
  };

  // FormSubmit configuration - Primary recipient
  const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/support@dsecuretech.com';

  const handleSupportFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    const errors: string[] = [];
    if (!supportForm.name?.trim()) errors.push('Name is required');
    if (!supportForm.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportForm.email)) {
      errors.push('Please enter a valid email address');
    }
    if (!supportForm.message?.trim()) errors.push('Message is required');

    if (errors.length > 0) {
      showToast(errors.join(', '), 'error');
      setIsLoading(false);
      return;
    }

    try {
      const now = new Date();
      const timestampLocal = now.toLocaleString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      });

      // Prepare form data for FormSubmit
      const formSubmitData = new FormData();
      // === MANDATORY HIDDEN FIELDS ===
      // Webhook to notify backend - backend will send auto-response email
      formSubmitData.append(
        '_webhook',
        'https://api.dsecuretech.com/api/formsubmit/webhook',
      );
      // Disable captcha
      formSubmitData.append('_captcha', 'false');
      // Table template for email
      formSubmitData.append('_template', 'table');

      // === FORM FIELDS ===
      formSubmitData.append('name', supportForm.name.trim());
      formSubmitData.append('email', supportForm.email.trim());
      formSubmitData.append('message', supportForm.message.trim());

      // Required for autoresponse - tells FormSubmit where to send reply
      formSubmitData.append('_replyto', supportForm.email.trim());

      // Additional fields
      formSubmitData.append('phone', supportForm.phone?.trim() || '');
      formSubmitData.append('timestamp', timestampLocal);
      formSubmitData.append('source', 'Payment Failure Page - Support Request');
      
      // Add order information if available
      if (orderData) {
        formSubmitData.append('order_id', orderData.order_details.order_id.toString());
        formSubmitData.append('payment_status', orderData.payment_info?.status || 'Failed');
        formSubmitData.append('product_name', orderData.product_details.name);
        formSubmitData.append('attempted_amount', formatCurrency(orderData.payment_info.amount, orderData.payment_info.currency));
      }

      // Subject and CC
      formSubmitData.append(
        '_subject',
        'Payment Failure Support Request - D-Secure Tech',
      );
      formSubmitData.append(
        '_cc',
        'niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com',
      );

      // === 1. SUBMIT TO BACKEND API (DATABASE) ===
      const timestampISO = now.toISOString(); // Format for backend

      const submissionData = {
        name: supportForm.name.trim(),
        email: supportForm.email.trim(),
        phone: supportForm.phone?.trim() || '',
        message: supportForm.message.trim(),
        source: 'Payment Failure Page - Support Request',
        timestamp: timestampISO,
        order_id: orderData?.order_details.order_id.toString() || '',
        payment_status: orderData?.payment_info?.status || 'Failed',
        product_name: orderData?.product_details.name || '',
        attempted_amount: orderData ? formatCurrency(orderData.payment_info.amount, orderData.payment_info.currency) : '',
      };
      
      // Reset form
      setSupportForm({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setIsLoading(false);
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
      
      // === SUCCESS ===
      showToast(
        'Thank you! Your support request has been submitted successfully. We will contact you within 24 hours.',
        'success',
      );
      
      try {
        const API_BASE = ENV.API_BASE_URL;
        const apiResponse = await fetch(
          `${API_BASE}/api/ContactFormSubmissions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData),
          },
        );
        
        const response = await fetch(FORMSUBMIT_ENDPOINT, {
          method: 'POST',
          body: formSubmitData,
          headers: {
            Accept: 'application/json',
          },
        });
        
        // Microsoft Excel + Teams tracking (non-blocking)
        fetch(ENV.POWER_AUTOMATE_HTTP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'REACT_CONTACT_2026',
          },
          body: JSON.stringify(submissionData),
        }).catch(() => {});

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json();
          console.error('Backend submission failed:', errorData);
          
          if (errorData.errors) {
            console.warn('Validation errors:', errorData.errors);
          }
        }
      } catch (error: any) {
        console.error('Form submission error:', error);
        // Don't show error to user if form was already submitted successfully
      }
    } catch (error: any) {
      console.error('Form error:', error);
      showToast(
        error.message || 'Failed to send message. Please try again later.',
        'error',
      );
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    navigate('/pricing-and-plan');
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'confirmed' || statusLower === 'paid' || statusLower === 'success' || statusLower === 'completed') {
      return 'bg-green-100 text-green-800';
    }
    if (statusLower === 'pending') {
      return 'bg-yellow-100 text-yellow-800';
    }
    if (statusLower === 'failed' || statusLower === 'cancelled') {
      return 'bg-red-100 text-red-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const getProductCategory = (productName: string): string => {
    if (productName.toLowerCase().includes('drive')) return 'drive-eraser';
    if (productName.toLowerCase().includes('file')) return 'file-eraser';
    return 'drive-eraser';
  };

  if (loading) {
    return (
      <>
        <SEOHead seo={seo} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading order details...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SEOHead seo={seo} />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Order</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              to="/pricing-and-plan"
              className="inline-flex items-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
            >
              Go to Pricing
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (!orderData) return null;

  const { order_details, payment_info, product_details, customer_info } = orderData;

  const isPaymentFailed =
    payment_info?.status?.toLowerCase() === 'failed' ||
    payment_info?.status?.toLowerCase() === 'cancelled' ||
    order_details?.status?.toLowerCase() === 'failed';

  return (
    <>
      <SEOHead seo={seo} />
      
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 max-w-md ${
            toast.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-green-50 border-green-200 text-green-800'
          }`}
        >
          <div className="flex items-start gap-3">
            {toast.type === 'error' ? (
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            <div className="flex-1">
              <span className="font-medium text-sm">{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-red-100 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Failure Header */}
          <div className="text-center mb-10">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6 shadow-lg">
              <svg className="h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Payment Failed</h1>
            <p className="text-lg text-gray-600 mb-2">
              We're sorry, <span className="font-semibold">{customer_info.name}</span>.
            </p>
            <p className="text-gray-500">
              Your payment could not be processed at this time.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Order & Product Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Failure Reason Card */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    What Happened?
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                        <span className="text-red-600 font-bold text-sm">!</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Payment Status: <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(payment_info?.status || 'Failed')}`}>{payment_info?.status || 'Failed'}</span></p>
                      </div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-900 mb-2">Common reasons for payment failure:</h3>
                      <ul className="list-disc list-inside text-sm text-red-800 space-y-1">
                        <li>Insufficient funds in your account</li>
                        <li>Incorrect card details or expired card</li>
                        <li>Bank declined the transaction</li>
                        <li>Network or connection issues</li>
                        <li>Card limit exceeded</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                    </svg>
                    Order Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order ID</p>
                      <p className="font-semibold text-gray-900">#{order_details.order_id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Order Date</p>
                      <p className="font-semibold text-gray-900">{formatDate(order_details.order_date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order_details.status)}`}>
                        {order_details.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                      <p className="font-mono text-sm text-gray-900">
                        {payment_info.transaction_id || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Details Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z" />
                    </svg>
                    Product You Tried to Purchase
                  </h2>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <ProductImage
                      category={getProductCategory(product_details.name)}
                      productName={product_details.name}
                      version="Professional"
                      size="medium"
                      className="flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{product_details.name}</h3>
                      <p className="text-gray-600 mb-4">{product_details.summary}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Quantity</p>
                          <p className="font-semibold text-gray-900">{product_details.quantity} License(s)</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Duration</p>
                          <p className="font-semibold text-gray-900">{product_details.duration_years} Year(s)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    Customer Information
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Name</span>
                      <p className="font-medium text-gray-900">{customer_info.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email</span>
                      <p className="font-medium text-gray-900">{customer_info.email}</p>
                    </div>
                    {customer_info.phone && (
                      <div>
                        <span className="text-sm text-gray-500">Phone</span>
                        <p className="font-medium text-gray-900">{customer_info.phone}</p>
                      </div>
                    )}
                    {customer_info.company_name && (
                      <div>
                        <span className="text-sm text-gray-500">Company</span>
                        <p className="font-medium text-gray-900">{customer_info.company_name}</p>
                      </div>
                    )}
                    {customer_info.billing_address?.formatted && (
                      <div className="sm:col-span-2">
                        <span className="text-sm text-gray-500">Billing Address</span>
                        <p className="font-medium text-gray-900">{customer_info.billing_address.formatted}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Support Form */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Need Help? Contact Support
                  </h2>
                </div>
                <div className="p-6">
                  {formSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <svg className="w-12 h-12 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-green-800 font-semibold">Support request submitted!</p>
                      <p className="text-green-700 text-sm">We'll contact you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSupportFormSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={supportForm.name}
                          onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={supportForm.email}
                          onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={supportForm.phone}
                          onChange={(e) => setSupportForm({ ...supportForm, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Describe the Issue *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={4}
                          value={supportForm.message}
                          onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Please describe what happened and any error messages you saw..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Submitting...' : 'Submit Support Request'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Payment Info & Actions */}
            <div className="space-y-6">
              {/* Payment Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Payment Details
                  </h2>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-gray-900 mb-2">
                      {formatCurrency(payment_info.amount, payment_info.currency)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Attempted Amount
                    </p>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-semibold text-gray-900">{payment_info.method || 'Card'}</span>
                    </div>
                    {payment_info.card_last_four && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Card</span>
                        <span className="font-semibold text-gray-900">**** {payment_info.card_last_four}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Date</span>
                      <span className="font-semibold text-gray-900">{formatDate(payment_info.payment_date)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Provider</span>
                      <span className="font-semibold text-gray-900">{payment_info.provider}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment_info.status)}`}>
                        {payment_info.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  What to Do Next?
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/80 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-3">Don't worry! You can try purchasing again with:</p>
                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                      <li>A different payment method</li>
                      <li>A different card</li>
                      <li>After contacting your bank</li>
                    </ul>
                  </div>
                  <button
                    onClick={handleTryAgain}
                    className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Try Again
                  </button>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Need Immediate Help?
                  </h2>
                </div>
                <div className="p-6 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Support</p>
                    <a href="mailto:support@example.com" className="text-teal-600 hover:text-teal-700 font-medium">
                      support@dsecuretech.com
                    </a>
                  </div>
                  {/* <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Support</p>
                    <a href="tel:+15551234567" className="text-teal-600 hover:text-teal-700 font-medium">
                      +1 (555) 123-4567
                    </a>
                  </div> */}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Live Chat</p>
                    <p className="text-gray-700">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              to="/support"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Visit Support Center
            </Link>
            <Link
              to="/faq"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Browse FAQs
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center">
            <Link
              to="/products"
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors inline-flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Return to Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}