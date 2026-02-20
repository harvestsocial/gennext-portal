import React from "react";

interface MapEmbedProps {
  mapSrc?: string;
  className?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({
  mapSrc = "https://www.google.com/maps?q=Grace%20Centre%2C%205XH6%2BXR9%2C%20Harare&z=17&output=embed",
  className = "tm-google-map tm-bg google-map",
}) => {
  return (
    <div className={className}>
      <iframe
        title="Google Map"
        className="map"
        src={mapSrc}
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MapEmbed;
