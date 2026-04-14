import React from "react";
import SpeakerCard from "./SpeakerCard";
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

// --- Speaker Roles (Buttons)
const speakerRoles: string[] = ["SPEAKER", "GUEST", "ADMINISTRATOR"];

// --- Speakers Data
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

const OcSpeakersContent: React.FC = () => {
  return (
    <div className="oc-speakers-card__content ">
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div className="row">
          {/* Button Column */}
          <div className="col-xxl-3 col-xl-2">
            <div className="speakers-btn__content-wrapper">
              {speakerRoles.map((role, index) => (
                <Link
                  key={index}
                  to="/about-us"
                  className="primary__btn style3 bg-white__btn"
                >
                  {role}
                </Link>
              ))}
            </div>
          </div>

          {/* Speakers Cards Column */}
          <div className="col-xxl-9 col-xl-10">
            <h3 className="oc-speakers-card__title">LEAD SPEAKER</h3>
            <div className="row row-cols-1 row-cols-md-2 g-4 row-cols-xl-3">
              {speakers.map((speaker, index) => (
                <div className="col" key={speaker.id}>
                  <SpeakerCard speaker={speaker} key={index} style2="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OcSpeakersContent;
