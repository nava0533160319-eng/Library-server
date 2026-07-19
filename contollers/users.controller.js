const { users } = require('../db.js');

function createError(message, status = 500, type = 'Error') {
    const error = new Error(message);
    error.status = status;
    error.type = type;
    return error;
}

const signUp = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return next(createError('username, email, and password are required', 400, 'BadRequest'));
    }

    const existingUser = users.find((user) => user.email === email || user.username === username);
    if (existingUser) {
        return next(createError('User already exists', 409, 'Conflict'));
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
        borrowedBooks: []
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

const signIn = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createError('email and password are required', 400, 'BadRequest'));
    }

    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) {
        return next(createError('Invalid email or password', 401, 'Unauthorized'));
    }

    res.json({ message: 'Login successful', user });
};

const getAllUsers = (req, res) => {
    res.json(users);
};

module.exports = { signUp, signIn, getAllUsers };
