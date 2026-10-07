import { useEffect, useState } from 'react';
import { FiDownload, FiCheck, FiEye, FiX, FiExternalLink } from 'react-icons/fi';
import { aboutContent, profile } from '../data/portfolioData.js';

/* Full-screen CV viewer — renders the resume page (profile.cvUrl) inline. */
function CvModal({ onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="cv-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum Vitae of Jawad Akbar"
      onClick={onClose}
    >
      <div className="cv-modal__panel" onClick={(event) => event.stopPropagation()}>
        <header className="cv-modal__bar">
          <p className="cv-modal__title">Jawad Akbar — Curriculum Vitae</p>

          <div className="cv-modal__actions">
            <a
              className="cv-modal__open"
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink aria-hidden="true" />
              Open in new tab
            </a>
            <button
              type="button"
              className="cv-modal__close"
              onClick={onClose}
              aria-label="Close CV viewer"
              autoFocus
            >
              <FiX aria-hidden="true" />
            </button>
          </div>
        </header>

        <iframe
          className="cv-modal__frame"
          src={profile.cvUrl}
          title="Curriculum Vitae of Jawad Akbar"
          loading="lazy"
        />
      </div>
    </div>
  );
}

function About() {
  const [cvOpen, setCvOpen] = useState(false);
  const isExternalCv = /^https?:\/\//.test(profile.cvUrl);
  const closeCv = () => setCvOpen(false);

  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="container about__grid">
        <div className="about__intro">
          <p className="section__eyebrow">Who I Am</p>
          <h2 className="section__title" id="about-heading">
            {aboutContent.heading}
          </h2>
          <span className="section__underline" aria-hidden="true" />
        </div>

        <div className="about__body">
          {aboutContent.paragraphs.map((text) => (
            <p key={text.slice(0, 32)}>{text}</p>
          ))}

          <ul className="about__facts">
            {aboutContent.facts.map((fact) => (
              <li key={fact}>
                <FiCheck aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>

          <div className="about__actions">
            <button type="button" className="btn btn--primary" onClick={() => setCvOpen(true)}>
              <FiEye aria-hidden="true" />
              View CV
            </button>

            <a
              className="btn btn--outline"
              href={profile.cvUrl}
              {...(isExternalCv
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : { download: '' })}
            >
              <FiDownload aria-hidden="true" />
              Download CV
            </a>
          </div>
        </div>
      </div>

      {cvOpen && <CvModal onClose={closeCv} />}
    </section>
  );
}

export default About;
