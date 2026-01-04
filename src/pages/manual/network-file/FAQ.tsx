import React from "react";
import { Helmet } from "react-helmet-async";
import { HelpCircle, ChevronRight } from "lucide-react";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What does DSecure File Eraser Network do?",
      answer: "DSecure File Eraser Network is a comprehensive data erasure solution for network environments. It allows IT administrators to permanently erase files, folders, and digital traces from multiple networked computers simultaneously from a central console. The software uses advanced overwriting algorithms to ensure that deleted data cannot be recovered, even with sophisticated data recovery tools."
    },
    {
      question: "Does DSecure really remove data beyond recovery?",
      answer: "Yes, absolutely. When you use DSecure File Eraser Network with regulated erasure algorithms, the data is permanently destroyed and cannot be recovered. The software overwrites data multiple times with random patterns, making recovery impossible even with specialized forensic tools. All erasure standards used (DoD 5220.22-M, NIST 800-88, Gutmann, etc.) are industry-recognized and comply with international data destruction regulations."
    },
    {
      question: "Which erasure algorithm should I choose?",
      answer: "The choice depends on your security requirements and available time. For most business use: DoD 5220.22-M (3 passes) or DoD 7-pass provides excellent security with reasonable speed. For highly sensitive government or military data: Use Gutmann (35 passes) or DoD 7-pass for maximum security. For compliance with modern standards: NIST 800-88 Clear is recommended. For quick internal cleanups: 1-pass Zeroes is sufficient. Higher pass counts increase security but also increase the time required for erasure."
    },
    {
      question: "Why are administrator credentials required for domain connection?",
      answer: "Administrator credentials are necessary because DSecure File Eraser Network needs elevated permissions to access remote computers on the network, read their file systems, and perform permanent erasure operations. Only domain administrators have the necessary rights to execute these operations across multiple computers. This security measure prevents unauthorized users from erasing data on network computers."
    },
    {
      question: "Should I check network connection status for all computers?",
      answer: "It's recommended to check network connection status before scheduling erasure tasks. This ensures that computers are online and accessible. However, you can skip this check if you're scheduling tasks for later execution. Offline computers will appear in the list but cannot be erased until they're reconnected to the network. The software automatically handles reconnections for scheduled tasks."
    },
    {
      question: "A computer was active but became inaccessible later—why?",
      answer: "This can happen for several reasons: the computer was turned off or went to sleep mode, network connectivity was lost, the computer was removed from the domain, firewall settings were changed to block access, or the user's session credentials expired. Check the computer's power status, network connection, and domain membership. If the issue persists, verify firewall rules and refresh your domain connection in the application."
    },
    {
      question: "Can I erase files on non-domain computers?",
      answer: "DSecure File Eraser Network is specifically designed for domain environments and requires Active Directory integration. For standalone computers not joined to a domain, you would need to use the standalone version of DSecure File Eraser. The network version relies on domain infrastructure for authentication, computer discovery, and remote access."
    },
    {
      question: "If a computer disconnects after scheduling a task, will the task still run?",
      answer: "Scheduled tasks are stored on each individual computer, not centrally. If a computer is offline when the scheduled time arrives, the task will execute when the computer comes back online (for tasks like 'Every Boot') or will be skipped for time-specific tasks. It's best practice to ensure computers remain connected for scheduled erasure tasks to execute as planned."
    },
    {
      question: "How do I activate if my server has no internet connection?",
      answer: "Use the offline activation method: Generate a Registration ID from the application, email it to techsupport@dsecuretech.com along with your Activation Key, receive a License Key file from support (usually within one business day), and import the License Key file into the application to complete activation. See the Licensing section for detailed step-by-step instructions."
    },
    {
      question: "How can I check which licenses are expiring soon?",
      answer: "Go to Activation → Manage Licenses. License pools that are expiring soon are highlighted with warning colors in the list. The interface shows the exact expiry date for each pool. You can sort by expiry date to see which licenses need renewal first. It's recommended to set calendar reminders 30 days before expiration."
    },
    {
      question: "Can I erase selective internet activity traces instead of all?",
      answer: "Yes, absolutely. When you click Erase Traces → Settings, you can choose exactly which types of internet activity to erase for each installed browser. Options include browsing history, cache, cookies, download history, saved passwords, form data, and more. You can also select specific browsers (Chrome, Firefox, Edge, etc.) rather than erasing traces from all browsers."
    },
    {
      question: "Why do some system traces persist even after erasure?",
      answer: "Some system traces may persist if: applications are currently running and have locked access to their trace files, you don't have sufficient permissions to erase certain system files, Windows is actively using the files, or the files are recreated immediately after erasure by running processes. Close all applications before erasing traces and ensure you have administrator privileges for best results."
    },
    {
      question: "Can I exclude specific files or folders from erasure?",
      answer: "Yes, use the Ignore File List feature. Go to Home → Settings → Ignore File List. Here you can add file types (extensions like .pdf, .docx), specific file names, or entire folder names. Any items matching the ignore list will automatically be skipped during erasure operations, even if they're selected. This protects critical files from accidental deletion."
    },
    {
      question: "Can I create duplicate task names for scheduled tasks?",
      answer: "No, each scheduled task must have a unique name. The software prevents duplicate task names to avoid confusion and management issues. Choose descriptive names like 'Daily Temp File Cleanup - Sales Dept' or 'Weekly Browser History Erasure - Legal' to clearly identify each task's purpose and scope."
    },
    {
      question: "How do I disable the confirmation dialog before erasure?",
      answer: "Go to Home → Settings → General Settings. Uncheck the option 'Confirm to Proceed' or 'Show Confirmation Dialog'. After disabling, erasure operations will begin immediately when you click the Erase button without showing a confirmation prompt. Use this feature only if you're confident in your selections, as it removes the final safety check."
    },
    {
      question: "Can I return or reuse a license from one computer to another?",
      answer: "Yes. Go to Activation → Manage Licenses, select the license pool, click View Computers, select the computer you want to deactivate, and click Deactivate License. This frees up one license in the pool that can be used to activate another computer. This is useful when replacing computers or redistributing licenses across your organization."
    },
    {
      question: "How do I get detailed erasure reports?",
      answer: "Erasure reports are automatically generated after every erasure operation. Access them by clicking Home → Reports. You can filter reports by date range and type (Erase Files & Folders or Erase Traces). Each report includes details like computer name, files erased, algorithm used, time taken, success/failure counts, and a unique Report ID for tracking."
    },
    {
      question: "Can I preview or save reports for compliance?",
      answer: "Yes. In the Reports section, select any report and click Action → Preview to view it on-screen. To save, select the report, click Save, choose PDF or XML format, select a destination folder, and click Save. PDF reports are formatted for printing and sharing, while XML reports can be imported into other systems for analysis."
    },
    {
      question: "Can I save multiple reports at once?",
      answer: "Currently, reports must be saved individually—you cannot batch-export multiple reports in one operation. To save multiple reports, select and save each one separately. Alternatively, you can send reports to DSecure Cloud in batch, which provides centralized storage and management of all your erasure reports."
    },
    {
      question: "What should I do if I lose local reports?",
      answer: "If you've been uploading reports to DSecure Cloud, you can access them from the Cloud Console at any time. If you haven't been using Cloud integration, local reports lost due to database corruption or system failure cannot be recovered. To prevent data loss: regularly back up your MariaDB database, enable DSecure Cloud integration and upload reports regularly, export critical reports to PDF and store in a separate location, and configure automated database backups as part of your IT maintenance routine."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Frequently Asked Questions - DSecure Network File Manual</title>
        <meta
          name="description"
          content="Find answers to commonly asked questions about DSecure File Eraser Network."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>
          <p className="text-lg text-gray-600">
            Find answers to the most common questions about DSecure File Eraser Network. If you can't find what you're looking for, contact our support team.
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6 mb-8">
          <p className="text-gray-700 leading-relaxed">
            This FAQ section covers the top 20 questions we receive from DSecure File Eraser Network users. Each answer provides detailed information and links to relevant sections of the manual for more in-depth guidance.
          </p>
        </section>

        {/* FAQ List */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start gap-2">
                      <ChevronRight className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                      <span>{faq.question}</span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <section className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            If your question isn't answered here, we're here to help! Our support team is available through multiple channels.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-700 mb-2">
                Send detailed questions to our technical support team.
              </p>
              <p className="text-blue-600 text-sm font-medium">
                techsupport@dsecuretech.com
              </p>
            </div>

            <div className="border border-green-200 rounded-lg p-4 bg-green-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">Knowledge Base</h3>
              <p className="text-sm text-gray-700 mb-2">
                Browse articles, tutorials, and troubleshooting guides.
              </p>
              <a href="#" className="text-green-600 text-sm font-medium hover:underline">
                Visit Knowledge Base →
              </a>
            </div>

            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-700 mb-2">
                Chat with a technician for real-time assistance.
              </p>
              <a href="#" className="text-purple-600 text-sm font-medium hover:underline">
                Start Chat →
              </a>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-8 bg-gray-100 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Links to Related Topics</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="#installation" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
              <ChevronRight className="w-4 h-4" />
              <span>Installation and Setup Guide</span>
            </a>
            <a href="#licensing" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
              <ChevronRight className="w-4 h-4" />
              <span>Licensing and Activation</span>
            </a>
            <a href="#erasing-files" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
              <ChevronRight className="w-4 h-4" />
              <span>How to Erase Files and Folders</span>
            </a>
            <a href="#reports" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
              <ChevronRight className="w-4 h-4" />
              <span>Working with Reports</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
