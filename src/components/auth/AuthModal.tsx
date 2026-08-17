import React, { useState } from 'react';
import { LogIn, UserPlus, Sparkles, AlertCircle, RefreshCw, X } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup, syncStatus } = useHabits();
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [username, setUsername] = useState('');
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !passphrase.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    const token = `${username.trim().toLowerCase()}_${passphrase.trim()}`;
    const result = mode === 'signup'
      ? await signup(username.trim(), token)
      : await login(username.trim(), token);

    if (result.success) {
      setError(null);
      onClose();
    } else {
      setError(result.error || 'Operation failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl space-y-5 border border-white/10 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-flame-600/20 text-flame-500 border border-flame-500/30 mb-1">
            {mode === 'signup' ? <UserPlus className="w-6 h-6" /> : <LogIn className="w-6 h-6" />}
          </div>
          <h2 className="text-xl font-black text-white tracking-wide">
            {mode === 'signup' ? 'Create New Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-zinc-400">
            {mode === 'signup'
              ? 'Start fresh at Level 1 with full cloud synchronization.'
              : 'Sign in to restore your existing habit progress and streaks.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-black/40 border border-white/10 rounded-xl">
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'signup'
                ? 'bg-flame-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign Up (Fresh Lv. 1)
          </button>
          <button
            type="button"
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'login'
                ? 'bg-flame-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Sign In (Restore)
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-950/40 border border-red-900/50 rounded-xl flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="e.g. dragon_rider"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-xs focus:border-flame-500 outline-none backdrop-blur-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">
              Password / Passphrase
            </label>
            <input
              type="password"
              required
              placeholder="Your secret passphrase"
              value={passphrase}
              onChange={e => setPassphrase(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-white text-xs focus:border-flame-500 outline-none backdrop-blur-sm"
            />
          </div>

          <button
            type="submit"
            disabled={syncStatus === 'syncing'}
            className="w-full py-2.5 bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-flame-600/30 border border-flame-400/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {syncStatus === 'syncing' ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Connecting to Cloudflare R2...</span>
              </>
            ) : mode === 'signup' ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Create Account (Start Lv. 1)</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In & Restore</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Continue as Guest (Local Demo Only)
          </button>
        </div>
      </div>
    </div>
  );
};
