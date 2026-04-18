import React, { useState, useEffect } from "react";
import { X, Sparkles, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTodo, updateTodo } from "../services/api";

const TodoForm = ({ isOpen, onClose, onSubmit, editingTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description || "");
      setCompleted(editingTodo.completed);
      setDueDate(editingTodo.dueDate ? new Date(editingTodo.dueDate) : null);
    } else {
      setTitle("");
      setDescription("");
      setCompleted(false);
      setDueDate(null);
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setLoading(true);
    try {
      let result;
      const todoData = { 
        title, 
        description, 
        completed, 
        dueDate: dueDate ? dueDate.toISOString() : null 
      };

      if (editingTodo) {
        result = await updateTodo(editingTodo._id, todoData);
        toast.success("Task updated!");
      } else {
        result = await createTodo(todoData);
        toast.success("Task created!");
      }
      onSubmit(result);
      onClose();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-lg glass-card p-0 overflow-hidden rounded-[2rem] border-white/10"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-premium-600 to-premium-800 text-white">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <h2 className="text-xl font-black">
              {editingTodo ? "Refine Task" : "New Creation"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white dark:bg-slate-900/50">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">
              Title
            </label>
            <input
              autoFocus
              type="text"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full glass-input px-5 py-4 rounded-2xl focus:ring-4 focus:ring-premium-500/10 focus:border-premium-500/50 transition-all font-bold text-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">
              Details
            </label>
            <textarea
              placeholder="Add more context..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full glass-input px-5 py-4 rounded-2xl min-h-[100px] focus:ring-4 focus:ring-premium-500/10 focus:border-premium-500/50 transition-all resize-none font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">
                Due Date
              </label>
              <div className="relative group">
                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-premium-500" size={18} />
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  minDate={new Date()}
                  placeholderText="Pick a date"
                  isClearable
                  className="w-full glass-input pl-12 pr-4 py-3.5 rounded-2xl focus:ring-4 focus:ring-premium-500/10 focus:border-premium-500/50 transition-all font-bold text-sm"
                  popperClassName="premium-datepicker"
                />
              </div>
            </div>

            {editingTodo && (
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">
                  Status
                </label>
                <button
                  type="button"
                  onClick={() => setCompleted(!completed)}
                  className={`w-full h-[52px] rounded-2xl border flex items-center justify-center gap-2 font-black text-sm transition-all ${
                    completed 
                    ? "bg-green-500/10 border-green-500/50 text-green-500" 
                    : "bg-premium-500/10 border-premium-500/50 text-premium-500"
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${completed ? 'bg-green-500' : 'bg-premium-500'} animate-pulse`} />
                  {completed ? "Completed" : "Active"}
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 font-black text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-premium-500 hover:bg-premium-600 text-white px-6 py-4 rounded-2xl font-black shadow-xl shadow-premium-500/30 hover:shadow-premium-500/50 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                editingTodo ? "Save Changes" : "Create Task"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TodoForm;
