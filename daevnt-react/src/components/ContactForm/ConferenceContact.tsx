import React from "react";
import { Link } from "react-router-dom";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";

interface ConferenceContactData {
  title: string;
  description: string;
  addressTitle: string;
  address: string;
  phoneTitle: string;
  phone: string;
  emailTitle: string;
  email: string;
  mapSrc: string;
}

const conferenceContactData: ConferenceContactData = {
  title: "Generation Next Contact",
  description:
    "Join leading educators, researchers, and policymakers in a global dialogue on the future of learning.",
  addressTitle: "Address:",
  address: "Grace Centre, 5XH6+XR9, Harare",
  phoneTitle: "Phone:",
  phone: "+1-416-8241228",
  emailTitle: "Email:",
  email: "info@generationnextmovement.com",
  mapSrc:
    "https://www.google.com/maps?q=Grace%20Centre%2C%205XH6%2BXR9%2C%20Harare&z=17&output=embed",
};

const ConferenceContact: React.FC = () => {
  const {
    title,
    description,
    addressTitle,
    address,
    phoneTitle,
    phone,
    emailTitle,
    email,
    mapSrc,
  } = conferenceContactData;
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div className="conference-contact">
          <div className="conference-contact__wapper">
            <div className="conference-contact__content fade-up">
              <h3 className="conference-contact__title">{title}</h3>
              <p className="conference-contact__desp">{description}</p>

              <div className="conference-contact__address-info">
                <p className="address-info-title">{addressTitle}</p>
                <p className="address-info-desp">{address}</p>
              </div>

              <div className="conference-contact__phone-email">
                <div className="conference-contact__phone">
                  <p className="conference-contact__phone-subtitle">
                    {phoneTitle}
                  </p>
                  <Link
                    to={`tel:${phone}`}
                    className="conference-contact__phone-number"
                  >
                    {phone}
                  </Link>
                </div>
                <div className="conference-contact__email">
                  <p className="conference-contact__email-subtitle">
                    {emailTitle}
                  </p>
                  <Link
                    to={`mailto:${email}`}
                    className="conference-contact__email-number"
                  >
                    {email}
                  </Link>
                </div>
              </div>

              <div className="conference-contact__btn">
                <Link to={"/register"} className="primary__btn">
                  REGISTER NOW
                </Link>
              </div>
            </div>

            <AnimateOnScroll className="conference-contact__map" delay={0.2}>
              <div className="tm-google-map tm-bg">
                <iframe
                  className="map"
                  src={mapSrc}
                  allowFullScreen
                  loading="lazy"
                  title="Conference Location"
                ></iframe>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
      <div className="tm-height-150 tm-height-lg-80"></div>
    </>
  );
};

export default ConferenceContact;
