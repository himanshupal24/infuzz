'use client';

interface Stat {
  label: string;
  value: number | string;
  icon: string;
  color: string;
  description?: string;
}

interface DashboardStatsProps {
  stats: {
    total: number;
    approved: number;
    pending: number;
    rejected?: number;
    hiddenGems: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems: Stat[] = [
    {
      label: 'Total Creators',
      value: stats.total,
      icon: '👥',
      color: 'from-violet-500/20 to-violet-600/5 border-violet-500/20',
      description: 'All registered creators',
    },
    {
      label: 'Approved',
      value: stats.approved,
      icon: '✅',
      color: 'from-green-500/20 to-green-600/5 border-green-500/20',
      description: 'Active on platform',
    },
    {
      label: 'Pending Review',
      value: stats.pending,
      icon: '⏳',
      color: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/20',
      description: 'Awaiting approval',
    },
    {
      label: 'Hidden Gems',
      value: stats.hiddenGems,
      icon: '💎',
      color: 'from-lime-500/20 to-lime-600/5 border-lime-500/20',
      description: '<50K followers, >8% engagement',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat, i) => (
        <div
          key={i}
          className={`rounded-xl border bg-gradient-to-br p-5 ${stat.color}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{stat.icon}</span>
          </div>
          <p className="text-3xl font-display font-bold text-white mb-1">
            {stat.value.toLocaleString()}
          </p>
          <p className="text-sm font-medium text-white/80">{stat.label}</p>
          {stat.description && (
            <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
