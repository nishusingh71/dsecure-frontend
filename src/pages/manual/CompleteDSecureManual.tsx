import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import {
  BookOpen,
  Layers,
  ClipboardList,
  Settings as Cog,
  Calendar,
  FileText,
  HelpCircle,
  Building,
  Search,
  ChevronRight,
  AlertCircle,
  Menu,
  X,
  ArrowUp
} from "lucide-react";
/* ===========================
   Navigation Tree Structure
   =========================== */
interface NavItem {
  id: string;
  number: string;
  title: string;
  content?: React.ReactNode;
  children?: NavItem[];
}

const navigationTree: NavItem[] = [
  {
    id: "about",
    number: "1",
    title: "About D-Secure File Eraser",
    content: (
      <>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>D-Secure File Eraser</strong> is a complete solution to maintain your computer privacy by erasing unwanted information from the computer. Erased data is beyond recovery. <strong>D-Secure File Eraser</strong> can be used to erase files/folders, Unused space, and System traces.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>D-Secure File Eraser</strong> erases files & folders completely from the hard drive. You can select multiple files/folders at a time for erasure. Once files/folders from the drive are erased using <strong>D-Secure File Eraser</strong> data can't be recovered back. The software allows you to generate and save the reports of the completed erasure process.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          In addition, it can erase unused space completely such that all the traces of previously stored data are completely removed. When you delete data from a hard drive, the data content is not deleted entirely, instead the space occupied by the data is marked as unused space and the new data is written on that unused space.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>D-Secure File Eraser</strong> also erases all the system traces. Operating systems store records of all activities such as browsing Internet and opening documents constantly.
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          <strong>D-Secure File Eraser</strong> has a set of 20+ different erasure algorithms, that are accepted globally, to ensure permanent data deletion. You can choose any of the algorithms for erasure process. The software is menu driven, simple to use with an intuitive interface, and requires no prior technical skill.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Features:</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
          <li><strong>Operating System</strong>- Compatible with Windows 10/11, macOS 10.15+, and Linux distributions.</li>
          <li><strong>Erase Files and folders</strong>- Option to erase selected files or folders from the hard drive.</li>
          <li><strong>Erase Free Space</strong>- Option to erase the free space to secure privacy from the selected volumes.</li>
          {/* <li><strong>Erase Traces of Internet Activity</strong>- Option to erase the internet traces created by web browsers.</li> */}
          {/* <li><strong>Erase Traces of the System</strong>- Option to erase the system traces created by the operating system.</li> */}
          {/* <li><strong>Erase Traces of Applications</strong>- Option to erase application traces created by the apps.</li> */}
          <li><strong>Setting Schedule Erasure</strong>- Supports schedule erasing tasks to run them automatically at specified periods.</li>
          <li><strong>Generate and Save Reports</strong>- Option to generate and save 100% secure and Tamper-proof audit reports with certificate in various formats such as PDF</li>
          {/* Report generation flexibility provided */}
          <li><strong>Compliance Reporting</strong>- Option to customize and preview reports before saving, ensuring audit readiness.</li>
          <li><strong>Search Report</strong>- Option to search reports by selecting the appropriate date range or erasure type.</li>
          <li><strong>Save Report to D-Secure Cloud</strong>- Automatic report uploaded to D-Secure Cloud Console for centralized compliance management.</li>
          <li><strong>Supported Erasure Standards and Verification Methods</strong>- Provides 20+ different erasing algorithms with 3 verification methods to erase the data permanently.</li>
          <li><strong>Search and Erase</strong>- Option to search specific files using name or extension on the system and erase them using a suitable algorithm.</li>
          <li><strong>Supports Multiple Themes</strong>- Option to switch between light and dark modes.</li>
        </ul>
      </>
    )
  },
  {
    id: "guide",
    number: "2",
    title: "About the Guide",
    content: (
      <>
        <p className="text-slate-700 leading-relaxed mb-6">
          This user guide contains steps to assist you in various functions of <strong>D-Secure File Eraser</strong>. Each function is explained in detail, in the corresponding sections. This guide covers the following major topics:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-4 mb-6">
          <li><strong>About D-Secure File Eraser</strong></li>
          <li><strong>About the Guide</strong></li>
          <li><strong>Getting Started</strong></li>
          <li><strong>Working with D-Secure File Eraser</strong></li>
          <li><strong>Frequently Asked Questions (FAQs)</strong></li>
          <li><strong>About D-Secure</strong></li>
        </ol>

        <p className="text-slate-700 leading-relaxed mb-4">
          This guide has the following features for easy navigation and understanding:
        </p>
        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-6">
          <li>Select a topic from the list of topics given on the left of the navigation pane.</li>
          <li>There are <strong>Notes</strong> and <strong>Tips</strong> in some topics of this guide for better understanding and ease of work. These <strong>Notes</strong> and <strong>Tips</strong> are given in italic style.</li>
        </ul>

        <p className="text-slate-700 leading-relaxed">
          This is a web-based guide and requires an active internet connection. You can read this guide with all popular browsers like Chrome, Firefox, Internet Explorer, and Safari. For better viewing experience, it is recommended to use the <strong>Chrome</strong> browser.
        </p>
      </>
    )
  },
  {
    id: "getting-started",
    number: "3",
    title: "Getting Started",
    children: [
      {
        id: "installation",
        number: "3.1",
        title: "Installation D-Secure File Eraser",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              Follow these comprehensive steps to successfully install D-Secure File Eraser on your system:
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 leading-relaxed"><strong>1. Download the installer from the official D-Secure website:</strong> Navigate to the official D-Secure website using your preferred web browser. Locate the Downloads section and select the appropriate installer version compatible with your operating system (Windows, macOS, or Linux). Ensure you download from the official source to avoid any security risks or corrupted files. The installer file will be saved to your default Downloads folder.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed"><strong>2. Run the installer with administrator privileges:</strong> Once the download is complete, navigate to your Downloads folder and locate the D-Secure File Eraser installer file. Right-click on the installer executable and select "Run as Administrator" to ensure the installation process has the necessary permissions to install system-level components. This step is crucial for proper software integration with your operating system.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed"><strong>3. Follow the installation wizard and accept the license agreement:</strong> The installation wizard will launch, presenting you with a welcome screen. Click "Next" to proceed through the setup process. Carefully read through the End User License Agreement (EULA) to understand the terms and conditions of use. Once reviewed, check the "I accept the agreement" checkbox and click "Next" to continue with the installation.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed"><strong>4. Choose installation directory:</strong> The installer will prompt you to select a destination folder where D-Secure File Eraser will be installed. You can either accept the default installation path (typically C:\Program Files\D-Secure File Eraser on Windows) or click "Browse" to choose a custom location on your hard drive. Ensure the selected drive has sufficient free space for the installation, typically requiring at least 100-200 MB of available disk space.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed"><strong>5. Complete the installation:</strong> Review your installation settings on the summary screen to ensure all configurations are correct. Click "Install" to begin the actual installation process. The installer will copy all necessary files to your system, register components, and create shortcuts. Once the progress bar reaches 100%, click "Finish" to complete the installation. You may be prompted to restart your computer for all changes to take effect. The application will now be available in your Start Menu or Applications folder, ready to launch and use.</p>
              </div>
            </div>
          </>
        )
      },
      {
        id: "disk-access",
        number: "3.2",
        title: "Assign Full Disk Access",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              To completely allow the software to scan and erase your data, you are required to Assign Full Disk Access.
            </p>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Steps to Assign Full Disk Access for MacOS:</h4>
            <p className="text-slate-600 text-sm mb-6 italic">Applicable for Macs having MacOS 15 Sequoia, MacOS 14 Sonoma and MacOS 13 Ventura.</p>

            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong> Click Open Full Disk Access button.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Full Disk Access window is displayed.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> Enable the slider displayed against 'D-Secure File Eraser' and enter the administrator password when prompted.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> A dialog box appears on the screen with a message "D-SecureFileEraser will not have full disk access until it is quit". Click Quit & Reopen.</p>
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-10 mb-4">Steps to Assign Full Disk Access For MacOS:</h4>
            <p className="text-slate-600 text-sm mb-6 italic">Applicable for Macs having MacOS 12 Monterey, MacOS 11 Big Sur.</p>

            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong> Click Open Full Disk Access button.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Security & Privacy window is displayed. Go to Privacy tab.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> From the bottom, click lock icon and enter your administrator password.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> From the given options on the left pane, select Full Disk Access and mark D-Secure File Eraser.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>5.</strong> A dialog box appears on the screen with a message "D-SecureFileEraser will not have full disk access until it is quit". Click Quit & Reopen.</p>
              </div>
            </div>
          </>
        )
      },
      {
        id: "user-interface",
        number: "3.3",
        title: "Getting Familiar with User Interface",
        children: [
          {
            id: "tabs-buttons",
            number: "3.3.1",
            title: "Getting Familiar with Tabs and Buttons",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">
                  The D-Secure interface includes tabs for different erasure modes, buttons for actions like 'Erase Now', 'Add Items', and 'Settings'. Familiarize yourself with each element for efficient operation.
                </p>
                <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Navbar Icons</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700 mb-2"><strong>Info Icon:</strong> Click the Info icon in the navbar to view application details and version information.</p>
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032271/dsecure-manual/01_Navbar_Icons/1_navbar_info.png" alt="Navbar Info Icon" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2"><strong>Support & Documentation:</strong> Access support resources and documentation from the navbar.</p>
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032360/dsecure-manual/01_Navbar_Icons/2_Support_and_Documantation.png" alt="Support and Documentation" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2"><strong>Software Update:</strong> Check for and install software updates from the navbar.</p>
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032448/dsecure-manual/01_Navbar_Icons/3_Software_update.png" alt="Software Update" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2"><strong>Help Manual:</strong> Open the help manual directly from the navbar for quick reference.</p>
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032536/dsecure-manual/01_Navbar_Icons/4_help_manual.png" alt="Help Manual" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                  </div>
                </div>

                <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Dashboard Overview</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700 mb-2"><strong>Dashboard View:</strong> The main dashboard provides an overview of all erasure features and quick access to key functions.</p>
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032712/dsecure-manual/02_Dashboard/dashboard.png" alt="Dashboard" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2"><strong>Dashboard Details:</strong> The dashboard also displays recent activity, system status, and quick-start options for common erasure tasks.</p>
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032624/dsecure-manual/02_Dashboard/dashboard-2.png" alt="Dashboard Details" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                  </div>
                </div>
              </>
            )
          }
        ]
      },
      {
        id: "ordering",
        number: "3.4",
        title: "Ordering the Software",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">
              To know more about D-Secure File Eraser, click <Link to="/products" className="text-blue-600 hover:underline">here</Link>.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              To purchase the software online, click <Link to="/pricing-and-plan?product=file-eraser" className="text-blue-600 hover:underline">here</Link>.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Alternatively, click on Buy Online icon on the Menu Bar to purchase the software online.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              Select either of the methods given above to purchase the software.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Once the order is confirmed, you receive an activation key through email. You require this key to activate the software.
            </p>
          </>
        )
      },
      {
        id: "activating",
        number: "3.5",
        title: "Activating the Software",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">
              Activate D-Secure with your license key:
            </p>
            <ol className="list-decimal list-inside space-y-4 text-slate-700 ml-4">
              <li className="mb-4">
                <span className="font-medium"><strong>Access and Cloud Login  </strong>Click the key icon in the top menu to open the Activation window. Select "Cloud Activation," enter your Email and Password, and click Login to verify your account status.</span>
              </li>
              <li className="mb-4">
                <span className="font-medium"><strong>Online Activation</strong> Select the "Online Activation" option and enter the product key received in your email into the text field. Click the "Activate" button to complete the process, or use "Get it Now" if you do not yet have a license key.</span>
              </li>
              <li className="mb-4">
                <span className="font-medium"><strong>Offline Activation</strong> Select the "Offline Activation" radio button to register without an active internet connection. Click "Generate Request Code" to create a code to share with the D-Secure Support Team, then enter the provided Activation Response Code and click "Activate" to finish.</span>
              </li>
              <li className="mb-4">
                <span className="font-medium">Offline Activation Select "Offline Activation" and click "Generate Request Code" to create a unique code for the D-Secure Support Team. Once you receive the Activation Response Code from them, enter it into the designated field and click "Activate" to register the software without an internet connection.</span>
              </li>
              <li className="mb-4">
                <span className="font-medium">Offline Activation Select "Offline Activation" and click "Generate Request Code" to create a unique code for the D-Secure Support Team. Once generated, the code is automatically copied to your clipboard to be shared for a response. Finally, enter the received Activation Response Code and click "Activate" to finish.</span>
              </li>
            </ol>
          </>
        )
      },
      {
        id: "updating",
        number: "3.6",
        title: "Updating the Software",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">
              D-Secure automatically checks for updates. You can also manually check via Settings → Check for Updates. Always keep your software updated for the latest features and security patches.
            </p>
            <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032448/dsecure-manual/01_Navbar_Icons/3_Software_update.png" alt="Software Update" className="w-full mb-6" style={{ borderRadius: '3%' }} />
          </>
        )
      },
      {
        id: "contact",
        number: "3.7",
        title: "Contact Information",
        content: (
          <div className="text-slate-700 leading-relaxed">
            <p className="mb-2"><strong>Email:</strong> support@dsecuretech.com</p>
            <p className="mb-2"><strong>Website:</strong> www.dsecuretech.com</p>
            <p><strong>Support Hours:</strong> 24/7 Business Hours</p>
          </div>
        )
      }
    ]
  },
  {
    id: "working",
    number: "4",
    title: "Working with D-Secure File Eraser",
    children: [
      {
        id: "erase-files",
        number: "4.1",
        title: "Erase Files and Folders",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              To securely erase files and folders:
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong>  <strong>  Access File Erasure Mode: </strong> Navigate to the "Erase Files/Folders" tab located in the left sidebar menu. The main interface will display a designated zone labeled "Drag & Drop Files & Folders Here". You can either drag your files directly into this area or click the "Browse Files" link to manually select data from your computer.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong>    <strong>  Select Files or Folders Manually: </strong> If you choose to browse manually, a "Select Files or Folders" window will appear. Navigate through your local directories (e.g., C:\dsecure) to find the data you wish to remove. Select the desired file—such as "D-SecureErase.exe"—and click the "Add Selected" button to add it to the erasure queue. </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> <strong>  Review the Erasure List: </strong> The selected items will now appear in the main erasure table. This list provides a detailed overview, including the checkbox to Include the file, the specific File Name, the full system Path, the item Type, and its Size. Confirm all items are correct before proceeding. </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> <strong>  Initiate Erasure: </strong> Once you have verified your selection, click the "Erase Now" button located at the bottom right corner of the window. This action prepares the application to securely destroy the listed data. </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>5.</strong> <strong> Final Erasure Confirmation A "Confirm Erasure: </strong> dialog box will appear as a safety measure. It summarizes the Items selected and the Total files to erase. Review the warning: "This action cannot be undone". If you are certain, click "Yes, Erase" to begin the permanent deletion process.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>6.</strong> <strong>  Erasure Process and Monitoring: </strong>D-SecureErase will now begin shredding the files. You can monitor the progress through the Shredder Animation and the Progress Bar. The interface also displays the real-time file path currently being processed. If necessary, you can halt the operation using the red "Stop" button. </p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>7.</strong> <strong>  Review File Erasure Summary: </strong>Upon completion, a "File's & Folder's Erasure Summary" report is generated. This table confirms the File Path, Size, and shows the final Status as "Erased & Verified". Click the "OK" button to close the summary and return to the main dashboard. </p>
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Erase Files & Folders - Product Screenshots</h4>
            <div className="space-y-4">
              <div>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032888/dsecure-manual/03_Erase_Files_And_Folder/EFF-1.png" alt="Erase Files and Folders - Step 1" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032800/dsecure-manual/03_Erase_Files_And_Folder/EEF-2.png" alt="Erase Files and Folders - Step 2" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772032978/dsecure-manual/03_Erase_Files_And_Folder/EFF-3.png" alt="Erase Files and Folders - Step 3" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
            </div>


          </>
        )
      },
      {
        id: "erase-space",
        number: "4.2",
        title: "Erase Free Space",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              Erasing free space removes traces of previously deleted files from your hard drive. This comprehensive process ensures that all remnants of deleted data are permanently removed, preventing any possibility of recovery.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 leading-relaxed"> Select Target Volume Click on the "Erase Volume" tab in the left sidebar to view all available drives. Check the box next to the specific volume you wish to wipe (e.g., C:\ or E:) and click the "Erase Now" button to proceed.  </p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Handling Locked Volumes If a drive appears as "Locked / Inaccessible" (e.g., F:\ [Locked]), it cannot be selected for erasure in its current state. Ensure the drive is properly connected and unlocked before attempting to check the selection box for wiping.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Confirm Erasure Once you click "Erase Now," a Confirm Erasure dialog box will appear listing the selected drive (e.g., F:). This action is permanent and cannot be undone; click "Yes, Erase" to proceed with the wiping process or "Cancel" to go back.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Permanently Wipe Selected Volume Confirm the erasure by clicking "Yes, Erase" in the dialog box. This will trigger the wiping process for the selected drive (e.g., F:), permanently removing all stored data to ensure it cannot be recovered.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Monitor Erasure Progress After confirming, the software begins wiping the drive sector by sector. You can track the real-time progress through the percentage bar and the exact sector count being processed (e.g., 20,701,184 sectors). A "Stop" button is available if you need to terminate the process immediately.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Finalizing Erasure As the process nears completion, the progress bar will reach approximately 88.9%, showing that the vast majority of sectors (e.g., 96,960,512) have been successfully wiped. Keep the software running until the bar reaches 100% to ensure every sector of the selected volume is permanently erased.</p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">Completion Notification Once the process reaches 100%, a Volume Erasure information box will appear confirming that the "Volume erased successfully". Click the "OK" button to close the dialog and return to the main menu.</p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">View Erasure Summary After clicking "OK" on the success dialog, a Summary table will appear. This table provides a final log of the operation, including the Target drive (F:), its Capacity (52.00 GB), the total Sectors Erased (109,043,712), and the Method used. Click the blue "OK" button at the bottom right to return to the volume selection screen.</p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">Drive Reformatting After the volume erasure is complete, the drive will appear as unallocated or unrecognized by the system. To make it usable again, right-click the drive in your file explorer and select "Format..." to create a new file system and restore its accessibility.</p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">Format Volume for Re-use To make the erased drive accessible again, open Windows File Explorer, right-click the wiped volume (e.g., F:), and select "Format...". In the format window, ensure "Quick Format" is selected and click "Start" to restore the drive's file system for normal use.</p>
              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">Formatting Complete Once the quick format is finished, a notification will appear stating "Format Complete". Click the "OK" button to finalize the process; your drive is now fully restored with a clean file system and ready for new data.</p>
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Volume Eraser - Product Screenshots</h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 mb-2"><strong>Volume Eraser - Select Volume:</strong> Select the target volume to erase from the list of available drives.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033065/dsecure-manual/04_Volume_Eraser/VE-1.png" alt="Volume Eraser - Select Volume" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Volume Eraser - Confirm Erasure:</strong> Confirm the volume erasure operation before proceeding.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033153/dsecure-manual/04_Volume_Eraser/VE-2.png" alt="Volume Eraser - Confirm Erasure" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Volume Eraser - Progress:</strong> Monitor the volume erasure progress in real-time.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033241/dsecure-manual/04_Volume_Eraser/VE-3.png" alt="Volume Eraser - Progress" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Volume Eraser - Complete:</strong> Volume erasure completed successfully with summary details.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033329/dsecure-manual/04_Volume_Eraser/VE-4.png" alt="Volume Eraser - Complete" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Deleted Data Eraser - Product Screenshots</h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 mb-2"><strong>Deleted Data Eraser - Select Drive:</strong> Choose the drive to scan for deleted data remnants.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033417/dsecure-manual/05_Deleted_Data_Eraser/DDE-1.png" alt="Deleted Data Eraser - Select Drive" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Deleted Data Eraser - Scanning:</strong> The software scans for deleted data traces on the selected drive.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033505/dsecure-manual/05_Deleted_Data_Eraser/DDE-2.png" alt="Deleted Data Eraser - Scanning" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Deleted Data Eraser - Erasing:</strong> Securely erasing all deleted data remnants from the drive.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033593/dsecure-manual/05_Deleted_Data_Eraser/DDE-3.png" alt="Deleted Data Eraser - Erasing" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Deleted Data Eraser - Complete:</strong> Deleted data erasure completed with Tamper-proof audit reports with certificate for verification.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033680/dsecure-manual/05_Deleted_Data_Eraser/DDE-4.png" alt="Deleted Data Eraser - Complete" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
            </div>
          </>
        )
      },
      {
        id: "cloud-storage",
        number: "4.3",
        title: "Erase Cloud Storage (Google Drive)",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              D-Secure File Eraser allows you to securely erase files stored in your Google Drive cloud storage without needing to open your account manually. This feature ensures complete privacy by permanently removing cloud-stored data.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong> Select 'Cloud Storage' tab</p>
                <p className="text-slate-600 text-sm mb-3 italic">Note: You must be logged into your Google account for this feature to work.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Connect your Google Drive account</p>
                <p className="text-slate-600 text-sm mb-3">Click the "Connect" button to initiate the authorization process. A browser window will automatically open asking you to sign in. Select the Google Account you wish to link with D-Secure to proceed</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> Grant Permissions</p>
                <p className="text-slate-600 text-sm mb-3">On the consent screen titled "D-Secure wants access to your Google Account," review the access request. Click the "Continue" button to grant the necessary permissions and proceed with the connection</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> Authorization Success</p>
                <p className="text-slate-600 text-sm mb-3">Once the permissions are granted, the browser will display a confirmation page. Look for the "Success!" header followed by the message "All done. Please go back to D_CLOUDBASE". This confirms that D-Secure has successfully authenticated with your cloud account, and you can now return to the application interface</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>5.</strong> Connection Confirmation</p>
                <p className="text-slate-600 text-sm mb-3">Return to the D-SecureErase application. A "Status Update" dialog box will appear confirming that "Google Drive connected Successfully". Click the "OK" button to close the dialog and begin managing your cloud storage</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>6.</strong> Erase Cloud Volume</p>
                <p className="text-slate-600 text-sm mb-3">Select the "Erase Volume" radio button to wipe the entire contents of your cloud storage. The interface will display a "Google Drive - Storage Overview" card showing your current usage statistics (e.g., 18% used, 12.25 GB free). Check the box located on this storage card to select the volume for erasure.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>6.1</strong> Erase Specific Files and Folders</p>
                <p className="text-slate-600 text-sm mb-3">Select the "Erase Files/Folder" radio button to view your cloud directory structure. A file tree will appear showing your Google Drive folders (e.g., "Testing Data"). Expand the folders and check the boxes next to the specific files or subfolders you wish to permanently remove.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>6.2</strong> Browse File Directory</p>
                <p className="text-slate-600 text-sm mb-3">Alternatively, select the "Erase Files/Folder" radio button to access individual files instead of wiping the whole volume. The interface will load your cloud directory structure, showing the root folder (e.g., "Google Drive") and subfolders like "Testing Data (1)". This view allows you to navigate through your storage hierarchy to pinpoint specific data for removal.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>7.</strong> Erase Specific Files and Folders</p>
                <p className="text-slate-600 text-sm mb-3">Select the "Erase Files/Folder" radio button to browse your cloud directory structure. A hierarchical file tree will appear, displaying your Google Drive folders and files (e.g., "Testing Data", "erase data - Copy"). Expand the directories and check the boxes next to the specific items you want to permanently erase.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>7.1</strong> Select Items to Erase </p>
                <p className="text-slate-600 text-sm mb-3">Navigate deeper into the directory tree to locate the specific data you intend to destroy. Click the checkboxes next to the individual files (such as .tmp or media files) or entire sub-folders to mark them for deletion. Ensure that the checkboxes are ticked for all items you wish to permanently remove before proceeding.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>8.</strong> Confirm and Execute Erasure</p>
                <p className="text-slate-600 text-sm mb-3">After making your selection, click the "Erase Cloud Data" button. A "Confirm Cloud Erasure" dialog box will appear, displaying a summary of the items to be deleted (e.g., "3 files and 1 folders"). The dialog includes a warning that "This action cannot be undone". Click the "Yes, Erase" button to proceed with the permanent deletion of the selected cloud data</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>9.</strong> Erasure in Progress</p>
                <p className="text-slate-600 text-sm mb-3">Once confirmed, the application begins the secure erasure process. The interface displays a large shredding animation along with a progress bar and status message (e.g., "Starting cloud erasure...") to keep you informed. If you need to halt the operation immediately, you can click the "Stop" button located at the bottom right of the window.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>9.1.</strong> Monitor Real-Time Progress</p>
                <p className="text-slate-600 text-sm mb-3">As the operation advances, the progress bar updates to reflect the percentage of completion (e.g., 33%). The status message below the bar provides specific details about the current action, identifying which file is currently being destroyed (e.g., "Erasing cloud file 1/3: deleted_..."). This allows you to track exactly which data is being processed in real-time.</p>
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>10.</strong> Review Erasure Summary</p>
                <p className="text-slate-600 text-sm mb-3">When the process completes, the application presents a "Cloud File Erasure Summary" table. This report details the specific files that were processed, showing their full file paths (e.g., ".../erase data - Copy (1)"), file sizes (e.g., 103.09 MB), and their final status as "Erased". Review the details and click the "OK" button to close the summary and finish the operation.</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                <p className="text-blue-900 font-semibold mb-2">Important Notes:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800 text-sm">
                  <li>Erased files are permanently deleted from Google Drive and cannot be recovered</li>
                  <li>This feature requires an active internet connection</li>
                  <li>Google Drive authorization is required for first-time use</li>
                  <li>Erasure reports are generated for cloud storage operations</li>
                </ul>

              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Cloud Erase - Product Screenshots</h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Main Interface:</strong> The cloud erase main screen showing available cloud storage options.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034384/dsecure-manual/08_Cloud_Erase/0.png" alt="Cloud Erase - Main Interface" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Connect Account:</strong> Connect your cloud storage account for erasure operations.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034471/dsecure-manual/08_Cloud_Erase/1.png" alt="Cloud Erase - Connect Account" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - File & Folder Erase Confirmation:</strong> Confirm the cloud file and folder erasure operation.</p>
                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                 <div className="font-bold text-emerald-800 mb-2">Step 2: Confirm Destruction</div>
                 <p className="text-gray-700">Before the erasure begins, you will see a confirmation screen. Click <strong>Erase</strong> to proceed.</p>
                 <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035441/dsecure-manual/08_Cloud_Erase/7.png" alt="Cloud Erase - File & Folder Erase Confirmation" className="w-full mb-4" style={{ borderRadius: '3%' }} />
               </div>
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - File & Folder Erase Progress:</strong> Monitor the cloud file and folder erasure progress.</p>
                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                 <div className="font-bold text-emerald-800 mb-2">Step 4: Completion</div>
                 <p className="text-gray-700">Once the erasure is successful, a confirmation message will be displayed.</p>
                 <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035530/dsecure-manual/08_Cloud_Erase/8.png" alt="Cloud Erase - File & Folder Erase Progress" className="w-full mb-4" style={{ borderRadius: '3%' }} />
               </div>
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Browse Files:</strong> Browse and select cloud files for erasure.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035263/dsecure-manual/08_Cloud_Erase/5.png" alt="Cloud Erase - Browse Files" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Select Items:</strong> Select specific cloud items to erase.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035353/dsecure-manual/08_Cloud_Erase/6.png" alt="Cloud Erase - Select Items" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Confirm Selection:</strong> Review and confirm selected cloud items for erasure.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1772035441/dsecure-manual/08_Cloud_Erase/7.png" alt="Cloud Erase - Confirm Selection" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Erasure Progress:</strong> Cloud erasure operation in progress.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1772035530/dsecure-manual/08_Cloud_Erase/8.png" alt="Cloud Erase - Erasure Progress" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Processing:</strong> Cloud data being processed for secure deletion.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1772035619/dsecure-manual/08_Cloud_Erase/9.png" alt="Cloud Erase - Processing" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Summary:</strong> Cloud erasure operation summary and results.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1772034560/dsecure-manual/08_Cloud_Erase/10.png" alt="Cloud Erase - Summary" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Volume Overview:</strong> Cloud volume storage overview and usage details.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034649/dsecure-manual/08_Cloud_Erase/11.png" alt="Cloud Erase - Volume Overview" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Volume Erasure:</strong> Cloud volume erasure confirmation and process.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034737/dsecure-manual/08_Cloud_Erase/12.png" alt="Cloud Erase - Volume Erasure" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Volume Progress:</strong> Cloud volume erasure progress tracking.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034825/dsecure-manual/08_Cloud_Erase/13.png" alt="Cloud Erase - Volume Progress" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Completion:</strong> Cloud erasure operation completed successfully.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034912/dsecure-manual/08_Cloud_Erase/14.png" alt="Cloud Erase - Completion" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Cloud Erase - Final Compliance Report:</strong> Final Tamper-proof audit report with certificate with detailed compliance results.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035000/dsecure-manual/08_Cloud_Erase/15.png" alt="Cloud Erase - Final Report" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
            </div>
          </>
        )
      },
      {
        id: "schedule",
        number: "4.4",
        title: "Setting Schedule Erasure",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">
              Automate erasure tasks by creating schedules. Choose frequency (daily, weekly, monthly), set time, select trace categories, and save the schedule.
            </p>
            <div>
              <p className="text-slate-700 mb-3"><strong>1.</strong> <strong>    Open Scheduler Tab    </strong>  Click on the "Scheduler" icon in the left sidebar to access the configuration screen for automated tasks. This section allows you to create new schedules or manage existing ones to ensure your data is wiped at specific intervals.      </p>
            </div>
            <div>
              <div className="text-slate-700 mb-3"><strong>2.</strong> <strong>   Configure Task Details     </strong> Define the parameters for your automated erasure:
                <br />
                <br />
                <div className="font-semibold text-slate-800 mt-2"> <strong>2.1  Frequency & Timing: </strong>Set how often the task should run (e.g., "Once") and the exact Date and Time for it to start.</div>

                <div className="font-semibold text-slate-800 mt-2"><strong>2.2 Task Identification:</strong> Select "New Task" and enter a descriptive Task Name (e.g., "ERASEFILES").</div>

                <div className="font-semibold text-slate-800 mt-2"><strong>2.3 Select Data: </strong>Click "Browse" to choose the files or folders you want to schedule for permanent deletion.   </div>   </div>
              <br />
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>3.</strong> <strong>  Browse and Select Items      </strong>  Click the "Browse" button to open a file selection window. Navigate through your local directories (e.g., F:\Testing Data) and check the boxes next to the specific folders or files you wish to add to the schedule. Click the "Add" button to include these items in your task list.     </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>4.</strong> <strong> Finalize and Save Task       </strong>   Once you have added the items from the browse window, they will appear in the task list showing the Name, Size, and Type. Review the details and click the "OK" button at the bottom right to save and activate your scheduled erasure task.    </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>5.</strong> <strong>   Confirm and Save Schedule     </strong>  Review your finalized task in the list to ensure the correct Name, Size, and Type (e.g., Folder) are displayed. Click the "OK" button to activate the schedule. An "Info" dialog box will appear confirming, "Task 'ERASEFILES' scheduled successfully". Click "OK" on the dialog box to finish the setup.     </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>6.</strong> <strong>   Finalize and Confirm Task     </strong>   After selecting your items, they will be listed in the task table with their Name, Size, and Type (e.g., Folder). Click the "OK" button at the bottom right to finalize the setup. An "Info" dialog box will appear to confirm that the task (e.g., 'ERASEFILES') has been scheduled successfully. Click "OK" on this dialog box to complete the process.    </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>7.</strong> <strong>  Manage Existing Tasks      </strong>     To view or modify your schedules, select the "Existing Task" radio button within the Scheduler interface. This will display a table of all current tasks, including the Task Name, Trigger time, and Frequency. From this view, you can select a specific task (e.g., "ERASEFILES") and use the "Edit" or "Delete" buttons to manage your automated erasure library.  </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>8.</strong> <strong> Edit an Existing Task       </strong>  To modify a scheduled operation, select a task from the list and click the "Edit" button. An "Edit Task" window will appear, allowing you to update the Frequency, Start From date and time, or add/remove items using the Browse button. Once your changes are complete, click "Save" to update the automated task.     </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>9.</strong> <strong>  Update Task and Confirm      </strong> After modifying the necessary details in the Edit Task window, click the "Save" button to apply the changes. An "Info" dialog box will appear to confirm that the task (e.g., 'ERASEFILES') has been updated successfully. Click "OK" on the dialog box to return to the main scheduler view.      </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>10.</strong> <strong>   Update Task and Confirm     </strong>     After modifying the necessary details in the Edit Task window, click the "Save" button to apply your changes. An "Info" dialog box will appear to confirm that the task (e.g., 'ERASEFILES') has been updated successfully. Click "OK" on the dialog box to return to the main scheduler view.  </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>11.</strong> <strong>   Monitor Scheduled Execution     </strong>   When a scheduled task reaches its set time, a dedicated Scheduler progress window will automatically appear. This window allows you to track the erasure in real-time, showing:    </p>
            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>12.</strong> <strong>  Final Completion and Report Generation </strong>   When the task finishes, the progress bar will reach 100%, and the interface will display a green checkmark indicating "Scheduled erasure completed!". The system will also confirm the total number of items processed (e.g., "All 58 files erased") and state that a "Report generated successfully". You can now safely close the scheduler window.    </p>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Scheduler - Product Screenshots</h4>
            <div className="space-y-4">
              <div>
                <p className="text-slate-700 mb-2"><strong>Scheduler - Main Interface:</strong> The scheduler main screen for creating and managing automated erasure tasks.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033769/dsecure-manual/06_Scheduler/S-1.png" alt="Scheduler - Main Interface" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Scheduler - Task Configuration:</strong> Configure task frequency, timing, and data selection for scheduled erasure.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033856/dsecure-manual/06_Scheduler/S-2.png" alt="Scheduler - Task Configuration" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Scheduler - Browse Items:</strong> Browse and select files or folders to add to the scheduled erasure task.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772033944/dsecure-manual/06_Scheduler/S-3.png" alt="Scheduler - Browse Items" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Scheduler - Task List:</strong> View and manage all scheduled erasure tasks with their details.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034032/dsecure-manual/06_Scheduler/S-4.png" alt="Scheduler - Task List" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
              <div>
                <p className="text-slate-700 mb-2"><strong>Scheduler - Execution:</strong> Monitor scheduled task execution progress and completion status.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034120/dsecure-manual/06_Scheduler/S-5.png" alt="Scheduler - Execution" className="w-full mb-4" style={{ borderRadius: '3%' }} />
              </div>
            </div>

          </>
        )
      },
      {
        id: "reports",
        number: "4.5",
        title: "Compliance Reporting & Audit Management",
        children: [
          {
            id: "report-structure",
            number: "4.5.1",
            title: "Understanding Report Structure",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Every <strong>Tamper-proof audit report with certificate</strong> generated by D-Secure follows a standardized compliance structure to ensure audit readiness:
                </p>
                <div className="bg-slate-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
                  <h4 className="font-bold text-slate-900 mb-3">Standard Report Layout:</h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <div>
                        <p className="font-semibold text-slate-800">Page 1: Certificate of Erasure</p>
                        <p className="text-sm text-slate-600">This is the legality page that certifies the successful erasure process, including machine details and compliance standards used.</p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <div>
                        <p className="font-semibold text-slate-800">Page 2 onwards: Summary & Annexure</p>
                        <p className="text-sm text-slate-600">Detailed technical summaries, hardware logs, and annexures that provide granular evidence of the data destruction process.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </>
            )
          },
          {
            id: "preview-report",
            number: "4.5.2",
            title: "Preview Compliance Report",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  The Preview Report feature allows you to review the <strong>Tamper-proof audit reports with certificate</strong> before saving. This section ensures all compliance data is accurately captured.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>1. Access Reports Section:</strong> Navigate to the "Reports" tab from the main dashboard. This section displays a chronological list of all erasure operations performed, including the date, time, erasure type (Files/Folders, Free Space, etc.), and status of each operation.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>2. Select Report to Preview:</strong> Browse through the list of generated reports and click on the specific report you wish to preview. You can use the search and filter options to quickly locate reports by date range, erasure type, or status. The selected report will be highlighted in the list.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>3. Click Preview Button:</strong> With the report selected, click the "Preview" button located in the toolbar or action panel. This will open a new window displaying the complete report in a formatted, easy-to-read layout.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>4. Review Report Details:</strong> The preview window shows comprehensive information including erasure summary, list of erased items with their original paths and sizes, erasure algorithm used, verification method applied, timestamp, technician information, and any custom fields or company branding configured in settings. Scroll through all sections to verify accuracy.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>5. Navigate Report Sections:</strong> Use the navigation controls within the preview window to move between different sections of the report such as Summary, Detailed Item List, Algorithm Information, and Verification Results. This allows you to thoroughly review each aspect of the erasure operation.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>6. Close or Proceed:</strong> After reviewing the report, you can either close the preview window if you need to make changes to report settings, or proceed directly to save the report or send it to D-Secure Cloud using the action buttons provided in the preview window.</p>
                  </div>
                </div>

                <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Reports - Product Screenshots</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-700 mb-2"><strong>Reports - Overview:</strong> The reports section showing a list of all generated erasure reports with details.</p>
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034208/dsecure-manual/07_Reports/R-1.png" alt="Reports - Overview" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                  </div>
                  <div>
                    <p className="text-slate-700 mb-2"><strong>Reports - Report Details:</strong> Detailed view of an erasure report with comprehensive information.</p>
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772034296/dsecure-manual/07_Reports/R-2.png" alt="Reports - Report Details" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                  </div>
                </div>
              </>
            )
          },
          {
            id: "save-report",
            number: "4.5.3",
            title: "Save Compliance Report",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Saving <strong>Tamper-proof audit reports with certificate</strong> provides permanent documentation of all compliance-verified data deletion operations.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>1. Select Report from Reports Tab:</strong> Open the Reports section from the main navigation menu. The interface displays all generated reports in a comprehensive list view. Locate the specific report you wish to save by browsing the list or using the search functionality to filter by date or erasure type.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>2. Click Save Report Button:</strong> Select the desired report by clicking on it to highlight the entry. Then click the "Save Report" button located in the toolbar or right-click context menu. This action will open the save report dialog window where you can configure export options.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>3. Choose Report Format:</strong> The save dialog presents multiple format options for your report. Select PDF format for professional, universally compatible reports that include digital signatures and cannot be easily modified. PDF reports maintain formatting across all platforms and are ideal for official documentation and compliance requirements.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>4. Select Destination Folder:</strong> Click the "Browse" button to open the file explorer window. Navigate through your computer's directory structure to select the folder where you want to save the report. You can create a new folder if needed by right-clicking and selecting "New Folder". Choose a location that is easily accessible and properly backed up.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>5. Configure File Name:</strong> In the file name field, enter a descriptive name for your report. The default naming convention typically includes the erasure type, date, and time stamp. You can customize this to match your organization's file naming standards for easier identification and archival.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>6. Complete Save Process:</strong> Review all your selections to ensure the format, location, and filename are correct. Click the "Save" button to export the report. A progress indicator will appear briefly, and upon successful completion, a confirmation message will display. The saved report is now available at your chosen location and can be shared, printed, or archived as needed.</p>
                  </div>
                </div>
              </>
            )
          },
          {
            id: "cloud-report",
            number: "4.5.4",
            title: "Send Compliance Report to D-Secure Cloud",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  D-Secure Cloud provides secure, encrypted cloud storage for your <strong>Tamper-proof audit reports with certificate</strong>, enabling remote access and centralized compliance management.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>1. Verify Cloud Account Login:</strong> Before uploading reports, ensure you are logged into your D-Secure Cloud account. Check the cloud status indicator in the top right corner of the application. If not logged in, click on the cloud icon and enter your D-Secure Cloud credentials (email and password) to authenticate.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>2. Navigate to Reports Section:</strong> Open the Reports tab from the main navigation menu. This displays a comprehensive list of all erasure reports generated by the application, including those already uploaded to cloud (marked with a cloud icon) and those stored locally only.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>3. Select Reports for Upload:</strong> Review the list and select one or more reports you wish to send to D-Secure Cloud by checking the boxes next to each report entry. You can select multiple reports simultaneously for batch upload. Reports already synchronized with cloud will be indicated with a special marker.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>4. Initiate Cloud Upload:</strong> With your reports selected, click the "Send to Cloud" button located in the toolbar at the top of the reports interface. This will prepare the selected reports for secure upload to your D-Secure Cloud account.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>5. Confirm Upload Operation:</strong> A confirmation dialog will appear showing the number of reports to be uploaded and estimated upload size. Review this information and click "Yes, Upload" to proceed. The application will begin securely encrypting and transferring the reports to D-Secure Cloud servers.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>6. Monitor Upload Progress:</strong> A progress indicator displays the upload status for each report, showing percentage completed and estimated time remaining. Once upload is complete, a success notification appears, and the reports are marked as synchronized. You can now access these reports from any device by logging into your D-Secure Cloud Console.</p>
                  </div>
                </div>
              </>
            )
          },
          {
            id: "report-settings",
            number: "4.5.4",
            title: "Change Report Settings",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Report settings allow you to customize the appearance and content of erasure reports to match your organization's branding and documentation requirements.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>1. Access Settings Menu:</strong> Click on the Settings icon (gear/cog icon) located in the top navigation bar or main menu. This opens the comprehensive settings panel where you can configure various aspects of the application's behavior and appearance.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>2. Navigate to Report Settings:</strong> Within the Settings panel, locate and click on "Report Settings" from the left sidebar menu. This section contains all customization options related to erasure report generation, formatting, and content.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>3. Configure Company Information:</strong> In the Company Details section, enter your organization name, address, phone number, email, and website. This information will appear in the header or footer of all generated reports, providing professional branding and contact information.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>4. Upload Company Logo:</strong> Click the "Upload Logo" button to select your company logo image file from your computer. Supported formats include PNG, JPG, and SVG. The logo will be displayed prominently on your reports. You can adjust the logo size and position using the alignment options provided.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>5. Set Technician Information:</strong> Enter the default technician name, title, and digital signature details. You can upload a signature image or create a digital signature. This information certifies who performed the erasure operation and adds authenticity to the report.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>6. Customize Report Fields:</strong> Enable or disable optional fields such as customer information, device serial numbers, custom notes, or additional metadata fields. Configure which sections should appear in the report and in what order to match your documentation standards.</p>
                  </div>

                  <div>
                    <p className="text-slate-700 leading-relaxed"><strong>7. Save Configuration:</strong> After making all desired changes, click the "Save Settings" button at the bottom of the page. A confirmation message will appear, and all future reports will be generated using these customized settings. You can return to modify these settings at any time.</p>
                  </div>
                </div>
              </>
            )
          }
        ]
      },
      {
        id: "settings",
        number: "4.6",
        title: "Configuring Settings",
        children: [
          {
            id: "general-settings",
            number: "4.6.1",
            title: "General Settings",
            children: [
              {
                id: "themes",
                number: "4.6.1.1",
                title: "Change Themes",
                content: (
                  <>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      D-Secure File Eraser supports multiple visual themes to enhance user comfort and reduce eye strain during extended use. Choose from Light Mode, Dark Mode, or System Default settings.
                    </p>
                    <div className="space-y-6">
                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>1. Open Settings Panel:</strong> Click on the Settings icon (gear/cog) located in the main navigation bar at the top of the application window. This will open the comprehensive settings configuration panel with various customization options.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>2. Navigate to General Settings:</strong> In the Settings panel, locate and click on "General Settings" or "Appearance" from the left sidebar menu. This section contains interface customization options including theme selection, language preferences, and display settings.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>3. Locate Theme Options:</strong> Scroll to the "Theme" or "Appearance Mode" section within General Settings. You will see three available theme options: Light Mode, Dark Mode, and System Default. Each option includes a preview showing how the interface will appear.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>4. Select Light Mode:</strong> Click on the "Light Mode" option if you prefer a bright, traditional interface with dark text on light backgrounds. This mode is ideal for well-lit environments and provides maximum contrast for easy readability during daytime use.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>5. Select Dark Mode:</strong> Choose "Dark Mode" for a darker color scheme with light text on dark backgrounds. This mode is easier on the eyes in low-light environments, reduces screen brightness, and is preferred by many users for extended work sessions, especially during evening hours.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>6. Select System Default:</strong> The "System Default" option automatically synchronizes the application theme with your operating system's theme settings. If your OS is set to Dark Mode, the application will use Dark Mode, and vice versa. This option is convenient for users who want consistency across all applications.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>7. Apply Theme Changes:</strong> After selecting your preferred theme, the change is applied immediately without requiring application restart. The entire interface will transition to the new theme, affecting all windows, dialogs, and panels. Your theme preference is automatically saved and will persist across application sessions.</p>
                      </div>
                    </div>

                    <h4 className="text-base font-semibold text-slate-800 mt-8 mb-4">Settings - Product Screenshots</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-slate-700 mb-2"><strong>Settings - General:</strong> The main settings panel with all configuration options.</p>
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035708/dsecure-manual/09_Settings/1_Settings.png" alt="Settings - General" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                      </div>
                      <div>
                        <p className="text-slate-700 mb-2"><strong>Settings - Ignore List:</strong> Configure the ignore list to exclude specific files or folders from erasure operations.</p>
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035796/dsecure-manual/09_Settings/2_Setting_ignore_list.png" alt="Settings - Ignore List" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                      </div>
                      <div>
                        <p className="text-slate-700 mb-2"><strong>Settings - Appearance:</strong> Customize the application appearance including theme and display preferences.</p>
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035887/dsecure-manual/09_Settings/3_setting_appearance.png" alt="Settings - Appearance" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                      </div>
                      <div>
                        <p className="text-slate-700 mb-2"><strong>Settings - Language:</strong> Change the application language to your preferred language option.</p>
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/v1772035987/dsecure-manual/09_Settings/4_settings_launguage.png" alt="Settings - Language" className="w-full mb-4" style={{ borderRadius: '3%' }} />
                      </div>
                    </div>
                  </>
                )
              },
              {
                id: "erasure-options",
                number: "4.6.1.2",
                title: "Select Erasure Options",
                content: (
                  <>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      Erasure options allow you to configure the default security algorithms, verification methods, and other preferences that control how data is permanently deleted from your system.
                    </p>
                    <div className="space-y-6">
                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>1. Access Settings Menu:</strong> Click on the Settings icon in the main navigation bar to open the settings panel. This centralized location provides access to all application configuration options.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>2. Navigate to Erasure Settings:</strong> In the Settings panel, locate and click on "Erasure Options" or "Erasure Settings" from the sidebar menu. This section contains all configuration options related to data erasure algorithms, verification, and security preferences.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>3. Select Default Erasure Algorithm:</strong> From the "Default Algorithm" dropdown menu, choose your preferred erasure standard. D-Secure offers 20+ internationally recognized algorithms including DoD 5220.22-M (3-pass), DoD 5220.22-M ECE (7-pass), Gutmann (35-pass), NIST 800-88, and others. Higher pass counts provide greater security but require more time. For most users, DoD 5220.22-M provides excellent security with reasonable speed.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>4. Configure Verification Method:</strong> Enable the "Verify Erasure" option to ensure data has been completely removed. Select from verification methods such as "Quick Verification" (spot checks random sectors), "Full Verification" (checks all erased sectors), or "No Verification" (faster but less certain). Full verification is recommended for sensitive data.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>5. Set Additional Preferences:</strong> Configure optional settings such as "Delete files after erasure" (removes file entries immediately), "Show confirmation dialogs" (prompts before each operation), "Enable sound notifications" (audio alerts on completion), and "Generate automatic reports" (creates documentation for each erasure task).</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>6. Configure Performance Options:</strong> Adjust settings like "Maximum CPU usage" to control how much system resources the erasure process can utilize. Lower settings reduce impact on other applications but extend erasure time. "Process priority" can be set to Low, Normal, or High depending on your requirements.</p>
                      </div>

                      <div>
                        <p className="text-slate-700 leading-relaxed"><strong>7. Save Configuration:</strong> After configuring all options according to your security requirements and preferences, click the "Save Settings" or "Apply" button at the bottom of the panel. These settings will become the default for all future erasure operations. You can modify these settings at any time, and changes can be applied per-operation if needed.</p>
                      </div>
                    </div>
                  </>
                )
              }
            ]
          },
          /* Hidden: Settings to Erase Traces section
          {
            id: "trace-settings",
            number: "4.6.2",
            title: "Settings to Erase Traces",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Configure which trace categories to include in erasure operations and set default preferences.
                </p>
                <div className="space-y-4">
                </div>
              </>
            )
          }
          */
        ]
      },
      {
        id: "cloud-login",
        number: "4.7",
        title: "Login to D-Secure Cloud",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              Login to D-Secure Cloud to access cloud-based report management, synchronization, and remote access features. Follow these steps to authenticate your account:
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 leading-relaxed mb-3"> Access Activation Window Click the key icon in the top toolbar to open the Activation dialog. Select the "Cloud Activation" radio button to use your registered account</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">Enter Credentials Enter your registered Email and Password in the provided text fields. The Status field will show "Disconnected" until you successfully log in.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">Complete Login Click the "Login" button to verify your credentials and activate the software via the cloud.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">Generate Offline Request If you choose "Offline Activation," click the "Generate Request Code" button to create a unique machine identifier. A pop-up will confirm that the code has been generated and automatically copied to your clipboard.</p>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">Submit and Activate Share the generated code with the D-Secure Support Team to receive your Activation Response Code. Once received, paste it into the response field and click the "Activate" button to complete the registration without an internet connection.</p>
              </div>
            </div>
          </>
        )
      }
    ]
  },
  {
    id: "faqs",
    number: "5",
    title: "Frequently Asked Questions (FAQs)",
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">1. What does the demo version of D-Secure File Eraser do?</h3>
          <p className="text-slate-700">The demo version of the software only allows you to select and list traces of files, folders, web browsers, applications or systems files. To perform any erasure, you must purchase and register the software.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">2. Why do I need to use D-Secure File Eraser?</h3>
          <p className="text-slate-700">When you delete a file from your system, the data is not actually erased. It is just marked as deleted and the space it was using is made available for other files to be stored. This means that the data can still be recovered by using data recovery software. <strong>D-Secure File Eraser</strong> helps you to securely and permanently erase files, applications and internet traces from your system thereby ensuring your data privacy. Also, the <strong>'Erase Free Space'</strong> feature of the software completely erases data in the free space (free hard drive space) which leaves no possibility of data to be recovered.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">3. Does D-Secure File Eraser remove data beyond recovery?</h3>
          <p className="text-slate-700">Yes, <strong>D-Secure File Eraser</strong> removes data beyond recovery.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">4. Does erasure cause any harm to my hard drive?</h3>
          <p className="text-slate-700">Erasing data using <strong>D-Secure File Eraser</strong> does not cause any harm to the hard drive.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">5. Can I erase a specific file using D-Secure File Eraser?</h3>
          <p className="text-slate-700">Yes, you can erase specific files by adding them to the erasure list or dragging the items and dropping them in the software or you can also erase selected files through <span className="text-brand-600 font-medium">Search & Erase</span> option.<br /><br />For more information, refer to <span className="text-brand-600 font-medium">Erase Files and Folders</span> section.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">6. What if data of the application traces are not erased after the complete erasure process?</h3>
          <p className="text-slate-700">It happens in case you have not closed the application during the erasing process or if you are viewing newly created files and folders after the application has restarted on completing an erasure process.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">7. What if the data of System Traces are not erased after the completion of an erasure process?</h3>
          <p className="text-slate-700">This problem arises if you view the recently created files or folders, as the operating system automatically creates some system traces at different time intervals.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">8. What are passes in Erasing algorithms?</h3>
          <p className="text-slate-700">Passes in erasing algorithms are number of times overwriting process is repeated. For example, in Peter Gutmann method, a series of 35 patterns is written over the region to be erased.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">9. Which algorithm should I choose for the best erasure?</h3>
          <p className="text-slate-700">It depends upon how many times an algorithm overwrites the data precisely or the number of passes used to erase the data. The more the number of passes used by the algorithm, more effective it is. Each algorithm performs a different set of features from which you can choose the suitable algorithm as per the requirement. See <span className="text-brand-600 font-medium">List of Erasure Algorithms and their Descriptions</span>, to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">10. What if the software is taking too long to erase the data?</h3>
          <p className="text-slate-700">It depends on the size of the data you are erasing, the configuration of the system and the algorithm you are using to erase the data. A large amount of data, lower configuration and more number of passes may consume more time for erasure.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">11. If a single overwrite can erase hard disk securely enough, why are there so many data sanitization algorithms?</h3>
          <p className="text-slate-700">Not everyone agrees on a data sanitization algorithm that will prevent all possible methods of recovering the data. Since many advanced, hardware based methods of extracting information from hard drives exist, several governmental organizations and researchers have independently devised certain methods of overwriting data that, according to their research, should prevent these advanced recovery methods from working.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">12. Which types of files cannot be erased using D-Secure File Eraser?</h3>
          <p className="text-slate-700">System files are crucial files that are used by operating systems to run your computer. So it is not possible to erase system files.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">13. Is it possible to erase specific internet activities instead of clearing all of them?</h3>
          <p className="text-slate-700">Yes, you can choose specific items or internet activities from the list of browsers you want to erase. See <span className="text-brand-600 font-medium">Erase Internet Traces</span>, to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">14. What if I lose or misplace compliance reports on my system?</h3>
          <p className="text-slate-700">The application provides functionality to send <strong>Tamper-proof audit reports with certificate</strong> to Cloud. See <span className="text-brand-600 font-medium">Send Compliance Report to D-Secure Cloud</span> to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">15. Can I preview and save the compliance reports?</h3>
          <p className="text-slate-700">Yes, you can do it. Refer to <span className="text-brand-600 font-medium">Preview</span> and <span className="text-brand-600 font-medium">Save</span> section under Compliance Reporting to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">16. Can I get reports for my erasure compliance?</h3>
          <p className="text-slate-700">Yes, <strong>D-Secure File Eraser</strong> provides detailed <strong>Tamper-proof audit reports with certificate</strong>. See <span className="text-brand-600 font-medium">Compliance Reporting</span> for more details.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">17. Can I use D-Secure File Eraser to erase the free space on the primary partition of my hard drive?</h3>
          <p className="text-slate-700">Yes, it is secure to use <strong>D-Secure File Eraser</strong> to erase data in the <span className="text-brand-600 font-medium">free space</span> of the hard drive's primary partition as it removes the free space left after deletion of files and folders.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">18. What is the process for scheduling an erase traces task for a specific browser?</h3>
          <p className="text-slate-700 mb-2">To schedule an erasure task for a specific browser, you need to configure the default settings for that browser in the <strong>D-Secure File Eraser</strong> settings. After that, you can schedule the erasure task using the schedule erasure tab for the desired duration.</p>
          <p className="text-slate-700 mb-2">Follow the steps below to schedule an erase traces task for a specific browser:</p>
          <ol className="list-decimal list-inside space-y-1 text-slate-700 ml-4 mb-2">
            <li>Click on the <strong>Settings</strong> icon displayed on the screen.</li>
            <li>Select <strong>Erase Traces</strong> tab from the <strong>Settings</strong> window that appears next.</li>
            <li>Select <strong>Internet Activity</strong> tab.</li>
            <li>Choose the <strong>browser</strong> you want to schedule to erase traces and click <strong>OK</strong>.</li>
            <li>Select <strong>Schedule Erasure</strong> from <strong>Select Option</strong> displayed on the left pane of the screen.</li>
            <li>Select <strong>Erase Traces</strong> tab from the right pane of the screen.</li>
            <li>Choose the required frequency period and specific time for running the eraser task.</li>
            <li>Click <strong>OK</strong> to schedule.</li>
          </ol>
          <p className="text-slate-700 mt-2">Once you have scheduled the erase traces task for the particular browser, it will run automatically at the designated time and date, erasing all the traces of your browsing history, cookies, and related data.<br />To know more, please refer to <span className="text-brand-600 font-medium">Set Schedule Erasure for Erase Traces</span> section.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">19. Is it possible for the software to automatically erase traces of any files or folder?</h3>
          <p className="text-slate-700">Yes, <strong>D-Secure File Eraser</strong> provides an option to schedule eraser task to perform automatically at predefined period. Refer to <span className="text-brand-600 font-medium">Set Schedule Erasure for Files and Folders</span> section to schedule erasure task automatically.</p>
        </div>
      </div>
    )
  },
  {
    id: "about-dsecure",
    number: "6",
    title: "About D-Secure",
    content: (
      <p className="text-slate-700 leading-relaxed">
        D-Secure is a leading provider of data sanitization and security solutions. Our mission is to provide robust, reliable, and user-friendly data erasure solutions that empower organizations to manage their data lifecycle securely and meet stringent regulatory requirements with confidence.
      </p>
    )
  }
];

/* ===========================
   UI Components & Helpers
   =========================== */

const Anchor: React.FC<{ id: string }> = ({ id }) => (
  <div id={id} className="relative -top-24" />
);

const useScrollToHash = () => {
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);
};

// Recursive renderer for sidebar
const SidebarItem: React.FC<{ item: NavItem; activeSection: string; onJump: (id: string) => void; level?: number }> = ({ item, activeSection, onJump, level = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeSection === item.id;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="text-sm">
      <div className={`flex items-center gap-2 py-1.5 px-3 rounded-md transition-colors cursor-pointer ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
        }`}
        style={{ paddingLeft: `${(level * 12) + 12}px` }}
        onClick={(e) => {
          e.stopPropagation();
          onJump(`#${item.id}`);
          if (hasChildren) setIsExpanded(!isExpanded);
        }}
      >
        {hasChildren && (
          <span onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} className="p-0.5 hover:bg-gray-200 rounded">
            {isExpanded ? <ChevronRight className="w-3.5 h-3.5 rotate-90 transition-transform" /> : <ChevronRight className="w-3.5 h-3.5 transition-transform" />}
          </span>
        )}
        {!hasChildren && <span className="w-3.5" />}

        <a href={`#${item.id}`} onClick={(e) => e.preventDefault()} className="flex-1 break-words">
          {item.title}
        </a>
      </div>
      {hasChildren && isExpanded && (
        <div className="mt-1 border-l border-gray-200 ml-6">
          {item.children!.map(child => (
            <SidebarItem key={child.id} item={child} activeSection={activeSection} onJump={onJump} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// Recursive renderer for content
const ContentSection: React.FC<{ item: NavItem; level?: number }> = ({ item, level = 0 }) => {
  return (
    <section className="scroll-mt-24 mb-12">
      <Anchor id={item.id} />

      <div className={`mb-6 ${level === 0 ? 'pb-4 border-b-2 border-gray-200' : ''}`}>
        <div className="flex items-center gap-3">
          <h2 className={`${level === 0 ? 'text-3xl font-bold text-gray-900' :
            level === 1 ? 'text-2xl font-semibold text-gray-800 mt-8' :
              'text-xl font-medium text-gray-800 mt-6'
            }`}>
            {item.title}
          </h2>
        </div>
      </div>

      {item.content && (
        <div className="text-gray-700 text-base leading-relaxed space-y-4 prose prose-blue max-w-none">
          {item.content}
        </div>
      )}

      {item.children && (
        <div className="space-y-8 mt-6">
          {item.children.map(child => (
            <ContentSection key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </section>
  );
};



/* ===========================
   Main Component
   =========================== */
const CompleteDSecureManual: React.FC = () => {
  useScrollToHash();
  const [activeSection, setActiveSection] = useState("");
  const [shouldShowScrollTop, setShouldShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShouldShowScrollTop(window.scrollY > 400);
      const headingElements = document.querySelectorAll('[id]');
      let currentSection = "";
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) {
          currentSection = el.id;
        }
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onJump = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(hash.replace('#', ''));
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead seo={getSEOForPage("support/help-manual/complete-manual")} />

      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 6px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto sidebar-scroll pr-2">
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Table of Contents</h3>
                <nav className="space-y-1">
                  {navigationTree.map((item) => (
                    <SidebarItem
                      key={item.id}
                      item={item}
                      activeSection={activeSection}
                      onJump={onJump}
                    />
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <main className="flex-1 min-w-0 bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12">
            <div className="mb-12 pb-8 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
                D-Secure File Eraser
              </h1>
              <p className="text-xl text-gray-500">
                Complete User Guide & Documentation
              </p>
            </div>

            <div className="space-y-16">
              {navigationTree.map(item => (
                <ContentSection key={item.id} item={item} />
              ))}
            </div>

            <footer className="mt-20 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 mb-2">Need further assistance?</p>
              <a href="mailto:support@dsecuretech.com" className="text-blue-600 font-medium hover:underline">
                Contact Support
              </a>
              <p className="text-sm text-gray-400 mt-8">
                © {new Date().getFullYear()} D-SecureTech. All rights reserved.
              </p>
            </footer>
          </main>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 z-50 ${shouldShowScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>

    </div>
  );
};

export default CompleteDSecureManual;
