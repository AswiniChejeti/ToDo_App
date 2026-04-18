import React, { useState, useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import ConfirmModal from "./components/ConfirmModal";
import { getAllTodos, deleteTodo } from "./services/api";
import { useAuth } from "./context/AuthContext";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { user, logout } = useAuth();
  const { isDarkMode, setIsDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);



  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await getAllTodos();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      toast.error("Failed to load your tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleAddClick = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (todo) => {
    setTodoToDelete(todo);
  };

  const handleConfirmDelete = async () => {
    if (!todoToDelete) return;
    
    setDeleteLoading(true);
    try {
      await deleteTodo(todoToDelete._id);
      setTodos(todos.filter((t) => t._id !== todoToDelete._id));
      toast.success("Task deleted permanently");
      setTodoToDelete(null);
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFormSubmit = (newTodo) => {
    if (editingTodo) {
      setTodos(todos.map((t) => (t._id === newTodo._id ? newTodo : t)));
    } else {
      setTodos([newTodo, ...todos]);
    }
    setEditingTodo(null);
  };

  const handleToggle = (updatedTodo) => {
    setTodos(todos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t)));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-premium-200 dark:selection:bg-premium-800 transition-colors duration-500 relative">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <img 
          src="/app_background.png" 
          alt="" 
          className="w-full h-full object-cover opacity-50 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-transparent to-slate-200/50 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/90 backdrop-blur-[2px]"></div>
      </div>

      {/* Decorative Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-premium-500/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-premium-600/10 blur-[120px] rounded-full animate-pulse-slow delay-700"></div>
      </div>

      <div className="relative z-10">
        <Header 
          onAddClick={handleAddClick} 
          onLogout={handleLogout}
          user={user}
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          stats={{
            total: todos.length,
            active: todos.filter(t => !t.completed).length,
            completed: todos.filter(t => t.completed).length
          }}
        />

        <main className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TodoList
              todos={todos}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDeleteRequest}
              onToggle={handleToggle}
              setTodos={setTodos}
            />
          </motion.div>
        </main>

        <AnimatePresence>
          {isModalOpen && (
            <TodoForm
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setEditingTodo(null);
              }}
              onSubmit={handleFormSubmit}
              editingTodo={editingTodo}
            />
          )}

          {todoToDelete && (
            <ConfirmModal
              isOpen={!!todoToDelete}
              loading={deleteLoading}
              onClose={() => setTodoToDelete(null)}
              onConfirm={handleConfirmDelete}
              title="Delete Task?"
              message={`Are you sure you want to delete "${todoToDelete.title}"? This action cannot be undone.`}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
