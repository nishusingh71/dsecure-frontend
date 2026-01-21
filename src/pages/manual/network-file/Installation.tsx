import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Download, Server, HardDrive, Cpu, Globe, AlertCircle, CheckCircle, Shield, Package, Wrench } from "lucide-react";

const Installation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("installation")} />
      <Helmet>
        <title>Installation and Setup - D-Secure Network File Manual</title>
        <meta
          name="description"
          content="Complete guide to installing and setting up D-Secure File Eraser Network on your system."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Download className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Installation and Setup Guide</h1>
          </div>
          <p className="text-lg text-gray-600">
            Follow this comprehensive installation guide to set up D-Secure File Eraser Network on your system. This step-by-step process ensures proper configuration for secure, network-wide data erasure operations across your organization.
          </p>
        </div>

        {/* Pre-Installation Overview */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Before You Begin
          </h2>
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              D-Secure File Eraser Network is a powerful enterprise-grade solution designed for IT administrators who need to permanently erase sensitive data from multiple computers across a network. Before starting the installation process, it's important to understand what you'll need and what to expect during setup.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The installation includes both the main application and MariaDB database server, which stores erasure logs, reports, and configuration settings. The entire process typically takes 10-15 minutes, depending on your system speed and whether you need to install MariaDB separately. Make sure you have administrator rights on the computer where you're installing the software, as elevated privileges are required for proper installation and configuration.
            </p>
            <div className="bg-white rounded-lg p-4 mt-4 border border-blue-300">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                What Gets Installed
              </h3>
              <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li>D-Secure File Eraser Network application (main software)</li>
                <li>MariaDB database server (for storing logs and reports)</li>
                <li>Required .NET Framework components</li>
                <li>Desktop shortcuts and Start Menu entries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            System Requirements
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Before installing D-Secure File Eraser Network, verify that your system meets these minimum requirements. Meeting or exceeding these specifications ensures optimal performance and reliability during erasure operations. These requirements apply to the computer where you'll install the management console, not the target computers you'll be erasing.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Processor</h3>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Required:</strong> Intel-compatible processor (x86 or x64 architecture)
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Recommended:</strong> Multi-core processor (2.0 GHz or faster)
              </p>
              <p className="text-gray-600 text-sm">
                Modern multi-core processors will provide significantly better performance when erasing multiple files simultaneously or managing large file lists across multiple network computers. A faster processor also improves report generation speed and database query performance.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <Server className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Operating System</h3>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Supported Windows Versions:</strong>
              </p>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside mb-2">
                <li>Windows 7 (32-bit and 64-bit)</li>
                <li>Windows 8 / 8.1 (32-bit and 64-bit)</li>
                <li>Windows 10 (all editions)</li>
                <li>Windows 11 (all editions)</li>
              </ul>
              <p className="text-gray-700 text-sm mb-1">
                <strong>Windows Server Support:</strong>
              </p>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside">
                <li>Windows Server 2008 R2 and later</li>
                <li>Windows Server 2012 / 2012 R2</li>
                <li>Windows Server 2016 / 2019 / 2022</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <HardDrive className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Memory (RAM)</h3>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Minimum:</strong> 4 GB<br />
                <strong>Recommended:</strong> 8 GB or more<br />
                <strong>Optimal:</strong> 16 GB for large deployments
              </p>
              <p className="text-gray-600 text-sm">
                Higher RAM capacity allows for better performance when managing large file lists, processing extensive erasure logs, and handling multiple simultaneous network connections. If you're managing more than 100 computers or dealing with very large file structures, 16 GB or more is highly recommended for smooth operation.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <HardDrive className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Disk Space</h3>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Required for Installation:</strong> 500 MB<br />
                <strong>Recommended Total:</strong> 2-5 GB<br />
                <strong>Database Storage:</strong> Varies by usage
              </p>
              <p className="text-gray-600 text-sm">
                Additional space is needed for storing erasure logs, detailed reports, and temporary files during operation. The database can grow significantly depending on how frequently you perform erasures and how long you retain logs. Plan for at least 2-5 GB of free space to accommodate growth over time.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Network & Internet Connectivity</h3>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Required for:</strong>
              </p>
              <ul className="text-gray-600 text-sm space-y-1 list-disc list-inside mb-3">
                <li><strong>Network Operations:</strong> Connecting to domain computers on your local network or across VPN</li>
                <li><strong>Cloud Integration:</strong> D-Secure Cloud connectivity for remote report uploads and management</li>
                <li><strong>Software Activation:</strong> Online activation or offline activation via support portal</li>
                <li><strong>License Management:</strong> Managing license pools and extending validity periods</li>
                <li><strong>Updates & Patches:</strong> Downloading software updates and security patches</li>
              </ul>
              <p className="text-gray-600 text-sm">
                While internet connectivity is not strictly required for basic erasure operations on your local network, many advanced features like cloud reporting, automatic updates, and online activation require an active internet connection. Ensure your firewall allows outbound connections for these features to work properly.
              </p>
            </div>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-blue-600" />
            Step-by-Step Installation Process
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            The installation wizard will guide you through the setup process with clear prompts and options. Follow these steps carefully to ensure proper installation and avoid common issues. The wizard is designed to be user-friendly, but understanding each step helps prevent configuration problems later.
          </p>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-base font-bold flex items-center justify-center shadow-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Launch the Installation Wizard</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Locate the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">DSecureFileEraserNetwork.exe</code> installer file in your Downloads folder or the location where you saved it. Double-click the file to launch the installation wizard. If you see a User Account Control (UAC) prompt asking for permission to make changes to your device, click "Yes" to proceed.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-4">
                  <p className="text-blue-900 text-sm flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span><strong>Administrator Tip:</strong> If you're on a corporate network with restricted permissions, right-click the installer and select "Run as administrator" to ensure all components install correctly. Some corporate environments may require explicit administrator credentials.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-base font-bold flex items-center justify-center shadow-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Review and Accept License Agreement</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  The installation wizard will display the End User License Agreement (EULA). This is a legal document that outlines your rights and responsibilities when using D-Secure File Eraser Network. Take a moment to read through the key terms, which cover permitted usage, liability limitations, and data handling policies.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  The license agreement specifies that you may install the software on as many computers as your purchased licenses allow. It also clarifies that while the software permanently erases data, DSecureTech is not liable for any data loss resulting from incorrect usage or configuration. By checking the "I accept the terms" checkbox and clicking Next, you agree to these terms and can proceed with installation.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-base font-bold flex items-center justify-center shadow-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Choose Installation Destination</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Select the folder where DSecure File Eraser Network will be installed. The default location is <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">C:\Program Files\DSecure File Eraser Network\</code> on 64-bit systems or <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">C:\Program Files (x86)\DSecure File Eraser Network\</code> on 32-bit systems.
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  While you can change this to any location with sufficient disk space by clicking the "Browse" button, it's strongly recommended to use the default location for several reasons: it's protected by Windows security, it's a standard location that system administrators expect, and it ensures proper integration with Windows features. Only change the location if you have specific requirements, such as installing on a different drive with more space or corporate policies that mandate specific installation directories.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
                  <p className="text-amber-900 text-sm">
                    <strong>Important:</strong> Ensure the drive has at least 2 GB of free space to accommodate the application and future database growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-base font-bold flex items-center justify-center shadow-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Select Additional Installation Tasks</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The installer offers several optional tasks that enhance accessibility and user experience. These options are recommended for most users but can be customized based on your preferences:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-gray-900 font-medium text-sm block">Create a desktop shortcut</span>
                      <span className="text-gray-600 text-sm">Adds an icon to your desktop for quick one-click access to the application</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-gray-900 font-medium text-sm block">Add to Start Menu programs</span>
                      <span className="text-gray-600 text-sm">Creates a Start Menu entry under "DSecure" for easy access from the Start button</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-gray-900 font-medium text-sm block">Launch application after installation</span>
                      <span className="text-gray-600 text-sm">Automatically opens DSecure immediately after setup completes, allowing you to begin configuration</span>
                    </div>
                  </li>
                </ul>
                <p className="text-gray-600 text-sm">
                  Most users find the desktop shortcut and Start Menu entry helpful for daily use. The auto-launch option is convenient if you want to start setting up the software immediately after installation.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-base font-bold flex items-center justify-center shadow-lg">
                5
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">MariaDB Database Installation</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  D-Secure File Eraser Network requires MariaDB, a robust open-source database server, to store erasure logs, detailed reports, scheduled task information, and configuration data. The installer will automatically detect whether MariaDB is already installed on your system. If not found, it will prompt you to install it as part of the setup process.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  During MariaDB installation, you'll be guided through a separate wizard that configures the database server. This is a critical step that requires attention to detail, particularly when setting the root password.
                </p>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg p-5 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-amber-900 font-semibold mb-2">Critical: Set and Remember Root Password</p>
                      <p className="text-amber-800 text-sm mb-2">
                        During MariaDB installation, you must set a <strong>root password</strong> for the database. This password is extremely important—choose a strong password and store it securely (in a password manager or secure documentation).
                      </p>
                      <p className="text-amber-800 text-sm">
                        You'll need this password later when configuring D-Secure File Eraser Network to connect to the database. Without it, you won't be able to access stored erasure logs and reports. If you forget this password, recovering it requires complex database recovery procedures.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 font-medium text-sm mb-2">Already Have MariaDB Installed?</p>
                  <p className="text-blue-800 text-sm">
                    If you already have MariaDB installed on your system (perhaps for other applications), you can click the "Skip" button during this step. D-Secure will use your existing MariaDB installation. Make sure you know the root password for your existing installation, as you'll need it during the initial configuration of D-Secure File Eraser Network.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex items-start gap-4">
              <div className="mt-1 shrink-0 w-10 h-10 rounded-full bg-green-600 text-white text-base font-bold flex items-center justify-center shadow-lg">
                6
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">Complete Installation and Launch</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  After all components are installed, the wizard will display a completion screen. Review the summary to ensure everything installed successfully. If you see any error messages, note them down—they'll be helpful if you need to contact support.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Click the "Finish" button to close the installation wizard. If you checked the "Launch application after installation" option earlier, D-Secure File Eraser Network will start automatically within a few seconds. You'll see the main application window where you can begin the activation process.
                </p>
                <p className="text-gray-600 text-sm">
                  If you didn't select auto-launch, you can start the application anytime by clicking the desktop shortcut or finding it in the Start Menu under "D-Secure File Eraser Network." The first time you launch the application, it may take a few extra seconds as it initializes the database connection and creates necessary configuration files.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Post Installation */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What To Do After Installation
          </h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            Installation is complete, but you're not quite ready to start erasing data yet. Follow these essential next steps to properly configure D-Secure File Eraser Network for your organization. Completing these steps ensures the software works correctly and that you can take full advantage of all features.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
                1
              </div>
              <div>
                <p className="text-gray-900 font-semibold mb-1">Activate Your Software License</p>
                <p className="text-gray-700 text-sm mb-2">
                  Use the Activation Key you received via email after purchase to activate your software. Without activation, the software runs in trial mode with limited functionality. Navigate to the "Activation" ribbon tab and click "Add Licenses" to enter your key.
                </p>
                <p className="text-gray-600 text-sm">
                  You can activate online (recommended) if you have internet connectivity, or use offline activation if your server is isolated. See the Licensing section of this manual for detailed activation instructions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                2
              </div>
              <div>
                <p className="text-gray-900 font-semibold mb-1">Configure Database Connection</p>
                <p className="text-gray-700 text-sm mb-2">
                  On first launch, you'll need to configure the connection to your MariaDB database. Enter "localhost" as the server (if database is on the same machine), "root" as the username, and the root password you set during MariaDB installation.
                </p>
                <p className="text-gray-600 text-sm">
                  The application will test the connection and create the necessary database tables automatically. If connection fails, verify your password and ensure MariaDB service is running in Windows Services.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center">
                3
              </div>
              <div>
                <p className="text-gray-900 font-semibold mb-1">Connect to Your Domain</p>
                <p className="text-gray-700 text-sm mb-2">
                  To erase files on network computers, you must connect to your Active Directory domain. Click "Connect Domain" from the Home ribbon and enter your domain administrator credentials. The software will retrieve the list of organizational units (OUs) and computers.
                </p>
                <p className="text-gray-600 text-sm">
                  Only domain administrators can connect and perform erasure operations. This security measure prevents unauthorized data deletion across your network.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
              <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white text-sm font-bold flex items-center justify-center">
                4
              </div>
              <div>
                <p className="text-gray-900 font-semibold mb-1">Review and Customize Settings</p>
                <p className="text-gray-700 text-sm mb-2">
                  Before performing your first erasure, visit the Settings section to configure your preferences. Choose your preferred erasure algorithm (DoD 5220.22-M is recommended for most users), verification method, and other operational preferences.
                </p>
                <p className="text-gray-600 text-sm">
                  You can also configure which file types or folders to ignore, set up custom report branding with your company logo, and configure cloud integration if you have a D-Secure Cloud account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            Installation Troubleshooting
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Most installations complete smoothly, but occasionally you may encounter issues. Here are solutions to the most common installation problems:
          </p>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="text-gray-900 font-semibold text-sm mb-2">❌ Installation fails or gets stuck at a certain percentage</p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Solution:</strong> Ensure you have full administrator privileges on the computer. Right-click the installer and explicitly choose "Run as administrator."
              </p>
              <p className="text-gray-600 text-sm">
                Also check if antivirus or security software is blocking the installer. Temporarily disable antivirus protection during installation, then re-enable it afterward. Windows Defender and corporate endpoint protection sometimes flag installers as suspicious.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="text-gray-900 font-semibold text-sm mb-2">❌ MariaDB installation errors or database connection failures</p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Solution:</strong> If MariaDB fails to install automatically, download the latest stable version manually from the official MariaDB website (mariadb.org) and install it separately before running D-Secure installer again.
              </p>
              <p className="text-gray-600 text-sm">
                If MariaDB installed but D-Secure can't connect, verify that the MariaDB service is running in Windows Services (services.msc). Also double-check your root password—it's case-sensitive.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="text-gray-900 font-semibold text-sm mb-2">❌ Application won't launch after installation completes</p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Solution:</strong> Check if all required .NET Framework components are installed. D-Secure requires .NET Framework 4.7.2 or later. The installer normally handles this, but on older systems you may need to install it manually.
              </p>
              <p className="text-gray-600 text-sm">
                Download the latest .NET Framework from Microsoft's official website. After installing, restart your computer and try launching D-Secure again.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-red-200">
              <p className="text-gray-900 font-semibold text-sm mb-2">❌ "Access Denied" or permission errors during installation</p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Solution:</strong> Some corporate environments have strict security policies that prevent software installation. Contact your IT department to temporarily grant you installation rights, or ask them to install the software for you.
              </p>
              <p className="text-gray-600 text-sm">
                Alternatively, check if your corporate Group Policy allows installations in user-specific directories instead of Program Files, and try installing there instead.
              </p>
            </div>
          </div>

          <div className="mt-5 bg-blue-100 border border-blue-300 rounded-lg p-4">
            <p className="text-blue-900 font-medium text-sm mb-1">Still Having Issues?</p>
            <p className="text-blue-800 text-sm">
              If you continue to experience installation problems after trying these solutions, contact D-Secure technical support at <a href="mailto:techsupport@dsecuretech.com" className="underline font-medium">techsupport@dsecuretech.com</a> with details about the error messages you're seeing. Include screenshots if possible, along with your Windows version and system specifications.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Installation;
