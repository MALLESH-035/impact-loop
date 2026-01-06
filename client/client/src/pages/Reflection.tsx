import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/Button";
import { Camera, Share2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const EMOJIS = ["😫", "😐", "🙂", "😃", "🤩"];

export default function Reflection() {
  const { tasks, completeTask, addStory } = useApp();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const taskId = new URLSearchParams(search).get("taskId");

  const [reflection, setReflection] = useState("");
  const [mood, setMood] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const task = tasks.find((t) => t.id === Number(taskId));

  useEffect(() => {
    if (!task) {
      setLocation("/tasks");
    }
  }, [task, setLocation]);

  if (!task) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    completeTask(task.id);
    
    // Auto-create a story if they added an image
    if (imagePreview) {
      addStory({
        username: "You", // Will be overridden by real user in a real app
        imageUrl: imagePreview,
        caption: reflection || `Completed: ${task.title} 🎉`,
      });
    }

    setLocation("/tasks");
  };

  return (
    <div className="min-h-screen bg-[#021E12] pt-6 pb-24 px-6 relative">
       {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#00FF6A]/10 to-transparent pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10 space-y-6">
        <button 
          onClick={() => setLocation("/tasks")}
          className="p-2 -ml-2 text-white/60 hover:text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="space-y-2">
          <span className="text-[#00FF6A] text-xs font-bold uppercase tracking-wider">Mission Complete</span>
          <h1 className="text-3xl font-display font-bold text-white">{task.title}</h1>
        </div>

        {/* Image Upload Area */}
        <div className="relative aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden group">
          {imagePreview ? (
            <img src={imagePreview} alt="Proof" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
              <Camera className="w-8 h-8 mb-2" />
              <span className="text-sm">Tap to add photo proof</span>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* Reflection Input */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm">How did it feel?</label>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="I felt amazing because..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00FF6A] min-h-[100px] resize-none"
          />
        </div>

        {/* Mood Selector */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm">Rate the difficulty</label>
          <div className="flex justify-between bg-white/5 p-2 rounded-xl">
            {EMOJIS.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => setMood(idx)}
                className={`text-2xl p-2 rounded-lg transition-transform hover:scale-110 ${mood === idx ? 'bg-white/10 scale-110' : 'opacity-50'}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <Button fullWidth size="lg" onClick={handleSubmit}>
            Complete Mission
          </Button>
          <button className="w-full py-3 text-[#00FF6A] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#00FF6A]/10 rounded-xl transition-colors">
            <Share2 className="w-4 h-4" /> Share with friends
          </button>
        </div>
      </div>
    </div>
  );
}
