# NomadAI Frontend

A modern, feature-rich Next.js 16 frontend for the NomadAI travel platform — featuring AI-powered tools, real-time translation, smart trip matching, interactive maps, and a full booking flow with dark mode support.

## Live Demo

🔗 **[nomadai-frontend.vercel.app](https://nomadai-frontend.vercel.app)**

## Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **UI:** React 19 + Tailwind CSS v4
- **State:** Zustand (persisted to localStorage)
- **Data Fetching:** TanStack React Query
- **Animations:** Framer Motion v12
- **Charts:** Recharts
- **Auth:** Firebase Auth (Google OAuth) + JWT
- **Forms:** React Hook Form + Zod validation
- **Notifications:** React Toastify
- **Deployment:** Vercel

## Features

### Pages (25 routes)

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, featured destinations, multi-language, trip matcher, stats, categories, how it works, AI features, testimonials, CTA |
| `/explore` | Destination marketplace with search, filters, pagination |
| `/destinations/[id]` | Destination detail with booking, reviews, map, share |
| `/login` | Email/password + Google OAuth login |
| `/register` | Account creation with validation |
| `/booking` | Full booking flow with date picker and price breakdown |
| `/dashboard` | User profile with tabs: overview, bookings, favorites, itineraries |
| `/favorites` | Saved destinations grid |
| `/itinerary` | AI-powered day-by-day trip planner |
| `/match` | Smart Trip Matcher quiz with AI recommendations |
| `/translate` | Multi-language translator (50+ languages) |
| `/ai-assistant` | AI chat assistant with SSE streaming |
| `/data-analyzer` | Upload & analyze files with AI insights + charts |
| `/dashboard/admin` | Admin dashboard with 8 chart types |
| `/dashboard/ai/analytics` | Analytics dashboard (8 Recharts visualizations) |
| `/about` | About page with team and values |
| `/contact` | Contact form with validation |
| `/blog` | Travel blog with category filters |
| `/help` | Help center with FAQ accordion |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

### Key Features

#### Authentication
- Email/password login & registration
- Google OAuth (Firebase Auth)
- Demo login for instant access
- Admin auto-redirect to dashboard
- Persistent auth state (Zustand + localStorage)

#### Dark Mode
- Full dark mode support across all 25 pages
- Toggle in navbar (persists to localStorage)
- Smooth color transitions
- Dark scrollbar styling

#### Smart Trip Matcher
- 5-step interactive quiz (travel style, climate, budget, interests, duration)
- AI-powered destination recommendations with match scores
- Animated step transitions

#### Multi-Language Translator
- 50+ supported languages
- Cultural context notes
- Pronunciation guides
- Alternative translations
- Quick travel phrase presets

#### Booking System
- Date range selection with validation
- Guest count with increment/decrement
- Real-time price calculation
- Special requests
- Order summary

#### Reviews & Ratings
- 5-star rating selector
- Write and delete reviews
- Average rating display

#### Interactive Elements
- Animated hero slider with auto-play
- Featured destinations carousel
- Favorite/unfavorite with heart animation
- Social sharing (WhatsApp, Twitter, Facebook, Copy Link)
- Currency selector (20 currencies)
- Interactive map cards
- Toast notifications on all actions

#### Admin Dashboard
- KPI cards (revenue, destinations, users, avg price)
- Revenue AreaChart, destination BarChart
- Category PieChart, rating distribution
- Price analytics, location ranking
- Recent activity tables
- Top rated destinations

#### Data Visualization (Recharts)
- AreaChart, BarChart, LineChart, PieChart
- ComposedChart (dual Y-axis)
- RadarChart, horizontal BarChart
- Auto-generated charts from uploaded data

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Auth page group (login, register)
│   ├── about/
│   ├── blog/
│   ├── booking/
│   ├── contact/
│   ├── dashboard/
│   │   ├── admin/          # Admin dashboard
│   │   └── ai/analytics/   # Analytics dashboard
│   ├── data-analyzer/
│   ├── destinations/[id]/
│   ├── explore/
│   ├── favorites/
│   ├── help/
│   ├── itinerary/
│   ├── match/
│   ├── privacy/
│   ├── terms/
│   ├── translate/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Tailwind v4 theme
├── components/
│   ├── auth/               # Auth components
│   ├── chat/               # Chat widget
│   ├── home/               # Homepage sections (9 sections)
│   ├── layout/             # Navbar, Footer
│   ├── marketplace/        # Destination cards
│   └── *.tsx               # Reusable components
├── hooks/                  # Custom React hooks
├── lib/
│   ├── api.ts              # Axios instance
│   └── firebase.ts         # Firebase config
├── store/
│   ├── authStore.ts        # Auth state (Zustand)
│   └── themeStore.ts       # Dark mode state
└── types/                  # TypeScript interfaces
```

## Key Components

| Component | Description |
|-----------|-------------|
| `AuthProvider` | Loading spinner during auth hydration |
| `ThemeProvider` | Applies dark class to `<html>` |
| `ThemeToggle` | Animated sun/moon toggle |
| `CurrencySelector` | 20-currency dropdown with localStorage |
| `ShareButtons` | WhatsApp, Twitter, Facebook, Copy Link |
| `ReviewsSection` | Star ratings, write/delete reviews |
| `DestinationMap` | Map card with Google Maps link |
| `GoogleAuthButton` | Firebase Google OAuth button |
| `ChatWidget` | Floating AI chat with SSE streaming |
| `FeaturedDestinations` | Animated destination carousel |
| `MultiLanguageSection` | Language feature showcase |
| `TripMatcherSection` | Trip matcher feature showcase |

## Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT
