import { IsArray, IsDate, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  dueAt: Date;
}

export class CreateTasksDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskDto)
  tasks: CreateTaskDto[];
}
