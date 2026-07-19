const books = require('../db.js');

function createError(message, status = 500, type = 'Error') {
    const error = new Error(message);
    error.status = status;
    error.type = type;
    return error;
}

export const getAllBooks = async (req, res, next) => {
    const result = await Books.find();
    try {
        res.json(result);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

const getBooksWithinRange =  (req, res) => {
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

const getBookByCode =  (req, res, next) => {
    const { code } = req.params;
    const book = books.find((item) => item.code === code);

    if (!book) {
        return next(createError(`Book with code ${code} not found`, 404, 'NotFound'));
    }

    res.json(book);
};

const addBook =  (req, res, next) => {
    const book = req.body;

    if (!book || !book.code || !book.name) {
        return next(createError('Book object must include at least code and name', 400, 'BadRequest'));
    }

    const existingBook = books.find((item) => item.code === book.code);
    if (existingBook) {
        return next(createError(`Book with code ${book.code} already exists`, 409, 'Conflict'));
    }

    books.push(book);
    res.status(201).json(book);
};

const updateBook =  (req, res, next) => {
    const { code } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
        return next(createError('Update details are required', 400, 'BadRequest'));
    }

    const bookIndex = books.findIndex((item) => item.code === code);
    if (bookIndex === -1) {
        return next(createError(`Book with code ${code} not found`, 404, 'NotFound'));
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

const lendBook = (req, res, next) => {
    const { code } = req.params;
    const { customerCode } = req.body;

    if (!customerCode) {
        return next(createError('customerCode is required', 400, 'BadRequest'));
    }

    const book = books.find((item) => item.code === code);
    if (!book) {
        return next(createError(`Book with code ${code} not found`, 404, 'NotFound'));
    }

    const lending = {
        loanDate: new Date().toISOString().split('T')[0],
        customerCode
    };

    book.Lendings.push(lending);
    book.borrowed = true;
    res.status(201).json({ message: 'Lending added', lending });
};

const returnLending =  (req, res, next) => {
    const { code } = req.params;
    const book = books.find((item) => item.code === code);

    if (!book) {
        return next(createError(`Book with code ${code} not found`, 404, 'NotFound'));
    }

    book.borrowed = false;
    res.json({ message: 'Book returned', book });
};

const deleteBook =  (req, res, next) => {
    const { code } = req.params;
    const bookIndex = books.findIndex((item) => item.code === code);

    if (bookIndex === -1) {
        return next(createError(`Book with code ${code} not found`, 404, 'NotFound'));
    }

    const deletedBook = books.splice(bookIndex, 1)[0];
    res.json({ message: 'Book deleted', book: deletedBook });
};

module.exports = {
    getAllBooks,
    getBooksWithinRange,
    getBookByCode,
    addBook,
    updateBook,
    lendBook,
    returnLending,
    deleteBook
};
