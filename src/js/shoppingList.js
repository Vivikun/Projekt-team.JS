import { getTopBooks, getBooksId } from './book-api';
import axios from 'axios';
import storageMethods from './storage-methods';

const fetchBooksButton = document.getElementById('fetchBooks');
fetchBooksButton.addEventListener('click', displayBooks);
//---------------------
// importowanie ksiazek toopbooks aaa
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

// function saveTopBooks() {
//   getTopBooks()
//     .then(response => {
//       console.log(response);
//       const list = response[0];
//       if (!list || !list.books) {
//         console.error('Nie znaleziono książek.');
//         return;
//       }
//       const books = list.books;
//       const bookIds = books.map(book => book._id);
//       console.log('ID wszystkich książek z listy:', bookIds);
//       storageMethods.save('selected-books', bookIds);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
//------------------
//pobierz i zapisz ID wszystkich ksiazek do local storage

function saveTopBooks() {
  getTopBooks()
    .then(response => {
      console.log(response);
      if (!response || response.length === 0) {
        console.error('Nie znaleziono listy książek.');
        return;
      }

      const allBookIds = [];

      response.forEach(list => {
        if (list.books && list.books.length > 0) {
          const bookIds = list.books.map(book => book._id);
          allBookIds.push(...bookIds);
        }
      });

      console.log('ID wszystkich książek z listy:', allBookIds);
      storageMethods.save('selected-books', allBookIds);
    })
    .catch(error => {
      console.log(error);
    });
}

document.getElementById('save-books-button').addEventListener('click', saveTopBooks);

// Wykorzystanie innerHTML w celu tworzenia elementów HTML z kodem źródłowym może być podatne na ataki XSS (Cross-Site Scripting), jeśli dane pochodzą od użytkowników lub są niezaufane.
//  Możesz rozważyć użycie bardziej bezpiecznych metod, takich jak document.createElement, aby utworzyć elementy HTML.
// Przed użyciem wartości z obiektu book, upewnij się, że dane są bezpieczne i nie zawierają niebezpiecznych skryptów.

// zaladuj id z local storage i pobierz dane o tych ksiazkach z api.
// async function loadAndRenderBooks() {
//   try {
//     // Load book ids from local storage
//     const bookIds = storageMethods.load('selected-books');

//     if (!bookIds || bookIds.length === 0) {
//       console.error('No books found in local storage.');
//       return;
//     }

//     // Fetch details for each book id
//     const bookPromises = bookIds.map(id => getBooksId(id));
//     const booksData = await Promise.all(bookPromises);

//     console.log('Books Data from API:', booksData); // Added this log to display all books data

//     // Render the markup for each book (as per your requirements)
//     // booksData.forEach(book => {
//     //   console.log('Individual Book Data:', book); // Logging each book data
//     //   // Replace this with your rendering logic if needed
//     // });
//   } catch (error) {
//     console.error('Error while loading and rendering books:', error);
//   }
// }

// document.getElementById('load-books-and-render').addEventListener('click', loadAndRenderBooks);

//--------------------
async function loadAndRenderBooks() {
  try {
    // Retrieve stored book IDs from local storage
    const storedBookIds = storageMethods.load('selected-books');
    if (!storedBookIds || storedBookIds.length === 0) {
      console.error('No book IDs found in local storage.');
      return;
    }

    // Fetch details for each book using the IDs
    const booksDetails = await Promise.all(storedBookIds.map(id => getBooksId(id)));

    // Log the fetched details for debugging
    console.log('Fetched book details:', booksDetails);

    // Select the div where you want to render the books
    const container = document.getElementById('render-books');

    booksDetails.forEach(book => {
      const {
        _id,
        book_image,
        author,
        book_image_width,
        book_image_height,
        title,
        list_name,
        description,
        buy_links,
      } = book;

      // Extract the buy links for the desired platforms
      const amazonLink = buy_links.find(link => link.name === 'Amazon');
      const appleLink = buy_links.find(link => link.name === 'Apple');
      const bookshopLink = buy_links.find(link => link.name === 'Bookshop');

      // Create the book card element
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
      bookElement.innerHTML = `
                <img src="${book_image}" alt="${title}" width="${book_image_width}" height="${book_image_height}" />
                <h3>${title}</h3>
                <p>Author: ${author}</p>
                <p>List Name: ${list_name}</p>
                <p>Description: ${description}</p>
                <a href="${amazonLink ? amazonLink.url : '#'}">Buy on Amazon</a>
                <a href="${appleLink ? appleLink.url : '#'}">Buy on Apple</a>
                <a href="${bookshopLink ? bookshopLink.url : '#'}">Buy on Bookshop</a>
            `;
      container.appendChild(bookElement);
    });
  } catch (error) {
    console.error('Error while loading and rendering books:', error);
  }
}

document.getElementById('load-books-and-render').addEventListener('click', loadAndRenderBooks);
