import React, { useState } from 'react';
import { X, Cloud, Download, Upload, Trash2, Database } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const {
    syncConfig,
    updateSyncConfig,
    triggerManualSync,
    exportJson,
    importJson,
    resetAllData,
    loadDemoData
  } = useHabits();

  const [workerUrl, setWorkerUrl] = useState(syncConfig.workerUrl);
  const [authToken, setAuthToken] = useState(syncConfig.authToken);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSaveSync = (e: React.FormEvent) => {
    e.preventDefault();
    updateSyncConfig({ workerUrl: workerUrl.trim(), authToken: authToken.trim() });
    triggerManualSync();
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportJson());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `level-up-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importJson(content);
      if (success) {
        setImportStatus('Data successfully restored!');
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus('Invalid backup file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-obsidian-900 border border-obsidian-700 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-obsidian-700">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cloud className="w-5 h-5 text-flame-500" />
            Storage & Cloudflare R2 Sync
          </h2>
          <button type="button" onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cloudflare Worker R2 Sync Form */}
        <form onSubmit={handleSaveSync} className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            Cloudflare Worker Endpoint
          </h3>
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Worker URL</label>
            <input
              type="url"
              placeholder="https://level-up-sync.your-subdomain.workers.dev"
              value={workerUrl}
              onChange={e => setWorkerUrl(e.target.value)}
              className="w-full px-3 py-2 bg-obsidian-800 border border-obsidian-700 rounded-xl text-white text-xs focus:border-flame-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1">Bearer Auth Token</label>
            <input
              type="password"
              placeholder="Your custom sync passphrase or token"
              value={authToken}
              onChange={e => setAuthToken(e.target.value)}
              className="w-full px-3 py-2 bg-obsidian-800 border border-obsidian-700 rounded-xl text-white text-xs focus:border-flame-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-flame-600/30"
          >
            Save & Sync to R2
          </button>
        </form>

        {/* Local JSON Backup & Restore */}
        <div className="pt-4 border-t border-obsidian-700 space-y-3">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            JSON Backup & Restore
          </h3>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-obsidian-800 hover:bg-obsidian-700 text-zinc-300 font-semibold text-xs rounded-xl border border-obsidian-700"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>

            <label className="flex-1 flex items-center justify-center gap-2 py-2 bg-obsidian-800 hover:bg-obsidian-700 text-zinc-300 font-semibold text-xs rounded-xl border border-obsidian-700 cursor-pointer">
              <Upload className="w-4 h-4" />
              Import JSON
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>

          {importStatus && (
            <p className="text-xs text-flame-400 font-semibold text-center">{importStatus}</p>
          )}
        </div>

        {/* Demo & Danger Controls */}
        <div className="pt-4 border-t border-obsidian-700 flex justify-between gap-3">
          <button
            type="button"
            onClick={loadDemoData}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-obsidian-800 hover:bg-obsidian-700 text-zinc-400 hover:text-white text-xs rounded-lg border border-obsidian-700 font-medium"
          >
            <Database className="w-3.5 h-3.5" />
            Load Sample Data
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all local habit data? This cannot be undone.')) {
                resetAllData();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs rounded-lg border border-red-900/50 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Reset Data
          </button>
        </div>
      </div>
    </div>
  );
};
