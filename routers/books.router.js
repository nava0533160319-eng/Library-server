const express = require('express');
const router = express.Router();

const {
    getAllBooks,
    getBookByCode,
    addBook,
    updateBook,
    lendBook,
    returnLending,
    deleteBook
} = require('../contollers/books.controller');

router.get('/', getAllBooks);
router.get('/:code', getBookByCode);
router.post('/', addBook);
router.put('/:code', updateBook);
router.post('/:code/lend', lendBook);
router.post('/:code/return', returnLending);
router.delete('/:code', deleteBook);

module.exports = router;