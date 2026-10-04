import { pageMetadata, SITE_URL, INSTAGRAM_URL } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata = {
  ...pageMetadata("WillShoot | Melbourne Video Production & Business Photography", "WillShoot creates business videos, property photography, Instagram reels, and social media campaigns in Melbourne. Book a shoot for your brand.", "/"),
  metadataBase: new URL(SITE_URL),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans min-h-screen bg-brand-white text-brand-black flex flex-col selection:bg-brand-red selection:text-brand-white">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "WillShoot",
          url: SITE_URL,
          logo: `${SITE_URL}/logo.png`,
          email: "contact@willshoot.au",
          telephone: "+61478635406",
          sameAs: [INSTAGRAM_URL],
          areaServed: { "@type": "City", name: "Melbourne" },
          description: "Melbourne video production, business photography, property shoots, and social media content.",
        }} />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
