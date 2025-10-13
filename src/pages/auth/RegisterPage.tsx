import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'
import { SkeletonForm } from '@/components/Skeleton'
import { Helmet } from 'react-helmet-async'

export default function RegisterPage() {
  const { register, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  // Form state for all required fields
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    phone_number: '',
    includeCompanyInfo: false,
    company_name: '',
    company_size: '',
    industry: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!formData.user_name || !formData.user_email || !formData.user_password || !formData.phone_number) {
      setError('Please fill all required fields')
      return
    }
    
    setLoading(true)
    try {
      // Prepare the registration data
      const registrationData = {
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_password: formData.user_password,
        phone_number: formData.phone_number,
        company_name: formData.includeCompanyInfo ? formData.company_name : '',
        company_size: formData.includeCompanyInfo ? formData.company_size : '',
        industry: formData.includeCompanyInfo ? formData.industry : ''
      }

      // Direct API call to your endpoint
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuccess('Account created successfully!')
      
      // Also register in local auth context for session management  
      await register({
        user_name: formData.user_name,
        user_email: formData.user_email,
        user_password: formData.user_password,
        phone_number: formData.phone_number,
        is_private_cloud: false,
        private_api: false,
        payment_details_json: '',
        license_details_json: ''
      })
      
      // Check if there's a return path from pricing flow
      const returnPath = localStorage.getItem('returnPath')
      if (returnPath) {
        localStorage.removeItem('returnPath')
        navigate(returnPath, { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    } catch (error) {
      console.error('Error creating user:', error);
      
      let errorMessage = 'Failed to create account. Please try again.'
      
      if (error instanceof Error) {
        if (error.message.includes('409') || error.message.toLowerCase().includes('already exists')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.'
        } else if (error.message.includes('400') || error.message.toLowerCase().includes('validation')) {
          errorMessage = 'Please check your registration information and try again.'
        } else if (error.message.toLowerCase().includes('fetch')) {
          errorMessage = 'Unable to connect to server. Please check your internet connection and try again.'
        } else {
          errorMessage = error.message
        }
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <Helmet>
        <title>Create Account | DSecure Tech - Secure Data Erasure Solutions</title>
        <meta name="description" content="Create your DSecure Tech account to access professional data erasure solutions. Join thousands of enterprises securing their data with Compliant erasure." />
        <meta name="keywords" content="DSecure register, create account, data erasure signup, enterprise data security, secure erasure account" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://dsecuretech.com/register" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Create Account | DSecure Tech" />
        <meta property="og:description" content="Join DSecure Tech for professional data erasure solutions. Create your account today." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dsecuretech.com/register" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Create Account | DSecure Tech" />
        <meta name="twitter:description" content="Join DSecure Tech for professional data erasure solutions." />
      </Helmet>
      <div className="w-full max-w-lg px-6 sm:px-8 py-8 sm:py-12 rounded-2xl bg-white/60 backdrop-blur-xl shadow-2xl shadow-slate-900/10 overflow-hidden">
        {authLoading ? (
          <SkeletonForm fields={4} hasTitle={true} hasSubmitButton={true} className="p-0" />
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="mt-3 text-sm text-slate-600">
                Join DSecure to secure your data management
              </p>
              
              {/* Error and Success Messages */}
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}
              
              {success && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {success}
                  </p>
                </div>
              )}
            </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <label htmlFor="user_name" className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name *
            </label>
            <input 
              id="user_name"
              className="input-field" 
              placeholder="Enter your full name" 
              value={formData.user_name} 
              onChange={(e) => updateFormData('user_name', e.target.value)} 
              required 
            />
          </div>
          
          <div>
            <label htmlFor="user_email" className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              Email Address *
            </label>
            <input 
              id="user_email"
              className="input-field" 
              placeholder="Enter your email" 
              type="email" 
              value={formData.user_email} 
              onChange={(e) => updateFormData('user_email', e.target.value)} 
              required 
            />
            <p className="mt-2 text-xs text-slate-500">
              Use @admin.com email for admin access
            </p>
          </div>
          
          <div>
            <label htmlFor="user_password" className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Password *
            </label>
            <input 
              id="user_password"
              className="input-field" 
              placeholder="Create a strong password" 
              type="password" 
              value={formData.user_password} 
              onChange={(e) => updateFormData('user_password', e.target.value)} 
              required 
            />
          </div>

          <div>
            <label htmlFor="phone_number" className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Phone Number *
            </label>
            <input 
              id="phone_number"
              className="input-field" 
              placeholder="Enter your phone number" 
              type="tel" 
              value={formData.phone_number} 
              onChange={(e) => updateFormData('phone_number', e.target.value)} 
              required 
            />
          </div>

          {/* Company Information Checkbox */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="includeCompanyInfo"
                className="w-4 h-4 text-brand bg-gray-100 border-gray-300 rounded focus:ring-brand focus:ring-2"
                checked={formData.includeCompanyInfo}
                onChange={(e) => updateFormData('includeCompanyInfo', e.target.checked)}
              />
              <label htmlFor="includeCompanyInfo" className="text-sm font-medium text-slate-700">
                Include company information (optional)
              </label>
            </div>

            {formData.includeCompanyInfo && (
              <div className="space-y-4 pl-7">
                <div>
                  <label htmlFor="company_name" className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Company Name
                  </label>
                  <input 
                    id="company_name"
                    className="input-field" 
                    placeholder="Enter your company name" 
                    value={formData.company_name} 
                    onChange={(e) => updateFormData('company_name', e.target.value)} 
                  />
                </div>

                <div>
                  <label htmlFor="company_size" className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 119.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Company Size
                  </label>
                  <select 
                    id="company_size"
                    className="input-field" 
                    value={formData.company_size} 
                    onChange={(e) => updateFormData('company_size', e.target.value)}
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="industry" className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Industry
                  </label>
                  <select 
                    id="industry"
                    className="input-field" 
                    value={formData.industry} 
                    onChange={(e) => updateFormData('industry', e.target.value)}
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="government">Government</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="retail">Retail</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <button 
            disabled={loading} 
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading && (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {loading ? 'Creating Account...' : 'Create Account'}
            {!loading && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        </form>

        <div className="mt-8">
          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <a href="/login" className="text-brand font-medium hover:text-brand-600">
              Sign in
            </a>
          </p>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">Protected by</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-center space-x-6">
                <div className="text-slate-400 text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                  SSL Encryption
                </div>
                <div className="text-slate-400 text-sm flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure Data
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  )
}


