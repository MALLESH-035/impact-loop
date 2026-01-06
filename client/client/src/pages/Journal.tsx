import { useApp } from "@/context/AppContext";
import { MissionCard } from "@/components/MissionCard";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

export default function Journal() {
  const { tasks } = useApp();
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="min-h-screen bg-[#021E12] pb-24 pt-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-display font-bold text-white">Impact Journal</h1>
          <p className="text-white/50">Your history of positive change.</p>
        </header>

        <div className="space-y-8">
          {/* Mock grouping by date */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#00FF6A]">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">Today, {format(new Date(), 'MMM d')}</span>
            </div>
            
            <div className="space-y-4">
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <MissionCard key={task.id} task={task} variant="history" />
                ))
              ) : (
                <div className="p-8 border border-dashed border-white/10 rounded-2xl text-center text-white/30">
                  No missions completed yet today.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 opacity-50">
            <div className="flex items-center gap-2 text-white/60">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">Yesterday</span>
            </div>
            {/* Fake history item */}
             <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex items-center gap-4">
                <div className="text-2xl opacity-50">🚲</div>
                <div>
                   <h3 className="font-bold text-white/60">Bike Commute</h3>
                   <p className="text-xs text-white/30">Saved 4kg CO2</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
