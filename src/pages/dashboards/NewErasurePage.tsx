import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Reveal from '@/components/Reveal'
import { useAuth } from '@/auth/AuthContext'
import { Link } from 'react-router-dom'

interface ErasureConfig {
  deviceType: string
  erasureMethod: string
  verificationMethod: string
  schedule: string
  notifications: boolean
}

const NewErasurePage: React.FC = () => {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState<ErasureConfig>({
    deviceType: '',
    erasureMethod: '',
    verificationMethod: '',
    schedule: 'immediate',
    notifications: true
  })

  const deviceTypes = [
    { 
      id: 'hdd', 
      name: 'Hard Disk Drive (HDD)', 
      iconSvg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
    },
    { 
      id: 'ssd', 
      name: 'Solid State Drive (SSD)', 
      iconSvg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
    },
    { 
      id: 'server', 
      name: 'Server Hardware', 
      iconSvg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
    },
    { 
      id: 'mobile', 
      name: 'Mobile Devices', 
      iconSvg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" /></svg>
    },
    { 
      id: 'network', 
      name: 'Network Storage', 
      iconSvg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
    },
    { 
      id: 'cloud', 
      name: 'Cloud Storage', 
      iconSvg: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
    }
  ]

  const erasureMethods = [
    { id: 'nist', name: 'NIST 800-88 Clear', description: 'Single pass overwrite' },
    { id: 'nist_purge', name: 'NIST 800-88 Purge', description: 'Multiple pass secure erase' },
    { id: 'dod', name: 'DoD 5220.22-M', description: '3-pass overwrite method' },
    { id: 'gutmann', name: 'Gutmann Method', description: '35-pass overwrite' },
    { id: 'random', name: 'Random Data', description: 'Random pattern overwrite' },
    { id: 'zero', name: 'Zero Fill', description: 'Fill with zeros' }
  ]

  const verificationMethods = [
    { id: 'basic', name: 'Basic Verification', description: 'Standard verification' },
    { id: 'enhanced', name: 'Enhanced Verification', description: 'Detailed sector check' },
    { id: 'forensic', name: 'Forensic Verification', description: 'Complete forensic analysis' }
  ]

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleStartErasure = () => {
    // Here you would typically make an API call to start the erasure process
    console.log('Starting erasure with config:', config)
    alert('Erasure process started successfully!')
  }

  return (
    <>
      <Helmet>
        <title>New Erasure Process | DSecure Dashboard</title>
        <meta name="description" content="Start a new secure data erasure process" />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <div className="container-app py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link 
                to="/dashboard" 
                className="p-2 rounded-lg border border-slate-200 hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">New Erasure Process</h1>
                <p className="text-slate-600 mt-1">Configure and start a secure data erasure</p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= stepNumber 
                        ? 'bg-brand text-white' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-20 h-1 ${
                        step > stepNumber ? 'bg-brand' : 'bg-slate-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Device Selection */}
            {step === 1 && (
              <Reveal>
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Device Type</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {deviceTypes.map((device) => (
                      <button
                        key={device.id}
                        onClick={() => setConfig({...config, deviceType: device.id})}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          config.deviceType === device.id
                            ? 'border-brand bg-brand/5'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="mb-3 text-slate-600">{device.iconSvg}</div>
                        <div className="font-semibold text-slate-900">{device.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Step 2: Erasure Method */}
            {step === 2 && (
              <Reveal>
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Choose Erasure Method</h2>
                  <div className="space-y-4">
                    {erasureMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setConfig({...config, erasureMethod: method.id})}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          config.erasureMethod === method.id
                            ? 'border-brand bg-brand/5'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-semibold text-slate-900">{method.name}</div>
                        <div className="text-slate-600 text-sm mt-1">{method.description}</div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Verification Method</h3>
                    <div className="space-y-3">
                      {verificationMethods.map((verification) => (
                        <button
                          key={verification.id}
                          onClick={() => setConfig({...config, verificationMethod: verification.id})}
                          className={`w-full p-3 rounded-lg border text-left transition-all ${
                            config.verificationMethod === verification.id
                              ? 'border-brand bg-brand/5'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-medium text-slate-900">{verification.name}</div>
                          <div className="text-slate-600 text-sm">{verification.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Step 3: Schedule & Review */}
            {step === 3 && (
              <Reveal>
                <div className="card p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Schedule & Review</h2>
                  
                  <div className="space-y-6">
                    {/* Schedule Options */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">Schedule</h3>
                      <div className="space-y-2">
                        {[
                          { id: 'immediate', label: 'Start Immediately' },
                          { id: 'scheduled', label: 'Schedule for Later' }
                        ].map((option) => (
                          <label key={option.id} className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="schedule"
                              value={option.id}
                              checked={config.schedule === option.id}
                              onChange={(e) => setConfig({...config, schedule: e.target.value})}
                              className="w-4 h-4 text-brand"
                            />
                            <span className="text-slate-700">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Notifications */}
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={config.notifications}
                          onChange={(e) => setConfig({...config, notifications: e.target.checked})}
                          className="w-4 h-4 text-brand"
                        />
                        <span className="text-slate-700">Send email notifications</span>
                      </label>
                    </div>

                    {/* Configuration Summary */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Configuration Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Device Type:</span> {deviceTypes.find(d => d.id === config.deviceType)?.name || 'Not selected'}</div>
                        <div><span className="font-medium">Erasure Method:</span> {erasureMethods.find(m => m.id === config.erasureMethod)?.name || 'Not selected'}</div>
                        <div><span className="font-medium">Verification:</span> {verificationMethods.find(v => v.id === config.verificationMethod)?.name || 'Not selected'}</div>
                        <div><span className="font-medium">Schedule:</span> {config.schedule === 'immediate' ? 'Start Immediately' : 'Scheduled'}</div>
                        <div><span className="font-medium">Notifications:</span> {config.notifications ? 'Enabled' : 'Disabled'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={step === 1}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 1 && !config.deviceType) ||
                    (step === 2 && (!config.erasureMethod || !config.verificationMethod))
                  }
                  className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleStartErasure}
                  className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600"
                >
                  Start Erasure
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewErasurePage