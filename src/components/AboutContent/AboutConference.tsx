import React from "react";


interface AboutImageBottom {
  src: string;
  className: string;
  alt: string;
}

interface AboutImages {
  top: string;
  subtitle: string;
  title: string;
  desp: string;
  bottom: AboutImageBottom[];
}

interface Feature {
  id: number;
  title: string;
  desc: string;
}

const aboutImages: AboutImages = {
  top: "assets/img/about/about_1.png",
  subtitle: "About the Conference",
  title: "Where Innovation Meets Virtual Experiences",
  desp: "Join us as we redefine conference for the 21st century!",
  bottom: [
    {
      src: "assets/img/about/about_2.png",
      className: "about__2-img",
      alt: "About Bottom Image 1",
    },
    {
      src: "assets/img/about/about_3.png",
      className: "about__3-img",
      alt: "About Bottom Image 2",
    },
  ],
};


const features: Feature[] = [
  {
    id: 1,
    title: "Expert keynote speakers",
    desc: "Hear from thought leaders and industry pioneers as they share their expertise, trends, and strategies to keep you ahead of the curve.",
  },
  {
    id: 2,
    title: "Education Programs",
    desc: "Engage in interactive sessions, workshops, and masterclasses designed to expand your skills and knowledge in your field.",
  },
  {
    id: 3,
    title: "Notes & Highlights",
    desc: "Stay informed with key takeaways, session summaries, and exclusive insights to ensure you never miss a moment of valuable content.",
  },
];

const AboutConference: React.FC = () => {
  return (
    <>
      <div className="tm-height-150 tm-height-lg-80"></div>
      <section className="container">
        <div className="about-conference">
          {/* Left Side */}
          <div className="about-conference__left fade-up">
            <div className="about-conference__left-top-img">
              <img src={aboutImages.top} alt="About Conference Top" />
            </div>
            <div className="about-conference__left-bottom-img">
              {aboutImages.bottom.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  className={img.className}
                  alt={img.alt}
                />
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="about-conference__right fade-up">
            {/* Header */}
            <div className="about-conference__header">
              <div className="about-conference__header-content">
                <p className="about-conference__header-subtitle">
                  {aboutImages.subtitle}
                </p>
                <h3 className="about-conference__header-title">
                  {aboutImages.title}
                </h3>
              </div>
            </div>

            {/* Features Loop */}
            <div className="about-conference__features">
              {features.map((feature) => (
                <div className="about-conference__feature" key={feature.id}>
                  <div className="about-conference__feature-image">
                    <i className="flaticon-check-mark"></i>
                  </div>
                  <div className="about-conference__feature-content">
                    <h6 className="about-conference__feature-title">
                      {feature.title}
                    </h6>
                    <p className="about-conference__feature-desc">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="about-conference__cta">
              <h6 className="about-conference__cta-text">{aboutImages.desp}</h6>
            </div>
          </div>
        </div>
        <div className="tm-height-150 tm-height-lg-80"></div>
      </section>
    </>
  );
};

export default AboutConference;
