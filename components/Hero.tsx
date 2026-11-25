"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { MagneticLink, RevealWords } from "./ui";
import { waLink } from "@/lib/format";
import type { SiteSettings } from "@/lib/types";

export default function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section id="atas" className="relative overflow-hidden bg-brand text-white">
      {/* brand motif, low opacity, only behind the hero */}
      <div className="pointer-events-none absolute inset-0 text-white/[0.07] wave" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand-deep/40 via-transparent to-brand-deep/60" aria-hidden />

      <div className="shell relative grid items-center gap-10 pt-28 pb-16 md:pt-32 md:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-36 lg:pb-24">
        <div>
          <p className="label text-sun">Produsen &amp; Supplier Dimsum Jabodetabek</p>

          <h1 className="mt-5 text-[clamp(2.3rem,7vw,4.4rem)] leading-[0.98] font-semibold tracking-[-0.03em]">
            <RevealWords text="Dimsum yang kami" />
            <br />
            <RevealWords text="gulung sendiri," className="text-sun" />
            <br />
            <RevealWords text="setiap hari." />
          </h1>

          <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-white/85 sm:text-base">
            Bukan produk gudang. Adonan diuleni pagi, isi ditimbang, kulit digulung tangan
            lalu dikukus sebelum dikirim. Halal MUI, tanpa pengawet.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <MagneticLink
              href="#menu"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-[13px] font-semibold text-brand transition-colors hover:bg-cream"
            >
              Lihat Menu
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </MagneticLink>
            <MagneticLink
              href={waLink(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/45 px-6 text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-brand"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              Order Sekarang
            </MagneticLink>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/20 pt-6">
            {[
              ["Halal", "MUI resmi"],
              ["2 Cabang", "Jakarta & Depok"],
              ["16–23", "Setiap hari"],
            ].map(([big, small]) => (
              <div key={big}>
                <dt className="text-[15px] font-semibold sm:text-base">{big}</dt>
                <dd className="mt-1 text-[11px] tracking-wide text-white/60">{small}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* product photo — the real thing, framed simply, no gimmicks */}
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[430px] overflow-hidden rounded-[20px] bg-brand-deep shadow-[0_24px_60px_-24px_rgba(0,0,0,0.55)]">
            <Image
              src="/brand/product-25pcs-web.jpg"
              alt="Dimsum ayam mix topping UMAHKUDIMSUM dalam kemasan 25 pcs"
              fill
              priority
              sizes="(max-width: 1024px) 88vw, 430px"
              quality={84}
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-3 left-1/2 w-[86%] max-w-[330px] -translate-x-1/2 rounded-xl bg-white px-4 py-3 text-ink shadow-lg">
            <p className="label text-brand">Dimsum Ayam Mix Topping</p>
            <p className="mt-1 text-[12px] text-ink-soft">25 pcs · gratis saus merah</p>
          </div>
        </div>
      </div>
    </section>
  );
}
