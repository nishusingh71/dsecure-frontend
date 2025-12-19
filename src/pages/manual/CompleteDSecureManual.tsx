// CompleteDSecureManual.tsx - Restructured to match BitRaser reference
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown, ArrowLeft } from "lucide-react";

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
    title: "About DSecure File Eraser",
    content: (
      <>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>DSecure File Eraser</strong> is a complete solution to maintain your computer privacy by erasing unwanted information from the computer. Erased data is beyond recovery. <strong>DSecure File Eraser</strong> can be used to erase files/folders, Unused space, and System traces.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>DSecure File Eraser</strong> erases files & folders completely from the hard drive. You can select multiple files/folders at a time for erasure. Once files/folders from the drive are erased using <strong>DSecure File Eraser</strong> data can't be recovered back. The software allows you to generate and save the reports of the completed erasure process.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          In addition, it can erase unused space completely such that all the traces of previously stored data are completely removed. When you delete data from a hard drive, the data content is not deleted entirely, instead the space occupied by the data is marked as unused space and the new data is written on that unused space.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          <strong>DSecure File Eraser</strong> also erases all the system traces. Operating systems store records of all activities such as browsing Internet and opening documents constantly.
        </p>
        <p className="text-slate-700 leading-relaxed mb-6">
          <strong>DSecure File Eraser</strong> has a set of 20+ different erasure algorithms, that are accepted globally, to ensure permanent data deletion. You can choose any of the algorithms for erasure process. The software is menu driven, simple to use with an intuitive interface, and requires no prior technical skill.
        </p>

        <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Features:</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
          <li><strong>Operating System</strong>- Compatible with Windows 10/11, macOS 10.15+, and Linux distributions.</li>
          <li><strong>Erase Files and folders</strong>- Option to erase selected files or folders from the hard drive.</li>
          <li><strong>Erase Free Space</strong>- Option to erase the free space to secure privacy from the selected volumes.</li>
          <li><strong>Erase Traces of Internet Activity</strong>- Option to erase the internet traces created by web browsers.</li>
          <li><strong>Erase Traces of the System</strong>- Option to erase the system traces created by the operating system.</li>
          <li><strong>Erase Traces of Applications</strong>- Option to erase application traces created by the apps.</li>
          <li><strong>Setting Schedule Erasure</strong>- Supports schedule erasing tasks to run them automatically at specified periods.</li>
          <li><strong>Generate and Save Reports</strong>- Option to generate and save 100% secure and tamper-proof erasure reports in various formats such as PDF and XML.</li>
          <li><strong>Report Settings</strong>- Option to customise the reports before saving the report.</li>
          <li><strong>Search Report</strong>- Option to search reports by selecting the appropriate date range or erasure type.</li>
          <li><strong>Preview Report</strong>- Option to preview the report before saving.</li>
          <li><strong>Save Report to DSecure Cloud</strong>- Automatic report uploaded to DSecure Cloud Console.</li>
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
          This user guide contains steps to assist you in various functions of <strong>DSecure File Eraser</strong>. Each function is explained in detail, in the corresponding sections. This guide covers the following major topics:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-4 mb-6">
          <li><strong>About DSecure File Eraser</strong></li>
          <li><strong>About the Guide</strong></li>
          <li><strong>Getting Started</strong></li>
          <li><strong>Working with DSecure File Eraser</strong></li>
          <li><strong>Frequently Asked Questions (FAQs)</strong></li>
          <li><strong>About DSecure</strong></li>
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
        title: "Installation DSecure File Eraser",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              Follow these steps to install DSecure File Eraser on your system:
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong> Download the installer from the official DSecure website</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059276/rvv7ehruarp0c1zdnlk6.png" alt="Download Installer" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Run the installer with administrator privileges</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059276/gbzozkj3u5pahdxjksf4.png" alt="Run Installer" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> Follow the installation wizard and accept the license agreement</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059275/vx47uwocsxgn8wnpchad.png" alt="Installation Wizard" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> Choose installation directory</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059275/ddnqzolhtyoprz9lpkk9.png" alt="Choose Directory" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>5.</strong> Complete the installation</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059275/z2wztxdid87ixnqncozo.png" alt="Installation Complete" className="w-full mb-6" />
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
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059282/aduoilrklcuyyaacf5se.png" alt="Open Full Disk Access" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Full Disk Access window is displayed.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059282/noax4ddannafdtvuwlkj.png" alt="Full Disk Access Window" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> Enable the slider displayed against 'DSecure File Eraser' and enter the administrator password when prompted.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059282/w2kld6udlgqszkcryga1.png" alt="Enable DSecure" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> A dialog box appears on the screen with a message "DSecureFileEraser will not have full disk access until it is quit". Click Quit & Reopen.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059282/ivcdyxwxsdqxkdla40bd.png" alt="Quit and Reopen" className="w-full mb-6" />
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800 mt-10 mb-4">Steps to Assign Full Disk Access For MacOS:</h4>
            <p className="text-slate-600 text-sm mb-6 italic">Applicable for Macs having MacOS 12 Monterey, MacOS 11 Big Sur.</p>

            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong> Click Open Full Disk Access button.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059276/xiqyhzzdihhf3pmzlvgk.png" alt="Open Full Disk Access" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Security & Privacy window is displayed. Go to Privacy tab.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059276/qend1pis63mmtmtuofo7.png" alt="Privacy Tab" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> From the bottom, click lock icon and enter your administrator password.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059276/ymo3qpt4z1m7ieuljxln.png" alt="Unlock Settings" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> From the given options on the left pane, select Full Disk Access and mark DSecure File Eraser.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059276/jmhtcz6eafxfspti5lzd.png" alt="Select Full Disk Access" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>5.</strong> A dialog box appears on the screen with a message "DSecureFileEraser will not have full disk access until it is quit". Click Quit & Reopen.</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059276/turkkygcwgrmait2lr5f.png" alt="Quit and Reopen" className="w-full mb-6" />
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
                  The DSecure interface includes tabs for different erasure modes, buttons for actions like 'Erase Now', 'Add Items', and 'Settings'. Familiarize yourself with each element for efficient operation.
                </p>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059275/stillbeqoxuu7ngsqar1.png" alt="Main Interface" className="w-full" />
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059275/ksjcrxlpw4sxjbpaz64o.png" alt="Tabs and Buttons" className="w-full" />
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059275/jfutsiyxglz4awa475j0.png" alt="Action Buttons" className="w-full" />
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
              To know more about DSecure File Eraser, click <a href="https://www.dsecuretech.com" className="text-blue-600 hover:underline">here</a>.
            </p>
            <p className="text-slate-700 leading-relaxed mb-4">
              To purchase the software online, click <a href="https://www.dsecuretech.com/buy-now" className="text-blue-600 hover:underline">here</a>.
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
              Activate DSecure with your license key:
            </p>
            <ol className="list-decimal list-inside space-y-4 text-slate-700 ml-4">
              <li className="mb-4">
                <span className="font-medium">Click 'Activate' in the main menu</span>
                <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059231/opax1xjcv9ufa00wwpsa.png" alt="Activate Menu" className="w-full" />
                </div>
              </li>
              <li className="mb-4">
                <span className="font-medium">Enter your name and activation key</span>
                <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059231/hvy9vxzty0pbypv3vtgq.png" alt="Enter License Key" className="w-full" />
                </div>
              </li>
              <li className="mb-4">
                <span className="font-medium">Click 'Activate' button and restart the application</span>
                <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
                  <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059231/oys4yp5naiygfrbl8a7d.jpg" alt="Activation Success" className="w-full" />
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
            DSecure automatically checks for updates. You can also manually check via Settings → Check for Updates. Always keep your software updated for the latest features and security patches.
          </p>
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
            <p><strong>Support Hours:</strong> 24/7</p>
          </div>
        )
      }
    ]
  },
  {
    id: "working",
    number: "4",
    title: "Working with DSecure File Eraser",
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
                <p className="text-slate-700 mb-3"><strong>1.</strong> Select 'Erase Files & Folders' tab</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059275/txv1ijj5lipxradqx809.png" alt="Erase Files Tab" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Click 'Add Items' or drag and drop files</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059275/xkhyaeivbtg54dc5x3go.png" alt="Add Items" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> Review the list of items to erase and choose erasure algorithm</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059239/m0glocsqvrr7zuvtqp76.png" alt="Review Items" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> Click 'Erase Now' and confirm the action</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059239/t2ibtuvggdmjkodp0gnw.png" alt="Erase Now" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>5.</strong> Wait for completion and save the report</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059239/v9omf49sminhxn7ek4fm.png" alt="Completion" className="w-full mb-6" />
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
              Erasing free space removes traces of previously deleted files. Select the drive, choose an algorithm, and click 'Erase Now'. This process may take several hours depending on drive size.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong> Select 'Erase Free Space' tab</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059238/oqbbnytmarytng5exhhl.png" alt="Erase Free Space" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Select the drive you want to erase</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059238/zil0g6426zuonkn97yoq.png" alt="Select Drive" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> Monitor the erasure progress</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059238/asmkjud8bcr7xutrphip.png" alt="Erasure Progress" className="w-full mb-6" />
              </div>
            </div>
          </>
        )
      },
      {
        id: "erase-traces",
        number: "4.3",
        title: "Erase Traces of Applications, Internet Activity or System",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              Navigate to 'Erase Traces' tab, select trace categories (browser history, cookies, temporary files, system logs), click 'Search & Erase', review found items, and click 'Erase Now'.
            </p>
            <div className="space-y-6">
              <div>
                <p className="text-slate-700 mb-3"><strong>1.</strong> Select 'Erase Traces' tab</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059238/cqfoqpropniuzpymk42f.png" alt="Erase Traces Tab" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>2.</strong> Select trace categories to erase</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059237/bomp5hejfcx4iacsy31l.png" alt="Select Trace Categories" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>3.</strong> Click 'Search & Erase' to find traces</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059237/mky5zna058nxkepmiwf4.png" alt="Search and Erase" className="w-full mb-6" />
              </div>

              <div>
                <p className="text-slate-700 mb-3"><strong>4.</strong> Review found items and click 'Erase Now'</p>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059237/ncf3jpt0yo18knswz7zm.png" alt="Review Found Items" className="w-full mb-6" />
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
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059237/ernzlgwgfonljtkn20lo.png" alt="Schedule Erasure" className="w-full" />
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059237/lvugblvp4tmhj6hlybpk.png" alt="Set Schedule" className="w-full" />
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059236/vao1dfvjxafvepwj8zpj.png" alt="Schedule Settings" className="w-full" />
              </div>
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
                <p className="text-slate-700 leading-relaxed mb-4">
                  Select a report from the Reports tab and click 'Preview' to view summary information before saving or sending to cloud.
                </p>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059236/nkxd9o9263lpmnw2fvyo.png" alt="Preview Report" className="w-full" />
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059236/dqgccvh8bg93ljxa51pk.png" alt="Report Details" className="w-full" />
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
                <p className="text-slate-700 leading-relaxed mb-4">
                  Click 'Save Report', choose destination folder, select format (PDF or HTML), and click 'Save'. PDF reports include all annexure data and digital signatures.
                </p>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059236/nit1xmkkthzghpwfxf4c.png" alt="Save Report" className="w-full" />
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059236/n2xc1qwb2nqlurwt9r5z.png" alt="Choose Format" className="w-full" />
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059236/dgdmomjmnj3na1k8vrdh.png" alt="Save Location" className="w-full" />
                  </div>
                </div>
              </>
            )
          },
          {
            id: "cloud-report",
            number: "4.5.3",
            title: "Send Report to DSecure Cloud",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Ensure you're logged into DSecure Cloud Console, select reports, click 'Send to Cloud', and confirm upload. Reports will be synchronized for remote access.
                </p>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059235/bwisyrcqi57jwkzlmzlm.png" alt="Cloud Console" className="w-full" />
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059235/ne20ksdg0zgpe2ax5def.png" alt="Send to Cloud" className="w-full" />
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059234/yeychvhujlnmeaa3rsgt.png" alt="Upload Confirmation" className="w-full" />
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
                <p className="text-slate-700 leading-relaxed mb-4">
                  Customize reports with company logo, technician signatures, custom fields, and branding via Settings → Report Settings.
                </p>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059234/eo9iehbikyezlo5trrax.png" alt="Report Settings" className="w-full" />
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059234/pve2v2at3uyors5jn7c2.jpg" alt="Customize Report" className="w-full" />
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
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Switch between Light Mode, Dark Mode, or System Default via Settings → General Settings → Theme.
                    </p>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059234/n6wvwhquyojir5w2cq7e.png" alt="Theme Settings" className="w-full" />
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059234/drlzb9feotpv5pwv1p6y.png" alt="Light Mode" className="w-full" />
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059233/sz5m9zsblosadmkpdjqh.png" alt="Dark Mode" className="w-full" />
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
                    <p className="text-slate-700 leading-relaxed mb-4">
                      Choose default erasure algorithm, enable verification, and configure other erasure preferences.
                    </p>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059233/ktrwnbqivw83kmsvnzqa.png" alt="Erasure Options" className="w-full" />
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059233/c7p8hcetabwbqpwz5vam.png" alt="Algorithm Selection" className="w-full" />
                      </div>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059233/fqfzjzlem8syosh5sadp.png" alt="Verification Settings" className="w-full" />
                      </div>
                    </div>
                  </>
                )
              }
            ]
          },
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
        ]
      },
      {
        id: "cloud-login",
        number: "4.7",
        title: "Login to DSecure Cloud",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">
              Click 'Cloud Console' in the main menu, enter your credentials, and login to access cloud features for report management and synchronization.
            </p>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059232/me3npxvuwwyi8e7hbsxx.png" alt="Cloud Login" className="w-full" />
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059231/n1s17vy7fuaxtixfl6ii.jpg" alt="Enter Credentials" className="w-full" />
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1766059231/udowozxy6jlykctrvydd.jpg" alt="Cloud Dashboard" className="w-full" />
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
          <h3 className="text-lg font-bold text-slate-800 mb-2">1. What does the demo version of DSecure File Eraser do?</h3>
          <p className="text-slate-700">The demo version of the software only allows you to select and list traces of files, folders, web browsers, applications or systems files. To perform any erasure, you must purchase and register the software.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">2. Why do I need to use DSecure File Eraser?</h3>
          <p className="text-slate-700">When you delete a file from your system, the data is not actually erased. It is just marked as deleted and the space it was using is made available for other files to be stored. This means that the data can still be recovered by using data recovery software. <strong>DSecure File Eraser</strong> helps you to securely and permanently erase files, applications and internet traces from your system thereby ensuring your data privacy. Also, the <strong>'Erase Free Space'</strong> feature of the software completely erases data in the free space (free hard drive space) which leaves no possibility of data to be recovered.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">3. Does DSecure File Eraser remove data beyond recovery?</h3>
          <p className="text-slate-700">Yes, <strong>DSecure File Eraser</strong> removes data beyond recovery.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">4. Does erasure cause any harm to my hard drive?</h3>
          <p className="text-slate-700">Erasing data using <strong>DSecure File Eraser</strong> does not cause any harm to the hard drive.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">5. Can I erase a specific file using DSecure File Eraser?</h3>
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
          <h3 className="text-lg font-bold text-slate-800 mb-2">12. Which types of files cannot be erased using DSecure File Eraser?</h3>
          <p className="text-slate-700">System files are crucial files that are used by operating systems to run your computer. So it is not possible to erase system files.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">13. Is it possible to erase specific internet activities instead of clearing all of them?</h3>
          <p className="text-slate-700">Yes, you can choose specific items or internet activities from the list of browsers you want to erase. See <span className="text-brand-600 font-medium">Erase Internet Traces</span>, to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">14. What if I lose or misplace erasure reports on my system, what can I do?</h3>
          <p className="text-slate-700">The application provides functionality to send erasure reports to Cloud so it could be secured even when not in use. See <span className="text-brand-600 font-medium">Send Report to DSecure Cloud</span> to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">15. Can I preview and save the erasure reports?</h3>
          <p className="text-slate-700">Yes, you can do it. Refer to <span className="text-brand-600 font-medium">Preview</span> and <span className="text-brand-600 font-medium">Save</span> section to know more.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">16. Can I get the reports of the data I have deleted so far?</h3>
          <p className="text-slate-700">Yes, <strong>DSecure File Eraser</strong> provides erasure reports. See <span className="text-brand-600 font-medium">Reports</span> for more details.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">17. Can I use DSecure File Eraser to erase the free space on the primary partition of my hard drive?</h3>
          <p className="text-slate-700">Yes, it is secure to use <strong>DSecure File Eraser</strong> to erase data in the <span className="text-brand-600 font-medium">free space</span> of the hard drive's primary partition as it removes the free space left after deletion of files and folders.</p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">18. What is the process for scheduling an erase traces task for a specific browser?</h3>
          <p className="text-slate-700 mb-2">To schedule an erasure task for a specific browser, you need to configure the default settings for that browser in the <strong>DSecure File Eraser</strong> settings. After that, you can schedule the erasure task using the schedule erasure tab for the desired duration.</p>
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
          <p className="text-slate-700">Yes, <strong>DSecure File Eraser</strong> provides an option to schedule eraser task to perform automatically at predefined period. Refer to <span className="text-brand-600 font-medium">Set Schedule Erasure for Files and Folders</span> section to schedule erasure task automatically.</p>
        </div>
      </div>
    )
  },
  {
    id: "about-dsecure",
    number: "6",
    title: "About DSecure",
    content: (
      <p className="text-slate-700 leading-relaxed">
        DSecure is a leading provider of data sanitization and security solutions. Our mission is to provide robust, reliable, and user-friendly data erasure solutions that empower organizations to manage their data lifecycle securely and meet stringent regulatory requirements with confidence.
      </p>
    )
  }
];

/* ===========================
   Tree Navigation Component
   =========================== */
interface TreeNavItemProps {
  item: NavItem;
  activeId: string;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
  level?: number;
}

const TreeNavItem: React.FC<TreeNavItemProps> = ({
  item,
  activeId,
  expandedIds,
  onToggle,
  onSelect,
  level = 0
}) => {
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedIds.has(item.id);
  const isActive = activeId === item.id;

  return (
    <div>
      <div
        className={`flex items-center py-1.5 px-2 cursor-pointer hover:text-teal-600 transition-colors ${isActive ? "text-teal-600 font-semibold" : "text-slate-700"
          }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          if (hasChildren) {
            onToggle(item.id);
          }
          onSelect(item.id);
        }}
      >
        {hasChildren && (
          <span className="mr-1 flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </span>
        )}
        {!hasChildren && <span className="w-4 mr-1" />}
        <span className="text-sm hover:underline">
          {item.number}. {item.title}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {item.children!.map((child) => (
            <TreeNavItem
              key={child.id}
              item={child}
              activeId={activeId}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ===========================
   Main Component
   =========================== */
const CompleteDSecureManual: React.FC = () => {
  const [activeId, setActiveId] = useState("about");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(["getting-started", "working"]));

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const findItemById = (items: NavItem[], id: string): NavItem | null => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeItem = findItemById(navigationTree, activeId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>DSecure File Eraser - Complete Manual</title>
        <meta name="description" content="Complete user manual and documentation for DSecure File Eraser" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/support" className="inline-flex items-center p-2 rounded-full text-slate-500 hover:text-teal-600 hover:bg-slate-100 transition-all">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold text-slate-900">
                Complete Manual
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg flex min-h-[600px]">
          {/* Sidebar */}
          <div className="w-80 bg-white p-4 overflow-y-auto">
            <nav>
              {navigationTree.map((item) => (
                <TreeNavItem
                  key={item.id}
                  item={item}
                  activeId={activeId}
                  expandedIds={expandedIds}
                  onToggle={toggleExpand}
                  onSelect={setActiveId}
                />
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {activeItem && (
              <>
                {/* Breadcrumb */}
                <div className="text-sm text-slate-500 mb-4">
                  <span className="hover:text-teal-600 cursor-pointer">DSecure File Eraser</span>
                  <span className="mx-2">/</span>
                  <span className="text-slate-700">{activeItem.number}. {activeItem.title}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-slate-900 mb-6">
                  {activeItem.number}. {activeItem.title}
                </h1>

                {/* Content */}
                <div className="prose prose-slate max-w-none">
                  {activeItem.content || (
                    activeItem.children ? (
                      <div className="mt-2 space-y-4 pl-1">
                        {activeItem.children.map(child => (
                          <div key={child.id} className="cursor-pointer" onClick={() => {
                            if (child.children) toggleExpand(child.id);
                            setActiveId(child.id);
                          }}>
                            <span className="text-teal-600 hover:underline text-lg font-medium block mb-1">
                              {child.number}. {child.title}
                            </span>
                            {child.children && (
                              <div className="ml-8 mt-2 space-y-2">
                                {child.children.map(subChild => (
                                  <div key={subChild.id} className="text-slate-600 hover:text-teal-600 text-base cursor-pointer" onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveId(subChild.id);
                                  }}>
                                    {subChild.number}. {subChild.title}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-700">
                        Select a subsection from the navigation to view its content.
                      </p>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteDSecureManual;
