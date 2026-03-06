'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Login failed');

      // Store token in localStorage for client-side API calls
      localStorage.setItem('admin_token', data.token);
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A12] flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#7C3AED]/10 blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center">
              <Zap size={20} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-2xl text-white">
              In<span className="text-[#7C3AED]">fuzz</span>
            </span>
          </div>
          <h1 className="font-display font-bold text-xl text-white">Admin Portal</h1>
          <p className="text-gray-600 text-sm mt-1">Authorized access only</p>
        </div>

        <div className="glass-card p-6 violet-glow">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-5 text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Admin Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="admin@infuzz.com"
                className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7C3AED] transition-colors placeholder:text-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="••••••••"
                  className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-lg px-4 py-2.5 pr-10 text-white text-sm focus:outline-none focus:border-[#7C3AED] transition-colors placeholder:text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          Default: admin@infuzz.com / admin123
        </p>
      </div>
    </main>
  );
}
