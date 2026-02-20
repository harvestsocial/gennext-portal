import React from "react";
import { ZigzagHoverBtn } from "@components/UI/Button";
import classNames from "classnames";

interface CtasData {
  title: string;
  description: string;
}

interface CtaSectionProps {
  styleTwo?: string;
}

const ctasData: CtasData = {
  title: "Ready for Generation Next?",
  description:
    "Join church leaders, founders, and faith enthusiasts for a non-denominational experience of sound doctrine, spiritual formation, and meaningful fellowship.",
};

const CtaSection: React.FC<CtaSectionProps> = ({ styleTwo = "" }) => {
  const { title, description } = ctasData;

  return (
    <section
      className={classNames({
        "tm-primary-bg": styleTwo === "style2",
      })}
    >
      {styleTwo === "style2" && (
        <div className="tm-height-75 tm-height-lg-50"></div>
      )}

      <div className="container">
        <div className="cta-boxs">
          <div className="cta-boxs__item">
            <h3 className="cta-boxs__title">{title}</h3>
          </div>

          <div className="cta-boxs__item">
            <p className="cta-boxs__desp">{description}</p>
          </div>

          <div className="cta-boxs__item">
            <ZigzagHoverBtn btnLink="/register">Register Now</ZigzagHoverBtn>
          </div>
        </div>
        {styleTwo === "style2" ? (
          <div className="tm-height-75 tm-height-lg-50"></div>
        ) : (
          <div className="tm-height-150 tm-height-lg-80"></div>
        )}
      </div>
    </section>
  );
};

export default CtaSection;
