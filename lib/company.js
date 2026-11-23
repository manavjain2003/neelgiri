
export const FOUNDED = 2004;

export const yearsInBusiness = () => new Date().getFullYear() - FOUNDED;

export const company = {
  name: "Neelgiri Chemicals Pvt. Ltd.",
  shortName: "Neelgiri Chemicals",
  tagline: "Delivering Quality. Driving Innovation. Building Trust.",
  founded: FOUNDED,

  phone: "+91 87961 61378",
  phoneHref: "+918796161378",
  phoneAlt: "+91 79492 83043",
  phoneAltHref: "+917949283043",

  whatsapp: "918796161378",
  whatsappText: "Hello, I would like to know more about your chemical products.",

  email: "Sales@NeelgiriChemicals.com",

  address: "Plot No. 154/920, Pooth Khurd, Industrial Area, New Delhi – 110039, India",
  addressShort: "Pooth Khurd, New Delhi",
  mapQuery: "Plot No. 154/920, Pooth Khurd, Industrial Area, New Delhi 110039",

  gst: "07ABKCS9239D1Z1",

  website: "https://neelgirichemicals.com",
  indiamart: "https://www.indiamart.com/surya-min-chem/profile.html",

  socials: {
    facebook: "https://www.facebook.com/Neelgirichemicals/",
    instagram: "https://www.instagram.com/neelgiri_chemicals/",
    youtube: "https://www.youtube.com/@neelgirichemicals",
    linkedin: "https://www.linkedin.com/company/neelgirichemicalspvtltd/",
  },
};

/* Industries listed on neelgirichemicals.com */
export const industries = [
  "Paint",
  "Ink and Coating",
  "Plastic Compound and Masterbatches",
  "Hot Melt Road Marking Paint",
  "Road Construction and Infrastructure",
  "Road Marking Machines & Equipment",
  "Adhesive and Sealants",
  "Gum Adhesive and Sealants",
  "Hot Melt Adhesive",
  "Rubber and Conveyor Belts",
  "Footwear",
  "Brake Lining",
  "Ceramic",
  "Lubricants, Agriculture & Pesticides",
  "Water Treatment Chemicals",
];

export const whatsappLink = (text = company.whatsappText) =>
  `https://wa.me/${company.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
