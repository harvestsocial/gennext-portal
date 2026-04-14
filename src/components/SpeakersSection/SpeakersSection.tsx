import React from "react";
import { Link } from "react-router-dom";
import SpeakerCard from "./SpeakerCard";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";

interface Socials {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

interface Speaker {
  id: number;
  name: string;
  title: string;
  image: string;
  socials: Socials;
  infoStyle?: string;
}

const speakersLeft: Speaker[] = [
  {
    id: 1,
    name: "Prophetess Memory",
    title: "Keynote Speaker",
    image: "/assets/img/speaker/speaker-1.png",
    socials: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/accounts/login",
      twitter: "https://x.com/?lang=en",
    },
  },
  {
    id: 2,
    name: "Bishop Tavonga Vutabwashe",
    title: "Presiding Bishop",
    image: "/assets/img/speaker/speaker-2.png",
    socials: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/accounts/login",
      twitter: "https://x.com/?lang=en",
    },
  },
];

const speakersRight: Speaker[] = [
  {
    id: 3,
    name: "Dr. Colin Nyathi",
    title: "Senior Pastor",
    image: "/assets/img/speaker/speaker-4.png",
    socials: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/accounts/login",
      twitter: "https://x.com/?lang=en",
    },
    infoStyle: "style-2",
  },
  {
    id: 4,
    name: "Dr. Sarah Nyathi",
    title: "Co-Founder",
    image: "/assets/img/speaker/speaker-3.png",
    socials: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/accounts/login",
      twitter: "https://x.com/?lang=en",
    },
  },
];

const SpeakersSection: React.FC = () => {
  return (
    <section className="container">
      <div className="tm-height-150 tm-height-lg-80"></div>
      <AnimateOnScroll className="fade-up">
        <div className="speakers-section">
          <div className="speakers-section__wrapper">
            {/* Left Side */}
            <div className="speakers-section__left-sider">
              <div className="speakers-section__heading">
                <h2 className="speakers-section__title">
                  <span className="highlight">EXPERTS</span> INDUSTRY LEAD
                  SPEAKER
                </h2>
                <Link to="/speaker" className="primary__btn">
                  View More Guests
                </Link>
              </div>
              <div className="tm-height-50 tm-height-lg-0" />
              <div className="speakers-section__left-sider-cards">
                {speakersLeft.map((speaker, index) => (
                  <SpeakerCard speaker={speaker} key={index} />
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="speakers-section__right-sider">
              {speakersRight.map((speaker, index) => (
                <SpeakerCard speaker={speaker} key={index} />
              ))}
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default SpeakersSection;
