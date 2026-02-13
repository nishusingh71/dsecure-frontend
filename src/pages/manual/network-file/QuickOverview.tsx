import React from "react";
import { Helmet } from "react-helmet-async";
import { BookOpen, ChevronRight, Search, FileText } from "lucide-react";

const QuickOverview: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Quick Overview - D-Secure Network File Manual</title>
        <meta
          name="description"
          content="Learn how to navigate and use the D-Secure File Eraser Network documentation effectively."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Quick Overview</h1>
          </div>
          <p className="text-lg text-gray-600">
            Everything you need to know about navigating this guide and getting started with D-Secure File Eraser Network.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* About This Guide Section */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              About This Guide
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Welcome to the comprehensive user guide for D-Secure File Eraser Network. This documentation is designed to help you understand and effectively use all features of the software, from basic setup to advanced erasure operations.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Whether you're a first-time user looking to install the software or an experienced administrator managing network-wide erasure operations, this guide provides detailed instructions and best practices for every aspect of the application.
              </p>
            </div>
          </section>

          {/* Guide Structure Section */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What's Covered in This Guide
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This documentation is organized into logical sections that cover different aspects of D-Secure File Eraser Network:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">Quick Overview</h3>
                <p className="text-sm text-gray-600">
                  Introduction to the guide and navigation tips
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">First Steps</h3>
                <p className="text-sm text-gray-600">
                  Installation, licensing, UI overview, and initial setup
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">How To</h3>
                <p className="text-sm text-gray-600">
                  Step-by-step guides for common tasks and operations
                </p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">FAQs</h3>
                <p className="text-sm text-gray-600">
                  Answers to frequently asked questions
                </p>
              </div>
              
              <div className="border-l-4 border-teal-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">About D-SecureTech</h3>
                <p className="text-sm text-gray-600">
                  Company information and product portfolio
                </p>
              </div>
            </div>
          </section>

          {/* Navigation Tips Section */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How to Navigate This Guide
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Use the Sidebar Navigation
                  </h3>
                  <p className="text-gray-700">
                    The left sidebar provides quick access to all sections and subsections. Click on any topic to jump directly to that content. The navigation remains visible as you scroll for easy access.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Search for Specific Topics
                  </h3>
                  <p className="text-gray-700">
                    Use the search bar at the top of the page to find specific information quickly. Simply type keywords related to what you're looking for, and the guide will filter content to show relevant sections.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Follow Step-by-Step Instructions
                  </h3>
                  <p className="text-gray-700">
                    Throughout the guide, you'll find detailed step-by-step instructions marked with checkmarks. Follow these in order to complete tasks successfully.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Special Features Section */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Understanding Guide Elements
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-4">
                <div className="flex items-start gap-2">
                  <div className="mt-1 shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center">
                    ✓
                  </div>
                  <div>
                    <p className="text-blue-900 font-medium mb-1">Step-by-Step Instructions</p>
                    <p className="text-blue-800 text-sm">
                      Actions marked with checkmarks are sequential steps you should follow in order.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
                <div className="flex items-start gap-2">
                  <div className="text-amber-600 mt-0.5">⚠️</div>
                  <div>
                    <p className="text-amber-900 font-medium mb-1">Notes and Tips</p>
                    <p className="text-amber-800 text-sm">
                      Important information, tips, and best practices appear in highlighted boxes like this.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-400 rounded p-4">
                <div>
                  <p className="text-gray-900 font-medium mb-1">Additional Information</p>
                  <p className="text-gray-700 text-sm">
                    Supplementary details and context are provided in regular text blocks to help you understand the features better.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices Section */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Getting the Most Out of This Guide
            </h2>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-gray-700">
                  <strong>For New Users:</strong> Start with the "First Steps" section to install and set up the software properly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-gray-700">
                  <strong>For Quick Tasks:</strong> Use the search function or navigate directly to the "How To" section for specific operations.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-gray-700">
                  <strong>For Troubleshooting:</strong> Check the FAQs section for common issues and their solutions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <span className="text-gray-700">
                  <strong>Best Experience:</strong> Use modern browsers like Chrome, Firefox, or Edge for optimal viewing experience.
                </span>
              </li>
            </ul>
          </section>

          {/* Support Notice */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Need Additional Help?
            </h2>
            <p className="text-gray-700 mb-4">
              If you can't find what you're looking for in this guide, our support team is here to help. Visit the Support section for contact information and additional resources.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#support"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Support
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#faqs"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                View FAQs
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default QuickOverview;
