import React from "react";
import { Check, Trash2, Edit3, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { updateTodo } from "../services/api";

const TodoItem = ({ todo, onEdit, onDelete, onToggle }) => {
  const handleToggle = async () => {
    try {
      const updatedTodo = await updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed,
      });
      onToggle(updatedTodo);
      toast.success(updatedTodo.completed ? "Task completed! 🚀" : "Task restored");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const dateStr = new Date(todo.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  
  const timeStr = new Date(todo.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={`group relative overflow-hidden rounded-2xl p-5 transition-all glass-card ${
        todo.completed 
          ? "bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800" 
          : "hover:border-premium-500/30 hover:shadow-premium-500/5"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
            todo.completed
              ? "bg-green-500 border-green-500 shadow-lg shadow-green-500/20"
              : "border-slate-300 dark:border-slate-700 hover:border-premium-500 dark:hover:border-premium-400"
          }`}
        >
          {todo.completed && <Check size={14} className="text-white" strokeWidth={3} />}
        </button>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className={`text-lg font-semibold transition-all duration-300 truncate ${
                todo.completed
                  ? "text-slate-400 dark:text-slate-500"
                  : "text-slate-900 dark:text-slate-100"
              }`}
            >
              {todo.title}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              todo.completed 
                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500" 
                : "bg-premium-100 text-premium-600 dark:bg-premium-900/30 dark:text-premium-400"
            }`}>
              {todo.completed ? "Completed" : "Active"}
            </span>
          </div>
          
          {todo.description && (
            <p className={`mt-1 text-sm line-clamp-2 transition-all duration-300 ${
              todo.completed ? "text-slate-400/70" : "text-slate-700 dark:text-slate-400"
            }`}>
              {todo.description}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-4 mt-3">
            {todo.dueDate && (
              <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${
                !todo.completed && new Date(todo.dueDate) < new Date() 
                ? "text-red-600 animate-pulse" 
                : "text-slate-500"
              }`}>
                <Calendar size={12} />
                {new Date(todo.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
            )}
            
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400/60">
              <Clock size={12} />
              <span>{timeStr}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(todo)}
            className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-premium-600 dark:hover:text-premium-400 hover:shadow-md transition-all"
            title="Edit"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => onDelete(todo)}
            className="p-2 rounded-lg bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-red-500 hover:shadow-md transition-all"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Side Color Strip */}
      <div className={`absolute top-0 right-0 bottom-0 w-1 transition-all duration-300 ${
        todo.completed ? "bg-green-500/30" : "bg-premium-500/20"
      }`} />
    </motion.div>
  );
};

export default TodoItem;
