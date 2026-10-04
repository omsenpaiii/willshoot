import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/services", "/business-photography-melbourne", "/work", "/about", "/contact", "/t&c"].map((path) => ({
    url: canonicalUrl(path),
  }));
}
