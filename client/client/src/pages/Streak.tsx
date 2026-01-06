import { useApp } from "@/context/AppContext";
import { ArrowLeft, Flame } from "lucide-react";
import { Link } from "wouter";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

export default function Streak() {
  const { user } = useApp();

  if (!user) return null;

  // Generate current week days
  const today = new Date();
  const start = startOfWeek(today);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="min-h-screen bg-[#021E12] pt-6 pb-24 px-6">
      <div className="max-w-md mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
             <button className="p-2 -ml-2 text-white/60 hover:text-white">
                <ArrowLeft className="w-6 h-6" />
             </button>
          </Link>
          <h1 className="text-xl font-bold text-white">Streak Activity</h1>
        </div>

        {/* Main Streak Counter */}
        <div className="flex flex-col items-center justify-center py-10 space-y-4 relative">
           <div className="absolute inset-0 bg-[#00FF6A] blur-[100px] opacity-10 rounded-full" />
           <Flame className="w-24 h-24 text-[#00FF6A] fill-current animate-float drop-shadow-[0_0_15px_rgba(0,255,106,0.6)]" />
           <div className="text-center z-10">
             <h2 className="text-6xl font-display font-bold text-white">{user.streak}</h2>
             <p className="text-[#00FF6A] uppercase tracking-widest font-bold">Day Streak</p>
           </div>
        </div>

        {/* Calendar Strip */}
        <div className="glass p-6 rounded-3xl space-y-4">
           <h3 className="text-white font-bold text-center mb-4">This Week</h3>
           <div className="flex justify-between">
             {weekDays.map((date) => {
               const isToday = isSameDay(date, today);
               const isPast = date < today;
               
               return (
                 <div key={date.toString()} className="flex flex-col items-center gap-2">
                   <span className="text-xs text-white/40">{format(date, 'EEE')}</span>
                   <div className={`
                     w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                     ${isToday 
                        ? 'bg-[#00FF6A] text-[#021E12] shadow-[0_0_10px_#00FF6A]' 
                        : isPast 
                          ? 'bg-[#00FF6A]/20 text-[#00FF6A]'
                          : 'bg-white/5 text-white/20'
                     }
                   `}>
                     {isPast || isToday ? '✓' : format(date, 'd')}
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 p-4 rounded-xl flex gap-4 items-center">
           <div className="p-2 bg-orange-500/20 rounded-full text-orange-400">
             <Flame className="w-5 h-5" />
           </div>
           <div>
             <h4 className="text-white font-bold text-sm">Keep it up!</h4>
             <p className="text-white/50 text-xs">Complete a mission tomorrow to reach {user.streak ? user.streak + 1 : 1} days.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
