import { getTopBooks, getSelectedCategory } from './book-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const layout = document.querySelector('.layout');
  const booksContainer = document.querySelector('.books-container');
  const homeBooksByType = document.querySelector('.home-typeBook');
  let selectedCategoryData = null;

  const booksData = await getTopBooks();

  booksData.forEach(category => {
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category.list_name;
    categoryTitle.classList.add('category-name');

    const categoryBooks = document.createElement('ul');
    categoryBooks.classList.add('category-books');

    //UUdodanie przycisku "see more"//
    const seeMoreButton = document.createElement('button');
    seeMoreButton.textContent = 'See More';
    seeMoreButton.classList.add('see-more-button');
    seeMoreButton.dataset.categoryId = category.list_name;
    //obsluga przycisku 'see more'

    seeMoreButton.addEventListener('click', async event => {
      const categoryId = event.target.dataset.categoryId;
      homeBooksByType.style.display = 'none';
      selectedCategoryData = await getSelectedCategory(categoryId);
      renderSelectedCategory();
    });
    //
    category.books.forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.classList.add('book-item');
      bookItem.innerHTML = `
        <img class="book-item_image" src="${book.book_image}" alt="${book.title}">
        <h3 class="book-item_title">${book.title}</h3>
        <p class="book-item_author"> ${book.author}</p>
      `;
      categoryBooks.appendChild(bookItem);
    });
    booksContainer.appendChild(categoryTitle);
    booksContainer.appendChild(categoryBooks);
    booksContainer.appendChild(seeMoreButton);
  });
  function renderSelectedCategory() {
    if (selectedCategoryData) {
      const selectedCategorySection = document.createElement('div');
      selectedCategorySection.classList.add('selected-category-section');
      const selectedCategoryTitle = document.createElement('h1');
      selectedCategoryTitle.textContent = selectedCategoryData[0].list_name;
      selectedCategorySection.appendChild(selectedCategoryTitle);
      selectedCategoryData.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
          <img class="book-item_image" src="${book.book_image}" alt="${book.title}">
          <h3 class="book-item_title">${book.title}</h3>
          <p class="book-item_author">${book.author}</p>
        `;
        selectedCategorySection.appendChild(bookItem);
      });
      layout.appendChild(selectedCategorySection);
    }
  }
});
