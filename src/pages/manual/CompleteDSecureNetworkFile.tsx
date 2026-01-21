// src/pages/CompleteDSecureManual.tsx
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import React, { useMemo, useRef, useState, useEffect } from "react";
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
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

/**
 * ONE-PAGE COMPLETE DSECURE MANUAL
 * - Light mode UI
 * - Left: filterable navigation tree
 * - Right: content pane with anchors
 * - Sections & subsections mapped from all content you shared
 * - Clean, print-friendly blocks
 *
 * NOTE: All wording normalized to "D-Secure File Eraser Network".
 * If you must keep "BitRaser" strings, we can toggle a flag and swap labels.
 */

// ---------- Types ----------
type Para = { type: "p"; text: string };
type Step = { type: "step"; text: string };
type Note = { type: "note"; text: string };
type Bullets = { type: "bullets"; items: string[] };
type Image = { type: "img"; alt: string; src?: string };

type Block = Para | Step | Note | Bullets | Image;

interface Subsection {
  id: string;
  title: string;
  blocks: Block[];
}

interface Section {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  summary?: string;
  subsections: Subsection[];
}

// ---------- Helpers ----------
const Anchor: React.FC<{ id: string }> = ({ id }) => (
  <div id={id} className="relative -top-24" />
);

const BlockView: React.FC<{ block: Block }> = ({ block }) => {
  switch (block.type) {
    case "p":
      return <p className="text-gray-700 leading-relaxed text-lg">{block.text}</p>;
    case "step": {
      // Extract leading number if present; otherwise auto dot
      return (
        <div className="flex items-start gap-3">
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("complete-dsecure-network-file")} />
          <div className="mt-1 shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center justify-center">
            ✓
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">{block.text}</p>
        </div>
      );
    }
    case "note":
      return (
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
            <p className="text-amber-900 text-lg">
              <strong>Note:</strong> {block.text}
            </p>
          </div>
        </div>
      );
    case "bullets":
      return (
        <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "img":
      return (
        <div className="border rounded-lg overflow-hidden">
          {/* if you have a real image url, pass via src */}
          <div className="p-3 text-sm text-gray-500 bg-gray-50">
            {block.alt}
          </div>
        </div>
      );
    default:
      return null;
  }
};

// Smooth scroll to anchors
const useScrollToHash = () => {
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);
};

// ---------- Content (consolidated from your inputs) ----------
const sections: Section[] = [
  // Quick Overview
  {
    id: "quick-overview",
    icon: BookOpen,
    title: "Quick Overview",
    summary:
      "What this guide covers and how to navigate it efficiently in D-Secure File Eraser Network.",
    subsections: [
      {
        id: "qo-about-guide",
        title: "About this Guide",
        blocks: [
          {
            type: "p",
            text:
              "This user guide contains steps to assist you through various functions of DSecure File Eraser Network. Each function is explained in detail in the corresponding sections.",
          },
          {
            type: "bullets",
            items: [
              "About D-Secure File Eraser Network",
              "Quick Overview",
              "First Steps",
              "How To",
              "Frequently Asked Questions (FAQs)",
              "about D-SecureTech",
            ],
          },
          {
            type: "bullets",
            items: [
              "Select topics from the left navigation.",
              "Notes and Tips appear in italics-style callouts.",
              "This is a web-based guide; for best experience, use Chrome.",
            ],
          },
        ],
      },
    ],
  },

  // First Steps
  {
    id: "first-steps",
    icon: Layers,
    title: "First Steps",
    summary:
      "Installation, UI overview, licensing & activation, customization, updates, and support.",
    subsections: [
      {
        id: "install-setup",
        title: "Installation and Setup",
        blocks: [
          {
            type: "bullets",
            items: [
              "Processor: Intel-compatible (x86, x64)",
              "OS: Windows 7–11, Windows Server 2008 R2–2022",
              "RAM: 4 GB minimum (8 GB recommended)",
              "Disk: 500 MB for installation",
              "Internet needed for Cloud connectivity",
            ],
          },
          {
            type: "step",
            text:
              "Double-click the DSecureFileEraserNetwork.exe to launch setup, accept the license, choose destination, and additional tasks.",
          },
          {
            type: "step",
            text:
              "Download & install MariaDB (set Root Password) or use Skip if already installed.",
          },
          {
            type: "step",
            text:
              "Complete the wizard and click Finish (uncheck “Launch app” if you don’t want to open immediately).",
          },
        ],
      },
      {
        id: "ui-overview",
        title: "User Interface Overview",
        blocks: [
          {
            type: "p",
            text:
              "Home, Tools, Help, Buy Now, and Activation ribbons. Home includes Connect Domain, Reports, Schedule Task, Settings, Connect to Cloud, and Search.",
          },
          {
            type: "img",
            alt:
              "UI overview (if you need to place an image, map its URL in `src`)",
          },
        ],
      },
      {
        id: "ribbons-tabs-buttons",
        title: "Ribbons, Tabs, and Buttons",
        blocks: [
          {
            type: "bullets",
            items: [
              "Home: Connect Domain, Reports, Schedule Task, Settings, Connect To Cloud, Search.",
              "Tools: Update Wizard.",
              "Help: Help Topics, Knowledgebase, Support, About.",
              "Buy Now: Buy Online.",
              "Activation: Add Licenses, Manage Licenses.",
            ],
          },
          {
            type: "bullets",
            items: [
              "Common buttons: Scan, Stop, Proceed/Confirm Erasure, Edit/Delete schedule, Reset fields, Save/Download.",
            ],
          },
        ],
      },
      {
        id: "order-software",
        title: "Order the Software",
        blocks: [
          {
            type: "p",
            text:
              "Purchase via the Buy Now ribbon → Buy Online. After order confirmation, you receive an Activation Key via email.",
          },
        ],
      },
      {
        id: "activation-licensing",
        title: "Activation and Licensing",
        blocks: [
          {
            type: "bullets",
            items: [
              "Activate Online or Offline.",
              "Manage license pools: view usage, deactivate, extend validity.",
            ],
          },
        ],
      },
      {
        id: "online-offline-activation",
        title: "Online and Offline Activation",
        blocks: [
          {
            type: "step",
            text:
              "Online: Activation ribbon → Add Licenses → enter Activation Key → Activate.",
          },
          {
            type: "step",
            text:
              "Offline: Get Registration ID → email support → receive License Key → Activate.",
          },
        ],
      },
      {
        id: "manage-licenses",
        title: "Manage Licenses",
        blocks: [
          {
            type: "p",
            text:
              "View pools, activation/expiry, used/available counts. Deactivate computers or extend validity as needed.",
          },
        ],
      },
      {
        id: "view-computers",
        title: "View Computers",
        blocks: [
          { type: "step", text: "Activation → Manage Licenses." },
          {
            type: "step",
            text:
              "Select a pool → View Computers → choose a computer → Deactivate License.",
          },
          {
            type: "note",
            text:
              "You can save the updated list as CSV after deactivation.",
          },
        ],
      },
      {
        id: "extend-validity",
        title: "Extend Validity",
        blocks: [
          {
            type: "p",
            text:
              "Pools expiring soon are highlighted. Extend validity using a new Activation Key. Behavior differs if additional, equal, or fewer licenses are purchased.",
          },
        ],
      },
      {
        id: "customization-settings",
        title: "Customization and Settings",
        blocks: [
          {
            type: "bullets",
            items: [
              "General Settings",
              "Erase Traces Settings",
              "Ignore File List Settings",
            ],
          },
        ],
      },
      {
        id: "general-settings",
        title: "General Settings",
        blocks: [
          {
            type: "step",
            text:
              "Home → Settings → General. Select Network Connection Status check, choose Erasure Algorithm and Verification Method.",
          },
          {
            type: "step",
            text:
              "Toggle Confirm to Proceed and Show File Size in Details Pane as needed.",
          },
        ],
      },
      {
        id: "erasure-options",
        title: "Erasure Options",
        blocks: [
          {
            type: "bullets",
            items: [
              "Algorithms: Zeroes, Pseudo-random, DoD 5220.22-M (3/7 passes ECE), DoD 5200.28-STD (7), GOST, Schneier (7), VSITR (7), Gutmann (35), US Army AR380-19 (3), NATO (7), AFSSI 5020 (3), Pfitzner (33), RCMP TSSIT OPS-II (4), British HMG IS5 (3), NIST 800-88 Clear.",
            ],
          },
          {
            type: "bullets",
            items: [
              "Verification: No Verification, Random Verification, Total Verification.",
            ],
          },
        ],
      },
      {
        id: "erase-traces-settings",
        title: "Erase Traces Settings",
        blocks: [
          {
            type: "bullets",
            items: [
              "Internet Activity: per installed browsers (Edge, Chrome, Firefox, IE, Safari, Opera, SeaMonkey).",
              "Application Traces: Email/News, P2P, Microsoft, Chat, Others.",
              "System Traces: Recycle Bin, Temp files, Dumps, Event Log, MRUs, Update info, etc.",
            ],
          },
        ],
      },
      {
        id: "ignore-file-list-settings",
        title: "Ignore File List Settings",
        blocks: [
          {
            type: "step",
            text:
              "Settings → Ignore File List → Add file types (.pdf etc.), file names, or folder names you want to exclude from erasure.",
          },
          {
            type: "note",
            text:
              "Use Remove Items to take entries out of the ignore list.",
          },
        ],
      },
      {
        id: "updates-maintenance",
        title: "Updates and Maintenance",
        blocks: [
          {
            type: "p",
            text:
              "Automatic or manual updates via Tools → Update Wizard. Disable auto-check at startup if desired.",
          },
          {
            type: "bullets",
            items: [
              "Live update may fail due to no internet, no updates available, or missing files.",
            ],
          },
        ],
      },
      {
        id: "contact-support",
        title: "Contact and Support",
        blocks: [
          {
            type: "bullets",
            items: [
              "Support portal & knowledgebase",
              "Chat with technician",
              "Submit enquiry",
              "Email techsupport@dsecuretech.com",
            ],
          },
        ],
      },
    ],
  },

  // How To
  {
    id: "how-to",
    icon: ClipboardList,
    title: "How To",
    summary:
      "Connect domain, login to cloud, erase files/traces, schedule erasure, and work on reports.",
    subsections: [
      {
        id: "connect-domain",
        title: "Connect Domain",
        blocks: [
          {
            type: "p",
            text:
              "Only domain administrators can access and run erasures. D-Secure aligns with AD and lists OUs and computers.",
          },
          {
            type: "note",
            text:
              "You can skip network check; disconnected machines are listed but cannot be erased until reconnected.",
          },
        ],
      },
      {
        id: "login-cloud",
        title: "Login to D-Secure Cloud",
        blocks: [
          {
            type: "step",
            text:
              "Home → Connect to Cloud → enter User ID & Password (URL prefilled).",
          },
          { type: "step", text: "Click Login → status changes to Connected." },
        ],
      },
      {
        id: "erase-files-folders",
        title: "Erase Files & Folders",
        blocks: [
          {
            type: "step",
            text:
              "Connect domain → select computer → Erase Files & Folders.",
          },
          {
            type: "step",
            text:
              "Optionally adjust Settings (algorithm/verification), select items, click Erase Data, confirm.",
          },
          {
            type: "step",
            text:
              "View progress → Process Completed with Erasure Summary.",
          },
        ],
      },
      {
        id: "erase-traces",
        title: "Erase Internet Activity, Application or System Traces",
        blocks: [
          {
            type: "step",
            text:
              "Select computer → Erase Traces → Settings → pick categories (Internet, Application, System).",
          },
          { type: "step", text: "Click Scan → review results → select items." },
          { type: "step", text: "Click Erase Traces → confirm → complete." },
          {
            type: "note",
            text:
              "Close running applications before erasure for best results.",
          },
        ],
      },
      {
        id: "schedule-erasure",
        title: "Schedule Erasure",
        blocks: [
          {
            type: "p",
            text:
              "Predefine tasks (Once/Daily/Weekly/Monthly/Every Boot) to erase traces or files/folders.",
          },
        ],
      },
      {
        id: "schedule-traces",
        title: "Schedule Erasure for Erasing Traces",
        blocks: [
          {
            type: "step",
            text:
              "Home → Schedule Task (Erase Traces tab). Choose frequency, date/time → Next.",
          },
          {
            type: "step",
            text:
              "Select OU & Computer → Save. Task Status appears (export CSV if needed).",
          },
          {
            type: "note",
            text:
              "Uncheck 'Show erasure activity...' for silent execution.",
          },
        ],
      },
      {
        id: "edit-delete-task",
        title: "Edit or Delete an Existing Task",
        blocks: [
          {
            type: "step",
            text:
              "Open Schedule Task → select task in summary → Edit or Delete.",
          },
          {
            type: "step",
            text:
              "Choose computers/OU → Next (for edit) or Delete (to remove). Review Task Status and save CSV.",
          },
        ],
      },
      {
        id: "schedule-files-folders",
        title: "Schedule Erasure for Erasing Files & Folders",
        blocks: [
          {
            type: "p",
            text:
              "Create, edit, or delete scheduled tasks to erase the selected file/folder paths.",
          },
        ],
      },
      {
        id: "create-task-files",
        title: "Create a New Task (Files & Folders)",
        blocks: [
          {
            type: "step",
            text:
              "Schedule Task → Erase Files & Folders tab → New Task → Task Name.",
          },
          {
            type: "step",
            text:
              "Add Path(s) under Choose Items. Add multiple paths as needed.",
          },
          {
            type: "note",
            text:
              "If two computers share same path but you only want one deleted, create separate tasks.",
          },
          {
            type: "step",
            text:
              "Select frequency (Once/Daily/Weekly/Monthly/Every Boot), set Start From date/time.",
          },
          {
            type: "step",
            text: "Select OU & Computer → Save → Task Status (export CSV).",
          },
        ],
      },
      {
        id: "edit-task-files",
        title: "Edit an Existing Task (Files & Folders)",
        blocks: [
          {
            type: "step",
            text:
              "Schedule Task → Erase Files & Folders → Existing Task → choose task → Edit.",
          },
          {
            type: "step",
            text:
              "Adjust OUs/computers, frequency, and start time → OK → Task Status.",
          },
        ],
      },
      {
        id: "delete-task-files",
        title: "Delete a Scheduled Task (Files & Folders)",
        blocks: [
          {
            type: "step",
            text:
              "Schedule Task → Erase Files & Folders → Existing Task → select task → Delete → confirm list → Delete.",
          },
          {
            type: "step",
            text:
              "Review Task Status (export CSV) → confirmation dialog appears.",
          },
        ],
      },
      {
        id: "work-on-reports",
        title: "Work on Reports",
        blocks: [
          {
            type: "p",
            text:
              "Reports show successful/failed processes. Filter/sort, preview, export, send to cloud, and customize settings.",
          },
        ],
      },
      {
        id: "filter-sort-reports",
        title: "Filter and Sort Reports",
        blocks: [
          {
            type: "step",
            text:
              "Home → Reports → set date range and type filter (All / Erase Traces / Erase Files & Folders).",
          },
          {
            type: "step",
            text:
              "Sort columns; Action tab offers Preview and Send to Cloud; Save exports PDF/XML.",
          },
        ],
      },
      {
        id: "preview-save-report",
        title: "Preview and Save a Report",
        blocks: [
          { type: "step", text: "Action → Preview (one at a time)." },
          {
            type: "step",
            text:
              "Select the report → Save → choose PDF or XML → pick location → Save.",
          },
        ],
      },
      {
        id: "send-report-cloud",
        title: "Send a Report to D-Secure Cloud",
        blocks: [
          {
            type: "note",
            text:
              "Ensure you are logged into D-Secure Cloud before sending.",
          },
          {
            type: "step",
            text:
              "Click Send to Cloud on the report → a Report ID is generated and uploaded to Cloud Console.",
          },
        ],
      },
      {
        id: "customize-report-settings",
        title: "Customize Report Settings",
        blocks: [
          {
            type: "bullets",
            items: [
              "Erasure Person / Validator Person (Name, Department)",
              "Signature Images (Technician/Validator) 170×48 PNG",
              "Image Settings (Top Logo, Watermark) 170×48 PNG",
              "Header Settings (Text or Image)",
            ],
          },
          {
            type: "note",
            text:
              "Size must match exactly; else previous images remain. Reset restores defaults. Changes reflect on newly generated reports.",
          },
        ],
      },
    ],
  },

  // FAQs
  {
    id: "faqs",
    icon: HelpCircle,
    title: "Frequently Asked Questions (FAQs)",
    summary: "Top 20 FAQs for D-Secure File Eraser Network.",
    subsections: [
      {
        id: "faq-1",
        title: "What does D-Secure File Eraser Network do?",
        blocks: [
          {
            type: "p",
            text: "D-Secure File Eraser Network is a comprehensive data erasure solution for network environments. It allows IT administrators to permanently erase files, folders, and digital traces from multiple networked computers simultaneously from a central console. The software uses advanced overwriting algorithms to ensure that deleted data cannot be recovered, even with sophisticated data recovery tools."
          }
        ]
      },
      {
        id: "faq-2",
        title: "Does D-Secure really remove data beyond recovery?",
        blocks: [
          {
            type: "p",
            text: "Yes, absolutely. When you use D-Secure File Eraser Network with regulated erasure algorithms, the data is permanently destroyed and cannot be recovered. The software overwrites data multiple times with random patterns, making recovery impossible even with specialized forensic tools. All erasure standards used (DoD 5220.22-M, NIST 800-88, Gutmann, etc.) are industry-recognized and comply with international data destruction regulations."
          }
        ]
      },
      {
        id: "faq-3",
        title: "Which erasure algorithm should I choose?",
        blocks: [
          {
            type: "p",
            text: "The choice depends on your security requirements and available time. For most business use: DoD 5220.22-M (3 passes) or DoD 7-pass provides excellent security with reasonable speed. For highly sensitive government or military data: Use Gutmann (35 passes) or DoD 7-pass for maximum security. For compliance with modern standards: NIST 800-88 Clear is recommended. For quick internal cleanups: 1-pass Zeroes is sufficient. Higher pass counts increase security but also increase the time required for erasure."
          }
        ]
      },
      {
        id: "faq-4",
        title: "Why are administrator credentials required for domain connection?",
        blocks: [
          {
            type: "p",
            text: "Administrator credentials are necessary because D-Secure File Eraser Network needs elevated permissions to access remote computers on the network, read their file systems, and perform permanent erasure operations. Only domain administrators have the necessary rights to execute these operations across multiple computers. This security measure prevents unauthorized users from erasing data on network computers."
          }
        ]
      },
      {
        id: "faq-5",
        title: "Should I check network connection status for all computers?",
        blocks: [
          {
            type: "p",
            text: "It's recommended to check network connection status before scheduling erasure tasks. This ensures that computers are online and accessible. However, you can skip this check if you're scheduling tasks for later execution. Offline computers will appear in the list but cannot be erased until they're reconnected to the network. The software automatically handles reconnections for scheduled tasks."
          }
        ]
      },
      {
        id: "faq-6",
        title: "A computer was active but became inaccessible later—why?",
        blocks: [
          {
            type: "p",
            text: "This can happen for several reasons: the computer was turned off or went to sleep mode, network connectivity was lost, the computer was removed from the domain, firewall settings were changed to block access, or the user's session credentials expired. Check the computer's power status, network connection, and domain membership. If the issue persists, verify firewall rules and refresh your domain connection in the application."
          }
        ]
      },
      {
        id: "faq-7",
        title: "Can I erase files on non-domain computers?",
        blocks: [
          {
            type: "p",
            text: "D-Secure File Eraser Network is specifically designed for domain environments and requires Active Directory integration. For standalone computers not joined to a domain, you would need to use the standalone version of D-Secure File Eraser. The network version relies on domain infrastructure for authentication, computer discovery, and remote access."
          }
        ]
      },
      {
        id: "faq-8",
        title: "If a computer disconnects after scheduling a task, will the task still run?",
        blocks: [
          {
            type: "p",
            text: "Scheduled tasks are stored on each individual computer, not centrally. If a computer is offline when the scheduled time arrives, the task will execute when the computer comes back online (for tasks like 'Every Boot') or will be skipped for time-specific tasks. It's best practice to ensure computers remain connected for scheduled erasure tasks to execute as planned."
          }
        ]
      },
      {
        id: "faq-9",
        title: "How do I activate if my server has no internet connection?",
        blocks: [
          {
            type: "p",
            text: "Use the offline activation method: Generate a Registration ID from the application, email it to techsupport@dsecuretech.com along with your Activation Key, receive a License Key file from support (usually within one business day), and import the License Key file into the application to complete activation. See the Licensing section for detailed step-by-step instructions."
          }
        ]
      },
      {
        id: "faq-10",
        title: "How can I check which licenses are expiring soon?",
        blocks: [
          {
            type: "p",
            text: "Go to Activation → Manage Licenses. License pools that are expiring soon are highlighted with warning colors in the list. The interface shows the exact expiry date for each pool. You can sort by expiry date to see which licenses need renewal first. It's recommended to set calendar reminders 30 days before expiration."
          }
        ]
      },
      {
        id: "faq-11",
        title: "Can I erase selective internet activity traces instead of all?",
        blocks: [
          {
            type: "p",
            text: "Yes, absolutely. When you click Erase Traces → Settings, you can choose exactly which types of internet activity to erase for each installed browser. Options include browsing history, cache, cookies, download history, saved passwords, form data, and more. You can also select specific browsers (Chrome, Firefox, Edge, etc.) rather than erasing traces from all browsers."
          }
        ]
      },
      {
        id: "faq-12",
        title: "Why do some system traces persist even after erasure?",
        blocks: [
          {
            type: "p",
            text: "Some system traces may persist if: applications are currently running and have locked access to their trace files, you don't have sufficient permissions to erase certain system files, Windows is actively using the files, or the files are recreated immediately after erasure by running processes. Close all applications before erasing traces and ensure you have administrator privileges for best results."
          }
        ]
      },
      {
        id: "faq-13",
        title: "Can I exclude specific files or folders from erasure?",
        blocks: [
          {
            type: "p",
            text: "Yes, use the Ignore File List feature. Go to Home → Settings → Ignore File List. Here you can add file types (extensions like .pdf, .docx), specific file names, or entire folder names. Any items matching the ignore list will automatically be skipped during erasure operations, even if they're selected. This protects critical files from accidental deletion."
          }
        ]
      },
      {
        id: "faq-14",
        title: "Can I create duplicate task names for scheduled tasks?",
        blocks: [
          {
            type: "p",
            text: "No, each scheduled task must have a unique name. The software prevents duplicate task names to avoid confusion and management issues. Choose descriptive names like 'Daily Temp File Cleanup - Sales Dept' or 'Weekly Browser History Erasure - Legal' to clearly identify each task's purpose and scope."
          }
        ]
      },
      {
        id: "faq-15",
        title: "How do I disable the confirmation dialog before erasure?",
        blocks: [
          {
            type: "p",
            text: "Go to Home → Settings → General Settings. Uncheck the option 'Confirm to Proceed' or 'Show Confirmation Dialog'. After disabling, erasure operations will begin immediately when you click the Erase button without showing a confirmation prompt. Use this feature only if you're confident in your selections, as it removes the final safety check."
          }
        ]
      },
      {
        id: "faq-16",
        title: "Can I return or reuse a license from one computer to another?",
        blocks: [
          {
            type: "p",
            text: "Yes. Go to Activation → Manage Licenses, select the license pool, click View Computers, select the computer you want to deactivate, and click Deactivate License. This frees up one license in the pool that can be used to activate another computer. This is useful when replacing computers or redistributing licenses across your organization."
          }
        ]
      },
      {
        id: "faq-17",
        title: "How do I get detailed erasure reports?",
        blocks: [
          {
            type: "p",
            text: "Erasure reports are automatically generated after every erasure operation. Access them by clicking Home → Reports. You can filter reports by date range and type (Erase Files & Folders or Erase Traces). Each report includes details like computer name, files erased, algorithm used, time taken, success/failure counts, and a unique Report ID for tracking."
          }
        ]
      },
      {
        id: "faq-18",
        title: "Can I preview or save reports for compliance?",
        blocks: [
          {
            type: "p",
            text: "Yes. In the Reports section, select any report and click Action → Preview to view it on-screen. To save, select the report, click Save, choose PDF or XML format, select a destination folder, and click Save. PDF reports are formatted for printing and sharing, while XML reports can be imported into other systems for analysis."
          }
        ]
      },
      {
        id: "faq-19",
        title: "Can I save multiple reports at once?",
        blocks: [
          {
            type: "p",
            text: "Currently, reports must be saved individually—you cannot batch-export multiple reports in one operation. To save multiple reports, select and save each one separately. Alternatively, you can send reports to D-Secure Cloud in batch, which provides centralized storage and management of all your erasure reports."
          }
        ]
      },
      {
        id: "faq-20",
        title: "What should I do if I lose local reports?",
        blocks: [
          {
            type: "p",
            text: "If you've been uploading reports to D-Secure Cloud, you can access them from the Cloud Console at any time. If you haven't been using Cloud integration, local reports lost due to database corruption or system failure cannot be recovered. To prevent data loss: regularly back up your MariaDB database, enable D-Secure Cloud integration and upload reports regularly, export critical reports to PDF and store in a separate location, and configure automated database backups as part of your IT maintenance routine."
          }
        ]
      }
    ],
  },

  // about D-SecureTech
  {
    id: "about-D-Secure",
    icon: Building,
    title: "about D-SecureTech",
    summary:
      "D-Secure is a global Data Care organization: Recovery, Email Repair & Conversion, File/DB Repair, and Data Erasure.",
    subsections: [
      {
        id: "D-Secure-overview",
        title: "D-Secure Overview",
        blocks: [
          {
            type: "p",
            text:
              "D-Secure provides 100+ proprietary tools used by enterprises, IT service providers, and individuals in 190+ countries, with presence in USA, Europe, and Asia.",
          },
        ],
      },
      {
        id: "D-Secure-portfolio",
        title: "Product Portfolio",
        blocks: [
          {
            type: "bullets",
            items: [
              "Data Recovery: DSecureTech Data Recovery (Windows/Mac), DSecureTech Photo Recovery.",
              "Email Repair & Conversion: Repair for Exchange/Outlook, Converter for EDB/OST.",
              "File & Database Repair: Repair for MS SQL, Repair for Video.",
              "Data Erasure: D-SecureDrive Eraser, D-SecureFile Eraser.",
            ],
          },
        ],
      },
    ],
  },
];

// ---------- Component ----------
const CompleteDSecureNetworkFile: React.FC = () => {
  useScrollToHash();
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Flattened index for search
  const searchable = useMemo(() => {
    const items: { path: string; label: string }[] = [];
    sections.forEach((s) => {
      items.push({ path: `#${s.id}`, label: s.title });
      s.subsections.forEach((ss) => {
        items.push({ path: `#${ss.id}`, label: `${s.title} — ${ss.title}` });
      });
    });
    return items;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    // Filter sections/subsections whose title or block text matches
    return sections
      .map((s) => {
        const sub = s.subsections
          .map((ss) => {
            const textBlob =
              ss.title.toLowerCase() +
              " " +
              ss.blocks
                .map((b) =>
                  b.type === "p" || b.type === "note" || b.type === "step"
                    ? (b as any).text?.toLowerCase?.() || ""
                    : b.type === "bullets"
                      ? (b as any).items?.join(" ").toLowerCase?.() || ""
                      : ""
                )
                .join(" ");
            return textBlob.includes(q) || ss.title.toLowerCase().includes(q)
              ? ss
              : null;
          })
          .filter(Boolean) as Subsection[];
        if (sub.length) return { ...s, subsections: sub };
        if (s.title.toLowerCase().includes(q)) return s;
        return null;
      })
      .filter(Boolean) as Section[];
  }, [query]);

  const onJump = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const sectionId = hash.replace('#', '');
      setActiveSection(sectionId);

      // Find which section this ID belongs to and expand only that section
      const parentSection = sections.find(s =>
        s.id === sectionId || s.subsections.some(ss => ss.id === sectionId)
      );

      if (parentSection) {
        // Close all other sections and open only the target section
        setExpandedSections([parentSection.id]);
      }
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [sectionId] // Only keep the newly opened section
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Complete D-Secure Manual</title>
        <meta
          name="description"
          content="All D-Secure File Eraser Network help content consolidated on a single page with navigation, search, and printable sections."
        />
      </Helmet>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>

      {/* Main Content Area - Bootstrap Docs Layout */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar Navigation - Bootstrap Style */}
          <aside
            ref={listRef}
            className="hidden lg:block lg:w-64 shrink-0"
          >
            <div
              className="sticky top-4 p-4 lg:p-0 lg:pr-4 max-h-[calc(100vh-2rem)] overflow-y-auto sidebar-scroll"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#d1d5db #f3f4f6'
              }}
            >
              <nav className="space-y-2">
                {filtered.map((s) => {
                  const isExpanded = expandedSections.includes(s.id);
                  return (
                    <div key={s.id} className="border-b border-gray-200 pb-2">
                      {/* Section Header with Accordion */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSection(s.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          aria-label={isExpanded ? "Collapse" : "Expand"}
                        >
                          <ChevronRight
                            className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? "rotate-90" : ""
                              }`}
                          />
                        </button>
                        <a
                          href={`#${s.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            onJump(`#${s.id}`);
                          }}
                          className={`flex-1 flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-colors ${activeSection === s.id
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-900 hover:bg-gray-100"
                            }`}
                        >
                          <s.icon className={`w-4 h-4 shrink-0 ${activeSection === s.id ? "text-blue-700" : "text-blue-600"}`} />
                          <span className={`break-words ${activeSection === s.id ? "text-blue-700" : ""}`}>{s.title}</span>
                        </a>
                      </div>

                      {/* Subsections - Accordion Content */}
                      {isExpanded && (
                        <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-200 pl-2 animate-fadeIn">
                          {s.subsections.map((ss) => (
                            <a
                              key={ss.id}
                              href={`#${ss.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                onJump(`#${ss.id}`);
                              }}
                              className={`flex items-start gap-2 pl-3 py-1.5 text-sm rounded-r-md transition-colors ${activeSection === ss.id
                                  ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600 -ml-0.5"
                                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                }`}
                            >
                              <span className="break-words">{ss.title}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8 text-white">
              <h1 className="text-3xl font-bold mb-2">
                D-Secure File Eraser Network Manual
              </h1>
              <p className="text-blue-100 text-lg">
                Complete guide to installation, configuration, and secure data erasure operations
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-12">
              {filtered.map((s) => (
                <section
                  key={s.id}
                  className="scroll-mt-20"
                >
                  <Anchor id={s.id} />

                  {/* Section Header */}
                  <div className="mb-8 pb-4 border-b-2 border-gray-200">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <s.icon className="w-7 h-7 text-blue-600" />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-900">
                        {s.title}
                      </h2>
                    </div>
                    {s.summary && (
                      <p className="text-gray-600 text-xl ml-16">{s.summary}</p>
                    )}
                  </div>

                  {/* Subsections */}
                  <div className="space-y-10">
                    {s.subsections.map((ss) => (
                      <article
                        key={ss.id}
                        className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow"
                      >
                        <Anchor id={ss.id} />

                        {/* Subsection Header */}
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                          <span className="w-1.5 h-8 bg-blue-600 rounded"></span>
                          {ss.title}
                        </h3>

                        {/* Content Blocks */}
                        <div className="space-y-5 text-gray-700 text-base leading-relaxed">
                          {ss.blocks.map((b, i) => (
                            <BlockView key={i} block={b} />
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="text-center text-gray-600">
                <p className="mb-2">
                  Need help? Contact{" "}
                  <a
                    href="mailto:techsupport@dsecuretech.com"
                    className="text-blue-600 hover:underline"
                  >
                    techsupport@dsecuretech.com
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  © {new Date().getFullYear()} DSecureTech. All rights reserved.
                </p>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CompleteDSecureNetworkFile;
