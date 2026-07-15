const express = require('express');
const router = express.Router();

const usersRouter = require('./users.router');
const booksRouter = require('./books.router');

router.use('/users', usersRouter);
router.use('/books', booksRouter);

module.exports = router;
