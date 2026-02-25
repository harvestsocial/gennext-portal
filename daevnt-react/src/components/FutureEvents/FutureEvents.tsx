
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
    title: "Generation Next 4th Edition",
    location: "Grace Centre, Harare",
    date: "12 - 14 March, 2026",
    time: "8:30am - 10:00pm",
    image: "assets/img/events/event4.jpg",
    stock: "In Stock",
  },
  {
    id: 2,
    title: "Generation Next 5th Edition",
    location: "Masvingo",
    date: "May, 2026",
    time: "TBA",
    image: "assets/img/events/event1.jpg",
    stock: "In Stock",
  },
  {
    id: 3,
    title: "Generation Next 6th Edition",
    location: "Bulawayo",
    date: "July, 2026",
    time: "TBA",
    image: "assets/img/events/event2.jpg",
    stock: "In Stock",
  },
];

const FutureEvents: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <section className="future-events">
        <div className="container">
          <SectionHeading title="Generation Next 2026 Calendar" HeadingLeft={true} />
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
