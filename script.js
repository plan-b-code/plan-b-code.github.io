/* ============================================================
   PLAN-B-CODE · BRIAN WOODS · GRIND & CODE
   ============================================================ */

// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav__links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('nav__links--open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('nav__links--open');
  });
});

// ---- Nav Scroll Effect ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.borderBottomColor = 'rgba(33,38,45,0.8)';
  } else {
    nav.style.borderBottomColor = 'var(--border)';
  }
});

// ---- Intersection Observer: Fade-in on scroll ----
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll(
  '.info-card, .episode-card, .feature, .meta-item, .status-card, .show__quote, .build__quote'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`;
  observer.observe(el);
});

// Add .visible class handler
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ---- Progress bar animation on scroll ----
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-bar__fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = width; }, 200);
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statusCard = document.querySelector('.status-card');
if (statusCard) progressObserver.observe(statusCard);

// ---- Background Audio Toggle ----
const bgm         = document.getElementById('bgm');
const audioToggle = document.getElementById('audioToggle');
const iconOn      = audioToggle.querySelector('.audio-icon--on');
const iconOff     = audioToggle.querySelector('.audio-icon--off');

let audioStarted = false;

function startAudio() {
  if (!audioStarted) {
    bgm.volume = 0.35;
    bgm.play().catch(() => {});
    audioStarted = true;
  }
}

// Start on first user interaction (browser autoplay policy)
['click', 'scroll', 'keydown', 'touchstart'].forEach(evt => {
  document.addEventListener(evt, startAudio, { once: true, passive: true });
});

audioToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!audioStarted) {
    startAudio();
    return;
  }
  if (bgm.paused) {
    bgm.play().catch(() => {});
    iconOn.style.display  = '';
    iconOff.style.display = 'none';
    audioToggle.classList.remove('muted');
  } else {
    bgm.pause();
    iconOn.style.display  = 'none';
    iconOff.style.display = '';
    audioToggle.classList.add('muted');
  }
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--accent)'
      : '';
  });
}, { passive: true });
