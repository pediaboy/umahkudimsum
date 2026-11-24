"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Seal } from "./ui";
import { waLink } from "@/lib/format";
import type { SiteSettings } from "@/lib/types";

const LINKS = [
  { href: "#signature", label: "Signature" },
  { href: "#menu", label: "Menu" },
  { href: "#cerita", label: "Cerita" },
  { href: "#bahan", label: "Bahan" },
  { href: "#galeri", label: "Galeri" },
  { href: "#lokasi", label: "Lokasi" },
];

export default function Nav({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/15 bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/70 to-transparent"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-4 md:h-[84px]">
          {/* brand */}
          <a href="#atas" className="group flex items-center gap-3" aria-label="UMAHKUDIMSUM, ke atas">
            <Seal size={38} className="shrink-0 transition-transform duration-500 group-hover:rotate-6" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] tracking-[0.2em] text-ivory md:text-[17px]">
                UMAHKU<span className="text-gold">DIMSUM</span>
              </span>
              <span className="mt-1 hidden font-sans text-[9px] tracking-[0.34em] text-ivory-dim/70 sm:block">
                EST. 2014 · JAKARTA
              </span>
            </span>
          </a>

          {/* desktop links */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-sans text-[12px] font-medium tracking-[0.16em] text-ivory/75 uppercase transition-colors hover:text-ivory"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 border border-gold/45 px-5 py-2.5 font-sans text-[11px] font-medium tracking-[0.18em] text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-ink sm:flex"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
              Pesan
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center border border-gold/30 text-gold transition-colors hover:bg-gold/10 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-ink/95 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.nav
              className="absolute inset-y-0 right-0 flex w-[min(86vw,360px)] flex-col border-l border-gold/20 bg-maroon px-7 py-6"
              initial={reduce ? undefined : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Navigasi mobile"
            >
              <div className="flex items-center justify-between">
                <Seal size={44} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Tutup menu"
                  className="flex h-10 w-10 items-center justify-center border border-gold/30 text-gold"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div className="mt-10 flex flex-col">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={reduce ? undefined : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-gold/12 py-4 font-display text-2xl text-ivory transition-colors hover:text-gold"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </div>

              <a
                href={waLink(settings)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-auto flex items-center justify-center gap-2 bg-gold px-6 py-4 font-sans text-[11px] font-medium tracking-[0.2em] text-ink uppercase"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                Pesan via WhatsApp
              </a>
              <p className="mt-4 text-center font-sans text-[10px] tracking-[0.24em] text-ivory-dim/60 uppercase">
                {settings.phone_display}
              </p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
