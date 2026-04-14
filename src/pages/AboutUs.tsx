import React from "react";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import AboutEducationConference from "@components/AboutContent/AboutEducationConference";
import TestimonialSection from "@components/Slider/Testimonial/TestimonialSection";
import Videos from "@/components/Videos/Videos";
import TextScrollSlider from "@/components/TextScrollSlider/TextScrollSlider";
import EdSpeakersContent from "@components/SpeakersSection/EdSpeakersContent";
import SponsorsSlider from "@components/Slider/SponsorsSlider/SponsorsSlider";
import InstagramGallery from "@components/Slider/Gallery/InstagramGallery";
import AboutSectionWrapper from "@components/AboutContent/AboutSectionWrapper";

interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  image: string;
  links: BreadcrumbLink[];
}

const AboutUs: React.FC = () => {
  const breadcrumbData: BreadcrumbData = {
    title: "About Us",
    image: "/assets/img/hero/about-breadcrumb.png",
    links: [{ label: "Home", path: "/" }, { label: "About Us" }],
  };

  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <AboutSectionWrapper />
      <AboutEducationConference styleTwo="style2" />
      <TestimonialSection styleTwo={true} />
      <Videos />
      <TextScrollSlider styleTwo="style2" />
      <EdSpeakersContent />
      <SponsorsSlider />
      <InstagramGallery />
    </>
  );
};

export default AboutUs;
