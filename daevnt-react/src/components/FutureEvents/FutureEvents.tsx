
import React from "react";
import FutureEventItem from "./FutureEventItem";
import SectionHeading from "@components/SectionHeading/SectionHeading";

interface Event {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  image: string;
  stock: "In Stock" | "free" | "Sold Out";
}

const events: Event[] = [
  {
    id: 1,
    title: "Generation Next",
    location: "Grace Centre, Tynwald South, Harare",
    date: "March 12, 2026",
    time: "10:00 AM – 1:00 PM",
    image: "assets/img/events/event-1.png",
    stock: "In Stock",
  },
  {
    id: 2,
    title: "Church Leadership",
    location: "Grace Centre, Tynwald South, Harare",
    date: "March 12, 2026",
    time: "2:00 PM – 4:30 PM",
    image: "assets/img/events/event-2.png",
    stock: "In Stock",
  },
  {
    id: 3,
    title: "Prophetic Anointing",
    location: "Grace Centre, Tynwald South, Harare",
    date: "March 13, 2026",
    time: "9:00 AM – 1:00 PM",
    image: "assets/img/events/event-3.png",
    stock: "In Stock",
  },
];

const FutureEvents: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <section className="future-events">
        <div className="container">
          <SectionHeading title="Future Events" HeadingLeft={true} />
          <div className="future-events__wrapper">
            {events.map((event) => (
              <FutureEventItem key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FutureEvents;
