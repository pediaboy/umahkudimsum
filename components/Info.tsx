"use client";

import { MapPin, Clock, MessageCircle, Music2 } from "lucide-react";

function Instagram({ className, strokeWidth = 1.8 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { Reveal, SectionHead } from "./ui";
import { waLink, igLink, tiktokLink } from "@/lib/format";
import type { Branch, SiteSettings } from "@/lib/types";

export function Branches({ branches }: { branches: Branch[] }) {
  return (
    <section id="cabang" className="border-t border-line bg-cream py-20 md:py-28">
      <div className="shell">
        <SectionHead label="Cabang" title="Dua titik, satu dapur." />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {branches.map((b, i) => (
            <Reveal as="li" key={b.id} delay={i * 0.06} className="rounded-2xl border border-line bg-white p-6">
              <p className="label text-brand">{b.code}</p>
              <h3 className="mt-3 text-[19px] font-semibold text-ink">{b.name}</h3>
              {b.address ? <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{b.address}</p> : null}
              {b.maps_url ? (
                <a
                  href={b.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[12px] font-semibold text-brand hover:underline"
                >
                  <MapPin className="h-4 w-4" strokeWidth={1.9} />
                  Buka di Google Maps
                </a>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Hours({ settings }: { settings: SiteSettings }) {
  return (
    <section id="jam" className="bg-white py-20 md:py-28">
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
        <SectionHead
          label="Jam buka"
          title="Selasa sampai Minggu, 16.00–23.00."
          lede="Senin kami tutup untuk produksi dan istirahat dapur. Tapi pesanan tetap bisa masuk lewat WhatsApp admin."
        />
        <div className="rounded-2xl border border-line bg-cream p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} />
            <div className="w-full">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <span className="text-[13px] font-semibold text-ink">Selasa – Minggu</span>
                <span className="text-[13px] font-semibold text-brand">16.00 – 23.00</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-3">
                <span className="text-[13px] font-semibold text-ink">Senin</span>
                <span className="text-[13px] text-ink-soft">Tutup</span>
              </div>
              <p className="mt-4 rounded-lg bg-white px-4 py-3 text-[12px] leading-relaxed text-ink-soft">
                Khusus Senin, pesanan tetap dilayani manual lewat WhatsApp admin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Order({ settings }: { settings: SiteSettings }) {
  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.whatsapp_display ?? "0878-1013-6622",
      href: waLink(settings),
      primary: true,
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: `@${settings.instagram ?? "umahkudimsum"}`,
      href: igLink(settings),
    },
    {
      icon: Music2,
      label: "TikTok",
      value: `@${settings.tiktok ?? "umahkudimsum"}`,
      href: tiktokLink(settings),
    },
  ];

  return (
    <section id="pesan" className="relative overflow-hidden bg-brand py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 text-white/[0.06] wave" aria-hidden />
      <div className="shell relative">
        <SectionHead
          label="Order"
          title="Pesan langsung, dibalas admin."
          lede="Untuk pesanan harian, katering, atau hampers, jalur tercepat tetap WhatsApp."
          invert
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex min-h-[92px] items-center gap-4 rounded-xl px-5 py-5 transition-colors ${
                  c.primary
                    ? "bg-white text-brand hover:bg-cream"
                    : "border border-white/25 text-white hover:bg-white/10"
                }`}
              >
                <c.icon className="h-5 w-5 shrink-0" strokeWidth={1.9} />
                <span className="min-w-0">
                  <span className="label block opacity-70">{c.label}</span>
                  <span className="mt-1 block truncate text-[14px] font-semibold">{c.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {settings.linktree ? (
          <p className="mt-8 text-[12px] text-white/70">
            Semua tautan:{" "}
            <a href={settings.linktree} target="_blank" rel="noopener noreferrer" className="font-semibold text-sun hover:underline">
              {settings.linktree.replace(/^https?:\/\//, "")}
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
