const openModalButton = document.querySelector('.mode-buttons__sign-up');
const modal = document.querySelector('.modal__container');
openModalButton.addEventListener('click', () => {
  modal.style.display = 'flex';
});
const closeModalButton = modal.querySelector('.modal__close-button');
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});
