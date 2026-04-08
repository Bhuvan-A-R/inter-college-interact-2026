# SKILL.md — GAT Techno-Cultural Fest Frontend (v2 — Official Brand Palette)
### Global Academy of Technology | Next.js + shadcn/ui + Tailwind CSS

---

## 🎯 Context & Vision

You are building the official website for **Global Academy of Technology's Techno-Cultural Fest** — an event where institutional prestige meets cultural energy. The design must feel **bold, professional, and alive** — not a generic college fest, not a startup SaaS — something uniquely GAT.

**The Aesthetic Direction: "Prestige in Motion"**
Think: Oxford meets ISRO. Deep institutional blues and navies as the backbone. Gold as the accent of excellence. White as the breathing room. Clean, authoritative, with motion that surprises.

---

## 🎨 Official Brand Palette

Extract these EXACTLY from the uploaded palette image. Use nowhere else, improvise nothing.

```
GAT_GOLD        #f3c317   ← Primary accent, CTAs, highlights, icons, active states
GAT_BLUE        #2362ec   ← Primary brand color, buttons, links, interactive elements
GAT_CHARCOAL    #353636   ← Body text, headings on white, icon fills
GAT_DARK_GOLD   #9a8531   ← Secondary accent, hover states on gold, borders on gold elements
GAT_STEEL       #8b97b6   ← Muted text, placeholder text, disabled states, subtle borders
GAT_NAVY        #1a3a8b   ← Section backgrounds, card accents, deep headers
GAT_MIDNIGHT    #0e2045   ← Darkest surface, footer background, hero gradient bottom
GAT_COBALT      #0a3096   ← Gradient partner to MIDNIGHT, active tab backgrounds
WHITE           #ffffff   ← Page background everywhere. Non-negotiable.
OFF_WHITE       #f8f9fc   ← Card backgrounds, alternate section bg, input fields
```

### Color Roles — Follow Strictly
| Token | Hex | Use |
|---|---|---|
| `gat-gold` | `#f3c317` | Primary CTA buttons, active badges, star ratings, highlighted text |
| `gat-blue` | `#2362ec` | Nav links, primary button fills, anchor tags, progress bars |
| `gat-charcoal` | `#353636` | All body text, H2–H6 on white, card text |
| `gat-dark-gold` | `#9a8531` | Gold hover states, secondary borders, prize "2nd place" accents |
| `gat-steel` | `#8b97b6` | Muted/helper text, placeholder text, disabled elements |
| `gat-navy` | `#1a3a8b` | Section accent bands, card top borders, tab indicator |
| `gat-midnight` | `#0e2045` | Footer bg, hero overlay gradient, navbar on scroll |
| `gat-cobalt` | `#0a3096` | Gradient fills alongside midnight, active nav pill |
| `white` | `#ffffff` | Every page background — absolutely all pages |
| `off-white` | `#f8f9fc` | Cards, alternating section backgrounds |

### What to NEVER Do with This Palette
- ❌ Use dark backgrounds for main page content areas
- ❌ Use `gat-gold` as a text color on white (fails contrast — use `gat-dark-gold` instead)
- ❌ Use `gat-steel` for important text (too low contrast on white)
- ❌ Invent new colors — stick strictly to the 8 palette colors + white/off-white
- ❌ Neon colors (cyan, magenta, lime) — those clash with this palette's institutional character

---

## 🏗️ Tech Stack Rules

### Next.js (App Router)
- Use `app/` directory with proper `layout.tsx`, `page.tsx` structure
- Use `loading.tsx` per route segment for granular Suspense
- **React Server Components** for all event data fetching; Client Components only for filters, search, tabs
- Use `next/image` with `priority` for hero; lazy for all event card images
- Use `next/font` — never `<link>` to Google Fonts
- Route structure:
  ```
  app/
    layout.tsx              ← Global navbar, footer, fonts, theme
    page.tsx                ← Landing hero page
    events/
      page.tsx              ← All 50+ events browse page
      [slug]/page.tsx       ← Individual event detail
    schedule/page.tsx       ← Timeline / day-wise schedule
    teams/page.tsx          ← Organizer team directory
    sponsors/page.tsx       ← Sponsor tiers wall
    register/page.tsx       ← Registration gateway
    gallery/page.tsx        ← Previous fest photo gallery
```

### shadcn/ui — Theming for the GAT Palette

Set CSS variables in `globals.css` to map GAT brand colors into shadcn's system:

```css
/* globals.css */
:root {
  --background:         0 0% 100%;             /* #ffffff */
  --foreground:         0 0% 21%;              /* #353636 charcoal */

  --card:               220 33% 98%;           /* #f8f9fc off-white */
  --card-foreground:    0 0% 21%;              /* #353636 */

  --popover:            0 0% 100%;
  --popover-foreground: 0 0% 21%;

  --primary:            221 82% 55%;           /* #2362ec gat-blue */
  --primary-foreground: 0 0% 100%;             /* white */

  --secondary:          46 90% 51%;            /* #f3c317 gat-gold */
  --secondary-foreground: 0 0% 13%;            /* near-black for contrast */

  --muted:              220 20% 60%;           /* #8b97b6 gat-steel */
  --muted-foreground:   220 10% 45%;

  --accent:             224 68% 30%;           /* #1a3a8b gat-navy */
  --accent-foreground:  0 0% 100%;

  --destructive:        0 84% 60%;
  --border:             220 20% 88%;           /* light steel border */
  --input:              220 20% 92%;
  --ring:               221 82% 55%;           /* gat-blue focus ring */

  --radius: 0.625rem;
}
```

### shadcn/ui Components to Use
- `Tabs` — event category switching; active tab = `gat-cobalt` bg + white text + `gat-gold` underline
- `Card` — event cards; `bg-off-white`, top border accent by category color
- `Badge` — event type tags; color-coded by category using gat palette
- `Command` + `Dialog` — global Cmd+K event search
- `Sheet` — mobile nav drawer with `gat-midnight` background
- `Skeleton` — loading states matching card layout
- `Tooltip` — prize hover info, coordinator quick info
- `Select` / `DropdownMenu` — filters and sort controls
- `Progress` — registration fill meter; fill color = `gat-blue`, bg = `gat-steel/20`
- `Separator` — section dividers; use `gat-gold` colored horizontal rules as section breaks
- `ScrollArea` — schedule timeline, sidebar
- `Accordion` — event rules, FAQ
- `HoverCard` — coordinator profile preview
- `Toast` (Sonner) — registration success, clipboard share

### Tailwind Config (`tailwind.config.ts`)
```ts
theme: {
  extend: {
    colors: {
      gat: {
        gold:       '#f3c317',
        blue:       '#2362ec',
        charcoal:   '#353636',
        'dark-gold':'#9a8531',
        steel:      '#8b97b6',
        navy:       '#1a3a8b',
        midnight:   '#0e2045',
        cobalt:     '#0a3096',
        'off-white':'#f8f9fc',
      }
    },
    fontFamily: {
      display: ['Playfair Display', 'Georgia', 'serif'],  // prestigious, editorial
      heading: ['Rajdhani', 'sans-serif'],                // technical + clean
      body:    ['DM Sans', 'sans-serif'],                 // readable body
      mono:    ['JetBrains Mono', 'monospace'],           // code/data elements
    },
    boxShadow: {
      'gold':   '0 4px 24px rgba(243,195,23,0.18)',
      'blue':   '0 4px 24px rgba(35,98,236,0.18)',
      'navy':   '0 8px 32px rgba(14,32,69,0.12)',
      'card':   '0 2px 12px rgba(27,58,139,0.08)',
      'card-hover': '0 8px 32px rgba(35,98,236,0.15)',
    },
    backgroundImage: {
      'hero-gradient':   'linear-gradient(135deg, #0e2045 0%, #0a3096 50%, #1a3a8b 100%)',
      'gold-gradient':   'linear-gradient(135deg, #f3c317 0%, #9a8531 100%)',
      'blue-gradient':   'linear-gradient(135deg, #2362ec 0%, #0a3096 100%)',
      'section-subtle':  'linear-gradient(180deg, #ffffff 0%, #f8f9fc 100%)',
      'dots-pattern':    'radial-gradient(circle, #8b97b6 1px, transparent 1px)',
    },
    backgroundSize: {
      'dots': '24px 24px',
    },
    animation: {
      'fade-up':       'fadeUp 0.6s ease forwards',
      'fade-in':       'fadeIn 0.4s ease forwards',
      'slide-right':   'slideRight 0.5s ease forwards',
      'count-up':      'countUp 1.5s ease forwards',
      'shimmer':       'shimmer 2s linear infinite',
      'gold-pulse':    'goldPulse 3s ease-in-out infinite',
      'float-slow':    'float 8s ease-in-out infinite',
      'border-flow':   'borderFlow 4s linear infinite',
    },
    keyframes: {
      fadeUp:    { '0%': { opacity:'0', transform:'translateY(20px)' }, '100%': { opacity:'1', transform:'translateY(0)' } },
      fadeIn:    { '0%': { opacity:'0' }, '100%': { opacity:'1' } },
      slideRight:{ '0%': { opacity:'0', transform:'translateX(-20px)' }, '100%': { opacity:'1', transform:'translateX(0)' } },
      shimmer:   { '0%': { backgroundPosition:'-200% 0' }, '100%': { backgroundPosition:'200% 0' } },
      goldPulse: { '0%,100%': { boxShadow:'0 0 0 0 rgba(243,195,23,0.3)' }, '50%': { boxShadow:'0 0 0 12px rgba(243,195,23,0)' } },
      float:     { '0%,100%': { transform:'translateY(0px)' }, '50%': { transform:'translateY(-12px)' } },
      borderFlow:{ '0%': { backgroundPosition:'0% 50%' }, '100%': { backgroundPosition:'200% 50%' } },
    }
  }
}
```

---

## 🎨 Design System — Component by Component

### Typography System
```
Font Pairing Strategy:
  Fest Name / H1:   Playfair Display — editorial weight, prestige signal
  Section Headers:  Rajdhani Bold — technical energy, strong geometry
  Body / Cards:     DM Sans — warm, readable, modern
  Data / Numbers:   JetBrains Mono — prize amounts, counts, codes

Color on white backgrounds:
  H1:               #0e2045  (gat-midnight) — maximum authority
  H2–H3:            #353636  (gat-charcoal)
  H4–H6:            #1a3a8b  (gat-navy)
  Body:             #353636  (gat-charcoal)
  Muted / Caption:  #8b97b6  (gat-steel)
  Links:            #2362ec  (gat-blue) — underline on hover
  Accent text:      #9a8531  (gat-dark-gold) — for gold-toned emphasis
```

### 1. Navbar
```tsx
// Default: white bg, charcoal text, bottom border gat-blue/10
// On scroll: transitions to gat-midnight bg, white text (smooth 300ms)
<header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gat-blue/10
                   transition-all duration-300 data-[scrolled]:bg-gat-midnight
                   data-[scrolled]:border-gat-cobalt/30">

  {/* Logo: "GAT" in Rajdhani bold gat-midnight | "FEST NAME" in gat-gold */}
  <Logo />

  {/* Desktop nav: DM Sans medium, charcoal, hover→gat-blue, active→gat-blue with underline */}
  <nav>{navLinks}</nav>

  {/* Right cluster */}
  <div className="flex gap-3">
    {/* Cmd+K search trigger: gat-steel border, ghost style */}
    <SearchTrigger />
    {/* "Register Now": solid gat-blue bg, white text, hover→gat-midnight */}
    <Button className="bg-gat-blue text-white hover:bg-gat-midnight">Register Now</Button>
  </div>

  {/* Mobile: hamburger → Sheet with gat-midnight bg */}
</header>
```

### 2. Hero Section
```tsx
// ONLY dark section on the site — justified because hero must command attention
// Full viewport height
// Background: bg-hero-gradient (midnight → cobalt → navy diagonal)
// Foreground: white text, gold accents

<section className="min-h-screen bg-hero-gradient relative overflow-hidden flex items-center">

  {/* Subtle dot pattern overlay — gat-steel at 8% opacity */}
  <div className="absolute inset-0 bg-dots-pattern opacity-[0.08]" />

  {/* Floating geometric shapes: semi-transparent gat-gold circles, gat-blue rectangles */}
  {/* CSS animated, no JS library needed */}

  {/* Left-aligned content block */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

    {/* Pre-title badge */}
    <Badge className="bg-gat-gold/20 text-gat-gold border border-gat-gold/40 mb-6">
      Global Academy of Technology Presents
    </Badge>

    {/* Fest name: Playfair Display, 6xl–10xl fluid, white */}
    <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] text-white leading-[0.95] mb-4">
      TECHNO<br/>
      <span className="text-gat-gold">CULTURAL</span><br/>
      FEST 2025
    </h1>

    {/* Tagline: Rajdhani, tracking-widest, gat-steel */}
    <p className="font-heading text-gat-steel tracking-[0.3em] text-sm uppercase mb-8">
      Where Code Meets Culture
    </p>

    {/* Stats row: animated count-up on mount */}
    <div className="flex gap-8 mb-10 font-mono">
      {[['50+','Events'],['3','Days'],['1000+','Participants'],['₹2L+','Prize Pool']]
        .map(([num, label]) => (
        <div>
          <div className="text-3xl font-bold text-gat-gold">{num}</div>
          <div className="text-xs text-gat-steel uppercase tracking-wider">{label}</div>
        </div>
      ))}
    </div>

    {/* CTAs */}
    <div className="flex gap-4">
      <Button size="lg" className="bg-gat-gold text-gat-midnight font-bold hover:bg-gat-dark-gold shadow-gold">
        Explore Events →
      </Button>
      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
        Register Free
      </Button>
    </div>

    {/* Date/venue strip below CTAs */}
    <p className="mt-6 text-gat-steel text-sm font-mono">
      March 14–16, 2025 &nbsp;·&nbsp; GAT Campus, Bengaluru
    </p>
  </div>

  {/* Right side: abstract geometric illustration or college building image with blue overlay */}
</section>
// After hero: ALL sections use white or off-white backgrounds
```

### 3. Events Browse Page — THE most important page

**Must handle 50+ events with zero confusion.**

#### Page Header
```tsx
// White bg, page title in Rajdhani, subtitle in DM Sans muted
// Breadcrumb: Home / Events
// Active filter count chip if filters applied
```

#### Layout
```
┌──────────────────────────────────────────────────────────────┐
│  🔍 [Search all events...                        ⌘K]         │  ← full width, gat-blue border on focus
├──────────────────────────────────────────────────────────────┤
│  [All 52] [Technical 18] [Cultural 15] [Workshop 8] [Gaming] │  ← Tabs, gat-cobalt active
├──────────┬───────────────────────────────────────────────────┤
│ FILTERS  │  Sort: [Featured ▾]   View: [Grid] [List]         │
│ ────     │  ─────────────────────────────────────────────── │
│ Day      │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│ ○ Day 1  │  │ EventCard│ │ EventCard│ │ EventCard│          │
│ ○ Day 2  │  └──────────┘ └──────────┘ └──────────┘          │
│ ○ Day 3  │  ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│          │  │ EventCard│ │ ...      │                        │
│ Type     │                                                   │
│ □ Solo   │  [Showing 12 of 52 events] [Load 12 more ↓]       │
│ □ Team   │                                                   │
│          │                                                   │
│ Prize    │                                                   │
│ [₹500+]  │                                                   │
│ [₹1000+] │                                                   │
│ [₹5000+] │                                                   │
│          │                                                   │
│ [Clear]  │                                                   │
└──────────┴───────────────────────────────────────────────────┘
```

#### Category Tabs Design
```tsx
// shadcn Tabs, custom styled
<TabsTrigger 
  className="
    data-[state=active]:bg-gat-cobalt 
    data-[state=active]:text-white 
    data-[state=active]:shadow-blue
    border-b-2 data-[state=active]:border-gat-gold
    font-heading uppercase tracking-wide text-sm
  "
>
  Technical <Badge className="ml-2 bg-gat-blue/10 text-gat-blue text-xs">18</Badge>
</TabsTrigger>
```

Category color coding (top accent bar on cards):
```
Technical  → gat-blue    #2362ec
Cultural   → gat-gold    #f3c317
Workshop   → gat-navy    #1a3a8b
Gaming     → gat-cobalt  #0a3096
Sports     → gat-dark-gold #9a8531
```

#### Event Card Design
```tsx
<Card className="
  group relative bg-white border border-gat-blue/10 rounded-xl overflow-hidden
  shadow-card hover:shadow-card-hover hover:-translate-y-1
  transition-all duration-300 cursor-pointer
">
  {/* Category color bar — 3px top accent */}
  <div className="h-[3px] w-full" style={{ background: CATEGORY_COLOR[event.category] }} />

  <div className="p-5">
    {/* Row 1: Badges */}
    <div className="flex gap-2 mb-3">
      <Badge className="bg-gat-blue/8 text-gat-blue border-0 text-xs font-heading uppercase tracking-wide">
        {event.category}
      </Badge>
      <Badge variant="outline" className="border-gat-steel/30 text-gat-steel text-xs">
        {event.type === 'team' ? `Team (${event.teamSize.min}-${event.teamSize.max})` : 'Solo'}
      </Badge>
    </div>

    {/* Row 2: Event Name */}
    <h3 className="font-heading text-lg font-bold text-gat-midnight group-hover:text-gat-blue
                   transition-colors leading-tight mb-2 line-clamp-2">
      {event.name}
    </h3>

    {/* Row 3: Short desc */}
    <p className="text-sm text-gat-steel line-clamp-2 mb-4 font-body">
      {event.shortDesc}
    </p>

    {/* Row 4: Footer metadata */}
    <div className="flex items-center justify-between pt-3 border-t border-gat-blue/8">
      {/* Prize */}
      <div className="flex items-center gap-1">
        <TrophyIcon className="w-3.5 h-3.5 text-gat-gold" />
        <span className="font-mono text-sm font-bold text-gat-dark-gold">
          ₹{event.prize.first.toLocaleString()}
        </span>
      </div>
      {/* Day pill */}
      <span className="text-xs bg-gat-navy/8 text-gat-navy px-2 py-0.5 rounded-full font-heading">
        Day {event.day}
      </span>
    </div>
  </div>

  {/* Hover slide-up action */}
  <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0
                  transition-transform duration-300 bg-gat-blue p-3">
    <Button size="sm" variant="ghost" className="w-full text-white hover:text-gat-gold text-sm">
      View Details →
    </Button>
  </div>
</Card>
```

**Grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5`

#### Global Search (Cmd+K)
```tsx
// shadcn Command inside Dialog
// Input border: gat-blue, focus ring: gat-blue
// Group headers: Rajdhani uppercase, gat-navy
// Each result: name (charcoal) + category badge + prize (dark-gold, mono)
// Selected item highlight: gat-blue/8 bg, gat-blue left border
// Keyboard navigation with ↑↓ arrows
```

### 4. Individual Event Page
```
[← Events]                                  [Share] [Register →]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Technical] [Team 2-4] [Day 2]  [Dept: CSE]

EVENT NAME IN RAJDHANI BOLD 4XL MIDNIGHT
Organized by Department of Computer Science & Engineering

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────┬─────────────────────────────────────────┐
│  🏆 Prize Pool       │   About This Event                      │
│  ───────────        │   [Accordion: Description]               │
│  1st: ₹5,000 🥇     │   [Accordion: Rules & Format]           │
│  2nd: ₹3,000 🥈     │   [Accordion: Judging Criteria]         │
│  3rd: ₹1,000 🥉     │   [Accordion: Contact Coordinators]     │
│                     │                                         │
│  📊 Registration     │   Event Schedule                        │
│  28/40 seats filled │   Reporting: 9:00 AM, Venue Hall A      │
│  [Progress bar]     │   Round 1:   9:30 AM – 11:00 AM         │
│                     │   Break:     11:00 AM – 11:30 AM        │
│  ⏰ Closes in 3 days │   Final:     11:30 AM – 1:30 PM        │
│                     │                                         │
│  [Register Now →]   │   Coordinators                          │
│  bg-gat-gold,       │   [HoverCard: name, phone, email]       │
│  text-midnight,     │                                         │
│  bold, full-width   │                                         │
└─────────────────────┴─────────────────────────────────────────┘

You Might Also Like:
[EventCard] [EventCard] [EventCard]   ← same category
```

Prize styling:
```tsx
// 1st place: gat-gold bg chip, gat-midnight text, font-mono
// 2nd place: gat-steel bg chip, white text, font-mono
// 3rd place: gat-dark-gold/20 bg chip, gat-dark-gold text, font-mono
```

Progress bar:
```tsx
<Progress 
  value={(registered / limit) * 100}
  className="h-2 bg-gat-steel/20 [&>div]:bg-gat-blue"
/>
// Turns red-warning when > 80%: [&>div]:bg-red-500
```

### 5. Schedule / Timeline Page
```tsx
// White bg, Rajdhani section header
// View toggle (3 modes): Day View | Timeline | Grid
//   → Day View: vertical tab for Day1/Day2/Day3, events in time-sorted cards below
//   → Timeline: vertical neon line (gat-blue), event nodes alternating left/right
//   → Grid: same card grid as browse page but time-sorted

// Timeline node:
<div className="relative flex items-start gap-6">
  <div className="flex flex-col items-center">
    <div className="w-3 h-3 rounded-full bg-gat-gold border-2 border-gat-blue" />
    <div className="w-px h-full bg-gat-blue/20" />   // connector line
  </div>
  <EventCard compact />
</div>

// "Save to My Schedule" button: ghost, gat-navy border
// Saved state: filled gat-navy bg, white text, checkmark
// Conflict warning: red badge "Overlaps with [Event Name]"
```

### 6. Landing Page — Sections Below Hero

**All sections: white or off-white backgrounds**

```
SECTION 1: STATS COUNTER
  bg-gat-midnight | white text | gold numbers
  [50+ Events] [3 Days] [1000+ Participants] [₹2L+ Prize Pool]
  → Animated count-up on IntersectionObserver entry
  → Gold underline on each stat block
  → This is the ONLY other dark-bg section besides hero

SECTION 2: FEATURED EVENTS
  bg-white | embla-carousel
  "Don't Miss These" — Rajdhani H2, gat-midnight
  3–5 hero event cards, larger format with poster image
  Auto-scroll, pause on hover

SECTION 3: EVENT CATEGORIES
  bg-gat-off-white | 5 category tiles in a grid
  Each tile: icon + category name + event count
  Hover: lifts with shadow-blue, border turns gat-blue
  Click: navigates to /events?category=X

SECTION 4: SCHEDULE TEASER
  bg-white | 2-col layout
  Left: "3 Days. 52 Events. Choose Your Adventure." copy
  Right: Day 1/2/3 accordion preview with top 3 events per day

SECTION 6: GLIMPSES
  bg-white | masonry photo grid or horizontal scroll
  Previous year fest photos
  Grid: 3 cols desktop, 2 cols mobile, 1 col small

SECTION 7: FOOTER
  bg-gat-midnight | white/steel text
  [GAT Logo white] [Fest Name in gat-gold]
  4-col grid: Quick Links | Events | Connect | Contact
  Social icons: gat-steel, hover→gat-gold
  Bottom bar: © 2025 GAT | Developed by [Club Name] with ♥
```

---

## 📱 Mobile UX Rules

### Bottom Navigation Bar (mobile only, ≤768px)
```tsx
<nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gat-blue/10 
                flex items-center justify-around h-16 px-2 safe-area-pb">
  {/* Icons: Home | Events | Schedule | Register */}
  {/* Active: gat-blue icon + label, gat-blue/8 pill bg */}
  {/* Inactive: gat-steel icon, no label */}
</nav>
// Add pb-16 to main content wrapper on mobile
```

### Mobile Event Browsing
- Category tabs: horizontal scroll, no wrap, `overflow-x-auto scrollbar-none`
- Event grid: single column with compact cards (horizontal layout: left color bar, text right)
- Filters: floating FAB button (gat-blue, white filter icon, filter count badge in gat-gold)
- FAB triggers a bottom Sheet with all filter options
- Search: full-screen overlay on tap

### Mobile Cards (list view on small screens)
```tsx
// Compact horizontal card
<div className="flex gap-3 p-3 bg-white border border-gat-blue/10 rounded-xl">
  <div className="w-1 rounded-full self-stretch" style={{ background: CATEGORY_COLOR }} />
  <div className="flex-1 min-w-0">
    <h4 className="font-heading font-bold text-gat-midnight text-sm truncate">{name}</h4>
    <p className="text-gat-steel text-xs line-clamp-1">{shortDesc}</p>
    <div className="flex gap-2 mt-1">
      <Badge tiny>{category}</Badge>
      <span className="font-mono text-gat-dark-gold text-xs">₹{prize}</span>
    </div>
  </div>
  <ChevronRight className="w-4 h-4 text-gat-steel self-center flex-shrink-0" />
</div>
```

---

## ⚡ Performance Guidelines

### Images
```tsx
<Image
  src={event.poster}
  alt={event.name}
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  placeholder="blur"
  blurDataURL={event.blurHash}
/>
// All posters: WebP, max 400KB, 800×600px max
// Hero: AVIF preferred, priority={true}
```

### Data & Rendering
```tsx
// Event list page: RSC, no client data fetching
// Static params for all 50+ event pages:
export async function generateStaticParams() {
  return events.map(e => ({ slug: e.slug }))
}
// ISR: revalidate registration counts every 60s
export const revalidate = 60

// Virtualize if rendering 50+ cards at once (default: show 12, load more)
// import { useVirtualizer } from '@tanstack/react-virtual'
```

### Event Data TypeScript Interface
```ts
interface Event {
  id:                string
  slug:              string
  name:              string
  shortDesc:         string
  fullDesc:          string
  category:          'technical' | 'cultural' | 'workshop' | 'gaming' | 'sports'
  type:              'solo' | 'team' | 'group'
  teamSize?:         { min: number; max: number }
  department:        string
  day:               1 | 2 | 3
  venue:             string
  startTime:         string   // "09:00"
  endTime:           string   // "11:00"
  prize:             { first: number; second?: number; third?: number }
  registrationLimit: number
  registeredCount:   number
  registrationUrl?:  string
  coordinators:      { name: string; phone: string; email: string }[]
  rules:             string[]
  poster?:           string   // path or URL
  blurHash?:         string
  tags:              string[]
  isFeatured?:       boolean
}
```

### Bundle
- `dynamic(() => import(...))` for heavy components (Command palette, gallery)
- Route-based splitting is automatic in App Router
- `@tanstack/react-virtual` for large unvirtualized lists

---

## 🎬 Animation System

### Entry Animations (Framer Motion)
```tsx
// Staggered grid entry — use on events grid
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } }
}
const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
}

<motion.div variants={container} initial="hidden" animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
  {events.map(e => (
    <motion.div key={e.id} variants={cardVariant}>
      <EventCard event={e} />
    </motion.div>
  ))}
</motion.div>
```

### Section Reveal (Intersection Observer, CSS only)
```tsx
// Use data-animate attribute + CSS:
// [data-animate] { opacity: 0; transform: translateY(24px); transition: 0.6s ease; }
// [data-animate].in-view { opacity: 1; transform: none; }
// Observer adds .in-view class on entry
```

### Count-up Numbers
```tsx
// For stats section
function CountUp({ to, duration = 1500 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(easeOut(progress) * to))
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [to, duration])
  return <span>{count}</span>
}
```

### Gold Shimmer (for prize amounts, featured badges)
```css
.shimmer {
  background: linear-gradient(90deg, #9a8531 0%, #f3c317 50%, #9a8531 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite;
}
```

### Card Hover
```css
.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(35, 98, 236, 0.15);
}
.event-card:hover .card-title {
  color: #2362ec; /* gat-blue */
}
```

---

## 🗂️ 50+ Events — Organization Strategy

### Category Colors (consistent everywhere)
| Category | Color Token | Hex | Icon |
|---|---|---|---|
| Technical | `gat-blue` | `#2362ec` | `<Code2>` |
| Cultural | `gat-gold` | `#f3c317` | `<Music>` |
| Workshop | `gat-navy` | `#1a3a8b` | `<Wrench>` |
| Gaming | `gat-cobalt` | `#0a3096` | `<Gamepad2>` |
| Sports | `gat-dark-gold` | `#9a8531` | `<Trophy>` |

### UX Discovery Hierarchy
1. **Cmd+K Search** — instant, keyboard-first, always accessible
2. **Category Tabs** — visual, color-coded, shows count per category
3. **Sidebar Filters** — day / team type / prize tier / department
4. **Featured Pins** — 3–5 marquee events shown above grid always
5. **Sort** — Featured | Prize High–Low | Registration Closing Soon | A–Z

### Preventing Overwhelm
- Default: show **12 cards**, "Load 12 more" button at bottom (not infinite scroll)
- Card scan time target: **< 3 seconds** (name → category → prize → type)
- Always show active filter chips at top of grid with × to remove each
- "No results" empty state: illustration + "Try clearing filters" CTA

---

## ✅ Pre-Launch Checklist
- [ ] All 8 brand colors verified against palette image
- [ ] White background confirmed on every page except hero + stats strip
- [ ] Lighthouse: Performance >90 | Accessibility >85 | SEO >90
- [ ] All 50+ events have `generateStaticParams` slug pages
- [ ] Cmd+K search indexes all events
- [ ] Mobile bottom nav tested on iOS Safari + Android Chrome
- [ ] `opengraph-image.tsx` per event (gat-midnight bg, gold title, blue accents)
- [ ] `robots.txt` + `sitemap.xml` generated
- [ ] Skeleton loading on all async data
- [ ] Registration links → `/register/[slug]` or external form
- [ ] Color contrast: body text ≥ 4.5:1 on white (charcoal #353636 passes ✓)
- [ ] `gat-gold #f3c317` NOT used as text on white — use `gat-dark-gold #9a8531` instead
- [ ] Fonts loaded via `next/font/google` — Playfair Display + Rajdhani + DM Sans + JetBrains Mono

---

## 🚫 Anti-Patterns — Never Do These
- ❌ Dark backgrounds on any page except hero and stats strip
- ❌ Neon colors (cyan, lime, magenta) — incompatible with this palette
- ❌ `gat-gold #f3c317` as text on white — it fails WCAG contrast
- ❌ Inter, Roboto, Arial as the heading font
- ❌ Purple gradients — nothing in this palette is purple
- ❌ Unstyled shadcn components without CSS variable theming
- ❌ Dumping all 50+ events in a flat uncategorized list
- ❌ Missing skeletons/loading states on event grid
- ❌ Mobile with no filter access (must have FAB or sheet)
- ❌ Animations on every scroll tick (IntersectionObserver only)
- ❌ Autoplay video backgrounds
- ❌ Inventing new colors outside the 8-color palette

---

*This SKILL.md is purpose-built for Global Academy of Technology's Techno-Cultural Fest.*
*Palette extracted directly from official brand palette image.*
*Every decision balances institutional authority (navy/midnight) with festive energy (gold/blue) on a clean white canvas.*
