
import  { forwardRef } from "react";

interface FunFactItemProps {
  count: number;
  suffix?: string;
  title?: string;
  description: string;
}

const FunFactItem = forwardRef<HTMLSpanElement, FunFactItemProps>(
  ({ count, suffix = "", title, description }, ref) => {
    return (
      <div className="funfact-content__item">
        <h2 className="funfact-content__item--counter">
          <span className="counter" ref={ref}>
            {count}
          </span>
          {suffix}
        </h2>
        {title && <h6 className="funfact-content__item--title">{title}</h6>}
        <p className="funfact-content__item--desp">{description}</p>
      </div>
    );
  }
);

export default FunFactItem;
