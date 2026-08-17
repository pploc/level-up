export interface SyncConfig {
  workerUrl: string;
  authToken: string;
  autoSync: boolean;
  lastSyncTime: string | null;
}

export type SyncStatus = 'idle' | 'syncing' | 'success' | 'error';
