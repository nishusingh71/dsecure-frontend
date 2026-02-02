import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
    title: "About D-Secure Drive Eraser",
    content: (
      <>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>D-Secure Drive Eraser</strong> is a complete solution to maintain your computer privacy by erasing unwanted information from the computer. Erased data is beyond recovery. <strong>D-Secure Drive Eraser</strong> can be used to erase drives/folders, Unused space, and System traces.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>D-Secure Drive Eraser</strong> erases drives & folders completely from the hard drive. You can select multiple drives/folders at a time for erasure. Once drives/folders from the drive are erased using <strong>D-Secure Drive Eraser</strong> data can't be recovered back. The software allows you to generate and save the reports of the completed erasure process.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          In addition, it can erase unused space completely such that all the traces of previously stored data are completely removed. When you delete data from a hard drive, the data content is not deleted entirely, instead the space occupied by the data is marked as unused space and the new data is written on that unused space.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>D-Secure Drive Eraser</strong> also erases all the system traces. Operating systems store records of all activities such as browsing Internet and opening documents constantly.
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          <strong>D-Secure Drive Eraser</strong> has a set of 20+ different erasure algorithms, that are accepted globally, to ensure permanent data deletion. You can choose any of the algorithms for erasure process. The software is menu driven, simple to use with an intuitive interface, and requires no prior technical skill.
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
          <li><strong>Generate and Save Reports</strong>- Option to generate and save 100% secure and tamper-proof erasure reports in various formats such as PDF</li>
          <li><strong>Report Settings</strong>- Option to customise the reports before saving the report.</li>
          <li><strong>Search Report</strong>- Option to search reports by selecting the appropriate date range or erasure type.</li>
          <li><strong>Preview Report</strong>- Option to preview the report before saving.</li>
          <li><strong>Save Report to D-Secure Cloud</strong>- Automatic report uploaded to D-Secure Cloud Console.</li>
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
          This user guide contains steps to assist you in various functions of <strong>D-Secure Drive Eraser</strong>. Each function is explained in detail, in the corresponding sections. This guide covers the following major topics:
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
        title: "Installation D-Secure Drive Eraser",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              Follow these comprehensive steps to successfully install D-Secure Drive Eraser on your system:
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
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded overflow-hidden w-1/4">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767179216/fsxo7fgdrpsmr9whozmm.jpg" alt="Main Dashboard" className="w-full h-auto" />
                  </div>
                  <div className="border border-gray-200 rounded overflow-hidden w-1/4">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767179216/dqpwy8upofic1itdmcfe.jpg" alt="Erase Files Tab" className="w-full h-auto" />
                  </div>
                  <div className="border border-gray-200 rounded overflow-hidden w-1/4">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767179216/nzm3pqkqmlcdtr9ktfeu.jpg" alt="Add Items Button" className="w-full h-auto" />
                  </div>
                  <div className="border border-gray-200 rounded overflow-hidden w-1/4">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767179216/se8crsmpekz7hfyyxx0f.jpg" alt="Erase Now Button" className="w-full h-auto" />
                  </div>
                  <div className="border border-gray-200 rounded overflow-hidden w-1/4">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767179215/cnye1quqy5ahwxn23sgs.jpg" alt="Settings Button" className="w-full h-auto" />
                  </div>
                  <div className="border border-gray-200 rounded overflow-hidden w-1/4">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767179215/uvtw2xxfhrn5n1i8sbvp.jpg" alt="Reports Section" className="w-full h-auto" />
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
              To know more about D-Secure Drive Eraser, click <Link to="/products" className="text-blue-600 hover:underline">here</Link>.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              To purchase the software online, click <Link to="/pricing-and-plan?product=drive-eraser" className="text-blue-600 hover:underline">here</Link>.
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
                <div className="mt-3  border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190292/da1tkglizlctioo2dkvy.jpg" alt="Activate Menu" className="w-full " style={{ borderRadius: '3%' }} />
                </div>
              </li>
              <li className="mb-4">
                <span className="font-medium">   <strong> Online Activation     </strong>Select the "Online Activation" option and enter the product key received in your email into the text field. Click the "Activate" button to complete the process, or use "Get it Now" if you do not yet have a license key.</span>
                <div className="mt-3  border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190292/fdckookpcjyggjd9pfut.jpg" alt="Enter License Key" className="w-full" style={{ borderRadius: '3%' }} />
                </div>
              </li>
              <li className="mb-4">
                <span className="font-medium">   <strong> Offline Activation     </strong>Select the "Offline Activation" radio button to register without an active internet connection. Click "Generate Request Code" to create a code to share with the D-Secure Support Team, then enter the provided Activation Response Code and click "Activate" to finish.</span>
                <div className="mt-3  border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190293/krkocraxnwan7eniscsh.jpg" alt="Activation Success" className="w-full" style={{ borderRadius: '3%' }} />
                </div>
              </li>


              <li className="mb-4">
                <span className="font-medium">  Offline Activation Select "Offline Activation" and click "Generate Request Code" to create a unique code for the D-Secure Support Team. Once you receive the Activation Response Code from them, enter it into the designated field and click "Activate" to register the software without an internet connection.</span>
                <div className="mt-3  border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190302/l96qjgzvqj64nixtncuu.jpg" alt="Activation Success" className="w-full" style={{ borderRadius: '3%' }} />
                </div>
              </li>

              <li className="mb-4">
                <span className="font-medium">   Offline Activation Select "Offline Activation" and click "Generate Request Code" to create a unique code for the D-Secure Support Team. Once generated, the code is automatically copied to your clipboard to be shared for a response. Finally, enter the received Activation Response Code and click "Activate" to finish.</span>
                <div className="mt-3  border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190295/e2vlnkwfaots4ercjdcj.jpg" alt="Activation Success" className="w-full" style={{ borderRadius: '3%' }} />
                </div>
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
          <p className="text-slate-700 leading-relaxed">
            D-Secure automatically checks for updates. You can also manually check via Settings → Check for Updates. Always keep your software updated for the latest features and security patches.
          </p>
        )
      },
      {
        id: "contact",
        number: "3.7",
        title: "Contact Information",
        content: (
          <div className="text-slate-700 leading-relaxed">
            <p className="mb-2"><strong>Email:</strong> support@D-Securetech.com</p>
            <p className="mb-2"><strong>Website:</strong> www.D-Securetech.com</p>
            <p><strong>Support Hours:</strong> 24/7 Business Hours</p>
          </div>
        )
      }
    ]
  },
  {
    id: "working",
    number: "4",
    title: "Working with D-Secure Drive Eraser",
    children: [
      {
        id: "erase-files",
        number: "4.1",
        title: "Erase Drives and Folders",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              To securely erase drives and folders:
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong>  <strong>  Access Drive Erasure Mode: </strong> Navigate to the "Erase Drives/Folders" tab located in the left sidebar menu. The main interface will display a designated zone labeled "Drag & Drop Drives & Folders Here". You can either drag your drives directly into this area or click the "Browse Drives" link to manually select data from your computer.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767164487/pxivekqv1xwqftp7mluh.png" alt="Erase Files Tab" className="w-full mb-6" style={{ borderRadius: '4%' }} />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong>    <strong>  Select Drives or Folders Manually: </strong> If you choose to browse manually, a "Select Drives or Folders" window will appear. Navigate through your local directories (e.g., C:\D-Secure) to find the data you wish to remove. Select the desired drive—such as "D-SecureErase.exe"—and click the "Add Selected" button to add it to the erasure queue. </p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767164486/foglpcpwfsp1nrfafgg4.png" alt="Add Items" className="w-full mb-6" style={{ borderRadius: '1%' }} />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> <strong>  Review the Erasure List: </strong> The selected items will now appear in the main erasure table. This list provides a detailed overview, including the checkbox to Include the drive, the specific Drive Name, the full system Path, the item Type, and its Size. Confirm all items are correct before proceeding. </p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767164487/dryvshnscg2wuubvjbuq.png" alt="Review Items" className="w-full mb-6" style={{ borderRadius: '4%' }} />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> <strong>  Initiate Erasure: </strong> Once you have verified your selection, click the "Erase Now" button located at the bottom right corner of the window. This action prepares the application to securely destroy the listed data. </p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767164486/yyyancdhy0svt1cmkixc.png" alt="Erase Now" className="w-full mb-6" style={{ borderRadius: '4%' }} />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>5.</strong> <strong> Final Erasure Confirmation A "Confirm Erasure: </strong> dialog box will appear as a safety measure. It summarizes the Items selected and the Total files to erase. Review the warning: "This action cannot be undone". If you are certain, click "Yes, Erase" to begin the permanent deletion process.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767164485/extjstcwso6dop9chh2t.png" alt="Completion" className="w-full mb-6" style={{ borderRadius: '6%' }} />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>6.</strong> <strong>  Erasure Process and Monitoring: </strong>D-SecureErase will now begin shredding the files. You can monitor the progress through the Shredder Animation and the Progress Bar. The interface also displays the real-time file path currently being processed. If necessary, you can halt the operation using the red "Stop" button. </p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767164487/kml72uwwvipwaowaj73c.png" alt="Completion" className="w-full mb-6" style={{ borderRadius: '4%' }} />
              </div>



              <div>
                <p className="text-slate-700 mb-3"><strong>7.</strong> <strong>  Review Drive Erasure Summary: </strong>Upon completion, a "Drive's & Folder's Erasure Summary" report is generated. This table confirms the Drive Path, Size, and shows the final Status as "Erased & Verified". Click the "OK" button to close the summary and return to the main dashboard. </p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767164487/dryvshnscg2wuubvjbuq.png" alt="Completion" className="w-full mb-6" style={{ borderRadius: '4%' }} />
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
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336045/um6ckm7shkbv9s22af2b.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />


              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Handling Locked Volumes If a drive appears as "Locked / Inaccessible" (e.g., F:\ [Locked]), it cannot be selected for erasure in its current state. Ensure the drive is properly connected and unlocked before attempting to check the selection box for wiping.</p>

                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336045/fpfrmbqwqikle2twmuj5.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Confirm Erasure Once you click "Erase Now," a Confirm Erasure dialog box will appear listing the selected drive (e.g., F:). This action is permanent and cannot be undone; click "Yes, Erase" to proceed with the wiping process or "Cancel" to go back.</p>
                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336045/r3zhjmt6nlhflpxlscm4.jpg  " alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Permanently Wipe Selected Volume Confirm the erasure by clicking "Yes, Erase" in the dialog box. This will trigger the wiping process for the selected drive (e.g., F:), permanently removing all stored data to ensure it cannot be recovered.</p>
                <img src="  https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336046/skf0os0bjcx36lon0lsl.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Monitor Erasure Progress After confirming, the software begins wiping the drive sector by sector. You can track the real-time progress through the percentage bar and the exact sector count being processed (e.g., 20,701,184 sectors). A "Stop" button is available if you need to terminate the process immediately.</p>
                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336045/m7zxxdttloczazi01n9k.jpg  " alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 leading-relaxed">Finalizing Erasure As the process nears completion, the progress bar will reach approximately 88.9%, showing that the vast majority of sectors (e.g., 96,960,512) have been successfully wiped. Keep the software running until the bar reaches 100% to ensure every sector of the selected volume is permanently erased.</p>
                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336045/ignz55qmsntaodg2ecm1.jpg  " alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">Completion Notification Once the process reaches 100%, a Volume Erasure information box will appear confirming that the "Volume erased successfully". Click the "OK" button to close the dialog and return to the main menu.</p>
                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336047/xrqzkfrixory2xgri0p5.jpg " alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">View Erasure Summary After clicking "OK" on the success dialog, a Summary table will appear. This table provides a final log of the operation, including the Target drive (F:), its Capacity (52.00 GB), the total Sectors Erased (109,043,712), and the Method used. Click the blue "OK" button at the bottom right to return to the volume selection screen.</p>
                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336046/ga10g9ac9maloluzooih.jpg " alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">Drive Reformatting After the volume erasure is complete, the drive will appear as unallocated or unrecognized by the system. To make it usable again, right-click the drive in your file explorer and select "Format..." to create a new file system and restore its accessibility.</p>
                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336046/gngbhft33b34tgppfsx7.jpg " alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">Format Volume for Re-use To make the erased drive accessible again, open Windows File Explorer, right-click the wiped volume (e.g., F:), and select "Format...". In the format window, ensure "Quick Format" is selected and click "Start" to restore the drive's file system for normal use.</p>
                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336047/c5xgql17tc8qsgrjl3eh.jpg  " alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>
              <div>
                <p className="text-slate-700 leading-relaxed">Formatting Complete Once the quick format is finished, a notification will appear stating "Format Complete". Click the "OK" button to finalize the process; your drive is now fully restored with a clean file system and ready for new data.</p>
                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767336047/yncpgejwjilmbeq1wx7f.jpg " alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

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
              D-Secure Drive Eraser allows you to securely erase drives stored in your Google Drive cloud storage without needing to open your account manually. This feature ensures complete privacy by permanently removing cloud-stored data.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong> Select 'Cloud Storage' tab</p>
                <p className="text-slate-600 text-sm mb-3 italic">Note: You must be logged into your Google account for this feature to work.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113921/d7z71zwnclsifqtstbl9.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Connect your Google Drive account</p>
                <p className="text-slate-600 text-sm mb-3">Click the "Connect" button to initiate the authorization process. A browser window will automatically open asking you to sign in. Select the Google Account you wish to link with D-Secure to proceed</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767114553/mkch2ielijlnygetaoge.png" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> Grant Permissions</p>
                <p className="text-slate-600 text-sm mb-3">On the consent screen titled "D-Secure wants access to your Google Account," review the access request. Click the "Continue" button to grant the necessary permissions and proceed with the connection</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113924/nraikrpp6sls2m8egdad.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> Authorization Success</p>
                <p className="text-slate-600 text-sm mb-3">Once the permissions are granted, the browser will display a confirmation page. Look for the "Success!" header followed by the message "All done. Please go back to D_CLOUDBASE". This confirms that D-Secure has successfully authenticated with your cloud account, and you can now return to the application interface</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113922/qrpotpcoqqqskbr1nzkr.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>5.</strong> Connection Confirmation</p>
                <p className="text-slate-600 text-sm mb-3">Return to the D-SecureErase application. A "Status Update" dialog box will appear confirming that "Google Drive connected Successfully". Click the "OK" button to close the dialog and begin managing your cloud storage</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113786/jg97pzpacy7h4wbxvrko.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>6.</strong> Erase Cloud Volume</p>
                <p className="text-slate-600 text-sm mb-3">Select the "Erase Volume" radio button to wipe the entire contents of your cloud storage. The interface will display a "Google Drive - Storage Overview" card showing your current usage statistics (e.g., 18% used, 12.25 GB free). Check the box located on this storage card to select the volume for erasure.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113788/u1u6v9rli9sea3sij9ya.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>6.1</strong> Erase Specific Files and Folders</p>
                <p className="text-slate-600 text-sm mb-3">Select the "Erase Files/Folder" radio button to view your cloud directory structure. A file tree will appear showing your Google Drive folders (e.g., "Testing Data"). Expand the folders and check the boxes next to the specific files or subfolders you wish to permanently remove.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113786/oiqnosbnioa1dasr8a6a.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>6.2</strong> Browse File Directory</p>
                <p className="text-slate-600 text-sm mb-3">Alternatively, select the "Erase Files/Folder" radio button to access individual files instead of wiping the whole volume. The interface will load your cloud directory structure, showing the root folder (e.g., "Google Drive") and subfolders like "Testing Data (1)". This view allows you to navigate through your storage hierarchy to pinpoint specific data for removal.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113794/utipneibbd6y7rxsbqdh.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>7.</strong> Erase Specific Files and Folders</p>
                <p className="text-slate-600 text-sm mb-3">Select the "Erase Files/Folder" radio button to browse your cloud directory structure. A hierarchical file tree will appear, displaying your Google Drive folders and files (e.g., "Testing Data", "erase data - Copy"). Expand the directories and check the boxes next to the specific items you want to permanently erase.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113792/lfli5ca1ij5xi5fopgwp.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>7.1</strong> Select Items to Erase </p>
                <p className="text-slate-600 text-sm mb-3">Navigate deeper into the directory tree to locate the specific data you intend to destroy. Click the checkboxes next to the individual files (such as .tmp or media files) or entire sub-folders to mark them for deletion. Ensure that the checkboxes are ticked for all items you wish to permanently remove before proceeding.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113790/jdxortfirlhfvosmh8x2.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>8.</strong> Confirm and Execute Erasure</p>
                <p className="text-slate-600 text-sm mb-3">After making your selection, click the "Erase Cloud Data" button. A "Confirm Cloud Erasure" dialog box will appear, displaying a summary of the items to be deleted (e.g., "3 files and 1 folders"). The dialog includes a warning that "This action cannot be undone". Click the "Yes, Erase" button to proceed with the permanent deletion of the selected cloud data</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113932/slpruaiyeqwipbc4rrnj.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>9.</strong> Erasure in Progress</p>
                <p className="text-slate-600 text-sm mb-3">Once confirmed, the application begins the secure erasure process. The interface displays a large shredding animation along with a progress bar and status message (e.g., "Starting cloud erasure...") to keep you informed. If you need to halt the operation immediately, you can click the "Stop" button located at the bottom right of the window.</p>
                <img src=" https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113930/qixab9dmayc9j8gif6gh.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>9.1.</strong> Monitor Real-Time Progress</p>
                <p className="text-slate-600 text-sm mb-3">As the operation advances, the progress bar updates to reflect the percentage of completion (e.g., 33%). The status message below the bar provides specific details about the current action, identifying which file is currently being destroyed (e.g., "Erasing cloud file 1/3: deleted_..."). This allows you to track exactly which data is being processed in real-time.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113794/hjxm0vunlo5dgegixnyd.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>10.</strong> Review Erasure Summary</p>
                <p className="text-slate-600 text-sm mb-3">When the process completes, the application presents a "Cloud File Erasure Summary" table. This report details the specific files that were processed, showing their full file paths (e.g., ".../erase data - Copy (1)"), file sizes (e.g., 103.09 MB), and their final status as "Erased". Review the details and click the "OK" button to close the summary and finish the operation.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767113794/j1ieckpw4d9gbgphwhue.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

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
              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173974/fxlhwph8xah5xgcqf7c2.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>2.</strong> <strong>   Configure Task Details     </strong> Define the parameters for your automated erasure:
                <br />
                <br />
                <h5> <strong>2.1  Frequency & Timing: </strong>Set how often the task should run (e.g., "Once") and the exact Date and Time for it to start.</h5>

                <h5><strong>2.2 Task Identification:</strong> Select "New Task" and enter a descriptive Task Name (e.g., "ERASEFILES").</h5>

                <h5><strong>2.3 Select Data: </strong>Click "Browse" to choose the files or folders you want to schedule for permanent deletion.   </h5>   </p>
              <br />
              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173974/kbw6yfd5mdm2z09nqv4d.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>3.</strong> <strong>  Browse and Select Items      </strong>  Click the "Browse" button to open a file selection window. Navigate through your local directories (e.g., F:\Testing Data) and check the boxes next to the specific folders or files you wish to add to the schedule. Click the "Add" button to include these items in your task list.     </p>

              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173974/r2fs60fpvs7m9hvypu1n.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>4.</strong> <strong> Finalize and Save Task       </strong>   Once you have added the items from the browse window, they will appear in the task list showing the Name, Size, and Type. Review the details and click the "OK" button at the bottom right to save and activate your scheduled erasure task.    </p>

              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173974/gsgqtflxe6fs4qsupsht.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>5.</strong> <strong>   Confirm and Save Schedule     </strong>  Review your finalized task in the list to ensure the correct Name, Size, and Type (e.g., Folder) are displayed. Click the "OK" button to activate the schedule. An "Info" dialog box will appear confirming, "Task 'ERASEFILES' scheduled successfully". Click "OK" on the dialog box to finish the setup.     </p>

              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173975/glt9hasa5kohhr8pcg0e.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>6.</strong> <strong>   Finalize and Confirm Task     </strong>   After selecting your items, they will be listed in the task table with their Name, Size, and Type (e.g., Folder). Click the "OK" button at the bottom right to finalize the setup. An "Info" dialog box will appear to confirm that the task (e.g., 'ERASEFILES') has been scheduled successfully. Click "OK" on this dialog box to complete the process.    </p>

              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173975/xzyyxjs7c6m1craeafwz.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>7.</strong> <strong>  Manage Existing Tasks      </strong>     To view or modify your schedules, select the "Existing Task" radio button within the Scheduler interface. This will display a table of all current tasks, including the Task Name, Trigger time, and Frequency. From this view, you can select a specific task (e.g., "ERASEFILES") and use the "Edit" or "Delete" buttons to manage your automated erasure library.  </p>

              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173975/zrruf5vuaynxz6ya72ad.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>8.</strong> <strong> Edit an Existing Task       </strong>  To modify a scheduled operation, select a task from the list and click the "Edit" button. An "Edit Task" window will appear, allowing you to update the Frequency, Start From date and time, or add/remove items using the Browse button. Once your changes are complete, click "Save" to update the automated task.     </p>

              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173975/zrruf5vuaynxz6ya72ad.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>9.</strong> <strong>  Update Task and Confirm      </strong> After modifying the necessary details in the Edit Task window, click the "Save" button to apply the changes. An "Info" dialog box will appear to confirm that the task (e.g., 'ERASEFILES') has been updated successfully. Click "OK" on the dialog box to return to the main scheduler view.      </p>

              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173975/mommpwrjrdzemhblbobt.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>10.</strong> <strong>   Update Task and Confirm     </strong>     After modifying the necessary details in the Edit Task window, click the "Save" button to apply your changes. An "Info" dialog box will appear to confirm that the task (e.g., 'ERASEFILES') has been updated successfully. Click "OK" on the dialog box to return to the main scheduler view.  </p>

              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173976/fo9ngx0660o0u1czrehg.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>
            <div>
              <p className="text-slate-700 mb-3"><strong>11.</strong> <strong>   Monitor Scheduled Execution     </strong>   When a scheduled task reaches its set time, a dedicated Scheduler progress window will automatically appear. This window allows you to track the erasure in real-time, showing:    </p>


              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173976/prz2rgxdpsqlirgur172.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>


            <div>
              <p className="text-slate-700 mb-3"><strong>12.</strong> <strong>  Final Completion and Report Generation </strong>   When the task finishes, the progress bar will reach 100%, and the interface will display a green checkmark indicating "Scheduled erasure completed!". The system will also confirm the total number of items processed (e.g., "All 58 files erased") and state that a "Report generated successfully". You can now safely close the scheduler window.    </p>

              <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767173976/ld3m3z3mdqsmbtjrvy2r.jpg" alt="Cloud Storage Interface" className="w-full mb-6" style={{ borderRadius: '3%' }} />

            </div>

          </>
        )
      },
      {
        id: "reports",
        number: "4.5",
        title: "Working on Reports",
        children: [
          {
            id: "preview-report",
            number: "4.5.1",
            title: "Preview Report",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  The Preview Report feature allows you to review comprehensive erasure details before saving or distributing the report. This ensures accuracy and completeness of all recorded information.
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
              </>
            )
          },
          {
            id: "save-report",
            number: "4.5.2",
            title: "Save Report",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Saving erasure reports provides tamper-proof documentation of all data deletion operations. These reports can be used for compliance, auditing, and record-keeping purposes.
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
            number: "4.5.3",
            title: "Send Report to D-Secure Cloud",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-6">
                  D-Secure Cloud provides secure, encrypted cloud storage for your erasure reports, enabling remote access, centralized management, and automatic synchronization across multiple installations.
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
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059232/u2qmj9jitsxbfpnbf8pw.png" alt="Trace Settings" className="w-full" />
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059232/goptjbjxxejpyzca2xiz.png" alt="Trace Categories" className="w-full" />
                  </div>
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
                <div className=" border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190292/da1tkglizlctioo2dkvy.jpg" alt="Cloud Login Access" className="w-full" style={{ borderRadius: '3%' }} />
                </div>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">Enter Credentials Enter your registered Email and Password in the provided text fields. The Status field will show "Disconnected" until you successfully log in.</p>
                <div className=" border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190292/fdckookpcjyggjd9pfut.jpg" alt="Enter Cloud Credentials" className="w-full" style={{ borderRadius: '3%' }} />
                </div>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">Complete Login Click the "Login" button to verify your credentials and activate the software via the cloud.</p>
                <div className=" border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190293/krkocraxnwan7eniscsh.jpg" alt="Account Verification" className="w-full" style={{ borderRadius: '3%' }} />
                </div>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">Generate Offline Request If you choose "Offline Activation," click the "Generate Request Code" button to create a unique machine identifier. A pop-up will confirm that the code has been generated and automatically copied to your clipboard.</p>
                <div className=" border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190302/l96qjgzvqj64nixtncuu.jpg" alt="Cloud Connection" className="w-full" style={{ borderRadius: '3%' }} />
                </div>
              </div>

              <div>
                <p className="text-slate-700 leading-relaxed mb-3">Submit and Activate Share the generated code with the D-Secure Support Team to receive your Activation Response Code. Once received, paste it into the response field and click the "Activate" button to complete the registration without an internet connection.</p>
                <div className=" border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1767190295/e2vlnkwfaots4ercjdcj.jpg" alt="Cloud Features Active" className="w-full" style={{ borderRadius: '3%' }} />
                </div>
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
          <h3 className="text-lg font-bold text-slate-800 mb-2">1. What does the demo version of D-Secure Drive Eraser do?</h3>
          <p className="text-slate-700">The demo version of the software only allows you to select and list traces of drives, folders, web browsers, applications or systems drives. To perform any erasure, you must purchase and register the software.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">2. Why do I need to use D-Secure File Eraser?</h3>
          <p className="text-slate-700">When you delete a file from your system, the data is not actually erased. It is just marked as deleted and the space it was using is made available for other files to be stored. This means that the data can still be recovered by using data recovery software. <strong>D-Secure File Eraser</strong> helps you to securely and permanently erase files, applications and internet traces from your system thereby ensuring your data privacy. Also, the <strong>'Erase Free Space'</strong> feature of the software completely erases data in the free space (free hard drive space) which leaves no possibility of data to be recovered.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">3. Does D-Secure Drive Eraser remove data beyond recovery?</h3>
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
          <h3 className="text-lg font-bold text-slate-800 mb-2">12. Which types of drives cannot be erased using D-Secure Drive Eraser?</h3>
          <p className="text-slate-700">System drives are crucial drives that are used by operating systems to run your computer. So it is not possible to erase system drives.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">13. Is it possible to erase specific internet activities instead of clearing all of them?</h3>
          <p className="text-slate-700">Yes, you can choose specific items or internet activities from the list of browsers you want to erase. See <span className="text-brand-600 font-medium">Erase Internet Traces</span>, to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">14. What if I lose or misplace erasure reports on my system, what can I do?</h3>
          <p className="text-slate-700">The application provides functionality to send erasure reports to Cloud so it could be secured even when not in use. See <span className="text-brand-600 font-medium">Send Report to D-Secure Cloud</span> to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">15. Can I preview and save the erasure reports?</h3>
          <p className="text-slate-700">Yes, you can do it. Refer to <span className="text-brand-600 font-medium">Preview</span> and <span className="text-brand-600 font-medium">Save</span> section to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">16. Can I get the reports of the data I have deleted so far?</h3>
          <p className="text-slate-700">Yes, <strong>D-Secure File Eraser</strong> provides erasure reports. See <span className="text-brand-600 font-medium">Reports</span> for more details.</p>
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
          <h3 className="text-lg font-bold text-slate-800 mb-2">19. Is it possible for the software to automatically erase traces of any drives or folder?</h3>
          <p className="text-slate-700">Yes, <strong>D-Secure File Eraser</strong> provides an option to schedule eraser task to perform automatically at predefined period. Refer to <span className="text-brand-600 font-medium">Set Schedule Erasure for Files and Folders</span> section to schedule erasure task automatically.</p>
        </div>
      </div>
    )
  },
  {
    id: "about-D-Secure",
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
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("complete-D-Secure-manual")} />
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
      <Helmet>
        <title>Complete D-Secure Drive Manual</title>
        <meta name="description" content="Complete D-Secure Drive Eraser Network Manual" />
      </Helmet>

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
                D-Secure Drive Eraser
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
              <a href="mailto:support@D-Securetech.com" className="text-blue-600 font-medium hover:underline">
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
