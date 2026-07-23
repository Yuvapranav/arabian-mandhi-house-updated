/* ============================================================
   90's Kids Mandi House — MENU DATA
   Single source of truth. Edit prices / items here only.
   Tiered items use { half, full, family }.
   Single-price items use { single }.
   ============================================================ */

const MENU_DATA = [
  /* ---- Alfaham & Grill ---- */
  {
    id: "regular-alfaham",
    name: "Regular Alfaham",
    category: "Alfaham",
    desc: "Charcoal-kissed chicken, marinated overnight in Arabian spice.",
    image: "images/regular-alfaham.webp",
    price: { half: 120, full: 240, family: 470 }
  },
  {
    id: "masala-shawaya",
    name: "Masala Shawaya",
    category: "Alfaham",
    desc: "Slow-roasted and lacquered in our house masala. Bold, never shy.",
    image: "images/masala-shawaya.webp",
    price: { half: 130, full: 260, family: 500 }
  },
  {
    id: "peri-peri-alfaham",
    name: "Peri Peri Alfaham",
    category: "Alfaham",
    desc: "Bird's eye chilli meets Arabian herbs. Heat with a pedigree.",
    image: "images/peri-peri-alfaham.webp",
    price: { half: 130, full: 260, family: 500 }
  },
  {
    id: "honey-chilli-alfaham",
    name: "Honey Chilli Alfaham",
    category: "Alfaham",
    desc: "Wild honey glaze, slow chilli burn. Sweet start, spicy finish.",
    image: "images/honey-chilli-alfaham.webp",
    price: { half: 140, full: 270, family: 530 }
  },

  /* ---- Mandi (Rice Delights) ---- */
  {
    id: "normal-mandi",
    name: "Normal Mandi",
    category: "Mandi",
    desc: "Long-grain basmati steamed over smoke. The original icon.",
    image: "images/normal-mandi.webp",
    price: { half: 190, full: 380, family: 750 }
  },
  {
    id: "peri-peri-mandi",
    name: "Peri Peri Mandi",
    category: "Mandi",
    desc: "Smoked mandi rice with a fiery peri peri finish. Bring water.",
    image: "images/peri-peri-mandi.webp",
    price: { half: 200, full: 390, family: 780 }
  },
  {
    id: "honey-chilli-mandi",
    name: "Honey Chilli Mandi",
    category: "Mandi",
    desc: "Sweet-heat glaze poured over aromatic basmati. Crowd favourite.",
    image: "images/honey-chilli-mandi.webp",
    price: { half: 210, full: 410, family: 800 }
  },

  /* ---- Breads & Sides ---- */
  {
    id: "kerala-porotta",
    name: "Kerala Porotta",
    category: "Breads",
    desc: "Flaky, layered, pulled by hand. Built for mopping up gravy.",
    image: "images/kerala-porotta.webp",
    price: { single: 20 }
  },
  {
    id: "extra-kuboos",
    name: "Extra Kuboos",
    category: "Breads",
    desc: "Soft Arabian pita, warm off the press. Scoop responsibly.",
    image: "images/extra-kuboos.webp",
    price: { single: 10 }
  },
  {
    id: "extra-mandi-rice",
    name: "Extra Mandi Rice",
    category: "Breads",
    desc: "A second helping of the smoked rice everyone fights over.",
    image: "images/extra-mandi-rice.webp",
    price: { single: 80 }
  },

  /* ---- Juices & Mojitos ---- */
  {
    id: "pineapple-juice",
    name: "Pineapple Juice",
    category: "Juices",
    desc: "Pressed fresh, poured cold. Tropical reset button.",
    image: "images/pineapple-juice.webp",
    price: { single: 50 }
  },
  {
    id: "lime-juice",
    name: "Lime Juice",
    category: "Juices",
    desc: "Zesty, clean, ice-cold. The classic palate cleanser.",
    image: "images/lime-juice.webp",
    price: { single: 25 }
  },
  {
    id: "blue-mojito",
    name: "Blue Mojito",
    category: "Juices",
    desc: "Mint, lime and blue curacao fizz. The table's most photographed.",
    image: "images/blue-mojito.webp",
    price: { single: 80 }
  },
  {
    id: "watermelon-mojito",
    name: "Watermelon Mojito",
    category: "Juices",
    desc: "Muddled watermelon, fresh mint, sharp lime. Summer in a glass.",
    image: "images/watermelon-mojito.webp",
    price: { single: 80 }
  }
];

/* ---- Signature Collection (featured carousel) ---- */
const SIGNATURE_DATA = [
  {
    name: "Masala Shawaya",
    desc: "Overnight marination, open-flame roast, house masala lacquer. This is the plate people come back for.",
    priceFrom: 130,
    image: "images/masala-shawaya.webp"
  },
  {
    name: "Peri Peri Alfaham",
    desc: "African bird's eye chilli crashing into Arabian herbs. Loud, smoky and completely worth the napkins.",
    priceFrom: 130,
    image: "images/peri-peri-alfaham.webp"
  },
  {
    name: "Honey Chilli Alfaham",
    desc: "Wild honey glaze on charcoal-grilled chicken with a slow chilli finish. Sweet start. Spicy ending.",
    priceFrom: 140,
    image: "images/honey-chilli-alfaham.webp"
  },
  {
    name: "Signature Mandi",
    desc: "Smoked basmati, tender chicken, forty years of Arabian technique on one enormous shareable platter.",
    priceFrom: 190,
    image: "images/normal-mandi.webp"
  }
];

/* Category tabs, in display order */
const MENU_CATEGORIES = [
  { key: "All", label: "All" },
  { key: "Alfaham", label: "Alfaham & Grill" },
  { key: "Mandi", label: "Mandi" },
  { key: "Breads", label: "Breads & Sides" },
  { key: "Juices", label: "Juices & Mojitos" }
];
