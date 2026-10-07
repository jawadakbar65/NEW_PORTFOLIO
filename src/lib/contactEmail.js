import { profile } from '../data/portfolioData.js';

/**
 * EmailJS — delivers contact-form messages straight to your Gmail inbox.
 *
 * Sign up at https://dashboard.emailjs.com → Email Services (connect Gmail)
 * → Email Templates → then paste the three values below.
 * Until they are filled in, the form offers a prefilled mailto link instead.
 */
export const EMAILJS_CONFIG = {
  serviceId: 'service_REPLACE_ME',
  templateId: 'template_REPLACE_ME',
  publicKey: 'publicKey_REPLACE_ME',
};

const hasRealValue = (value) => Boolean(value) && !value.includes('REPLACE_ME');

export const isEmailConfigured = () =>
  hasRealValue(EMAILJS_CONFIG.serviceId) &&
  hasRealValue(EMAILJS_CONFIG.templateId) &&
  hasRealValue(EMAILJS_CONFIG.publicKey);

/**
 * Template variables available in the EmailJS editor:
 *   {{to_email}} {{name}} {{email}} {{subject}} {{message}} {{reply_to}} {{time}}
 * Set the template's "To Email" to your Gmail and "Reply To" to {{reply_to}}.
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const { default: emailjs } = await import('@emailjs/browser');

  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    {
      to_email: profile.email,
      name,
      email,
      subject,
      message,
      reply_to: email,
      time: new Date().toLocaleString(),
    },
    { publicKey: EMAILJS_CONFIG.publicKey },
  );
}
