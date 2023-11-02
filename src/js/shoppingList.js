import storageMethods from './storage-methods';
import amazonImage1 from '../images/shoppingList/amazon-shop-1x.png';
import amazonImage2 from '../images/shoppingList/amazon-shop-2x.png';
import appleImage1 from '../images/shoppingList/apple-shop-1x.png';
import appleImage2 from '../images/shoppingList/apple-shop-2x.png';
import bookshopImage1 from '../images/shoppingList/bookshop-1x.png';
import bookshopImage2 from '../images/shoppingList/bookshop-2x.png';

const shoppingListEl = document.querySelector('.shopping__cards');
const notificationContainerEl = document.querySelector('.shopping__storage');
// const shoppingHeadingEl = document.querySelector('.shopping__heading');
const shoppingBtnTrash = document.querySelector('.shopping__btn');
const SHOP_LIST_KEY = 'selected-books';

const logoTrashPath = new URL('/src/images/icons.svg', import.meta.url);
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
const loadFromLocalStorage = () => {
  let bookList = storageMethods.load(SHOP_LIST_KEY);
  if (bookList?.length > 0) {
    loadAndRenderBooks(bookList);
  }
};
loadFromLocalStorage();

setActiveState(navlinks);

function loadAndRenderBooks(data) {
  let booksDetails = data;
  const markup = booksDetails
    .map(
      ({
        _id,
        book_image,
        author,
        book_image_width,
        book_image_height,
        title,
        list_name,
        description,
        buy_links: [amazon, apple, , , bookshop],
      }) => {
        return `<li class="shopping__card" data-id="${_id}">
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
      <button type="button" class="shopping__btn" aria-label="Delete the book from shopping list">
        <svg class="shopping__btn-icon" width="18" height="18">
        <use href="${logoTrashPath}#icon-trash"></use>
        </svg>
      </button>
    </li>`;
      },
    )
    .join('');

  shoppingListEl.innerHTML = markup;
  const shoppingBtnTrash = document.querySelector('.shopping__btn');
  shoppingBtnTrash.addEventListener('click', onTrashClick);
  notificationContainerEl.style.display = 'none';
}

function cutNameCategory(name) {
  if (window.innerWidth <= 768) {
    if (name.length > 20) {
      return name.substring(0, 20) + '...';
    }
    return name;
  }
  return name;
}

function onTrashClick(e) {
  const target = e.target.closest('.shopping__btn');

  if (!target) {
    return;
  }
  //*
  const bookEl = target.closest('.shopping__card');
  const seekedId = bookEl.dataset.id.trim();
  //*
  // Find the index of the book to be removed
  //*
  const storedBookIds = storageMethods.load('selected-books');
  const removedElIndexFromStorage = storedBookIds.findIndex(id => id === seekedId);

  //* Remove the book from the array
  storedBookIds.splice(removedElIndexFromStorage, 1);
  //*
  storageMethods.save(SHOP_LIST_KEY, storedBookIds);
  // Retrieve stored book IDs from local storage

  // Check if the book ID was found in local storage
  if (removedElIndexFromStorage !== -1) {
    // Save the updated array to local storage
    storageMethods.save('selected-books', storedBookIds);

    // Remove the book element from the DOM
    console.log(bookEl);
    bookEl.remove();
    //---------------

    //--------------------
    if (SHOP_LIST_KEY.length === 0) {
      shoppingListEl.style.display = 'none';
      shoppingListEl.classList.add('container_inactive');
    }

    //----------------------
  } else {
    console.error('Book ID not found in local storage.');
  }
}
