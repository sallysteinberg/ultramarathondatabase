import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Ultra Marathon Database — The Definitive Ultra Race Directory",
    template: "%s | Ultra Marathon Database",
  },
  description:
    "Comprehensive directory of ultra marathon races worldwide. Find 50K, 100K, 100-mile, and backyard ultras with results, registration info, course details, and more.",
  keywords: [
    "ultra marathon",
    "ultramarathon",
    "100 mile race",
    "50k race",
    "trail running",
    "ultra race directory",
  ],
  metadataBase: new URL("https://ultramarathondatabase.com"),
  openGraph: {
    title: "Ultra Marathon Database",
    description: "The definitive directory of ultra marathon races worldwide.",
    url: "https://ultramarathondatabase.com",
    siteName: "Ultra Marathon Database",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-zinc-950 text-zinc-100 min-h-screen`}
      >
        {/* Navigation */}
        <nav className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <a href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white">
                  Ultra Marathon
                  <span className="text-amber-500">DB</span>
                </span>
              </a>
              <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
                <a href="/races" className="hover:text-white transition-colors">
                  All Races
                </a>
                <a
                  href="/races/distance/100-mile"
                  className="hover:text-white transition-colors"
                >
                  100 Milers
                </a>
                <a
                  href="/races/distance/50k"
                  className="hover:text-white transition-colors"
                >
                  50K
                </a>
                <a
                  href="/races/country/united-states"
                  className="hover:text-white transition-colors"
                >
                  US Races
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-zinc-800/60 mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-lg font-bold text-white mb-2">
                  Ultra Marathon<span className="text-amber-500">DB</span>
                </h3>
                <p className="text-zinc-500 text-sm max-w-md">
                  The definitive directory of ultra marathon races worldwide.
                  Researched, organized, and built for the ultrarunning
                  community.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-300 mb-3">
                  Browse
                </h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li>
                    <a
                      href="/races"
                      className="hover:text-zinc-300 transition-colors"
                    >
                      All Races
                    </a>
                  </li>
                  <li>
                    <a
                      href="/races/distance/100-mile"
                      className="hover:text-zinc-300 transition-colors"
                    >
                      100 Mile Races
                    </a>
                  </li>
                  <li>
                    <a
                      href="/races/distance/50k"
                      className="hover:text-zinc-300 transition-colors"
                    >
                      50K Races
                    </a>
                  </li>
                  <li>
                    <a
                      href="/races/country/united-states"
                      className="hover:text-zinc-300 transition-colors"
                    >
                      US Races
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-300 mb-3">
                  About
                </h4>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li>
                    <a
                      href="/about"
                      className="hover:text-zinc-300 transition-colors"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="hover:text-zinc-300 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-zinc-800/60 text-center text-xs text-zinc-600">
              © {new Date().getFullYear()} ultramarathondatabase.com — All
              rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
