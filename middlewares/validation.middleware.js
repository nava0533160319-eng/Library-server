const Joi = require('joi');

function validate(schema) {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true
    });

    if (validationResult.error) {
      const details = validationResult.error.details.map((detail) => detail.message);
      const error = new Error('Validation failed');
      error.status = 400;
      error.type = 'ValidationError';
      error.details = details;
      return next(error);
    }

    req.validatedBody = validationResult.value;
    next();
  };
}

module.exports = validate;
