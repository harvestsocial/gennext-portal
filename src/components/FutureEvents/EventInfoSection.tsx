
import React from "react";
import eventData from "../../jsonData/eventInfoContact.json";
import EventInfoContact from "./EventInfoContact";

interface EventItem {
  label: string;
  value: string;
}

interface EventSection {
  title: string;
  items: EventItem[];
}

interface EventData {
  details: EventSection;
  organizer: EventSection;
  venue: EventSection;
  mapSrc: string;
}

const EventInfoSection: React.FC = () => {
  const data = eventData as EventData;

  return (
    <div className="container">
      <div className="event-info-contact">
        <EventInfoContact
          title={data.details.title}
          items={data.details.items}
        />
        <EventInfoContact
          title={data.organizer.title}
          items={data.organizer.items}
        />
        <EventInfoContact
          title={data.venue.title}
          items={data.venue.items}
        />

        {/* Google Map Section */}
        <div className="event-info-sction">
          <div className="google-map tm-bg">
            <iframe
              className="map"
              src={data.mapSrc}
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInfoSection;
