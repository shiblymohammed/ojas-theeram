import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treatments & Therapies",
  description:
    "Explore our full range of authentic Panchakarma detoxification and Kerala Ayurvedic therapies at Ojas Theeram, Bengaluru. Personalised treatment plans guided by our B.A.M.S physician.",
  keywords: [
    "Panchakarma Bengaluru",
    "Ayurvedic therapy Bangalore",
    "Vasti treatment",
    "Abhyanga massage",
    "Shirodhara Bengaluru",
    "Kerala Ayurveda treatments",
  ],
  alternates: { canonical: "https://ojastheeram.com/treatments" },
  openGraph: {
    title: "Treatments & Therapies | Ojas Theeram",
    description:
      "From Panchakarma to specialised therapeutic sessions — discover the full spectrum of traditional Ayurvedic healing at Ojas Theeram.",
    url: "https://ojastheeram.com/treatments",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function TreatmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
