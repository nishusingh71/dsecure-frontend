import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductImage } from '@/components/ProductImage';

interface OrderData {
  orderId: string;
  productName: string;
  productImage: string;
  productImageCategory?: string;
  category?: string;
  productVersion?: string;
  quantity: string;
  duration: string;
  totalPrice: number;
  planName?: string;
  planDescription?: string;
  planCategory?: string;
  features?: string[];
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
  };
  paymentMethod: string;
  status: string;
  orderDate: string;
  selectedAddons?: string[];
  addonsData?: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    icon: string;
  }>;
}

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const savedOrderData = localStorage.getItem('orderData');
    if (savedOrderData) {
      setOrderData(JSON.parse(savedOrderData));
    } else {
      navigate('/pricing-and-plan');
    }
  }, [navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase, {orderData.customer.firstName}!
          </p>
          <p className="text-gray-500">
            Your order has been successfully processed and you'll receive confirmation shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-xl font-bold text-white">Order Details</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Order Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-mono text-gray-900 font-semibold">{orderData.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="text-gray-900">{new Date(orderData.orderDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="text-gray-900 capitalize">{orderData.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {orderData.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Product Details</h3>
                <div className="flex items-start space-x-4">
                  <ProductImage
                    category={orderData.productImageCategory || orderData.category || 'drive-eraser'}
                    productName={orderData.productName}
                    version={orderData.productVersion || 'Professional'}
                    size="medium"
                    className="flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{orderData.productName}</h4>
                    {orderData.planName && (
                      <div className="mt-1 mb-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                          {orderData.planName}
                        </span>
                        {orderData.planCategory && (
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium ml-1">
                            {orderData.planCategory}
                          </span>
                        )}
                      </div>
                    )}
                    <p className="text-gray-600">
                      {orderData.quantity} licenses × {orderData.duration} year{parseInt(orderData.duration) > 1 ? 's' : ''}
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      ${orderData.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {/* Features Included */}
                {orderData.features && orderData.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Features Included</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {orderData.features
                        .filter((feature) => feature.startsWith("INCLUDED:"))
                        .map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-sm text-gray-700">{feature.replace("INCLUDED: ", "")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Add-ons Section */}
                {orderData.addonsData && orderData.addonsData.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Premium Add-ons</h4>
                    <div className="space-y-2">
                      {orderData.addonsData.map((addon) => (
                        <div key={addon.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{addon.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{addon.name}</p>
                              <p className="text-xs text-gray-600">{addon.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              ${(addon.price * parseInt(orderData.quantity) * parseInt(orderData.duration)).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Information */}
            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 text-gray-900 font-medium">
                    {orderData.customer.firstName} {orderData.customer.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 text-gray-900 font-medium">{orderData.customer.email}</span>
                </div>
                {orderData.customer.company && (
                  <div className="md:col-span-2">
                    <span className="text-gray-600">Company:</span>
                    <span className="ml-2 text-gray-900 font-medium">{orderData.customer.company}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-blue-900 mb-4">What Happens Next?</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <p className="text-blue-800">
                <strong>Email Confirmation:</strong> You'll receive an order confirmation email within 5 minutes.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">2</span>
              </div>
              <p className="text-blue-800">
                <strong>License Delivery:</strong> Your software license and download links will be sent within 24 hours.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">3</span>
              </div>
              <p className="text-blue-800">
                <strong>Support Access:</strong> You'll receive access to our premium support portal and documentation.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">4</span>
              </div>
              <p className="text-blue-800">
                <strong>Getting Started:</strong> Our team will contact you within 48 hours to help with setup and onboarding.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            to="/support"
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all text-center"
          >
            Contact Support
          </Link>
          <Link
            to="/downloads"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all text-center"
          >
            Download Center
          </Link>
          <Link
            to="/dashboard"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all text-center"
          >
            Account Dashboard
          </Link>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">When will I receive my license?</h4>
              <p className="text-gray-600 text-sm mt-1">
                License keys and download instructions are typically delivered within 24 hours during business days.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Can I upgrade my license later?</h4>
              <p className="text-gray-600 text-sm mt-1">
                Yes! Contact our sales team to upgrade your license at any time. You'll only pay the difference.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">What if I need help with installation?</h4>
              <p className="text-gray-600 text-sm mt-1">
                Our technical support team provides free installation assistance and setup guidance for all customers.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="text-center mt-8">
          <Link
            to="/pricing"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ← Return to Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}