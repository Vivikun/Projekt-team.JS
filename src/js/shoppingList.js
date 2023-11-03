import storageMethods from './storage-methods';
import amazonImage1 from '../images/shoppingList/amazon-shop-1x.png';
import amazonImage2 from '../images/shoppingList/amazon-shop-2x.png';
import appleImage1 from '../images/shoppingList/apple-shop-1x.png';
import appleImage2 from '../images/shoppingList/apple-shop-2x.png';
import bookshopImage1 from '../images/shoppingList/bookshop-1x.png';
import bookshopImage2 from '../images/shoppingList/bookshop-2x.png';
import { getBooksId } from './book-api';
import logoTrash from '/src/images/trash.svg';

const shoppingListEl = document.querySelector('.shopping__cards');
const notificationContainerEl = document.querySelector('.shopping__storage');

const SHOP_LIST_KEY = 'selected-books';

const navlinks = document.querySelectorAll('.navigation__link');

function setActiveState(elements) {
  elements.forEach((item, index) => {
    const href = item.getAttribute('href').match(/\/[a-z-]*.html/g);
    const windowHref = window.location.href.match(/Projekt-team.JS\/$/g);
    const windowHrefAfterRegistration = window.location.href.match(/Projekt-team.JS\/#$/g);
    const reg = window.location.href.match(/1234\/#$/g);
    if (
      window.location.href.includes(href) ||
      (window.location.href.includes(windowHref) && index === 0) ||
      (window.location.href.includes(windowHrefAfterRegistration) && index === 0) ||
      (window.location.href.includes(reg) && index === 0)
    ) {
      item.classList.add('is-activ');
    }
  });
}
const renderBooks = async () => {
  let bookIdList = storageMethods.load(SHOP_LIST_KEY);
  console.log(bookIdList);
  if (bookIdList?.length > 0) {
    bookIdList.forEach(async bookId => {
      const bookInfo = await getBooksId(bookId);
      loadAndRenderBooks(bookInfo);
    });
    shoppingListEl.addEventListener('click', onTrashClick);
  }
};

renderBooks();

setActiveState(navlinks);

function loadAndRenderBooks(booksDetails) {
  const {
    _id,
    book_image,
    author,
    book_image_width,
    book_image_height,
    title,
    list_name,
    description,
    buy_links: [amazon, apple, , , , bookshop],
  } = booksDetails;
  const markup = `<li class="shopping__card" id="${_id}">
      <div class="shopping__block">
        <div>
          <div class="shopping__thumb">
            <img src="${book_image}" alt="${list_name}" class="shopping__book-img" width="${book_image_width}" height="${book_image_height}"/>
          </div>
          </div>
          <div class="shopping__wrap">
          <h2 class="shopping__title">${title}</h2>
          <p class="shopping__category">${list_name}</p>
          <p class="shopping__book-description">${description}</p>
          <p class="shopping__book-author">${author}</p>
          <ul class="shopping__shops">
            <li class="shopping__shop">
              <a href="${amazon.url}" class="shopping__shop-link" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Amazon-book site">
                <img srcset="${amazonImage1} 1x, ${amazonImage2} 2x" src="${amazonImage1}" alt="${amazon.name}" class="shopping__shop-img" width="48" height="15"/>
              </a>
            </li>
            <li class="shopping__shop">
              <a href="${apple.url}" class="shopping__shop-link" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Apple-book site">
                <img srcset="${appleImage1} 1x, ${appleImage2} 2x" src="${appleImage1}" alt="${apple.name}" class="shopping__shop-img" width="28" height="27"/>
              </a>
            </li>
            <li class="shopping__shop">
              <a href="${bookshop.url}" class="shopping__shop-link" target="_blank" crossorigin="anonymous"  rel="noopener noreferrer" aria-label="Book-shop site">
                <img srcset="${bookshopImage1} 1x, ${bookshopImage2} 2x" src="${bookshopImage1}" alt="${bookshop.name}" class="shopping__shop-img" width="32" height="30"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button type="button" class="shopping__btn" data-id="${_id}" aria-label="Delete the book from shopping list"> 
   <img src="${logoTrash}"/>
      </button>
    </li>`;
  shoppingListEl.innerHTML += markup;
  notificationContainerEl.style.display = 'none';
}

function onTrashClick(e) {
  const target = e.target.closest('.shopping__btn');

  if (!target) {
    return;
  }

  const bookId = target.dataset.id;
  const storedBookIds = storageMethods.load('selected-books');
  const removedElIndexFromStorage = storedBookIds.indexOf(bookId);
  storedBookIds.splice(removedElIndexFromStorage, 1);
  storageMethods.save(SHOP_LIST_KEY, storedBookIds);
  const newStoredBookIds = storageMethods.load('selected-books');

  storageMethods.save('selected-books', storedBookIds);

  if (newStoredBookIds.length === 0) {
    notificationContainerEl.style.display = 'block';
    shoppingListEl.style.display = 'none';
    shoppingListEl.classList.add('container_inactive');
  }
  const bookToRemove = document.getElementById(bookId);

  bookToRemove.remove();
}
