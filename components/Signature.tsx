"use client";

import { ArrowUpRight } from "lucide-react";
import { MaskImage, Marquee, Reveal, SectionHead } from "./ui";
import { rupiah, waOrderLink } from "@/lib/format";
import type { MenuItem, SiteSettings } from "@/lib/types";

export default function Signature({ items, settings }: { items: MenuItem[]; settings: SiteSettings }) {
  const signature = items.filter((i) => i.is_signature).slice(0, 6);
  if (!signature.length) return null;

  return (
    <section id="signature" className="relative overflow-hidden bg-ink py-20 md:py-28">
      <Marquee
        items={["Siomay", "Hakau", "Xiao Long Bao", "Bakpao Char Siu", "Cheung Fun", "Ceker Tausi"]}
        className="mb-16 md:mb-24"
      />

      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            index="02"
            label="Signature"
            title="Enam yang paling sering dipesan ulang."
            className="md:max-w-xl"
          />
          <Reveal delay={0.2}>
            <p className="max-w-xs font-sans text-[11px] leading-relaxed tracking-[0.1em] text-ivory-dim/60 uppercase md:text-right">
              Digulung tangan setiap pagi
              <br />
              dikukus saat dipesan
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-3">
          {signature.map((item, i) => {
            const featured = i === 0;
            return (
              <Reveal
                key={item.id}
                delay={i * 0.06}
                className={featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
              >
                <article
                  className={`group relative h-full overflow-hidden border border-gold/15 bg-charcoal transition-colors duration-500 hover:border-gold/45 ${
                    featured ? "min-h-[340px] sm:min-h-[420px] lg:min-h-[560px]" : "min-h-[300px] sm:min-h-[320px]"
                  }`}
                >
                  {item.image ? (
                    <MaskImage
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0"
                      imgClassName="transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-maroon to-ink">
                      <span className="font-display text-6xl text-gold/20">{item.name.charAt(0)}</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" aria-hidden />

                  <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3
                          className={`font-display leading-tight text-ivory ${
                            featured ? "text-[clamp(1.5rem,3.4vw,2.5rem)]" : "text-[clamp(1.25rem,2.6vw,1.6rem)]"
                          }`}
                        >
                          {item.name}
                        </h3>
                        {item.description ? (
                          <p
                            className={`mt-2 text-ivory/60 ${
                              featured
                                ? "max-w-md text-[13px] leading-relaxed sm:text-sm"
                                : "line-clamp-2 text-[12px] leading-relaxed"
                            }`}
                          >
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                      <span className="shrink-0 font-display text-[15px] text-gold sm:text-base">{rupiah(item.price)}</span>
                    </div>

                    <a
                      href={waOrderLink(settings, item.name, item.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex w-fit items-center gap-2 border-b border-gold/0 pb-1 font-sans text-[10px] font-medium tracking-[0.24em] text-gold/80 uppercase transition-all duration-300 group-hover:border-gold/60 group-hover:text-gold"
                    >
                      Pesan
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
