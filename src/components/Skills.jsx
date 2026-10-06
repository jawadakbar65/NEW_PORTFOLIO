import { skillCategories } from '../data/portfolioData.js';

function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <header className="section__header">
          <p className="section__eyebrow">What I Work With</p>
          <h2 className="section__title" id="skills-heading">
            Technical Skills
          </h2>
          <span className="section__underline" aria-hidden="true" />
        </header>

        <div className="skills__grid">
          {skillCategories.map(({ id, title, Icon, skills }) => (
            <article className="skill-card" key={id}>
              <header className="skill-card__head">
                <span className="skill-card__icon">
                  <Icon aria-hidden="true" />
                </span>
                <h3>{title}</h3>
              </header>

              <ul className="skill-card__list">
                {skills.map(({ name, Icon: SkillIcon, color }) => (
                  <li className="skill" key={name}>
                    <span className="skill__icon" style={{ color }}>
                      <SkillIcon aria-hidden="true" />
                    </span>
                    <span className="skill__name">{name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
