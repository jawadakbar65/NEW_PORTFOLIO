import { FiDownload, FiCheck } from 'react-icons/fi';
import { aboutContent, profile } from '../data/portfolioData.js';

function About() {
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

          <a className="btn btn--primary" href={profile.cvUrl} download>
            <FiDownload aria-hidden="true" />
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
