import type { Metadata } from "next";

type Props = { params: Promise<{ state: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const name = state.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `Ultra Marathons in ${name}`,
    description: `Browse ultra marathon races in ${name}. Find 50K, 100K, 100-mile, and backyard ultras.`,
  };
}

export default async function StatePage({ params }: Props) {
  const { state } = await params;
  const stateName = state.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-white mb-3">Ultra Marathons in {stateName}</h1>
      <p className="text-zinc-400 text-lg mb-10">All ultra marathon races in {stateName}</p>
      <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-8 text-center">
        <p className="text-zinc-500">Race listings for {stateName} are being compiled. Check back soon.</p>
      </div>
    </div>
  );
}
