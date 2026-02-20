
import React from "react";
import { ZigzagHoverBtn } from "../../UI/Button";

interface Speaker {
  avatar: string;
  name: string;
  role: string;
}
 interface SlideItemRefs {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  speakerNameRef: React.RefObject<HTMLHeadingElement | null>;
  speakerRoleRef: React.RefObject<HTMLParagraphElement | null>;
  dateTimeRef: React.RefObject<HTMLDivElement | null>;
  speakerImgRef: React.RefObject<HTMLImageElement | null>;
}

interface SlideItemProps {
  title: string[];
  image: string;
  speaker: Speaker;
  date: string;
  time: string;
  location: string;
  refs: SlideItemRefs;
}

const SlideItem: React.FC<SlideItemProps> = ({
  title,
  image,
  speaker,
  date,
  time,
  location,
  refs,
}) => {
  return (
    <>
      <img src={image} className="creative-conference__img" alt="Hero" />
      <div className="container container-customizes">
        <div className="creative-conference__content">
          <h1
            ref={refs.titleRef}
            className="creative-conference__title anim-line-words home-intro__highlight"
          >
            {title.map((word, index) => (
              <span
                key={index}
                className={`home-intro__highlight-word${
                  index === 1 ? " small-text" : ""
                }`}
              >
                {word}
              </span>
            ))}
          </h1>

          <div className="creative-conference__speaker">
            <img
              ref={refs.speakerImgRef}
              className="speaker__img"
              src={speaker.avatar}
              alt={speaker.name}
            />
            <div className="speaker__content">
              <div className="speaker__inner-text anim-line-words">
                UPCOMING
              </div>
              <h6 ref={refs.speakerNameRef} className="speaker__name">
                {speaker.name}
              </h6>
              <p ref={refs.speakerRoleRef} className="speaker__desp">
                {speaker.role}
              </p>
            </div>
          </div>

          <div ref={refs.dateTimeRef} className="creative-conference__datetime">
            <p className="datetime_desp">{location}</p>
            <div className="datetime__content">
              <p className="datetime__name">{date}</p>
              <h6 className="datetime__desp">{time}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="cc__slider--btn">
        <ZigzagHoverBtn btnLink={"/register"}>Register Now</ZigzagHoverBtn>
      </div>
    </>
  );
};

export default SlideItem;
