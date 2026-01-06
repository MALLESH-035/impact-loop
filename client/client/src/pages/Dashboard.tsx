import { useApp } from "@/context/AppContext";
import { StatCard } from "@/components/StatCard";
import { MissionCard } from "@/components/MissionCard";
import { Flame, Target, Clock, Heart, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user, tasks } = useApp();
  const [, setLocation] = useLocation();

  if (!user) return null;

  const incompleteTasks = tasks.filter(t => !t.completed).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#021E12] pb-24 pt-20 md:pt-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/50 text-sm mb-1">Welcome back,</p>
            <h1 className="text-3xl font-display font-bold text-white">
              {user.username} <span className="text-[#00FF6A]">Lvl {user.level}</span>
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs text-white/40 uppercase tracking-widest">Current Streak</p>
            <div className="flex items-center justify-end gap-1 text-[#00FF6A]">
              <Flame className="w-5 h-5 fill-current" />
              <span className="text-2xl font-bold font-display">{user.streak} Days</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            icon={Target} 
            label="Missions" 
            value={user.impactStats?.missionsCompleted || 0}
            delay={0}
          />
          <StatCard 
            icon={Clock} 
            label="Hours" 
            value={user.impactStats?.hoursContributed || 0}
            color="text-blue-400"
            delay={100}
          />
          <StatCard 
            icon={Heart} 
            label="Lives" 
            value={user.impactStats?.livesImpacted || 0}
            color="text-pink-400"
            delay={200}
          />
          <div className="glass rounded-2xl p-5 flex flex-col justify-center items-center text-center space-y-2 relative overflow-hidden group cursor-pointer hover:bg-white/5 transition-colors sm:hidden" onClick={() => setLocation('/streak')}>
             <Flame className="w-8 h-8 text-[#00FF6A] fill-current animate-pulse" />
             <div>
               <div className="text-2xl font-bold font-display text-white">{user.streak}</div>
               <div className="text-xs text-white/50">Day Streak</div>
             </div>
          </div>
          <StatCard 
            icon={Flame} 
            label="CO2 Saved" 
            value={`${user.impactStats?.co2Reduced || 0}kg`}
            color="text-orange-400"
            delay={300}
            className="hidden sm:block"
          />
        </div>

        {/* Today's Mission Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-display font-bold text-white">Today's Missions</h2>
            <Link href="/tasks">
              <span className="text-xs text-[#00FF6A] hover:underline cursor-pointer">View All</span>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {incompleteTasks.length > 0 ? (
              incompleteTasks.map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setLocation(`/tasks?id=${task.id}`)}
                  className="cursor-pointer"
                >
                  <MissionCard task={task} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 p-8 glass rounded-2xl text-center">
                <p className="text-white/60">All missions completed! 🎉</p>
                <Link href="/stories">
                  <span className="text-[#00FF6A] text-sm mt-2 block hover:underline cursor-pointer">Check community stories</span>
                </Link>
              </div>
            )}
            
            {incompleteTasks.length > 0 && (
               <Link href="/tasks">
                <div className="glass rounded-2xl p-6 flex items-center justify-center h-full min-h-[120px] group cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2 text-white/60 group-hover:text-[#00FF6A] transition-colors">
                    <span className="font-medium">View more missions</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
               </Link>
            )}
          </div>
        </section>

        {/* Community Highlight */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-bold text-white">Impact Community</h2>
          <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setLocation("/stories")}>
             {/* Unsplash image with descriptive comment */}
             {/* volunteering clean up group happy */}
             <img 
               src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1200" 
               alt="Community" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#021E12] via-[#021E12]/50 to-transparent" />
             <div className="absolute bottom-0 left-0 p-6">
               <span className="text-xs font-bold text-[#00FF6A] uppercase tracking-wider mb-2 block">Featured Story</span>
               <h3 className="text-2xl font-display font-bold text-white mb-1">Beach Cleanup 2024</h3>
               <p className="text-white/70 text-sm">Join 200+ locals making waves of change.</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
