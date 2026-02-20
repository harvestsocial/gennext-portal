import React from "react";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";
import classNames from "classnames";

interface AboutData {
  subtitle: string;
  title: string;
  highlight: string;
  features: string[];
  cta: string;
  images: string[];
  description: string;
}

interface AboutEducationConferenceProps {
  styleTwo?: string; 
}

const aboutData: AboutData = {
  subtitle: "About the Conference",
  title: "Generation Next",
  highlight: "Movement",
  features: [
    "Sound doctrine and teaching",
    "Spiritual formation sessions",
    "Leadership alignment and mentorship",
  ],
  cta: "Join us as we strengthen and align emerging church leaders.",
  images: [
    "assets/img/about/ed-coner-about_1.png",
    "assets/img/about/ed-coner-about_2.png",
  ],
  description: `Generation Next is a leadership and ministry movement focused on advancing generational continuity in the spirit of Malachi 4:6 through biblical teaching, fellowship, and practical ministry guidance.`,
};

const AboutEducationConference: React.FC<AboutEducationConferenceProps> = ({
  styleTwo,
}) => {
  const { subtitle, title, highlight, features, cta, images, description } =
    aboutData;

  const darkBgClass = classNames("container", {
    "about-ed-coner__dark_bg": styleTwo === "style2",
  });

  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className={darkBgClass}>
        <div className="about-ed-coner">
          {/* Left Side */}
          <AnimateOnScroll className="about-ed-coner__left">
            <div className="about-ed-coner__header">
              <div className="about-ed-coner__header-content">
                <p className="about-ed-coner__header-subtitle">{subtitle}</p>
                <h2 className="about-ed-coner__header-title">
                  {title} <span className="hightlight">{highlight}</span>
                </h2>
              </div>
            </div>

            <div className="about-ed-coner__features">
              {features.map((feature, index) => (
                <div className="about-ed-coner__feature" key={index}>
                  <div className="about-ed-coner__feature-image">
                    <i className="flaticon-check-mark"></i>
                  </div>
                  <div className="about-ed-coner__feature-content">
                    <h6 className="about-ed-coner__feature-title">{feature}</h6>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-ed-coner__cta">
              <h6 className="about-ed-coner__cta-text">{cta}</h6>
            </div>
          </AnimateOnScroll>

          {/* Right Side */}
          <AnimateOnScroll className="about-ed-coner__right" delay="0.2">
            <div className="about-ed-coner__right-img">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={`ed-coner-about_${i + 1}`}
                  alt="About Conference"
                />
              ))}
            </div>
            <p className="about-ed-coner__right-desp">{description}</p>
          </AnimateOnScroll>
        </div>
      </div>
    </>
  );
};

export default AboutEducationConference;
