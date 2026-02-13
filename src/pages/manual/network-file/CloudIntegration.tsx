import React from "react";
import { Helmet } from "react-helmet-async";
import { Cloud, Upload, Download, CheckCircle, Globe, Lock, AlertCircle } from "lucide-react";

const CloudIntegration: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Cloud Integration - D-Secure Network File Manual</title>
        <meta
          name="description"
          content="Connect to D-Secure Cloud to centrally store and manage erasure reports, access them from anywhere, and ensure data compliance."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Cloud className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">D-Secure Cloud Integration</h1>
          </div>
          <p className="text-xl text-gray-600">
            Connect to D-Secure Cloud for centralized report storage, remote access, and enhanced data management capabilities.
          </p>
        </div>

        {/* Overview */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Why Use D-Secure Cloud?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-lg">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Centralized Storage</h3>
              <p className="text-blue-100">All erasure reports stored securely in one location, accessible from anywhere</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Compliance Ready</h3>
              <p className="text-blue-100">Meet data protection regulations with detailed audit trails and reports</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Backup Protection</h3>
              <p className="text-blue-100">Never lose local reports due to database corruption or system failure</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Multi-Site Access</h3>
              <p className="text-blue-100">Manage reports across multiple locations and installations</p>
            </div>
          </div>
        </section>

        {/* Login Steps */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-blue-600 rounded"></span>
            How to Connect to D-Secure Cloud
          </h2>
          
          <div className="space-y-5 text-lg">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center mt-0.5">1</span>
                <div>
                  <strong className="text-gray-900">Open Cloud Connection</strong>
                  <p className="text-gray-700 mt-1">Navigate to <strong>Home</strong> → <strong>Connect to Cloud</strong></p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center mt-0.5">2</span>
                <div>
                  <strong className="text-gray-900">Enter Credentials</strong>
                  <p className="text-gray-700 mt-1">Provide your D-Secure Cloud credentials:</p>
                  <div className="mt-3 space-y-2">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <strong className="text-gray-900">User ID:</strong>
                      <p className="text-sm text-gray-600 mt-1">Your registered email address or username</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <strong className="text-gray-900">Password:</strong>
                      <p className="text-sm text-gray-600 mt-1">Your D-Secure Cloud account password</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <strong className="text-gray-900">Cloud URL:</strong>
                      <p className="text-sm text-gray-600 mt-1">Pre-filled with default server address (usually no change needed)</p>
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center mt-0.5">3</span>
                <div>
                  <strong className="text-gray-900">Click Login</strong>
                  <p className="text-gray-700 mt-1">Click the <strong>Login</strong> button to establish connection</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center mt-0.5">4</span>
                <div>
                  <strong className="text-gray-900">Verify Connection</strong>
                  <p className="text-gray-700 mt-1">Status will change to <span className="text-green-600 font-semibold">Connected</span></p>
                  <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                    ✓ A green checkmark indicates successful connection to D-Secure Cloud
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Uploading Reports */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Upload className="w-7 h-7 text-green-600" />
            Uploading Reports to Cloud
          </h2>
          
          <div className="space-y-5 text-lg">
            <p className="text-gray-700 leading-relaxed">
              After connecting to D-Secure Cloud, you can upload erasure reports for centralized storage and compliance.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Upload Methods</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 bg-white rounded-r-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Manual Upload</h4>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. Go to <strong>Home</strong> → <strong>Reports</strong></li>
                    <li>2. Select one or more reports from the list</li>
                    <li>3. Click <strong>Upload to Cloud</strong></li>
                    <li>4. Wait for upload confirmation</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 bg-white rounded-r-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Automatic Upload</h4>
                  <p className="text-gray-700 mb-2">Configure automatic upload after each erasure operation:</p>
                  <ol className="space-y-2 text-gray-700">
                    <li>1. Go to <strong>Settings</strong> → <strong>Cloud Settings</strong></li>
                    <li>2. Enable <strong>Auto-upload reports</strong></li>
                    <li>3. All new reports will upload automatically when connected</li>
                  </ol>
                </div>

                <div className="border-l-4 border-green-500 bg-white rounded-r-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Batch Upload</h4>
                  <p className="text-gray-700">
                    Upload multiple historical reports at once by selecting all reports from a date range and uploading in one operation.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
                <p className="text-amber-900 text-lg">
                  <strong>Note:</strong> Ensure you have an active internet connection when uploading reports. Large reports may take a few moments to upload depending on your connection speed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Accessing Cloud Console */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Download className="w-7 h-7 text-purple-600" />
            Accessing D-Secure Cloud Console
          </h2>
          
          <div className="space-y-5 text-lg">
            <p className="text-gray-700 leading-relaxed">
              The D-Secure Cloud Console is a web-based interface where you can view, manage, and download all your uploaded reports from any location.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Cloud Console Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-900">View All Reports</strong>
                    <p className="text-sm text-gray-600">Access reports from all installations and locations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-900">Search & Filter</strong>
                    <p className="text-sm text-gray-600">Find specific reports by date, computer, or type</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-900">Download Reports</strong>
                    <p className="text-sm text-gray-600">Export reports in PDF or XML format</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-900">Generate Summaries</strong>
                    <p className="text-sm text-gray-600">Create compliance reports and statistics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-900">Share Access</strong>
                    <p className="text-sm text-gray-600">Grant viewing permissions to auditors or management</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-900">Retention Policies</strong>
                    <p className="text-sm text-gray-600">Set automatic deletion for old reports</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30">
              <h4 className="font-semibold text-gray-900 mb-2">How to Access</h4>
              <p className="text-gray-700">
                Log in to the D-Secure Cloud Console at <code className="bg-purple-100 px-2 py-1 rounded text-sm">cloud.D-Secure.com</code> using your D-Secure Cloud credentials.
              </p>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Lock className="w-7 h-7 text-red-600" />
            Security & Data Protection
          </h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-red-200 rounded-lg p-4 bg-red-50/30">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-600" />
                  Encrypted Transfer
                </h3>
                <p className="text-gray-700">All data is encrypted using TLS/SSL during transmission to D-Secure Cloud</p>
              </div>

              <div className="border border-red-200 rounded-lg p-4 bg-red-50/30">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-600" />
                  Secure Storage
                </h3>
                <p className="text-gray-700">Reports are encrypted at rest in secure data centers with redundant backups</p>
              </div>

              <div className="border border-red-200 rounded-lg p-4 bg-red-50/30">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-600" />
                  Access Control
                </h3>
                <p className="text-gray-700">Role-based access ensures only authorized users can view or manage reports</p>
              </div>

              <div className="border border-red-200 rounded-lg p-4 bg-red-50/30">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-red-600" />
                  Audit Trails
                </h3>
                <p className="text-gray-700">Complete logging of all access and modifications to uploaded reports</p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Cloud Integration Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Enable automatic upload for hassle-free report backup</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Regularly verify connectivity status before important erasure operations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Set retention policies to match your compliance requirements</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Use Cloud Console for centralized reporting across multiple sites</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Periodically download critical reports as local backups for extra security</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CloudIntegration;
