import type { Metadata } from "next";

export const SITE_URL = "https://www.willshoot.au";
export const INSTAGRAM_URL = "https://www.instagram.com/willshootau/";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: "WillShoot",
      title,
      description,
      url: `${SITE_URL}${path}`,
      images: [{ url: `${SITE_URL}/logo.png`, alt: "WillShoot" }],
    },
    twitter: { card: "summary", title, description, images: [`${SITE_URL}/logo.png`] },
  };
}
