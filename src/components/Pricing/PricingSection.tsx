import React, { useState } from "react";
import PricingCard from "./PricingCard";
import SectionHeading from "../SectionHeading/SectionHeading";

interface Plan {
  id: number;
  title: string;
  price: string;
  visitors: string[];
  features: string[];
}

const pricingData: Plan[] = [
  {
    id: 1,
    title: "Standard Pass",
    price: "$49",
    visitors: [
      "1 Visitor",
      "2 Visitors",
      "3 Visitors",
      "4 Visitors",
      "5 Visitors",
    ],
    features: [
      "Access to all keynote sessions",
      "Entry to exhibition area",
      "No access to workshops",
      "No networking lounge access",
    ],
  },
  {
    id: 2,
    title: "Premium Pass",
    price: "$99",
    visitors: [
      "1 Visitor",
      "2 Visitors",
      "3 Visitors",
      "4 Visitors",
      "5 Visitors",
    ],
    features: [
      "Access to all keynote sessions",
      "Entry to exhibition area",
      "No access to workshops",
      "No networking lounge access",
    ],
  },
  {
    id: 3,
    title: "Ordinary Pass",
    price: "$149",
    visitors: [
      "1 Visitor",
      "2 Visitors",
      "3 Visitors",
      "4 Visitors",
      "5 Visitors",
    ],
    features: [
      "Access to all keynote sessions",
      "Entry to exhibition area",
      "No access to workshops",
      "No networking lounge access",
    ],
  },
];

const PricingSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <SectionHeading
          title="Compulsory Registration"
          subtitle="All attendees must register online to secure their spot and access all sessions. Choose your pass below."
        />
        <div className="package-content">
          {pricingData?.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default PricingSection;
