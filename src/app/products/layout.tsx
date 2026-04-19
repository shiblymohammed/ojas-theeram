import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Herbal Products",
  description:
    "Premium Ayurvedic herbal products formulated at Ojas Theeram using classical recipes and certified organic ingredients. Order via WhatsApp.",
  alternates: { canonical: "https://ojastheeram.com/products" },
  openGraph: {
    title: "Herbal Products | Ojas Theeram",
    description:
      "Authentic Ayurvedic herbal products from Ojas Theeram, crafted using classical formulations and premium organic ingredients.",
    url: "https://ojastheeram.com/products",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
