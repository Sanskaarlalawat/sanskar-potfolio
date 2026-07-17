// Per-route SEO: updates title, meta description, canonical and Open Graph
// tags on client-side navigation so every page reads correctly to crawlers
// and link previews.
const SITE = 'https://sanskaarlalawat.com';

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setCanonical = (url) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', url);
};

export const applySeo = ({ title, description, path }) => {
  document.title = title;
  setMeta('name', 'description', description);
  setCanonical(`${SITE}${path}`);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', `${SITE}${path}`);
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
};

export const seoForRoute = (route, project) => {
  if (route.page === 'projects') {
    return {
      title: 'Projects — Sanskar Lalawat | AI/ML Engineer',
      description:
        'Selected AI engineering work by Sanskar Lalawat: voice agents, LLM platforms, RAG systems, computer vision and automation — built and shipped end to end.',
      path: '/projects',
    };
  }
  if (route.page === 'about') {
    return {
      title: 'About — Sanskar Lalawat | AI/ML Engineer',
      description:
        'AI/ML engineer based in India. Technical Head at Siksha Bhavishayan. LLM orchestration, real-time voice agents, computer vision and production backends.',
      path: '/about',
    };
  }
  if (route.page === 'project' && project) {
    return {
      title: `${project.title} — Case Study | Sanskar Lalawat`,
      description: project.description,
      path: `/project/${project.slug}`,
    };
  }
  return {
    title: 'Sanskar Lalawat — AI/ML Engineer | LLMs, Voice Agents & Computer Vision',
    description:
      'Portfolio of Sanskar Lalawat, an AI/ML engineer building production AI systems: bilingual voice calling agents, LLM-powered education platforms, RAG chatbots and computer vision deployed at scale.',
    path: '/',
  };
};
