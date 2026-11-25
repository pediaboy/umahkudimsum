"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MaskImage, Reveal, SectionHead } from "./ui";
import { waProductLink } from "@/lib/format";
import type { Category, MenuItem, SiteSettings } from "@/lib/types";

function ProductCard({
  item,
  settings,
  index,
}: {
  item: MenuItem;
  settings: SiteSettings;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.07}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_24px_44px_-26px_rgba(35,17,14,0.35)]">
        <div className="relative overflow-hidden">
          <MaskImage
            src={item.image || "/brand/product-ayam-web.jpg"}
            alt={item.name}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw"
            className="aspect-[4/3] w-full"
            imgClassName="transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
          />
          {item.is_signature ? (
            <span className="absolute left-3 top-3 rounded-full bg-sun px-2.5 py-1 font-label text-[9px] font-semibold tracking-[0.12em] text-ink uppercase">
              Signature
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[16px] font-bold leading-snug text-ink">
            {item.name}
          </h3>
          {item.description ? (
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-soft">
              {item.description}
            </p>
          ) : null}

          <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3.5">
            <div>
              <p className="font-label text-[9px] tracking-[0.14em] text-ink-soft/70 uppercase">
                Ukuran
              </p>
              <p className="mt-0.5 font-sans text-[13px] font-bold text-ink">
                {item.size_label || "Tanya admin"}
              </p>
            </div>
            <a
              href={waProductLink(settings, item.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-brand/8 px-4 font-sans text-[12px] font-bold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              Pesan
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Signature({
  items,
  settings,
}: {
  items: MenuItem[];
  settings: SiteSettings;
}) {
  const sig = items.filter((i) => i.is_signature).slice(0, 4);
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead
            index="02"
            eyebrow="Signature Products"
            title="Yang paling sering dipesan."
          />
          <Reveal delay={0.12}>
            <p className="max-w-xs text-[13.5px] leading-relaxed text-ink-soft md:text-right">
              Empat varian favorit pelanggan, dari yang klasik sampai yang penuh keju.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sig.map((item, i) => (
            <ProductCard key={item.id} item={item} settings={settings} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MenuGrid({
  categories,
  items,
  settings,
}: {
  categories: Category[];
  items: MenuItem[];
  settings: SiteSettings;
}) {
  const [active, setActive] = useState<string>("semua");
  const filtered = useMemo(
    () => (active === "semua" ? items : items.filter((i) => i.category_slug === active)),
    [active, items]
  );
  const tabs = [{ slug: "semua", name: "Semua" }, ...categories];

  return (
    <section id="menu" className="bg-white py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="03"
          eyebrow="Our Menu"
          title="Pilih sesuai selera dan kebutuhan."
          lede="Semua dimsum dibuat harian. Untuk pesanan dalam jumlah besar, hubungi admin agar jadwal produksi bisa disiapkan."
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap justify-center gap-2">
            {tabs.map((t) => {
              const on = active === t.slug;
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => setActive(t.slug)}
                  aria-pressed={on}
                  className={`min-h-[44px] rounded-full border px-4 font-sans text-[12.5px] font-bold transition-all duration-200 ${
                    on
                      ? "border-brand bg-brand text-white shadow-[0_10px_22px_-12px_rgba(216,31,38,0.8)]"
                      : "border-line bg-cream text-ink/70 hover:border-brand/30 hover:text-brand"
                  }`}
                >
                  {t.name}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <ProductCard key={item.id} item={item} settings={settings} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
