"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo, MagneticLink, EASE } from "./ui";
import { waLink } from "@/lib/format";
import type { SiteSettings } from "@/lib/types";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Our Menu" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line/80 bg-cream/92 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-4 md:h-[76px]">
          <a href="#home" className="flex min-h-[44px] items-center gap-2.5" aria-label="UMAHKUDIMSUM — ke atas">
            <Logo size={40} />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[15px] font-extrabold tracking-tight text-ink">
                UMAHKUDIMSUM
              </span>
              <span className="mt-0.5 font-label text-[9px] font-medium tracking-[0.16em] text-ink-soft uppercase">
                Dimsum Jabodetabek
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex min-h-[44px] items-center rounded-full px-4 font-sans text-[13px] font-semibold text-ink/75 transition-colors hover:bg-brand/6 hover:text-brand"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <MagneticLink
              href={waLink(settings)}
              external
              className="hidden min-h-[44px] items-center rounded-full bg-brand px-5 font-sans text-[13px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(216,31,38,0.7)] transition-colors hover:bg-brand-deep sm:inline-flex"
            >
              Order Now
            </MagneticLink>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              className="absolute inset-y-0 right-0 flex w-[min(88vw,360px)] flex-col bg-cream p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Logo size={36} />
                  <span className="font-display text-[14px] font-extrabold text-ink">UMAHKUDIMSUM</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Tutup menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col" aria-label="Navigasi mobile">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: EASE }}
                    className="flex min-h-[52px] items-center border-b border-line font-display text-lg font-bold text-ink"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <a
                href={waLink(settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex min-h-[52px] items-center justify-center rounded-full bg-brand font-sans text-sm font-bold text-white"
              >
                Order Now via WhatsApp
              </a>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
