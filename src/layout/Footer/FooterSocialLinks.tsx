interface SocialLink {
  href: string;
  iconClass: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://www.facebook.com/gennextofficial",
    iconClass: "flaticon-facebook",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/gennextoffical",
    iconClass: "flaticon-instagram",
    label: "Instagram",
  },
  {
    href: "https://twitter.com/",
    iconClass: "flaticon-twitter",
    label: "Twitter",
  },

];

const FooterSocialLinks: React.FC = () => {
  return (
    <ul className="social social__items">
      {socialLinks.map(({ href, iconClass, label }) => (
        <li className="social__item" key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="social__link"
            data-discover="true"
            aria-label={label}
          >
            <i className={iconClass} />
          </a>
        </li>
      ))}
    </ul>
  );
};
export default FooterSocialLinks;
