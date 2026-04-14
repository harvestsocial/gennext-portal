
import React from "react";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
}

interface SpeakerPreviousEventsProps {
  name: string;
  events: Event[];
}

const SpeakerPreviousEvents: React.FC<SpeakerPreviousEventsProps> = ({ name, events }) => (
  <div className="speaker-details__previous-hit-event">
    <h3 className="previous-hit-event__section-title">{name}' Hit Events</h3>
    <div className="previous-hit-event__items">
      {events.map((event) => (
        <div className="previous-hit-event__item" key={event.id}>
          <div className="previous-hit-event__right-side">
            <img
              src={event.image}
              alt={event.title}
              className="previous-hit-event__img"
            />
          </div>
          <Link
            to={`/events-details/${event.id}`}
            className="previous-hit-event__left-side"
          >
            <h5 className="previous-hit-event__item-title">{event.title}</h5>
            <p className="previous-hit-event__location">
              <span>Location:</span> {event.location}
            </p>
            <p className="previous-hit-event__date">{event.date}</p>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default SpeakerPreviousEvents;
