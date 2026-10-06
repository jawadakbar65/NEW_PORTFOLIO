import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiGit,
  SiGithub,
  SiNpm,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FiMonitor, FiServer, FiTool, FiCode } from 'react-icons/fi';

/* ------------------------------------------------------------------ */
/*  CENTRAL CONFIG — edit this file to update your whole portfolio.    */
/* ------------------------------------------------------------------ */

const WHATSAPP_NUMBER = '923368026548';
const WHATSAPP_PREFILL =
  'Hello Jawad! I visited your portfolio and would like to discuss a project with you.';

export const profile = {
  brand: 'Jawad.',
  brandHighlight: 'J', // letter styled in purple
  name: 'Jawad Akbar',
  firstName: 'Jawad',
  title: 'Frontend Developer',
  subtitle: 'Frontend Developer',
  description:
    "I'm a passionate Frontend Developer skilled in HTML, CSS, JavaScript, and React.js, with knowledge of Node.js and Express.js. I enjoy building modern, responsive, and user-friendly websites with clean code and attractive interfaces. My goal is to turn ideas into practical digital experiences that work beautifully across all devices.",
  // Replace the file in public/images/ to change your portrait.
  portrait: 'images/portrait.png',
  portraitAlt: 'Portrait of Jawad Akbar, Frontend Developer',
  portraitSize: { width: 1254, height: 1254 },
  // Put your CV in public/cv.pdf
  cvUrl: 'cv.pdf',
  email: 'jawad.baloch.dev@gmail.com',
  location: 'Available for remote work',
  github: 'https://github.com/jawadakbar65',
  linkedin: 'https://www.linkedin.com/in/jawad-akbar-b9615b383/',
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  whatsappChatUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`,
  whatsappLabel: '0336 8026548',
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ],
};

export const socials = [
  { id: 'github', label: 'GitHub', url: profile.github, icon: 'github' },
  { id: 'linkedin', label: 'LinkedIn', url: profile.linkedin, icon: 'linkedin' },
  { id: 'whatsapp', label: 'WhatsApp', url: profile.whatsappUrl, icon: 'whatsapp' },
];

export const aboutContent = {
  heading: 'About Me',
  paragraphs: [
    "Hi, I'm Jawad Akbar, a Frontend Developer focused on turning ideas into clean, functional interfaces. I enjoy the craft of frontend work — structure, typography, spacing, and the small interactions that make a website feel alive.",
    'I work across the JavaScript stack: building interfaces with HTML, CSS, JavaScript and React.js, and wiring them to Node.js and Express.js services when a project needs a backend.',
    'Responsive web design is a core part of how I build. Every layout is checked across screen sizes so the experience stays comfortable on a phone, a tablet, or a wide desktop.',
    'I care about user-friendly applications and clean, maintainable code — and I keep learning, because problem solving gets better with every build.',
  ],
  facts: [
    'Frontend & full-stack JavaScript focus',
    'Responsive, accessible UI development',
    'Clean, maintainable code habits',
    'Continuous learning & problem solving',
  ],
};

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend',
    Icon: FiMonitor,
    skills: [
      { name: 'HTML5', Icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', Icon: SiCss, color: '#1572B6' },
      { name: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
      { name: 'React.js', Icon: SiReact, color: '#61DAFB' },
      { name: 'Responsive Web Design', Icon: FiCode, color: '#8528F5' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    Icon: FiServer,
    skills: [
      { name: 'Node.js', Icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express.js', Icon: SiExpress, color: '#3C3C43' },
      { name: 'REST APIs', Icon: FiServer, color: '#8528F5' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    Icon: FiTool,
    skills: [
      { name: 'Git', Icon: SiGit, color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#181717' },
      { name: 'VS Code', Icon: VscVscode, color: '#007ACC' },
      { name: 'npm', Icon: SiNpm, color: '#CB3837' },
    ],
  },
];

/* Add / edit / remove projects here. Set `thumbnail` to an image path
   inside public/images/ (e.g. 'images/projects/food.webp').
   Leave it null to use the built-in placeholder artwork. */
export const projects = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio Website',
    description:
      'A clean, responsive developer portfolio with a two-column hero, project gallery and contact section.',
    tech: ['React.js', 'CSS3', 'Vite'],
    thumbnail: null,
    liveUrl: '#',
    codeUrl: 'https://github.com/jawadakbar65',
  },
  {
    id: 'food',
    title: 'Food Website',
    description:
      'A modern food front page with menu highlights, responsive dish grids and smooth hover interactions.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    thumbnail: null,
    liveUrl: '#',
    codeUrl: 'https://github.com/jawadakbar65',
  },
  {
    id: 'woodworking',
    title: 'Woodworking Website',
    description:
      'A craft-focused showcase site for a woodworking studio with gallery layouts and clean typography.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    thumbnail: null,
    liveUrl: '#',
    codeUrl: 'https://github.com/jawadakbar65',
  },
  {
    id: 'react-app',
    title: 'React.js Web Application',
    description:
      'A component-driven single-page application with reusable UI, local state and route-based navigation.',
    tech: ['React.js', 'JavaScript', 'CSS3'],
    thumbnail: null,
    liveUrl: '#',
    codeUrl: 'https://github.com/jawadakbar65',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack JavaScript Application',
    description:
      'A full-stack app with a REST API built on Node.js and Express.js and a React frontend consuming it.',
    tech: ['React.js', 'Node.js', 'Express.js'],
    thumbnail: null,
    liveUrl: '#',
    codeUrl: 'https://github.com/jawadakbar65',
  },
];

/* Placeholder blog posts — replace with your real articles and URLs. */
export const posts = [
  {
    id: 'post-1',
    title: 'Building Responsive Layouts with CSS Grid and Flexbox',
    excerpt:
      'How I combine Grid for page structure and Flexbox for component internals to keep layouts predictable at every screen size.',
    date: '2026-01-12',
    readTime: '5 min read',
    url: 'https://github.com/jawadakbar65',
  },
  {
    id: 'post-2',
    title: 'Cleaner React Components with Small, Focused Hooks',
    excerpt:
      'Extracting state logic into custom hooks keeps components readable and makes reuse across a project straightforward.',
    date: '2026-02-08',
    readTime: '7 min read',
    url: 'https://github.com/jawadakbar65',
  },
  {
    id: 'post-3',
    title: 'Accessible Forms: Labels, Focus States and Validation',
    excerpt:
      'Practical accessibility checks I run on every form so keyboard and screen-reader users get the same experience.',
    date: '2026-03-02',
    readTime: '6 min read',
    url: 'https://github.com/jawadakbar65',
  },
];

export const contactContent = {
  heading: "Let's Work Together",
  invitation:
    'Have a project in mind, a role to fill, or an idea worth building? Send me a message and I will get back to you as soon as I can.',
  // Shown to visitors under the form — keep this honest.
  formNote:
    'This form validates your message locally and opens your email app to send it. No data is stored on a server.',
};

export default {
  profile,
  socials,
  aboutContent,
  skillCategories,
  projects,
  posts,
  contactContent,
};
