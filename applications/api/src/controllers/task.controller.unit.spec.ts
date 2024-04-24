// Improvement: Put this reflect metadata import in a setup script for tests
import 'reflect-metadata';
import { TaskController } from './task.controller';
import { HttpBadRequest } from '../errors/bad-request.error';

describe('TaskController', () => {
  const testUserId = 21412;

  let mockTaskCreateMany: jest.Mock;
  let testClass: TaskController;

  beforeAll(() => {
    mockTaskCreateMany = jest.fn();
    const mockPrisma: any = {
      task: { createMany: mockTaskCreateMany },
    };
    testClass = new TaskController(mockPrisma);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should call create once for valid tasks', async () => {
      const testTasks = [
        {
          name: 'Test Task One',
          description: 'A description',
          dueAt: new Date().toISOString(),
        },
      ];
      mockTaskCreateMany.mockResolvedValue({ message: 'success' });
      const mockSend = jest.fn()
      await testClass.create(
        { params: { userId: '12' }, body: { tasks: testTasks } } as any,
        { status: () => ({ send: mockSend })} as any,
      );
      expect(mockTaskCreateMany).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ message: 'success' });
    });

    it('should call throw error for invalid task', async () => {
      const testTasks = [
        {
          description: 1,
          dueAt: 12,
        },
      ];

      mockTaskCreateMany.mockResolvedValue({ message: 'success' });
      await expect(
        testClass.create({ params: { userId: '12' }, body: { tasks: testTasks } } as any, {} as any),
      ).rejects.toThrow(new HttpBadRequest('Invalid task(s)'));
      expect(mockTaskCreateMany).toHaveBeenCalledTimes(0);
    });
  });
});
