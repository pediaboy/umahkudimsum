import type { Metadata, Viewport } from "next";
import { Sora, Manrope, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});
const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://umahkudimsum.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "UMAHKUDIMSUM — Produsen & Supplier Dimsum Jabodetabek",
    template: "%s | UMAHKUDIMSUM",
  },
  description:
    "UMAHKUDIMSUM — produsen dan supplier dimsum halal untuk Jabodetabek. Dimsum ayam, mentai, dan goreng dengan bahan pilihan. Melayani eceran, reseller, katering, dan hampers.",
  keywords: [
    "dimsum halal", "supplier dimsum", "produsen dimsum", "dimsum Jabodetabek",
    "dimsum Jagakarsa", "dimsum Beji", "umahkudimsum", "hampers dimsum",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "UMAHKUDIMSUM",
    title: "UMAHKUDIMSUM — Produsen & Supplier Dimsum Jabodetabek",
    description:
      "Authentic · Good Quality · Best Ingredients. Dimsum halal buatan sendiri untuk keluarga, reseller, dan acara.",
    images: [{ url: "/brand/product-ayam-web.jpg", width: 720, height: 719, alt: "Dimsum Ayam UMAHKUDIMSUM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "UMAHKUDIMSUM — Produsen & Supplier Dimsum Jabodetabek",
    description: "Authentic · Good Quality · Best Ingredients.",
    images: ["/brand/product-ayam-web.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/brand/logo-mark.png", apple: "/brand/logo-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#d81f26",
  width: "device-width",
  initialScale: 1,
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "UMAHKUDIMSUM",
  description:
    "Produsen dan supplier dimsum halal di Jabodetabek. Dimsum ayam, mentai, dan goreng dengan bahan pilihan.",
  servesCuisine: "Dimsum",
  priceRange: "Rp",
  slogan: "Authentic · Good Quality · Best Ingredients",
  url: SITE,
  image: `${SITE}/brand/product-ayam-web.jpg`,
  telephone: "+6287810136622",
  sameAs: ["https://www.instagram.com/umahkudimsum", "https://www.tiktok.com/@umahkudimsum"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "16:00",
      closes: "23:00",
    },
  ],
  department: [
    { "@type": "FoodEstablishment", name: "UMAHKUDIMSUM Cabang 001 — Jagakarsa" },
    { "@type": "FoodEstablishment", name: "UMAHKUDIMSUM Cabang 002 — Food Court Lap. Kukusan Beji" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sora.variable} ${manrope.variable} ${dm.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
