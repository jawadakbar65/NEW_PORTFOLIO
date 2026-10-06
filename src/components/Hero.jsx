import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { profile, socials } from '../data/portfolioData.js';

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  whatsapp: FaWhatsapp,
};

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="container hero__grid">
        <div className="hero__content">
          <h1 className="hero__title" id="hero-heading">
            Hi, I&rsquo;m <span className="text-purple">{profile.name}</span>
          </h1>

          <p className="hero__subtitle">{profile.subtitle}</p>

          <p className="hero__description">{profile.description}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#contact">
              Hire Me
            </a>
            <a className="btn btn--outline" href="#portfolio">
              See Projects
            </a>
          </div>

          <ul className="hero__socials" aria-label="Social media links">
            {socials.map(({ id, label, url }) => {
              const Icon = socialIcons[id];
              if (!Icon) return null;
              return (
                <li key={id}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hero__visual">
          <span className="hero__blob" aria-hidden="true" />
          <img
            className="hero__portrait"
            src={profile.portrait}
            alt={profile.portraitAlt}
            width={profile.portraitSize?.width ?? 520}
            height={profile.portraitSize?.height ?? 660}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
