import React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md glass-card overflow-hidden rounded-2xl border-white/20 p-6 text-center"
      >
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-500 mb-4 animate-pulse">
          <AlertTriangle size={32} />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          {title || "Are you sure?"}
        </h2>
        
        <p className="text-slate-500 dark:text-slate-400 mb-8 px-4">
          {message || "This action cannot be undone. Do you really want to proceed?"}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-[2] bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Yes, Delete Task"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;
