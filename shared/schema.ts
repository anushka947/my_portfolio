import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  color: string;
  skills: Skill[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  techStack: string[];
  color: string;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  achievements: string[];
  color: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface ProjectStats {
  stars: number;
  forks: number;
  views: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  techStack: string[];
  stats: ProjectStats;
  featured: boolean;
  color: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContactMessage = z.infer<typeof contactMessageSchema>;
