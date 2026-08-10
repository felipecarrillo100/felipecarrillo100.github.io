// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (persisted in localStorage)
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const storedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    themeToggle.textContent = '☀️';
  } else {
    root.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
  }
}

applyTheme(storedTheme);

themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// Typing effect for the hero tagline
const phrases = [
  'Full-stack tinkerer.',
  'Geospatial nerd.',
  'Open-source reviver.',
  'Coffee-powered builder.',
  'Tiny-library addict.'
];
const typedEl = document.getElementById('typed');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const phrase = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = phrase.slice(0, charIndex);
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = phrase.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 40 : 70);
}

typeLoop();

// Random fun facts
const funFacts = [
  "base62str exists because I got tired of writing the same encode/decode helper on every project.",
  "Several 'replace-*' packages are modernized forks of React libraries that got abandoned years ago.",
  "I've built device-orientation and dual-joystick support for iPads — because someone had to find out if it was possible.",
  "A good chunk of my repos revolve around LuciadRIA, WFS, and OGC map APIs.",
  "cloudfrontize started as a way to test AWS Lambda@Edge logic without deploying it first.",
  "I have way more npm packages than any single portfolio page can reasonably list — 39 and counting."
];

const funFactBtn = document.getElementById('fun-fact-btn');
const funFactEl = document.getElementById('fun-fact');

funFactBtn.addEventListener('click', () => {
  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
  funFactEl.textContent = fact;
});

// Reveal-on-scroll for trait and project cards
const revealTargets = document.querySelectorAll('.traits li, .project-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('visible'));
}

// Count-up animation for stats
const statEls = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1200;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(step);
}

if ('IntersectionObserver' in window) {
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statEls.forEach((el) => statObserver.observe(el));
} else {
  statEls.forEach((el) => {
    el.textContent = el.getAttribute('data-target');
  });
}
