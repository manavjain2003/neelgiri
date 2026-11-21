"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import { company } from "@/lib/company";
import { getProductBySlug } from "@/lib/products";

const field =
  "w-full rounded-[12px] border border-[#cfdcee] bg-white px-4 py-3 text-[14px] text-[#101d3d] outline-none transition focus:border-[#0866f5] focus:ring-4 focus:ring-[#0866f5]/10";

/*
  No backend is wired up: submitting opens the visitor's email client with the
  enquiry pre-filled for Sales@NeelgiriChemicals.com. Swap handleSubmit for a
  fetch() to your API route / form service if you add one.
*/
export default function ContactForm() {
  const params = useSearchParams();
  const [form, setForm] = useState({ name: "", phone: "", email: "", product: "", message: "" });

  useEffect(() => {
    const p = getProductBySlug(params.get("product") || "");
    if (p) setForm((f) => ({ ...f, product: p.name }));
  }, [params]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Enquiry${form.product ? `: ${form.product}` : ""} – ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      form.product && `Product: ${form.product}`,
      "",
      form.message,
    ].filter((l) => l !== false && l !== "").join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[18px] border border-[#dce6f2] bg-white p-6 shadow-[0_5px_20px_rgba(20,55,100,0.035)] sm:p-8">
      <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#102044]">Request a quote</h2>
      <p className="mt-1 text-[13px] text-[#687792]">Tell us the product, quantity and delivery location.</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block text-[12px] font-bold text-[#18315b]">Name
          <input required value={form.name} onChange={set("name")} className={`${field} mt-1.5`} autoComplete="name" />
        </label>
        <label className="block text-[12px] font-bold text-[#18315b]">Phone
          <input required type="tel" value={form.phone} onChange={set("phone")} className={`${field} mt-1.5`} autoComplete="tel" />
        </label>
        <label className="block text-[12px] font-bold text-[#18315b] sm:col-span-2">Email
          <input required type="email" value={form.email} onChange={set("email")} className={`${field} mt-1.5`} autoComplete="email" />
        </label>
        <label className="block text-[12px] font-bold text-[#18315b] sm:col-span-2">Product
          <input value={form.product} onChange={set("product")} placeholder="e.g. Rutile Titanium Dioxide" className={`${field} mt-1.5`} />
        </label>
        <label className="block text-[12px] font-bold text-[#18315b] sm:col-span-2">Message
          <textarea required rows={5} value={form.message} onChange={set("message")} className={`${field} mt-1.5 resize-y`} />
        </label>
      </div>

      <button type="submit" className="btn-primary mt-6 !px-7 !py-3.5 !text-[14px]">
        Send enquiry <Send size={15} />
      </button>
    </form>
  );
}
