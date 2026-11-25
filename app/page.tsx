import { getSiteData } from "@/lib/data";
import { IntroOverlay, Marquee, ScrollProgress } from "@/components/ui";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { BrandIntro, Quality } from "@/components/Story";
import { Signature, MenuGrid } from "@/components/Products";
import Gallery from "@/components/Gallery";
import { Branches, Hours, Order } from "@/components/Info";
import Footer from "@/components/Footer";

export const revalidate = 300;

export default async function Home() {
  const { categories, items, branches, settings } = await getSiteData();

  return (
    <>
      <IntroOverlay />
      <ScrollProgress />
      <Nav settings={settings} />

      <main>
        <Hero settings={settings} />
        <Marquee
          items={[
            "Halal MUI",
            "Dibuat sendiri setiap hari",
            "Supplier Dimsum Jabodetabek",
            "Free Saus Merah",
            "Sejak 2014",
            "Cabang Jagakarsa & Kukusan Beji",
          ]}
        />
        <BrandIntro settings={settings} />
        <Signature items={items} settings={settings} />
        <MenuGrid categories={categories} items={items} settings={settings} />
        <Quality settings={settings} />
        <Gallery />
        <Branches branches={branches} />
        <Hours settings={settings} />
        <Order settings={settings} />
      </main>

      <Footer settings={settings} branches={branches} />
    </>
  );
}
