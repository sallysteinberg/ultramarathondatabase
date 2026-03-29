import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Ultramarathon Database — Every ultra. Researched.",
    template: "%s | Ultramarathon Database",
  },
  description:
    "Comprehensive directory of ultramarathon races worldwide. Find 50K, 100K, 100-mile, and backyard ultras with results, registration info, course details, and more.",
  keywords: [
    "ultramarathon",
    "100 mile race",
    "50k race",
    "trail running",
    "ultra race directory",
  ],
  metadataBase: new URL("https://ultramarathondatabase.com"),
  openGraph: {
    title: "Ultramarathon Database",
    description: "The definitive directory of ultramarathon races worldwide.",
    url: "https://ultramarathondatabase.com",
    siteName: "Ultramarathon Database",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSerifDisplay.variable} font-sans antialiased min-h-screen`}
        style={{ color: "var(--color-text-body)", background: "var(--color-bg)" }}
      >
        {/* Navigation */}
        <header className="sticky top-0 z-50" style={{ borderBottom: "1px solid var(--color-border)", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
          <div className="flex items-center justify-between h-[60px] max-w-[1120px] mx-auto px-6">
            <Link href="/" className="text-[17px] font-bold tracking-tight whitespace-nowrap" style={{ color: "var(--color-text)" }}>
              Ultramarathon{" "}
              <span className="font-semibold" style={{ color: "var(--color-accent)" }}>Database</span>
            </Link>
            <nav className="flex items-center gap-7">
              <Link href="/races" className="text-sm font-medium transition-colors hover:text-[var(--color-text)]" style={{ color: "var(--color-text-secondary)" }}>
                Races
              </Link>
              <Link href="/races/month/january" className="text-sm font-medium transition-colors hover:text-[var(--color-text)]" style={{ color: "var(--color-text-secondary)" }}>
                Calendar
              </Link>
              <Link href="/races" className="text-sm font-medium transition-colors hover:text-[var(--color-text)]" style={{ color: "var(--color-text-secondary)" }}>
                Results
              </Link>
              <Link href="/suggest" className="nav-suggest text-[13px] transition-colors hover:text-[var(--color-accent)]" style={{ color: "var(--color-text-light)", borderLeft: "1px solid var(--color-border)", paddingLeft: "28px" }}>
                Suggest an Edit
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer style={{ background: "var(--color-footer)", borderTop: "2px solid var(--color-accent)" }} className="pt-14">
          <div className="max-w-[1120px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 pb-12">
              <div>
                <div className="text-base font-bold text-gray-50 mb-2 tracking-tight">
                  Ultramarathon{" "}
                  <span className="font-semibold" style={{ color: "var(--color-accent)" }}>Database</span>
                </div>
                <div className="text-sm text-gray-400">
                  Built for the ultra community.
                </div>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-4">
                  Navigate
                </h4>
                <div className="flex flex-col gap-2.5">
                  <Link href="/races" className="text-sm text-gray-300 hover:text-[var(--color-accent)] transition-colors">
                    Races
                  </Link>
                  <Link href="/races/month/january" className="text-sm text-gray-300 hover:text-[var(--color-accent)] transition-colors">
                    Calendar
                  </Link>
                  <Link href="/races" className="text-sm text-gray-300 hover:text-[var(--color-accent)] transition-colors">
                    Results
                  </Link>
                </div>
              </div>
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-4">
                  Contribute
                </h4>
                <div className="flex flex-col gap-2.5">
                  <Link href="/suggest" className="text-sm text-gray-300 hover:text-[var(--color-accent)] transition-colors">
                    Suggest an Edit
                  </Link>
                  <Link href="/about" className="text-sm text-gray-300 hover:text-[var(--color-accent)] transition-colors">
                    About
                  </Link>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 py-5 text-center text-[13px] text-gray-500">
              © {new Date().getFullYear()} Ultramarathon Database
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
