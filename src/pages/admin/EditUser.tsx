import { useAuth } from '@/auth/AuthContext'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface UserFormData {
  name: string
  email: string
  role: 'admin' | 'user'
  group: string
  licenses: number
  status: 'active' | 'inactive'
}

export default function EditUser() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { userId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'user',
    group: 'Default Group',
    licenses: 5,
    status: 'active'
  })

  const groups = [
    'Default Group',
    'IT Department',
    'Security Team',
    'Pool Group'
  ]

  // Mock user data - in real app, this would come from API
  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'user', group: 'IT Department', licenses: 5, status: 'active' },
    { id: '2', name: 'Alice Admin', email: 'alice.admin@example.com', role: 'admin', group: 'Default Group', licenses: 10, status: 'active' },
    { id: '3', name: 'Bob User', email: 'bob.user@example.com', role: 'user', group: 'Security Team', licenses: 3, status: 'inactive' },
    { id: '4', name: 'Carol Manager', email: 'carol.manager@example.com', role: 'user', group: 'Pool Group', licenses: 8, status: 'active' }
  ]

  useEffect(() => {
    // Simulate loading user data
    const loadUser = async () => {
      setIsLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const foundUser = mockUsers.find(u => u.id === userId)
      
      if (foundUser) {
        setFormData({
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role as 'admin' | 'user',
          group: foundUser.group,
          licenses: foundUser.licenses,
          status: foundUser.status as 'active' | 'inactive'
        })
      } else {
        setUserNotFound(true)
      }
      
      setIsLoading(false)
    }
    
    if (userId) {
      loadUser()
    }
  }, [userId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'licenses' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would make actual API call to backend
      const updatedUser = {
        id: userId,
        ...formData,
        updatedAt: new Date().toISOString()
      }
      
      // console.log('Updating user:', updatedUser)
      
      // Success message
      alert(`User "${formData.name}" has been updated successfully!`)
      
      // Navigate back to users list
      navigate('/admin/users')
      
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (userNotFound) {
    return (
      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">User Not Found</h1>
          <p className="text-slate-600 mb-6">The user you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/admin/users')}
            className="btn-primary"
          >
            Back to Users
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Edit User - Admin Dashboard | DSecureTech</title>
        <meta name="description" content="Edit user details in the DSecureTech admin dashboard." />
      </Helmet>

      <div className="container-app py-8 lg:py-12 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <button 
                onClick={() => navigate('/admin/users')}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Edit User
              </h1>
            </div>
            <p className="text-slate-600">
              Update user account details and permissions
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {isLoading && !formData.name ? (
            <div className="card p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-slate-600">Loading user details...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card">
              <div className="px-6 py-5 border-b border-slate-200">
                <h2 className="font-semibold text-slate-900">User Information</h2>
                <p className="text-sm text-slate-600 mt-1">Update the user details below</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50"
                      placeholder="user@example.com"
                      disabled
                    />
                    <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>

                {/* Role and Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      User Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      User Group
                    </label>
                    <select
                      name="group"
                      value={formData.group}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      {groups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Licenses and Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      max="50"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Account Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/admin/users')}
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
                      Updating User...
                    </>
                  ) : (
                    'Update User'
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