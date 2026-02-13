import React from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  Eye,
  Download,
  Cloud,
  Settings,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ReportManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead seo={getSEOForPage('help-manual')} />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/support/help-manual"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Help Manual
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">
                Report Management
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-8">
            {/* Intro */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Working with Reports
                </h1>
                <p className="text-gray-600 mt-2">
                  The Report feature allows you to preview, save, and share all
                  the erasure processes that either have been successful or
                  failed.
                </p>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                D-Secure File Eraser Report Features
              </h2>
              <div className="text-blue-800 space-y-2">
                <p>
                  <span className="font-semibold">D-Secure File Eraser</span>{' '}
                  provides option to search reports for the processes performed.
                  Based on the specification of records, software helps in
                  fetching records more quickly. You can search for multiple
                  records at a time with extensive search criteria.
                </p>
                <p>
                  <span className="font-semibold">D-Secure File Eraser</span>{' '}
                  provides you with erasure Reports, as follows:
                </p>
                <p>
                  An erasure report provides information such as Process Status,
                  Process Mode: Standard or Scheduled, Report Information,
                  Erasure Summary, Hardware/Software Information, Process
                  Summary, Erasure & Validation Details.
                </p>
              </div>
            </div>

            {/* Sample Report */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Sample D-Secure File Report
              </h3>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-2xl font-bold text-green-600">
                    D-Secure
                  </div>
                  <div className="text-right">
                    <h4 className="text-lg font-semibold text-gray-900">
                      D-Secure File Report
                    </h4>
                  </div>
                </div>

                {/* Report details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        Process Status:
                      </span>
                      <span className="text-gray-900">Completed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">
                        Process Mode:
                      </span>
                      <span className="text-gray-900">Standard</span>
                    </div>

                    <div className="space-y-2">
                      <div className="font-semibold text-gray-700">
                        Report Information
                      </div>
                      <div className="ml-4 space-y-1">
                        <div className="flex justify-between">
                          <span>Report Date:</span>
                          <span className="text-gray-900">
                            2025-11-11 10:46:14
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Digital Identifier:</span>
                          <span className="text-gray-900">
                            0D020A35900003caf7b5c6c8c1A
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Software Version:</span>
                          <span className="text-gray-900">
                            D-Secure File Eraser 1.0.0.0
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="font-semibold text-gray-700">
                      Erasure & Validation Details
                    </div>
                    <div className="ml-4 space-y-1">
                      <div className="flex justify-between">
                        <span>Erased By:</span>
                        <span className="text-gray-900">Admin User</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Validated By:</span>
                        <span className="text-gray-900">System Admin</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Department:</span>
                        <span className="text-gray-900">IT Security</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-600 text-center">
                  *To view complete report with Annexure, you need to save it to
                  your local computer.
                </div>
              </div>

              <div className="text-center text-lg font-bold text-gray-600">
                D-SecureTech
              </div>
              <div className="text-xs text-center text-gray-500 mt-2">
                This information contained in this report is digitally protected
                and has been generated by the D-Secure erasing process. Contact
                on www.D-Secure.company for more information.
              </div>
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview Report */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-blue-600" />
                  Preview Report
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      To preview a report:
                    </h3>
                    <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                      <li>
                        Go to <strong>D-SecureFile Eraser</strong>.
                      </li>
                      <li>
                        Select <strong>Report</strong> from the left pane.
                      </li>
                      <li>
                        Click <strong>Preview</strong> from the Action tab.
                      </li>
                    </ol>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg flex space-x-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> You cannot preview more than one
                        report at a time. Scheduled erasures will show Process
                        Mode as “Schedule Erasure”.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Report */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Download className="w-6 h-6 mr-3 text-green-600" />
                  Save Report
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      You can save a report for future use once it has been
                      generated. The report can be saved in PDF or XML format.
                    </p>
                    <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                      <li>Go to D-SecureFile Eraser.</li>
                      <li>Select Report from left pane.</li>
                      <li>
                        Select checkboxes next to reports, then click Save
                        Report.
                      </li>
                      <li>
                        Choose format (PDF/XML) and location, then click Save.
                      </li>
                      <li>
                        A message “Selected report saved successfully!” appears.
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Cloud Sync */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Cloud className="w-6 h-6 mr-3 text-indigo-600" />
                  Send Report to D-Secure Cloud
                </h2>

                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <p className="text-gray-700">
                    D-SecureFile Eraser lets you send selected reports to{' '}
                    <strong className="text-indigo-600">D-Secure Cloud</strong>.
                    Ensure Cloud Console connection is active.
                  </p>

                  <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                    <li>Open D-SecureFile Eraser.</li>
                    <li>Select Report from menu.</li>
                    <li>
                      Click Cloud icon from Action tab to send report to D-Secure
                      Cloud.
                    </li>
                  </ol>

                  <div className="p-4 bg-green-50 rounded-lg flex space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800">
                      ✅ Indicates the report was successfully sent to Cloud.
                    </p>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg flex space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-sm text-red-800">
                      ⚠️ Indicates the report failed to send.
                    </p>
                  </div>
                </div>
              </div>

              {/* Report Customization */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-purple-600" />
                  Change Report Settings
                </h2>

                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    D-SecureFile Eraser allows customization of reports.
                  </p>
                  <ol className="space-y-3 text-gray-700 list-decimal list-inside mb-4">
                    <li>Go to D-SecureFile Eraser.</li>
                    <li>Select Report from left menu.</li>
                    <li>Click Report Settings button.</li>
                    <li>Edit fields as per need.</li>
                  </ol>

                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-4 py-2 text-left text-gray-900 font-semibold">
                            Field Name
                          </th>
                          <th className="border px-4 py-2 text-left text-gray-900 font-semibold">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-gray-700">
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Erasure Person
                          </td>
                          <td className="border px-4 py-2">
                            Enter name and department of erasure person.
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border px-4 py-2 font-semibold">
                            Validator Person
                          </td>
                          <td className="border px-4 py-2">
                            Enter name and department of validator.
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2 font-semibold">
                            Signature Settings
                          </td>
                          <td className="border px-4 py-2">
                            Add technician and validator signature images.
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border px-4 py-2 font-semibold">
                            Company Settings
                          </td>
                          <td className="border px-4 py-2">
                            Add logo or watermark image.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-amber-50 rounded-lg flex space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <p className="text-sm text-amber-800">
                      <strong>Note:</strong> Signature, Logo, and Watermark
                      images must be in correct size; otherwise previous image
                      will be used.
                    </p>
                  </div>

                  <p className="text-gray-700 mt-4">
                    After editing, click <strong>Save</strong> to update
                    settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManagementPage;
