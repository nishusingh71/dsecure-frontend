import { ComponentType, lazy, Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import PageLoadingSkeleton from "../components/PageLoadingSkeleton";
import MainLayout from "../layouts/MainLayout";

// Dashboard Pages
const UserDashboard = lazy(() => import("../pages/dashboards/UserDashboard"));
const AdminDashboard = lazy(() => import("../pages/dashboards/AdminDashboard"));
const AdminShell = lazy(() => import("../pages/dashboards/AdminShell"));
const AdminPerformance = lazy(() => import("../pages/dashboards/AdminPerformance"));
const AdminReports = lazy(() => import("../pages/dashboards/AdminReports"));
const AdminMachines = lazy(() => import("../pages/dashboards/AdminMachines"));
const AdminSessions = lazy(() => import("../pages/dashboards/AdminSessions"));
const AdminSubusers = lazy(() => import("../pages/dashboards/AdminSubusers"));
const EditSubuser = lazy(() => import("../pages/dashboards/EditSubuser"));
const AdminGroupsDashboard = lazy(() => import("../pages/dashboards/AdminGroups"));
const AdminLicenses = lazy(() => import("../pages/dashboards/AdminLicenses"));
const AdminDownloads = lazy(() => import("../pages/dashboards/AdminDownloads"));
const NewErasurePage = lazy(() => import("../pages/dashboards/NewErasurePage"));
const ReportsPage = lazy(() => import("../pages/dashboards/ReportsPage"));
const DownloadAgentPage = lazy(() => import("../pages/dashboards/DownloadAgentPage"));
const PrivateCloudSetup = lazy(() => import("../pages/dashboards/PrivateCloudSetup"));
const EnhancedUserDashboard = lazy(() => import("../pages/dashboards/EnhancedUserDashboard"));
const PaymentSetupPage = lazy(() => import("../pages/PaymentSetupPage"));
const DownloadPage = lazy(() => import("../pages/DownloadPage"));

// Admin Pages (Deep)
const AdminUsers = lazy(() => import("../pages/admin/AdminUsers"));
const AdminGroups = lazy(() => import("../pages/admin/AdminGroups"));
const AdminReportsAdmin = lazy(() => import("../pages/admin/AdminReports"));
const AdminSettings = lazy(() => import("../pages/admin/AdminSettings"));
const AddUser = lazy(() => import("../pages/admin/AddUser"));
const AddGroup = lazy(() => import("../pages/admin/AddGroup"));
const GenerateReport = lazy(() => import("../pages/admin/GenerateReport"));
const EditUser = lazy(() => import("../pages/admin/EditUser"));
const EditGroup = lazy(() => import("../pages/admin/EditGroup"));
const AdminProfileEdit = lazy(() => import("../pages/admin/AdminProfileEdit"));

export const DashboardRoutes = () => (
  <Route element={<MainLayout />}>
    {/* Protected User Routes */}
    <Route
      path="payment/setup"
      element={
        <ProtectedRoute>
          <PaymentSetupPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="download"
      element={
        <ProtectedRoute>
          <DownloadPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="dashboard"
      element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="dashboard/new-erasure"
      element={
        <ProtectedRoute>
          <NewErasurePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="dashboard/reports"
      element={
        <ProtectedRoute>
          <ReportsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="dashboard/download-agent"
      element={
        <ProtectedRoute>
          <DownloadAgentPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="dashboard/enhanced"
      element={
        <ProtectedRoute>
          <EnhancedUserDashboard />
        </ProtectedRoute>
      }
    />

    {/* Admin Routes */}
    <Route
      path="admin"
      element={
        <ProtectedRoute>
          <AdminShell />
        </ProtectedRoute>
      }
    >
      <Route index element={<AdminDashboard />} />
      <Route path="performance" element={<AdminPerformance />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="machines" element={<AdminMachines />} />
      <Route path="sessions" element={<AdminSessions />} />
      <Route path="subusers" element={<AdminSubusers />} />
      <Route path="edit-subuser" element={<EditSubuser />} />
      <Route path="groups" element={<AdminGroupsDashboard />} />
      <Route path="licenses" element={<AdminLicenses />} />
      <Route path="downloads" element={<AdminDownloads />} />
      <Route path="private-cloud-setup" element={<PrivateCloudSetup />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="users/add" element={<AddUser />} />
      <Route path="users/edit/:userId" element={<EditUser />} />
      <Route path="groups" element={<AdminGroups />} />
      <Route path="groups/add" element={<AddGroup />} />
      <Route path="groups/edit/:groupId" element={<EditGroup />} />
      <Route path="reports/admin" element={<AdminReportsAdmin />} />
      <Route path="reports/generate" element={<GenerateReport />} />
      <Route path="reports/generate/:reportId" element={<GenerateReport />} />
      <Route path="settings" element={<AdminSettings />} />
      <Route path="profile/edit" element={<AdminProfileEdit />} />
    </Route>
  </Route>
);
