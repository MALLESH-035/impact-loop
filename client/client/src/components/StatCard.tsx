import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  delay?: number;
  color?: string;
}

export function StatCard({ icon: Icon, label, value, trend, delay = 0, color = "text-[#00FF6A]" }: StatCardProps) {
  return (
    <div 
      className={cn(
        "glass rounded-2xl p-5 relative overflow-hidden group transition-all duration-300 hover:bg-white/5 animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl group-hover:from-[#00FF6A]/10 transition-colors duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2 rounded-lg bg-white/5", color)}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <span className="text-xs font-medium text-[#00FF6A] bg-[#00FF6A]/10 px-2 py-1 rounded-full">
              {trend}
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <h3 className="text-2xl font-bold font-display text-white tracking-tight">{value}</h3>
          <p className="text-sm text-white/50 font-medium">{label}</p>
        </div>
      </div>
    </div>
  );
}
