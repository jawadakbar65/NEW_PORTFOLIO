/**
 * WhatsApp notification to the owner — CallMeBot's free API (personal use).
 *
 * ONE-TIME SETUP (do it from the phone that has WhatsApp on 0336 8026548):
 *   1. Save this number in your contacts: +34 623 75 84 18
 *   2. Open WhatsApp and send exactly:  I allow callmebot to send me messages
 *   3. The bot replies within ~2 minutes with:  Your APIKEY is 123123
 *   4. Paste that key below (replace REPLACE_ME).
 *
 * Until the key is set, nothing breaks — the form still works and simply
 * skips the WhatsApp ping.
 */
export const WHATSAPP_NOTIFY = {
  phone: '923368026548',
  apiKey: 'REPLACE_ME',
};

export const isWhatsAppConfigured = () =>
  Boolean(WHATSAPP_NOTIFY.apiKey) && !WHATSAPP_NOTIFY.apiKey.includes('REPLACE_ME');

/* Keeps the ping readable on a phone without exceeding API limits. */
function buildText({ name, email, subject, message }) {
  const body = (message || '').slice(0, 900);
  return [
    '*New portfolio message*',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    `Message: ${body}`,
    `Time: ${new Date().toLocaleString()}`,
  ].join('\n');
}

/**
 * Fire-and-forget ping. The API sends no CORS headers, so the request is
 * deliberately sent as `no-cors`: the simple GET still reaches the server
 * and delivers the message, we just cannot read the response body.
 */
export function notifyOwner(payload) {
  if (!isWhatsAppConfigured()) {
    if (import.meta.env?.DEV) {
      console.warn(
        'WhatsApp notifications are off — paste your CallMeBot apikey into src/lib/notify.js',
      );
    }
    return Promise.resolve({ skipped: true });
  }

  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_NOTIFY.phone}` +
    `&text=${encodeURIComponent(buildText(payload))}` +
    `&apikey=${WHATSAPP_NOTIFY.apiKey}`;

  return fetch(url, { mode: 'no-cors', cache: 'no-store' })
    .then(() => ({ sent: true }))
    .catch((error) => ({ sent: false, error }));
}

export default notifyOwner;
