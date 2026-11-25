"use client";

import { MessageCircle, MapPin } from "lucide-react";
import { Logo } from "./ui";
import { waLink, igLink, tiktokLink } from "@/lib/format";
import type { Branch, SiteSettings } from "@/lib/types";

export default function Footer({ settings, branches }: { settings: SiteSettings; branches: Branch[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-12">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <div>
              <p className="font-display text-[15px] font-semibold tracking-tight">UMAHKUDIMSUM</p>
              <p className="mt-0.5 text-[10px] tracking-[0.16em] text-white/45 uppercase">Sejak 2014</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white/60">
            Produsen dan supplier dimsum untuk Jabodetabek. Halal MUI{" "}
            {settings.halal_id ?? ""}.
          </p>
          <div className="mt-5 flex gap-2">
            <a href={waLink(settings)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white hover:text-ink">
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
            </a>
            <a href={igLink(settings)} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white hover:text-ink">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="h-4 w-4" aria-hidden>
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={tiktokLink(settings)} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white hover:text-ink">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                <path d="M16.5 3h-2.6v11.1a2.4 2.4 0 1 1-1.9-2.35V9.1a5 5 0 1 0 4.5 4.98V8.9a6.2 6.2 0 0 0 3.4 1.02V7.3a3.6 3.6 0 0 1-3.4-3.6V3Z" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="Navigasi footer">
          <p className="label text-white/40">Navigasi</p>
          <ul className="mt-3">
            {[
              ["Home", "#atas"],
              ["Our Menu", "#menu"],
              ["About Us", "#tentang"],
              ["Galeri", "#galeri"],
              ["Contact", "#pesan"],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-[44px] items-center text-[13px] text-white/60 transition-colors hover:text-white">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label text-white/40">Cabang</p>
          <ul className="mt-3 space-y-3">
            {branches.map((b) => (
              <li key={b.id} className="flex gap-2 text-[12px] leading-relaxed text-white/60">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-soft" strokeWidth={1.8} />
                <span>
                  <span className="block font-semibold text-white/85">{b.code}</span>
                  {b.name}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[12px] text-white/60">
            {settings.whatsapp_display ?? "0878-1013-6622"}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} UMAHKUDIMSUM. Seluruh hak cipta dilindungi.</p>
          <p>Authentic · Good Quality · Best Ingredients</p>
        </div>
      </div>
    </footer>
  );
}
