"use client";

import { ShieldCheck, Leaf, ChefHat } from "lucide-react";
import Image from "next/image";
import { MaskImage, Reveal, RevealWords, SectionHead } from "./ui";
import type { SiteSettings } from "@/lib/types";

export function BrandIntro({ settings }: { settings: SiteSettings }) {
  return (
    <section id="about" className="relative bg-cream py-16 md:py-24">
      <div className="shell grid items-center gap-10 md:gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <MaskImage
            src="/brand/product-25pcs-web.jpg"
            alt="Dimsum UMAHKUDIMSUM siap kukus dalam kemasan"
            sizes="(max-width: 1024px) 92vw, 44vw"
            parallax={4}
            className="aspect-[4/5] w-full rounded-[1.5rem] sm:aspect-[5/6]"
          />
          <div className="absolute -bottom-5 -right-2 rounded-2xl bg-brand px-5 py-4 text-white shadow-xl sm:right-4 md:px-6 md:py-5">
            <p className="font-display text-2xl font-extrabold leading-none md:text-3xl">2014</p>
            <p className="mt-1.5 font-label text-[9px] tracking-[0.18em] uppercase opacity-80">
              Sejak pertama
            </p>
          </div>
        </div>

        <div>
          <SectionHead
            index="01"
            eyebrow="About Us"
            title="Dimsum yang dibuat sendiri, bukan sekadar dijual."
          />
          <Reveal delay={0.14}>
            <div className="mt-6 space-y-4 text-[clamp(0.95rem,1.4vw,1.03rem)] leading-relaxed text-ink-soft">
              <p>
                UMAHKUDIMSUM lahir dari dapur rumahan di Jagakarsa. Awalnya kami hanya membuat
                dimsum untuk keluarga dan tetangga, sampai pesanan datang lebih cepat daripada
                kemampuan kami mengukus.
              </p>
              <p>
                Hari ini kami menjadi produsen dan supplier dimsum untuk Jabodetabek, melayani
                pembeli eceran, reseller, katering, hingga hampers hari raya. Resepnya tetap sama:
                ayam pilihan, bumbu segar, dan adonan yang kami buat sendiri setiap hari.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-7">
              {[
                { k: "2", v: "Cabang aktif" },
                { k: "100%", v: "Halal MUI" },
                { k: "Harian", v: "Produksi segar" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-[clamp(1.3rem,2.6vw,1.85rem)] font-extrabold text-brand">
                    {s.k}
                  </dt>
                  <dd className="mt-1 font-label text-[10px] tracking-[0.12em] text-ink-soft uppercase">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const POINTS = [
  {
    icon: Leaf,
    title: "Bahan segar, tanpa pengawet",
    body: "Ayam dan sayur dipilih setiap pagi. Tidak ada pengawet tambahan, jadi rasa tetap bersih.",
  },
  {
    icon: ChefHat,
    title: "Dibuat sendiri setiap hari",
    body: "Kulit dan isian dibuat di dapur kami, bukan dibeli jadi. Porsi isi lebih penuh.",
  },
  {
    icon: ShieldCheck,
    title: "Halal & higienis",
    body: "Bersertifikat Halal MUI dan diproduksi dengan standar kebersihan dapur rumahan yang ketat.",
  },
];

export function Quality({ settings }: { settings: SiteSettings }) {
  const halalId = settings.halal_id || "ID31410025036310725";
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="wave-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead
              index="04"
              eyebrow="Quality & Halal"
              title="Kualitas yang bisa Anda telusuri."
              lede="Kami tidak memakai klaim besar. Hanya bahan yang jelas asalnya, dapur yang bersih, dan sertifikat halal yang bisa diverifikasi."
            />
            <Reveal delay={0.16}>
              <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-line bg-cream p-4 pr-6">
                <span className="relative block h-16 w-16 shrink-0">
                  <Image
                    src="/brand/halal.png"
                    alt="Logo Halal Indonesia UMAHKUDIMSUM"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </span>
                <div>
                  <p className="font-label text-[10px] tracking-[0.16em] text-ink-soft uppercase">
                    Halal MUI
                  </p>
                  <p className="mt-1 font-display text-[15px] font-bold text-ink">
                    {halalId}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <ul className="space-y-3">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={0.08 + i * 0.08}>
                <li className="group flex gap-4 rounded-2xl border border-line bg-cream/60 p-5 transition-colors hover:border-brand/30 hover:bg-cream">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/8 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <p.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-[15px] font-bold text-ink">{p.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{p.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
