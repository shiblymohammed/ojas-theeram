import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Session",
  description:
    "Schedule your Ayurvedic consultation, Panchakarma, or therapy session at Ojas Theeram, Bengaluru. Choose from our curated wellness packages and book instantly via WhatsApp.",
  alternates: { canonical: "https://ojastheeram.com/booking" },
  openGraph: {
    title: "Book a Session | Ojas Theeram",
    description:
      "Begin your healing journey. Book a consultation or therapy session at Ojas Theeram, Bengaluru \u2014 easy WhatsApp booking with instant confirmation.",
    url: "https://ojastheeram.com/booking",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
