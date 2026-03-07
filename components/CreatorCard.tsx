import { formatFollowers, getBadgeStyle } from '@/lib/analytics';
import { Instagram, Youtube, TrendingUp } from 'lucide-react';
import { Creator } from '@/lib/types';


interface CreatorCardProps {
  creator: Creator;
  rank?: number;
  showActions?: boolean;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function CreatorCard({
  creator,
  rank,
  showActions = false,
  onApprove,
  onReject,
  onDelete,
}: CreatorCardProps) {
  const badge = getBadgeStyle(creator.badge);
  const initials = creator.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const scoreAngle = (creator.creatorScore / 100) * 360;

  return (
    <div className="glass-card p-5 neon-hover group">
      <div className="flex items-start gap-4">
        {/* Rank */}
        {rank !== undefined && (
          <div className="flex-shrink-0 w-6 text-center">
            <span className={`text-sm font-bold font-display ${rank <= 3 ? 'text-[#7C3AED]' : 'text-gray-600'}`}>
              #{rank}
            </span>
          </div>
        )}

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold text-sm"
            style={{
              background: `linear-gradient(135deg, #7C3AED, #EC4899)`,
            }}
          >
            {initials}
          </div>
          {/* Score ring */}
          <div
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-[#0F0F1A] flex items-center justify-center"
            style={{ background: creator.creatorScore >= 75 ? '#7C3AED' : '#374151' }}
          >
            <span className="text-white text-[8px] font-bold">{creator.creatorScore}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-semibold text-sm truncate">{creator.name}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${badge.bg} ${badge.color} ${badge.border}`}>
              {badge.emoji} {badge.label}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-[#7C3AED] font-medium">{creator.niche}</span>
            {creator.country && (
              <span className="text-xs text-gray-600">{creator.country}</span>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mt-2">
            <div>
              <p className="text-xs text-gray-600">Followers</p>
              <p className="text-sm font-semibold text-white">{formatFollowers(creator.followers)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Engagement</p>
              <p className={`text-sm font-semibold ${creator.engagementRate > 8 ? 'text-[#84CC16]' : 'text-white'}`}>
                {creator.engagementRate}%
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Score</p>
              <p className="text-sm font-semibold text-[#A78BFA]">{creator.creatorScore}</p>
            </div>
          </div>

          {/* Platforms */}
          <div className="flex gap-2 mt-2">
            {creator.instagram && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Instagram size={10} /> @{creator.instagram}
              </span>
            )}
            {creator.youtube && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Youtube size={10} /> YouTube
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hidden gem tag */}
      {creator.followers < 50000 && creator.engagementRate > 8 && (
        <div className="mt-3 flex items-center gap-1.5 bg-[#84CC16]/10 border border-[#84CC16]/30 rounded-lg px-3 py-1.5">
          <TrendingUp size={12} className="text-[#84CC16]" />
          <span className="text-xs font-medium text-[#84CC16]">Hidden Gem — High ROI</span>
        </div>
      )}

      {/* Admin Actions */}
      {showActions && creator._id && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-[#1E1E2E]">
          {creator.status !== 'approved' && (
            <button
              onClick={() => onApprove?.(creator._id!)}
              className="flex-1 py-1.5 rounded-lg bg-[#84CC16]/10 border border-[#84CC16]/30 text-[#84CC16] text-xs font-medium hover:bg-[#84CC16]/20 transition-colors"
            >
              Approve
            </button>
          )}
          {creator.status !== 'rejected' && (
            <button
              onClick={() => onReject?.(creator._id!)}
              className="flex-1 py-1.5 rounded-lg bg-red-400/10 border border-red-400/30 text-red-400 text-xs font-medium hover:bg-red-400/20 transition-colors"
            >
              Reject
            </button>
          )}
          <button
            onClick={() => onDelete?.(creator._id!)}
            className="py-1.5 px-3 rounded-lg bg-gray-400/10 border border-gray-400/20 text-gray-500 text-xs font-medium hover:bg-red-400/10 hover:text-red-400 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
