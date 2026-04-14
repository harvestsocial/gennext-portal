import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";

interface GalleryItem {
  src: string;
  link: string;
  alt?: string;
}

const galleryData: GalleryItem[] = [
  {
    src: "/assets/img/gallery/gallery-1.png",
    link: "https://www.instagram.com/",
  },
  {
    src: "/assets/img/gallery/gallery-2.png",
    link: "https://www.instagram.com/",
  },
  {
    src: "/assets/img/gallery/gallery-3.png",
    link: "https://www.instagram.com/",
  },
  {
    src: "/assets/img/gallery/gallery-4.png",
    link: "https://www.instagram.com/",
  },
  {
    src: "/assets/img/gallery/gallery-5.png",
    link: "https://www.instagram.com/",
  },
  {
    src: "/assets/img/gallery/gallery-1.png",
    link: "https://www.instagram.com/",
  },
  {
    src: "/assets/img/gallery/gallery-2.png",
    link: "https://www.instagram.com/",
  },
];

const InstagramGallery: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className={`tm-slider gallery-slider`}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          loop={true}
          autoplay={false}
          modules={[Autoplay]}
          className="gallery style1"
        >
          {galleryData?.map((img, index) => (
            <SwiperSlide
              key={index}
              className="gallery-img-content swiper-slide"
            >
              <a
                href={img.link}
                className="gallery-img-overlay"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="flaticon-instagram"></i>
              </a>
              <img
                src={img.src}
                alt={img.alt || `gallery-${index}`}
                className="gallery-img"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default InstagramGallery;
