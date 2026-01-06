import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Prototype routes - mostly unused as frontend is mock-data driven
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  return httpServer;
}
