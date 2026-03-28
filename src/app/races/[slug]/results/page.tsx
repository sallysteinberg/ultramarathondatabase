import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `${name} Results`,
    description: `Race results and historical data for ${name}.`,
  };
}

export default async function ResultsPage({ params }: Props) {
  const { slug } = await params;
  const raceName = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-2">
        <a href={`/races/${slug}`} className="text-sm text-amber-500 hover:text-amber-400 transition-colors">
          ← Back to {raceName}
        </a>
      </div>
      <h1 className="text-4xl font-extrabold text-white mb-3">{raceName} Results</h1>
      <p className="text-zinc-400 text-lg mb-10">Historical results and race statistics</p>

      <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-8 text-center">
        <p className="text-zinc-500">Results data will be available soon. Check back for historical race results, finishing times, and statistics.</p>
      </div>
    </div>
  );
}
