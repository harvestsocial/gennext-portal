import React from "react";
import Breadcrumb from "@components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import CtaBg from "@components/Cta/CtaBg";

import servicesData from "../jsonData/servicesData.json";


interface BreadcrumbLink {
  label: string;
  path?: string;
}

interface BreadcrumbData {
  title: string;
  links: BreadcrumbLink[];
}

interface ServiceData {
  id: number;
  title: string;
  description: string[];
  thumbnail: string;
  highlights: { label: string; text: string }[];
  images: string[];
  closingNote: string;
}

const breadcrumbData: BreadcrumbData = {
  title: "Award Ceremonies",
  links: [
    { label: "Home", path: "/" },
    { label: "Service", path: "/services" },
    { label: "Award Ceremonies" },
  ],
};

const ServicesDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const service = (servicesData as ServiceData[]).find((item) => item.id === Number(id));

  if (!service) {
    return (
      <p style={{ padding: "150px", textAlign: "center" }}>
        Service not found!
      </p>
    );
  }

  const { thumbnail, description, title, highlights, images, closingNote } =
    service;

  return (
    <div>
      <Breadcrumb breadcrumbData={breadcrumbData} className= "style3"/>
      <div className="tm-center">
        <div className="min-container container">
          <div className="services-details">
            <img
              src={thumbnail}
              className="services-thumbnail"
              alt="Service Thumbnail"
            />
            <div className="services-details__wapper">
              {description.map((text, idx) => (
                <p className="services-details__desp" key={idx}>
                  {text}
                </p>
              ))}

              <h5 className="services-details__title">{title}</h5>

              {highlights.map((item, idx) => (
                <p className="services-details__desp" key={idx}>
                  <span className="highlight">{item.label}</span> {item.text}
                </p>
              ))}

              <div className="services-details__imgs">
                {images.map((imgSrc, idx) => (
                  <img src={imgSrc} alt={`Service ${idx + 1}`} key={idx} />
                ))}
              </div>

              <p className="services-details__desp">{closingNote}</p>
              <div className="tm-height-150 tm-height-lg-80"></div>
            </div>
          </div>
        </div>
      </div>
      <CtaBg />
    </div>
  );
};

export default ServicesDetails;
