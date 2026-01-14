import { useAuth } from '@/auth/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface GroupFormData {
  name: string
  description: string
  licenses: number
  permissions: string[]
}

export default function AddGroup() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    licenses: 100,
    permissions: ['basic_access']
  })

  const availablePermissions = [
    { id: 'basic_access', name: 'Basic Access', description: 'Access to basic erasure tools' },
    { id: 'advanced_erasure', name: 'Advanced Erasure', description: 'Access to advanced erasure methods' },
    { id: 'report_generation', name: 'Report Generation', description: 'Generate and download reports' },
    { id: 'user_management', name: 'User Management', description: 'Manage other users (Admin only)' },
    { id: 'system_settings', name: 'System Settings', description: 'Configure system settings' },
    { id: 'license_management', name: 'License Management', description: 'Manage license allocation' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'licenses' ? parseInt(value) || 0 : value
    }))
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked 
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(p => p !== permissionId)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.description) {
      alert('Please fill in all required fields')
      return
    }
    
    if (formData.permissions.length === 0) {
      alert('Please select at least one permission')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would make actual API call to backend
      const newGroup = {
        id: Date.now().toString(),
        ...formData,
        userCount: 0,
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      }
      
      // console.log('Creating group:', newGroup)
      
      // Success message
      alert(`Group "${formData.name}" has been created successfully!`)
      
      // Navigate back to admin dashboard
      navigate('/admin')
      
    } catch (error) {
      console.error('Error creating group:', error)
      alert('Failed to create group. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Add New Group - Admin Dashboard | DSecureTech</title>
        <meta name="description" content="Create a new user group in the DSecureTech admin dashboard." />
      </Helmet>

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <button 
                onClick={() => navigate('/admin')}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Add New Group
              </h1>
            </div>
            <p className="text-slate-600">
              Create a new user group with specific permissions and license allocation
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="card">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">Group Information</h2>
              <p className="text-sm text-slate-600 mt-1">Configure the new group settings</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Describe the purpose of this group"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  License Allocation
                </label>
                <input
                  type="number"
                  name="licenses"
                  value={formData.licenses}
                  onChange={handleInputChange}
                  min="1"
                  max="1000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p className="text-sm text-slate-500 mt-1">Number of licenses allocated to this group</p>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-4">
                  Group Permissions *
                </label>
                <div className="space-y-3">
                  {availablePermissions.map(permission => (
                    <div key={permission.id} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={formData.permissions.includes(permission.id)}
                        onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                        className="mt-1 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex-1">
                        <label htmlFor={permission.id} className="text-sm font-medium text-slate-700 cursor-pointer">
                          {permission.name}
                        </label>
                        <p className="text-sm text-slate-500">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Permissions Summary */}
              {formData.permissions.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-emerald-800 mb-2">Selected Permissions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.permissions.map(permissionId => {
                      const permission = availablePermissions.find(p => p.id === permissionId)
                      return (
                        <span key={permissionId} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {permission?.name}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin')}
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
                    Creating Group...
                  </>
                ) : (
                  'Create Group'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}