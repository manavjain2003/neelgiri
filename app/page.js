import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import VideoReveal from "@/components/VideoReveal";

export default function Home() {
  return (
   <main className="relative overflow-x-clip">
      <Navbar />
      <Hero />
      <Categories />
      <About />
       <FeaturedProducts />
      <WhyChoose />
      <Testimonials />
      <VideoReveal />
      <Faq />
      <CTA />
      <Footer />
    </main>
  );
}
