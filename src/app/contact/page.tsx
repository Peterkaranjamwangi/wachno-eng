import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Wachno Engineering",
  description:
    "At Wachno Engineering, we invite you to reach out to our team of experts for all your engineering, fabrication, and architectural design needs, where our commitment to excellence and customer satisfaction ensures a seamless and rewarding experience.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Us"
        description="Get in touch with Wachno Engineering for all your engineering, fabrication, architectural design needs, and maintainace and repair needs."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
