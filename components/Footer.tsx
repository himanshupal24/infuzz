import Link from 'next/link';
import { Zap, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050508] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#7C3AED]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#EC4899] flex items-center justify-center group-hover:rotate-12 transition-transform">
                <Zap size={20} className="text-white fill-white" />
              </div>
              <span className="font-display font-bold text-2xl text-white">
                In<span className="text-[#7C3AED]">fuzz</span>
              </span>
            </Link>
            <p className="text-gray-500 text-lg max-w-sm leading-relaxed mb-10 font-medium">
              The world's first performance-first influencer discovery platform. Turning creator data into high-value equity.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7C3AED] hover:border-transparent transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Protocol</h4>
              <ul className="space-y-4">
                {['How it Works', 'Creator Score', 'Leaderboard', 'Hidden Gems'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-500 text-sm font-bold hover:text-white transition-colors flex items-center group/link">
                      {link}
                      <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all ml-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Solution</h4>
              <ul className="space-y-4">
                {['For Brands', 'For Agencies', 'Case Studies', 'API Access'].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-500 text-sm font-bold hover:text-white transition-colors flex items-center group/link">
                      {link}
                      <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all ml-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8">Organization</h4>
              <ul className="space-y-4">
                {['About', 'Blog', 'Contact'].map((link) => (
                  <li key={link}>
                    <Link
                      href={link === 'Admin' ? '/admin/login' : '#'}
                      className="text-gray-500 text-sm font-bold hover:text-white transition-colors flex items-center group/link"
                    >
                      {link}
                      <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all ml-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-600 text-sm font-bold">
            © 2024 INFUZZ PROTOCOL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
            <Link href="#" className="text-gray-600 text-xs font-bold hover:text-gray-400 transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="text-gray-600 text-xs font-bold hover:text-gray-400 transition-colors">TERMS OF SERVICE</Link>
          </div>
          <p className="text-gray-500 text-xs font-black tracking-widest uppercase">
            Built for the top 1% ⚡
          </p>
        </div>
      </div>
    </footer>
  );
}

