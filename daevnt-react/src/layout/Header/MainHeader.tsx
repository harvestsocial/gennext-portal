
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";
import navData from "../../jsonData/nav.json";
import logo from "/assets/img/icon/logo.svg";
import HeaderSideBar from "./HeaderSideBar";

interface NavItem {
  title: string;
  path: string;
  submenu?: NavItem[];
}

const MainHeader: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const mobileNavRef = useRef<HTMLUListElement | null>(null);
  const location = useLocation();

  const showRegisterOnPublicPages = ["/", "/about-us", "/events", "/speaker", "/faq", "/contact-us"].includes(
    location.pathname
  );

  return (
    <div className="tm-main_header_in">
      {/* Left Section */}
      <div className="tm-main-header-left">
        <Link className="tm-site_branding" to="/">
          <img src={logo} alt="Logo" style={{ width: "171px", height: "36px", objectFit: "contain" }} />
        </Link>
      </div>

      {/* Center Navigation */}
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

          {/* Mobile Toggle */}
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

      {/* Right Section */}
      <div className="tm-main-header-right">
        <div className="d-flex align-items-center gap-3">
          <div
            className="offcanvaopen-btn cursor-pointer button-offcanva style-2"
            onClick={() => setShowSidebar(true)}
          >
            <img
              src="/assets/img/icon/flaticon-dots-menu.svg"
              alt="Menu Icon"
            />
          </div>

          {showRegisterOnPublicPages ? (
            <Link to="/register" className="primary__btn">
              <span>REGISTER</span>
            </Link>
          ) : (
            <Link to="/staff/login" className="primary__btn">
              <span>Staff Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar Component */}
      <HeaderSideBar show={showSidebar} onHide={() => setShowSidebar(false)} />
    </div>
  );
};

export default MainHeader;
