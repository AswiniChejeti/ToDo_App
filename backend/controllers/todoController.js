const Todo = require("../models/Todo");

// @desc    Get all todos for logged in user
// @route   GET /api/todos
// @access  Private
exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ order: 1 });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Private
exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a todo
// @route   POST /api/todos
// @access  Private
exports.createTodo = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const lastTodo = await Todo.findOne({ user: req.user.id }).sort({ order: -1 });
    const order = lastTodo ? lastTodo.order + 1 : 0;

    const todo = await Todo.create({
      title,
      description: description || "",
      dueDate,
      order,
      user: req.user.id,
    });

    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Private
exports.updateTodo = async (req, res, next) => {
  try {
    const { title, description, completed, dueDate, order } = req.body;

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, dueDate, order },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Private
exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await todo.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

// @desc    Update todo orders
// @route   PUT /api/todos/reorder
// @access  Private
exports.updateOrders = async (req, res, next) => {
  try {
    const { orders } = req.body;

    const updatePromises = orders.map(({ id, order }) =>
      Todo.findOneAndUpdate(
        { _id: id, user: req.user.id },
        { order },
        { new: true }
      )
    );

    await Promise.all(updatePromises);
    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    next(error);
  }
};
