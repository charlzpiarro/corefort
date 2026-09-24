import { Brand } from "@/types/brand";

// Logos are trimmed and normalised (public/images/partners). Order alternates wide and tall marks
// so the scrolling row keeps an even visual rhythm.
const brandsData: Brand[] = [
  { id: 1, name: "Manonga Medical Clinic", href: "", image: "/images/partners/manonga-medical-clinic.webp", width: 394, height: 300 },
  { id: 2, name: "Noble Academy", href: "", image: "/images/partners/noble-academy.webp", width: 444, height: 300 },
  { id: 3, name: "Infinitynest Company Limited", href: "", image: "/images/partners/infinitynest.webp", width: 379, height: 300 },
  { id: 4, name: "Onyango Company Limited", href: "", image: "/images/partners/onyango-company-limited.webp", width: 340, height: 300 },
  { id: 5, name: "Noble Printing", href: "", image: "/images/partners/noble-printing.webp", width: 164, height: 172 },
  { id: 6, name: "Eaglelife Company Limited", href: "", image: "/images/partners/eaglelife.webp", width: 474, height: 300 },
];

export default brandsData;
