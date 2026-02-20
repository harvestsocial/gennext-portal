import FooterSocialLinks from "./FooterSocialLinks";

const FooterCopyright: React.FC = () => {
  return (
    <div className="footer__copyright">
      <div className="container">
        <div className="footer__copyright__inner">
          <p className="footer__copytext">
            © 2026{" "}
            <a
              href="https://www.instagram.com/weareabound"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__copylink"
            >
              Generation Next
            </a>
            . All Rights Reserved.
          </p>

          <FooterSocialLinks />
        </div>
      </div>
    </div>
  );
};

export default FooterCopyright;
