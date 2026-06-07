// ===== Pilot mockup interactions =====

// Nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu toggle
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => io.observe(el));

// Safety: if IntersectionObserver never fires (no-scroll render, unsupported), reveal all
window.addEventListener('load', () => {
  setTimeout(() => reveals.forEach(el => el.classList.add('visible')), 1200);
});
