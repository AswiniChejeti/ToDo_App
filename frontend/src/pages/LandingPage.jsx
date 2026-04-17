import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  MousePointer2, 
  Calendar,
  Layers,
  Target,
  Users,
  Shield,
  Mail,
  MessageSquare,
  MapPin
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const LandingPage = () => {
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      e.target.reset();
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-premium-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-premium-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-premium-900/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Header */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-md bg-slate-950/20">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-gradient-to-br from-premium-500 to-premium-600 rounded-xl shadow-lg shadow-premium-500/20 group-hover:scale-110 transition-transform duration-300">
            <Layers className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            TaskFlow<span className="text-premium-500">.</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="px-5 py-2.5 text-sm font-bold text-slate-300 hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link 
            to="/signup" 
            className="px-6 py-2.5 bg-white text-slate-950 rounded-full text-sm font-bold hover:bg-premium-50 transition-all hover:shadow-xl hover:shadow-white/10 active:scale-95"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-premium-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Sparkles size={14} />
          Next Generation Productivity
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]"
        >
          Master your time.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-premium-400 via-premium-600 to-premium-800">
            Unleash focus.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
        >
          The intelligent task manager that adapts to you. Experience drag-and-drop prioritization, smart due dates, and absolute privacy in one premium dashboard.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link 
            to="/signup" 
            className="px-10 py-5 bg-gradient-to-br from-premium-500 to-premium-700 rounded-2xl text-lg font-black hover:shadow-2xl hover:shadow-premium-500/40 hover:-translate-y-1 transition-all flex items-center gap-3 active:scale-95"
          >
            Start for Free <ArrowRight size={20} />
          </Link>
          <button className="px-10 py-5 bg-slate-900 border border-white/10 rounded-2xl text-lg font-black hover:bg-slate-800 transition-all">
            See Video Demo
          </button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 w-full max-w-5xl relative"
        >
          <div className="absolute inset-0 bg-premium-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative glass-card border-white/10 p-2 overflow-hidden rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <img 
              src="/app_background.png" 
              alt="Dashboard Preview" 
              className="w-full rounded-[2rem] opacity-90 sepia-[0.3]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full flex items-center gap-4 shadow-2xl">
                <div className="w-12 h-12 bg-premium-500 rounded-xl flex items-center justify-center">
                  <MousePointer2 className="text-white" />
                </div>
                <span className="text-xl font-bold">Interactive Drag & Drop</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4">Everything you need.</h2>
          <p className="text-slate-500 text-lg">Powerful features built into a single, beautiful interface.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Zap />, 
              title: "Instant Reordering", 
              desc: "Prioritize tasks with an intuitive drag-and-drop interface. Order your thoughts instantly." 
            },
            { 
              icon: <ShieldCheck />, 
              title: "Privacy Locked", 
              desc: "Your data belongs to you. Every task is secured with industry-standard JWT encryption." 
            },
            { 
              icon: <Calendar />, 
              title: "Smart Due Dates", 
              desc: "Never miss a deadline again with our integrated calendar picker and overdue alerts." 
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="glass-card p-10 border-white/5 hover:border-premium-500/30 transition-colors group"
            >
              <div className="w-14 h-14 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-premium-500 group-hover:bg-premium-600 group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-premium-500 to-premium-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-premium-500/30">
           <Layers size={40} className="text-white" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
          About <span className="text-premium-500">TaskFlow.</span>
        </h2>

        <p className="text-slate-300 text-lg md:text-xl max-w-3xl mb-20 leading-relaxed">
          We believe that software should get out of your way and let you focus. TaskFlow was built with a singular vision: to create the most intuitive, beautiful, and secure task management experience on the web.
        </p>

        <div className="grid md:grid-cols-3 gap-8 w-full text-left">
           {[
             { icon: <Target className="text-premium-400"/>, title: "Our Mission", desc: "To empower individuals and teams to achieve peak productivity through beautiful, friction-free design." },
             { icon: <Users className="text-premium-400"/>, title: "Who We Are", desc: "A small team of passionate developers, designers, and perfectionists dedicated to crafting premium web experiences." },
             { icon: <Shield className="text-premium-400"/>, title: "Our Promise", desc: "Uncompromising privacy. We don't sell your data, we don't serve ads. Your tasks are yours alone." }
           ].map((item, idx) => (
             <div key={idx} className="glass-card p-8 border-white/5">
                <div className="w-12 h-12 rounded-xl bg-premium-500/10 border border-premium-500/20 flex items-center justify-center mb-6">
                   {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Let's <span className="text-premium-500">talk.</span></h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Have a question, feedback, or just want to say hi? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-white">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-premium-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Email Us</p>
                    <p className="text-lg text-slate-200">hello@taskflow.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-premium-400">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Support</p>
                    <p className="text-lg text-slate-200">support@taskflow.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleContactSubmit} className="glass-card p-8 border-white/10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wide text-slate-200">First Name</label>
                  <input required type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-premium-500 transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wide text-slate-200">Last Name</label>
                  <input required type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-premium-500 transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-slate-200">Email Address</label>
                <input required type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-premium-500 transition-colors" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-slate-200">Message</label>
                <textarea required rows="4" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-premium-500 transition-colors resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 bg-premium-500 hover:bg-premium-600 text-white rounded-xl font-bold md:text-lg transition-all shadow-lg shadow-premium-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950 border-t border-white/5 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Layers className="text-premium-500" size={28} />
              <span className="text-2xl font-black tracking-tight">TaskFlow.</span>
            </div>
            <p className="text-slate-500 max-w-xs leading-relaxed">
              Experience the future of personal management. Built for those who demand perfection in their workflow.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Platform</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-premium-400">Features</a></li>
              <li><a href="#" className="hover:text-premium-400">Integrations</a></li>
              <li><a href="#" className="hover:text-premium-400">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#about" className="hover:text-premium-400">About Us</a></li>
              <li><a href="#contact" className="hover:text-premium-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-premium-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-premium-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 text-slate-600 text-sm">
          <p>© 2026 TaskFlow. Rebuilt for Excellence.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
