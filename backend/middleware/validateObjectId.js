const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      message: "Invalid todo ID format",
    });
  }

  next();
};

module.exports = validateObjectId;
