import React from "react";
import classNames from "classnames";
import SectionHeading from "../SectionHeading/SectionHeading";
import { PrimaryBtn } from "../UI/Button";
import RecentNewsItem from "./RecentNewsItem";

interface NewsData {
  id: number;
  imgSrc: string;
  alt: string;
  category: string;
  date: string;
  title: string;
}

interface RecentNewsProps {
  styleTwo?: string;
}

const newsData: NewsData[] = [
  {
    id: 1,
    imgSrc: "assets/img/news/news-1.png",
    alt: "Conference Stage",
    category: "EventTrends",
    date: "2025-02-03",
    title:
      "Beyond the Stage: How Conferences Inspire Innovation & Collaboration",
  },
  {
    id: 2,
    imgSrc: "assets/img/news/news-2.png",
    alt: "Tech Summit",
    category: "TechSummit",
    date: "2025-02-08",
    title: "The Ultimate Guide to Engaging & Immersive Event Experiences",
  },
  {
    id: 3,
    imgSrc: "assets/img/news/news-3.png",
    alt: "Conference Branding",
    category: "EventTrends",
    date: "2025-02-12",
    title: "The Evolution of Conference Branding: Engaging Audiences in 2025",
  },
];

const RecentNews: React.FC<RecentNewsProps> = ({ styleTwo = "" }) => {
  const recentNewsClassname = classNames("recent-news", styleTwo);
  const textBlackColor = classNames({
    black: styleTwo,
  });
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80" />
      <section
        className={recentNewsClassname}
        aria-labelledby="recent-news-heading"
      >
        <div className="container">
          <SectionHeading
            title="Recent News"
            strokeText="NEWS"
            textBlackColor={textBlackColor}
          />

          <div className="recent-news__list">
            {newsData.map((item) => (
              <RecentNewsItem key={item.id} {...item} />
            ))}
          </div>

          <div className="tm-height-50 tm-height-lg-30" />
          <div className="tm-center">
            <PrimaryBtn btnLink="/blog">View More</PrimaryBtn>
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentNews;
