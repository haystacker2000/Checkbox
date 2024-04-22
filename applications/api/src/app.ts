import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TaskController } from './controllers/task.controller';

export class App {
  readonly app: Express;
  readonly config: { port: number | string };

  // Our Budget DI replacement
  readonly prisma: PrismaClient;
  readonly taskController: TaskController;

  constructor() {
    this.app = express();

    // Load config
    this.config = { port: process.env.PORT || 3000 };

    // Set up services, move to DI later
    this.prisma = new PrismaClient();
    this.taskController = new TaskController(this.prisma);
  }

  public start() {
    this.initRoutes();
    this.app.listen(this.config.port);
    console.log(`API running on http://localhost:${this.config.port}`);
  }

  private initRoutes() {
    this.app.get('/ping', (req: Request, res: Response) => {
      res.send('API running');
    });

    this.app.route('user/:userId/task').get(this.taskController.list).post(this.taskController.create);

    this.app.put('user/:userId/task/:id', this.taskController.update);
  }
}
