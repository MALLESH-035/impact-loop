import { Task } from "@shared/schema";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  task: Task;
  onComplete?: () => void;
  variant?: "active" | "completed" | "history";
}

export function MissionCard({ task, onComplete, variant = "active" }: MissionCardProps) {
  const isHistory = variant === "history";
  
  return (
    <div className={cn(
      "group relative p-4 rounded-2xl border transition-all duration-300",
      isHistory 
        ? "bg-white/5 border-white/5 opacity-80" 
        : "bg-[#021E12] border-[#00FF6A]/20 hover:border-[#00FF6A]/50 hover:shadow-[0_0_20px_rgba(0,255,106,0.1)]"
    )}>
      <div className="flex items-start gap-4">
        <div className="text-3xl bg-white/5 p-3 rounded-xl">
          {task.icon}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#00FF6A] mb-1 block">
              {task.category}
            </span>
          </div>
          <h3 className={cn(
            "font-bold font-display text-lg leading-tight mb-1",
            isHistory ? "text-white/60" : "text-white"
          )}>
            {task.title}
          </h3>
          <p className="text-xs text-white/50 leading-relaxed">
            {task.description}
          </p>
        </div>

        {variant === "active" && onComplete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="mt-1 text-white/20 hover:text-[#00FF6A] transition-colors"
          >
            <Circle className="w-6 h-6" />
          </button>
        )}
        
        {(variant === "completed" || isHistory) && (
          <div className="mt-1 text-[#00FF6A]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
