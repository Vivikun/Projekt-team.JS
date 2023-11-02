'use strict';
import { getBooksId } from './book-api';
import Notiflix from 'notiflix';
import LsService from './storage-methods';

import amazonImage1 from '/src/images/shoppingList/amazon-shop-1x.png';
import amazonImage2 from '/src/images/shoppingList/amazon-shop-2x.png';
import appleImage1 from '/src/images/shoppingList/apple-shop-1x.png';
import appleImage2 from '/src/images/shoppingList/apple-shop-2x.png';
import bookshopImage1 from '/src/images/shoppingList/bookshop-1x.png';
import bookshopImage2 from '/src/images/shoppingList/bookshop-2x.png';
import bookshopImage2 from '/src/images/shoppingList/bookshop-2x.png';
// document.addEventListener('DOMContentLoaded', () => {
//   let currentBookData = null;
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
const popupText = document.querySelector('.popup__text');

const listBooks = document.querySelector('.books-container'); //*
const listBooksInCategories = document.querySelector('.home-typeBook'); //*

const modalPopEl = document.querySelector('[data-modal]');

async function createPopUp(id) {
  // modalPopEl.innerHTML = '';
  try {
    const booksDetails1 = await getBooksId(id);
    LsService.save('active-book', booksDetails1);
    LsService.load('selected-books')?.find(el => el._id === booksDetails1._id);

    const {
      _id,
      book_image,
      author,
      title,
      description,
      buy_links: [amazon, apple, , , bookshop],
    } = booksDetails1;

    // if (description === '') {
    //   popupText.innerHTML = 'there is no description of this book'; 
    // } else {
    //   popupText.innerHTML = description;
    // }

    const isActivBook = Boolean(LsService.load('selected-books')?.find(el => el._id === booksDetails1._id));

    const markup = `<div class="modal-info" data-id="${_id}">
     <img class="modal-info__image" src="${book_image}" alt="${title}" />
      <div class="modal-info__box">
       <h2 class="popup__title">${title}</h2>
       <p class="popup__author">${author}</p>
       <p class="popup__text">${description}</p>
       <ul>
       <li>
       <a class="modal-info__link" href="${amazon.url}" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Amazon">
       <img srcset="${amazonImage1} 1x, ${amazonImage2} 2x" src="${amazonImage1}" alt="amazon" />
       </a>
       </li> 
       <li>
       <a class="modal-info__link" href="${apple.url}" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Apple-books">      
       <img srcset="${appleImage1} 1x, ${appleImage2} 2x" src="${appleImage1}" alt="apple-books" />
       </a>
       </li>
       <li>
       <a class="modal-info__link" href="${bookshop.url}" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Bookshop">         
       <img srcset="${bookshopImage1} 1x, ${bookshopImage2} 2x" src="${bookshopImage1}" alt="bookshop" />
       </a>
       </li>
       </ul>
       </div>
       </div>
       <button class="modal-info__button">
       ${isActivBook ? 'remove from the shopping list' : 'add to shopping list'}
       </button>`;

    modalPopEl.innerHTML = markup;

    const linksShops = document.querySelectorAll('.modal-info__link');
    onLinksClick(linksShops);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      `Oops! Something went wrong. You caught the following error: ${error.message}.`,
    );
  }
}
function onLinksClick(links) {
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    link.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(this.href);
    });
  }
}

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
  e.preventDefault();
  if (!e.target.closest('li')) return;

  const bookId = e.target.dataset.id;

  btnClosePopUp.addEventListener('click', closePopUp);
  backdrop.addEventListener('click', backdropClickHandler);
  document.addEventListener('keydown', keydownHandler);

  backdrop.classList.remove('popup-is-hidden');
  createPopUp(bookId);
};

listBooks.addEventListener('click', openPopUp);
listBooksInCategories.addEventListener('click', openPopUp);

// btnRemoveFromShoppingList.addEventListener('click', removeFromLocalStorage);
// btnAddToShoppingList.addEventListener('click', addToLocalStorage);
