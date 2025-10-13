import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { Helmet } from 'react-helmet-async';

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

  // Toast functionality
  const showToast = (message: string, type: "error" | "success" = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000); // Auto hide after 5 seconds
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setValidationError(null);
    setLoading(true);

    try {
      // Clear any previous errors
      setError(null);
      setValidationError(null);

      // Use the AuthContext login method which handles the API call
      await login(email, password);

      showToast("Login successful!", "success");

      // Use smart redirect based on user's payment/license status
      const smartRedirectPath = getSmartRedirectPath();

      // Check for explicit redirect paths first
      const redirectPath =
        sessionStorage.getItem("redirectAfterLogin") ||
        localStorage.getItem("returnPath") ||
        (location.state as any)?.from?.pathname;

      // Clean up stored paths
      sessionStorage.removeItem("redirectAfterLogin");
      localStorage.removeItem("returnPath");

      if (redirectPath && redirectPath !== "/login") {
        navigate(redirectPath, { replace: true });
      } else {
        // Use smart redirect path (payment check included)
        navigate(smartRedirectPath, { replace: true });
      }
    } catch (e) {
      console.error("Login error:", e);
      const errorMessage = e instanceof Error ? e.message : "Login failed";

      // Check for specific error types
      if (errorMessage.toLowerCase().includes("fetch")) {
        setError(
          "Unable to connect to server. Please check if the backend is running."
        );
        showToast("Server connection failed. Please try again later.", "error");
      } else if (
        errorMessage.toLowerCase().includes("not registered") ||
        errorMessage.toLowerCase().includes("user not found")
      ) {
        setError("User not found. Please register first.");
        showToast(
          "Please register yourself first before trying to login!",
          "error"
        );
      } else if (
        errorMessage.toLowerCase().includes("invalid") ||
        errorMessage.toLowerCase().includes("credentials")
      ) {
        setError("Invalid email or password. Please try again.");
        showToast(
          "Invalid credentials. Please check your email and password.",
          "error"
        );
      } else {
        setError(errorMessage);
        showToast(errorMessage, "error");
      }
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
              Welcome Back
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Sign in to access your secure dashboard
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
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
              {loading ? "Signing in..." : "Sign in"}
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
                      (error instanceof Error ? error.message : "Unknown error")
                  );
                  showToast("Demo login failed. Please try again.", "error");
                } finally {
                  setLoading(false);
                }
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-8a1 1 0 011 1v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2V9a1 1 0 011-1z" />
              </svg>
              Try Demo Account
            </button>
          </form>

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
