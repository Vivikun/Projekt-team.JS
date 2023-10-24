import axios from 'axios';
import { getCategoryList, getTopBooks, getSelectedCategory } from './book-api';
const categoryList = document.getElementById('categoryList');
const popularBooks = document.getElementById('popularBooks');
const categories = ['Kategoria 1', 'Kategoria 2', 'Kategoria 3', 'Kategoria 4']; // Przykładowe kategorie
document.addEventListener('DOMContentLoaded', function () {
  async function fetchCategories() {
    try {
      const data = await getCategoryList();
      const categoryItems = data.map((category, index) => {
        return `<li data-category="${index}">${category.list_name}</li>`;
      });
      categoryList.innerHTML = categoryItems.join('');
    } catch (error) {
      console.error('Błąd podczas pobierania kategorii:', error);
    }
  }
  async function fetchPopularBooks() {
    try {
      const data = await getTopBooks();
      console.log('Dane z backendu:', data);
      categories.forEach((_, index) => {
        const bookList = document.getElementById(`book-list-${index}`);
        if (!bookList) {
          console.error(`book-list-${index} is null`);
          return;
        }
        bookList.innerHTML = '';
      });
      data.forEach((book, index) => {
        const categoryIndex = index % categories.length;
        const bookList = document.getElementById(`book-list-${categoryIndex}`);
        if (!bookList) {
          console.error(`book-list-${categoryIndex} is null`);
          return;
        }
        const bookElement = document.createElement('div');
        bookElement.textContent = `Tytuł: ${book.title}, Autor: ${book.author}`;
        bookList.appendChild(bookElement);
      });
    } catch (error) {
      console.error('Błąd podczas pobierania popularnych książek:', error);
    }
  }

  async function displayCategoryBooks(categoryIndex) {
    try {
      const categoryBooks = await getSelectedCategory(categoryIndex);
      const categorySection = document.getElementById(`category-${categoryIndex}`);
      if (!categorySection) {
        console.error(`category-${categoryIndex} is null`);
        return;
      }
      const bookList = categorySection.querySelector('.book-list');
      if (!bookList) {
        console.error('Book list is missing in the category section.');
        return;
      }
      bookList.innerHTML = '';
      categoryBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.textContent = `Tytuł: ${book.title}, Autor: ${book.author}`;
        bookList.appendChild(bookElement);
      });
      popularBooks.style.display = 'none';
      categorySection.style.display = 'block';
    } catch (error) {
      console.error('Błąd podczas pobierania książek z wybranej kategorii:', error);
    }
  }
  fetchCategories();
  fetchPopularBooks();
  categoryList.addEventListener('click', async event => {
    if (event.target.tagName === 'LI') {
      const categoryIndex = event.target.dataset.category;
      try {
        displayCategoryBooks(categoryIndex);
      } catch (error) {
        console.error('Błąd podczas pobierania książek z wybranej kategorii:', error);
      }
    }
  });
  popularBooks.addEventListener('click', event => {
    if (event.target.classList.contains('see-more__btn')) {
      const categoryIndex = event.target.dataset.category;
      const categorySection = document.getElementById(`category-${categoryIndex}`);
      popularBooks.style.display = 'none';
      categorySection.style.display = 'block';
    }
  });
});
//
