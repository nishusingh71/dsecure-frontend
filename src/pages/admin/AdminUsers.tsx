import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { useAuth } from '@/auth/AuthContext'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  lastLogin: string
  group: string
  licenses: number
}

export default function AdminUsers() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  
  // State for license assignment modal
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [licenseCount, setLicenseCount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const users: User[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'user',
      status: 'active',
      lastLogin: 'Oct 08, 2025',
      group: 'IT Department',
      licenses: 5
    },
    {
      id: '2',
      email: 'alice.admin@example.com',
      name: 'Alice Admin',
      role: 'admin',
      status: 'active',
      lastLogin: 'Oct 09, 2025',
      group: 'Default Group',
      licenses: 10
    },
    {
      id: '3',
      email: 'bob.user@example.com',
      name: 'Bob User',
      role: 'user',
      status: 'inactive',
      lastLogin: 'Oct 05, 2025',
      group: 'Security Team',
      licenses: 3
    },
    {
      id: '4',
      email: 'carol.manager@example.com',
      name: 'Carol Manager',
      role: 'user',
      status: 'active',
      lastLogin: 'Oct 09, 2025',
      group: 'Pool Group',
      licenses: 8
    }
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      // Handle user deletion
      // console.log('Deleting user:', userId)
    }
  }

  const handleAssignLicense = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) {
      console.log('User not found')
      return
    }
    
    setSelectedUser(user)
    setLicenseCount(user.licenses.toString())
    setIsLicenseModalOpen(true)
  }

  const handleLicenseSubmit = async () => {
    if (!selectedUser) return
    
    const newCount = Number(licenseCount)
    if (isNaN(newCount) || newCount < 0) {
      console.log('Please enter a valid license count (0 or greater)')
      return
    }
    
    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // console.log(`Updating licenses for user ${selectedUser.id} from ${selectedUser.licenses} to ${newCount}`)
      
      // Update the user licenses in the mock data
      const userIndex = users.findIndex(u => u.id === selectedUser.id)
      if (userIndex !== -1) {
        users[userIndex].licenses = newCount
      }
      
      console.log(`Successfully assigned ${newCount} license(s) to ${selectedUser.name}`)
      setIsLicenseModalOpen(false)
      setSelectedUser(null)
      setLicenseCount('')
    } catch (error) {
      console.error('Failed to assign licenses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("admin-users")} />
      <Helmet>
        <title>Manage Users - Admin Dashboard | DSecureTech</title>
        <meta name="description" content="Manage user accounts, roles, and permissions in DSecureTech admin dashboard." />
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
                Manage Users
              </h1>
            </div>
            <p className="text-slate-600">
              Add, edit, and manage user accounts and permissions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button 
              onClick={() => navigate('/admin/users/add')}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New User
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Search Users</label>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedRole('all')
                    setSelectedStatus('all')
                  }}
                  className="w-full btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="card">
          <div className="px-4 sm:px-6 py-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">
              Users ({filteredUsers.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-slate-500 border-b border-slate-200">
                  <th className="px-4 sm:px-6 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Group</th>
                  <th className="px-4 py-3 font-medium">Licenses</th>
                  <th className="px-4 py-3 font-medium">Last Login</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50">
                    <td className="px-4 sm:px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 ${
                        user.status === 'active' ? 'text-green-600' : 'text-slate-500'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          user.status === 'active' ? 'bg-green-400' : 'bg-slate-400'
                        }`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{user.group}</td>
                    <td className="px-4 py-4 text-slate-600">{user.licenses}</td>
                    <td className="px-4 py-4 text-slate-600">{user.lastLogin}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/users/edit/${user.id}`)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleAssignLicense(user.id)}
                          className="text-emerald-600 hover:text-emerald-700 text-sm font-medium px-2 py-1 rounded hover:bg-emerald-50 transition-colors"
                        >
                          Assign License
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* License Assignment Modal */}
        {isLicenseModalOpen && selectedUser && (
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
                    <p className="text-sm text-slate-600">Update license count for {selectedUser.name}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Licenses: {selectedUser.licenses}
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
                        <span>User:</span>
                        <span className="font-medium">{selectedUser.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{selectedUser.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Group:</span>
                        <span className="font-medium">{selectedUser.group}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Licenses:</span>
                        <span className="font-medium">{selectedUser.licenses}</span>
                      </div>
                      {licenseCount && !isNaN(Number(licenseCount)) && (
                        <div className="flex justify-between text-emerald-600 font-medium mt-1 pt-1 border-t">
                          <span>New Licenses:</span>
                          <span>{Number(licenseCount)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setIsLicenseModalOpen(false)
                      setSelectedUser(null)
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
                    {isLoading ? 'Assigning...' : 'Assign Licenses'}
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
