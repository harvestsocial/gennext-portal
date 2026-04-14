import React from "react";

const FeatureSection: React.FC = () => {
  return (
    <section className="event-bebefits-area pt-130 rpt-100 pb-85 rpb-55 rel z-1">
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-xl-8 col-lg-9 text-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-offset="50"
          >
            <div className="section-title mb-65">
              <h2 className="title">Reasons to Attend</h2>
              <p>Join us for impactful gatherings, powerful teachings, and divine connections.</p>
            </div>
          </div>
        </div>
        <div className="row gap-40 justify-content-center">
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div
              className="feature-item-three style-two"
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-offset="50"
            >
              <div className="icon">
                <i className="fal fa-user-md-chat"></i>
              </div>
              <div className="content">
                <h5 className="title">Anointed Teaching Sessions</h5>
                <p>
                  Receive sound biblical teaching from trusted ministers focused on doctrine,
                  leadership, and spiritual maturity.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div
              className="feature-item-three style-two"
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-offset="50"
              data-aos-delay="50"
            >
              <div className="icon">
                <i className="fal fa-globe"></i>
              </div>
              <div className="content">
                <h5 className="title">Prophetic Prayer Encounters</h5>
                <p>
                  Experience focused moments of prayer, impartation, and prophetic ministry for
                  personal and ministry activation.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div
              className="feature-item-three style-two"
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-offset="50"
              data-aos-delay="100"
            >
              <div className="icon">
                <i className="fal fa-fill-drip"></i>
              </div>
              <div className="content">
                <h5 className="title">Leadership Development</h5>
                <p>
                  Gain practical leadership tools for church growth, team building, discipleship, and
                  long-term ministry health.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-sm-6">
            <div
              className="feature-item-three style-two"
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-offset="50"
              data-aos-delay="150"
            >
              <div className="icon">
                <i className="fal fa-calendar-alt"></i>
              </div>
              <div className="content">
                <h5 className="title">Kingdom Fellowship</h5>
                <p>
                  Build lasting relationships with pastors, ministry leaders, and believers committed
                  to advancing God's purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
