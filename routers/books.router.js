const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation.middleware');
const { bookCreateSchema, bookUpdateSchema, lendBookSchema } = require('../schemas/joiSchemas');

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
router.post('/', validate(bookCreateSchema), addBook);
router.put('/:code', validate(bookUpdateSchema), updateBook);
router.post('/:code/lend', validate(lendBookSchema), lendBook);
router.post('/:code/return', returnLending);
router.delete('/:code', deleteBook);

module.exports = router;