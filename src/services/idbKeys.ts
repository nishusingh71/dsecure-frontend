/**
 * सभी IndexedDB keys एक जगह से generate होंगे
 * — हर file yehi utility use करेगी, कोई mismatch नहीं होगा
 */
export const idbKeys = {
  // dashboard_stats store
  stats: (email: string) => `stats_${email}`,

  // user_activity store
  activity: (email: string) => email,

  // groups store
  groups: (email: string) => `all_groups_${email}`,
  groupsWithUsers: (email: string) => `groups_with_users_${email}`,
  groupMetrics: (email: string) => `group_metrics_${email}`,

  // licenses store
  licenses: (email: string) => `all_licenses_${email}`,

  // recent_reports store
  recentReports: (email: string) => `reports_${email}`,

  // profile store
  profile: (email: string) => email,

  // subusers store
  subusers: (email: string) => email,

  // sessions store
  sessions: (email: string) => `timeline_${email}`,

  // erasure_metrics store
  erasureMetrics: (email: string) => `metrics_${email}`,

  // machines store
  machines: (email: string) => email,

  // audit_reports store
  auditReports: (email: string) => email,

  // enhanced_audit_reports store
  enhancedAuditReports: (email: string) => email,

  // system_logs store
  systemLogs: (email: string) => email,

  // downloads store
  downloadStats: (email: string) => `stats_${email}`,
  downloadProducts: (email: string) => `products_${email}`,
} as const;
