"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#FF6B00" />
      </head>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          <Floatingdiv contacts={ContactData} />
          <div className="min-h-screen">{children}</div>
          <Footer />
          <ScrollToTop />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
import Floatingdiv from "@/components/SocialMedia/Floatingdiv";
import ContactData from "@/components/Contact/ContactData";
