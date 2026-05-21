/* ============================================
   BILADO MEDIA — PREMIUM JAVASCRIPT
   ============================================ */

/* ── Preloader ── */
(function () {
  const preloader = document.getElementById('preloader');
  const fill      = document.getElementById('preloaderFill');
  const pct       = document.getElementById('preloaderPct');
  let progress    = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('done');
        document.body.classList.remove('loading');
        // Trigger hero image zoom
        const heroBg = document.getElementById('heroBg');
        if (heroBg) heroBg.classList.add('loaded');
      }, 400);
    }
    fill.style.width = progress + '%';
    pct.textContent  = Math.floor(progress) + '%';
  }, 60);
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ── Custom cursor ── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity   = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity   = '1';
    follower.style.opacity = '1';
  });

  /* ── Sticky nav ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── Mobile burger ── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen     = false;

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    const spans = burger.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
      spans[1].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => s.style.transform = '');
    });
  });

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  /* ── Counter animation ── */
  const counters = document.querySelectorAll('.counter');
  let counted    = false;

  function runCounters() {
    if (counted) return;
    const section = document.querySelector('.statement');
    if (!section) return;
    if (section.getBoundingClientRect().top < window.innerHeight - 80) {
      counted = true;
      counters.forEach(el => {
        const target   = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step     = target / (duration / 16);
        let current    = 0;
        const t = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(t); }
          el.textContent = Math.floor(current);
        }, 16);
      });
    }
  }
  window.addEventListener('scroll', runCounters);
  runCounters();

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  function checkReveals() {
    reveals.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) {
        el.classList.add('in');
      }
    });
  }
  window.addEventListener('scroll', checkReveals);
  checkReveals();

  /* ── Add reveal classes ── */
  const revealSelectors = [
    '.service-row', '.work-card', '.process__step',
    '.about__left', '.about__right',
    '.contact__left', '.contact__right',
    '.statement__text', '.statement__stat',
  ];
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      const delays = ['', 'reveal-d1', 'reveal-d2', 'reveal-d3', 'reveal-d4'];
      if (i < delays.length) el.classList.add(delays[i]);
    });
  });
  checkReveals();

  /* ── Testimonials slider ── */
  const track  = document.getElementById('testimonialsTrack');
  const dots   = document.querySelectorAll('.tdot');
  const prev   = document.getElementById('tPrev');
  const next   = document.getElementById('tNext');
  let current  = 0;
  const total  = dots.length;

  function goTo(idx) {
    current = (idx + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  let autoT = setInterval(() => goTo(current + 1), 5500);
  [prev, next, ...dots].forEach(el => {
    el.addEventListener('click', () => {
      clearInterval(autoT);
      autoT = setInterval(() => goTo(current + 1), 5500);
    });
  });

  /* ── Contact form ── */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('.form-submit');
      const text = document.getElementById('submitText');
      btn.disabled    = true;
      text.textContent = 'Versturen...';

      setTimeout(() => {
        success.classList.add('show');
        form.reset();
        btn.disabled     = false;
        text.textContent = 'Verstuur bericht';
        setTimeout(() => success.classList.remove('show'), 6000);
      }, 1200);
    });
  }

  /* ── Parallax hero ── */
  window.addEventListener('scroll', () => {
    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
      heroBg.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
    }
  });

  /* ── Service row hover expand ── */
  document.querySelectorAll('.service-row').forEach(row => {
    const right = row.querySelector('.service-row__right');
    if (!right) return;
    right.style.maxHeight = '0';
    right.style.overflow  = 'hidden';
    right.style.transition = 'max-height .5s cubic-bezier(0.76,0,0.24,1), opacity .4s';
    right.style.opacity   = '0';

    row.addEventListener('mouseenter', () => {
      right.style.maxHeight = '300px';
      right.style.opacity   = '1';
    });
    row.addEventListener('mouseleave', () => {
      right.style.maxHeight = '0';
      right.style.opacity   = '0';
    });
  });

  /* ── Active nav link ── */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 100;
    sections.forEach(sec => {
      const link = document.querySelector(`.nav__link[href="#${sec.id}"]`);
      if (link && !link.classList.contains('nav__link--cta')) {
        const active = y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight;
        link.style.color = active ? 'var(--white)' : '';
      }
    });
  });

});
