import React from "react";
import { Link } from "react-router-dom";
import bgImage from "/assets/img/bg/error-page-bg-elements.svg";

interface ErrorPageData {
  heading: string;
  subtitle: string;
  description: string;
}

const errorPageData: ErrorPageData = {
  heading: "404",
  subtitle: "Oops! Page Not Found",
  description:
    "It might have been moved, deleted, or never existed in the first place. It might have been moved, deleted, or never existed in the first place.",
};

const ErrorPages: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <section className="error-page">
        <img
          src={bgImage}
          alt="Error background"
          className="error-page__bg-img"
        />
        <div className="container">
          <div className="error-page__content">
            <h1 className="error-page__heading">{errorPageData.heading}</h1>
            <h3 className="error-page__subtitle">{errorPageData.subtitle}</h3>
            <p className="error-page__desp">{errorPageData.description}</p>
            <div className="home-back-btn">
              <Link to={"/"} className="primary__btn">
                BACK TO HOME
              </Link>
            </div>
          </div>
          <div className="tm-height-150 tm-height-lg-80"></div>
        </div>
      </section>
    </>
  );
};

export default ErrorPages;
