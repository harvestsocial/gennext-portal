import React from "react";
import { Link } from "react-router-dom";

interface RecentBlogItemProps {
  title: string;
  image: string;
  source: string;
  date: string;
  id: number;
}

const RecentBlogItem: React.FC<RecentBlogItemProps> = ({ title, image, source, date, id }) => {
  return (
    <div className="col">
      <Link to={`/blog-details/${id}`} className="blogs__item">
        <img src={image} className="blogs__img-top" alt={title} />
        <div className="blogs__body">
          <h5 className="blogs__title">{title}</h5>
        </div>
        <div className="blogs__footer">
          <p className="text-dot-left">{source}</p>
          <p>{date}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecentBlogItem;
