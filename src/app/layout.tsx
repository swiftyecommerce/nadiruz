import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nadir UZ | Official Site",
  description: "Official website of Turkish rapper Nadir UZ. Listen to latest releases, watch music videos and find all streaming & social links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${oswald.variable} antialiased bg-[#0a0a0a] text-white selection:bg-[#39ff14] selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
