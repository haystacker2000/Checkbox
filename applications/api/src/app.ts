import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TaskController } from './controllers/task.controller';
import { errorHandler } from './middleware/error-handler';
import bodyParser from 'body-parser';

export class TaskApi {
  readonly app: Express;
  readonly config: { port: number | string };

  // Our Budget DI replacement
  readonly prisma: PrismaClient;
  readonly taskController: TaskController;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());

    // Load config
    this.config = { port: process.env.PORT || 4000 };

    // Set up services, move to DI later
    this.prisma = new PrismaClient();
    this.taskController = new TaskController(this.prisma);

    this.initRoutes();
    this.app.use(errorHandler);
  }

  public start() {
    this.app.listen(this.config.port);
    console.log(`API running on http://localhost:${this.config.port}`);
  }

  private initRoutes() {
    this.app.get('/ping', (req: Request, res: Response) => {
      res.send({ message: 'API running' });
    });

    this.app.get('/user/:userId/task', this.taskController.list);
    this.app.post('/user/:userId/task', this.taskController.create);
    this.app.put('/user/:userId/task/:id', this.taskController.update);
  }
}
