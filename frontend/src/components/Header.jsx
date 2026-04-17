import React from "react";
import { 
  Plus, 
  Moon, 
  Sun, 
  Layers, 
  LogOut,
  User as UserIcon
} from "lucide-react";
import { motion } from "framer-motion";

const Header = ({ onAddClick, onLogout, user, isDarkMode, setIsDarkMode, stats }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 dark:border-slate-800/50 glass-card bg-white/70 dark:bg-slate-950/40 backdrop-blur-md px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="p-2 bg-gradient-to-br from-premium-500 to-premium-600 rounded-xl shadow-lg shadow-premium-500/20 group-hover:scale-110 transition-transform duration-300">
            <Layers className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight leading-none">TaskFlow</h1>
            <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-500 mt-1">
              <span>{stats.active} PENDING</span>
              <span className="opacity-30">•</span>
              <span>{stats.completed} DONE</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              <div className="w-6 h-6 rounded-full bg-premium-500 flex items-center justify-center">
                <UserIcon size={12} className="text-white" />
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{user.username}</span>
            </div>
          )}

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white active:scale-95"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={onAddClick}
            className="hidden sm:flex items-center gap-2 bg-premium-500 hover:bg-premium-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-premium-500/20 active:scale-95"
          >
            <Plus size={18} strokeWidth={3} />
            Add Task
          </button>

          {user && (
            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-95"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          )}

          <button
            onClick={onAddClick}
            className="sm:hidden p-2.5 bg-premium-500 text-white rounded-xl active:scale-95 shadow-lg shadow-premium-500/20"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
