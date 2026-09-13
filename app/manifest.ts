import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Partsunion", short_name: "Partsunion", description: "ERP & Automatisierung für den Autoteilehandel", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#2563eb", icons: [{ src: "/favicon.png", sizes: "32x32", type: "image/png" }] };
}
