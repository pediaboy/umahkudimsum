"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { MaskImage, Reveal, SectionHead, EASE } from "./ui";

const SHOTS = [
  { src: "/brand/product-ayam-web.jpg", alt: "Dimsum ayam dengan aneka topping", cls: "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto" },
  { src: "/brand/product-25pcs-web.jpg", alt: "Satu box dimsum 25 pcs siap kukus", cls: "aspect-[4/3]" },
  { src: "/brand/product-cheese1-web.jpg", alt: "Dimsum dengan topping keju dan chili oil", cls: "aspect-[4/3]" },
  { src: "/brand/product-cheese2-web.jpg", alt: "Dimsum mozzarella dalam tray aluminium", cls: "aspect-[4/3]" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const next = useCallback(
    () => setOpen((i) => (i === null ? null : (i + 1) % SHOTS.length)),
    []
  );
  const prev = useCallback(
    () => setOpen((i) => (i === null ? null : (i - 1 + SHOTS.length) % SHOTS.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  return (
    <section id="gallery" className="bg-cream py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="05"
          eyebrow="Gallery"
          title="Lihat lebih dekat."
          lede="Foto asli dari dapur dan kemasan kami. Klik untuk memperbesar."
        />

        <div className="mt-9 grid auto-rows-[minmax(0,1fr)] gap-3 sm:grid-cols-3">
          {SHOTS.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.06} className={s.cls}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Perbesar foto: ${s.alt}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl"
              >
                <MaskImage
                  src={s.src}
                  alt={s.alt}
                  sizes="(max-width: 640px) 92vw, 44vw"
                  className="h-full w-full"
                  imgClassName="transition-transform duration-[700ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
                <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Galeri foto"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/25"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Foto sebelumnya"
              className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/25 sm:left-5"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Foto berikutnya"
              className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/25 sm:right-5"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} />
            </button>

            <motion.div
              className="relative max-h-[82vh] w-full max-w-3xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink">
                <Image
                  src={SHOTS[open].src}
                  alt={SHOTS[open].alt}
                  fill
                  sizes="90vw"
                  quality={88}
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-center font-sans text-[13px] text-white/70">
                {SHOTS[open].alt} · {open + 1}/{SHOTS.length}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
