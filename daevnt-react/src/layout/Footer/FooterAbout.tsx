import React from "react";

import logo from "/assets/img/icon/logo.svg";

const FooterAbout: React.FC = () => {

  return (
    <div className="footer__left">
      <div className="footer__about">
        <img
          src={logo}
          alt="Company Logo"
          className="footer__logo"
          style={{ width: "171px", height: "36px", objectFit: "contain" }}
          loading="lazy"
        />
        <div className="footer__list footer__list--social">
          <p className="footer__title sp__btttom-10">
            “…turned the heart of fathers unto sons, And the heart of sons unto their fathers…” - Malachi 4:6
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterAbout;
