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
    features: [
      "Rutile crystal form for strong whiteness and opacity",
      "Grades from leading global and Chinese producers",
      "Suited to paints, plastics, inks and road marking",
      "Grade selection help matched to your application",
    ],
  },
  {
    id: "road-marking-paint",
    label: "Road Marking Paint",
    icon: "road",
    tagline: "Hot-applied thermoplastic paint",
    blurb:
      "Hot-applied thermoplastic road-marking paint in powder form for highways, zebra crossings, convex (raised) markings and standard lane lines.",
    uses: ["Highways & expressways", "Zebra crossings", "Lane & edge lines", "Convex / raised markings"],
    features: [
      "Hot-applied thermoplastic in powder form",
      "Options for highways, crossings and lane lines",
      "Pairs with glass beads for retro-reflective finish",
      "Materials and marking machines from one supplier",
    ],
  },
  {
    id: "glass-beads",
    label: "Glass Beads",
    icon: "circles",
    tagline: "Road-marking, casting & grinding beads",
    blurb:
      "Glass beads for retro-reflective road markings (drop-on and intermix, BS 6088 A/B) plus casting and grinding beads for industrial use.",
    uses: ["Drop-on road-marking beads", "Intermix beads for thermoplastic", "Grinding & milling media", "Casting & surface finishing"],
    features: [
      "Drop-on and intermix grades (BS 6088 A/B)",
      "Casting and grinding beads for industrial use",
      "Helps road markings stay visible at night",
      "Pairs with our thermoplastic paint range",
    ],
  },
  {
    id: "hydrocarbon-resins",
    label: "Hydrocarbon Resins",
    icon: "network",
    tagline: "C5, C9 & hydrogenated grades",
    blurb:
      "C5 and C9 hydrocarbon resins, including hydrogenated and water-white grades, used as tackifiers and binders.",
    uses: ["Hot-melt adhesives", "Hot-melt road-marking paint", "Inks, paints & coatings", "Rubber compounding"],
    features: [
      "C5, C9 and hydrogenated grades available",
      "Water-white options for colour-sensitive uses",
      "Works as a tackifier or binder",
      "Used across adhesives, inks, paints and rubber",
    ],
  },
  {
    id: "stearates",
    label: "Stearates",
    icon: "layers",
    tagline: "Zinc, calcium & aluminium stearates",
    blurb:
      "Zinc, calcium and aluminium stearate powders for plastics, paints, rubber and other industrial processes, including food-grade calcium stearate.",
    uses: ["Plastics processing", "Paints & coatings", "Rubber", "Lubricants & release"],
    features: [
      "Zinc, calcium and aluminium stearate options",
      "Fine powders for easy dispersion",
      "Food-grade calcium stearate available",
      "Used as lubricant, stabiliser and release agent",
    ],
  },
  {
    id: "industrial-chemicals",
    label: "Industrial Chemicals",
    icon: "flask",
    tagline: "Powders & additives for industry",
    blurb:
      "Industrial-grade chemical powders and additives supplied for manufacturing, formulation and processing.",
    uses: ["Manufacturing & formulation", "Paints, inks & coatings", "Plastics & rubber", "Lubricants, agriculture & pesticides"],
    features: [
      "Industrial-grade powders and additives",
      "Branded and technical grades",
      "One supplier for many raw materials",
      "Responsive quotes for your volume",
    ],
  },
  {
    id: "starch",
    label: "Starch Powder",
    icon: "sprout",
    tagline: "Tapioca & maize starch",
    blurb:
      "Tapioca and maize starch powders, including food-grade options, for industrial and food applications.",
    uses: ["Adhesives & binders", "Food processing (food-grade)", "Industrial formulations"],
    features: [
      "Tapioca and maize starch options",
      "Food-grade options available",
      "Imported and domestic sourcing",
      "Suited to adhesives, binders and formulations",
    ],
  },
  {
    id: "road-marking-machines",
    label: "Road Marking Machines",
    icon: "cog",
    tagline: "Thermoplastic marking equipment",
    blurb:
      "Thermoplastic road-marking machines and allied process equipment – from compact convex-marking units to fully automatic 650 kg systems – supplied alongside the marking materials.",
    uses: ["Highway line marking", "Zebra crossings & arrows", "Convex marking", "Thermoplastic paint preparation"],
    features: [
      "Range from compact units to fully automatic systems",
      "Supplied alongside marking materials",
      "Suited to highways, crossings and convex marking",
      "Process equipment for paint preparation",
    ],
  },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));


const im = (n, path) => `https://${n}.imimg.com/data${n}/${path}`;


const P = (slug, name, category, price = null, unit = null, image = null, images = null) => ({
  slug,
  name,
  category,
  price,
  unit,
  image,
  images,
});

const TIO2 = {
  dawn: im(5, "SELLER/Default/2026/9/643556410/BJ/QP/FB/4261710/dawn-r2195-road-marking-titanium-dioxide-500x500.png"),
  dawnAlt: im(5, "SELLER/Default/2026/8/639912584/KW/YJ/ZF/4261710/dawn-r-2195-titanium-dioxide-500x500.png"),
  jinhai: im(5, "SELLER/Default/2026/8/638455624/JX/OP/IP/4261710/jinhai-r6618-rutile-titanium-dioxide-500x500.png"),
  pangang: im(5, "SELLER/Default/2026/8/637818873/OH/AG/UM/4261710/pangang-r248-titanium-dioxide-500x500.png"),
  tiPure: im(5, "SELLER/Default/2026/8/638472141/BS/EO/HC/4261710/dupont-ti-pure-r104-technical-grade-titanium-dioxide-500x500.png"),
  bluestar818: im(5, "OD/IY/RA/SELLER-4261710/tt-r-818-500x500.jpg"),
  bluestar878: im(5, "DX/LI/IV/SELLER-4261710/tt-r-878-pic-500x500.jpg"),
  ttB101: im(5, "MR/WR/MY-4261710/titanium-dioxide-anatase-b101-500x500.jpg"),
};

const data = [
  /* Titanium dioxide */
  P(
    "dawn-r2195-road-marking-titanium-dioxide",
    "Dawn R2195 Road Marking Titanium Dioxide",
    "titanium-dioxide",
    225,
    "Kg",
    im(5, "SELLER/Default/2026/9/643556410/BJ/QP/FB/4261710/dawn-r2195-road-marking-titanium-dioxide-125x125.png"),
    [TIO2.dawn, TIO2.dawnAlt, TIO2.bluestar818]
  ),
  P(
    "jinhai-r6618-rutile-titanium-dioxide",
    "Jinhai R6618 Rutile Titanium Dioxide",
    "titanium-dioxide",
    233,
    "Kg",
    im(5, "SELLER/Default/2026/8/638455624/JX/OP/IP/4261710/jinhai-r6618-rutile-titanium-dioxide-125x125.png"),
    [TIO2.jinhai, TIO2.pangang, TIO2.tiPure]
  ),
  P(
    "pangang-r248-titanium-dioxide",
    "Pangang R248 Titanium Dioxide",
    "titanium-dioxide",
    225,
    "Kg",
    im(5, "SELLER/Default/2026/8/637818873/OH/AG/UM/4261710/pangang-r248-titanium-dioxide-125x125.png"),
    [TIO2.pangang, TIO2.jinhai, TIO2.dawnAlt]
  ),
  P(
    "bluestar-r818-rutile-titanium-dioxide",
    "Bluestar R818 Rutile Titanium Dioxide",
    "titanium-dioxide",
    225,
    "Kg",
    im(5, "OD/IY/RA/SELLER-4261710/tt-r-818-125x125.jpg"),
    [TIO2.bluestar818, TIO2.bluestar878, TIO2.ttB101]
  ),
  P("bluestar-r878-titanium-dioxide-rutile", "Bluestar R878 Titanium Dioxide Rutile", "titanium-dioxide", 225, "Kg", im(5, "DX/LI/IV/SELLER-4261710/tt-r-878-pic-125x125.jpg")),
  P("tikon-tr-33-rutile-titanium-dioxide", "TiKON TR-33 Rutile Titanium Dioxide", "titanium-dioxide"),
  P("venator-tioxide-tr28", "Venator TIOXIDE TR28", "titanium-dioxide"),
  P("titanium-dioxide-r-298", "Titanium Dioxide R-298", "titanium-dioxide"),
  P("titanium-dioxide-rutile-r-902", "Titanium Dioxide Rutile R-902", "titanium-dioxide"),
  P("cristal-tr-36-rutile-titanium-dioxide", "Cristal TR-36 Rutile Titanium Dioxide", "titanium-dioxide"),
  P("r-249-titanium-dioxide-rutile", "R-249 Titanium Dioxide Rutile", "titanium-dioxide"),
  P("titanium-dioxide-r-104", "Titanium Dioxide R-104", "titanium-dioxide"),
  P("tyr-588-titanium-dioxide-rutile", "TYR-588 Titanium Dioxide Rutile", "titanium-dioxide"),
  P("titanium-dioxide-r-3395", "Titanium Dioxide R-3395", "titanium-dioxide"),

  /* Industrial chemicals */
  P("sodium-benzoate-powder", "Sodium Benzoate Powder", "industrial-chemicals", 215, "Kg", im(5, "SELLER/Default/2022/11/YJ/LD/SR/4261710/sodium-benzoate-powder-125x125.jpg")),
  P("white-zinc-sulphate-powder", "White Zinc Sulphate Powder", "industrial-chemicals", 44, "Kg", im(4, "LU/DE/MY-4261710/zinc-sulphate-125x125.jpg")),
  P("evonik-aerosil-r972-powder", "Evonik Aerosil R972 Powder", "industrial-chemicals", 650, "Kg", im(5, "SELLER/Default/2022/11/XP/XC/PZ/4261710/aerosil-r972-powder-125x125.jpg")),
  P("technical-grade-aluminium-oxide-powder", "Technical Grade Aluminium Oxide Powder", "industrial-chemicals", 50, "Kg", im(5, "SELLER/Default/2023/10/349472020/DG/UI/AK/4261710/aluminium-oxide-powder-125x125.jpeg")),
  P("wilfarin-stearic-acid-beads", "Wilfarin Stearic Acid Beads", "industrial-chemicals", 94, "Kg", im(5, "SELLER/Default/2023/9/343254997/CN/JT/BJ/4261710/stearic-acid-125x125.jpg")),

  /* Road marking paint */
  P("road-marking-paint-powder", "Road Marking Paint Powder", "road-marking-paint", 38, "Kg", im(5, "SELLER/Default/2022/11/XM/CS/HK/4261710/road-marking-paint-125x125.jpg")),
  P("convex-road-marking-paint", "Convex Road Marking Paint", "road-marking-paint", 34, "Kg", im(5, "SELLER/Default/2022/11/CO/YV/EK/4261710/convex-road-marking-paint-125x125.webp")),
  P("zebra-crossing-paint", "Zebra Crossing Paint", "road-marking-paint", 34, "Kg", im(3, "RD/YV/MY-4261710/zebra-crossing-paint-125x125.jpg")),
  P("standard-road-marking-paint", "Standard Road Marking Paint", "road-marking-paint", 34, "Kg", im(5, "SELLER/Default/2022/11/FE/HI/GL/4261710/standard-road-marking-paint-125x125.webp")),
  P("hot-applied-road-marking-paint", "Hot Applied Road Marking Paint", "road-marking-paint", 32, "Kg", im(5, "SELLER/Default/2022/11/JX/GO/HB/4261710/hot-applied-road-marking-paint-125x125.jpg")),

  /* Glass beads */
  P("casting-glass-beads", "Casting Glass Beads", "glass-beads", 45, "Kg", im(5, "SELLER/Default/2022/11/PV/VN/EO/4261710/glass-beads-for-casting-125x125.jpg")),
  P("4mm-grinding-glass-beads", "4mm Grinding Glass Beads", "glass-beads", 85, "Kg", im(5, "SELLER/Default/2022/11/IV/GP/EY/4261710/grinding-glass-beads-125x125.jpg")),
  P("insta-reflecto-bs6088b-road-marking-glass-beads", "Insta Reflecto BS6088B Road Marking Glass Beads", "glass-beads", 40, "Kg", im(5, "SELLER/Default/2022/11/PT/KS/IA/4261710/glass-beads-drop-on-instareflecto-bs6088b-road-roadmarking-paint-125x125.jpg")),
  P("instareflecto-bs6088a-road-marking-intermix-glass-beads", "Instareflecto BS6088A Road Marking Intermix Glass Beads", "glass-beads", 40, "Kg", im(5, "GV/GX/XB/SELLER-4261710/glass-beads-intermix-instareflecto-bs6088a-road-roadmarking-paint-125x125.jpg")),
  P("sovitec-glass-beads", "Sovitec Glass Beads", "glass-beads", 85, "Kg", im(5, "SELLER/Default/2025/6/522900491/VV/UO/BK/4261710/sovitec-glass-beads-125x125.jpg")),

  /* Starch */
  P("thailand-tapioca-starch", "Thailand Tapioca Starch", "starch", 64, "Kg", im(5, "SELLER/Default/2026/9/645308697/SM/LC/ZB/4261710/thailand-tapioca-starch-125x125.png")),
  P("tapioca-starch-powder", "Tapioca Starch Powder", "starch", 62, "Kg", im(5, "SELLER/Default/2026/9/645308350/KW/CW/DO/4261710/tapioca-starch-powder-125x125.png")),
  P("bluecraft-agro-maize-starch-powder", "Bluecraft Agro Maize Starch Powder", "starch", 36, "Kg", im(5, "SELLER/Default/2021/9/QR/BF/MQ/4261710/maize-starch-blue-kraft-packaging-125x125.jpg")),
  P("food-grade-maize-starch-powder", "Food Grade Maize Starch Powder", "starch", 37, "Kg", im(5, "SELLER/Default/2022/11/TB/BX/QQ/4261710/maize-starch-powder-125x125.jpg")),
  P("imported-tapioca-starch", "Imported Tapioca Starch", "starch", 55, "Kg", im(5, "SELLER/Default/2022/11/OR/TD/DH/4261710/imported-tapioca-starch-125x125.jpg")),

  /* Road marking machines */
  P("500-kg-thermoplastic-road-marking-machine", "500 Kg Thermoplastic Road Marking Machine", "road-marking-machines", 78000, "Unit", im(4, "CF/AR/MY-4261710/thermoplastic-road-marking-machine-125x125.jpg")),
  P("v-3900-graco-line-lazer-road-marking-machine", "V 3900 Graco Line Lazer Road Marking Machine", "road-marking-machines", 350000, "Unit", im(5, "SELLER/Default/2022/11/FU/XH/CP/4261710/v-3900-graco-line-lazer-road-marking-machine-125x125.jpg")),
  P("650-kg-fully-automatic-road-marking-machine", "650 Kg Fully Automatic Road Marking Machine", "road-marking-machines", 1150000, "Piece", im(5, "SELLER/Default/2023/1/NR/MY/NL/4261710/fully-automatic-road-marking-machine-125x125.jpeg")),
  P("convex-road-marking-machine", "Convex Road Marking Machine", "road-marking-machines", 75000, "Unit", im(5, "SELLER/Default/2022/10/WN/OS/HT/4261710/convex-road-marking-machine-125x125.jpg")),
  P("ribbon-blender-machine", "Ribbon Blender Machine", "road-marking-machines", 315000, "Piece", im(5, "SELLER/Default/2022/10/HN/AP/HD/4261710/ribbon-blender-machine-125x125.webp")),

  /* Hydrocarbon resins */
  P("water-white-hydrogenated-hydrocarbon-resins", "Water White Hydrogenated Hydrocarbon Resins", "hydrocarbon-resins", 135, "Kg", im(3, "LO/PT/MY-4261710/hydrotgenerated-hydrocarbon-resin-125x125.jpg")),
  P("c9-aromatic-hydrocarbon-resin", "C9 Aromatic Hydrocarbon Resin", "hydrocarbon-resins", 125, "Kg", im(5, "SELLER/Default/2022/11/TX/TA/YU/4261710/c9-aromatic-hydrocarbon-resin-125x125.webp")),
  P("hydrogenated-hydrocarbon-resins", "Hydrogenated Hydrocarbon Resins", "hydrocarbon-resins", 132, "Kg", im(5, "SELLER/Default/2022/11/LF/TH/MX/4261710/hydrogenated-hydrocarbon-resins-125x125.webp")),
  P("ningbo-c5-hydrocarbon-resin", "Ningbo C5 Hydrocarbon Resin", "hydrocarbon-resins", 120, "Kg", im(5, "SELLER/Default/2026/8/637418905/CE/XC/PY/4261710/ningbo-c5-hydrocarbon-resin-125x125.webp")),

  /* Stearates */
  P("aluminum-stearate-paints", "Aluminum Stearate Paints", "stearates", 75, "Kg", im(5, "SELLER/Default/2024/2/389280753/HZ/HT/GD/4261710/aluminum-stearate-industrial-125x125.jpeg")),
  P("fusion-grade-zinc-stearate", "Fusion Grade Zinc Stearate", "stearates", 90, "Kg", im(5, "SELLER/Default/2026/9/645291834/HL/UU/QY/4261710/fusion-grade-zinc-stearate-125x125.png")),
  P("aluminium-stearate-hi-gel", "Aluminium Stearate Hi Gel", "stearates", 145, "Kg", im(5, "SELLER/Default/2025/3/495770721/KZ/HH/AE/4261710/aluminium-stearate-hi-gel-125x125.jpg")),
  P("aluminum-stearate-powder", "Aluminum Stearate Powder", "stearates", 80, "Kg", im(5, "HX/HW/QU/SELLER-4261710/aluminum-stearate-125x125.jpg")),
  P("industrial-grade-calcium-stearate-powder", "Industrial Grade Calcium Stearate Powder", "stearates", 88, "Kg", im(5, "SELLER/Default/2024/3/398021247/BZ/DX/XO/4261710/whatsapp-image-2024-03-09-at-4-35-37-pm-125x125.jpeg")),
  P("food-grade-calcium-stearate-powder", "Food Grade Calcium Stearate Powder", "stearates", 88, "Kg", im(5, "SELLER/Default/2024/3/398029591/CW/ZK/SZ/4261710/whatsapp-image-2024-03-09-at-4-35-37-pm-125x125.jpeg")),
];


const imageCandidates = (url) => {
  if (!url) return [];
  if (/-125x125\.[a-z]+$/i.test(url)) {
    return [url.replace("-125x125.", "-500x500."), url.replace("-125x125.", "-250x250."), url];
  }
  return [url];
};

const listFormat = (items) => items.map((s) => s.toLowerCase()).join(", ");

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

const build = (row) => {
  const cat = categoryById[row.category];
  /* gallery: one unique image per entry (no size variants shown as duplicates) */
  const fallbacks = imageCandidates(row.image); // 500 -> 250 -> 125, used only as load fallbacks
  const images = row.images?.length ? row.images : fallbacks.slice(0, 1);
  const hasPrice = typeof row.price === "number";
  const showPrice = SHOW_PRICES && hasPrice;
  const fromIndiaMart = Boolean(row.image);

  const specifications = [
    { parameter: "Product", value: row.name },
    { parameter: "Category", value: cat.label },
    ...(showPrice
      ? [
          { parameter: "Indicative price", value: `${formatPrice(row.price)} / ${row.unit}` },
          { parameter: "Sold per", value: row.unit },
        ]
      : [{ parameter: "Price & availability", value: "On request – contact our team" }]),
    { parameter: "Supplied by", value: "Neelgiri Chemicals Pvt. Ltd., New Delhi" },
  ];

  /* supply & ordering details shown beside the specifications */
  const supply = [
    { parameter: "Packaging", value: "Pack size and type confirmed at quote" },
    { parameter: "Order quantity", value: "Share your required quantity for a quote" },
    { parameter: "Delivery", value: "Send your delivery location for timelines" },
    { parameter: "Documents", value: "Technical information on request" },
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
    ...(showPrice
      ? [
          {
            q: "Is the listed price final?",
            a: "The price shown is indicative and can change with order quantity, packaging and market conditions. Please contact us for a confirmed quote.",
          },
        ]
      : [
          {
            q: "Why is the price not listed?",
            a: "Pricing for this product depends on grade, quantity and market conditions, so we quote it individually. Send us your requirement and we will reply with current pricing.",
          },
        ]),
    {
      q: `Which applications is ${row.name} used for?`,
      a: `Typical uses in this category include ${listFormat(cat.uses)}.`,
    },
    {
      q: "What quantity can I order?",
      a: "Tell us how much you need, from trial lots to regular supply, and we will confirm what is available and the best way to ship it.",
    },
    {
      q: "Do you deliver to my location?",
      a: "Share your delivery city or pin code with your enquiry and our team will confirm shipping options and expected timelines.",
    },
    {
      q: "Can you help me choose the right grade?",
      a: "Yes. Describe your application and process, and we will suggest suitable grades from our range of 280+ raw materials.",
    },
  ];

  return {
    id: row.slug,
    slug: row.slug,
    name: row.name,
    category: row.category,
    categoryLabel: cat.label,
    categoryTagline: cat.tagline,
    price: showPrice ? row.price : null,
    priceUnit: row.unit,
    images,
    imageFallbacks: fallbacks,
    image: images[0] || null,
    ogImage: row.image || images[0] || null,
    summary: `${row.name}, supplied by Neelgiri Chemicals for ${listFormat(cat.uses.slice(0, 3))}.`,
    overview: `${cat.blurb} Contact our team for grade details, technical data sheets and current availability.`,
    about: `${row.name} belongs to our ${cat.label.toLowerCase()} range. ${cat.tagline}. Neelgiri Chemicals has supplied industrial raw materials from New Delhi since 2004, and our team can help you match the right product to your process, volume and budget.`,
    uses: cat.uses,
    features: cat.features,
    specifications,
    supply,
    faqs,
    source: fromIndiaMart ? "indiamart" : "neelgirichemicals.com",
    sourceUrl: fromIndiaMart
      ? "https://www.indiamart.com/surya-min-chem/profile.html"
      : `https://neelgirichemicals.com/product/${row.slug}/`,
  };
};


const order = Object.fromEntries(categories.map((c, i) => [c.id, i]));

export const products = data
  .map(build)
  .sort(
    (a, b) =>
      order[a.category] - order[b.category] ||
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

export const categoryCoverImages = (categoryId) =>
  getProductsByCategory(categoryId).find((p) => p.images.length)?.images ?? [];

export const productCount = products.length; 
