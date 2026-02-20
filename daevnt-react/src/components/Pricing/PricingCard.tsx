import React, { useRef, useEffect, useCallback } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";

interface Plan {
  title: string;
  price: string;
  visitors: string[];
  features: string[];
}

interface PricingCardProps {
  plan: Plan;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
  style3?: string;
  className?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  index,
  hoveredIndex,
  setHoveredIndex,
  style3,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = useCallback(() => {
    setHoveredIndex(index);
  }, [index, setHoveredIndex]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, [setHoveredIndex]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (card) {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  const isActive =
    hoveredIndex === index || (hoveredIndex === null && index === 1);

  const packageClass = classNames(
    {
      "package-one": index === 0,
      "package-two": index === 1,
      "package-three": index === 2,
    },
    "style2",
    className,
    style3,
    "hover-active-class",
    { active: isActive }
  );

  return (
    <AnimateOnScroll className="fade-up" delay={index * 0.1}>
      <div className={packageClass} ref={cardRef}>
        <div className="package-head-info">
          <p className="title">{plan.title}</p>
          <h5 className="price">{plan.price}</h5>

          <select
            name="visitor"
            className="visitor-select"
            defaultValue=""
            aria-label={`Select visitor count for ${plan.title} plan`}
          >
            <option value="" disabled>
              Select visitors
            </option>
            {plan.visitors.map((visitor, idx) => (
              <option key={`visitor-${index}-${idx}`} value={visitor}>
                {visitor}
              </option>
            ))}
          </select>
        </div>

        <div className="border-horizontal"></div>

        <ul className="package-list">
          {plan.features.map((feature, idx) => (
            <li key={`feature-${index}-${idx}`}>
              <i className="flaticon-check-mark" aria-hidden="true"></i>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/register"
          className="primary__btn type-2"
          aria-label={`Register now for ${plan.title} plan`}
        >
          <span>Register Now</span>
        </Link>
      </div>
    </AnimateOnScroll>
  );
};

export default PricingCard;
