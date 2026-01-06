import { User, Task, Story } from "@shared/schema";

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    title: "Eco Warrior",
    description: "Pick up 3 pieces of litter on your way to work/school.",
    category: "Environment",
    icon: "♻️",
    completed: false,
  },
  {
    id: 2,
    title: "Hydration Station",
    description: "Refill a reusable water bottle instead of buying plastic.",
    category: "Health",
    icon: "💧",
    completed: false,
  },
  {
    id: 3,
    title: "Kindness Ripple",
    description: "Give a genuine compliment to a stranger or colleague.",
    category: "Social",
    icon: "✨",
    completed: false,
  },
  {
    id: 4,
    title: "Green Thumb",
    description: "Water a plant or plant a seed today.",
    category: "Nature",
    icon: "🌱",
    completed: false,
  },
  {
    id: 5,
    title: "Energy Saver",
    description: "Turn off lights in empty rooms for the whole day.",
    category: "Environment",
    icon: "💡",
    completed: false,
  },
];

export const MOCK_STORIES: Story[] = [
  {
    id: 1,
    username: "AlexGreen",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?auto=format&fit=crop&q=80&w=800",
    caption: "Cleaned up the park today! 🌿 #ImpactLoop",
    likes: 42,
  },
  {
    id: 2,
    username: "SarahSave",
    imageUrl: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=800",
    caption: "Planted my first tree! 🌳 So excited.",
    likes: 89,
  },
  {
    id: 3,
    username: "EcoMike",
    imageUrl: "https://images.unsplash.com/photo-1611288870280-4a331411bb5f?auto=format&fit=crop&q=80&w=800",
    caption: "No plastic for a week straight. Hard but worth it! 🚫🥤",
    likes: 15,
  },
];

export const INITIAL_USER: User = {
  id: 1,
  username: "",
  passions: [],
  level: 1,
  badges: [],
  streak: 0,
  impactStats: {
    livesImpacted: 0,
    hoursContributed: 0,
    missionsCompleted: 0,
    co2Reduced: 0,
  },
};
