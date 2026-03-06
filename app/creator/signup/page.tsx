'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Zap, CheckCircle, Loader2, AlertCircle, ChevronRight, ChevronLeft, User, Share2, BarChart3, Users, DollarSign, FileText } from 'lucide-react';
import { getBadgeStyle } from '@/lib/analytics';

const STEPS = [
  { id: 1, title: 'Basic Info', icon: <User size={16} /> },
  { id: 2, title: 'Social Profiles', icon: <Share2 size={16} /> },
  { id: 3, title: 'Your Metrics', icon: <BarChart3 size={16} /> },
  { id: 4, title: 'Audience', icon: <Users size={16} /> },
  { id: 5, title: 'Pricing', icon: <DollarSign size={16} /> },
  { id: 6, title: 'Content', icon: <FileText size={16} /> },
];

const NICHES = ['Fitness', 'Tech', 'Fashion', 'Lifestyle', 'Food', 'Travel', 'Beauty', 'Gaming'];
const CONTENT_TYPES = ['UGC', 'Product Review', 'Tutorial', 'Lifestyle'];
const AGE_RANGES = ['13–17', '18–24', '25–34', '35–44', '45+'];

interface FormData {
  name: string;
  email: string;
  country: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  whatsapp: string;
  niche: string;
  followers: string;
  avgLikes: string;
  avgComments: string;
  postsPerMonth: string;
  audienceCountry: string;
  audienceAge: string;
  audienceGender: string;
  pricePost: string;
  priceStory: string;
  priceYoutube: string;
  contentType: string[];
}

const initial: FormData = {
  name: '', email: '', country: '',
  instagram: '', youtube: '', tiktok: '', whatsapp: '',
  niche: '',
  followers: '', avgLikes: '', avgComments: '', postsPerMonth: '',
  audienceCountry: '', audienceAge: '', audienceGender: '',
  pricePost: '', priceStory: '', priceYoutube: '',
  contentType: [],
};

function Input({ label, name, value, onChange, type = 'text', placeholder, prefix }: any) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">{prefix}</span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full bg-[#0F0F1A] border border-[#1E1E2E] rounded-lg text-white text-sm py-2.5 focus:outline-none focus:border-[#7C3AED] transition-colors placeholder:text-gray-700 ${prefix ? 'pl-7 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  );
}

export default function CreatorSignup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [creatorResult, setCreatorResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleContent = (ct: string) => {
    setForm((prev) => ({
      ...prev,
      contentType: prev.contentType.includes(ct)
        ? prev.contentType.filter((c) => c !== ct)
        : [...prev.contentType, ct],
    }));
  };

  const validateStep = (): boolean => {
    setError('');
    if (step === 1) {
      if (!form.name.trim()) { setError('Full name is required'); return false; }
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) { setError('Valid email is required'); return false; }
      if (!form.country.trim()) { setError('Country is required'); return false; }
    }
    if (step === 2) {
      if (!form.instagram && !form.youtube && !form.tiktok) {
        setError('At least one social profile is required'); return false;
      }
      if (!form.niche) { setError('Please select your niche'); return false; }
    }
    if (step === 3) {
      if (!form.followers || Number(form.followers) < 0) { setError('Followers count is required'); return false; }
      if (!form.avgLikes || Number(form.avgLikes) < 0) { setError('Average likes is required'); return false; }
      if (!form.avgComments || Number(form.avgComments) < 0) { setError('Average comments is required'); return false; }
      if (!form.postsPerMonth || Number(form.postsPerMonth) < 0) { setError('Posts per month is required'); return false; }
    }
    return true;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 6));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/creators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');
      setCreatorResult(data.creator);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success && creatorResult) {
    const badge = getBadgeStyle(creatorResult.badge);
    return (
      <main className="min-h-screen bg-[#0A0A12]">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="glass-card p-8 sm:p-12 max-w-lg w-full text-center violet-glow">
            {/* Animated checkmark */}
            <div className="w-20 h-20 rounded-full bg-[#84CC16]/15 border border-[#84CC16]/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-[#84CC16]" size={40} />
            </div>

            <h2 className="font-display font-bold text-3xl text-white mb-2">You&apos;re In! 🎉</h2>
            <p className="text-gray-500 text-sm mb-8">
              Your profile is live and under review. Here&apos;s your Creator Score:
            </p>

            {/* Score + Badge display */}
            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-center gap-6">
                {/* Score ring */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg width="96" height="96" className="-rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#1E1E2E" strokeWidth="7" />
                    <circle
                      cx="48" cy="48" r="40" fill="none"
                      stroke="#7C3AED" strokeWidth="7"
                      strokeDasharray={`${(creatorResult.creatorScore / 100) * 251} 251`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display font-bold text-2xl text-white">{creatorResult.creatorScore}</span>
                    <span className="text-[10px] text-gray-600">/ 100</span>
                  </div>
                </div>

                <div className="text-left">
                  <p className="text-gray-500 text-xs mb-1">Creator Score</p>
                  <p className="font-display font-bold text-2xl text-white mb-2">{creatorResult.creatorScore} pts</p>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-sm font-medium ${badge.bg} ${badge.color} ${badge.border}`}>
                    {badge.emoji} {badge.label}
                  </span>
                  <p className="text-gray-600 text-xs mt-2">
                    Engagement: <span className="text-[#84CC16] font-semibold">{creatorResult.engagementRate}%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Status info */}
            <div className="bg-yellow-400/5 border border-yellow-400/20 rounded-xl px-4 py-3 mb-6 text-left">
              <p className="text-yellow-300 text-sm font-medium">⏳ Status: Pending Review</p>
              <p className="text-gray-600 text-xs mt-0.5">Our team will review and approve your profile soon.</p>
            </div>

            {/* Dashboard button — prominent */}
            <Link
              href={`/creator/dashboard?email=${encodeURIComponent(form.email)}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-base transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#7C3AED]/30 mb-3"
            >
              <BarChart3 size={18} />
              View My Dashboard
            </Link>
            <Link href="/" className="block text-gray-600 hover:text-gray-400 text-sm transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A12]">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#A78BFA] text-xs mb-4">
            <Zap size={12} /> Join the Creator Network
          </div>
          <h1 className="font-display font-bold text-3xl text-white">Create Your Profile</h1>
          <p className="text-gray-500 mt-2 text-sm">Takes about 5 minutes. Get your Creator Score instantly.</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                step === s.id
                  ? 'bg-[#7C3AED] text-white'
                  : step > s.id
                  ? 'bg-[#84CC16]/10 text-[#84CC16] border border-[#84CC16]/30'
                  : 'text-gray-600 bg-[#1E1E2E]'
              }`}>
                {step > s.id ? <CheckCircle size={12} /> : s.icon}
                <span className="hidden sm:inline">{s.title}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-4 sm:w-6 mx-1 ${step > s.id ? 'bg-[#84CC16]/30' : 'bg-[#1E1E2E]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-6 text-red-400 text-sm">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Step 1 — Basic Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-white mb-4">Basic Information</h2>
              <Input label="Full Name *" name="name" value={form.name} onChange={handleChange} placeholder="Rahul Kumar" />
              <Input label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} placeholder="rahul@example.com" />
              <Input label="Country *" name="country" value={form.country} onChange={handleChange} placeholder="India" />
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">
                  WhatsApp Number <span className="text-gray-600 text-xs">(for brand inquiries)</span>
                </label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 bg-[#1E1E2E] border border-[#1E1E2E] rounded-lg text-gray-500 text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={15}
                    className="flex-1 bg-[#0F0F1A] border border-[#1E1E2E] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#7C3AED] transition-colors placeholder:text-gray-700"
                  />
                </div>
                <p className="text-gray-700 text-xs mt-1">Brands will contact you directly via WhatsApp for deals</p>
              </div>
            </div>
          )}

          {/* Step 2 — Social Profiles */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-white mb-4">Social Profiles & Niche</h2>
              <Input label="Instagram Username" name="instagram" value={form.instagram} onChange={handleChange} placeholder="rahulk.fitness" prefix="@" />
              <Input label="YouTube Channel Link" name="youtube" value={form.youtube} onChange={handleChange} placeholder="https://youtube.com/@channel" />
              <Input label="TikTok Username" name="tiktok" value={form.tiktok} onChange={handleChange} placeholder="rahulk" prefix="@" />
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Niche *</label>
                <div className="grid grid-cols-4 gap-2">
                  {NICHES.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, niche: n })}
                      className={`py-2 rounded-lg text-xs font-medium transition-all ${
                        form.niche === n
                          ? 'bg-[#7C3AED] text-white'
                          : 'bg-[#1E1E2E] text-gray-500 hover:text-white hover:bg-[#2A2A3E]'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Metrics */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-white mb-4">Your Performance Metrics</h2>
              <p className="text-gray-600 text-xs mb-4">Use your primary platform's data. This is how we calculate your Creator Score.</p>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Total Followers *" name="followers" type="number" value={form.followers} onChange={handleChange} placeholder="32000" />
                <Input label="Avg Likes per Post *" name="avgLikes" type="number" value={form.avgLikes} onChange={handleChange} placeholder="1800" />
                <Input label="Avg Comments per Post *" name="avgComments" type="number" value={form.avgComments} onChange={handleChange} placeholder="85" />
                <Input label="Posts per Month *" name="postsPerMonth" type="number" value={form.postsPerMonth} onChange={handleChange} placeholder="12" />
              </div>
              {/* Live engagement preview */}
              {form.followers && form.avgLikes && (
                <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-400 text-xs">Estimated Engagement Rate</span>
                  <span className="text-[#A78BFA] font-display font-bold text-lg">
                    {(((Number(form.avgLikes) + Number(form.avgComments || 0)) / Number(form.followers)) * 100).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Step 4 — Audience */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-white mb-4">Audience Information</h2>
              <p className="text-gray-600 text-xs mb-4">Help brands understand who follows you.</p>
              <Input label="Audience Country (primary)" name="audienceCountry" value={form.audienceCountry} onChange={handleChange} placeholder="India" />
              <div>
                <label className="block text-sm text-gray-400 mb-2">Audience Age Range</label>
                <div className="flex flex-wrap gap-2">
                  {AGE_RANGES.map((age) => (
                    <button
                      key={age}
                      type="button"
                      onClick={() => setForm({ ...form, audienceAge: age })}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                        form.audienceAge === age ? 'bg-[#7C3AED] text-white' : 'bg-[#1E1E2E] text-gray-500 hover:text-white'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Audience Gender Split</label>
                <div className="flex gap-2">
                  {['Mostly Male', 'Mostly Female', 'Mixed (50/50)', 'Mixed (60M/40F)', 'Mixed (40M/60F)'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setForm({ ...form, audienceGender: g })}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex-1 ${
                        form.audienceGender === g ? 'bg-[#7C3AED] text-white' : 'bg-[#1E1E2E] text-gray-500 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5 — Pricing */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-white mb-4">Your Pricing</h2>
              <p className="text-gray-600 text-xs mb-4">Set your rates in ₹ (INR). Leave 0 if not applicable.</p>
              <Input label="Price per Instagram Post (₹)" name="pricePost" type="number" value={form.pricePost} onChange={handleChange} placeholder="5000" prefix="₹" />
              <Input label="Price per Instagram Story (₹)" name="priceStory" type="number" value={form.priceStory} onChange={handleChange} placeholder="2000" prefix="₹" />
              <Input label="Price for YouTube Integration (₹)" name="priceYoutube" type="number" value={form.priceYoutube} onChange={handleChange} placeholder="15000" prefix="₹" />
            </div>
          )}

          {/* Step 6 — Content Type */}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-white mb-4">Content Style</h2>
              <p className="text-gray-600 text-xs mb-4">What type of branded content do you create? Select all that apply.</p>
              <div className="grid grid-cols-2 gap-3">
                {CONTENT_TYPES.map((ct) => (
                  <button
                    key={ct}
                    type="button"
                    onClick={() => toggleContent(ct)}
                    className={`py-4 rounded-xl text-sm font-medium border transition-all ${
                      form.contentType.includes(ct)
                        ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-[#A78BFA]'
                        : 'bg-[#1E1E2E] border-[#1E1E2E] text-gray-500 hover:border-[#7C3AED]/50 hover:text-white'
                    }`}
                  >
                    {ct === 'UGC' && '🎬 '}
                    {ct === 'Product Review' && '⭐ '}
                    {ct === 'Tutorial' && '📚 '}
                    {ct === 'Lifestyle' && '✨ '}
                    {ct}
                  </button>
                ))}
              </div>

              {/* Preview score estimate */}
              <div className="mt-6 bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-xl p-5">
                <p className="text-[#A78BFA] text-xs font-semibold uppercase tracking-wider mb-3">Your Estimated Creator Score</p>
                <div className="flex items-center gap-4">
                  <div className="h-2 flex-1 bg-[#1E1E2E] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full"
                      style={{
                        width: `${Math.min(
                          ((Number(form.avgLikes || 0) + Number(form.avgComments || 0)) / Math.max(Number(form.followers || 1), 1)) * 100 * 4 +
                          (form.audienceCountry ? 15 : 0) +
                          (form.instagram ? 5 : 0) +
                          (form.youtube ? 5 : 0) +
                          Math.min(Number(form.postsPerMonth || 0), 20),
                          100
                        )}%`
                      }}
                    />
                  </div>
                  <span className="font-display font-bold text-xl text-white">
                    ~{Math.round(Math.min(
                      ((Number(form.avgLikes || 0) + Number(form.avgComments || 0)) / Math.max(Number(form.followers || 1), 1)) * 100 * 4 +
                      (form.audienceCountry ? 15 : 0) +
                      (form.instagram ? 5 : 0) +
                      (form.youtube ? 5 : 0) +
                      Math.min(Number(form.postsPerMonth || 0), 20),
                      100
                    ))}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-2">Exact score calculated after submission</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-[#1E1E2E]">
            {step > 1 && (
              <button
                onClick={prev}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#1E1E2E] text-gray-400 hover:text-white text-sm font-medium transition-colors"
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}
            <div className="flex-1" />
            {step < 6 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-colors"
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                {loading ? 'Submitting...' : 'Join Infuzz'}
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
