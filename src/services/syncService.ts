import { indexedDBService } from './indexedDBService';
import { AdminDashboardAPI } from './adminDashboardAPI';
import { apiClient } from '@/utils/enhancedApiClient';

class SyncService {
  /**
   * Syncs all dashboard data for a given user.
   * Fetches from API and stores in IndexedDB.
   */
  async syncDashboardData(userEmail: string): Promise<void> {
    console.log('🔄 SyncService: Starting dashboard data sync for', userEmail);
    const results: Record<string, boolean> = {};

    try {
      // 1. Dashboard Stats
      try {
        const statsRes = await AdminDashboardAPI.getDashboardStats();
        if (statsRes.success && statsRes.data) {
          await indexedDBService.put('dashboard_stats', `stats_${userEmail}`, statsRes.data);
          results.stats = true;
        }
      } catch (e) {
        console.error('Failed to sync stats', e);
        results.stats = false;
      }

      // 2. User Activity
      try {
        const activityRes = await AdminDashboardAPI.getUserActivity(userEmail);
        if (activityRes.success && activityRes.data) {
          await indexedDBService.put('user_activity', userEmail, activityRes.data);
          results.activity = true;
        }
      } catch (e) {
        console.error('Failed to sync activity', e);
        results.activity = false;
      }

      // 3. Groups (Using API Client directly for flexibility)
      try {
        // Fetch groups
        const groupsRes = await AdminDashboardAPI.getGroups();
        if (groupsRes.success && groupsRes.data) {
           await indexedDBService.put('groups', `all_groups_${userEmail}`, groupsRes.data);
           results.groups = true;
        }
        
        // Fetch detailed groups with users (for AdminGroups page)
        const detailedGroupsRes = await apiClient.getGroupsWithUsers();
        if (detailedGroupsRes.success && detailedGroupsRes.data) {
            await indexedDBService.put('groups', `groups_with_users_${userEmail}`, detailedGroupsRes.data);
            results.groups_detailed = true;
        }
      } catch (e) {
          console.error('Failed to sync groups', e);
          results.groups = false;
      }

      // 4. Licenses
      try {
        const licensesRes = await AdminDashboardAPI.getLicenseData();
        if (licensesRes.success && licensesRes.data) {
          await indexedDBService.put('licenses', `all_licenses_${userEmail}`, licensesRes.data);
          results.licenses = true;
        }
      } catch (e) {
        console.error('Failed to sync licenses', e);
        results.licenses = false;
      }

      // 5. Recent Reports
      try {
        const reportsRes = await AdminDashboardAPI.getRecentReports();
         if (reportsRes.success && reportsRes.data) {
          await indexedDBService.put('recent_reports', `reports_${userEmail}`, reportsRes.data);
          results.reports = true;
        }
      } catch (e) {
        console.error('Failed to sync reports', e);
        results.reports = false;
      }

      // 6. Profile
      try {
        const profileRes = await AdminDashboardAPI.getAdminProfile();
        if (profileRes.success && profileRes.data) {
          // Profile is keyed by email to handle multi-user logins on same device
          await indexedDBService.put('profile', userEmail, profileRes.data);
          results.profile = true;
        }
      } catch (e) {
        console.error('Failed to sync profile', e);
        results.profile = false;
      }

      // 7. Subusers (for the current user/owner)
      try {
         const subusersRes = await apiClient.getSubusersBySuperuser(userEmail);
         // Ensure data is array before storing
         if (subusersRes.success && Array.isArray(subusersRes.data)) {
             await indexedDBService.put('subusers', userEmail, subusersRes.data);
             results.subusers = true;
         } else {
            console.warn('SyncService: Subusers data is not an array', subusersRes.data);
            results.subusers = false;
         }
      } catch (e) {
          console.error('Failed to sync subusers', e);
          results.subusers = false;
      }

      // 8. Sessions (Timeline)
      try {
         const sessionsRes = await apiClient.getSessionsTimeline({});
         // ********** PURANA CODE (array wrap se flattenTimelineData break hota tha) **********
         // await indexedDBService.put('sessions', 'timeline', Array.isArray(sessionsRes) ? sessionsRes : [sessionsRes]);
         // *******************************************
         
         // ********** NAYA CODE — Store raw API response directly **********
         if (sessionsRes) {
             await indexedDBService.put('sessions', `timeline_${userEmail}`, sessionsRes);
             results.sessions = true;
         }
         // *******************************************
      } catch (e) {
          console.error('Failed to sync sessions', e);
          results.sessions = false;
      }

      // 9. Erasure Metrics
      try {
          // Fetching default metrics for current user
          const metricsRes = await AdminDashboardAPI.getErasureMetrics({ 
            userEmails: [userEmail] 
          });
          if (metricsRes.success && metricsRes.data) {
              await indexedDBService.put('erasure_metrics', `metrics_${userEmail}`, metricsRes.data);
              results.metrics = true;
          }
      } catch (e) {
          console.error('Failed to sync erasure metrics', e);
          results.metrics = false;
      }

      // ********** NAYA CODE — Phase 1: Sync machines, audit_reports, system_logs **********
      // 10. Machines (by email)
      try {
          const machinesRes = await apiClient.getMachinesByEmail(userEmail);
          if (machinesRes.success && machinesRes.data) {
              await indexedDBService.put('machines', userEmail, machinesRes.data);
              results.machines = true;
          }
      } catch (e) {
          console.error('Failed to sync machines', e);
          results.machines = false;
      }

      // 11. Audit Reports (by email)
      try {
          const reportsRes = await apiClient.getAuditReportsByEmail(userEmail);
          if (reportsRes.success && reportsRes.data) {
              await indexedDBService.put('audit_reports', userEmail, reportsRes.data);
              results.audit_reports = true;
          }
      } catch (e) {
          console.error('Failed to sync audit reports', e);
          results.audit_reports = false;
      }

      // 12. System Logs (by email)
      try {
          const logsRes = await apiClient.getSystemLogsByEmail(userEmail);
          if (logsRes.success && logsRes.data) {
              await indexedDBService.put('system_logs', userEmail, logsRes.data);
              results.system_logs = true;
          }
      } catch (e) {
          console.error('Failed to sync system logs', e);
          results.system_logs = false;
      }
      // *******************************************

      console.log('✅ SyncService: Dashboard sync complete.', results);

    } catch (error) {
      console.error('❌ SyncService: Critical error during sync:', error);
      throw error;
    }
  }
  
  /**
   * Clears all data from IndexedDB.
   * Useful on logout.
   */
  async clearAllData(): Promise<void> {
      try {
          await indexedDBService.clearAll();
          console.log('🧹 SyncService: Local data cleared.');
      } catch (error) {
          console.error('❌ SyncService: Failed to clear data:', error);
      }
  }
}

export const syncService = new SyncService();
