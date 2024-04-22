import request from 'supertest';
import { Express } from 'express';
import { PrismaClient, Task } from '@prisma/client';
import { TaskApi } from './app';

describe('main.ts', () => {
  const testUserId = 51252;
  const testTasks = [
    {
      createdById: testUserId,
      name: 'Test Task One',
      description: 'A description',
      dueAt: new Date(),
      completed: false,
    },
  ];

  let api: TaskApi;
  let app: Express;
  let prisma: PrismaClient;

  beforeAll(async () => {
    api = new TaskApi();
    app = api.app;
    prisma = api.prisma;

    await prisma.user.create({ data: { id: testUserId, username: 'TEST USER' } });
    await prisma.task.createMany({ data: testTasks });
  });

  afterAll(async () => {
    await prisma.task.deleteMany({ where: { createdById: testUserId } });
    await prisma.user.delete({ where: { id: testUserId } });
  });

  describe('GET /ping', () => {
    it('should return OK', async () => {
      const response = await request(app).get(`/ping`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'API running' });
    });
  });

  describe('GET /user/${userId}/task', () => {
    it('should return OK', async () => {
      const response = await request(app).get(`/user/${testUserId}/task`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: [
          {
            completed: false,
            createdAt: expect.any(String),
            createdById: 51252,
            description: 'A description',
            dueAt: expect.any(String),
            id: expect.any(Number),
            name: 'Test Task One',
            updatedAt: expect.any(String),
          },
        ],
      });
    });
  });

  describe('POST /tasks', () => {});

  describe('PUT /tasks', () => {});
});
