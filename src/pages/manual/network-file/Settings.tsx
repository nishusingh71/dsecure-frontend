import React from "react";
import { Helmet } from "react-helmet-async";
import { Settings as SettingsIcon, AlertCircle, CheckCircle, Shield, Zap, FileX, Sliders } from "lucide-react";

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Settings and Customization - DSecure Network File Manual</title>
        <meta
          name="description"
          content="Configure DSecure File Eraser Network settings including general preferences, erasure algorithms, trace settings, and ignore file lists."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Application Settings and Customization</h1>
          </div>
          <p className="text-lg text-gray-600">
            Customize DSecure File Eraser Network to align with your organization's security policies, compliance requirements, and operational workflows. Fine-tune erasure methods, configure trace removal preferences, and protect critical files from accidental deletion.
          </p>
        </div>

        {/* Settings Overview */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-blue-600" />
            Understanding DSecure Settings
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            DSecure File Eraser Network provides comprehensive configuration options that let you tailor the software's behavior to match your specific security requirements and operational needs. Proper configuration ensures that erasure operations meet compliance standards (GDPR, HIPAA, DoD regulations) while maintaining efficient workflows for your IT team.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Settings are organized into four main categories: General Settings control overall application behavior, Erasure Algorithms determine how data is overwritten, Erase Traces Settings specify what digital footprints to remove, and Ignore File Lists protect important files from accidental erasure. All settings are saved automatically and apply globally across the application unless overridden for specific tasks.
          </p>
          <div className="bg-white rounded-lg border border-blue-300 p-4">
            <p className="font-semibold text-gray-900 mb-2">Accessing Settings:</p>
            <p className="text-gray-700">
              Click the <strong className="text-blue-600">Home</strong> ribbon tab, then click the <strong className="text-blue-600">Settings</strong> button. The Settings dialog opens with tabbed navigation for each category.
            </p>
          </div>
        </section>

        {/* General Settings */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-blue-600 rounded"></span>
            General Settings
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            General Settings control the core operational behavior of DSecure File Eraser Network. These settings affect how the application interacts with your network, performs erasure operations, and presents information to users. Navigate to <strong>Home → Settings → General</strong> tab to configure these options.
          </p>

          <div className="space-y-5">
            <div className="border-l-4 border-blue-500 pl-5 py-3 bg-blue-50/50">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Network Connection Status Check
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Purpose:</strong> Automatically verify network connectivity to target computers before attempting erasure operations.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>How it works:</strong> When enabled, DSecure pings each selected computer to confirm it's online and accessible before initiating file scans or erasure. This prevents wasted time attempting operations on offline machines.
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Recommendation:</strong> Enable this for large networks where computers may be offline. Disable if you're working on a small network where all computers are reliably connected, as it saves a few seconds per operation.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-5 py-3 bg-green-50/50">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Default Erasure Algorithm
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Purpose:</strong> Set the data overwriting method used by default for all erasure operations.
              </p>
             <p className="text-gray-700 mb-2">
                <strong>How it works:</strong> This algorithm is pre-selected whenever you start a new erasure task. You can always change it for specific operations, but having a sensible default speeds up routine work.
              </p>
              <p className="text-gray-600 text-sm mb-2">
                <strong>Most Common Choices:</strong>
              </p>
              <ul className="text-gray-600 text-sm space-y-1 ml-6 list-disc">
                <li><strong>Small Businesses:</strong> DoD 5220.22-M (3 passes) - excellent security, reasonable speed</li>
                <li><strong>Government/Military:</strong> DoD 7-pass or Gutmann (35 passes) - maximum security</li>
                <li><strong>Quick Internal Cleanup:</strong> Zeroes (1 pass) - fast but less secure</li>
                <li><strong>Compliance (NIST):</strong> NIST 800-88 Clear - meets modern data sanitization standards</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-5 py-3 bg-purple-50/50">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Verification Method
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Purpose:</strong> Determine how thoroughly the software verifies that data was properly overwritten after erasure.
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Options Explained:</strong>
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="font-medium text-gray-900">No Verification (Fastest)</p>
                  <p className="text-sm text-gray-600">Skips verification entirely. Use for non-sensitive data where speed is more important than absolute certainty. Erasure still occurs, but you rely on the algorithm without double-checking.</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="font-medium text-gray-900">Random Verification (Balanced)</p>
                  <p className="text-sm text-gray-600">Samples random sectors from erased areas to verify overwriting. Good compromise—catches most issues without significantly impacting time. Recommended for most business use.</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="font-medium text-gray-900">Total Verification (Most Secure)</p>
                  <p className="text-sm text-gray-600">Reads every sector to confirm proper overwriting. Required for highly sensitive data and compliance with strict regulations. Doubles operation time but provides absolute certainty.</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 pl-5 py-3 bg-orange-50/50">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Confirm to Proceed (Safety Dialog)
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Purpose:</strong> Display a final confirmation dialog before irreversible erasure begins.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>How it works:</strong> When enabled, after you select files and click "Erase," a dialog appears asking "Are you sure? This cannot be undone." You must click "Yes, Erase Now" to proceed. This prevents accidental clicks from triggering permanent data loss.
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Recommendation:</strong> Leave enabled for safety, especially if multiple administrators use the software. Experienced power users working on routine tasks may disable it for faster operations, but use caution.
              </p>
            </div>

            <div className="border-l-4 border-teal-500 pl-5 py-3 bg-teal-50/50">
              <h3 className="font-semibold text-gray-900 mb-2">
                Show File Size in Details Pane
              </h3>
              <p className="text-gray-700 mb-2">
                <strong>Purpose:</strong> Display file sizes alongside file names in the browsing interface.
              </p>
              <p className="text-gray-700 mb-2">
                <strong>How it works:</strong> When browsing remote computers' file systems, enabling this adds a "Size" column showing each file's size in KB, MB, or GB. Useful for identifying large files that may take longer to erase.
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Tip:</strong> Enable if you frequently need to estimate erasure times based on file sizes. Disable to declutter the interface if you primarily erase by traces rather than individual files.
              </p>
            </div>
          </div>
        </section>

        {/* Erasure Algorithms */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-green-600 rounded"></span>
            Erasure Algorithms Library
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            DSecure File Eraser Network includes 17+ industry-standard erasure algorithms developed by government agencies, military organizations, and security researchers worldwide. Each algorithm uses different overwriting patterns and pass counts to ensure data cannot be recovered. Choosing the right algorithm balances security needs with time constraints—more passes provide higher security but take proportionally longer.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Complete Algorithm Reference</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white rounded-lg border border-green-300 p-4">
                <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Military & Government Grade
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">DoD 5220.22-M (3 passes ECE)</p>
                    <p className="text-gray-600">US Department of Defense standard. Most popular - excellent security with reasonable speed.</p>
                  </div>
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">DoD 5220.22-M (7 passes)</p>
                    <p className="text-gray-600">Extended DoD standard with additional passes for higher security.</p>
                  </div>
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">DoD 5200.28-STD (7 passes)</p>
                    <p className="text-gray-600">DoD Rainbow Series standard for classified material.</p>
                  </div>
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">US Army AR380-19 (3 passes)</p>
                    <p className="text-gray-600">US Army regulation for handling sensitive information.</p>
                  </div>
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">NATO (7 passes)</p>
                    <p className="text-gray-600">North Atlantic Treaty Organization data sanitization standard.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">AFSSI 5020 (3 passes)</p>
                    <p className="text-gray-600">US Air Force System Security Instruction standard.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-green-300 p-4">
                <h4 className="font-bold text-green-900 mb-3">International Standards</h4>
                <div className="space-y-2 text-sm">
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">NIST 800-88 Clear</p>
                    <p className="text-gray-600">US National Institute of Standards - modern sanitization guideline, widely accepted.</p>
                  </div>
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">GOST R 50739-95</p>
                    <p className="text-gray-600">Russian government standard for information security.</p>
                  </div>
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">German VSITR (7 passes)</p>
                    <p className="text-gray-600">German Federal Office for Information Security standard.</p>
                  </div>
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">British HMG IS5 (3 passes)</p>
                    <p className="text-gray-600">UK Her Majesty's Government infosec standard.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">RCMP TSSIT OPS-II (4 passes)</p>
                    <p className="text-gray-600">Royal Canadian Mounted Police Technical Security Standard.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-green-300 p-4">
                <h4 className="font-bold text-green-900 mb-3">Advanced Algorithms</h4>
                <div className="space-y-2 text-sm">
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">Gutmann (35 passes)</p>
                    <p className="text-gray-600">Most secure option. Developed by Peter Gutmann. Extremely thorough but very slow.</p>
                  </div>
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">Schneier (7 passes)</p>
                    <p className="text-gray-600">Created by cryptographer Bruce Schneier - balanced security.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Pfitzner (33 passes)</p>
                    <p className="text-gray-600">Roy Pfitzner method - very high security with 33 specialized passes.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-green-300 p-4">
                <h4 className="font-bold text-green-900 mb-3">Basic/Fast Algorithms</h4>
                <div className="space-y-2 text-sm">
                  <div className="border-b border-green-200 pb-2">
                    <p className="font-medium text-gray-900">Zeroes (1 pass)</p>
                    <p className="text-gray-600">Overwrites with zeros. Fastest option. Suitable for non-sensitive internal cleanup.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Pseudo-Random (1 pass)</p>
                    <p className="text-gray-600">Overwrites with random data. Slightly better than Zeroes, still very fast.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-amber-900 font-semibold mb-2">Choosing the Right Algorithm</p>
                <p className="text-amber-800 mb-3">
                  <strong>Speed vs. Security Trade-off:</strong> More passes = higher security but longer time. A 100GB hard drive erased with Zeroes (1 pass) might take 30 minutes, while Gutmann (35 passes) could take over 15 hours.
                </p>
                <p className="text-amber-800 text-sm">
                  <strong>General Guidance:</strong> For most business scenarios, DoD 5220.22-M (3 passes) provides excellent security with acceptable speed. Reserve Gutmann and 33-pass methods for exceptionally sensitive data where time is secondary to complete assurance. Single-pass methods are fine for routine cleanup of non-confidential data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Methods */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-purple-600 rounded"></span>
            Verification Methods Explained
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Verification is the process of confirming that data has been properly overwritten after erasure completes. While erasure algorithms are highly reliable, verification provides additional assurance for audit trails and compliance reporting. The verification method you choose impacts total operation time and the level of certainty you receive.
          </p>

          <div className="grid gap-4">
            <div className="border-2 border-gray-300 rounded-xl p-5 hover:border-purple-400 hover:shadow-md transition-all bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex items-start gap-4 mb-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-gray-600 text-white font-bold flex items-center justify-center text-lg">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">No Verification</h3>
                  <p className="text-sm text-gray-600 font-medium">Fastest • No additional time • Lowest certainty</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                The erasure algorithm runs, but no verification pass occurs afterward. The operation completes immediately after the final overwrite pass finishes. You trust that the algorithm worked correctly without double-checking.
              </p>
              <div className="bg-white rounded-lg p-3 border border-gray-300">
                <p className="text-sm font-medium text-gray-900 mb-1">When to use:</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-5">
                  <li>Erasing non-sensitive data (temporary files, caches, non-confidential documents)</li>
                  <li>Time is critical and you need maximum speed</li>
                  <li>Initial cleanup passes before more thorough erasure</li>
                  <li>You have high confidence in your hardware (no known disk errors)</li>
                </ul>
              </div>
            </div>

            <div className="border-2 border-purple-300 rounded-xl p-5 hover:border-purple-500 hover:shadow-md transition-all bg-gradient-to-r from-purple-50 to-purple-100">
              <div className="flex items-start gap-4 mb-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-lg">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Random Verification (Recommended)</h3>
                  <p className="text-sm text-purple-700 font-medium">Balanced • +10-15% time • Good certainty</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                After erasure completes, DSecure randomly samples sectors across the erased area and reads them to verify they contain the expected overwrite pattern. Typically checks 5-10% of total sectors, which catches most potential issues while adding minimal time.
              </p>
              <div className="bg-white rounded-lg p-3 border border-purple-300">
                <p className="text-sm font-medium text-gray-900 mb-1">When to use:</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-5">
                  <li>Most business and corporate data erasure scenarios</li>
                  <li>When you need reasonable assurance without significant time penalty</li>
                  <li>Meets many compliance requirements (GDPR, SOX, HIPAA general provisions)</li>
                  <li>Good balance for daily administrative tasks</li>
                </ul>
                <p className="text-sm text-purple-800 mt-2 font-medium">✓ This is the default recommendation for 90% of use cases</p>
              </div>
            </div>

            <div className="border-2 border-red-300 rounded-xl p-5 hover:border-red-500 hover:shadow-md transition-all bg-gradient-to-r from-red-50 to-pink-50">
              <div className="flex items-start gap-4 mb-3">
                <div className="shrink-0 w-12 h-12 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-lg">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Total Verification (Maximum Security)</h3>
                  <p className="text-sm text-red-700 font-medium">Slowest • +100% time • Absolute certainty</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">
                Reads every single sector in the erased area to confirm proper overwriting. Essentially doubles the operation time since it must read back everything that was written. Provides mathematical certainty that erasure completed correctly—catches even rare hardware errors.
              </p>
              <div className="bg-white rounded-lg p-3 border border-red-300">
                <p className="text-sm font-medium text-gray-900 mb-1">When to use:</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc ml-5">
                  <li>Highly sensitive data (classified information, financial records, healthcare data)</li>
                  <li>Strict compliance requirements (DoD, NIST 800-88 Purge, PCI-DSS highest levels)</li>
                  <li>Legal or forensic scenarios where you need absolute proof</li>
                  <li>When generating audit reports for external regulatory review</li>
                </ul>
                <p className="text-sm text-red-800 mt-2 font-medium">⚠️ Time consideration: 100GB might take 2-4 hours with verification vs. 1-2 hours without</p>
              </div>
            </div>
          </div>
        </section>

        {/* Erase Traces Settings */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-red-600 rounded"></span>
            Erase Traces Configuration
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Digital traces are the footprints left behind by your operating system, applications, and internet browsing. These traces can reveal what files you accessed, websites you visited, applications you used, and searches you performed—even after the original files are deleted. DSecure's Erase Traces feature removes these digital breadcrumbs to protect privacy and comply with data protection regulations. Configure which traces to remove by navigating to <strong>Settings → Erase Traces</strong>.
          </p>

          <div className="space-y-5">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border-2 border-red-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded">INTERNET</span>
                Internet Activity Traces
              </h3>
              <p className="text-gray-700 mb-4">
                Modern web browsers store extensive records of your online activity. Each browser has independent trace storage, so you must configure settings separately for each installed browser. DSecure detects and supports all major browsers automatically.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 border border-red-300">
                  <p className="font-medium text-gray-900 mb-2">Supported Browsers:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Microsoft Edge (Chromium & Legacy)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Google Chrome</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Mozilla Firefox</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Internet Explorer (all versions)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Apple Safari (Windows)</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Opera</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>SeaMonkey</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4 border border-red-300">
                  <p className="font-medium text-gray-900 mb-2">What Gets Erased:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-600" />Browsing history (URLs visited)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-600" />Cache files (images, scripts)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-600" />Cookies and tracking data</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-600" />Download history</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-600" />Saved passwords (optional)</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-600" />Form autofill data</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-red-600" />Session data</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-100 border-l-4 border-amber-500 rounded p-3">
                <p className="text-amber-900 text-sm">
                  <strong>Important:</strong> Close all browsers before erasing traces for best results. Open browsers may regenerate some traces immediately or lock files preventing erasure.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded">APPLICATIONS</span>
                Application Traces
              </h3>
              <p className="text-gray-700 mb-4">
                Desktop applications create traces similar to browsers—recording recent files, search history, and usage patterns. These traces can expose sensitive business information long after the actual files are deleted or moved.
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="font-semibold text-blue-900 mb-2">📧 Email & News Clients</p>
                  <p className="text-sm text-gray-700">Erases recent contacts, search history, and temporary file caches from Outlook, Thunderbird, and similar applications. Does NOT delete actual emails—only traces of email activity.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="font-semibold text-blue-900 mb-2">🔄 P2P File Sharing</p>
                  <p className="text-sm text-gray-700">Removes download histories and shared file lists from BitTorrent clients, eMule, and similar peer-to-peer applications.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="font-semibold text-blue-900 mb-2">📄 Microsoft Office Recent Files</p>
                  <p className="text-sm text-gray-700">Clears the "Recent Documents" list from Word, Excel, PowerPoint, and other Office applications. Prevents others from seeing what files you've been working on.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-300">
                  <p className="font-semibold text-blue-900 mb-2">💬 Chat & Messaging</p>
                  <p className="text-sm text-gray-700">Removes conversation logs, contact lists, and file transfer histories from Skype, Teams, and other messaging applications.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border-2 border-purple-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg flex items-center gap-2">
                <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded">SYSTEM</span>
                Windows System Traces
              </h3>
              <p className="text-gray-700 mb-4">
                Windows operating system creates numerous traces during normal operation. These system-level traces can reveal computer usage patterns, installed software, and file operations performed.
              </p>
              <div className="grid gap-3">
                <div className="bg-white rounded-lg p-3 border border-purple-300 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Recycle Bin</p>
                    <p className="text-sm text-gray-600">Permanently erases all files in Recycle Bin across all drives</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-300 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Temporary Files</p>
                    <p className="text-sm text-gray-600">Cleans Windows Temp folder, user temp, and application temp directories</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-300 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Memory Dumps & Crash Reports</p>
                    <p className="text-sm text-gray-600">Removes crash dump files that may contain sensitive data from RAM</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-300 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Windows Event Logs</p>
                    <p className="text-sm text-gray-600">Clears Application, Security, and System event logs (use carefully—needed for troubleshooting)</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-300 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Most Recently Used (MRU) Lists</p>
                    <p className="text-sm text-gray-600">Removes Windows Recent Items, jump lists, and "run" command history</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-purple-300 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Windows Update Cache</p>
                    <p className="text-sm text-gray-600">Cleans downloaded update files and installation logs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ignore File List */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-orange-600 rounded"></span>
            <FileX className="w-6 h-6 text-orange-600" />
            Ignore File List (Protection)
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            The Ignore File List is a crucial safety feature that protects important files and folders from accidental erasure. Any item you add to this list will be automatically skipped during all erasure operations, regardless of whether it's manually selected or caught in a broader selection. This prevents catastrophic mistakes like erasing critical system files or important business documents. Use this to create a safety net around your most valuable data.
          </p>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 p-6 mb-5">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Adding Items to Ignore List</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center">1</div>
                <div className="flex-1">
                  <p className="text-gray-700 mb-2">
                    <strong>Access the Ignore List:</strong> Navigate to <strong>Home → Settings → Ignore File List</strong> tab
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center">2</div>
                <div className="flex-1">
                  <p className="text-gray-700 mb-2">
                    <strong>Click Add Items:</strong> The Add dialog appears with three protection options
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center">3</div>
                <div className="flex-1">
                  <p className="text-gray-700 mb-3">
                    <strong>Choose Protection Type:</strong> Select how you want to protect files
                  </p>
                  <div className="space-y-3 ml-4">
                    <div className="bg-white rounded-lg p-4 border border-orange-300">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-orange-600" />
                        <p className="font-semibold text-gray-900">By File Extension</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        Protect all files with specific extensions across all locations. Example: Adding <code className="bg-gray-100 px-2 py-1 rounded">.pdf</code> protects all PDF files everywhere.
                      </p>
                      <p className="text-xs text-gray-600">
                        <strong>Best for:</strong> System files (.dll, .sys), important document types (.xlsx, .docx), database files (.mdb, .accdb)
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-orange-300">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-orange-600" />
                        <p className="font-semibold text-gray-900">By Specific File Name</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        Protect files with exact names, regardless of location. Example: Adding <code className="bg-gray-100 px-2 py-1 rounded">important-client-data.xlsx</code> protects that specific file everywhere.
                      </p>
                      <p className="text-xs text-gray-600">
                        <strong>Best for:</strong> Critical configuration files (config.ini), license files (license.dat), unique important documents
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 border border-orange-300">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-orange-600" />
                        <p className="font-semibold text-gray-900">By Folder Name/Path</p>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        Protect entire directories and all their contents. Example: Adding <code className="bg-gray-100 px-2 py-1 rounded">C:\CriticalData</code> protects everything inside.
                      </p>
                      <p className="text-xs text-gray-600">
                        <strong>Best for:</strong> System folders (Windows, Program Files), backup directories, project folders, database directories
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center">4</div>
                <div className="flex-1">
                  <p className="text-gray-700">
                    <strong>Save and Verify:</strong> Click OK to save. The items appear in your ignore list and are immediately protected
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <p className="font-semibold text-blue-900 mb-2">✅ Recommended Additions</p>
              <ul className="text-sm text-blue-800 space-y-1 list-disc ml-5">
                <li>System file extensions: .dll, .sys, .exe (Windows folders)</li>
                <li>Company-specific critical file types</li>
                <li>Database folders: SQL Server data, MySQL data</li>
                <li>Backup directories</li>
                <li>License/activation files</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
              <p className="font-semibold text-green-900 mb-2">🔄 Managing the List</p>
              <ul className="text-sm text-green-800 space-y-1 list-disc ml-5">
                <li>Select any item and click <strong>Remove</strong> to unprotect</li>
                <li>Export list to CSV for backup/documentation</li>
                <li>Share ignore lists across multiple computers</li>
                <li>Review quarterly to remove outdated entries</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-400 rounded-lg p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-7 h-7 text-red-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-red-900 font-bold text-lg mb-2">Critical Warning</p>
                <p className="text-red-800 mb-2">
                  Items in the ignore list are <strong>ALWAYS skipped</strong> during erasure—even if you explicitly select them. This is intentional for safety, but can be confusing if you forget something is on the list.
                </p>
                <p className="text-red-800 text-sm">
                  If you need to erase a protected item, you MUST remove it from the ignore list first. There is no override option to prevent accidental erasure of protected data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <CheckCircle className="w-7 h-7" />
            Settings Best Practices & Recommendations
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <p className="font-semibold mb-2">⚙️ Regular Reviews</p>
              <p className="text-blue-100 text-sm">
                Audit settings quarterly to ensure they align with current security policies and compliance requirements. Update algorithms if new standards are mandated.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <p className="font-semibold mb-2">🎯 Match Security to Data</p>
              <p className="text-blue-100 text-sm">
                Use high-security algorithms (DoD 7-pass, Gutmann) for sensitive data. Use faster algorithms (Zeroes, DoD 3-pass) for routine non-confidential cleanup to save time.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <p className="font-semibold mb-2">📝 Document Configuration</p>
              <p className="text-blue-100 text-sm">
                Screenshot your settings or export configurations for compliance documentation. This proves due diligence during audits.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <p className="font-semibold mb-2">🧪 Test Before Production</p>
              <p className="text-blue-100 text-sm">
                Test new settings on non-critical test data before deploying to production systems. Verify expected results and timing.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <p className="font-semibold mb-2">🛡️ Maintain Ignore Lists</p>
              <p className="text-blue-100 text-sm">
                Keep ignore list updated with critical system paths and business-critical file types. Remove obsolete entries to prevent bloat.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <p className="font-semibold mb-2">👥 Train Administrators</p>
              <p className="text-blue-100 text-sm">
                Ensure all administrators understand the implications of each setting. Misconfigurations can lead to insufficient security or excessive operation times.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
