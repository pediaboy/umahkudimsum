"use client";

import { Reveal, RevealWords, SectionHead } from "./ui";

const STATS = [
  { n: "12", label: "Tahun berjalan" },
  { n: "20", label: "Varian dimsum" },
  { n: "3", label: "Generasi resep" },
];

export default function BrandIntro() {
  return (
    <section id="tentang" className="relative overflow-hidden border-t border-gold/12 bg-ink py-20 md:py-32">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead
              index="01"
              label="Pengantar"
              title="Bukan sekadar dimsum."
              lede="Ini cara kami menghormati resep yang sudah tiga generasi dijaga — bukan tren yang diburu."
            />
            <Reveal delay={0.18}>
              <div className="mt-10 space-y-5 text-[15px] leading-[1.85] text-ivory/65 md:text-base">
                <p>
                  Setiap pagi, sebelum kota terbangun, dapur kami sudah bekerja. Ayam dicincang dengan pisau
                  berat, bukan mesin. Udang dipilih satu per satu. Kulit pangsit digilas setipis yang bisa
                  ditahan tangan tanpa sobek.
                </p>
                <p>
                  Tidak ada yang instan di sini. Bakpao diragikan semalaman. Kuah xiao long bao didinginkan
                  delapan jam supaya bisa terkurung di dalam lipatan. Ceker direbus lembut enam jam sebelum
                  dikukus dengan tausi.
                </p>
                <p className="text-ivory/85">
                  Kami tidak menyebut ini inovasi. Kami menyebut ini <span className="italic text-gold">menjaga</span>.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-6">
            <div className="grid grid-cols-3 gap-4 border-y border-gold/15 py-8">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.08}>
                  <div className="text-center lg:text-left">
                    <p className="gold-text font-display text-[clamp(2rem,4.5vw,2.9rem)] leading-none">{s.n}</p>
                    <p className="mt-2 font-sans text-[9px] leading-tight tracking-[0.2em] text-ivory-dim/70 uppercase">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <blockquote className="mt-10 border-l border-gold/40 pl-5">
                <p className="font-display text-[clamp(1.2rem,2.4vw,1.6rem)] leading-snug italic text-ivory/85">
                  &ldquo;Kalau resepnya berubah, tamu kami akan tahu sebelum kami sendiri tahu.&rdquo;
                </p>
                <footer className="mt-4 font-sans text-[10px] tracking-[0.26em] text-gold/70 uppercase">
                  Pemilik — Generasi Ketiga
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
