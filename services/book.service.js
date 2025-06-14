import { loadFromStorage, makeId, saveToStorage } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const BOOK_KEY = "bookDB";
_createBooks();

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
};

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i");
      books = books.filter((book) => regExp.test(book.vendor));
    }
    if (filterBy.minSpeed) {
      books = books.filter((book) => book.speed >= filterBy.minSpeed);
    }
    return books;
  });
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId);
}

function remove(bookId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}

function getEmptyBook(vendor = "", speed = "") {
  return { vendor, speed };
}

function getDefaultFilter() {
  return { txt: "", minSpeed: "" };
}

function _setNextPrevBookId(book) {
  return query().then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id);
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0];
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1];
    book.nextBookId = nextBook.id;
    book.prevBookId = prevBook.id;
    return book;
  });
}

function _createBooks() {
  let books = loadFromStorage(BOOK_KEY);
  if (!books || !books.length) {
    const ctgs = ["Love", "Fiction", "Poetry", "Computers", "Religion"];
    const books = [];
    for (let i = 0; i < 20; i++) {
      const book = {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [
          ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)],
        ],
        thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
        language: "en",
        listPrice: {
          amount: utilService.getRandomIntInclusive(80, 500),
          currencyCode: "EUR",
          isOnSale: Math.random() > 0.7,
        },
      };
      books.push(book);
    }
    console.log("books", books);
    saveToStorage(BOOK_KEY, books);
  }
}

function _createBook(vendor, speed = 250) {
  const book = getEmptyBook(vendor, speed);
  book.id = makeId();
  return book;
}
