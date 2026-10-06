import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { projects } from '../data/portfolioData.js';

function Thumbnail({ project, index }) {
  if (project.thumbnail) {
    return (
      <img
        className="project__thumb-img"
        src={project.thumbnail}
        alt={`${project.title} preview`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // Built-in placeholder artwork until a real screenshot is added.
  return (
    <div className="project__thumb-fallback" role="img" aria-label={`${project.title} preview placeholder`}>
      <span className="project__thumb-index">{String(index + 1).padStart(2, '0')}</span>
      <span className="project__thumb-label">{project.title}</span>
      <span className="project__thumb-dots" aria-hidden="true" />
    </div>
  );
}

function Projects() {
  return (
    <section className="section projects" id="portfolio" aria-labelledby="portfolio-heading">
      <div className="container">
        <header className="section__header">
          <p className="section__eyebrow">Selected Work</p>
          <h2 className="section__title" id="portfolio-heading">
            My Projects
          </h2>
          <span className="section__underline" aria-hidden="true" />
        </header>

        <ul className="projects__grid">
          {projects.map((project, index) => (
            <li className="project" key={project.id}>
              <article className="project__card">
                <div className="project__thumb">
                  <Thumbnail project={project} index={index} />
                </div>

                <div className="project__body">
                  <h3 className="project__title">{project.title}</h3>
                  <p className="project__desc">{project.description}</p>

                  <ul className="project__tech">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>

                  <div className="project__links">
                    {project.liveUrl && project.liveUrl !== '#' ? (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <FiExternalLink aria-hidden="true" />
                        Live Demo
                      </a>
                    ) : (
                      <span className="project__placeholder">
                        <FiExternalLink aria-hidden="true" />
                        Demo link coming soon
                      </span>
                    )}
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                      <FiGithub aria-hidden="true" />
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Projects;
