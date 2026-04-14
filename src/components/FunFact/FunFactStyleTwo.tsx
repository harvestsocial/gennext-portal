import React from "react";
import FunFactItemWrapper from "./FunFactItemWrapper";

interface FunFact {
  id: number;
  count: number;
  suffix?: string;
  description: string;
}

const funFacts: FunFact[] = [
  {
    id: 1,
    count: 200,
    suffix: "K",
    description: "Speakers & Experts",
  },
  {
    id: 2,
    count: 500,
    suffix: "K+",
    description: "Total Attendees",
  },
  {
    id: 3,
    count: 300,
    suffix: "+",
    description: "Workshops & Panels",
  },
  {
    id: 4,
    count: 59,
    suffix: "+",
    description: "Countries Represented",
  },
];

const FunFactStyleTwo: React.FC = () => {
  return (
    <section className="tm-primary-bg">
      <div className="tm-height-100 tm-height-lg-50"></div>
      <div className="container">
        <div className="funfact-content style2">
          <FunFactItemWrapper funFacts={funFacts} />
        </div>
      </div>
      <div className="tm-height-100 tm-height-lg-50"></div>
    </section>
  );
};

export default FunFactStyleTwo;
