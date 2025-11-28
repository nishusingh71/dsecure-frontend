// src/pages/CompleteDSecureManual.tsx
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
} from "lucide-react";

/**
 * ONE-PAGE COMPLETE DSECURE MANUAL
 * - Light mode UI
 * - Left: filterable navigation tree
 * - Right: content pane with anchors
 * - Sections & subsections mapped from all content you shared
 * - Clean, print-friendly blocks
 *
 * NOTE: All wording normalized to "DSecure File Eraser Network".
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
      return <p className="text-gray-700 leading-relaxed">{block.text}</p>;
    case "step": {
      // Extract leading number if present; otherwise auto dot
      return (
        <div className="flex items-start gap-3">
          <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center">
            ✓
          </div>
          <p className="text-gray-700 leading-relaxed">{block.text}</p>
        </div>
      );
    }
    case "note":
      return (
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <p className="text-amber-900">
              <strong>Note:</strong> {block.text}
            </p>
          </div>
        </div>
      );
    case "bullets":
      return (
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
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
  // 2. Quick Overview
  {
    id: "quick-overview",
    icon: BookOpen,
    title: "2. Quick Overview",
    summary:
      "What this guide covers and how to navigate it efficiently in DSecure File Eraser Network.",
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
              "About DSecure File Eraser Network",
              "Quick Overview",
              "First Steps",
              "How To",
              "Frequently Asked Questions (FAQs)",
              "About DSecureTech",
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

  // 3. First Steps (multiple)
  {
    id: "first-steps",
    icon: Layers,
    title: "3. First Steps",
    summary:
      "Installation, UI overview, licensing & activation, customization, updates, and support.",
    subsections: [
      {
        id: "install-setup",
        title: "3.1. Installation and Setup",
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
        title: "3.2. User Interface Overview",
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
        title: "3.2.1. Ribbons, Tabs, and Buttons",
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
        title: "3.3. Order the Software",
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
        title: "3.4. Activation and Licensing",
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
        title: "3.4.1. Online and Offline Activation",
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
        title: "3.4.2. Manage Licenses",
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
        title: "3.4.2.1. View Computers",
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
        title: "3.4.2.2. Extend Validity",
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
        title: "3.5. Customization and Settings",
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
        title: "3.5.1. General Settings",
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
        title: "3.5.1.1. Erasure Options",
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
        title: "3.5.2. Erase Traces Settings",
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
        title: "3.5.3. Ignore File List Settings",
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
        title: "3.6. Updates and Maintenance",
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
        title: "3.7. Contact and Support",
        blocks: [
          {
            type: "bullets",
            items: [
              "Support portal & knowledgebase",
              "Chat with technician",
              "Submit enquiry",
              "Email techsupport@stellarinfo.com",
            ],
          },
        ],
      },
    ],
  },

  // 4. How To
  {
    id: "how-to",
    icon: ClipboardList,
    title: "4. How To",
    summary:
      "Connect domain, login to cloud, erase files/traces, schedule erasure, and work on reports.",
    subsections: [
      {
        id: "connect-domain",
        title: "4.1. Connect Domain",
        blocks: [
          {
            type: "p",
            text:
              "Only domain administrators can access and run erasures. DSecure aligns with AD and lists OUs and computers.",
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
        title: "4.2. Login to DSecure Cloud",
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
        title: "4.3. Erase Files & Folders",
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
        title: "4.4. Erase Internet Activity, Application or System Traces",
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
        title: "4.5. Schedule Erasure",
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
        title: "4.5.1. Schedule Erasure for Erasing Traces",
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
        title: "4.5.1.1. Edit or Delete an Existing Task",
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
        title: "4.5.2. Schedule Erasure for Erasing Files & Folders",
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
        title: "4.5.2.1. Create a New Task (Files & Folders)",
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
        title: "4.5.2.2. Edit an Existing Task (Files & Folders)",
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
        title: "4.5.2.3. Delete a Scheduled Task (Files & Folders)",
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
        title: "4.6. Work on Reports",
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
        title: "4.6.1. Filter and Sort Reports",
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
        title: "4.6.2. Preview and Save a Report",
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
        title: "4.6.3. Send a Report to DSecure Cloud",
        blocks: [
          {
            type: "note",
            text:
              "Ensure you are logged into DSecure Cloud before sending.",
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
        title: "4.6.4. Customize Report Settings",
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

  // 5. FAQs
  {
    id: "faqs",
    icon: HelpCircle,
    title: "5. Frequently Asked Questions (FAQs)",
    summary: "Top 20 FAQs for DSecure File Eraser Network.",
    subsections: [
      {
        id: "faq-list",
        title: "FAQs",
        blocks: [
          {
            type: "bullets",
            items: [
              "What does DSecure File Eraser Network do?",
              "Does DSecure remove data beyond recovery?",
              "Which algorithm should I choose?",
              "Why admin credentials for domain?",
              "Check network connection status for all computers?",
              "Active but inaccessible later — why?",
              "Erase on non-domain computers?",
              "If disconnected after scheduling, does task run?",
              "Offline activation?",
              "Check expiring licenses?",
              "Selective internet traces?",
              "System traces persist?",
              "Exclude files/folders?",
              "Duplicate task names?",
              "Disable confirmation dialog?",
              "Return/reuse license?",
              "Get erasure reports?",
              "Preview/save reports?",
              "Save multiple reports at once?",
              "Lose local reports — what to do?",
            ],
          },
          {
            type: "note",
            text:
              "Detailed answers mirror sections above: General/Erasure Options, Connect Domain, Manage Licenses, Reports, and Cloud.",
          },
        ],
      },
    ],
  },

  // 6. About Stellar
  {
    id: "about-stellar",
    icon: Building,
    title: "6. About DSecureTech",
    summary:
      "DSecure is a global Data Care organization: Recovery, Email Repair & Conversion, File/DB Repair, and Data Erasure.",
    subsections: [
      {
        id: "stellar-overview",
        title: "DSecure Overview",
        blocks: [
          {
            type: "p",
            text:
              "DSecure provides 100+ proprietary tools used by enterprises, IT service providers, and individuals in 190+ countries, with presence in USA, Europe, and Asia.",
          },
        ],
      },
      {
        id: "stellar-portfolio",
        title: "Product Portfolio",
        blocks: [
          {
            type: "bullets",
            items: [
              "Data Recovery: DSecureTech Data Recovery (Windows/Mac), DSecureTech Photo Recovery.",
              "Email Repair & Conversion: Repair for Exchange/Outlook, Converter for EDB/OST.",
              "File & Database Repair: Repair for MS SQL, Repair for Video.",
              "Data Erasure: BitRaser Drive Eraser, BitRaser File Eraser.",
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Complete DSecure Manual</title>
        <meta
          name="description"
          content="All DSecure File Eraser Network help content consolidated on a single page with navigation, search, and printable sections."
        />
      </Helmet>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                DSecure File Eraser Network — Complete Manual
              </h1>
            </div>

            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the manual..."
                className="w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside
            ref={listRef}
            className="col-span-12 md:col-span-4 lg:col-span-3 bg-white border border-gray-200 rounded-xl shadow-sm p-4 h-fit sticky top-4"
          >
            <nav className="space-y-4">
              {filtered.map((s) => (
                <div key={s.id}>
                  <div className="flex items-center gap-2 text-gray-900 font-semibold mb-2">
                    <s.icon className="w-5 h-5 text-blue-600" />
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onJump(`#${s.id}`);
                      }}
                      className="hover:text-blue-700"
                    >
                      {s.title}
                    </a>
                  </div>
                  <div className="space-y-1">
                    {s.subsections.map((ss) => (
                      <a
                        key={ss.id}
                        href={`#${ss.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onJump(`#${ss.id}`);
                        }}
                        className="group flex items-center text-sm text-gray-700 hover:text-blue-700"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 mr-1" />
                        {ss.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="col-span-12 md:col-span-8 lg:col-span-9 space-y-10">
            {filtered.map((s) => (
              <section
                key={s.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
              >
                <Anchor id={s.id} />
                <div className="flex items-start gap-3 mb-3">
                  <s.icon className="w-7 h-7 text-blue-600 mt-0.5" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {s.title}
                    </h2>
                    {s.summary && (
                      <p className="text-gray-600 mt-1">{s.summary}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  {s.subsections.map((ss) => (
                    <div key={ss.id} className="space-y-3">
                      <Anchor id={ss.id} />
                      <h3 className="text-xl font-semibold text-gray-900">
                        {ss.title}
                      </h3>
                      <div className="space-y-3">
                        {ss.blocks.map((b, i) => (
                          <BlockView key={i} block={b} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CompleteDSecureNetworkFile;
