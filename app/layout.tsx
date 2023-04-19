import "@/styles/index.css";
import { Roboto } from "next/font/google";
import NavBar from "@/components/navigation/NavBar";
import { FC } from "react";
import { PageProps } from "@/interfaces";
import { Metadata } from "next";
import BlockchainProvider from "@/components/providers/BlockchainProvider";
import Footer from "@/components/navigation/Footer";

const roboto = Roboto({
  style: ["normal", "italic"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  subsets: ["latin"],
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
    <html lang="en" className={roboto.className}>
      <body>
        <BlockchainProvider>
          <NavBar />
          <div className="overflow-y-scroll h-full">{children}</div>
          <Footer />
        </BlockchainProvider>
      </body>
    </html>
  );
}

export default RootLayout;
