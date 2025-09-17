import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Henry T. Wagner — Portfolio",
  description:
    "Portfolio of Henry T. Wagner: software engineer, projects, experience, and contact.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://henrytwagner.com"),
  openGraph: {
    title: "Henry T. Wagner — Portfolio",
    description:
      "Portfolio of Henry T. Wagner: software engineer, projects, experience, and contact.",
    url: "/",
    siteName: "Henry T. Wagner",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
