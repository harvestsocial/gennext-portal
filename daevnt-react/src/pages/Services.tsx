import React from "react";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import ServicesSection from "@/components/Services/ServicesSection";
import TextScrollSlider from "@/components/TextScrollSlider/TextScrollSlider";
import TestimonialSection from "@components/Slider/Testimonial/TestimonialSection";
import Videos from "@/components/Videos/Videos";
import OcPricingsection from "@/components/Pricing/OcPricingsection";
import CtaSection from "@components/Cta/CtaSection";

interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  image: string;
  links: BreadcrumbLink[];
}

const Services: React.FC = () => {
  
  const breadcrumbData: BreadcrumbData = {
    title: "What We Offer",
    image: "/assets/img/hero/about-breadcrumb.png",
    links: [{ label: "Home", path: "/" }, { label: "Services" }],
  };

  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <ServicesSection />
      <TextScrollSlider styleTwo="style2" />
      <TestimonialSection styleTwo={true} />
      <Videos />
      <OcPricingsection styleTwo={"style2 type3"} />
      <CtaSection styleTwo="style2" />
    </>
  );
};

export default Services;
