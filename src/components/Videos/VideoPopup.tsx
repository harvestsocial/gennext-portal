import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";
import type { MouseEvent } from "react"; 
import { Link } from "react-router-dom";

interface VideoPopupProps {
  thumbnail?: string;
  videoUrl: string;
  gap?: string | null;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ thumbnail, videoUrl, gap = null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const getYouTubeId = (url: string): string => {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();

      if (host.includes("youtu.be")) {
        return parsed.pathname.replace("/", "");
      }

      if (host.includes("youtube.com")) {
        if (parsed.pathname.startsWith("/watch")) {
          return parsed.searchParams.get("v") || "";
        }
        if (parsed.pathname.startsWith("/embed/")) {
          return parsed.pathname.split("/")[2] || "";
        }
        if (parsed.pathname.startsWith("/live/")) {
          return parsed.pathname.split("/")[2] || "";
        }
      }
    } catch {
      // Fall back to regex parsing below for malformed URLs.
    }

    const match = url.match(/(?:\?v=|\/embed\/|\/live\/|\.be\/)([^\s&?/]+)/);
    return match ? match[1] : "";
  };

  const openModal = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = (e?: MouseEvent<HTMLDivElement | HTMLDivElement>) => {
    e?.preventDefault();
    setIsOpen(false);
  };

  const videoId = getYouTubeId(videoUrl);

  const classGap = classNames({
    "tm-height-150 tm-height-lg-80": !gap,
    [gap as string]: !!gap,
  });

  // Scroll lock using useEffect and ref
  useEffect(() => {
    const popup = popupRef.current;
    if (isOpen && popup) {
      popup.style.overflow = "hidden";
    } else if (popup) {
      popup.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      {thumbnail && <div className={classGap}></div>}

      <Link
        to={videoUrl}
        className="tm-center tm-video-block tm-style1 tm-video-open tm-bg"
        onClick={openModal}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            className="video-img tm-bg"
            alt="Video Thumbnail"
          />
        )}
        <span className="video-player-btn circle-btn-anim tm-center">
          <span className="text">PLAY VIDEO</span>
        </span>
      </Link>

      {isOpen && (
        <div className="tm-video-popup active" ref={popupRef}>
          <div
            className="tm-video-popup-overlay"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="tm-video-popup-content">
            <div className="tm-video-popup-layer" />
            <div className="tm-video-popup-container">
              <div className="tm-video-popup-align">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              </div>
              <div
                className="tm-video-popup-close"
                onClick={closeModal}
                role="button"
                tabIndex={0}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPopup;
