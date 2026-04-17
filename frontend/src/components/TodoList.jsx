import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Search, Loader2, ListTodo, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";
import { updateOrders } from "../services/api";
import toast from "react-hot-toast";

const TodoList = ({ todos, loading, onEdit, onDelete, onToggle, setTodos }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset to first page when filtering or searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const filteredTodos = todos.filter((todo) => {
    const titleMatch = todo.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = todo.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || descMatch;
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "active" && !todo.completed) ||
                      (activeTab === "completed" && todo.completed);
    return matchesSearch && matchesTab;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update local state immediately for smooth UI
    const updatedItems = items.map((item, index) => ({ ...item, order: index }));
    setTodos(updatedItems);

    try {
      const orders = updatedItems.map((item) => ({ id: item._id, order: item.order }));
      await updateOrders(orders);
    } catch (error) {
      toast.error("Failed to save new order");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-premium-500" size={48} />
        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-premium-500 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search for a task..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass-input pl-12 pr-4 py-3.5 rounded-2xl focus:ring-4 focus:ring-premium-500/10 focus:border-premium-500/50 transition-all font-medium"
          />
        </div>

        <div className="flex p-1.5 bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-2xl backdrop-blur-xl shrink-0 w-full md:w-auto">
          {["all", "active", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all duration-300 ${
                activeTab === tab 
                ? "bg-premium-500 text-white shadow-lg shadow-premium-500/20" 
                : "text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="grid gap-4"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {currentItems.map((todo, index) => (
                  <Draggable key={todo._id} draggableId={todo._id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`${snapshot.isDragging ? "z-50 scale-105" : ""} transition-transform duration-200`}
                      >
                        <TodoItem
                          todo={todo}
                          onEdit={onEdit}
                          onDelete={onDelete}
                          onToggle={onToggle}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </AnimatePresence>
              {provided.placeholder}
              
              {currentItems.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 px-6 glass-card border-dashed border-slate-200 dark:border-white/10"
                >
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900/50 rounded-2xl flex items-center justify-center text-slate-500 mb-4 border border-slate-200 dark:border-white/5">
                    <ListTodo size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No tasks found</h3>
                  <p className="text-slate-600 dark:text-slate-500 text-center max-w-xs transition-colors">
                    {searchTerm ? "Try adjusting your search query." : "Start your productive day by adding a new task."}
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Showing <span className="text-premium-500">{indexOfFirstItem + 1}</span>-
            <span className="text-premium-500">{Math.min(indexOfLastItem, filteredTodos.length)}</span> of 
            <span className="text-premium-500 ml-1">{filteredTodos.length}</span> tasks
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-xl text-sm font-black transition-all ${
                    currentPage === page
                    ? "bg-premium-500 text-white shadow-lg shadow-premium-500/20"
                    : "text-slate-500 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
