    const express = require('express');
const router = express.Router();

const { signUp, signIn, getAllUsers } = require('../contollers/users.controller');

router.get('/', getAllUsers);
router.post('/register', signUp);
router.post('/login', signIn);

module.exports = router;