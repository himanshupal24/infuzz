# 🚀 Infuzz — Influencer Discovery SaaS Platform

**Infuzz** is a performance-first influencer discovery platform that connects brands with high-ROI creators based on real engagement data, not just follower counts.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Frontend | Tailwind CSS + custom design system |
| Backend | Next.js API Routes |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) |
| Deployment | Vercel |

---

## Features

- 🎯 **Landing Page** — Hero, How it Works, Creator Benefits, Leaderboard, FAQ
- 📝 **Creator Signup** — 6-step form with live engagement preview
- 📊 **Creator Dashboard** — Score, badge, status, analytics, pricing
- 🛡️ **Admin Dashboard** — Full CRUD, filters, stats, smart matcher
- 💎 **Hidden Gem Finder** — Auto-detect high-ROI micro creators
- 🎯 **Smart Creator Matching** — Filter by niche, country, followers, engagement
- 🏆 **Leaderboard** — Public weekly top 10 by Creator Score

---

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd infuzz
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/infuzz?retryWrites=true&w=majority

# Change this to a long random string in production
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters

# Admin login credentials
ADMIN_EMAIL=admin@infuzz.com
ADMIN_PASSWORD=your-secure-password
```

### 3. Get MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click **Connect → Connect your application**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `infuzz`

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/creator/signup` | Creator onboarding form |
| `/creator/dashboard` | Creator profile & score |
| `/admin/login` | Admin authentication |
| `/admin/dashboard` | Full admin panel |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/creators` | Submit new creator |
| `GET` | `/api/creators` | List creators (with filters) |
| `GET` | `/api/creators/[id]` | Get creator by ID |
| `PATCH` | `/api/creators/status` | Update creator status (admin) |
| `DELETE` | `/api/creators/[id]` | Delete creator (admin) |
| `POST` | `/api/admin/login` | Admin login |
| `DELETE` | `/api/admin/login` | Admin logout |
| `GET` | `/api/admin/stats` | Dashboard statistics (admin) |

### API Query Params (GET /api/creators)

| Param | Description | Example |
|-------|-------------|---------|
| `email` | Look up by email | `?email=test@test.com` |
| `niche` | Filter by niche | `?niche=Fitness` |
| `country` | Filter by country | `?country=India` |
| `status` | Filter by status | `?status=approved` |
| `minFollowers` | Min follower count | `?minFollowers=5000` |
| `maxFollowers` | Max follower count | `?maxFollowers=100000` |
| `minEngagement` | Min engagement % | `?minEngagement=8` |
| `hiddenGems` | Show hidden gems only | `?hiddenGems=true` |
| `leaderboard` | Top approved creators | `?leaderboard=true` |
| `limit` | Max results (default 50) | `?limit=20` |

---

## Creator Score System

```
Score (0–100) =
  40% Engagement Rate
+ 20% Audience Quality (having audience data)
+ 20% Content Consistency (posts per month)
+ 20% Profile Completeness (social links, pricing)
```

### Badge Levels

| Score | Badge |
|-------|-------|
| 90+ | 👑 Elite Creator |
| 75–89 | ⚡ Pro Creator |
| 60–74 | 🚀 Rising Creator |
| <60 | 📈 Needs Improvement |

---

## Hidden Gem Criteria

```
followers < 50,000 AND engagement_rate > 8%
```

---

## Deploy to Vercel

1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Required Environment Variables on Vercel

```
MONGODB_URI
JWT_SECRET
ADMIN_EMAIL
ADMIN_PASSWORD
```

---

## Default Admin Credentials

```
Email:    admin@infuzz.com
Password: admin123
```

⚠️ **Change these immediately in production** via `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars.

---

## Folder Structure

```
infuzz/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Design system styles
│   ├── creator/
│   │   ├── signup/page.tsx         # 6-step signup form
│   │   └── dashboard/page.tsx      # Creator profile view
│   ├── admin/
│   │   ├── login/page.tsx          # Admin auth
│   │   └── dashboard/page.tsx      # Admin panel
│   └── api/
│       ├── creators/route.ts       # POST + GET creators
│       ├── creators/[id]/route.ts  # GET + DELETE by ID
│       ├── creators/status/route.ts # PATCH status
│       ├── admin/login/route.ts    # Admin JWT auth
│       └── admin/stats/route.ts    # Dashboard stats
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── CreatorCard.tsx
│   ├── CreatorTable.tsx
│   ├── DashboardStats.tsx
│   └── Leaderboard.tsx
├── lib/
│   ├── mongodb.ts                  # DB connection with caching
│   ├── analytics.ts                # Score calculation engine
│   └── auth.ts                     # JWT utilities
├── models/
│   └── Creator.ts                  # Mongoose schema + indexes
└── README.md
```

---

## Roadmap (Phase 2)

- [ ] Brand accounts & campaign creation
- [ ] In-app messaging
- [ ] Payment integration (Razorpay)
- [ ] Campaign analytics dashboard
- [ ] Creator portfolio pages
- [ ] Email notifications
- [ ] Two-sided marketplace

---

Built with ❤️ for the creator economy.
