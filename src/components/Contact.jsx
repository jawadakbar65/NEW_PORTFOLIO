import { useState } from 'react';
import { FiMail, FiMapPin, FiSend, FiGithub, FiLinkedin, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { contactContent, profile, socials } from '../data/portfolioData.js';

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  whatsapp: FaWhatsapp,
  mail: FiMail,
};

const initialForm = { name: '', email: '', subject: '', message: '' };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus('Please fix the highlighted fields and try again.');
      return;
    }

    const subject = encodeURIComponent(form.subject.trim());
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`
    );
    setStatus('Opening your email app to send the message…');
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
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
                <FiPhone aria-hidden="true" />
              </span>
              <div>
                <span className="contact__label">WhatsApp</span>
                <a href={profile.whatsappUrl} target="_blank" rel="noreferrer noopener">
                  {profile.whatsappLabel}
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
            <a
              className="btn btn--whatsapp"
              href={profile.whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <ul className="contact__socials" aria-label="Social media links">
              {socials.map(({ id, label, url }) => {
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
                placeholder="you@example.com"
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

          <button type="submit" className="btn btn--primary contact__submit">
            <FiSend aria-hidden="true" />
            Send Message
          </button>

          <p className="contact__note">{contactContent.formNote}</p>
          {status && (
            <p className="contact__status" role="status" aria-live="polite">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
