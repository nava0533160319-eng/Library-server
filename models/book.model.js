const mongoose = require('mongoose');

// הגדרת הסכמה עבור הספר
const bookSchema = new mongoose.Schema({
    name: String,
    price: Number,
    categories: [String],
    author: {
        name: String,
        phone: String,
        email: String,
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;