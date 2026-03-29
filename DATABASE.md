# Ultramarathon Database — Database & Research Documentation

> This is the source of truth for database structure, data standards, and the research pipeline.
> Updated as we learn and build.

---

## 1. Database Architecture

### Overview
PostgreSQL on Railway, managed via Prisma ORM. Three tables:

- **Race** — The recurring event (Western States, UTMB). Permanent/slowly-changing data.
- **RaceEdition** — A specific year's instance (Western States 2026). Changes annually.
- **FAQ** — Questions & answers per race for SEO and user value.

### Key Design Decisions

**Why separate Race from RaceEdition?**
A race is an entity that exists across years. Western States has had the same course, same qualifying standards, same general character since 1974. But each year has different dates, different results, different registration windows. Splitting these means:
- Race pages can show permanent info without querying every edition
- We can show historical data (2024 results, 2025 results) on the same race page
- The lifecycle system (upcoming → in progress → completed) lives on the edition, not the race
- Adding a new year is just a new RaceEdition row, not duplicating race data

**Why `distances` is an array:**
Many events offer multiple distances. JFK 50 is a single event but only has 50 Mile. Javelina Jundred has 100K and 100 Mile. Jackpot Ultra has 12-hour, 24-hour, 50-mile, 100K, 100-mile. The array lets one race appear in multiple distance listing pages.

**Why `dataQualityScore`:**
Not all races will have complete data. A brand new race might have just a name, date, and website. An iconic race might have everything including historical results going back decades. The score (0-100) tells us at a glance how complete our data is and helps prioritize research work. This is for internal use, not displayed on the site.

---

## 2. Table Definitions

### Race

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | auto | Primary key |
| slug | String | yes | Unique, URL-safe. See naming rules below. |
| name | String | yes | Full official name: "Western States Endurance Run" |
| shortName | String | no | Common name: "Western States 100" |
| distances | String[] | yes | From standardized set. At least one required. |
| distanceKm | Float | no | Primary/longest distance in km. For sorting. |
| raceType | Enum | yes | TRAIL, ROAD, TRACK, BACKYARD, OTHER |
| terrain | String[] | no | Freeform: "mountain", "technical", "desert", "flat", "road", "mixed" |
| city | String | no | Start city or primary city |
| state | String | no | US states only, display name: "California". Null for international. |
| stateSlug | String | no | URL slug: "california". Auto-derived from state. |
| country | String | yes | Display name: "United States", "France" |
| countrySlug | String | yes | URL slug: "united-states", "france" |
| countryCode | String | yes | ISO 3166-1 alpha-2: "US", "FR" |
| continent | String | no | "North America", "Europe", "Africa", etc. |
| latitude | Float | no | Start location lat |
| longitude | Float | no | Start location lng |
| elevationGainM | Int | no | Total elevation gain in meters |
| elevationLossM | Int | no | Total elevation loss in meters |
| highestPointM | Int | no | Highest point on course in meters |
| courseDescription | Text | no | 2-4 paragraph description of the course |
| courseMapUrl | String | no | URL to course map image or interactive map |
| gpxFileUrl | String | no | URL to downloadable GPX file |
| stravaSegmentUrl | String | no | Strava segment or route URL |
| typicalMonth | Int | no | 1-12. Which month does this race usually happen? |
| yearEstablished | Int | no | First year the race was held |
| maxParticipants | Int | no | Maximum field size |
| qualificationRequired | Boolean | yes | Default false |
| qualificationDetails | Text | no | How to qualify (if required) |
| entryMethod | Enum | yes | OPEN, LOTTERY, QUALIFIER, INVITATION |
| entryFeeUsd | Int | no | Approximate entry fee in USD |
| registrationUrl | String | no | Link to registration |
| organizerName | String | no | Who organizes the race |
| organizerUrl | String | no | Organizer's website |
| officialWebsite | String | no | Race's own website (may differ from organizer) |
| description | Text | no | Unique, researched description. NOT copied from race site. |
| history | Text | no | Brief history of the race |
| notableFacts | String[] | no | Quick facts: "Oldest 100-mile trail race in the US" |
| tags | String[] | no | For internal organization: "iconic", "bucket-list", "mountain" |
| ultrasignupId | String | no | UltraSignup event ID |
| itraId | String | no | ITRA race ID |
| duvId | String | no | DUV event ID |
| utmbIndexId | String | no | UTMB Index ID |
| status | Enum | yes | ACTIVE, DISCONTINUED, HIATUS, UNKNOWN. Default ACTIVE. |
| lastResearched | DateTime | no | When we last verified/updated this data |
| dataQualityScore | Int | no | 0-100. How complete is our data? Internal metric. |
| createdAt | DateTime | auto | |
| updatedAt | DateTime | auto | |

### RaceEdition

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | auto | |
| raceId | UUID FK | yes | References Race |
| year | Int | yes | Unique together with raceId |
| startDate | DateTime | no | When the race starts |
| endDate | DateTime | no | When the race ends (for multi-day) |
| lifecycleStatus | Enum | yes | See lifecycle section below |
| registrationOpens | DateTime | no | |
| registrationCloses | DateTime | no | |
| registrationUrl | String | no | May differ from race-level URL per year |
| entryFee | String | no | Freeform: "$435", "€150", "Free" |
| resultsUrl | String | no | Link to results (UltraSignup, official, etc.) |
| liveTrackingUrl | String | no | Live tracking link |
| liveTrackingProvider | String | no | "LiveTrail", "RaceJoy", "UTMB Live", "MapProgress", etc. |
| resultsSource | String | no | "UltraSignup", "official website", "DUV" |
| numStarters | Int | no | |
| numFinishers | Int | no | |
| winningTime | String | no | "14:46:44" |
| winnerName | String | no | |
| courseRecord | String | no | "14:09:28 — Jim Walmsley (2019)" |
| dnfRate | Float | no | 0.0-1.0. Percentage who didn't finish. |
| editionNotes | Text | no | Anything notable about this year (weather, course changes) |
| lastUpdated | DateTime | auto | |

**Unique constraint:** (raceId, year) — one edition per race per year.

### FAQ

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| id | UUID | auto | |
| raceId | UUID FK | yes | References Race |
| question | String | yes | Natural language question |
| answer | Text | yes | Complete answer |
| category | Enum | yes | GENERAL, REGISTRATION, LOGISTICS, COURSE, RESULTS, TRACKING |
| sortOrder | Int | yes | Display order. Default 0. |

---

## 3. Edition Lifecycle System

Each RaceEdition has a `lifecycleStatus` that drives what the page shows:

```
ANNOUNCED → REGISTRATION_OPEN → REGISTRATION_CLOSED → UPCOMING → IN_PROGRESS → COMPLETED
                                                                                    ↓
                                                               CANCELLED / POSTPONED
```

**How each status affects the page:**

| Status | Results Page Shows | Race Page Shows |
|--------|--------------------|-----------------|
| ANNOUNCED | "Race announced for [year]. Details coming soon." | Next edition date, basic info |
| REGISTRATION_OPEN | "Results will be posted after the race." | Registration link, "Register now" CTA |
| REGISTRATION_CLOSED | "Results will be posted after the race." | "Registration closed. [X] runners entered." |
| UPCOMING | "Follow live on race day: [tracking link if available]" | Countdown to race day, tracking info |
| IN_PROGRESS | "RACE IN PROGRESS — [tracking link]" with live banner | "Happening now!" banner, tracking link |
| COMPLETED | Full results: winner, stats, results link | Results summary, link to full results |
| CANCELLED | "This edition has been cancelled." | Cancellation notice |
| POSTPONED | "This edition has been postponed." | Postponement details |

**Who updates lifecycle status?**
Sally (me) updates this based on:
- Dates: if startDate is today → IN_PROGRESS. If startDate has passed → COMPLETED.
- Research: when I find registration has opened/closed, I update.
- This can eventually be automated with a cron job checking dates.

---

## 4. Data Standardization Rules

### 4.1 Distance Categories

| DB Value | URL Slug | Display Name | Notes |
|----------|----------|-------------|-------|
| 50k | 50k | 50K | |
| 50-mile | 50-mile | 50 Mile | |
| 100k | 100k | 100K | |
| 100-mile | 100-mile | 100 Mile | Covers 100–135 mi (e.g., Badwater 135) |
| 200-plus | 200-plus | 200+ Mile | All 200+ (Moab 240, Bigfoot 200) |
| backyard | backyard | Backyard | Last person standing (~4.167 mi/hr loops) |
| 6-hour | 6-hour | 6 Hour | Timed: run as far as possible |
| 12-hour | 12-hour | 12 Hour | |
| 24-hour | 24-hour | 24 Hour | |
| 48-hour | 48-hour | 48 Hour | |
| 72-hour | 72-hour | 72 Hour | |

**Rules:**
- A race MUST have at least one distance
- Multi-distance events get all applicable distances
- When in doubt about which category, use the one runners commonly use (Badwater 135 → "100-mile" because that's how the community thinks of it)

### 4.2 Slugs

Race slugs:
- Lowercase, hyphenated, no special characters
- Use the commonly known name: `western-states-100` not `western-states-endurance-run`
- Include the distance if it's commonly part of the name: `hardrock-100`, `leadville-100`
- No year in the slug
- Must be globally unique

State slugs:
- Full name, lowercase, hyphenated: `california`, `new-york`, `north-carolina`

Country slugs:
- Full name, lowercase, hyphenated: `united-states`, `france`, `south-africa`

### 4.3 Country Codes

Use ISO 3166-1 alpha-2: US, FR, ES, IT, CH, ZA, JP, AU, GB, etc.

### 4.4 Terrain Tags

Freeform but use consistently from this list:
- `mountain` — significant altitude and climbing
- `technical` — rocky, rooty, scrambles
- `desert` — arid terrain
- `forest` — primarily wooded trails
- `alpine` — above treeline
- `road` — paved sections
- `flat` — minimal elevation change
- `mixed` — combination of terrain types
- `snow` — may involve snow/ice
- `beach` — coastal/sand sections

---

## 5. Research Pipeline

### 5.1 How to Research a Race

For each race, follow this process in order:

**Step 1: Official Sources (highest authority)**
- Find the race's official website
- Get: name, dates, location, distance, registration info, course description, entry fee
- Check social media (Instagram, Facebook) — often more current than the website

**Step 2: Data Aggregators**
- UltraSignup (ultrasignup.com): US races, registration, past results, runner counts
- DUV (statistik.d-u-v.org): International results database, historical data
- ITRA (itra.run): Trail race ratings, performance index
- RunSignUp: Some races use this for registration/results
- UTMB World: UTMB series races

**Step 3: Community Sources**
- iRunFar.com: Race previews, recaps, course descriptions
- UltraRunning Magazine: Features, race calendar
- Reddit r/ultrarunning, r/trailrunning: Runner reports, recent info
- Strava: Course GPX data, segment info

**Step 4: Write Original Content**
- Description: 2-4 paragraphs, unique (NOT copied). Cover what makes this race special, the course character, the community.
- FAQs: 3-5 common questions. Answer from research, not guessing.
- Notable facts: Quick bullet points of interesting things.

**Step 5: Verify & Score**
- Cross-reference dates across 2+ sources
- Check that registration URLs actually work
- Set dataQualityScore based on completeness (see scoring below)
- Set lastResearched to now

### 5.2 Data Quality Scoring

| Score | Meaning | What's filled in |
|-------|---------|-----------------|
| 90-100 | Excellent | All fields complete, description written, FAQs done, course details, multiple editions |
| 70-89 | Good | Core fields complete, description written, at least one edition, some FAQs |
| 50-69 | Adequate | Name, location, dates, distance, website. Basic description. Current edition. |
| 30-49 | Minimal | Name, location, distance, country. Maybe a date. Placeholder description. |
| 0-29 | Stub | Just enough to have a page. Needs research. |

### 5.3 Prioritization Strategy

**Phase 1: Seed races (first 15-20)**
Mix of:
- Iconic races everyone knows (establishes credibility)
- Races happening in the next 4-6 weeks (captures search traffic NOW)
- Variety across distance categories, countries, and terrain types

**Phase 2: Sequential by calendar**
After the seed, add races in chronological order — what's coming up next? This makes the site immediately useful because people searching for an upcoming race will find us.

**Phase 3: Fill the long tail**
Use DUV's database (115K+ events) and UltraSignup as guides to systematically add races, prioritizing:
- Higher-profile races first
- US races (largest English-speaking market) before expanding internationally
- Races with upcoming editions before historical-only races

### 5.4 Research Automation (Future)

Eventually, parts of this can be automated:
- Lifecycle status can be updated automatically based on dates (cron job)
- Race calendars from UltraSignup/DUV can be scraped to discover new races
- Results can be pulled from UltraSignup/DUV after races complete
- But content (descriptions, FAQs) should always be researched and written, not auto-generated

---

## 6. Seed Data Plan

### First Batch: 15 Races

**Iconic (8):**
1. Western States 100 — 100 Mile, trail, California, June
2. UTMB Mont-Blanc — 100 Mile, trail, France, August
3. Hardrock 100 — 100 Mile, trail, Colorado, July
4. Barkley Marathons — 100 Mile, trail, Tennessee, March/April
5. Leadville 100 — 100 Mile, trail, Colorado, August
6. Comrades Marathon — 56 Mile (down run), road, South Africa, June
7. Badwater 135 — 100 Mile (135 mi), road, California, July
8. Marathon des Sables — Stage race, desert, Morocco, April

**Upcoming / Timely (4):**
9. Canyons 100K — 100K, trail, California, April
10. Gorge Waterfalls 100K — 100K, trail, Oregon, April
11. Zion 100 — 100 Mile, trail, Utah, April
12. Run Rabbit Run 100 — 100 Mile, trail, Colorado, September

**Variety (3):**
13. Big's Backyard Ultra — Backyard, Tennessee, October
14. Cocodona 250 — 200+ Mile, trail, Arizona, May
15. Jackpot Ultra — Timed (24h/12h/100M/100K/50M), Nevada, February

Each race gets:
- Full Race record with all available fields
- At least 2026 RaceEdition (and 2025 if results available)
- 3-5 FAQs

---

## 7. Connecting to the Database

### Railway PostgreSQL
- Project: "disciplined-quietude" on Railway
- Service: Postgres (already provisioned)
- Connection: Get DATABASE_URL from Railway dashboard → set as env var

### Migration & Seed Process
```bash
# 1. Get the DATABASE_URL from Railway
# Set it in .env file locally

# 2. Run Prisma migrations
npx prisma migrate dev --name init

# 3. Generate Prisma client
npx prisma generate

# 4. Seed the database
npx tsx prisma/seed.ts

# 5. Verify
npx prisma studio  # Opens visual DB browser
```

### Environment Variables Needed
- `DATABASE_URL` — PostgreSQL connection string from Railway
- Set locally in `.env` for development
- Set in Railway service variables for production

---

## 8. What's NOT in V1

To keep scope manageable, these are explicitly NOT in the first version:
- User accounts / login
- Community features (comments, ratings, reviews)
- Runner profiles / athlete pages
- Nutrition / gear pages
- Blog
- Public API
- Course map embeds (will add in v1.1)
- GPX file downloads (will add in v1.1)
- Automated data scraping (manual research for now)
- Search (will add soon, but initial version uses browse/navigation)
