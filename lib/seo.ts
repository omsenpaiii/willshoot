import type { Metadata } from "next";

export const SITE_URL = "https://www.willshoot.au";
export const INSTAGRAM_URL = "https://www.instagram.com/willshootau/";

export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.split("/").map(encodeURIComponent).join("/")}`;
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: "WillShoot",
      title,
      description,
      url: canonicalUrl(path),
      images: [{ url: `${SITE_URL}/logo.png`, alt: "WillShoot" }],
    },
    twitter: { card: "summary", title, description, images: [`${SITE_URL}/logo.png`] },
  };
}
