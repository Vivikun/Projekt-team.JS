// const mobileMenu = document.querySelector('.js-menu-container');
// const openMenuBtn = document.querySelector('.js-open-menu');
// const closeMenuBtn = document.querySelector('.js-close-menu');

// const toggleMenu = () => {
//   const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
//   openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
//   mobileMenu.classList.toggle('is-open');

//   const scrollLockMethod = !isMenuOpen ? 'disableBodyScroll' : 'enableBodyScroll';
//   bodyScrollLock[scrollLockMethod](document.body);
// };

// openMenuBtn.addEventListener('click', toggleMenu);
// closeMenuBtn.addEventListener('click', toggleMenu);

// window
//   .matchMedia('(min-width: 768px) and (orientation: portrait)')
//   .addEventListener('change', element => {
//     if (!element.matches) {
//       mobileMenu.classList.remove('is-open');
//       openMenuBtn.setAttribute('aria-expanded', false);
//       bodyScrollLock.enableBodyScroll(document.body);
//     }
//   });
const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
// const closeMenuBtn = document.querySelector('.js-close-menu');
const mediaQuery = window.matchMedia('(min-width: 768px) and (orientation: portrait)');

const toggleMenu = () => {
  const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('is-open');
  const scrollLockMethod = !isMenuOpen ? 'disableBodyScroll' : 'enableBodyScroll';
  bodyScrollLock[scrollLockMethod](document.body);
};

const closeMenu = () => {
  mobileMenu.classList.remove('is-open');
  openMenuBtn.setAttribute('aria-expanded', false);
  bodyScrollLock.enableBodyScroll(document.body);
};

openMenuBtn.addEventListener('click', toggleMenu);
// closeMenuBtn.addEventListener('click', closeMenu);

mediaQuery.addEventListener('change', element => {
  if (!element.matches) {
    closeMenu();
  }
});

//  brakuje jednego ważnego elementu - deklaracji i importu biblioteki bodyScrollLock.
