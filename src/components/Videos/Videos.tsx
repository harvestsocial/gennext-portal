
import React from "react";
import VideoPopup from "./VideoPopup";
import aboutVideoBg from "/assets/img/bg/video-section-bg.png";

const Videos: React.FC = () => {
  return (
    <div className="video-section-wrapper">
      <VideoPopup
        thumbnail={aboutVideoBg}
        videoUrl="https://www.youtube.com/live/ecuvDgVB8vU?si=hYWnmYDtVCKVBuLb"
      />
    </div>
  );
};

export default Videos;
