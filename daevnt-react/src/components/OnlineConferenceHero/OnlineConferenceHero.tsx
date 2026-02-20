import React, { useRef } from "react";
import { useGSAP, gsap } from "@/lib/gsapConfig";

import { Link } from "react-router-dom";

interface RegistrationDate {
  startRegistration: string;
  date: string;
}

interface HeroTitleData {
  subtitle: string;
  titleLines: string;
}

interface SocialLink {
  label: string;
  href: string;
  aria: string;
}

// External data
const registrationDate: RegistrationDate = {
  startRegistration: "Start Registration:",
  date: "25 March 2025",
};

const heroTitleData: HeroTitleData = {
  subtitle: "Join Ultimate",
  titleLines: "Generation Next Conference Experience",
};

const socialLinks: SocialLink[] = [
  {
    label: "info@generationnextmovement.com",
    href: "mailto:info@generationnextmovement.com",
    aria: "Send Email to info@generationnextmovement.com",
  },
  {
    label: "+1-416-8241228",
    href: "tel:+1-416-8241228",
    aria: "Call +1-416-8241228",
  },
  {
    label: "Social: FB . IN . TW. DR",
    href: "https://www.facebook.com/",
    aria: "Visit Facebook Page",
  },
];

const OnlineConferenceHero: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const manImgRef = useRef<(HTMLImageElement | null)[]>([]);
  const animatedTextRef = useRef<(HTMLDivElement | null)[]>([]);
  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) return 0;
      const wrapper = wrapperRef.current;
      const heroManImgs = manImgRef.current.filter(
        (img) => img !== null
      ) as HTMLImageElement[];
      const textAnimation = animatedTextRef.current.filter(
        (el) => el !== null
      ) as HTMLDivElement[];

      if (!wrapper) return 0;

      gsap.set(heroManImgs, { opacity: 0, y: 50 });

      const tl = gsap.timeline();

      textAnimation.forEach((el) => {
        tl.to(el, {
          onStart: () => el.classList.add("active-animation"),
        });
      });

      heroManImgs.forEach((img) => {
        tl.to(
          img,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=1.3"
        );
      });

      const handleMouseMove = contextSafe((e: MouseEvent) => {
        if (!wrapper) return 0;
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) / 20;
        const moveY = (y - rect.height / 2) / 20;
        const scale = gsap.utils.mapRange(0, rect.height, 0.95, 1.05, y);

        heroManImgs.forEach((img) => {
          gsap.to(img, {
            x: moveX,
            y: moveY,
            scale,
            duration: 5,
            ease: "power3.out",
          });
        });
      });

      const handleMouseLeave = contextSafe(() => {
        heroManImgs.forEach((img) => {
          gsap.to(img, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 5,
            ease: "power3.out",
          });
        });
      });

      wrapper.addEventListener("mousemove", handleMouseMove);
      wrapper.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        wrapper.removeEventListener("mousemove", handleMouseMove);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: wrapperRef }
  );

  return (
    <section className="tm-slider online-conference-hero online-conference-hero__slider">
      <div className="online-conference-hero__wrapper" ref={wrapperRef}>
        <img
          src="assets/img/hero/online-conference-bg.png"
          className="online-conference-hero-bg__img tm-bg"
          alt="Hero Background"
          loading="lazy"
        />

        <img
          src="assets/img/hero/online-conference-man.png"
          className="online-conference-hero-man__img"
          alt="Hero Man"
          loading="lazy"
          ref={(el) => {
            manImgRef.current[0] = el;
          }}
        />

        <div className="container">
          <div className="container online-conference-hero__inner">
            <div className="online-conference-hero__content">
              <div
                className="online-conference-hero__top curve-animation-content"
                ref={(el) => {
                  animatedTextRef.current[0] = el;
                }}
              >
                <p className="online-conference-hero__top-date-title">
                  {registrationDate?.startRegistration}
                </p>
                <h6 className="online-conference-hero__top-date">
                  {registrationDate?.date}
                </h6>
              </div>

              <div className="online-conference-hero__bottom">
                <div
                  className="online-conference-hero__title curve-animation-content"
                  ref={(el) => {
                    animatedTextRef.current[1] = el;
                  }}
                >
                  <h2 className="online-conference-hero__title-text">
                    {heroTitleData?.subtitle}
                  </h2>
                  <h2 className="online-conference-hero__title-text">
                    {heroTitleData?.titleLines}
                  </h2>
                </div>
                <div
                  className="online-conference-hero__btn curve-animation-content"
                  ref={(el) => {
                    animatedTextRef.current[2] = el;
                  }}
                >
                  <Link
                    to="/register"
                    className="primary__btn"
                    aria-label="Register Now for Generation Next Conference"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="online-conference-hero__social-links">
        <img
          src="/assets/img/bg/oc-social-link-bg.png"
          alt="/oc-social-link-bg"
          className="online-conference-hero__social-bg-img tm-bg"
        />
        {socialLinks?.map((link, idx) => (
          <li className="online-conference-hero__social-item" key={idx}>
            <Link to={link.href} aria-label={link.aria}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OnlineConferenceHero;
