import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  ArrowRight, 
  Layers, 
  AlertCircle,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const validate = () => {
    let newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = "Username is required";
    
    // Email Validation: Must contain @ and a domain
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone Validation: Numeric only
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain only numbers";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    // Strong Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Must be 8+ chars with Uppercase, Lowercase, Number & Symbol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Immediate filtering for phone number: don't even let them type letters
    if (name === "phone" && value !== "" && !/^[0-9]+$/.test(value)) {
      return; 
    }

    setFormData({ ...formData, [name]: value });
    // Clear error for that field as they type
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.post("/auth/register", formData);
      login(response.data);
      toast.success("Account created successfully! 🚀");
      navigate("/dashboard");
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const validationErrors = error.response?.data?.errors;
      const message = validationErrors?.[0] || serverMessage || "Registration failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex relative overflow-hidden transition-colors duration-500">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 transition-all text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white shadow-xl active:scale-95"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      {/* Visual Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-premium-600 items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-premium-500 to-premium-900 opacity-90"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-white/10 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 text-white max-w-sm">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-8"
          >
            <Layers size={32} />
            <span className="text-3xl font-black text-white dark:text-white">TaskFlow.</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-black mb-6 leading-tight"
          >
            Create your account today.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-premium-100 text-lg opacity-80"
          >
            Join thousands of users who have transformed their productivity.
          </motion.p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Get Started</h1>
            <p className="text-slate-500 dark:text-slate-400">Join the elite productivity community.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-premium-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.username ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-premium-500/20 focus:border-premium-500/50 transition-all`}
                />
              </div>
              {errors.username && <p className="text-red-400 text-xs flex items-center gap-1 mt-1 px-1"><AlertCircle size={12} /> {errors.username}</p>}
            </div>

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
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Phone Number</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-premium-400">
                  <Phone size={18} />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.phone ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-premium-500/20 focus:border-premium-500/50 transition-all`}
                />
              </div>
              {errors.phone && <p className="text-red-400 text-xs flex items-center gap-1 mt-1 px-1"><AlertCircle size={12} /> {errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest px-1">Create Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-premium-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 dark:bg-slate-950 border ${errors.password ? 'border-red-500/50' : 'border-slate-200 dark:border-white/10'} rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-premium-500/20 focus:border-premium-500/50 transition-all`}
                />
              </div>
              {errors.password && <p className="text-red-400 text-xs flex items-center gap-1 mt-1 px-1"><AlertCircle size={12} /> {errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-premium-500 hover:bg-premium-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-premium-500/30 hover:shadow-premium-500/50 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-premium-400 hover:text-premium-300 font-bold">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
