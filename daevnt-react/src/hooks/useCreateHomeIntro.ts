import React from "react";
import { SplitText ,gsap} from "@/lib/gsapConfig";

interface SlideItemRefs {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  speakerNameRef: React.RefObject<HTMLHeadingElement | null>;
  speakerRoleRef: React.RefObject<HTMLParagraphElement | null>;
  dateTimeRef: React.RefObject<HTMLDivElement | null>;
  speakerImgRef: React.RefObject<HTMLImageElement | null>;
}

export function createHomeIntroAnimation(refs: SlideItemRefs) {
  const { titleRef, speakerNameRef, speakerRoleRef, dateTimeRef, speakerImgRef } =
    refs;

  const animate = () => {
    if (!titleRef.current) return;

    const highlightWords = titleRef.current.querySelectorAll(
      ".home-intro__highlight-word"
    );

    const splitTexts = [...highlightWords].map(
      (word) => new SplitText(word as HTMLElement, { type: "chars" })
    );

    const staggerWord = (chars: HTMLElement[]) => {
      return gsap.to(chars, {
        color: "#0E2CA6",
        ease: "power3.inOut",
        duration: 0.7,
        stagger: {
          each: 0.05,
          repeat: 1,
          yoyo: true,
        },
      });
    };

    const charsArray = splitTexts.flatMap((s) => s.chars as HTMLElement[]);

    const tl = gsap.timeline();

    tl.add(staggerWord(charsArray), 0);

    tl.from(
      charsArray,
      {
        rotateX: 50,
        opacity: 0,
        x: 20,
        duration: 0.85,
        stagger: 0.075,
        ease: "power3.inOut",
      },
      0
    );

    if (speakerImgRef.current) {
      tl.from(
        speakerImgRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        0.5
      );
    }

    tl.from(
      [speakerNameRef.current, speakerRoleRef.current, dateTimeRef.current],
      {
        y: 10,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power1.inOut",
      },
      0
    );
  };

  const createTimelines = () => {
    const blockRefs = [
      titleRef.current,
      speakerNameRef.current,
      speakerRoleRef.current,
      dateTimeRef.current,
      speakerImgRef.current,
    ].filter(Boolean);

    gsap.set(blockRefs, { autoAlpha: 1 });

    const mm = gsap.matchMedia();
    mm.add(
      ["(prefers-reduced-motion: no-preference)", "(min-width: 1240px)"],
      () => {
        animate();
      }
    );
  };

  return { animate, createTimelines };
}
