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
  title: "Lucas Souza — Motion Designer & Creative Developer",
  description:
    "Independent motion designer and creative developer bringing ideas to life through design, animation and interactive experiences.",
  keywords: [
    "Lucas Souza",
    "motion designer",
    "creative developer",
    "3D motion",
    "2D motion",
    "interactive design",
  ],
  openGraph: {
    title: "Lucas Souza — Design in Motion",
    description: "I help brands bring ideas to life with design and motion.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Souza — Design in Motion",
    description: "I help brands bring ideas to life with design and motion.",
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
