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
      <section className="relative" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(5,150,105,0.03) 0%, transparent 100%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: "rgba(5,150,105,0.08)", color: "#059669", border: "1px solid rgba(5,150,105,0.2)" }}>
              100 Mile
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: "#f5f7f9", color: "#6b7280", border: "1px solid #e5e7eb" }}>
              Trail
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3" style={{ color: "var(--color-text)" }}>
            {raceName}
          </h1>
          <p className="text-lg flex items-center gap-2" style={{ color: "var(--color-text-secondary)" }}>
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
              className="px-5 py-2.5 font-semibold rounded-lg text-sm transition-colors text-white hover:opacity-90"
              style={{ background: "#059669" }}
            >
              Official Website →
            </a>
            <a
              href="#results"
              className="px-5 py-2.5 font-medium rounded-lg text-sm transition-colors"
              style={{ background: "#f5f7f9", color: "#374151", border: "1px solid #e5e7eb" }}
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
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
                About This Race
              </h2>
              <div className="max-w-none">
                <p className="leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  This is a placeholder description for {raceName}. When
                  populated, this section will contain unique, researched
                  content about the race including its history, course
                  characteristics, what makes it special, and practical
                  information for prospective runners.
                </p>
                <p className="leading-relaxed mt-4" style={{ color: "var(--color-text-secondary)" }}>
                  The course traverses rugged mountain terrain with significant
                  elevation change, testing runners&apos; endurance and technical
                  skill across varied surfaces and conditions.
                </p>
              </div>
            </section>

            {/* Results & Tracking */}
            <section id="results">
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
                Results & Live Tracking
              </h2>
              <div className="rounded-xl p-6" style={{ background: "var(--color-bg-alt)", border: "1px solid var(--color-border)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-secondary)" }}>
                      2026 Edition
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span style={{ color: "var(--color-text-secondary)" }}>Status</span>
                        <span style={{ color: "#059669" }}>Upcoming</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--color-text-secondary)" }}>Starters</span>
                        <span style={{ color: "var(--color-text)" }}>—</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--color-text-secondary)" }}>Finishers</span>
                        <span style={{ color: "var(--color-text)" }}>—</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-secondary)" }}>
                      Quick Links
                    </h3>
                    <div className="space-y-2">
                      <a
                        href="#"
                        className="block text-sm transition-colors hover:text-[#059669]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        → Live Tracking
                      </a>
                      <a
                        href="#"
                        className="block text-sm transition-colors hover:text-[#059669]"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        → Past Results
                      </a>
                      <a
                        href="#"
                        className="block text-sm transition-colors hover:text-[#059669]"
                        style={{ color: "var(--color-text-secondary)" }}
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
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {sampleFaqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-xl"
                    style={{ background: "var(--color-bg-alt)", border: "1px solid var(--color-border)" }}
                  >
                    <summary className="flex items-center justify-between cursor-pointer p-5 font-medium" style={{ color: "var(--color-text)" }}>
                      {faq.question}
                      <svg
                        className="w-5 h-5 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
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
              <div className="rounded-xl p-6" style={{ background: "var(--color-bg-alt)", border: "1px solid var(--color-border)" }}>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--color-text-secondary)" }}>
                  Quick Facts
                </h3>
                <dl className="space-y-3">
                  {quickFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex justify-between text-sm"
                    >
                      <dt style={{ color: "var(--color-text-secondary)" }}>{fact.label}</dt>
                      <dd className="font-medium" style={{ color: "var(--color-text)" }}>
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-4 rounded-xl p-6" style={{ background: "var(--color-bg-alt)", border: "1px solid var(--color-border)" }}>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--color-text-secondary)" }}>
                  Registration
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--color-text-secondary)" }}>
                  Entry fee and registration details will be displayed here when
                  available.
                </p>
                <a
                  href="#"
                  className="block w-full text-center px-4 py-2.5 text-white font-semibold rounded-lg hover:opacity-90 transition-colors text-sm"
                  style={{ background: "#059669" }}
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
