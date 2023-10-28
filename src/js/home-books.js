import { getTopBooks } from './book-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const booksContainer = document.querySelector('.books-container');

  const booksData = await getTopBooks();

  booksData.forEach(category => {
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category.list_name;
    categoryTitle.classList.add('category-name');

    const categoryBooks = document.createElement('ul');
    categoryBooks.classList.add('category-books');

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
  });
});
