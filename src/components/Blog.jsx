import { FiArrowUpRight, FiClock } from 'react-icons/fi';
import { posts } from '../data/portfolioData.js';

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

function Blog() {
  return (
    <section className="section blog" id="blog" aria-labelledby="blog-heading">
      <div className="container">
        <header className="section__header">
          <p className="section__eyebrow">From My Notebook</p>
          <h2 className="section__title" id="blog-heading">
            Latest Writing
          </h2>
          <span className="section__underline" aria-hidden="true" />
        </header>

        <ul className="blog__grid">
          {posts.map((post) => (
            <li className="post" key={post.id}>
              <a className="post__card" href={post.url} target="_blank" rel="noreferrer noopener">
                <div className="post__meta">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="post__read">
                    <FiClock aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="post__title">
                  {post.title}
                  <FiArrowUpRight aria-hidden="true" />
                </h3>
                <p className="post__excerpt">{post.excerpt}</p>
                <span className="post__more">Read article</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Blog;
