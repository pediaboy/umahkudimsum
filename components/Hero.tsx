"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { RevealWords, MagneticLink } from "./ui";
import { waLink } from "@/lib/format";
import type { SiteSettings } from "@/lib/types";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({ settings }: { settings: SiteSettings }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="atas"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-28 md:pb-20"
    >
      {/* cinematic background */}
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: imgY }}>
        <div className="relative h-[118%] w-full">
          <Image
            src="/images/hero.jpg"
            alt="Aneka dimsum dalam kantong bambu, disajikan hangat"
            fill
            priority
            quality={82}
            sizes="100vw"
            className="grade-strong object-cover"
          />
        </div>
      </motion.div>

      {/* grading + legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/45" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_100%,rgba(42,11,14,0.85),transparent_62%)]" aria-hidden />
      <div className="absolute inset-0 grain" aria-hidden />

      {/* vertical side label (desktop) */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 xl:block">
        <span className="block font-sans text-[10px] tracking-[0.5em] text-gold/45 [writing-mode:vertical-rl]">
          LUXURY CHINESE HERITAGE
        </span>
      </div>

      <motion.div className="shell relative z-10 w-full" style={reduce ? undefined : { y: contentY, opacity: fade }}>
        <div className="max-w-4xl">
          {/* eyebrow */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="h-px w-10 bg-gold/60" aria-hidden />
            <span className="eyebrow">Sejak 2014 · Resep Warisan Tionghoa</span>
          </motion.div>

          {/* headline */}
          <h1 className="mt-6 font-display text-[clamp(2.6rem,8.4vw,6.4rem)] leading-[0.94] tracking-[-0.02em] text-ivory">
            <span className="block">
              <RevealWords text="Warisan rasa" />
            </span>
            <span className="mt-1 block italic">
              <RevealWords text="dari dapur" delay={0.12} />
            </span>
            <span className="mt-1 block">
              <span className="gold-text">
                <RevealWords text="Tionghoa." delay={0.24} />
              </span>
            </span>
          </h1>

          {/* lede */}
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            className="mt-7 max-w-md text-[15px] leading-relaxed text-ivory/70 sm:text-base"
          >
            {settings.tagline ||
              "Racikan warisan Tionghoa, disajikan dengan hormat. Digulung tangan setiap pagi, dikukus saat dipesan."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.66, ease: EASE }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticLink
              href={waLink(settings)}
              className="group inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 font-sans text-[11px] font-medium tracking-[0.22em] text-ink uppercase transition-colors duration-300 hover:bg-gold-light"
            >
              Pesan Sekarang
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.6} />
            </MagneticLink>
            <MagneticLink
              href="#menu"
              className="group inline-flex items-center justify-center gap-3 border border-ivory/25 px-8 py-4 font-sans text-[11px] font-medium tracking-[0.22em] text-ivory uppercase transition-colors duration-300 hover:border-gold/60 hover:text-gold"
            >
              Lihat Menu
              <span className="text-gold/70">→</span>
            </MagneticLink>
          </motion.div>
        </div>

        {/* bottom meta strip */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-14 grid grid-cols-1 gap-5 border-t border-gold/15 pt-6 sm:grid-cols-3 sm:gap-8"
        >
          <div>
            <p className="font-sans text-[9px] tracking-[0.3em] text-gold/60 uppercase">Jam Buka</p>
            <p className="mt-1.5 font-display text-[15px] text-ivory/85">{settings.hours_weekday}</p>
          </div>
          <div>
            <p className="font-sans text-[9px] tracking-[0.3em] text-gold/60 uppercase">Lokasi</p>
            <p className="mt-1.5 font-display text-[15px] text-ivory/85">{settings.address}</p>
          </div>
          <div className="flex items-end sm:justify-end">
            <a
              href="#signature"
              className="group inline-flex min-h-[44px] items-center gap-2 px-1 font-sans text-[10px] tracking-[0.28em] text-ivory/50 uppercase transition-colors hover:text-gold"
            >
              Gulir
              <ArrowDown className="h-3.5 w-3.5 animate-bounce text-gold/60" strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
