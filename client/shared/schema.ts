import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  passions: text("passions").array(),
  level: integer("level").default(0),
  badges: text("badges").array(),
  streak: integer("streak").default(0),
  impactStats: jsonb("impact_stats").$type<{
    livesImpacted: number;
    hoursContributed: number;
    missionsCompleted: number;
    co2Reduced: number;
  }>(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'Environment', 'Social', etc.
  icon: text("icon").notNull(), // Emoji
  completed: boolean("completed").default(false),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption").notNull(),
  likes: integer("likes").default(0),
});

export const insertUserSchema = createInsertSchema(users);
export const insertTaskSchema = createInsertSchema(tasks);
export const insertStorySchema = createInsertSchema(stories);

export type User = typeof users.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Story = typeof stories.$inferSelect;
