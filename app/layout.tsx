import "@/styles/index.css";
import { Eczar } from "next/font/google";
import Header from "@/components/layout/Header";
import { FC } from "react";
import { PageProps } from "@/interfaces";
import { Metadata } from "next";
import BlockchainProvider from "@/components/providers/BlockchainProvider";

const eczar = Eczar({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BobaVerse",
  description: "Interactive arcade-style games",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/Logo.png",
    },
  },
};

const RootLayout: FC<PageProps> = ({ children }) => {
  return (
    <html lang="en" className={eczar.className}>
    <body>
    <BlockchainProvider>
      <Header />
      <main className="mt-[8px] h-full">{children}</main>
    </BlockchainProvider>
    </body>
    </html>
  );
}

export default RootLayout;
