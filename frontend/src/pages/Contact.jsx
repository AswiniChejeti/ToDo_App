import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-premium-500/30 overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-premium-800/10 blur-[150px] rounded-full"></div>
      </div>

      <nav className="relative z-50 flex items-center px-6 py-6 max-w-7xl mx-auto backdrop-blur-md bg-slate-950/20">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} className="text-slate-400 group-hover:text-white transition-colors" />
          <span className="text-slate-400 group-hover:text-white transition-colors font-medium">Back to Home</span>
        </Link>
      </nav>

      <section className="relative z-10 pt-10 pb-32 px-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Let's <span className="text-premium-500">talk.</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Have a question, feedback, or just want to say hi? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-2xl font-bold mb-8 text-white">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-premium-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Email Us</p>
                    <p className="text-lg text-slate-200">hello@taskflow.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-premium-400">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Support</p>
                    <p className="text-lg text-slate-200">support@taskflow.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-premium-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Office</p>
                    <p className="text-lg text-slate-200">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 border-white/10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wide text-slate-300">First Name</label>
                  <input required type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-premium-500 transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold tracking-wide text-slate-300">Last Name</label>
                  <input required type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-premium-500 transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-slate-300">Email Address</label>
                <input required type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-premium-500 transition-colors" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-slate-300">Message</label>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
