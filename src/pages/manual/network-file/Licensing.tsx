import React from "react";
import { Helmet } from "react-helmet-async";
import { Key, Globe, Shield, Calendar, CheckCircle, AlertCircle, CreditCard, Users, Lock } from "lucide-react";

const Licensing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Licensing and Activation - D-Secure Network File Manual</title>
        <meta
          name="description"
          content="Complete guide to purchasing, activating, and managing licenses for D-Secure File Eraser Network."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Key className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Software Licensing and Activation</h1>
          </div>
          <p className="text-lg text-gray-600">
            Comprehensive guide to purchasing, activating, and managing your D-Secure File Eraser Network licenses. Learn how to maximize your investment with proper license management across your organization.
          </p>
        </div>

        {/* Understanding Licensing */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Understanding D-Secure Licensing Model
          </h2>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              D-Secure File Eraser Network uses a per-computer licensing model, which means each computer you manage and perform erasure operations on requires one license. This model provides flexibility and scalability for organizations of all sizes, from small businesses managing a dozen computers to large enterprises overseeing thousands of endpoints across global networks.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Licenses are typically sold on an annual subscription basis, though perpetual licenses are available for certain enterprise agreements. Your license allows you to install the management console on the administrator's computer and connect to as many network computers as your license count permits. For example, if you purchase a 50-license pool, you can manage erasure operations across up to 50 different computers simultaneously.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Each license is tied to a specific computer during activation. However, licenses are transferable—if a computer is decommissioned or replaced, you can deactivate its license and reassign it to a new computer without purchasing an additional license. This flexibility ensures you're not wasting licenses on machines that are no longer in use, making the licensing model both cost-effective and practical for dynamic IT environments.
            </p>
            <div className="bg-white rounded-lg border border-blue-200 p-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">What You Get With Your License:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Unlimited erasure operations on licensed computers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Access to all erasure algorithms and standards (DoD, NIST, Gutmann, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Comprehensive audit reports and compliance documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>D-Secure Cloud integration for centralized management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Free software updates and security patches during subscription period</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>Technical support via email, chat, and phone</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Purchasing the Software */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            How to Purchase Licenses
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Purchasing D-Secure File Eraser Network licenses is a straightforward process designed to get you up and running quickly. You can purchase directly through the application or visit our online store. The entire process takes just a few minutes, and you'll receive your activation credentials immediately after payment confirmation.
          </p>

          <div className="space-y-5">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-lg border border-blue-200">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-base font-bold flex items-center justify-center shadow">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Access the Online Store</h3>
                <p className="text-gray-700 mb-2">
                  Open D-Secure File Eraser Network and click the <strong>Buy Now</strong> ribbon tab at the top of the interface. Then click the <strong>Buy Online</strong> button, which will launch your default web browser and navigate to our secure online store.
                </p>
                <p className="text-gray-600 text-sm">
                  Alternatively, you can visit <strong>https://www.D-Securetech.com/store</strong> directly if you prefer to purchase before installing the software. You'll be able to download the installer after purchase.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-lg border border-green-200">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-green-600 text-white text-base font-bold flex items-center justify-center shadow">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Select License Quantity and Type</h3>
                <p className="text-gray-700 mb-3">
                  Choose how many licenses you need based on the number of computers you plan to manage. Consider your current needs plus anticipated growth over the next year. License packs are available in common sizes:
                </p>
                <div className="grid md:grid-cols-3 gap-2 text-sm">
                  <div className="bg-white rounded p-3 border border-green-300">
                    <p className="font-medium text-gray-900">Small Business</p>
                    <p className="text-gray-600">5, 10, 25 licenses</p>
                  </div>
                  <div className="bg-white rounded p-3 border border-green-300">
                    <p className="font-medium text-gray-900">Medium Enterprise</p>
                    <p className="text-gray-600">50, 100, 250 licenses</p>
                  </div>
                  <div className="bg-white rounded p-3 border border-green-300">
                    <p className="font-medium text-gray-900">Large Enterprise</p>
                    <p className="text-gray-600">500, 1000+ licenses</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-3">
                  Volume discounts apply automatically at checkout for larger orders. For custom enterprise arrangements with 1000+ licenses, contact our sales team for a personalized quote and dedicated support options.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-lg border border-purple-200">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white text-base font-bold flex items-center justify-center shadow">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Complete Checkout Securely</h3>
                <p className="text-gray-700 mb-2">
                  Enter your billing information and payment details. Our checkout process is secured with 256-bit SSL encryption and PCI-DSS compliant payment processing. We accept:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm ml-4 mb-3">
                  <li>Major credit cards (Visa, MasterCard, American Express, Discover)</li>
                  <li>Debit cards with credit card processing</li>
                  <li>PayPal for international transactions</li>
                  <li>Purchase orders for qualified corporate accounts</li>
                  <li>Bank transfers for large enterprise orders</li>
                </ul>
                <p className="text-gray-600 text-sm">
                  You'll receive an order confirmation immediately after payment. Save this confirmation—it includes your order reference number, which may be needed for support inquiries.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-lg border border-orange-200">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white text-base font-bold flex items-center justify-center shadow">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Receive Your Activation Key</h3>
                <p className="text-gray-700 mb-3">
                  Within minutes of payment confirmation, you'll receive an automated email at the address you provided during checkout. This critical email contains:
                </p>
                <div className="bg-white rounded-lg p-4 border border-orange-300 mb-3">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-0.5">📧</span>
                      <div>
                        <p className="font-medium text-gray-900">Your Activation Key</p>
                        <p className="text-gray-600">A unique alphanumeric code (format: XXXX-XXXX-XXXX-XXXX) used to activate your licenses</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-0.5">📄</span>
                      <div>
                        <p className="font-medium text-gray-900">Order Receipt and Invoice</p>
                        <p className="text-gray-600">Detailed breakdown of your purchase for accounting and tax purposes</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-0.5">⬇️</span>
                      <div>
                        <p className="font-medium text-gray-900">Download Links</p>
                        <p className="text-gray-600">Direct links to download the latest version of the software installer</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold mt-0.5">📖</span>
                      <div>
                        <p className="font-medium text-gray-900">Activation Instructions</p>
                        <p className="text-gray-600">Step-by-step guide to activate your software (both online and offline methods)</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-red-50 border-l-4 border-red-400 rounded p-3">
                  <p className="text-red-900 font-medium text-sm mb-1">⚠️ Critical: Protect Your Activation Key</p>
                  <p className="text-red-800 text-sm">
                    Treat your Activation Key like a password. Store it securely (use a password manager or encrypted document). You'll need it for activation and license management. If you lose it, contact support immediately—recovery requires identity verification and may delay your deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Activation Methods */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-blue-600" />
            Software Activation Methods
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            D-Secure File Eraser Network supports two activation methods to accommodate different network environments and security policies. Choose the method that best fits your infrastructure: online activation for internet-connected servers (quickest and easiest), or offline activation for air-gapped or highly secured environments where direct internet access is restricted.
          </p>

          {/* Online Activation */}
          <div className="mb-8 border-2 border-green-300 rounded-xl p-6 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Online Activation (Recommended)</h3>
                <p className="text-sm text-gray-600">Instant activation in seconds—requires internet connection</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-5 leading-relaxed">
              Online activation is the quickest and most convenient method. The entire process completes in seconds as the application communicates directly with our secure activation servers to validate your key and create your license pool. This method is ideal for most environments where the server running D-Secure has internet access, even if it's through a corporate proxy or firewall.
            </p>

            <div className="bg-white rounded-lg border-2 border-green-200 p-5 mb-4">
              <p className="font-semibold text-gray-900 mb-4 text-lg">Step-by-Step Online Activation:</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">1</div>
                  <div>
                    <p className="text-gray-700 mb-1">
                      <strong>Open Activation Dialog:</strong> Launch D-Secure File Eraser Network and click the <strong>Activation</strong> ribbon tab, then click <strong>Add  Licenses</strong>
                    </p>
                    <p className="text-gray-600 text-sm">A dialog window will appear with fields for your activation key and activation method options.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">2</div>
                  <div>
                    <p className="text-gray-700 mb-1">
                      <strong>Enter Activation Key:</strong> Type or paste your Activation Key exactly as it appears in your email, including dashes
                    </p>
                    <p className="text-gray-600 text-sm">The key format is typically XXXX-XXXX-XXXX-XXXX. Copy-pasting from the email reduces typing errors.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">3</div>
                  <div>
                    <p className="text-gray-700 mb-1">
                      <strong>Select Online Method:</strong> Ensure "Online Activation" is selected (this is usually the default option)
                    </p>
                    <p className="text-gray-600 text-sm">If you're behind a corporate proxy, click "Proxy Settings" to configure your network details first.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">4</div>
                  <div>
                    <p className="text-gray-700 mb-1">
                      <strong>Click Activate:</strong> Press the <strong>Activate</strong> button and wait for confirmation
                    </p>
                    <p className="text-gray-600 text-sm">The process typically completes in 3-10 seconds. You'll see a progress indicator while communicating with activation servers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">✓</div>
                  <div>
                    <p className="text-gray-700 mb-1">
                      <strong>Confirmation:</strong> A success message appears, and your license pool is immediately available in Manage Licenses
                    </p>
                    <p className="text-gray-600 text-sm">You can now start connecting to domain computers and performing erasure operations without any restrictions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-100 border-l-4 border-blue-500 rounded p-4">
              <p className="text-blue-900 text-sm font-medium mb-1">💡 Troubleshooting Online Activation</p>
              <ul className="text-blue-800 text-sm space-y-1 ml-4 list-disc">
                <li>If activation takes longer than 30 seconds, check your internet connection</li>
                <li>Verify firewall settings allow outbound HTTPS connections to *.D-Securetech.com</li>
                <li>If behind a corporate proxy, ensure proxy settings are configured correctly</li>
                <li>Invalid key errors: double-check for typos—keys are case-sensitive</li>
              </ul>
            </div>
          </div>

          {/* Offline Activation */}
          <div className="border-2 border-purple-300 rounded-xl p-6 bg-gradient-to-r from-purple-50 to-violet-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Offline Activation</h3>
                <p className="text-sm text-gray-600">For air-gapped or restricted networks—activation via support</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-5 leading-relaxed">
              Offline activation is designed for environments where the server cannot access the internet due to security policies, air-gapped networks, or other restrictions. This manual process involves generating a Registration ID on your server, sending it to our support team, and receiving a License Key file that completes activation. While it takes longer than online activation (typically within one business day), it provides the same full functionality once completed.
            </p>

            <div className="bg-white rounded-lg border-2 border-purple-200 p-5 mb-4">
              <p className="font-semibold text-gray-900 mb-4 text-lg">Step-by-Step Offline Activation:</p>
              <div className="space-y-5">
                <div className="flex items-start gap-4 pb-4 border-b border-purple-300">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-600 text-white text-sm font-bold flex items-center justify-center shadow">1</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Generate Registration ID</h4>
                    <p className="text-gray-700 mb-2">
                      Navigate to <strong>Activation → Add Licenses</strong>. Enter your Activation Key in the field provided, then select <strong>"Offline Activation"</strong> as the activation method.
                    </p>
                    <p className="text-gray-700 mb-2">
                      Click the <strong>"Generate Registration ID"</strong> button. The application will create a unique Registration ID based on your system's hardware fingerprint and the Activation Key. This ID is specific to the computer where you're installing D-Secure.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Save this Registration ID by copying it to clipboard or saving to a text file. You'll need to transfer this to a computer with internet access to email to support.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-purple-300">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-600 text-white text-sm font-bold flex items-center justify-center shadow">2</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Contact Technical Support</h4>
                    <p className="text-gray-700 mb-3">
                      From a computer with internet access, send an email to <strong className="text-purple-700">techsupport@D-Securetech.com</strong> with the following information:
                    </p>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <p className="font-medium text-gray-900 mb-2">Email Template:</p>
                      <div className="text-sm text-gray-700 space-y-1 font-mono bg-white p-3 rounded border border-purple-300">
                        <p>Subject: Offline Activation Request</p>
                        <p className="mt-2">Registration ID: [paste your Registration ID]</p>
                        <p>Activation Key: [your Activation Key]</p>
                        <p>Company Name: [your company]</p>
                        <p>Contact Person: [your name]</p>
                        <p>Phone: [optional]</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      Include all information to expedite processing. Missing details will delay activation while support requests clarification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-purple-300">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-600 text-white text-sm font-bold flex items-center justify-center shadow">3</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Receive License Key File</h4>
                    <p className="text-gray-700 mb-2">
                      Our support team will process your request and email you a <strong>License Key file</strong> (usually with a <code className="bg-gray-100 px-2 py-1 rounded">.lic</code> or <code className="bg-gray-100 px-2 py-1 rounded">.key</code> extension). This typically arrives within <strong>4-8 business hours</strong> during weekdays, though urgent requests can often be processed faster if you mention the urgency in your email.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Save the License Key file to a USB drive or network share accessible from your D-Secure server. Do not modify or open the file—it's encrypted and must remain intact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-600 text-white text-sm font-bold flex items-center justify-center shadow">4</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Complete Activation</h4>
                    <p className="text-gray-700 mb-2">
                      Transfer the License Key file to your D-Secure server. In the application, go back to <strong>Activation → Add Licenses → Offline Activation</strong>.
                    </p>
                    <p className="text-gray-700 mb-2">
                      Click <strong>"Browse"</strong> or <strong>"Select License Key File"</strong>, navigate to where you saved the file, select it, and click <strong>"Activate"</strong>. The application will validate the file and complete activation immediately.
                    </p>
                    <p className="text-gray-600 text-sm">
                      If successful, you'll see a confirmation message and your license pool will appear in Manage Licenses, ready to use for erasure operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-100 border-l-4 border-amber-500 rounded p-4">
              <p className="text-amber-900 font-medium text-sm mb-1">⏱️ Planning for Offline Activation</p>
              <p className="text-amber-800 text-sm">
                Since offline activation requires email communication with support, plan accordingly. If you're deploying on a tight deadline, request the License Key file immediately after purchase rather than waiting until installation day. Our support team operates Monday-Friday, 9 AM-6 PM EST.
              </p>
            </div>
          </div>
        </section>

        {/* Managing Licenses */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Managing Your License Pools
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Once activated, your licenses are organized into "pools"—logical groups of licenses purchased together. Effective license management helps you maximize your investment by monitoring usage, redistributing licenses from decommissioned computers, and planning for renewals before expiration. The Manage Licenses interface provides comprehensive visibility into all your license pools and their status.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Understanding License Pool Information</h3>
            <p className="text-gray-700 mb-4">
              When you view your license pools in <strong>Activation → Manage Licenses</strong>, each pool displays comprehensive information to help you track and manage your licenses effectively:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 bg-white rounded-lg p-3 border border-blue-300">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Pool Name & Key (Partial)</p>
                  <p className="text-xs text-gray-600">Displays first/last 4 characters of your Activation Key for security (e.g., AB12-****-****-CD34)</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white rounded-lg p-3 border border-blue-300">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Activation Date</p>
                  <p className="text-xs text-gray-600">When the pool was first activated, important for tracking subscription start</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white rounded-lg p-3 border border-blue-300">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Expiry Date</p>
                  <p className="text-xs text-gray-600">When the subscription expires (for annual licenses). Pools expiring soon are highlighted in red/orange</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white rounded-lg p-3 border border-blue-300">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Total Licenses</p>
                  <p className="text-xs text-gray-600">Total number of licenses in this pool (e.g., 50 if you purchased a 50-license pack)</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white rounded-lg p-3 border border-blue-300">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Licenses In Use</p>
                  <p className="text-xs text-gray-600">Number currently assigned to specific computers (actively deployed)</p>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white rounded-lg p-3 border border-blue-300">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Available Licenses</p>
                  <p className="text-xs text-gray-600">Remaining unassigned licenses ready to deploy to new computers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Viewing Computers */}
          <div className="mb-6 bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Viewing Licensed Computers
            </h3>
            <p className="text-gray-700 mb-4">
              Track exactly which computers are using licenses from each pool. This visibility helps you identify unused licenses on decommissioned machines so you can reassign them, and ensures compliance by documenting which endpoints have erasure capabilities.
            </p>
            <div className="bg-white rounded-lg p-4 border border-gray-300 mb-4">
              <p className="font-medium text-gray-900 mb-3">How to View Computers:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">→</span>
                  <p className="text-gray-700">
                    Navigate to <strong>Activation → Manage Licenses</strong> from the ribbon
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">→</span>
                  <p className="text-gray-700">
                    Select the license pool you want to examine and click <strong>View Computers</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">→</span>
                  <p className="text-gray-700">
                    Review the list which includes: computer names, activation dates, and online/offline status
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">→</span>
                  <p className="text-gray-700">
                    To free up a license: select a computer from the list and click <strong>Deactivate License</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
              <p className="text-amber-900 font-medium text-sm mb-1">💾 Export for Record Keeping</p>
              <p className="text-amber-800 text-sm">
                Click the <strong>Save</strong> or <strong>Export to CSV</strong> button to download the computer list for documentation, audit trails, or import into asset management systems. The CSV includes all computer details, activation dates, and current status.
              </p>
            </div>
          </div>

          {/* Extend Validity */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-5 border border-teal-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              Extending License Validity (Renewals)
            </h3>
            <p className="text-gray-700 mb-4">
              Annual subscriptions must be renewed before expiration to maintain access. The Manage Licenses screen highlights pools expiring within 30 days in orange/red to give you advance warning. Renewal is simple—purchase an extension using the same process as initial purchase, then activate the new key.
            </p>

            <div className="bg-white rounded-lg p-5 border border-teal-300 mb-4">
              <p className="text-gray-900 font-semibold mb-3">Renewal Scenarios Explained:</p>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-semibold text-gray-900">Scenario 1: Purchasing Additional Licenses</p>
                  <p className="text-gray-700 text-sm mb-1">
                    If you purchase <strong>more licenses</strong> than currently in your pool (e.g., you have 50, buy 75), the system creates a new pool or merges them.
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Result:</strong> Total licenses = 50 + 75 = 125. Expiry date extends based on the new purchase date.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-semibold text-gray-900">Scenario 2: Purchasing Equal Licenses (Pure Renewal)</p>
                  <p className="text-gray-700 text-sm mb-1">
                    If you purchase the <strong>same number</strong> as your current pool (e.g., you have 50, buy 50), this is treated as a renewal.
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Result:</strong> License count remains 50. Expiry date extends by one full subscription period (typically 12 months from current expiry).
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <p className="font-semibold text-gray-900">Scenario 3: Purchasing Fewer Licenses (Downgrade)</p>
                  <p className="text-gray-700 text-sm mb-1">
                    If you purchase <strong>fewer licenses</strong> than currently in your pool (e.g., you have 50, buy 25), contact support for guidance.
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Result:</strong> Support will help transition to the smaller pool size while maintaining service continuity and providing pro-rated options.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4">
              <p className="text-red-900 font-bold text-sm mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Expiration Warning System
              </p>
              <ul className="text-red-800 text-sm space-y-1 list-disc ml-6">
                <li><strong>60+ days:</strong> Pool displays normally (green)</li>
                <li><strong>31-60 days:</strong> Pool highlighted in yellow with renewal reminder</li>
                <li><strong>15-30 days:</strong> Pool highlighted in orange with urgent renewal warning</li>
                <li><strong>&lt;15 days:</strong> Pool highlighted in red—renew immediately to avoid service interruption</li>
                <li><strong>After expiration:</strong> Software continues working in read-only mode (view reports only, no new erasures)</li>
              </ul>
              <p className="text-red-800 text-sm mt-3">
                <strong>Best Practice:</strong> Set calendar reminders 45 days before expiration to allow time for purchase approval and processing.
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl border-2 border-indigo-300 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-indigo-600" />
            License Management Best Practices
          </h2>
          <p className="text-gray-700 mb-4">
            Follow these proven strategies from experienced IT administrators to optimize your license utilization and avoid common pitfalls:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>Set expiry reminders:</strong> Add calendar alerts 45 days before license expiration to allow ample time for purchase approvals and renewals</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>Audit quarterly:</strong> Review licensed computers every 3 months, deactivating licenses from retired systems to reclaim for new deployments</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>Secure activation records:</strong> Store Activation Keys in your organization's password manager or encrypted vault with backup copies</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>Plan for growth:</strong> Purchase 10-15% extra licenses beyond current needs to accommodate new hires and system expansions without delays</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>Document usage:</strong> Export computer lists monthly for compliance documentation showing which endpoints have erasure capabilities</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                <span><strong>Consider volume discounts:</strong> Consolidate purchases into bulk orders rather than small incremental buys to maximize cost savings</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Licensing;
