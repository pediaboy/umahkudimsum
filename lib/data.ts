import { serverClient } from "./supabase";
import type { Branch, Category, MenuItem, SiteSettings } from "./types";

export type SiteData = {
  categories: Category[];
  items: MenuItem[];
  branches: Branch[];
  settings: SiteSettings;
};

export const FALLBACK: SiteData = {
  categories: [
    { slug: "kukus", name: "Dimsum Kukus", blurb: "Dikukus segar setiap hari", sort_order: 1 },
    { slug: "goreng", name: "Dimsum Goreng", blurb: "Renyah di luar, lembut di dalam", sort_order: 2 },
    { slug: "mentai", name: "Dimsum Mentai", blurb: "Saus mentai creamy", sort_order: 3 },
    { slug: "paket", name: "Paket & Hampers", blurb: "Untuk keluarga dan acara", sort_order: 4 },
  ],
  items: [
    { id: 1, category_slug: "kukus", name: "Dimsum Ayam Mix Topping", description: "Dimsum ayam dengan aneka topping: wortel, jamur, sosis, dan crab stick.", size_label: "25 pcs / 100 pcs", price: null, image: "/brand/product-25pcs-web.jpg", is_signature: true, sort_order: 1 },
    { id: 2, category_slug: "kukus", name: "Dimsum Ayam Mozzarella", description: "Dimsum ayam dengan lelehan keju mozzarella dan taburan herbs.", size_label: "25 pcs / 100 pcs", price: null, image: "/brand/product-cheese1-web.jpg", is_signature: true, sort_order: 2 },
    { id: 3, category_slug: "mentai", name: "Dimsum Mentai Mozzarella", description: "Saus mentai creamy dipanggang di atas dimsum ayam dan keju.", size_label: "25 pcs / 100 pcs", price: null, image: "/brand/product-cheese2-web.jpg", is_signature: true, sort_order: 3 },
    { id: 4, category_slug: "kukus", name: "Dimsum Ayam Original", description: "Resep klasik dimsum ayam, cocok untuk anak dan keluarga.", size_label: "25 pcs / 100 pcs", price: null, image: "/brand/product-ayam-web.jpg", is_signature: true, sort_order: 4 },
    { id: 5, category_slug: "paket", name: "Paket 25 pcs", description: "Satu box 25 pcs siap kukus, gratis saus merah.", size_label: "25 pcs", price: null, image: "/brand/product-25pcs-web.jpg", is_signature: false, sort_order: 5 },
    { id: 6, category_slug: "paket", name: "Paket 100 pcs Medium", description: "Paket 100 pcs ukuran medium, gratis saus merah. Cocok untuk acara.", size_label: "100 pcs", price: null, image: "/brand/product-ayam-web.jpg", is_signature: true, sort_order: 6 },
    { id: 7, category_slug: "goreng", name: "Dimsum Goreng Ayam", description: "Dimsum ayam dengan kulit renyah, digoreng saat dipesan.", size_label: "25 pcs", price: null, image: "/brand/product-cheese1-web.jpg", is_signature: false, sort_order: 7 },
    { id: 8, category_slug: "paket", name: "Hampers & Catering", description: "Paket hampers untuk hari raya, wedding, dan acara kantor.", size_label: "Custom", price: null, image: "/brand/product-cheese2-web.jpg", is_signature: false, sort_order: 8 },
  ],
  branches: [
    { id: 1, code: "001", name: "Jagakarsa", address: "Jagakarsa, Jakarta Selatan", maps_url: null, sort_order: 1 },
    { id: 2, code: "002", name: "Food Court Lap. Kukusan Beji", address: "Food Court Lap. Kukusan, Beji, Depok", maps_url: null, sort_order: 2 },
  ],
  settings: {
    brand_name: "UMAHKUDIMSUM",
    tagline: "Authentic · Good Quality · Best Ingredients",
    subtitle: "Produsen & Supplier Dimsum Jabodetabek",
    whatsapp: "6287810136622",
    whatsapp_display: "0878-1013-6622",
    instagram: "umahkudimsum",
    tiktok: "umahkudimsum",
    linktree: "https://msha.ke/umahkudimsum",
    halal_id: "ID31410025036310725",
    hours_weekday: "Selasa – Minggu · 16:00 – 23:00",
    hours_note: "Senin tutup. Khusus Senin tetap bisa order manual melalui WhatsApp admin.",
    gofood_url: "",
  },
};

export async function getSiteData(): Promise<SiteData> {
  const sb = serverClient();
  if (!sb) return FALLBACK;

  const [cats, items, branches, settings] = await Promise.all([
    sb.from("uk_categories").select("slug,name,blurb,sort_order").order("sort_order"),
    sb.from("uk_menu_items").select("*").eq("is_available", true).order("sort_order"),
    sb.from("uk_branches").select("id,code,name,address,maps_url,sort_order").order("sort_order"),
    sb.from("uk_site_settings").select("key,value"),
  ]);

  const settingsMap: SiteSettings = {};
  (settings.data ?? []).forEach((r: { key: string; value: string }) => {
    settingsMap[r.key] = r.value;
  });

  return {
    categories: cats.data?.length ? (cats.data as Category[]) : FALLBACK.categories,
    items: items.data?.length ? (items.data as MenuItem[]) : FALLBACK.items,
    branches: branches.data?.length ? (branches.data as Branch[]) : FALLBACK.branches,
    settings: Object.keys(settingsMap).length ? settingsMap : FALLBACK.settings,
  };
}
