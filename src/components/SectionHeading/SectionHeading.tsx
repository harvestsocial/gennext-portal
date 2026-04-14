import React from "react";
import { ViewBtn } from "../UI/Button";
import classNames from "classnames";

interface SectionHeadingProps {
  title?: string;
  HeadingLeft?: boolean;
  nextBtnClass?: string;
  prevBtnClass?: string;
  subtitle?: string;
  strokeText?: string;
  textBlackColor?: string | boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title = "Default Title",
  HeadingLeft = false,
  nextBtnClass,
  prevBtnClass,
  subtitle = "",
  strokeText = "",
  textBlackColor = "",
}) => {
  const headingColorClass = classNames("common-section-heading__title", {
    "tm-black-color": textBlackColor,
  });
  return (
    <div className="common-section-heading">
      <div
        className={`common-section-heading__wapper ${subtitle ? "type-2" : ""}`}
      >
        <div className="common-section-heading__right">
          <div className="common-section-heading__content">
            <h2 className={headingColorClass}>{title}</h2>
          </div>
        </div>
        {HeadingLeft && (
          <div className="common-section-heading__left">
            <div>
              <ViewBtn btnLink="/events">View All</ViewBtn>
            </div>
          </div>
        )}{" "}
        {nextBtnClass && prevBtnClass && (
          <div className="common-section-heading__left swiper__buttons">
            <div className="common-section-heading__buttons">
              <button className={`circle__btn-next ${nextBtnClass}`}>
                <i className="flaticon-right-arrow-2"></i>
              </button>
              <button className={`circle__btn-perv ${prevBtnClass}`}>
                <i className="flaticon-right-arrow-2"></i>
              </button>
            </div>
          </div>
        )}
        {subtitle && (
          <div className="common-section-heading__left swiper__buttons">
            <div className="common-section-heading__subtitle">
              <p>{subtitle}</p>
            </div>
          </div>
        )}
        {strokeText && (
          <div className="common-section-heading__left swiper__buttons">
            <div className="tm-stroke-normal">{strokeText}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeading;
