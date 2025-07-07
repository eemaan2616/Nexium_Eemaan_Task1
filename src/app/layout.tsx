import "./globals.css";
import type { Metadata } from "next";

import { Geist, Geist_Mono, Poppins } from "next/font/google";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});

// Metadata
export const metadata: Metadata = {
  title: "Inspiro Quotes",
  description: "A beautifully styled quote generator app using Next.js + MongoDB",
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
