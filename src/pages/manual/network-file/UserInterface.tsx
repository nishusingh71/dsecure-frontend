import React from "react";
import SEOHead from "@/components/SEOHead";
import { getSEOForPage } from "@/utils/seo";
import { Layout, Menu, Settings, FileText, Cloud, HelpCircle, Monitor, MousePointer, Keyboard, Eye } from "lucide-react";

const UserInterface: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead seo={getSEOForPage('help-manual')} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Layout className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">User Interface Overview</h1>
          </div>
          <p className="text-lg text-gray-600">
            Master the D-Secure File Eraser Network interface with this comprehensive guide. Learn how to navigate ribbons, tabs, buttons, and panels efficiently to perform data erasure operations across your network with confidence and ease.
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Understanding the Interface Design
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            D-Secure File Eraser Network features a modern, intuitive interface inspired by Microsoft Office's ribbon design pattern. This familiar layout minimizes the learning curve for users accustomed to Windows applications while providing quick access to powerful erasure features. Whether you're a first-time user or an experienced IT administrator, the interface is designed to make complex network-wide data erasure operations straightforward and manageable.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The interface prioritizes clarity and efficiency. All major functions are organized logically into ribbon tabs, with the most frequently used operations prominently displayed on the Home ribbon. Context-sensitive panels adapt to your current task, showing relevant options and information without cluttering the screen. This thoughtful design allows you to focus on your erasure operations rather than searching for features, making your workflow smoother and more productive across daily tasks ranging from simple file deletions to complex scheduled erasure operations spanning multiple computers.
          </p>
        </section>

        {/* Main Interface Layout */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Monitor className="w-6 h-6 text-blue-600" />
            Main Interface Layout
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The D-Secure interface consists of four primary areas, each serving a specific purpose in your workflow. Understanding how these areas work together helps you navigate the application efficiently and complete tasks faster.
          </p>

          <div className="space-y-4">
            <div className="border border-blue-200 rounded-lg p-5 bg-blue-50/30 hover:bg-blue-50/50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center">1</span>
                Ribbon Bar (Top)
              </h3>
              <p className="text-gray-700 mb-2">
                The ribbon bar spans the top of the application window and contains all major functions organized into logical tabs (Home, Tools, Help, Buy Now, and Activation). Each tab groups related operations together, making them easy to find.
              </p>
              <p className="text-gray-600 text-sm">
                <strong>How to use:</strong> Click on any tab name to switch ribbons and access different function groups. The Home ribbon is displayed by default as it contains the most frequently used operations like Connect Domain, Reports, and Settings.
              </p>
            </div>

            <div className="border border-green-200 rounded-lg p-5 bg-green-50/30 hover:bg-green-50/50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-600 text-white text-sm flex items-center justify-center">2</span>
                Navigation Pane (Left Sidebar)
              </h3>
              <p className="text-gray-700 mb-2">
                Once you connect to your domain, the left navigation pane displays a hierarchical tree view of your Active Directory organizational units (OUs) and the computers within them. This tree structure mirrors your domain organization, making it intuitive to locate specific computers.
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>How to use:</strong> Expand OUs by clicking the arrow icons, then select any computer to view its details and available erasure options in the content area. You can search for specific computers using the search function above the tree.
              </p>
              <p className="text-gray-600 text-sm">
                The navigation pane also shows connection status indicators—green icons indicate online computers ready for erasure, while gray or red icons show offline or inaccessible systems.
              </p>
            </div>

            <div className="border border-purple-200 rounded-lg p-5 bg-purple-50/30 hover:bg-purple-50/50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-sm flex items-center justify-center">3</span>
                Content Area (Center Panel)
              </h3>
              <p className="text-gray-700 mb-2">
                The large central area is your primary workspace. Its content changes dynamically based on your current task. When you select a computer, it displays that computer's file system for browsing. When viewing reports, it shows filterable report lists with preview options.
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>How to use:</strong> This is where you'll spend most of your time—selecting files and folders for erasure, reviewing trace scan results, configuring scheduled tasks, or examining erasure reports. The content adapts intelligently to show exactly what you need for each operation.
              </p>
              <p className="text-gray-600 text-sm">
                Context-sensitive toolbars appear within this area when needed, providing quick access to actions relevant to your current task without cluttering the main ribbon.
              </p>
            </div>

            <div className="border border-orange-200 rounded-lg p-5 bg-orange-50/30 hover:bg-orange-50/50 transition-colors">
              <h3 className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-orange-600 text-white text-sm flex items-center justify-center">4</span>
                Status Bar (Bottom)
              </h3>
              <p className="text-gray-700 mb-2">
                The status bar at the bottom displays real-time information about your current operations and connection status. It shows domain connection status, erasure progress percentage, number of files processed, and any important notifications or warnings.
              </p>
              <p className="text-gray-600 text-sm">
                <strong>How to use:</strong> Monitor the status bar during erasure operations to track progress. It also displays helpful context information like the number of selected items, total size, and estimated completion time for ongoing operations.
              </p>
            </div>
          </div>
        </section>

        {/* Ribbons and Functions */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Menu className="w-6 h-6 text-blue-600" />
            Ribbon Tabs and Their Functions
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Each ribbon tab organizes related functions into logical groups. Understanding what each ribbon contains helps you quickly locate the tools you need without searching through menus. Here's a detailed breakdown of all available ribbons and their primary functions.
          </p>

          <div className="space-y-6">
            {/* Home Ribbon */}
            <div className="border-2 border-blue-300 rounded-xl p-6 bg-gradient-to-r from-blue-50 to-blue-100/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Menu className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Home Ribbon</h3>
                  <p className="text-sm text-gray-600">Your primary workspace for daily operations</p>
                </div>
              </div>
              <p className="text-gray-700 mb-5 leading-relaxed">
                The Home ribbon is your command center, containing the most frequently used functions for everyday data erasure operations. This is the default ribbon displayed when you launch the application, and it's where you'll perform most of your work—from connecting to your domain to viewing erasure reports.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">1</span>
                    Connect Domain
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    The starting point for all network operations. Click this to connect to your Active Directory domain using administrator credentials.
                  </p>
                  <p className="text-xs text-gray-600">
                    Once connected, the navigation pane populates with your domain's OUs and computers, allowing you to select targets for erasure operations.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">2</span>
                    Reports
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    Access comprehensive erasure reports for audit trails and compliance documentation.
                  </p>
                  <p className="text-xs text-gray-600">
                    Filter reports by date, type, or computer. Preview reports before exporting to PDF or XML. Send reports to D-Secure Cloud for centralized management.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">3</span>
                    Schedule Task
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    Create automated erasure tasks that run on defined schedules (once, daily, weekly, monthly, or on every boot).
                  </p>
                  <p className="text-xs text-gray-600">
                    Schedule both trace erasure and file/folder erasure. Edit or delete existing tasks. View task status and export task lists to CSV.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">4</span>
                    Settings
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    Configure application preferences including erasure algorithms, verification methods, and operational behaviors.
                  </p>
                  <p className="text-xs text-gray-600">
                    Choose from 17+ regulated erasure algorithms. Set ignore lists for files/folders to protect. Customize report branding with company logos.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">5</span>
                    Connect To Cloud
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    Sign in to D-Secure Cloud for centralized report management and remote monitoring capabilities.
                  </p>
                  <p className="text-xs text-gray-600">
                    Upload reports automatically, monitor multiple installations from a webportal, and access reports from anywhere securely.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4 border border-blue-200 hover:shadow-md transition-shadow">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-bold">6</span>
                    Search
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    Quickly locate specific computers, tasks, reports, or configuration items by typing keywords.
                  </p>
                  <p className="text-xs text-gray-600">
                    Search filters results in real-time as you type, highlighting matches to help you find what you need in large networks with hundreds of computers.
                  </p>
                </div>
              </div>
            </div>

            {/* Tools Ribbon */}
            <div className="border-2 border-purple-300 rounded-xl p-6 bg-gradient-to-r from-purple-50 to-purple-100/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tools Ribbon</h3>
                  <p className="text-sm text-gray-600">Maintenance and system utilities</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                The Tools ribbon provides essential maintenance functions to keep your DSecure installation up-to-date and running optimally. Regular updates ensure you have the latest security patches, algorithm improvements, and feature enhancements.
              </p>
              <div className="bg-white rounded-lg shadow-sm p-4 border border-purple-200">
                <p className="font-semibold text-gray-900 mb-2">Update Wizard</p>
                <p className="text-sm text-gray-700 mb-2">
                  Check for and install the latest software updates, security patches, and new features automatically.
                </p>
                <p className="text-xs text-gray-600">
                  The wizard can check for updates automatically on startup (configurable) or manually when you click this button. It downloads and installs updates with minimal disruption to your workflow.
                </p>
              </div>
            </div>

            {/* Help Ribbon */}
            <div className="border-2 border-green-300 rounded-xl p-6 bg-gradient-to-r from-green-50 to-green-100/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Help Ribbon</h3>
                  <p className="text-sm text-gray-600">Documentation and support resources</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Access comprehensive help resources, technical support, and product information through the Help ribbon. Whether you need quick answers to questions or detailed guidance on specific features, these resources are readily available.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-green-200">
                  <p className="font-semibold text-gray-900 mb-1">Help Topics</p>
                  <p className="text-sm text-gray-600">
                    Opens this comprehensive user manual with searchable topics, step-by-step guides, and FAQs for quick reference.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-green-200">
                  <p className="font-semibold text-gray-900 mb-1">Knowledgebase</p>
                  <p className="text-sm text-gray-600">
                    Access online articles, video tutorials, troubleshooting guides, and best practices from D-Secure's support portal.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-green-200">
                  <p className="font-semibold text-gray-900 mb-1">Support</p>
                  <p className="text-sm text-gray-600">
                    Contact our technical support team via email, chat, or phone for personalized assistance with any issues.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border border-green-200">
                  <p className="font-semibold text-gray-900 mb-1">About</p>
                  <p className="text-sm text-gray-600">
                    View software version, build number, license information, and company details. Check system configuration details here.
                  </p>
                </div>
              </div>
            </div>

            {/* Buy Now & Activation Ribbons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-orange-300 rounded-xl p-5 bg-gradient-to-r from-orange-50 to-orange-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-bold text-gray-900">Buy Now</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Purchase new licenses, upgrades, or license extensions directly from the online store.
                </p>
                <div className="bg-white rounded p-3 border border-orange-200">
                  <p className="font-medium text-gray-900 text-sm mb-1">Buy Online</p>
                  <p className="text-xs text-gray-600">
                    Opens secure purchase portal to buy additional licenses or extend existing ones.
                  </p>
                </div>
              </div>

              <div className="border-2 border-teal-300 rounded-xl p-5 bg-gradient-to-r from-teal-50 to-teal-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <Cloud className="w-6 h-6 text-teal-600" />
                  <h3 className="text-lg font-bold text-gray-900">Activation</h3>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Manage software licenses and activations for your organization.
                </p>
                <div className="space-y-2">
                  <div className="bg-white rounded p-3 border border-teal-200">
                    <p className="font-medium text-gray-900 text-sm mb-1">Add Licenses</p>
                    <p className="text-xs text-gray-600">Activate using purchase keys</p>
                  </div>
                  <div className="bg-white rounded p-3 border border-teal-200">
                    <p className="font-medium text-gray-900 text-sm mb-1">Manage Licenses</p>
                    <p className="text-xs text-gray-600">View pools, extend validity, deactivate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Buttons */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MousePointer className="w-6 h-6 text-blue-600" />
            Common Buttons and Their Actions
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Throughout D-Secure File Eraser Network, you'll encounter these standard action buttons. They appear in various contexts but maintain consistent behavior and appearance, making the interface predictable and easy to learn. Understanding these common buttons helps you work more efficiently and confidently.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-l-4 border-blue-600 pl-4 py-3 bg-blue-50/50 rounded hover:bg-blue-50 transition-colors">
              <p className="font-semibold text-gray-900 mb-2 text-base">Scan</p>
              <p className="text-sm text-gray-700 mb-1">
                Initiates a scanning operation to discover internet traces, application traces, or system traces on the selected computer.
              </p>
              <p className="text-xs text-gray-600">
                <strong>When to use:</strong> Before erasing traces, scan first to see what items exist. Scanning is non-destructive and safe.
              </p>
            </div>

            <div className="border-l-4 border-red-600 pl-4 py-3 bg-red-50/50 rounded hover:bg-red-50 transition-colors">
              <p className="font-semibold text-gray-900 mb-2 text-base">Stop</p>
              <p className="text-sm text-gray-700 mb-1">
                Immediately halts any ongoing scan or erasure operation. Use this if you need to cancel an operation in progress.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> Stopped erasure operations may leave some files partially erased. Review the status before proceeding.
              </p>
            </div>

            <div className="border-l-4 border-green-600 pl-4 py-3 bg-green-50/50 rounded hover:bg-green-50 transition-colors">
              <p className="font-semibold text-gray-900 mb-2 text-base">Erase / Proceed / Confirm</p>
              <p className="text-sm text-gray-700 mb-1">
                Begins the actual data erasure process after you've reviewed and selected items. This is the final confirmation button.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Important:</strong> Erasure is permanent and irreversible. Always double-check your selections before clicking.
              </p>
            </div>

            <div className="border-l-4 border-purple-600 pl-4 py-3 bg-purple-50/50 rounded hover:bg-purple-50 transition-colors">
              <p className="font-semibold text-gray-900 mb-2 text-base">Edit / Delete</p>
              <p className="text-sm text-gray-700 mb-1">
                Modify or remove existing scheduled tasks, saved settings, or configuration items from lists.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Context:</strong> These buttons appear when managing schedules, license pools, and configuration lists.
              </p>
            </div>

            <div className="border-l-4 border-gray-600 pl-4 py-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              <p className="font-semibold text-gray-900 mb-2 text-base">Reset / Clear</p>
              <p className="text-sm text-gray-700 mb-1">
                Clears all current selections, inputs, and filters to return to a clean state without affecting saved data.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Use when:</strong> You want to start fresh with new selections without closing and reopening dialogs.
              </p>
            </div>

            <div className="border-l-4 border-teal-600 pl-4 py-3 bg-teal-50/50 rounded hover:bg-teal-50 transition-colors">
              <p className="font-semibold text-gray-900 mb-2 text-base">Save / Export / Download</p>
              <p className="text-sm text-gray-700 mb-1">
                Exports reports, task lists, computer lists, or logs to your local system as PDF, XML, or CSV files.
              </p>
              <p className="text-xs text-gray-600">
                <strong>Formats available:</strong> Reports (PDF/XML), Lists (CSV), allowing easy integration with other systems.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Tips */}
        <section className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-xl border-2 border-indigo-300 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-indigo-600" />
            Interface Navigation Best Practices
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Follow these tips to navigate the D-Secure interface efficiently and make the most of its features. These practices come from experienced users and IT administrators who manage large-scale deployments.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <span className="text-indigo-600 mt-1 font-bold">✓</span>
                <span><strong>Maximize for best view:</strong> Keep the application window maximized to see all interface elements clearly and avoid horizontal scrolling in lists</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <span className="text-indigo-600 mt-1 font-bold">✓</span>
                <span><strong>Hover for tooltips:</strong> Pause your mouse over buttons and icons to see helpful tooltips explaining their purpose and function</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <span className="text-indigo-600 mt-1 font-bold">✓</span>
                <span><strong>Start with Home:</strong> Familiarize yourself with the Home ribbon first—it contains 80% of the functions you'll use daily</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <span className="text-indigo-600 mt-1 font-bold">✓</span>
                <span><strong>Monitor status bar:</strong> Watch the bottom status bar during operations to track progress, connection status, and important notifications</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <span className="text-indigo-600 mt-1 font-bold">✓</span>
                <span><strong>Use search effectively:</strong> In large networks, use the search function liberally to quickly locate computers instead of browsing the tree</span>
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-indigo-200">
              <p className="flex items-start gap-2 text-gray-700">
                <span className="text-indigo-600 mt-1 font-bold">✓</span>
                <span><strong>Review before confirming:</strong> Always review your selections carefully before clicking final confirmation buttons for irreversible operations</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserInterface;
