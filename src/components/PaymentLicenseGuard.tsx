import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'

interface PaymentLicenseGuardProps {
  children: React.ReactNode
  redirectTo?: string
  showWarning?: boolean
}

/**
 * Component that checks if user has valid payment and license details
 * Redirects to payment page if either is missing or empty
 */
export const PaymentLicenseGuard: React.FC<PaymentLicenseGuardProps> = ({
  children,
  redirectTo = '/payment',
  showWarning = true
}) => {
  const { user, isUserSetupComplete, hasValidPaymentDetails, hasValidLicenseDetails } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !isUserSetupComplete()) {
      if (showWarning) {
        console.warn('User setup incomplete:', {
          hasPayment: hasValidPaymentDetails(),
          hasLicense: hasValidLicenseDetails(),
          paymentDetails: user.payment_details_json,
          licenseDetails: user.license_details_json
        })
      }
      navigate(redirectTo, { replace: true })
    }
  }, [user, isUserSetupComplete, hasValidPaymentDetails, hasValidLicenseDetails, navigate, redirectTo, showWarning])

  // Don't render children if setup is incomplete
  if (!user || !isUserSetupComplete()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Checking account setup...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

/**
 * Component to show payment/license status warnings
 */
export const SetupStatusAlert: React.FC = () => {
  const { user, hasValidPaymentDetails, hasValidLicenseDetails, isUserSetupComplete } = useAuth()
  const navigate = useNavigate()

  if (!user || isUserSetupComplete()) {
    return null
  }

  const hasPayment = hasValidPaymentDetails()
  const hasLicense = hasValidLicenseDetails()

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Account Setup Required
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Complete your account setup to access all features:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {!hasPayment && (
                <li>Payment details are missing or incomplete</li>
              )}
              {!hasLicense && (
                <li>License details are missing or incomplete</li>
              )}
            </ul>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                onClick={() => navigate('/payment')}
                className="bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
              >
                Complete Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Hook to get detailed setup status
 */
export const useSetupStatus = () => {
  const { user, hasValidPaymentDetails, hasValidLicenseDetails, isUserSetupComplete } = useAuth()

  return {
    user,
    hasPayment: hasValidPaymentDetails(),
    hasLicense: hasValidLicenseDetails(),
    isComplete: isUserSetupComplete(),
    paymentData: user?.payment_details_json,
    licenseData: user?.license_details_json,
    setupProgress: {
      completed: [hasValidPaymentDetails(), hasValidLicenseDetails()].filter(Boolean).length,
      total: 2,
      percentage: ([hasValidPaymentDetails(), hasValidLicenseDetails()].filter(Boolean).length / 2) * 100
    }
  }
}

export default PaymentLicenseGuard
