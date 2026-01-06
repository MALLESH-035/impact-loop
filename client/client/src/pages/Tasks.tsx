import { useApp } from "@/context/AppContext";
import { MissionCard } from "@/components/MissionCard";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Tasks() {
  const { tasks } = useApp();
  const [, setLocation] = useLocation();

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="min-h-screen bg-[#021E12] pb-24 pt-20 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-white">Daily Missions</h1>
          <p className="text-white/50">Complete these actions to level up your impact.</p>
        </header>

        <div className="space-y-4">
          {activeTasks.length === 0 && (
            <div className="p-8 glass rounded-2xl text-center space-y-4">
              <div className="text-4xl">🎉</div>
              <div>
                <h3 className="text-xl font-bold text-white">All Clear!</h3>
                <p className="text-white/50 text-sm mt-1">You've completed all missions for today.</p>
              </div>
            </div>
          )}

          {activeTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setLocation(`/reflection?taskId=${task.id}`)}
              className="cursor-pointer"
            >
              <MissionCard 
                task={task} 
                onComplete={() => setLocation(`/reflection?taskId=${task.id}`)}
              />
            </motion.div>
          ))}
        </div>

        {completedTasks.length > 0 && (
          <div className="pt-8 space-y-4 opacity-60">
            <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">Completed Today</h2>
            {completedTasks.map((task) => (
              <MissionCard 
                key={task.id} 
                task={task} 
                variant="completed"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
