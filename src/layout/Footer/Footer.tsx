import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-light section-dark">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-12">
            <div className="d-lg-flex align-items-center justify-content-between text-center">
              <div>
                <h3 className="fs-20">Address</h3>
                HHICC, Stand No. 19742<br />
                Selbourne Park,<br />
                Bulawayo, Zimbabwe
              </div>
              <div>
                <img src="/assets/images/gennext/logos/logo.png" className="w-150px" alt="Generation Next" /><br />
                <div className="social-icons mb-sm-30 mt-4">
                  <a href="https://www.facebook.com/gennextoffcial" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="https://www.instagram.com/gennextofficial/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
                  <a href="https://www.youtube.com/@gennextofficial/" target="_blank" rel="noreferrer"><i className="fa-brands fa-youtube"></i></a>
                </div>
              </div>
              <div>
                <h3 className="fs-20">Contact Us</h3>
                0787 963 720<br />
                0771 982 116<br />
                0774 562 455
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              Copyright 2026 - Generation Next. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
