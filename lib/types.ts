export type Category = {
  slug: string;
  name: string;
  name_cn: string | null;
  blurb: string | null;
  sort_order: number;
};

export type MenuItem = {
  id: number;
  category_slug: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  is_signature: boolean;
  is_available: boolean;
  sort_order: number;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  quote: string;
  rating: number;
};

export type SiteSettings = Record<string, string>;

export type MenuPayload = {
  categories: Category[];
  items: MenuItem[];
  testimonials: Testimonial[];
  settings: SiteSettings;
};
