import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const WorkingWithDSecurePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("erase-files");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("working-with-dsecure")} />
      <Helmet>
        <title>Working with D-Secure File Eraser - Complete User Guide</title>
        <meta 
          name="description" 
          content="Complete guide to working with D-Secure File Eraser including file erasure, free space cleaning, traces cleanup, and software activation."
        />
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 via-emerald-800 to-emerald-900 py-20">
        <div className="container-responsive">
          <Reveal>
            <div className="text-center text-white">
              <div className="inline-flex items-center bg-emerald-400 text-emerald-900 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🚀 User Operations
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Working with D-Secure File Eraser
              </h1>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Complete operational guide covering file erasure, free space cleaning, trace removal, and software activation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/support/manual/system-setup"
                  className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  ← Previous: System Setup
                </Link>
                <Link
                  to="/support/help-manual"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Back to Manual
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-responsive">
          
          {/* Interface Overview */}
          <Reveal>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">DSecure User Interface</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  The main user interface of <strong>D-Secure File Eraser</strong> provides access to all erasure functions through intuitive tabs and buttons.
                </p>
              </div>
              
              {/* Interface Preview */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 mb-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Window Header */}
                  <div className="bg-slate-100 px-4 py-2 flex items-center justify-between border-b">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <h4 className="font-medium text-slate-700">DSecure File Eraser - Complete</h4>
                    <div className="w-16"></div>
                  </div>
                  
                  {/* Interface Content */}
                  <div className="p-6">
                    <div className="flex gap-4 mb-6">
                      {/* Tabs */}
                      <div className="flex flex-col gap-2">
                        {[
                          { id: "erase-files", label: "Erase Files & Folders", icon: "📁", active: activeTab === "erase-files" },
                          { id: "erase-space", label: "Erase Free Space", icon: "💾", active: activeTab === "erase-space" },
                          { id: "erase-traces", label: "Erase Traces", icon: "🔍", active: activeTab === "erase-traces" },
                          { id: "schedule", label: "Schedule Erasure", icon: "⏰", active: activeTab === "schedule" },
                          { id: "reports", label: "Reports", icon: "📊", active: activeTab === "reports" }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                              tab.active 
                                ? 'bg-emerald-500 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            <span className="text-lg">{tab.icon}</span>
                            <span className="font-medium">{tab.label}</span>
                          </button>
                        ))}
                      </div>
                      
                      {/* Content Area */}
                      <div className="flex-1 bg-slate-50 rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2">Drag & Drop Items to Erase</h3>
                        <p className="text-slate-600 text-center">Select files and folders for secure deletion</p>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-center">
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium">
                        Erase Now
                      </button>
                      <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium">
                        Add Items
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                        Save Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-600 text-center">
                The user interface contains <strong>tabs and buttons</strong> which allows you to access various features of the software.
              </p>
            </div>
          </Reveal>

          {/* Tabs and Buttons Reference */}
          <Reveal>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-4a2 2 0 00-2-2H7m0-4h10a2 2 0 002-2V5a2 2 0 00-2-2H7m0 0V3a2 2 0 012-2h4a2 2 0 012 2v2H9V3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Getting Familiar with Tabs and Buttons</h2>
              </div>
              
              <p className="text-slate-600 mb-8">Options present on the main user interface are:</p>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Tabs Section */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Tabs</h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Erase Files & Folders",
                        description: "Click this tab to erase a selected file and folder.",
                        icon: "📁",
                        color: "bg-blue-100 text-blue-600"
                      },
                      {
                        name: "Erase Free Space",
                        description: "Click this tab to erase the free space from selected volume.",
                        icon: "💾",
                        color: "bg-green-100 text-green-600"
                      },
                      {
                        name: "Erase Traces",
                        description: "Click this tab to erase Application, Internet and System traces.",
                        icon: "🔍",
                        color: "bg-purple-100 text-purple-600"
                      },
                      {
                        name: "Schedule Erasure",
                        description: "Click this tab to schedule erasing tasks to run them automatically at specified periods.",
                        icon: "⏰",
                        color: "bg-orange-100 text-orange-600"
                      },
                      {
                        name: "Reports",
                        description: "Click this tab to view and save the erasure reports.",
                        icon: "📊",
                        color: "bg-red-100 text-red-600"
                      }
                    ].map((tab, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tab.color}`}>
                          <span className="text-lg">{tab.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">{tab.name}</h4>
                          <p className="text-slate-600 text-sm">{tab.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons Section */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Buttons</h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Erase Now",
                        description: "Click this button to initiate the erasure process.",
                        icon: "▶️",
                        buttonStyle: "bg-emerald-500 text-white"
                      },
                      {
                        name: "Add Items",
                        description: "Click this button to add the desired files to the erasure list.",
                        icon: "➕",
                        buttonStyle: "bg-slate-200 text-slate-700"
                      },
                      {
                        name: "Save",
                        description: "Click this button to save selected reports in desired format.",
                        icon: "💾",
                        buttonStyle: "bg-blue-500 text-white"
                      },
                      {
                        name: "Search & Erase",
                        description: "Use this button to search and erase specified files on your system.",
                        icon: "🔍",
                        buttonStyle: "bg-purple-500 text-white"
                      },
                      {
                        name: "Report Settings",
                        description: "Click this button to customize the reports before saving.",
                        icon: "⚙️",
                        buttonStyle: "bg-orange-500 text-white"
                      },
                      {
                        name: "Reset",
                        description: "Click this button to clear the settings fields.",
                        icon: "🔄",
                        buttonStyle: "bg-gray-500 text-white"
                      },
                      {
                        name: "Settings",
                        description: "Click this button to change the software settings.",
                        icon: "⚙️",
                        buttonStyle: "bg-indigo-500 text-white"
                      }
                    ].map((button, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                        <button className={`px-3 py-2 rounded text-sm font-medium ${button.buttonStyle}`}>
                          {button.icon} {button.name}
                        </button>
                        <div className="flex-1">
                          <p className="text-slate-600 text-sm mt-1">{button.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Erase Files and Folders Section */}
          <Reveal>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <span className="font-bold text-emerald-600">1</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Erase Files and Folders</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-slate-600 mb-4">
                  D-Secure File Eraser is a powerful software designed to securely erase files/folders from your hard drive. You can select and delete 
                  multiple files/folders simultaneously using a range of algorithms to achieve maximum security.
                </p>
                <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded">
                  <p className="text-emerald-800">
                    <strong>Note:</strong> The erased files or folders are permanently deleted from your drive, making them unrecoverable.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Step 1: Run Software */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Step 1: Launch DSecure</h3>
                    <p className="text-slate-600 mb-4">
                      Select <strong>Erase Files & Folders</strong> from Select Option displayed on the left pane of the screen.
                    </p>
                    <div className="space-y-2">
                      <p className="text-slate-700 font-medium">Methods available:</p>
                      <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm">
                        <li>Drag and Drop items directly</li>
                        <li>Using Add Items button</li>
                        <li>Search & Erase for specific files</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h4 className="font-bold text-slate-900 mb-4 text-center">Select Option</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-emerald-500 text-white rounded-lg">
                          <span className="text-lg">📁</span>
                          <span className="font-medium">Erase Files & Folders</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-100 text-slate-700 rounded-lg">
                          <span className="text-lg">💾</span>
                          <span className="font-medium">Erase Free Space</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-100 text-slate-700 rounded-lg">
                          <span className="text-lg">🔍</span>
                          <span className="font-medium">Erase Traces</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Add Files */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Step 2: Add Files for Erasure</h3>
                    <p className="text-slate-600 mb-4">
                      There are three methods to select files/folders and add them to erasure list:
                    </p>
                    <div className="space-y-3">
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                        <h4 className="font-medium text-blue-900">By Drag and Drop</h4>
                        <p className="text-blue-800 text-sm">Drag the folder from your system and drop them in the box.</p>
                      </div>
                      <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                        <h4 className="font-medium text-green-900">Using Add Items</h4>
                        <p className="text-green-800 text-sm">Click Add Items button from the toolbar and select files/folders.</p>
                      </div>
                      <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
                        <h4 className="font-medium text-purple-900">By Search & Erase</h4>
                        <p className="text-purple-800 text-sm">Click Search & Erase option to search and add files.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-dashed border-slate-300">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Drop Zone</h4>
                      <p className="text-slate-600 text-sm">Drag & Drop Items to Erase</p>
                      <p className="text-slate-500 text-xs mt-2">Files and folders will appear here</p>
                    </div>
                  </div>
                </div>

                {/* Step 3: Confirmation */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Step 3: Start Erasure Process</h3>
                    <p className="text-slate-600 mb-4">
                      After adding files/folders to the erasure list, click <strong>Erase Now</strong> to start the erasure process.
                    </p>
                    <div className="space-y-2">
                      <p className="text-slate-700 font-medium">What happens next:</p>
                      <ol className="list-decimal list-inside text-slate-600 space-y-1 text-sm">
                        <li>Confirmation message appears</li>
                        <li>Click "Proceed" to continue</li>
                        <li>Progress bar shows erasure status</li>
                        <li>Completion summary is displayed</li>
                      </ol>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {/* Confirmation Dialog */}
                    <div className="bg-white rounded-lg shadow-md p-6 border border-red-200">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.764 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-slate-900">Confirm Erasure</h4>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">This action will erase the selected data permanently. Deleted data cannot be recovered. Are you sure?</p>
                      <div className="flex gap-3">
                        <button className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium">Proceed</button>
                        <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded text-sm font-medium">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Software Activation Section */}
          <Reveal>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="font-bold text-orange-600">2</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Activating the Software</h2>
              </div>
              
              <div className="mb-6">
                <p className="text-slate-600 mb-4">
                  The demo version is for evaluation purpose only. You need to activate the software to use its full functionality. 
                  Use the Activation key included with after purchasing the software to activate it.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-blue-800">
                    <strong>Note:</strong> Make sure that you have an active internet connection.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Activation Steps */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Steps to activate the software:</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-emerald-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <p className="text-slate-700">Run <strong>DSecure File Eraser</strong></p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-emerald-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <p className="text-slate-700">Click on the <strong>Activation</strong> icon displayed on the screen. An <strong>Activation</strong> window appears.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-emerald-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <p className="text-slate-700">Enter the <strong>Activation Key</strong> and click <strong>Activate</strong> button.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 01-2 2m2-2h2.5M9 10V8a2 2 0 012-2h1m-3 4h3m5 0l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-slate-900">Activation</h4>
                        <p className="text-slate-500 text-sm mb-4">Enter activation key to activate the product</p>
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          className="w-full border border-slate-300 rounded px-3 py-2 text-center font-mono"
                          readOnly
                        />
                        <p className="text-slate-500 text-xs text-center">This activation key will be in your email</p>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-emerald-500 text-white py-2 rounded font-medium">Activate</button>
                          <button className="px-4 bg-slate-200 text-slate-700 py-2 rounded">Cancel</button>
                        </div>
                        <p className="text-blue-600 text-xs text-center cursor-pointer hover:underline">I don't have an activation key</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">Activation Success</h3>
                    <p className="text-slate-600 mb-4">
                      A message <strong>"D-Secure File Eraser Activated Successfully"</strong> is displayed after the process is completed successfully.
                    </p>
                    <div className="space-y-2">
                      <p className="text-slate-700 font-medium">After successful activation:</p>
                      <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm">
                        <li>Click OK to proceed to main interface</li>
                        <li>All features are now unlocked</li>
                        <li>Full functionality is available</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Activation</h4>
                      <p className="text-emerald-600 text-sm font-medium mb-4">DSecure File Eraser Activated Successfully!</p>
                      <button className="bg-emerald-500 text-white px-6 py-2 rounded font-medium">OK</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Troubleshooting Section */}
          <Reveal>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.764 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Activation Troubleshooting</h2>
              </div>
              
              <p className="text-slate-600 mb-6">
                If you receive an error while activating the software, follow and verify the steps given below to fix the issue:
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Check installer and re-enter activation key",
                    description: "Make sure you have downloaded the correct installer. Use the download link given in the email or visit the desired product page to first download the software and then activate it using the code provided on your email."
                  },
                  {
                    title: "Uninstall All versions of the software",
                    description: "Uninstall any version of the software you may have installed earlier. Then re-install the desired version of the software and activate it."
                  },
                  {
                    title: "Re-enter the correct activation key without blank spaces",
                    description: "If copy and pasting the activation code does not work, try to enter it manually. Sometimes, while copying, you may copy the blank spaces, which can cause software activation failure. Entering code manually overcomes this issue. Alternatively, you may copy the code from email to notepad and then remove empty space from the beginning and end of the code. Then copy and paste the code in the activation window of the software."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <h4 className="font-bold text-red-900 mb-2">{index + 1}. {item.title}</h4>
                    <p className="text-red-800 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Next Steps */}
          <Reveal>
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-8 text-white mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-xl mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Ready to Start Erasing!</h3>
                <p className="text-blue-100 mb-6">
                  You're now ready to use D-Secure File Eraser for secure data deletion operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/support/manual/user-interface"
                    className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    Next: Advanced Operations →
                  </Link>
                  <Link
                    to="/support/help-manual"
                    className="bg-blue-400 hover:bg-blue-300 text-blue-900 font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Back to Manual
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
};

export default WorkingWithDSecurePage;