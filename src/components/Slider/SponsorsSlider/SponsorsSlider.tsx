import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

interface SponsorData {
  id: number;
  img: string;
  title: string;
}

const sponsorsData: SponsorData[] = [
  {
    id: 1,
    img: "assets/img/icon/brands-icon-1.svg",
    title: "Micro Software",
  },
  {
    id: 2,
    img: "assets/img/icon/brands-icon-2.svg",
    title: "Globe Event Planner",
  },
  {
    id: 3,
    img: "assets/img/icon/brands-icon-3.svg",
    title: "Luxe Diamond",
  },
  {
    id: 4,
    img: "assets/img/icon/brands-icon-4.svg",
    title: "Diamond Prestige",
  },
  {
    id: 5,
    img: "assets/img/icon/brands-icon-1.svg",
    title: "Micro Software",
  },
  {
    id: 6,
    img: "assets/img/icon/brands-icon-2.svg",
    title: "Globe Event Planner",
  },
  {
    id: 7,
    img: "assets/img/icon/brands-icon-3.svg",
    title: "Luxe Diamond",
  },
  {
    id: 8,
    img: "assets/img/icon/brands-icon-4.svg",
    title: "Diamond Prestige",
  },
];

const SponsorsSlider: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div className="oc-brands-sponsor__slider tm-slider">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={1000}
            autoplay={{ delay: 2500 }}
            spaceBetween={24}
            slidesPerView="auto"
            className="swiper-wrapper"
          >
            {sponsorsData.map((item) => (
              <SwiperSlide key={item.id} className="swiper-slide">
                <div className="brands-sponsor__item style2">
                  <img src={item.img} alt={item.title} />
                  <h6 className="brands-sponsor__title">{item.title}</h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SponsorsSlider;
