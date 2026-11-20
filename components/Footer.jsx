"use client";

import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Logo from "@/components/ui/Logo";

const quick = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "Why Us", href: "#why-us" },
];

const resources = [
  { label: "FAQs", href: "#faq" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/company/neelgirichemicals" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/neelgirichemicals" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@neelgirichemicals" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/neelgirichemicals" },
];

const contacts = [
  { icon: Phone, text: "+91 98765 43210", href: "tel:+919876543210" },
  { icon: Mail, text: "info@neelgirichemicals.com", href: "mailto:info@neelgirichemicals.com" },
  { icon: MapPin, text: "New Delhi, Delhi", href: "#" },
];

/* link with a gold dash that grows in on hover */
function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center text-[14px] text-white/70 transition-colors duration-300 hover:text-[#e6c778]"
    >
      <span className="h-px w-0 shrink-0 bg-[#e6c778] transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
      {children}
    </a>
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
        {/* Columns */}
        <nav aria-label="Footer">
          <div className="grid gap-8 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr]">
            {/* Brand */}
            <div>
              <div className="inline-block h-40 -m-6">
               <img src="/logo.webp" alt="Neelgiri" width={200} height={120} />
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

            <Col title="Resources">
              <ul className="space-y-2.5">
                {resources.map(({ label, href }) => (
                  <li key={label}>
                    <FooterLink href={href}>{label}</FooterLink>
                  </li>
                ))}
              </ul>
            </Col>

            <Col title="Contact Us">
              <ul className="space-y-3">
                {contacts.map(({ icon: Icon, text, href }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className="group flex items-center gap-3 text-[14px] text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#e6c778] transition-all duration-300 group-hover:border-[#d4a537] group-hover:bg-[#d4a537] group-hover:text-[#0a2e6e]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="break-all">{text}</span>
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
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-1 px-[6%] py-4 text-[13px] text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} Neelgiri Chemicals. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
           Website Designed By Inquiry Bazaar Pvt. Ltd.
            <a href="https://inquirybazaar.com/" className="transition-colors text-white hover:text-brand">
              B2B Marketplace
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}