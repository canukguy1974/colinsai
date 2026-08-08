import type { MetadataRoute } from "next";
import { nav, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseRoutes = nav.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    lastModified: now,
    changeFrequency: item.href === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: item.href === "/" ? 1 : 0.7,
  }));

  return [
    ...baseRoutes,
    {
      url: new URL("/investigations/black-box", site.url).toString(),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
