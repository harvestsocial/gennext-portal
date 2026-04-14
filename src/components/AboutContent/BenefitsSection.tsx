import React from "react";
import { ZigzagHoverBtn } from "@components/UI/Button";
import AnimateOnScroll from "@components/AnimateOnScroll/AnimateOnScroll";

interface BenefitsData {
  subtitle: string;
  title: string;
  highlight: string;
  image: string;
  description: string;
}

const benefitsData: BenefitsData = {
  subtitle: "BENIFITS",
  title: "The Premier Platform for",
  highlight: "Generation Next Leaders",
  image: "assets/img/bg/benifits-img.png",
  description: `Generation Next is committed to strengthening and aligning emerging church leaders through sound doctrine, spiritual formation, and strategic guidance.`,
};

const BenefitsSection: React.FC = () => {
  const { subtitle, title, highlight, image, description } = benefitsData;

  return (
    <div className="container container-customizes">
      <div className="benifits">
        <div className="benifits__wapper">
          {/* Left Image */}
          <AnimateOnScroll className="benifits__left">
            <img className="benifits-img" src={image} alt="Benefits" />
          </AnimateOnScroll>

          {/* Right Content */}
          <AnimateOnScroll className="benifits__right" delay="0.2">
            <div className="benifits__header">
              <div className="benifits__header-content">
                <p className="benifits__header-subtitle">{subtitle}</p>
                <h2 className="benifits__header-title">
                  <span className="hightlight">{title} </span>
                  {highlight}
                </h2>
              </div>

              <div className="benifits__bottom-info">
                {/* Button */}
                <ZigzagHoverBtn btnLink="/register" className="style2">
                  Register Now
                </ZigzagHoverBtn>

                {/* Description */}
                <p className="benifits-desp">{description}</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
      <div className="tm-height-150 tm-height-lg-80"></div>
    </div>
  );
};

export default BenefitsSection;
