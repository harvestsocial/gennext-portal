import React from "react";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import eventsData from "../jsonData/eventsData.json";
import { ZigzagHoverBtn } from "@/components/UI/Button";
import FutureEventItem from "@components/FutureEvents/FutureEventItem";


interface FutureEventItemProps {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  image: string;
  stock: "In Stock" | "free" | "Sold Out";
}
interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  image: string;
  links: BreadcrumbLink[];
}

const EventsGrid: React.FC = () => {

  const breadcrumbData: BreadcrumbData = {
    title: "Events Grid",
    image: "/assets/img/hero/comm-breadcrumb.png",
    links: [{ label: "Home", path: "/" }, { label: "Events Grid" }],
  };

  const typedEvents: FutureEventItemProps[] = eventsData.map((e) => ({
  ...e,
  stock: e.stock as "In Stock" | "free" | "Sold Out",
  }));

  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />
      <div className="tm-height-150 tm-height-lg-80"></div>
      <section className="future-events">
        <div className="container">
          <div className="future-events__wrapper future-events__wrapper-grid row">
            {typedEvents.map((event) => (
              <FutureEventItem key={event.id} {...event} />
            ))}
          </div>
        </div>
        <div className="tm-height-100 tm-height-lg-80"></div>
        <div className="tm-center">
          <ZigzagHoverBtn btnLink="#">View More</ZigzagHoverBtn>
        </div>
        <div className="tm-height-100 tm-height-lg-80"></div>
      </section>
    </>
  );
};

export default EventsGrid;
