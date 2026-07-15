import books from '../db.js';

export const getAllBooks = (req, res) => {
    res.json({ message: 'Hello! Your API is working!' });
};

export const getBooksWithinRange =  (req, res) => {
    const page = req.query.page === undefined
        ? 1
        : Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = req.query.limit === undefined
        ? 10
        : Math.max(1, parseInt(req.query.limit, 10) || 10);
    const searchName = req.query.name ? req.query.name.trim().toLowerCase() : '';

    let filteredBooks = books;
    if (searchName) {
        filteredBooks = books.filter((book) =>
            book.name.toLowerCase().includes(searchName)
        );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    res.json({
        page,
        limit,
        searchName: searchName || null,
        totalItems: filteredBooks.length,
        totalPages: Math.ceil(filteredBooks.length / limit),
        books: paginatedBooks
    });
};

export const getBookByCode =  (req, res) => {
    const { code } = req.params;
    const book = books.find((item) => item.code === code);

    if (!book) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    res.json(book);
};

export const addBook =  (req, res) => {
    const book = req.body;

    if (!book || !book.code || !book.name) {
        return res.status(400).json({ error: 'Book object must include at least code and name' });
    }

    const existingBook = books.find((item) => item.code === book.code);
    if (existingBook) {
        return res.status(409).json({ error: `Book with code ${book.code} already exists` });
    }

    books.push(book);
    res.status(201).json(book);
};

export const updateBook =  (req, res) => {
    const { code } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'Update details are required' });
    }

    const bookIndex = books.findIndex((item) => item.code === code);
    if (bookIndex === -1) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    const book = books[bookIndex];
    const preservedLendings = book.Lendings;
    const updatedBook = {
        ...book,
        ...updates,
        code: book.code,
        Lendings: preservedLendings
    };

    books[bookIndex] = updatedBook;
    res.json(updatedBook);
};

export const lendBook = (req, res) => {
    const { code } = req.params;
    const { customerCode } = req.body;

    if (!customerCode) {
        return res.status(400).json({ error: 'customerCode is required' });
    }

    const book = books.find((item) => item.code === code);
    if (!book) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    const lending = {
        loanDate: new Date().toISOString().split('T')[0],
        customerCode
    };

    book.Lendings.push(lending);
    book.borrowed = true;
    res.status(201).json({ message: 'Lending added', lending });
};

export const returnLending =  (req, res) => {
    const { code } = req.params;
    const book = books.find((item) => item.code === code);

    if (!book) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    book.borrowed = false;
    res.json({ message: 'Book returned', book });
};

export const deleteBook =  (req, res) => {
    const { code } = req.params;
    const bookIndex = books.findIndex((item) => item.code === code);

    if (bookIndex === -1) {
        return res.status(404).json({ error: `Book with code ${code} not found` });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];
    res.json({ message: 'Book deleted', book: deletedBook });
};
