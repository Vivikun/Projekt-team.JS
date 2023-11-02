import LsService from './storage-methods';
import Notiflix from 'notiflix';


const SHOP_LIST_KEY = 'selected-books';
const shoppingListArray = LsService.load(SHOP_LIST_KEY);
const  modalInfoDescription = document.querySelector('.modal-info__description');
const modalPopEl = document.querySelector('[data-modal]');

modalPopEl.addEventListener('click', event => {
  event.preventDefault();
    if (event.target.classList.contains('modal-info__button')) {
      handleModalPopElClick();
    }
    else if (event.target.textContent === 'remove from the shopping list') {
        modalInfoDescription.innerHTML =
        'Congratulations! You have added the book to the shopping list. To delete, press the button "Remove from the shopping list.';
    }
    else if (event.target.textContent === 'add to shopping list') {
        modalInfoDescription.innerHTML = '';
    }
  }
);

function handleModalPopElClick() {
  const activeBook = LsService.load('active-book');

  const watchedBtnRef = modalPopEl.querySelector('.modal-info__button');

  if (shoppingListArray.find(el => el._id === activeBook._id)) {
    const idx = shoppingListArray.findIndex(el => el._id === activeBook._id);
    shoppingListArray.splice(idx, 1);
    LsService.save(SHOP_LIST_KEY, shoppingListArray);
    Notiflix.Notify.warning('This book was removed from your Shopping list!');
    watchedBtnRef.textContent = 'add to shopping list';
    // LsService.remove('selected-books');
    return;
  }

  shoppingListArray.push(activeBook);
  LsService.save('selected-books', shoppingListArray);
  Notiflix.Notify.success('This book was added to your Shopping list!');
  watchedBtnRef.textContent = 'remove from the shopping list';
}