import React, { useState, useEffect, useRef } from "react";
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import { ChevronRight, ArrowUp, Download } from "lucide-react";

interface NavItem {
  id: string;
  title: string;
  content?: React.ReactNode;
  children?: NavItem[];
}

const IMG = ({ src, alt }: { src: string; alt: string }) => (
  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
    <img src={src} alt={alt} className="w-full" style={{ borderRadius: "3%" }} />
  </div>
);

const navigationTree: NavItem[] = [
  {
    id: "about",
    title: "About D-Secure Drive Eraser",
    content: (
      <>
        <p className="text-slate-700 leading-relaxed mb-4"><strong>D-Secure Drive Eraser</strong> is a boot-based, enterprise-grade drive sanitization solution designed to permanently and irreversibly erase all data from storage devices including HDDs, SSDs, NVMe drives, and USB storage. The software boots from a USB or PXE environment, operating independently of the host operating system to ensure complete and certified data destruction.</p>
        <p className="text-slate-700 leading-relaxed mb-4">D-Secure Drive Eraser supports <strong>20+ internationally recognized erasure standards</strong> including NIST SP 800-88 Rev1, DoD 5220.22-M (3-pass and 7-pass), and custom overwrite methods. Each erasure operation generates a tamper-proof compliance certificate that can be uploaded to the D-Secure Cloud Console for centralized reporting and audit trail management.</p>
        <p className="text-slate-700 leading-relaxed mb-6">The software features an intuitive graphical interface with a step-by-step wizard that guides users through drive detection, wipe configuration, destructive confirmation, wipe progress monitoring, and completion verification. It requires no prior technical expertise and is suitable for IT administrators, ITAD companies, data centers, and compliance teams.</p>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Features:</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4">
          <li><strong>Boot-Based Operation</strong> — Boots from USB or PXE, independent of host OS for maximum security.</li>
          <li><strong>Automatic Hardware Detection</strong> — Scans SATA, NVMe, and USB controllers to detect all connected storage devices.</li>
          <li><strong>20+ Erasure Standards</strong> — Supports NIST SP 800-88, DoD 5220.22-M, and custom overwrite patterns.</li>
          <li><strong>Multiple Verification Levels</strong> — Full verification, sample verification (10%), or no verification options.</li>
          <li><strong>Enterprise Dashboard</strong> — View license status, network connection, recent activity, and statistics at a glance.</li>
          <li><strong>Wi-Fi & LAN Connectivity</strong> — Connect via Wi-Fi networks or LAN/Ethernet for cloud license validation and report upload.</li>
          <li><strong>Offline Mode</strong> — Operate in air-gapped environments with offline activation and local report storage.</li>
          <li><strong>Compliance Reports</strong> — Generate tamper-proof erasure certificates with drive details, method used, and verification status.</li>
          <li><strong>Cloud Integration</strong> — Automatic report upload to D-Secure Cloud Console for centralized management.</li>
          <li><strong>Multi-Theme Support</strong> — Switch between Light, Dark, D-Secure Green, and D-Secure Light themes.</li>
        </ul>
      </>
    ),
  },
  {
    id: "guide",
    title: "About the Guide",
    content: (
      <>
        <p className="text-slate-700 leading-relaxed mb-6">This user guide provides comprehensive step-by-step instructions for every feature and function of <strong>D-Secure Drive Eraser</strong>. Each section includes detailed explanations accompanied by actual screenshots from the application.</p>
        <ol className="list-decimal list-inside space-y-2 text-slate-700 ml-4 mb-6">
          <li><strong>About D-Secure Drive Eraser</strong></li>
          <li><strong>About the Guide</strong></li>
          <li><strong>Getting Started</strong> — Boot process, system summary, hardware detection, network setup, and authentication</li>
          <li><strong>Working with D-Secure Drive Eraser</strong> — Dashboard, drive erasure wizard (5-step process), reports, and settings</li>
          <li><strong>Help & Support</strong></li>
          <li><strong>About D-Secure</strong></li>
        </ol>
        <p className="text-slate-700 leading-relaxed">This is a web-based guide and requires an active internet connection. You can read this guide with all popular browsers like Chrome, Firefox, and Safari. For better viewing experience, it is recommended to use the <strong>Chrome</strong> browser.</p>
      </>
    ),
  },
  {
    id: "getting-started",
    title: "Getting Started",
    children: [
      {
        id: "welcome-screen",
        title: "Welcome Screen & System Summary",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">When the system boots using D-Secure Drive Eraser (via USB or PXE), the <strong>Welcome Screen</strong> is displayed. This screen provides an overview of your system hardware and serves as the starting point for the drive sanitization process.</p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
              <li><strong>Product Name & Version</strong> — D-Secure Drive Eraser, Boot Edition 1.0.0vbeta</li>
              <li><strong>Boot Mode</strong> — UEFI or Legacy BIOS</li>
              <li><strong>Memory</strong> — Total system RAM (e.g., 16 GB DDR4)</li>
              <li><strong>CPU</strong> — Processor model (e.g., Intel Core i7-9700)</li>
              <li><strong>Network Status</strong> — Current network connection status</li>
              <li><strong>License Status</strong> — Connection and offline mode availability</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">Click the <strong>"Start Drive Sanitization"</strong> button to begin the erasure process.</p>
            <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773305257/a4sgxgi17mpdrzdfb7ut.png" alt="D-Secure Drive Eraser Welcome Screen with System Summary" />
          </>
        ),
      },
      {
        id: "hardware-detection",
        title: "Detecting Hardware",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">After clicking <strong>"Start Drive Sanitization"</strong>, the application begins an automatic hardware detection process. The system scans all connected storage buses and devices.</p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
              <li><strong>SATA Controller Initialization</strong> — Scans for SATA-connected hard drives and SSDs</li>
              <li><strong>NVMe Controller Initialization</strong> — Detects NVMe solid-state drives connected via M.2 or PCIe</li>
              <li><strong>USB Storage Scanning</strong> — Identifies USB-connected external drives</li>
              <li><strong>Drive Enumeration</strong> — Lists all detected storage devices with model, serial, and capacity information</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">A loading spinner with status messages is displayed during this process. The status bar at the bottom shows <strong>"Initializing"</strong> while detection is in progress.</p>
            <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773305313/gaa6fv88jzmpgyyq96wg.png" alt="Detecting Hardware" />
          </>
        ),
      },
      {
        id: "network-connection",
        title: "Network Connection Setup",
        children: [
          {
            id: "wifi-connection",
            title: "Connecting via Wi-Fi",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">After hardware detection, a <strong>Network Connection</strong> dialog appears prompting you to connect to the internet for license validation. The Wi-Fi tab displays all available wireless networks.</p>
                <p className="text-slate-700 leading-relaxed mb-4">Each network entry shows the <strong>network name (SSID)</strong>, <strong>signal strength</strong>, <strong>security status</strong>, and <strong>frequency band</strong> (2.4 GHz or 5 GHz). Click on a network to connect.</p>
                <p className="text-slate-700 leading-relaxed mb-4">You can also click <strong>"Skip"</strong> to proceed without a network connection and use offline mode instead.</p>
                <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773305166/ycdyjanbhcaxulah3unl.png" alt="Network Connection - Wi-Fi Networks" />
              </>
            ),
          },
          {
            id: "lan-connection",
            title: "Connecting via LAN / Ethernet",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">Switch to the <strong>"LAN / Ethernet"</strong> tab for wired connections. This option is ideal for enterprise environments where wired connections are more reliable.</p>
                <p className="text-slate-700 leading-relaxed mb-4">If no Ethernet cable is detected, click <strong>"Detect LAN Connection"</strong> after plugging in the cable. The system will automatically configure the network using DHCP.</p>
                <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773305219/zrkffe7ylntxde56budn.png" alt="Network Connection - LAN / Ethernet" />
              </>
            ),
          },
        ],
      },
      {
        id: "authentication",
        title: "Authentication & Login",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">After the network setup, the <strong>Authentication Required</strong> screen is displayed. Enter your <strong>Email Address</strong> and <strong>Password</strong> and click <strong>"Login"</strong> to authenticate.</p>
            <p className="text-slate-700 leading-relaxed mb-4">If you are in an air-gapped environment, click <strong>"Continue in Offline Mode"</strong> to proceed with offline activation.</p>
            <p className="text-slate-600 text-sm italic">Note: The top-right corner shows the connection status and quick-access icons for Wi-Fi and LAN settings.</p>
          </>
        ),
      },
      {
        id: "offline-activation",
        title: "Offline Activation",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">The <strong>Offline Activation</strong> screen allows you to activate your license without internet. This is essential for air-gapped or secure environments.</p>
            <div className="space-y-4 mb-4">
              <p className="text-slate-700"><strong>Step 1 — Your Machine Code:</strong> A unique machine code is generated based on your hardware. Copy this code and send it to <strong>support@dsecuretech.com</strong> to receive your activation response code.</p>
              <p className="text-slate-700"><strong>Step 2 — Enter Activation Code:</strong> Enter the received activation code and click <strong>"Verify & Activate"</strong> to complete the activation.</p>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">Click <strong>"Back to Login"</strong> to return to the login screen, or use <strong>"Continue in Offline Mode"</strong> to proceed with limited functionality.</p>
            <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1772417779/e7sdh1mazppjy3ikjrrz.png" alt="Offline Activation" />
          </>
        ),
      },
    ],
  },
  {
    id: "working",
    title: "Working with D-Secure Drive Eraser",
    children: [
      {
        id: "dashboard",
        title: "Dashboard Overview",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">After authentication, the <strong>Dashboard</strong> serves as the main control center, providing a comprehensive overview of system status, license info, and recent activity.</p>
            <h4 className="text-base font-semibold text-slate-800 mb-3">Dashboard Components:</h4>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
              <li><strong>Header Bar</strong> — Product name, power/restart icons, user email, remaining wipes, connection status</li>
              <li><strong>Left Sidebar</strong> — Quick links to Dashboard, Drive Erase, Reports, Settings, About, and Help</li>
              <li><strong>Network Connection Card</strong> — Wi-Fi and LAN connection status</li>
              <li><strong>License Status Card</strong> — Remaining wipes (e.g., 47/100) with progress bar</li>
              <li><strong>Last Activity Card</strong> — Most recent erasure activity</li>
              <li><strong>Statistics Card</strong> — Cumulative erasure statistics</li>
              <li><strong>Action Buttons</strong> — "Start New Drive Erasure" and "View Reports"</li>
            </ul>
            <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773300694/whegkqyd3tp2cg7neowp.png" alt="Dashboard Overview" />
            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-3">Recently Wiped Drives:</h4>
            <p className="text-slate-700 leading-relaxed mb-4">Below the main cards, the <strong>Recently Wiped Drives</strong> section shows history of sanitized drives.</p>
            <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1772417779/lpnzpozpc3dnlyjmqmfc.png" alt="Recently Wiped Drives" />
          </>
        ),
      },
      {
        id: "drive-erase",
        title: "Drive Erasure Process (5-Step Wizard)",
        children: [
          {
            id: "step1-drive-detection",
            title: "Step 1: Drive Detection",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">Click <strong>"Start New Drive Erasure"</strong> to begin. Step 1 displays all detected storage devices:</p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                  <li><strong>Drive Model</strong> — e.g., Samsung 970 EVO Plus, WD Blue 3D NAND</li>
                  <li><strong>Serial Number</strong> — Unique identifier for each drive</li>
                  <li><strong>Capacity</strong> — e.g., 1 TB, 512 GB</li>
                  <li><strong>Interface Type</strong> — NVMe, SATA 6Gb/s, or USB 3.0</li>
                  <li><strong>System Drive Warning</strong> — Drives marked "SYSTEM" contain the boot environment</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mb-4">Select a drive (highlighted with green border) and click <strong>"Continue with Selected Drive"</strong>.</p>
                <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773303765/usmphwsihzdg4s5y2637.png" alt="Step 1: Drive Detection" />
              </>
            ),
          },
          {
            id: "step2-wipe-config",
            title: "Step 2: Wipe Configuration",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">Configure the sanitization method and verification options for the selected drive.</p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                  <li><strong>Selected Drive Summary</strong> — Model, Serial, Capacity, and Interface</li>
                  <li><strong>Erasure Method</strong> — NIST SP 800-88, DoD 5220.22-M (3-pass/7-pass), Custom</li>
                  <li><strong>Verification Level</strong> — Full, Sample (10%), or None</li>
                  <li><strong>Estimated Time</strong> — Approximate time for the selected method</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mb-4">An <strong>"Irreversible Operation"</strong> warning reminds you that all data will be permanently destroyed. Click <strong>"Proceed to Confirmation"</strong> to continue.</p>
                <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773303839/svli2uykco9hme2sk0oh.png" alt="Step 2: Wipe Configuration" />
                <h4 className="text-base font-semibold text-slate-800 mt-8 mb-3">With Method Selected:</h4>
                <p className="text-slate-700 leading-relaxed mb-4">Once you select an erasure method and verification level, the configuration summary updates with estimated completion time.</p>
                <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773303839/svli2uykco9hme2sk0oh.png" alt="Wipe Configuration with Method Selected" />
              </>
            ),
          },
          {
            id: "step3-confirmation",
            title: "Step 3: Destructive Confirmation",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4"><strong>Step 3</strong> is the final safety checkpoint with a prominent <strong>DESTRUCTIVE OPERATION</strong> warning.</p>
                <h4 className="text-base font-semibold text-slate-800 mb-3">Confirmation Details:</h4>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                  <li><strong>Drive</strong> — Selected drive model</li>
                  <li><strong>Serial</strong> — Drive serial number</li>
                  <li><strong>Capacity</strong> — Total drive capacity</li>
                  <li><strong>Method</strong> — Selected erasure standard</li>
                  <li><strong>Verification</strong> — Selected verification level</li>
                </ul>
                <h4 className="text-base font-semibold text-slate-800 mb-3">Critical Warnings:</h4>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                  <li>All data will be permanently destroyed</li>
                  <li>This operation cannot be cancelled once started</li>
                  <li>Data recovery will be impossible after completion</li>
                  <li>Interrupting power during wipe may damage the drive</li>
                </ul>
                <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773303719/vlshsgzlgnsfu1drxhvh.png" alt="Step 3: Destructive Confirmation" />
              </>
            ),
          },
        ],
      },
      {
        id: "reports",
        title: "Reports & Compliance Certificates",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">The <strong>Reports</strong> section provides a centralized view of all erasure compliance certificates and records.</p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
              <li><strong>Total Reports Counter</strong> — Total number of reports generated</li>
              <li><strong>Search Bar</strong> — Filter by Report ID, Drive Serial, or Model</li>
              <li><strong>Status Filter</strong> — All Statuses, Completed, Failed, In Progress</li>
              <li><strong>Reports Table</strong> — Report ID, Drive Serial, Method, Date, Status, Action</li>
            </ul>
            <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773300653/vkuknf56igiivxb98byw.png" alt="Reports & Compliance Certificates" />
          </>
        ),
      },
      {
        id: "settings",
        title: "Settings & Configuration",
        children: [
          {
            id: "general-settings",
            title: "General Settings",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">The <strong>Settings</strong> page is organized into three tabs: <strong>General</strong>, <strong>Account</strong>, and <strong>Network</strong>.</p>
                <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
                  <li><strong>Language</strong> — Select display language</li>
                  <li><strong>Appearance / Theme</strong> — Light, Dark (Default Boot), D-Secure Green, D-Secure Light</li>
                  <li><strong>Defaults</strong> — Default Wipe Method and Verification Level</li>
                </ul>
                <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773304110/zzakl8rvddzadkkpevga.png" alt="Settings - General" />
                <h4 className="text-base font-semibold text-slate-800 mt-8 mb-3">Default Wipe Method & Verification:</h4>
                <p className="text-slate-700 leading-relaxed mb-4">Scroll down to set defaults that will be pre-selected for every new erasure session.</p>
                <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773304110/zzakl8rvddzadkkpevga.png" alt="Settings - Default Wipe Method" />
              </>
            ),
          },
          {
            id: "account-settings",
            title: "Account Settings",
            content: (
              <>
                <p className="text-slate-700 leading-relaxed mb-4">The <strong>Account</strong> tab allows you to manage your user profile and license information.</p>
                <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773304035/ctjtcp2leqj5c2rarmei.png" alt="Settings - Account" />
              </>
            ),
          },
        ],
      },
      {
        id: "about-page",
        title: "About — Product & System Information",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">The <strong>About</strong> page provides detailed product and system hardware information.</p>
            <h4 className="text-base font-semibold text-slate-800 mb-3">Product Information:</h4>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
              <li><strong>Product</strong> — D-Secure Drive Eraser</li>
              <li><strong>Edition</strong> — Boot Edition</li>
              <li><strong>Version</strong> — 1.0.0vbeta</li>
              <li><strong>License Type</strong> — Drive Eraser</li>
            </ul>
            <h4 className="text-base font-semibold text-slate-800 mb-3">System Hardware:</h4>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
              <li><strong>CPU</strong> — Intel Core i7-9700 @ 3.00GHz</li>
              <li><strong>Memory</strong> — 16 GB DDR4</li>
              <li><strong>Firmware Mode</strong> — UEFI</li>
            </ul>
            <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773300598/lye0zxxqut8o870mh98l.png" alt="About Page" />
          </>
        ),
      },
      {
        id: "help-page",
        title: "Help — User Manual & Documentation",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-4">The <strong>Help</strong> page serves as a built-in documentation center with a search bar and expandable topic sections.</p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 ml-4 mb-4">
              <li><strong>Getting Started</strong> — Boot environment, hardware detection, login</li>
              <li><strong>Drive Erasure Process</strong> — Step-by-step guide</li>
              <li><strong>Compliance & Certification</strong> — Standards and certificates</li>
              <li><strong>Reports & Certificates</strong> — Managing reports</li>
              <li><strong>Configuration & Settings</strong> — Customizing preferences</li>
              <li><strong>Troubleshooting</strong> — Common issues</li>
            </ul>
            <p className="text-slate-700 leading-relaxed mb-4">For additional help: <strong>support@dsecure.io</strong> and <strong>docs.dsecure.io</strong>.</p>
            <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773303943/cvfupwsy8iejwrxi5jzj.png" alt="Help Page - Top" />
            <h4 className="text-base font-semibold text-slate-800 mt-8 mb-3">Help Topics (Continued):</h4>
            <IMG src="https://res.cloudinary.com/dhwi5wevf/image/upload/v1773303980/gemjfmgk3cw7wnvgh2z6.png" alt="Help Page - Bottom" />
          </>
        ),
      },
    ],
  },
  {
    id: "contact",
    title: "Contact & Support",
    content: (
      <div className="text-slate-700 leading-relaxed">
        <p className="mb-2"><strong>Email:</strong> support@dsecuretech.com</p>
        <p className="mb-2"><strong>Website:</strong> www.dsecuretech.com</p>
        <p className="mb-2"><strong>Documentation:</strong> docs.dsecure.io</p>
        <p><strong>Support Hours:</strong> 24/7 Business Hours</p>
      </div>
    ),
  },
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

const SidebarItem: React.FC<{ item: NavItem; activeSection: string; onJump: (id: string) => void; level?: number }> = ({ item, activeSection, onJump, level = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeSection === item.id;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="text-sm">
      <div className={`flex items-center gap-2 py-1.5 px-3 rounded-md transition-colors cursor-pointer ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"}`}
        style={{ paddingLeft: `${(level * 12) + 12}px` }}
        onClick={(e) => { e.stopPropagation(); onJump(`#${item.id}`); if (hasChildren) setIsExpanded(!isExpanded); }}
      >
        {hasChildren && (
          <span onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }} className="p-0.5 hover:bg-gray-200 rounded">
            {isExpanded ? <ChevronRight className="w-3.5 h-3.5 rotate-90 transition-transform" /> : <ChevronRight className="w-3.5 h-3.5 transition-transform" />}
          </span>
        )}
        {!hasChildren && <span className="w-3.5" />}
        <a href={`#${item.id}`} onClick={(e) => e.preventDefault()} className="flex-1 break-words">{item.title}</a>
      </div>
      {hasChildren && isExpanded && (
        <div className="mt-1 border-l border-gray-200 ml-6">
          {item.children!.map(child => (<SidebarItem key={child.id} item={child} activeSection={activeSection} onJump={onJump} level={level + 1} />))}
        </div>
      )}
    </div>
  );
};

const ContentSection: React.FC<{ item: NavItem; level?: number }> = ({ item, level = 0 }) => (
  <section className="scroll-mt-24 mb-12">
    <Anchor id={item.id} />
    <div className={`mb-6 ${level === 0 ? 'pb-4 border-b-2 border-gray-200' : ''}`}>
      <div className="flex items-center gap-3">
        <h2 className={`${level === 0 ? 'text-3xl font-bold text-gray-900' : level === 1 ? 'text-2xl font-semibold text-gray-800 mt-8' : 'text-xl font-medium text-gray-800 mt-6'}`}>
          {item.title}
        </h2>
      </div>
    </div>
    {item.content && (
      <div className="text-gray-700 text-base leading-relaxed space-y-4 prose prose-blue max-w-none">{item.content}</div>
    )}
    {item.children && (
      <div className="space-y-8 mt-6">
        {item.children.map(child => (<ContentSection key={child.id} item={child} level={level + 1} />))}
      </div>
    )}
  </section>
);

/* ===========================
   Main Component
   =========================== */
const CompleteDSecureDriveManual: React.FC = () => {
  useScrollToHash();
  const [activeSection, setActiveSection] = useState("");
  const [shouldShowScrollTop, setShouldShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShouldShowScrollTop(window.scrollY > 400);
      const headingElements = document.querySelectorAll('[id]');
      let currentSection = "";
      headingElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) currentSection = el.id;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onJump = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); setActiveSection(hash.replace('#', '')); }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleDownloadPDF = () => window.print();

  const handleDownloadEditable = () => {
    const content = contentRef.current;
    if (!content) { alert('Content not found!'); return; }
    const clone = content.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('button, .pdf-hide-btn, aside, nav, thead, tfoot, .print-watermark').forEach(el => el.remove());
    const images = clone.querySelectorAll('img');
    images.forEach(img => { img.style.maxWidth = '100%'; img.style.height = 'auto'; if (img.src.startsWith('/')) img.src = window.location.origin + img.src; });
    const watermarkUrl = window.location.origin + '/company-logo.png';
    const htmlContent = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset="utf-8"><title>D-Secure Drive Eraser - User Manual</title><!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom><w:DoNotOptimizeForBrowser/></w:WordDocument></xml><![endif]--><style>body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;font-size:12pt;line-height:1.6;color:#1a1a1a;padding:20px 40px}h1{font-size:24pt;font-weight:bold;color:#111827;margin-top:30px;margin-bottom:12px}h2{font-size:18pt;font-weight:bold;color:#1f2937;margin-top:24px;margin-bottom:10px}h3{font-size:14pt;font-weight:bold;color:#374151;margin-top:18px;margin-bottom:8px}h4,h5,h6{font-size:12pt;font-weight:bold;color:#4b5563;margin-top:14px;margin-bottom:6px}p{margin:6px 0}ul,ol{margin:8px 0;padding-left:24px}li{margin:4px 0}img{max-width:100%;height:auto;display:block;margin:10px auto}a{color:#2563eb}.watermark{position:fixed;top:10px;right:10px;width:60px;height:60px;opacity:0.08;z-index:-1}@page{size:A4;margin:20mm 15mm}</style></head><body><img src="${watermarkUrl}" class="watermark" alt="" />${clone.innerHTML}</body></html>`;
    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'D-Secure_Drive_Eraser_User_Manual.doc'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead seo={getSEOForPage("complete-dsecure-manual")} />
      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 6px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        html { scroll-behavior: smooth; }
        @media print {
          @page { margin: 0; }
          header, footer, aside, nav, .pdf-hide-btn, button, [class*="fixed"], [class*="sticky"], .min-h-dvh > footer { display: none !important; }
          html, body { background: white !important; margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
          .min-h-screen, .min-h-dvh { min-height: auto !important; background: white !important; }
          .container { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .flex.gap-8 { display: block !important; }
          .flex-1 { flex: none !important; }
          main { width: 100% !important; max-width: 100% !important; box-shadow: none !important; border: none !important; border-radius: 0 !important; margin: 0 !important; padding: 0 12mm 0 12mm !important; overflow: hidden !important; box-sizing: border-box !important; }
          main *, main *::before, main *::after { box-sizing: border-box !important; max-width: 100% !important; }
          main p, main li, main span, main div, main td, main th { overflow-wrap: break-word !important; word-break: break-word !important; }
          .space-y-16 > * + * { margin-top: 1rem !important; }
          .space-y-8 > * + * { margin-top: 0.5rem !important; }
          .space-y-6 > * + * { margin-top: 0.4rem !important; }
          .space-y-4 > * + * { margin-top: 0.3rem !important; }
          .space-y-2 > * + * { margin-top: 0.15rem !important; }
          .mb-12 { margin-bottom: 0.75rem !important; }
          .mb-8 { margin-bottom: 0.5rem !important; }
          .mb-6 { margin-bottom: 0.4rem !important; }
          .mb-4 { margin-bottom: 0.3rem !important; }
          .mt-20 { margin-top: 0.75rem !important; }
          .mt-10, .mt-8 { margin-top: 0.5rem !important; }
          .pb-8 { padding-bottom: 0.5rem !important; }
          .pt-8 { padding-top: 0.5rem !important; }
          .py-8 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
          .p-8 { padding: 0.5rem !important; }
          .p-12 { padding: 0.75rem !important; }
          .gap-8 { gap: 0.5rem !important; }
          .leading-relaxed { line-height: 1.5 !important; }
          h1 { margin-top: 40px !important; margin-bottom: 12px !important; page-break-after: avoid !important; }
          h2 { margin-top: 32px !important; margin-bottom: 10px !important; page-break-after: avoid !important; }
          h3 { margin-top: 24px !important; margin-bottom: 8px !important; page-break-after: avoid !important; }
          h4, h5, h6 { margin-top: 16px !important; margin-bottom: 6px !important; page-break-after: avoid !important; }
          img { display: block !important; max-width: 85% !important; width: auto !important; height: auto !important; margin: 10px auto !important; page-break-inside: avoid !important; object-fit: contain !important; }
          section { page-break-inside: auto !important; }
          table, figure { page-break-inside: avoid !important; }
          .print-header-logo { display: block !important; position: fixed !important; top: 5mm !important; left: 10mm !important; width: 140px !important; height: auto !important; max-width: 140px !important; opacity: 1 !important; z-index: 10 !important; pointer-events: none !important; margin: 0 !important; background: white !important; padding: 2px 6px !important; }
          .print-center-watermark { display: block !important; position: fixed !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 400px !important; height: auto !important; max-width: 400px !important; opacity: 0.08 !important; z-index: 0 !important; pointer-events: none !important; margin: 0 !important; }
          .print-product-logo { display: block !important; margin: 0 !important; max-width: 160px !important; }
        }
      `}</style>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block lg:w-72 shrink-0">
            <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto sidebar-scroll pr-2">
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Table of Contents</h3>
                <nav className="space-y-1">
                  {navigationTree.map((item) => (
                    <SidebarItem key={item.id} item={item} activeSection={activeSection} onJump={onJump} />
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <main ref={contentRef} className="flex-1 min-w-0 bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12">
            <img src="/company-logo.png" alt="" className="print-header-logo hidden" />
            <img src="/company-logo.png" alt="" className="print-center-watermark hidden" />

            <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
              <thead className="hidden print:table-header-group">
                <tr><td className="p-0 border-none"><div style={{ height: '96px' }} /></td></tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-0 border-none align-top w-full">
                    <div className="mb-12 pb-8 border-b border-gray-200">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">D-Secure Drive Eraser</h1>
                          <p className="text-xl text-gray-500">Complete User Guide & Documentation</p>
                        </div>
                        <img src="/product-logo.png" alt="D-Secure Drive Eraser" className="hidden print-product-logo shrink-0 w-40 h-auto rounded-2xl shadow-lg" />
                      </div>
                    </div>

                    <div className="space-y-16">
                      {navigationTree.map(item => (<ContentSection key={item.id} item={item} />))}
                    </div>

                    {/* <footer className="mt-20 pt-8 border-t border-gray-200 text-center">
                      <p className="text-gray-500 mb-2">Need further assistance?</p>
                      <a href="mailto:support@dsecuretech.com" className="text-blue-600 font-medium hover:underline">Contact Support</a>
                      <p className="text-sm text-gray-400 mt-8">© {new Date().getFullYear()} D-SecureTech. All rights reserved.</p>
                      <div className="mt-10 pdf-hide-btn flex items-center justify-center gap-4 flex-wrap">
                        <button onClick={handleDownloadPDF} className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200">
                          <Download className="w-5 h-5" />Download PDF
                        </button>
                        <button onClick={handleDownloadEditable} className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-200">
                          <Download className="w-5 h-5" />Download Doc
                        </button>
                      </div>
                    </footer> */}
                  </td>
                </tr>
              </tbody>
              <tfoot className="hidden print:table-footer-group">
                <tr><td className="p-0 border-none"><div style={{ height: '17px' }} /></td></tr>
              </tfoot>
            </table>
          </main>
        </div>
      </div>

      {/* <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 pdf-hide-btn">
        <button onClick={handleDownloadEditable} className="bg-green-600 text-white font-semibold px-4 py-3 rounded-l-xl shadow-xl hover:bg-green-700 hover:-translate-x-1 transition-all flex items-center gap-2 group">
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Download Doc</span>
        </button>
      </div> */}

      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 z-50 ${shouldShowScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default CompleteDSecureDriveManual;
