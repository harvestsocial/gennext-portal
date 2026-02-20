import React from "react";
import BreadcrumbUnderLineStyle from "@components/Breadcrumb/BreadcrumbUnderLineStyle";
import ContactFormInfo from "@components/ContactForm/ContactFormInfo";
import SponsorsSlider from "@components/Slider/SponsorsSlider/SponsorsSlider";

interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  links: BreadcrumbLink[];
}

const breadcrumbDatas: BreadcrumbData = {
  title: "Contact Us",
  links: [{ label: "Home", path: "/" }, { label: "Contact Us" }],
};

const ContactUs: React.FC = () => {
  return (
    <>
      <BreadcrumbUnderLineStyle breadcrumbData={breadcrumbDatas} />
      <ContactFormInfo />
      <SponsorsSlider />
    </>
  );
};

export default ContactUs;
