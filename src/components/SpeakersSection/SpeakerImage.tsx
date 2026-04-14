
import React from "react";
import { Link } from "react-router-dom";

interface Contact {
  phone: string;
  email: string;
  website: string;
}

interface Social {
  id: number | string;
  icon: string;
  url: string;
}

interface SpeakerImageProps {
  image: string;
  name: string;
  contact: Contact;
  socials: Social[];
}

const SpeakerImage: React.FC<SpeakerImageProps> = ({ image, name, contact, socials }) => (
  <div className="speaker-details__speaker-img">
    <img src={image} alt={name} />
    <div className="speaker-details__speaker-img-info">
      <ul>
        <li>
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
        </li>
        <li>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        <li>
          <a
            href={`https://${contact.website}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {contact.website}
          </a>
        </li>
      </ul>
    </div>
    <div className="speaker-details__speaker-scoile-info">
      <ul className="social__items">
        {socials.map(({ id, icon, url }) => (
          <li key={id} className="social__item">
            <Link
              to={url}
              className="social__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={icon}></i>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default SpeakerImage;
