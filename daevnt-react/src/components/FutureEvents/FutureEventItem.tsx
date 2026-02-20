import React from "react";
import { PrimaryBtn } from "@components/UI/Button";
import { Link } from "react-router-dom";
import AnimateOnScroll from "@components/AnimateOnScroll/AnimateOnScroll";

interface FutureEventItemProps {
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
  stock: "In Stock" | "free" | "Sold Out";
  id: number;
}

const FutureEventItem: React.FC<FutureEventItemProps> = ({ 
  image, 
  title, 
  location, 
  date, 
  time, 
  stock, 
  id 
}) => {
  return (
    <AnimateOnScroll animationType="fade-up" className="future-events__item">
      <div className="future-events__img">
        <img src={image} alt={title} />
      </div>
      <div className="future-events__content">
        <div className="future-events__info">
          <Link to={`/events-details/${id}`}>
            <h6 className="future-events__title">{title}</h6>
          </Link>
          <p className="future-events__desp">
            <span>Location:</span> {location}
          </p>
        </div>
        <div className="future-events__datetime">
          <div className="future-events__date">
            <p className="text">Date</p>
            <p className="date">{date}</p>
          </div>
          <div className="future-events__time">
            <p className="text">Time</p>
            <p className="date">{time}</p>
          </div>
        </div>

        <div className="future-events__btn">
          {stock === "In Stock" ? (
            <PrimaryBtn btnLink="/register">
              Register Now
            </PrimaryBtn>
          ) : stock === "free" ? (
            <Link to={`/events-details/${id}`}>Free</Link>
          ) : (
            <Link to={`/events-details/${id}`}>Sold Out</Link>
          )}
        </div>
      </div>
    </AnimateOnScroll>
  );
};

export default FutureEventItem;
