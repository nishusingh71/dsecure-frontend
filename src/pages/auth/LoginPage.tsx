import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Helmet } from "react-helmet-async";
import { api, setAuthToken } from "@/utils/apiClient";
import { authService } from "@/utils/authService";

export default function LoginPage() {
  const { login, demoLogin, getSmartRedirectPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  // ✅ Forgot Password States
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<
    "email" | "otp" | "newPassword"
  >("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState(""); // ✅ Store resetToken from API
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  // Toast functionality
  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // Auto hide after 5 seconds
  };

  // ✅ Forgot Password - Step 1: Request OTP & Reset Token via FormSubmit.co
  const handleSendOTP = async () => {
    if (!forgotEmail) {
      showToast("Please enter your email address", "error");
      return;
    }

    setForgotPasswordLoading(true);
    try {
      console.log("🔐 Step 1: Requesting OTP for:", forgotEmail);

      // First, call the backend API to generate OTP and resetToken
      const backendResponse = await api.post(
        "/api/forgot/request",
        { email: forgotEmail },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("✅ Step 1 Backend Response:", backendResponse.data);

      if (backendResponse.data && backendResponse.data.resetToken) {
        // ✅ Store only resetToken from response
        // OTP will be manually entered by user after receiving email
        const generatedResetToken = backendResponse.data.resetToken;

        setResetToken(generatedResetToken);

        console.log("💾 Stored Reset Token:", generatedResetToken);

        // ✅ Send OTP via FormSubmit.co
        console.log("📧 Sending OTP via FormSubmit.co to:", forgotEmail);

        const formData = new FormData();
        formData.append("_subject", "Password Reset OTP - D-SecureTech");
        formData.append("_template", "basic");
        formData.append("_captcha", "false");
        formData.append("_notification", "false");
        formData.append(
          "_autoresponse",
          "Thank you for your request. Your OTP has been sent. Used service is FormSubmit.co for email delivery. It may take a few minutes to arrive."
        );
        formData.append("OTP", backendResponse.data.otp);
        formData.append(
          "Message",
          `Your OTP for password reset is: ${backendResponse.data.otp}. This OTP is valid for 10 minutes.`
        );

        // FormSubmit.co is external service - use fetch directly
        await fetch(`https://formsubmit.co/${forgotEmail}`, {
          method: 'POST',
          body: formData,
        });

        console.log("✅ OTP sent via FormSubmit.co");
        showToast(
          "OTP sent to your email successfully! Please check your inbox.",
          "success"
        );

        // ✅ Step 2: Validate reset link
        await handleValidateResetLink(generatedResetToken);
      } else {
        throw new Error("Invalid response: resetToken missing");
      }
    } catch (err: any) {
      console.error("❌ Step 1 Error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to send OTP. Please try again.";
      showToast(errorMsg, "error");
      setForgotPasswordLoading(false);
    }
  };

  // ✅ Forgot Password - Step 2: Validate Reset Link (Auto-called after Step 1)
  const handleValidateResetLink = async (token: string) => {
    try {
      console.log("🔐 Step 2: Validating reset link with token:", token);

      const response = await api.post(
        "/api/forgot/validate-reset-link",
        { resetToken: token }
      );

      console.log("✅ Step 2 Response:", response.data);

      if (response.data && response.data.success !== false) {
        console.log("✅ Reset link validated successfully");
        showToast(
          "Reset link validated. Please verify OTP from your email.",
          "success"
        );
        setForgotPasswordStep("otp");
      } else {
        throw new Error(
          response.data.message || "Failed to validate reset link"
        );
      }
    } catch (err: any) {
      console.error("❌ Step 2 Error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to validate reset link.";
      showToast(errorMsg, "error");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // ✅ Forgot Password - Step 3: Verify OTP
  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 4) {
      showToast("Please enter a valid OTP", "error");
      return;
    }

    setForgotPasswordLoading(true);
    try {
      console.log("🔐 Step 3: Verifying OTP");
      console.log("  - Email:", forgotEmail);
      console.log("  - OTP:", otp);

      const response = await api.post(
        "/api/forgot/verify-otp",
        {
          email: forgotEmail,
          otp: otp,
        }
      );

      console.log("✅ Step 3 Response:", response.data);

      if (response.data && response.data.success !== false) {
        console.log("✅ OTP verified successfully");
        showToast(
          "OTP verified successfully! You can now reset your password.",
          "success"
        );
        setForgotPasswordStep("newPassword");
      } else {
        throw new Error(response.data.message || "Invalid OTP");
      }
    } catch (err: any) {
      console.error("❌ Step 3 Error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Invalid OTP. Please try again.";
      showToast(errorMsg, "error");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // ✅ Resend OTP
  const handleResendOTP = async () => {
    if (!forgotEmail) {
      showToast("Email address is missing", "error");
      return;
    }

    setForgotPasswordLoading(true);
    try {
      console.log("🔄 Resending OTP for:", forgotEmail);

      const response = await api.post(
        "/api/forgot/resend-otp",
        { email: forgotEmail }
      );

      console.log("✅ Resend OTP Response:", response.data);

      if (response.data && response.data.otp) {
        // Send OTP via FormSubmit.co
        const formData = new FormData();
        formData.append("_subject", "Password Reset OTP - D-SecureTech");
        formData.append("_template", "basic");
        formData.append("_captcha", "false");
        formData.append(
          "_autoresponse",
          "Thank you for your request. Your OTP has been sent."
        );
        formData.append("OTP", response.data.otp);
        formData.append(
          "Message",
          `Your OTP for password reset is: ${response.data.otp}. This OTP is valid for 10 minutes.`
        );

        // FormSubmit.co is external service - use fetch directly
        await fetch(`https://formsubmit.co/${forgotEmail}`, {
          method: 'POST',
          body: formData,
        });

        showToast(
          "OTP resent successfully! Please check your email.",
          "success"
        );
        setOtp(""); // Clear previous OTP input
      } else {
        throw new Error("Failed to resend OTP");
      }
    } catch (err: any) {
      console.error("❌ Resend OTP Error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to resend OTP. Please try again.";
      showToast(errorMsg, "error");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // ✅ Forgot Password - Step 4: Reset Password
  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      showToast("Password must be at least 6 characters long", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setForgotPasswordLoading(true);
    try {
      console.log("🔐 Step 4: Resetting Password");
      console.log("  - Email:", forgotEmail);
      console.log("  - OTP:", otp);
      console.log("  - Reset Token:", resetToken);
      console.log("  - New Password: ******");

      const response = await api.post(
        "/api/forgot/reset",
        {
          email: forgotEmail,
          otp: otp,
          resetToken: resetToken,
          newPassword: newPassword,
        }
      );

      console.log("✅ Step 4 Response:", response.data);

      if (response.data && response.data.success !== false) {
        console.log("✅ Password reset successfully!");
        showToast(
          "Password reset successfully! Redirecting to login...",
          "success"
        );

        // Reset all forgot password states
        setShowForgotPassword(false);
        setForgotPasswordStep("email");
        setForgotEmail("");
        setOtp("");
        setResetToken("");
        setNewPassword("");
        setConfirmPassword("");

        // Pre-fill email in login form
        setEmail(forgotEmail);

        // Auto redirect to login after 2 seconds
        setTimeout(() => {
          showToast("You can now login with your new password", "success");
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to reset password");
      }
    } catch (err: any) {
      console.error("❌ Step 4 Error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to reset password. Please try again.";
      showToast(errorMsg, "error");
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  // ✅ Cancel Forgot Password
  const handleCancelForgotPassword = () => {
    setShowForgotPassword(false);
    setForgotPasswordStep("email");
    setForgotEmail("");
    setOtp("");
    setResetToken("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
  };

  // const onSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setError(null);
  //   setValidationError(null);
  //   setLoading(true);

  //   try {
  //     // Clear any previous errors
  //     setError(null);
  //     setValidationError(null);

  //     // Use the AuthContext login method which handles the API call
  //     await login(email, password);

  //     showToast("Login successful!", "success");

  //     // Use smart redirect based on user's payment/license status
  //     const smartRedirectPath = getSmartRedirectPath();

  //     // Check for explicit redirect paths first
  //     const redirectPath =
  //       sessionStorage.getItem("redirectAfterLogin") ||
  //       localStorage.getItem("returnPath") ||
  //       (location.state as any)?.from?.pathname;

  //     // Clean up stored paths
  //     sessionStorage.removeItem("redirectAfterLogin");
  //     localStorage.removeItem("returnPath");

  //     if (redirectPath && redirectPath !== "/login") {
  //       navigate(redirectPath, { replace: true });
  //     } else {
  //       // Use smart redirect path (payment check included)
  //       navigate(smartRedirectPath, { replace: true });
  //     }
  //   } catch (e) {
  //     console.error("Login error:", e);
  //     const errorMessage = e instanceof Error ? e.message : "Login failed";

  //     // Check for specific error types
  //     if (errorMessage.toLowerCase().includes("fetch")) {
  //       setError(
  //         "Unable to connect to server. Please check if the backend is running."
  //       );
  //       showToast("Server connection failed. Please try again later.", "error");
  //     } else if (
  //       errorMessage.toLowerCase().includes("not registered") ||
  //       errorMessage.toLowerCase().includes("user not found")
  //     ) {
  //       setError("User not found. Please register first.");
  //       showToast(
  //         "Please register yourself first before trying to login!",
  //         "error"
  //       );
  //     } else if (
  //       errorMessage.toLowerCase().includes("invalid") ||
  //       errorMessage.toLowerCase().includes("credentials")
  //     ) {
  //       setError("Invalid email or password. Please try again.");
  //       showToast(
  //         "Invalid credentials. Please check your email and password.",
  //         "error"
  //       );
  //     } else {
  //       setError(errorMessage);
  //       showToast(errorMessage, "error");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  /**
   * 🔐 Login Handler for .NET Backend with JWT Authentication
   *
   * Expected Backend Response Structure:
   * {
   *   "jwt_token": "eyJhbGciOiJIUzI1...",
   *   "user": {
   *     "user_id": 1,
   *     "user_name": "Nish Singh",
   *     "user_email": "nish@gmail.com",
   *     "phone_number": "9999999999",
   *     "is_private_cloud": true,
   *     "private_api": "https://api.example.com",
   *     "payment_details_json": {...},
   *     "license_details_json": {...}
   *   }
   * }
   */
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Reset all error states
    setError(null);
    setValidationError(null);
    setLoading(true);

    try {
      // Make API call to .NET backend (auto-decryption handled by interceptor)
      const response = await api.post(
        "https://api.dsecuretech.com/api/RoleBasedAuth/login",
        {
          email: email,
          password: password,
        }
      );

      const data = response.data;

      // ✅ Validate token presence
      if (!data || !data.token) {
        throw new Error("No JWT token received from server");
      }

      // Extract user information with role handling
      let userRole: string;
      let userRoles: string[];

      if (data.roles && Array.isArray(data.roles) && data.roles.length > 0) {
        userRoles = data.roles.map((r: string) => r.toLowerCase());
        userRole = userRoles[0];
      } else {
        userRole = (data.role || data.user?.role || "user").toLowerCase();
        userRoles = [userRole];
      }

      const user = {
        user_email: data.email || data.user?.email || email,
        user_name: data.name || data.user?.name || "User",
        user_id: data.id || data.user?.id || 0,
        user_type: (data.userType || userRole).toLowerCase(),
        role: userRole,
        roles: userRoles,
        permissions: data.permissions || [],
        expiresAt: data.expiresAt,
        is_private_cloud: data.is_private_cloud || false,
        private_api: data.private_api || "",
        payment_details_json: data.payment_details_json || {},
        license_details_json: data.license_details_json || {},
        phone_number: data.phone_number || data.phoneNumber || "",
        department: data.department || "",
        timezone: data.timezone || "Asia/Kolkata",
      };

      // 💾 Save JWT token using authService
      authService.saveTokens(data.token, undefined, rememberMe);

      // Save user data for compatibility (use login response directly - no extra API call needed)
      localStorage.setItem("user_data", JSON.stringify(user));
      localStorage.setItem("authUser", JSON.stringify(user));

      // 🔐 Set auth token for all future API requests
      setAuthToken(data.token, rememberMe);

      // ✅ Show success toast
      showToast("Login successful! Redirecting...", "success");

      // 🎯 Everyone redirects to admin dashboard
      let redirectPath = "/admin";

      // Check for any stored redirect paths
      const storedRedirectPath =
        sessionStorage.getItem("redirectAfterLogin") ||
        localStorage.getItem("returnPath") ||
        (location.state as any)?.from?.pathname;

      if (storedRedirectPath && storedRedirectPath !== "/login") {
        redirectPath = storedRedirectPath;
      }

      // Clean up stored redirect paths
      sessionStorage.removeItem("redirectAfterLogin");
      localStorage.removeItem("returnPath");

      // 📢 Dispatch auth state change event
      window.dispatchEvent(
        new CustomEvent("authStateChanged", {
          detail: { user, token: data.token, authenticated: true },
        })
      );

      // 🚀 Navigate immediately
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      let errorMessage = "Login failed. Please try again.";

      if (err.response) {
        const status = err.response.status;
        const serverMessage =
          err.response.data?.message || err.response.data?.error;

        if (status === 401) {
          errorMessage =
            serverMessage ||
            "Invalid email or password. Please check your credentials.";
        } else if (status === 404) {
          errorMessage = "User not found. Please register first.";
        } else if (status === 403) {
          errorMessage =
            "Access denied. Your account may be suspended or inactive.";
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = serverMessage || `Login failed (Error ${status})`;
        }
      } else if (err.request) {
        errorMessage =
          "Unable to connect to server. Please check your internet connection.";
      } else {
        errorMessage = err.message || "An unexpected error occurred.";
      }

      // Display error to user
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <link rel="canonical" href="https://dsecuretech.com/login" />
        <title>
          DSecureTech Compliance | Data Erasure Standards & Regulations
        </title>
        <meta
          name="description"
          content="Login to your DSecureTech account to manage data erasure tasks, view reports, and ensure compliance with industry standards."
        />
      </Helmet>
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
            toast.type === "error"
              ? "bg-red-50 border-red-200 text-red-800"
              : "bg-green-50 border-green-200 text-green-800"
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "error" ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-4 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="w-full max-w-md px-4 sm:px-8 py-8 sm:py-12 rounded-2xl bg-white/60 backdrop-blur-xl shadow-2xl shadow-slate-900/10 overflow-hidden">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">
              {showForgotPassword ? "Reset Password" : "Welcome Back"}
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              {showForgotPassword
                ? "Follow the steps to reset your password"
                : "Login in to access your secure dashboard"}
            </p>
          </div>

          {/* ✅ FORGOT PASSWORD FORM */}
          {showForgotPassword ? (
            <div className="space-y-6">
              {/* Step 1: Email Input */}
              {forgotPasswordStep === "email" && (
                <>
                  <div>
                    <label
                      htmlFor="forgot-email"
                      className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email Address
                    </label>
                    <input
                      id="forgot-email"
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="input-field"
                      placeholder="Enter your registered email"
                      required
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      We'll send you an OTP to verify your identity
                    </p>
                     <p className="text-xs green-slate-500 mt-2">
                      Note:- Once you confirm the initial activation link from FormSubmit.co, you will receive all future OTPs via email. 
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleCancelForgotPassword}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      disabled={forgotPasswordLoading}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      {forgotPasswordLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Step 2: OTP Verification */}
              {forgotPasswordStep === "otp" && (
                <>
                  <div>
                    <label
                      htmlFor="otp"
                      className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      Enter OTP
                    </label>
                    <input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="input-field text-center text-2xl tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Please check your email for the OTP code.
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Email: {forgotEmail}
                    </p>

                    {/* Resend OTP Link */}
                    <div className="mt-3 text-center">
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={forgotPasswordLoading}
                        className="text-sm text-emerald-600 hover:text-emerald-700 font-medium underline disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Didn't receive OTP? Resend
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordStep("email")}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={forgotPasswordLoading}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      {forgotPasswordLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: New Password */}
              {forgotPasswordStep === "newPassword" && (
                <>
                  <div>
                    <label
                      htmlFor="new-password"
                      className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                      New Password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input-field"
                      placeholder="Enter new password (min 6 characters)"
                      minLength={6}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field"
                      placeholder="Re-enter new password"
                      minLength={6}
                      required
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <p className="text-xs text-red-600 mt-1">
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleCancelForgotPassword}
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleResetPassword}
                      disabled={
                        forgotPasswordLoading || newPassword !== confirmPassword
                      }
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      {forgotPasswordLoading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Resetting...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* ✅ ORIGINAL LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error Messages
          {(error || validationError) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error || validationError}
              </p>
            </div>
          )} */}

              <div>
                <label
                  htmlFor="email"
                  className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    className="input-field pl-10"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="flex text-sm font-medium text-slate-700 mb-2 items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                  </div>
                  <input
                    id="password"
                    className="input-field pl-10"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Remember Me Checkbox */}
              {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="" className="font-medium text-brand hover:text-brand-600">
                Forgot your password?
              </a>
            </div>
          </div> */}

              {error && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {/* ✅ Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm font-medium text-brand hover:text-brand-600 transition-colors"
                >
                  Forgot your password?
                </button>
              </div>

              <button
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                )}
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">or</span>
                </div>
              </div>
              <button
                type="button"
                className="btn-secondary w-full flex items-center justify-center gap-2"
                onClick={async () => {
                  // //console.log('Demo button clicked!')
                  // //console.log('demoLogin function:', demoLogin)
                  setError(null);
                  setLoading(true);
                  try {
                    // //console.log('Calling demoLogin...')
                    // Use demo login function that bypasses all backend authentication
                    await demoLogin();
                    // //console.log('Demo login successful, navigating to admin...')

                    // Demo account always goes to admin dashboard
                    navigate("/admin", { replace: true });
                  } catch (error) {
                    // console.error('Demo login error:', error)
                    setError(
                      "Demo mode failed to initialize: " +
                        (error instanceof Error
                          ? error.message
                          : "Unknown error")
                    );
                    showToast("Demo login failed. Please try again.", "error");
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-8a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V9a1 1 0 011-1z" />
                </svg>
                Try Demo Account
              </button>
            </form>
          )}

          {/* <p className="mt-8 text-center text-sm text-slate-500">
            Not registered yet?{" "}
            <a
              href="/register"
              className="text-brand font-medium hover:text-brand-600"
            >
              Create an account
            </a>
          </p> */}
        </div>
      </div>
    </>
  );
}
