import type { Metadata } from "next";

export const SITE_URL = "https://vitom-clinic.example.com";
export const SITE_NAME = "VITOM CLINIC";

/** Builds a consistent Metadata object with sensible OpenGraph defaults. */
export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/assets/shots-blue.webp",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
  };
}
