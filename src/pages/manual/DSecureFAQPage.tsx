import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ChevronRight, HelpCircle, Search, Settings, Download, Shield, Cloud, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DSecureFAQPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>DSecure FAQ - Frequently Asked Questions | Complete User Guide</title>
        <meta name="description" content="Get answers to frequently asked questions about DSecure File Eraser. Comprehensive FAQ covering software features, usage, troubleshooting, and best practices." />
        <meta name="keywords" content="DSecure FAQ, file eraser questions, data erasure help, secure deletion support, DSecure troubleshooting" />
      </Helmet>

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
              <span className="text-gray-900 font-medium">DSecure FAQ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-blue-100 p-2 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Frequently Asked Questions (FAQs)
                </h1>
                <p className="text-gray-600 mt-2">
                  Find answers to common questions about DSecure File Eraser
                </p>
              </div>
            </div>

            {/* FAQ Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main FAQ Content */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* General Questions */}
                <div className="space-y-6" id="general">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Settings className="w-6 h-6 mr-3 text-blue-600" />
                    General Questions
                  </h2>

                  {/* Question 1 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                      What does the demo version of DSecure File Eraser do?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The demo version of the software only allows you to select and list traces of files, folders, web browsers, applications or system files. 
                      To perform any erasure tasks, you must purchase or activate the full software.
                    </p>
                  </div>

                  {/* Question 2 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                      Why do I need to use DSecure File Eraser?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      When you delete a file in your computer, it is not actually erased. It is just marked as deleted and the space it was using is 
                      made available for other files to be stored. This means that the data can still be recovered by using data recovery software. 
                      <span className="font-semibold text-blue-600"> DSecure File Eraser</span> helps you remove all traces of deleted files, 
                      applications and internet traces from your system thereby ensuring your data privacy. Also, the 
                      <span className="font-semibold text-blue-600"> Erase Free Space</span> feature of the software completely 
                      erases data in the free space of the storage which leaves no possibility of data to be recovered.
                    </p>
                  </div>

                  {/* Question 3 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                      Does DSecure File Eraser remove data beyond recovery?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, <span className="font-semibold text-blue-600">DSecure File Eraser</span> removes data beyond recovery.
                    </p>
                  </div>

                  {/* Question 4 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                      Does erasure cause any harm to my hard drive?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Erasing data using <span className="font-semibold text-blue-600">DSecure File Eraser</span> does not cause any harm to the hard drive.
                    </p>
                  </div>

                  {/* Question 5 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                      Can I erase a specific file using DSecure File Eraser?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, you can erase specific files by adding them to the erasure list or dragging the items and dropping them to the software or you 
                      can also erase selected files through <span className="font-semibold text-blue-600">Search & Erase</span> option.
                    </p>
                    <div className="mt-4 text-sm text-gray-600">
                      For more information, refer to <span className="text-blue-600">Erase Files</span> and <span className="text-blue-600">Folders</span> section.
                    </div>
                  </div>
                </div>

                {/* Erasure Process */}
                <div className="space-y-6" id="erasure">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-green-600" />
                    Erasure Process
                  </h2>

                  {/* Question 6 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                      What if data or selected files are not erased after the complete erasure process?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      It happens in case you have not closed the application during the erasing process or if you are viewing newly created files and 
                      folders after the completion that is normal to observe in the erasure process.
                    </p>
                  </div>

                  {/* Question 7 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
                      What if the data of System Traces are not erased after the completion of an erasure process?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      This problem arises if you view the recently created files or folders, as the operating system automatically creates some system 
                      traces at different time intervals.
                    </p>
                  </div>

                  {/* Question 8 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">8</span>
                      What are passes in Erasing algorithms?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Passes in erasing algorithms are number of times overwriting process is repeated. For example, in Peter Gutmann method, a series 
                      of 35 patterns is written over the region to be erased.
                    </p>
                  </div>

                  {/* Question 9 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">9</span>
                      Which algorithm should I choose for the best erasure?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      It depends upon how many times an algorithm overwrites the data precisely or the number of passes used to erase the data. The 
                      more the number of passes used by an algorithm, the more effective it is. Each algorithm performs a different set of features from 
                      the other, you can choose the desired algorithm as per their requirement. See List of <span className="font-semibold text-blue-600">Erasure Algorithms</span> and their <span className="font-semibold text-blue-600">Description</span>, to know more.
                    </p>
                  </div>

                  {/* Question 10 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">10</span>
                      What if the software is taking too long to erase the data?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      It depends on the size of the data, the configuration of the system and the algorithm you are using to erase the data. 
                      A large amount of data, lesser configuration and more number of passes may consume more time for erasure.
                    </p>
                  </div>
                </div>

                {/* File Types & System */}
                <div className="space-y-6" id="files">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-purple-600" />
                    File Types & System
                  </h2>

                  {/* Question 12 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-purple-100 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">12</span>
                      Which types of files cannot be erased using DSecure File Eraser?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      System files are critical files that are used by operating systems to run your computer. So it is not possible to erase system files.
                    </p>
                  </div>

                  {/* Question 13 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-purple-100 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">13</span>
                      Is it possible to erase specific internet activities instead of clearing all of them?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, you can choose specific items or internet activities from the list of browsers you want to erase. See <span className="font-semibold text-blue-600">Erase Internet Traces</span>, to know more.
                    </p>
                  </div>

                  {/* Question 17 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-purple-100 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">17</span>
                      Can I use DSecure File Eraser to erase the free space on the primary partition of my hard drive?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, it is secure to use <span className="font-semibold text-blue-600">DSecure File Eraser</span> to erase data in the 
                      <span className="font-semibold text-blue-600"> free space</span> of the hard drive's primary partition as it removes the 
                      free space left by the deletion of files and folders.
                    </p>
                  </div>
                </div>

                {/* Reports & Cloud */}
                <div className="space-y-6" id="reports">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Cloud className="w-6 h-6 mr-3 text-indigo-600" />
                    Reports & Cloud Features
                  </h2>

                  {/* Question 15 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">15</span>
                      Can I preview and save the erasure reports?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, you can do it. Refer to <span className="font-semibold text-blue-600">Preview and Save</span> section to know more.
                    </p>
                  </div>

                  {/* Question 16 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">16</span>
                      Can I get the reports of the data I have deleted so far?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, <span className="font-semibold text-blue-600">DSecure File Eraser</span> provides erasure reports. See 
                      <span className="font-semibold text-blue-600"> Reports</span> for more details.
                    </p>
                  </div>

                  {/* Scheduling Question */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">18</span>
                      What is the process for scheduling an erase traces task for a specific browser?
                    </h3>
                    <div className="text-gray-700 leading-relaxed space-y-4">
                      <p>To schedule an eraser task for a specific browser, you need to configure the default settings for that browser in the 
                      <span className="font-semibold text-blue-600"> DSecure File Eraser</span> settings. After that, select the Schedule erasure task for the desired duration.</p>
                      
                      <div className="ml-6 space-y-3">
                        <p className="font-semibold">Follow the steps below to schedule an erase traces task for a specific browser:</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">1</span>
                            <span>Click on the <strong>Settings</strong> icon displayed on the screen.</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">2</span>
                            <span>Select <strong>Erase Traces</strong> tab from the <strong>Settings</strong> window that appears next.</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">3</span>
                            <span>Select <strong>Internet Activity</strong> tab.</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">4</span>
                            <span>Choose the <strong>browser</strong> you want to schedule to erase traces and click <strong>OK</strong>.</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">5</span>
                            <span>Select <strong>Schedule Erasure</strong> from <strong>Select Option</strong> displayed on the left pane of the screen.</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">6</span>
                            <span>Select <strong>Erase Traces</strong> from the right pane of the screen.</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">7</span>
                            <span>Choose the required frequency period and specific time for running the eraser task.</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">8</span>
                            <span>Click <strong>OK</strong> to schedule.</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm">
                          <strong>Note:</strong> Once you have fixed the erase traces task for the particular browser, it will run automatically at the 
                          designated time and date, erasing all the traces of your browsing history, cookies, and related data.
                        </p>
                      </div>
                      
                      <p className="text-sm">
                        To know more, please refer to Set <span className="font-semibold text-blue-600">Schedule Erasure for Erase Traces</span> section.
                      </p>
                    </div>
                  </div>

                  {/* Auto Scheduling */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">19</span>
                      Is it possible for the software to automatically erase traces of any files or folder?
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, <span className="font-semibold text-blue-600">DSecure File Eraser</span> provides an option to schedule an eraser task to perform automatically at predefined period. Refer to 
                      <span className="font-semibold text-blue-600"> Set Schedule Erasure for Files and Folders</span> section to schedule erasure task automatically.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Navigation */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-blue-600" />
                    Quick Navigation
                  </h3>
                  <div className="space-y-2 text-sm">
                    <a href="#general" className="block text-blue-600 hover:underline">General Questions</a>
                    <a href="#erasure" className="block text-blue-600 hover:underline">Erasure Process</a>
                    <a href="#files" className="block text-blue-600 hover:underline">File Types & System</a>
                    <a href="#reports" className="block text-blue-600 hover:underline">Reports & Cloud</a>
                  </div>
                </div>

                {/* Key Features */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    Key Features
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Secure file erasure beyond recovery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Multiple erasure algorithms</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Scheduled erasure tasks</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Comprehensive reporting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Free space erasure</span>
                    </div>
                  </div>
                </div>

                {/* Support Notice */}
                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-amber-600" />
                    Need More Help?
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Can't find the answer you're looking for? Our support team is here to help.
                  </p>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
                  >
                    Contact Support
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                {/* Related Guides */}
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Download className="w-5 h-5 mr-2 text-gray-600" />
                    Related Guides
                  </h3>
                  <div className="space-y-2 text-sm">
                    <Link to="/support/help-manual/installation-guide" className="block text-blue-600 hover:underline">
                      Installation Guide
                    </Link>
                    <Link to="/support/help-manual/system-setup" className="block text-blue-600 hover:underline">
                      System Setup
                    </Link>
                    <Link to="/support/help-manual/working-guide" className="block text-blue-600 hover:underline">
                      Working with DSecure
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSecureFAQPage;
