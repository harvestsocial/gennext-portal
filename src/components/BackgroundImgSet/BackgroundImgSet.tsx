import React from "react";
import classNames from "classnames";

import type { ReactNode ,CSSProperties }  from "react";

interface BackgroundImgSetProps {
  bgUrl?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const BackgroundImgSet: React.FC<BackgroundImgSetProps> = ({
  bgUrl,
  children,
  className,
  style = {},
}) => {
  const sectionStyle: CSSProperties = {
    backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    ...style,
  };

  return (
    <div className={classNames("tm-bg", className)} style={sectionStyle}>
      {children}
    </div>
  );
};

export default BackgroundImgSet;
