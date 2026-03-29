import Link from "next/link";

const distanceCategories = [
  { name: "50K", slug: "50k", sub: "31 miles" },
  { name: "50 Mile", slug: "50-mile", sub: "The classic" },
  { name: "100K", slug: "100k", sub: "62 miles" },
  { name: "100 Mile", slug: "100-mile", sub: "The buckle" },
  { name: "Backyard", slug: "backyard", sub: "Last one standing" },
  { name: "Timed", slug: "24-hour", sub: "Fixed time events" },
];

const upcomingRaces = [
  { name: "Western States 100", location: "Olympic Valley, CA", month: "Jun", day: "28", distance: "100 Mile", status: "closed", slug: "western-states-100" },
  { name: "Hardrock 100", location: "Silverton, CO", month: "Jul", day: "11", distance: "100 Mile", status: "closed", slug: "hardrock-100" },
  { name: "UTMB Mont-Blanc", location: "Chamonix, France", month: "Aug", day: "28", distance: "100 Mile", status: "open", slug: "utmb-mont-blanc" },
];

const recentResults = [
  { name: "Canyons 100K", location: "Foresthill, CA", date: "Apr 26, 2026", distance: "100K", winner: "Jim Walmsley", winTime: "8:14:32", slug: "canyons-100k" },
  { name: "Comrades Marathon", location: "Durban, South Africa", date: "Jun 8, 2026", distance: "56 Mile", winner: "Gerda Steyn", winTime: "5:42:17", slug: "comrades-marathon" },
];

const currentlyLive = [
  { name: "Western States 100", location: "Olympic Valley, CA", distance: "100 Mile", status: "Mile 62 — Foresthill", trackingUrl: "#", slug: "western-states-100" },
];

const popularRaces = [
  { name: "Western States 100", slug: "western-states-100" },
  { name: "UTMB", slug: "utmb-mont-blanc" },
  { name: "Hardrock 100", slug: "hardrock-100" },
  { name: "Barkley Marathons", slug: "barkley-marathons" },
  { name: "Leadville 100", slug: "leadville-100" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center" style={{ padding: "100px 0 72px", background: "#ffffff" }}>
        <div className="max-w-[1120px] mx-auto px-6">
          <h1
            className="text-[48px] sm:text-[52px] font-extrabold leading-[1.1] tracking-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            Every ultra. Every distance.
          </h1>
          <p className="text-lg max-w-[520px] mx-auto mb-10 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Race details, results, live tracking — all in one place.
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {distanceCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/races/distance/${cat.slug}`}
                className="distance-pill p-[24px_20px] rounded-xl text-left"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="text-xl font-bold tracking-tight mb-1" style={{ color: "var(--color-text)" }}>
                  {cat.name}
                </div>
                <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  {cat.sub}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Currently Live */}
      {currentlyLive.length > 0 && (
        <section className="py-16" style={{ background: "#fefce8" }}>
          <div className="max-w-[1120px] mx-auto px-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--color-text)" }}>
                Live Now
              </h2>
            </div>
            {currentlyLive.map((race) => (
              <Link
                key={race.slug}
                href={`/races/${race.slug}/results`}
                className="race-card flex items-center gap-6 p-6 rounded-xl"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="flex-1">
                  <div className="text-xl font-bold tracking-tight mb-1" style={{ color: "var(--color-text)" }}>
                    {race.name}
                  </div>
                  <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {race.location} · {race.distance}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>
                    {race.status}
                  </div>
                  <div className="text-xs font-medium mt-1" style={{ color: "var(--color-accent)" }}>
                    Follow live →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Races */}
      <section className="py-20">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--color-text-secondary)" }}>
              Upcoming Races
            </h2>
            <Link
              href="/calendar"
              className="text-[13px] font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: "var(--color-accent)" }}
            >
              View full calendar →
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
                    background: "rgba(5,150,105,0.03)",
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

      {/* Recent Results */}
      <section className="py-20" style={{ background: "var(--color-bg-alt)" }}>
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--color-text-secondary)" }}>
              Recent Results
            </h2>
            <Link
              href="/races"
              className="text-[13px] font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: "var(--color-accent)" }}
            >
              View all results →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentResults.map((race) => (
              <Link
                key={race.slug}
                href={`/races/${race.slug}/results`}
                className="race-card flex items-center gap-5 p-6 rounded-xl"
                style={{
                  background: "var(--color-bg)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div className="flex-1">
                  <div className="text-[17px] font-bold tracking-tight mb-0.5" style={{ color: "var(--color-text)" }}>
                    {race.name}
                  </div>
                  <div className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    {race.location} · {race.date}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-medium mb-0.5" style={{ color: "var(--color-text-secondary)" }}>Winner</div>
                  <div className="text-sm font-bold" style={{ color: "var(--color-text)" }}>{race.winner}</div>
                  <div className="text-xs font-medium" style={{ color: "var(--color-accent)" }}>{race.winTime}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
