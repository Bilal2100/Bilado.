/* ===========================
   BILADO MEDIA — script.js
   =========================== */

'use strict';

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

/* ---------- Active nav link on scroll ---------- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ---------- Mobile menu ---------- */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---------- Animated counter ---------- */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step     = Math.ceil(target / (duration / 16));
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ---------- Contact form ---------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn      = contactForm.querySelector('.form-submit');
    const original = btn.innerHTML;

    btn.innerHTML  = '<span>Verzonden! ✓</span>';
    btn.style.background = '#22c55e';
    btn.disabled   = true;

    setTimeout(() => {
      btn.innerHTML  = original;
      btn.style.background = '';
      btn.disabled   = false;
      contactForm.reset();
    }, 3500);
  });
}

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---------- Typing effect in hero ---------- */
const typingEl   = document.getElementById('typingText');
const words      = ['Websites', 'Webshops', 'Platforms', 'Ervaringen'];
let   wordIndex  = 0;
let   charIndex  = 0;
let   isDeleting = false;

function typeEffect() {
  if (!typingEl) return;

  const current = words[wordIndex];

  if (isDeleting) {
    charIndex--;
    typingEl.textContent = current.slice(0, charIndex);
  } else {
    charIndex++;
    typingEl.textContent = current.slice(0, charIndex);
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex  = (wordIndex + 1) % words.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

/* ---------- Cursor glow (desktop only) ---------- */
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  Object.assign(glow.style, {
    position: 'fixed',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    transition: 'left 0.15s ease, top 0.15s ease',
    zIndex: '0',
    top: '-200px',
    left: '-200px',
  });
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}
