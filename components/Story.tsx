"use client";

import { MaskImage, Reveal, SectionHead } from "./ui";

const CHAPTERS = [
  {
    year: "1998",
    title: "Gerobak pertama",
    body: "Seorang perantau dari Fujian membuka gerobak kecil di depan pasar. Dua jenis saja: siomay dan bakpao. Resepnya ditulis tangan di kertas minyak yang sampai sekarang masih disimpan.",
  },
  {
    year: "2014",
    title: "Rumah pertama",
    body: "Generasi kedua menyewa ruko sempit di sudut jalan. Nama UMAHKUDIMSUM dipilih bukan untuk terdengar besar, tapi karena tamu memang selalu pulang ke sini.",
  },
  {
    year: "Sekarang",
    title: "Resep yang tidak berubah",
    body: "Dua puluh varian, tiga dapur, dan satu aturan: tidak ada bumbu instan, tidak ada kulit jadi, tidak ada jalan pintas yang mengubah rasa.",
  },
];

export default function Story() {
  return (
    <section id="cerita" className="relative overflow-hidden border-t border-gold/12 bg-ink py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* image column */}
          <div className="lg:col-span-5">
            <MaskImage
              src="/images/craft-shumai.jpg"
              alt="Tangan yang menggulung siomay satu per satu"
              className="aspect-[4/5] w-full"
              sizes="(max-width: 1024px) 100vw, 42vw"
              parallax={22}
            />
            <Reveal delay={0.15}>
              <div className="mt-4 flex items-center justify-between border-t border-gold/15 pt-3">
                <span className="font-sans text-[9px] tracking-[0.26em] text-ivory-dim/50 uppercase">
                  Dapur kami · 04.30 pagi
                </span>
                <span className="cjk text-[11px] text-gold/40">家</span>
              </div>
            </Reveal>
          </div>

          {/* text column */}
          <div className="lg:col-span-7">
            <SectionHead index="04" label="Cerita Kami" title="Tiga generasi, satu kertas resep." />

            <div className="mt-10">
              {CHAPTERS.map((c, i) => (
                <Reveal key={c.year} delay={0.1 + i * 0.1}>
                  <div className="group grid grid-cols-[auto_1fr] gap-5 border-t border-gold/12 py-6 first:border-t-0 first:pt-0 sm:gap-8">
                    <div className="pt-1">
                      <span className="font-display text-[13px] tracking-[0.12em] text-gold/70">{c.year}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-[clamp(1.15rem,2.4vw,1.5rem)] text-ivory transition-colors duration-300 group-hover:text-gold">
                        {c.title}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-[1.8] text-ivory/60">{c.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
