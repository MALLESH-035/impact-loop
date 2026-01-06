import { Link, useLocation } from "wouter";
import { Home, ListTodo, BookHeart, Users, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export function Navbar() {
  const [location] = useLocation();
  const { logout } = useApp();

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/tasks", icon: ListTodo, label: "Missions" },
    { href: "/journal", icon: BookHeart, label: "Journal" },
    { href: "/stories", icon: Users, label: "Stories" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#021E12]/90 backdrop-blur-xl border-t border-white/10 md:hidden pb-safe">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex flex-col items-center justify-center w-16 py-2 rounded-xl transition-all duration-300",
                    isActive
                      ? "text-[#00FF6A]"
                      : "text-white/40 hover:text-white/80"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-6 h-6 mb-1 transition-transform duration-300",
                      isActive && "scale-110 drop-shadow-[0_0_8px_rgba(0,255,106,0.5)]"
                    )}
                  />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Top Nav */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[#021E12]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard">
            <div className="font-display font-bold text-xl text-white tracking-wider cursor-pointer">
              IMPACT<span className="text-[#00FF6A]">LOOP</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2",
                      isActive
                        ? "bg-[#00FF6A]/10 text-[#00FF6A] ring-1 ring-[#00FF6A]/50"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </div>
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="ml-4 p-2 text-white/40 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
