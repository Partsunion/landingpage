import type { MetadataRoute } from "next";
import { isIndexablePath } from "@/lib/feature-content";
import { allRoutes } from "@/lib/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://partsunion.de";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...allRoutes.filter((route) => isIndexablePath(route.href)).map((route) => ({ url: `${base}${route.href}`, changeFrequency: "monthly" as const, priority: route.href.split("/").length === 2 ? 0.9 : 0.7 })),
  ];
}
