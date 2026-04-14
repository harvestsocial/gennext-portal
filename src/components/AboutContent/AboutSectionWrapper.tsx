import React from "react";
import AboutContent from "./AboutContent";
import FunFactStyleOne from "../FunFact/FunFactStyleOne";

interface AboutData {
  subtitleTop: string;
  title: string;
  highlight: string;
  titleRest: string;
  subtitleBottom: string;
  buttonText: string;
  buttonLink: string;
  phone: string;
  phoneIconClass: string;
}

const aboutData: AboutData = {
  subtitleTop: "Unlocking Church Leadership Potential",
  title: "Generation",
  highlight: "Next",
  titleRest:
    "Movement. Empowering church leaders to engage with relevant topics, connect with experts, and take actionable steps for growth.",
  subtitleBottom: "Event Focus: End Time mantles, Prophetic Anointing, Church Growth, Mistakes Pastors Make, Church Planting",
  buttonText: "Register Now",
  buttonLink: "/register",
  phone: "+263 777 612 854",
  phoneIconClass: "flaticon-telephone",
};

const AboutSectionWrapper: React.FC = () => {
  return (
    <section className="container">
      <div className="tm-height-150 tm-height-lg-80"></div>
      <AboutContent {...aboutData} />
      <div className="tm-height-150 tm-height-lg-80"></div>
      <FunFactStyleOne />
      <div className="tm-height-150 tm-height-lg-80"></div>
    </section>
  );
};

export default AboutSectionWrapper;
