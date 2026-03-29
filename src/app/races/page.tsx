import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Ultramarathon Races",
  description:
    "Browse the complete directory of ultramarathon races worldwide. Filter by distance, location, terrain, and more.",
};

export default function RacesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-[#111827] mb-3">
          All Ultramarathon Races
        </h1>
        <p className="text-[#6b7280] text-lg">
          Browse the complete directory of ultramarathon races worldwide.
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
                  ? "bg-[rgba(217,93,57,0.08)] border-[rgba(217,93,57,0.2)] text-[#d95d39]"
                  : "bg-white border-[#e5e7eb] text-[#6b7280] hover:border-gray-400 hover:text-[#111827]"
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
            className="p-5 bg-white border border-[#e5e7eb] rounded-xl flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
              <div className="h-6 w-12 bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-[#6b7280] text-sm mt-10">
        Race data is being loaded. Check back soon for the full directory.
      </p>
    </div>
  );
}
