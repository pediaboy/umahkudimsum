"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { MagneticLink, MaskImage, EASE } from "./ui";
import { waLink } from "@/lib/format";
import type { SiteSettings } from "@/lib/types";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function Hero({ settings }: { settings: SiteSettings }) {
  const reduce = useReducedMotion();
  const tagline = (settings.tagline || "Authentic · Good Quality · Best Ingredients").split("·");

  return (
    <section id="home" className="relative overflow-hidden bg-brand pt-[68px] md:pt-[76px]">
      <div className="wave drift pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 15% 0%, rgba(0,0,0,0.10), transparent 60%)" }}
        aria-hidden
      />

      <div className="shell relative grid items-center gap-10 py-12 md:gap-12 md:py-16 lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:py-20">
        {/* copy */}
        <div className="order-2 lg:order-1">
          <motion.div
            {...(reduce ? {} : fade(0.05))}
            className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-2 backdrop-blur-sm"
          >
            <Star className="h-3.5 w-3.5 fill-sun text-sun" strokeWidth={0} />
            <span className="font-label text-[10px] font-medium tracking-[0.18em] text-white/90 uppercase">
              {settings.subtitle || "Produsen & Supplier Dimsum Jabodetabek"}
            </span>
          </motion.div>

          <h1 className="mt-5 font-display text-[clamp(2.35rem,6.4vw,4.5rem)] leading-[1.02] font-extrabold tracking-tight text-white">
            {reduce ? (
              <>
                Dimsum rumahan,
                <br />
                <span className="text-sun">rasa restoran.</span>
              </>
            ) : (
              <>
                {"Dimsum rumahan,".split(" ").map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}>
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.9, delay: 0.12 + i * 0.07, ease: EASE }}
                    >
                      {w}&nbsp;
                    </motion.span>
                  </span>
                ))}
                <br />
                <span className="text-sun">
                  {"rasa restoran.".split(" ").map((w, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}>
                      <motion.span
                        className="inline-block"
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.9, delay: 0.3 + i * 0.07, ease: EASE }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  ))}
                </span>
              </>
            )}
          </h1>

          <motion.p
            {...(reduce ? {} : fade(0.42))}
            className="mt-5 max-w-md text-[clamp(0.95rem,1.5vw,1.05rem)] leading-relaxed text-white/80"
          >
            Dibuat sendiri setiap hari dengan ayam pilihan dan bahan segar. Halal, tanpa
            pengawet, siap kukus kapan saja untuk keluarga, reseller, dan acara Anda.
          </motion.p>

          <motion.div {...(reduce ? {} : fade(0.52))} className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticLink
              href="#menu"
              className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-7 font-sans text-sm font-bold text-brand shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] transition-colors hover:bg-sun hover:text-ink"
            >
              Explore Menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
            </MagneticLink>
            <MagneticLink
              href={waLink(settings)}
              external
              className="inline-flex min-h-[52px] items-center gap-2 rounded-full border-2 border-white/35 px-7 font-sans text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Order Now
            </MagneticLink>
          </motion.div>

          <motion.div {...(reduce ? {} : fade(0.62))} className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2">
            {tagline.map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sun" aria-hidden />
                <span className="font-label text-[10px] font-medium tracking-[0.16em] text-white/70 uppercase">
                  {t.trim()}
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* product photo */}
        <motion.div
          className="order-1 lg:order-2"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
        >
          <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] bg-white/12" aria-hidden />
            <MaskImage
              src="/brand/product-ayam-web.jpg"
              alt="Dimsum ayam UMAHKUDIMSUM dengan aneka topping"
              priority
              sizes="(max-width: 1024px) 90vw, 46vw"
              className="aspect-square w-full rounded-[1.6rem] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]"
            />
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7, ease: EASE }}
              className="absolute -bottom-4 left-4 flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 shadow-lg sm:left-6"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/10">
                <Star className="h-3.5 w-3.5 fill-brand text-brand" strokeWidth={0} />
              </span>
              <span className="font-sans text-[12px] font-bold text-ink">
                Halal MUI · Sejak 2014
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
