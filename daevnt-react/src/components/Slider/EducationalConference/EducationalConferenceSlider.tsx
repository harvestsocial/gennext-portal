import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { ZigzagHoverBtn } from "../../UI/Button";
import { Swiper as SwiperType } from 'swiper';

interface Slide {
  title: string;
  image: string;
  description: string;
  year: string;
}

const slides: Slide[] = [
  {
    title: "Generation Next Conference",
    image: "assets/img/hero/educational-conference.png",
    description:
      "Join leading educators, researchers, and policymakers in a global dialogue on the future of learning.",
    year: "2025",
  },
  {
    title: "KNOWLEDGE EXPO SUMMIT",
    image: "assets/img/hero/educational-conference-two.png",
    description:
      "Join leading educators, researchers, and policymakers in a global dialogue on the future of learning.",
    year: "2025",
  },
  {
    title: "ADVANCED LEARNING EVENT",
    image: "assets/img/hero/educational-conference-three.png",
    description:
      "Join leading educators, researchers, and policymakers in a global dialogue on the future of learning.",
    year: "2025",
  },
];

const EducationalConferenceSlider: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const isFirstInit = useRef<boolean>(true);
   const prevBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swiperInstance) return;

    
    const togglePrevButton = () => {
        if (!prevBtnRef.current || !swiperInstance) return;

        prevBtnRef.current.style.opacity = swiperInstance.isBeginning ? "0" : "1";
        prevBtnRef.current.style.visibility = swiperInstance.isBeginning
          ? "hidden"
          : "visible";
    };
    if (isFirstInit.current) {
      togglePrevButton();
      isFirstInit.current = false;
    }

    swiperInstance.on("slideChange", () => {
      togglePrevButton();
    });
    return () => {
      swiperInstance.off("slideChange");
    };
  }, [swiperInstance]);

  return (
    <section className="tm-slider educational-conference educational-conference__slider">
      <Swiper
        className="swiper-wrapper"
        modules={[Navigation, Autoplay, EffectFade]}
        navigation={{
          nextEl: ".ec__slider__next--btn",
          prevEl: ".ec__slider__prve--btn",
        }}
        autoplay={{ delay: 5000 }}
        effect="fade"
        onSwiper={setSwiperInstance}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="educational-conference__wrapper">
              <img
                src={slide.image}
                className="educational-conference__img"
                alt={slide.title}
              />
              <div className="container container-customizes">
                <div className="educational-conference__content">
                  <div className="text-curve-animation">
                    <div className="educational-conference__stroke">
                      Generation Next
                    </div>
                    <h1 className="educational-conference__title">
                      {slide.title}
                    </h1>
                    <div className="educational-conference__datedesp">
                      <p className="desp">{slide.description}</p>
                      <h5 className="year">{slide.year}</h5>
                    </div>
                  </div>
                  <div className="educational-conference__btn text-curve-animation">
                    <ZigzagHoverBtn btnLink="/register">
                      Register Now
                    </ZigzagHoverBtn>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="ec__slider--controller">
        <div className="ec__slider__prve--btn" ref={prevBtnRef}>
          <h6 className="text">PREV</h6>
        </div>
        <div className="ec__slider__next--btn">
          <h6 className="text">NEXT</h6>
        </div>
      </div>
    </section>
  );
};

export default EducationalConferenceSlider;
