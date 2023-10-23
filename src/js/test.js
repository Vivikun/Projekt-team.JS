fetch('https://books-backend.p.goit.global/books/top-books')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const booksContainer = document.getElementById('booksContainer');

    // Iteruj przez pierwsze 4 książki (lub mniej, jeśli są mniej dostępne)
    for (let i = 0; i < Math.min(4, data.length); i++) {
      const book = data[i];

      // Stworzenie kontenera dla pojedynczej książki
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');

      // Dodanie nazwy kategorii
      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = book.category;
      bookElement.appendChild(categoryTitle);

      // Dodanie obrazka okładki
      const coverImage = document.createElement('img');
      coverImage.src = book.cover;
      coverImage.alt = book.title;
      bookElement.appendChild(coverImage);

      // Dodanie autora
      const author = document.createElement('p');
      author.textContent = `Autor: ${book.author}`;
      bookElement.appendChild(author);

      // Dodanie tytułu
      const title = document.createElement('p');
      title.textContent = `Tytuł: ${book.title}`;
      bookElement.appendChild(title);

      // Dodanie przycisku "See More"
      const seeMoreButton = document.createElement('button');
      seeMoreButton.textContent = 'See More';
      seeMoreButton.addEventListener('click', () => {
        alert('Przekierowanie do pełnej listy książek z kategorii: ' + book.category);
      });
      bookElement.appendChild(seeMoreButton);

      // Dodanie książki do głównego kontenera
      booksContainer.appendChild(bookElement);
    }
  })
  .catch(error => {
    console.error('Wystąpił błąd podczas pobierania danych:', error);
  });
//------------------------------------//
import axios from 'axios';
import { getCategoryList, getTopBooks, getSelectedCategory } from './book-api';

const categoryList = document.getElementById('categoryList');
const popularBooks = document.getElementById('popularBooks');
// const categories = ['Kategoria 1', 'Kategoria 2', 'Kategoria 3', 'Kategoria 4'];

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
  //   async function fetchPopularBooks() {
  //     console.log('Dane z backendu:', data);
  //     try {
  //       const data = await getTopBooks();

  //       const bookLists = {}; // Obiekt, w którym grupujemy książki według list_name

  //       data.forEach(book => {
  //         const category = book.list_name; // Kategoria książki

  //         if (!bookLists[category]) {
  //           bookLists[category] = []; // Tworzymy pustą tablicę, jeśli kategoria nie istnieje w obiekcie
  //         }

  //         bookLists[category].push(book); // Dodajemy książkę do odpowiedniej kategorii
  //       });

  //       for (const category in bookLists) {
  //         if (Object.hasOwnProperty.call(bookLists, category)) {
  //           const bookList = document.getElementById(`book-list-${category}`);
  //           if (!bookList) {
  //             console.error(`book-list-${category} is null`);
  //             continue;
  //           }

  //           bookList.innerHTML = ''; // Czyścimy zawartość listy

  //           bookLists[category].forEach(book => {
  //             const bookElement = document.createElement('div');
  //             bookElement.textContent = `Tytuł: ${book.title}, Autor: ${book.author}`;
  //             bookList.appendChild(bookElement);
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Błąd podczas pobierania popularnych książek:', error);
  //     }
  //   }

  async function fetchPopularBooks() {
    try {
      const data = await getTopBooks();
      console.log('Dane z backendu:', data);

      const categories = data.map(book => book.list_name);
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
