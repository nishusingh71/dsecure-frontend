import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface DSecureDB extends DBSchema {
  dashboard_stats: {
    key: string;
    value: any;
  };
  user_activity: {
    key: string;
    value: any;
  };
  groups: {
    key: string;
    value: any;
  };
  licenses: {
    key: string;
    value: any;
  };
  recent_reports: {
    key: string;
    value: any;
  };
  profile: {
    key: string; // userEmail
    value: any;
  };
  subusers: {
    key: string; // userEmail (owner)
    value: any;
  };
  sessions: {
    key: string; // 'timeline' or specific key
    value: any;
  };
  erasure_metrics: {
    key: string; // 'metrics'
    value: any;
  };
  // ********** NAYA CODE — Phase 1: New stores for complete data sync **********
  machines: {
    key: string; // userEmail
    value: any;
  };
  audit_reports: {
    key: string; // userEmail
    value: any;
  };
  system_logs: {
    key: string; // userEmail
    value: any;
  };
  downloads: {
    key: string; // 'stats' or 'products'
    value: any;
  };
  enhanced_audit_reports: {
    key: string; // userEmail
    value: any;
  };
  // *******************************************
}

const DB_NAME = "dsecure_db";
const DB_VERSION = 4; // ✅ Bumped for enhanced_audit_reports store

class IndexedDBService {
  private dbPromise: Promise<IDBPDatabase<DSecureDB>>;

  constructor() {
    if (typeof indexedDB !== "undefined") {
      this.dbPromise = openDB<DSecureDB>(DB_NAME, DB_VERSION, {
        upgrade(db: IDBPDatabase<DSecureDB>) {
          // Create object stores if they don't exist
          if (!db.objectStoreNames.contains("dashboard_stats")) {
            db.createObjectStore("dashboard_stats");
          }
          if (!db.objectStoreNames.contains("user_activity")) {
            db.createObjectStore("user_activity");
          }
          if (!db.objectStoreNames.contains("groups")) {
            db.createObjectStore("groups");
          }
          if (!db.objectStoreNames.contains("licenses")) {
            db.createObjectStore("licenses");
          }
          if (!db.objectStoreNames.contains("recent_reports")) {
            db.createObjectStore("recent_reports");
          }
          if (!db.objectStoreNames.contains("profile")) {
            db.createObjectStore("profile");
          }
          if (!db.objectStoreNames.contains("subusers")) {
            db.createObjectStore("subusers");
          }
          if (!db.objectStoreNames.contains("sessions")) {
            db.createObjectStore("sessions");
          }
          if (!db.objectStoreNames.contains("erasure_metrics")) {
            db.createObjectStore("erasure_metrics");
          }
          if (!db.objectStoreNames.contains("machines")) {
            db.createObjectStore("machines");
          }
          if (!db.objectStoreNames.contains("audit_reports")) {
            db.createObjectStore("audit_reports");
          }
          if (!db.objectStoreNames.contains("system_logs")) {
            db.createObjectStore("system_logs");
          }
          if (!db.objectStoreNames.contains("downloads")) {
            db.createObjectStore("downloads");
          }
          if (!db.objectStoreNames.contains("enhanced_audit_reports")) {
            db.createObjectStore("enhanced_audit_reports");
          }
        },
      });
    } else {
      this.dbPromise = Promise.resolve(null as any);
    }
  }

  async get<StoreName extends keyof DSecureDB>(
    storeName: StoreName,
    key: DSecureDB[StoreName]["key"],
  ): Promise<DSecureDB[StoreName]["value"] | undefined> {
    const db = await this.dbPromise;
    if (!db) return undefined;
    return db.get(storeName as any, key);
  }

  async put<StoreName extends keyof DSecureDB>(
    storeName: StoreName,
    key: DSecureDB[StoreName]["key"],
    value: DSecureDB[StoreName]["value"],
  ): Promise<DSecureDB[StoreName]["key"]> {
    const db = await this.dbPromise;
    if (!db) return key;
    return db.put(storeName as any, value, key);
  }

  async delete<StoreName extends keyof DSecureDB>(
    storeName: StoreName,
    key: DSecureDB[StoreName]["key"],
  ): Promise<void> {
    const db = await this.dbPromise;
    if (!db) return;
    await db.delete(storeName as any, key);
  }

  async clear(storeName: keyof DSecureDB): Promise<void> {
    const db = await this.dbPromise;
    if (!db) return;
    await db.clear(storeName as any);
  }

  async clearAll(): Promise<void> {
    const db = await this.dbPromise;
    const storeNames = db.objectStoreNames;
    const tx = db.transaction(storeNames as any, "readwrite");
    const promises = [];
    for (const storeName of storeNames) {
      if (tx.objectStore(storeName as any)) {
        promises.push(tx.objectStore(storeName as any).clear());
      }
    }
    await Promise.all(promises);
    await tx.done;
  }

  // Helper method to delete items by key prefix from a specific store
  async deleteByPrefix(
    storeName: keyof DSecureDB,
    prefix: string,
  ): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName as any, "readwrite");
    const store = tx.objectStore(storeName as any);
    let cursor = await store.openCursor();

    while (cursor) {
      if (String(cursor.key).startsWith(prefix)) {
        await cursor.delete();
      }
      cursor = await cursor.continue();
    }
    await tx.done;
  }

  // Cleaned up legacy getItem/setItem/setItem wrappers.
  // Components should now use .get(store, key), .put(store, key, value), and .delete(store, key) directly with idbKeys utility.
}

export const indexedDBService = new IndexedDBService();
