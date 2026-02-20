import React, { useState } from "react";

interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

const accordionData: AccordionItem[] = [
  {
    id: 1,
    title: "1. How can I register for an event?",
    content:
      "You can register online by visiting our event page, selecting your preferred event, and completing the registration form. You'll receive a confirmation email with event details after successful registration.",
  },
  {
    id: 2,
    title: "2. Are tickets refundable if I can't attend?",
    content:
      "Refunds are subject to our cancellation policy. Please review our terms on the ticketing page for more details.",
  },
  {
    id: 3,
    title: "3. Will there be networking opportunities?",
    content:
      "Yes! Our events include dedicated networking sessions and virtual lounges to connect with peers and professionals.",
  },
  {
    id: 4,
    title: "4. Do you offer virtual or hybrid event options?",
    content:
      "Absolutely. We offer both in-person and virtual options to accommodate all attendees.",
  },
  {
    id: 5,
    title: "5. Is there a dress code for the events?",
    content:
      "Business casual is recommended unless otherwise specified for themed events.",
  },
];

const AccordionSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number | string>(1);

  const toggleAccordion = (id: number) => {
    setActiveId((prevId) => (prevId === id ? "" : id));
  };

  return (
    <>
      <div className="tm-height-150 tm-height-lg-80" />
      <div className="container-fluid">
        <div className="accordion-benifits">
          <div className="accordion-benifits__content">
            <div className="accordion-benifits__img fade-up">
              <img
                src="assets/img/bg/accordion-benifits-img.png"
                alt="accordion visual"
              />
            </div>

            <div
              className="accordion custom-accordion fade-up"
              id="accordionExample"
            >
              {accordionData.map(({ id, title, content }) => (
                <div className="accordion-item" key={id}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        activeId === id ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleAccordion(id)}
                      aria-expanded={activeId === id}
                      aria-controls={`collapse${id}`}
                    >
                      {title}
                    </button>
                  </h2>
                  <div
                    id={`collapse${id}`}
                    className={`accordion-collapse collapse ${
                      activeId === id ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">{content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccordionSection;
