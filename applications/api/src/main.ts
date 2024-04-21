import express, { Express, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

function getUserIdFromRequest(req: Request): number {
  const userId = parseInt(req.params.userId);
  if (!Number.isInteger(userId)) throw new Error('Bad request');
  return userId;
}

app.get("/ping", (req: Request, res: Response) => {
  res.send("API running");
});

app.get("user/:userId/task", async (req: Request, res: Response) => {
  return prisma.task.findMany({ where: { createdById: getUserIdFromRequest(req) }});
});

app.listen(port);
console.log(`API running on http://localhost:${port}`);