"use client";

import { MaskImage, Reveal, SectionHead } from "./ui";

const SHOTS = [
  { src: "/images/gallery-table.jpg", alt: "Meja panjang berisi aneka dimsum", cls: "md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto" },
  { src: "/images/gallery-hargow2.jpg", alt: "Hakau udang di atas piring putih", cls: "aspect-square" },
  { src: "/images/gallery-baobun.jpg", alt: "Bakpao lembut baru keluar dari kukusan", cls: "aspect-square" },
  { src: "/images/gallery-restaurant.jpg", alt: "Suasana ruang makan UMAHKUDIMSUM", cls: "aspect-[4/3]" },
  { src: "/images/gallery-cheungfun2.jpg", alt: "Cheung fun digulung rapi", cls: "aspect-[4/3]" },
  { src: "/images/gallery-dimsum3.jpg", alt: "Aneka dimsum dalam kantong bambu", cls: "aspect-[4/3] md:col-span-2" },
];

export default function Gallery() {
  return (
    <section id="galeri" className="relative overflow-hidden border-t border-gold/12 bg-ink py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead index="06" label="Galeri" title="Yang tersaji di meja." className="md:max-w-lg" />
          <Reveal delay={0.18}>
            <p className="max-w-xs font-sans text-[11px] leading-relaxed tracking-[0.08em] text-ivory-dim/55 uppercase md:text-right">
              Difoto di dapur dan ruang makan kami sendiri
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-4">
          {SHOTS.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.06} className={s.cls}>
              <MaskImage
                src={s.src}
                alt={s.alt}
                className="h-full w-full"
                sizes="(max-width: 768px) 50vw, 25vw"
                parallax={12}
                imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
