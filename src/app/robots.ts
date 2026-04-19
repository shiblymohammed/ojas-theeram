import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://ojastheeram.com/sitemap.xml",
    host: "https://ojastheeram.com",
  };
}
