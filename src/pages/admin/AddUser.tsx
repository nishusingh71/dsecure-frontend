import { useAuth } from '@/auth/AuthContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { apiClient } from '@/utils/enhancedApiClient'

interface UserFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: 'admin' | 'user'
  group: string
  licenses: number
  status: 'active' | 'inactive'
}

// Interface for displaying logged-in user details
interface LoggedInUserData {
  user_name: string
  user_email: string
  department: string
  role: string
  user_group: string
}

export default function AddUser() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [userDetailsLoading, setUserDetailsLoading] = useState(true)
  const [loggedInUserData, setLoggedInUserData] = useState<LoggedInUserData | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  // Fetch logged-in user details on component mount
  useEffect(() => {
    fetchLoggedInUserDetails()
  }, [])

  const fetchLoggedInUserDetails = async () => {
    setUserDetailsLoading(true)
    try {
      // Get user email from localStorage or auth context
      let storedUserData = null
      const storedUser = localStorage.getItem('user_data')
      const authUser = localStorage.getItem('authUser')
      
      if (storedUser) {
        try {
          storedUserData = JSON.parse(storedUser)
        } catch (e) {
          console.error('Error parsing user_data:', e)
        }
      }
      
      if (!storedUserData && authUser) {
        try {
          storedUserData = JSON.parse(authUser)
        } catch (e) {
          console.error('Error parsing authUser:', e)
        }
      }
      
      const userEmail = storedUserData?.user_email || user?.email || ''
      
      if (!userEmail) {
        console.warn('⚠️ No user email found')
        setUserDetailsLoading(false)
        return
      }

      // console.log('📧 Fetching user details for:', userEmail)
      
      // Fetch user details from /api/Users/{email}
      const userRes = await apiClient.getUserByEmail(userEmail)
      
      if (userRes.success && userRes.data) {
        const userData = userRes.data
        
        // Prepare display data with fallback for user_group
        const displayData: LoggedInUserData = {
          user_name: userData.user_name || 'N/A',
          user_email: userData.user_email || userEmail,
          department: userData.department || 'N/A',
          role: userData.user_role || userData.role || 'user',
          // If user_group is not present or empty, use department
          user_group: userData.user_group || userData.department || 'N/A'
        }
        
        setLoggedInUserData(displayData)
        // console.log('✅ Logged-in user data loaded:', displayData)
      } else {
        console.warn('⚠️ Failed to fetch user details:', userRes.error)
      }
    } catch (error) {
      console.error('❌ Error fetching logged-in user details:', error)
    } finally {
      setUserDetailsLoading(false)
    }
  }

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
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would make actual API call to backend
      const newUser = {
        id: Date.now().toString(),
        ...formData,
        lastLogin: 'Never',
        createdAt: new Date().toISOString()
      }
      
      // console.log('Creating user:', newUser)
      
      // Success message
      alert(`User "${formData.name}" has been created successfully!`)
      
      // Navigate back to users list
      navigate('/admin/users')
      
    } catch (error) {
      console.error('Error creating user:', error)
      alert('Failed to create user. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Add New User - Admin Dashboard | DSecureTech</title>
        <meta name="description" content="Add a new user to the DSecureTech admin dashboard." />
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
                Add New User
              </h1>
            </div>
            <p className="text-slate-600">
              Create a new user account with appropriate permissions
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Logged-in User Details Card */}
          {userDetailsLoading ? (
            <div className="card mb-6">
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
                  <p className="text-slate-600">Loading your details...</p>
                </div>
              </div>
            </div>
          ) : loggedInUserData ? (
            <div className="card mb-6 bg-gradient-to-br from-emerald-50 to-teal-50">
              <div className="px-6 py-4 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="font-semibold text-slate-900">Your Account Details</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Name</p>
                    <p className="text-sm font-medium text-slate-900">{loggedInUserData.user_name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</p>
                    <p className="text-sm font-medium text-slate-900">{loggedInUserData.user_email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Department</p>
                    <p className="text-sm font-medium text-slate-900">{loggedInUserData.department}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Role</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      loggedInUserData.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      loggedInUserData.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {loggedInUserData.role}
                    </span>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">User Group</p>
                    <p className="text-sm font-medium text-slate-900">{loggedInUserData.user_group}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Add User Form */}
          <form onSubmit={handleSubmit} className="card">
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">User Information</h2>
              <p className="text-sm text-slate-600 mt-1">Enter the details for the new user</p>
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
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Minimum 8 characters"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Confirm password"
                  />
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
                    Creating User...
                  </>
                ) : (
                  'Create User'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}