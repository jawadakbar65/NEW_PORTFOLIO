import { useEffect, useState } from 'react';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { profile } from '../data/portfolioData.js';

function Brand() {
  const highlight = profile.brandHighlight;
  const idx = profile.brand.indexOf(highlight);
  if (idx === -1) return <span className="brand__text">{profile.brand}</span>;

  return (
    <span className="brand__text">
      <span className="brand__accent">{profile.brand.slice(0, idx + highlight.length)}</span>
      {profile.brand.slice(idx + highlight.length)}
    </span>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeAll} aria-label={`${profile.brand} home`}>
          <Brand />
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>

        <div id="primary-menu" className={`navbar__menu ${menuOpen ? 'is-open' : ''}`}>
          <ul className="navbar__list">
            {profile.navLinks.map((link) => {
              const hasChildren = Boolean(link.children?.length);
              const expanded = openDropdown === link.label;
              return (
                <li
                  key={link.label}
                  className={`navbar__item ${hasChildren ? 'has-dropdown' : ''}`}
                  onMouseEnter={() => hasChildren && setOpenDropdown(link.label)}
                  onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                >
                  <a
                    href={link.href}
                    onClick={() => {
                      if (!hasChildren) closeAll();
                    }}
                    aria-haspopup={hasChildren ? 'true' : undefined}
                    aria-expanded={hasChildren ? expanded : undefined}
                  >
                    {link.label}
                    {hasChildren && <FiChevronDown className="navbar__caret" aria-hidden="true" />}
                  </a>

                  {hasChildren && (
                    <button
                      type="button"
                      className="navbar__dropdown-toggle"
                      aria-label={`Toggle ${link.label} menu`}
                      aria-expanded={expanded}
                      onClick={() => setOpenDropdown(expanded ? null : link.label)}
                    >
                      <FiChevronDown aria-hidden="true" />
                    </button>
                  )}

                  {hasChildren && (
                    <ul className={`navbar__dropdown ${expanded ? 'is-open' : ''}`}>
                      {link.children.map((child) => (
                        <li key={child.label}>
                          <a href={child.href} onClick={closeAll}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <a className="btn btn--primary navbar__cta" href="#contact" onClick={closeAll}>
            Let&rsquo;s Talk
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
