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
    {
      createdById: testUserId,
      name: 'Test Task Two',
      description: 'A description 2',
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
  });

  // Could be improved my making tests not interfere with each others data, and
  // creating data in the 'beforeAll' call.
  beforeEach(async () => {
    await prisma.task.createMany({ data: testTasks });
  });

  afterEach(async () => {
    await prisma.task.deleteMany({ where: { createdById: testUserId } });
  });

  afterAll(async () => {
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
    it('should return 200 OK', async () => {
      const response = await request(app).get(`/user/${testUserId}/task`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: 2,
        data: [
          {
            completed: false,
            createdAt: expect.any(String),
            createdById: testUserId,
            description: 'A description',
            dueAt: expect.any(String),
            id: expect.any(Number),
            name: 'Test Task One',
            updatedAt: expect.any(String),
          },
          {
            completed: false,
            createdAt: expect.any(String),
            createdById: testUserId,
            description: 'A description 2',
            dueAt: expect.any(String),
            id: expect.any(Number),
            name: 'Test Task Two',
            updatedAt: expect.any(String),
          },
        ],
      });
    });    
    it('should return 1 record skipping 1 record', async () => {
      const response = await request(app).get(`/user/${testUserId}/task`).query({ take: 1, skip: 1});
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: 2,
        data: [
          {
            completed: false,
            createdAt: expect.any(String),
            createdById: testUserId,
            description: 'A description 2',
            dueAt: expect.any(String),
            id: expect.any(Number),
            name: 'Test Task Two',
            updatedAt: expect.any(String),
          },
        ],
      });
    });
  });

  describe('POST /tasks', () => {
    it('should return 201 Created', async () => {
      const response = await request(app)
        .post(`/user/${testUserId}/task`)
        .send({
          tasks: [
            {
              name: 'Test Task One',
              description: 'A description',
              dueAt: new Date(),
            },
          ],
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        count: 1,
      });
    });

    it('should error on invalid body', async () => {
      const response = await request(app)
        .post(`/user/${testUserId}/task`)
        .send({
          tasks: [
            {
              name: 23,
              description: 'A description',
              dueAt: new Date(),
            },
          ],
        });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Invalid task(s)' });
    });
  });

  describe('PUT /tasks', () => {
    let testTask: Task;
    beforeAll(async () => {
      testTask = await prisma.task.create({
        data: {
          createdById: testUserId,
          name: 'Test Task for update',
          description: 'A description to update',
          dueAt: new Date(2023, 5, 5),
          completed: false,
        },
      });
    });
    it('should return 200 OK', async () => {
      const response = await request(app)
        .put(`/user/${testUserId}/task/${testTask.id}`)
        .send({
          name: 'Test Task updated',
          description: "A description that's updated",
          dueAt: new Date(2024, 6, 6),
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        data: {
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          id: testTask.id,
          createdById: testUserId,
          name: 'Test Task updated',
          description: "A description that's updated",
          dueAt: (new Date(2024, 6, 6)).toISOString(),
          completed: false,
        },
      });
    });

    it('should error on invalid body', async () => {
      const response = await request(app).put(`/user/${testUserId}/task/${testTask.id}`).send({
        name: 23,
        description: 'A description',
        dueAt: new Date(),
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Invalid task' });
    });
  });
});
