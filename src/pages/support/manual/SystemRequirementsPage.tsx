import React, { memo } from "react";
import { Helmet } from "react-helmet-async";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const SystemRequirementsPage: React.FC = memo(() => {
  return (
    <>
      <Helmet>
        <title>System Requirements | D-Secure Hardware & Software Specifications</title>
        <meta name="description" content="Verify your device meets minimum OS and hardware specifications for D-Secure data erasure software." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center">
                <Link to="/support/manual/first-time-setup" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to First Time Setup
                </Link>
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                  System <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Requirements</span>
                </h1>
                <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  Comprehensive hardware and software requirements for optimal D-Secure performance across all supported platforms
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="space-y-12">
              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Operating System Requirements</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-3 flex items-center">
                        <span className="mr-2">🪟</span> Windows
                      </h3>
                      <ul className="space-y-2 text-emerald-800 text-sm">
                        <li>• Windows 10 (64-bit) - Version 1903+</li>
                        <li>• Windows 11 (64-bit) - All versions</li>
                        <li>• Windows Server 2019/2022</li>
                        <li>• .NET Framework 4.8 or higher</li>
                        <li>• PowerShell 5.1 or higher</li>
                        <li>• Latest Windows Updates</li>
                      </ul>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-teal-900 mb-3 flex items-center">
                        <span className="mr-2">🍎</span> macOS
                      </h3>
                      <ul className="space-y-2 text-teal-800 text-sm">
                        <li>• macOS 11 Big Sur (Intel & Apple Silicon)</li>
                        <li>• macOS 12 Monterey (Intel & Apple Silicon)</li>
                        <li>• macOS 13 Ventura (Intel & Apple Silicon)</li>
                        <li>• macOS 14 Sonoma (Intel & Apple Silicon)</li>
                        <li>• Xcode Command Line Tools</li>
                        <li>• System Integrity Protection compatible</li>
                      </ul>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-cyan-900 mb-3 flex items-center">
                        <span className="mr-2">🐧</span> Linux
                      </h3>
                      <ul className="space-y-2 text-cyan-800 text-sm">
                        <li>• Ubuntu 20.04 LTS / 22.04 LTS</li>
                        <li>• CentOS 8+ / Rocky Linux 8+</li>
                        <li>• Red Hat Enterprise 8+ / 9+</li>
                        <li>• SUSE Linux Enterprise 15+</li>
                        <li>• Debian 11+ (Bullseye)</li>
                        <li>• Kernel 5.4+ recommended</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Hardware Specifications</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Minimum Requirements</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm">Processor:</span>
                          <span className="font-medium text-sm">Intel Core i3 / AMD Ryzen 3</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm">Memory:</span>
                          <span className="font-medium text-sm">4GB RAM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm">Storage:</span>
                          <span className="font-medium text-sm">2GB free space</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm">Graphics:</span>
                          <span className="font-medium text-sm">DirectX 11 compatible</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm">Network:</span>
                          <span className="font-medium text-sm">Internet connection</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-emerald-900 mb-4">Recommended</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-700 text-sm">Processor:</span>
                          <span className="font-medium text-emerald-900 text-sm">Intel Core i5 / AMD Ryzen 5</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-700 text-sm">Memory:</span>
                          <span className="font-medium text-emerald-900 text-sm">8GB+ RAM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-700 text-sm">Storage:</span>
                          <span className="font-medium text-emerald-900 text-sm">5GB+ SSD space</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-700 text-sm">Graphics:</span>
                          <span className="font-medium text-emerald-900 text-sm">Dedicated GPU</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-700 text-sm">Network:</span>
                          <span className="font-medium text-emerald-900 text-sm">Gigabit Ethernet</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Enterprise/High-Volume</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700 text-sm">Processor:</span>
                          <span className="font-medium text-blue-900 text-sm">Intel Core i7 / AMD Ryzen 7</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700 text-sm">Memory:</span>
                          <span className="font-medium text-blue-900 text-sm">16GB+ RAM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700 text-sm">Storage:</span>
                          <span className="font-medium text-blue-900 text-sm">10GB+ NVMe SSD</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700 text-sm">Graphics:</span>
                          <span className="font-medium text-blue-900 text-sm">Workstation GPU</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700 text-sm">Network:</span>
                          <span className="font-medium text-blue-900 text-sm">10Gb Ethernet</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Storage Device Compatibility</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 mb-4">✅ Supported Storage Types</h3>
                      <ul className="space-y-2 text-green-800 text-sm">
                        <li>• SATA HDDs (2.5" and 3.5")</li>
                        <li>• SATA SSDs (2.5" and M.2)</li>
                        <li>• NVMe SSDs (M.2 and PCIe)</li>
                        <li>• USB 2.0/3.0/3.1 external drives</li>
                        <li>• USB-C and Thunderbolt drives</li>
                        <li>• SD cards and microSD cards</li>
                        <li>• CompactFlash and other flash media</li>
                        <li>• Network-attached storage (NAS)</li>
                        <li>• iSCSI and Fibre Channel drives</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-orange-900 mb-4">⚠️ Special Considerations</h3>
                      <ul className="space-y-2 text-orange-800 text-sm">
                        <li>• RAID arrays require controller support</li>
                        <li>• Encrypted drives need decryption first</li>
                        <li>• BitLocker drives require unlock</li>
                        <li>• FileVault drives need authentication</li>
                        <li>• LUKS encrypted volumes need keys</li>
                        <li>• Some USB drives may have write protection</li>
                        <li>• Enterprise SSDs may need firmware updates</li>
                        <li>• Virtual drives require hypervisor access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Network & Security Requirements</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">Network Access</h3>
                      <ul className="space-y-2 text-blue-800 text-sm">
                        <li>• HTTPS access for license activation (port 443)</li>
                        <li>• HTTP access for updates (port 80)</li>
                        <li>• DNS resolution for activation servers</li>
                        <li>• Outbound connections to *.dsecuretech.com</li>
                        <li>• Proxy server support available</li>
                        <li>• Offline activation option for air-gapped systems</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-purple-900 mb-3">Security & Permissions</h3>
                      <ul className="space-y-2 text-purple-800 text-sm">
                        <li>• Administrator/root privileges for installation</li>
                        <li>• Write access to system directories</li>
                        <li>• Ability to modify system services</li>
                        <li>• Hardware-level disk access permissions</li>
                        <li>• Firewall exceptions for D-Secure processes</li>
                        <li>• Antivirus exclusions may be required</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance Considerations</h2>
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-600 mb-2">2-5x</div>
                        <div className="text-sm text-emerald-800">Faster erasure with SSD vs HDD</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-teal-600 mb-2">50%</div>
                        <div className="text-sm text-teal-800">Performance boost with 16GB+ RAM</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-600 mb-2">10x</div>
                        <div className="text-sm text-cyan-800">Faster with NVMe vs SATA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Compatibility Check Tool</h2>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Verify Your System Compatibility</h3>
                      <p className="text-blue-800 mb-6 text-sm">Download our free system compatibility checker to ensure your hardware and software meet all requirements before installation.</p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
                          Download Compatibility Checker
                        </button>
                        <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors text-sm">
                          Run Online Check
                        </button>
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

export default SystemRequirementsPage;