import { useAuth } from '@/auth/AuthContext'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

interface GroupFormData {
  name: string
  description: string
  licenses: number
  permissions: string[]
}

export default function EditGroup() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { groupId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [groupNotFound, setGroupNotFound] = useState(false)
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

  // Mock group data - in real app, this would come from API
  const mockGroups = [
    { id: '0', name: 'Default Group', description: 'Default users Selection', licenses: 2322, permissions: ['basic_access', 'report_generation'] },
    { id: '1', name: 'Pool Group', description: 'Pool users', licenses: 200, permissions: ['basic_access'] },
    { id: '2', name: 'IT Department', description: 'IT Department Users', licenses: 150, permissions: ['basic_access', 'advanced_erasure', 'report_generation', 'system_settings'] },
    { id: '3', name: 'Security Team', description: 'Security Operations', licenses: 75, permissions: ['basic_access', 'advanced_erasure', 'report_generation', 'user_management', 'system_settings', 'license_management'] }
  ]

  useEffect(() => {
    // Simulate loading group data
    const loadGroup = async () => {
      setIsLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundGroup = mockGroups.find(g => g.id === groupId)
      
      if (foundGroup) {
        setFormData({
          name: foundGroup.name,
          description: foundGroup.description,
          licenses: foundGroup.licenses,
          permissions: foundGroup.permissions
        })
      } else {
        setGroupNotFound(true)
      }
      
      setIsLoading(false)
    }
    
    if (groupId) {
      loadGroup()
    }
  }, [groupId])

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
      const updatedGroup = {
        id: groupId,
        ...formData,
        updatedAt: new Date().toISOString()
      }
      
      // console.log('Updating group:', updatedGroup)
      
      // Success message
      alert(`Group "${formData.name}" has been updated successfully!`)
      
      // Navigate back to admin dashboard
      navigate('/admin')
      
    } catch (error) {
      console.error('Error updating group:', error)
      alert('Failed to update group. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (groupNotFound) {
    return (
      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Group Not Found</h1>
          <p className="text-slate-600 mb-6">The group you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/admin')}
            className="btn-primary"
          >
            Back to Admin Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Edit Group - Admin Dashboard | DSecureTech</title>
        <meta name="description" content="Edit group details in the DSecureTech admin dashboard." />
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
                Edit Group
              </h1>
            </div>
            <p className="text-slate-600">
              Update group settings and permissions
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {isLoading && !formData.name ? (
            <div className="card p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-600">Loading group details...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card">
              <div className="px-6 py-5 border-b border-slate-200">
                <h2 className="font-semibold text-slate-900">Group Information</h2>
                <p className="text-sm text-slate-600 mt-1">Update the group settings</p>
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
                      Updating Group...
                    </>
                  ) : (
                    'Update Group'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}