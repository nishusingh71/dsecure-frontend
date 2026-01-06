import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ProductImage } from '@/components/ProductImage';
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import { api } from '@/utils/apiClient';

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

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const seo = getSEOForPage('order-success');

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
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

  const { order_details, payment_info, product_details, customer_info, invoice_info, license_info } = orderData;

  return (
    <>
      <SEOHead seo={seo} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-gray-100 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-10">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 shadow-lg">
              <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your purchase, <span className="font-semibold">{customer_info.name}</span>!
            </p>
            <p className="text-gray-500">
              A confirmation email has been sent to <span className="font-medium">{customer_info.email}</span>
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Order & Product Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Information Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
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
                      <span className="text-sm text-gray-500">Order ID</span>
                      <p className="font-mono font-semibold text-gray-900">#{order_details.order_id}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Order Date</span>
                      <p className="font-medium text-gray-900">{formatDate(order_details.order_date)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Status</span>
                      <p>
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order_details.status)}`}>
                          {order_details.status.toUpperCase()}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Payment ID</span>
                      <p className="font-mono text-sm text-gray-700 truncate" title={order_details.dodo_payment_id}>
                        {order_details.dodo_payment_id || 'N/A'}
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
                    Product Details
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
                      <h3 className="text-lg font-bold text-gray-900">{product_details.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{product_details.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <span className="inline-flex items-center px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {product_details.duration_years} Year{product_details.duration_years > 1 ? 's' : ''}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                          {product_details.quantity} License{product_details.quantity > 1 ? 's' : ''}
                        </span>
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
            </div>

            {/* Right Column - Payment & Invoice */}
            <div className="space-y-6">
              {/* Payment Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Payment Summary
                  </h2>
                </div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900">
                      {formatCurrency(payment_info.amount, payment_info.currency)}
                    </div>
                    {payment_info.tax_amount > 0 && (
                      <p className="text-sm text-gray-500 mt-1">
                        Includes {formatCurrency(payment_info.tax_amount, payment_info.currency)} tax
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(payment_info.status)}`}>
                        {payment_info.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Method</span>
                      <span className="font-medium text-gray-900 capitalize">{payment_info.method}</span>
                    </div>
                    {payment_info.card_last_four && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Card</span>
                        <span className="font-medium text-gray-900">
                          {payment_info.card_network} •••• {payment_info.card_last_four}
                        </span>
                      </div>
                    )}
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Provider</span>
                      <span className="font-medium text-gray-900">{payment_info.provider}</span>
                    </div> */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Date</span>
                      <span className="font-medium text-gray-900">{formatDate(payment_info.payment_date)}</span>
                    </div>
                    {payment_info.transaction_id && (
                      <div className="text-sm">
                        <span className="text-gray-500">Transaction ID</span>
                        <p className="font-mono text-xs text-gray-700 mt-1 break-all">{payment_info.transaction_id}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Invoice Card */}
              {invoice_info && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                      Invoice
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Invoice #</span>
                        <span className="font-mono font-medium text-gray-900">{invoice_info.invoice_number}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date</span>
                        <span className="font-medium text-gray-900">{formatDate(invoice_info.date)}</span>
                      </div>
                      {/* <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Status</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(invoice_info.status)}`}>
                          {invoice_info.status.toUpperCase()}
                        </span>
                      </div> */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total</span>
                        <span className="font-bold text-gray-900">{formatCurrency(invoice_info.total_amount, invoice_info.currency)}</span>
                      </div>
                    </div>

                    <a
                      href={`https://live.dodopayments.com/invoices/payments/${order_details.dodo_payment_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold py-3 px-4 rounded-xl transition-colors border border-orange-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Download Invoice PDF
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 mb-8 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              What Happens Next?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-start space-x-3 bg-white/60 rounded-xl p-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Email Confirmation</p>
                  <p className="text-sm text-blue-700">Within 5 minutes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-white/60 rounded-xl p-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">License Delivery</p>
                  <p className="text-sm text-blue-700">Within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-white/60 rounded-xl p-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Support Access</p>
                  <p className="text-sm text-blue-700">Immediate access</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 bg-white/60 rounded-xl p-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">4</span>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Onboarding</p>
                  <p className="text-sm text-blue-700">Within 48 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Link
              to="/support"
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Contact Support
            </Link>
            <Link
              to="/downloads"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Center
            </Link>
            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
              </svg>
              Admin Dashboard
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