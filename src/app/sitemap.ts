import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.NEXT_PUBLIC_SITE_URL || "https://henrytwagner.com";
  const routes = [
    "",
    "#about",
    "#education",
    "#experience",
    "#projects",
    "#skills",
    "#involvement",
    "#contact",
  ];
  return routes.map((path) => ({
    url: `${host}/${path}`.replace(/#.*$/, ""),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.5,
  }));
}
