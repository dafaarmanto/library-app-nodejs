const { existsSync, mkdirSync, writeFileSync, readFileSync } = require('fs');
const { v4: uuidv4 } = require('uuid');
const { redBright, blueBright, greenBright } = require('./colors');

const dirPath = './data';
if (!existsSync(dirPath)) mkdirSync(dirPath);

const filePath = './data/library.json';
if (!existsSync(filePath)) writeFileSync(filePath, '[]', 'utf-8');

const loadBooks = () => {
  const buffer = readFileSync(filePath, 'utf-8');
  const books = JSON.parse(buffer);

  return books;
};

const addBook = (title, author) => {
  let book = {
    isbn: uuidv4(),
    title,
    author,
    status: 'BOOK AVAILABLE',
    borrowedBy: 'None',
    lastBorrowedBy: 'None',
  };

  const books = loadBooks();

  // Check book duplicate
  const duplicate = books.find((book) => book.title === title);
  if (duplicate) {
    redBright('Book already exists, try adding another book');
    return false;
  }

  books.push(book);
  writeFileSync(filePath, JSON.stringify(books, null, 2));

  greenBright('BOOK ADDED');
};

const bookDetail = (title) => {
  const books = loadBooks();
  const book = books.find(
    (book) => book.title.toLowerCase() === title.toLowerCase()
  );

  if (!book) {
    redBright(`We cannot find a book by title: ${title}`);
    return false;
  }

  if (book.status === 'BOOK BORROWED') {
    redBright(`Title: ${book.title}`);
  } else {
    greenBright(`Title: ${book.title}`);
  }

  console.log(`Author: ${book.author}`);
  console.log(`Status: ${book.status}`);
  console.log(`Borrowed by: ${book.borrowedBy}`);
  console.log(`Last Borrowed by: ${book.lastBorrowedBy}`);
};

const status = (name) => {
  const books = loadBooks();
  const list = books.filter((user) => user.borrowedBy === name);

  greenBright(`${list.length} books borrowed by: ${name}`);

  list.forEach((user) => {
    let userTitle = user.title;

    console.log(`- ${userTitle}`);
  });
};

const borrowBook = (name, title) => {
  const books = loadBooks();
  const book = books.find((book) => book.title === title);

  if (book.status === 'BOOK BORROWED') {
    redBright("THIS BOOK ISN'T AVAILABLE RIGHT NOW");
    return false;
  }

  book.status = 'BOOK BORROWED';
  book.borrowedBy = name;
  writeFileSync(filePath, JSON.stringify(books, null, 2));
};

const returnBook = (name, title) => {
  const books = loadBooks();
  const book = books.find((book) => book.title === title);

  if (name === book.borrowedBy) {
    book.status = 'BOOK AVAILABLE';
    book.borrowedBy = 'None';
    book.lastBorrowedBy = name;

    writeFileSync(filePath, JSON.stringify(books, null, 2));
  } else {
    redBright(`The book must be returned by the book borrower`);
  }
};

const listBooks = () => {
  const books = loadBooks();

  blueBright('List of books');

  books.forEach((book, index) => {
    console.log(
      `${index + 1}. ${book.isbn} - ${book.title} by ${book.author} - ${
        book.status
      }`
    );
  });
};

const removeBook = (title) => {
  const books = loadBooks();

  const newList = books.filter(
    (book) => book.title.toLowerCase() !== title.toLowerCase()
  );

  if (books.length === newList.length) {
    redBright(`We cannot find a book by title: ${title}`);
    return false;
  }

  writeFileSync(filePath, JSON.stringify(newList, null, 2));
  greenBright(`Book with title: ${title.toUpperCase()} removed.`);
};

module.exports = {
  addBook,
  listBooks,
  status,
  borrowBook,
  returnBook,
  bookDetail,
  removeBook,
};
