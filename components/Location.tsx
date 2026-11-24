"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { MaskImage, Reveal, SectionHead } from "./ui";
import type { SiteSettings } from "@/lib/types";

export default function Location({ settings }: { settings: SiteSettings }) {
  const hours = [
    { label: "Senin", value: settings.hours_closed || "Tutup" },
    { label: "Selasa – Jumat", value: settings.hours_weekday || "-" },
    { label: "Sabtu – Minggu", value: settings.hours_weekend || "-" },
  ];

  return (
    <section id="lokasi" className="relative overflow-hidden border-t border-gold/12 bg-maroon/30 py-20 md:py-28">
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead index="09" label="Lokasi & Jam" title="Temukan kami." />

            <div className="mt-10 space-y-7">
              <Reveal>
                <div className="flex gap-4">
                  <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold/80" strokeWidth={1.4} />
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.26em] text-gold/60 uppercase">Alamat</p>
                    <p className="mt-1.5 font-display text-[16px] leading-relaxed text-ivory/85">{settings.address}</p>
                    <a
                      href={settings.maps_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block border-b border-gold/40 pb-0.5 font-sans text-[10px] tracking-[0.18em] text-gold uppercase transition-colors hover:border-gold"
                    >
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="flex gap-4">
                  <Clock className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold/80" strokeWidth={1.4} />
                  <div className="w-full">
                    <p className="font-sans text-[9px] tracking-[0.26em] text-gold/60 uppercase">Jam Operasional</p>
                    <dl className="mt-2 max-w-xs">
                      {hours.map((h) => (
                        <div key={h.label} className="flex items-baseline justify-between gap-4 border-b border-gold/10 py-2 last:border-0">
                          <dt className="font-sans text-[12px] text-ivory/55">{h.label}</dt>
                          <dd className="font-display text-[13px] text-ivory/85">{h.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="flex gap-4">
                  <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold/80" strokeWidth={1.4} />
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.26em] text-gold/60 uppercase">Telepon</p>
                    <p className="mt-1.5 font-display text-[16px] text-ivory/85">{settings.phone_display}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <MaskImage
              src="/images/gallery-restaurant.jpg"
              alt="Ruang makan UMAHKUDIMSUM"
              className="aspect-[4/3] w-full lg:aspect-[16/11]"
              sizes="(max-width: 1024px) 100vw, 55vw"
              parallax={18}
            />
            <Reveal delay={0.15}>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gold/15 pt-4">
                <div>
                  <p className="font-sans text-[8px] tracking-[0.24em] text-gold/50 uppercase">Kapasitas</p>
                  <p className="mt-1 font-display text-[15px] text-ivory/85">64 kursi</p>
                </div>
                <div>
                  <p className="font-sans text-[8px] tracking-[0.24em] text-gold/50 uppercase">Ruang</p>
                  <p className="mt-1 font-display text-[15px] text-ivory/85">2 lantai</p>
                </div>
                <div>
                  <p className="font-sans text-[8px] tracking-[0.24em] text-gold/50 uppercase">Parkir</p>
                  <p className="mt-1 font-display text-[15px] text-ivory/85">Tersedia</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
