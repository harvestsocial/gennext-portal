import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Parallax } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

import SlideItem from "./SlideItem";

import { createHomeIntroAnimation } from "@hooks/useCreateHomeIntro";

import slideData from "../../../jsonData/heroSliderOne.json";
import contactBarImg from "/assets/img/hero/contact-bar.png";

interface SlideItemRefs {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  speakerNameRef: React.RefObject<HTMLHeadingElement | null>;
  speakerRoleRef: React.RefObject<HTMLParagraphElement | null>;
  dateTimeRef: React.RefObject<HTMLDivElement | null>;
  speakerImgRef: React.RefObject<HTMLImageElement | null>;
}

interface SlideData {
  title: string[];
  image: string;
  speaker: {
    avatar: string;
    name: string;
    role: string;
  };
  date: string;
  time: string;
  location: string;
}

const getParallaxValue = (width: number): number => {
  if (width < 576) return 200;
  if (width < 767) return 400;
  if (width < 992) return 600;
  if (width < 1399) return 800;
  return 1500;
};

const HeroSliderOne: React.FC = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [parallaxValue, setParallaxValue] = useState<number>(1500);

  const isFirstInit = useRef<boolean>(true);
  const prevBtnRef = useRef<HTMLDivElement>(null);
  const slideDataLength = useRef<number>(slideData.length);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const allRefs = useMemo<SlideItemRefs[]>(() => {
    if (slideDataLength.current !== slideData.length) {
      console.warn(
        `SlideData length changed from ${slideDataLength.current} to ${slideData.length}. Recreating refs.`
      );
      slideDataLength.current = slideData.length;
    }

    return slideData.map(() => ({
      titleRef: React.createRef<HTMLHeadingElement>(),
      speakerNameRef: React.createRef<HTMLHeadingElement>(),
      speakerRoleRef: React.createRef<HTMLParagraphElement>(),
      dateTimeRef: React.createRef<HTMLDivElement>(),
      speakerImgRef: React.createRef<HTMLImageElement>(),
    }));
  }, [slideData.length]);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      const newValue = getParallaxValue(window.innerWidth);
      setParallaxValue(newValue);

      if (swiperInstance?.params?.parallax) {
        swiperInstance.update();
      }
    }, 100);
  }, [swiperInstance]);

  useEffect(() => {
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [handleResize]);

  useEffect(() => {
    if (!swiperInstance) return;

    const runSlideAnimation = () => {
      const activeIndex = swiperInstance.realIndex;
      const currentRefs = allRefs[activeIndex];

      if (currentRefs) {
        const { animate } = createHomeIntroAnimation(currentRefs);
        animate();
      }
    };

    const togglePrevButton = () => {
      if (!prevBtnRef.current || !swiperInstance) return;

      prevBtnRef.current.style.opacity = swiperInstance.isBeginning ? "0" : "1";
      prevBtnRef.current.style.visibility = swiperInstance.isBeginning
        ? "hidden"
        : "visible";
    };

    if (isFirstInit.current) {
      togglePrevButton();
      runSlideAnimation();
      isFirstInit.current = false;
    }

    swiperInstance.on("slideChange", togglePrevButton);
    swiperInstance.on("slideChangeTransitionStart", runSlideAnimation);

    return () => {
      swiperInstance.off("slideChange", togglePrevButton);
      swiperInstance.off("slideChangeTransitionStart", runSlideAnimation);
    };
  }, [swiperInstance, allRefs]);

  return (
    <section className="tm-slider creative-conference creative-conference__slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, Parallax]}
        speed={1200}
        slidesPerView={1}
        loop
        parallax
        watchSlidesProgress
        navigation={{
          nextEl: ".cc__slider__next--btn",
          prevEl: ".cc__slider__prve--btn",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        zoom={{ maxRatio: 1.2, minRatio: 1 }}
        onSwiper={setSwiperInstance}
        className="creativeSwiper"
      >
        {slideData.map((slide: SlideData, index: number) => (
          <SwiperSlide key={index}>
            <div
              className="creative-conference__wrapper parallax-item"
              data-swiper-parallax={parallaxValue}
            >
              <SlideItem {...slide} refs={allRefs[index]} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="cc__slider--controller">
        <div className="cc__slider__prve--btn" ref={prevBtnRef}>
          <div className="dotshape" />
          <h6 className="text">PREV</h6>
        </div>
        <div className="cc__slider__next--btn">
          <div className="dotshape" />
          <h6 className="text">NEXT</h6>
        </div>
      </div>

      <div className="cc_contact--bar">
        <img
          src={contactBarImg}
          className="contact-bar-img"
          alt="contact-bar"
        />
        <div className="cc_contact--bar__socialtext left-border">
          <p>Social: FB . IN . TW. DR</p>
        </div>
        <div className="cc_contact--bar__number left-border">
          <a href="tel:+263777612854">+263 777 612 854</a>
        </div>
        <div className="cc_contact--bar__email left-border">
          <a href="mailto:info@gennextmovement.com">info@gennextmovement.com</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSliderOne;
