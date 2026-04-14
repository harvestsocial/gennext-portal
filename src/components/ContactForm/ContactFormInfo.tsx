import React from "react";
import ContactForm from "./ContactForm";

interface ContactInfo {
  title: string;
  description: string;
  phones: string[];
  email: string;
  address: string;
  recruiting: {
    message: string;
    email: string;
  };
}

const ContactFormInfo: React.FC = () => {
  const contactInfo: ContactInfo = {
    title: "Connect with Generation Next",
    description: "Reach out for registration support and event information.",
    phones: ["+263 777 612 854", "+263 771 982 116"],
    email: "info@generationnextmovement.com",
    address: "Grace Centre, 5XH6+XR9, Harare",
    recruiting: {
      message: "For partnership and volunteer enquiries:",
      email: "info@generationnextmovement.com",
    },
  };

  return (
    <>
      <div className="tm-height-50 tm-height-lg-0"></div>
      <div className="container">
        <div className="contact-form-content style2">
          <div className="contact-form-info__wapper">
            {/* Contact Links */}
            <div className="contact-form-info__link">
              {contactInfo.phones.map((phone, index) => (
                <div className="contact-form-info__phn" key={index}>
                  <a href={`tel:${phone}`}>{phone}</a>
                </div>
              ))}

              <div className="contact-form-info__email">
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>

              <p className="contact-form-info__desp w-75">
                {contactInfo.address}
              </p>
            </div>

            {/* Recruiting Section */}
            <div className="contact-form-info__recruiting">
              <p className="contact-form-info__recruiting-desp">
                {contactInfo.recruiting.message}
              </p>
              <div className="contact-form-info__recruiting-emial">
                <a href={`mailto:${contactInfo.recruiting.email}`}>
                  {contactInfo.recruiting.email}
                </a>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <div>
              <h3 className="contact-title">{contactInfo.title}</h3>
              <p className="contact-desp">{contactInfo.description}</p>
              <div className="tm-height-50 tm-height-lg-30"></div>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactFormInfo;
