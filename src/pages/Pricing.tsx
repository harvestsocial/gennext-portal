import React from "react";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import SponsorsSlider from "@components/Slider/SponsorsSlider/SponsorsSlider";
import FAQsContent from "@components/Accordion/FAQsContent";
import CtaSection from "@components/Cta/CtaSection";
import PricingContenter from "@components/Pricing/PricingContenter";

interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  links: BreadcrumbLink[];
}

const breadcrumbData: BreadcrumbData = {
  title: "Pricing",
  links: [{ label: "Home", path: "/" }, { label: "Pricing" }],
};

const Pricing: React.FC = () => {
  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />
      <PricingContenter />
      <SponsorsSlider />
      <FAQsContent />
      <div className="tm-height-150 tm-height-lg-80"></div>
      <CtaSection />
    </>
  );
};

export default Pricing;
