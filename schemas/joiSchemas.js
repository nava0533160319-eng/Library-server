const Joi = require('joi');

const bookCreateSchema = Joi.object({
  code: Joi.string().alphanum().min(3).max(10).required(),
  name: Joi.string().min(3).max(120).required(),
  category: Joi.string().min(3).max(50).required(),
  price: Joi.number().precision(2).positive().required(),
  borrowed: Joi.boolean().required(),
  Lendings: Joi.array().items(
    Joi.object({
      loanDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
      customerCode: Joi.string().alphanum().required()
    })
  ).required()
});

const bookUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(120),
  category: Joi.string().min(3).max(50),
  price: Joi.number().precision(2).positive(),
  borrowed: Joi.boolean(),
  Lendings: Joi.array().items(
    Joi.object({
      loanDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
      customerCode: Joi.string().alphanum().required()
    })
  )
}).min(1);

const userRegisterSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/).required()
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const lendBookSchema = Joi.object({
  customerCode: Joi.string().alphanum().min(1).required()
});

module.exports = {
  bookCreateSchema,
  bookUpdateSchema,
  userRegisterSchema,
  userLoginSchema,
  lendBookSchema
};
