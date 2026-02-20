import React from "react";
import BackgroundImgSet from "../BackgroundImgSet/BackgroundImgSet";
import { Link } from "react-router-dom";

interface BreadcrumbLink {
  path?: string;
  label: string;
}

interface BreadcrumbData {
  title: string;
  image?: string;
  links?: BreadcrumbLink[];
}

interface BreadcrumbProps {
  breadcrumbData: BreadcrumbData;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbData, className = "" }) => {
  const { title, image, links = [] } = breadcrumbData;
  return (
    <BackgroundImgSet
      className={`breadcrumb  tm-bg ${className}`}
      bgUrl={image}
    >
      <div className="container">
        <div className="breadcrumb__wapper">
          <div className="breadcrumb__content">
            <h2 className="breadcrumb__title tm-animetion-left">{title}</h2>
            <div className="breadcrumb__backto__home tm-animetion-right">
              {links?.map((link, index) => (
                <React.Fragment key={index}>
                  {link.path ? (
                    <>
                      <Link to={link.path} className="breadcrumb__link">
                        {link.label}
                      </Link>
                      {links?.length - 1 !== index && <span>/</span>}
                    </>
                  ) : (
                    <>
                      <p className="breadcrumb__text">{link.label}</p>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BackgroundImgSet>
  );
};

export default Breadcrumb;
