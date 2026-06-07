// Shared mobile-nav toggle for subpages (nav stays solid; burger opens menu)
(function () {
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!burger || !mobileMenu) return;
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );
})();
