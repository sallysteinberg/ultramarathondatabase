import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `${name} — Race Info, Results & Registration`,
    description: `Everything you need to know about ${name}. Course details, registration info, results, and FAQs.`,
  };
}

const quickFacts = [
  { label: "Distance", value: "100 Miles" },
  { label: "Elevation Gain", value: "18,000 ft" },
  { label: "Terrain", value: "Trail / Mountain" },
  { label: "Entry", value: "Lottery" },
  { label: "Typical Month", value: "June" },
  { label: "Max Runners", value: "369" },
  { label: "Year Est.", value: "1974" },
  { label: "Country", value: "United States" },
];

const sampleFaqs = [
  {
    question: "How do I enter this race?",
    answer:
      "Entry details vary by race. Check the official website for the most current registration information, lottery dates, and qualification requirements.",
  },
  {
    question: "What is the cutoff time?",
    answer:
      "Cutoff times are set by the race organization and may vary by year. Consult the official race website for current cutoff information.",
  },
  {
    question: "Are pacers allowed?",
    answer:
      "Pacer policies differ between races. Check the official race rules for the most up-to-date policy on pacers, crew access, and aid station support.",
  },
];

export default async function RacePage({ params }: Props) {
  const { slug } = await params;
  const raceName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div>
      {/* Hero */}
      <section className="relative border-b border-zinc-800/60">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">
              100 Mile
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-zinc-800/60 text-zinc-400 border border-zinc-700/40 rounded-full">
              Trail
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
            {raceName}
          </h1>
          <p className="text-lg text-zinc-400 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Olympic Valley, California, United States
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#"
              className="px-5 py-2.5 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors text-sm"
            >
              Official Website →
            </a>
            <a
              href="#results"
              className="px-5 py-2.5 bg-zinc-800 text-zinc-300 font-medium rounded-lg hover:bg-zinc-700 transition-colors text-sm border border-zinc-700/60"
            >
              View Results
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">
                About This Race
              </h2>
              <div className="prose prose-invert prose-zinc max-w-none">
                <p className="text-zinc-400 leading-relaxed">
                  This is a placeholder description for {raceName}. When
                  populated, this section will contain unique, researched
                  content about the race including its history, course
                  characteristics, what makes it special, and practical
                  information for prospective runners.
                </p>
                <p className="text-zinc-400 leading-relaxed mt-4">
                  The course traverses rugged mountain terrain with significant
                  elevation change, testing runners&apos; endurance and technical
                  skill across varied surfaces and conditions.
                </p>
              </div>
            </section>

            {/* Results & Tracking */}
            <section id="results">
              <h2 className="text-xl font-bold text-white mb-4">
                Results & Live Tracking
              </h2>
              <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                      2026 Edition
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Status</span>
                        <span className="text-amber-500">Upcoming</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Starters</span>
                        <span className="text-zinc-300">—</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Finishers</span>
                        <span className="text-zinc-300">—</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                      Quick Links
                    </h3>
                    <div className="space-y-2">
                      <a
                        href="#"
                        className="block text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                      >
                        → Live Tracking
                      </a>
                      <a
                        href="#"
                        className="block text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                      >
                        → Past Results
                      </a>
                      <a
                        href="#"
                        className="block text-sm text-zinc-400 hover:text-amber-500 transition-colors"
                      >
                        → UltraSignup Page
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {sampleFaqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group bg-zinc-900/50 border border-zinc-800/60 rounded-xl"
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 text-white font-medium">
                      {faq.question}
                      <svg
                        className="w-5 h-5 text-zinc-500 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-zinc-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Quick Facts */}
          <div>
            <div className="sticky top-24">
              <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                  Quick Facts
                </h3>
                <dl className="space-y-3">
                  {quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex justify-between text-sm"
                    >
                      <dt className="text-zinc-500">{fact.label}</dt>
                      <dd className="text-zinc-200 font-medium">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-4 bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Registration
                </h3>
                <p className="text-sm text-zinc-500 mb-4">
                  Entry fee and registration details will be displayed here when
                  available.
                </p>
                <a
                  href="#"
                  className="block w-full text-center px-4 py-2.5 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors text-sm"
                >
                  Register →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
