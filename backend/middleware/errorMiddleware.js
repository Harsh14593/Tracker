const errorHandler = (err, req, res, next) => {
  // If a status code has already been set, use it. Otherwise, default to 500 (Server Error).
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  // Send a structured JSON response
  res.json({
    message: err.message,
    // Include the error stack trace only if we are in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};