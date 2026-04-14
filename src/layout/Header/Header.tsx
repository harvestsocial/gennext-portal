import React, { useRef } from "react";
import classNames from "classnames";

import useStickyHeader from "@hooks/useStickyHeader";
import MainHeader from "./MainHeader";

interface HeaderProps {
  style?: string;
}

const Header: React.FC<HeaderProps> = ({ style = "default" }) => {
  const headerRef = useRef<HTMLElement>(null) as React.RefObject<HTMLElement>;

  const { isSticky, isHeaderVisible } = useStickyHeader(headerRef);

  const navClass = classNames(
    "tm-sticky_header",
    "tm-style1",
    "tm-site_header",
    "style-2",
    {
      "tm-gescout_sticky": isSticky,
      "tm-gescout_show": isHeaderVisible === isSticky,
      "type-2 tm-style3": style === "type-2",
      "type-2": style !== "type-3",
    }
  );

  const containerClass = classNames("container", {
    "container-customizes": style !== "type-2",
  });

  return (
    <>
      <header className={navClass} ref={headerRef}>
        <div className="tm-main_header">
          <div className={containerClass}>
            <MainHeader />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
