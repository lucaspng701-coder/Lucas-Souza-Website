import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "./components/SiteHeader";
import { SmoothScroll } from "./components/SmoothScroll";
import { SocialDock } from "./components/SocialDock";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lucas-souza-portfolio-sigma.vercel.app"),
  title: "Lucas Souza — SaaS Motion Designer & Art Director",
  description:
    "Motion design for SaaS: product videos, launch films and UI animation for product and marketing teams in the US and Europe.",
  keywords: [
    "Lucas Souza",
    "SaaS motion designer",
    "product videos",
    "launch films",
    "UI animation",
    "art director",
    "3D motion",
    "2D motion",
  ],
  openGraph: {
    title: "Lucas Souza — SaaS Motion Designer & Art Director",
    description: "Product videos, launch films and UI animation for SaaS teams.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Souza — SaaS Motion Designer & Art Director",
    description: "Product videos, launch films and UI animation for SaaS teams.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <SiteHeader />
        <SmoothScroll>{children}</SmoothScroll>
        <SocialDock />
      </body>
    </html>
  );
}
