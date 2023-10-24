import { getTopBooks } from './book-api';
import axios from 'axios';
import storageMethods from './storage-methods';

const fetchBooksButton = document.getElementById('fetchBooks');
fetchBooksButton.addEventListener('click', displayBooks);
//---------------------
// importowanie ksiazek toopbooks
// async function fetchAndLogTopBooks() {
//   try {
//     const books = await getTopBooks();

//     console.log('Top books:', books);
//   } catch (error) {
//     console.error('Error fetching top books:', error);
//   }
// }

// const fetchBooksButton = document.getElementById('fetchBooks');

// fetchBooksButton.addEventListener('click', function () {
//   fetchAndLogTopBooks();
// });
//---------------------

//---------------------
//wyswietla propsy V2
// function displayBooks() {
//   const booksContainer = document.getElementById('books-container');

//   getTopBooks()
//     .then(response => {
//       console.log(response);
//       const list = response.find(list => list.list_name === 'Advice How-To and Miscellaneous');
//       if (!list || !list.books) {
//         console.error('No books found for the specified list name.');
//         return;
//       }
//       const books = list.books;
//       books.slice(0, 5).forEach(book => {
//         const bookElement = document.createElement('div');
//         bookElement.innerHTML = `
//             <h3>${book.title}</h3>
//             <img src="${book.book_image}" alt="${book.title}" width="${book.book_image_width}" height="${book.book_image_height}">
//             <p>Author: ${book.author}</p>
//             <p>${book.description}</p>
//             <a href="${book.amazon_product_url}" target="_blank">Buy on Amazon</a>
//           `;
//         booksContainer.appendChild(bookElement);
//       });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
//---------------------
// pobiez top books i wyswietl prosty markup
function displayBooks() {
  const booksContainer = document.getElementById('books-container');

  getTopBooks()
    .then(response => {
      console.log(response);
      const list = response[0];
      if (!list || !list.books) {
        console.error('Nie znaleziono książek.');
        return;
      }
      const books = list.books;
      books.slice(0, 5).forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <img src="${book.book_image}" alt="${book.title}" width="${
          book.book_image_width
        }" height="${book.book_image_height}">
            <p>Author: ${book.author}</p>
            <p>${book.description}</p>
            <div class="buy-links">
              ${book.buy_links
                .map(
                  link => `
                <a href="${link.url}" target="_blank">Buy on ${link.name}</a>
              `,
                )
                .join('')}
            </div>
          `;
        booksContainer.appendChild(bookElement);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

//--------------------
//Pobierz 5 top books i zapisz w local storage
// function saveTopBooks() {
//   getTopBooks()
//     .then(response => {
//       const list = response[0];
//       if (!list || !list.books) {
//         console.error('Nie znaleziono książek.');
//         return;
//       }
//       const books = list.books;
//       const topFiveBooks = books.slice(0, 5);
//       const topFiveBookIds = topFiveBooks.map(book => book._id);
//       console.log('Pierwsze pięć ID książek:', topFiveBookIds);
//       storageMethods.save('selected-books', topFiveBookIds);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

function saveTopBooks() {
  getTopBooks()
    .then(response => {
      console.log(response);
      const list = response[0];
      if (!list || !list.books) {
        console.error('Nie znaleziono książek.');
        return;
      }
      const books = list.books;
      const bookIds = books.map(book => book._id);
      console.log('ID wszystkich książek z listy:', bookIds);
      storageMethods.save('selected-books', bookIds);
    })
    .catch(error => {
      console.log(error);
    });
}

document.getElementById('save-books-button').addEventListener('click', saveTopBooks);
