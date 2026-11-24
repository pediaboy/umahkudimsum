import type { SiteSettings } from "./types";

export function waLink(settings: SiteSettings, extra?: string) {
  const num = (settings.whatsapp_number || "").replace(/\D/g, "");
  const msg = encodeURIComponent(extra || settings.whatsapp_message || "Halo UMAHKUDIMSUM");
  return `https://wa.me/${num}?text=${msg}`;
}

export function waOrderLink(settings: SiteSettings, itemName: string, price?: number) {
  const base = `Halo UMAHKUDIMSUM, saya mau pesan ${itemName}`;
  const withPrice = price ? `${base} (${rupiah(price)})` : base;
  return waLink(settings, `${withPrice}.`);
}

export function rupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}
