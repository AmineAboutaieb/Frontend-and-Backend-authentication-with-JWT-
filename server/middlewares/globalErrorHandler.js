const globalErrorHandler = (err, req, res, next) => {
  let status = res.statusCode ? res.statusCode : 500;
  res.status(status).json({ error: err.message });
};

module.exports = { globalErrorHandler };
