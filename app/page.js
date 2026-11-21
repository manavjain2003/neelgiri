import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import FeaturedProducts from "@/components/FeaturedProducts";
import Industries from "@/components/Industries";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import VideoReveal from "@/components/VideoReveal";

export default function Home() {
  return (
   <main className="relative overflow-x-clip">
      <Hero />
      <Categories />
      <About />
      <FeaturedProducts />
      <WhyChoose />
      <Industries />
      <VideoReveal />
      <Faq />
      <CTA />
    </main>
  );
}
