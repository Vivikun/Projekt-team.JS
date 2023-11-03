const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const toggleMenu = () => {
  const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('is-open');
  openMenuBtn.classList.toggle('opened');
  const scrollLockMethod = !isMenuOpen ? 'disableBodyScroll' : 'enableBodyScroll';
  bodyScrollLock[scrollLockMethod](document.body);
};
openMenuBtn.addEventListener('click', toggleMenu);
window
  .matchMedia('(min-width: 768px) and (orientation: portrait)')
  .addEventListener('change', element => {
    if (!element.matches) {
      mobileMenu.classList.remove('is-open');
      openMenuBtn.setAttribute('aria-expanded', false);
      bodyScrollLock.enableBodyScroll(document.body);
    }
  });
