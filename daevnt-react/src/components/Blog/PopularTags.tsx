
import React from "react";
import { Link } from "react-router-dom";

const tags: string[] = [
  "AIInnovation",
  "EventPlanning",
  "TechTrends",
  "NetworkingTips",
  "BusinessGrowth",
  "DigitalMarketing",
  "FutureOfWork",
  "LeadershipInsights",
];

const PopularTags: React.FC = () => {
  return (
    <div className="blog-widgets__popular-tag">
      <div className="blog-widgets__popular-tag-title">Popular Tag</div>
      <div className="blog-widgets__popular-tag-lists">
        {tags.map((tag, index) => (
          <Link key={index} to="/blog">
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
