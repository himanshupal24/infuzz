'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getBadgeStyle, formatFollowers, getScoreColor } from '@/lib/analytics';
import { Instagram, Youtube, Search, Loader2, AlertCircle, TrendingUp, Gem, ExternalLink, Zap } from 'lucide-react';
import { Creator } from '@/lib/types';


function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;
  const color = getScoreColor(score);

  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg width="128" height="128" className="-rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#1E1E2E" strokeWidth="8" />
        <circle
          cx="64" cy="64" r={radius} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold text-3xl text-white">{score}</span>
        <span className="text-xs text-gray-600">/ 100</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
    approved: 'bg-green-400/10 text-green-400 border-green-400/30',
    rejected: 'bg-red-400/10 text-red-400 border-red-400/30',
  } as Record<string, string>;

  const labels = {
    pending: '⏳ Pending Review',
    approved: '✅ Approved',
    rejected: '❌ Rejected',
  } as Record<string, string>;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium ${styles[status] || styles.pending}`}>
      {labels[status] || 'Unknown'}
    </span>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [inputEmail, setInputEmail] = useState(searchParams.get('email') || '');
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (email) lookupCreator(email);
  }, []);

  const lookupCreator = async (lookupEmail: string) => {
    setLoading(true);
    setError('');
    setCreator(null);
    try {
      const res = await fetch(`/api/creators?email=${encodeURIComponent(lookupEmail)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      if (!data.creators || data.creators.length === 0) throw new Error('No creator found with this email');
      setCreator(data.creators[0]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setEmail(inputEmail);
    lookupCreator(inputEmail);
  };

  const badge = creator ? getBadgeStyle(creator.badge) : null;
  const isHiddenGem = creator && creator.followers < 50000 && creator.engagementRate > 8;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-white mb-2">Creator Dashboard</h1>
        <p className="text-gray-500">Track your Creator Score, status, and performance</p>
      </div>

      {/* Email lookup */}
      <div className="glass-card p-4 mb-6">
        <div className="flex gap-3">
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter your email to view your profile..."
            className="flex-1 bg-[#0A0A12] border border-[#1E1E2E] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-[#7C3AED] transition-colors"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !inputEmail}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Look Up
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {creator && badge && (
        <div className="space-y-4">
          {/* Status banner */}
          {creator.status === 'pending' && (
            <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl px-5 py-4 flex items-center gap-3">
              <span className="text-xl">⏳</span>
              <div>
                <p className="text-yellow-300 font-medium text-sm">Profile Under Review</p>
                <p className="text-gray-600 text-xs mt-0.5">Our team is reviewing your profile. You'll be notified once approved.</p>
              </div>
            </div>
          )}
          {creator.status === 'approved' && (
            <div className="bg-green-400/5 border border-green-400/20 rounded-xl px-5 py-4 flex items-center gap-3">
              <span className="text-xl">✅</span>
              <div>
                <p className="text-green-300 font-medium text-sm">Profile Approved — You're Live!</p>
                <p className="text-gray-600 text-xs mt-0.5">Your profile is visible to brands. Get ready for deal opportunities.</p>
              </div>
            </div>
          )}
          {creator.status === 'rejected' && (
            <div className="bg-red-400/5 border border-red-400/20 rounded-xl px-5 py-4 flex items-center gap-3">
              <span className="text-xl">❌</span>
              <div>
                <p className="text-red-300 font-medium text-sm">Profile Rejected</p>
                <p className="text-gray-600 text-xs mt-0.5">Unfortunately your profile was not approved. Contact us for details.</p>
              </div>
            </div>
          )}

          {/* Main profile card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Profile summary */}
            <div className="glass-card p-6 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
              >
                {creator.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <h2 className="font-display font-bold text-lg text-white mb-1">{creator.name}</h2>
              <p className="text-[#7C3AED] text-sm mb-3">{creator.niche} · {creator.country}</p>
              <StatusBadge status={creator.status} />
              <div className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${badge.bg} ${badge.color} ${badge.border}`}>
                {badge.emoji} {badge.label}
              </div>
              {isHiddenGem && (
                <div className="mt-3 flex items-center gap-1.5 bg-[#84CC16]/10 border border-[#84CC16]/30 rounded-lg px-3 py-2">
                  <Gem size={12} className="text-[#84CC16]" />
                  <span className="text-xs text-[#84CC16] font-medium">Hidden Gem</span>
                </div>
              )}
            </div>

            {/* Creator Score */}
            <div className="glass-card p-6">
              <h3 className="text-gray-400 text-sm mb-4">Creator Score</h3>
              <ScoreRing score={creator.creatorScore} />
              <div className="mt-4 space-y-2">
                {[
                  { label: 'Engagement (40%)', pct: Math.min((creator.engagementRate / 15) * 40, 40), color: '#7C3AED' },
                  { label: 'Audience (20%)', pct: creator.audienceCountry ? 15 : 8, color: '#EC4899' },
                  { label: 'Consistency (20%)', pct: Math.min(creator.postsPerMonth, 20), color: '#84CC16' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </div>
                    <div className="h-1 bg-[#1E1E2E] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${Math.min(item.pct * 2.5, 100)}%`, background: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Stats */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-gray-400 text-sm">Performance Stats</h3>
              {[
                { label: 'Followers', value: formatFollowers(creator.followers) },
                {
                  label: 'Engagement Rate',
                  value: `${creator.engagementRate}%`,
                  highlight: creator.engagementRate > 8,
                },
                { label: 'Avg Likes', value: formatFollowers(creator.avgLikes) },
                { label: 'Avg Comments', value: formatFollowers(creator.avgComments) },
                { label: 'Posts/Month', value: creator.postsPerMonth },
              ].map((stat) => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">{stat.label}</span>
                  <span className={`font-semibold text-sm ${stat.highlight ? 'text-[#84CC16]' : 'text-white'}`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social profiles */}
          {(creator.instagram || creator.youtube || creator.tiktok) && (
            <div className="glass-card p-6">
              <h3 className="text-gray-400 text-sm mb-4">Social Profiles</h3>
              <div className="flex flex-wrap gap-3">
                {creator.instagram && (
                  <a
                    href={`https://instagram.com/${creator.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E1306C]/10 border border-[#E1306C]/20 text-[#E1306C] text-sm hover:bg-[#E1306C]/20 transition-colors"
                  >
                    <Instagram size={14} />
                    @{creator.instagram}
                    <ExternalLink size={12} />
                  </a>
                )}
                {creator.youtube && (
                  <a
                    href={creator.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                  >
                    <Youtube size={14} />
                    YouTube Channel
                    <ExternalLink size={12} />
                  </a>
                )}
                {creator.tiktok && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E1E2E] border border-[#2A2A3E] text-gray-400 text-sm">
                    📱 @{creator.tiktok}
                  </div>
                )}
                {creator.whatsapp && (
                  <a
                    href={`https://wa.me/${creator.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm hover:bg-green-500/20 transition-colors"
                  >
                    💬 +{creator.whatsapp}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Pricing */}
          {(creator.pricePost || creator.priceStory || creator.priceYoutube) && (
            <div className="glass-card p-6">
              <h3 className="text-gray-400 text-sm mb-4">Your Rates</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Post', value: creator.pricePost },
                  { label: 'Story', value: creator.priceStory },
                  { label: 'YouTube', value: creator.priceYoutube },
                ].map((rate) => rate.value ? (
                  <div key={rate.label} className="bg-[#1E1E2E] rounded-lg p-4 text-center">
                    <p className="text-gray-600 text-xs mb-1">{rate.label}</p>
                    <p className="font-display font-bold text-lg text-white">₹{rate.value.toLocaleString()}</p>
                  </div>
                ) : null)}
              </div>
            </div>
          )}
        </div>
      )}

      {!creator && !loading && !error && (
        <div className="glass-card p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-500 mb-4">Enter your email address to view your creator profile</p>
          <Link
            href="/creator/signup"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-medium hover:bg-[#6D28D9] transition-colors"
          >
            <Zap size={16} />
            Not signed up? Join now
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CreatorDashboard() {
  return (
    <main className="min-h-screen bg-[#0A0A12]">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="text-[#7C3AED] animate-spin" size={32} />
        </div>
      }>
        <DashboardContent />
      </Suspense>
      <Footer />
    </main>
  );
}
