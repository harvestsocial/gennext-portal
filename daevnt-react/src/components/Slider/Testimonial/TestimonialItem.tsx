import React from "react";

interface TestimonialItemProps {
  name: string;
  title: string;
  message: string;
  starImage: string;
  styleTwo?: boolean;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ 
  name, 
  title, 
  message, 
  starImage, 
  styleTwo 
}) => (
  <div className="testimonal-item">
    <div className="testimonal-item__content">
      <p className="testimonal-item__subtitle">— {name}</p>

      {!styleTwo && (
        <>
          <img src={starImage} className="testimonal-item__star" alt="Rating" />
          <h6 className="testimonal-item__title">{title}</h6>
        </>
      )}

      <p className="testimonal-item__desp">"{message}"</p>
    </div>
  </div>
);

export default TestimonialItem;
