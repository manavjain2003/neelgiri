import { company } from "@/lib/company";

export default function LocationMap() {
  const q = encodeURIComponent(company.mapQuery);
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#dce6f2] bg-white shadow-[0_5px_20px_rgba(20,55,100,0.035)]">
      <iframe
        title="Neelgiri Chemicals location"
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[360px] w-full border-0"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#eef3fa] px-5 py-3 text-[13px]">
        <span className="font-semibold text-[#18315b]">{company.address}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#0866f5] hover:underline"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
