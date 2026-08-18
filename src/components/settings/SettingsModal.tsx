import React, { useState } from 'react';
import { X, Cloud, Download, Upload, Trash2, Database, ShieldCheck } from 'lucide-react';
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

  const [autoSync, setAutoSync] = useState(syncConfig.autoSync ?? true);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleToggleAutoSync = (checked: boolean) => {
    setAutoSync(checked);
    updateSyncConfig({ autoSync: checked });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 shadow-2xl space-y-6 border border-white/10">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Cloud className="w-5 h-5 text-flame-500" />
            App Settings & Cloud Backup
          </h2>
          <button type="button" onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cloud Sync State */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            Cloud Synchronization
          </h3>

          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-black/30 border border-white/5 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSync}
              onChange={e => handleToggleAutoSync(e.target.checked)}
              className="w-4 h-4 rounded accent-flame-500 cursor-pointer"
            />
            <div className="text-xs">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-flame-400" />
                Automatic Background Cloud Sync
              </div>
              <div className="text-zinc-400 text-[11px]">
                Silently syncs habit checks and XP to secure cloud storage
              </div>
            </div>
          </label>

          <button
            type="button"
            onClick={() => triggerManualSync()}
            className="w-full py-2 bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-flame-600/30 border border-flame-400/30 transition-all"
          >
            Sync Now
          </button>
        </div>

        {/* Local JSON Backup & Restore */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            Local Backup & Restore
          </h3>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-black/40 hover:bg-white/5 text-zinc-300 font-semibold text-xs rounded-xl border border-white/10 transition-all"
            >
              <Download className="w-4 h-4" />
              Export Backup
            </button>

            <label className="flex-1 flex items-center justify-center gap-2 py-2 bg-black/40 hover:bg-white/5 text-zinc-300 font-semibold text-xs rounded-xl border border-white/10 cursor-pointer transition-all">
              <Upload className="w-4 h-4" />
              Import Backup
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>

          {importStatus && (
            <p className="text-xs text-flame-400 font-semibold text-center">{importStatus}</p>
          )}
        </div>

        {/* Danger Controls */}
        <div className="pt-4 border-t border-white/10 flex justify-between gap-3">
          <button
            type="button"
            onClick={loadDemoData}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 hover:bg-white/5 text-zinc-400 hover:text-white text-xs rounded-xl border border-white/10 font-medium transition-all"
          >
            <Database className="w-3.5 h-3.5" />
            Load Sample Data
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset this account to Level 1 with 0 XP?')) {
                resetAllData();
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs rounded-xl border border-red-900/50 font-medium transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Reset Account to Lv. 1
          </button>
        </div>
      </div>
    </div>
  );
};
