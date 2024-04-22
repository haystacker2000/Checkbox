import { PrismaClient } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Request, Response } from 'express';
import { CreateTasksDto } from '../dtos/create-task.dto';
import { getUserIdFromRequest } from '../middleware/user-id-handler';

export class TaskController {
  constructor(readonly prisma: PrismaClient) {}

  public async list(req: Request, res: Response) {
    const tasks = await this.prisma.task.findMany({ where: { createdById: getUserIdFromRequest(req) } });
    res.send({ data: tasks });
  }

  public async create(req: Request, res: Response) {
    const body: CreateTasksDto = plainToInstance(CreateTasksDto, req.body);
    const validationErrors = validateSync(body);
    if (validationErrors) throw new Error('Bad request');
    await this.prisma.task.createMany({
      data: body.tasks.map((t) => ({ ...t, completed: false, createdById: getUserIdFromRequest(req) })),
    });
  }

  public async update(req: Request, res: Response) {
    res.send('Update task');
  }
}
