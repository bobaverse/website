import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/index.css";
import { gotham } from "@/styles/fonts";
import { classNames } from "@/utils/strings";
import NavBar from "@/app/_navbar/nav-bar";
import { PropsWithChildren } from "react";
import { Metadata } from "next";
import BlockchainProvider from "@/components/providers/blockchain-provider";

const AppName = "BobaVerse";
const AppDescription = "Interactive arcade-style games";
const BaseURL = "https://bobaverse.cajun.pro";

export const metadata: Metadata = {
  title: {
    default: AppName,
    template: "%s | BobaVerse",
  },
  description: AppDescription,
  generator: "Next.js",
  applicationName: AppName,
  referrer: "origin-when-cross-origin",
  keywords: [ "Boba", "Enya", "Crypto", "Arcade", "Hybrid", "Compute", "Blockchain" ],
  authors: [
    { name: "Nicholas St. Germain", url: "https://cajun.pro" },
  ],
  colorScheme: "dark",
  creator: "Nicholas St. Germain",
  publisher: "Vercel",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/", // /en-US
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  openGraph: {
    title: AppName,
    description: AppDescription,
    url: BaseURL,
    siteName: AppName,
    images: [
      { url: "/icon.png", width: 512, height: 512, alt: "BobaVerse Logo" },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon.png",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      nocache: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
