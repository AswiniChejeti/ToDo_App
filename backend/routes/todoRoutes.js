const express = require("express");
const router = express.Router();
const validateObjectId = require("../middleware/validateObjectId");
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  updateOrders,
} = require("../controllers/todoController");
const { protect } = require("../middleware/authMiddleware");

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Apply protection to all routes
router.use(protect);

router.get("/", asyncHandler(getAllTodos));
router.post("/", asyncHandler(createTodo));
router.put("/reorder", asyncHandler(updateOrders));

router.get("/:id", validateObjectId, asyncHandler(getTodoById));
router.put("/:id", validateObjectId, asyncHandler(updateTodo));
router.delete("/:id", validateObjectId, asyncHandler(deleteTodo));

module.exports = router;
