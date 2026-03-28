const distanceCategories = [
  { name: "50K", slug: "50k", description: "The entry point to ultras", count: 0 },
  { name: "50 Mile", slug: "50-mile", description: "The classic half-hundred", count: 0 },
  { name: "100K", slug: "100k", description: "62 miles of grit", count: 0 },
  { name: "100 Mile", slug: "100-mile", description: "The ultimate test", count: 0 },
  { name: "200+ Mile", slug: "200-plus", description: "Beyond the century", count: 0 },
  { name: "Backyard", slug: "backyard", description: "Last person standing", count: 0 },
  { name: "Timed Events", slug: "24-hour", description: "6h to 72h formats", count: 0 },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Ultra Marathon
              <span className="block text-amber-500">Database</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 mb-10 leading-relaxed">
              The definitive directory of ultra marathon races worldwide.
              Distances, results, registration, course details — everything
              you need, researched and organized.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search races by name, location, or distance..."
                  className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Distance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-2">
          Browse by Distance
        </h2>
        <p className="text-zinc-500 mb-8">
          Find your next ultra by distance category
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {distanceCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`/races/distance/${cat.slug}`}
              className="group p-6 bg-zinc-900/50 border border-zinc-800/60 rounded-xl hover:border-amber-500/30 hover:bg-zinc-900 transition-all"
            >
              <h3 className="text-lg font-semibold text-white group-hover:text-amber-500 transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">{cat.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Upcoming Races */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-white mb-2">Upcoming Races</h2>
        <p className="text-zinc-500 mb-8">
          Next ultra marathons on the calendar
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 bg-zinc-900/50 border border-zinc-800/60 rounded-xl"
            >
              <div className="h-3 w-3/4 bg-zinc-800 rounded mb-3 animate-pulse" />
              <div className="h-2 w-1/2 bg-zinc-800/60 rounded mb-4 animate-pulse" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-zinc-800/40 rounded-full animate-pulse" />
                <div className="h-6 w-20 bg-zinc-800/40 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-zinc-600 text-sm mt-6">
          Race data loading soon — check back shortly.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Races", value: "—" },
            { label: "Countries", value: "—" },
            { label: "Distances", value: "7+" },
            { label: "Growing Daily", value: "✓" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-amber-500">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
