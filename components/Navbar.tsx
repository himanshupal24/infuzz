'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'py-3 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5'
          : 'py-5 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group relative">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#EC4899] flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[#7C3AED]/20">
              <Zap size={18} className="text-white fill-white" />
            </div>
          </div>
          <span className="font-display font-bold text-2xl text-white tracking-tight">
            In<span className="text-[#7C3AED]">fuzz</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { name: 'How it Works', href: '#how-it-works' },
            { name: 'Benefits', href: '#benefits' },
            { name: 'Leaderboard', href: '#leaderboard' },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5"
            >
              {item.name}
            </Link>
          ))}

          <div className="w-px h-4 bg-white/10 mx-4" />

          <Link
            href="/creator/signup"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold transition-all duration-300 hover:bg-[#7C3AED] hover:text-white hover:scale-105 active:scale-95"
          >
            Join Network
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/10"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0A0A12] border-b border-white/5 overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          <Link href="#how-it-works" className="text-lg text-gray-300 font-medium" onClick={() => setMobileOpen(false)}>How it Works</Link>
          <Link href="#benefits" className="text-lg text-gray-300 font-medium" onClick={() => setMobileOpen(false)}>Benefits</Link>
          <Link href="#leaderboard" className="text-lg text-gray-300 font-medium" onClick={() => setMobileOpen(false)}>Leaderboard</Link>
          <Link
            href="/creator/signup"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#7C3AED] text-white font-bold text-center"
            onClick={() => setMobileOpen(false)}
          >
            Join as Creator
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
}

