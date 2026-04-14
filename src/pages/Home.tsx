import React from "react";
import HeroSliderOne from "@components/Slider/HeroSliderOne/HeroSliderOne";
import AboutSectionWrapper from "@components/AboutContent/AboutSectionWrapper";
import FutureEvents from "@components/FutureEvents/FutureEvents";
import FeatureSection from "@components/FeatureSection/FeatureSection";
import TestimonialSection from "@components/Slider/Testimonial/TestimonialSection";
import Videos from "@/components/Videos/Videos";
import SpeakersSection from "@components/SpeakersSection/SpeakersSection";
import BrandsSponsor from "@components/BrandsSponsor/BrandsSponsor";
import PricingSection from "@components/Pricing/PricingSection";
import TextScrollSlider from "@/components/TextScrollSlider/TextScrollSlider";

const Home: React.FC = () => {
  return (
    <>
      <HeroSliderOne />
      <AboutSectionWrapper />
      <FeatureSection />
      <TestimonialSection />
      <FutureEvents />
      <Videos />
      <SpeakersSection />
      <BrandsSponsor />
      <PricingSection />
      <TextScrollSlider />
    </>
  );
};

export default Home;
