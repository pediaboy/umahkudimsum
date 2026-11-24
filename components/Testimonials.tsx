"use client";

import { Quote } from "lucide-react";
import { Reveal, SectionHead } from "./ui";
import type { Testimonial } from "@/lib/types";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <section className="relative overflow-hidden border-t border-gold/12 bg-maroon/30 py-20 md:py-28">
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="shell relative">
        <SectionHead
          index="07"
          label="Kata Tamu"
          title="Yang kembali, bukan yang sekadar datang."
          align="center"
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-gold/15 bg-gold/15 md:grid-cols-3">
          {items.slice(0, 3).map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1}>
              <figure className="flex h-full flex-col bg-ink/92 p-6 md:p-8">
                <Quote className="h-5 w-5 text-gold/45" strokeWidth={1.4} />
                <blockquote className="mt-5 flex-1 font-display text-[clamp(1.05rem,2vw,1.28rem)] leading-[1.65] text-ivory/85">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-gold/15 pt-4">
                  <p className="font-sans text-[11px] font-medium tracking-[0.16em] text-ivory uppercase">{t.name}</p>
                  {t.role ? (
                    <p className="mt-1 font-sans text-[10px] tracking-[0.1em] text-ivory-dim/55">{t.role}</p>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
