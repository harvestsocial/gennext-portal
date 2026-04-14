import React, { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsapConfig";

import SectionHeading from "../../SectionHeading/SectionHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import OcTestimonalItem from "./OcTestimonalItem";

interface TestimonialData {
  name: string;
  title: string;
  message: string;
  starImage: string;
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

const OcTestimonalSection: React.FC = () => {
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

  return (
    <section ref={testimonialSection}>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <SectionHeading
          title="What the world has to say!"
          nextBtnClass="testimonal-swiper__btn-next"
          prevBtnClass="testimonal-swiper__btn-perv"
          textBlackColor="black"
        />
      </div>

      <div className="testimonal-items">
        <div className="oc-testimonal-items__slider tm-slider">
          <Swiper
            modules={[Navigation]}
            spaceBetween={"2%"}
            slidesPerView="auto"
            speed={800}
            navigation={{
              nextEl: ".testimonal-swiper__btn-next",
              prevEl: ".testimonal-swiper__btn-perv",
            }}
            loop={true}
            onSwiper={setSwiperInstance}
          >
            {testimonialData?.map((item, index) => (
              <SwiperSlide key={index}>
                <OcTestimonalItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="tm-height-150 tm-height-lg-80" />
    </section>
  );
};

export default OcTestimonalSection;
