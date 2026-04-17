import React from "react";
import { Link } from "react-router-dom";
import { Layers, ArrowLeft, Users, Shield, Target } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-premium-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-premium-600/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-premium-900/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Header */}
      <nav className="relative z-50 flex items-center px-6 py-6 max-w-7xl mx-auto backdrop-blur-md bg-slate-950/20">
        <Link to="/" className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} className="text-slate-400 group-hover:text-white transition-colors" />
          <span className="text-slate-400 group-hover:text-white transition-colors font-medium">Back to Home</span>
        </Link>
      </nav>

      <section className="relative z-10 pt-16 pb-32 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-20 h-20 bg-gradient-to-br from-premium-500 to-premium-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-premium-500/30"
        >
           <Layers size={40} className="text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-8"
        >
          About <span className="text-premium-500">TaskFlow.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400 text-lg md:text-xl max-w-3xl mb-24 leading-relaxed"
        >
          We believe that software should get out of your way and let you focus. TaskFlow was built with a singular vision: to create the most intuitive, beautiful, and secure task management experience on the web.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8 w-full text-left">
           {[
             { icon: <Target className="text-premium-400"/>, title: "Our Mission", desc: "To empower individuals and teams to achieve peak productivity through beautiful, friction-free design." },
             { icon: <Users className="text-premium-400"/>, title: "Who We Are", desc: "A small team of passionate developers, designers, and perfectionists dedicated to crafting premium web experiences." },
             { icon: <Shield className="text-premium-400"/>, title: "Our Promise", desc: "Uncompromising privacy. We don't sell your data, we don't serve ads. Your tasks are yours alone." }
           ].map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 + (idx * 0.1) }}
               className="glass-card p-8 border-white/5"
             >
                <div className="w-12 h-12 rounded-xl bg-premium-500/10 border border-premium-500/20 flex items-center justify-center mb-6">
                   {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default About;
