
import React from "react";

interface EventInfoItem {
  label?: string;
  value: string;
  type?: "tel" | "email" | "text";
}

interface EventInfoContactProps {
  title?: string;
  items: EventInfoItem[];
}

const EventInfoContact: React.FC<EventInfoContactProps> = ({ title, items }) => {
  return (
    <div className="event-info-sction">
      {title && <h5 className="event-info-sction__title">{title}</h5>}
      {items.map((item, idx) => (
        <div className="event-info-sction__box" key={idx}>
          {item.label && <h5 className="event-info__title">{item.label}:</h5>}
          {item.type === "tel" ? (
            <a href={`tel:${item.value}`} className="event-infot__subtitle">
              {item.value}
            </a>
          ) : item.type === "email" ? (
            <a href={`mailto:${item.value}`} className="event-infot__subtitle">
              {item.value}
            </a>
          ) : (
            <p className="event-infot__subtitle">
              {item.value.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventInfoContact;
