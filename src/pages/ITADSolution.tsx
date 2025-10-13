// import React from 'react';

// const ITADSolution: React.FC = () => {
//   return (
//     <div className="font-['Inter',_'Segoe_UI',_'Roboto',_sans-serif] text-gray-800 antialiased">
    

//       {/* Hero Section */}
//       <section className="bg-gradient-to-br from-[#f8fafc] via-white to-[#f1f5f9] py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             <div>
//               <div className="inline-block px-4 py-2 bg-blue-50 text-[#2563eb] rounded-full text-sm font-semibold mb-6">
//                 🔒 Secure IT Asset Disposition
//               </div>
//               <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
//                 Secure IT Asset<br />
//                 <span className="text-[#2563eb]">Disposition</span>
//               </h1>
//               <p className="text-lg text-gray-600 mb-8 leading-relaxed">
//                 Comprehensive ITAD solution that helps organizations securely retire, 
//                 sanitize, and dispose of IT assets while maintaining compliance with 
//                 international data security regulations and standards.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="bg-[#2563eb] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#1d4ed8] transition shadow-md hover:shadow-lg">
//                   Get Started
//                 </button>
//                 <button className="border-2 border-[#2563eb] text-[#2563eb] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#2563eb] hover:text-white transition">
//                   Learn More
//                 </button>
//               </div>
//             </div>
//             <div className="hidden md:block">
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-12 shadow-xl">
//                 <div className="text-center">
//                   <div className="text-7xl mb-6">🔒</div>
//                   <h3 className="text-gray-900 text-2xl font-bold mb-2">Secure Asset Disposal</h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Complete Data Erasure for All Devices
//             </h2>
//             <p className="text-gray-600 text-lg max-w-3xl mx-auto">
//               Permanently erase data from drives, computers, servers, and mobile devices with military-grade security
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition border border-gray-100 group">
//               <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition">
//                 <span className="text-3xl">🔐</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Certified Data Erasure</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Military-grade data sanitization using NIST 800-88 and international 
//                 standards for permanent data destruction.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition border border-gray-100 group">
//               <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition">
//                 <span className="text-3xl">📜</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance Certificates</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Generate tamper-proof erasure certificates with detailed audit 
//                 trails for compliance and regulatory requirements.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition border border-gray-100 group">
//               <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition">
//                 <span className="text-3xl">📈</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Asset Lifecycle Management</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Track and manage IT assets from deployment through secure 
//                 disposal with comprehensive reporting and analytics.
//               </p>
//             </div>

//             <div className="bg-white p-8 rounded-2xl text-center hover:shadow-xl transition border border-gray-100 group">
//               <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition">
//                 <span className="text-3xl">♻️</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainable E-Waste</h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Environmentally responsible disposal with maximum asset 
//                 recovery value and reduced carbon footprint.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

     

//       {/* Device Support Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
//             Support for Every Device Type
//           </h2>
//           <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
//             Comprehensive data erasure across all storage media and devices
//           </p>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
//               <div className="text-6xl mb-4">💻</div>
//               <h4 className="text-xl font-bold text-gray-900 mb-2">Computers</h4>
//               <p className="text-gray-600">Desktops, Laptops, Workstations, All-in-One PCs</p>
//             </div>
//             <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
//               <div className="text-6xl mb-4">🖥️</div>
//               <h4 className="text-xl font-bold text-gray-900 mb-2">Servers</h4>
//               <p className="text-gray-600">Physical Servers, Virtual Machines, Cloud Storage</p>
//             </div>
//             <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
//               <div className="text-6xl mb-4">💾</div>
//               <h4 className="text-xl font-bold text-gray-900 mb-2">Storage Media</h4>
//               <p className="text-gray-600">HDDs, SSDs, NVMe, USB Drives, Memory Cards</p>
//             </div>
//             <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
//               <div className="text-6xl mb-4">📱</div>
//               <h4 className="text-xl font-bold text-gray-900 mb-2">Mobile Devices</h4>
//               <p className="text-gray-600">Smartphones, Tablets, IoT Devices</p>
//             </div>
//           </div>
//         </div>
//       </section>



//       {/* Use Cases Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
//             Industry Solutions
//           </h2>
//           <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
//             Tailored ITAD solutions for every industry vertical
//           </p>
          
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-[#2563eb] hover:shadow-xl transition">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Data Centers</h3>
//               <p className="text-gray-600 mb-4 leading-relaxed">
//                 Secure decommissioning of server farms and storage arrays during 
//                 hardware refresh cycles, data center consolidation, or cloud migrations.
//               </p>
//               <ul className="space-y-3">
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">Bulk erasure for thousands of devices simultaneously</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">Comprehensive audit trails and compliance reports</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">On-site and remote erasure capabilities</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-[#2563eb] hover:shadow-xl transition">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Financial Services</h3>
//               <p className="text-gray-600 mb-4 leading-relaxed">
//                 Meet stringent regulatory requirements for customer data protection 
//                 and secure disposal of financial records and transaction data.
//               </p>
//               <ul className="space-y-3">
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">PCI DSS Level 1 compliant erasure methods</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">SOX and Basel III compliance support</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">Verified destruction certificates</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-[#2563eb] hover:shadow-xl transition">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Healthcare Organizations</h3>
//               <p className="text-gray-600 mb-4 leading-relaxed">
//                 Protect patient data privacy with HIPAA-compliant data sanitization 
//                 for medical devices, workstations, and electronic health records.
//               </p>
//               <ul className="space-y-3">
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">HIPAA-certified data erasure processes</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">PHI and ePHI data protection</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">Chain of custody documentation</span>
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-[#2563eb] hover:shadow-xl transition">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">Government & Defense</h3>
//               <p className="text-gray-600 mb-4 leading-relaxed">
//                 Military-grade data destruction for classified information with 
//                 compliance to DoD 5220.22-M and NSA standards.
//               </p>
//               <ul className="space-y-3">
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">Top Secret clearance level security</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">FedRAMP authorized solutions</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="text-[#2563eb] font-bold mr-3 text-xl">✓</span>
//                   <span className="text-gray-700">Classified data handling protocols</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 bg-gradient-to-br from-[#f8fafc] to-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
//             Frequently Asked Questions
//           </h2>
          
//           <div className="space-y-6">
//             <div className="bg-white p-6 rounded-xl border-l-4 border-[#2563eb] hover:shadow-md transition">
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 What is IT Asset Disposition (ITAD)?
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 ITAD is the systematic process of securely disposing, recycling, or repurposing 
//                 end-of-life IT equipment while ensuring complete data destruction, environmental 
//                 responsibility, and regulatory compliance. It includes data sanitization, 
//                 asset remarketing, and responsible recycling.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl border-l-4 border-[#2563eb] hover:shadow-md transition">
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 How secure is your data erasure process?
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Our data erasure solution uses military-grade sanitization algorithms that 
//                 overwrite data multiple times, making recovery impossible even with forensic 
//                 tools. We support NIST 800-88, DoD 5220.22-M, and 15+ international standards, 
//                 all verified with tamper-proof certificates.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl border-l-4 border-[#2563eb] hover:shadow-md transition">
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Which compliance standards do you support?
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 DSecure supports GDPR, HIPAA, SOX, PCI DSS, CCPA, ISO 27001, NIST 800-88, 
//                 Common Criteria, FedRAMP, and industry-specific regulations across 
//                 healthcare, finance, government, and enterprise sectors.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl border-l-4 border-[#2563eb] hover:shadow-md transition">
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Do you provide certificates of data destruction?
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Yes, we generate digitally signed, tamper-proof certificates for every 
//                 erased device containing asset details, erasure method, timestamp, and 
//                 verification results. These certificates serve as legal proof for audits 
//                 and compliance requirements.
//               </p>
//             </div>

//             <div className="bg-white p-6 rounded-xl border-l-4 border-[#2563eb] hover:shadow-md transition">
//               <h3 className="text-xl font-bold text-gray-900 mb-3">
//                 Can you handle large-scale enterprise deployments?
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 Absolutely. Our enterprise solutions support simultaneous erasure of 
//                 thousands of devices with centralized management, automated reporting, 
//                 and integration with existing IT asset management systems. We offer 
//                 both on-site and remote deployment options.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

    

      
    

      
//     </div>
//   );
// };

// export default ITADSolution;






// import React from 'react';

// const ITADSolution: React.FC = () => {
//   return (
//     <div className="font-['Inter',_'Segoe_UI',_'Roboto',_sans-serif] text-gray-800 antialiased bg-white">
      
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 overflow-hidden">
//         {/* Background Decoration */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full text-sm font-semibold shadow-sm">
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                 </svg>
//                 <span>Secure IT Asset Disposition</span>
//               </div>
              
//               <div>
//                 <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
//                   Secure IT Asset
//                   <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                     Disposition
//                   </span>
//                 </h1>
//                 <p className="text-xl text-gray-600 leading-relaxed">
//                   Comprehensive ITAD solution that helps organizations securely retire, 
//                   sanitize, and dispose of IT assets while maintaining compliance with 
//                   international data security regulations.
//                 </p>
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
//                   Get Started
//                   <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </button>
//                 <button className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all">
//                   Learn More
//                 </button>
//               </div>
//             </div>
            
//             {/* Right Image/Illustration */}
//             <div className="hidden md:block">
//               <div className="relative">
//                 {/* Main Card */}
//                 <div className="relative bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
//                   {/* Decorative Elements */}
//                   <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl rotate-12 opacity-20"></div>
//                   <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl -rotate-12 opacity-20"></div>
                  
//                   {/* Content */}
//                   <div className="relative space-y-8">
//                     {/* Icon */}
//                     <div className="flex justify-center">
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-50"></div>
//                         <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
//                           <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Title */}
//                     <div className="text-center space-y-3">
//                       <h3 className="text-2xl font-bold text-gray-900">
//                         Secure Asset Disposal
//                       </h3>
//                       <p className="text-gray-600">
//                         NIST 800-88 Certified Data Erasure
//                       </p>
//                     </div>
                    
//                     {/* Stats */}
//                     <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-blue-600">10M+</div>
//                         <div className="text-xs text-gray-500 mt-1">Devices</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-blue-600">150+</div>
//                         <div className="text-xs text-gray-500 mt-1">Countries</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold text-blue-600">99.9%</div>
//                         <div className="text-xs text-gray-500 mt-1">Success</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               Features
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Complete Data Erasure
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Permanently erase data from all devices with military-grade security
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { icon: '🔐', title: 'Certified Data Erasure', desc: 'Military-grade data sanitization using NIST 800-88 standards.' },
//               { icon: '📜', title: 'Compliance Certificates', desc: 'Tamper-proof certificates with detailed audit trails.' },
//               { icon: '📈', title: 'Asset Management', desc: 'Track assets from deployment through secure disposal.' },
//               { icon: '♻️', title: 'Sustainable E-Waste', desc: 'Environmentally responsible disposal practices.' }
//             ].map((feature, idx) => (
//               <div key={idx} className="group p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-100">
//                 <div className="text-5xl mb-4">{feature.icon}</div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Device Support Section */}
//       <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               Device Support
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Every Device Type
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Comprehensive data erasure across all storage media
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { icon: '💻', title: 'Computers', desc: 'Desktops, Laptops, Workstations' },
//               { icon: '🖥️', title: 'Servers', desc: 'Physical & Virtual Servers' },
//               { icon: '💾', title: 'Storage Media', desc: 'HDDs, SSDs, USB Drives' },
//               { icon: '📱', title: 'Mobile Devices', desc: 'Smartphones, Tablets' }
//             ].map((device, idx) => (
//               <div key={idx} className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all">
//                 <div className="text-6xl mb-4">{device.icon}</div>
//                 <h4 className="text-xl font-bold text-gray-900 mb-2">{device.title}</h4>
//                 <p className="text-gray-600 text-sm">{device.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Industry Solutions Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               Industry Solutions
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Tailored for Your Industry
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Specialized ITAD solutions for every sector
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 gap-6">
//             {[
//               {
//                 title: 'Enterprise Data Centers',
//                 desc: 'Secure decommissioning during hardware refresh cycles and cloud migrations.',
//                 features: ['Bulk erasure capabilities', 'Comprehensive audit trails', 'On-site & remote options']
//               },
//               {
//                 title: 'Financial Services',
//                 desc: 'Meet regulatory requirements for customer data protection and secure disposal.',
//                 features: ['PCI DSS Level 1 compliant', 'SOX compliance support', 'Verified certificates']
//               },
//               {
//                 title: 'Healthcare Organizations',
//                 desc: 'HIPAA-compliant data sanitization for medical devices and health records.',
//                 features: ['HIPAA-certified erasure', 'PHI data protection', 'Chain of custody docs']
//               },
//               {
//                 title: 'Government & Defense',
//                 desc: 'Military-grade destruction with DoD 5220.22-M and NSA standards compliance.',
//                 features: ['Top Secret clearance', 'FedRAMP authorized', 'Classified data handling']
//               }
//             ].map((solution, idx) => (
//               <div key={idx} className="p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all border border-gray-100">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h3>
//                 <p className="text-gray-600 mb-6">{solution.desc}</p>
//                 <ul className="space-y-2">
//                   {solution.features.map((feature, fidx) => (
//                     <li key={fidx} className="flex items-center text-sm text-gray-700">
//                       <svg className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
//               FAQ
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Common Questions
//             </h2>
//             <p className="text-lg text-gray-600">
//               Everything you need to know about ITAD
//             </p>
//           </div>
          
//           <div className="space-y-4">
//             {[
//               {
//                 q: 'What is IT Asset Disposition (ITAD)?',
//                 a: 'ITAD is the systematic process of securely disposing, recycling, or repurposing end-of-life IT equipment while ensuring complete data destruction, environmental responsibility, and regulatory compliance.'
//               },
//               {
//                 q: 'How secure is your data erasure process?',
//                 a: 'Our solution uses military-grade sanitization algorithms that overwrite data multiple times. We support NIST 800-88, DoD 5220.22-M, and 15+ international standards, all verified with tamper-proof certificates.'
//               },
//               {
//                 q: 'Which compliance standards do you support?',
//                 a: 'DSecure supports GDPR, HIPAA, SOX, PCI DSS, CCPA, ISO 27001, NIST 800-88, Common Criteria, FedRAMP, and industry-specific regulations across multiple sectors.'
//               },
//               {
//                 q: 'Do you provide certificates of data destruction?',
//                 a: 'Yes, we generate digitally signed, tamper-proof certificates for every erased device with complete asset details, erasure method, timestamp, and verification results.'
//               },
//               {
//                 q: 'Can you handle large-scale enterprise deployments?',
//                 a: 'Absolutely. Our solutions support simultaneous erasure of thousands of devices with centralized management, automated reporting, and integration with existing systems.'
//               }
//             ].map((faq, idx) => (
//               <details key={idx} className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
//                 <summary className="flex items-center justify-between cursor-pointer list-none">
//                   <span className="text-lg font-semibold text-gray-900">{faq.q}</span>
//                   <svg className="w-5 h-5 text-blue-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </summary>
//                 <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
//               </details>
//             ))}
//           </div>
//         </div>
//       </section>

     
//     </div>
//   );
// };

// export default ITADSolution;




// import React from 'react';

// const ITADSolution: React.FC = () => {
//   return (
//     <div className="font-['Inter',_'Segoe_UI',_'Roboto',_sans-serif] antialiased" style={{ backgroundColor: '#ffffff', color: '#1f2937' }}>
      
//       {/* Hero Section */}
//       <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#e8f5e9' }}>
//         {/* Background Decoration */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
//           <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               <div className="inline-flex items-center space-x-2 px-4 py-2 backdrop-blur-sm rounded-full text-sm font-semibold shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.8)', color: '#059669' }}>
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                 </svg>
//                 <span>Secure IT Asset Disposition</span>
//               </div>
              
//               <div>
//                 <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: '#1f2937' }}>
//                   Secure IT Asset
//                   <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                     Disposition
//                   </span>
//                 </h1>
//                 <p className="text-xl leading-relaxed" style={{ color: '#4b5563' }}>
//                   Comprehensive ITAD solution that helps organizations securely retire, 
//                   sanitize, and dispose of IT assets while maintaining compliance with 
//                   international data security regulations.
//                 </p>
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="inline-flex items-center justify-center text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" style={{ backgroundColor: '#059669' }}>
//                   Get Started
//                   <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </button>
//                 <button className="inline-flex items-center justify-center border-2 px-8 py-4 rounded-lg font-semibold transition-all" style={{ borderColor: '#059669', color: '#059669' }}>
//                   Learn More
//                 </button>
//               </div>
//             </div>
            
//             {/* Right Image/Illustration */}
//             <div className="hidden md:block">
//               <div className="relative">
//                 {/* Main Card */}
//                 <div className="relative rounded-3xl shadow-2xl p-10 border" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}>
//                   {/* Decorative Elements */}
//                   <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl rotate-12 opacity-20"></div>
//                   <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl -rotate-12 opacity-20"></div>
                  
//                   {/* Content */}
//                   <div className="relative space-y-8">
//                     {/* Icon */}
//                     <div className="flex justify-center">
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-50"></div>
//                         <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
//                           <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
                    
//                     {/* Title */}
//                     <div className="text-center space-y-3">
//                       <h3 className="text-2xl font-bold" style={{ color: '#1f2937' }}>
//                         Secure Asset Disposal
//                       </h3>
//                       <p style={{ color: '#6b7280' }}>
//                         NIST 800-88 Certified Data Erasure
//                       </p>
//                     </div>
                    
//                     {/* Stats */}
//                     <div className="grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: '#e5e7eb' }}>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold" style={{ color: '#059669' }}>10M+</div>
//                         <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>Devices</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold" style={{ color: '#059669' }}>150+</div>
//                         <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>Countries</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-2xl font-bold" style={{ color: '#059669' }}>99.9%</div>
//                         <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>Success</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#e8f5e9', color: '#059669' }}>
//               Features
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1f2937' }}>
//               Complete Data Erasure
//             </h2>
//             <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
//               Permanently erase data from all devices with military-grade security
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { icon: '🔐', title: 'Certified Data Erasure', desc: 'Military-grade data sanitization using NIST 800-88 standards.' },
//               { icon: '📜', title: 'Compliance Certificates', desc: 'Tamper-proof certificates with detailed audit trails.' },
//               { icon: '📈', title: 'Asset Management', desc: 'Track assets from deployment through secure disposal.' },
//               { icon: '♻️', title: 'Sustainable E-Waste', desc: 'Environmentally responsible disposal practices.' }
//             ].map((feature, idx) => (
//               <div key={idx} className="group p-6 rounded-2xl hover:shadow-lg transition-all border border-transparent hover:border-blue-100" style={{ backgroundColor: '#f9fafb' }}>
//                 <div className="text-5xl mb-4">{feature.icon}</div>
//                 <h3 className="text-lg font-bold mb-2" style={{ color: '#1f2937' }}>{feature.title}</h3>
//                 <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Device Support Section */}
//       <section className="py-20 bg-gradient-to-b" style={{ background: 'linear-gradient(to bottom, #f9fafb, #ffffff)' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#e8f5e9', color: '#059669' }}>
//               Device Support
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1f2937' }}>
//               Every Device Type
//             </h2>
//             <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
//               Comprehensive data erasure across all storage media
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { icon: '💻', title: 'Computers', desc: 'Desktops, Laptops, Workstations' },
//               { icon: '🖥️', title: 'Servers', desc: 'Physical & Virtual Servers' },
//               { icon: '💾', title: 'Storage Media', desc: 'HDDs, SSDs, USB Drives' },
//               { icon: '📱', title: 'Mobile Devices', desc: 'Smartphones, Tablets' }
//             ].map((device, idx) => (
//               <div key={idx} className="text-center p-8 rounded-2xl shadow-sm hover:shadow-md transition-all" style={{ backgroundColor: '#ffffff' }}>
//                 <div className="text-6xl mb-4">{device.icon}</div>
//                 <h4 className="text-xl font-bold mb-2" style={{ color: '#1f2937' }}>{device.title}</h4>
//                 <p className="text-sm" style={{ color: '#6b7280' }}>{device.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Industry Solutions Section */}
//       <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#e8f5e9', color: '#059669' }}>
//               Industry Solutions
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1f2937' }}>
//               Tailored for Your Industry
//             </h2>
//             <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
//               Specialized ITAD solutions for every sector
//             </p>
//           </div>
          
//           <div className="grid md:grid-cols-2 gap-6">
//             {[
//               {
//                 title: 'Enterprise Data Centers',
//                 desc: 'Secure decommissioning during hardware refresh cycles and cloud migrations.',
//                 features: ['Bulk erasure capabilities', 'Comprehensive audit trails', 'On-site & remote options']
//               },
//               {
//                 title: 'Financial Services',
//                 desc: 'Meet regulatory requirements for customer data protection and secure disposal.',
//                 features: ['PCI DSS Level 1 compliant', 'SOX compliance support', 'Verified certificates']
//               },
//               {
//                 title: 'Healthcare Organizations',
//                 desc: 'HIPAA-compliant data sanitization for medical devices and health records.',
//                 features: ['HIPAA-certified erasure', 'PHI data protection', 'Chain of custody docs']
//               },
//               {
//                 title: 'Government & Defense',
//                 desc: 'Military-grade destruction with DoD 5220.22-M and NSA standards compliance.',
//                 features: ['Top Secret clearance', 'FedRAMP authorized', 'Classified data handling']
//               }
//             ].map((solution, idx) => (
//               <div key={idx} className="p-8 rounded-2xl hover:shadow-lg transition-all border" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
//                 <h3 className="text-2xl font-bold mb-3" style={{ color: '#1f2937' }}>{solution.title}</h3>
//                 <p className="mb-6" style={{ color: '#6b7280' }}>{solution.desc}</p>
//                 <ul className="space-y-2">
//                   {solution.features.map((feature, fidx) => (
//                     <li key={fidx} className="flex items-center text-sm" style={{ color: '#4b5563' }}>
//                       <svg className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: '#059669' }} fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                       </svg>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 bg-gradient-to-b" style={{ background: 'linear-gradient(to bottom, #f9fafb, #ffffff)' }}>
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#e8f5e9', color: '#059669' }}>
//               FAQ
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1f2937' }}>
//               Common Questions
//             </h2>
//             <p className="text-lg" style={{ color: '#6b7280' }}>
//               Everything you need to know about ITAD
//             </p>
//           </div>
          
//           <div className="space-y-4">
//             {[
//               {
//                 q: 'What is IT Asset Disposition (ITAD)?',
//                 a: 'ITAD is the systematic process of securely disposing, recycling, or repurposing end-of-life IT equipment while ensuring complete data destruction, environmental responsibility, and regulatory compliance.'
//               },
//               {
//                 q: 'How secure is your data erasure process?',
//                 a: 'Our solution uses military-grade sanitization algorithms that overwrite data multiple times. We support NIST 800-88, DoD 5220.22-M, and 15+ international standards, all verified with tamper-proof certificates.'
//               },
//               {
//                 q: 'Which compliance standards do you support?',
//                 a: 'DSecure supports GDPR, HIPAA, SOX, PCI DSS, CCPA, ISO 27001, NIST 800-88, Common Criteria, FedRAMP, and industry-specific regulations across multiple sectors.'
//               },
//               {
//                 q: 'Do you provide certificates of data destruction?',
//                 a: 'Yes, we generate digitally signed, tamper-proof certificates for every erased device with complete asset details, erasure method, timestamp, and verification results.'
//               },
//               {
//                 q: 'Can you handle large-scale enterprise deployments?',
//                 a: 'Absolutely. Our solutions support simultaneous erasure of thousands of devices with centralized management, automated reporting, and integration with existing systems.'
//               }
//             ].map((faq, idx) => (
//               <details key={idx} className="group rounded-xl p-6 shadow-sm hover:shadow-md transition-all border" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}>
//                 <summary className="flex items-center justify-between cursor-pointer list-none">
//                   <span className="text-lg font-semibold" style={{ color: '#1f2937' }}>{faq.q}</span>
//                   <svg className="w-5 h-5 group-open:rotate-180 transition-transform" style={{ color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </svg>
//                 </summary>
//                 <p className="mt-4 leading-relaxed" style={{ color: '#6b7280' }}>{faq.a}</p>
//               </details>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ITADSolution;




import React from 'react';

const ITADSolution: React.FC = () => {
  return (
    <div className="font-['Inter',_'Segoe_UI',_'Roboto',_sans-serif] antialiased" style={{ backgroundColor: '#ffffff', color: '#1f2937' }}>
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#e8f5e9' }}>
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 backdrop-blur-sm rounded-full text-sm font-semibold shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.8)', color: '#059669' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure IT Asset Disposition</span>
              </div>
              
              <div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6" style={{ color: '#1f2937' }}>
                  Secure IT Asset{" "}
                  <span style={{ color: '#059669' }}>
                    Disposition
                  </span>
                </h1>
                <p className="text-xl leading-relaxed" style={{ color: '#4b5563' }}>
                  Comprehensive ITAD solution that helps organizations securely retire, 
                  sanitize, and dispose of IT assets while maintaining compliance with 
                  international data security regulations.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center justify-center text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" style={{ backgroundColor: '#059669' }}>
                  Get Started
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="inline-flex items-center justify-center border-2 px-8 py-4 rounded-lg font-semibold transition-all" style={{ borderColor: '#059669', color: '#059669' }}>
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Right Image/Illustration */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Main Card */}
                <div className="relative rounded-3xl shadow-2xl p-10 border" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}>
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl rotate-12 opacity-20"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl -rotate-12 opacity-20"></div>
                  
                  {/* Content */}
                  <div className="relative space-y-8">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-50"></div>
                        <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
                          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <div className="text-center space-y-3">
                      <h3 className="text-2xl font-bold" style={{ color: '#1f2937' }}>
                        Secure Asset Disposal
                      </h3>
                      <p style={{ color: '#6b7280' }}>
                        NIST 800-88 Certified Data Erasure
                      </p>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: '#e5e7eb' }}>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: '#059669' }}>10M+</div>
                        <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>Devices</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: '#059669' }}>150+</div>
                        <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>Countries</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: '#059669' }}>99.9%</div>
                        <div className="text-xs mt-1" style={{ color: '#9ca3af' }}>Success</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#e8f5e9', color: '#059669' }}>
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1f2937' }}>
              Complete Data Erasure
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
              Permanently erase data from all devices with military-grade security
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🔐', title: 'Certified Data Erasure', desc: 'Military-grade data sanitization using NIST 800-88 standards.' },
              { icon: '📜', title: 'Compliance Certificates', desc: 'Tamper-proof certificates with detailed audit trails.' },
              { icon: '📈', title: 'Asset Management', desc: 'Track assets from deployment through secure disposal.' },
              { icon: '♻️', title: 'Sustainable E-Waste', desc: 'Environmentally responsible disposal practices.' }
            ].map((feature, idx) => (
              <div key={idx} className="group p-6 rounded-2xl hover:shadow-lg transition-all border border-transparent hover:border-blue-100" style={{ backgroundColor: '#f9fafb' }}>
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1f2937' }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Device Support Section */}
      <section className="py-20 bg-gradient-to-b" style={{ background: 'linear-gradient(to bottom, #f9fafb, #ffffff)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#e8f5e9', color: '#059669' }}>
              Device Support
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1f2937' }}>
              Every Device Type
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
              Comprehensive data erasure across all storage media
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💻', title: 'Computers', desc: 'Desktops, Laptops, Workstations' },
              { icon: '🖥️', title: 'Servers', desc: 'Physical & Virtual Servers' },
              { icon: '💾', title: 'Storage Media', desc: 'HDDs, SSDs, USB Drives' },
              { icon: '📱', title: 'Mobile Devices', desc: 'Smartphones, Tablets' }
            ].map((device, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl shadow-sm hover:shadow-md transition-all" style={{ backgroundColor: '#ffffff' }}>
                <div className="text-6xl mb-4">{device.icon}</div>
                <h4 className="text-xl font-bold mb-2" style={{ color: '#1f2937' }}>{device.title}</h4>
                <p className="text-sm" style={{ color: '#6b7280' }}>{device.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Solutions Section */}
      <section className="py-20" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#e8f5e9', color: '#059669' }}>
              Industry Solutions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1f2937' }}>
              Tailored for Your Industry
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6b7280' }}>
              Specialized ITAD solutions for every sector
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Enterprise Data Centers',
                desc: 'Secure decommissioning during hardware refresh cycles and cloud migrations.',
                features: ['Bulk erasure capabilities', 'Comprehensive audit trails', 'On-site & remote options']
              },
              {
                title: 'Financial Services',
                desc: 'Meet regulatory requirements for customer data protection and secure disposal.',
                features: ['PCI DSS Level 1 compliant', 'SOX compliance support', 'Verified certificates']
              },
              {
                title: 'Healthcare Organizations',
                desc: 'HIPAA-compliant data sanitization for medical devices and health records.',
                features: ['HIPAA-certified erasure', 'PHI data protection', 'Chain of custody docs']
              },
              {
                title: 'Government & Defense',
                desc: 'Military-grade destruction with DoD 5220.22-M and NSA standards compliance.',
                features: ['Top Secret clearance', 'FedRAMP authorized', 'Classified data handling']
              }
            ].map((solution, idx) => (
              <div key={idx} className="p-8 rounded-2xl hover:shadow-lg transition-all border" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#1f2937' }}>{solution.title}</h3>
                <p className="mb-6" style={{ color: '#6b7280' }}>{solution.desc}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center text-sm" style={{ color: '#4b5563' }}>
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" style={{ color: '#059669' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b" style={{ background: 'linear-gradient(to bottom, #f9fafb, #ffffff)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{ backgroundColor: '#e8f5e9', color: '#059669' }}>
              FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1f2937' }}>
              Common Questions
            </h2>
            <p className="text-lg" style={{ color: '#6b7280' }}>
              Everything you need to know about ITAD
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: 'What is IT Asset Disposition (ITAD)?',
                a: 'ITAD is the systematic process of securely disposing, recycling, or repurposing end-of-life IT equipment while ensuring complete data destruction, environmental responsibility, and regulatory compliance.'
              },
              {
                q: 'How secure is your data erasure process?',
                a: 'Our solution uses military-grade sanitization algorithms that overwrite data multiple times. We support NIST 800-88, DoD 5220.22-M, and 15+ international standards, all verified with tamper-proof certificates.'
              },
              {
                q: 'Which compliance standards do you support?',
                a: 'DSecure supports GDPR, HIPAA, SOX, PCI DSS, CCPA, ISO 27001, NIST 800-88, Common Criteria, FedRAMP, and industry-specific regulations across multiple sectors.'
              },
              {
                q: 'Do you provide certificates of data destruction?',
                a: 'Yes, we generate digitally signed, tamper-proof certificates for every erased device with complete asset details, erasure method, timestamp, and verification results.'
              },
              {
                q: 'Can you handle large-scale enterprise deployments?',
                a: 'Absolutely. Our solutions support simultaneous erasure of thousands of devices with centralized management, automated reporting, and integration with existing systems.'
              }
            ].map((faq, idx) => (
              <details key={idx} className="group rounded-xl p-6 shadow-sm hover:shadow-md transition-all border" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}>
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-lg font-semibold" style={{ color: '#1f2937' }}>{faq.q}</span>
                  <svg className="w-5 h-5 group-open:rotate-180 transition-transform" style={{ color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 leading-relaxed" style={{ color: '#6b7280' }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ITADSolution;
