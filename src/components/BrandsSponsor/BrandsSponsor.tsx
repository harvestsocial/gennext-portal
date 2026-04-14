import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";


interface Sponsor {
  id: number;
  imgSrc: string;
  name: string;
}

const sponsors: Sponsor[] = [
  {
    id: 1,
    imgSrc: "assets/img/icon/brands-icon-1.svg",
    name: "Micro Software",
  },
  {
    id: 2,
    imgSrc: "assets/img/icon/brands-icon-2.svg",
    name: "Globe Event Planner",
  },
  {
    id: 3,
    imgSrc: "assets/img/icon/brands-icon-3.svg",
    name: "Luxe Diamond",
  },
  {
    id: 4,
    imgSrc: "assets/img/icon/brands-icon-4.svg",
    name: "Diamond Prestige",
  },
  {
    id: 5,
    imgSrc: "assets/img/icon/brands-icon-5.svg",
    name: "Platinum Elite",
  },
  {
    id: 6,
    imgSrc: "assets/img/icon/brands-icon-6.svg",
    name: "Prestige Platinum",
  },
  {
    id: 7,
    imgSrc: "assets/img/icon/brands-icon-3.svg",
    name: "Luxe Diamond",
  },
  {
    id: 8,
    imgSrc: "assets/img/icon/brands-icon-4.svg",
    name: "Diamond Prestige",
  },
  {
    id: 9,
    imgSrc: "assets/img/icon/brands-icon-5.svg",
    name: "Platinum Elite",
  },
  {
    id: 10,
    imgSrc: "assets/img/icon/brands-icon-6.svg",
    name: "Prestige Platinum",
  },
];

const BrandsSponsor: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80" />
      <section className="brands-sponsor">
        <div className="tm-height-105 tm-height-lg-80" />
        <div className="container">
          <div className="brands-sponsor__title">
            <h6 className="brands-sponsor__title--text">
              BRANDS . DIAMOND SPONSOR . PLATINUM SPONSOR
            </h6>
          </div>
        </div>
        <div className="tm-height-50 tm-height-lg-50" />
        <div className="container-customizes">
          <div className="brands-sponsor__list brands-sponsor__slider tm-slider">
            <Swiper
              spaceBetween={"5%"}
              slidesPerView={"auto"}
              loop={true}
              autoplay={true}
              speed={1000}
            >
              {sponsors.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="brands-sponsor__item">
                    <img src={item.imgSrc} alt={item.name} loading="lazy" />
                    <h6 className="brands-sponsor__title">{item.name}</h6>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="tm-height-110 tm-height-lg-80" />
      </section>
    </>
  );
};

export default BrandsSponsor;
