import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Task, Story } from "@shared/schema";
import { MOCK_TASKS, MOCK_STORIES, INITIAL_USER } from "@/data/mockData";
import { useLocation } from "wouter";

interface AppContextType {
  user: User | null;
  tasks: Task[];
  stories: Story[];
  isLoading: boolean;
  login: (username: string, passions: string[]) => void;
  logout: () => void;
  completeTask: (taskId: number) => void;
  addStory: (story: Omit<Story, "id" | "likes">) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  // Simulate initial load check
  useEffect(() => {
    const storedUser = localStorage.getItem("impact_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, passions: string[]) => {
    const newUser = { ...INITIAL_USER, username, passions };
    setUser(newUser);
    localStorage.setItem("impact_user", JSON.stringify(newUser));
    setLocation("/dashboard");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("impact_user");
    setLocation("/");
  };

  const completeTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: true } : t))
    );
    if (user) {
      const updatedUser = {
        ...user,
        impactStats: {
          ...user.impactStats,
          missionsCompleted: (user.impactStats?.missionsCompleted || 0) + 1,
          co2Reduced: (user.impactStats?.co2Reduced || 0) + 2.5,
          hoursContributed: (user.impactStats?.hoursContributed || 0) + 0.5,
        },
        streak: user.streak ? user.streak + 1 : 1,
        // Simple level up logic
        level: Math.floor(((user.impactStats?.missionsCompleted || 0) + 1) / 5) + 1
      };
      setUser(updatedUser);
      localStorage.setItem("impact_user", JSON.stringify(updatedUser));
    }
  };

  const addStory = (newStory: Omit<Story, "id" | "likes">) => {
    const story: Story = {
      ...newStory,
      id: stories.length + 1,
      likes: 0,
    };
    setStories([story, ...stories]);
  };

  return (
    <AppContext.Provider
      value={{ user, tasks, stories, isLoading, login, logout, completeTask, addStory }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
