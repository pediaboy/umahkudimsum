"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2, MessageCircle, ShoppingBag } from "lucide-react";
import { Reveal, SectionHead } from "./ui";
import { waLink } from "@/lib/format";
import type { SiteSettings } from "@/lib/types";

type Status = "idle" | "sending" | "done" | "error";

export default function Order({ settings }: { settings: SiteSettings }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      guests: Number(fd.get("guests") || 2),
      reserve_date: String(fd.get("reserve_date") || ""),
      reserve_time: String(fd.get("reserve_time") || ""),
      notes: String(fd.get("notes") || "").trim(),
    };
    if (!payload.name || !payload.phone) {
      setError("Nama dan nomor telepon wajib diisi.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Gagal mengirim reservasi.");
      setStatus("done");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim reservasi.");
      setStatus("error");
    }
  }

  const inputCls =
    "w-full border border-gold/25 bg-ink/60 px-3.5 py-3 font-sans text-[13px] text-ivory placeholder:text-ivory-dim/40 transition-colors focus:border-gold/60 focus:outline-none";
  const labelCls = "mb-1.5 block font-sans text-[9px] tracking-[0.24em] text-gold/70 uppercase";

  return (
    <section id="pesan" className="relative overflow-hidden border-t border-gold/12 bg-ink py-20 md:py-28">
      <div className="shell">
        <SectionHead
          index="08"
          label="Pesan"
          title="Dua cara untuk membawa pulang meja ini."
          lede="Pesan langsung lewat WhatsApp untuk permintaan khusus, atau lewat GoFood untuk pengiriman cepat."
        />

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          {/* WhatsApp */}
          <Reveal>
            <a
              href={waLink(settings)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between border border-gold/25 bg-gradient-to-br from-maroon/70 to-ink p-6 transition-colors duration-500 hover:border-gold/60 md:p-9"
            >
              <div>
                <div className="flex items-center justify-between">
                  <MessageCircle className="h-7 w-7 text-gold" strokeWidth={1.3} />
                  <ArrowUpRight
                    className="h-5 w-5 text-gold/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold"
                    strokeWidth={1.4}
                  />
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.5rem,3vw,2rem)] text-ivory">WhatsApp</h3>
                <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-ivory/60">
                  Untuk pesanan dalam jumlah banyak, katering, atau permintaan khusus. Dibalas langsung oleh dapur.
                </p>
              </div>
              <p className="mt-8 font-sans text-[11px] tracking-[0.2em] text-gold uppercase">
                {settings.phone_display || "Chat sekarang"}
              </p>
            </a>
          </Reveal>

          {/* GoFood */}
          <Reveal delay={0.1}>
            <a
              href={settings.gofood_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between border border-gold/15 bg-charcoal/60 p-6 transition-colors duration-500 hover:border-gold/45 md:p-9"
            >
              <div>
                <div className="flex items-center justify-between">
                  <ShoppingBag className="h-7 w-7 text-gold/80" strokeWidth={1.3} />
                  <ArrowUpRight
                    className="h-5 w-5 text-gold/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold"
                    strokeWidth={1.4}
                  />
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.5rem,3vw,2rem)] text-ivory">GoFood</h3>
                <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-ivory/60">
                  Untuk pengiriman ke rumah. Menu yang tersedia mengikuti jam operasional dapur.
                </p>
              </div>
              <p className="mt-8 font-sans text-[11px] tracking-[0.2em] text-gold uppercase">Buka di GoFood</p>
            </a>
          </Reveal>
        </div>

        {/* reservation */}
        <div className="mt-16 grid gap-10 border-t border-gold/12 pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Reservasi Meja</span>
              <h3 className="mt-4 font-display text-[clamp(1.7rem,3.6vw,2.4rem)] leading-tight text-ivory">
                Datang beramai-ramai?
              </h3>
              <p className="mt-4 text-[14px] leading-[1.8] text-ivory/60">
                Tinggalkan detailnya, kami konfirmasi lewat WhatsApp. Untuk grup di atas 12 orang, sebaiknya
                hubungi kami tiga hari sebelumnya.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.12}>
              {status === "done" ? (
                <div className="flex flex-col items-start border border-gold/35 bg-maroon/40 p-7 md:p-9">
                  <Check className="h-7 w-7 text-gold" strokeWidth={1.6} />
                  <h4 className="mt-4 font-display text-2xl text-ivory">Reservasi terkirim.</h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-ivory/65">
                    Kami akan mengonfirmasi lewat WhatsApp dalam jam operasional.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 border border-gold/40 px-5 py-2.5 font-sans text-[10px] tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-ink"
                  >
                    Buat reservasi lain
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <label className={labelCls} htmlFor="r-name">Nama</label>
                    <input id="r-name" name="name" required className={inputCls} placeholder="Nama lengkap" />
                  </div>
                  <div className="sm:col-span-1">
                    <label className={labelCls} htmlFor="r-phone">Nomor WhatsApp</label>
                    <input id="r-phone" name="phone" required inputMode="tel" className={inputCls} placeholder="08xx xxxx xxxx" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="r-date">Tanggal</label>
                    <input id="r-date" name="reserve_date" type="date" className={`${inputCls} [color-scheme:dark]`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls} htmlFor="r-time">Jam</label>
                      <input id="r-time" name="reserve_time" type="time" className={`${inputCls} [color-scheme:dark]`} />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="r-guests">Orang</label>
                      <input id="r-guests" name="guests" type="number" min={1} max={40} defaultValue={2} className={inputCls} />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="r-notes">Catatan</label>
                    <textarea id="r-notes" name="notes" rows={3} className={`${inputCls} resize-none`} placeholder="Permintaan khusus, alergi, atau kursi bayi" />
                  </div>

                  {status === "error" && error ? (
                    <p className="sm:col-span-2 font-sans text-[11px] tracking-wide text-red-bright">{error}</p>
                  ) : null}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex w-full items-center justify-center gap-2.5 bg-gold px-7 py-4 font-sans text-[11px] font-medium tracking-[0.22em] text-ink uppercase transition-colors hover:bg-gold-light disabled:opacity-60 sm:w-auto"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.8} />
                          Mengirim
                        </>
                      ) : (
                        "Kirim reservasi"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
