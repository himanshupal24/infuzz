'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DashboardStats from '@/components/DashboardStats';
import CreatorTable from '@/components/CreatorTable';
import { Zap, LogOut, Search, Filter, Loader2, Gem, Target, RefreshCw, ChevronDown, X } from 'lucide-react';
import { formatFollowers, getBadgeStyle } from '@/lib/analytics';

import { Creator } from '@/lib/types';

interface Stats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  hiddenGems: number;
}

type TabType = 'all' | 'pending' | 'approved' | 'rejected' | 'hiddenGems' | 'matcher';

const NICHES = ['', 'Fitness', 'Tech', 'Fashion', 'Lifestyle', 'Food', 'Travel', 'Beauty', 'Gaming'];

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [creators, setCreators] = useState<Creator[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, approved: 0, pending: 0, rejected: 0, hiddenGems: 0 });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<TabType>('all');
  const [search, setSearch] = useState('');

  // Smart Matcher state
  const [matcherParams, setMatcherParams] = useState({
    niche: '',
    country: '',
    minFollowers: '',
    maxFollowers: '',
    minEngagement: '',
  });
  const [matchResults, setMatchResults] = useState<Creator[]>([]);
  const [matchLoading, setMatchLoading] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) {
      router.push('/admin/login');
      return;
    }
    setToken(t);
    fetchStats(t);
    fetchCreators(t, 'all');
  }, []);

  const authHeaders = (t: string) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${t}`,
  });

  const fetchStats = async (t: string) => {
    try {
      const res = await fetch('/api/admin/stats', { headers: authHeaders(t) });
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      if (data.success) setStats(data.stats);
    } catch { }
  };

  const fetchCreators = useCallback(async (t: string, activeTab: TabType) => {
    setLoading(true);
    try {
      let url = '/api/creators?limit=100';
      if (activeTab === 'pending') url += '&status=pending';
      else if (activeTab === 'approved') url += '&status=approved';
      else if (activeTab === 'rejected') url += '&status=rejected';
      else if (activeTab === 'hiddenGems') url += '&hiddenGems=true';

      const res = await fetch(url, { headers: authHeaders(t) });
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      setCreators(data.creators || []);
    } catch { } finally {
      setLoading(false);
    }
  }, [router]);

  const handleTabChange = (newTab: TabType) => {
    setTab(newTab);
    if (newTab !== 'matcher') fetchCreators(token, newTab);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/creators/status', {
        method: 'PATCH',
        headers: authHeaders(token),
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setCreators((prev) => prev.map((c) => c._id === id ? { ...c, status } : c));
        fetchStats(token);
      }
    } catch { }
  };

  const deleteCreator = async (id: string) => {
    if (!confirm('Delete this creator? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/creators/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
      });
      if (res.ok) {
        setCreators((prev) => prev.filter((c) => c._id !== id));
        fetchStats(token);
      }
    } catch { }
  };

  const runMatcher = async () => {
    setMatchLoading(true);
    setMatchResults([]);
    try {
      const params = new URLSearchParams({ status: 'approved' });
      if (matcherParams.niche) params.append('niche', matcherParams.niche);
      if (matcherParams.country) params.append('country', matcherParams.country);
      if (matcherParams.minFollowers) params.append('minFollowers', matcherParams.minFollowers);
      if (matcherParams.maxFollowers) params.append('maxFollowers', matcherParams.maxFollowers);
      if (matcherParams.minEngagement) params.append('minEngagement', matcherParams.minEngagement);

      const res = await fetch(`/api/creators?${params}`, { headers: authHeaders(token) });
      const data = await res.json();
      setMatchResults(data.creators || []);
    } catch { } finally {
      setMatchLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const filtered = creators.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.niche.toLowerCase().includes(search.toLowerCase())
  );

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'all', label: 'All Creators', count: stats.total },
    { id: 'pending', label: 'Pending', count: stats.pending },
    { id: 'approved', label: 'Approved', count: stats.approved },
    { id: 'rejected', label: 'Rejected', count: stats.rejected },
    { id: 'hiddenGems', label: '💎 Hidden Gems', count: stats.hiddenGems },
    { id: 'matcher', label: '🎯 Smart Matcher' },
  ];

  return (
    <main className="min-h-screen bg-[#0A0A12]">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A12]/90 backdrop-blur-xl border-b border-[#1E1E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              In<span className="text-[#7C3AED]">fuzz</span>
            </span>
            <span className="text-xs text-gray-600 ml-1">Admin</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { fetchStats(token); fetchCreators(token, tab); }}
              className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-[#1E1E2E] transition-colors"
            >
              <RefreshCw size={15} />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#1E1E2E] text-gray-500 hover:text-red-400 hover:border-red-400/30 text-xs transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <DashboardStats stats={stats} />

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTabChange(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id
                  ? 'bg-[#7C3AED] text-white'
                  : 'bg-[#0F0F1A] border border-[#1E1E2E] text-gray-500 hover:text-white hover:border-[#7C3AED]/50'
                }`}
            >
              {t.label}
              {t.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.id ? 'bg-white/20' : 'bg-[#1E1E2E]'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Smart Matcher Tab */}
        {tab === 'matcher' && (
          <div className="space-y-4">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Target size={18} className="text-[#7C3AED]" />
                <h2 className="font-display font-bold text-lg text-white">Smart Creator Matcher</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Niche</label>
                  <select
                    value={matcherParams.niche}
                    onChange={(e) => setMatcherParams({ ...matcherParams, niche: e.target.value })}
                    className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7C3AED]"
                  >
                    {NICHES.map((n) => <option key={n} value={n}>{n || 'Any Niche'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Country</label>
                  <input
                    type="text"
                    value={matcherParams.country}
                    onChange={(e) => setMatcherParams({ ...matcherParams, country: e.target.value })}
                    placeholder="India"
                    className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7C3AED] placeholder:text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Min Followers</label>
                  <input
                    type="number"
                    value={matcherParams.minFollowers}
                    onChange={(e) => setMatcherParams({ ...matcherParams, minFollowers: e.target.value })}
                    placeholder="5000"
                    className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7C3AED] placeholder:text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Max Followers</label>
                  <input
                    type="number"
                    value={matcherParams.maxFollowers}
                    onChange={(e) => setMatcherParams({ ...matcherParams, maxFollowers: e.target.value })}
                    placeholder="100000"
                    className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7C3AED] placeholder:text-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Min Engagement (%)</label>
                  <input
                    type="number"
                    value={matcherParams.minEngagement}
                    onChange={(e) => setMatcherParams({ ...matcherParams, minEngagement: e.target.value })}
                    placeholder="3"
                    className="w-full bg-[#0A0A12] border border-[#1E1E2E] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#7C3AED] placeholder:text-gray-700"
                  />
                </div>
              </div>
              <button
                onClick={runMatcher}
                disabled={matchLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                {matchLoading ? <Loader2 size={15} className="animate-spin" /> : <Target size={15} />}
                Find Matching Creators
              </button>
            </div>

            {matchResults.length > 0 && (
              <div>
                <p className="text-gray-500 text-sm mb-3">
                  Found <strong className="text-white">{matchResults.length}</strong> matching creators, sorted by Creator Score
                </p>
                <CreatorTable
                  creators={matchResults}
                  onApprove={(id) => updateStatus(id, 'approved')}
                  onReject={(id) => updateStatus(id, 'rejected')}
                  onDelete={deleteCreator}
                />
              </div>
            )}
            {!matchLoading && matchResults.length === 0 && (
              <div className="glass-card p-8 text-center text-gray-600 text-sm">
                Configure your criteria above and click "Find Matching Creators"
              </div>
            )}
          </div>
        )}

        {/* Creators Table */}
        {tab !== 'matcher' && (
          <div className="space-y-4">
            {/* Search bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or niche..."
                  className="w-full bg-[#0F0F1A] border border-[#1E1E2E] rounded-lg pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7C3AED] placeholder:text-gray-700"
                />
              </div>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="px-3 py-2.5 rounded-lg border border-[#1E1E2E] text-gray-600 hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {loading ? (
              <div className="glass-card p-12 flex items-center justify-center gap-3 text-gray-600">
                <Loader2 size={20} className="animate-spin text-[#7C3AED]" />
                Loading creators...
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-xs">
                  Showing <strong className="text-gray-400">{filtered.length}</strong> creator{filtered.length !== 1 ? 's' : ''}
                  {search && ` matching "${search}"`}
                </p>
                <CreatorTable
                  creators={filtered}
                  onApprove={(id) => updateStatus(id, 'approved')}
                  onReject={(id) => updateStatus(id, 'rejected')}
                  onDelete={deleteCreator}
                />
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
