const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  // Duplicate key error (MongoDB)
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Email already exists"
    });
  }

  // Validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message
    });
  }

  res.status(500).json({
    message: "Server Error"
  });
};

module.exports = errorHandler;