import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PaddleProvider from "./PaddleProvider";
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
  title: "Holytime Final 2",
  description: "Digital learning products sold through https://holytime.auction/",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <PaddleProvider />
      </body>
    </html>
  );
}
