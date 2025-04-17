import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up a simple API endpoint to verify the server is running
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'VCC visualization server is running' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
