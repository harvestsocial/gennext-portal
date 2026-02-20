import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";
import classNames from "classnames";

const slidesData: string[] = [
  "Generation Next 2026",
  "Generation Next 2026",
  "Generation Next 2026",
  "Generation Next 2026",
  "Generation Next 2026",
  "Generation Next 2026",
];

interface TextScrollSliderProps {
  styleTwo?: string;
}

const TextScrollSlider: React.FC<TextScrollSliderProps> = ({ styleTwo }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      gsap.to(container, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef }
  );

  const movingSectioWrapClassName = classNames("moving-section__wrap", {
    "tm-primary-bg": styleTwo === "style2",
  });

  const movingSectionInClassName = classNames(
    "moving-section__in moving-section-in",
    {
      style2: styleTwo === "style2",
    }
  );

  const highlightTextClassName = classNames({
    "highlight-text-style2": styleTwo === "style2",
    "highlight-text": styleTwo !== "style2",
  });

  return (
    <>
      {styleTwo !== "style2" && (
        <div className="tm-height-150 tm-height-lg-80" />
      )}
      <div
        className={movingSectioWrapClassName}
        aria-label="Infinite scroll text"
      >
        <div className={movingSectionInClassName} ref={containerRef}>
          {slidesData.map((slide, i) => (
            <div className="moving-section" key={i}>
              <h2 className="moving-section__title">
                {slide.split(" ").map((word, idx) => {
                  if (idx === 1 || idx === 2) {
                    return (
                      <span
                        key={idx}
                        className={classNames(highlightTextClassName, {
                          "no-dot": idx === 1,
                        })}
                      >
                        {word}{" "}
                      </span>
                    );
                  }
                  return word + " ";
                })}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TextScrollSlider;
