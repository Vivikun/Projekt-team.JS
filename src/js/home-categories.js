import { getCategoryList, getSelectedCategory, getTopBooks } from './book-api';
import Notiflix from 'notiflix';

const homeContainer = document.querySelector('.home__category-container');
const categoriesList = document.querySelector('.categories-list');
const homeBooksByType = document.querySelector('.home-typeBook');
const layout = document.querySelector('.layout');
export { showTypeBook, markupTopBooksByType };
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
          homeBooksByType.innerHTML = '';
          loadBooks();
        } else {
          showTypeBook(event.target.dataset.id);
        }
      });
    });
  } catch (error) {
    Notiflix.Notify.failure(`Oops! Something went wrong.`);
  }
};
function markupCategoriesList(categories) {
  return `<li data-id="all-categories" class="category-item">
        All categories</li>
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
export const loadBooks = async () => {
  const titleMarkup = `<h2 class="home-heading">Best Sellers <span class="home-heading_custom">Books</span></h2>`;
  homeBooksByType.innerHTML = titleMarkup;
  const booksData = await getTopBooks();
  booksData.forEach(category => {
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category.list_name;
    categoryTitle.classList.add('category-name');
    const categoryBooks = document.createElement('ul');
    categoryBooks.classList.add('category-books');
    const seeMoreButton = document.createElement('button');
    seeMoreButton.textContent = 'See More';
    seeMoreButton.classList.add('see-more-button');
    seeMoreButton.dataset.categoryId = category.list_name;
    category.books.forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.classList.add('book-item');
      bookItem.innerHTML = `
          <img class="book-item_image" src="${book.book_image}" alt="${book.title}" data-id="${book._id}">
          <h3 class="book-item_title">${book.title}</h3>
          <p class="book-item_author">${book.author}</p>
        `;
      categoryBooks.appendChild(bookItem);
    });
    seeMoreButton.addEventListener('click', async event => {
      const categoryId = event.target.dataset.categoryId;
      homeBooksByType.style.display = 'none';
      const selectedCategoryData = await getSelectedCategory(categoryId);
      renderSelectedCategory(selectedCategoryData);
    });
    homeBooksByType.append(categoryTitle);
    homeBooksByType.append(categoryBooks);
    homeBooksByType.append(seeMoreButton);
    // console.log(booksContainer);
  });
};
function handleScreenSizeChange() {
  const screenWidth = window.innerWidth;
  const categoryItems = document.querySelectorAll('.category-books');
  categoryItems.forEach(category => {
    const books = category.querySelectorAll('.book-item');
    if (screenWidth <= 767) {
      books.forEach((book, index) => {
        if (index > 0) {
          book.style.display = 'none';
        }
      });
    } else if ((screenWidth >= 768) & (screenWidth <= 1199)) {
      books.forEach((book, index) => {
        if (index > 2) {
          book.style.display = 'none';
        }
      });
    } else {
      books.forEach(book => {
        book.style.display = 'block';
      });
    }
  });
}
function renderSelectedCategory(selectedCategoryData) {
  if (selectedCategoryData) {
    const selectedCategorySection = document.createElement('div');
    selectedCategorySection.classList.add('selected-category-section');
    const selectedCategoryTitle = document.createElement('h1');
    selectedCategoryTitle.textContent = selectedCategoryData[0].list_name;
    selectedCategorySection.appendChild(selectedCategoryTitle);
    const selectedBookList = document.createElement('ul');
    selectedBookList.classList.add('book-item__list');
    selectedCategorySection.appendChild(selectedBookList);
    selectedCategoryData.forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.classList.add('book-item');
      bookItem.setAttribute('data-id', book._id);
      bookItem.innerHTML = `
        <img class="book-item_image" src="${book.book_image}" alt="${book.title}" data-id="${book._id}">
        <h3 class="book-item_title">${book.title}</h3>
        <p class="book-item_author">${book.author}</p>`;
      selectedBookList.appendChild(bookItem);
    });
    layout.appendChild(selectedCategorySection);
  }
}
renderCategories();