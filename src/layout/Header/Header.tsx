import React from "react";

const Header: React.FC = () => {
  return (
    <header className="transparent">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex">
              <div className="de-flex-col">
                <div id="logo">
                  <a href="https://www.gennextmovement.com/">
                    <img className="logo-main" src="/assets/images/gennext/logos/logo.png" alt="Generation Next" />
                    <img className="logo-scroll" src="/assets/images/gennext/logos/logo.png" alt="Generation Next" />
                    <img className="logo-mobile" src="/assets/images/gennext/logos/logo.png" alt="Generation Next" />
                  </a>
                </div>
              </div>

              <div className="de-flex-col">
                <div className="de-flex-col header-col-mid">
                  <ul id="mainmenu">
                    <li><a className="menu-item" href="https://www.gennextmovement.com/">Home</a></li>
                    <li><a className="menu-item" href="https://www.gennextmovement.com/about">About</a></li>
                    <li><a className="menu-item" href="https://www.gennextmovement.com/why-attend">Why Attend</a></li>
                    <li><a className="menu-item" href="https://www.gennextmovement.com/speakers">Speakers</a></li>
                    <li><a className="menu-item" href="https://www.gennextmovement.com/schedule">Program</a></li>
                    <li><a className="menu-item" href="https://www.gennextmovement.com/venue">Venue</a></li>
                    <li><a className="menu-item" href="https://www.gennextmovement.com/faq">FAQ</a></li>
                  </ul>
                </div>
              </div>

              <div className="de-flex-col">
                <a className="btn-main fx-slide" href="https://www.gennextmovement.com/registration"><span>Register Now</span></a>
                <div className="menu_side_area">
                  <span id="menu-btn"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
