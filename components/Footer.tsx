"use client";

import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./ui";
import { waLink, igLink, tiktokLink } from "@/lib/format";
import type { Branch, SiteSettings } from "@/lib/types";

function IgGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TtGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.5 3h-2.6v11.3a2.5 2.5 0 1 1-2-2.45V9.2a5.1 5.1 0 1 0 4.6 5.07V8.9a5.6 5.6 0 0 0 3.4 1.14V7.4a3.1 3.1 0 0 1-3.4-3.1V3Z" />
    </svg>
  );
}

export default function Footer({
  settings,
  branches,
}: {
  settings: SiteSettings;
  branches: Branch[];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="wave pointer-events-none absolute inset-0 opacity-25" aria-hidden />
      <div className="shell relative py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={46} />
              <div>
                <p className="font-display text-[16px] font-extrabold tracking-tight">
                  UMAHKUDIMSUM
                </p>
                <p className="mt-0.5 font-label text-[9px] tracking-[0.16em] text-white/50 uppercase">
                  {settings.subtitle || "Produsen & Supplier Dimsum Jabodetabek"}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[13.5px] leading-relaxed text-white/60">
              {settings.tagline || "Authentic · Good Quality · Best Ingredients"}
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href={waLink(settings)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp UMAHKUDIMSUM"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white/80 transition-colors hover:bg-brand hover:text-white"
              >
                <MessageCircle className="h-4.5 w-4.5" strokeWidth={2} />
              </a>
              <a
                href={igLink(settings)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram UMAHKUDIMSUM"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white/80 transition-colors hover:bg-brand hover:text-white"
              >
                <IgGlyph className="h-4.5 w-4.5" />
              </a>
              <a
                href={tiktokLink(settings)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok UMAHKUDIMSUM"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-white/80 transition-colors hover:bg-brand hover:text-white"
              >
                <TtGlyph className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          <nav aria-label="Navigasi footer">
            <p className="font-label text-[10px] tracking-[0.2em] text-white/40 uppercase">Menu</p>
            <ul className="mt-3">
              {[
                { href: "#home", label: "Home" },
                { href: "#menu", label: "Our Menu" },
                { href: "#about", label: "About Us" },
                { href: "#gallery", label: "Gallery" },
                { href: "#contact", label: "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-[44px] items-center font-sans text-[13px] text-white/60 transition-colors hover:text-sun"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-label text-[10px] tracking-[0.2em] text-white/40 uppercase">Kontak</p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href={waLink(settings)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2.5 font-sans text-[13px] text-white/60 transition-colors hover:text-sun"
                >
                  <Phone className="h-4 w-4 shrink-0" strokeWidth={1.9} />
                  {settings.whatsapp_display || "0878-1013-6622"}
                </a>
              </li>
              {branches.map((b) => (
                <li key={b.id}>
                  <span className="inline-flex min-h-[44px] items-center gap-2.5 font-sans text-[13px] text-white/60">
                    <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.9} />
                    {b.name}
                  </span>
                </li>
              ))}
            </ul>
            {settings.halal_id ? (
              <p className="mt-3 font-label text-[9px] tracking-[0.14em] text-white/35 uppercase">
                Halal MUI {settings.halal_id}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[12px] text-white/40">
            © {year} UMAHKUDIMSUM. Semua hak dilindungi.
          </p>
          <p className="font-label text-[9px] tracking-[0.16em] text-white/30 uppercase">
            Jagakarsa · Kukusan Beji
          </p>
        </div>
      </div>
    </footer>
  );
}
