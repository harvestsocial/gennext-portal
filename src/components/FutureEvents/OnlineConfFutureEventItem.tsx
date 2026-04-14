import React from "react";
import { PrimaryBtn } from "@components/UI/Button";
import { Link } from "react-router-dom";
import AnimateOnScroll from "@components/AnimateOnScroll/AnimateOnScroll";

interface OnlineConfFutureEventItemProps {
  title: string;
  location: string;
  date: string;
  time: string;
  stock: "In Stock" | "free" | "Sold Out";
  onlyDate: string;
  id: number;
}

const OnlineConfFutureEventItem: React.FC<OnlineConfFutureEventItemProps> = ({
  title,
  location,
  date,
  time,
  stock,
  onlyDate,
  id,
}) => {
  return (
    <AnimateOnScroll
      animationType="fade-up"
      className="future-events__item future-events__item--style2"
    >
      <div className="future-events__content">
        <div className="future-events__info">
          <Link to={`/events-details/${id}`}>
            <h6 className="future-events__title future-events__title--style2">
              {title}
            </h6>
          </Link>
          <p className="future-events__desp">
            <span>Location:</span> {location}
          </p>
        </div>
        <div className="future-events__date future-events__date--style2">
          <h2 className="text text--style2">{onlyDate}</h2>
          <p className="date">{date}</p>
        </div>
        <div className="future-events__time">
          <p className="date date--style2">{time}</p>
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

export default OnlineConfFutureEventItem;
