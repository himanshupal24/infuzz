import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Leaderboard from '@/components/Leaderboard';
import { Zap, Target, TrendingUp, Shield, ChevronDown, Star, Users, BarChart3, Gem, ArrowRight, Play, Sparkles, Globe, Award } from 'lucide-react';

const faqs = [
  {
    q: 'Who can join Infuzz?',
    a: 'Any content creator with 5K+ followers on Instagram, YouTube, or TikTok can apply. We focus on engagement rate over follower count.',
  },
  {
    q: 'How is the Creator Score calculated?',
    a: 'Your Creator Score (0–100) is based on engagement rate (40%), audience quality (20%), content consistency (20%), and profile completeness (20%).',
  },
  {
    q: 'Is it free to join as a creator?',
    a: 'Yes! Joining Infuzz as a creator is completely free. We earn a commission only when you successfully complete a brand campaign.',
  },
  {
    q: 'How do brand deals work?',
    a: 'Our admin team manually matches approved creators with relevant brands based on niche, audience, and performance data. You\'ll be notified when there\'s a match.',
  },
  {
    q: 'What makes Infuzz different from other platforms?',
    a: 'We rank creators by real performance data — engagement rate and Creator Score — not just follower count. This means brands find high-ROI creators, and quality creators get noticed.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
        {/* Background Ambient Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#7C3AED]/20 blur-[150px] pointer-events-none animate-pulse-slow" />
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#EC4899]/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#84CC16]/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[#A78BFA] text-sm font-semibold mb-8 animate-fade-in hover:border-[#7C3AED]/30 transition-colors cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-[#7C3AED] animate-pulse" />
              Powering the next generation of creators
            </div>

            {/* Headline */}
            <h1 className="font-display font-bold text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 animate-slide-up">
              Turning <span className="gradient-text">Creator</span><br />
              Data into <span className="gradient-text-alt italic">Deals</span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-400 text-xl max-w-xl mb-12 leading-relaxed animate-slide-up delay-100">
              The world's first performance-driven influencer network. We don't care about your followers—we care about your <span className="text-white font-bold underline decoration-[#7C3AED]">impact</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-5 animate-slide-up delay-200">
              <Link
                href="/creator/signup"
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white text-black font-extrabold text-lg transition-all duration-300 hover:bg-[#7C3AED] hover:text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2"
              >
                Start Your Journey <ArrowRight size={20} />
              </Link>
              <button
                className="group w-full sm:w-auto px-10 py-5 rounded-2xl border border-white/10 hover:border-white/30 text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Play size={14} className="fill-white" />
                </div>
                Watch Intro
              </button>
            </div>

            {/* Trusted By */}
            {/* <div className="mt-16 pt-10 border-t border-white/5 animate-slide-up delay-300">
              <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-6">Trusted by High-ROI Brands</p>
              <div className="flex flex-wrap gap-10 grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <span className="font-display text-2xl font-black">NIKE</span>
                <span className="font-display text-2xl font-black">REDBULL</span>
                <span className="font-display text-2xl font-black">ADIDAS</span>
                <span className="font-display text-2xl font-black">PUMA</span>
              </div>
            </div> */}
          </div>

          {/* Hero Visual */}
          <div className="relative hidden lg:block animate-float">
            <div className="relative glass-card p-2 p-px bg-gradient-to-tr from-[#7C3AED]/50 via-white/10 to-[#EC4899]/50 overflow-hidden">
              <div className="bg-[#050508] rounded-[23px] overflow-hidden">
                <div className="p-8 pb-0">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#7C3AED] to-[#EC4899]" />
                      <div>
                        <p className="font-bold text-white">Ananya Sharma</p>
                        <p className="text-gray-500 text-sm">Lifestyle · 42K Followers</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-[#84CC16]/20 text-[#84CC16] text-xs font-bold border border-[#84CC16]/30">
                      LIVE SCORE
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 p-4 rounded-xl">
                      <p className="text-gray-500 text-xs mb-1">Engagement</p>
                      <p className="text-2xl font-bold">12.4%</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl">
                      <p className="text-gray-500 text-xs mb-1">Authenticity</p>
                      <p className="text-2xl font-bold">98%</p>
                    </div>
                  </div>

                  <div className="relative h-40 bg-gradient-to-t from-[#7C3AED]/20 to-transparent border-t border-[#7C3AED]/30 flex items-end justify-center pb-6">
                    <div className="text-center">
                      <p className="text-5xl font-display font-black text-white mb-1">92</p>
                      <p className="text-[#A78BFA] text-sm font-bold uppercase tracking-tighter">Platinum Creator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute -top-6 -right-6 glass-card px-6 py-4 violet-glow flex items-center gap-3">
              <Sparkles className="text-[#84CC16]" />
              <p className="font-bold text-sm">New Deal: ₹15,000</p>
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card px-8 py-6 flex items-center gap-4">
              <div>
                <p className="text-xs text-gray-500 font-bold mb-1">Avg Growth</p>
                <p className="text-2xl font-display font-bold text-[#84CC16] animate-pulse">+2.4%</p>
              </div>
              <TrendingUp className="text-[#84CC16]" size={30} />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: '2K+', label: 'Elite Creators' },
              { value: '1M', label: 'Combined Reach' },
              { value: '100+', label: 'Monthly Campaigns' },
              { value: '94%', label: 'Retention Rate' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-display text-4xl font-black mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-24">
            <p className="text-[#7C3AED] text-sm font-black uppercase tracking-[0.3em] mb-4">The Protocol</p>
            <h2 className="font-display font-bold text-5xl md:text-6xl text-white mb-6">How We Value You</h2>
            <p className="text-gray-400 text-xl font-medium">Simple, data-driven, and transparent. We focus on the metrics that actually build brands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: <Globe size={24} />,
                title: 'Data Integration',
                desc: 'Connect your profiles via secure API. We fetch last 30 posts, stories, and reels performance.',
                color: '#7C3AED',
              },
              {
                step: '02',
                icon: <BarChart3 size={24} />,
                title: 'Scoring Engine',
                desc: 'Our proprietary algorithm analyzes engagement consistency and audience sentiment.',
                color: '#EC4899',
              },
              {
                step: '03',
                icon: <Award size={24} />,
                title: 'Smart Matching',
                desc: 'Brands bid on categories. We match based on niche, score, and your custom pricing.',
                color: '#84CC16',
              },
            ].map((item, i) => (
              <div key={i} className="group relative glass-card p-10 hover:border-[#7C3AED]/40 transition-all duration-500 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-[#7C3AED]/20 transition-all duration-700" />

                <p className="font-display text-7xl font-black text-white/5 mb-8 group-hover:text-white/10 transition-colors uppercase decoration-white">{item.step}</p>

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white/5 group-hover:scale-110 group-hover:bg-[#7C3AED] group-hover:text-white transition-all duration-500 border border-white/10"
                >
                  {item.icon}
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-4">{item.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="benefits" className="py-32 bg-[#050508]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-display font-bold text-5xl text-white mb-6">Built for Excellence</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">No clutter. No fake metrics. Just the tools you need to grow your professional creator career.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💎', title: 'Hidden Gems', desc: 'Micro-creators with sky-high engagement get featured instantly.' },
              { icon: '🎯', title: 'Niche Specific', desc: 'Get campaigns that actually fit your content aesthetic.' },
              { icon: '⚡', title: 'Auto-Payments', desc: 'Secure, automated payments once campaign goals are hit.' },
              { icon: '🏆', title: 'Leaderboards', desc: 'Top 1% gain access to exclusive Platinum Level campaigns.' },
              { icon: '🌍', title: 'Global Brands', desc: 'Connect with brands from New York to Mumbai seamlessly.' },
              { icon: '📊', title: 'Deep Insights', desc: 'Understand why brands choose you with clear feedback loops.' },
              { icon: '🔒', title: 'Privacy First', desc: 'You control what data is shared with which brand.' },
              { icon: '🚀', title: 'Growth Tools', desc: 'AI tips to improve your engagement and creator score.' },
            ].map((benefit, i) => (
              <div key={i} className="group glass-card p-8 border border-white/5 hover:border-white/10 transition-all duration-300">
                <span className="text-3xl mb-6 block group-hover:scale-125 transition-transform origin-left grayscale hover:grayscale-0">{benefit.icon}</span>
                <h3 className="text-white font-bold text-lg mb-3 tracking-tight">{benefit.title}</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed group-hover:text-gray-400 transition-colors">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#7C3AED]/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <p className="text-[#A78BFA] text-sm font-black uppercase tracking-[0.2em] mb-4">Elite Tier</p>
            <h2 className="font-display font-bold text-5xl text-white mb-4">The Creator Hall of Fame</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Top performers ranked by performance, consistency, and ROI.</p>
          </div>
          <div className="flex justify-center mb-16">
            <Leaderboard />
          </div>
          <div className="text-center">
            <Link
              href="/creator/signup"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-lg transition-all hover:scale-105 active:scale-95 violet-glow-strong"
            >
              <Zap size={22} className="fill-white" />
              Claim Your Spot in the Top 1%
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl text-white">Common Inquiries</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group glass-card border-none bg-white/[0.03] hover:bg-white/[0.05] transition-all overflow-hidden rounded-2xl">
                <summary className="px-8 py-6 cursor-pointer flex items-center justify-between text-white font-bold text-lg list-none">
                  {faq.q}
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown size={18} className="text-gray-500" />
                  </div>
                </summary>
                <div className="px-8 pb-8 text-gray-400 text-lg leading-relaxed font-medium">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass-card p-16 md:p-24 text-center relative overflow-hidden bg-gradient-to-br from-[#7C3AED]/20 to-[#EC4899]/10">
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="relative">
              <h2 className="font-display font-bold text-5xl md:text-7xl text-white mb-8 tracking-tighter">
                Stop Chasing Followers.<br />
                <span className="gradient-text">Start Building Equity.</span>
              </h2>
              <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium">
                Join 5,000+ creators who have redefined their value. Your data is your power—let's use it.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/creator/signup"
                  className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white text-black font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10"
                >
                  Apply for Access
                </Link>
                <Link
                  href="#"
                  className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-xl transition-all hover:bg-white/10"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

