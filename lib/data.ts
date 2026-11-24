import { serverClient } from "./supabase";
import type { MenuPayload, Category, MenuItem, Testimonial, SiteSettings } from "./types";

/**
 * Static fallback so the landing page always renders — even if Supabase is
 * unreachable or env vars are missing during a build. Kept in sync with the
 * seeded `uk_*` rows; the live DB is the source of truth at runtime.
 */
const FALLBACK: MenuPayload = {
  categories: [
    { slug: "kukus", name: "Dimsum Kukus", name_cn: "點心", blurb: "Dikukus ala kantong bambu.", sort_order: 1 },
    { slug: "goreng", name: "Dimsum Goreng", name_cn: "炸點", blurb: "Kulit renyah, isi lembut.", sort_order: 2 },
    { slug: "bakpao", name: "Bakpao", name_cn: "包子", blurb: "Diragikan semalaman.", sort_order: 3 },
    { slug: "nasi-mie", name: "Nasi & Mie", name_cn: "飯麵", blurb: "Porsi utama.", sort_order: 4 },
    { slug: "minuman", name: "Minuman", name_cn: "飲品", blurb: "Teh seduh poci.", sort_order: 5 },
  ],
  items: [
    { id: 1, category_slug: "kukus", name: "Siomay Ayam Udang", description: "Ayam kampung cincang kasar dan udang segar.", price: 28000, image: "/images/signature-siomay.jpg", is_signature: true, is_available: true, sort_order: 1 },
    { id: 2, category_slug: "kukus", name: "Hakau Udang", description: "Kulit kristal, isi udang utuh.", price: 32000, image: "/images/signature-hakau.jpg", is_signature: true, is_available: true, sort_order: 2 },
    { id: 3, category_slug: "kukus", name: "Xiao Long Bao", description: "Empat lilitan lipatan tangan, kuah kaldu di dalamnya.", price: 35000, image: "/images/signature-xlb.jpg", is_signature: true, is_available: true, sort_order: 3 },
    { id: 4, category_slug: "bakpao", name: "Bakpao Char Siu", description: "Roti lembut fermentasi semalaman, isi char siu.", price: 26000, image: "/images/signature-bakpao.jpg", is_signature: true, is_available: true, sort_order: 1 },
  ],
  testimonials: [],
  settings: {
    brand_name: "UMAHKUDIMSUM",
    tagline: "Racikan warisan Tionghoa, disajikan dengan hormat.",
    whatsapp_number: "6281234567890",
    whatsapp_message: "Halo UMAHKUDIMSUM, saya mau pesan dimsum.",
    gofood_url: "https://gofood.co.id/",
    instagram: "https://instagram.com/umahkudimsum",
    address: "Jl. Contoh Raya No. 88, Jakarta Selatan",
    maps_url: "https://maps.google.com/?q=Jakarta",
    hours_weekday: "Selasa - Jumat, 09.00 - 21.00",
    hours_weekend: "Sabtu - Minggu, 08.00 - 22.00",
    hours_closed: "Senin tutup",
    phone_display: "0812-3456-7890",
  },
};

export async function getMenuPayload(): Promise<MenuPayload> {
  const db = serverClient();
  if (!db) return FALLBACK;

  try {
    const [cats, items, testi, settings] = await Promise.all([
      db.from("uk_categories").select("slug,name,name_cn,blurb,sort_order").order("sort_order"),
      db
        .from("uk_menu_items")
        .select("id,category_slug,name,description,price,image,is_signature,is_available,sort_order")
        .eq("is_available", true)
        .order("sort_order"),
      db
        .from("uk_testimonials")
        .select("id,name,role,quote,rating")
        .eq("is_published", true)
        .order("sort_order"),
      db.from("uk_site_settings").select("key,value"),
    ]);

    const settingsMap: SiteSettings = {};
    for (const row of settings.data ?? []) {
      if (row?.key) settingsMap[row.key] = row.value ?? "";
    }

    return {
      categories: (cats.data as Category[])?.length ? (cats.data as Category[]) : FALLBACK.categories,
      items: (items.data as MenuItem[])?.length ? (items.data as MenuItem[]) : FALLBACK.items,
      testimonials: (testi.data as Testimonial[]) ?? [],
      settings: Object.keys(settingsMap).length ? { ...FALLBACK.settings, ...settingsMap } : FALLBACK.settings,
    };
  } catch {
    return FALLBACK;
  }
}

export { waLink, waOrderLink, rupiah } from "./format";
