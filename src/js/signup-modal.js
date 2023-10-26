const openModalButton = document.querySelector('.open-modal-button');
const modal = document.querySelector('.modal__container');


openModalButton.addEventListener('click', () => {
  modal.style.display = 'block'; 
});


const closeModalButton = modal.querySelector('.modal__close-button');
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none'; 
});