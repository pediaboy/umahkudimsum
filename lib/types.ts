export type Category = {
  slug: string;
  name: string;
  blurb: string | null;
  sort_order: number;
};

export type MenuItem = {
  id: number;
  category_slug: string;
  name: string;
  description: string | null;
  size_label: string | null;
  price: number | null;
  image: string | null;
  is_signature: boolean;
  sort_order: number;
};

export type Branch = {
  id: number;
  code: string;
  name: string;
  address: string | null;
  maps_url: string | null;
  sort_order: number;
};

export type SiteSettings = Record<string, string>;
