import Link from "next/link";

const distanceCategories = [
  { name: "50K", slug: "50k", sub: "31 miles", type: "dot", color: "#d95d39" },
  { name: "50 Mile", slug: "50-mile", sub: "The classic", type: "dot", color: "#e07c52" },
  { name: "100K", slug: "100k", sub: "62 miles", type: "dot", color: "#c7522a" },
  {
    name: "100 Mile", slug: "100-mile", sub: "The buckle", type: "icon", iconClass: "pill-100m",
    icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M8 1l1.5 3.5L13 5.5l-2.5 2.5L11 12 8 10.5 5 12l.5-4L3 5.5l3.5-1z"/></svg>,
  },
  {
    name: "200+", slug: "200-plus", sub: "Sleep is optional", type: "icon", iconClass: "pill-200",
    icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M13.5 8.5a5.5 5.5 0 1 1-3-5.2"/><path d="M13.5 3v5.5h-3"/></svg>,
  },
  {
    name: "Backyard", slug: "backyard", sub: "Last one standing", type: "icon", iconClass: "pill-yard",
    icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M2 8a6 6 0 0 1 12 0"/><path d="M14 8a6 6 0 0 1-12 0"/><circle cx="8" cy="8" r="1.5"/></svg>,
  },
  {
    name: "Timed", slug: "24-hour", sub: "Fixed time events", type: "icon", iconClass: "pill-timed",
    icon: <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="8" cy="9" r="5.5"/><path d="M8 6v3l2 1.5"/><path d="M6.5 1.5h3"/><path d="M8 1.5V3"/></svg>,
  },
];

const upcomingRaces = [
  { name: "Western States 100", location: "Olympic Valley, California", month: "Jun", day: "28", distance: "100 Mile", status: "closed", slug: "western-states-100" },
  { name: "Hardrock 100", location: "Silverton, Colorado", month: "Jul", day: "11", distance: "100 Mile", status: "closed", slug: "hardrock-100" },
  { name: "UTMB Mont-Blanc", location: "Chamonix, France", month: "Aug", day: "28", distance: "100 Mile", status: "open", slug: "utmb-mont-blanc" },
];

const popularRaces = [
  { name: "Western States 100", slug: "western-states-100" },
  { name: "UTMB", slug: "utmb-mont-blanc" },
  { name: "Hardrock 100", slug: "hardrock-100" },
  { name: "Barkley Marathons", slug: "barkley-marathons" },
  { name: "Leadville 100", slug: "leadville-100" },
];

const states = [
  "California", "Colorado", "Utah", "Oregon", "Washington", "Arizona",
  "North Carolina", "Tennessee", "Vermont", "Montana",
];

const countries = [
  "United States", "France", "Spain", "Italy",
  "Switzerland", "South Africa", "Japan", "Australia",
];

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-section text-center" style={{ padding: "120px 0 80px" }}>
        <div className="max-w-[1120px] mx-auto px-6">
          <h1
            className="font-serif-display text-[56px] font-normal leading-[1.1] tracking-tight mb-5"
            style={{ color: "var(--color-text)" }}
          >
            Every ultra. Every distance<span className="accent-dot">.</span>
            <br />
            Research any race<span className="accent-dot">.</span>
          </h1>
          <hr className="hero-rule mx-auto mb-5" />
          <p className="text-lg max-w-[520px] mx-auto mb-11 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Race details, results, live tracking, and course info — all in one place.
          </p>

          {/* Search */}
          <div className="max-w-[640px] mx-auto mb-6 relative">
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none"
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ color: "var(--color-text-light)" }}
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search races by name, location, or distance..."
              className="search-input w-full h-[52px] pl-[52px] pr-6 text-base rounded-[10px] outline-none transition-all"
              style={{
                border: "1.5px solid var(--color-border)",
                background: "var(--color-bg)",
                color: "var(--color-text)",
                boxShadow: "var(--shadow-sm)",
              }}
            />
          </div>

          {/* Popular chips */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-[13px]">
            <span className="font-medium mr-1" style={{ color: "var(--color-text-secondary)" }}>Popular:</span>
            {popularRaces.map((race) => (
              <Link
                key={race.slug}
                href={`/races/${race.slug}`}
                className="popular-chip inline-flex items-center py-[5px] px-3 rounded-full text-[13px] font-medium transition-all hover:text-[var(--color-accent)]"
                style={{
                  background: "var(--color-bg-alt)",
                  color: "var(--color-text-body)",
                  border: "1px solid transparent",
                }}
              >
                {race.name}<span className="chip-arrow">&thinsp;→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Distance */}
      <section className="py-20" style={{ background: "var(--color-bg-alt)" }}>
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] mb-7" style={{ color: "var(--color-text-secondary)" }}>
            Browse by Distance
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: "touch" }}>
            {distanceCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/races/distance/${cat.slug}`}
                className="distance-pill flex-shrink-0 min-w-[148px] p-[18px_24px] rounded-xl text-left flex items-start gap-3"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {cat.type === "dot" ? (
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full mt-[7px]"
                    style={{ background: cat.color }}
                  />
                ) : (
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-[1px] ${cat.iconClass}`}
                  >
                    {cat.icon}
                  </span>
                )}
                <div className="flex-1">
                  <div className="text-base font-bold tracking-tight mb-[3px]" style={{ color: "var(--color-text)" }}>
                    {cat.name}
                  </div>
                  <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    {cat.sub}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Races */}
      <section className="py-20">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--color-text-secondary)" }}>
              Upcoming Races
            </h2>
            <Link
              href="/races/month/january"
              className="text-[13px] font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: "var(--color-accent)" }}
            >
              View full calendar
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingRaces.map((race) => (
              <Link
                key={race.slug}
                href={`/races/${race.slug}`}
                className="race-card flex overflow-hidden rounded-[10px] cursor-pointer relative"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  borderTop: "3px solid var(--color-accent)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  className="flex-shrink-0 w-16 flex flex-col items-center justify-start pt-7"
                  style={{
                    borderRight: "1px solid var(--color-border-light)",
                    background: "rgba(217,93,57,0.03)",
                  }}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wide leading-none" style={{ color: "var(--color-accent)" }}>
                    {race.month}
                  </span>
                  <span className="text-2xl font-bold leading-tight tracking-tight" style={{ color: "var(--color-text)" }}>
                    {race.day}
                  </span>
                </div>
                <div className="flex-1 p-[24px_24px_24px_20px] relative">
                  <span className="race-card-arrow absolute bottom-6 right-5 text-lg" style={{ color: "var(--color-text-light)" }}>→</span>
                  <div className="text-[19px] font-bold tracking-tight leading-snug mb-1" style={{ color: "var(--color-text)" }}>
                    {race.name}
                  </div>
                  <div className="text-sm font-medium mb-4" style={{ color: "var(--color-text-secondary)" }}>
                    {race.location}
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-xs font-semibold py-1 px-2.5 rounded-[5px]"
                      style={{
                        background: "var(--color-bg-alt)",
                        color: "var(--color-text-secondary)",
                        border: "1px solid var(--color-border-light)",
                      }}
                    >
                      {race.distance}
                    </span>
                    <span
                      className={`text-xs font-semibold py-1 px-2.5 rounded-full ${race.status === "open" ? "status-open" : "status-closed"}`}
                    >
                      {race.status === "open" ? "Registration Open" : "Registration Closed"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Location */}
      <section className="py-20" style={{ background: "var(--color-bg-alt)" }}>
        <div className="max-w-[1120px] mx-auto px-6">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em] mb-7" style={{ color: "var(--color-text-secondary)" }}>
            Browse by Location
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--color-text-light)" }}>
                By State
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
                {states.map((state) => (
                  <Link
                    key={state}
                    href={`/races/state/${toSlug(state)}`}
                    className="location-link text-[15px] font-medium py-1.5 transition-colors"
                    style={{ color: "var(--color-text-body)" }}
                  >
                    {state}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider mb-5" style={{ color: "var(--color-text-light)" }}>
                By Country
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1.5">
                {countries.map((country) => (
                  <Link
                    key={country}
                    href={`/races/country/${toSlug(country)}`}
                    className="location-link text-[15px] font-medium py-1.5 transition-colors"
                    style={{ color: "var(--color-text-body)" }}
                  >
                    {country}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
