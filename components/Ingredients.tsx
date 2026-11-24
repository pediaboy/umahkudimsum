"use client";

import { Flame, Fish, Leaf, Wheat } from "lucide-react";
import { MaskImage, Reveal, SectionHead } from "./ui";

const PILLARS = [
  {
    icon: Wheat,
    title: "Tepung pilihan",
    body: "Tepung tang mien dan terigu protein tinggi, diimpor terpisah sesuai kebutuhan tiap jenis kulit. Tidak ada pengganti.",
  },
  {
    icon: Fish,
    title: "Udang segar harian",
    body: "Datang setiap pagi, dikupas tangan, tidak pernah dibekukan. Sisa hari ini tidak dipakai besok.",
  },
  {
    icon: Leaf,
    title: "Tanpa pengawet",
    body: "Tidak ada MSG tambahan, tidak ada pewarna. Warna ungu taro datang dari umbinya sendiri.",
  },
  {
    icon: Flame,
    title: "Dikukus saat dipesan",
    body: "Kantong bambu dipanaskan lebih dulu, lalu dimasak delapan menit. Bukan dipanaskan ulang.",
  },
];

export default function Ingredients() {
  return (
    <section id="bahan" className="relative overflow-hidden border-t border-gold/12 bg-maroon/30 py-20 md:py-28">
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="shell relative">
        <SectionHead
          index="05"
          label="Bahan & Kualitas"
          title="Kualitas bukan klaim. Ini daftarnya."
          lede="Empat hal yang tidak pernah kami negosiasikan, sejak gerobak pertama sampai sekarang."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="group h-full bg-ink/90 p-6 transition-colors duration-500 hover:bg-ink md:p-7">
                  <Icon
                    className="h-6 w-6 text-gold/70 transition-colors duration-300 group-hover:text-gold"
                    strokeWidth={1.25}
                  />
                  <h3 className="mt-5 font-display text-[19px] text-ivory">{p.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-[1.75] text-ivory/55">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <MaskImage
              src="/images/gallery-steamer.jpg"
              alt="Kantong bambu bertumpuk siap dikukus"
              className="aspect-[4/3] md:col-span-2 md:aspect-[16/9]"
              sizes="(max-width: 768px) 100vw, 66vw"
              parallax={16}
            />
            <div className="flex flex-col justify-center border border-gold/15 p-6 md:p-8">
              <p className="font-display text-[clamp(1.3rem,2.6vw,1.8rem)] leading-snug italic text-ivory/90">
                &ldquo;Kalau bahannya benar, kamu tidak perlu banyak bumbu untuk menutupinya.&rdquo;
              </p>
              <span className="mt-5 font-sans text-[9px] tracking-[0.26em] text-gold/70 uppercase">
                Kepala Dapur
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
