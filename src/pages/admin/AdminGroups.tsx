import { useAuth } from '@/auth/AuthContext'
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Group {
  id: string
  name: string
  description: string
  licenses: number
  permissions: string[]
  userCount: number
  createdDate: string
}

export default function AdminGroups() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Mock groups data - in real app, this would come from API
  const mockGroups: Group[] = [
    {
      id: '0',
      name: 'Default Group',
      description: 'Default users Selection',
      licenses: 2322,
      permissions: ['basic_access', 'report_generation'],
      userCount: 150,
      createdDate: '2024-01-15'
    },
    {
      id: '1',
      name: 'Pool Group',
      description: 'Pool users',
      licenses: 200,
      permissions: ['basic_access'],
      userCount: 45,
      createdDate: '2024-02-20'
    },
    {
      id: '2',
      name: 'IT Department',
      description: 'IT Department Users',
      licenses: 150,
      permissions: ['basic_access', 'advanced_erasure', 'report_generation', 'system_settings'],
      userCount: 25,
      createdDate: '2024-03-10'
    },
    {
      id: '3',
      name: 'Security Team',
      description: 'Security Operations',
      licenses: 75,
      permissions: ['basic_access', 'advanced_erasure', 'report_generation', 'user_management', 'system_settings', 'license_management'],
      userCount: 8,
      createdDate: '2024-03-15'
    }
  ]

  const handleDeleteGroup = (groupId: string) => {
    const group = mockGroups.find(g => g.id === groupId)
    if (!group) {
      alert('Group not found')
      return
    }
    
    if (group.userCount > 0) {
      alert(`Cannot delete "${group.name}" because it has ${group.userCount} active users. Please reassign users first.`)
      return
    }
    
    if (confirm(`Are you sure you want to delete the group "${group.name}"?`)) {
      // Here you would make API call to delete the group
      alert(`Group "${group.name}" has been deleted successfully!`)
    }
  }

  // State for license assignment modal
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [licenseCount, setLicenseCount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAssignGroupLicense = (groupId: string) => {
    const group = mockGroups.find(g => g.id === groupId)
    if (!group) {
      alert('Group not found')
      return
    }
    
    setSelectedGroup(group)
    setLicenseCount(group.licenses.toString())
    setIsLicenseModalOpen(true)
  }

  const handleLicenseSubmit = async () => {
    if (!selectedGroup) return
    
    const newCount = Number(licenseCount)
    if (isNaN(newCount) || newCount < 0) {
      alert('Please enter a valid license count (0 or greater)')
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // console.log(`Updating licenses for group ${selectedGroup.id} from ${selectedGroup.licenses} to ${newCount}`)
      
      // Update the group licenses in the mock data
      const groupIndex = mockGroups.findIndex(g => g.id === selectedGroup.id)
      if (groupIndex !== -1) {
        mockGroups[groupIndex].licenses = newCount
      }
      
      alert(`Successfully updated ${selectedGroup.name} license count from ${selectedGroup.licenses.toLocaleString()} to ${newCount.toLocaleString()}`)
      setIsLicenseModalOpen(false)
      setSelectedGroup(null)
      setLicenseCount('')
    } catch (error) {
      alert('Failed to update licenses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredGroups = mockGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const permissionLabels: Record<string, string> = {
    'basic_access': 'Basic Access',
    'advanced_erasure': 'Advanced Erasure',
    'report_generation': 'Report Generation',
    'user_management': 'User Management',
    'system_settings': 'System Settings',
    'license_management': 'License Management'
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("admin-groups")} />
      <Helmet>
        <title>Manage Groups - Admin Dashboard | DSecureTech</title>
        <meta name="description" content="Manage user groups and permissions in the DSecureTech admin dashboard." />
      </Helmet>

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
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
                Manage Groups
              </h1>
            </div>
            <p className="text-slate-600">
              Create and manage user groups with specific permissions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={() => navigate('/admin/groups/add')}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Group
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="card mb-6">
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Search Groups</label>
                <input
                  type="text"
                  placeholder="Search by group name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex items-end">
                <div className="text-sm text-slate-600">
                  Showing {filteredGroups.length} of {mockGroups.length} groups
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div key={group.id} className="card hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{group.name}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{group.description}</p>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <button
                      onClick={() => navigate(`/admin/groups/edit/${group.id}`)}
                      className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                      title="Edit Group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleAssignGroupLicense(group.id)}
                      className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50 transition-colors"
                      title="Assign License"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Delete Group"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-slate-200">
                  <div>
                    <div className="text-sm font-medium text-slate-700">Users</div>
                    <div className="text-lg font-semibold text-slate-900">{group.userCount}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">Licenses</div>
                    <div className="text-lg font-semibold text-slate-900">{group.licenses.toLocaleString()}</div>
                  </div>
                </div>

                {/* Permissions */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-slate-700 mb-2">Permissions</div>
                  <div className="flex flex-wrap gap-1">
                    {group.permissions.slice(0, 3).map(permission => (
                      <span key={permission} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {permissionLabels[permission] || permission}
                      </span>
                    ))}
                    {group.permissions.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        +{group.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Created Date */}
                <div className="text-xs text-slate-500">
                  Created: {new Date(group.createdDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No groups found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first group.'}
            </p>
            {!searchTerm && (
              <button 
                onClick={() => navigate('/admin/groups/add')}
                className="btn-primary"
              >
                Create New Group
              </button>
            )}
          </div>
        )}

        {/* License Assignment Modal */}
        {isLicenseModalOpen && selectedGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Assign Licenses</h3>
                    <p className="text-sm text-slate-600">Update license count for {selectedGroup.name}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Licenses: {selectedGroup.licenses.toLocaleString()}
                    </label>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New License Count
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={licenseCount}
                      onChange={(e) => setLicenseCount(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter license count"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Current Users:</span>
                        <span className="font-medium">{selectedGroup.userCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Licenses:</span>
                        <span className="font-medium">{selectedGroup.licenses.toLocaleString()}</span>
                      </div>
                      {licenseCount && !isNaN(Number(licenseCount)) && (
                        <div className="flex justify-between text-emerald-600 font-medium mt-1 pt-1 border-t">
                          <span>New Licenses:</span>
                          <span>{Number(licenseCount).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setIsLicenseModalOpen(false)
                      setSelectedGroup(null)
                      setLicenseCount('')
                    }}
                    className="px-4 py-2 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLicenseSubmit}
                    disabled={isLoading || !licenseCount || isNaN(Number(licenseCount)) || Number(licenseCount) < 0}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isLoading && (
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )}
                    {isLoading ? 'Updating...' : 'Update Licenses'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}