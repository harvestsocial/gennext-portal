import React from "react";
import SectionHeading from "@components/SectionHeading/SectionHeading";
import OnlineConfFutureEventItem from "./OnlineConfFutureEventItem";

interface OnlineEvent {
  id: number;
  title: string;
  location: string;
  date: string;
  onlyDate: string;
  time: string;
  stock: "In Stock" | "free" | "Sold Out";
}

const events: OnlineEvent[] = [
  {
    id: 1,
    title: "Generation Next",
    location: "Grace Centre, Tynwald South, Harare",
    date: "March 2026",
    onlyDate: "12",
    time: "10:00 AM – 1:00 PM",
    stock: "In Stock",
  },
  {
    id: 2,
    title: "Church Leadership",
    location: "Grace Centre, Tynwald South, Harare",
    date: "March 2026",
    onlyDate: "12",
    time: "2:00 PM – 4:30 PM",
    stock: "In Stock",
  },
  {
    id: 3,
    title: "Prophetic Anointing",
    location: "Grace Centre, Tynwald South, Harare",
    date: "March 2026",
    onlyDate: "13",
    time: "9:00 AM – 1:00 PM",
    stock: "In Stock",
  },
];

const OnlineConfFutureEvent: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <section className="future-events">
        <div className="container">
          <SectionHeading title="Future Events" />
          <div className="future-events__wrapper">
            {events.map((event) => (
              <OnlineConfFutureEventItem key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineConfFutureEvent;
