import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";

const ScriptingAutomationPage: React.FC = memo(() => {
 return (
 <>
 <Helmet>
 <title>Scripting & Automation | D-Secure Manual</title>
 <meta
 name="description"
 content="D-Secure scripting and automation guide for command-line tools, batch processing, and workflow automation."
 />
 </Helmet>

 <div className="min-h-screen bg-slate-50">
 {/* Header */}
 <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 lg:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <Reveal>
 <div className="text-center">
 <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
 Scripting & <span className="text-emerald-600">Automation</span>
 </h1>
 <p className="text-xl text-slate-700 max-w-3xl mx-auto">
 Automate D-Secure operations through command-line tools, scripting, and workflow integration
 </p>
 </div>
 </Reveal>
 </div>
 </section>

 {/* Content */}
 <section className="py-16 lg:py-20">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <div className="space-y-12">
 {/* Command Line Interface */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
 Command Line Interface
 </h2>
 <div className="space-y-6">
 <div className="bg-slate-900 rounded-lg p-6 text-green-400 font-mono text-sm">
 <div className="mb-4">
 <span className="text-slate-400"># Basic erasure command</span>
 </div>
 <div className="mb-2">D-Secure-cli --device /dev/sda --method dod --verify</div>
 <div className="mb-4">
 <span className="text-slate-400"># Batch operation with configuration file</span>
 </div>
 <div>D-Secure-cli --config batch-config.json --output report.xml</div>
 </div>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-3">
 <h3 className="text-lg font-semibold text-emerald-600">Core Commands</h3>
 <ul className="space-y-1 text-sm text-slate-700">
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">D-Secure-cli</code> - Main CLI tool</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">D-Secure-scan</code> - Device discovery</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">D-Secure-verify</code> - Verification tool</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">D-Secure-report</code> - Report generator</li>
 </ul>
 </div>
 <div className="space-y-3">
 <h3 className="text-lg font-semibold text-teal-600">Common Parameters</h3>
 <ul className="space-y-1 text-sm text-slate-700">
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">--device</code> - Target device</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">--method</code> - Erasure algorithm</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">--verify</code> - Enable verification</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">--output</code> - Report format</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Scripting Languages */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
 Supported Scripting Languages
 </h2>
 <div className="grid md:grid-cols-3 gap-6">
 <div className="bg-emerald-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <span className="text-white font-bold text-lg">PS</span>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">PowerShell</h3>
 <p className="text-sm text-slate-700">Windows automation with PowerShell modules</p>
 </div>
 <div className="bg-teal-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <span className="text-white font-bold text-lg">PY</span>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Python</h3>
 <p className="text-sm text-slate-700">Cross-platform automation with Python SDK</p>
 </div>
 <div className="bg-cyan-50 rounded-lg p-6 text-center">
 <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
 <span className="text-white font-bold text-lg">SH</span>
 </div>
 <h3 className="font-semibold text-slate-900 mb-2">Bash/Shell</h3>
 <p className="text-sm text-slate-700">Unix/Linux shell scripting support</p>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Configuration Files */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
 Configuration Management
 </h2>
 <div className="space-y-6">
 <div className="bg-slate-50 rounded-lg p-6">
 <h3 className="text-lg font-semibold text-slate-900 mb-4">JSON Configuration Example</h3>
 <div className="bg-slate-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
 <pre>{`{
 "operation": {
 "method": "nist-800-88",
 "passes": 3,
 "verify": true
 },
 "devices": [
 "/dev/sda",
 "/dev/sdb"
 ],
 "reporting": {
 "format": "xml",
 "certificate": true,
 "email": "admin@company.com"
 }
}`}</pre>
 </div>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Workflow Integration */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
 Workflow Integration
 </h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-emerald-600">CI/CD Integration</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Jenkins pipeline support</li>
 <li>• GitHub Actions workflows</li>
 <li>• Azure DevOps integration</li>
 <li>• GitLab CI/CD pipelines</li>
 </ul>
 </div>
 <div className="space-y-4">
 <h3 className="text-lg font-semibold text-teal-600">Task Schedulers</h3>
 <ul className="space-y-2 text-slate-700">
 <li>• Windows Task Scheduler</li>
 <li>• Linux cron jobs</li>
 <li>• macOS launchd services</li>
 <li>• Enterprise schedulers</li>
 </ul>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Error Handling */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
 Error Handling & Logging
 </h2>
 <div className="space-y-6">
 <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
 <h3 className="text-lg font-semibold text-slate-900 mb-4">Exit Codes & Logging</h3>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="space-y-3">
 <h4 className="font-medium text-emerald-600">Standard Exit Codes</h4>
 <ul className="space-y-1 text-sm text-slate-700">
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">0</code> - Success</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">1</code> - General error</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">2</code> - Device not found</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">3</code> - Permission denied</li>
 </ul>
 </div>
 <div className="space-y-3">
 <h4 className="font-medium text-teal-600">Log Levels</h4>
 <ul className="space-y-1 text-sm text-slate-700">
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">DEBUG</code> - Detailed information</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">INFO</code> - General information</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">WARN</code> - Warning messages</li>
 <li>• <code className="bg-slate-100 px-2 py-1 rounded">ERROR</code> - Error conditions</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </div>
 </Reveal>

 {/* Performance Metrics */}
 <Reveal>
 <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
 <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
 <span className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">6</span>
 Automation Benefits
 </h2>
 <div className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg p-6">
 <div className="grid md:grid-cols-3 gap-6 text-center">
 <div>
 <div className="text-3xl font-bold text-emerald-600 mb-2">90%</div>
 <p className="text-sm text-slate-700">Time Savings</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-teal-600 mb-2">99.9%</div>
 <p className="text-sm text-slate-700">Accuracy Rate</p>
 </div>
 <div>
 <div className="text-3xl font-bold text-cyan-600 mb-2">24/7</div>
 <p className="text-sm text-slate-700">Unattended Operation</p>
 </div>
 </div>
 </div>
 </div>
 </Reveal>
 </div>
 </div>
 </section>
 </div>
 </>
 );
});

export default ScriptingAutomationPage;