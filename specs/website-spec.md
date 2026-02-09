# OpenVolo Marketing Website Specification

## 1. Overview

Single-page marketing website for **OpenVolo** — an Agentic AI-Native Social CRM. The site communicates product value and drives adoption via `npx openvolo`. Hosted on GitHub Pages at `openvolo.com`.

## 2. Information Architecture

```
openvolo.com (single-page scroll)
├── #top          → Header (sticky nav)
├── #hero         → Hero with gradient orbs + terminal CTA
├── #features     → 9 feature cards in glass grid
├── #platforms    → Platform hub diagram (X, LinkedIn, Gmail, Substack)
├── #how-it-works → 3-step timeline (Install → Connect → Automate)
├── #security     → Privacy-first messaging
├── #tech-stack   → Technology credibility badges
├── #faq          → Expandable FAQ accordion
├── #cta          → Final call-to-action
└── Footer        → Links, social, copyright
```

## 3. Section Designs

### 3.1 Header
- **Behavior**: Sticky, top-0, z-50, glass blur effect
- **Left**: OpenVolo logo (32px) + wordmark
- **Center**: Anchor links — Features, Platforms, How It Works, FAQ
- **Right**: Theme toggle (sun/moon) + "Get Started" CTA button
- **Mobile**: Hamburger menu → slide-down nav panel
- **Glass effect**: `backdrop-blur-xl bg-background/70 border-b border-border/50`

### 3.2 Hero
- **Background**: 3 large gradient orbs (cyan, lavender/pink, coral) with CSS blur, floating animation
- **Headline**: "Your AI-Powered Social CRM" — Plus Jakarta Sans 800, gradient text
- **Subheadline**: "Manage contacts, content, and workflows across X, LinkedIn, and Gmail — with AI agents, a chat assistant, and a full analytics dashboard. All data stays on your machine."
- **Primary CTA**: Terminal-style block with `npx openvolo` — dark bg, cyan glow border, shimmer animation
- **Secondary links**: "View on GitHub" + "Read the Docs"
- **Layout**: Centered, max-w-4xl, generous vertical padding (py-32)

### 3.3 Features
- **Heading**: "Everything you need to grow your network"
- **Grid**: 3×3 responsive (1col mobile → 2col tablet → 3col desktop)
- **Cards**: Glass-morphism with icon, title, description
- **Card style**: `backdrop-blur-xl bg-card/50 border border-border/50 rounded-xl p-6`
- **Stagger animation**: Cards fade in sequentially on scroll (80ms delay each)

**Nine features:**
1. **Zero Install** (Terminal icon) — "One command to start. `npx openvolo` sets up everything — database, migrations, and dashboard."
2. **Local-First Privacy** (Shield icon) — "Your data never leaves your machine. SQLite database with AES-256 encrypted credentials."
3. **Unified Contacts** (Users icon) — "Cross-platform contact management with automatic deduplication, enrichment scoring, and linked task management."
4. **Workflow Engine** (GitBranch icon) — "Six workflow types — sync, enrich, search, prune, sequence, and agent — with a template gallery, kanban views, and per-step cost tracking."
5. **AI Agent Runner** (Bot icon) — "Five specialized tools — web fetch, browser scrape, smart search, contact enrichment, and progress tracking — with domain-based routing."
6. **AI Chat Assistant** (MessageCircle icon) — "Conversational AI panel (Cmd+K) with 8 CRM tools. Query contacts, analytics, workflows, and content — or create tasks and start workflows by chatting."
7. **Analytics Dashboard** (BarChart icon) — "Five-tab dashboard — overview, agents, engagement, content, and sync health — with time-range filtering and six chart types."
8. **Content Library** (FileText icon) — "Create and manage posts, threads, articles, newsletters, DMs, and replies — publish across X, LinkedIn, and Gmail from one place."
9. **Smart Search** (Search icon) — "Dual-provider search with Brave and Tavily, intelligent query routing, and 3,000 free queries per month."

### 3.4 Platforms
- **Heading**: "One CRM for all your platforms"
- **Layout**: Central OpenVolo hub with 4 platform nodes radiating outward
- **Platforms**: X/Twitter, LinkedIn, Gmail, Substack (coming soon)
- **Visual**: Connection lines with gradient, platform icons in glass circles
- **Info**: Brief capability description under each platform
- **Mobile**: Vertical stack with connecting line

### 3.5 How It Works
- **Heading**: "Up and running in minutes"
- **Layout**: 3-step horizontal timeline (vertical on mobile)
- **Steps**:
  1. **Install** — "Run `npx openvolo` — that's it. No config files, no Docker."
  2. **Connect** — "Link your X, LinkedIn, and Gmail accounts with OAuth. Your credentials are encrypted locally."
  3. **Automate** — "Build workflows, run AI agents, query everything with the chat assistant, and track results on the analytics dashboard — while you focus on what matters."
- **Visual**: Numbered circles connected by gradient line, with icon and description

### 3.6 Security
- **Heading**: "Your data stays yours"
- **Layout**: Two-column (content + visual/icon grid)
- **Key points** (with icons):
  - Local-first SQLite database — nothing in the cloud
  - AES-256 encrypted credential storage
  - OAuth 2.0 for all platform connections
  - Open source — audit the code yourself
- **Visual accent**: Lock/shield icon arrangement or gradient security graphic

### 3.7 Tech Stack
- **Heading**: "Built with modern tools"
- **Layout**: Horizontal scrollable or wrapped badge row
- **Badges**: Next.js 16, React 19, TypeScript, SQLite, Drizzle ORM, Claude SDK, Tailwind CSS 4, Vitest, Zod, Playwright, Recharts, Brave Search, Tavily
- **Style**: Glass pill badges with subtle hover lift

### 3.8 FAQ
- **Heading**: "Frequently asked questions"
- **Layout**: Single column, max-w-3xl centered
- **Interaction**: Click-to-expand accordion (CSS-only or minimal JS)
- **Questions**:
  1. "Is OpenVolo free?" → "Yes. OpenVolo is open source under the Apache 2.0 license."
  2. "Where is my data stored?" → "All data is stored locally in a SQLite database at ~/.openvolo/. Nothing is sent to any cloud service."
  3. "Do I need API keys?" → "You need an Anthropic API key for AI features. Platform API keys (X, LinkedIn, Gmail) are optional. For Smart Search, Brave and Tavily API keys are optional — combined 3,000 free search queries per month."
  4. "What platforms are supported?" → "X/Twitter, LinkedIn, and Gmail are fully supported. Substack integration is on the roadmap."
  5. "Can I use it with Claude Code?" → "Yes. It uses the Vercel AI SDK for the chat assistant (Cmd+K) and the Claude Agent SDK for background workflow automation."
  6. "Is it really one command?" → "Yes. `npx openvolo` downloads the package, creates your database, runs migrations, and starts the dashboard. No Docker, no config files."
  7. "What can AI agents automate?" → "Six workflow types, a template gallery, the AI Agent Runner with five tools, and the AI Chat Assistant (Cmd+K) for creating contacts, starting workflows, and querying data conversationally."
  8. "What analytics are available?" → "Five-tab dashboard with area charts, bar charts, donut charts, ranked tables, and stat cards. Filter by time range and track per-step workflow costs."

### 3.9 CTA (Final)
- **Heading**: "Start growing your network today"
- **Terminal block**: Same `npx openvolo` style as hero
- **Secondary**: GitHub repo link + documentation link
- **Background**: Gradient orb accent (subtle)

### 3.10 Footer
- **Layout**: 3-column on desktop, stacked on mobile
- **Column 1**: Logo + brief tagline
- **Column 2**: Links — GitHub, Documentation, License
- **Column 3**: Social — X/Twitter, GitHub
- **Bottom bar**: "© 2025 OpenVolo. Apache License 2.0."

## 4. Visual Approach — "Luminous Glass"

### Color System (OKLCH)
Matches product design system exactly:
- **Cyan** `oklch(0.55 0.18 195)` / dark `oklch(0.65 0.18 195)` — primary
- **Lavender** `oklch(0.65 0.12 280)` — accent
- **Pink** `oklch(0.72 0.12 340)` — warm accent
- **Coral** `oklch(0.72 0.13 45)` — highlight
- **Neutrals**: All tinted with lavender hue (~270) at low chroma

### Glass Morphism
- Cards: `backdrop-blur-xl bg-card/50 border border-white/10 dark:border-white/5`
- Header: `backdrop-blur-xl bg-background/70 border-b border-border/50`
- Inner glow: `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]`

### Typography
- **Display/Headings**: Plus Jakarta Sans (700-800)
- **Body/UI**: Inter (400-500)
- **Code/Terminal**: JetBrains Mono (400)
- Loaded via Google Fonts link preload

### Animations
- **Gradient orbs**: Slow float/drift using CSS animation (20s infinite)
- **Scroll reveal**: IntersectionObserver triggers `fadeSlideIn` on sections
- **Terminal CTA**: Shimmer effect on border (2s linear infinite)
- **Card stagger**: 80ms sequential delay on feature cards
- **Theme toggle**: Smooth rotation on icon swap

## 5. Responsive Strategy

| Breakpoint | Layout Changes |
|------------|---------------|
| < 640px (mobile) | Single column, stacked sections, hamburger nav, vertical timeline |
| 640-767px (sm) | Minor spacing adjustments |
| 768-1023px (md) | 2-column feature grid, side-by-side security layout |
| 1024px+ (lg) | 3-column feature grid, horizontal timeline, full nav |
| 1440px+ (xl) | Max-width container, generous whitespace |

Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

## 6. Technical Requirements

### Framework
- Astro 5 with static output
- Tailwind CSS 4 via `@astrojs/tailwind`
- Zero client-side JS except theme toggle island

### SEO
- Open Graph meta tags (title, description, image, url)
- Twitter card meta tags
- Structured data (Organization schema)
- Canonical URL
- Sitemap via `@astrojs/sitemap`
- robots.txt

### Performance
- Google Fonts preload with `display=swap`
- Static HTML generation (no SSR)
- Minimal CSS via Tailwind purge
- Target: Lighthouse 95+ performance, 100 accessibility

### Deployment
- GitHub Actions: build on push to main → deploy to Pages
- CNAME file for openvolo.com custom domain
- Copied to dist/ during build

### Accessibility
- Semantic HTML5 landmarks (nav, main, section, footer)
- Skip-to-content link
- Proper heading hierarchy (single h1, sequential h2-h3)
- Focus-visible styles on all interactive elements
- Reduced-motion media query for animations
- Sufficient color contrast in both themes
- ARIA labels on icon-only buttons
