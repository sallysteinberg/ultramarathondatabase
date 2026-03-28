import type { Metadata } from "next";

const monthNames: Record<string, string> = {
  "1": "January", "2": "February", "3": "March", "4": "April",
  "5": "May", "6": "June", "7": "July", "8": "August",
  "9": "September", "10": "October", "11": "November", "12": "December",
  january: "January", february: "February", march: "March", april: "April",
  may: "May", june: "June", july: "July", august: "August",
  september: "September", october: "October", november: "November", december: "December",
};

type Props = { params: Promise<{ month: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { month } = await params;
  const name = monthNames[month.toLowerCase()] || month;
  return {
    title: `Ultra Marathons in ${name}`,
    description: `Ultra marathon races happening in ${name}. Find upcoming ultras, registration dates, and race details.`,
  };
}

export default async function MonthPage({ params }: Props) {
  const { month } = await params;
  const monthName = monthNames[month.toLowerCase()] || month;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-white mb-3">Ultra Marathons in {monthName}</h1>
      <p className="text-zinc-400 text-lg mb-10">Races typically held in {monthName}</p>
      <div className="bg-zinc-900/50 border border-zinc-800/60 rounded-xl p-8 text-center">
        <p className="text-zinc-500">{monthName} race listings are being compiled. Check back soon.</p>
      </div>
    </div>
  );
}
