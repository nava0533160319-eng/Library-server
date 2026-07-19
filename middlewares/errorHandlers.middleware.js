function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: {
      message: `Route ${req.method} ${req.originalUrl} not found`,
      type: 'NotFound'
    }
  });
}

function generalErrorHandler(err, req, res, next) {
  const status = err.status || 500;
  const errorResponse = {
    error: {
      message: err.message || 'Internal Server Error',
      type: err.type || (status === 500 ? 'InternalServerError' : 'Error')
    }
  };

  if (process.env.NODE_ENV === 'development' && err.stack) {
    errorResponse.error.stack = err.stack.split('\n').map((line) => line.trim());
  }

  res.status(status).json(errorResponse);
}

module.exports = { notFoundHandler, generalErrorHandler };
