import React, { useState } from "react";
import FeatureButtons from "./FeatureButtons";
import FeatureContent from "./FeatureContent";
import featurebg from "/assets/img/feature/feature-bg.png";

const FeatureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"about" | "who" | "topic">("about");

  return (
    <section className="feature-section">
      <div className="feature-content tm-bg">
        <img
          className="feature-bg-img tm-bg"
          src={featurebg}
          alt="feature-bg"
        />
        <div className="tm-height-90 tm-height-lg-80"></div>
        <div className="feature-content__wrapper container-customizes">
          <FeatureButtons activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="tm-height-60 tm-height-lg-50"></div>
          <FeatureContent activeTab={activeTab} />
        </div>
        <div className="tm-height-100 tm-height-lg-80"></div>
      </div>
    </section>
  );
};

export default FeatureSection;
