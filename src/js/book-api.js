//------------ import axios ---------------------------
import axios from 'axios';


const URL = 'https://books-backend.p.goit.global';
const CATEGORY_LIST = '/books/category-list';
const TOP_BOOKS = '/books/top-books';
const SELECTED_CATEGORY = '/books/category';
const BOOKS_ID = '/books';

axios.defaults.baseURL = URL;

//---------(1)--getCategoryList()-----------------------

async function getCategoryList() {
    const { data } = await axios.get(CATEGORY_LIST);
    return data;
}
//---------(2)--getTopBooks()-----------------------------

async function getTopBooks() {
    const { data } = await axios.get(TOP_BOOKS);
    return data;
}

//---------(3)--getSelectedCategory()-----------------------

async function getSelectedCategory(category) {
    const { data } = await axios.get(SELECTED_CATEGORY, {
        params: {
            category,
        },
    });
    return data;
}

//---------(4)--getBooksId()--------------------------------

async function getBooksId(id) {
    const { data } = await axios.get(`${BOOKS_ID}/${id}`);
    return data;
}

//----------------- export ---------------------------------

export { getCategoryList, getSelectedCategory, getTopBooks, getBooksId };