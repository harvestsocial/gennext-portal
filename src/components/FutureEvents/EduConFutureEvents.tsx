import React from "react";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";
import SectionHeading from "@components/SectionHeading/SectionHeading";
import EduConFutureEventsItem from "./EduConFutureEventsItem";

interface EventData {
  id: number;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
}

const eventsData: EventData[] = [
  {
    id: 1,
    image: "assets/img/future/edu-conf-future-events-1.png",
    title: "Transforming Education Forum 2025",
    location: "Grace Centre, 5XH6+XR9, Harare",
    date: "March 26, 2025",
    time: "10:00 AM – 12:00 PM",
  },
  {
    id: 2,
    image: "assets/img/future/edu-conf-future-events-2.png",
    title: "Pedagogy & Innovation Conference",
    location: "Grace Centre, 5XH6+XR9, Harare",
    date: "March 15, 2025",
    time: "12:30 PM – 08:00 PM",
  },
];

const EduConFutureEvents: React.FC = () => (
  <>
    <section>
      <div className="container">
        <SectionHeading title="Future Events" strokeText="FUTURE EVENTS" />
        <AnimateOnScroll
          animationType="fade-up"
          className="edu-con-future-events"
        >
          {eventsData.map((event) => (
            <EduConFutureEventsItem key={event.id} {...event} />
          ))}
        </AnimateOnScroll>
      </div>
    </section>
    <div className="tm-height-150 tm-height-lg-80" />
  </>
);

export default EduConFutureEvents;
