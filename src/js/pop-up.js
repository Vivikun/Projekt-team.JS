'use strict';
import { getBooksId } from './book-api';

document.addEventListener('DOMContentLoaded', () => {
  let currentBookData = null;

  const bookCover = document.querySelector('.popup__img');
  const bookAmazonLink = document.querySelector('.popup__amazon');
  const bookDescription = document.querySelector('.popup__description-details');
  const btnAddToShoppingList = document.querySelector('.popup__btn-add');
  const btnRemoveFromShoppingList = document.querySelector('.popup__btn-remove');
  const btnClosePopUp = document.querySelector('.popup__btn-close');
  const backdrop = document.querySelector('.backdrop-popup');
  const popUp = document.querySelector('.popup');
  const comment = document.querySelector('.popup__comment');

  const listBooks = document.querySelector('.books-container');
  const listBooksInCategories = document.querySelector('.home-typeBook');

  let isBookAlreadyInShoppingList = false;

  const toggleButtonsVisibility = () => {
    if (isBookAlreadyInShoppingList) {
      btnAddToShoppingList.classList.add('popup__btn-text-hidden');
      btnRemoveFromShoppingList.classList.remove('popup__btn-text-hidden');
      comment.classList.remove('popup__btn-text-hidden');
    } else {
      btnAddToShoppingList.classList.remove('popup__btn-text-hidden');
      btnRemoveFromShoppingList.classList.add('popup__btn-text-hidden');
      comment.classList.add('popup__btn-text-hidden');
    }
  };

  const addToLocalStorage = () => {
    if (!currentBookData) return;

    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    const bookExists = storedBooks.some(book => book._id === currentBookData._id);

    if (!bookExists) {
      storedBooks.push(currentBookData);
      localStorage.setItem('books', JSON.stringify(storedBooks));
    }

    isBookAlreadyInShoppingList = true;
    toggleButtonsVisibility();
  };

  const removeFromLocalStorage = () => {
    if (!currentBookData) return;

    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    const updatedBooks = storedBooks.filter(book => book._id !== currentBookData._id);

    localStorage.setItem('books', JSON.stringify(updatedBooks));

    isBookAlreadyInShoppingList = false;
    toggleButtonsVisibility();
  };

  const createPopUp = async bookId => {
    const bookData = await getBooksId(bookId);
    currentBookData = bookData;

    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    isBookAlreadyInShoppingList = storedBooks.some(book => book._id === bookData._id);
    toggleButtonsVisibility();

    bookCover.src = bookData.book_image;
    bookAmazonLink.href = bookData.amazon_product_url;
    const markup = `<h2 class="popup__title">${bookData.title}</h2>
                <p class="popup__author">${bookData.author}</p>
                <p class="popup__text">${bookData.description}</p>`;
    bookDescription.innerHTML = markup;
  };

  const closePopUp = () => {
    backdrop.classList.add('popup-is-hidden');

    btnClosePopUp.removeEventListener('click', closePopUp);
    backdrop.removeEventListener('click', backdropClickHandler);
    document.removeEventListener('keydown', keydownHandler);
  };

  const backdropClickHandler = event => {
    if (event.target === backdrop) {
      closePopUp();
    }
  };

  popUp.addEventListener('click', event => {
    event.stopPropagation();
  });

  const keydownHandler = e => {
    if (e.code === 'Escape') {
      closePopUp();
    }
  };

  const openPopUp = e => {
    if (e.target.closest('li')) {
      const bookId = e.target.closest('li').dataset.id;
      createPopUp(bookId);

      btnClosePopUp.addEventListener('click', closePopUp);
      backdrop.addEventListener('click', backdropClickHandler);
      document.addEventListener('keydown', keydownHandler);

      backdrop.classList.remove('popup-is-hidden');
    }
  };

  listBooks.addEventListener('click', openPopUp);
  listBooksInCategories.addEventListener('click', openPopUp);

  btnRemoveFromShoppingList.addEventListener('click', removeFromLocalStorage);
  btnAddToShoppingList.addEventListener('click', addToLocalStorage);
});
