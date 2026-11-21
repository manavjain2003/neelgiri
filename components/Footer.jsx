"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { company, yearsInBusiness } from "@/lib/company";
import { categories } from "@/lib/products";

const quick = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const productLinks = categories.map((c) => ({
  label: c.label,
  href: `/products?category=${c.id}`,
}));

const socials = [
  { icon: Facebook, label: "Facebook", href: company.socials.facebook },
  { icon: Instagram, label: "Instagram", href: company.socials.instagram },
  { icon: Youtube, label: "YouTube", href: company.socials.youtube },
  { icon: Linkedin, label: "LinkedIn", href: company.socials.linkedin },
];

const contacts = [
  { icon: Phone, text: company.phone, href: `tel:${company.phoneHref}` },
  { icon: Phone, text: company.phoneAlt, href: `tel:${company.phoneAltHref}` },
  { icon: Mail, text: company.email, href: `mailto:${company.email}` },
  {
    icon: MapPin,
    text: company.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.mapQuery)}`,
    external: true,
  },
];

/* link with a gold dash that grows in on hover */
function FooterLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center text-[14px] text-white/70 transition-colors duration-300 hover:text-[#e6c778]"
    >
      <span className="h-px w-0 shrink-0 bg-[#e6c778] transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
      {children}
    </Link>
  );
}

function Col({ title, children }) {
  return (
    <div>
      <h4 className="font-serif text-[18px] font-semibold text-white">{title}</h4>
      <div className="mb-4 mt-1.5 h-[2px] w-10 rounded-full bg-[#d4a537]" />
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-b from-[#0a2e6e] to-[#061a40] text-white">
      {/* gold top edge */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#d4a537] to-transparent" />

      {/* decorative rings */}
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[420px] w-[420px] rounded-full border-[56px] border-white/[0.03]" />
      <div className="pointer-events-none absolute -bottom-52 -right-32 -z-10 h-[480px] w-[480px] rounded-full border-[64px] border-white/[0.04]" />

      <div className="mx-auto max-w-[1440px] px-[6%] pt-12">
        <nav aria-label="Footer">
          <div className="grid gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1fr_1.4fr]">
            {/* Brand */}
            <div>
              <div className="inline-block h-40 -m-6">
               <img src="/logo_.png" alt="Neelgiri" width={200} height={120} />
              </div>
              <p className="mt-4 max-w-[280px] text-[14px] leading-relaxed text-white/70">
                Since 2004, Neelgiri Chemicals Pvt. Ltd. has been an ISO-certified manufacturer delivering reliable, high-quality chemical solutions with a focus on innovation and customer value.
              </p>

              <div className="mt-6 flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a537] hover:bg-[#d4a537] hover:text-[#0a2e6e] hover:shadow-[0_10px_24px_rgba(212,165,55,0.35)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <Col title="Quick Links">
              <ul className="space-y-2.5">
                {quick.map(({ label, href }) => (
                  <li key={label}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </Col>

            <Col title="Our Products">
              <ul className="space-y-2.5">
                {productLinks.map(({ label, href }) => (
                  <li key={label}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </Col>

            <Col title="Contact Us">
              <ul className="space-y-3">
                {contacts.map(({ icon: Icon, text, href, external }) => (
                  <li key={text}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-start gap-3 text-[14px] text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#e6c778] transition-all duration-300 group-hover:border-[#d4a537] group-hover:bg-[#d4a537] group-hover:text-[#0a2e6e]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="break-words pt-1 leading-snug">{text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Col>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-1 px-[6%] py-4 text-center text-[13px] text-white/60 md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {company.name} All Rights Reserved. · GST: {company.gst}
          </p>
          <div className="flex items-center gap-2">
            Website Designed By Inquiry Bazaar Pvt. Ltd.
            <a href="https://inquirybazaar.com/" className="text-white transition-colors hover:text-brand-300">
              B2B Marketplace
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
