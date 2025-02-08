import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "./components/musicBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Chọn các trọng số (thickness) cần dùng
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tic Tac Toe Game",
  description: "Let's play !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${dmSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
