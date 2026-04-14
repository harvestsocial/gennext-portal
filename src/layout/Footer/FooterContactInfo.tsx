
import React from "react";

interface ContactInfo {
  address: string;
  phones: { number: string; href: string }[];
  email: { text: string; href: string };
}

const contactInfo: ContactInfo = {
  address: "Grace Centre, 5XH6+XR9, Harare",
  phones: [
    { number: "+263 777 612 854", href: "tel:+263777612854" },
    { number: "+263 771 982 116", href: "tel:+263771982116" },
    { number: "+263 787 963 720", href: "tel:+263787963720" },
  ],
  email: { text: "info@generationnextmovement.com", href: "mailto:info@generationnextmovement.com" },
};

const FooterContactInfo: React.FC = () => {
  return (
    <address className="footer__list footer__list--services">
      <div className="footer__list--address">
        <h6 className="footer__title sp__btttom-10">Venue:</h6>
        <p className="footer__desp">{contactInfo.address}</p>
      </div>

      <div className="footer__phone">
        <p className="footer__phonetitle">Phone:</p>
        <div className="d-flex flex-column">
          {contactInfo.phones.map((phone, index) => (
            <a key={index} href={phone.href} className="footer__phonenumber">
              {phone.number}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__email">
        <p className="footer__emailtitle">Email:</p>
        <a href={contactInfo.email.href} className="footer__emailtext">
          {contactInfo.email.text}
        </a>
      </div>
    </address>
  );
};

export default FooterContactInfo;
