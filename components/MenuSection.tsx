"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHead } from "./ui";
import { rupiah, waOrderLink } from "@/lib/format";
import type { Category, MenuItem, SiteSettings } from "@/lib/types";

export default function MenuSection({
  categories,
  items,
  settings,
}: {
  categories: Category[];
  items: MenuItem[];
  settings: SiteSettings;
}) {
  const [active, setActive] = useState<string>("semua");
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (active === "semua" ? items : items.filter((i) => i.category_slug === active)),
    [active, items]
  );

  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  function scrollByCards(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  }

  const tabs = [{ slug: "semua", name: "Semua" }, ...categories];

  return (
    <section id="menu" className="relative overflow-hidden border-t border-gold/12 bg-maroon/35 py-20 md:py-28">
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="shell relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            index="03"
            label="Menu"
            title="Jelajahi seluruh meja."
            lede="Geser untuk melihat semuanya. Setiap pesanan dibuat setelah dipesan — bukan dipanaskan ulang."
            className="md:max-w-xl"
          />

          {/* carousel arrows (desktop) */}
          <Reveal delay={0.2}>
            <div className="hidden gap-2 md:flex">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Geser menu ke kiri"
                className="flex h-11 w-11 items-center justify-center border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Geser menu ke kanan"
                className="flex h-11 w-11 items-center justify-center border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </Reveal>
        </div>

        {/* category filter */}
        <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Kategori menu">
          {tabs.map((t) => {
            const on = active === t.slug;
            return (
              <button
                key={t.slug}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(t.slug)}
                className={`shrink-0 border px-4 py-3 font-sans text-[10px] font-medium tracking-[0.18em] uppercase transition-all duration-300 ${
                  on
                    ? "border-gold bg-gold text-ink"
                    : "border-gold/25 text-ivory/60 hover:border-gold/50 hover:text-ivory"
                }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        {/* carousel */}
        <div
          ref={trackRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {filtered.map((item, i) => (
            <article
              key={item.id}
              data-card
              className="group flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden border border-gold/15 bg-ink/70 transition-colors duration-500 hover:border-gold/45 sm:w-[46vw] lg:w-[300px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 300px"
                    quality={78}
                    className="grade object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-maroon to-ink">
                    <span className="font-display text-5xl text-gold/25">{item.name.charAt(0)}</span>
                  </div>
                )}
                <span className="absolute left-3 top-3 bg-ink/80 px-2.5 py-1 font-sans text-[8px] font-medium tracking-[0.2em] text-gold/85 uppercase backdrop-blur-sm">
                  {catName(item.category_slug)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-[17px] leading-snug text-ivory">{item.name}</h3>
                {item.description ? (
                  <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-ivory/55">{item.description}</p>
                ) : null}

                <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                  <span className="font-display text-[15px] text-gold">{rupiah(item.price)}</span>
                  <a
                    href={waOrderLink(settings, item.name, item.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-1.5 border border-gold/35 px-3.5 py-2.5 font-sans text-[9px] font-medium tracking-[0.16em] text-gold uppercase transition-colors hover:bg-gold hover:text-ink"
                  >
                    Pesan
                    <ArrowUpRight className="h-3 w-3" strokeWidth={1.8} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-5 font-sans text-[10px] tracking-[0.16em] text-ivory-dim/45 uppercase md:hidden">
          Geser ke samping untuk melihat menu lainnya
        </p>
      </div>
    </section>
  );
}
