const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validation.middleware');
const { userRegisterSchema, userLoginSchema } = require('../schemas/joiSchemas');
const { signUp, signIn, getAllUsers } = require('../contollers/users.controller');

router.get('/', getAllUsers);
router.post('/register', validate(userRegisterSchema), signUp);
router.post('/login', validate(userLoginSchema), signIn);

module.exports = router;