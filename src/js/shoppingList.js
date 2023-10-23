import { getTopBooks } from './book-api';

async function fetchAndLogTopBooks() {
  try {
    const books = await getTopBooks();

    console.log('Top books:', books);
  } catch (error) {
    console.error('Error fetching top books:', error);
  }
}

const fetchBooksButton = document.getElementById('fetchBooks');

fetchBooksButton.addEventListener('click', function () {
  fetchAndLogTopBooks();
});
