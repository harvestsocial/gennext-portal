import React from "react";
import { Link } from "react-router-dom";

interface UsefulLink {
  id: number;
  path: string;
  label: string;
}

const usefulLinks: UsefulLink[] = [
  { id: 2, path: "/events", label: "Future Events" },
  { id: 3, path: "/speaker", label: "Main Speakers" },
  { id: 4, path: "/faq", label: "FAQs" },
  { id: 5, path: "/register", label: "Register Now" },
];

const FooterUsefulLinks: React.FC = () => {
  return (
    <nav
      className="footer__list footer__list--useful"
      aria-label="Useful Links"
    >
      <h6 className="footer__title">Useful Link</h6>
      <ul className="footer__links">
        {usefulLinks.map(({ id, path, label }) => (
          <li key={id}>
            <Link to={path} className="footer__link">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterUsefulLinks;
