const yargs = require('yargs');
const {
  addBook,
  listBooks,
  borrowBook,
  bookDetail,
  removeBook,
  returnBook,
  status,
} = require('./library');

yargs
  .command({
    command: 'add',
    describe: 'Adding new book',
    builder: {
      title: { describe: 'Book title', demandOption: true, type: 'string' },
      author: { describe: 'Book author', demandOption: true, type: 'string' },
    },
    handler(argv) {
      addBook(argv.title, argv.author);
    },
  })
  .demandCommand();

yargs.command({
  command: 'detail',
  describe: 'Get book detail',
  builder: {
    title: { describe: 'Book title', demandOption: true, type: 'string' },
  },
  handler(argv) {
    bookDetail(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'Show list of books',
  handler() {
    listBooks();
  },
});

yargs.command({
  command: 'status',
  describe: 'Get info of user borrowed books',
  builder: {
    name: { describe: 'User name', demandOption: true, type: 'string' },
  },
  handler(argv) {
    status(argv.name);
  },
});

yargs.command({
  command: 'borrow',
  describe: 'Borrow a book from the library',
  builder: {
    name: {
      describe: 'Insert your name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Insert the book title you want to borrow',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    borrowBook(argv.name, argv.title);
  },
});

yargs.command({
  command: 'return',
  describe: 'Return a borrowed book to the library',
  builder: {
    name: {
      describe: 'Insert your name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Insert the book title you want to return',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    returnBook(argv.name, argv.title);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a book based on their title',
  builder: {
    title: {
      describe: 'Book title to remove',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    removeBook(argv.title);
  },
});

yargs.parse();
