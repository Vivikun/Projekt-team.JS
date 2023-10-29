import { getTopBooks, getBooksId } from './book-api';
import axios from 'axios';
import storageMethods from './storage-methods';
import amazonImage1 from '../images/shoppingList/amazon-shop-1x.png';
import amazonImage2 from '../images/shoppingList/amazon-shop-2x.png';
import appleImage1 from '../images/shoppingList/apple-shop-1x.png';
import appleImage2 from '../images/shoppingList/apple-shop-2x.png';
import bookshopImage1 from '../images/shoppingList/bookshop-1x.png';
import bookshopImage2 from '../images/shoppingList/bookshop-2x.png';

shoppingListEl: document.querySelector('.shopping__cards');
notificationContainerEl: document.querySelector('.shopping__storage');
shoppingHeadingEl: document.querySelector('.shopping__heading');
// logoTrashPath: new URL('../images/icons.svg', import.meta.url);
const logoTrashPath = '../images/icons.svg';
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

//Load ID from locale storage, fetch books props via API. Render markup
document.getElementById('load-books-and-render').addEventListener('click', loadAndRenderBooks);

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

    // Select the ul where you want to render the books
    const container = document.querySelector('.shopping__cards');

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
          <p class="shopping__book-author">${author}</p>
        </div>
        <div class="shopping__wrap">
          <h2 class="shopping__title">${title}</h2>
          <p class="shopping__category">${list_name}</p>
          <p class="shopping__book-description--tablet">${description}</p>
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
      <p class="shopping__book-description">${description}</p>
    </li>`;
        },
      )
      .join('');

    container.innerHTML = markup;
  } catch (error) {
    console.error('Error while loading and rendering books:', error);
  }
}

// ONTRASHCLICK
document.querySelector('.shopping__cards').addEventListener('click', onTrashClick);

function onTrashClick(e) {
  const target = e.target.closest('.shopping__btn');

  if (!target) {
    return;
  }

  const bookEl = target.closest('.shopping__card');
  const seekedId = bookEl.dataset.id.trim();

  // Retrieve stored book IDs from local storage
  const storedBookIds = storageMethods.load('selected-books');

  // Find the index of the book to be removed
  const removedElIndexFromStorage = storedBookIds.findIndex(id => id === seekedId);

  // Check if the book ID was found in local storage
  if (removedElIndexFromStorage !== -1) {
    // Remove the book from the array
    storedBookIds.splice(removedElIndexFromStorage, 1);

    // Save the updated array to local storage
    storageMethods.save('selected-books', storedBookIds);

    // Remove the book element from the DOM
    bookEl.remove();
  } else {
    console.error('Book ID not found in local storage.');
  }
}

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
// pobiez top books i wyswietl prosty markup
// const fetchBooksButton = document.getElementById('fetchBooks');
// fetchBooksButton.addEventListener('click', displayBooks);

// function displayBooks() {
//   const booksContainer = document.getElementById('books-container');

//   getTopBooks()
//     .then(response => {
//       console.log(response);
//       const list = response[0];
//       if (!list || !list.books) {
//         console.error('Nie znaleziono książek.');
//         return;
//       }
//       const books = list.books;
//       books.slice(0, 5).forEach(book => {
//         const bookElement = document.createElement('div');
//         bookElement.innerHTML = `
//             <h3>${book.title}</h3>
//             <img src="${book.book_image}" alt="${book.title}" width="${
//           book.book_image_width
//         }" height="${book.book_image_height}">
//             <p>Author: ${book.author}</p>
//             <p>${book.description}</p>
//             <div class="buy-links">
//               ${book.buy_links
//                 .map(
//                   link => `
//                 <a href="${link.url}" target="_blank">Buy on ${link.name}</a>
//               `,
//                 )
//                 .join('')}
//             </div>
//           `;
//         booksContainer.appendChild(bookElement);
//       });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

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
// async function loadAndRenderBooks() {
//   try {
//     // Retrieve stored book IDs from local storage
//     const storedBookIds = storageMethods.load('selected-books');
//     if (!storedBookIds || storedBookIds.length === 0) {
//       console.error('No book IDs found in local storage.');
//       return;
//     }

//     // Fetch details for each book using the IDs
//     const booksDetails = await Promise.all(storedBookIds.map(id => getBooksId(id)));

//     // Log the fetched details for debugging
//     console.log('Fetched book details:', booksDetails);

//     // Select the div where you want to render the books
//     const container = document.getElementById('render-books');

//     booksDetails.forEach(book => {
//       const {
//         _id,
//         book_image,
//         author,
//         book_image_width,
//         book_image_height,
//         title,
//         list_name,
//         description,
//         buy_links,
//       } = book;

//       // Extract the buy links for the desired platforms
//       const amazonLink = buy_links.find(link => link.name === 'Amazon');
//       const appleLink = buy_links.find(link => link.name === 'Apple');
//       const bookshopLink = buy_links.find(link => link.name === 'Bookshop');

//       // Create the book card element
//       const bookElement = document.createElement('div');
//       bookElement.classList.add('book');
//       bookElement.innerHTML = `
//                 <img src="${book_image}" alt="${title}" width="${book_image_width}" height="${book_image_height}" />
//                 <h3>${title}</h3>
//                 <p>Author: ${author}</p>
//                 <p>List Name: ${list_name}</p>
//                 <p>Description: ${description}</p>
//                 <a href="${amazonLink ? amazonLink.url : '#'}">Buy on Amazon</a>
//                 <a href="${appleLink ? appleLink.url : '#'}">Buy on Apple</a>
//                 <a href="${bookshopLink ? bookshopLink.url : '#'}">Buy on Bookshop</a>
//             `;
//       container.appendChild(bookElement);
//     });
//   } catch (error) {
//     console.error('Error while loading and rendering books:', error);
//   }
// }
