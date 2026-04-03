import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import {
  BookOpen,
  Layers,
  ClipboardList,
  Settings as Cog,
  Monitor,
  Shield,
  Activity,
  Search,
  ChevronRight,
  AlertCircle,
  Menu,
  X,
  ArrowUp,
  Cpu,
  Database,
  Battery,
  Thermometer,
  LayoutDashboard,
  Users,
  HardDrive,
  CheckCircle,
  FileText,
  Lock,
  Zap,
  Bell,
  Download,
  Info,
  Key,
  Smartphone,
  Gauge
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
    title: "About D-Secure FreezeState",
    content: (
      <>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl mb-8">
          <p className="text-slate-800 leading-relaxed font-medium">
            <strong>D-Secure FreezeState</strong> is a revolutionary Reboot-to-Restore technology designed to make your workstations indestructible. By "freezing" the system state, it ensures that every time a computer restarts, it returns to its pristine, authorized configuration — regardless of what the user did during the session.
          </p>
        </div>
        <p className="text-slate-700 leading-relaxed mb-6">
          Whether it's accidental file deletions, software installations, or malicious changes, <strong>FreezeState</strong> wipes away all session-specific data upon reboot, providing a consistent and secure environment for public labs, schools, and enterprise kiosks.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
           <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                 <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Indestructible Systems</h4>
              <p className="text-sm text-slate-600">Maintain a 100% clean state after every reboot, eliminating user-induced failures.</p>
           </div>
           <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                 <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Real-time Telemetry</h4>
              <p className="text-sm text-slate-600">Smart diagnostics track CPU, RAM, and Disk health directly from the cloud console.</p>
           </div>
        </div>
      </>
    )
  },
  {
    id: "editions",
    number: "2",
    title: "Product Editions & Technologies",
    content: (
      <>
        <p className="text-slate-700 leading-relaxed mb-6">
           D-Secure FreezeState provides two specialized editions tailored for different security and operational requirements:
        </p>
        
        <div className="space-y-8">
           <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                 <Zap className="text-emerald-600 w-8 h-8" />
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Advanced Eraser Edition</h3>
              </div>
              <p className="text-slate-700 mb-4">Designed for high-security environments where data destruction is mandatory. It doesn't just redirect data; it destroys it.</p>
              <ul className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600 font-medium">
                 <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Sector-Wise Pure Permanence</li>
                 <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> NIST 800-88 / DoD Compliance</li>
                 <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> NVMe & SSD Native Support</li>
                 <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" /> Automated Sanitization Reports</li>
              </ul>
           </div>

           <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                 <Activity className="text-blue-600 w-8 h-8" />
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Smart Diagnostic Edition</h3>
              </div>
              <p className="text-slate-700 mb-4">Built for IT fleet management and large-scale workstation monitoring. Combines protection with intelligence.</p>
              <ul className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600 font-medium">
                 <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> 10-Second Status Refresh</li>
                 <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> Live Health Telemetry (RAM/CPU)</li>
                 <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> Persistence Request Workflow</li>
                 <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-500" /> Mobile Ready Admin App</li>
              </ul>
           </div>
        </div>
      </>
    )
  },
  {
    id: "admin-console",
    number: "3",
    title: "Admin Console Interface Deep-Dive",
    children: [
      {
        id: "admin-header",
        number: "3.1",
        title: "Global Header & Actions",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              The <strong>Global Header</strong> (Top Bar) provides persistent access to system-wide utilities and state indicators across all admin pages.
            </p>
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl mb-8">
               <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/dsecure/manual/freeze-state/admin-sidebar-header" alt="Admin Header Detail" className="w-full" />
               <div className="p-6 bg-slate-900 text-white">
                  <h4 className="font-bold mb-4 uppercase tracking-widest text-xs opacity-60">Header Icons Explanation:</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     <div className="flex gap-3">
                        <Info className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                           <p className="font-bold text-sm">System Info</p>
                           <p className="text-xs text-slate-400">View D-Secure version and infrastructure details.</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                           <p className="font-bold text-sm">License Status</p>
                           <p className="text-xs text-slate-400">Track active nodes and expiration alerts.</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <Download className="w-5 h-5 text-amber-400 shrink-0" />
                        <div>
                           <p className="font-bold text-sm">Agent Download</p>
                           <p className="text-xs text-slate-400">Direct links to download installer for Windows/Linux.</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <Key className="w-5 h-5 text-purple-400 shrink-0" />
                        <div>
                           <p className="font-bold text-sm">Key Management</p>
                           <p className="text-xs text-slate-400">Manage and renew your organizational keys.</p>
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
                        <div>
                           <p className="font-bold text-sm">Online Help</p>
                           <p className="text-xs text-slate-400">Access this manual and knowledge base directly.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </>
        )
      },
      {
        id: "admin-sidebar",
        number: "3.2",
        title: "Navigation Sidebar Control",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
              The <strong>Navigation Sidebar</strong> (Left Bar) allows for quick switching between core management modules.
            </p>
            <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
               <div className="space-y-4">
                  {[
                    { icon: <LayoutDashboard size={20} />, title: "Dashboard", desc: "Fleet-wide summary, health alerts, and active license count." },
                    { icon: <Monitor size={20} />, title: "Systems", desc: "Browse full directory of machines, groups, and labs." },
                    { icon: <Activity size={20} />, title: "Activity", desc: "Real-time log of connection heartbeats and protection updates." },
                    { icon: <ClipboardList size={20} />, title: "Reports", desc: "Access sanitization certificates and system audit logs." },
                    { icon: <Cog size={20} />, title: "Settings", desc: "Configure global policies, cleaning modes, and notification rules." },
                  ].map((btn) => (
                    <div key={btn.title} className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-400 transition-all group">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {btn.icon}
                       </div>
                       <div>
                          <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{btn.title}</p>
                          <p className="text-xs text-slate-500 font-medium">{btn.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                  <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                     <AlertCircle className="w-5 h-5 text-blue-600" />
                     Admin Insight:
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                     Har module ke andar context-sensitive actions hote hain. Jaise 'Systems' mein jaane par aap machines ko reboot kar sakte hain ya thaw state mein daal sakte hain.
                  </p>
               </div>
            </div>
          </>
        )
      },
      {
        id: "systems-directory",
        number: "3.3",
        title: "Systems Directory & Grouping",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
               Workstations ko <strong>Labs</strong> aur <strong>Groups</strong> mein organize kiya jata hai taaki fleet-wide commands (Jaise bulk reboot) easily execute ho sakein.
            </p>
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-4 shadow-xl mb-8">
               <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/dsecure/manual/freeze-state/admin-systems-view" alt="Systems View" className="w-full rounded-[2rem]" />
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
               <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-3 mb-2">
                     <CheckCircle className="text-emerald-600" />
                     <p className="font-bold text-emerald-900">Frozen Status</p>
                  </div>
                  <p className="text-sm text-emerald-700">Machine is protected. Every reboot will restore the system.</p>
               </div>
               <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-3 mb-2">
                     <AlertCircle className="text-amber-600" />
                     <p className="font-bold text-amber-900">Thawed Status</p>
                  </div>
                  <p className="text-sm text-amber-700">Protection is suspended. Use this for windows updates or software installs.</p>
               </div>
            </div>
          </>
        )
      },
      {
        id: "policies",
        number: "3.4",
        title: "Policies & Cleaning Standards",
        content: (
          <>
            <p className="text-slate-700 leading-relaxed mb-6">
               Policy configuration determines how thoroughly the system is cleaned upon restart. This is where you configure security compliance.
            </p>
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden mb-8 shadow-lg">
               <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/dsecure/manual/freeze-state/admin-policy-modes" alt="Policy Configuration" className="w-full" />
            </div>
            <div className="prose prose-slate max-w-none">
               <table className="w-full text-left text-sm border-collapse">
                  <thead>
                     <tr className="bg-slate-50">
                        <th className="p-4 border-b">Cleaning Mode</th>
                        <th className="p-4 border-b">Description</th>
                        <th className="p-4 border-b">Security Level</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td className="p-4 border-b font-bold text-blue-600">Shallow Clean</td>
                        <td className="p-4 border-b">Simply discards the redirection pointers. Extremely fast reboot times.</td>
                        <td className="p-4 border-b">Standard</td>
                     </tr>
                     <tr>
                        <td className="p-4 border-b font-bold text-emerald-600">Deep Clean (Advanced)</td>
                        <td className="p-4 border-b">Performs a low-level sector wise overwrite on the modified area using random patterns.</td>
                        <td className="p-4 border-b">Military-Grade</td>
                     </tr>
                     <tr>
                        <td className="p-4 border-b font-bold text-slate-600">Pure Permanence</td>
                        <td className="p-4 border-b">Ensures data is irrecoverable even via forensic lab tools (NIST 800-88 Purge).</td>
                        <td className="p-4 border-b">Ultra-Max</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </>
        )
      },
      {
        id: "reports",
        number: "3.5",
        title: "Reporting & Audit Logs",
        content: (
          <>
             <p className="text-slate-700 leading-relaxed mb-6">
                <strong>Reports Section</strong> helps you generate forensic proof of data destruction. Every 'Deep Clean' generates a cryptographically signed certificate.
             </p>
             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <FileText size={120} />
                </div>
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/dsecure/manual/freeze-state/admin-reports-logs" alt="Reports Logs" className="w-full rounded-2xl mb-6 grayscale hover:grayscale-0 transition-all duration-700 border border-white/10" />
                <div className="flex flex-wrap gap-4">
                   <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-emerald-400">PDF Signed Export</div>
                   <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-blue-400">JSON API Bridge</div>
                   <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-amber-400">Compliance Audit Ready</div>
                </div>
             </div>
          </>
        )
      }
    ]
  },
  {
    id: "endpoint-client",
    number: "4",
    title: "Endpoint Client Interface Guide",
    children: [
      {
        id: "endpoint-header",
        number: "4.1",
        title: "Status & Navigation Icons",
        content: (
          <>
             <p className="text-slate-700 leading-relaxed mb-6">
                The Endpoint Application is designed to be unobtrusive. The <strong>Header</strong> shows the current protection state.
             </p>
             <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-8 shadow-xl">
                <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/dsecure/manual/freeze-state/endpoint-header-status" alt="Endpoint Header Status" className="w-full mb-6" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                      <LayoutDashboard className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                      <p className="text-[10px] font-black uppercase text-blue-900">Activity Log</p>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                      <Cog className="w-5 h-5 text-slate-600 mx-auto mb-2" />
                      <p className="text-[10px] font-black uppercase text-slate-900">Settings</p>
                   </div>
                   <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                      <Info className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                      <p className="text-[10px] font-black uppercase text-emerald-900">Support Info</p>
                   </div>
                   <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center">
                      <Key className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                      <p className="text-[10px] font-black uppercase text-purple-900">Activation</p>
                   </div>
                </div>
             </div>
          </>
        )
      },
      {
        id: "health-metrics",
        number: "4.2",
        title: "System Health Telemetry",
        content: (
          <>
             <p className="text-slate-700 leading-relaxed mb-6">
                Endpoint client continuously monitors hardware health. Smart Diagnostic edition makes this data available in real-time.
             </p>
             <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                   <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/dsecure/manual/freeze-state/endpoint-health-metrics" alt="Endpoint Health Metrics" className="w-full rounded-2xl shadow-lg border border-white" />
                </div>
                <div className="w-full md:w-1/2 space-y-4 text-slate-700 font-medium">
                   <div className="flex items-center gap-3">
                      <Cpu className="text-blue-500" />
                      <p className="text-sm"><strong>CPU Utilization:</strong> Track spikes in processing load.</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <Layers className="text-emerald-500" />
                      <p className="text-sm"><strong>RAM Pressure:</strong> Monitor memory usage to prevent slowdowns.</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <Database className="text-amber-500" />
                      <p className="text-sm"><strong>OS Details:</strong> Windows build and Architecture tracking.</p>
                   </div>
                   <div className="flex items-center gap-3">
                      <HardDrive className="text-indigo-500" />
                      <p className="text-sm"><strong>Disk S.M.A.R.T:</strong> Early warning for drive failures.</p>
                   </div>
                </div>
             </div>
          </>
        )
      },
      {
        id: "persistence-requests",
        number: "4.3",
        title: "User Persistence Flow",
        content: (
          <>
             <p className="text-slate-700 leading-relaxed mb-6">
                Users can request to <strong>Persist</strong> certain files or sessions through the "Request Admin" feature.
             </p>
             <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl mb-8 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 bg-amber-500 text-white rounded-bl-3xl font-black text-[10px] uppercase tracking-widest z-10 group-hover:bg-blue-600 transition-colors">Pending Review</div>
                <div className="flex flex-col md:flex-row gap-8">
                   <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                         <h4 className="font-bold text-slate-800 uppercase tracking-tight">How to Request:</h4>
                         <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
                            <li>Launch Endpoint Dashboard.</li>
                            <li>Click the <strong>Request Admin</strong> button.</li>
                            <li>Enter the reason (e.g., "Install Lab Software").</li>
                            <li>Submit for automated or manual approval.</li>
                         </ol>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs italic text-slate-500 leading-relaxed">
                         "Once approved, the system status will toggle to 'Thawed' until the requested task is complete, allowing changes to be permanently saved."
                      </div>
                   </div>
                   <div className="flex-1">
                      <img src="https://res.cloudinary.com/dhwi5wevf/image/upload/f_auto,q_auto/dsecure/manual/freeze-state/endpoint-main" alt="Endpoint Request Flow" className="w-full rounded-2xl grayscale opacity-50" />
                   </div>
                </div>
             </div>
          </>
        )
      }
    ]
  },
  {
    id: "tech-specs",
    number: "5",
    title: "Technical Specifications & Standards",
    content: (
      <>
        <div className="grid md:grid-cols-2 gap-12 mb-8">
           <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Supported Algorithms</h3>
              <div className="space-y-4">
                 {[
                    { title: "NIST 800-88", val: "Clear, Purge, and Destroy standards." },
                    { title: "DoD 5220.22-M", val: "Standard 3-pass and 7-pass (ECE) wiping." },
                    { title: "Guttman-grade", val: "High-security 35-pass overwrite logic." },
                    { title: "HMG Infosec 5", val: "UK Lower and Higher manual standards." },
                 ].map((algo) => (
                    <div key={algo.title} className="flex justify-between items-start gap-4">
                       <span className="text-xs font-bold text-blue-600 uppercase tracking-widest whitespace-nowrap">{algo.title}</span>
                       <span className="text-sm text-slate-500 font-medium text-right">{algo.val}</span>
                    </div>
                 ))}
              </div>
           </div>
           <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Operation Intervals</h3>
              <div className="space-y-4">
                 {[
                    { title: "Local Telemetry Refresh", val: "Every 10-20 seconds" },
                    { title: "Cloud Command Sync", val: "Every 60 seconds" },
                    { title: "Status Heartbeat", val: "Persistent Socket Tunnel" },
                    { title: "Boot Delay (Shallow)", val: "0 Seconds (Native Logic)" },
                 ].map((spec) => (
                    <div key={spec.title} className="flex justify-between items-start gap-4">
                       <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest whitespace-nowrap">{spec.title}</span>
                       <span className="text-sm text-slate-500 font-medium text-right">{spec.val}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
        
        <div className="p-8 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative border border-white/10 shadow-3xl">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#3b82f630_0%,transparent_100%)]"></div>
           <div className="relative z-10 grid lg:grid-cols-3 gap-12 items-center text-center lg:text-left">
              <div className="lg:col-span-2 space-y-4">
                 <h4 className="text-3xl font-black tracking-tighter uppercase italic">Forensic Integrity Guaranteed</h4>
                 <p className="text-lg text-slate-400 font-medium leading-relaxed">
                    D-Secure FreezeState ensures that every byte of session data is removed beyond physical recovery. Our Advanced Eraser is certified for usage in mission-critical banking, government, and healthcare infrastructure.
                 </p>
              </div>
              <div className="flex justify-center flex-col items-center gap-6">
                 <Shield size={80} className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 whitespace-nowrap">Encryption Grade: AES-256</span>
              </div>
           </div>
        </div>
      </>
    )
  }
];

/* ===========================
   Helper Components
   =========================== */
const useScrollToHash = () => {
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            const yOffset = -100; // Adjustment for sticky headers if any
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 100);
        }
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
};

const SidebarItem: React.FC<{
  item: NavItem;
  activeSection: string;
  onJump: (hash: string) => void;
  level?: number;
}> = ({ item, activeSection, onJump, level = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isActive = activeSection === item.id;

  return (
    <div className={`mb-1 ${level > 0 ? "ml-4" : ""}`}>
      <button
        onClick={() => onJump(`#${item.id}`)}
        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-2 group ${isActive
          ? "bg-blue-50 text-blue-700 font-bold shadow-sm"
          : "text-gray-600 hover:bg-gray-100"
          }`}
      >
        <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] ${isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
          }`}>
          {item.number}
        </span>
        <span className="truncate">{item.title}</span>
        {isActive && <ChevronRight className="w-3 h-3 ml-auto animate-pulse" />}
      </button>

      {hasChildren && (
        <div className="mt-1">
          {item.children!.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              activeSection={activeSection}
              onJump={onJump}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ContentSection: React.FC<{ item: NavItem; level?: number }> = ({ item, level = 1 }) => {
  return (
    <section id={item.id} className={`${level === 1 ? "mb-20 scroll-mt-24" : "mb-16 scroll-mt-24 border-l-2 border-slate-100 pl-8 ml-2"}`}>
      <div className="flex items-center gap-4 mb-8 group">
        <span className={`flex items-center justify-center font-bold font-mono ${level === 1
          ? "w-12 h-12 rounded-2xl bg-slate-900 text-white text-xl shadow-xl group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500"
          : "w-8 h-8 rounded-lg bg-slate-100 text-slate-500 text-xs"
          }`}>
          {item.number}
        </span>
        <div>
          <h2 className={`${level === 1
            ? "text-3xl md:text-4xl font-black text-slate-900 tracking-tight italic"
            : "text-2xl font-black text-slate-800 tracking-tight"
            }`}>
            {item.title}
          </h2>
        </div>
      </div>

      {item.content && (
        <div className="text-slate-700 text-base leading-relaxed space-y-6 prose prose-blue max-w-none">
          {item.content}
        </div>
      )}

      {item.children && (
        <div className="space-y-12 mt-12">
          {item.children.map(child => (
            <ContentSection key={child.id} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </section>
  );
};

const CompleteFreezeStateManual: React.FC = () => {
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
        if (rect.top >= 0 && rect.top <= 400) {
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
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead seo={getSEOForPage("support/help-manual/complete-freeze-state-manual")} />

      {/* Logic Hindi Comments:
         - Navigation Tree se sidebar list generate hoti hai.
         - ContentSection recursion ka use karke child sections ko render karta hai.
         - Scroll detection active navigation item update karta hai.
         - Cloudinary links use kiye gaye hain professional storage ke liye.
      */}

      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 5px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: #f8fafc; border-radius: 10px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* SIDEBAR */}
          <aside className="hidden lg:block lg:w-80 shrink-0">
            <div className="sticky top-10 max-h-[calc(100vh-6rem)] overflow-y-auto sidebar-scroll pr-4 pb-12">
              <div className="mb-8 p-6 bg-slate-900 rounded-3xl text-white shadow-xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                 <h3 className="text-[10px] uppercase font-black tracking-[0.3em] mb-4 text-slate-500">Navigation Manual</h3>
                 <p className="text-xl font-black italic tracking-tight">Quick Index</p>
              </div>
              <nav className="space-y-2">
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
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-8 lg:p-20 relative overflow-hidden">
               {/* Background Accents */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
               <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-60"></div>

               <div className="relative z-10">
                  <header className="mb-20 pb-12 border-b-2 border-slate-50">
                    <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
                      <div className="p-6 bg-slate-900 rounded-[2rem] text-white shadow-3xl shadow-slate-900/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Shield size={48} className="drop-shadow-lg" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                           <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">Help Manual</span>
                           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">v4.0.1 Official</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                          D-Secure <span className="text-blue-600">FreezeState</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-medium">
                          Comprehensive documentation for Reboot-to-Restore & Data Sanitization.
                        </p>
                      </div>
                    </div>
                  </header>

                  <div className="space-y-24">
                    {navigationTree.map(item => (
                      <ContentSection key={item.id} item={item} />
                    ))}
                  </div>

                  <footer className="mt-28 py-16 border-t-2 border-slate-50 text-center">
                    <div className="max-w-md mx-auto space-y-8">
                       <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-200">
                          <AlertCircle size={40} className="text-blue-600 mx-auto mb-4" />
                          <p className="text-slate-900 font-black uppercase tracking-widest text-sm mb-2">Need Live Support?</p>
                          <p className="text-slate-500 italic text-xs mb-6 font-medium">Our technical engineers are available 24/7 for organization deployment assistance.</p>
                          <a href="mailto:support@dsecuretech.com" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">
                            Open Ticket
                          </a>
                       </div>
                       <div className="space-y-4">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.5em]">
                            Automated Cybersecurity Documentation
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">
                            © {new Date().getFullYear()} D-Secure Global Technologies. All security protocols maintained.
                          </p>
                       </div>
                    </div>
                  </footer>
               </div>
            </div>
          </main>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 p-4 rounded-3xl bg-slate-900 text-white shadow-3xl transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-600/20 z-50 group ${shouldShowScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>

      <div className="fixed bottom-10 left-10 hidden md:flex items-center gap-4 z-50">
         <div className="px-5 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-2xl flex items-center gap-4">
            <div className="flex -space-x-2">
               {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">M</div>
               ))}
            </div>
            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">64+ Users Reading New Edition</p>
         </div>
      </div>
    </div>
  );
};

export default CompleteFreezeStateManual;
