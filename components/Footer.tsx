"use client";

import { MessageCircle } from "lucide-react";

/* lucide v1 dropped brand glyphs, so the Instagram mark is drawn inline */
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { Seal } from "./ui";
import { waLink } from "@/lib/format";
import type { SiteSettings } from "@/lib/types";

const COLS = [
  {
    title: "Menu",
    links: [
      { label: "Signature", href: "#signature" },
      { label: "Seluruh menu", href: "#menu" },
      { label: "Reservasi", href: "#pesan" },
    ],
  },
  {
    title: "Brand",
    links: [
      { label: "Cerita kami", href: "#cerita" },
      { label: "Bahan & kualitas", href: "#bahan" },
      { label: "Galeri", href: "#galeri" },
    ],
  },
  {
    title: "Kunjungi",
    links: [
      { label: "Lokasi", href: "#lokasi" },
      { label: "Jam buka", href: "#lokasi" },
      { label: "Kontak", href: "#pesan" },
    ],
  },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-ink">
      <div className="absolute inset-0 grain" aria-hidden />

      <div className="shell relative">
        {/* giant wordmark */}
        <div className="border-b border-gold/12 py-12 md:py-16">
          <p className="font-display text-[clamp(2.4rem,12vw,9rem)] leading-[0.86] tracking-[-0.03em] text-ivory/[0.09]">
            UMAHKU
            <span className="text-gold/[0.16]">DIMSUM</span>
          </p>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-12 md:py-14">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <Seal size={46} />
              <div>
                <p className="font-display text-[15px] tracking-[0.18em] text-ivory">
                  UMAHKU<span className="text-gold">DIMSUM</span>
                </p>
                <p className="cjk mt-1 text-[10px] text-gold/50">家點心</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-ivory/50">
              {settings.tagline}
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href={waLink(settings)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp UMAHKUDIMSUM"
                className="flex h-11 w-11 items-center justify-center border border-gold/25 text-gold/80 transition-colors hover:bg-gold hover:text-ink"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={settings.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram UMAHKUDIMSUM"
                className="flex h-11 w-11 items-center justify-center border border-gold/25 text-gold/80 transition-colors hover:bg-gold hover:text-ink"
              >
                <InstagramGlyph className="h-4 w-4" />
              </a>
            </div>
          </div>

          {COLS.map((c) => (
            <nav key={c.title} className="md:col-span-2" aria-label={c.title}>
              <p className="font-sans text-[9px] tracking-[0.26em] text-gold/60 uppercase">{c.title}</p>
              <ul className="mt-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="inline-flex min-h-[44px] items-center font-sans text-[12px] text-ivory/55 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-2">
            <p className="font-sans text-[9px] tracking-[0.26em] text-gold/60 uppercase">Kontak</p>
            <p className="mt-4 font-display text-[14px] leading-relaxed text-ivory/75">{settings.phone_display}</p>
            <p className="mt-2 text-[11px] leading-relaxed text-ivory/45">{settings.address}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-gold/12 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[10px] tracking-[0.14em] text-ivory/35">
            © {new Date().getFullYear()} UMAHKUDIMSUM. Seluruh hak dilindungi.
          </p>
          <p className="font-sans text-[10px] tracking-[0.14em] text-ivory/30">
            Dibuat dengan resep yang tidak diubah.
          </p>
        </div>
      </div>
    </footer>
  );
}
