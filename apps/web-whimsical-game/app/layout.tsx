import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Whimsical Night • Official Psychological Horror Game",
  description: "Official showcase and download hub for Whimsical Night: An atmospheric 3D psychological horror survival game made with Unity 6 LTS.",
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased selection:bg-rose-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
