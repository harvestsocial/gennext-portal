import React from "react";
import { Link } from "react-router-dom";

interface ContentData {
  img: string;
  tagline: string;
  title: string;
  headline: string;
  desc: string;
}

interface Data {
  about: ContentData;
  who: ContentData;
  topic: ContentData;
}

interface FeatureContentProps {
  activeTab: keyof Data;
}

const data: Data = {
  about: {
    img: "/assets/img/feature/feature-1.png",
    tagline: "Innovate Together",
    title: "Shaping the future",
    headline: "of creativity through collaboration.",
    desc: `Integer ac felis ac augue ullamcorper tempus id non dui. Nam feugiat finibus scelerisque. Proin semper arcu non eros scelerisque feugiat at a dolor. Vivamus sed ex ut sem lacinia hendrerit ut vel felis.`,
  },
  who: {
    img: "/assets/img/feature/feature-2.png",
    tagline: "Join Attendee",
    title: "Bold innovators",
    headline: "designers & industry leads.",
    desc: `Integer ac felis ac augue ullamcorper tempus id non dui. Nam feugiat finibus scelerisque. Proin semper arcu non eros scelerisque feugiat at a dolor. Vivamus sed ex ut sem lacinia hendrerit ut vel felis.`,
  },
  topic: {
    img: "/assets/img/feature/feature-3.png",
    tagline: "Treand of 2025",
    title: "Explore Innovation",
    headline: "design trends of creative industries.",
    desc: `Integer ac felis ac augue ullamcorper tempus id non dui. Nam feugiat finibus scelerisque. Proin semper arcu non eros scelerisque feugiat at a dolor. Vivamus sed ex ut sem lacinia hendrerit ut vel felis.`,
  },
};

const FeatureContent: React.FC<FeatureContentProps> = ({ activeTab }) => {
  const content = data[activeTab];

  return (
    <div className="feature-content__info" data-content={activeTab}>
      <div className="feature-content__speaker fade-up">
        <img src={content.img} alt="..." className="feature-content__img" />
      </div>
      <div className="feature-content__person__info fade-up" data-delay="0.2">
        <p className="feature-content__tagline">{content.tagline}</p>
        <h3 className="feature-content__title">
          <span>{content.title}</span>
          <br />
          <span className="feature-content__headline">{content.headline}</span>
        </h3>
        <p className="feature-content__description">{content.desc}</p>
        <Link className="primary__btn" to="/events">
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default FeatureContent;
