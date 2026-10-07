import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Blog from './components/Blog.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

// Firebase (auth + Firestore) is code-split: it loads only for the inbox.
const Admin = lazy(() => import('./components/Admin.jsx'));

function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Private inbox: open the site with #admin after the URL to read messages.
  if (hash.toLowerCase().startsWith('#admin')) {
    return (
      <>
        <a className="skip-link" href="#admin-content">
          Skip to content
        </a>
        <main id="admin-content">
          <Suspense
            fallback={
              <p className="admin__note" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
                Loading inbox…
              </p>
            }
          >
            <Admin />
          </Suspense>
        </main>
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
