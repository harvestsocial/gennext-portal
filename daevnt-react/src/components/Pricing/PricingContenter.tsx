
import React, { useState } from "react";
import PricingCard from "./PricingCard";

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
    visitors: ["1 Visitor", "2 Visitors", "3 Visitors", "4 Visitors", "5 Visitors"],
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
    visitors: ["1 Visitor", "2 Visitors", "3 Visitors", "4 Visitors", "5 Visitors"],
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
    visitors: ["1 Visitor", "2 Visitors", "3 Visitors", "4 Visitors", "5 Visitors"],
    features: [
      "Access to all keynote sessions",
      "Entry to exhibition area",
      "No access to workshops",
      "No networking lounge access",
    ],
  },
];

const PricingContenter: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="container">
      <div className="package-content">
        {pricingData.map((plan, index) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            className="style2 type3"
          />
        ))}
      </div>
    </div>
  );
};

export default PricingContenter;
