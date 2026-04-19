import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the Vaidyas behind Ojas Theeram — a team dedicated to reviving classical Ayurvedic science. Learn our philosophy, story, and commitment to holistic healing in Bengaluru.",
  alternates: { canonical: "https://ojastheeram.com/about" },
  openGraph: {
    title: "About Us | Ojas Theeram",
    description:
      "Where ancient wisdom meets modern care. Meet our experienced Ayurvedic physicians and learn about our healing philosophy.",
    url: "https://ojastheeram.com/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
