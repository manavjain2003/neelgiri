import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";

export const metadata = {
  title:"Ci Laser | Next-Gen Laser Cutting Solutions",
  description:
    "High-performance laser cutting machines for metal fabrication, sheet cutting and industrial applications.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B5BF5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <SmoothScroll>
            <TopBar/>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
          <FloatingContact />
      </body>
    </html>
  );
}
