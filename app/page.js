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

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Categories />
      <About />
      <WhyChoose />
      <FeaturedProducts />
      <Testimonials />
      <Faq />
      <CTA />
      <Footer />
    </main>
  );
}
