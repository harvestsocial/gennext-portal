
import React, { useState } from "react";
import PricingCard from "./PricingCard";
import classNames from "classnames";

interface Plan {
  title: string;
  price: string;
  visitors: string[];
  features: string[];
}

const pricingData: Plan[] = [
  {
    title: "Standard Pass",
    price: "$49",
    visitors: ["1 Visitor", "2 Visitors", "3 Visitors", "4 Visitors", "5 Visitors"],
    features: [
      "Access to all keynote sessions",
      "Entry to exhibition area",
      "No access to workshops",
      "No networking lounge access",
    ],
  },
  {
    title: "Premium Pass",
    price: "$99",
    visitors: ["1 Visitor", "2 Visitors", "3 Visitors", "4 Visitors", "5 Visitors"],
    features: [
      "Access to all keynote sessions",
      "Entry to exhibition area",
      "No access to workshops",
      "No networking lounge access",
    ],
  },
];

const packageInfo = {
  title: "Pricing",
  desp: "Join leading educators, researchers, and policymakers in a global dialogue on the future of learning.",
};

interface OcPricingSectionProps {
  styleTwo?: string;
}

const OcPricingsection: React.FC<OcPricingSectionProps> = ({ styleTwo = "type2" }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const styleClassName = classNames("type2", styleTwo);
  const titlestyleClassName = classNames("package-content__info-title--small", {
    "tm-white-color": styleTwo === "style2 type3",
  });
  const despstyleClassName = classNames("package-content__info-desp", {
    "tm-white-color": styleTwo === "style2 type3",
  });

  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div className="package-content">
          <div className="package-content__info">
            <div className="package-content__info-wapper">
              <h2 className={titlestyleClassName}>{packageInfo.title}</h2>
              <p className={despstyleClassName}>{packageInfo.desp}</p>
            </div>
          </div>
          {pricingData.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              style3={styleClassName}
            />
          ))}
        </div>
      </div>
      <div className="tm-height-150 tm-height-lg-80"></div>
    </>
  );
};

export default OcPricingsection;
