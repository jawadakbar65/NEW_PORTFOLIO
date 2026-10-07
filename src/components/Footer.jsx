import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { profile, socials } from '../data/portfolioData.js';

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  whatsapp: FaWhatsapp,
  mail: FiMail,
};

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a className="brand" href="#home">
            <span className="brand__accent">{profile.brand.slice(0, 1)}</span>
            {profile.brand.slice(1)}
          </a>
          <p>
            Frontend Developer building modern, responsive interfaces with clean code and thoughtful
            design.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <h3>Explore</h3>
          <ul>
            {profile.navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__connect">
          <h3>Connect</h3>
          <ul className="footer__socials">
            {socials.map(({ id, label, url }) => {
              const Icon = socialIcons[id] ?? FiMail;
              return (
                <li key={id}>
                  <a href={url} target="_blank" rel="noreferrer noopener" aria-label={label}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
          <a className="footer__email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p className="footer__copy">
          © {year} {profile.name}. All rights reserved.
        </p>
        <a className="footer__top" href="#home" aria-label="Back to top">
          <FiArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
