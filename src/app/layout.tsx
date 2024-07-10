import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedSignature from "./footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Super XO - An Exciting Twist on Tic-Tac-Toe",
    template: `Super XO - An Exciting Twist on Tic-Tac-Toe`,
  },
  description:
    "Challenge your friends to a game of Super XO, the strategic Tic-Tac-Toe variant with limited moves. Play now and test your skills!",
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
      <body className={inter.className}>
        {children}
        {/* <AnimatedSignature /> */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
