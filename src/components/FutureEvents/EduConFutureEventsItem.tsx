import React from "react";
import { Link } from "react-router-dom";

interface EduConFutureEventsItemProps {
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
  id: number;
}

const EduConFutureEventsItem: React.FC<EduConFutureEventsItemProps> = ({ 
  image, 
  title, 
  location, 
  date, 
  time, 
  id 
}) => (
  <div className="future-events__item-style2">
    <div className="future-events__item-img">
      <img src={image} className="img-fluid" alt={title} />
    </div>
    <div className="future-events__item-body">
      <div className="future-events__item-info">
        <Link to={`/events-details/${id}`}>
          <h5 className="future-events__item-title">{title}</h5>
        </Link>
        <p className="future-events__item-location">
          <span className="highlight">Location:</span> {location}
        </p>
        <div className="future-events__item-datetime">
          <p className="future-events__item-date">{date}</p>
          <p className="future-events__item-year text-dot-left">{time}</p>
        </div>
        <div className="future-events__item_btn">
          <Link to="/register" className="primary__btn">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default EduConFutureEventsItem;
