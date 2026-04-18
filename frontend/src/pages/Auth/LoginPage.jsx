import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Layers, 
  AlertCircle,
  Loader2,
  Sparkles,
  Sun,
  Moon,
  Eye,
  EyeOff
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const validate = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear/Validate on the fly
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post("/auth/login", formData);
      login(response.data);
      toast.success("Welcome back! 👋");
      navigate("/dashboard");
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const validationErrors = error.response?.data?.errors;
      const message = validationErrors?.[0] || serverMessage || "Invalid credentials";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex transition-colors duration-500 relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-xl active:scale-95"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl"
        >
          <div className="mb-10 text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 text-premium-500">
              <Layers size={28} />
              <span className="text-2xl font-black text-slate-900 dark:text-white">TaskFlow.</span>
            </Link>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-premium-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.email ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-premium-500/20 focus:border-premium-500/50 transition-all`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs flex items-center gap-1 mt-1 px-1"><AlertCircle size={12} /> {errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Password</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-premium-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.password ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10'} rounded-2xl py-4 pl-12 pr-12 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-premium-500/20 focus:border-premium-500/50 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-premium-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs flex items-center gap-1 mt-1 px-1"><AlertCircle size={12} /> {errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-premium-500 hover:bg-premium-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-premium-500/30 hover:shadow-premium-500/50 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 mt-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            Don't have an account?{" "}
            <Link to="/signup" className="text-premium-400 hover:text-premium-300 font-bold">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-premium-800 border-l border-white/5 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/app_background.png')] bg-cover opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-sm">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10"
          >
            <Sparkles className="text-premium-400" size={48} />
          </motion.div>
          <h2 className="text-4xl font-black text-white mb-6">Experience the future of work.</h2>
          <p className="text-slate-400 text-lg">Clean, simple, and powerful. Your tasks have never looked this good.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
