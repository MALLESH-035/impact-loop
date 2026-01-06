import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/Button";
import { Check } from "lucide-react";

const PASSIONS = [
  "Environment 🌳", 
  "Education 📚", 
  "Health 🏥", 
  "Animal Welfare 🐾", 
  "Human Rights 🤝", 
  "Technology 💻", 
  "Arts 🎨", 
  "Sustainability ♻️"
];

export default function Login() {
  const { login } = useApp();
  const [name, setName] = useState("");
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);

  const togglePassion = (passion: string) => {
    if (selectedPassions.includes(passion)) {
      setSelectedPassions(selectedPassions.filter(p => p !== passion));
    } else {
      if (selectedPassions.length < 3) {
        setSelectedPassions([...selectedPassions, passion]);
      }
    }
  };

  const handleContinue = () => {
    if (name.trim() && selectedPassions.length > 0) {
      login(name, selectedPassions);
    }
  };

  return (
    <div className="min-h-screen bg-[#021E12] p-6 flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-md mx-auto w-full space-y-8"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-display font-bold text-white">Who are you?</h2>
          <p className="text-white/50">Let's personalize your impact journey.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#00FF6A]">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. EcoNinja2024"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00FF6A] focus:ring-1 focus:ring-[#00FF6A] transition-all"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-[#00FF6A]">Select Passions</label>
              <span className="text-xs text-white/40">{selectedPassions.length}/3 selected</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {PASSIONS.map((passion) => {
                const isSelected = selectedPassions.includes(passion);
                return (
                  <button
                    key={passion}
                    onClick={() => togglePassion(passion)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                      ${isSelected 
                        ? "bg-[#00FF6A] border-[#00FF6A] text-[#021E12]" 
                        : "bg-transparent border-white/10 text-white/60 hover:border-white/30"
                      }
                    `}
                  >
                    {passion}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Button 
            fullWidth 
            size="lg"
            onClick={handleContinue}
            disabled={!name.trim() || selectedPassions.length === 0}
          >
            Start Mission
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
