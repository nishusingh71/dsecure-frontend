import { useState, useEffect } from "react";

// Table to Module mapping - which tables belong to which module
const tableToModuleMap: Record<string, string> = {
  // Core Users
  "subuser": "core-users",
  "Users": "core-users",
  // RBAC
  "Roles": "rbac",
  "Permissions": "rbac",
  "Routes": "rbac",
  // RBAC Mappings
  "UserRoles": "rbac-mappings",
  "SubuserRoles": "rbac-mappings",
  "RolePermissions": "rbac-mappings",
  // Monitoring
  "Sessions": "monitoring",
  "Logs": "monitoring",
  "Commands": "monitoring",
  // Business Logic
  "Machines": "business-logic",
  "AuditReports": "business-logic",
};

// Individual table SQL definitions
const tableSqlMap: Record<string, { label: string; sql: string }> = {
  "subuser": {
    label: "subuser",
    sql: `-- Create Subuser Table
CREATE TABLE \`subuser\` (
  \`subuser_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`subuser_email\` varchar(255) NOT NULL,
  \`subuser_password\` varchar(255) NOT NULL,
  \`user_email\` varchar(255) NOT NULL,
  \`subuser_name\` varchar(255) DEFAULT NULL,
  \`subuser_phone_number\` varchar(255) DEFAULT NULL,
  \`created_by_subuser_email\` varchar(255) DEFAULT NULL,
  \`parent_subuser_id\` int(11) DEFAULT NULL,
  \`hierarchy_level\` int(11) DEFAULT NULL,
  \`subuser_username\` varchar(100) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`phone\` varchar(255) DEFAULT NULL,
  \`department\` varchar(100) DEFAULT NULL,
  \`role\` varchar(100) DEFAULT NULL,
  \`permissionsJson\` json DEFAULT NULL,
  \`assignedMachines\` int(11) DEFAULT '0',
  \`maxMachines\` int(11) DEFAULT '0',
  \`machineIdsJson\` json DEFAULT NULL,
  \`licenseIdsJson\` json DEFAULT NULL,
  \`groupId\` bigint(20) DEFAULT '0',
  \`status\` varchar(50) DEFAULT 'inactive',
  \`activity_status\` varchar(50) DEFAULT 'offline',
  \`isEmailVerified\` tinyint(1) DEFAULT '0',
  \`canCreateSubusers\` tinyint(1) DEFAULT '0',
  \`canViewReports\` tinyint(1) DEFAULT '0',
  \`canManageMachines\` tinyint(1) DEFAULT '0',
  \`canAssignLicenses\` tinyint(1) DEFAULT '0',
  \`emailNotifications\` tinyint(1) DEFAULT '1',
  \`systemAlerts\` tinyint(1) DEFAULT '1',
  \`last_login\` varchar(50) DEFAULT NULL,
  \`last_logout\` varchar(50) DEFAULT NULL,
  \`failedLoginAttempts\` int(11) DEFAULT '0',
  \`lockedUntil\` datetime DEFAULT NULL,
  \`createdBy\` bigint(20) DEFAULT '0',
  \`createdAt\` datetime DEFAULT CURRENT_TIMESTAMP,
  \`updatedAt\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  \`updatedBy\` bigint(20) DEFAULT '0',
  \`notes\` text DEFAULT NULL,
  \`subuser_group\` varchar(50) DEFAULT NULL,
  \`timezone\` varchar(100) DEFAULT 'UTC',
  \`lastLoginIp\` varchar(100) DEFAULT NULL,
  \`lastLoginAt\` datetime DEFAULT NULL,
  \`LastLogoutAt\` datetime DEFAULT NULL,
  \`superuser_id\` int(11) DEFAULT NULL,
  \`license_allocation\` int(11) DEFAULT NULL,
  \`domain\` varchar(255) DEFAULT NULL,
  \`is_domain_admin\` varchar(100) DEFAULT NULL,
  \`organization_name\` varchar(100) DEFAULT NULL,
  PRIMARY KEY (\`subuser_id\`),
  UNIQUE KEY \`uk_subuser_email\` (\`subuser_email\`)
);`
  },
  "Users": {
    label: "Users",
    sql: `-- Create Users Table (Main Admin/Users)
CREATE TABLE \`Users\` (
  \`user_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_name\` varchar(255) NOT NULL,
  \`user_email\` varchar(255) NOT NULL,
  \`user_password\` varchar(255) NOT NULL,
  \`hash_password\` Longtext NOT NULL,
  \`is_private_cloud\` tinyint(1) DEFAULT NULL,
  \`private_api\` tinyint(1) DEFAULT NULL,
  \`phone_number\` varchar(20) DEFAULT NULL,
  \`payment_details_json\` json DEFAULT NULL,
  \`license_details_json\` json DEFAULT NULL,
  \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  \`department\` varchar(50) DEFAULT NULL,
  \`user_group\` varchar(50) DEFAULT NULL,
  \`last_login\` varchar(50) DEFAULT NULL,
  \`last_logout\` varchar(50) DEFAULT NULL,
  \`user_role\` varchar(50) DEFAULT NULL,
  \`license_allocation\` int(11) DEFAULT NULL,
  \`status\` varchar(50) DEFAULT NULL,
  \`activity_status\` varchar(50) DEFAULT 'offline',
  \`timezone\` varchar(100) DEFAULT 'UTC',
  \`domain\` varchar(255) DEFAULT NULL,
  \`is_domain_admin\` varchar(100) DEFAULT NULL,
  \`organization_name\` varchar(100) DEFAULT NULL,
  \`last_login_ip\` varchar(50) DEFAULT NULL,
  PRIMARY KEY (\`user_id\`),
  UNIQUE KEY \`uk_user_email\` (\`user_email\`)
);`
  },
  "Roles": {
    label: "Roles",
    sql: `-- Create Roles Table
CREATE TABLE \`Roles\` (
  \`RoleId\` int(11) NOT NULL AUTO_INCREMENT,
  \`RoleName\` varchar(100) NOT NULL,
  \`Description\` varchar(500) NOT NULL,
  \`HierarchyLevel\` int(11) NOT NULL,
  \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`RoleId\`),
  UNIQUE KEY \`uk_RoleName\` (\`RoleName\`)
);`
  },
  "Permissions": {
    label: "Permissions",
    sql: `-- Create Permissions Table
CREATE TABLE \`Permissions\` (
  \`PermissionId\` int(11) NOT NULL AUTO_INCREMENT,
  \`PermissionName\` varchar(100) NOT NULL,
  \`Description\` varchar(500) NOT NULL,
  \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`PermissionId\`),
  UNIQUE KEY \`uk_PermissionName\` (\`PermissionName\`)
);`
  },
  "Routes": {
    label: "Routes",
    sql: `-- Create Routes Table (API Endpoints)
CREATE TABLE \`Routes\` (
  \`RouteId\` int(11) NOT NULL AUTO_INCREMENT,
  \`RoutePath\` varchar(500) NOT NULL,
  \`HttpMethod\` varchar(10) NOT NULL,
  \`Description\` varchar(200) NOT NULL,
  \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`RouteId\`),
  INDEX \`idx_RoutePath\` (\`RoutePath\`)
);`
  },
  "UserRoles": {
    label: "UserRoles",
    sql: `-- Create UserRoles (Links Users to Roles)
CREATE TABLE \`UserRoles\` (
  \`UserId\` int(11) NOT NULL,
  \`RoleId\` int(11) NOT NULL,
  \`AssignedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`AssignedByEmail\` longtext NOT NULL,
  PRIMARY KEY (\`UserId\`, \`RoleId\`),
  CONSTRAINT \`fk_UserRoles_Roles\` FOREIGN KEY (\`RoleId\`) REFERENCES \`Roles\` (\`RoleId\`) ON DELETE CASCADE ON UPDATE CASCADE
);`
  },
  "SubuserRoles": {
    label: "SubuserRoles",
    sql: `-- Create SubuserRoles (Links Subusers to Roles)
CREATE TABLE \`SubuserRoles\` (
  \`SubuserId\` int(11) NOT NULL,
  \`RoleId\` int(11) NOT NULL,
  \`AssignedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`AssignedByEmail\` longtext NOT NULL,
  PRIMARY KEY (\`SubuserId\`, \`RoleId\`),
  CONSTRAINT \`fk_SubuserRoles_Subuser\` FOREIGN KEY (\`SubuserId\`) REFERENCES \`subuser\` (\`subuser_id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`fk_SubuserRoles_Roles\` FOREIGN KEY (\`RoleId\`) REFERENCES \`Roles\` (\`RoleId\`) ON DELETE CASCADE ON UPDATE CASCADE
);`
  },
  "RolePermissions": {
    label: "RolePermissions",
    sql: `-- Create RolePermissions (Links Roles to Permissions)
CREATE TABLE \`RolePermissions\` (
  \`RoleId\` int(11) NOT NULL,
  \`PermissionId\` int(11) NOT NULL,
  PRIMARY KEY (\`RoleId\`, \`PermissionId\`),
  CONSTRAINT \`fk_RolePermissions_Roles\` FOREIGN KEY (\`RoleId\`) REFERENCES \`Roles\` (\`RoleId\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`fk_RolePermissions_Permissions\` FOREIGN KEY (\`PermissionId\`) REFERENCES \`Permissions\` (\`PermissionId\`) ON DELETE CASCADE ON UPDATE CASCADE
);`
  },
  "Sessions": {
    label: "Sessions",
    sql: `-- Create Sessions Table
CREATE TABLE \`Sessions\` (
  \`session_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_email\` varchar(255) NOT NULL,
  \`login_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`logout_time\` datetime(6) DEFAULT NULL,
  \`ip_address\` varchar(45) NOT NULL,
  \`device_info\` varchar(1000) NOT NULL,
  \`session_status\` varchar(50) NOT NULL DEFAULT 'active',
  PRIMARY KEY (\`session_id\`),
  INDEX \`idx_user_email\` (\`user_email\`)
);`
  },
  "Logs": {
    label: "Logs",
    sql: `-- Create Logs Table
CREATE TABLE \`Logs\` (
  \`log_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_email\` varchar(255) NOT NULL,
  \`log_level\` varchar(50) NOT NULL,
  \`log_message\` varchar(2000) NOT NULL,
  \`log_details_json\` json NOT NULL,
  \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`log_id\`),
  INDEX \`idx_logs_created_at\` (\`created_at\`),
  INDEX \`idx_logs_user_email\` (\`user_email\`)
);`
  },
  "Commands": {
    label: "Commands",
    sql: `-- Create Commands Table
CREATE TABLE \`commands\` (
  \`Command_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`command_text\` varchar(2000) NOT NULL,
  \`issued_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`command_json\` json NOT NULL,
  \`command_status\` varchar(100) NOT NULL DEFAULT 'pending',
  \`user_email\` varchar(50) DEFAULT NULL,
  PRIMARY KEY (\`Command_id\`),
  INDEX \`idx_command_status\` (\`command_status\`),
  INDEX \`idx_commands_user_email\` (\`user_email\`)
);`
  },
  "Machines": {
    label: "Machines",
    sql: `-- Create Machines Table
CREATE TABLE \`Machines\` (
  \`fingerprint_hash\` varchar(255) NOT NULL,
  \`mac_address\` varchar(255) NOT NULL,
  \`physical_drive_id\` varchar(255) NOT NULL,
  \`cpu_id\` varchar(255) NOT NULL,
  \`bios_serial\` varchar(255) NOT NULL,
  \`os_version\` varchar(255) NOT NULL,
  \`user_email\` varchar(255) NOT NULL,
  \`subuser_email\` varchar(255) DEFAULT NULL,
  \`license_activated\` tinyint(1) NOT NULL DEFAULT '0',
  \`license_activation_date\` datetime(6) DEFAULT NULL,
  \`license_days_valid\` int(11) NOT NULL DEFAULT '0',
  \`license_details_json\` json NOT NULL,
  \`demo_usage_count\` int(11) NOT NULL DEFAULT '0',
  \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  \`vm_status\` longtext NOT NULL,
  \`machine_details_json\` json DEFAULT NULL,
  PRIMARY KEY (\`fingerprint_hash\`),
  INDEX \`idx_machines_user_email\` (\`user_email\`),
  INDEX \`idx_machines_mac_address\` (\`mac_address\`)
);`
  },
  "AuditReports": {
    label: "AuditReports",
    sql: `-- Create AuditReports Table
CREATE TABLE \`AuditReports\` (
  \`report_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`client_email\` varchar(255) NOT NULL,
  \`report_name\` varchar(255) NOT NULL,
  \`erasure_method\` varchar(255) NOT NULL,
  \`report_datetime\` datetime(6) NOT NULL,
  \`report_details_json\` json NOT NULL,
  \`synced\` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (\`report_id\`),
  INDEX \`idx_client_email\` (\`client_email\`),
  INDEX \`idx_synced\` (\`synced\`)
);`
  }
};

// Props interface
interface SchemaBuilderProps {
  selectedTables?: string[];
}

// Schema Modules Data (for module-based selection)
const schemaModules = [
  {
    id: "core-users",
    label: "Core Users",
    description: "User and Subuser tables for authentication",
    sql: `-- 1. Create Subuser Table
CREATE TABLE \`subuser\` (
  \`subuser_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`subuser_email\` varchar(255) NOT NULL,
  \`subuser_password\` varchar(255) NOT NULL,
  \`user_email\` varchar(255) NOT NULL,
  \`subuser_name\` varchar(255) DEFAULT NULL,
  \`subuser_phone_number\` varchar(255) DEFAULT NULL,
  \`created_by_subuser_email\` varchar(255) DEFAULT NULL,
  \`parent_subuser_id\` int(11) DEFAULT NULL,
  \`hierarchy_level\` int(11) DEFAULT NULL,
  \`subuser_username\` varchar(100) DEFAULT NULL,
  \`name\` varchar(255) DEFAULT NULL,
  \`phone\` varchar(255) DEFAULT NULL,
  \`department\` varchar(100) DEFAULT NULL,
  \`role\` varchar(100) DEFAULT NULL,
  \`permissionsJson\` json DEFAULT NULL,
  \`assignedMachines\` int(11) DEFAULT '0',
  \`maxMachines\` int(11) DEFAULT '0',
  \`machineIdsJson\` json DEFAULT NULL,
  \`licenseIdsJson\` json DEFAULT NULL,
  \`groupId\` bigint(20) DEFAULT '0',
  \`status\` varchar(50) DEFAULT 'inactive',
  \`activity_status\` varchar(50) DEFAULT 'offline',
  \`isEmailVerified\` tinyint(1) DEFAULT '0',
  \`canCreateSubusers\` tinyint(1) DEFAULT '0',
  \`canViewReports\` tinyint(1) DEFAULT '0',
  \`canManageMachines\` tinyint(1) DEFAULT '0',
  \`canAssignLicenses\` tinyint(1) DEFAULT '0',
  \`emailNotifications\` tinyint(1) DEFAULT '1',
  \`systemAlerts\` tinyint(1) DEFAULT '1',
  \`last_login\` varchar(50) DEFAULT NULL,
  \`last_logout\` varchar(50) DEFAULT NULL,
  \`failedLoginAttempts\` int(11) DEFAULT '0',
  \`lockedUntil\` datetime DEFAULT NULL,
  \`createdBy\` bigint(20) DEFAULT '0',
  \`createdAt\` datetime DEFAULT CURRENT_TIMESTAMP,
  \`updatedAt\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  \`updatedBy\` bigint(20) DEFAULT '0',
  \`notes\` text DEFAULT NULL,
  \`subuser_group\` varchar(50) DEFAULT NULL,
  \`timezone\` varchar(100) DEFAULT 'UTC',
  \`lastLoginIp\` varchar(100) DEFAULT NULL,
  \`lastLoginAt\` datetime DEFAULT NULL,
  \`LastLogoutAt\` datetime DEFAULT NULL,
  \`superuser_id\` int(11) DEFAULT NULL,
  \`license_allocation\` int(11) DEFAULT NULL,
  \`domain\` varchar(255) DEFAULT NULL,
  \`is_domain_admin\` varchar(100) DEFAULT NULL,
  \`organization_name\` varchar(100) DEFAULT NULL,
  PRIMARY KEY (\`subuser_id\`),
  UNIQUE KEY \`uk_subuser_email\` (\`subuser_email\`)
);

-- 2. Create Users Table (Main Admin/Users)
CREATE TABLE \`Users\` (
  \`user_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_name\` varchar(255) NOT NULL,
  \`user_email\` varchar(255) NOT NULL,
  \`user_password\` varchar(255) NOT NULL,
  \`hash_password\` Longtext NOT NULL,
  \`is_private_cloud\` tinyint(1) DEFAULT NULL,
  \`private_api\` tinyint(1) DEFAULT NULL,
  \`phone_number\` varchar(20) DEFAULT NULL,
  \`payment_details_json\` json DEFAULT NULL,
  \`license_details_json\` json DEFAULT NULL,
  \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  \`department\` varchar(50) DEFAULT NULL,
  \`user_group\` varchar(50) DEFAULT NULL,
  \`last_login\` varchar(50) DEFAULT NULL,
  \`last_logout\` varchar(50) DEFAULT NULL,
  \`user_role\` varchar(50) DEFAULT NULL,
  \`license_allocation\` int(11) DEFAULT NULL,
  \`status\` varchar(50) DEFAULT NULL,
  \`activity_status\` varchar(50) DEFAULT 'offline',
  \`timezone\` varchar(100) DEFAULT 'UTC',
  \`domain\` varchar(255) DEFAULT NULL,
  \`is_domain_admin\` varchar(100) DEFAULT NULL,
  \`organization_name\` varchar(100) DEFAULT NULL,
  \`last_login_ip\` varchar(50) DEFAULT NULL,
  PRIMARY KEY (\`user_id\`),
  UNIQUE KEY \`uk_user_email\` (\`user_email\`)
);`,
  },
  {
    id: "rbac",
    label: "RBAC (Roles & Permissions)",
    description: "Role-Based Access Control tables",
    sql: `-- 3. Create Roles Table
CREATE TABLE \`Roles\` (
  \`RoleId\` int(11) NOT NULL AUTO_INCREMENT,
  \`RoleName\` varchar(100) NOT NULL,
  \`Description\` varchar(500) NOT NULL,
  \`HierarchyLevel\` int(11) NOT NULL,
  \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`RoleId\`),
  UNIQUE KEY \`uk_RoleName\` (\`RoleName\`)
);

-- 4. Create Permissions Table
CREATE TABLE \`Permissions\` (
  \`PermissionId\` int(11) NOT NULL AUTO_INCREMENT,
  \`PermissionName\` varchar(100) NOT NULL,
  \`Description\` varchar(500) NOT NULL,
  \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`PermissionId\`),
  UNIQUE KEY \`uk_PermissionName\` (\`PermissionName\`)
);

-- 5. Create Routes Table (API Endpoints)
CREATE TABLE \`Routes\` (
  \`RouteId\` int(11) NOT NULL AUTO_INCREMENT,
  \`RoutePath\` varchar(500) NOT NULL,
  \`HttpMethod\` varchar(10) NOT NULL,
  \`Description\` varchar(200) NOT NULL,
  \`CreatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`RouteId\`),
  INDEX \`idx_RoutePath\` (\`RoutePath\`)
);`,
  },
  {
    id: "rbac-mappings",
    label: "RBAC Mappings (Join Tables)",
    description: "User-Role and Role-Permission mappings",
    sql: `-- 6. Create UserRoles (Links Users to Roles)
CREATE TABLE \`UserRoles\` (
  \`UserId\` int(11) NOT NULL,
  \`RoleId\` int(11) NOT NULL,
  \`AssignedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`AssignedByEmail\` longtext NOT NULL,
  PRIMARY KEY (\`UserId\`, \`RoleId\`),
  CONSTRAINT \`fk_UserRoles_Roles\` FOREIGN KEY (\`RoleId\`) REFERENCES \`Roles\` (\`RoleId\`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 7. Create SubuserRoles (Links Subusers to Roles)
CREATE TABLE \`SubuserRoles\` (
  \`SubuserId\` int(11) NOT NULL,
  \`RoleId\` int(11) NOT NULL,
  \`AssignedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`AssignedByEmail\` longtext NOT NULL,
  PRIMARY KEY (\`SubuserId\`, \`RoleId\`),
  CONSTRAINT \`fk_SubuserRoles_Subuser\` FOREIGN KEY (\`SubuserId\`) REFERENCES \`subuser\` (\`subuser_id\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`fk_SubuserRoles_Roles\` FOREIGN KEY (\`RoleId\`) REFERENCES \`Roles\` (\`RoleId\`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 8. Create RolePermissions (Links Roles to Permissions)
CREATE TABLE \`RolePermissions\` (
  \`RoleId\` int(11) NOT NULL,
  \`PermissionId\` int(11) NOT NULL,
  PRIMARY KEY (\`RoleId\`, \`PermissionId\`),
  CONSTRAINT \`fk_RolePermissions_Roles\` FOREIGN KEY (\`RoleId\`) REFERENCES \`Roles\` (\`RoleId\`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT \`fk_RolePermissions_Permissions\` FOREIGN KEY (\`PermissionId\`) REFERENCES \`Permissions\` (\`PermissionId\`) ON DELETE CASCADE ON UPDATE CASCADE
);`,
  },
  {
    id: "monitoring",
    label: "Monitoring (Logs & Sessions)",
    description: "Session tracking and system logs",
    sql: `-- 9. Create Sessions Table
CREATE TABLE \`Sessions\` (
  \`session_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_email\` varchar(255) NOT NULL,
  \`login_time\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`logout_time\` datetime(6) DEFAULT NULL,
  \`ip_address\` varchar(45) NOT NULL,
  \`device_info\` varchar(1000) NOT NULL,
  \`session_status\` varchar(50) NOT NULL DEFAULT 'active',
  PRIMARY KEY (\`session_id\`),
  INDEX \`idx_user_email\` (\`user_email\`)
);

-- 10. Create Logs Table
CREATE TABLE \`Logs\` (
  \`log_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`user_email\` varchar(255) NOT NULL,
  \`log_level\` varchar(50) NOT NULL,
  \`log_message\` varchar(2000) NOT NULL,
  \`log_details_json\` json NOT NULL,
  \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (\`log_id\`),
  INDEX \`idx_logs_created_at\` (\`created_at\`),
  INDEX \`idx_logs_user_email\` (\`user_email\`)
);

-- 11. Create Commands Table
CREATE TABLE \`commands\` (
  \`Command_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`command_text\` varchar(2000) NOT NULL,
  \`issued_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`command_json\` json NOT NULL,
  \`command_status\` varchar(100) NOT NULL DEFAULT 'pending',
  \`user_email\` varchar(50) DEFAULT NULL,
  PRIMARY KEY (\`Command_id\`),
  INDEX \`idx_command_status\` (\`command_status\`),
  INDEX \`idx_commands_user_email\` (\`user_email\`)
);`,
  },
  {
    id: "business-logic",
    label: "Business Logic (Machines & Reports)",
    description: "Machine fingerprints and audit reports",
    sql: `-- 12. Create Machines Table
CREATE TABLE \`Machines\` (
  \`fingerprint_hash\` varchar(255) NOT NULL,
  \`mac_address\` varchar(255) NOT NULL,
  \`physical_drive_id\` varchar(255) NOT NULL,
  \`cpu_id\` varchar(255) NOT NULL,
  \`bios_serial\` varchar(255) NOT NULL,
  \`os_version\` varchar(255) NOT NULL,
  \`user_email\` varchar(255) NOT NULL,
  \`subuser_email\` varchar(255) DEFAULT NULL,
  \`license_activated\` tinyint(1) NOT NULL DEFAULT '0',
  \`license_activation_date\` datetime(6) DEFAULT NULL,
  \`license_days_valid\` int(11) NOT NULL DEFAULT '0',
  \`license_details_json\` json NOT NULL,
  \`demo_usage_count\` int(11) NOT NULL DEFAULT '0',
  \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  \`vm_status\` longtext NOT NULL,
  \`machine_details_json\` json DEFAULT NULL,
  PRIMARY KEY (\`fingerprint_hash\`),
  INDEX \`idx_machines_user_email\` (\`user_email\`),
  INDEX \`idx_machines_mac_address\` (\`mac_address\`)
);

-- 13. Create AuditReports Table
CREATE TABLE \`AuditReports\` (
  \`report_id\` int(11) NOT NULL AUTO_INCREMENT,
  \`client_email\` varchar(255) NOT NULL,
  \`report_name\` varchar(255) NOT NULL,
  \`erasure_method\` varchar(255) NOT NULL,
  \`report_datetime\` datetime(6) NOT NULL,
  \`report_details_json\` json NOT NULL,
  \`synced\` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (\`report_id\`),
  INDEX \`idx_client_email\` (\`client_email\`),
  INDEX \`idx_synced\` (\`synced\`)
);`,
  },
];

// Styles
const styles = {
  container: {
    padding: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },
  card: {
    padding: "20px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  cardSelected: {
    borderColor: "#6366f1",
    backgroundColor: "#eef2ff",
  },
  cardHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    accentColor: "#6366f1",
    cursor: "pointer",
    marginTop: "2px",
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "4px",
  },
  cardDescription: {
    fontSize: "13px",
    color: "#64748b",
    lineHeight: "1.4",
  },
  codeSection: {
    marginTop: "16px",
  },
  helperText: {
    textAlign: "center" as const,
    padding: "48px 24px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    border: "2px dashed #e2e8f0",
  },
  helperIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  helperMessage: {
    fontSize: "16px",
    color: "#64748b",
    fontWeight: "500",
  },
  codeBlock: {
    marginBottom: "24px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  codeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "#2d2d2d",
    borderBottom: "1px solid #404040",
  },
  codeTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sqlBadge: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#22c55e",
    backgroundColor: "rgba(34, 197, 94, 0.15)",
    padding: "2px 8px",
    borderRadius: "4px",
    letterSpacing: "0.5px",
  },
  copyButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: "500",
    color: "#e2e8f0",
    backgroundColor: "#404040",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  copyButtonCopied: {
    backgroundColor: "#22c55e",
    color: "#ffffff",
  },
  codeContent: {
    padding: "20px",
    backgroundColor: "#1e1e1e",
    overflowX: "auto" as const,
  },
  preTag: {
    margin: 0,
    padding: 0,
    fontFamily: '"Fira Code", "JetBrains Mono", "Consolas", monospace',
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#d4d4d4",
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
  },
  selectAllSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    padding: "12px 16px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  selectAllLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#475569",
  },
  selectedCount: {
    fontSize: "13px",
    color: "#6366f1",
    fontWeight: "600",
  },
};

export default function SchemaBuilder({ selectedTables = [] }: SchemaBuilderProps) {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto-select modules based on selectedTables from parent
  useEffect(() => {
    if (selectedTables.length > 0) {
      const modulesToSelect = new Set<string>();
      selectedTables.forEach((table) => {
        const moduleId = tableToModuleMap[table];
        if (moduleId) {
          modulesToSelect.add(moduleId);
        }
      });
      setSelectedModules(Array.from(modulesToSelect));
    }
  }, [selectedTables]);

  const handleToggleModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedModules.length === schemaModules.length) {
      setSelectedModules([]);
    } else {
      setSelectedModules(schemaModules.map((m) => m.id));
    }
  };

  const handleCopy = async (moduleId: string, sql: string) => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopiedId(moduleId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const selectedSchemas = schemaModules.filter((m) =>
    selectedModules.includes(m.id)
  );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Schema Builder</h1>
        <p style={styles.subtitle}>
          Select database modules to view their SQL schema definitions
        </p>
      </div>

      {/* Select All Section */}
      <div style={styles.selectAllSection}>
        <label style={styles.selectAllLabel}>
          <input
            type="checkbox"
            checked={selectedModules.length === schemaModules.length}
            onChange={handleSelectAll}
            style={styles.checkbox}
          />
          Select All Modules
        </label>
        <span style={styles.selectedCount}>
          {selectedModules.length} of {schemaModules.length} selected
        </span>
      </div>

      {/* Module Cards Grid */}
      <div style={styles.cardsGrid}>
        {schemaModules.map((module) => {
          const isSelected = selectedModules.includes(module.id);
          return (
            <div
              key={module.id}
              style={{
                ...styles.card,
                ...(isSelected ? styles.cardSelected : {}),
              }}
              onClick={() => handleToggleModule(module.id)}
            >
              <div style={styles.cardHeader}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggleModule(module.id)}
                  onClick={(e) => e.stopPropagation()}
                  style={styles.checkbox}
                />
                <div style={styles.cardContent}>
                  <div style={styles.cardTitle}>{module.label}</div>
                  <div style={styles.cardDescription}>{module.description}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Individual Table SQL Display - When tables are selected from parent */}
      {selectedTables.length > 0 && (
        <div style={styles.codeSection}>
          <div style={{ ...styles.header, marginTop: "24px" }}>
            <h2 style={{ ...styles.title, fontSize: "22px" }}>📋 Selected Tables SQL</h2>
            <p style={styles.subtitle}>
              SQL schema for {selectedTables.length} selected table(s)
            </p>
          </div>
          {selectedTables.map((tableName) => {
            const tableData = tableSqlMap[tableName];
            if (!tableData) return null;
            return (
              <div key={tableName} style={styles.codeBlock}>
                <div style={styles.codeHeader}>
                  <div style={styles.codeTitle}>
                    <span>{tableData.label}</span>
                    <span style={styles.sqlBadge}>SQL</span>
                  </div>
                  <button
                    style={{
                      ...styles.copyButton,
                      ...(copiedId === tableName ? styles.copyButtonCopied : {}),
                    }}
                    onClick={() => handleCopy(tableName, tableData.sql)}
                  >
                    {copiedId === tableName ? (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div style={styles.codeContent}>
                  <pre style={styles.preTag}>{tableData.sql}</pre>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Code Display Section - Module based */}
      <div style={styles.codeSection}>
        {selectedSchemas.length === 0 && selectedTables.length === 0 ? (
          <div style={styles.helperText}>
            <div style={styles.helperIcon}>📋</div>
            <p style={styles.helperMessage}>
              Select a module above to view its SQL commands
            </p>
          </div>
        ) : selectedSchemas.length > 0 ? (
          selectedSchemas.map((module) => (
            <div key={module.id} style={styles.codeBlock}>
              {/* Code Block Header */}
              <div style={styles.codeHeader}>
                <div style={styles.codeTitle}>
                  <span>{module.label}</span>
                  <span style={styles.sqlBadge}>SQL</span>
                </div>
                <button
                  style={{
                    ...styles.copyButton,
                    ...(copiedId === module.id ? styles.copyButtonCopied : {}),
                  }}
                  onClick={() => handleCopy(module.id, module.sql)}
                  onMouseEnter={(e) => {
                    if (copiedId !== module.id) {
                      e.currentTarget.style.backgroundColor = "#525252";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (copiedId !== module.id) {
                      e.currentTarget.style.backgroundColor = "#404040";
                    }
                  }}
                >
                  {copiedId === module.id ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        ></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Code Content */}
              <div style={styles.codeContent}>
                <pre style={styles.preTag}>{module.sql}</pre>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
}
