import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/Button";
import { ArrowRight } from "lucide-react";

export default function Splash() {
  return (
    <div className="min-h-screen bg-[#021E12] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00FF6A] rounded-full filter blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-500 rounded-full filter blur-[120px] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 max-w-md w-full space-y-8"
      >
        <div className="space-y-2">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#00FF6A] to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,106,0.3)] rotate-3">
              <span className="text-4xl">🌍</span>
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-display font-black text-white tracking-tighter">
            IMPACT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF6A] to-emerald-400 text-glow">
              LOOP
            </span>
          </h1>
          
          <p className="text-lg text-white/60 font-light max-w-xs mx-auto">
            Gamify your contribution to a better planet. Small actions, massive impact.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8"
        >
          <Link href="/login">
            <Button size="lg" className="w-full group" fullWidth>
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="mt-6 text-xs text-white/30 uppercase tracking-widest">
            Join 12,402 Changemakers
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
