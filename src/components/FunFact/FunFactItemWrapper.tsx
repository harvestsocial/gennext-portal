import React, { useRef } from "react";
import FunFactItem from "./FunFactItem";

import { gsap, useGSAP } from "@/lib/gsapConfig";

interface FunFact {
  id: number;
  count: number;
  suffix?: string;
  title?: string;
  description: string;
}

interface FunFactItemWrapperProps {
  funFacts: FunFact[];
}

const FunFactItemWrapper: React.FC<FunFactItemWrapperProps> = ({
  funFacts,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<HTMLSpanElement[]>([]);

  const addToCounterRefs = (el: HTMLSpanElement | null) => {
    if (el && !counterRefs.current.includes(el)) {
      counterRefs.current.push(el);
    }
  };
  useGSAP(
    (context) => {
      counterRefs.current.forEach((num) => {
        context.add(() =>
          gsap.fromTo(
            num,
            { textContent: 0 },
            {
              scrollTrigger: {
                trigger: num,
                start: "top 90%",
              },
              textContent: parseInt(num.textContent || "0"),
              duration: 3,
              snap: { textContent: 1 },
              ease: "power3.out",
              onUpdate: function () {
                num.textContent = Math.floor(
                  (this.targets()[0] as HTMLSpanElement)
                    .textContent as unknown as number
                ).toString();
              },
            }
          )
        );
      });

      context.add(() =>
        gsap.from(wrapperRef.current?.children || [], {
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 90%",
          },
          y: 70,
          opacity: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: "power2.out",
        })
      );
    },
    { scope: wrapperRef }
  );

  return (
    <div className="funfact-content__wapper" ref={wrapperRef}>
      {funFacts?.map((item) => (
        <FunFactItem
          key={item.id}
          {...item}
          ref={(el: HTMLSpanElement | null) => addToCounterRefs(el)}
        />
      ))}
    </div>
  );
};

export default FunFactItemWrapper;
