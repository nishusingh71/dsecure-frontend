import { useAuth } from '@/auth/AuthContext'
import { useNotification } from '@/contexts/NotificationContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { AdminDashboardAPI, type ProfileData } from '@/services/adminDashboardAPI'
import { getPrimaryRole } from '@/utils/roleHelper'

export default function AdminProfileEdit() {
  const { user } = useAuth()
  const { showSuccess, showError, showInfo } = useNotification()
  const navigate = useNavigate()
  
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  
  // Initialize with user data from localStorage (login time data)
  const getUserDataFromStorage = () => {
    const storedUser = localStorage.getItem('user_data');
    const authUser = localStorage.getItem('authUser');
    
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error('Error parsing user_data:', e);
      }
    }
    
    if (authUser) {
      try {
        return JSON.parse(authUser);
      } catch (e) {
        console.error('Error parsing authUser:', e);
      }
    }
    
    return null;
  };
  
  const storedUserData = getUserDataFromStorage();
  
  // Get primary role using helper (supports roles array)
  const primaryRole = getPrimaryRole(storedUserData) || user?.role || 'user';
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: storedUserData?.user_name || user?.name || '',
    email: storedUserData?.user_email || user?.email || '',
    timezone: storedUserData?.timezone || 'Asia/Kolkata',
    role: primaryRole,
    phone: storedUserData?.phone_number || '',
    department: storedUserData?.department || ''
  })

  // Load profile data on component mount
  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    setDataLoading(true)
    try {
      const response = await AdminDashboardAPI.getAdminProfile()
      if (response.success) {
        setProfileData(response.data)
      } else {
        // If API fails, use data from localStorage or JWT token
        const storedData = getUserDataFromStorage();
        const fallbackRole = getPrimaryRole(storedData) || user?.role || 'user';
        showInfo('Loading from session', 'Using your login information')
        setProfileData({
          name: storedData?.user_name || user?.name || '',
          email: storedData?.user_email || user?.email || '',
          timezone: storedData?.timezone || 'Asia/Kolkata',
          role: fallbackRole,
          phone: storedData?.phone_number || '',
          department: storedData?.department || ''
        })
      }
    } catch (error) {
      console.error('Profile data loading error:', error)
      // Fallback to localStorage or JWT token data on error
      const storedData = getUserDataFromStorage();
      const fallbackRole = getPrimaryRole(storedData) || user?.role || 'user';
      showInfo('Loading from session', 'Using your login information')
      setProfileData({
        name: storedData?.user_name || user?.name || '',
        email: storedData?.user_email || user?.email || '',
        timezone: storedData?.timezone || 'Asia/Kolkata',
        role: fallbackRole,
        phone: storedData?.phone_number || '',
        department: storedData?.department || ''
      })
    } finally {
      setDataLoading(false)
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      const response = await AdminDashboardAPI.updateAdminProfile(profileData)
      
      if (response.success) {
        showSuccess(
          'Profile Updated Successfully',
          'Your profile information has been updated.'
        )
        // Navigate back to admin dashboard
        navigate('/admin')
      } else {
        throw new Error(response.error || 'Update failed')
      }
    } catch (error) {
      console.error('Profile update error:', error)
      showError('Update Failed', 'Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const timezones = [
    'Asia/Kolkata',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
    'America/Los_Angeles',
    'Europe/Paris',
    'Asia/Dubai'
  ]

  return (
    <>
      <Helmet>
        <title>Edit Profile - Admin Dashboard | DSecureTech</title>
        <meta name="description" content="Edit admin profile information and settings." />
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
                Edit Profile
              </h1>
            </div>
            <p className="text-slate-600">
              Update your profile information and preferences
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="card !p-8">
            {/* Loading State */}
            {dataLoading && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 text-slate-600">
                  <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading profile data...
                </div>
              </div>
            )}

            {/* Profile Form - Show only when data is loaded */}
            {!dataLoading && (
              <>
            {/* Profile Avatar Section */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-brand to-brand-600 rounded-full mx-auto flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
              <button className="text-brand hover:text-brand-700 text-sm font-medium">
                Change Profile Picture
              </button>
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    value={profileData.department || ''}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                    placeholder="Enter your department"
                  />
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Time Zone *
                  </label>
                  <select
                    value={profileData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                  >
                    {timezones.map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={profileData.role}
                    readOnly
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-1">Role cannot be changed</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-brand to-brand-600 text-white rounded-lg hover:from-brand-600 hover:to-brand-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => navigate('/admin')}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
            </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}