import React from "react";
import FunFactItemWrapper from "./FunFactItemWrapper";

interface FunFact {
  id: number;
  count: number;
  suffix?: string;
  title?: string;
  description: string;
}

const funFacts: FunFact[] = [
  {
    id: 1,
    count: 200,
    suffix: "K",
    title: "Speakers & Experts",
    description: "Industry Leaders Sharing Insights",
  },
  {
    id: 2,
    count: 500,
    suffix: "K+",
    title: "Total Attendees",
    description: "Innovators & Thinkers Joining Us",
  },
  {
    id: 3,
    count: 300,
    suffix: "+",
    title: "Workshops & Panels",
    description: "Interactive Sessions to Level Up Your Skills",
  },
];

const FunFactStyleOne: React.FC = () => {
  return (
    <div className="funfact-content">
      <FunFactItemWrapper funFacts={funFacts} />
    </div>
  );
};

export default FunFactStyleOne;
