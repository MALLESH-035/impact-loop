import { useApp } from "@/context/AppContext";
import { Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Stories() {
  const { stories } = useApp();

  return (
    <div className="min-h-screen bg-[#021E12] pb-24 pt-20 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Stories</h1>
            <p className="text-white/50">Community impact feed.</p>
          </div>
          <button className="bg-[#00FF6A] text-[#021E12] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#33FF85] transition-colors">
            + New Story
          </button>
        </header>

        <div className="grid gap-6">
          {stories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-3xl overflow-hidden border border-white/5"
            >
              {/* Header */}
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#00FF6A] to-blue-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-[#021E12] flex items-center justify-center text-xs font-bold text-white">
                    {story.username.substring(0,2).toUpperCase()}
                  </div>
                </div>
                <span className="font-bold text-white text-sm">{story.username}</span>
              </div>

              {/* Image */}
              <div className="aspect-square bg-black/50 relative">
                <img 
                  src={story.imageUrl} 
                  alt="Story" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Actions & Caption */}
              <div className="p-4 space-y-3">
                <div className="flex gap-4">
                  <button className="text-white hover:text-[#00FF6A] transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="text-white hover:text-[#00FF6A] transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </button>
                </div>
                <div>
                  <p className="text-sm text-white font-medium mb-1">{story.likes} likes</p>
                  <p className="text-sm text-white/80">
                    <span className="font-bold text-white mr-2">{story.username}</span>
                    {story.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
