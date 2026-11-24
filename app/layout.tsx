import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
  preload: true,
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://umahkudimsum.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "UMAHKUDIMSUM — Dimsum Warisan Tionghoa",
    template: "%s · UMAHKUDIMSUM",
  },
  description:
    "UMAHKUDIMSUM — dimsum warisan Tionghoa tiga generasi. Digulung tangan setiap pagi, dikukus saat dipesan. Siomay, hakau, xiao long bao, bakpao char siu.",
  keywords: [
    "dimsum",
    "umahkudimsum",
    "dimsum jakarta",
    "siomay",
    "hakau",
    "bakpao",
    "xiao long bao",
    "restoran tionghoa",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE,
    siteName: "UMAHKUDIMSUM",
    title: "UMAHKUDIMSUM — Dimsum Warisan Tionghoa",
    description:
      "Dimsum warisan Tionghoa tiga generasi. Digulung tangan setiap pagi, dikukus saat dipesan.",
    images: [{ url: "/images/hero.jpg", width: 1920, height: 1080, alt: "Aneka dimsum UMAHKUDIMSUM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UMAHKUDIMSUM — Dimsum Warisan Tionghoa",
    description: "Dimsum warisan Tionghoa tiga generasi. Dikukus saat dipesan.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0706",
  colorScheme: "dark",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "UMAHKUDIMSUM",
  servesCuisine: ["Chinese", "Dim Sum"],
  priceRange: "Rp",
  image: `${SITE}/images/hero.jpg`,
  url: SITE,
  description:
    "Dimsum warisan Tionghoa tiga generasi. Digulung tangan setiap pagi, dikukus saat dipesan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
