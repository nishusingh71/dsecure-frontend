import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { Helmet } from "react-helmet-async";
import SchemaBuilder from "@/components/SchemaBuilder";

export default function PrivateCloudSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();

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

  // FormSubmit endpoint for receiving form submissions
  const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/dhruv.rai@dsecuretech.com";

  const handleTableToggle = (tableName: string) => {
    setPrivateCloudForm((prev) => ({
      ...prev,
      selectedTables: prev.selectedTables.includes(tableName)
        ? prev.selectedTables.filter((t) => t !== tableName)
        : [...prev.selectedTables, tableName],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privateCloudForm.connectionString.trim()) {
      showError("Validation Error", "Connection string is required");
      return;
    }

    if (privateCloudForm.selectedTables.length === 0) {
      showError("Validation Error", "Please select at least one table");
      return;
    }

    setLoading(true);
    try {
      // Send form data to FormSubmit endpoint
      const formData = new FormData();
      formData.append("_subject", "🔒 Private Cloud Setup Request");
      formData.append("_template", "table");
      formData.append("User Email", user?.email || "Not logged in");
      formData.append("User Name", user?.name || "N/A");
      formData.append("Connection String", privateCloudForm.connectionString);
      formData.append("Selected Tables", privateCloudForm.selectedTables.join(", "));
      formData.append("Migrate Existing Data", privateCloudForm.migrateData ? "Yes" : "No");
      formData.append("Create Tables Automatically", privateCloudForm.migrateTables ? "Yes" : "No");
      formData.append("Submitted At", new Date().toLocaleString());

      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      console.log("🚀 Private Cloud Setup Data sent to FormSubmit:", privateCloudForm);

      showSuccess(
        "Private Cloud Setup Initiated",
        "Your private cloud configuration has been submitted successfully. Our team will contact you shortly."
      );

      // Reset form
      setPrivateCloudForm({
        connectionString: "",
        selectedTables: [],
        migrateData: false,
        migrateTables: false,
      });

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error("❌ Private cloud setup error:", error);
      showError(
        "Setup Failed",
        "Failed to submit private cloud configuration. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
                  <textarea
                    value={privateCloudForm.connectionString}
                    onChange={(e) =>
                      setPrivateCloudForm((prev) => ({
                        ...prev,
                        connectionString: e.target.value,
                      }))
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
                    placeholder="Server=myserver.database.windows.net;Database=mydb;User Id=myuser;Password=mypass;"
                    required
                  />
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    loading ||
                    !privateCloudForm.connectionString.trim()
                  }
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
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
                      Submit Configuration
                    </>
                  )}
                </button>
              </div>

              {/* Schema Builder - Shows SQL for all tables */}
              <div className="mt-6">
                <SchemaBuilder />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
