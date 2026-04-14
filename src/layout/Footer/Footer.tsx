import React from "react";
import FooterAbout from "./FooterAbout";
import FooterUsefulLinks from "./FooterUsefulLinks";
import FooterContactInfo from "./FooterContactInfo";
import FooterCopyright from "./FooterCopyright";
import MapEmbed from "@/components/UI/MapEmbed";

import footerBgIcon from "/assets/img/icon/footer-bg-icon.svg";
import footerBg from "/assets/img/bg/footer-bg.png";

const Footer: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="contact-form-map">
        <MapEmbed />
      </div>

      <footer className="footer ">
        <img
          src={footerBg}
          className="footer__bg tm-bg"
          alt="Footer Background"
        />
        <img
          className="footer__bg--icon"
          src={footerBgIcon}
          alt="Background Icon"
          loading="lazy"
        />
        <div className="tm-height-125 tm-height-lg-80" />
        <div className="footer__container container">
          <div className="footer__main">
            <FooterAbout />
            <div className="footer__right">
              <FooterUsefulLinks />
              <FooterContactInfo />
            </div>
          </div>
        </div>
        <div className="tm-height-125 tm-height-lg-60 tm-height-lg--33" />
        <FooterCopyright />
      </footer>
    </>
  );
};
export default Footer;
