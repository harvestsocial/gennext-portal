import React, { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import navData from "../../jsonData/nav.json";

interface NavItem {
  title: string;
  path: string;
  submenu?: NavItem[];
}

const MainHeader: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const mobileNavRef = useRef<HTMLUListElement | null>(null);

  return (
    <div className="tm-main_header_in">
      {/* Logo */}
      <div className="tm-main-header-left">
        <a className="tm-site_branding" href="https://www.gennextmovement.com/">
          <img
            src={`${import.meta.env.BASE_URL}assets/img/logos/logo.png`}
            alt="Generation Next"
            style={{ width: "120px", objectFit: "contain" }}
          />
        </a>
      </div>

      {/* Nav */}
      <div className="tm-main-header-center">
        <nav className="tm-nav tm-medium">
          <ul
            className={`tm-nav_list ${isNavOpen ? "tm-show-moblie-nav-list" : ""}`}
            ref={mobileNavRef}
          >
            {navData.map((item: NavItem, index: number) => (
              <MenuItem item={item} key={index} />
            ))}
          </ul>

          <span
            onClick={() => setIsNavOpen(prev => !prev)}
            id="navBar"
            className={`tm-munu_toggle ${isNavOpen ? "tm-toggle_active" : ""}`}
            role="button"
            tabIndex={0}
            aria-label="Toggle navigation"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsNavOpen(prev => !prev);
            }}
          >
            <span></span>
          </span>
        </nav>
      </div>

      {/* Register Now */}
      <div className="tm-main-header-right">
        <a href="https://www.gennextmovement.com/registration" className="primary__btn">
          <span>Register Now</span>
        </a>
      </div>
    </div>
  );
};

export default MainHeader;
