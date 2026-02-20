
import React, { useEffect, useState, useMemo } from "react";
import VideoPopup from "@/components/Videos/VideoPopup";
import bgImages from "/assets/img/bg/oc-video-section-bg.png";
import { PrimaryBtn } from "@components/UI/Button";
import classNames from "classnames";

interface VideoCountdownProps {
  styleTwo?: string;
  bgImage?: string;
}

// Countdown type
interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getCountdown = (endTime: Date): Countdown => {
  const total = Math.max(0, endTime.getTime() - new Date().getTime());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
};

const VideoCountdown: React.FC<VideoCountdownProps> = ({
  styleTwo,
  bgImage = bgImages,
}) => {

  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 25); 
    return date;
  }, []);

  const [countdown, setCountdown] = useState<Countdown>(
    getCountdown(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(targetDate));
    }, 1000);

    return () => clearInterval(interval); 
  }, [targetDate]);

  const counterDownContentClassName = classNames(
    "counterdown",
    "counterdown__content",
    { style2: styleTwo === "style2" }
  );

  const counterdownInfoClassName = classNames("counterdown__info", {
    style2: styleTwo === "style2",
  });

  return (
    <>
      <div className="tm-height-150 tm-height-lg-80" />
      <div className="video-counterdown">
        <div
          className="video-counterdown__wapper"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="video-counter">
            <VideoPopup videoUrl="https://www.youtube.com/live/ecuvDgVB8vU?si=hYWnmYDtVCKVBuLb" />
          </div>
          <div className={counterDownContentClassName}>
            <div className={counterdownInfoClassName}>
              <p className="counterdown__subtitle">GET PASS</p>
              <h6 className="counterdown__title">Our conference starts in</h6>
              <div className="counterdown__number-content">
                {Object.entries(countdown).map(([label, value]) => (
                  <div className="counterdown__number-item" key={label}>
                    <h2 className="counterdown__number-item-title">
                      {value.toString().padStart(2, "0")}
                    </h2>
                    <p className="counterdown__number-item-subtitle">
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="counterdown__btn">
                <PrimaryBtn btnLink="/register">Register Now</PrimaryBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCountdown;

