import React from "react";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";
import { Link } from "react-router-dom"; 

interface AboutContentProps {
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

const AboutContent: React.FC<AboutContentProps> = ({
  subtitleTop,
  title,
  highlight,
  titleRest,
  subtitleBottom,
  buttonText,
  buttonLink,
  phone,
  phoneIconClass,
}) => {
  return (
    <AnimateOnScroll animationType="fade-up" className="about-content">
      <div className="about-content__wapper">
        <p className="about-content__subtitle">{subtitleTop}</p>

        <h3 className="about-content__info">
          {title} <span className="highlight-text">{highlight}</span> {titleRest}
        </h3>

        <p className="about-content__subtitle style1">{subtitleBottom}</p>

        <div className="about-content__btn-phone">
          <Link to={buttonLink} className="primary__btn">
            {buttonText}
          </Link>

          <Link to={`tel:${phone}`} className="about-phone-info">
            <div className="social__icon-btn" data-discover="true">
              <i className={phoneIconClass}></i>
            </div>
            <p className="about-phone-text">{phone}</p>
          </Link>
        </div>
      </div>
    </AnimateOnScroll>
  );
};

export default AboutContent;
