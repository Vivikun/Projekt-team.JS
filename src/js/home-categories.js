import { getCategoryList, getSelectedCategory } from './book-api';
import Notiflix from 'notiflix';

export { showTypeBook, markupTopBooksByType };
//----------------------------------------------
const homeContainer = document.querySelector('.home__category-container');
const categoriesList = document.querySelector('.categories-list');
const homeBooksByType = document.querySelector('.home-typeBook');
//------------------------------------------------
const createTopBooksMarkup = async () => { //do BEST SELLERS BOOKS
    let markup = await getTopBooks();
    markup = markup.map(el => {
      return { ...el, books: el.books };
    });
}
//----------------------------------------
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
  
          if (event.target.dataset.id === 'all-categories') {
            createTopBooksMarkup();
          } else {
            showTypeBook(event.target.dataset.id);
          }
        })
    })
          } catch (error) {
      Notiflix.Notify.failure(
        `Oops! Something went wrong.`
      )}
  };

renderCategories();

function markupCategoriesList(categories) {
  return `<li class="category-item active" data-id="all-categories">
        All categories</li>
        ${categories.map(category =>
             `<li class="category-item" data-id="${category.list_name}">
        ${category.list_name}
        </li>`
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
    return `<h3>${typeBooks.substring(
      0,
      typeBooks.lastIndexOf(' ')
    )}<span> ${typeBooks
      .split(' ')
      .pop()}</span></h3>
        <ul>
        ${data
          .map(
            book => `<li>
            <a href="#" rel="noopener noreferrer" data-id='${book._id}'>
            <div>
            <img
                src="${book.book_image}"
                alt="${book.title}"
                width="180"
                height="256"
                loading="lazy"               
            />
            <div>
            <p>Quick view</p>
            </div> 
            </div>
            <div>
            <h3">${book.title}</h3>
            <p class="books__card-author">
            ${book.author}
            </p>
            </div>
            </a>
            </li>`
          )
          .join('')}
         </ul>`;
  } else {
    Notiflix.Notify.failure(`Not found`);
  }
}