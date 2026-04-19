import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ojas Theeram. Call, WhatsApp, or visit our Ayurvedic wellness clinic in Bengaluru. We\u2019re available Mon\u2013Sun, 8 AM to 7 PM.",
  alternates: { canonical: "https://ojastheeram.com/contact" },
  openGraph: {
    title: "Contact Us | Ojas Theeram",
    description:
      "Reach Ojas Theeram by phone, WhatsApp, or visit us in person at our Bengaluru sanctuary. Get directions and book your session.",
    url: "https://ojastheeram.com/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
