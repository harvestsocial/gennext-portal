import React, { useRef } from "react";
import type { ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip-left"
  | "flip-right"
  | "slide-up";

interface AnimateOnScrollProps {
  children: ReactNode;
  animationType?: AnimationType;
  delay?: string | number;
  duration?: string | number;
  ease?: string;
  className?: string;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animationType = "fade-up",
  delay = 0,
  duration = 0.75,
  ease = "power2.out",
  className = "",
}) => {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!el.current) return;

      let fromVars: Record<string, any> = {};
      switch (animationType) {
        case "fade-up":
          fromVars = { y: 70, opacity: 0 };
          break;
        case "fade-down":
          fromVars = { y: -70, opacity: 0 };
          break;
        case "fade-left":
          fromVars = { x: -70, opacity: 0 };
          break;
        case "fade-right":
          fromVars = { x: 70, opacity: 0 };
          break;
        case "zoom-in":
          fromVars = { scale: 0.8, opacity: 0 };
          break;
        case "zoom-out":
          fromVars = { scale: 1.2, opacity: 0 };
          break;
        case "flip-left":
          fromVars = {
            rotateY: -90,
            transformOrigin: "left center",
            opacity: 0,
          };
          break;
        case "flip-right":
          fromVars = {
            rotateY: 90,
            transformOrigin: "right center",
            opacity: 0,
          };
          break;
        case "slide-up":
          fromVars = { y: 100, opacity: 0 };
          break;
        default:
          fromVars = { opacity: 0 };
      }

      const ctx = gsap.context(() => {
        gsap.from(el.current, {
          scrollTrigger: {
            trigger: el.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          ...fromVars,
          delay,
          duration,
          ease,
        });
      }, el);

      return () => ctx.revert();
    },
    { scope: el, dependencies: [animationType, delay, duration, ease] }
  );

  return (
    <div className={className} ref={el}>
      {children}
    </div>
  );
};

export default AnimateOnScroll;
