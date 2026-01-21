import SEOHead from "../../../components/SEOHead";
import { getSEOForPage } from "../../../utils/seo";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Network, AlertCircle, CheckCircle, Shield, Users, Server, Key } from "lucide-react";

const ConnectingDomain: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("connecting-domain")} />
      <Helmet>
        <title>Connect to Domain - D-Secure Network File Manual</title>
        <meta
          name="description"
          content="Learn how to connect D-Secure File Eraser Network to your Active Directory domain and manage networked computers."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Network className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Connect to Active Directory Domain</h1>
          </div>
          <p className="text-lg text-gray-600">
            Connect D-Secure File Eraser Network to your Active Directory domain to manage and erase data across multiple networked computers from a centralized console.
          </p>
        </div>

        {/* Prerequisites */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Prerequisites for Domain Connection
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold text-base mb-2">Administrator Credentials Required</h3>
              <p className="text-blue-100">
                You must have domain administrator privileges to connect and perform erasure operations across network computers. Standard user accounts cannot access this functionality for security reasons.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold text-base mb-2">Domain-Joined Computer</h3>
              <p className="text-blue-100">
                The computer running D-Secure File Eraser Network must be joined to the Active Directory domain you want to manage. Standalone computers cannot connect to domain resources.
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold text-base mb-2">Network Connectivity</h3>
              <p className="text-blue-100">
                Ensure stable network connection to the domain controller and target computers. Firewall rules must allow necessary AD and file sharing protocols.
              </p>
            </div>
          </div>
        </section>

        {/* Connection Steps */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-blue-600 rounded"></span>
            Step-by-Step Connection Process
          </h2>
          
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="border-l-4 border-blue-500 pl-6 py-3 bg-blue-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white text-lg font-semibold flex items-center justify-center">1</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Launch Application</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700">
                  Open D-Secure File Eraser Network on a computer that is joined to your Active Directory domain. Verify domain membership by checking System Properties.
                </p>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="text-sm font-medium text-gray-900 mb-1">Verification Tip:</p>
                  <p className="text-sm text-gray-600">Right-click "This PC" → Properties → See domain name under "Computer name, domain, and workgroup settings"</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-l-4 border-green-500 pl-6 py-3 bg-green-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-green-600 text-white text-lg font-semibold flex items-center justify-center">2</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Navigate to Connection Dialog</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700">
                  In the D-Secure application, click the <strong>Home</strong> tab in the ribbon, then locate and click the <strong>Connect to Domain</strong> button.
                </p>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <p className="text-sm font-medium text-gray-900 mb-1">Location:</p>
                  <p className="text-sm text-gray-600">Home Tab → Network Section → "Connect to Domain" (blue network icon)</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-l-4 border-purple-500 pl-6 py-3 bg-purple-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white text-lg font-semibold flex items-center justify-center">3</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Enter Administrator Credentials</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700 mb-3">
                  The Domain Login dialog appears. Provide your domain administrator credentials in the appropriate format:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Key className="w-5 h-5 text-purple-600" />
                      Username Format Options
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <code className="bg-purple-100 px-2 py-1 rounded text-sm">DOMAIN\username</code>
                        <span className="text-sm text-gray-600">- NetBIOS format (e.g., COMPANY\john.doe)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <code className="bg-purple-100 px-2 py-1 rounded text-sm">username@domain.com</code>
                        <span className="text-sm text-gray-600">- UPN format (e.g., john.doe@company.com)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Password Requirements</h4>
                    <p className="text-sm text-gray-700">
                      Enter your current domain password. If your organization requires multifactor authentication, complete the additional verification steps as prompted.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-l-4 border-orange-500 pl-6 py-3 bg-orange-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-orange-600 text-white text-lg font-semibold flex items-center justify-center">4</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Select Target Domain</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700">
                  If your environment has multiple domains or a forest structure, select the specific domain you want to manage from the dropdown list.
                </p>
                
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Multiple Domain Scenarios</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Single Domain:</strong> Domain dropdown auto-selects the only available domain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Multi-Domain Forest:</strong> Dropdown shows all domains you have access to</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <span><strong>Child Domains:</strong> Navigate parent-child relationships if managing subdomains</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="border-l-4 border-cyan-500 pl-6 py-3 bg-cyan-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-cyan-600 text-white text-lg font-semibold flex items-center justify-center">5</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Configure Network Check Options</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700 mb-3">
                  Optionally enable "Check Network Connection Status" to verify computer accessibility before loading the complete list:
                </p>
                
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-cyan-200">
                    <p className="font-semibold text-gray-900 mb-1 text-sm">✓ Enable Check When:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Managing large networks (500+ computers)</li>
                      <li>• Many computers may be offline</li>
                      <li>• Need accurate online status immediately</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-cyan-200">
                    <p className="font-semibold text-gray-900 mb-1 text-sm">✗ Skip Check When:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Small network with reliable connectivity</li>
                      <li>• Need faster connection time</li>
                      <li>• Can tolerate seeing offline computers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-50/50">
              <div className="flex items-start gap-3 mb-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white text-lg font-semibold flex items-center justify-center">6</div>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">Establish Connection</h3>
              </div>
              <div className="ml-13 space-y-3">
                <p className="text-gray-700">
                  Click the <strong>Connect</strong> button to authenticate and establish domain connection. Connection process typically takes 5-30 seconds depending on domain size and network speed.
                </p>
                
                <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-900 mb-1">✓ Success Indicators:</p>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Status changes to "Connected"</li>
                    <li>• Organizational Unit tree populates in left pane</li>
                    <li>• Computer list appears with domain machines</li>
                    <li>• Green connection icon in status bar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-5 mt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-amber-900 font-semibold mb-2">Connection Timeout Behavior</p>
                <p className="text-amber-800">
                  If network check is enabled, connection may take longer for large domains. Offline computers will still appear but marked as inaccessible. You can refresh status later or reconnect without the network check for faster loading.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* After Connection */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-green-600 rounded"></span>
            Understanding the Connected Interface
          </h2>
          
          <div className="space-y-5">
            <p className="text-gray-700 leading-relaxed">
              Once connected successfully, the D-Secure interface updates to display your domain structure and available computers:
            </p>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="border-2 border-green-300 rounded-xl p-5 bg-green-50/30">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-base">
                  <Users className="w-6 h-6 text-green-600" />
                  Organizational Unit Tree
                </h3>
                <p className="text-gray-700 mb-3">
                  The left navigation pane displays your complete AD organizational structure in a tree view format.
                </p>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <p className="font-medium text-gray-900 text-sm mb-2">Navigation Features:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Click ▶ to expand OUs and sub-OUs</li>
                    <li>• Right-click for quick actions</li>
                    <li>• Search box to find specific OUs</li>
                    <li>• Refresh button to update structure</li>
                  </ul>
                </div>
              </div>

              <div className="border-2 border-blue-300 rounded-xl p-5 bg-blue-50/30">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-lg">
                  <Server className="w-6 h-6 text-blue-600" />
                  Computer List View
                </h3>
                <p className="text-gray-700 mb-3">
                  The main content area shows all computers within the selected OU with detailed information columns.
                </p>
                <div className="bg-white rounded-lg p-3 border border-blue-200">
                  <p className="font-medium text-gray-900 text-sm mb-2">Displayed Information:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Computer name and description</li>
                    <li>• Operating system version</li>
                    <li>• Online/Offline status indicator</li>
                    <li>• Last seen timestamp</li>
                    <li>• Parent OU path</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Computer Status Indicators</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 border border-green-300">
                  <p className="font-bold text-green-700 mb-1">🟢 Online</p>
                  <p className="text-sm text-gray-600">Computer is powered on, connected to network, and accessible for operations</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-300">
                  <p className="font-bold text-gray-700 mb-1">⚫ Offline</p>
                  <p className="text-sm text-gray-600">Computer appears in AD but is not currently reachable on the network</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-red-300">
                  <p className="font-bold text-red-700 mb-1">🔴 Error</p>
                  <p className="text-sm text-gray-600">Connection blocked by firewall, permissions issue, or network problem</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-red-600 rounded"></span>
            Troubleshooting Connection Issues
          </h2>
          
          <div className="space-y-5">
            <div className="border-l-4 border-red-500 bg-red-50 rounded-r-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Connection Failed Error</h3>
              <p className="text-gray-700 mb-3">Unable to authenticate or establish domain connection.</p>
              
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <p className="font-medium text-gray-900 mb-2">Possible Causes & Solutions:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">→</span>
                    <div>
                      <strong>Incorrect Credentials:</strong> Verify username/password are correct, check for typos in domain name
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">→</span>
                    <div>
                      <strong>Not Domain-Joined:</strong> Confirm computer is member of domain (System Properties → Computer Name tab)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">→</span>
                    <div>
                      <strong>Domain Controller Unreachable:</strong> Check network connection, ping domain controller, verify DNS settings
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">→</span>
                    <div>
                      <strong>Insufficient Permissions:</strong> Ensure account has Domain Admin or equivalent privileges
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Computers Not Showing in List</h3>
              <p className="text-gray-700 mb-3">Domain connects but expected computers don't appear.</p>
              
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <p className="font-medium text-gray-900 mb-2">Troubleshooting Steps:</p>
                <ol className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-600">1.</span>
                    <span>Click Refresh button to reload computer list</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-600">2.</span>
                    <span>Navigate to different OUs - computers may be in unexpected locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-600">3.</span>
                    <span>Verify AD replication is functioning (check with AD administrator)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-orange-600">4.</span>
                    <span>Confirm you have view permissions on all OUs containing computers</span>
                  </li>
                </ol>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Computer Shows Offline But Is Actually Online</h3>
              <p className="text-gray-700 mb-3">Status indicator doesn't match actual computer state.</p>
              
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <p className="font-medium text-gray-900 mb-2">Common Reasons:</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <div>
                      <strong>Firewall Blocking:</strong> Windows Firewall or third-party firewall blocking ICMP (ping) or SMB protocols - add D-Secure exceptions
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <div>
                      <strong>Sleep/Hibernate Mode:</strong> Computer entered power-saving state - configure to stay awake or wake-on-LAN
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <div>
                      <strong>Network Partition:</strong> Computer on different subnet or VLAN with routing issues
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <div>
                      <strong>Stale Status Cache:</strong> Disconnect and reconnect to domain to refresh status
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-5">Domain Connection Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-2">Security Practices</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Use dedicated service account (not personal admin account) for D-Secure operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Enable audit logging for all domain connection attempts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Rotate credentials regularly per security policy</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-2">Operational Practices</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Regularly refresh computer list to see latest network status</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Document OU structure for organized computer management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Test connectivity with small OU before organization-wide deployment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-2">Performance Optimization</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Skip network check for faster connection on reliable networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Filter by OU to reduce visible computer count in large domains</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Schedule major operations during off-peak hours</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <h3 className="font-semibold mb-2">Troubleshooting Preparation</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Maintain list of domain admin contacts for permission issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Document firewall rules needed for D-Secure operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Keep network diagram handy for subnet/VLAN troubleshooting</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ConnectingDomain;
