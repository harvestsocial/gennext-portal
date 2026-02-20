import React, { useRef, useState } from "react";
import { useGSAP, gsap } from "@/lib/gsapConfig";
import TestimonialItem from "./TestimonialItem";
import SectionHeading from "../../SectionHeading/SectionHeading";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import classNames from "classnames";

interface TestimonialData {
  name: string;
  title: string;
  message: string;
  starImage: string;
}

interface TestimonialSectionProps {
  styleTwo?: boolean;
}

const testimonialData: TestimonialData[] = [
  {
    name: "James R., Startup Founder",
    title: "Unmatched Energy & Innovation!",
    message:
      "From interactive workshops to thought-provoking keynotes, this conference redefined how I see the future of my industry. I left feeling empowered and ready to take on new challenges!",
    starImage: "assets/img/testimonal/star.png",
  },
  {
    name: "Sophia L., UX Designer",
    title: "A Game-Changer for My Career!",
    message:
      "Attending this event was the best decision I made this year! The speakers were truly inspiring, and I made incredible connections that have opened new opportunities for me.",
    starImage: "assets/img/testimonal/star.png",
  },
  {
    name: "Emily T., Marketing Strategist",
    title: "Networking Like Never Before!",
    message:
      "I met some of the most brilliant minds in the industry, exchanged ideas, and even secured a collaboration with a global brand! If you're serious about growth, this event is a must-attend.",
    starImage: "assets/img/testimonal/star.png",
  },
  {
    name: "David M., Product Manager",
    title: "Beyond Expectations!",
    message:
      "I've been to many conferences, but this one stood out with its creativity, organization, and energy. Every session was insightful, and the after-event networking was top-notch!",
    starImage: "assets/img/testimonal/star.png",
  },
  {
    name: "James R., Startup Founder",
    title: "Unmatched Energy & Innovation!",
    message:
      "From interactive workshops to thought-provoking keynotes, this conference redefined how I see the future of my industry. I left feeling empowered and ready to take on new challenges!",
    starImage: "assets/img/testimonal/star.png",
  },
  {
    name: "Sophia L., UX Designer",
    title: "A Game-Changer for My Career!",
    message:
      "Attending this event was the best decision I made this year! The speakers were truly inspiring, and I made incredible connections that have opened new opportunities for me.",
    starImage: "assets/img/testimonal/star.png",
  },
  {
    name: "Emily T., Marketing Strategist",
    title: "Networking Like Never Before!",
    message:
      "I met some of the most brilliant minds in the industry, exchanged ideas, and even secured a collaboration with a global brand! If you're serious about growth, this event is a must-attend.",
    starImage: "assets/img/testimonal/star.png",
  },
  {
    name: "David M., Product Manager",
    title: "Beyond Expectations!",
    message:
      "I've been to many conferences, but this one stood out with its creativity, organization, and energy. Every session was insightful, and the after-event networking was top-notch!",
    starImage: "assets/img/testimonal/star.png",
  },
];

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  styleTwo,
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const testimonialSection = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!swiperInstance) return;

      const items = gsap.utils.toArray(
        `.testimonal-items__slider .swiper-slide`
      );
      items.forEach((item, i) => {
        gsap.from(item as HTMLElement, {
          opacity: 0,
          y: 60,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: "top 90%",
          },
          delay: (i % 6) * 0.1,
        });
      });
    },
    {
      scope: testimonialSection,
      dependencies: [swiperInstance],
      revertOnUpdate: true,
    }
  );

  const testimonalWrapperClass = classNames("testimonal-items__wrapper", {
    style2: styleTwo === true,
  });

  return (
    <section ref={testimonialSection}>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <SectionHeading
          title="What the world has to say!"
          nextBtnClass="testimonal-swiper__btn-next"
          prevBtnClass="testimonal-swiper__btn-perv"
        />
      </div>

      <div className="testimonal-items testimonal-items__slider">
        <Swiper
          modules={[Navigation]}
          spaceBetween={"0"}
          slidesPerView="auto"
          speed={800}
          navigation={{
            nextEl: ".testimonal-swiper__btn-next",
            prevEl: ".testimonal-swiper__btn-perv",
          }}
          loop={true}
          className={testimonalWrapperClass}
          onSwiper={setSwiperInstance}
        >
          {testimonialData?.map((item, index) => (
            <SwiperSlide key={index}>
              <TestimonialItem {...item} styleTwo={styleTwo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
