"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MaskImage, Reveal, SectionHead } from "./ui";

const SHOTS = [
  { src: "/brand/product-25pcs-web.jpg", caption: "Dimsum ayam mix topping, 25 pcs", span: "sm:col-span-2 sm:row-span-2" },
  { src: "/brand/product-cheese1-web.jpg", caption: "Topping keju mozzarella, gratis chili oil", span: "" },
  { src: "/brand/product-ayam-web.jpg", caption: "Dimsum ayam, 100 pcs medium", span: "" },
  { src: "/brand/product-cheese2-web.jpg", caption: "Kemasan tray aluminium siap kukus", span: "sm:col-span-2" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((dir: number) => {
    setOpen((cur) => (cur === null ? cur : (cur + dir + SHOTS.length) % SHOTS.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  return (
    <section id="galeri" className="bg-white py-20 md:py-28">
      <div className="shell">
        <SectionHead
          label="Galeri"
          title="Produk apa adanya, tanpa food stylist."
          lede="Foto diambil dari produksi dan pesanan kami sendiri."
        />

        <div className="mt-10 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-4">
          {SHOTS.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.05} className={s.span}>
              <button
                onClick={() => setOpen(i)}
                className="card-media group relative h-full w-full overflow-hidden rounded-xl bg-cream-deep"
                aria-label={`Buka foto: ${s.caption}`}
              >
                <MaskImage src={s.src} alt={s.caption} className="h-full w-full" sizes="(max-width: 640px) 50vw, 33vw" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3 text-left text-[11px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {s.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(1); }}
              className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"
              aria-label="Berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-h-[82vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black">
                <Image src={SHOTS[open].src} alt={SHOTS[open].caption} fill sizes="90vw" className="object-contain" />
              </div>
              <p className="mt-3 text-center text-[12px] text-white/75">{SHOTS[open].caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
