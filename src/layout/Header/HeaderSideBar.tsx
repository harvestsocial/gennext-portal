
import React from "react";
import { Offcanvas } from "react-bootstrap";

interface HeaderSideBarProps {
  show: boolean;
  onHide: () => void;
}

const HeaderSideBar: React.FC<HeaderSideBarProps> = ({ show, onHide }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="style-1">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>CLOSE</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="offcanvas-body__coustom-style">
          <div className="offcanvas-body__content">
            <div className="offcanvas-body__info">
              <a href="+263777612854" className="offcanvas-body__phone">
                +263-777-612-854
              </a>
              <a href="tel:+263771982116" className="offcanvas-body__phone">
                +263-771-982-116
              </a>
              <a href="mailto:info@gennextmovement.com" className="offcanvas-body__email">
                info@gennextmovement.com
              </a>
              <p className="offcanvas-body__desp">
                Harvest House Int'l Church, Selbourne Park, Bulawayo
              </p>
            </div>

            <div className="offcanvas-body__email-social">
              {/* Social Links */}
              <div className="offcanvas-body__social social">
                <ul className="social__items">
                  <li className="social__item">
                    <a href="https://www.facebook.com/gennextoffical" className="social__link">
                      <i className="flaticon-facebook"></i>
                    </a>
                  </li>

                  <li className="social__item">
                    <a href="https://www.instagram.com/gennextofficial" className="social__link">
                      <i className="flaticon-instagram"></i>
                    </a>
                  </li>
                                    <li className="social__item">
                    <a href="https://x.com/?lang=en" className="social__link">
                      <i className="flaticon-twitter"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default HeaderSideBar;
