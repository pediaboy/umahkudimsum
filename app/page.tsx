import { getMenuPayload } from "@/lib/data";
import { IntroOverlay, ScrollProgress } from "@/components/ui";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BrandIntro from "@/components/BrandIntro";
import Signature from "@/components/Signature";
import MenuSection from "@/components/MenuSection";
import Story from "@/components/Story";
import Ingredients from "@/components/Ingredients";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Order from "@/components/Order";
import Location from "@/components/Location";
import Footer from "@/components/Footer";

export const revalidate = 300;

export default async function HomePage() {
  const { categories, items, testimonials, settings } = await getMenuPayload();

  return (
    <>
      <IntroOverlay />
      <ScrollProgress />
      <Nav settings={settings} />
      <main>
        <Hero settings={settings} />
        <BrandIntro />
        <Signature items={items} settings={settings} />
        <MenuSection categories={categories} items={items} settings={settings} />
        <Story />
        <Ingredients />
        <Gallery />
        <Testimonials items={testimonials} />
        <Order settings={settings} />
        <Location settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
