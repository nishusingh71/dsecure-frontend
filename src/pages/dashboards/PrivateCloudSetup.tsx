import { ENV } from "@/config/env";
import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { Helmet } from "react-helmet-async";
import { isDemoMode } from "@/data/demoData";

export default function PrivateCloudSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError, showInfo } = useNotification();

  // Helper to get user data from storage (matching AdminDashboard logic)
  const getUserDataFromStorage = () => {
    const storedUser = localStorage.getItem("user_data");
    const authUser = localStorage.getItem("authUser");
    const dsecureUser = localStorage.getItem("dsecure:user");

    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
        console.error("Error parsing user_data:", e);
      }
    }
    if (authUser) {
      try {
        return JSON.parse(authUser);
      } catch (e) {
        console.error("Error parsing authUser:", e);
      }
    }
    if (dsecureUser) {
      try {
        return JSON.parse(dsecureUser);
      } catch (e) {
        console.error("Error parsing dsecure:user:", e);
      }
    }
    return null;
  };

  const [storedUserData, setStoredUserData] = useState(() =>
    getUserDataFromStorage(),
  );

  // Check if private cloud is enabled for user from AuthContext OR storage OR Demo Mode
  const isPrivateCloudEnabled =
    user?.is_private_cloud ||
    storedUserData?.is_private_cloud ||
    isDemoMode() ||
    false;

  const [availableTables] = useState<string[]>([
    "AuditReports"
  ]);

  const [privateCloudForm, setPrivateCloudForm] = useState({
    connectionString: "",
    selectedTables: ["AuditReports"] as string[],
    migrateData: false,
    migrateTables: false,
  });

  const [loading, setLoading] = useState(false);
  const [setupStep, setSetupStep] = useState<
    "idle" | "creating" | "validating" | "migrating" | "complete"
  >("idle");
  const [setupStatus, setSetupStatus] = useState<{
    tablesCreated: boolean;
    schemaValidated: boolean;
    dataMigrated: boolean;
    message: string;
  }>({
    tablesCreated: false,
    schemaValidated: false,
    dataMigrated: false,
    message: "",
  });

  // API Base URL (without trailing slash)
  const API_BASE = ENV.API_BASE_URL.replace(/\/$/, "");

  // Helper to format connection string
  // Converts mysql://username:password@host:port/database URI to ADO.NET format
  const formatConnectionString = (input: string): string => {
    input = input.trim();
    // If it starts with mysql://, convert it
    if (input.startsWith("mysql://")) {
      try {
        const url = new URL(input);
        const username = decodeURIComponent(url.username);
        const password = decodeURIComponent(url.password);
        const host = url.hostname;
        const port = url.port || "3306";
        const database = url.pathname.replace(/^\//, "");
        
        // Construct ADO.NET style string
        // Added SslMode=Required for cloud databases like TiDB
        return `Server=${host};Port=${port};Database=${database};Uid=${username};Pwd=${password};SslMode=Preferred;`;
      } catch (e) {
        console.error("Invalid MySQL URI", e);
        return input; // Fallback to raw if parsing fails
      }
    }
    return input;
  };

  // Step 1: Create Tables (complete-setup)
  const handleCreateTables = async () => {
    if (!privateCloudForm.connectionString) {
      showError("Validation Error", "Connection string is required");
      return;
    }

    setLoading(true);
    setSetupStep("creating");
    setSetupStatus((prev) => ({
      ...prev,
      message: "Creating tables in your private database...",
    }));

    // Mock for Demo Mode
    if (isDemoMode()) {
      setTimeout(() => {
        setSetupStatus((prev) => ({
          ...prev,
          tablesCreated: true,
          message:
            "✅ Tables created successfully! You can now validate the schema. (DEMO)",
        }));
        setSetupStep("complete");
        showSuccess(
          "Tables Created",
          "Database tables have been created successfully. (DEMO)",
        );
        setLoading(false);
      }, 2000);
      return;
    }

    try {
      const url = `${API_BASE}/api/PrivateCloud/complete-setup`;
      
      const formattedConnectionString = formatConnectionString(
        privateCloudForm.connectionString,
      );

      // Convert array ["Table1", "Table2"] to object {"Table1": true, "Table2": true}
      const selectedTablesObject = privateCloudForm.selectedTables.reduce(
        (acc: Record<string, boolean>, table: string) => {
          acc[table] = true;
          return acc;
        },
        {},
      );

      const payload = {
        connectionString: formattedConnectionString,
        databaseType: "mysql",
        notes: "Setup via Admin Dashboard",
        // ⚠️ Send JSON string of object { "TableName": true }
        selectedTables: JSON.stringify(selectedTablesObject),
        migrateExistingData: false,
      };

      console.log("🔵 API Request:", {
        url,
        method: "POST",
        payload: {
          ...payload,
          connectionString: payload.connectionString.substring(0, 50) + "...",
        },
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token || sessionStorage.getItem("D-Secure:jwt") || localStorage.getItem("D-Secure:jwt") || localStorage.getItem("jwt_token") || ""}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("🔵 Response status:", response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("🔴 Error response:", errorText);
        let errorMessage = "Failed to create tables";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage =
            errorData.message ||
            errorData.error ||
            errorData.title ||
            errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      setSetupStatus((prev) => ({
        ...prev,
        tablesCreated: true,
        message:
          "✅ Tables created successfully! You can now validate the schema.",
      }));
      setSetupStep("complete");
      showSuccess(
        "Tables Created",
        "Database tables have been created successfully. Click 'Validate Schema' to continue.",
      );
    } catch (error: any) {
      console.error("❌ Create tables error:", error);
      showError(
        "Setup Failed",
        error.message ||
          "Failed to create tables. Please check your connection string.",
      );
      setSetupStep("idle");
      setSetupStatus((prev) => ({
        ...prev,
        message: `❌ Error: ${error.message}`,
      }));
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Validate Schema
  const handleValidateSchema = async () => {
    if (!privateCloudForm.connectionString.trim()) {
      showError("Validation Error", "Connection string is required");
      return;
    }

    setLoading(true);
    setSetupStep("validating");
    setSetupStatus((prev) => ({
      ...prev,
      message: "Validating database schema...",
    }));

    // Mock for Demo Mode
    if (isDemoMode()) {
      setTimeout(() => {
        setSetupStatus((prev) => ({
          ...prev,
          schemaValidated: true,
          message:
            "✅ Schema validated successfully! You can now migrate data if needed. (DEMO)",
        }));
        showSuccess(
          "Schema Validated",
          "Database schema matches expected structure. (DEMO)",
        );
        setSetupStep("complete");
        setLoading(false);
      }, 2000);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/PrivateCloud/validate-schema`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token || sessionStorage.getItem("D-Secure:jwt") || localStorage.getItem("D-Secure:jwt") || localStorage.getItem("jwt_token") || ""}`,
          },
          body: JSON.stringify({
            connectionString: formatConnectionString(privateCloudForm.connectionString),
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Schema validation failed");
      }

      setSetupStatus((prev) => ({
        ...prev,
        schemaValidated: true,
        message:
          "✅ Schema validated successfully! You can now migrate data if needed.",
      }));
      showSuccess(
        "Schema Validated",
        "Database schema matches expected structure.",
      );
      setSetupStep("complete");
    } catch (error: any) {
      console.error("❌ Validate schema error:", error);
      showError(
        "Validation Failed",
        error.message || "Schema validation failed.",
      );
      setSetupStep("complete");
      setSetupStatus((prev) => ({
        ...prev,
        message: `❌ Schema Error: ${error.message}`,
      }));
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Migrate All Tables (optional - for existing data)
  const handleMigrateData = async () => {
    setLoading(true);
    setSetupStep("migrating");
    setSetupStatus((prev) => ({
      ...prev,
      message: "Migrating existing data to your private database...",
    }));

    // Mock for Demo Mode
    if (isDemoMode()) {
      setTimeout(() => {
        setSetupStatus((prev) => ({
          ...prev,
          dataMigrated: true,
          message: "✅ Data migrated successfully! (DEMO)",
        }));
        showSuccess(
          "Data Migrated",
          "All existing data has been migrated to your private database. (DEMO)",
        );
        setSetupStep("complete");
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
        setLoading(false);
      }, 2000);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/PrivateCloud/migrate-all-tables`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token || sessionStorage.getItem("D-Secure:jwt") || localStorage.getItem("D-Secure:jwt") || localStorage.getItem("jwt_token") || ""}`,
          },
          body: JSON.stringify({
            connectionString: formatConnectionString(privateCloudForm.connectionString),
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("🔴 Migrate error response:", response.status, errorText);
        let errorMessage = "Data migration failed";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage =
            errorData.message ||
            errorData.error ||
            errorData.title ||
            errorData.detail ||
            errorMessage;
        } catch {
          errorMessage = errorText || `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      setSetupStatus((prev) => ({
        ...prev,
        dataMigrated: true,
        message: "✅ Data migrated successfully!",
      }));
      showSuccess(
        "Data Migrated",
        "All existing data has been migrated to your private database.",
      );
      setSetupStep("complete");

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error: any) {
      console.error("❌ Migrate data error:", error);
      showError("Migration Failed", error.message || "Failed to migrate data.");
      setSetupStatus((prev) => ({
        ...prev,
        message: `❌ Migration Error: ${error.message}`,
      }));
    } finally {
      setLoading(false);
    }
  };

  // Legacy form submit (for FormSubmit fallback)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleCreateTables();
  };

  return (
    <>
      <SEOHead seo={getSEOForPage("private-cloud-setup")} />
      <Helmet>
        <title>Private Cloud Setup - D-SecureTech</title>
        <meta
          name="description"
          content="Configure your private cloud database connection"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Private Cloud Setup
                  </h1>
                  <p className="text-slate-600">
                    Configure your private database connection
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Connection String */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Database Connection
                </h2>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Connection String <span className="text-red-500">*</span>
                  </label>
                  <div className="overflow-x-auto">
                    <input
                      type="text"
                      value={privateCloudForm.connectionString}
                      onChange={(e) =>
                        setPrivateCloudForm((prev) => ({
                          ...prev,
                          connectionString: e.target.value,
                        }))
                      }
                      className="w-full min-w-[600px] px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm whitespace-nowrap"
                      placeholder="Server=myserver.database.windows.net;Database=mydb;User Id=myuser;Password=mypass;"
                      required
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Enter your private database connection string. This
                    information is encrypted and stored securely.
                  </p>
                </div>
              </div>

              {/* Action Buttons - 3 Separate Steps */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Setup Actions
                </h2>

                <div className="space-y-4">
                  {/* Step 1: Create Tables */}
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${setupStatus.tablesCreated ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}
                    >
                      {setupStatus.tablesCreated ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        "1"
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">
                        Create Tables
                      </h3>
                      <p className="text-sm text-slate-500">
                        POST /api/PrivateCloud/complete-setup
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCreateTables}
                      disabled={
                        loading || !privateCloudForm.connectionString
                      }
                      className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 ${loading || !privateCloudForm.connectionString ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {loading && setupStep === "creating" ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4"
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
                          Creating...
                        </>
                      ) : (
                        "Create Tables"
                      )}
                    </button>
                  </div>

                  {/* Step 2: Validate Schema */}
                  <div
                    className={`flex items-center gap-4 p-4 border border-slate-200 rounded-lg ${!setupStatus.tablesCreated ? "opacity-50 bg-slate-50" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${setupStatus.schemaValidated ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}
                    >
                      {setupStatus.schemaValidated ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        "2"
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">
                        Validate Schema
                      </h3>
                      <p className="text-sm text-slate-500">
                        POST /api/PrivateCloud/validate-schema
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleValidateSchema}
                      disabled={loading || !setupStatus.tablesCreated}
                      className={`px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors ${loading || !setupStatus.tablesCreated ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {loading && setupStep === "validating"
                        ? "Validating..."
                        : "Validate Schema"}
                    </button>
                  </div>

                  {/* Step 3: Migrate Data */}
                  <div
                    className={`flex items-center gap-4 p-4 border border-slate-200 rounded-lg ${!setupStatus.schemaValidated ? "opacity-50 bg-slate-50" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${setupStatus.dataMigrated ? "bg-green-100 text-green-600" : "bg-purple-100 text-purple-600"}`}
                    >
                      {setupStatus.dataMigrated ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        "3"
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">
                        Migrate All Tables
                      </h3>
                      <p className="text-sm text-slate-500">
                        POST /api/PrivateCloud/migrate-all-tables
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleMigrateData}
                      disabled={loading || !setupStatus.schemaValidated}
                      className={`px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors ${loading || !setupStatus.schemaValidated ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {loading && setupStep === "migrating"
                        ? "Migrating..."
                        : "Migrate Data"}
                    </button>
                  </div>
                </div>

                {/* Status Message */}
                {setupStatus.message && (
                  <div
                    className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${setupStatus.message.includes("Error") || setupStatus.message.includes("Failed") ? "bg-red-50 text-red-700 border border-red-200" : "bg-blue-50 text-blue-700 border border-blue-200"}`}
                  >
                    <svg
                      className="w-5 h-5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {setupStatus.message.includes("Error") ||
                      setupStatus.message.includes("Failed") ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      )}
                    </svg>
                    <div>{setupStatus.message}</div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
