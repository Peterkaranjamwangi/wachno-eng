import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/Services/ServiceCards";

import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Wachno Engineering - Stainless Steel Fabrication & Engineering Services",
  description:
    "Wachno Engineering provides high-quality stainless steel fabrication, mild steel products, refrigeration solutions, and specialized engineering services. Get it right the first time with our expertise.",
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <ServiceCards />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Contact />
    </>
  );
}
