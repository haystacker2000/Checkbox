import 'reflect-metadata';
import express, { Express, NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TaskController } from './controllers/task.controller';
import { errorHandler } from './middleware/error-handler';
import bodyParser from 'body-parser';
import cors from 'cors';

// To add a catch for errors from rejected promises
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export class TaskApi {
  readonly app: Express;
  readonly config: { port: number | string };

  // Our Budget DI replacement
  readonly prisma: PrismaClient;
  readonly taskController: TaskController;

  constructor() {
    this.app = express();
    this.app.use(cors())
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

    this.app.get('/user/:userId/task', asyncHandler(this.taskController.list));
    this.app.post('/user/:userId/task', asyncHandler(this.taskController.create));
    this.app.put('/user/:userId/task/:id', asyncHandler(this.taskController.update));
  }
}
