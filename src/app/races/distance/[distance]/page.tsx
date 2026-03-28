import type { Metadata } from "next";

const distanceLabels: Record<string, string> = {
  "50k": "50K",
  "50-mile": "50 Mile",
  "100k": "100K",
  "100-mile": "100 Mile",
  "200-plus": "200+ Mile",
  backyard: "Backyard",
  "6-hour": "6 Hour",
  "12-hour": "12 Hour",
  "24-hour": "24 Hour",
  "48-hour": "48 Hour",
  "72-hour": "72 Hour",
};

type Props = { params: Promise<{ distance: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { distance } = await params;
  const label = distanceLabels[distance] || distance;
  return {
    title: `${label} Ultra Marathon Races`,
    description: `Browse all ${label} ultra marathon races worldwide. Find registration, results, and course info.`,
  };
}

export default async function DistancePage({ params }: Props) {
  const { distance } = await params;
  const label = distanceLabels[distance] || distance;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-white mb-3">{label} Ultra Marathon Races</h1>
      <p className="text-zinc-400 text-lg mb-10">All {label} ultra marathon races worldwide</p>
      <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-8 text-center">
        <p className="text-zinc-500">{label} race listings are being compiled. Check back soon.</p>
      </div>
    </div>
  );
}
