import { useAuth } from '@/auth/AuthContext'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ReportFormData {
  title: string
  type: 'drive-eraser' | 'mobile-diagnostics' | 'network-eraser' | 'file-eraser' | 'comprehensive'
  dateRange: {
    from: string
    to: string
  }
  includeDevices: string[]
  format: 'pdf' | 'excel' | 'csv'
  includeCharts: boolean
  includeCertificates: boolean
  includeStatistics: boolean
  scheduledGeneration: boolean
  scheduleTime: string
  // New D-SecureErase fields
  erasurePerson: {
    name: string
    department: string
  }
  validatorPerson: {
    name: string
    department: string
  }
  signatureSettings: {
    technician: string
    validator: string
  }
  imageSettings: {
    topLogo: string
    watermark: string
  }
  headerSettings: {
    headerText: string
  }
}

export default function GenerateReport() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    type: 'comprehensive',
    dateRange: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days ago
      to: new Date().toISOString().split('T')[0] // today
    },
    includeDevices: ['all'],
    format: 'pdf',
    includeCharts: true,
    includeCertificates: true,
    includeStatistics: true,
    scheduledGeneration: false,
    scheduleTime: '',
    // New D-SecureErase fields
    erasurePerson: {
      name: '',
      department: ''
    },
    validatorPerson: {
      name: '',
      department: ''
    },
    signatureSettings: {
      technician: '',
      validator: ''
    },
    imageSettings: {
      topLogo: '',
      watermark: ''
    },
    headerSettings: {
      headerText: 'Data Erasure Report'
    }
  })

  const reportTypes = [
    { value: 'comprehensive', label: 'Comprehensive Report', description: 'Complete overview of all erasure activities' },
    { value: 'drive-eraser', label: 'Drive Erasure Report', description: 'Focus on drive erasure activities' },
    { value: 'mobile-diagnostics', label: 'Mobile Diagnostics Report', description: 'Mobile device security and diagnostics' },
    { value: 'network-eraser', label: 'Network Erasure Report', description: 'Network infrastructure cleanup activities' },
    { value: 'file-eraser', label: 'File Erasure Report', description: 'Individual file deletion activities' }
  ]

  const deviceOptions = [
    { value: 'all', label: 'All Devices' },
    { value: 'windows', label: 'Windows Devices' },
    { value: 'mac', label: 'Mac Devices' },
    { value: 'linux', label: 'Linux Devices' },
    { value: 'mobile', label: 'Mobile Devices' },
    { value: 'server', label: 'Server Devices' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }))
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleDeviceChange = (deviceType: string, checked: boolean) => {
    setFormData(prev => {
      if (deviceType === 'all') {
        return {
          ...prev,
          includeDevices: checked ? ['all'] : []
        }
      } else {
        const newDevices = checked 
          ? [...prev.includeDevices.filter(d => d !== 'all'), deviceType]
          : prev.includeDevices.filter(d => d !== deviceType)
        
        return {
          ...prev,
          includeDevices: newDevices
        }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title) {
      alert('Please enter a report title')
      return
    }
    
    if (formData.includeDevices.length === 0) {
      alert('Please select at least one device type')
      return
    }
    
    if (formData.scheduledGeneration && !formData.scheduleTime) {
      alert('Please select a schedule time for report generation')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call for report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would make actual API call to backend
      const reportRequest = {
        id: Date.now().toString(),
        ...formData,
        requestedBy: user?.email,
        status: formData.scheduledGeneration ? 'scheduled' : 'generating',
        createdAt: new Date().toISOString(),
        estimatedCompletion: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes from now
      }
      
      console.log('Generating report:', reportRequest)
      
      // Success message
      const message = formData.scheduledGeneration 
        ? `Report "${formData.title}" has been scheduled successfully!`
        : `Report "${formData.title}" generation has started! You will be notified when it's ready.`
      
      alert(message)
      
      // Navigate back to reports
      navigate('/admin/reports')
      
    } catch (error) {
      console.error('Error generating report:', error)
      alert('Failed to generate report. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Generate Report - Admin Dashboard | DSecureTech</title>
        <meta name="description" content="Generate custom reports for data erasure activities in DSecureTech admin dashboard." />
      </Helmet>

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <button 
                onClick={() => navigate('/admin/reports')}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Generate Report
              </h1>
            </div>
            <p className="text-slate-600">
              Create custom reports for data erasure activities and compliance
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="card">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">Report Configuration</h2>
              <p className="text-sm text-slate-600 mt-1">Configure your custom report settings</p>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Report Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter report title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Report Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {reportTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  <p className="text-sm text-slate-500 mt-1">
                    {reportTypes.find(t => t.value === formData.type)?.description}
                  </p>
                </div>
              </div>

              {/* Date Range */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">Date Range</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      From Date
                    </label>
                    <input
                      type="date"
                      name="dateRange.from"
                      value={formData.dateRange.from}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      To Date
                    </label>
                    <input
                      type="date"
                      name="dateRange.to"
                      value={formData.dateRange.to}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Device Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">Device Types</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {deviceOptions.map(device => (
                    <div key={device.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={device.value}
                        checked={formData.includeDevices.includes(device.value)}
                        onChange={(e) => handleDeviceChange(device.value, e.target.checked)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <label htmlFor={device.value} className="text-sm text-slate-700 cursor-pointer">
                        {device.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">Report Options</h3>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Export Format
                  </label>
                  <select
                    name="format"
                    value={formData.format}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="includeCharts"
                      name="includeCharts"
                      checked={formData.includeCharts}
                      onChange={handleInputChange}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="includeCharts" className="text-sm font-medium text-slate-700">
                      Include Charts and Graphs
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="includeCertificates"
                      name="includeCertificates"
                      checked={formData.includeCertificates}
                      onChange={handleInputChange}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="includeCertificates" className="text-sm font-medium text-slate-700">
                      Include Compliance Certificates
                    </label>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="includeStatistics"
                      name="includeStatistics"
                      checked={formData.includeStatistics}
                      onChange={handleInputChange}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label htmlFor="includeStatistics" className="text-sm font-medium text-slate-700">
                      Include Detailed Statistics
                    </label>
                  </div>
                </div>
              </div>

              {/* D-SecureErase Report Customization */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">Report Customization</h3>
                
                {/* Erasure Person */}
                <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-slate-800">Erasure Person</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="erasurePerson.name"
                        value={formData.erasurePerson.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter erasure person name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        name="erasurePerson.department"
                        value={formData.erasurePerson.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter department"
                      />
                    </div>
                  </div>
                </div>

                {/* Validator Person */}
                <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-slate-800">Validator Person</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="validatorPerson.name"
                        value={formData.validatorPerson.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter validator name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        name="validatorPerson.department"
                        value={formData.validatorPerson.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter department"
                      />
                    </div>
                  </div>
                </div>

                {/* Signature Settings */}
                <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-slate-800">Signature Settings</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select Technician
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="signatureSettings.technician"
                          value={formData.signatureSettings.technician}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Select or enter technician"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                          onClick={() => alert('Browse technician signatures')}
                        >
                          📁
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select Validator
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="signatureSettings.validator"
                          value={formData.signatureSettings.validator}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Select or enter validator"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                          onClick={() => alert('Browse validator signatures')}
                        >
                          📁
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Settings */}
                <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-slate-800">Image Settings</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select Top Logo
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="imageSettings.topLogo"
                          value={formData.imageSettings.topLogo}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Select logo file"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                          onClick={() => alert('Browse logo files')}
                        >
                          📁
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select Watermark
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="imageSettings.watermark"
                          value={formData.imageSettings.watermark}
                          onChange={handleInputChange}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Select watermark file"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                          onClick={() => alert('Browse watermark files')}
                        >
                          📁
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Header Settings */}
                <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                  <h4 className="font-medium text-slate-800">Header Settings</h4>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Header Text
                    </label>
                    <input
                      type="text"
                      name="headerSettings.headerText"
                      value={formData.headerSettings.headerText}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter header text for the report"
                    />
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-slate-900">Generation Options</h3>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="scheduledGeneration"
                    name="scheduledGeneration"
                    checked={formData.scheduledGeneration}
                    onChange={handleInputChange}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="scheduledGeneration" className="text-sm font-medium text-slate-700">
                    Schedule Report Generation
                  </label>
                </div>
                
                {formData.scheduledGeneration && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Schedule Time
                    </label>
                    <input
                      type="datetime-local"
                      name="scheduleTime"
                      value={formData.scheduleTime}
                      onChange={handleInputChange}
                      min={new Date().toISOString().slice(0, 16)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin/reports')}
                className="btn-secondary px-6 py-2"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary px-6 py-2 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {formData.scheduledGeneration ? 'Scheduling...' : 'Generating...'}
                  </>
                ) : (
                  formData.scheduledGeneration ? 'Schedule Report' : 'Generate Report'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}