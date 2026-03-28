# Ultra Marathon Database — Project Document

## Vision
The definitive ultra marathon directory — modern, comprehensive, and optimized for both human search and AI discovery. Fill the gap between DUV's data depth and ITRA's modern UX, while adding live tracking/results aggregation that nobody does well.

**Domain:** ultramarathondatabase.com
**Stack:** Next.js (SSR/SSG), PostgreSQL on Railway
**Hosting:** Railway (GitHub deploy pipeline)
**Repo:** GitHub (sallysteinberg/ultramarathondatabase)
**Target launch:** MVP live by March 30, 2026

---

## URL Structure

```
/                                        → Homepage (search, featured races, upcoming)
/races                                   → Browse all races
/races/[slug]                            → Individual race page (e.g., /races/western-states-100)
/races/[slug]/results                    → Results + live tracking for that race
/races/state/[state]                     → State listing (e.g., /races/state/california)
/races/country/[country]                 → Country listing (e.g., /races/country/france)
/races/distance/[distance]               → Distance listing (e.g., /races/distance/100-mile)
/races/month/[month]                     → Month listing (e.g., /races/month/march)
/calendar                                → Full race calendar view
/calendar/2026                           → Year view
```

### URL Slug Convention
- Lowercase, hyphenated: `western-states-100`, `utmb-mont-blanc`, `barkley-marathons`
- No year in the slug (the race is a recurring entity; year-specific data lives on the page)

### Auto-Generated Listing Pages
Listing pages under /races/state/, /races/country/, /races/distance/, and /races/month/ are **auto-generated from the database**. When a race is added in a new state, country, distance category, or month — the corresponding listing page is created automatically. No hardcoded lists.

This means data consistency is critical — see "Data Standardization" below.

---

## Database Schema

### Race (core entity)

```
race:
  # Identity
  id: string (uuid)
  slug: string (unique, URL-safe)
  name: string ("Western States Endurance Run")
  short_name: string ("Western States 100")
  
  # Classification
  distances: string[] (["100-mile"])  # From standardized set — see Data Standardization
  distance_km: number (161)           # Primary/longest distance in km (for sorting)
  race_type: enum [trail, road, track, backyard, stage, multi-day, other]
  terrain: string[] (["mountain", "technical", "desert"])
  
  # Location
  city: string ("Olympic Valley")
  state: string ("California")          # Display name (null for non-US)
  state_slug: string ("california")     # URL slug (auto-derived)
  country: string ("United States")     # Display name
  country_slug: string ("united-states") # URL slug (auto-derived)
  country_code: string ("US")           # ISO 3166-1 alpha-2
  continent: string ("North America")
  latitude: number
  longitude: number
  
  # Course Details
  elevation_gain_m: number (5500)
  elevation_loss_m: number (7000)
  highest_point_m: number (2670)
  course_description: text
  course_map_url: string
  gpx_file_url: string
  strava_segment_url: string
  
  # Timing
  typical_month: number (6 for June)
  typical_day_of_week: string ("Saturday")
  
  # Event Details
  year_established: number (1974)
  max_participants: number
  qualification_required: boolean
  qualification_details: text
  entry_method: enum [open, lottery, qualifier, invitation]
  entry_fee_usd: number
  registration_url: string
  
  # Organization
  organizer_name: string
  organizer_url: string
  official_website: string
  
  # Content
  description: text (unique, researched description of the race)
  history: text (brief history)
  notable_facts: string[] (["Oldest 100-mile trail race in the US"])
  tags: string[] (["iconic", "mountain", "lottery", "bucket-list"])
  
  # External References
  ultrasignup_id: string
  itra_id: string
  duv_id: string
  utmb_index_id: string
  
  # Meta
  status: enum [active, discontinued, hiatus, unknown]
  last_researched: datetime
  data_quality_score: number (0-100, how complete is our data)
  created_at: datetime
  updated_at: datetime
```

### RaceEdition (year-specific instance)

```
race_edition:
  id: string
  race_id: string (FK → race)
  year: number (2026)
  
  # Dates
  start_date: date ("2026-06-27")
  end_date: date ("2026-06-28")
  
  # Status / Lifecycle
  lifecycle_status: enum [announced, registration_open, registration_closed, upcoming, in_progress, completed, cancelled, postponed]
  
  # Registration
  registration_opens: date
  registration_closes: date
  registration_url: string (may differ per year)
  entry_fee: string ("$435")
  
  # Results & Tracking
  results_url: string
  live_tracking_url: string
  live_tracking_provider: string ("LiveTrail", "RaceJoy", "UTMB Live", "MapProgress")
  results_source: string ("UltraSignup", "official website", "DUV")
  
  # Stats
  num_starters: number
  num_finishers: number
  winning_time: string
  winner_name: string
  course_record: string
  dnf_rate: number
  
  # Content
  edition_notes: text (anything specific to this year — course changes, weather)
  
  # Meta
  last_updated: datetime
```

### FAQ (per race, for SEO)

```
faq:
  id: string
  race_id: string (FK → race)
  question: string ("How do I qualify for Western States 100?")
  answer: text
  category: enum [general, registration, logistics, course, results, tracking]
  sort_order: number
```

---

## Data Standardization

All values that drive listing pages MUST use standardized formats. This ensures auto-generated pages are consistent and don't create duplicates (e.g., "CA" vs "California" vs "california").

### Distances (standardized set)
Distances is an array — a race offering multiple distances gets multiple entries (e.g., a race with 100M and 50M options).

**Current standard options:**

| DB Value    | URL Slug     | Display Name  | Notes                                              |
|-------------|--------------|---------------|----------------------------------------------------|
| 50k         | 50k          | 50K           |                                                    |
| 50-mile     | 50-mile      | 50 Mile       |                                                    |
| 100k        | 100k         | 100K          |                                                    |
| 100-mile    | 100-mile     | 100 Mile      | Covers 100–135 mi (e.g., Badwater 135)             |
| 200-plus    | 200-plus     | 200+ Mile     | All 200+ (Moab 240, Bigfoot 200, AZ Monster 300)  |
| backyard    | backyard     | Backyard      | Last person standing format (~4.167 mi/hr loops)   |
| 6-hour      | 6-hour       | 6 Hour        | Timed: run as far as possible                      |
| 12-hour     | 12-hour      | 12 Hour       | Timed                                              |
| 24-hour     | 24-hour      | 24 Hour       | Timed                                              |
| 48-hour     | 48-hour      | 48 Hour       | Timed                                              |
| 72-hour     | 72-hour      | 72 Hour       | Timed                                              |

A race can have multiple distance tags. Examples:
- Western States 100 → `["100-mile"]`
- Moab 240 → `["200-plus"]`
- Big's Backyard Ultra → `["backyard"]`
- Jackpot Ultra Running Festival → `["24-hour", "12-hour", "100-mile", "100k", "50-mile"]`

New options can be added as needed. When a new option is added, it auto-generates a listing page at /races/distance/[slug].

### States (US)
- Full lowercase name, hyphenated: `california`, `new-york`, `north-carolina`
- Store both `state` (display: "California") and `state_slug` (URL: "california")
- Only US states use the state field; international races leave it null

### Countries
- Full lowercase name, hyphenated: `united-states`, `france`, `south-africa`
- Store both `country` (display: "France") and `country_slug` (URL: "france")

### Months
- Full lowercase name: `january`, `february`, ... `december`
- Derived from `typical_month` field on the Race entity
- Month listings show all races that typically occur in that month (not edition-specific)

### Slugs (race names)
- Lowercase, hyphenated, no special characters
- Use the commonly known name: `western-states-100` not `western-states-endurance-run`
- No year in the slug
- Must be unique across all races

---

## Page Templates

### Race Page (/races/[slug])
1. Hero: Race name, distance badge, location, next date
2. Quick facts grid: distance, elevation, terrain, established, entry method
3. Race description (unique, researched content)
4. Course details: map embed, elevation profile, GPX download
5. Next edition info: date, registration status, entry fee
6. Results & Live Tracking section (lifecycle-aware — see below)
7. History & Notable facts
8. FAQ section (JSON-LD FAQPage)
9. Related races (same state, similar distance, same type)

### Results Page (/races/[slug]/results)
**Lifecycle-aware content:**
- Pre-race (months out): "Results will be posted here after the race. Check back on [date]."
- Pre-race (tracking available): "Follow the race live: [tracking link]. Results will be posted after."
- Race day: "RACE IN PROGRESS — Follow live tracking: [link]"
- Post-race: Full results table/link, winner, stats, DNF rate

### Listing Pages (/races/california, /races/100-mile, etc.)
- Sortable/filterable table of races
- Map view option (for geographic listings)
- SEO intro paragraph unique to each listing
- JSON-LD ItemList

---

## Race Research Methodology

For each race added to the database, follow this research process:

### 1. Primary Sources
- Official race website (authoritative for dates, registration, course)
- Race social media (Instagram, Facebook — often more current)
- Race director communications / newsletters

### 2. Data Sources
- UltraSignup (US races: registration, results, runner counts)
- DUV / statistik.d-u-v.org (international: historical results, performance data)
- ITRA / itra.run (trail races: difficulty rating, performance index)
- UTMB World (UTMB series races: live tracking, results)
- RunSignUp (some races use this for registration/results)

### 3. Community Sources
- iRunFar.com (race coverage, previews, recaps)
- UltraRunning Magazine (features, calendars)
- Runner blogs and race reports (Strava, personal blogs)
- Reddit: r/ultrarunning, r/trailrunning
- Strava segments for course GPX data

### 4. Verification
- Cross-reference dates across multiple sources
- Check for course changes or cancellations
- Verify registration status is current
- Note data confidence level in data_quality_score

### 5. Content Creation
- Write unique race description (NOT copied from official site)
- Research and write FAQ answers
- Identify related races for internal linking

---

## SEO Implementation

### Structured Data (every race page)
- JSON-LD: SportsEvent (race details)
- JSON-LD: FAQPage (race FAQs)
- JSON-LD: BreadcrumbList (navigation)
- JSON-LD: WebSite + SearchAction (homepage)

### Meta Tags Pattern
- Title: "[Race Name] [Year] — [Distance] | Ultra Marathon Database"
- Description: "[Race Name] in [City], [State] — [distance], [elevation]. [One unique fact]. Dates, registration, results, and live tracking."

### Technical SEO
- Server-side rendering (Next.js SSG where possible, SSR for dynamic)
- XML sitemaps split by type (races, listings, results)
- Canonical URLs
- robots.txt allowing all AI crawlers (GPTBot, ClaudeBot, PerplexityBot)
- /llms.txt for AI discoverability
- Clean semantic HTML
- Fast page loads
- Mobile-first design

### AI Discoverability
- /llms.txt with site overview in markdown
- Clean .md-accessible versions of key pages
- Public API for race data (future)
- Allow all AI crawlers
- FAQ content in natural language Q&A format
- JSON-LD structured data on every page

---

## MVP Scope

### Seed Races (Target: 15-20 for MVP)

**Iconic / Well-Known (establish credibility):**
- Western States 100
- UTMB Mont-Blanc
- Hardrock 100
- Barkley Marathons
- Comrades Marathon
- Badwater 135
- Leadville 100
- Marathon des Sables

**Upcoming / Timely (capture search traffic):**
- Races happening in next 2-4 weeks (April 2026)
- Arizona Monster 300 (if timing works)

**Variety (show range):**
- A backyard ultra (Big Dog's Backyard Ultra or similar)
- A stage race
- A 50K (entry point distance)
- An international race outside Europe/US
- A lesser-known gem

### MVP Features
- [x] Individual race pages with full info
- [x] Results/live tracking pages (lifecycle-aware)
- [x] State/country/distance/month listing pages
- [x] JSON-LD structured data
- [x] FAQ sections
- [x] Search functionality
- [x] Mobile-responsive design
- [x] /llms.txt
- [x] XML sitemap
- [ ] Course map embeds (nice to have for v1)
- [ ] GPX downloads (nice to have for v1)
- [ ] Public API (v2)

---

## Tech Stack

- **Framework:** Next.js 14+ (App Router, SSR/SSG)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL on Railway
- **ORM:** Prisma (type-safe queries, migrations, schema management)
- **Hosting:** Railway (GitHub auto-deploy pipeline)
- **Domain:** ultramarathondatabase.com (DNS pointed to Railway)
- **Search:** PostgreSQL full-text search for MVP, Algolia or similar for scale
- **Maps:** Leaflet or Mapbox for course maps (v1.1)
- **Analytics:** Plausible or similar (privacy-first)

### Deploy Pipeline
1. Code pushed to GitHub (sallysteinberg/ultramarathondatabase)
2. Railway watches main branch, auto-deploys on push
3. Railway runs Prisma migrations on deploy
4. Custom domain ultramarathondatabase.com pointed to Railway

---

## Competitive Advantages

1. **Modern UX** — DUV has the data but 1999 design. We have both.
2. **Lifecycle-aware pages** — Content changes based on race status. Nobody does this.
3. **AI-first architecture** — Structured data, llms.txt, semantic HTML from day one.
4. **Programmatic SEO at scale** — Template once, generate hundreds of optimized pages.
5. **Aggregated results/tracking** — One place to find results regardless of source platform.
6. **Maintained by AI** — Sally can continuously research, verify, and update data at a pace humans can't match.
