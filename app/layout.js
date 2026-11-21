import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import { company } from "@/lib/company";

export const metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: "Neelgiri Chemicals | Titanium Dioxide, Resins, Stearates & Road Marking Materials",
    template: "%s | Neelgiri Chemicals",
  },
  description:
    "Neelgiri Chemicals Pvt. Ltd. – ISO-certified supplier since 2004 of rutile titanium dioxide, hydrocarbon resins, stearates, glass beads, thermoplastic road marking paint, road marking machines and 280+ industrial raw materials. New Delhi, India.",
  openGraph: {
    siteName: "Neelgiri Chemicals",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e3a5d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <TopBar />
          <Navbar />
          {/* The navbar is sticky (in flow), so pull the page up by its height (82px)
              to let hero images sit behind the transparent bar. */}
          <main id="main" className="-mt-[82px]">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <FloatingContact />
      </body>
    </html>
  );
}
