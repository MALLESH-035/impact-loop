import { useApp } from "@/context/AppContext";
import { Hexagon, Medal, Award, Zap } from "lucide-react";

export default function Profile() {
  const { user } = useApp();

  if (!user) return null;

  const progress = (user.impactStats?.missionsCompleted || 0) % 5;
  const progressPercent = (progress / 5) * 100;

  return (
    <div className="min-h-screen bg-[#021E12] pb-24 pt-20 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#00FF6A] to-blue-600 p-[3px]">
            <div className="w-full h-full rounded-full bg-[#021E12] flex items-center justify-center overflow-hidden">
               <span className="text-3xl font-bold text-white">{user.username.substring(0,2).toUpperCase()}</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.username}</h1>
            <p className="text-[#00FF6A] font-medium">Level {user.level} Changemaker</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="glass p-6 rounded-2xl space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Level {user.level}</span>
            <span className="text-white/60">Level {user.level + 1}</span>
          </div>
          <div className="h-4 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00FF6A] shadow-[0_0_10px_#00FF6A] transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-center text-xs text-white/40">{5 - progress} missions to next level</p>
        </div>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-[#00FF6A]" />
            Badges
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {[1,2,3,4].map((i) => (
              <div key={i} className="aspect-square glass rounded-xl flex flex-col items-center justify-center gap-2 p-2 opacity-100">
                 <div className="p-3 bg-[#00FF6A]/10 rounded-full text-[#00FF6A]">
                   <Medal className="w-6 h-6" />
                 </div>
                 <span className="text-[10px] text-white/60 text-center font-medium">Early Adopter</span>
              </div>
            ))}
             {/* Locked Badge */}
             <div className="aspect-square border border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center gap-2 p-2 opacity-50">
                 <div className="p-3 bg-white/5 rounded-full text-white/20">
                   <Hexagon className="w-6 h-6" />
                 </div>
                 <span className="text-[10px] text-white/30 text-center font-medium">Locked</span>
              </div>
          </div>
        </section>

        {/* Detailed Stats */}
        <section className="space-y-4">
           <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Impact Breakdown
          </h2>
          <div className="glass rounded-2xl p-6 space-y-4">
             <div className="flex justify-between items-center border-b border-white/5 pb-4">
               <span className="text-white/60">Passions</span>
               <div className="flex gap-2">
                 {user.passions?.map(p => (
                   <span key={p} className="text-xs bg-white/5 px-2 py-1 rounded text-white/80">{p.split(" ")[1]}</span>
                 ))}
               </div>
             </div>
             <div className="flex justify-between items-center pt-2">
               <span className="text-white/60">Member Since</span>
               <span className="text-white">Oct 2024</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
