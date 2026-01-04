import { ENV } from "@/config/env";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { Helmet } from "react-helmet-async";
import SchemaBuilder from "@/components/SchemaBuilder";
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
      try { return JSON.parse(storedUser); } catch (e) { console.error("Error parsing user_data:", e); }
    }
    if (authUser) {
      try { return JSON.parse(authUser); } catch (e) { console.error("Error parsing authUser:", e); }
    }
    if (dsecureUser) {
      try { return JSON.parse(dsecureUser); } catch (e) { console.error("Error parsing dsecure:user:", e); }
    }
    return null;
  };

  const [storedUserData, setStoredUserData] = useState(() => getUserDataFromStorage());

  // Check if private cloud is enabled for user from AuthContext OR storage OR Demo Mode
  const isPrivateCloudEnabled = user?.is_private_cloud || storedUserData?.is_private_cloud || isDemoMode() || false;

  // Debug log
  useEffect(() => {
    console.log('🔍 Private Cloud Check:', {
      userIsPrivateCloud: user?.is_private_cloud,
      storedIsPrivateCloud: storedUserData?.is_private_cloud,
      finalIsPrivateCloudEnabled: isPrivateCloudEnabled,
      isDemo: isDemoMode(),
      user,
      storedUserData
    });
  }, [user, isPrivateCloudEnabled, storedUserData]);

  const [availableTables] = useState<string[]>([
    "subuser",
    "AuditReports",
    "Permissions",
    "RolePermissions",
    "Roles",
    "Routes",
    "SubuserRoles",
    "Users",
    "UserRoles",
    "Sessions",
    "Commands",
    "Logs",
  ]);

  const [privateCloudForm, setPrivateCloudForm] = useState({
    connectionString: "",
    selectedTables: [] as string[],
    migrateData: false,
    migrateTables: false,
  });

  const [loading, setLoading] = useState(false);
  const [setupStep, setSetupStep] = useState<'idle' | 'creating' | 'validating' | 'migrating' | 'complete'>('idle');
  const [setupStatus, setSetupStatus] = useState<{
    tablesCreated: boolean;
    schemaValidated: boolean;
    dataMigrated: boolean;
    message: string;
  }>({
    tablesCreated: false,
    schemaValidated: false,
    dataMigrated: false,
    message: '',
  });

  // API Base URL (without trailing slash)
  const API_BASE = (ENV.API_BASE_URL).replace(/\/$/, '');

  // Handler for disabled button click
  const handleDisabledClick = () => {
    showInfo(
      "Private Cloud Not Enabled",
      "Please contact D-SecureTech team at support@dsecuretech.com to enable this feature."
    );
  };

  const handleTableToggle = (tableName: string) => {
    setPrivateCloudForm((prev) => ({
      ...prev,
      selectedTables: prev.selectedTables.includes(tableName)
        ? prev.selectedTables.filter((t) => t !== tableName)
        : [...prev.selectedTables, tableName],
    }));
  };

  // Step 1: Create Tables (complete-setup)
  const handleCreateTables = async () => {
    if (!privateCloudForm.connectionString.trim()) {
      showError("Validation Error", "Connection string is required");
      return;
    }

    setLoading(true);
    setSetupStep('creating');
    setSetupStatus(prev => ({ ...prev, message: 'Creating tables in your private database...' }));

    // Mock for Demo Mode
    if (isDemoMode()) {
      setTimeout(() => {
        setSetupStatus(prev => ({
          ...prev,
          tablesCreated: true,
          message: '✅ Tables created successfully! You can now validate the schema. (DEMO)'
        }));
        setSetupStep('complete');
        showSuccess("Tables Created", "Database tables have been created successfully. (DEMO)");
        setLoading(false);
      }, 2000);
      return;
    }

    try {
      const url = `${API_BASE}/api/PrivateCloud/complete-setup`;
      const payload = { connectionString: privateCloudForm.connectionString };

      console.log('🔵 API Request:', {
        url,
        method: 'POST',
        payload: { ...payload, connectionString: payload.connectionString.substring(0, 50) + '...' },
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('dsecure:jwt') || localStorage.getItem('dsecure:jwt') || ''}`,
        },
        body: JSON.stringify(payload),
      });

      console.log('🔵 Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔴 Error response:', errorText);
        let errorMessage = 'Failed to create tables';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorData.title || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      setSetupStatus(prev => ({
        ...prev,
        tablesCreated: true,
        message: '✅ Tables created successfully! You can now validate the schema.'
      }));
      setSetupStep('complete');
      showSuccess("Tables Created", "Database tables have been created successfully. Click 'Validate Schema' to continue.");
    } catch (error: any) {
      console.error("❌ Create tables error:", error);
      showError("Setup Failed", error.message || "Failed to create tables. Please check your connection string.");
      setSetupStep('idle');
      setSetupStatus(prev => ({ ...prev, message: `❌ Error: ${error.message}` }));
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
    setSetupStep('validating');
    setSetupStatus(prev => ({ ...prev, message: 'Validating database schema...' }));

    // Mock for Demo Mode
    if (isDemoMode()) {
      setTimeout(() => {
        setSetupStatus(prev => ({
          ...prev,
          schemaValidated: true,
          message: '✅ Schema validated successfully! You can now migrate data if needed. (DEMO)'
        }));
        showSuccess("Schema Validated", "Database schema matches expected structure. (DEMO)");
        setSetupStep('complete');
        setLoading(false);
      }, 2000);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/PrivateCloud/validate-schema`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('dsecure:jwt') || localStorage.getItem('dsecure:jwt') || ''}`,
        },
        body: JSON.stringify({
          connectionString: privateCloudForm.connectionString,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Schema validation failed');
      }

      setSetupStatus(prev => ({
        ...prev,
        schemaValidated: true,
        message: '✅ Schema validated successfully! You can now migrate data if needed.'
      }));
      showSuccess("Schema Validated", "Database schema matches expected structure.");
      setSetupStep('complete');
    } catch (error: any) {
      console.error("❌ Validate schema error:", error);
      showError("Validation Failed", error.message || "Schema validation failed.");
      setSetupStep('complete');
      setSetupStatus(prev => ({ ...prev, message: `❌ Schema Error: ${error.message}` }));
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Migrate All Tables (optional - for existing data)
  const handleMigrateData = async () => {
    setLoading(true);
    setSetupStep('migrating');
    setSetupStatus(prev => ({ ...prev, message: 'Migrating existing data to your private database...' }));

    // Mock for Demo Mode
    if (isDemoMode()) {
      setTimeout(() => {
        setSetupStatus(prev => ({
          ...prev,
          dataMigrated: true,
          message: '✅ Data migrated successfully! (DEMO)'
        }));
        showSuccess("Data Migrated", "All existing data has been migrated to your private database. (DEMO)");
        setSetupStep('complete');
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
        setLoading(false);
      }, 2000);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/PrivateCloud/migrate-all-tables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('dsecure:jwt') || localStorage.getItem('dsecure:jwt') || ''}`,
        },
        body: JSON.stringify({
          connectionString: privateCloudForm.connectionString,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('🔴 Migrate error response:', response.status, errorText);
        let errorMessage = 'Data migration failed';
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorData.error || errorData.title || errorData.detail || errorMessage;
        } catch {
          errorMessage = errorText || `Server error: ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      setSetupStatus(prev => ({
        ...prev,
        dataMigrated: true,
        message: '✅ Data migrated successfully!'
      }));
      showSuccess("Data Migrated", "All existing data has been migrated to your private database.");
      setSetupStep('complete');

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error: any) {
      console.error("❌ Migrate data error:", error);
      showError("Migration Failed", error.message || "Failed to migrate data.");
      setSetupStatus(prev => ({ ...prev, message: `❌ Migration Error: ${error.message}` }));
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

              {/* Table Selection - COMMENTED OUT
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
                      d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Select Tables to Migrate
                  <span className="text-red-500">*</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableTables.map((tableName) => (
                    <label
                      key={tableName}
                      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        privateCloudForm.selectedTables.includes(tableName)
                          ? "border-purple-500 bg-purple-50"
                          : "border-slate-200 hover:border-purple-300 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={privateCloudForm.selectedTables.includes(
                          tableName
                        )}
                        onChange={() => handleTableToggle(tableName)}
                        className="w-5 h-5 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">
                          {tableName}
                        </div>
                        <div className="text-xs text-slate-500">
                          Table schema and data
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {privateCloudForm.selectedTables.length > 0 && (
                  <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <span className="font-semibold">
                        {privateCloudForm.selectedTables.length}
                      </span>{" "}
                      table(s) selected for migration
                    </p>
                  </div>
                )}
              </div>
              */}

              {/* Migration Options - COMMENTED OUT
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Migration Options
                </h2>

                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Migrate Existing Data
                        </div>
                        <div className="text-sm text-slate-600">
                          Copy all existing data to your private database
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={privateCloudForm.migrateData}
                        onChange={(e) =>
                          setPrivateCloudForm((prev) => ({
                            ...prev,
                            migrateData: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </div>
                  </label>

                  <label className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          Migrate Table Schemas
                        </div>
                        <div className="text-sm text-slate-600">
                          Create table structures in your private database
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={privateCloudForm.migrateTables}
                        onChange={(e) =>
                          setPrivateCloudForm((prev) => ({
                            ...prev,
                            migrateTables: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
                    </div>
                  </label>
                </div>
              </div>
              */}

              {/* Action Buttons - 3 Separate Steps */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Setup Actions
                </h2>

                <div className="space-y-4">
                  {/* Step 1: Create Tables */}
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${setupStatus.tablesCreated ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                      {setupStatus.tablesCreated ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : '1'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">Create Tables</h3>
                      <p className="text-sm text-slate-500">POST /api/PrivateCloud/complete-setup</p>
                    </div>
                    <button
                      type="button"
                      onClick={isPrivateCloudEnabled ? handleCreateTables : handleDisabledClick}
                      disabled={loading || !privateCloudForm.connectionString.trim()}
                      className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 ${!isPrivateCloudEnabled ? 'opacity-50 cursor-not-allowed' : ''
                        } ${loading || !privateCloudForm.connectionString.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading && setupStep === 'creating' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Creating...
                        </>
                      ) : setupStatus.tablesCreated ? 'Done ✓' : 'Create Tables'}
                    </button>
                  </div>

                  {/* Step 2: Validate Schema */}
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${setupStatus.schemaValidated ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {setupStatus.schemaValidated ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : '2'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">Validate Schema</h3>
                      <p className="text-sm text-slate-500">POST /api/PrivateCloud/validate-schema</p>
                    </div>
                    <button
                      type="button"
                      onClick={isPrivateCloudEnabled ? handleValidateSchema : handleDisabledClick}
                      disabled={loading || !privateCloudForm.connectionString.trim()}
                      className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 ${!isPrivateCloudEnabled ? 'opacity-50 cursor-not-allowed' : ''
                        } ${loading || !privateCloudForm.connectionString.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading && setupStep === 'validating' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Validating...
                        </>
                      ) : setupStatus.schemaValidated ? 'Done ✓' : 'Validate Schema'}
                    </button>
                  </div>

                  {/* Step 3: Migrate Data */}
                  <div className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${setupStatus.dataMigrated ? 'bg-green-100 text-green-600' : 'bg-teal-100 text-teal-600'}`}>
                      {setupStatus.dataMigrated ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : '3'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">Migrate Data (Optional)</h3>
                      <p className="text-sm text-slate-500">POST /api/PrivateCloud/migrate-all-tables</p>
                    </div>
                    <button
                      type="button"
                      onClick={isPrivateCloudEnabled ? handleMigrateData : handleDisabledClick}
                      disabled={loading || !privateCloudForm.connectionString.trim()}
                      className={`px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 ${!isPrivateCloudEnabled ? 'opacity-50 cursor-not-allowed' : ''
                        } ${loading || !privateCloudForm.connectionString.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading && setupStep === 'migrating' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Migrating...
                        </>
                      ) : setupStatus.dataMigrated ? 'Done ✓' : 'Migrate Data'}
                    </button>
                  </div>
                </div>

                {/* Status Message */}
                {setupStatus.message && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-700">{setupStatus.message}</p>
                  </div>
                )}

                {/* Cancel/Back Button */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => navigate("/admin")}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    disabled={loading}
                  >
                    ← Back to Dashboard
                  </button>
                </div>
              </div>

              {/* Setup Status Progress */}
              {setupStep !== 'idle' && (
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Setup Progress
                  </h2>

                  {/* Progress Steps */}
                  <div className="space-y-3">
                    {/* Step 1: Create Tables */}
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${setupStatus.tablesCreated ? 'bg-green-50 border border-green-200' :
                      setupStep === 'creating' ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 border border-slate-200'
                      }`}>
                      {setupStatus.tablesCreated ? (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : setupStep === 'creating' ? (
                        <svg className="animate-spin w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                      )}
                      <span className={`font-medium ${setupStatus.tablesCreated ? 'text-green-800' : setupStep === 'creating' ? 'text-blue-800' : 'text-slate-600'}`}>
                        Create Tables
                      </span>
                    </div>

                    {/* Step 2: Validate Schema */}
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${setupStatus.schemaValidated ? 'bg-green-50 border border-green-200' :
                      setupStep === 'validating' ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 border border-slate-200'
                      }`}>
                      {setupStatus.schemaValidated ? (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : setupStep === 'validating' ? (
                        <svg className="animate-spin w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                      )}
                      <span className={`font-medium ${setupStatus.schemaValidated ? 'text-green-800' : setupStep === 'validating' ? 'text-blue-800' : 'text-slate-600'}`}>
                        Validate Schema
                      </span>
                    </div>

                    {/* Step 3: Migrate Data (Optional) */}
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${setupStatus.dataMigrated ? 'bg-green-50 border border-green-200' :
                      setupStep === 'migrating' ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50 border border-slate-200'
                      }`}>
                      {setupStatus.dataMigrated ? (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : setupStep === 'migrating' ? (
                        <svg className="animate-spin w-5 h-5 text-blue-600" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                      )}
                      <span className={`font-medium ${setupStatus.dataMigrated ? 'text-green-800' : setupStep === 'migrating' ? 'text-blue-800' : 'text-slate-600'}`}>
                        Migrate Data (Optional)
                      </span>
                    </div>
                  </div>

                  {/* Status Message */}
                  {setupStatus.message && (
                    <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-700">{setupStatus.message}</p>
                    </div>
                  )}

                  {/* Migrate Data Button - Shows when schema is validated but data not migrated */}
                  {setupStatus.schemaValidated && !setupStatus.dataMigrated && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-3">
                        Would you like to migrate your existing data to the private cloud database?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleMigrateData}
                          disabled={loading}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Migrating...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                              Migrate Existing Data
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/admin')}
                          className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                        >
                          Skip & Finish
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Schema Builder - Shows SQL for all tables */}
              {/* <div className="mt-6">
                <SchemaBuilder />
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
