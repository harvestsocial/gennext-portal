import React from "react";
import { Link } from "react-router-dom";
import { ZigzagHoverBtn } from "../UI/Button";

interface ServiceData {
  id: number;
  title: string;
  description: string;
}

const servicesData: ServiceData[] = [
  {
    id: 1,
    title: "Award Ceremonies",
    description:
      "Celebrate outstanding achievements with award ceremonies designed to honor success and inspire future excellence.",
  },
  {
    id: 2,
    title: "Generation Next Sessions",
    description:
      "Host impactful corporate events with smooth planning, professional execution, and flawless guest experiences every time.",
  },
  {
    id: 3,
    title: "Workshops & Training",
    description:
      "Participate in expert-led workshops focused on developing professional skills and hands-on learning through practical training.",
  },
  {
    id: 4,
    title: "Product Launches",
    description:
      "Introduce new products to the market with strategic, engaging launch events designed to captivate target audiences.",
  },
  {
    id: 5,
    title: "Hybrid & Virtual",
    description:
      "Create immersive virtual and hybrid event experiences with seamless integration of technology, interaction, and storytelling.",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div className="services__items">
          {servicesData?.map((item) => (
            <Link
              to={`/services-details/${item.id}`}
              className="services-item"
              key={item.id}
            >
              <div className="services-item__top">
                <h5 className="services-item__title">{item.title}</h5>
              </div>
              <div className="services-item__body">
                <p className="services-item__desp">{item.description}</p>
              </div>
              <div className="services-item__bottom">
                <div className="services-item__border">
                  <div className="border-one"></div>
                </div>
                <div className="services-item__arrow-icon">
                  <i className="flaticon-up-right-arrow"></i>
                </div>
              </div>
            </Link>
          ))}

          {/* Contact Button */}
          <div className="services-item">
            <ZigzagHoverBtn btnLink="/contact-us">Contact Us</ZigzagHoverBtn>
          </div>
        </div>
      </div>{" "}
      <div className="tm-height-150 tm-height-lg-80"></div>
    </>
  );
};

export default ServicesSection;
