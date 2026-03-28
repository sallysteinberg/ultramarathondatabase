import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Ultra Marathon Races",
  description:
    "Browse the complete directory of ultra marathon races worldwide. Filter by distance, location, terrain, and more.",
};

export default function RacesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-3">
          All Ultra Marathon Races
        </h1>
        <p className="text-zinc-400 text-lg">
          Browse the complete directory of ultra marathon races worldwide.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {["All", "50K", "50 Mile", "100K", "100 Mile", "200+", "Backyard", "Timed"].map(
          (filter) => (
            <button
              key={filter}
              className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                filter === "All"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                  : "bg-zinc-900/50 border-zinc-800/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Race List Placeholder */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-5 bg-zinc-900/50 border border-zinc-800/60 rounded-xl flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="h-4 w-64 bg-zinc-800 rounded animate-pulse mb-2" />
              <div className="h-3 w-40 bg-zinc-800/50 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-zinc-800/40 rounded-full animate-pulse" />
              <div className="h-6 w-12 bg-zinc-800/40 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-zinc-600 text-sm mt-10">
        Race data is being loaded. Check back soon for the full directory.
      </p>
    </div>
  );
}
