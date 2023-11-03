import { getCategoryList, getSelectedCategory, getTopBooks } from './book-api';
import Notiflix from 'notiflix';
export { showTypeBook, markupTopBooksByType };
const homeContainer = document.querySelector('.home__category-container');
const categoriesList = document.querySelector('.categories-list');
const homeBooksByType = document.querySelector('.home-typeBook');

const renderCategories = async () => {
  try {
    const category = await getCategoryList();
    categoriesList.innerHTML = await markupCategoriesList(category);
    const ListCategory = document.querySelectorAll('.category-item');
    ListCategory.forEach(itemCategory => {
      itemCategory.addEventListener('click', event => {
        const ActiveCategory = document.querySelector('.category-item.active');
        if (ActiveCategory) {
          ActiveCategory.classList.remove('active');
        }
        event.target.classList.add('active');
        showTypeBook(event.target.dataset.id);
      });
    });
  } catch (error) {
    Notiflix.Notify.failure(`Oops! Something went wrong.`);
  }
};
renderCategories();
function markupCategoriesList(categories) {
  return `<a href="/src/index.html" class="category-item--all"><li data-id="all-categories">
        All categories</li></a>
        ${categories
          .map(
            category =>
              `<li class="category-item" data-id="${category.list_name}">
        ${category.list_name}
        </li>`,
          )
          .join('')}`;
}
const showTypeBook = async type => {
  const typeBooksMore = await getSelectedCategory(type);
  homeContainer.classList.remove('container_active');
  homeBooksByType.classList.add('container_active');
  homeBooksByType.innerHTML = markupTopBooksByType(typeBooksMore, type);
};
function markupTopBooksByType(data, typeBooks) {
  if (data.length > 0) {
    return `<h2 class="home-heading">${typeBooks.substring(
      0,
      typeBooks.lastIndexOf(' '),
    )}<span class="home-heading_custom"> ${typeBooks.split(' ').pop()}</span></h2>
        <ul class="book-item__list">
        ${data
          .map(
            book => `<li class="book-item" data-id="${book._id}">
            <a href="#" rel="noopener noreferrer" data-id='${book._id}'>
            <div>
            <img
                src="${book.book_image}"
                alt="${book.title}"
                class="book-item_image"
                width="180"
                height="256"
                loading="lazy"
                data-id="${book._id}"
            />
            </div>
            <div>
            <h3 class="book-item_title">${book.title}</h3>
            <p class="book-item_author">
            ${book.author}
            </p>
            </div>
            </a>
            </li>`,
          )
          .join('')}
         </ul>`;
  } else {
    Notiflix.Notify.failure(`Not found`);
  }
}