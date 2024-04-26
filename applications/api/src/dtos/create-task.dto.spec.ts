import 'reflect-metadata';
import { validateSync } from 'class-validator';
import { CreateOrUpdateTaskDto, CreateTasksDto } from './create-task.dto';
import { plainToInstance } from 'class-transformer';

describe('CreateTaskDto', () => {
  it('should pass for a valid object', () => {
    const testData: CreateOrUpdateTaskDto = {
      name: 'name',
      description: 'a description',
      dueAt: new Date(),
    };
    const transform = plainToInstance(CreateOrUpdateTaskDto, testData);
    expect(validateSync(transform)).toEqual([]);
  });

  it('should error for an invalid object', () => {
    const testData = {};
    const transform = plainToInstance(CreateOrUpdateTaskDto, testData);
    expect(validateSync(transform).map((error) => error.constraints)).toEqual([
      {
        isDefined: 'name should not be null or undefined',
        isString: 'name must be a string',
      },
      {
        isDefined: 'description should not be null or undefined',
        isString: 'description must be a string',
      },
      {
        isDefined: 'dueAt should not be null or undefined',
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
        isDefined: 'tasks should not be null or undefined',
        isArray: 'tasks must be an array',
      },
    ]);
  });

  it('should error for an invalid object - bad array items', () => {
    const testData = { tasks: [{}] };
    const transform = plainToInstance(CreateTasksDto, testData);
    expect(validateSync(transform)[0]?.children![0].children?.map((c) => c.constraints)).toEqual([
      {
        isDefined: 'name should not be null or undefined',
        isString: 'name must be a string',
      },
      {
        isDefined: 'description should not be null or undefined',
        isString: 'description must be a string',
      },
      {
        isDefined: 'dueAt should not be null or undefined',
        isDate: 'dueAt must be a Date instance',
      },
    ]);
  });
});
