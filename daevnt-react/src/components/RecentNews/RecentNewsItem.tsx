import React from "react";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";
import { Link } from "react-router-dom";

interface RecentNewsItemProps {
  imgSrc: string;
  alt: string;
  category: string;
  date: string;
  title: string;
  id: number;
}

const RecentNewsItem: React.FC<RecentNewsItemProps> = ({ 
  imgSrc, 
  alt, 
  category, 
  date, 
  title, 
  id 
}) => (
  <AnimateOnScroll className="fade-up">
    <article
      className="recent-news__item"
      tabIndex={0}
      aria-label={`News: ${title}`}
    >
      <img src={imgSrc} alt={alt} className="recent-news__img" loading="lazy" />
      <div className="recent-news__item__content">
        <section className="news-category" aria-label="News Category">
          <p className="news-category__title">Category</p>
          <p className="news-category__description text-dot-left">{category}</p>
        </section>
        <section className="news-date" aria-label="Published Date">
          <p className="news-date__title">Date</p>
          <time
            className="news-date__description"
            dateTime={new Date(date).toISOString()}
          >
            {date}
          </time>
        </section>
        <section className="news-title" aria-label="News Title">
          <p className="news-title__title">Title</p>
          <Link
            to={`/blog-details/${id}`}
            className="news-title__description"
            rel="noopener noreferrer"
          >
            {title}
          </Link>
        </section>
        <span className="hover-circle" aria-hidden="true"></span>
      </div>
    </article>
  </AnimateOnScroll>
);

export default RecentNewsItem;
