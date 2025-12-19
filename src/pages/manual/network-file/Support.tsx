import React from "react";
import { Helmet } from "react-helmet-async";
import { HelpCircle, Mail, MessageCircle, Book, Download, AlertCircle, CheckCircle, Globe } from "lucide-react";

const Support: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Support & Updates - DSecure Network File Manual</title>
        <meta
          name="description"
          content="Get technical support, access resources, and learn how to update DSecure File Eraser Network."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Support & Updates</h1>
          </div>
          <p className="text-xl text-gray-600">
            Get help, access resources, and keep your software up-to-date with the latest features and security patches.
          </p>
        </div>

        {/* Support Options */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">We're Here to Help</h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            DSecureTech provides multiple support channels to ensure you get the help you need, when you need it.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Mail className="w-7 h-7 text-green-600" />
            Contact Technical Support
          </h2>
          
          <div className="space-y-6">
            {/* Email Support */}
            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-green-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-700 text-lg mb-3">
                    For detailed technical questions or issues that require investigation
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <p className="text-gray-600 text-sm mb-2">Send your queries to:</p>
                    <a href="mailto:techsupport@dsecuretech.com" className="text-green-600 font-semibold text-lg hover:text-green-700">
                      techsupport@dsecuretech.com
                    </a>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <strong>Response Time:</strong> Usually within 24 business hours
                  </div>
                </div>
              </div>
            </div>

            {/* Live Chat */}
            <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-6">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-8 h-8 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat with Technician</h3>
                  <p className="text-gray-700 text-lg mb-3">
                    Real-time assistance for urgent issues or quick questions
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-gray-600 text-sm mb-2">Access chat from:</p>
                    <p className="text-blue-600 font-semibold">DSecure Support Portal → Chat Now</p>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <strong>Availability:</strong> Monday - Friday, 9 AM - 6 PM (your local timezone)
                  </div>
                </div>
              </div>
            </div>

            {/* Web Portal */}
            <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-6">
              <div className="flex items-start gap-4">
                <Globe className="w-8 h-8 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Portal & Knowledgebase</h3>
                  <p className="text-gray-700 text-lg mb-3">
                    Self-service articles, FAQs, video tutorials, and submit support tickets
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="text-gray-600 text-sm mb-2">Visit the portal at:</p>
                    <a href="https://support.dsecuretech.com" className="text-purple-600 font-semibold text-lg hover:text-purple-700" target="_blank" rel="noopener noreferrer">
                      support.dsecuretech.com
                    </a>
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span>Searchable knowledge base</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span>Video tutorials and guides</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                      <span>Ticket tracking system</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Enquiry */}
            <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-lg p-6">
              <div className="flex items-start gap-4">
                <Book className="w-8 h-8 text-orange-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit an Enquiry</h3>
                  <p className="text-gray-700 text-lg mb-3">
                    For sales questions, licensing inquiries, or general information
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-orange-200">
                    <p className="text-gray-600 text-sm mb-2">Use the web form at:</p>
                    <p className="text-orange-600 font-semibold">support.dsecuretech.com/contact</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Software Updates */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Download className="w-7 h-7 text-indigo-600" />
            Software Updates & Maintenance
          </h2>
          
          <div className="space-y-5 text-lg">
            <p className="text-gray-700 leading-relaxed">
              Keep DSecure File Eraser Network up-to-date with the latest features, security patches, and performance improvements.
            </p>

            {/* Update Wizard */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-xl">Using the Update Wizard</h3>
              
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold flex items-center justify-center mt-0.5">1</span>
                  <div>
                    <strong className="text-gray-900">Open Update Wizard</strong>
                    <p className="text-gray-700 mt-1">Navigate to <strong>Tools</strong> → <strong>Update Wizard</strong></p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold flex items-center justify-center mt-0.5">2</span>
                  <div>
                    <strong className="text-gray-900">Check for Updates</strong>
                    <p className="text-gray-700 mt-1">Click <strong>Check for Updates</strong> to connect to update server</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold flex items-center justify-center mt-0.5">3</span>
                  <div>
                    <strong className="text-gray-900">Review Available Updates</strong>
                    <p className="text-gray-700 mt-1">If updates are available, you'll see a list with version numbers and descriptions</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold flex items-center justify-center mt-0.5">4</span>
                  <div>
                    <strong className="text-gray-900">Download & Install</strong>
                    <p className="text-gray-700 mt-1">Click <strong>Update</strong> to download and install automatically</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold flex items-center justify-center mt-0.5">5</span>
                  <div>
                    <strong className="text-gray-900">Restart if Required</strong>
                    <p className="text-gray-700 mt-1">Some updates may require restarting the application</p>
                  </div>
                </li>
              </ol>
            </div>

            {/* Auto-Update Settings */}
            <div className="border border-indigo-200 rounded-lg p-6 bg-indigo-50/30">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
                Automatic Update Check
              </h3>
              <p className="text-gray-700 mb-3">
                By default, DSecure checks for updates automatically when you start the application.
              </p>
              <div className="bg-white rounded p-4 border border-indigo-200">
                <strong className="text-gray-900">To disable auto-check:</strong>
                <p className="text-gray-700 mt-1">Tools → Settings → Uncheck "Check for updates at startup"</p>
              </div>
            </div>

            {/* Update Failure Reasons */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
                <div className="flex-1">
                  <strong className="text-amber-900 text-lg block mb-2">Common Update Issues</strong>
                  <ul className="space-y-2 text-amber-900">
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">•</span>
                      <span><strong>No Internet Connection:</strong> Ensure the computer can reach the update server</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">•</span>
                      <span><strong>No Updates Available:</strong> You're already running the latest version</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">•</span>
                      <span><strong>Missing Files:</strong> Contact support for manual update package</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">•</span>
                      <span><strong>Firewall Blocking:</strong> Allow update server through firewall</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Help Tips */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-green-600 rounded"></span>
            Tips for Getting Quick Help
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
              <div className="text-lg text-gray-700">
                <strong className="text-gray-900">Provide Version Number:</strong> Include your software version (found in Help → About)
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
              <div className="text-lg text-gray-700">
                <strong className="text-gray-900">Include Error Messages:</strong> Copy exact error messages or take screenshots
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
              <div className="text-lg text-gray-700">
                <strong className="text-gray-900">Describe Steps to Reproduce:</strong> Explain what you were doing when the issue occurred
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
              <div className="text-lg text-gray-700">
                <strong className="text-gray-900">System Information:</strong> Mention OS version, network environment, and AD setup
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 shrink-0" />
              <div className="text-lg text-gray-700">
                <strong className="text-gray-900">License Key Ready:</strong> Have your activation key available for verification
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Book className="w-7 h-7 text-purple-600" />
            Additional Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-700">This user manual and quick start guides</p>
            </div>

            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-700">Step-by-step video demonstrations</p>
            </div>

            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">Knowledge Base</h3>
              <p className="text-gray-700">Searchable articles and solutions</p>
            </div>

            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">Release Notes</h3>
              <p className="text-gray-700">Latest feature updates and fixes</p>
            </div>
          </div>
        </section>

        {/* Contact Summary */}
        <section className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Quick Contact Summary</h2>
          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <div>
              <h3 className="font-semibold mb-2">Technical Support</h3>
              <p className="text-green-100">techsupport@dsecuretech.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support Portal</h3>
              <p className="text-green-100">support.dsecuretech.com</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-green-100">Available Mon-Fri during business hours</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Updates</h3>
              <p className="text-green-100">Tools → Update Wizard</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;
