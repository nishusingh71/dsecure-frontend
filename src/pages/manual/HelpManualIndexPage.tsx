import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronRight, Download, Play, Book, HelpCircle, FileText, Calendar, Settings, Mouse, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpManualIndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>DSecure Help Manual - Complete User Guide & Documentation</title>
        <meta name="description" content="Access the complete DSecure Help Manual with visual guides, FAQs, tutorials, and comprehensive documentation for all product features." />
        <meta name="keywords" content="DSecure manual, help guide, user documentation, installation guide, FAQ, tutorials" />
      </Helmet>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                to="/support" 
                className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Support
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 dark:text-white font-medium">Help Manual</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <Book className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              DSecure Help Manual
            </h1>
          </div>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Complete Visual Guide To Learn More About DSecure Products, Installation, FAQs, Report Management & Advanced Settings Configuration
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">7</div>
              <div className="text-blue-200 text-sm">Complete Guides</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">19+</div>
              <div className="text-blue-200 text-sm">FAQ Answers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-blue-200 text-sm">Visual Guides</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-blue-200 text-sm">Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Getting Started Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Play className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Getting Started</h2>
              <p className="text-gray-600 dark:text-gray-300">Essential guides for new users</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              to="/support/help-manual/installation-guide"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Installation Guide</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Step-by-step visual installation process with screenshots and detailed instructions for all platforms.
              </p>
            </Link>

            <Link 
              to="/support/help-manual/system-setup"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors">
                  <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">System Setup</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Full disk access configuration, system permissions, and initial setup for macOS, Windows, and Linux.
              </p>
            </Link>

            <Link 
              to="/support/help-manual/working-guide"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                  <Mouse className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Working with DSecure</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Complete user interface guide, activation process, and file erasure operations with visual examples.
              </p>
            </Link>
          </div>
        </div>

        {/* Advanced Features Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Features</h2>
              <p className="text-gray-600 dark:text-gray-300">Management, reporting, and automation</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/support/help-manual/report-management"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Report Management</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Learn to preview, save, customize, and sync erasure reports to cloud with comprehensive management features.
              </p>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                ✓ Preview Reports ✓ Save & Export ✓ Cloud Sync ✓ Customization
              </div>
            </Link>

            <Link 
              to="/support/help-manual/schedule-settings"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                  <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Scheduling & Settings</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Configure automated erasure tasks, customize themes, and manage general application settings.
              </p>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
                ✓ Task Scheduling ✓ Theme Configuration ✓ General Settings ✓ Automation
              </div>
            </Link>
          </div>
        </div>

        {/* Support & FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Support & FAQ</h2>
              <p className="text-gray-600 dark:text-gray-300">Get answers and find solutions</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Link 
              to="/support/help-manual/faqs"
              className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Get answers to common questions about DSecure features, usage, troubleshooting, and best practices.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">General Questions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">Erasure Process</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">File Types & System</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-400">Reports & Cloud</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </div>
            </Link>
          </div>
        </div>

        {/* Complete Manual Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Book className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Reference</h2>
              <p className="text-gray-600 dark:text-gray-300">All-in-one comprehensive manual</p>
            </div>
          </div>
          
          <Link 
            to="/support/help-manual/complete-manual"
            className="block bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-8 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                <Book className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Complete DSecure Manual</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive single-page manual covering all D-Securescreenshots content transformed for DSecure, including FAQs, cloud integration, settings, reports, scheduling, and advanced configurations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">All Screenshots Converted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Searchable Content</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Expandable Sections</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
          </Link>
        </div>

        {/* Quick Access */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              to="/support/help-manual/complete-manual" 
              className="text-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              <Book className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="font-medium text-white text-sm">Complete Manual</div>
            </Link>
            <Link 
              to="/support/help-manual/installation-guide" 
              className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <Download className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="font-medium text-gray-900 dark:text-white text-sm">Installation</div>
            </Link>
            <Link 
              to="/support/help-manual/system-setup" 
              className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <Settings className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <div className="font-medium text-gray-900 dark:text-white text-sm">Setup</div>
            </Link>
            <Link 
              to="/support/help-manual/working-guide" 
              className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <Mouse className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <div className="font-medium text-gray-900 dark:text-white text-sm">User Guide</div>
            </Link>
            <Link 
              to="/support/help-manual/complete-manual" 
              className="text-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <Book className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <div className="font-medium text-gray-900 dark:text-white text-sm">Complete Manual</div>
            </Link>
          </div>
        </div>

        {/* Help Note */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Need Additional Help?</h3>
            <p className="text-blue-800 dark:text-blue-300 mb-4">
              Can't find what you're looking for? Our support team is ready to help you.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Contact Support
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpManualIndexPage;