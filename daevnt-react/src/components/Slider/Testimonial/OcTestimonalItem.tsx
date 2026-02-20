import React from "react";

interface OcTestimonalItemProps {
  title: string;
  message: string;
}

const OcTestimonalItem: React.FC<OcTestimonalItemProps> = ({ title, message }) => {
  return (
    <div className="testimonal-item__style2 h-100">
      <h6 className="testimonal-item__title">— {title}</h6>
      <p className="testimonal-item__desp">"{message}"</p>
    </div>
  );
};

export default OcTestimonalItem;
