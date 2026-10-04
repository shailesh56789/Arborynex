import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Arborynex Labs — Nature + Next-Gen Technology",
  description:
    "Arborynex Labs Private Limited — Where the strength of nature meets next-generation technology. Building innovative, sustainable, and future-ready digital solutions.",
  keywords: [
    "Arborynex",
    "Arborynex Labs",
    "technology company",
    "next-gen technology",
    "digital solutions",
    "sustainable tech",
    "software development",
    "AI solutions",
  ],
  openGraph: {
    title: "Arborynex Labs — Nature + Next-Gen Technology",
    description:
      "Where the strength of nature meets next-generation technology. Building innovative, sustainable, and future-ready digital solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
