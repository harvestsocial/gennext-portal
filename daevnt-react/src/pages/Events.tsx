import React from "react";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import FutureEventItem from "@components/FutureEvents/FutureEventItem";
import { ZigzagHoverBtn } from "@/components/UI/Button";

import eventsData from "../jsonData/eventsData.json";

interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  image: string;
  links: BreadcrumbLink[];
}

interface EventData {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  image: string;
  stock: "In Stock" | "free" | "Sold Out";
}

const Events: React.FC = () => {
  
  const breadcrumbData: BreadcrumbData = {
    title: "Events List",
    image: "/assets/img/hero/comm-breadcrumb.png",
    links: [{ label: "Home", path: "/" }, { label: "Event List" }],
  };

  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />

      <div className="tm-height-150 tm-height-lg-80"></div>
      <section className="future-events">
        <div className="container">
          <div className="future-events__wrapper">
            {(eventsData as EventData[])?.map((event) => (
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

export default Events;
