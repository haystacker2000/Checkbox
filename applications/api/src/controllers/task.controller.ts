import { PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { CreateOrUpdateTaskDto, CreateTasksDto } from '../dtos/create-task.dto';
import { getUserIdFromRequest } from '../middleware/user-id-handler';
import { HttpBadRequest } from '../errors/bad-request.error';

export class TaskController {
  readonly prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public list = async (req: Request, res: Response) => {
    const userId = getUserIdFromRequest(req);
    const take = typeof req.query.take === 'string' ? parseInt(req.query.take) : undefined;
    const skip = typeof req.query.skip === 'string' ? parseInt(req.query.skip) : undefined;
    const count = await this.prisma.task.count({ where: { createdById: userId } });
    const tasks = await this.prisma.task.findMany({
      where: { createdById: userId },
      take,
      skip,
    });
    res.send({ data: tasks, count });
  };

  public create = async (req: Request, res: Response) => {
    const body: CreateTasksDto = plainToInstance(CreateTasksDto, req.body);
    const validationErrors = await validate(body);

    if (validationErrors.length > 0) throw new HttpBadRequest('Invalid task(s)');
    const result = await this.prisma.task.createMany({
      data: body.tasks.map((t) => ({ ...t, completed: false, createdById: getUserIdFromRequest(req) })),
    });
    res.status(201).send(result);
  };

  public update = async (req: Request, res: Response) => {
    const body: CreateOrUpdateTaskDto = plainToInstance(CreateOrUpdateTaskDto, req.body);
    const validationErrors = await validate(body);

    if (validationErrors.length > 0) throw new HttpBadRequest('Invalid task');
    const result = await this.prisma.task.update({
      where: {
        id: this.getTaskIdFromRequest(req),
        createdById: getUserIdFromRequest(req),
      },
      data: {
        ...body,
      },
    });
    res.status(200).send({ data: result });
  };

  private getTaskIdFromRequest(req: Request): number {
    const taskId = parseInt(req.params.taskId);
    if (!Number.isInteger(taskId)) throw new HttpBadRequest('Bad request');
    return taskId;
  }
}
