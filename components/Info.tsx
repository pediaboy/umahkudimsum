"use client";

import { MapPin, Clock, MessageCircle, ShoppingBag } from "lucide-react";
import { Reveal, SectionHead, MagneticLink } from "./ui";
import { waLink, igLink, tiktokLink } from "@/lib/format";
import type { Branch, SiteSettings } from "@/lib/types";

export function Branches({ branches }: { branches: Branch[] }) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="06"
          eyebrow="Our Branches"
          title="Dua titik, satu dapur."
          lede="Ambil langsung di cabang, atau pesan antar lewat admin WhatsApp."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {branches.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.08}>
              <div className="group flex h-full flex-col rounded-[1.4rem] border border-line bg-cream/60 p-6 transition-colors hover:border-brand/30 hover:bg-cream">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/8 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <MapPin className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span className="font-label text-[10px] tracking-[0.18em] text-ink-soft/60 uppercase">
                    Cabang {b.code}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[17px] font-bold text-ink">{b.name}</h3>
                {b.address ? (
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{b.address}</p>
                ) : null}
                {b.maps_url ? (
                  <a
                    href={b.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-[44px] items-center font-sans text-[12.5px] font-bold text-brand hover:underline"
                  >
                    Buka di Google Maps
                  </a>
                ) : (
                  <p className="mt-4 font-sans text-[12px] text-ink-soft/60">
                    Titik peta menyusul
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Hours({ settings }: { settings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden bg-brand py-16 md:py-24">
      <div className="wave drift pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHead
            index="07"
            eyebrow="Opening Hours"
            title="Kami buka sore sampai malam."
            light
          />
          <Reveal delay={0.14}>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-sun" strokeWidth={2} />
                <div>
                  <p className="font-display text-[17px] font-bold text-white">
                    {settings.hours_weekday || "Selasa – Minggu · 16:00 – 23:00"}
                  </p>
                  <p className="mt-1 font-label text-[10px] tracking-[0.16em] text-white/60 uppercase">
                    Senin tutup
                  </p>
                </div>
              </div>
              <p className="text-[13.5px] leading-relaxed text-white/75">
                {settings.hours_note ||
                  "Senin tutup. Khusus Senin tetap bisa order manual melalui WhatsApp admin."}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="rounded-[1.6rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-8">
            <p className="font-label text-[10px] tracking-[0.2em] text-ink-soft uppercase">
              Order hari ini
            </p>
            <p className="mt-3 font-display text-[clamp(1.25rem,2.6vw,1.7rem)] font-extrabold leading-snug text-ink">
              Pesanan diproses sampai jam 23:00 setiap hari.
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
              Untuk pesanan besar atau hari libur, sebaiknya hubungi admin satu hari
              sebelumnya agar jadwal produksi siap.
            </p>
            <MagneticLink
              href={waLink(settings)}
              external
              className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand px-6 font-sans text-sm font-bold text-white transition-colors hover:bg-brand-deep"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
              Chat Admin WhatsApp
            </MagneticLink>
            <p className="mt-3 text-center font-sans text-[12px] text-ink-soft">
              {settings.whatsapp_display || "0878-1013-6622"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Order({ settings }: { settings: SiteSettings }) {
  const gofood = settings.gofood_url?.trim();
  const channels = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: settings.whatsapp_display || "0878-1013-6622",
      href: waLink(settings),
      primary: true,
    },
    {
      icon: MessageCircle,
      label: "Instagram",
      value: `@${(settings.instagram || "umahkudimsum").replace(/^@/, "")}`,
      href: igLink(settings),
      primary: false,
    },
    {
      icon: MessageCircle,
      label: "TikTok",
      value: `@${(settings.tiktok || "umahkudimsum").replace(/^@/, "")}`,
      href: tiktokLink(settings),
      primary: false,
    },
  ];

  return (
    <section id="contact" className="bg-cream py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="08"
          eyebrow="Order"
          title="Pesan lewat kanal favorit Anda."
          lede="Admin kami aktif pada jam operasional. Untuk pesanan mendesak, WhatsApp adalah jalur tercepat."
          align="center"
        />

        <div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.07}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-full min-h-[112px] flex-col justify-between rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                  c.primary
                    ? "border-brand bg-brand text-white shadow-[0_18px_36px_-20px_rgba(216,31,38,0.8)]"
                    : "border-line bg-white text-ink hover:border-brand/30"
                }`}
              >
                <c.icon className={`h-5 w-5 ${c.primary ? "text-sun" : "text-brand"}`} strokeWidth={2} />
                <div>
                  <p className={`font-label text-[9px] tracking-[0.18em] uppercase ${c.primary ? "text-white/70" : "text-ink-soft"}`}>
                    {c.label}
                  </p>
                  <p className="mt-1 font-display text-[14px] font-bold">{c.value}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {gofood ? (
          <Reveal delay={0.2}>
            <div className="mx-auto mt-3 max-w-3xl">
              <a
                href={gofood}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[64px] items-center justify-center gap-2.5 rounded-2xl border border-line bg-white font-sans text-sm font-bold text-ink transition-colors hover:border-brand/30 hover:text-brand"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={2} />
                Order lewat GoFood
              </a>
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.24}>
          <p className="mx-auto mt-6 max-w-md text-center font-sans text-[12.5px] leading-relaxed text-ink-soft/80">
            {settings.linktree ? (
              <>
                Semua tautan resmi kami ada di{" "}
                <a
                  href={settings.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand hover:underline"
                >
                  msha.ke/umahkudimsum
                </a>
              </>
            ) : null}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
