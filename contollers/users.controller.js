const { users } = require('../db.js');

const signUp = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'username, email, and password are required' });
    }

    const existingUser = users.find((user) => user.email === email || user.username === username);
    if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
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

const signIn = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }

    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', user });
};

const getAllUsers = (req, res) => {
    res.json(users);
};

module.exports = { signUp, signIn, getAllUsers };
