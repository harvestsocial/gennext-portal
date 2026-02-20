import React from "react";
import { Link } from "react-router-dom";

const categories: string[] = [
  "AI & Technology",
  "Business & Leadership",
  "Event Planning",
  "Industry Trends",
  "Marketing & Branding",
];

const CategoryList: React.FC = () => {
  return (
    <div className="blog-widgets__category">
      <h6 className="blog-widgets__category-title">Popular Category</h6>
      <ul className="blog-widgets__category-lists">
        {categories.map((category, index) => (
          <li key={index} className="blog-widgets__category-list">
            <Link to="/blog">{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
