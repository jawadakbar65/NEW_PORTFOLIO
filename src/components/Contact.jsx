import { useState } from 'react';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contactContent, profile, socials } from '../data/portfolioData.js';
import { isEmailConfigured, sendContactEmail } from '../lib/contactEmail.js';

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  mail: FiMail,
};

const initialForm = { name: '', email: '', subject: '', message: '' };

/* Never leave the visitor staring at "Sending…" forever. */
function withTimeout(promise, ms = 15000) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('firebase-timeout')), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/* Last-resort delivery: open the visitor's mail app addressed to the owner. */
function mailtoHref({ name, email, subject, message }) {
  const subjectEncoded = encodeURIComponent(subject);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  return `mailto:${profile.email}?subject=${subjectEncoded}&body=${body}`;
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!form.subject.trim()) errors.subject = 'Please add a subject.';
  if (form.message.trim().length < 10) {
    errors.message = 'Please write at least 10 characters.';
  }
  return errors;
}

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [fallbackHref, setFallbackHref] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus('Please fix the highlighted fields and try again.');
      return;
    }

    setSending(true);
    setStatus('Sending your message…');

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    try {
      if (!isEmailConfigured()) {
        setFallbackHref(mailtoHref(payload));
        setStatus('Email delivery is not configured yet. Open your email app below to send your message.');
        return;
      }

      await withTimeout(sendContactEmail(payload), 20000);
      setForm(initialForm);
      setFallbackHref('');
      setStatus('Thanks! Your message has been sent to my inbox — I will get back to you soon.');
    } catch (err) {
      console.error('Contact form submit failed:', err);
      setFallbackHref(mailtoHref(payload));
      setStatus(
        `Automatic delivery is unavailable right now. Open your email app below — the message is pre-filled, just press Send (or write to ${profile.email}).`,
      );
    } finally {
      setSending(false);
    }
  };

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: form[name],
    onChange: handleChange,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-heading">
      <div className="container contact__grid">
        <div className="contact__info">
          <p className="section__eyebrow">Get In Touch</p>
          <h2 className="section__title" id="contact-heading">
            {contactContent.heading}
          </h2>
          <span className="section__underline" aria-hidden="true" />
          <p className="contact__invitation">{contactContent.invitation}</p>

          <ul className="contact__details">
            <li>
              <span className="contact__icon">
                <FiMail aria-hidden="true" />
              </span>
              <div>
                <span className="contact__label">Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </li>
            <li>
              <span className="contact__icon">
                <FaWhatsapp aria-hidden="true" />
              </span>
              <div>
                <span className="contact__label">WhatsApp</span>
                <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  03368026548
                </a>
              </div>
            </li>
            <li>
              <span className="contact__icon">
                <FiMapPin aria-hidden="true" />
              </span>
              <div>
                <span className="contact__label">Status</span>
                <span>{profile.location}</span>
              </div>
            </li>
          </ul>

          <div className="contact__cta-row">
            <ul className="contact__socials" aria-label="Social media links">
              {socials.filter(({ id }) => id !== 'whatsapp').map(({ id, label, url }) => {
                const Icon = socialIcons[id] ?? FiMail;
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
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="contact-name">Name</label>
              <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
              {errors.name && (
                <p className="form-error" id="contact-name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="contact-email">Email</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="jawad@gmail.com"
                {...fieldProps('email')}
              />
              {errors.email && (
                <p className="form-error" id="contact-email-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="contact-subject">Subject</label>
            <input type="text" placeholder="What is this about?" {...fieldProps('subject')} />
            {errors.subject && (
              <p className="form-error" id="contact-subject-error">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              rows="6"
              placeholder="Tell me about your project…"
              {...fieldProps('message')}
            />
            {errors.message && (
              <p className="form-error" id="contact-message-error">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn--primary contact__submit"
            disabled={sending}
            aria-busy={sending}
          >
            <FiSend aria-hidden="true" />
            {sending ? 'Sending…' : 'Send Message'}
          </button>

          {status && (
            <p className="contact__status" role="status" aria-live="polite">
              {status}{' '}
              {fallbackHref && (
                <a className="contact__status-link" href={fallbackHref}>
                  Open my email app →
                </a>
              )}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
