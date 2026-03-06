'use client';
import { useState } from 'react';
import { getBadgeStyle, formatFollowers } from '@/lib/analytics';
import { Trash2, CheckCircle, XCircle, Eye, X, Instagram, Youtube, MessageCircle, Globe, TrendingUp, DollarSign, Users, Calendar, Gem } from 'lucide-react';

interface Creator {
  _id: string;
  name: string;
  email: string;
  niche: string;
  country: string;
  followers: number;
  avgLikes: number;
  avgComments: number;
  postsPerMonth: number;
  engagementRate: number;
  creatorScore: number;
  badge: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  whatsapp?: string;
  pricePost?: number;
  priceStory?: number;
  priceYoutube?: number;
  contentType?: string[];
  audienceCountry?: string;
  audienceAge?: string;
  audienceGender?: string;
  status: string;
  createdAt: string;
}

interface CreatorTableProps {
  creators: Creator[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

function CreatorDetailModal({
  creator,
  onClose,
  onApprove,
  onReject,
  onDelete,
}: {
  creator: Creator;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const badge = getBadgeStyle(creator.badge);
  const initials = creator.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const isHiddenGem = creator.followers < 50000 && creator.engagementRate > 8;
  const scoreCircumference = 2 * Math.PI * 40;
  const scoreDash = (creator.creatorScore / 100) * scoreCircumference;

  const statusStyles: Record<string, string> = {
    approved: 'bg-green-400/10 text-green-400 border-green-400/30',
    pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
    rejected: 'bg-red-400/10 text-red-400 border-red-400/30',
  };

  const Row = ({ label, value, highlight }: { label: string; value: string | number; highlight?: boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-[#1E1E2E] last:border-0">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`text-sm font-medium ${highlight ? 'text-[#84CC16]' : 'text-white'}`}>{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1E1E2E] bg-[#0F0F1A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0F0F1A]/95 backdrop-blur-xl border-b border-[#1E1E2E] px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="font-display font-bold text-lg text-white">Creator Profile</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-[#1E1E2E] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Profile header row */}
          <div className="flex items-start gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
            >
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-display font-bold text-xl text-white">{creator.name}</h3>
                {isHiddenGem && (
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#84CC16]/10 text-[#84CC16] border border-[#84CC16]/30">
                    <Gem size={10} /> Hidden Gem
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm">{creator.email}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/20 font-medium">{creator.niche}</span>
                <span className="text-gray-600 text-xs flex items-center gap-1"><Globe size={11} /> {creator.country}</span>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusStyles[creator.status]}`}>
                  {creator.status.charAt(0).toUpperCase() + creator.status.slice(1)}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${badge.bg} ${badge.color} ${badge.border}`}>
                  {badge.emoji} {badge.label}
                </span>
              </div>
            </div>

            {/* Score ring */}
            <div className="flex-shrink-0 text-center">
              <div className="relative w-20 h-20">
                <svg width="80" height="80" className="-rotate-90">
                  <circle cx="40" cy="40" r="40" fill="none" stroke="#1E1E2E" strokeWidth="7" />
                  <circle cx="40" cy="40" r="40" fill="none"
                    stroke={creator.creatorScore >= 90 ? '#EAB308' : creator.creatorScore >= 75 ? '#7C3AED' : creator.creatorScore >= 60 ? '#3B82F6' : '#6B7280'}
                    strokeWidth="7"
                    strokeDasharray={`${scoreDash} ${scoreCircumference}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display font-bold text-xl text-white">{creator.creatorScore}</span>
                  <span className="text-[9px] text-gray-600">Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Performance */}
            <div className="bg-[#0A0A12] rounded-xl border border-[#1E1E2E] p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-[#7C3AED]" />
                <h4 className="text-white text-sm font-semibold">Performance Metrics</h4>
              </div>
              <Row label="Followers" value={formatFollowers(creator.followers)} />
              <Row label="Avg Likes / Post" value={formatFollowers(creator.avgLikes)} />
              <Row label="Avg Comments / Post" value={formatFollowers(creator.avgComments)} />
              <Row label="Posts per Month" value={creator.postsPerMonth} />
              <Row label="Engagement Rate" value={`${creator.engagementRate}%`} highlight={creator.engagementRate > 8} />
            </div>

            {/* Audience */}
            <div className="bg-[#0A0A12] rounded-xl border border-[#1E1E2E] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users size={14} className="text-[#EC4899]" />
                <h4 className="text-white text-sm font-semibold">Audience Info</h4>
              </div>
              <Row label="Audience Country" value={creator.audienceCountry || '—'} />
              <Row label="Age Range" value={creator.audienceAge || '—'} />
              <Row label="Gender Split" value={creator.audienceGender || '—'} />
            </div>

            {/* Pricing */}
            <div className="bg-[#0A0A12] rounded-xl border border-[#1E1E2E] p-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign size={14} className="text-[#84CC16]" />
                <h4 className="text-white text-sm font-semibold">Pricing (₹)</h4>
              </div>
              <Row label="Per Instagram Post" value={creator.pricePost ? `₹${creator.pricePost.toLocaleString()}` : '—'} />
              <Row label="Per Instagram Story" value={creator.priceStory ? `₹${creator.priceStory.toLocaleString()}` : '—'} />
              <Row label="YouTube Integration" value={creator.priceYoutube ? `₹${creator.priceYoutube.toLocaleString()}` : '—'} />
            </div>

            {/* Social + Contact */}
            <div className="bg-[#0A0A12] rounded-xl border border-[#1E1E2E] p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={14} className="text-blue-400" />
                <h4 className="text-white text-sm font-semibold">Profiles & Contact</h4>
              </div>
              <div className="space-y-2">
                {creator.instagram && (
                  <a href={`https://instagram.com/${creator.instagram}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#E1306C]/10 border border-[#E1306C]/20 text-[#E1306C] text-xs hover:bg-[#E1306C]/20 transition-colors">
                    <Instagram size={12} /> @{creator.instagram}
                  </a>
                )}
                {creator.youtube && (
                  <a href={creator.youtube} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs hover:bg-red-500/20 transition-colors">
                    <Youtube size={12} /> YouTube Channel
                  </a>
                )}
                {creator.tiktok && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1E1E2E] border border-[#2A2A3E] text-gray-400 text-xs">
                    📱 @{creator.tiktok}
                  </div>
                )}
                {creator.whatsapp ? (
                  <a
                    href={`https://wa.me/${creator.whatsapp.replace(/\D/g, '')}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs hover:bg-green-500/20 transition-colors"
                  >
                    <MessageCircle size={12} />
                    <span>+{creator.whatsapp}</span>
                    <span className="ml-auto text-green-600 text-[10px] font-medium">Chat on WhatsApp →</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1E1E2E] border border-[#2A2A3E] text-gray-600 text-xs">
                    <MessageCircle size={12} /> No WhatsApp added
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Types */}
          {creator.contentType && creator.contentType.length > 0 && (
            <div className="bg-[#0A0A12] rounded-xl border border-[#1E1E2E] p-4">
              <h4 className="text-white text-sm font-semibold mb-3">Content Types</h4>
              <div className="flex flex-wrap gap-2">
                {creator.contentType.map((ct) => (
                  <span key={ct} className="px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/20 text-xs font-medium">
                    {ct === 'UGC' ? '🎬' : ct === 'Product Review' ? '⭐' : ct === 'Tutorial' ? '📚' : '✨'} {ct}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer meta */}
          <div className="flex items-center gap-2 text-gray-600 text-xs">
            <Calendar size={12} />
            Joined {new Date(creator.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>

          {/* Modal Action buttons */}
          <div className="flex gap-3 pt-2 border-t border-[#1E1E2E]">
            {creator.status !== 'approved' && (
              <button
                onClick={() => { onApprove(creator._id); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-400/10 border border-green-400/30 text-green-400 text-sm font-medium hover:bg-green-400/20 transition-colors"
              >
                <CheckCircle size={15} /> Approve
              </button>
            )}
            {creator.status !== 'rejected' && (
              <button
                onClick={() => { onReject(creator._id); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-400/10 border border-red-400/30 text-red-400 text-sm font-medium hover:bg-red-400/20 transition-colors"
              >
                <XCircle size={15} /> Reject
              </button>
            )}
            <button
              onClick={() => { if (confirm('Delete this creator permanently?')) { onDelete(creator._id); onClose(); } }}
              className="px-4 py-2.5 rounded-xl bg-gray-400/10 border border-gray-400/20 text-gray-500 text-sm font-medium hover:bg-red-400/10 hover:text-red-400 hover:border-red-400/30 transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreatorTable({ creators, onApprove, onReject, onDelete }: CreatorTableProps) {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);

  const statusStyles: Record<string, string> = {
    approved: 'bg-green-400/10 text-green-400 border-green-400/30',
    pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30',
    rejected: 'bg-red-400/10 text-red-400 border-red-400/30',
  };

  const platforms = (c: Creator) => {
    const p = [];
    if (c.instagram) p.push('IG');
    if (c.youtube) p.push('YT');
    if (c.tiktok) p.push('TT');
    return p.join(', ') || '—';
  };

  return (
    <>
      {selectedCreator && (
        <CreatorDetailModal
          creator={selectedCreator}
          onClose={() => setSelectedCreator(null)}
          onApprove={onApprove}
          onReject={onReject}
          onDelete={onDelete}
        />
      )}

      <div className="rounded-xl border border-[#1E1E2E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0F0F1A] border-b border-[#1E1E2E]">
                {['Creator', 'Niche', 'Platforms', 'Followers', 'Engagement', 'Score', 'Post Rate', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {creators.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-gray-600">No creators found</td>
                </tr>
              ) : (
                creators.map((creator, i) => {
                  const badge = getBadgeStyle(creator.badge);
                  const initials = creator.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
                  return (
                    <tr
                      key={creator._id}
                      className={`border-b border-[#1E1E2E] hover:bg-[#7C3AED]/5 transition-colors ${i % 2 === 0 ? 'bg-[#0A0A12]' : 'bg-[#0D0D18]'}`}
                    >
                      {/* Creator */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}>
                            {initials}
                          </div>
                          <div>
                            <p className="text-white font-medium">{creator.name}</p>
                            <p className="text-gray-600 text-xs">{creator.email}</p>
                            {creator.whatsapp && (
                              <p className="text-green-500 text-[10px] flex items-center gap-1 mt-0.5">
                                <MessageCircle size={9} /> {creator.whatsapp}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      {/* Niche */}
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/20">
                          {creator.niche}
                        </span>
                      </td>
                      {/* Platform */}
                      <td className="px-4 py-3 text-gray-400 text-xs">{platforms(creator)}</td>
                      {/* Followers */}
                      <td className="px-4 py-3 text-white font-medium">{formatFollowers(creator.followers)}</td>
                      {/* Engagement */}
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${creator.engagementRate > 8 ? 'text-[#84CC16]' : creator.engagementRate > 4 ? 'text-blue-400' : 'text-gray-400'}`}>
                          {creator.engagementRate}%
                        </span>
                      </td>
                      {/* Score */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-[#1E1E2E] rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-[#7C3AED]" style={{ width: `${creator.creatorScore}%` }} />
                          </div>
                          <span className="text-white font-semibold text-xs">{creator.creatorScore}</span>
                        </div>
                      </td>
                      {/* Pricing */}
                      <td className="px-4 py-3 text-gray-400 text-xs">
                        {creator.pricePost ? `₹${creator.pricePost.toLocaleString()}` : '—'}
                      </td>
                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full border font-medium ${statusStyles[creator.status] || statusStyles.pending}`}>
                          {creator.status}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedCreator(creator)}
                            title="View Full Profile"
                            className="p-1.5 rounded-lg text-[#7C3AED] hover:bg-[#7C3AED]/10 transition-colors"
                          >
                            <Eye size={14} />
                          </button>
                          {creator.status !== 'approved' && (
                            <button onClick={() => onApprove(creator._id)} title="Approve"
                              className="p-1.5 rounded-lg text-green-400 hover:bg-green-400/10 transition-colors">
                              <CheckCircle size={14} />
                            </button>
                          )}
                          {creator.status !== 'rejected' && (
                            <button onClick={() => onReject(creator._id)} title="Reject"
                              className="p-1.5 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
                              <XCircle size={14} />
                            </button>
                          )}
                          <button onClick={() => onDelete(creator._id)} title="Delete"
                            className="p-1.5 rounded-lg text-gray-600 hover:bg-red-400/10 hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {creators.length > 0 && (
          <div className="px-4 py-2 border-t border-[#1E1E2E] bg-[#0F0F1A]">
            <p className="text-gray-700 text-xs">💡 Click the <Eye size={10} className="inline" /> icon to view full creator profile</p>
          </div>
        )}
      </div>
    </>
  );
}
