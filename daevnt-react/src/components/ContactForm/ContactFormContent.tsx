import React from "react";
import MapEmbed from "@/components/UI/MapEmbed";
import AnimateOnScroll from "../AnimateOnScroll/AnimateOnScroll";
import ContactForm from "./ContactForm";

interface ContactHeader {
  title: string;
  description: string;
}

const ContactFormContent: React.FC = () => {
  const contactHeader: ContactHeader = {
    title: "Register for Generation Next",
    description: "Secure your spot today for this transformative event.",
  };

  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container-fluid px-md-0">
        <div className="contact-form-content">
          <div className="contact-form-img image-hov-one">
            <MapEmbed />
          </div>
          <AnimateOnScroll className="fade-up" delay={0.3}>
            <div className="contact-form">
              <div>
                <h3 className="contact-title">{contactHeader.title}</h3>
                <p className="contact-desp">{contactHeader.description}</p>
                <div className="tm-height-50 tm-height-lg-30"></div>
              </div>
              <ContactForm />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </>
  );
};

export default ContactFormContent;
