import React from "react";

import faqData from "../../jsonData/faqData.json";

interface FaqSectionInfo {
  title: string;
  subtitle: string;
}

const faqSectionInfo: FaqSectionInfo = {
  title: "FAQs",
  subtitle:
    "Join leading educators, researchers, and policymakers in a global dialogue on the future of learning.",
};

const FAQsContent: React.FC = () => {
  const firstOpenItem = faqData.find((faq: any) => faq.defaultOpen);
  const [activeId, setActiveId] = React.useState<string>(
    firstOpenItem?.collapseId || faqData[0]?.collapseId || ""
  );

  const toggleAccordion = (id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  };

  return (
    <section className="faq-section-wrapper">
      <div className="tm-height-150 tm-height-lg-80"></div>
      <div className="container">
        <div className="row justify-content-between gy-5" id="containerAround">
          {/* Left Section */}
          <div className="col-lg-3 col-md-6">
            <div id="infoProduto">
              <div className="faq-section">
                <h2 className="faq-section__title">{faqSectionInfo.title}</h2>
                <p className="faq-section__subtitle">
                  {faqSectionInfo.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-lg-7 col-md-12">
            <div id="scrollGaleria">
              <div
                className="accordion custom-accordion style2"
                id="accordionExample"
              >
                {faqData.map((faq: any) => (
                  <div className="accordion-item" key={faq.id}>
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          activeId !== faq.collapseId ? "collapsed" : ""
                        }`}
                        type="button"
                        onClick={() => toggleAccordion(faq.collapseId)}
                        aria-expanded={activeId === faq.collapseId ? "true" : "false"}
                        aria-controls={faq.collapseId}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={faq.collapseId}
                      className={`accordion-collapse collapse ${
                        activeId === faq.collapseId ? "show" : ""
                      }`}
                    >
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsContent;
