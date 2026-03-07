'use client';
import { useEffect, useState } from 'react';
import { formatFollowers, getBadgeStyle } from '@/lib/analytics';
import { Trophy, TrendingUp } from 'lucide-react';
import { Creator } from '@/lib/types';


export default function Leaderboard() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/creators?leaderboard=true&limit=10')
      .then((r) => r.json())
      .then((data) => {
        setCreators(data.creators || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const rankStyles = [
    'text-yellow-400',
    'text-gray-300',
    'text-amber-600',
  ];

  const rankIcons = ['🥇', '🥈', '🥉'];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-[#7C3AED]" size={20} />
        <h2 className="font-display font-bold text-xl text-white">Top Creators This Week</h2>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 rounded-xl shimmer" />
          ))}
        </div>
      ) : creators.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <p className="text-gray-500">No approved creators yet. Be the first to join!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {creators.map((creator, i) => {
            const badge = getBadgeStyle(creator.badge);
            const initials = creator.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
            const isTop3 = i < 3;

            return (
              <div
                key={creator._id}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 border transition-all duration-300 hover:scale-[1.01] ${isTop3
                    ? 'bg-gradient-to-r from-[#7C3AED]/10 to-transparent border-[#7C3AED]/20'
                    : 'bg-[#0F0F1A] border-[#1E1E2E]'
                  }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Rank */}
                <div className="w-8 text-center flex-shrink-0">
                  {isTop3 ? (
                    <span className="text-lg">{rankIcons[i]}</span>
                  ) : (
                    <span className="text-gray-600 font-display font-bold text-sm">#{i + 1}</span>
                  )}
                </div>

                {/* Avatar */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
                >
                  {initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm truncate">{creator.name}</span>
                    <span className={`text-xs ${badge.color} hidden sm:inline`}>{badge.emoji}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[#7C3AED]">{creator.niche}</span>
                    <span className="text-xs text-gray-600">·</span>
                    <span className="text-xs text-gray-600">{creator.country}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Followers</p>
                    <p className="text-sm font-semibold text-white">{formatFollowers(creator.followers)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Engagement</p>
                    <p className={`text-sm font-semibold ${creator.engagementRate > 8 ? 'text-[#84CC16]' : 'text-white'}`}>
                      {creator.engagementRate}%
                    </p>
                  </div>
                </div>

                {/* Score */}
                <div className="flex-shrink-0 text-right ml-4">
                  <p className="text-xs text-gray-600">Score</p>
                  <p className={`text-base font-display font-bold ${isTop3 ? 'text-[#A78BFA]' : 'text-gray-400'}`}>
                    {creator.creatorScore}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
