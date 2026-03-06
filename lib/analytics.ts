/**
 * Infuzz Analytics Engine
 * Calculates engagement rates, creator scores, and badge assignments
 */

export function calculateEngagementRate(
  avgLikes: number,
  avgComments: number,
  followers: number
): number {
  if (!followers || followers === 0) return 0;
  const rate = ((avgLikes + avgComments) / followers) * 100;
  return parseFloat(rate.toFixed(2));
}

/**
 * Creator Score (0–100)
 * 40% Engagement Rate
 * 20% Audience Quality
 * 20% Content Consistency
 * 20% Profile Completeness
 */
export function calculateCreatorScore(params: {
  engagementRate: number;
  audienceCountry?: string;
  audienceAge?: string;
  audienceGender?: string;
  postsPerMonth: number;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  pricePost?: number;
  priceStory?: number;
  followers?: number;
}): number {
  const {
    engagementRate,
    audienceCountry,
    audienceAge,
    audienceGender,
    postsPerMonth,
    instagram,
    youtube,
    tiktok,
    pricePost,
    priceStory,
  } = params;

  // 40% — Engagement Rate (benchmark: 3% avg, 8%+ is excellent, 15%+ is elite)
  let engagementScore = 0;
  if (engagementRate >= 15) engagementScore = 40;
  else if (engagementRate >= 10) engagementScore = 35;
  else if (engagementRate >= 8) engagementScore = 30;
  else if (engagementRate >= 5) engagementScore = 22;
  else if (engagementRate >= 3) engagementScore = 15;
  else if (engagementRate >= 1) engagementScore = 8;
  else engagementScore = 0;

  // 20% — Audience Quality (having detailed audience data signals real analytics access)
  let audienceScore = 0;
  if (audienceCountry) audienceScore += 7;
  if (audienceAge) audienceScore += 7;
  if (audienceGender) audienceScore += 6;

  // 20% — Content Consistency (posts per month)
  let consistencyScore = 0;
  if (postsPerMonth >= 20) consistencyScore = 20;
  else if (postsPerMonth >= 15) consistencyScore = 17;
  else if (postsPerMonth >= 10) consistencyScore = 14;
  else if (postsPerMonth >= 6) consistencyScore = 10;
  else if (postsPerMonth >= 3) consistencyScore = 7;
  else if (postsPerMonth >= 1) consistencyScore = 4;

  // 20% — Profile Completeness
  let completenessScore = 0;
  if (instagram) completenessScore += 5;
  if (youtube) completenessScore += 5;
  if (tiktok) completenessScore += 4;
  if (pricePost && pricePost > 0) completenessScore += 3;
  if (priceStory && priceStory > 0) completenessScore += 3;

  const total = engagementScore + audienceScore + consistencyScore + completenessScore;
  return Math.min(Math.round(total), 100);
}

export function assignBadge(score: number): string {
  if (score >= 90) return 'Elite Creator';
  if (score >= 75) return 'Pro Creator';
  if (score >= 60) return 'Rising Creator';
  return 'Needs Improvement';
}

export interface BadgeStyle {
  label: string;
  color: string;
  bg: string;
  border: string;
  emoji: string;
}

export function getBadgeStyle(badge: string): BadgeStyle {
  switch (badge) {
    case 'Elite Creator':
      return {
        label: 'Elite Creator',
        color: 'text-yellow-300',
        bg: 'bg-yellow-400/10',
        border: 'border-yellow-400/30',
        emoji: '👑',
      };
    case 'Pro Creator':
      return {
        label: 'Pro Creator',
        color: 'text-violet-300',
        bg: 'bg-violet-400/10',
        border: 'border-violet-400/30',
        emoji: '⚡',
      };
    case 'Rising Creator':
      return {
        label: 'Rising Creator',
        color: 'text-blue-300',
        bg: 'bg-blue-400/10',
        border: 'border-blue-400/30',
        emoji: '🚀',
      };
    default:
      return {
        label: 'Needs Improvement',
        color: 'text-gray-400',
        bg: 'bg-gray-400/10',
        border: 'border-gray-400/30',
        emoji: '📈',
      };
  }
}

export function formatFollowers(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export function getScoreColor(score: number): string {
  if (score >= 90) return '#EAB308'; // yellow
  if (score >= 75) return '#7C3AED'; // violet
  if (score >= 60) return '#3B82F6'; // blue
  return '#6B7280'; // gray
}
