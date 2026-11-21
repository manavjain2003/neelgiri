import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import FeaturedProducts from "@/components/FeaturedProducts";
import Industries from "@/components/Industries";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import VideoReveal from "@/components/VideoReveal";

/* Navbar, TopBar and Footer are rendered once, in app/layout.js. */
export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <Hero />
      <Categories />
      <About />
      <FeaturedProducts />
      <WhyChoose />
      <Industries />
      <VideoReveal />
      <Faq />
      <CTA />
    </div>
  );
}
