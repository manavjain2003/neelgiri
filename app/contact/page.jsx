import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Suspense } from "react";
import { company, whatsappLink } from "@/lib/company";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";

export const metadata = {
  title: "Contact Us",
  description:
    "Get a quote from Neelgiri Chemicals for titanium dioxide, road marking materials, resins, stearates and more. Call, WhatsApp or email our New Delhi team.",
};

const channels = [
  {
    icon: Phone,
    label: "Call us",
    value: company.phone,
    href: `tel:${company.phoneHref}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: whatsappLink(
      "Hello, I would like a quote for your chemical products.",
    ),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: company.address,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#f8faff] text-[#101d3d]">
      <PageHero
        eyebrow="We're here to help"
        title="Contact"
        highlight="Us"
        description="Tell us the product, grade and quantity you need and our team will respond with pricing and availability."
        bannerImage="/images/why.png"
      />

<section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
  <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-8">
    <div className="space-y-4">
            {channels.map(({ icon: Icon, label, value, href, external }) => {
              const body = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eaf2ff] text-[#0866f5]">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#8794aa]">
                      {label}
                    </span>
                    <span className="mt-0.5 block break-words text-[14px] font-bold text-[#14264b]">
                      {value}
                    </span>
                  </span>
                </>
              );
              const cardClass =
                "flex items-center gap-4 rounded-[15px] border border-[#dce6f2] bg-white p-4 shadow-[0_5px_20px_rgba(20,55,100,0.035)]";
              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`${cardClass} transition-all hover:-translate-y-0.5 hover:border-[#b8d2f7]`}
                >
                  {body}
                </a>
              ) : (
                <div key={label} className={cardClass}>
                  {body}
                </div>
              );
            })}

            <div className="flex items-start gap-3 rounded-[15px] border border-[#dce9fb] bg-[linear-gradient(145deg,#f1f7ff,#e5efff)] p-5">
              <Clock size={20} className="mt-0.5 shrink-0 text-[#0866f5]" />
              <p className="text-[12px] leading-[1.7] text-[#52627e]">
                Need a quick answer? WhatsApp is the fastest way to reach us.
                Include the grade, quantity and delivery location in your enquiry.
              </p>
            </div>
          </div>

          <Suspense fallback={null}><ContactForm /></Suspense>
           <div className="lg:col-span-2">
      <LocationMap />
    </div>
        </div>
      </section>
    </div>
  );
}