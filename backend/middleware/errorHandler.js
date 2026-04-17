const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  console.error("Error:", err.message);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      message: "Validation Error",
      errors: messages,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value entered",
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
