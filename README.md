# Jawad. — Developer Portfolio (Light Theme)

Professional light-theme portfolio for **Jawad Akbar**, Frontend Developer.
Built with **React + Vite**, plain **CSS3** (no CSS framework), and **React Icons**.

Colors: Background `#F1F1F2` · Primary purple `#8528F5` · Headings `#414141` · Body `#686868` · White `#FFFFFF`
Typography: **Poppins** (headings) + **Inter** (body).

## 1. Install & run

```bash
npm install
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## 2. Portrait, CV and project images

| Asset    | Path                        | Notes                                                                                     |
| -------- | --------------------------- | ----------------------------------------------------------------------------------------- |
| Portrait | `public/images/portrait.png` | Your photo (1254×1254, transparent PNG). Replace the file to update it; if dimensions change, update `profile.portraitSize`. |
| CV       | `public/cv.pdf`             | Replace the placeholder PDF with your real CV (same filename, or update `profile.cvUrl`). |
| Project screenshots | `public/images/projects/` | Set a project's `thumbnail` in `portfolioData.js`. `null` shows the built-in placeholder art. |

## 3. Everything editable lives in one file

`src/data/portfolioData.js`

- **Personal info** → `profile` (name, role, bio, email, brand, portrait, CV)
- **Real social links** → `profile.github`, `profile.linkedin`, `profile.whatsappUrl`,
  `profile.whatsappChatUrl` (WhatsApp message is pre-filled)
- **Nav links** → `profile.navLinks`
- **Hero social icons / footer icons** → `socials`
- **About text** → `aboutContent`
- **Skills** → `skillCategories`
- **Projects** → `projects` (title, description, tech, `liveUrl`, `codeUrl`, `thumbnail`)
  - `liveUrl: '#'` renders an honest "Demo link coming soon" label instead of a broken link.
- **Blog posts** → `posts`
- **Contact copy** → `contactContent`

### Contact form

The form validates input in the browser, then opens the visitor's email app via a `mailto:`
link. No backend is involved and nothing is stored — the note under the form says so. To send
messages server-side, connect a form service (Formspree, Netlify Forms, your own API) in
`src/components/Contact.jsx` and update `contactContent.formNote`.

## 4. Project structure

```text
jawad-portfolio/
├── public/
│   ├── images/portrait.png    ← your photo
│   └── cv.pdf                 ← your CV
├── src/
│   ├── components/            ← Navbar, Hero, About, Skills,
│   │                             Projects, Blog, Contact, Footer
│   ├── data/portfolioData.js  ← central configuration
│   ├── styles/                ← base, navbar, hero, about-skills,
│   │                             projects-blog, contact-footer, responsive
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              ← imports the partials in order
├── index.html
├── package.json
└── vite.config.js
```

## 5. Accessibility & responsiveness

- Semantic sections, labelled form fields, skip link, keyboard focus rings (purple).
- Hamburger menu below `960px`, stacked hero below `860px`, single column below `640px`.
- External links use `target="_blank" rel="noopener noreferrer"`.
- All animations respect `prefers-reduced-motion`.
