const express = require('express');
const server = express();

const books = require('./db.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: "Hello! Your API is working!" });
});

server.get('/books', (req, res) => {
    res.json(books);
});

const getBookById = (code) => {
    return books.find(book => book.code === code);
};

const addBook = (newBook) => {
    books.push(newBook);
    return newBook;
};

const updateBookDetails = (code, details) => {
    const book = getBookById(code);
    if (!book) return null;

    const preservedLendings = book.Lendings;
    const updatedBook = {
        ...book,
        ...details,
        code: book.code,
        Lendings: preservedLendings
    };

    const index = books.findIndex(item => item.code === code);
    books[index] = updatedBook;
    return updatedBook;
};

const addLending = (bookCode, customerCode) => {
    const book = getBookById(bookCode);
    if (!book) return null;

    const lending = {
        loanDate: new Date().toISOString().split('T')[0],
        customerCode
    };

    book.Lendings.push(lending);
    book.borrowed = true;
    return lending;
};

const returnBook = (bookCode) => {
    const book = getBookById(bookCode);
    if (!book) return null;

    book.borrowed = false;
    return book;
};

const deleteBookById = (code) => {
    const index = books.findIndex(book => book.code === code);
    if (index === -1) return null;

    return books.splice(index, 1)[0];
};

server.get('/books/:code', (req, res) => {
    const { code } = req.params;
    const book = getBookById(code);

    if (!book) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    res.json(book);
});

server.post('/books', (req, res) => {
    const book = req.body;

    if (!book || !book.code || !book.name) {
        return res.status(400).json({ error: 'Book object must include at least code and name' });
    }

    if (getBookById(book.code)) {
        return res.status(409).json({ error: `Book with code ${book.code} already exists` });
    }

    const createdBook = addBook(book);
    res.status(201).json(createdBook);
});

server.put('/books/:code', (req, res) => {
    const { code } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'Update details are required' });
    }

    const book = getBookById(code);
    if (!book) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    const updatedBook = updateBookDetails(code, updates);
    res.json(updatedBook);
});

server.post('/books/:code/lend', (req, res) => {
    const { code } = req.params;
    const { customerCode } = req.body;

    if (!customerCode) {
        return res.status(400).json({ error: 'customerCode is required' });
    }

    const book = getBookById(code);
    if (!book) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    const lending = addLending(code, customerCode);
    res.status(201).json({ message: 'Lending added', lending });
});

server.post('/books/:code/return', (req, res) => {
    const { code } = req.params;
    const book = getBookById(code);

    if (!book) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    const returnedBook = returnBook(code);
    res.json({ message: 'Book returned', book: returnedBook });
});

server.delete('/books/:code', (req, res) => {
    const { code } = req.params;
    const deletedBook = deleteBookById(code);

    if (!deletedBook) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    res.json({ message: 'Book deleted', book: deletedBook });
});

server.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});