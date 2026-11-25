"use client";

import Image from "next/image";
import { ShieldCheck, Snowflake, Hand } from "lucide-react";
import { MaskImage, Reveal, SectionHead } from "./ui";
import type { SiteSettings } from "@/lib/types";

export function BrandIntro({ settings }: { settings: SiteSettings }) {
  return (
    <section id="tentang" className="bg-white py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
        <MaskImage
          src="/brand/product-ayam-web.jpg"
          alt="Dimsum ayam UMAHKUDIMSUM siap kukus"
          className="aspect-[4/5] w-full rounded-2xl"
          sizes="(max-width: 1024px) 92vw, 460px"
        />

        <div>
          <SectionHead
            label="Tentang kami"
            title="Dapur kecil di Jagakarsa yang kini memasok Jabodetabek."
          />
          <div className="mt-6 space-y-4 text-[15px] leading-[1.8] text-ink-soft">
            <p>
              UMAHKUDIMSUM mulai dari satu dapur rumahan: adonan diuleni sendiri, isi
              ditimbang satu per satu, lalu dikukus sesuai pesanan. Tidak ada stok
              berbulan-bulan di freezer.
            </p>
            <p>
              Sekarang kami memasok pelanggan harian, katering, acara kantor, sampai
              hampers Lebaran dan Natal. Dua cabang berjalan: Jagakarsa dan food court
              Lapangan Kukusan Beji.
            </p>
            <p className="text-ink">
              Yang tidak berubah: semua dimsum tetap dibuat di dapur kami sendiri, dan
              sudah bersertifikat Halal MUI {settings.halal_id ?? ""}.
            </p>
          </div>

          <div className="mt-8 grid gap-5 border-t border-line pt-7 sm:grid-cols-3">
            {[
              ["Dibuat harian", "Bukan stok gudang"],
              ["Halal MUI", settings.halal_id ? `ID ${settings.halal_id}` : "Tersertifikasi"],
              ["Supplier", "Jabodetabek"],
            ].map(([t, s]) => (
              <div key={t}>
                <p className="text-[13px] font-semibold text-ink">{t}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const POINTS = [
  {
    icon: ShieldCheck,
    title: "Halal MUI",
    body: "Bersertifikat Halal MUI. Nomornya kami cantumkan terbuka di halaman ini, bukan klaim tanpa bukti.",
  },
  {
    icon: Snowflake,
    title: "Tanpa pengawet",
    body: "Dimsum dibuat lalu langsung dibekukan dalam keadaan mentah, jadi rasanya tetap seperti baru dikukus.",
  },
  {
    icon: Hand,
    title: "Digulung tangan",
    body: "Kulit digulung satu per satu, isi ditimbang. Bukan adonan cetak mesin yang seragam tanpa tekstur.",
  },
];

export function Quality({ settings }: { settings: SiteSettings }) {
  return (
    <section id="kualitas" className="bg-cream py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHead
            label="Kualitas &amp; Halal"
            title="Standar yang sama untuk 25 pcs maupun 100 pcs."
            lede="Kami tidak punya lini produk murah terpisah. Bahan dan prosesnya satu, dari pesanan rumahan sampai katering acara."
          />
          <div className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3">
            <Image src="/brand/halal.png" alt="Logo Halal Indonesia" width={44} height={44} className="rounded" />
            <div>
              <p className="label text-ink-soft">Halal MUI</p>
              <p className="mt-1 text-[12px] font-semibold text-ink">{settings.halal_id ?? "Tersertifikasi"}</p>
            </div>
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="bg-white p-7">
              <p.icon className="h-5 w-5 text-brand" strokeWidth={1.8} />
              <h3 className="mt-4 text-[17px] font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-ink-soft">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
