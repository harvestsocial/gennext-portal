
import React from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import eventsDetailsData from "../jsonData/eventsDetailsData.json";
import EventInfoSection from "@components/FutureEvents/EventInfoSection";
import TicketForm from "@components/FutureEvents/TicketForm";


interface AboutContent {
  title: string;
  desp: string;
}

interface Expect {
  title: string;
  list: string[];
}

interface Attend {
  title: string;
  list: string[];
}

interface Speaker {
  id: number;
  name: string;
  title: string;
  img: string;
}

interface Speakers {
  id: number;
  title: string;
  list: Speaker[];
}

interface EventOverview {
  desp: string;
}

interface EventDetail {
  id: number;
  aboutContent: AboutContent;
  expect: Expect;
  attend: Attend;
  speakers: Speakers;
  eventOverview: EventOverview;
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

const breadcrumbData: BreadcrumbData = {
  title: "Event Details",
  image: "/assets/img/hero/comm-breadcrumb.png",
  links: [
    { label: "Home", path: "/" },
    { label: "Events", path: "/events" },
    { label: "Event Details" },
  ],
};

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const events: EventDetail | undefined = eventsDetailsData.find(
    (item: EventDetail) => item.id === Number(id)
  );
  if (!events) {
    return (
      <p style={{ padding: "150px", textAlign: "center" }}>
        Service not found!
      </p>
    );
  }

  const { aboutContent, expect, attend, speakers, eventOverview } = events;

  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} className="style2" />
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div
          className="row justify-content-between flex-column-reverse flex-lg-row gy-5"
          id="containerAround"
        >
          {/* Left Side */}
          <div className="col-lg-8">
            <div id="scrollGaleria">
              <div className="event-details">
                <div className="event-details__wapper">
                  {/* Thumbnail */}
                  <div className="event-details__thumbnail">
                    <img
                      src="/assets/img/blog/blog-details-thumbnail.png"
                      alt="Event Thumbnail"
                    />
                  </div>

                  {/* About Section */}
                  <div className="event-details__info">
                    <h5 className="event-details__title">
                      {aboutContent.title}
                    </h5>
                    <p className="event-details__desp">{aboutContent.desp}</p>
                  </div>

                  {/* What to Expect */}
                  <div className="event-details__info">
                    <h5 className="event-details__title">{expect.title}</h5>
                    <ul className="event-details__lists">
                      {expect.list.map((item, index) => (
                        <li key={index} className="event-details__list">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Who Should Attend */}
                  <div className="event-details__info">
                    <h5 className="event-details__title">{attend.title}</h5>
                    <ul className="event-details__lists style2">
                      {attend.list.map((item, index) => (
                        <li key={index} className="event-details__list">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Speakers */}
                  <div className="event-details__speakers">
                    <div className="event-details__speakers-left">
                      <h5 className="event-details__title">{speakers.title}</h5>
                    </div>
                    <div className="event-details__speakers-right">
                      {speakers.list.map((speaker, index) => (
                        <div className="speakers-card" key={index}>
                          <div className="speakers-top__img">
                            <img src={speaker.img} alt={speaker.name} />
                            <div className="speakers-main__button-content">
                              <div className="speakers-top__img__social">
                                <Link
                                  target="_blank"
                                  to="https://www.facebook.com/"
                                  className="icon"
                                >
                                  <i className="flaticon-facebook"></i>
                                </Link>
                                <Link
                                  target="_blank"
                                  to="https://www.instagram.com/accounts/login"
                                  className="icon"
                                >
                                  <i className="flaticon-instagram"></i>
                                </Link>
                                <Link
                                  target="_blank"
                                  to="https://x.com"
                                  className="icon"
                                >
                                  <i className="flaticon-twitter"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <Link
                            to={`/speaker-details/${speaker.id}`}
                            className="speakers-card__info"
                          >
                            <h6 className="speakers-card__title text-dot-left">
                              {speaker.name}
                            </h6>
                            <p className="speakers-card__subtitle">
                              {speaker.title}
                            </p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Event Overview */}
                  <div className="event-details__info">
                    <h5 className="event-details__title">Event Overview</h5>
                    <p className="event-details__desp">{eventOverview.desp}</p>
                  </div>

                  {/* Add to Calendar */}
                  <div className="add-to-card-btn mt-2">
                    <Link to="/events" className="primary__btn">
                      ADD TO CALENDAR
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-4">
            <div id="infoProduto">
              <section className="ticket-purchase">
                <div
                  className="ticket-purchase__card"
                  role="region"
                  aria-labelledby="ticketTitle"
                >
                  <h2 className="ticket-purchase__title" id="ticketTitle">
                    Ticket
                  </h2>
                  <TicketForm />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div className="tm-height-150 tm-height-lg-80"></div>
      <EventInfoSection />
      <div className="tm-height-150 tm-height-lg-80"></div>
    </>
  );
};

export default EventDetails;
