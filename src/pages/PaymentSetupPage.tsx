import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'
import { SetupStatusAlert, useSetupStatus } from '@/components/PaymentLicenseGuard'
import { authService } from '../utils/authService'

interface PlanDetails {
  title: string
  price: string
}

interface SetupFormData {
  // Payment Details
  payment_method: string
  card_number: string
  expiry_date: string
  cvv: string
  cardholder_name: string
  billing_address: string
  
  // License Details
  license_type: string
  company_name: string
  license_count: number
  license_duration: string
  license_features: string[]
}

export default function PaymentSetupPage() {
  const navigate = useNavigate()
  const { user, getSmartRedirectPath } = useAuth()
  const setupStatus = useSetupStatus()
  
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [setupComplete, setSetupComplete] = useState(false)
  
  const [formData, setFormData] = useState<SetupFormData>({
    // Payment Details
    payment_method: 'card',
    card_number: '',
    expiry_date: '',
    cvv: '',
    cardholder_name: '',
    billing_address: '',
    
    // License Details
    license_type: 'standard',
    company_name: '',
    license_count: 1,
    license_duration: '1-year',
    license_features: ['basic-erasure']
  })

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      navigate('/login')
      return
    }

    // Get selected plan from localStorage
    const planData = localStorage.getItem('selectedPlan')
    if (planData) {
      setSelectedPlan(JSON.parse(planData))
    }

    // If user setup is already complete, redirect to dashboard
    if (setupStatus.isComplete) {
      const redirectPath = getSmartRedirectPath()
      navigate(redirectPath, { replace: true })
    }
  }, [user, navigate, setupStatus.isComplete, getSmartRedirectPath])

  // Pre-fill form with existing data if available
  useEffect(() => {
    if (user) {
      try {
        if (user.payment_details_json && user.payment_details_json !== '{}') {
          const paymentData = JSON.parse(user.payment_details_json)
          setFormData(prev => ({ ...prev, ...paymentData }))
        }
        
        if (user.license_details_json && user.license_details_json !== '{}') {
          const licenseData = JSON.parse(user.license_details_json)
          setFormData(prev => ({ ...prev, ...licenseData }))
        }
      } catch (error) {
        console.error('Error parsing existing setup data:', error)
      }
    }
  }, [user])

  const handleInputChange = (field: keyof SetupFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmitPaymentDetails = async () => {
    setIsProcessing(true)
    
    try {
      // Prepare payment details
      const paymentDetails = {
        payment_method: formData.payment_method,
        card_number: formData.card_number.replace(/\s/g, ''), // Remove spaces
        expiry_date: formData.expiry_date,
        cardholder_name: formData.cardholder_name,
        billing_address: formData.billing_address,
        setup_date: new Date().toISOString(),
        status: 'active'
      }

      // In a real app, you would call your API to update user payment details
      // await apiClient.updateUserPaymentDetails(paymentDetails)
      
      // For now, we'll simulate success
      // //console.log('Payment details saved:', paymentDetails)
      
      // Move to license step
      setCurrentStep(2)
      
    } catch (error) {
      console.error('Payment setup failed:', error)
      alert('Payment setup failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmitLicenseDetails = async () => {
    setIsProcessing(true)
    
    try {
      // Prepare license details
      const licenseDetails = {
        license_type: formData.license_type,
        company_name: formData.company_name,
        license_count: formData.license_count,
        license_duration: formData.license_duration,
        license_features: formData.license_features,
        issue_date: new Date().toISOString(),
        expiry_date: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)).toISOString(), // 1 year from now
        status: 'active'
      }

      // In a real app, you would call your API to update user license details
      // await apiClient.updateUserLicenseDetails(licenseDetails)
      
      // For now, we'll simulate success
      // //console.log('License details saved:', licenseDetails)
      
      setSetupComplete(true)
      
      // After a short delay, redirect to the appropriate dashboard
      setTimeout(() => {
        const redirectPath = getSmartRedirectPath()
        navigate(redirectPath, { replace: true })
      }, 2000)
      
    } catch (error) {
      console.error('License setup failed:', error)
      alert('License setup failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={formData.payment_method}
              onChange={(e) => handleInputChange('payment_method', e.target.value)}
              className="input-field"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="bank">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {formData.payment_method === 'card' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={formData.cardholder_name}
                  onChange={(e) => handleInputChange('cardholder_name', e.target.value)}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={formData.card_number}
                  onChange={(e) => {
                    // Format card number with spaces
                    const value = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
                    handleInputChange('card_number', value)
                  }}
                  className="input-field"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={formData.expiry_date}
                    onChange={(e) => {
                      // Format as MM/YY
                      const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2')
                      handleInputChange('expiry_date', value)
                    }}
                    className="input-field"
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    className="input-field"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Address
                </label>
                <textarea
                  value={formData.billing_address}
                  onChange={(e) => handleInputChange('billing_address', e.target.value)}
                  className="input-field"
                  placeholder="123 Main St, City, State, ZIP"
                  rows={3}
                  required
                />
              </div>
            </>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/pricing')}
            className="btn-secondary"
          >
            Back to Pricing
          </button>
          <button
            type="button"
            onClick={handleSubmitPaymentDetails}
            disabled={isProcessing}
            className="btn-primary"
          >
            {isProcessing ? 'Processing...' : 'Continue to License'}
          </button>
        </div>
      </div>
    </div>
  )

  const renderLicenseStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">License Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company_name}
              onChange={(e) => handleInputChange('company_name', e.target.value)}
              className="input-field"
              placeholder="Your Company Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Type
            </label>
            <select
              value={formData.license_type}
              onChange={(e) => handleInputChange('license_type', e.target.value)}
              className="input-field"
            >
              <option value="standard">Standard License</option>
              <option value="professional">Professional License</option>
              <option value="enterprise">Enterprise License</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Licenses
            </label>
            <input
              type="number"
              value={formData.license_count}
              onChange={(e) => handleInputChange('license_count', parseInt(e.target.value) || 1)}
              className="input-field"
              min="1"
              max="1000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Duration
            </label>
            <select
              value={formData.license_duration}
              onChange={(e) => handleInputChange('license_duration', e.target.value)}
              className="input-field"
            >
              <option value="1-month">1 Month</option>
              <option value="3-months">3 Months</option>
              <option value="6-months">6 Months</option>
              <option value="1-year">1 Year</option>
              <option value="2-years">2 Years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              License Features
            </label>
            <div className="space-y-2">
              {[
                { value: 'basic-erasure', label: 'Basic Data Erasure' },
                { value: 'advanced-erasure', label: 'Advanced Data Erasure' },
                { value: 'compliance-reporting', label: 'Compliance Reporting' },
                { value: 'cloud-integration', label: 'Cloud Integration' },
                { value: 'api-access', label: 'API Access' }
              ].map((feature) => (
                <label key={feature.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.license_features.includes(feature.value)}
                    onChange={(e) => {
                      const newFeatures = e.target.checked
                        ? [...formData.license_features, feature.value]
                        : formData.license_features.filter(f => f !== feature.value)
                      handleInputChange('license_features', newFeatures)
                    }}
                    className="mr-2"
                  />
                  {feature.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            className="btn-secondary"
          >
            Back to Payment
          </button>
          <button
            type="button"
            onClick={handleSubmitLicenseDetails}
            disabled={isProcessing}
            className="btn-primary"
          >
            {isProcessing ? 'Setting up...' : 'Complete Setup'}
          </button>
        </div>
      </div>
    </div>
  )

  const renderSuccessStep = () => (
    <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Setup Complete!</h3>
      <p className="text-gray-600 mb-4">
        Your payment and license details have been successfully configured.
      </p>
      <p className="text-sm text-gray-500">
        Redirecting to dashboard...
      </p>
    </div>
  )

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Setup Status Alert */}
        <SetupStatusAlert />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Setup</h1>
          <p className="mt-2 text-gray-600">
            Configure your payment and license details to access all features
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                  ${currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-400'
                  }
                `}>
                  {setupComplete && step <= 2 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {step < 2 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-20">
            <span className="text-sm text-gray-600">Payment</span>
            <span className="text-sm text-gray-600">License</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg p-6">
          {setupComplete ? renderSuccessStep() : (
            <>
              {currentStep === 1 && renderPaymentStep()}
              {currentStep === 2 && renderLicenseStep()}
            </>
          )}
        </div>

        {/* Setup Status Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-gray-100 rounded-lg p-4">
            <h4 className="font-medium text-gray-700 mb-2">🔧 Setup Status Debug</h4>
            <pre className="text-xs text-gray-600 overflow-auto">
              {JSON.stringify(setupStatus, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}