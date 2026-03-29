import type { Metadata } from "next";

type Props = { params: Promise<{ country: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const name = country.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title: `Ultramarathons in ${name}`,
    description: `Browse ultramarathon races in ${name}. Complete directory with distances, dates, and registration info.`,
  };
}

export default async function CountryPage({ params }: Props) {
  const { country } = await params;
  const countryName = country.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-[#111827] mb-3">Ultramarathons in {countryName}</h1>
      <p className="text-[#6b7280] text-lg mb-10">Complete directory of ultra races in {countryName}</p>
      <div className="bg-[#f5f6f7] border border-[#e5e7eb] rounded-xl p-8 text-center">
        <p className="text-[#6b7280]">Race listings for {countryName} are being compiled. Check back soon.</p>
      </div>
    </div>
  );
}
