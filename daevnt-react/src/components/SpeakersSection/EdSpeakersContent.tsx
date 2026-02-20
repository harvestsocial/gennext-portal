import React from "react";
import SpeakerCard from "./SpeakerCard";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";
import { Link } from "react-router-dom";

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
}

const speakerRoles: string[] = ["SPEAKER", "GUEST", "ADMINISTRATOR"];

const speakers: Speaker[] = [
  {
    id: 1,
    name: "Michael Chen",
    title: "Head of Cybersecurity, SecureNet",
    image: "assets/img/speaker/speaker-5.png",
    socials: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/accounts/login",
      twitter: "https://x.com/?lang=en",
    },
  },
  {
    id: 2,
    name: "Linda Roberts",
    title: "Senior Data Scientist, OpenAI",
    image: "assets/img/speaker/speaker-6.png",
    socials: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/accounts/login",
      twitter: "https://x.com/?lang=en",
    },
  },
  {
    id: 3,
    name: "James Porter",
    title: "Full-Stack Developer, CodeGen",
    image: "assets/img/speaker/speaker-7.png",
    socials: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/accounts/login",
      twitter: "https://x.com/?lang=en",
    },
  },
];

const EdSpeakersContent: React.FC = () => {
  return (
    <div className="edconfer-speakers-card__content">
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div className="row">
          {/* Button Column */}
          <div className="col-xxl-3 col-xl-2">
            <div className="speakers-btn__content-wrapper">
              {speakerRoles.map((role) => (
                <Link key={role} to="/about-us" className="primary__btn style3">
                  {role}
                </Link>
              ))}
            </div>
          </div>

          {/* Speakers Cards Column */}
          <div className="col-xxl-9 col-xl-10">
            <h2 className="edconfer-speakers-card__title">
              <span className="highlight">EXPERTS</span> INDUSTRY LEAD SPEAKER
            </h2>
            <div className="row row-cols-1 row-cols-md-2 g-4 row-cols-xl-3">
              {speakers.map((speaker, index) => (
                <div className="col" key={index}>
                  <AnimateOnScroll delay={index * 0.2}>
                    <SpeakerCard speaker={speaker} key={speaker.id} />
                  </AnimateOnScroll>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdSpeakersContent;
