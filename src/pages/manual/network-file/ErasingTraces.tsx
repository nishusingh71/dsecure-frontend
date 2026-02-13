import React from "react";
import { Helmet } from "react-helmet-async";
import { Trash2, Globe, Smartphone, HardDrive, CheckCircle, AlertCircle, Search, Mail, MessageSquare, FileText } from "lucide-react";

const ErasingTraces: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Erasing Traces - D-Secure Network File Manual</title>
        <meta
          name="description"
          content="Learn how to erase internet activity, application, and system traces using D-Secure File Eraser Network for complete privacy protection."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-gray-900">Erase Digital Traces and Activity History</h1>
          </div>
          <p className="text-lg text-gray-600">
            Permanently erase internet activity, application usage history, and system traces to protect privacy, prevent data leakage, and free up disk space across network computers.
          </p>
        </div>

        {/* Overview */}
        <section className="bg-gradient-to-r from-red-600 to-rose-600 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Understanding Digital Traces</h2>
          
          <div className="space-y-4">
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-base mb-2">What Are Digital Traces?</h3>
              <p className="text-red-100 leading-relaxed">
                Digital traces are records of your computer activity automatically stored by applications and the operating system. These include browsing history, downloaded files lists, recent documents accessed, application usage logs, temporary cache files, cookies, form data, search queries, and system event logs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Why Erase Traces?</h4>
                <ul className="text-red-100 text-sm space-y-1">
                  <li>• Protect user privacy and confidential browsing</li>
                  <li>• Prevent data leakage of sensitive information</li>
                  <li>• Comply with data retention policies</li>
                  <li>• Free up disk space from cache files</li>
                  <li>• Improve system performance</li>
                </ul>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Trace Categories</h4>
                <ul className="text-red-100 text-sm space-y-1">
                  <li>🌐 Internet activity (browsers)</li>
                  <li>📱 Application usage (email, chat)</li>
                  <li>💾 System traces (Windows logs)</li>
                  <li>📝 Document history (recent files)</li>
                  <li>🗑️ Temporary files and caches</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Erase Traces */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-red-600 rounded"></span>
            Complete Trace Erasure Workflow
          </h2>
          
          <div className="space-y-6">
            {/* Each step with more detail */}
            <div className="border-l-4 border-blue-500 pl-6 py-3 bg-blue-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-lg font-semibold flex items-center justify-center">1</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Select Target Computer</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700">
                  Connect to your domain and navigate to the computer where you want to erase traces. You can select one computer or multiple computers for batch trace erasure.
                </p>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-sm font-medium text-gray-900 mb-1">Selection Options:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Single computer: Click one computer in the list</li>
                    <li>• Multiple computers: Ctrl+Click to select multiple</li>
                    <li>• All in OU: Select entire organizational unit</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-6 py-3 bg-purple-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white text-lg font-semibold flex items-center justify-center">2</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Open Erase Traces Interface</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700">
                  With computers selected, click the <strong>Erase Traces</strong> button in the Home ribbon. The Trace Erasure dialog appears.
                </p>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="text-sm font-medium text-gray-900 mb-1">Interface Elements:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Computer name(s) at top showing selected targets</li>
                    <li>• Settings button to configure trace categories</li>
                    <li>• Scan button to discover traces</li>
                    <li>• Results area showing found traces</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-3 bg-green-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-green-600 text-white text-lg font-semibold flex items-center justify-center">3</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Configure Trace Settings</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700 mb-3">
                  Click <strong>Settings</strong> to customize which trace categories to scan and erase:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Category Selection Strategy</h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="font-medium text-green-900 mb-1">✓ Select All For:</p>
                        <ul className="text-gray-600 space-y-1">
                          <li>• End of employment cleanup</li>
                          <li>• Computer decommissioning</li>
                          <li>• Security incident response</li>
                          <li>• Comprehensive privacy protection</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-green-900 mb-1">∂ Selective For:</p>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Routine maintenance (browsers only)</li>
                          <li>• Specific app cleanup</li>
                          <li>• Performance optimization</li>
                          <li>• Targeted privacy concerns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-6 py-3 bg-orange-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white text-lg font-semibold flex items-center justify-center">4</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Scan for Traces</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700">
                  Click <strong>Scan</strong> to analyze the computer and discover traces matching your configured categories. Scanning duration varies based on system activity and number of applications installed.
                </p>
                
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-orange-600" />
                    Scan Process Details
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">→</span>
                      <div>
                        <strong>Browser Scanning:</strong> Checks each installed browser's data folders for history, cookies, cache files
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">→</span>
                      <div>
                        <strong>Application Scanning:</strong> Searches known locations for email clients, chat apps, P2P software traces
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">→</span>
                      <div>
                        <strong>System Scanning:</strong> Analyzes Windows temp folders, Recycle Bin, event logs, MRU lists
                      </div>
                    </li>
                  </ul>
                  <div className="mt-3 bg-orange-50 rounded p-2 text-sm">
                    <p className="text-orange-900"><strong>Typical Duration:</strong> 30 seconds to 3 minutes depending on trace volume and system speed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-cyan-500 pl-6 py-3 bg-cyan-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-cyan-600 text-white text-lg font-semibold flex items-center justify-center">5</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Review Scan Results</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700">
                  After scanning completes, results display organized by category showing the number and types of traces found. Review carefully to ensure you want to erase these items.
                </p>
                
                <div className="bg-white rounded-lg p-4 border border-cyan-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Results Interpretation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 pb-2 border-b border-cyan-200">
                      <span className="font-medium text-gray-900 w-40">High Count (1000+):</span>
                      <span className="text-gray-600">Normal for browsers with extensive history, temp files accumulation</span>
                    </div>
                    <div className="flex items-center gap-2 pb-2 border-b border-cyan-200">
                      <span className="font-medium text-gray-900 w-40">Medium Count (100-1000):</span>
                      <span className="text-gray-600">Typical for moderate usage, recent cleanup performed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 w-40">Low Count (0-100):</span>
                      <span className="text-gray-600">Recent installation, minimal usage, or already cleaned</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-6 py-3 bg-red-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-red-600 text-white text-lg font-semibold flex items-center justify-center">6</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Execute Trace Erasure</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700 mb-3">
                  Click <strong>Erase Traces</strong> → Confirm in the dialog → Wait for completion. Progress bar shows erasure status.
                </p>
                
                <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4">
                  <p className="text-red-900 font-bold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6" />
                    Important Pre-Erasure Steps
                  </p>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>✓ Close all web browsers on target computer</li>
                    <li>✓ Exit email clients and chat applications</li>
                    <li>✓ Close Microsoft Office applications</li>
                    <li>✓ Terminate any running processes using trace files</li>
                  </ul>
                  <p className="text-red-800 text-sm mt-2">
                    <strong>Why?</strong> Open applications lock trace files preventing erasure. Items may show as "skipped" if applications are running.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internet Activity Traces - EXPANDED */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Globe className="w-7 h-7 text-blue-600" />
            Internet Activity Traces (Browser Data)
          </h2>
          
          <div className="space-y-5">
            <p className="text-gray-700 leading-relaxed">
              D-Secure can erase internet traces from all major web browsers installed on the target computer. Each browser stores traces independently in different locations, requiring specialized cleanup for each.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Supported Browsers</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <h4 className="font-semibold text-blue-900 mb-2">🌐 Chromium-Based</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Microsoft Edge (Chromium)</li>
                    <li>• Google Chrome</li>
                    <li>• Brave, Vivaldi, Opera (Chromium)</li>
                  </ul>
                  <p className="text-xs text-gray-600 mt-2">Share similar data structure, comprehensive cleanup</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <h4 className="font-semibold text-blue-900 mb-2">🦊 Gecko & Other</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Mozilla Firefox</li>
                    <li>• Internet Explorer (legacy)</li>
                    <li>• Microsoft Edge (legacy)</li>
                    <li>• Safari for Windows</li>
                    <li>• SeaMonkey</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Erasable Internet Trace Types</h3>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Browsing History
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">Complete record of visited websites with URLs, titles, visit timestamps, and visit frequency counters.</p>
                  <p className="text-xs text-gray-600"><strong>Privacy Risk:</strong> Reveals all websites visited, including sensitive browsing patterns</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Download History</h4>
                  <p className="text-sm text-gray-700 mb-2">List of all downloaded files with original URLs, download dates, file paths, and file sizes.</p>
                  <p className="text-xs text-gray-600"><strong>Privacy Risk:</strong> Shows what files were downloaded and from where</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Cookies and Site Data</h4>
                  <p className="text-sm text-gray-700 mb-2">Tracking cookies, session cookies, authentication tokens, website preferences, and local storage data.</p>
                  <p className="text-xs text-gray-600"><strong>Privacy Risk:</strong> Can contain login sessions, tracking data, personal preferences</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Cached Images and Files</h4>
                  <p className="text-sm text-gray-700 mb-2">Downloaded website resources stored locally for faster page loading (images, CSS, JavaScript, media files).</p>
                  <p className="text-xs text-gray-600"><strong>Privacy Risk:</strong> Cache can reveal visited sites; uses significant disk space</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Saved Passwords (Optional)</h4>
                  <p className="text-sm text-gray-700 mb-2">Passwords stored in browser password managers for automatic login.</p>
                  <p className="text-xs text-red-600"><strong>⚠️ Caution:</strong> Only erase if user has alternative password storage; cannot be recovered</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Form Autofill Data</h4>
                  <p className="text-sm text-gray-700 mb-2">Saved form entries including names, addresses, phone numbers, email addresses, and other frequently entered data.</p>
                  <p className="text-xs text-gray-600"><strong>Privacy Risk:</strong> Contains personal information that autofills on websites</p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Search History</h4>
                  <p className="text-sm text-gray-700 mb-2">Search queries entered in address bar and search engines with timestamps.</p>
                  <p className="text-xs text-gray-600"><strong>Privacy Risk:</strong> Reveals interests, research topics, and search patterns</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Traces - EXPANDED */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Smartphone className="w-7 h-7 text-purple-600" />
            Application Usage Traces
          </h2>
          
          <div className="space-y-5">
            <p className="text-gray-700 leading-relaxed">
              Desktop applications create various traces recording user activity, recent file access, search history, and usage patterns. These traces can expose sensitive business information and personal activities.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <Mail className="w-6 h-6 text-purple-600" />
                  Email and News Client Traces
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Email applications store extensive traces of communication activity including recent contacts, search queries, and temporary file caches.
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-medium text-gray-900 mb-2">Supported Applications:</p>
                    <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                      <li>• Microsoft Outlook (all versions)</li>
                      <li>• Mozilla Thunderbird</li>
                      <li>• Windows Mail / Mail app</li>
                      <li>• Outlook Express (legacy)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <p className="font-medium text-gray-900 mb-2">Erasable Traces:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Recent contact lists and autocomplete suggestions</li>
                      <li>✓ Email search history</li>
                      <li>✓ Temporary attachment cache files</li>
                      <li>✓ Draft message remnants</li>
                    </ul>
                    <p className="text-xs text-gray-600 mt-2"><strong>Note:</strong> Actual emails in mailboxes are NOT deleted—only usage traces</p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  Chat and Messaging Application Traces
                </h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    Instant messaging and collaboration tools store conversation logs, file transfer histories, and contact interaction records.
                  </p>
                  
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="font-medium text-gray-900 mb-2">Covered Applications:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Microsoft Teams conversation history</li>
                      <li>• Skype chat logs and call history</li>
                      <li>• Slack local cache and search history</li>
                      <li>• Discord cached messages</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-500 bg-green-50 rounded-r-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Microsoft Office Recent Files</h3>
                <p className="text-gray-700 mb-3">
                  Office applications maintain "Recent Documents" lists showing recently opened Word, Excel, PowerPoint, and Access files with full file paths and access timestamps.
                </p>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-700"><strong>Privacy Impact:</strong> Clearing these lists prevents others from seeing what sensitive documents you've been working on, though the actual files remain intact.</p>
                </div>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3">P2P File Sharing Traces</h3>
                <p className="text-gray-700 mb-3">
                  Peer-to-peer applications record download histories, shared file lists, and search queries that can reveal usage patterns.
                </p>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <p className="font-medium text-gray-900 mb-2">Applications Supported:</p>
                  <ul className="text-sm text-gray-700">
                    <li>• BitTorrent clients, eMule, and similar P2P software</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Traces - EXPANDED */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <HardDrive className="w-7 h-7 text-green-600" />
            Windows System Traces
          </h2>
          
          <div className="space-y-5">
            <p className="text-gray-700 leading-relaxed">
              Windows operating system creates numerous traces during normal operation that accumulate over time and can reveal computer usage patterns, installed software, file operations performed, and system events.
            </p>

            <div className="grid gap-4">
              <div className="bg-green-50 rounded-xl border-2 border-green-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Recycle Bin Contents</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Files moved to Recycle Bin remain on disk until manually emptied. D-Secure permanently erases all Recycle Bin contents across all drives.
                  </p>
                  <div className="bg-white rounded-lg p-3 border border-green-300 text-sm">
                    <strong>Coverage:</strong> Empties Recycle Bin on C:, D:, and all other local drives, then securely overwrites the freed space
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Temporary Files</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    Windows and applications create temporary files in multiple locations that often aren't automatically cleaned up.
                  </p>
                  <div className="bg-white rounded-lg p-3 border border-blue-300">
                    <p className="font-medium text-gray-900 mb-2 text-sm">Cleaned Locations:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <code className="bg-blue-100 px-1 rounded">C:\Windows\Temp</code> - System temporary files</li>
                      <li>• <code className="bg-blue-100 px-1 rounded">%UserProfile%\AppData\Local\Temp</code> - User temporary files</li>
                      <li>• <code className="bg-blue-100 px-1 rounded">%Temp%</code> - Environment variable temp folder</li>
                      <li>• Application-specific temp folders</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl border-2 border-purple-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Memory Dumps and Crash Reports</h3>
                <p className="text-gray-700 mb-2">
                  Windows Error Reporting creates memory dump files when applications crash. These can contain sensitive data from RAM at crash time.
                </p>
                <div className="bg-white rounded-lg p-3 border border-purple-300 text-sm">
                  <strong>Security Note:</strong> Memory dumps may contain passwords, encryption keys, or sensitive data from running applications—important to erase for security
                </div>
              </div>

              <div className="bg-red-50 rounded-xl border-2 border-red-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Windows Event Logs</h3>
                <p className="text-gray-700 mb-2">
                  Application, Security, and System event logs recording system activities, login attempts, errors, and warnings.
                </p>
                <div className="bg-red-100 rounded-lg p-3 border-2 border-red-400">
                  <p className="text-red-900 font-semibold mb-1 text-sm">⚠️ Caution When Erasing Event Logs:</p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Needed for troubleshooting system issues</li>
                    <li>• Required for security auditing</li>
                    <li>• May be needed for compliance</li>
                    <li>• Only clear if policy allows and backups exist</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl border-2 border-orange-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Most Recently Used (MRU) Lists</h3>
                <p className="text-gray-700 mb-2">
                  Windows maintains various MRU lists throughout the system showing recently accessed items.
                </p>
                <div className="bg-white rounded-lg p-3 border border-orange-300">
                  <p className="font-medium text-gray-900 mb-2 text-sm">MRU Types Cleared:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Recent Items (Start Menu)</li>
                    <li>• Jump Lists (taskbar recent files)</li>
                    <li>• Run command history</li>
                    <li>• Search history in File Explorer</li>
                    <li>• Network location history</li>
                  </ul>
                </div>
              </div>

              <div className="bg-cyan-50 rounded-xl border-2 border-cyan-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Windows Update Information</h3>
                <p className="text-gray-700">
                  Cleans downloaded update files, installation logs, and update cache to free disk space (typically several GB).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-gradient-to-r from-red-600 to-rose-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-5">Trace Erasure Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-3">Regular Maintenance</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Schedule automatic trace erasure weekly or monthly for privacy maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Combine with file erasure for comprehensive cleanup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Review scan results before erasing to avoid unwanted deletions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-3">Preparation Steps</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Always close all browsers and applications before trace erasure</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Backup important saved passwords before erasing browser data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Notify users before erasing traces on their computers</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-3">Compliance Considerations</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Check data retention policies before erasing event logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Document trace erasure for audit trails</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Save erasure reports for compliance verification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-3">Performance Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Regular trace cleanup frees significant disk space (often 5-20GB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Improves browser and application startup times</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Reduces database corruption risk in browsers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ErasingTraces;
