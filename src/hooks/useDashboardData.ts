import React from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import {
  AdminDashboardAPI,
  type DashboardStats,
  type UserActivity,
  type GroupData,
  type LicenseData,
  type RecentReport,
  type ProfileData,
} from "@/services/adminDashboardAPI";
import { indexedDBService } from "@/services/indexedDBService";
import { apiClient } from "@/utils/enhancedApiClient";
import {
  isDemoMode,
  DEMO_DASHBOARD_STATS,
  DEMO_USER_ACTIVITY,
  DEMO_GROUPS,
  DEMO_LICENSE_DETAILS,
  DEMO_REPORTS,
  DEMO_PROFILE,
} from "@/data/demoData";
import { authService } from "@/utils/authService";

/**
 * Query keys for dashboard data caching
 */
export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: (email: string) => [...dashboardKeys.all, "stats", email] as const,
  activity: (email: string) =>
    [...dashboardKeys.all, "activity", email] as const,
  groups: (email: string) => [...dashboardKeys.all, "groups", email] as const,
  licenses: (email: string) =>
    [...dashboardKeys.all, "licenses", email] as const,
  reports: (email: string) => [...dashboardKeys.all, "reports", email] as const,
  profile: (email: string) => [...dashboardKeys.all, "profile", email] as const,
  // ✅ NAYA CODE: Added licenseList key for caching the full license list across remounts
  licenseList: (email: string) =>
    [...dashboardKeys.all, "licenseList", email] as const,
};

// Helper to get current user email
const getCurrentUserEmail = () => {
  const storedUser = localStorage.getItem("user_data");
  const authUser = localStorage.getItem("authUser");

  let email = "";

  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      email = parsed.user_email || parsed.email || "";
    } catch (e) {
      console.error("Error parsing user_data", e);
    }
  }

  if (!email && authUser) {
    try {
      const parsed = JSON.parse(authUser);
      email = parsed.user_email || parsed.email || "";
    } catch (e) {
      console.error("Error parsing authUser", e);
    }
  }

  // Fallback to authService to catch token-based email
  if (!email) {
    email = authService.getUserEmail?.() || "";
  }

  return email;
};

/**
 * Fetch dashboard statistics
 * Cached for 2 minutes (stats change frequently)
 */
export function useDashboardStats(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.stats(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log("🔹 Using DEMO dashboard stats");
        return DEMO_DASHBOARD_STATS;
      }

      // 1. Try IDB (user-scoped)
      const email = userEmail || getCurrentUserEmail();
      const cacheKey = email ? `stats_${email}` : "stats";
      try {
        const cached = await indexedDBService.get("dashboard_stats", cacheKey);
        if (cached) return cached;
      } catch (e) {
        console.warn("IDB Read Failed: stats", e);
      }

      // 2. Fallback to API
      const response = await AdminDashboardAPI.getDashboardStats();
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch dashboard stats");
      }

      // 3. Update IDB
      indexedDBService
        .put("dashboard_stats", cacheKey, response.data)
        .catch((e) => console.error("IDB Write Failed: stats", e));

      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch user activity data
 * Cached for 1 minute (activity updates frequently)
 * @param userEmail - Email of the user to fetch activity for
 */
export function useUserActivity(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.activity(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log("🔹 Using DEMO user activity");
        return DEMO_USER_ACTIVITY;
      }

      // 1. Try IDB
      try {
        const cached = await indexedDBService.get("user_activity", userEmail);
        if (cached && Array.isArray(cached) && cached.length > 0) return cached;
      } catch (e) {
        console.warn("IDB Read Failed: activity", e);
      }

      console.log("📞 Calling getUserActivity API...");
      const response = await AdminDashboardAPI.getUserActivity(userEmail);

      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch user activity");
      }

      // 3. Update IDB
      indexedDBService
        .put("user_activity", userEmail, response.data)
        .catch((e) => console.error("IDB Write Failed: activity", e));

      return response.data;
    },
    enabled: enabled && !!userEmail,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch groups data
 * Cached for 5 minutes (groups rarely change)
 */
export function useGroups(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.groups(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log("🔹 Using DEMO groups data");
        return DEMO_GROUPS;
      }

      // 1. Try IDB (user-scoped)
      const email = userEmail || getCurrentUserEmail();
      const groupsCacheKey = email ? `all_groups_${email}` : "all_groups";
      try {
        const cached = await indexedDBService.get("groups", groupsCacheKey);
        if (cached) return cached;
      } catch (e) {
        console.warn("IDB Read Failed: groups", e);
      }

      const response = await AdminDashboardAPI.getGroups();
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch groups");
      }

      // 3. Update IDB
      indexedDBService
        .put("groups", groupsCacheKey, response.data)
        .catch((e) => console.error("IDB Write Failed: groups", e));

      return response.data;
    },
    enabled,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch license data
 * Cached for 5 minutes
 */
export function useLicenseData(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.licenses(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log("🔹 Using DEMO license data");
        return DEMO_LICENSE_DETAILS;
      }

      // 1. Try IDB (user-scoped)
      const email = userEmail || getCurrentUserEmail();
      const licCacheKey = email ? `all_licenses_${email}` : "all_licenses";
      try {
        const cached = await indexedDBService.get("licenses", licCacheKey);
        if (cached) return cached;
      } catch (e) {
        console.warn("IDB Read Failed: licenses", e);
      }

      const response = await AdminDashboardAPI.getLicenseData();
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch license data");
      }

      // 3. Update IDB
      indexedDBService
        .put("licenses", licCacheKey, response.data)
        .catch((e) => console.error("IDB Write Failed: licenses", e));

      return response.data;
    },
    enabled,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

/**
 * Fetch recent reports
 * Cached for 2 minutes (reports change moderately)
 */
export function useRecentReports(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.reports(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log("🔹 Using DEMO recent reports");
        return DEMO_REPORTS;
      }

      // 1. Try IDB (user-scoped)
      const email = getCurrentUserEmail();
      const rptCacheKey = email ? `reports_${email}` : "reports";
      try {
        const cached = await indexedDBService.get(
          "recent_reports",
          rptCacheKey,
        );
        if (cached) return cached;
      } catch (e) {
        console.warn("IDB Read Failed: reports", e);
      }

      const response = await AdminDashboardAPI.getRecentReports();
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch recent reports");
      }

      // 3. Update IDB
      indexedDBService
        .put("recent_reports", rptCacheKey, response.data)
        .catch((e) => console.error("IDB Write Failed: reports", e));

      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch admin profile data
 * Cached for 10 minutes (profile rarely changes)
 */
export function useAdminProfile(userEmail: string, enabled: boolean = true) {
  return useQuery({
    queryKey: dashboardKeys.profile(userEmail),
    queryFn: async () => {
      // 0. Mock Data for Demo Mode
      if (isDemoMode()) {
        console.log("🔹 Using DEMO admin profile");
        return DEMO_PROFILE;
      }

      const email = userEmail || getCurrentUserEmail();
      // 1. Try IDB
      if (email) {
        try {
          const cached = await indexedDBService.get("profile", email);
          if (cached) return cached;
        } catch (e) {
          console.warn("IDB Read Failed: profile", e);
        }
      }

      const response = await AdminDashboardAPI.getAdminProfile();
      if (!response.success || !response.data) {
        throw new Error(response.message || "Failed to fetch admin profile");
      }

      // 3. Update IDB
      if (email) {
        indexedDBService
          .put("profile", email, response.data)
          .catch((e) => console.error("IDB Write Failed: profile", e));
      }

      return response.data;
    },
    enabled,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch all dashboard data in parallel using useQueries
 * This replaces the manual Promise.all() approach
 *
 * @param userEmail - Email of the user to fetch data for
 * @param enabled - Whether to enable all queries
 * @returns Object containing all dashboard data with loading/error states
 */
export function useDashboardData(userEmail: string, enabled: boolean = true) {
  const statsQuery = useDashboardStats(userEmail, enabled);
  const activityQuery = useUserActivity(userEmail, enabled);
  const groupsQuery = useGroups(userEmail, enabled);
  const licenseQuery = useLicenseData(userEmail, enabled);
  const reportsQuery = useRecentReports(userEmail, enabled);
  const profileQuery = useAdminProfile(userEmail, enabled);

  return React.useMemo(
    () => ({
      // Data
      stats: statsQuery.data || null,
      activity: activityQuery.data || [],
      groups: groupsQuery.data || [],
      licenses: licenseQuery.data || [],
      reports: reportsQuery.data || [],
      profile: profileQuery.data || null,

      // Loading states
      isLoading:
        statsQuery.isLoading ||
        activityQuery.isLoading ||
        groupsQuery.isLoading ||
        licenseQuery.isLoading ||
        reportsQuery.isLoading ||
        profileQuery.isLoading,

      isRefetching:
        statsQuery.isRefetching ||
        activityQuery.isRefetching ||
        groupsQuery.isRefetching ||
        licenseQuery.isRefetching ||
        reportsQuery.isRefetching ||
        profileQuery.isRefetching,

      // Error states
      hasError:
        statsQuery.isError ||
        activityQuery.isError ||
        groupsQuery.isError ||
        licenseQuery.isError ||
        reportsQuery.isError ||
        profileQuery.isError,

      errors: {
        stats: statsQuery.error,
        activity: activityQuery.error,
        groups: groupsQuery.error,
        licenses: licenseQuery.error,
        reports: reportsQuery.error,
        profile: profileQuery.error,
      },

      // Refetch functions
      refetch: () => {
        statsQuery.refetch();
        activityQuery.refetch();
        groupsQuery.refetch();
        licenseQuery.refetch();
        reportsQuery.refetch();
        profileQuery.refetch();
      },

      // Individual query objects for granular control
      queries: {
        stats: statsQuery,
        activity: activityQuery,
        groups: groupsQuery,
        licenses: licenseQuery,
        reports: reportsQuery,
        profile: profileQuery,
      },
    }),
    [
      statsQuery.data,
      activityQuery.data,
      groupsQuery.data,
      licenseQuery.data,
      reportsQuery.data,
      profileQuery.data,
      statsQuery.isLoading,
      activityQuery.isLoading,
      groupsQuery.isLoading,
      licenseQuery.isLoading,
      reportsQuery.isLoading,
      profileQuery.isLoading,
      statsQuery.isRefetching,
      activityQuery.isRefetching,
      groupsQuery.isRefetching,
      licenseQuery.isRefetching,
      reportsQuery.isRefetching,
      profileQuery.isRefetching,
      statsQuery.isError,
      activityQuery.isError,
      groupsQuery.isError,
      licenseQuery.isError,
      reportsQuery.isError,
      profileQuery.isError,
      statsQuery.error,
      activityQuery.error,
      groupsQuery.error,
      licenseQuery.error,
      reportsQuery.error,
      profileQuery.error,
    ],
  );
}

// ✅ NAYA CODE: React Query hook for full license list (cached for 60 minutes — session-long)
// PURANA CODE: AdminDashboard used a manual useEffect + apiClient.get() which had NO caching
export function useDashboardLicenseList(
  userEmail: string,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: dashboardKeys.licenseList(userEmail),
    queryFn: async () => {
      // 1. Try IDB first for instant load
      const licCacheKey = `license_list_${userEmail || "admin"}`;
      try {
        const cached = await indexedDBService.get("licenses", licCacheKey);
        if (cached && Array.isArray(cached) && cached.length > 0) {
          console.log(
            `✅ Loaded full license list for ${userEmail} from IndexedDB`,
          );
          return cached;
        }
      } catch (e) {
        console.warn("IDB Read Failed: license_list", e);
      }

      console.log("📞 Calling /api/License/admin/all API...");
      const listRes = await apiClient.get<any>("/api/License/admin/all");
      if (!listRes.success || !listRes.data) {
        return [];
      }

      const rawList = Array.isArray(listRes.data)
        ? listRes.data
        : listRes.data.licenses || [];

      // Same mapping as AdminLicenses.tsx
      const mappedList = rawList.map((item: any) => ({
        ...item,
        license_id: item.license_id || item.id || item._id,
        license_key: item.license_key || item.key,
        user_email: item.user_email || item.email,
        license_type:
          item.edition || item.license_type || item.type || "Standard",
        status: item.status || "Active",
        created_at: item.created_at || item.createdAt,
        expires_at: item.expires_at || item.expiresAt || item.expiry_date,
        machine_count: item.machine_count || item.machineCount || 0,
      }));

      // Filter for current user and their subusers
      let allowedEmails = [userEmail];
      try {
        const subusersRes =
          await apiClient.getAllSubusersWithFallback(userEmail);
        if (subusersRes.success && subusersRes.data) {
          const subuserEmails = subusersRes.data
            .map((s: any) => s.subuser_email || s.email)
            .filter(Boolean);
          allowedEmails = [...allowedEmails, ...subuserEmails];
        }
      } catch (e) {
        console.error("Failed to fetch subusers for license filter", e);
      }

      const filteredList = mappedList.filter((license: any) =>
        allowedEmails.some(
          (email) =>
            email.toLowerCase() === (license.user_email || "").toLowerCase(),
        ),
      );

      // 3. Update IDB cache with filtered list for instant loading next time
      try {
        await indexedDBService.put("licenses", licCacheKey, filteredList);
      } catch (e) {
        console.error("IDB Write Failed: license_list", e);
      }

      return filteredList;
    },
    enabled,
    staleTime: 60 * 60 * 1000, // 60 minutes — stays fresh for entire session
    gcTime: 60 * 60 * 1000, // 60 minutes — kept in cache even when component unmounts
    refetchOnMount: false, // Don't refetch when AdminDashboard remounts
    refetchOnWindowFocus: false, // Don't refetch on tab switch
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Manually refetch all dashboard data
 * @param userEmail - Email of the user to fetch data for
 */
export function useRefetchDashboard(userEmail: string) {
  const { refetch } = useDashboardData(userEmail, false);
  return refetch;
}

// ✅ Helpers for Dashboard Sessions Mapping (parity with AdminSessions.tsx)
const safeJsonParse = (value: any) => {
  if (typeof value !== "string") return value;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null ? parsed : value;
  } catch (e) {
    return value;
  }
};

const findValue = (obj: any, candidates: string[]): any => {
  if (!obj) return undefined;
  for (const key of candidates) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "")
      return obj[key];
  }
  const objectKeys = Object.keys(obj);
  for (const candidate of candidates) {
    const foundKey = objectKeys.find(
      (k) => k.toLowerCase() === candidate.toLowerCase(),
    );
    if (
      foundKey &&
      obj[foundKey] !== undefined &&
      obj[foundKey] !== null &&
      obj[foundKey] !== ""
    ) {
      return obj[foundKey];
    }
  }
  return undefined;
};

const parseActivityLog = (raw: any): any[] => {
  const logValue = findValue(raw, ["activityLog", "ActivityLog", "activity_log"]);
  if (!logValue) return [];
  try {
    if (typeof logValue === "string") return JSON.parse(logValue);
    if (Array.isArray(logValue)) return logValue;
  } catch (e) {
    console.warn("Failed to parse activityLog:", e);
  }
  return [];
};

const flattenTimelineData = (response: any): any[] => {
  let allRecords: any[] = [];
  const rootData = response.data || response;

  if (Array.isArray(rootData)) {
    rootData.forEach((yearItem: any) => {
      if (yearItem.months && Array.isArray(yearItem.months)) {
        yearItem.months.forEach((monthItem: any) => {
          if (monthItem.records && Array.isArray(monthItem.records)) {
            allRecords.push(...monthItem.records);
          }
        });
      } else {
        allRecords.push(yearItem);
      }
    });
  } else if (response.items && Array.isArray(response.items)) {
    allRecords = response.items;
  }
  return allRecords;
};

const normalizeDashboardSession = (raw: any): any => {
  const activityLog = parseActivityLog(raw);
  const isActive = findValue(raw, ["is_active", "isActive", "IsActive"]) ?? false;

  return {
    session_id: String(
      findValue(raw, ["session_id", "sessionId", "SessionId", "id", "ID"]) || "N/A",
    ),
    user_email:
      findValue(raw, ["user_email", "userEmail", "UserEmail", "email", "Email"]) ||
      "Unknown",
    login_time:
      findValue(raw, ["login_time", "loginTime", "LoginTime", "CreatedAt", "created_at", "startTime"]) ||
      new Date().toISOString(),
    logout_time:
      findValue(raw, ["logout_time", "logoutTime", "LogoutTime", "endTime", "EndTime", "completed_at", "EndDate"]) ||
      null,
    ip_address: findValue(raw, ["ip_address", "ipAddress", "IP", "ClientIp"]) || "N/A",
    device_info: safeJsonParse(
      findValue(raw, ["device_info", "deviceInfo", "userAgent", "Device"]) || "N/A",
    ),
    session_status: findValue(raw, ["session_status", "sessionStatus", "status"]) || "unknown",
    activity_type: findValue(raw, ["activity_type", "activityType"]) || "System",
    activity_details: safeJsonParse(
      findValue(raw, ["activity_details", "activityDetails", "details", "meta_data"]) || "No details",
    ),
    resource_id: findValue(raw, ["resource_id", "resourceId", "ResourceId", "Resource_Id", "key", "Key"]) || "-",
    resource_type: findValue(raw, ["resource_type", "resourceType", "ResourceType"]) || "-",
    activityLog: activityLog,
    lastActiveTime: findValue(raw, ["lastActiveTime", "LastActiveTime", "last_active_time"]) || null,
    estimatedExpiryTime: findValue(raw, ["estimatedExpiryTime", "EstimatedExpiryTime", "estimated_expiry_time"]) || null,
    sessionDurationMinutes: findValue(raw, ["session_duration_minutes", "sessionDurationMinutes", "SessionDurationMinutes"]) || null,
    isActive: Boolean(isActive),
  };
};

/**
 * Hook to fetch sessions for AdminDashboard using same logic as AdminSessions
 */
export function useDashboardSessions(
  userEmail: string | undefined,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: dashboardKeys.profile("dashboard-sessions-" + (userEmail || "all")),
    queryFn: async () => {
      // Return empty array if no email
      if (!userEmail) return [];

      const cacheKey = `timeline_${userEmail}`;

      // 1. Try IDB first for instant load
      try {
        const cached = await indexedDBService.get("sessions", cacheKey);
        if (cached && Array.isArray(cached) && cached.length > 0) {
          const isCorrupted = cached[0]?.success !== undefined;
          if (!isCorrupted) {
            console.log(`✅ Loaded dashboard sessions from IndexedDB`);
            const flatData = flattenTimelineData(cached);
            const mappedData = flatData.map(normalizeDashboardSession);
            mappedData.sort(
              (a, b) => new Date(b.login_time).getTime() - new Date(a.login_time).getTime(),
            );
            return mappedData;
          }
        }
      } catch (e) {
        console.warn("IDB Read Failed: dashboard sessions", e);
      }

      // 2. Fetch from timeline API
      console.log("📞 Calling /api/Sessions/timeline API for Dashboard...");
      const response = await apiClient.getSessionsTimeline({
        // No date filters - get recent general timeline data just like AdminSessions initial load
      });

      if (!response) {
        return [];
      }

      // 3. Update IDB cache
      try {
        await indexedDBService.put("sessions", cacheKey, response);
      } catch (e) {
        console.error("IDB Write Failed: dashboard sessions", e);
      }

      // 4. Map and sort for component
      const flatData = flattenTimelineData(response);
      const mappedData = flatData.map(normalizeDashboardSession);
      mappedData.sort(
        (a, b) => new Date(b.login_time).getTime() - new Date(a.login_time).getTime(),
      );

      return mappedData;
    },
    enabled,
    staleTime: 60 * 1000, 
    gcTime: 5 * 60 * 1000,
  });
} 
