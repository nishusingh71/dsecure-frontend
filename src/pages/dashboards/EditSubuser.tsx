import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useLocation } from 'react-router-dom'
import { useNotification } from '@/contexts/NotificationContext'
import { useAuth } from '@/auth/AuthContext'
import { apiClient } from '@/utils/enhancedApiClient'

// Helper function to get user_email from localStorage (RoleBasedAuth)
function getUserEmailFromStorage(): string | null {
  try {
    const userData = localStorage.getItem('user_data')
    if (!userData) return null
    
    const parsedData = JSON.parse(userData)
    return parsedData.user_email || parsedData.email || null
  } catch (error) {
    console.error('Failed to parse user_data from localStorage:', error)
    return null
  }
}

interface SubuserData {
  subuser_email: string
  name?: string
  role?: string
  department?: string
  status?: string
  phone?: string
  licenseUsage?: number
  created_at?: string
}

export default function EditSubuser() {
  const navigate = useNavigate()
  const location = useLocation()
  const { showSuccess, showError, showInfo } = useNotification()
  const { user } = useAuth()
  
  const userData = location.state?.user as SubuserData
  
  const [formData, setFormData] = useState({
    subuser_email: userData?.subuser_email || '',
    subuser_name: userData?.name || '',
    role: userData?.role || 'user',
    department: userData?.department || '',
    phone: userData?.phone || '',
    status: userData?.status || 'active'
  })
  
  const [loading, setLoading] = useState(false)
  const [fetchingData, setFetchingData] = useState(true)

  // Fetch fresh data from API on component mount
  useEffect(() => {
    const fetchSubuserData = async () => {
      if (!userData?.subuser_email) {
        showError('No User Data', 'No user email provided. Redirecting...')
        setTimeout(() => navigate('/admin/subusers'), 1000)
        return
      }

      try {
        // console.log('🔄 Fetching fresh data for:', userData.subuser_email)
        const res = await apiClient.getEnhancedSubuser(userData.subuser_email)

        if (res?.success && res.data) {
          const enhanced = res.data
          // console.log('✅ Fresh subuser data received:', enhanced)

          // Extract values with proper fallbacks
          const userName = enhanced.subuser_name || enhanced.name || ''
          const userPhone = enhanced.subuser_phone || enhanced.phone || ''
          const userRole = enhanced.role || enhanced.subuser_role || enhanced.defaultRole || 'user'
          const userDept = enhanced.department || ''
          const userStatus = enhanced.status || 'active'

          // console.log('📋 Setting form data:')
          // console.log('  - Email:', enhanced.subuser_email)
          // console.log('  - Name:', userName)
          // console.log('  - Phone:', userPhone)
          // console.log('  - Role:', userRole)
          // console.log('  - Department:', userDept)
          // console.log('  - Status:', userStatus)

          setFormData({
            subuser_email: enhanced.subuser_email,
            subuser_name: userName,
            role: userRole,
            department: userDept,
            phone: userPhone,
            status: userStatus
          })
        } else {
          console.warn('⚠️ Failed to fetch fresh data, using location state')
        }
      } catch (error) {
        console.error('❌ Error fetching subuser data:', error)
        showError('Fetch Error', 'Could not load latest user data. Using cached data.')
      } finally {
        setFetchingData(false)
      }
    }

    fetchSubuserData()
  }, [userData?.subuser_email])

  useEffect(() => {
    if (!userData) {
      showError('No User Data', 'No user data provided. Redirecting...')
      setTimeout(() => navigate('/admin/subusers'), 1000)
    }
  }, [userData, navigate, showError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      showInfo(`Updating user ${formData.subuser_email}...`)
      
      // Get parent email from RoleBasedAuth user_data in localStorage
      let parentEmail: string | undefined | null = getUserEmailFromStorage()
      
      // Fallback to AuthContext if localStorage doesn't have it
      if (!parentEmail) {
        parentEmail = user?.email
      }
      
      // Debug logging
      // console.log('🔍 Debug - User email from localStorage (user_data):', getUserEmailFromStorage())
      // console.log('🔍 Debug - User email from AuthContext:', user?.email)
      // console.log('🔍 Debug - Final parent email:', parentEmail)
      
      // Final validation
      if (!parentEmail || parentEmail === 'unknown@example.com' || parentEmail.includes('unknown')) {
        console.error('❌ Invalid parent email detected:', parentEmail)
        throw new Error('Valid parent email not found. Please log out and log in again.')
      }
      
      // console.log('✅ Using parent email:', parentEmail)
      // console.log('📤 Update request - Parent:', parentEmail, 'Subuser:', formData.subuser_email)
      
      // Update user via EnhancedSubusers/by-parent endpoint
      const response = await apiClient.updateEnhancedSubuserByParent(
        parentEmail,
        formData.subuser_email,
        {
          name: formData.subuser_name,
          role: formData.role,
          department: formData.department,
          phone: formData.phone,
          status: formData.status
        }
      )

      if (response.success) {
        showSuccess(`User ${formData.subuser_email} updated successfully`)
        setTimeout(() => navigate('/admin/subusers'), 1500)
      } else {
        throw new Error(response.error || 'Failed to update user')
      }
    } catch (error) {
      console.error('❌ Error updating user:', error)
      showError('Update Failed', error instanceof Error ? error.message : 'Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/admin/subusers')
  }

  if (!userData || fetchingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
            <svg className="animate-spin h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-slate-600">{fetchingData ? 'Loading user data...' : 'Redirecting...'}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("edit-subuser")} />
      <Helmet>
        <title>Edit Subuser - D-SecureTech Admin</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 sm:p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Subusers
            </button>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Edit Subuser
            </h1>
            <p className="text-slate-600 mt-2">
              Update user information and permissions
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.subuser_email}
                  disabled
                  className="w-full px-4 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-500 cursor-not-allowed"
                />
                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.subuser_name}
                  onChange={(e) => setFormData({ ...formData, subuser_name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="user, manager, admin, superadmin"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="IT Operations"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+1 234 567 8900"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Account Status
                </label>
                <input
                  type="text"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="active, inactive, suspended, pending"
                />
              </div>

              {/* Additional Info (Read-only) */}
              {/* {userData.licenseUsage !== undefined && (
                <div className="bg-slate-50 rounded-md p-4">
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Additional Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">License Usage:</span>
                      <span className="ml-2 font-medium text-slate-900">{userData.licenseUsage}</span>
                    </div>
                    {userData.created_at && (
                      <div>
                        <span className="text-slate-500">Created:</span>
                        <span className="ml-2 font-medium text-slate-900">
                          {new Date(userData.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )} */}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 transition-colors"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    'Update User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
