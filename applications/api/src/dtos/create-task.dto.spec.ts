import 'reflect-metadata';
import { validateSync } from 'class-validator';
import { CreateTaskDto, CreateTasksDto } from './create-task.dto';
import { plainToInstance } from 'class-transformer';

describe('CreateTaskDto', () => {
  it('should pass for a valid object', () => {
    const testData: CreateTaskDto = {
      name: 'name',
      description: 'a description',
      dueAt: new Date(),
    };
    const transform = plainToInstance(CreateTaskDto, testData);
    expect(validateSync(transform)).toEqual([]);
  });

  it('should error for an invalid object', () => {
    const testData = {};
    const transform = plainToInstance(CreateTaskDto, testData);
    expect(validateSync(transform).map((error) => error.constraints)).toEqual([
      {
        isString: 'name must be a string',
      },
      {
        isString: 'description must be a string',
      },
      {
        isDate: 'dueAt must be a Date instance',
      },
    ]);
  });
});

describe('CreateTasksDto', () => {
  it('should pass for a valid object', () => {
    const testData: CreateTasksDto = {
      tasks: [
        {
          name: 'name',
          description: 'a description',
          dueAt: new Date(),
        },
      ],
    };
    const transform = plainToInstance(CreateTasksDto, testData);
    expect(validateSync(transform)).toEqual([]);
  });

  it('should error for an invalid object - empty', () => {
    const testData = {};
    const transform = plainToInstance(CreateTasksDto, testData);
    expect(validateSync(transform).map((error) => error.constraints)).toEqual([
      {
        isArray: 'tasks must be an array',
      },
    ]);
  });

  it('should error for an invalid object - bad array items', () => {
    const testData = { tasks: [{}] };
    const transform = plainToInstance(CreateTasksDto, testData);
    expect(validateSync(transform)[0]?.children![0].children?.map((c) => c.constraints)).toEqual([
      {
        isString: 'name must be a string',
      },
      {
        isString: 'description must be a string',
      },
      {
        isDate: 'dueAt must be a Date instance',
      },
    ]);
  });
});
