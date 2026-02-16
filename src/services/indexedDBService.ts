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
  // *******************************************
}

const DB_NAME = 'dsecure_db';
const DB_VERSION = 3; // ✅ Bumped for downloads store

class IndexedDBService {
  private dbPromise: Promise<IDBPDatabase<DSecureDB>>;

  constructor() {
    this.dbPromise = openDB<DSecureDB>(DB_NAME, DB_VERSION, {
      upgrade(db: IDBPDatabase<DSecureDB>) {
        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains('dashboard_stats')) {
          db.createObjectStore('dashboard_stats');
        }
        if (!db.objectStoreNames.contains('user_activity')) {
          db.createObjectStore('user_activity');
        }
        if (!db.objectStoreNames.contains('groups')) {
          db.createObjectStore('groups');
        }
        if (!db.objectStoreNames.contains('licenses')) {
          db.createObjectStore('licenses');
        }
        if (!db.objectStoreNames.contains('recent_reports')) {
          db.createObjectStore('recent_reports');
        }
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile');
        }
        if (!db.objectStoreNames.contains('subusers')) {
          db.createObjectStore('subusers');
        }
        if (!db.objectStoreNames.contains('sessions')) {
          db.createObjectStore('sessions');
        }
        if (!db.objectStoreNames.contains('erasure_metrics')) {
          db.createObjectStore('erasure_metrics');
        }
        // ********** NAYA CODE — Phase 1: New stores **********
        if (!db.objectStoreNames.contains('machines')) {
          db.createObjectStore('machines');
        }
        if (!db.objectStoreNames.contains('audit_reports')) {
          db.createObjectStore('audit_reports');
        }
        if (!db.objectStoreNames.contains('system_logs')) {
          db.createObjectStore('system_logs');
        }
        if (!db.objectStoreNames.contains('downloads')) {
          db.createObjectStore('downloads');
        }
        // *******************************************
      },
    });
  }

  async get<StoreName extends keyof DSecureDB>(
    storeName: StoreName,
    key: DSecureDB[StoreName]['key']
  ): Promise<DSecureDB[StoreName]['value'] | undefined> {
    return (await this.dbPromise).get(storeName as any, key);
  }

  async put<StoreName extends keyof DSecureDB>(
    storeName: StoreName,
    key: DSecureDB[StoreName]['key'],
    value: DSecureDB[StoreName]['value']
  ): Promise<DSecureDB[StoreName]['key']> {
    return (await this.dbPromise).put(storeName as any, value, key);
  }

  async delete<StoreName extends keyof DSecureDB>(
    storeName: StoreName,
    key: DSecureDB[StoreName]['key']
  ): Promise<void> {
    await (await this.dbPromise).delete(storeName as any, key);
  }

  async clear(storeName: keyof DSecureDB): Promise<void> {
    await (await this.dbPromise).clear(storeName as any);
  }

  async clearAll(): Promise<void> {
    const db = await this.dbPromise;
    const storeNames = db.objectStoreNames;
    const tx = db.transaction(storeNames as any, 'readwrite');
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
  async deleteByPrefix(storeName: keyof DSecureDB, prefix: string): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName as any, 'readwrite');
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

  // Alias for get (with implicit store selection logic if needed, but for now strict)
  // To avoid breaking changes, let's keep it simple or remove if unused.
  // Actually, AdminMachines was using getItem/setItem directly on the instance. 
  // Let's add them as strict typed wrappers.

  async getItem<T = any>(key: string): Promise<T | undefined> {
    // Try to find the key in known stores or default to a specific one?
    // AdminMachines used it like a KV store.
    // Let's map it to 'machines' store if key starts with machines_, else 'dashboard_stats' etc.
    // This is a bit hacky. 
    // BETTER: Fix AdminMachines to use .get('machines', key)
    // But to be safe, let's add a general KV store or map it.
    
    if (key.startsWith('machines_')) return this.get('machines', key) as Promise<T | undefined>;
    if (key.startsWith('users_')) return this.get('subusers', key) as Promise<T | undefined>; // Store mapping? No, subusers store key is userEmail.
    
    // Fallback: Check dashboard_stats
    return this.get('dashboard_stats', key) as Promise<T | undefined>;
  }

  async setItem(key: string, value: any): Promise<void> {
     if (key.startsWith('machines_')) {
       await this.put('machines', key, value);
       return;
     }
     
     // Fallback
     await this.put('dashboard_stats', key, value);
  }

  async removeItem(key: string): Promise<void> {
    if (key.startsWith('machines_')) {
      await this.delete('machines', key);
      return;
    }
    await this.delete('dashboard_stats', key);
  }
}

export const indexedDBService = new IndexedDBService();
