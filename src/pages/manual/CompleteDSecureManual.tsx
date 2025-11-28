// CompleteDSecureManual.tsx
import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Cloud,
  Settings,
  Shield,
  Palette,
  FileText,
  Calendar,
  ExternalLink,
  ArrowRight,
  BookOpen,
  Cog,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Lock,
  Trash2,
  Eye,
  Monitor,
  Smartphone,
  HardDrive,
  Cpu,
  Zap,
  Globe,
  User,
  Key,
  Image as ImageIcon,
  Printer,
  Save,
  RefreshCw,
  Clock,
  PlayCircle,
  StopCircle,
  PauseCircle
} from "lucide-react";

/* ===========================
   Types (kept from original)
   =========================== */
interface QuestionAnswerItem { question: string; answer: string; }
interface StepItem { step: number; instruction: string; }
interface InstructionItem { instruction: string; description?: string; }
interface AlgorithmItem { algorithm: string; description: string; }
interface FeatureItem { feature: string; description: string; }
interface ThemeItem { theme: string; description: string; }
interface OptionItem { option: string; description: string; }
interface FieldItem { field: string; description: string; }
interface StepsArrayItem { steps: string[]; }
interface FieldsArrayItem { fields: Array<{ name: string; description: string; }>; }
interface NoteItem { note: string; details?: string; }
interface SettingItem { setting: string; }
type ManualContentItem =
  | QuestionAnswerItem
  | StepItem
  | InstructionItem
  | AlgorithmItem
  | FeatureItem
  | ThemeItem
  | OptionItem
  | FieldItem
  | StepsArrayItem
  | FieldsArrayItem
  | NoteItem
  | SettingItem;

interface ManualSubsection { title: string; items: ManualContentItem[]; }
interface ManualSection { id: string; title: string; icon: React.ComponentType<{ className?: string }>; description: string; subsections: ManualSubsection[]; }

/* ---------------------------
   Type guards (kept)
   --------------------------- */
const isQuestionAnswer = (item: ManualContentItem): item is QuestionAnswerItem => 'question' in item && 'answer' in item;
const isStep = (item: ManualContentItem): item is StepItem => 'step' in item && 'instruction' in item;
const isInstruction = (item: ManualContentItem): item is InstructionItem => 'instruction' in item && !('step' in item);
const isAlgorithm = (item: ManualContentItem): item is AlgorithmItem => 'algorithm' in item && 'description' in item;
const isFeature = (item: ManualContentItem): item is FeatureItem => 'feature' in item && 'description' in item;
const isTheme = (item: ManualContentItem): item is ThemeItem => 'theme' in item && 'description' in item;
const isOption = (item: ManualContentItem): item is OptionItem => 'option' in item && 'description' in item;
const isField = (item: ManualContentItem): item is FieldItem => 'field' in item && 'description' in item;
const isStepsArray = (item: ManualContentItem): item is StepsArrayItem => 'steps' in item;
const isFieldsArray = (item: ManualContentItem): item is FieldsArrayItem => 'fields' in item;
const isNote = (item: ManualContentItem): item is NoteItem => 'note' in item;
const isSetting = (item: ManualContentItem): item is SettingItem => 'setting' in item;

/* ===========================
   Consolidated manualSections
   - I pulled the important headings and helpful content
     from the attached pages and added them here so a user
     can browse everything from one place.
   - Source files used: InstallationGuideDetailed, SystemSetupPage,
     WorkingWithDSecurePage, ReportManagementPage, ScheduleSettingsPage, DSecureFAQPage.
   =========================== */
const manualSections: ManualSection[] = [
  {
    id: "faqs",
    title: "Frequently Asked Questions",
    icon: HelpCircle,
    description: "Common questions and troubleshooting for DSecure operations",
    subsections: [
      {
        title: "General Questions",
        items: [
          { question: "What is DSecure File Eraser?", answer: "DSecure File Eraser is a professional data sanitization software designed to permanently erase files, folders, and system traces beyond recovery using industry-standard algorithms." },
          { question: "What does the demo version do?", answer: "The demo version allows you to scan and preview files, traces, and generate reports. However, actual erasure functionality requires software activation with a valid license key." },
          { question: "Why should I use DSecure File Eraser?", answer: "DSecure provides military-grade data erasure that prevents data recovery, protects privacy, ensures compliance with data protection regulations, and includes features like free space erasure, trace removal, and detailed audit reports." },
          { question: "Does it erase data beyond recovery?", answer: "Yes. DSecure uses industry-standard overwrite algorithms (DoD 5220.22-M, Gutmann, NIST 800-88, etc.) with verification passes to ensure data is permanently destroyed and cannot be recovered by any software or hardware recovery tools." },
          { question: "What if the erasure process stops unexpectedly?", answer: "Check system logs for errors, ensure files aren't locked by other applications, run the software with administrator privileges, verify sufficient disk space, and try resuming or re-running the task. Contact support if the issue persists." },
          { question: "Can I recover files after erasure?", answer: "No. Once files are erased using DSecure's algorithms with verification, they are permanently destroyed and cannot be recovered by any means." }
        ]
      },
      {
        title: "Erasure Process",
        items: [
          { question: "How long does the erasure process take?", answer: "Erasure time depends on: file size, number of files, selected algorithm (more passes = longer time), disk speed, and system resources. Large volumes or advanced algorithms may take several hours." },
          { question: "Can I cancel an ongoing erasure?", answer: "Yes, you can cancel an erasure in progress. However, files already erased cannot be recovered. Files not yet processed will remain intact." },
          { question: "What happens if my computer shuts down during erasure?", answer: "The erasure process will stop. Already erased files cannot be recovered. You can resume the process or start a new erasure task for remaining files when the system restarts." },
          { question: "Why does verification take so long?", answer: "Verification reads every sector that was overwritten to ensure data was properly destroyed. This process is as thorough as the erasure itself and is essential for certified compliance." },
          { question: "Can I use my computer during erasure?", answer: "Yes, but system performance may be affected. For critical erasure tasks, it's recommended to avoid heavy operations during the process to ensure optimal speed and reliability." }
        ]
      },
      {
        title: "File Types & System",
        items: [
          { question: "What types of files can DSecure erase?", answer: "DSecure can erase all file types including documents, images, videos, databases, system files, encrypted files, and hidden files. It also erases file system traces and free space." },
          { question: "Will DSecure erase system files?", answer: "DSecure can erase system files if selected, but this may cause system instability or failure. Always exercise caution and avoid erasing critical OS files unless you know what you're doing." },
          { question: "Can DSecure erase files from external drives?", answer: "Yes. DSecure supports erasure from external hard drives, USB drives, SD cards, and other removable storage devices connected to your computer." }
        ]
      },
      {
        title: "Reports & Cloud Features",
        items: [
          { question: "How do I access erasure reports?", answer: "Navigate to the Reports section in DSecure. You can preview, save to local disk, print, or sync reports to DSecure Cloud Console for centralized management." },
          { question: "Can I customize report formats?", answer: "Yes. DSecure allows you to customize reports with company logo, technician signatures, custom fields, and branding. Access Settings → Report Settings to configure customization options." },
          { question: "What information is included in erasure reports?", answer: "Reports include: Process Status (Success/Failed), Process Mode (Standard/Scheduled), Report Information (Date, User, System), Erasure Summary (Files, Size, Duration), Hardware/Software Info, Process Summary, and detailed Erasure & Validation results with annexures." },
          { question: "How do I sync reports to the cloud?", answer: "Ensure you're logged into DSecure Cloud Console with an active internet connection. Select the reports you want to upload, click 'Send to Cloud', and reports will be synchronized to your cloud account for remote access and management." }
        ]
      }
    ]
  },

  {
    id: "installation",
    title: "Installation Guide",
    icon: BookOpen,
    description: "Step-by-step visual installation instructions and system requirements",
    subsections: [
      {
        title: "System Requirements",
        items: [
          { instruction: "Operating System: Windows 10/11, macOS 10.13+, Linux (Ubuntu 18.04+)", description: "Ensure your OS is updated to the latest version for best compatibility." },
          { instruction: "Memory: Minimum 4GB RAM; Recommended 8GB RAM or higher", description: "More RAM improves performance during large erasure operations." },
          { instruction: "Hard Disk: Minimum 250MB free space for installation", description: "Additional space required for temporary files and reports storage." },
          { instruction: "Processor: Intel Core i3 or equivalent AMD processor", description: "Higher performance processors will speed up erasure and verification processes." },
          { instruction: "Internet Connection: Required for software activation, updates, and cloud sync", description: "Offline operations available after initial activation." }
        ]
      },
      {
        title: "Download & Verification",
        items: [
          { step: 1, instruction: "Visit the official DSecure website at www.dsecuretech.com" },
          { step: 2, instruction: "Navigate to Downloads section and select your operating system version" },
          { step: 3, instruction: "Download the installer package (.dmg for macOS, .exe for Windows, .deb/.rpm for Linux)" },
          { step: 4, instruction: "Verify the downloaded file's checksum to ensure integrity and authenticity" },
          { note: "Always download from official sources to avoid tampered or malicious installers." }
        ]
      },
      {
        title: "Installation Process (macOS)",
        items: [
          { step: 1, instruction: "Locate the downloaded .dmg file in your Downloads folder" },
          { step: 2, instruction: "Double-click the .dmg file to mount the installation package" },
          { step: 3, instruction: "A Finder window will open showing the DSecure app icon and Applications folder shortcut" },
          { step: 4, instruction: "Drag the DSecure icon to the Applications folder" },
          { step: 5, instruction: "Wait for the copy process to complete (progress bar will appear for large files)" },
          { step: 6, instruction: "Eject the mounted .dmg volume by dragging it to Trash or clicking Eject in Finder" },
          { note: "Installation requires administrator privileges. You may be prompted for your password." }
        ]
      },
      {
        title: "Installation Process (Windows)",
        items: [
          { step: 1, instruction: "Locate the downloaded .exe installer in your Downloads folder" },
          { step: 2, instruction: "Right-click the installer and select 'Run as Administrator'" },
          { step: 3, instruction: "Click 'Yes' when Windows User Account Control prompts for permission" },
          { step: 4, instruction: "Follow the installation wizard: Accept license agreement, choose installation directory, select components" },
          { step: 5, instruction: "Click 'Install' to begin installation process" },
          { step: 6, instruction: "Click 'Finish' when installation completes" },
          { note: "Windows Defender or antivirus may scan the installer - this is normal and safe." }
        ]
      },
      {
        title: "First Launch & License Agreement",
        items: [
          { step: 1, instruction: "Open Applications folder (macOS) or Start Menu (Windows) and launch DSecure" },
          { step: 2, instruction: "On first launch, you'll see the License Agreement screen" },
          { step: 3, instruction: "Read the End User License Agreement (EULA) carefully" },
          { step: 4, instruction: "Click 'Accept' to agree to the terms and continue" },
          { step: 5, instruction: "The main application interface will load" },
          { note: "macOS users may see a security prompt asking to allow DSecure. Click 'Open' to proceed.", details: "If the app doesn't open, go to System Preferences → Security & Privacy and click 'Open Anyway'." }
        ]
      }
    ]
  },

  {
    id: "system-setup",
    title: "System Setup & Configuration",
    icon: Cog,
    description: "Grant permissions, configure disk access and verification settings",
    subsections: [
      {
        title: "Full Disk Access (macOS Ventura 13.0+)",
        items: [
          { instruction: "macOS Ventura and later require explicit Full Disk Access permissions for data erasure software to function properly." },
          { step: 1, instruction: "Open System Settings from the Apple menu or Dock" },
          { step: 2, instruction: "Navigate to Privacy & Security → Full Disk Access" },
          { step: 3, instruction: "Click the lock icon at the bottom and enter your administrator password to make changes" },
          { step: 4, instruction: "Click the '+' button to add DSecure to the allowed applications list" },
          { step: 5, instruction: "Browse to Applications folder and select DSecure File Eraser" },
          { step: 6, instruction: "Ensure the toggle switch next to DSecure is enabled (blue/green)" },
          { step: 7, instruction: "Close System Settings and restart DSecure for changes to take effect" },
          { note: "Without Full Disk Access, DSecure cannot access protected system areas and may not function correctly.", details: "The software will show warning messages if permissions are insufficient." }
        ]
      },
      {
        title: "Full Disk Access (macOS Monterey 12.0 & Earlier)",
        items: [
          { instruction: "For macOS versions prior to Ventura, the permission interface is slightly different." },
          { step: 1, instruction: "Open System Preferences from the Apple menu" },
          { step: 2, instruction: "Click on Security & Privacy" },
          { step: 3, instruction: "Select the Privacy tab at the top" },
          { step: 4, instruction: "Scroll down the left sidebar and click 'Full Disk Access'" },
          { step: 5, instruction: "Click the padlock icon and enter your password to unlock settings" },
          { step: 6, instruction: "Click the '+' button below the application list" },
          { step: 7, instruction: "Navigate to /Applications and select DSecure File Eraser" },
          { step: 8, instruction: "Check the box next to DSecure in the list to enable access" },
          { step: 9, instruction: "Restart DSecure application" },
          { note: "Some macOS versions may require a system restart for Full Disk Access changes to fully apply." }
        ]
      },
      {
        title: "Windows Administrator Access",
        items: [
          { instruction: "Windows requires administrator privileges for secure erasure operations and system-level access." },
          { step: 1, instruction: "Right-click the DSecure shortcut on Desktop or Start Menu" },
          { step: 2, instruction: "Select 'Run as Administrator' from the context menu" },
          { step: 3, instruction: "Click 'Yes' when User Account Control (UAC) prompts for permission" },
          { instruction: "To always run DSecure with administrator rights:", description: "Right-click shortcut → Properties → Compatibility tab → Check 'Run this program as an administrator' → Apply → OK" },
          { note: "Running without admin rights may prevent access to system files, locked files, and certain disk areas." }
        ]
      },
      {
        title: "Verification & Interface Settings",
        items: [
          { setting: "Enable Post-Erasure Verification: Validates that data has been properly overwritten by reading and checking every sector. Recommended for compliance and audit purposes." },
          { setting: "Configure UI Theme: Choose between Light Mode, Dark Mode, or System Default. Some report pages force light mode for PDF readability." },
          { setting: "Set Default Algorithm: Select your preferred erasure algorithm (DoD 5220.22-M, Gutmann, NIST 800-88, etc.) from Settings → General." },
          { setting: "Report Customization: Add company logo, technician signatures, and custom fields in Settings → Report Settings." },
          { setting: "Cloud Console Connection: Sign in to DSecure Cloud Console for report synchronization and centralized management." },
          { note: "Verification increases total process time but ensures compliance with data protection standards." }
        ]
      },
      {
        title: "Final Verification Steps",
        items: [
          { step: 1, instruction: "Launch DSecure and verify no permission error messages appear" },
          { step: 2, instruction: "Test file access by adding a test file to the erasure list" },
          { step: 3, instruction: "Check that all features (Erase Files, Erase Free Space, Erase Traces) are accessible" },
          { step: 4, instruction: "Verify cloud connection status if using cloud features" },
          { step: 5, instruction: "Review Settings to ensure all configurations match your requirements" },
          { note: "If any features are inaccessible, revisit permission settings and ensure DSecure is running with proper privileges." }
        ]
      }
    ]
  },

  {
    id: "working",
    title: "Working with DSecure (Operations)",
    icon: Shield,
    description: "How to erase files, free space cleaning, traces, schedules and saving reports",
    subsections: [
      {
        title: "User Interface Overview",
        items: [
          { instruction: "The DSecure main interface contains tabs and buttons for accessing all features:" },
          { steps: [
            "Erase Files & Folders - Select and erase individual files/folders",
            "Erase Free Space - Overwrite unused disk space to remove deleted file traces",
            "Erase Traces - Remove browser history, cookies, temporary files, and system logs",
            "Schedule Erasure - Set up automated recurring erasure tasks",
            "Reports - View, save, and manage erasure reports"
          ]},
          { note: "Each tab provides specific functionality for different erasure scenarios." }
        ]
      },
      {
        title: "Interface Buttons & Options",
        items: [
          { option: "Erase Now", description: "Immediately starts the erasure process for selected items" },
          { option: "Add Items", description: "Browse and select files/folders to add to the erasure list" },
          { option: "Remove", description: "Remove selected items from the erasure list before processing" },
          { option: "Clear List", description: "Remove all items from the current erasure list" },
          { option: "Save Report", description: "Export erasure report to local disk as PDF" },
          { option: "Preview Report", description: "View report summary before saving or sending to cloud" },
          { option: "Send to Cloud", description: "Upload selected reports to DSecure Cloud Console" },
          { option: "Settings", description: "Configure erasure algorithms, report customization, themes, and general preferences" },
          { option: "Activate", description: "Enter license key to unlock full software functionality" },
          { option: "Help", description: "Access user manual, FAQs, and support resources" }
        ]
      },
      {
        title: "Erase Files & Folders",
        items: [
          { instruction: "DSecure File Eraser securely erases files and folders from your system using military-grade algorithms." },
          { step: 1, instruction: "Click the 'Erase Files & Folders' tab in the main interface" },
          { step: 2, instruction: "Click 'Add Items' button or drag and drop files/folders directly into the application window" },
          { step: 3, instruction: "Browse and select files or folders you want to erase permanently" },
          { step: 4, instruction: "Selected items will appear in the erasure list with details (name, path, size)" },
          { step: 5, instruction: "Review the list and remove any items you don't want to erase" },
          { step: 6, instruction: "Click 'Erase Now' to start the erasure process" },
          { step: 7, instruction: "Confirm the action when prompted (erasure cannot be undone)" },
          { step: 8, instruction: "Monitor progress bar and status messages during erasure" },
          { step: 9, instruction: "Once complete, view or save the erasure report for your records" },
          { note: "Files locked by running applications cannot be erased. Close the application or use Force Close option.", details: "System files and protected OS files should not be erased unless you know the consequences." }
        ]
      },
      {
        title: "Erase Free Space",
        items: [
          { instruction: "Erasing free space overwrites all unused disk areas where deleted files may still exist." },
          { step: 1, instruction: "Select 'Erase Free Space' tab from the main interface" },
          { step: 2, instruction: "Choose the drive/volume you want to clean from the dropdown list" },
          { step: 3, instruction: "View available free space and total capacity information" },
          { step: 4, instruction: "Select erasure algorithm from Settings (default or custom algorithm)" },
          { step: 5, instruction: "Click 'Erase Now' to begin free space erasure" },
          { step: 6, instruction: "The process will overwrite all unallocated clusters on the selected drive" },
          { note: "Free space erasure can take several hours depending on drive size and algorithm.", details: "This process prevents recovery of previously deleted files that weren't securely erased." }
        ]
      },
      {
        title: "Erase Traces",
        items: [
          { instruction: "Trace erasure removes browser history, cookies, temporary files, cache, and system logs." },
          { step: 1, instruction: "Navigate to the 'Erase Traces' tab" },
          { step: 2, instruction: "Review the list of trace categories: Internet Activity, Browser History, Cookies, Temporary Files, System Logs, Recent Documents" },
          { step: 3, instruction: "Select checkboxes for the trace types you want to remove" },
          { step: 4, instruction: "Click 'Search & Erase' to scan for traces and display found items" },
          { step: 5, instruction: "Review the scan results showing number of items found in each category" },
          { step: 6, instruction: "Click 'Erase Now' to permanently remove selected traces" },
          { note: "Some traces may belong to currently running applications. Close browsers and apps before erasing traces.", details: "Regular trace erasure helps maintain privacy and free up disk space." }
        ]
      },
      {
        title: "Software Activation",
        items: [
          { instruction: "The demo version allows scanning and preview only. Activation is required for full erasure functionality." },
          { step: 1, instruction: "Click 'Activate' button in the top menu or main interface" },
          { step: 2, instruction: "The Activation window will open with two fields: Name and Activation Key" },
          { step: 3, instruction: "Enter your name or organization name in the 'Name' field" },
          { step: 4, instruction: "Enter the Activation Key exactly as provided in your purchase confirmation email" },
          { step: 5, instruction: "Ensure internet connection is active for online validation" },
          { step: 6, instruction: "Click 'Activate' button to submit activation request" },
          { step: 7, instruction: "Wait for validation to complete (usually takes a few seconds)" },
          { step: 8, instruction: "Upon successful activation, you'll see a confirmation message" },
          { step: 9, instruction: "Restart DSecure to access all unlocked features" },
          { note: "Keep your activation key safe for future reinstallations or system changes." }
        ]
      },
      {
        title: "Activation Troubleshooting",
        items: [
          { instruction: "If activation fails, verify the following:" },
          { steps: [
            "Ensure internet connection is active and stable",
            "Verify the activation key is entered correctly (no extra spaces or characters)",
            "Check that the key matches your operating system (Windows/macOS keys are different)",
            "Confirm the license is not already in use on maximum allowed devices",
            "Disable VPN or proxy that may block activation server connection",
            "Check firewall settings to allow DSecure internet access",
            "Contact support if error persists with your order number and error message"
          ]},
          { note: "Most activation issues are due to typos in the key or internet connectivity problems." }
        ]
      }
    ]
  },

  {
    id: "scheduling",
    title: "Scheduling & Automation",
    icon: Calendar,
    description: "Set up recurring erasure tasks and automation rules",
    subsections: [
      {
        title: "Schedule Erasure Overview",
        items: [
          { instruction: "DSecure File Eraser provides the ability to schedule erasure tasks and periodically clean data automatically." },
          { instruction: "Scheduled tasks help maintain system cleanliness by ensuring unwanted data is removed at regular intervals without manual intervention." },
          { note: "Schedules can be set for trace erasure, free space cleaning, or specific file/folder lists." }
        ]
      },
      {
        title: "Creating a Schedule for Erase Traces",
        items: [
          { step: 1, instruction: "Navigate to the 'Erase Traces' tab in the main interface" },
          { step: 2, instruction: "Select the trace categories you want to include in the scheduled task (Internet Activity, Cookies, Browser History, Temporary Files, System Logs, etc.)" },
          { step: 3, instruction: "Click the 'Schedule' button (calendar icon) instead of 'Erase Now'" },
          { step: 4, instruction: "The Schedule Settings window will open" },
          { step: 5, instruction: "Enter a descriptive name for the scheduled task" },
          { step: 6, instruction: "Select the schedule frequency: Daily, Weekly, Monthly, or One-time" },
          { step: 7, instruction: "Set the start time (hour and minute) for the task to run" },
          { step: 8, instruction: "For Weekly schedules, select the days of the week (Monday through Sunday)" },
          { step: 9, instruction: "For Monthly schedules, select the day of the month (1-31)" },
          { step: 10, instruction: "Set an end date if the schedule should expire, or leave blank for indefinite scheduling" },
          { step: 11, instruction: "Click 'Save Schedule' to create the automated task" },
          { note: "Scheduled tasks run in the background. Ensure the computer is on and DSecure is running at the scheduled time." }
        ]
      },
      {
        title: "Schedule Configuration Options",
        items: [
          { option: "Task Name", description: "Descriptive name to identify the scheduled task in the list" },
          { option: "Frequency", description: "Daily, Weekly, Monthly, or One-time execution" },
          { option: "Start Time", description: "Hour and minute when the task should begin (24-hour format)" },
          { option: "Days of Week", description: "For weekly schedules: Select one or more days (Mon-Sun)" },
          { option: "Day of Month", description: "For monthly schedules: Select date (1-31) when task runs" },
          { option: "End Date", description: "Optional: Set expiration date for the schedule" },
          { option: "Trace Categories", description: "Select which trace types to erase: Internet Activity, Cookies, Browser History, Temp Files, System Logs, Recent Documents, Clipboard Data" },
          { option: "Algorithm", description: "Choose erasure algorithm for the scheduled task (inherits from general settings by default)" },
          { option: "Enable Verification", description: "Enable post-erasure verification for scheduled tasks (increases task duration)" },
          { option: "Generate Report", description: "Automatically generate and save reports after each scheduled execution" },
          { note: "Review and test your schedule configuration before deploying to production environments." }
        ]
      },
      {
        title: "Managing Scheduled Tasks",
        items: [
          { instruction: "View all scheduled tasks from the Schedule Manager interface" },
          { step: 1, instruction: "Click 'Settings' → 'Scheduled Tasks' to open Schedule Manager" },
          { step: 2, instruction: "View list of active, paused, and completed schedules" },
          { step: 3, instruction: "Edit a schedule by selecting it and clicking 'Edit' button" },
          { step: 4, instruction: "Pause a schedule temporarily by clicking 'Pause' (schedule won't run until resumed)" },
          { step: 5, instruction: "Delete a schedule by selecting it and clicking 'Delete'" },
          { step: 6, instruction: "View schedule history and execution logs for troubleshooting" },
          { note: "Paused schedules can be resumed without losing configuration. Deleted schedules cannot be recovered." }
        ]
      },
      {
        title: "Offline Scheduling & Execution",
        items: [
          { instruction: "Scheduled tasks can run offline (without internet connection) for local erasure operations" },
          { instruction: "Cloud report synchronization will be queued and uploaded when internet connection is restored" },
          { instruction: "Ensure system is powered on and not in sleep/hibernation mode at scheduled execution time" },
          { note: "For laptops, configure power settings to prevent sleep during scheduled task windows.", details: "Tasks missed due to system being off will not run retroactively unless configured to do so." }
        ]
      }
    ]
  },

  {
    id: "reports",
    title: "Report Management",
    icon: FileText,
    description: "Preview, customize, save and cloud-sync erasure reports",
    subsections: [
      {
        title: "Report Features Overview",
        items: [
          { instruction: "DSecure File Eraser provides comprehensive erasure reports for all completed and failed processes." },
          { instruction: "Reports include: Process Status, Process Mode (Standard/Scheduled), Report Information, Erasure Summary, Hardware/Software Information, Process Summary, and detailed Erasure & Validation results." },
          { instruction: "Reports can be previewed, saved to local disk, printed, or synchronized to DSecure Cloud Console for centralized management." },
          { note: "To view complete report with annexure details, save the report to your local computer." }
        ]
      },
      {
        title: "Report Contents & Structure",
        items: [
          { field: "Process Status", description: "Indicates if the erasure completed successfully or failed with error details" },
          { field: "Process Mode", description: "Shows whether erasure was run manually (Standard) or via automated Schedule" },
          { field: "Report Information", description: "Report ID, generation date/time, report version, and unique identifier" },
          { field: "Erasure Summary", description: "Total files processed, total data size, duration, algorithm used, verification status" },
          { field: "Hardware Information", description: "Computer name, CPU model, RAM, storage devices, OS version" },
          { field: "Software Information", description: "DSecure version, license type, activation status, installed modules" },
          { field: "Process Summary", description: "Detailed list of erased items with path, size, timestamps, and pass counts" },
          { field: "Erasure & Validation Details", description: "Per-file erasure results, verification pass/fail status, sector-level details" },
          { field: "Annexures", description: "Detailed sector maps, hex dumps, and technical verification data (available in saved reports)" },
          { note: "Reports are digitally protected with unique identifiers to prevent tampering." }
        ]
      },
      {
        title: "Preview Report",
        items: [
          { step: 1, instruction: "Navigate to the 'Reports' tab in the main interface" },
          { step: 2, instruction: "Select the report you want to preview from the list" },
          { step: 3, instruction: "Click 'Preview' button to open the report viewer" },
          { step: 4, instruction: "Review report summary, process status, and key statistics" },
          { step: 5, instruction: "Scroll through sections to view erasure details" },
          { note: "Preview shows summary information. Full annexure details are only available in saved PDF reports.", details: "Preview is useful for quick verification before saving or sending to cloud." }
        ]
      },
      {
        title: "Save Report to Local Disk",
        items: [
          { step: 1, instruction: "From the Reports tab, select the report you want to save" },
          { step: 2, instruction: "Click 'Save Report' button" },
          { step: 3, instruction: "Choose destination folder and enter file name" },
          { step: 4, instruction: "Select format: PDF (recommended for archival) or HTML (for web viewing)" },
          { step: 5, instruction: "Click 'Save' to export the report" },
          { step: 6, instruction: "The complete report with annexures will be saved to the selected location" },
          { note: "PDF reports include all annexure data, digital signatures, and company branding (if configured)." }
        ]
      },
      {
        title: "Send Report to DSecure Cloud",
        items: [
          { instruction: "DSecure allows synchronization of reports to Cloud Console for centralized management and remote access." },
          { step: 1, instruction: "Ensure you are logged into DSecure Cloud Console with active internet connection" },
          { step: 2, instruction: "Navigate to Reports tab and select reports to upload (use Ctrl/Cmd+Click for multiple selection)" },
          { step: 3, instruction: "Click 'Send to Cloud' button" },
          { step: 4, instruction: "Confirm the upload action in the dialog prompt" },
          { step: 5, instruction: "Monitor upload progress (progress bar shows upload status)" },
          { step: 6, instruction: "Success message confirms reports are synced to cloud" },
          { note: "Reports successfully uploaded show green checkmark icon. Failed uploads show red error icon with retry option.", details: "Cloud reports can be accessed from any device logged into your DSecure Cloud account." }
        ]
      },
      {
        title: "Report Customization Settings",
        items: [
          { instruction: "DSecure allows customization of report appearance and content for branding and compliance requirements." },
          { step: 1, instruction: "Go to Settings → Report Settings" },
          { step: 2, instruction: "Click 'Change Report Settings' to open customization panel" },
          { step: 3, instruction: "Configure available customization options (see table below)" },
          { step: 4, instruction: "Click 'Save' to apply changes to future reports" }
        ]
      },
      {
        title: "Report Customization Options",
        items: [
          { option: "Company Logo", description: "Upload company logo (PNG/JPG, max 500KB, recommended 200x100px). Logo appears in report header." },
          { option: "Company Name", description: "Enter company/organization name to display in report footer and header" },
          { option: "Technician Signature", description: "Upload digital signature image for 'Erased By' field (PNG with transparency, max 200KB)" },
          { option: "Validator Signature", description: "Upload validator/approver signature for compliance reports (PNG, max 200KB)" },
          { option: "Custom Header Text", description: "Add custom text/disclaimer to appear at top of each report page" },
          { option: "Custom Footer Text", description: "Add custom text/contact information to appear at bottom of each report page" },
          { option: "Include Annexures", description: "Enable/disable inclusion of detailed annexure data in saved reports (PDF only)" },
          { option: "Report Language", description: "Select language for report generation (English, Spanish, French, German, etc.)" },
          { option: "Date Format", description: "Choose date format: MM/DD/YYYY (US), DD/MM/YYYY (UK), YYYY-MM-DD (ISO)" },
          { option: "Watermark", description: "Add custom watermark text (e.g., 'CONFIDENTIAL') to report pages" },
          { note: "Image files exceeding size limits will be automatically resized. Use high-quality PNG files for best results." }
        ]
      },
      {
        title: "Report Search & Filtering",
        items: [
          { instruction: "DSecure provides extensive search capabilities to quickly find specific reports." },
          { step: 1, instruction: "Navigate to Reports tab" },
          { step: 2, instruction: "Use search bar to enter search criteria: date range, file name, process status, etc." },
          { step: 3, instruction: "Click 'Search' to filter report list" },
          { step: 4, instruction: "Use advanced filters: Process Status (Success/Failed), Mode (Standard/Scheduled), Date Range" },
          { step: 5, instruction: "Sort results by Date, Name, Size, or Status" },
          { note: "Search supports multiple criteria simultaneously for precise filtering of large report archives." }
        ]
      }
    ]
  },

  {
    id: "themes",
    title: "Themes & Interface",
    icon: Palette,
    description: "Customize the look and feel; light & dark modes, branding",
    subsections: [
      {
        title: "Theme Options Overview",
        items: [
          { instruction: "DSecure File Eraser allows you to customize the application's visual appearance by selecting themes and color schemes." },
          { instruction: "Available themes include Light Mode, Dark Mode, and System Default (automatically matches your OS theme)." },
          { note: "Some report pages may force light mode for better readability in printed or PDF documents." }
        ]
      },
      {
        title: "Available Themes",
        items: [
          { theme: "Light Mode", description: "Bright, clean interface with white backgrounds and dark text. Ideal for well-lit environments and reduces eye strain in daylight." },
          { theme: "Dark Mode", description: "Dark backgrounds with light text. Reduces eye strain in low-light conditions and saves battery on OLED screens." },
          { theme: "System Default", description: "Automatically matches your operating system's current theme setting. Changes dynamically when OS theme changes." },
          { theme: "High Contrast", description: "Enhanced contrast mode for accessibility and visibility. Useful for users with visual impairments." },
          { note: "Theme selection is saved per user account and persists across sessions." }
        ]
      },
      {
        title: "How to Change Theme",
        items: [
          { step: 1, instruction: "Click the 'Settings' menu in the top navigation or main interface" },
          { step: 2, instruction: "Select 'General Settings' from the settings menu" },
          { step: 3, instruction: "Navigate to the 'Theme' section" },
          { step: 4, instruction: "Click on the theme dropdown menu to view available options" },
          { step: 5, instruction: "Select your preferred theme: Light, Dark, System Default, or High Contrast" },
          { step: 6, instruction: "The interface will immediately update to reflect the selected theme" },
          { step: 7, instruction: "Click 'Save' to confirm your selection" },
          { note: "Theme changes apply instantly without requiring application restart." }
        ]
      },
      {
        title: "Theme Preview & Testing",
        items: [
          { instruction: "Before saving theme changes, you can preview how different themes look:" },
          { step: 1, instruction: "In Theme settings, hover over or click on a theme option" },
          { step: 2, instruction: "A preview panel shows how the interface will appear with that theme" },
          { step: 3, instruction: "Navigate through different sections to see theme applied across the app" },
          { step: 4, instruction: "Click 'Apply' to test the theme, or 'Cancel' to revert to previous theme" },
          { note: "Preview mode allows testing without committing to permanent theme change." }
        ]
      },
      {
        title: "Custom Branding & White Labeling",
        items: [
          { instruction: "Enterprise and Pro licenses can customize DSecure with company branding:" },
          { option: "Company Logo", description: "Upload company logo to replace DSecure branding in header/footer (PNG/SVG, max 1MB)" },
          { option: "Primary Color", description: "Set custom primary accent color for buttons, highlights, and interactive elements" },
          { option: "Secondary Color", description: "Set secondary color for backgrounds, borders, and subtle UI elements" },
          { option: "Custom CSS", description: "Advanced users can inject custom CSS for complete UI customization" },
          { note: "Branding customization requires Pro or Enterprise license. Contact sales for white-label licensing options." }
        ]
      },
      {
        title: "Theme Best Practices",
        items: [
          { instruction: "Choose Light Mode for: Daytime use, well-lit offices, printing reports, PDF generation, presentations" },
          { instruction: "Choose Dark Mode for: Nighttime use, low-light environments, extended screen time, OLED displays (battery saving)" },
          { instruction: "Choose System Default for: Automatic theme switching based on time of day, consistency with other system apps" },
          { instruction: "Choose High Contrast for: Accessibility requirements, outdoor use in bright sunlight, visual impairments" },
          { note: "Users can switch themes anytime based on environment or preference." }
        ]
      },
      {
        title: "Interface Language Settings",
        items: [
          { instruction: "DSecure supports multiple interface languages:" },
          { step: 1, instruction: "Go to Settings → General Settings → Language" },
          { step: 2, instruction: "Select your preferred language from the dropdown" },
          { step: 3, instruction: "Click 'Apply' to update all interface text to the selected language" },
          { step: 4, instruction: "Some features may require app restart for full language change" },
          { note: "Supported languages: English, Spanish, French, German, Japanese, Chinese, Portuguese, Italian, Dutch, Russian" }
        ]
      }
    ]
  }
];

/* ===========================
   Small helper to search sections
   (keeps the UI responsive)
   =========================== */
const filterSections = (sections: ManualSection[], query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return sections;
  return sections
    .map(section => {
      const matchesSection = section.title.toLowerCase().includes(q) || section.description.toLowerCase().includes(q);
      const subsections = section.subsections
        .map(ss => {
          const matchingItems = ss.items.filter(item => {
            const text = JSON.stringify(item).toLowerCase();
            return text.includes(q);
          });
          return matchingItems.length > 0 ? { ...ss, items: matchingItems } : null;
        })
        .filter(Boolean) as ManualSubsection[];
      if (matchesSection || subsections.length > 0) {
        return { ...section, subsections: subsections.length ? subsections : section.subsections };
      }
      return null;
    })
    .filter(Boolean) as ManualSection[];
};

/* ===========================
   Component
   =========================== */
const CompleteDSecureManual: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState(manualSections[0].id);
  const [activeSubsection, setActiveSubsection] = useState(0);

  const filteredSections = useMemo(() => filterSections(manualSections, searchQuery), [searchQuery]);

  const setActiveContent = (sectionId: string, subsectionIdx: number = 0) => {
    setActiveSection(sectionId);
    setActiveSubsection(subsectionIdx);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Complete DSecure Manual - Unified Help</title>
        <meta name="description" content="All DSecure guides, FAQs, installation, system setup, scheduling and reports in one place." />
      </Helmet>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/support" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowRight className="w-4 h-4 mr-2" />
                Back to Support
              </Link>
              <div className="text-gray-900 font-medium">Complete DSecure Manual</div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  aria-label="Search manual"
                  placeholder="Search manual..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="flex min-h-[600px]">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-200 bg-gray-50">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Sections</h3>
                <nav className="space-y-2">
                  {filteredSections.map(section => (
                    <div key={section.id} className="space-y-1">
                      <button
                        onClick={() => setActiveContent(section.id, 0)}
                        className={`w-full flex items-center space-x-3 p-3 text-left rounded-lg transition-colors ${
                          activeSection === section.id ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <section.icon className="w-5 h-5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{section.title}</div>
                          <div className="text-xs text-gray-500 truncate">{section.description}</div>
                        </div>
                      </button>

                      {/* Subsections */}
                      {activeSection === section.id && section.subsections.length > 1 && (
                        <div className="ml-8 space-y-1">
                          {section.subsections.map((ss, idx) => (
                            <button
                              key={ss.title + idx}
                              onClick={() => setActiveContent(section.id, idx)}
                              className={`w-full text-left p-2 text-sm rounded transition-colors ${
                                activeSection === section.id && activeSubsection === idx ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                              }`}
                            >
                              {ss.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right content */}
            <div className="flex-1 p-6">
              {filteredSections
                .filter(section => section.id === activeSection)
                .map(section => {
                  const sub = section.subsections[activeSubsection] || section.subsections[0];
                  return (
                    <div key={section.id} className="space-y-6">
                      <div className="border-b border-gray-200 pb-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <section.icon className="w-8 h-8 text-blue-600" />
                          <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                        </div>
                        <p className="text-gray-600">{section.description}</p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900">{sub.title}</h3>

                        {/* Section-specific visual headers */}
                        {activeSection === 'installation' && activeSubsection === 0 && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-4">
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div className="flex flex-col items-center">
                                <Monitor className="w-12 h-12 text-blue-600 mb-2" />
                                <span className="text-sm font-medium text-gray-700">Multi-Platform</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <HardDrive className="w-12 h-12 text-green-600 mb-2" />
                                <span className="text-sm font-medium text-gray-700">250MB Required</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Cpu className="w-12 h-12 text-purple-600 mb-2" />
                                <span className="text-sm font-medium text-gray-700">4GB+ RAM</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeSection === 'system-setup' && (
                          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 mb-4">
                            <div className="flex items-center justify-center space-x-8">
                              <div className="text-center">
                                <Lock className="w-16 h-16 text-emerald-600 mx-auto mb-2" />
                                <span className="text-sm font-medium text-gray-700">Full Disk Access</span>
                              </div>
                              <div className="text-4xl text-gray-300">→</div>
                              <div className="text-center">
                                <Shield className="w-16 h-16 text-teal-600 mx-auto mb-2" />
                                <span className="text-sm font-medium text-gray-700">Secure Operations</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeSection === 'working' && activeSubsection === 1 && (
                          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 mb-4">
                            <div className="grid grid-cols-5 gap-2">
                              <div className="text-center">
                                <PlayCircle className="w-8 h-8 text-green-600 mx-auto mb-1" />
                                <span className="text-xs font-medium">Erase Now</span>
                              </div>
                              <div className="text-center">
                                <Download className="w-8 h-8 text-blue-600 mx-auto mb-1" />
                                <span className="text-xs font-medium">Add Items</span>
                              </div>
                              <div className="text-center">
                                <Trash2 className="w-8 h-8 text-red-600 mx-auto mb-1" />
                                <span className="text-xs font-medium">Remove</span>
                              </div>
                              <div className="text-center">
                                <Eye className="w-8 h-8 text-indigo-600 mx-auto mb-1" />
                                <span className="text-xs font-medium">Preview</span>
                              </div>
                              <div className="text-center">
                                <Settings className="w-8 h-8 text-gray-600 mx-auto mb-1" />
                                <span className="text-xs font-medium">Settings</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeSection === 'working' && activeSubsection === 5 && (
                          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 mb-4">
                            <div className="flex items-center justify-center space-x-6">
                              <div className="text-center">
                                <Key className="w-16 h-16 text-amber-600 mx-auto mb-2" />
                                <span className="text-sm font-medium text-gray-700">License Key</span>
                              </div>
                              <div className="text-4xl text-gray-300">+</div>
                              <div className="text-center">
                                <User className="w-16 h-16 text-yellow-600 mx-auto mb-2" />
                                <span className="text-sm font-medium text-gray-700">User Info</span>
                              </div>
                              <div className="text-4xl text-gray-300">=</div>
                              <div className="text-center">
                                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-2" />
                                <span className="text-sm font-medium text-gray-700">Activated</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeSection === 'scheduling' && (
                          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-6 mb-4">
                            <div className="grid grid-cols-4 gap-4 text-center">
                              <div className="flex flex-col items-center">
                                <Clock className="w-10 h-10 text-violet-600 mb-2" />
                                <span className="text-xs font-medium">Daily</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Calendar className="w-10 h-10 text-purple-600 mb-2" />
                                <span className="text-xs font-medium">Weekly</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <RefreshCw className="w-10 h-10 text-indigo-600 mb-2" />
                                <span className="text-xs font-medium">Monthly</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Zap className="w-10 h-10 text-pink-600 mb-2" />
                                <span className="text-xs font-medium">One-time</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeSection === 'reports' && activeSubsection === 1 && (
                          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6 mb-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <FileText className="w-12 h-12 text-cyan-600 mx-auto mb-2" />
                                <span className="text-xs font-medium">Report Data</span>
                              </div>
                              <div className="text-center">
                                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                                <span className="text-xs font-medium">Verification</span>
                              </div>
                              <div className="text-center">
                                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                                <span className="text-xs font-medium">Digital Sign</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeSection === 'reports' && activeSubsection === 6 && (
                          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-6 mb-4">
                            <div className="grid grid-cols-4 gap-3 text-center">
                              <div className="flex flex-col items-center">
                                <ImageIcon className="w-10 h-10 text-pink-600 mb-1" />
                                <span className="text-xs font-medium">Logo</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <User className="w-10 h-10 text-rose-600 mb-1" />
                                <span className="text-xs font-medium">Signature</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Globe className="w-10 h-10 text-red-600 mb-1" />
                                <span className="text-xs font-medium">Language</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <Printer className="w-10 h-10 text-purple-600 mb-1" />
                                <span className="text-xs font-medium">Format</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeSection === 'themes' && activeSubsection === 1 && (
                          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-6 mb-4">
                            <div className="grid grid-cols-2 gap-6">
                              <div className="bg-white border-2 border-gray-300 rounded-lg p-4 text-center">
                                <div className="w-full h-24 bg-white rounded mb-2 flex items-center justify-center">
                                  <Monitor className="w-12 h-12 text-gray-800" />
                                </div>
                                <span className="text-sm font-medium text-gray-900">Light Mode</span>
                              </div>
                              <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 text-center">
                                <div className="w-full h-24 bg-gray-800 rounded mb-2 flex items-center justify-center">
                                  <Monitor className="w-12 h-12 text-gray-100" />
                                </div>
                                <span className="text-sm font-medium text-white">Dark Mode</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          {sub.items.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                              {isQuestionAnswer(item) && (
                                <>
                                  <div className="flex items-start gap-3">
                                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <div className="font-semibold text-gray-800">{item.question}</div>
                                      <div className="text-gray-700 mt-1">{item.answer}</div>
                                    </div>
                                  </div>
                                </>
                              )}

                              {isStep(item) && (
                                <div className="flex items-start gap-4">
                                  <div className="text-sm font-semibold bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">{item.step}</div>
                                  <div className="text-gray-700 flex-1">{item.instruction}</div>
                                </div>
                              )}

                              {isInstruction(item) && (
                                <div className="flex items-start gap-3">
                                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="text-gray-700">{item.instruction}</div>
                                    {item.description ? <div className="text-sm text-gray-500 mt-1">{item.description}</div> : null}
                                  </div>
                                </div>
                              )}

                              {isStepsArray(item) && (
                                <ol className="list-decimal list-inside text-gray-700">
                                  {item.steps.map((s, i) => <li key={i}>{s}</li>)}
                                </ol>
                              )}

                              {isFieldsArray(item) && (
                                <div className="grid md:grid-cols-2 gap-3">
                                  {item.fields.map((f, i) => (
                                    <div key={i} className="p-2 border rounded">
                                      <div className="font-semibold text-gray-800">{f.name}</div>
                                      <div className="text-sm text-gray-600">{f.description}</div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {isNote(item) && (
                                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                                  <div className="flex items-start gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <strong className="text-amber-900">Note:</strong> 
                                      <span className="text-amber-800 ml-1">{item.note}</span>
                                      {item.details ? <div className="text-sm text-amber-700 mt-1">{item.details}</div> : null}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {isSetting(item) && (
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                                  <div className="flex">
                                    <div className="flex-shrink-0">
                                      <Cog className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div className="ml-3">
                                      <p className="text-blue-900 font-medium">{item.setting}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {isOption(item) && (
                                <div className="border-l-4 border-green-400 bg-green-50 p-3 rounded">
                                  <div className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <div className="font-semibold text-gray-800">{item.option}</div>
                                      <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {isField(item) && (
                                <div className="border-l-4 border-purple-400 bg-purple-50 p-3 rounded">
                                  <div className="flex items-start gap-2">
                                    <FileText className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <div className="font-semibold text-gray-800">{item.field}</div>
                                      <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {isTheme(item) && (
                                <div className="border-l-4 border-indigo-400 bg-indigo-50 p-3 rounded">
                                  <div className="flex items-start gap-2">
                                    <Palette className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <div className="font-semibold text-gray-800">{item.theme}</div>
                                      <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                                    </div>
                                  </div>
                                </div>
                              )}

                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              {filteredSections.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No content found matching your search query.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteDSecureManual;
