"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { MaskImage, Reveal, SectionHead } from "./ui";
import { waLink } from "@/lib/format";
import type { Category, MenuItem, SiteSettings } from "@/lib/types";

export function Signature({ items, settings }: { items: MenuItem[]; settings: SiteSettings }) {
  const picks = items.filter((i) => i.is_signature).slice(0, 4);
  if (!picks.length) return null;

  return (
    <section id="signature" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHead
          label="Produk unggulan"
          title="Yang paling sering dipesan ulang."
          lede="Empat varian ini jadi pesanan harian pelanggan kami. Semua tersedia dalam 25 pcs dan 100 pcs."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <a
                href={waLink(settings, p.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="card-media relative aspect-square overflow-hidden rounded-xl bg-cream-deep">
                  <MaskImage
                    src={p.image ?? "/brand/product-ayam-web.jpg"}
                    alt={p.name}
                    className="h-full w-full"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
                  />
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug text-ink">{p.name}</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink-soft">
                  {p.description ?? "Dimsum ayam dengan topping pilihan."}
                </p>
                <p className="mt-3 label text-brand">{p.size_label ?? "25 pcs"}</p>
              </a>
            </Reveal>
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
  const [active, setActive] = useState("semua");
  const list = useMemo(
    () => (active === "semua" ? items : items.filter((i) => i.category_slug === active)),
    [active, items]
  );
  const tabs = [{ slug: "semua", name: "Semua" }, ...categories];

  return (
    <section id="menu" className="border-t border-line bg-cream py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead
            label="Menu"
            title="Semua yang kami produksi."
            lede="Harga menyesuaikan jumlah dan topping. Kirim pesan lewat WhatsApp untuk daftar harga terbaru."
          />
          <div className="rail -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:justify-end md:pb-0">
            {tabs.map((t) => (
              <button
                key={t.slug}
                onClick={() => setActive(t.slug)}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-[12px] font-medium transition-colors ${
                  active === t.slug
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white text-ink-soft hover:border-brand/40 hover:text-ink"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal as="li" key={p.id} delay={Math.min(i, 6) * 0.04}>
              <div className="flex gap-4">
                <div className="card-media relative h-[92px] w-[92px] shrink-0 overflow-hidden rounded-lg bg-cream-deep">
                  <MaskImage
                    src={p.image ?? "/brand/product-ayam-web.jpg"}
                    alt={p.name}
                    className="h-full w-full"
                    sizes="92px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] font-semibold leading-snug text-ink">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-ink-soft">
                    {p.description ?? ""}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="label text-ink-soft">{p.size_label ?? "25 pcs"}</span>
                    <a
                      href={waLink(settings, p.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[40px] items-center gap-1 text-[11px] font-semibold text-brand hover:underline"
                    >
                      Pesan
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
