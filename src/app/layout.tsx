import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Barlow_Condensed, Cormorant_Garamond, Space_Grotesk, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

const gallient = localFont({
  src: "../../public/fonts/GallientRegular.ttf",
  variable: "--font-gallient",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ojastheeram.com"),
  verification: {
    google: "iugd9wH6dysssv8mqxCnu2pa7qwxlUemKzjRlbSjD9s",
  },
  title: {
    default: "Ojas Theeram | Authentic Ayurvedic Wellness Clinic, Bengaluru",
    template: "%s | Ojas Theeram",
  },
  description:
    "Ojas Theeram is a premium Ayurvedic wellness sanctuary in Bengaluru offering Panchakarma, personalised consultations, and classical Kerala therapies for holistic mind-body healing.",
  keywords: [
    "Ayurveda clinic Bengaluru",
    "Panchakarma Bangalore",
    "Kerala Ayurvedic treatments",
    "holistic healing Bengaluru",
    "Ayurvedic doctor near me",
    "Ojas Theeram",
    "Ayurvedic massage Bangalore",
    "detox therapy Bengaluru",
  ],
  authors: [{ name: "Ojas Theeram", url: "https://ojastheeram.com" }],
  creator: "Ojas Theeram",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ojastheeram.com",
    siteName: "Ojas Theeram",
    title: "Ojas Theeram | Authentic Ayurvedic Wellness Clinic",
    description:
      "Experience authentic Ayurvedic therapies rooted in Kerala tradition. Panchakarma, personalised healing, and holistic wellness in Bengaluru.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ojas Theeram — Authentic Ayurvedic Wellness Clinic, Bengaluru",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ojas Theeram | Authentic Ayurvedic Wellness Clinic",
    description:
      "Premium Panchakarma & Ayurvedic therapies in Bengaluru. Book your session today.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://ojastheeram.com",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrolling from "@/components/shared/SmoothScrolling";
import Loader from "@/components/shared/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} ${gallient.variable} ${cormorantGaramond.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Ojas Theeram",
              description:
                "Authentic Ayurvedic Wellness Clinic in Bengaluru offering Panchakarma, Kerala therapies, and holistic healing.",
              url: "https://ojastheeram.com",
              telephone: "+919353166850",
              address: {
                "@type": "PostalAddress",
                streetAddress: "R.N.R Apartments, Sri Kanteshwara Nagar",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560022",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 13.014861,
                longitude: 77.54700,
              },
              openingHours: "Mo-Su 08:00-19:00",
              image: "https://ojastheeram.com/og-image.png",
              priceRange: "₹₹",
              medicalSpecialty: "Ayurveda",
              hasMap: "https://maps.google.com/maps?q=13°00'53.5\"N+77°32'49.2\"E",
              sameAs: [],
            }),
          }}
        />
        <Loader />
        <SmoothScrolling>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
