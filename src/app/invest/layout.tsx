import { Inter } from "next/font/google";
import "../globals.css";
import Navigation from "./navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Find Space",
    template: `Find Space - An Portal For Your Real Estate Venture`,
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
        <Navigation />
      </body>
    </html>
  );
}
