import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Reveal from '@/components/Reveal'
import { useAuth } from '@/auth/AuthContext'
import { Link } from 'react-router-dom'

interface Agent {
  id: string
  name: string
  version: string
  size: string
  platform: string
  description: string
  iconSvg: React.ReactElement
  compatibility: string[]
}

const DownloadAgentPage: React.FC = () => {
  const { user } = useAuth()
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  const agents: Agent[] = [
    {
      id: 'windows-agent',
      name: 'DSecure Windows Agent',
      version: '3.2.1',
      size: '45.2 MB',
      platform: 'windows',
      description: 'Complete data erasure solution for Windows systems including drives, files, and network storage.',
      iconSvg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" /></svg>,
      compatibility: ['Windows 10', 'Windows 11', 'Windows Server 2019', 'Windows Server 2022']
    },
    {
      id: 'mac-agent',
      name: 'DSecure Mac Agent',
      version: '3.1.8',
      size: '52.1 MB',
      platform: 'mac',
      description: 'Secure data erasure for macOS and Mac hardware including M1/M2 chip support.',
      iconSvg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      compatibility: ['macOS 12.0+', 'Apple Silicon (M1/M2)', 'Intel-based Macs']
    },
    {
      id: 'linux-agent',
      name: 'DSecure Linux Agent',
      version: '3.2.0',
      size: '38.7 MB',
      platform: 'linux',
      description: 'Command-line and GUI data erasure tools for Linux distributions.',
      iconSvg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      compatibility: ['Ubuntu 20.04+', 'CentOS 8+', 'RHEL 8+', 'Debian 11+']
    },
    {
      id: 'server-agent',
      name: 'DSecure Server Agent',
      version: '3.2.1',
      size: '67.3 MB',
      platform: 'server',
      description: 'Enterprise-grade erasure solution for server environments and data centers.',
      iconSvg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
      compatibility: ['Windows Server', 'Linux Server', 'VMware ESXi', 'Hyper-V']
    },
    {
      id: 'mobile-agent',
      name: 'DSecure Mobile Diagnostics',
      version: '2.8.4',
      size: '23.9 MB',
      platform: 'mobile',
      description: 'Mobile device diagnostics and secure data removal for smartphones and tablets.',
      iconSvg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" /></svg>,
      compatibility: ['Android 8.0+', 'iOS 14.0+']
    },
    {
      id: 'network-agent',
      name: 'DSecure Network Agent',
      version: '3.1.5',
      size: '41.8 MB',
      platform: 'network',
      description: 'Network storage and cloud data erasure with remote management capabilities.',
      iconSvg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
      compatibility: ['NAS Systems', 'Cloud Storage', 'Network Drives']
    }
  ]

  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'windows', name: 'Windows' },
    { id: 'mac', name: 'macOS' },
    { id: 'linux', name: 'Linux' },
    { id: 'server', name: 'Server' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'network', name: 'Network' }
  ]

  const filteredAgents = selectedPlatform === 'all'
    ? agents
    : agents.filter(agent => agent.platform === selectedPlatform)

  const downloadAgent = (agent: Agent) => {
    // Simulate download
    console.log(`Downloading ${agent.name} v${agent.version}...`)
  }

  const getInstallationInstructions = (platform: string) => {
    switch (platform) {
      case 'windows':
        return [
          'Download the installer file',
          'Right-click and "Run as Administrator"',
          'Follow the installation wizard',
          'Launch DSecure Agent from Start Menu'
        ]
      case 'mac':
        return [
          'Download the .dmg file',
          'Double-click to mount the disk image',
          'Drag DSecure to Applications folder',
          'Allow installation in System Preferences > Security'
        ]
      case 'linux':
        return [
          'Download the appropriate package (.deb/.rpm)',
          'Install using package manager',
          'Run: sudo dsecure-agent --setup',
          'Configure permissions and start service'
        ]
      default:
        return [
          'Download the installer',
          'Follow platform-specific instructions',
          'Configure as needed',
          'Start the agent service'
        ]
    }
  }

  return (
    <>
      <Helmet>
        <title>Download Agent | DSecure Dashboard</title>
        <meta name="description" content="Download DSecure agents for various platforms" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <div className="container-app py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Link
                to="/admin"
                className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Download Agents</h1>
                <p className="text-slate-600 mt-1">Get the latest DSecure agents for your platform</p>
              </div>
            </div>

            {/* Custom Installer Note */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
              <div className="flex items-start">
                <span className="text-blue-500 text-xl font-bold mr-2">*</span>
                <p className="text-sm text-blue-900 font-medium pt-0.5">
                  For custom installer setup, please contact the support team.
                </p>
              </div>
            </div>

            {/* Platform Filter */}
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedPlatform === platform.id
                    ? 'bg-brand text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                    }`}
                >
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <Reveal key={agent.id} delayMs={index * 100}>
                <div className="card p-6 h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-slate-600">{agent.iconSvg}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{agent.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span>v{agent.version}</span>
                        <span>•</span>
                        <span>{agent.size}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 flex-1">{agent.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Compatibility:</h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.compatibility.map((comp, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadAgent(agent)}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </button>
                    <button
                      onClick={() => console.log(`Viewing documentation for ${agent.name}...`)}
                      className="px-3 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                      title="View Documentation"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Installation Instructions */}
          {selectedPlatform !== 'all' && (
            <Reveal delayMs={300}>
              <div className="mt-8">
                <div className="card p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">
                    Installation Instructions for {platforms.find(p => p.id === selectedPlatform)?.name}
                  </h2>
                  <ol className="space-y-2">
                    {getInstallationInstructions(selectedPlatform).map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-brand text-white text-sm rounded-full flex items-center justify-center font-medium flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-slate-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>
          )}

          {/* Support Information */}
          <Reveal delayMs={400}>
            <div className="mt-8">
              <div className="card p-6 bg-gradient-to-r from-brand/5 to-brand/10 border-brand/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25v2.5m0 14v2.5m9.75-9.75h-2.5m-14 0h-2.5m9.928-9.928l-1.768 1.768m-.354 9.192l-1.768 1.768m9.192-.354l-1.768-1.768M2.636 9.172l1.768 1.768" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-2">Need Help?</h3>
                    <p className="text-slate-700 mb-4">
                      Having trouble with installation or need technical support? Our team is here to help.
                    </p>
                    <div className="flex gap-3">
                      <Link to="/support" className="btn-secondary">
                        Contact Support
                      </Link>
                      <button className="btn-outline">
                        View Documentation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}

export default DownloadAgentPage
