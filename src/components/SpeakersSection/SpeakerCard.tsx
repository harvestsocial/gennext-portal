import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface Socials {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

interface Speaker {
  id: number;
  image: string;
  name: string;
  title: string;
  socials?: Socials;
  infoStyle?: string;
}

interface SpeakerCardProps {
  speaker: Speaker;
  style2?: string;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({ speaker, style2 = "" }) => {
  const { image, name, title, socials = {}, infoStyle = "", id } = speaker;
  const nameClass = classNames("speakers-card__title", "text-dot-left", {
    "tm-black-color": style2,
  });

  const titleClass = classNames("speakers-card__subtitle", {
    "tm-black-color": style2,
  });

  const buttonTypeClass = classNames("icon", "trigger", {
    type2: style2 || !style2,
  });

  const infoStyleClass = classNames("speakers-card__info", {
    "style-2": infoStyle,
  });
  return (
    <div className="speakers-card">
      <div className="speakers-top__img">
        <img src={image} alt={name || "Speaker"} />
        <div className="speakers-main__button-content">
          <div className="speakers-top__img__social">
            {socials.facebook && (
              <Link
                to={socials.facebook}
                target="_blank"
                className="icon"
                aria-label="Facebook"
              >
                <i className="flaticon-facebook" />
              </Link>
            )}
            {socials.instagram && (
              <Link
                to={socials.instagram}
                className="icon"
                target="_blank"
                aria-label="Instagram"
              >
                <i className="flaticon-instagram" />
              </Link>
            )}
            {socials.twitter && (
              <Link
                to={socials.twitter}
                target="_blank"
                className="icon"
                aria-label="Twitter"
              >
                <i className="flaticon-twitter" />
              </Link>
            )}
            <button type="button" className={buttonTypeClass}>
              <span className="arrow-up__icon">
                <i className="flaticon-arrow-left-1" />
              </span>
              <span className="link__icon">
                <i className="flaticon-link" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <Link to={`/speaker-details/${id}`} className={infoStyleClass}>
        <h6 className={nameClass}>{name}</h6>
        <p className={titleClass}>{title}</p>
      </Link>
    </div>
  );
};

export default SpeakerCard;
