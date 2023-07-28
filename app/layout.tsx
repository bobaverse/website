import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/index.css";
import { gotham } from "@/styles/fonts";
import { classNames } from "@/utils/strings";
import NavBar from "@/app/_navbar/nav-bar";
import { PropsWithChildren } from "react";
import { Metadata } from "next";
import BlockchainProvider from "@/components/providers/BlockchainProvider";
import Footer from "@/app/_navbar/Footer";



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

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" className={classNames(gotham.className, "bg-boba-grey text-white")}>
      <body className="bg-boba-grey">
        <BlockchainProvider>
          <NavBar />
          <div className="overflow-y-scroll h-full">{children}</div>
        </BlockchainProvider>
      </body>
    </html>
  );
}

export default RootLayout;
