/*
  Product catalogue – single source of truth for the Products listing page,
  every Product Detail page (/products/[slug]) and the homepage sections.

  Raw rows live in ./catalog.json (generated from the two company sources):
    - https://neelgirichemicals.com/                      → 10 rutile TiO₂ grades (names only)
    - https://www.indiamart.com/surya-min-chem/profile.html → 40 products with price + photo

  To add or edit a product, edit catalog.json. Everything below is derived.

  Images
  ------
  Photos are hot-linked from IndiaMART's CDN by default. `scripts/download-product-images.mjs`
  downloads them into /public/products and writes ./local-images.json, after which this file
  automatically serves the local copies instead.
*/

import catalog from "./catalog.json";
import localImages from "./local-images.json";

/* Flip to false to hide the indicative prices everywhere. */
export const SHOW_PRICES = true;

export const categories = [
  {
    id: "titanium-dioxide",
    label: "Titanium Dioxide",
    icon: "atom",
    tagline: "Rutile TiO₂ grades from leading producers",
    blurb:
      "Rutile titanium dioxide (TiO₂) grades from leading global and Chinese producers – the white pigment behind paints, coatings, plastics, inks and thermoplastic road-marking paint.",
    uses: ["Paints & coatings", "Plastic compounds & masterbatches", "Inks & coatings", "Hot-melt road marking paint"],
  },
  {
    id: "road-marking-paint",
    label: "Road Marking Paint",
    icon: "road",
    tagline: "Hot-applied thermoplastic paint",
    blurb:
      "Hot-applied thermoplastic road-marking paint in powder form for highways, zebra crossings, convex (raised) markings and standard lane lines.",
    uses: ["Highways & expressways", "Zebra crossings", "Lane & edge lines", "Convex / raised markings"],
  },
  {
    id: "glass-beads",
    label: "Glass Beads",
    icon: "circles",
    tagline: "Road-marking, casting & grinding beads",
    blurb:
      "Glass beads for retro-reflective road markings (drop-on and intermix, BS 6088 A/B) plus casting and grinding beads for industrial use.",
    uses: ["Drop-on road-marking beads", "Intermix beads for thermoplastic", "Grinding & milling media", "Casting & surface finishing"],
  },
  {
    id: "hydrocarbon-resins",
    label: "Hydrocarbon Resins",
    icon: "network",
    tagline: "C5, C9 & hydrogenated grades",
    blurb:
      "C5 and C9 hydrocarbon resins, including hydrogenated and water-white grades, used as tackifiers and binders.",
    uses: ["Hot-melt adhesives", "Hot-melt road-marking paint", "Inks, paints & coatings", "Rubber compounding"],
  },
  {
    id: "stearates",
    label: "Stearates",
    icon: "layers",
    tagline: "Zinc, calcium & aluminium stearates",
    blurb:
      "Zinc, calcium and aluminium stearate powders for plastics, paints, rubber and other industrial processes, including food-grade calcium stearate.",
    uses: ["Plastics processing", "Paints & coatings", "Rubber", "Lubricants & release"],
  },
  {
    id: "industrial-chemicals",
    label: "Industrial Chemicals",
    icon: "flask",
    tagline: "Powders & additives for industry",
    blurb:
      "Industrial-grade chemical powders and additives supplied for manufacturing, formulation and processing.",
    uses: ["Manufacturing & formulation", "Paints, inks & coatings", "Plastics & rubber", "Lubricants, agriculture & pesticides"],
  },
  {
    id: "starch",
    label: "Starch Powder",
    icon: "sprout",
    tagline: "Tapioca & maize starch",
    blurb:
      "Tapioca and maize starch powders, including food-grade options, for industrial and food applications.",
    uses: ["Adhesives & binders", "Food processing (food-grade)", "Industrial formulations"],
  },
  {
    id: "road-marking-machines",
    label: "Road Marking Machines",
    icon: "cog",
    tagline: "Thermoplastic marking equipment",
    blurb:
      "Thermoplastic road-marking machines and allied process equipment – from compact convex-marking units to fully automatic 650 kg systems – supplied alongside the marking materials.",
    uses: ["Highway line marking", "Zebra crossings & arrows", "Convex marking", "Thermoplastic paint preparation"],
  },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));

/* ---------- image helpers ---------- */

/*
  IndiaMART serves several sizes of every photo. The catalogue stores the 125×125
  thumbnail that is known to exist; we try larger sizes first and fall back to it.
  <Img> (components/ui/Img.jsx) walks this list on load errors.
*/
const imageCandidates = (url) => {
  if (!url) return [];
  if (/-125x125\.[a-z]+$/i.test(url)) {
    return [
      url.replace("-125x125.", "-500x500."),
      url.replace("-125x125.", "-250x250."),
      url,
    ];
  }
  return [url];
};

const listFormat = (items) => items.map((s) => s.toLowerCase()).join(", ");

const build = (row) => {
  const cat = categoryById[row.category];
  const local = localImages[row.slug];
  const images = local ? [local] : imageCandidates(row.image);
  const hasPrice = typeof row.price === "number";

  const specifications = [
    { parameter: "Product", value: row.name },
    { parameter: "Category", value: cat.label },
    ...(SHOW_PRICES && hasPrice
      ? [
          { parameter: "Indicative price", value: `${formatPrice(row.price)} / ${row.unit}` },
          { parameter: "Sold per", value: row.unit },
        ]
      : [{ parameter: "Price & availability", value: "On request – contact our team" }]),
    { parameter: "Supplied by", value: "Neelgiri Chemicals Pvt. Ltd., New Delhi" },
  ];

  const faqs = [
    {
      q: `How do I get a quote for ${row.name}?`,
      a: "Use the Get a Quote button or send us your required quantity and delivery location. Our team will reply with current pricing and availability.",
    },
    {
      q: "Can I get a technical data sheet or a sample?",
      a: "Contact our team with your application details and we will share the available technical information and discuss sample options.",
    },
    ...(SHOW_PRICES && hasPrice
      ? [
          {
            q: "Is the listed price final?",
            a: "The price shown is indicative and can change with order quantity, packaging and market conditions. Please contact us for a confirmed quote.",
          },
        ]
      : []),
    {
      q: `Which applications is ${row.name} used for?`,
      a: `Typical uses in this category include ${listFormat(cat.uses)}.`,
    },
  ];

  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    category: row.category,
    categoryLabel: cat.label,
    price: SHOW_PRICES && hasPrice ? row.price : null,
    priceUnit: row.unit,
    images,
    image: images[0] || null,
    ogImage: row.image || null,
    summary: `${row.name}, supplied by Neelgiri Chemicals for ${listFormat(cat.uses.slice(0, 3))}.`,
    overview: `${cat.blurb} Contact our team for grade details, technical data sheets and current availability.`,
    uses: cat.uses,
    specifications,
    faqs,
    source: row.source,
    sourceUrl: row.sourceUrl,
  };
};

/* ---------- formatters ---------- */

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/* ---------- exports ---------- */

const order = Object.fromEntries(categories.map((c, i) => [c.id, i]));

export const products = catalog
  .map(build)
  .sort(
    (a, b) =>
      order[a.category] - order[b.category] ||
      // products with photos first inside a category
      Number(Boolean(b.image)) - Number(Boolean(a.image))
  );

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);

export const getProductsByCategory = (categoryId) =>
  products.filter((p) => p.category === categoryId);

export const getRelatedProducts = (product, limit = 4) => {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const withPhoto = same.filter((p) => p.image);
  return (withPhoto.length >= limit ? withPhoto : same).slice(0, limit);
};

/* First product that has a photo – used for category tiles on the homepage. */
export const categoryCoverImages = (categoryId) =>
  getProductsByCategory(categoryId).find((p) => p.images.length)?.images ?? [];

export const productCount = products.length;
