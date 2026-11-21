import { Suspense } from "react";
import ProductCatalogue from "@/components/product/ProductCatalogue";
import PageHero from "@/components/ui/PageHero";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Our Products",
  description:
    "Rutile titanium dioxide, thermoplastic road marking paint, glass beads, hydrocarbon resins, stearates, starch, industrial chemicals and road marking machines from Neelgiri Chemicals.",
};

export default function ProductsPage() {
  return (
    <div className="bg-[#f8faff] text-[#101d3d]">
      <PageHero
        eyebrow="Chemicals & Materials"
        title="Our"
        highlight="Products"
        description="Titanium dioxide, road-marking materials, resins, stearates and more – ISO-certified supply for paint, plastics, adhesives, rubber and infrastructure."
        bannerImage="/images/hero_1.png"
      />
      <Suspense fallback={<div className="min-h-[50vh]" />}>
        <ProductCatalogue />
      </Suspense>
      <CTA />
    </div>
  );
}
