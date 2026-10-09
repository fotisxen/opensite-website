import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import TrackingProvider from "@/components/TrackingProvider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "OpenSite | Digital Agency for Business Growth",
    template: "%s | OpenSite",
  },
  description:
    "Modern digital solutions designed for real business growth. Websites, e-shops, desktop and mobile apps, intranets and SPFx, CRM systems, and SEO strategy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${sora.variable} ${inter.variable} overflow-x-hidden`}>
        <SiteChrome>{children}</SiteChrome>
        <TrackingProvider />
      </body>
    </html>
  );
}
