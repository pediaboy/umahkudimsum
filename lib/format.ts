import type { SiteSettings } from "./types";

export function waLink(settings: SiteSettings, message?: string) {
  const num = (settings.whatsapp || "6287810136622").replace(/\D/g, "");
  const text =
    message ??
    "Halo UMAHKUDIMSUM, saya mau tanya-tanya dan order dimsum. Boleh dibantu?";
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

export function waProductLink(settings: SiteSettings, productName: string) {
  return waLink(
    settings,
    `Halo UMAHKUDIMSUM, saya mau order *${productName}*. Apakah stok tersedia?`
  );
}

export function rupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

export function igLink(settings: SiteSettings) {
  const h = (settings.instagram || "umahkudimsum").replace(/^@/, "");
  return `https://www.instagram.com/${h}`;
}

export function tiktokLink(settings: SiteSettings) {
  const h = (settings.tiktok || "umahkudimsum").replace(/^@/, "");
  return `https://www.tiktok.com/@${h}`;
}
