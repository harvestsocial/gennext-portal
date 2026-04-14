import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import classNames from "classnames";

type ZigzagHoverBtnProps = {
  btnLink?: string;
  children?: string;
  className?: string;
};

export const ZigzagHoverBtn: React.FC<ZigzagHoverBtnProps> = ({
  btnLink = "/register",
  children = "Register Now",
  className = "style1",
}) => {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const shapeRef = useRef<SVGPathElement | null>(null);

  useGSAP(
    (_, contextSafe) => {
      if (!buttonRef.current || !shapeRef.current) return;

      gsap.set(shapeRef.current, { drawSVG: "0%" });

      if (!contextSafe) return;

      const mouseenter = contextSafe(() => {
        if (shapeRef.current) {
          gsap.to(shapeRef.current, {
            duration: 1,
            drawSVG: "100%",
            ease: "power2.out",
          });
        }
      });

      const mouseleave = contextSafe(() => {
        if (shapeRef.current) {
          gsap.to(shapeRef.current, {
            duration: 1,
            drawSVG: "0%",
            ease: "power2.out",
          });
        }
      });
      const btn = buttonRef.current;
      if (btn) {
        btn.addEventListener("mouseenter", mouseenter);
        btn.addEventListener("mouseleave", mouseleave);

        return () => {
          if (btn) {
            btn.removeEventListener("mouseenter", mouseenter);
            btn.removeEventListener("mouseleave", mouseleave);
          }
        };
      }
    },
    { scope: buttonRef }
  );

  const textParts = children.split(" ");
  const first = textParts[0] || "";
  const second = textParts.slice(1).join(" ") || "";

  const zigzagBtn = classNames("zigzag__btn", className);

  return (
    <Link to={btnLink} className={zigzagBtn} ref={buttonRef}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="151"
        viewBox="0 0 150 151"
        fill="none"
      >
        <path
          ref={shapeRef}
          className="zigzagShape"
          d="M150.008 75.9336C150.008 82.2685 140.829 87.3126 139.284 93.155C137.66 99.2 143.03 108.164 139.967 113.443C136.862 118.812 126.392 118.606 122.035 122.975C117.678 127.344 117.885 137.801 112.503 140.907C107.209 143.973 98.2604 138.592 92.2154 140.208C86.373 141.769 81.325 150.932 74.9901 150.932C68.6552 150.932 63.6111 141.753 57.7687 140.208C51.7237 138.592 42.7755 143.973 37.4811 140.907C32.1114 137.801 32.3179 127.332 27.949 122.975C23.5801 118.618 13.1226 118.824 10.0167 113.443C6.95052 108.148 12.3322 99.2 10.7157 93.155C9.15483 87.3126 -0.00793457 82.2685 -0.00793457 75.9336C-0.00793457 69.5987 9.17071 64.5507 10.7157 58.7083C12.3322 52.6633 6.95449 43.715 10.0167 38.4207C13.1226 33.051 23.592 33.2575 27.949 28.8886C32.306 24.5197 32.0995 14.0622 37.4811 10.9563C42.7755 7.89407 51.7237 13.2718 57.7687 11.6553C63.6111 10.0944 68.6552 0.931641 74.9901 0.931641C81.325 0.931641 86.373 10.1103 92.2154 11.6553C98.2604 13.2718 107.209 7.89407 112.503 10.9563C117.873 14.0622 117.666 24.5316 122.035 28.8886C126.404 33.2456 136.866 33.051 139.967 38.4207C143.03 43.715 137.652 52.6633 139.268 58.7083C140.837 64.5507 150.008 69.5987 150.008 75.9336Z"
          stroke="white"
          strokeWidth="3"
          fill="white"
        />
      </svg>
      <div className="zigzag__btn--text">
        <span>{first}</span>
        <span className="zigzag__btn--icon">
          <i className="flaticon-right-arrow"></i>
        </span>
        <span>{second}</span>
      </div>
    </Link>
  );
};

type ViewBtnProps = {
  btnLink?: string;
  children?: string;
};

export const ViewBtn: React.FC<ViewBtnProps> = ({
  btnLink = "#",
  children = "View All",
}) => {
  return (
    <Link to={btnLink} className="view__btn">
      {children}
    </Link>
  );
};

type PrimaryBtnProps = {
  btnLink?: string;
  children?: string;
};

export const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  btnLink = "/register",
  children = "Register Now",
}) => {
  return (
    <Link to={btnLink} className="primary__btn">
      {children}
    </Link>
  );
};
