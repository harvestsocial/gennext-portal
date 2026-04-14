import React  from "react";
import type { CSSProperties }  from "react";
import { Link } from "react-router-dom";

interface CtaData {
  bgImage: string;
  title: string;
  description: string;
}

const ctaData: CtaData = {
  bgImage: "/assets/img/bg/cta-bg.png",
  title:
    "Let's create a grand celebration that inspires and honors the best in your field!",
  description:
    "Let's create a grand celebration that inspires and honors the best in your field! Contact us today to plan an extraordinary award ceremony.",
};

const CtaBg: React.FC = () => {
  const { bgImage, title, description } = ctaData;

  const backgroundStyle: CSSProperties = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="cta-section tm-bg" style={backgroundStyle}>
      <div className="tm-height-140 tm-height-lg-80"></div>
      <div className="cta">
        <div className="cta__content">
          <h3 className="cta__title">{title}</h3>
          <p className="cta__desp">{description}</p>
          <div className="cta__btn">
            <Link to={"/contact-us"} className="primary__btn">
              CONTACT US TODAY
            </Link>
          </div>
        </div>
      </div>
      <div className="tm-height-140 tm-height-lg-80"></div>
    </div>
  );
};

export default CtaBg;
