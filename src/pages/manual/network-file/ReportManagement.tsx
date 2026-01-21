import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React from "react";
import { Helmet } from "react-helmet-async";
import { FileText, Download, Eye, Filter, Calendar, CheckCircle, AlertCircle, BarChart } from "lucide-react";

const ReportManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("report-management")} />
      <Helmet>
        <title>Report Management - D-Secure Network File Manual</title>
        <meta
          name="description"
          content="Learn how to view, filter, export, and manage erasure reports in D-Secure File Eraser Network for compliance and audit trails."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Report Management</h1>
          </div>
          <p className="text-xl text-gray-600">
            View, filter, export, and manage detailed erasure reports for compliance, audits, and record-keeping.
          </p>
        </div>

        {/* Overview */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Why Reports Matter</h2>
          <div className="grid md:grid-cols-2 gap-4 text-lg">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Compliance</h3>
              <p className="text-indigo-100">Prove data destruction for regulatory requirements (GDPR, HIPAA, etc.)</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Audit Trails</h3>
              <p className="text-indigo-100">Complete records of what was erased, when, and by whom</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Verification</h3>
              <p className="text-indigo-100">Confirm erasure operations completed successfully</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-indigo-100">Professional reports for clients, management, or auditors</p>
            </div>
          </div>
        </section>

        {/* Accessing Reports */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-indigo-600 rounded"></span>
            Accessing Reports
          </h2>
          
          <div className="space-y-5 text-lg">
            <p className="text-gray-700 leading-relaxed">
              All erasure operations automatically generate detailed reports stored locally and optionally uploaded to D-Secure Cloud.
            </p>

            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold flex items-center justify-center mt-0.5">1</span>
                <div>
                  <strong className="text-gray-900">Navigate to Reports</strong>
                  <p className="text-gray-700 mt-1">Go to <strong>Home</strong> → <strong>Reports</strong></p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold flex items-center justify-center mt-0.5">2</span>
                <div>
                  <strong className="text-gray-900">View Report List</strong>
                  <p className="text-gray-700 mt-1">All reports are displayed in a sortable table with key information</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Report Information */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart className="w-7 h-7 text-blue-600" />
            Report Information
          </h2>
          
          <div className="space-y-5 text-lg">
            <p className="text-gray-700 leading-relaxed">
              Each erasure report contains comprehensive details about the operation:
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Report Details Include</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Report ID (unique identifier)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Date and time of erasure</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Computer name</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Report type (Files/Folders or Traces)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Erasure algorithm used</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Verification method</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Total files/items erased</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Total size erased</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Success/failure counts</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Duration of operation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">User who initiated erasure</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Detailed item list (files/traces)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtering Reports */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Filter className="w-7 h-7 text-green-600" />
            Filtering and Searching Reports
          </h2>
          
          <div className="space-y-5 text-lg">
            <p className="text-gray-700 leading-relaxed">
              Quickly find specific reports using powerful filtering options:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  By Date Range
                </h3>
                <p className="text-gray-700">Select start and end dates to view reports from a specific time period</p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  By Report Type
                </h3>
                <p className="text-gray-700">Filter for "Erase Files & Folders" or "Erase Traces" reports</p>
              </div>

              <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">By Computer Name</h3>
                <p className="text-gray-700">See all reports from a specific computer</p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">By Status</h3>
                <p className="text-gray-700">Show only successful operations or those with errors</p>
              </div>
            </div>
          </div>
        </section>

        {/* Viewing Reports */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Eye className="w-7 h-7 text-purple-600" />
            Viewing Report Details
          </h2>
          
          <div className="space-y-5 text-lg">
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center justify-center mt-0.5">1</span>
                <div>
                  <strong className="text-gray-900">Select Report</strong>
                  <p className="text-gray-700 mt-1">Click on any report in the list to select it</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center justify-center mt-0.5">2</span>
                <div>
                  <strong className="text-gray-900">Preview Report</strong>
                  <p className="text-gray-700 mt-1">Click <strong>Action</strong> → <strong>Preview</strong> to view the full report on-screen</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center justify-center mt-0.5">3</span>
                <div>
                  <strong className="text-gray-900">Review Details</strong>
                  <p className="text-gray-700 mt-1">The preview shows all report information including complete file/trace lists</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Exporting Reports */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Download className="w-7 h-7 text-red-600" />
            Exporting Reports
          </h2>
          
          <div className="space-y-5 text-lg">
            <p className="text-gray-700 leading-relaxed">
              Export reports to share with auditors, management, or for archival purposes.
            </p>

            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border border-red-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Export Formats</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <h4 className="font-semibold text-gray-900 mb-2">PDF Format</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Professional, formatted reports</li>
                    <li>• Ready for printing and sharing</li>
                    <li>• Includes company branding</li>
                    <li>• Perfect for compliance documentation</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4 border border-red-200">
                  <h4 className="font-semibold text-gray-900 mb-2">XML Format</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Machine-readable format</li>
                    <li>• Can be imported into other systems</li>
                    <li>• Useful for automated processing</li>
                    <li>• Integrates with compliance tools</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">How to Export</h4>
              <ol className="space-y-2 text-gray-700">
                <li>1. Select the report(s) you want to export</li>
                <li>2. Click <strong>Action</strong> → <strong>Save</strong></li>
                <li>3. Choose format (PDF or XML)</li>
                <li>4. Select destination folder</li>
                <li>5. Click <strong>Save</strong> to export</li>
              </ol>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
                <p className="text-amber-900 text-lg">
                  <strong>Note:</strong> Currently, reports must be saved individually. You cannot batch-export multiple reports in one operation. For centralizing multiple reports, consider using D-Secure Cloud integration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cloud Integration */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-cyan-600 rounded"></span>
            Cloud Report Management
          </h2>
          
          <div className="space-y-5 text-lg">
            <p className="text-gray-700 leading-relaxed">
              Upload reports to D-Secure Cloud for centralized management and backup protection.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-cyan-200 rounded-lg p-4 bg-cyan-50/30">
                <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Access from anywhere</li>
                  <li>• Automatic backup</li>
                  <li>• Never lose local reports</li>
                  <li>• Multi-site consolidation</li>
                </ul>
              </div>

              <div className="border border-cyan-200 rounded-lg p-4 bg-cyan-50/30">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Upload</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Select reports</li>
                  <li>• Click Upload to Cloud</li>
                  <li>• View in Cloud Console</li>
                  <li>• Share with team</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Report Management Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Regularly export critical reports to PDF for permanent archival</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Enable automatic Cloud upload to prevent local report loss</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Review reports after major erasure operations for verification</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Organize reports by date and department for easier compliance audits</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Set retention policies that match your regulatory requirements</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Back up your MariaDB database regularly to protect local reports</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ReportManagement;
